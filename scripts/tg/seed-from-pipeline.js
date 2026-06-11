#!/usr/bin/env node
/**
 * seed-from-pipeline.js — bootstrap token-grade seeds for the HM core
 * cohort from data this repo already computes and verifies:
 *
 *   - revenue run-rates        ← data/latest.json (DL revenue_1y / revenue_30d)
 *   - market cap / FDV         ← live CG via coingecko_id (compute-tg wires it)
 *   - token alignment          ← HM real capture ÷ clean earnings, capped at 1
 *                                (real capture is on-chain verified by the HM
 *                                pipeline — the one number we trust most)
 *   - Ke                       ← component scores set per-protocol below
 *
 * Everything judgmental carries confidence "low" and the
 * `auto_seeded_from_pipeline_data` flag: these are starting points for the
 * evidence pipeline (token-grade-check.js) to refine, not finished grades.
 *
 * Never overwrites an existing token file unless --force — evidence-tuned
 * grades must not be clobbered by a re-seed.
 *
 * Run: node scripts/tg/seed-from-pipeline.js [--force]
 *      node scripts/tg/compute-tg.js   # then derive valuations
 */

const fs = require('fs');
const path = require('path');
const tg = require('./token-grading');

const ROOT = path.join(__dirname, '..', '..');
const GRADES_DIR = path.join(ROOT, 'data', 'tg', 'token-grades');
const FORCE = process.argv.includes('--force');

// Per-protocol judgment config — the editorial layer, kept small and
// visible. Ke component scores are 0–5 (premium = max × score / 5).
// underwriting_roe follows the spec's business-type caps:
// software 100–500% · marketplace 50–150% · RWA/lending 10–50%.
const SEEDS = {
  hyperliquid: {
    symbol: 'HYPE',
    project: 'Hyperliquid',
    // De facto the AF receives ~all protocol revenue and buys back, but the
    // token has no binding legal/governance claim on it.
    claim_category_key: 'revenue_treasury_gov',
    clean_conversion: 0.8, // L1+perp dex, thin opex vs revenue
    durability_score: 4,
    underwriting_roe: 3.0, // pure software band
    near_term_growth_score: 4,
    terminal_g: 0.0475,
    ke_scores: {
      crypto_liquidity_premium: 0.5,
      regulatory_premium: 2,
      custody_operational_premium: 0.5,
      governance_supply_premium: 2.5, // foundation control, ongoing unlocks
      economic_alignment_premium: 1.5, // strong flow, not binding
      technical_reconciliation_premium: 1
    },
    flags: ['no_binding_claim_de_facto_flow', 'foundation_unlock_overhang'],
    mechanism_note:
      'Assistance Fund receives ~97% of fees and buys back HYPE continuously; verified on-chain by this repo (onchain flag). No binding holder claim on the AF.'
  },
  aave: {
    symbol: 'AAVE',
    project: 'Aave',
    // Binding-ish governance over a real treasury, but the buyback program
    // is small relative to protocol revenue — rights outrun flow.
    claim_category_key: 'treasury_claim',
    clean_conversion: 0.8,
    durability_score: 4,
    underwriting_roe: 1.5,
    near_term_growth_score: 3,
    terminal_g: 0.035,
    ke_scores: {
      crypto_liquidity_premium: 0.5,
      regulatory_premium: 1.5,
      custody_operational_premium: 0.5,
      governance_supply_premium: 1, // mature distribution, real governance
      economic_alignment_premium: 4, // capture is a sliver of revenue
      technical_reconciliation_premium: 1
    },
    flags: ['buyback_small_vs_revenue'],
    mechanism_note:
      'Aave DAO buyback executes via the Collector contract (onchain_aggregate flag in HM). Governance controls the treasury; current buyback run-rate is a small share of protocol revenue.'
  },
  sky: {
    symbol: 'SKY',
    project: 'Sky',
    claim_category_key: 'treasury_claim',
    clean_conversion: 0.6, // RWA / balance-sheet heavy
    durability_score: 3,
    underwriting_roe: 0.3, // capital-intensive RWA/lending band
    near_term_growth_score: 2,
    terminal_g: 0.025,
    ke_scores: {
      crypto_liquidity_premium: 1,
      regulatory_premium: 2.5, // stablecoin / RWA surface
      custody_operational_premium: 2,
      governance_supply_premium: 1.5,
      economic_alignment_premium: 4.5, // mechanisms exist, currently dormant
      technical_reconciliation_premium: 1.5
    },
    flags: ['value_capture_dormant', 'rwa_regulatory_surface'],
    mechanism_note:
      'SBE buyback machinery is verified on-chain by this repo but currently dormant — $0 real capture is the honest current-state read (see HM). Governance rights over the treasury are real; the flow is switched off.'
  },
  lighter: {
    symbol: 'LIT',
    project: 'Lighter',
    claim_category_key: 'revenue_treasury_gov',
    clean_conversion: 0.8,
    durability_score: 2, // young revenue base
    underwriting_roe: 2.0,
    near_term_growth_score: 4,
    terminal_g: 0.0475,
    ke_scores: {
      crypto_liquidity_premium: 3, // newer, thinner token
      regulatory_premium: 2,
      custody_operational_premium: 1,
      governance_supply_premium: 4, // FDV ≈ 4× mcap unlock overhang
      economic_alignment_premium: 2, // proxy-verified buyback flow
      technical_reconciliation_premium: 2
    },
    flags: ['unlock_overhang_fdv_multiple_of_mcap', 'proxy_verified_only'],
    mechanism_note:
      'Buyback inferred from DefiLlama holdersRevenue (proxy flag in HM) — most measured revenue flows to LIT buybacks, but the feed is a proxy, not a direct chain read.'
  }
};

function main() {
  const latest = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'latest.json'), 'utf8'));
  const hm = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data', 'hm', 'snapshots', 'latest.json'), 'utf8')
  );
  const now = new Date().toISOString();

  let written = 0;
  for (const [slug, cfg] of Object.entries(SEEDS)) {
    const out = path.join(GRADES_DIR, `${cfg.symbol}.json`);
    if (fs.existsSync(out) && !FORCE) {
      console.log(`${cfg.symbol}: exists — skipping (use --force to re-seed)`);
      continue;
    }
    const market = latest.tokens.find((t) => t.symbol === cfg.symbol);
    const hmP = hm.protocols.find((p) => p.slug === slug);
    if (!market || !hmP) {
      console.warn(`${cfg.symbol}: missing market or HM data — skipped`);
      continue;
    }

    const rev1y = market.revenue_1y;
    const rev30dAnn = (market.revenue_30d * 365) / 30;
    const cleanEarnings = rev1y * cfg.clean_conversion;
    // Alignment heuristic: on-chain verified real capture ÷ clean earnings.
    const realCapture = hmP.real_capture_usd || 0;
    const alignment = Math.min(realCapture / Math.max(cleanEarnings, 1), 1);
    const ke = tg.keFromScores(cfg.ke_scores);

    const rung = tg.CLAIM_LADDER.find((r) => r.key === cfg.claim_category_key);
    const keBuildUp = {
      risk_free_rate: tg.MACRO_DEFAULTS.risk_free_rate,
      equity_risk_premium: tg.MACRO_DEFAULTS.equity_risk_premium
    };
    for (const [component, max] of Object.entries(tg.KE_COMPONENT_MAX)) {
      keBuildUp[component] = Math.round(((max * (cfg.ke_scores[component] ?? 0)) / 5) * 10000) / 10000;
    }

    const token = {
      symbol: cfg.symbol,
      project: cfg.project,
      coingecko_id: market.coingecko_id,
      updated_at: now,
      seeded_by: 'scripts/tg/seed-from-pipeline.js',
      business: {
        revenue_run_rate_window: '1y',
        gross_revenue: market.fees_1y ?? null,
        buybacks_or_repurchases: null,
        post_buyback_net_revenue: Math.round(rev1y),
        revenue_13w: Math.round(rev30dAnn), // second selector window: 30d annualized
        durability_adjustment: 1.0,
        trusted_revenue: Math.round(rev1y),
        clean_conversion: cfg.clean_conversion,
        clean_platform_earnings: Math.round(cleanEarnings),
        clean_conversion_grade: tg.assignCleanConversionGrade(cfg.clean_conversion),
        durability_score: cfg.durability_score,
        business_confidence: 'low'
      },
      capital_efficiency: {
        active_capital: null,
        operating_treasury: null,
        total_asset_base: null,
        active_capital_roe: null,
        operating_treasury_roe: null,
        total_asset_roe: null,
        underwriting_roe: cfg.underwriting_roe,
        roe_grade: tg.assignROEGrade(cfg.underwriting_roe),
        roe_confidence: 'low'
      },
      growth: {
        near_term_growth_score: cfg.near_term_growth_score,
        durability_score: cfg.durability_score,
        terminal_g: cfg.terminal_g,
        growth_grade: 'C',
        growth_confidence: 'low'
      },
      token: {
        claim_category: rung.category,
        claim_category_key: cfg.claim_category_key,
        token_alignment_factor: Math.round(alignment * 100) / 100,
        token_alignment_grade: tg.assignTokenAlignmentGrade(alignment),
        value_capture_score: realCapture > 0 ? 2 : 0,
        token_holder_rights_score: cfg.claim_category_key === 'treasury_claim' ? 1.5 : 0.5,
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
          clean_conversion: Math.max(cfg.clean_conversion - 0.1, 0.1),
          underwriting_roe: cfg.underwriting_roe * 0.75,
          terminal_g: Math.max(cfg.terminal_g - 0.01, 0.005)
        },
        {
          name: 'base',
          post_buyback_net_revenue: Math.round(rev1y),
          clean_conversion: cfg.clean_conversion,
          underwriting_roe: cfg.underwriting_roe,
          terminal_g: cfg.terminal_g
        },
        {
          name: 'bull',
          post_buyback_net_revenue: Math.round(Math.max(rev1y, rev30dAnn)),
          clean_conversion: Math.min(cfg.clean_conversion + 0.05, 0.95),
          underwriting_roe: cfg.underwriting_roe * 1.5,
          terminal_g: cfg.terminal_g + 0.0125
        }
      ],
      valuation: {
        market_cap_seed: market.market_cap,
        fdv_seed: market.fdv
      },
      evidence: [
        {
          field: 'business.post_buyback_net_revenue',
          claim: `Annual revenue $${(rev1y / 1e6).toFixed(1)}M (DL revenue_1y); 30d-annualized $${(rev30dAnn / 1e6).toFixed(1)}M`,
          source_url: `https://defillama.com/protocol/${hmP.slug}`,
          confidence: 'medium',
          direction: 'neutral',
          updated_at: now
        },
        {
          field: 'token.token_alignment_factor',
          claim:
            `Alignment ${(alignment * 100).toFixed(0)}% derived as HM real capture $${(realCapture / 1e6).toFixed(1)}M ` +
            `(verification: ${hmP.annual_buyback_verification}) ÷ clean earnings $${(cleanEarnings / 1e6).toFixed(1)}M. ${cfg.mechanism_note}`,
          source_url: `https://defillama.com/protocol/${hmP.slug}`,
          confidence: 'low',
          direction: 'neutral',
          updated_at: now
        }
      ],
      flags: ['auto_seeded_from_pipeline_data', ...cfg.flags]
    };

    fs.writeFileSync(out, JSON.stringify(token, null, 2));
    console.log(
      `${cfg.symbol}: seeded — rev $${(rev1y / 1e6).toFixed(0)}M · alignment ${(alignment * 100).toFixed(0)}% (${token.token.token_alignment_grade}) · Ke ${(ke * 100).toFixed(1)}% (${token.ke_build_up.ke_grade})`
    );
    written++;
  }
  console.log(`\n${written} seed(s) written. Now run: node scripts/tg/compute-tg.js`);
}

main();
