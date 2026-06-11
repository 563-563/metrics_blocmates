#!/usr/bin/env node
/**
 * seed-from-pipeline.js — bootstrap token-grade seeds for every HM-tracked
 * protocol from data the pipeline already ingests. NOTHING numeric is
 * hard-coded per token: every input is either derived from the data layer
 * or comes from a small, visible judgment table (claim-category overrides,
 * Ke score nudges) that exists precisely so the judgment is reviewable.
 *
 * Data sources (see DATA-SOURCES.md → Token Grade):
 *   - revenue run-rates       ← data/latest.json (DL revenue_1y / revenue_30d)
 *   - real capture            ← data/hm/snapshots/latest.json (on-chain/proxy verified)
 *   - va_* mechanism metadata ← data/latest.json (curated value-accrual fields)
 *   - mcap / FDV / price      ← data/latest.json (CoinGecko)
 *   - capital bases           ← data/np + data/onchain adapters where they exist
 *
 * Seeds carry `data_bindings` so compute-tg.js REFRESHES revenue and
 * alignment from each cron ingestion — the seed captures judgment, the
 * pipeline keeps the numbers current.
 *
 * Every derivation that involved a leap is logged as a question into
 * data/tg/GRADING-QUESTIONS.md for human review.
 *
 * Run: node scripts/tg/seed-from-pipeline.js [--force]
 *      node scripts/tg/compute-tg.js
 */

const fs = require('fs');
const path = require('path');
const tg = require('./token-grading');

const ROOT = path.join(__dirname, '..', '..');
const GRADES_DIR = path.join(ROOT, 'data', 'tg', 'token-grades');
const QUESTIONS_PATH = path.join(ROOT, 'data', 'tg', 'GRADING-QUESTIONS.md');
const FORCE = process.argv.includes('--force');

// ── Derivation heuristics (data → defaults) ─────────────────────────────

// va mechanism/status → claim ladder rung. Current-state reading: proposed
// or absent mechanisms are no_utility TODAY regardless of what governance
// might activate later (that's a positive trigger, not a grade).
function deriveClaimCategory(va) {
  const status = va.status || 'none';
  const mech = va.mechanism || 'none';
  const accrual = Number(va.accrual_pct) || 0;
  if (mech === 'none' || status === 'none' || status === 'proposed' || status === 'conditional' || status === 'unverified') {
    return 'no_utility';
  }
  if (status === 'paused') return 'treasury_claim'; // machinery exists, flow off
  // executing:
  if (mech === 'fee-share-lockers') return 'revenue_treasury_gov';
  if (accrual >= 0.5) return 'revenue_treasury_gov';
  if (accrual >= 0.1) return 'treasury_claim';
  return 'soft_utility';
}

// Clean conversion default by mechanism architecture. Verifying actual
// opex routing per protocol is exactly what the evidence pipeline is for —
// these defaults are flagged low-confidence.
function deriveCleanConversion(va) {
  if (va.mechanism === 'fee-share-lockers') return 1.0; // fees pass to lockers directly
  if (va.status === 'executing' && (va.mechanism || '').startsWith('buyback')) return 0.95;
  return 0.85;
}

// Ke component scores (0–5) from measurable proxies.
function deriveKeScores({ mcap, fdvToMcap, alignment, category }) {
  const cat = (category || '').toLowerCase();
  const liquidity =
    mcap >= 5e9 ? 0.5 : mcap >= 1e9 ? 1 : mcap >= 2.5e8 ? 2 : mcap >= 5e7 ? 3 : 4;
  const governanceSupply =
    fdvToMcap <= 1.1 ? 1 : fdvToMcap <= 1.5 ? 2 : fdvToMcap <= 2.5 ? 3 : fdvToMcap <= 4 ? 4 : 4.5;
  const economicAlignment = Math.min(Math.max((1 - alignment) * 5, 0), 5);
  let regulatory = 2;
  if (cat.includes('gambling') || cat.includes('casino')) regulatory = 4;
  else if (cat.includes('launchpad') || cat.includes('meme')) regulatory = 3;
  else if (cat.includes('derivative') || cat.includes('perp')) regulatory = 2.5;
  else if (cat.includes('rwa') || cat.includes('stable') || cat.includes('cdp')) regulatory = 2.5;
  let custody = 1;
  if (cat.includes('gaming') || cat.includes('rwa')) custody = 3;
  else if (cat.includes('gambling')) custody = 2.5;
  return {
    crypto_liquidity_premium: liquidity,
    regulatory_premium: regulatory,
    custody_operational_premium: custody,
    governance_supply_premium: governanceSupply,
    economic_alignment_premium: Math.round(economicAlignment * 10) / 10,
    technical_reconciliation_premium: 1.5
  };
}

// Underwriting ROE cap by business type (spec §7.3 bands).
function deriveUnderwritingRoe(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('lending') || cat.includes('cdp')) return 1.0;
  if (cat.includes('rwa') || cat.includes('stable')) return 0.4;
  return 1.5; // software / dex / launchpad default
}

// Terminal g + scores from revenue momentum (30d-annualized vs 1y).
function deriveGrowth(rev1y, rev30dAnn) {
  if (!rev1y || rev1y <= 0) return { terminal_g: 0.02, near: 1, durability: 1 };
  const m = rev30dAnn / rev1y;
  if (m >= 1.5) return { terminal_g: 0.0475, near: 4, durability: 3 };
  if (m >= 1.1) return { terminal_g: 0.04, near: 4, durability: 3 };
  if (m >= 0.8) return { terminal_g: 0.03, near: 3, durability: 3 };
  if (m >= 0.5) return { terminal_g: 0.02, near: 2, durability: 2 };
  return { terminal_g: 0.01, near: 1, durability: 2 };
}

// ── Judgment overrides — the visible editorial layer ─────────────────────
// Only fields that should DIFFER from the derived defaults. Core cohort
// retains its richer hand-tuned config; proxy tokens get sparse nudges.
const OVERRIDES = {
  HYPE: {
    claim_category_key: 'revenue_treasury_gov',
    clean_conversion: 1.0, // DL revenue nets HLP share; opex funded off-stream
    underwriting_roe: 3.0,
    ke_scores: { regulatory_premium: 2, governance_supply_premium: 2.5, technical_reconciliation_premium: 1 },
    flags: ['no_binding_claim_de_facto_flow', 'foundation_unlock_overhang']
  },
  AAVE: {
    claim_category_key: 'treasury_claim',
    clean_conversion: 0.65, // DAO pays service providers out of revenue
    underwriting_roe: 1.5,
    ke_scores: { governance_supply_premium: 1, technical_reconciliation_premium: 1 },
    flags: ['buyback_small_vs_revenue']
  },
  SKY: {
    claim_category_key: 'treasury_claim',
    clean_conversion: 0.6, // balance-sheet / RWA cost stack
    underwriting_roe: 0.3,
    ke_scores: { custody_operational_premium: 2, regulatory_premium: 2.5 },
    flags: ['value_capture_dormant', 'rwa_regulatory_surface']
  },
  LIT: {
    clean_conversion: 1.0,
    underwriting_roe: 2.0,
    ke_scores: { technical_reconciliation_premium: 2 },
    flags: ['unlock_overhang_fdv_multiple_of_mcap', 'proxy_verified_only']
  },
  DRIFT: {
    ke_scores: { technical_reconciliation_premium: 4, regulatory_premium: 3 },
    flags: ['exploit_2026_04_operations_paused']
  },
  RLB: {
    flags: ['dl_revenue_coverage_gap']
  }
};

// Token-specific review questions, surfaced in the grading log alongside
// the auto-generated ones.
const CURATED_QUESTIONS = {
  ENA: 'Alignment 0 follows the Cat B rule (sUSDe stakers are not ENA holders). Is there any live sENA fee-share that should count?',
  UNI: 'Firepit burn live since Dec 2025 per va_notes — should burn count as full capture, and does the proxy feed measure it cleanly?',
  MORPHO: 'Fee switch proposed, revenue $0 in DL by design. Watch the governance vote — activation jumps the claim category.',
  MET: 'Fee-share proposed, not live. Same trigger watch as MORPHO.',
  ONDO: 'Fee switch scheduled H2 2026 per va_notes. RWA regulatory surface argues for a higher regulatory premium than the derived default.',
  LDO: '$20M discretionary buyback approved Apr 2026 but not executing — conditional. Confirm it stays out of capture until on-chain.',
  SNX: 'Tokenomics reset Q1 2026, buyback unverified, DL revenue $0. Needs a real revenue source before the grade means anything.',
  JTO: "HM verification says 'onchain_dormant' but va says executing ($3.2M). Reconcile which is current before trusting alignment.",
  GMX: 'Buyback paused — why, and what restarts it? Treasury-claim rung assumes the machinery is real.',
  DRIFT: 'April 2026 exploit ($285M), operations paused. Should this token be graded at all right now, or flagged un-gradeable?',
  RLB: 'DL shows $0 revenue but hourly buyback-burn is executing — casino revenue is not in DL. Needs an alternative revenue source.',
  KMNO: 'va_notes say ~18% of fees (~$10M) reach treasury but DL revenue is $0 — DL mapping issue to resolve.',
  MNDE: 'va says executing ~$2M/yr buyback but HM capture shows ~0 — feed below minimum days? Reconcile.',
  GNS: 'Model changed late 2024 (SSS discontinued) — the 1y revenue window may mix regimes; consider 30d-ann as primary.',
  CRV: 'Accrual is 12.3% (admin fee share only). Confirm conversion=1.0 for the locker share is the right read.',
  AERO: '100% of fees to veAERO = alignment ~1, but emissions are massive. TG does not penalize dilution (HM does) — confirm that division of labor is acceptable.',
  ZRO: 'Fee switch live Dec 2025 — trailing 1y revenue badly understates the new regime. Consider binding to 30d-ann.',
  CARDS: 'Seeded from the underwriting spec (Dune-derived $66.7M revenue). DL shows $48M — decide which source should bind, or keep CARDS manual.',
  USUAL: 'Fee switch routes up to 100% of revenue — alignment derives to ~1.0. Sanity-check the DL holdersRevenue feed quality.',
  PUMP: 'Revenue momentum is sharply negative (30d-ann well below 1y) — derived g may still be too generous.',
  COW: 'Buyback mandated ≥ 1.2× emissions (net-negative issuance). Confirm proxy feed captures the full program.'
};

// ── Capital bases from on-chain adapters (only what we actually fetch) ──
function loadCapitalBases(latest, np) {
  const readJson = (rel) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
    } catch {
      return null;
    }
  };
  const priceOf = (sym) => latest.tokens.find((t) => t.symbol === sym)?.price ?? null;
  const lastRow = (d) => (Array.isArray(d) ? d[d.length - 1] : d);
  const out = {};

  const hypeNp = np?.protocols?.find((p) => p.slug === 'hyperliquid');
  const af = hypeNp?.static_reference?.af_balance;
  if (af?.amount_usd) {
    out.HYPE = {
      operating_treasury: Math.round(af.amount_usd),
      note: `Assistance Fund balance ${(af.amount_tokens / 1e6).toFixed(1)}M HYPE (onchain, ${af.date})`
    };
  }
  const aavePrice = priceOf('AAVE');
  const collector = lastRow(readJson('data/onchain/aave/treasury.json'));
  const reserve = lastRow(readJson('data/onchain/aave/ecosystem-reserve.json'));
  const sm = lastRow(readJson('data/onchain/aave/staking.json'));
  if (aavePrice && (collector || reserve)) {
    const treasuryUsd = ((collector?.balance_tokens ?? 0) + (reserve?.balance_tokens ?? 0)) * aavePrice;
    const smUsd = (sm?.total_staked_tokens ?? 0) * aavePrice;
    out.AAVE = {
      operating_treasury: Math.round(treasuryUsd),
      total_asset_base: Math.round(treasuryUsd + smUsd),
      note: 'Collector + Ecosystem Reserve AAVE × live price (onchain; excludes multi-asset treasury); asset base adds Safety Module staked AAVE'
    };
  }
  return out;
}

// ── Main ─────────────────────────────────────────────────────────────────
function main() {
  const latest = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'latest.json'), 'utf8'));
  const hm = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'hm', 'snapshots', 'latest.json'), 'utf8'));
  let np = null;
  try {
    np = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'np', 'snapshots', 'latest.json'), 'utf8'));
  } catch { /* optional */ }
  const capitalBases = loadCapitalBases(latest, np);
  const now = new Date().toISOString();

  const questions = [];
  const addQ = (sym, q) => questions.push({ sym, q });

  let written = 0;
  let skipped = 0;
  for (const hmP of hm.protocols) {
    const market = latest.tokens.find(
      (t) => t.defillama_slug === hmP.slug || t.coingecko_id === hmP.slug || t.symbol === hmP.symbol
    );
    if (!market) {
      addQ(hmP.symbol, 'No market data row in data/latest.json — cannot seed.');
      continue;
    }
    const sym = market.symbol;
    const out = path.join(GRADES_DIR, `${sym}.json`);
    if (fs.existsSync(out) && !FORCE) {
      skipped++;
      if (CURATED_QUESTIONS[sym]) addQ(sym, CURATED_QUESTIONS[sym]);
      continue;
    }
    // CARDS stays manual (spec/Dune-sourced) even under --force.
    if (sym === 'CARDS' && fs.existsSync(out)) {
      skipped++;
      addQ(sym, CURATED_QUESTIONS.CARDS);
      continue;
    }

    const ov = OVERRIDES[sym] || {};
    const va = {
      mechanism: market.va_mechanism,
      status: market.va_status,
      accrual_pct: market.va_accrual_pct,
      notes: market.va_notes
    };
    const rev1y = Number(market.revenue_1y) || 0;
    const rev30dAnn = ((Number(market.revenue_30d) || 0) * 365) / 30;
    const cleanConversion = ov.clean_conversion ?? deriveCleanConversion(va);
    const cleanEarnings = rev1y * cleanConversion;
    const realCapture = hmP.real_capture_usd || 0;
    const alignment =
      cleanEarnings > 0 ? Math.min(Math.round((realCapture / cleanEarnings) * 100) / 100, 1) : 0;

    const claimKey = ov.claim_category_key ?? deriveClaimCategory(va);
    const rung = tg.CLAIM_LADDER.find((r) => r.key === claimKey);
    const growth = deriveGrowth(rev1y, rev30dAnn);
    const underwritingRoe = ov.underwriting_roe ?? deriveUnderwritingRoe(market.category);
    const keScores = {
      ...deriveKeScores({
        mcap: market.market_cap || 0,
        fdvToMcap: market.fdv && market.market_cap ? market.fdv / market.market_cap : 1,
        alignment,
        category: market.category
      }),
      ...(ov.ke_scores || {})
    };
    const ke = tg.keFromScores(keScores);
    const keBuildUp = {
      risk_free_rate: tg.MACRO_DEFAULTS.risk_free_rate,
      equity_risk_premium: tg.MACRO_DEFAULTS.equity_risk_premium
    };
    for (const [component, max] of Object.entries(tg.KE_COMPONENT_MAX)) {
      keBuildUp[component] = Math.round(((max * (keScores[component] ?? 0)) / 5) * 10000) / 10000;
    }

    const flags = ['auto_seeded_from_pipeline_data', ...(ov.flags || [])];
    if (rev1y <= 0) {
      flags.push('no_dl_revenue_data');
      addQ(sym, `DL revenue_1y is $0 — implied value is $0 by construction. ${va.notes ? `va_notes: ${String(va.notes).slice(0, 120)}` : ''}`);
    }
    if (hmP.annual_buyback_verification === 'proxy') flags.push('capture_proxy_verified_only');
    if (cleanEarnings > 0 && realCapture > cleanEarnings) {
      flags.push('capture_exceeds_clean_earnings');
      addQ(
        sym,
        `Capture $${(realCapture / 1e6).toFixed(1)}M exceeds clean earnings $${(cleanEarnings / 1e6).toFixed(1)}M — alignment capped at 100%. Usually a window mismatch (60d-SMA capture vs trailing-1y revenue across a regime change) or a DL revenue-vs-holdersRevenue definition gap. Pick the right window or fix the revenue source.`
      );
    }
    if ((va.status === 'proposed' || va.status === 'conditional') && realCapture === 0) {
      flags.push('mechanism_proposed_not_live');
    }
    if (CURATED_QUESTIONS[sym]) addQ(sym, CURATED_QUESTIONS[sym]);

    const token = {
      symbol: sym,
      project: hmP.name,
      coingecko_id: market.coingecko_id,
      hm_slug: hmP.slug,
      updated_at: now,
      seeded_by: 'scripts/tg/seed-from-pipeline.js',
      // compute-tg refreshes these inputs from each cron ingestion.
      data_bindings: {
        revenue: 'dl_latest',
        alignment: 'hm_real_capture',
        market: 'cg_live'
      },
      business: {
        revenue_run_rate_window: '1y',
        gross_revenue: market.fees_1y ?? null,
        buybacks_or_repurchases: null,
        post_buyback_net_revenue: Math.round(rev1y),
        revenue_13w: Math.round(rev30dAnn),
        durability_adjustment: 1.0,
        trusted_revenue: Math.round(rev1y),
        clean_conversion: cleanConversion,
        clean_platform_earnings: Math.round(cleanEarnings),
        clean_conversion_grade: tg.assignCleanConversionGrade(cleanConversion),
        durability_score: growth.durability,
        business_confidence: 'low'
      },
      capital_efficiency: {
        active_capital: null,
        operating_treasury: capitalBases[sym]?.operating_treasury ?? null,
        total_asset_base: capitalBases[sym]?.total_asset_base ?? null,
        active_capital_roe: null,
        operating_treasury_roe: null,
        total_asset_roe: null,
        underwriting_roe: underwritingRoe,
        roe_grade: tg.assignROEGrade(underwritingRoe),
        roe_confidence: capitalBases[sym] ? 'medium' : 'low'
      },
      growth: {
        near_term_growth_score: growth.near,
        durability_score: growth.durability,
        terminal_g: growth.terminal_g,
        growth_grade: 'C',
        growth_confidence: 'low'
      },
      token: {
        claim_category: rung.category,
        claim_category_key: claimKey,
        token_alignment_factor: alignment,
        token_alignment_grade: tg.assignTokenAlignmentGrade(alignment),
        value_capture_score: realCapture > 0 ? 2 : 0,
        token_holder_rights_score: claimKey === 'treasury_claim' || claimKey === 'revenue_treasury_gov' ? 1.5 : 0.5,
        entity_alignment_score: 1,
        transparency_score: 2,
        token_confidence: 'low'
      },
      ke_build_up: {
        ...keBuildUp,
        ke: Math.round(ke * 10000) / 10000,
        ke_grade: tg.assignKeGrade(ke)
      },
      operating_cases: [
        {
          name: 'conservative',
          post_buyback_net_revenue: Math.round(Math.min(rev1y, rev30dAnn)),
          clean_conversion: Math.max(cleanConversion - 0.1, 0.1),
          underwriting_roe: underwritingRoe * 0.75,
          terminal_g: Math.max(growth.terminal_g - 0.01, 0.005)
        },
        {
          name: 'base',
          post_buyback_net_revenue: Math.round(rev1y),
          clean_conversion: cleanConversion,
          underwriting_roe: underwritingRoe,
          terminal_g: growth.terminal_g
        },
        {
          name: 'bull',
          post_buyback_net_revenue: Math.round(Math.max(rev1y, rev30dAnn)),
          clean_conversion: Math.min(cleanConversion + 0.05, 1.0),
          underwriting_roe: underwritingRoe * 1.5,
          terminal_g: growth.terminal_g + 0.0125
        }
      ],
      valuation: {
        market_cap_seed: market.market_cap,
        fdv_seed: market.fdv
      },
      evidence: [
        {
          field: 'business.post_buyback_net_revenue',
          claim: `Annual revenue $${(rev1y / 1e6).toFixed(1)}M (DL revenue_1y); 30d-annualized $${(rev30dAnn / 1e6).toFixed(1)}M. Auto-refreshed each cron via data_bindings.`,
          source_url: `https://defillama.com/protocol/${hmP.slug}`,
          confidence: 'medium',
          direction: 'neutral',
          updated_at: now
        },
        {
          field: 'token.claim_category',
          claim: `Derived from value-accrual metadata: ${va.mechanism ?? 'none'}/${va.status ?? 'none'}, accrual share ${va.accrual_pct ?? 0}. ${va.notes ? String(va.notes) : ''}`,
          source_url: `https://defillama.com/protocol/${hmP.slug}`,
          confidence: 'low',
          direction: 'neutral',
          updated_at: now
        },
        {
          field: 'token.token_alignment_factor',
          claim: `Alignment ${(alignment * 100).toFixed(0)}% = HM real capture $${(realCapture / 1e6).toFixed(1)}M (verification: ${hmP.annual_buyback_verification}) ÷ clean earnings $${(cleanEarnings / 1e6).toFixed(1)}M. Auto-refreshed each cron.`,
          source_url: `https://defillama.com/protocol/${hmP.slug}`,
          confidence: 'low',
          direction: 'neutral',
          updated_at: now
        },
        ...(capitalBases[sym]
          ? [
              {
                field: 'capital_efficiency.operating_treasury',
                claim: capitalBases[sym].note,
                source_url: `https://defillama.com/protocol/${hmP.slug}`,
                confidence: 'medium',
                direction: 'neutral',
                updated_at: now
              }
            ]
          : [])
      ],
      flags
    };

    fs.writeFileSync(out, JSON.stringify(token, null, 2));
    console.log(
      `${sym.padEnd(7)} ${claimKey.padEnd(22)} align ${(alignment * 100).toFixed(0).padStart(3)}% (${token.token.token_alignment_grade}) · Ke ${(ke * 100).toFixed(1)}% (${token.ke_build_up.ke_grade}) · rev $${(rev1y / 1e6).toFixed(0)}M`
    );
    written++;
  }

  // ── Write the grading-questions log ──
  const lines = [
    '# Token-grading seed questions',
    '',
    `Generated by scripts/tg/seed-from-pipeline.js on ${now.slice(0, 10)}.`,
    'Open items from the automated grading pass — resolve via the evidence',
    'pipeline (`token-grade-check.js apply`) and delete entries as they close.',
    ''
  ];
  const bySym = new Map();
  for (const { sym, q } of questions) {
    if (!bySym.has(sym)) bySym.set(sym, []);
    bySym.get(sym).push(q);
  }
  for (const [sym, qs] of [...bySym.entries()].sort()) {
    lines.push(`## ${sym}`);
    for (const q of qs) lines.push(`- [ ] ${q}`);
    lines.push('');
  }
  fs.writeFileSync(QUESTIONS_PATH, lines.join('\n'));

  console.log(`\n${written} seeded, ${skipped} existing kept. ${bySym.size} token(s) with open questions → data/tg/GRADING-QUESTIONS.md`);
  console.log('Now run: node scripts/tg/compute-tg.js');
}

main();
