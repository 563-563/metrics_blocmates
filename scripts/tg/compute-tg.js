#!/usr/bin/env node
/**
 * Token-grade compute — derives valuation outputs for every token under
 * data/tg/token-grades/ and writes the aggregate latest.json.
 *
 * Per token:
 *   - recompute trusted_revenue / clean_platform_earnings from seeds
 *   - recompute Ke from the build-up components (kept consistent)
 *   - SS-PE, token_attributable_earnings, implied_token_value
 *   - implied value vs LIVE market cap / FDV (data/latest.json via
 *     coingecko_id; falls back to the seed mcap/fdv when not tracked)
 *   - token-discount scenario ladder + operating scenario table
 *
 * Modes:
 *   node scripts/tg/compute-tg.js           # compute + write files
 *   node scripts/tg/compute-tg.js --check   # CI: writes nothing, asserts the
 *                                           # spec acceptance values, exits
 *                                           # non-zero on deviation
 *
 * The --check anchors are constants from TOKEN_GRADING_DASHBOARD_BUILD_SPEC
 * §13 — frozen spec inputs, not current seed values, so evidence updates to
 * CARDS.json can never silently break CI (same philosophy as compute-hm's
 * --reproduce-article anchors).
 */

const fs = require('fs');
const path = require('path');
const tg = require('./token-grading');

const ROOT = path.join(__dirname, '..', '..');
const GRADES_DIR = path.join(ROOT, 'data', 'tg', 'token-grades');
const LATEST_MARKET_PATH = path.join(ROOT, 'data', 'latest.json');

const CHECK = process.argv.includes('--check');

// ── Spec §13 acceptance anchors (frozen) ─────────────────────────────────
const SPEC_BASE = {
  post_buyback_net_revenue: 66720573,
  clean_conversion: 0.75,
  underwriting_roe: 2.0,
  terminal_g: 0.035
};
const SPEC_EXPECTED = [
  { key: 'no_utility', ss_pe: 2.85, implied_token_value: 4.3e6 },
  { key: 'soft_utility', ss_pe: 3.45, implied_token_value: 20.7e6 },
  { key: 'treasury_claim', ss_pe: 4.37, implied_token_value: 76.5e6 },
  { key: 'revenue_treasury_gov', ss_pe: 5.95, implied_token_value: 193.7e6 },
  { key: 'full_equity', ss_pe: 8.93, implied_token_value: 447.0e6 }
];
const SSPE_TOL = 0.005; // spec rows are rounded to 2dp
const VALUE_TOL = 0.01; // spec values are rounded to $0.1M

function runCheck() {
  const cleanEarnings = tg.calculateCleanEarnings(SPEC_BASE);
  const expectedClean = 50040430;
  console.log(`clean_platform_earnings: ${cleanEarnings.toFixed(0)} (spec ≈ ${expectedClean})`);
  let failed = false;
  if (Math.abs(cleanEarnings / expectedClean - 1) > 1e-4) {
    console.error(`FAIL clean earnings: got ${cleanEarnings}, expected ≈ ${expectedClean}`);
    failed = true;
  }
  const scenarios = tg.buildTokenDiscountScenarios({
    cleanEarnings,
    roe: SPEC_BASE.underwriting_roe,
    g: SPEC_BASE.terminal_g
  });
  for (const exp of SPEC_EXPECTED) {
    const got = scenarios.find((s) => s.key === exp.key);
    if (!got || got.ss_pe == null || got.implied_token_value == null) {
      console.error(`FAIL ${exp.key}: scenario missing or unstable`);
      failed = true;
      continue;
    }
    const sspeOk = Math.abs(got.ss_pe - exp.ss_pe) <= SSPE_TOL;
    const valueOk = Math.abs(got.implied_token_value / exp.implied_token_value - 1) <= VALUE_TOL;
    const line =
      `${exp.key.padEnd(22)} SS-PE ${got.ss_pe.toFixed(3)} (spec ${exp.ss_pe}) · ` +
      `value $${(got.implied_token_value / 1e6).toFixed(1)}M (spec $${(exp.implied_token_value / 1e6).toFixed(1)}M)`;
    if (sspeOk && valueOk) {
      console.log(`PASS  ${line}`);
    } else {
      console.error(`FAIL  ${line}`);
      failed = true;
    }
  }
  if (failed) {
    console.error('\n--check FAILED: token-grading engine deviates from spec acceptance values.');
    process.exit(1);
  }
  console.log('\n--check passed: spec acceptance values reproduced.');
}

// ── Live market lookup ───────────────────────────────────────────────────
function loadLiveMarket() {
  try {
    const latest = JSON.parse(fs.readFileSync(LATEST_MARKET_PATH, 'utf8'));
    const bySlug = new Map();
    for (const t of latest.tokens || []) {
      if (t.coingecko_id) bySlug.set(t.coingecko_id, t);
    }
    return bySlug;
  } catch {
    return new Map();
  }
}

function loadHmProtocols() {
  try {
    const hm = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'data', 'hm', 'snapshots', 'latest.json'), 'utf8')
    );
    return new Map((hm.protocols || []).map((p) => [p.slug, p]));
  } catch {
    return new Map();
  }
}

// data_bindings: seeds capture judgment; the pipeline keeps numbers fresh.
// Each cron run re-pulls bound inputs from the latest DL/CG ingestion and
// the HM snapshot before deriving valuations. Tokens without bindings
// (e.g. CARDS, spec-sourced) keep their seeded inputs untouched.
function applyDataBindings(token, liveBySlug, hmBySlug) {
  const bind = token.data_bindings;
  if (!bind) return;
  const live = token.coingecko_id ? liveBySlug.get(token.coingecko_id) : null;
  const b = token.business;

  if (bind.revenue === 'dl_latest' && live && live.revenue_1y != null) {
    const rev1y = Math.round(Number(live.revenue_1y) || 0);
    const rev30dAnn = Math.round(((Number(live.revenue_30d) || 0) * 365) / 30);
    b.post_buyback_net_revenue = rev1y;
    b.revenue_13w = rev30dAnn;
    b.gross_revenue = live.fees_1y ?? b.gross_revenue;
    // Refresh the standard three operating cases' revenue legs in place.
    for (const c of token.operating_cases || []) {
      if (c.name === 'conservative') c.post_buyback_net_revenue = Math.min(rev1y, rev30dAnn);
      else if (c.name === 'base') c.post_buyback_net_revenue = rev1y;
      else if (c.name === 'bull') c.post_buyback_net_revenue = Math.max(rev1y, rev30dAnn);
    }
  }

  if (bind.alignment === 'hm_real_capture' && token.hm_slug) {
    const hmP = hmBySlug.get(token.hm_slug);
    if (hmP) {
      const cleanEarnings =
        b.post_buyback_net_revenue * (b.durability_adjustment ?? 1) * b.clean_conversion;
      const capture = hmP.real_capture_usd || 0;
      token.token.token_alignment_factor =
        cleanEarnings > 0 ? Math.min(round2(capture / cleanEarnings), 1) : 0;
    }
  }
}

// ── Per-token compute ────────────────────────────────────────────────────
function computeToken(token, liveBySlug) {
  const b = token.business;
  const cap = token.capital_efficiency || {};
  const growth = token.growth || {};
  const tok = token.token || {};
  const keBuildUp = token.ke_build_up || {};

  b.trusted_revenue = tg.calculateTrustedRevenue(
    b.post_buyback_net_revenue,
    b.durability_adjustment ?? 1.0
  );
  b.clean_platform_earnings = b.trusted_revenue * b.clean_conversion;
  b.clean_conversion_grade = tg.assignCleanConversionGrade(b.clean_conversion);

  if (cap.active_capital) cap.active_capital_roe = round2(b.clean_platform_earnings / cap.active_capital);
  if (cap.operating_treasury) cap.operating_treasury_roe = round2(b.clean_platform_earnings / cap.operating_treasury);
  if (cap.total_asset_base) cap.total_asset_roe = round2(b.clean_platform_earnings / cap.total_asset_base);
  if (cap.underwriting_roe != null) cap.roe_grade = tg.assignROEGrade(cap.underwriting_roe);

  keBuildUp.ke = round4(tg.calculateKe(keBuildUp));
  keBuildUp.ke_grade = tg.assignKeGrade(keBuildUp.ke);

  tok.token_alignment_grade = tg.assignTokenAlignmentGrade(tok.token_alignment_factor ?? 0);

  const roe = cap.underwriting_roe;
  const g = growth.terminal_g;
  const sspe = tg.calculateSSPE(roe, keBuildUp.ke, g);
  const tokenEarnings = b.clean_platform_earnings * (tok.token_alignment_factor ?? 0);
  const impliedValue = tg.calculateTokenValue(b.clean_platform_earnings, tok.token_alignment_factor ?? 0, sspe);

  const live = token.coingecko_id ? liveBySlug.get(token.coingecko_id) : null;
  const marketCap = live?.market_cap ?? token.valuation?.market_cap_seed ?? null;
  const fdv = live?.fdv ?? token.valuation?.fdv_seed ?? null;

  token.valuation = {
    ...token.valuation,
    ss_pe: sspe != null ? round2(sspe) : null,
    token_attributable_earnings: Math.round(tokenEarnings),
    implied_token_value: impliedValue != null ? Math.round(impliedValue) : null,
    market_cap: marketCap,
    fdv,
    market_source: live ? 'live_cg' : 'seed',
    implied_value_vs_market_cap:
      impliedValue != null && marketCap ? round2(impliedValue / marketCap) : null,
    implied_value_vs_fdv: impliedValue != null && fdv ? round2(impliedValue / fdv) : null,
    warnings: tg.sspeWarnings(roe, keBuildUp.ke, g)
  };

  token.scenarios = {
    token_discount: tg
      .buildTokenDiscountScenarios({ cleanEarnings: b.clean_platform_earnings, roe, g })
      .map((s) => ({
        ...s,
        ss_pe: s.ss_pe != null ? round2(s.ss_pe) : null,
        token_attributable_earnings: Math.round(s.token_attributable_earnings),
        implied_token_value: s.implied_token_value != null ? Math.round(s.implied_token_value) : null
      })),
    operating: token.operating_cases
      ? tg
          .buildOperatingScenarios({
            cases: token.operating_cases,
            tokenAlignment: tok.token_alignment_factor ?? 0,
            ke: keBuildUp.ke
          })
          .map((s) => ({
            ...s,
            clean_platform_earnings: Math.round(s.clean_platform_earnings),
            ss_pe: s.ss_pe != null ? round2(s.ss_pe) : null,
            implied_token_value: s.implied_token_value != null ? Math.round(s.implied_token_value) : null
          }))
      : []
  };

  return token;
}

const round2 = (v) => Math.round(v * 100) / 100;
const round4 = (v) => Math.round(v * 10000) / 10000;

function main() {
  if (CHECK) {
    runCheck();
    return;
  }

  const liveBySlug = loadLiveMarket();
  const hmBySlug = loadHmProtocols();
  const files = fs
    .readdirSync(GRADES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'latest.json');

  const summary = [];
  for (const file of files) {
    const p = path.join(GRADES_DIR, file);
    const token = JSON.parse(fs.readFileSync(p, 'utf8'));
    applyDataBindings(token, liveBySlug, hmBySlug);
    const computed = computeToken(token, liveBySlug);
    computed.computed_at = new Date().toISOString();
    fs.writeFileSync(p, JSON.stringify(computed, null, 2));
    summary.push({
      symbol: computed.symbol,
      project: computed.project,
      claim_category: computed.token?.claim_category ?? null,
      token_alignment_factor: computed.token?.token_alignment_factor ?? null,
      token_alignment_grade: computed.token?.token_alignment_grade ?? null,
      ke: computed.ke_build_up?.ke ?? null,
      ke_grade: computed.ke_build_up?.ke_grade ?? null,
      clean_conversion_grade: computed.business?.clean_conversion_grade ?? null,
      roe_grade: computed.capital_efficiency?.roe_grade ?? null,
      ss_pe: computed.valuation?.ss_pe ?? null,
      implied_token_value: computed.valuation?.implied_token_value ?? null,
      market_cap: computed.valuation?.market_cap ?? null,
      fdv: computed.valuation?.fdv ?? null,
      implied_value_vs_market_cap: computed.valuation?.implied_value_vs_market_cap ?? null,
      implied_value_vs_fdv: computed.valuation?.implied_value_vs_fdv ?? null,
      flags: computed.flags?.length ?? 0
    });
    console.log(
      `${computed.symbol}: alignment ${computed.token?.token_alignment_grade} · Ke ${(computed.ke_build_up.ke * 100).toFixed(1)}% (${computed.ke_build_up.ke_grade}) · ` +
        `SS-PE ${computed.valuation.ss_pe ?? 'n/a'} · implied $${((computed.valuation.implied_token_value ?? 0) / 1e6).toFixed(1)}M ` +
        `vs mcap $${((computed.valuation.market_cap ?? 0) / 1e6).toFixed(1)}M [${computed.valuation.market_source}]`
    );
  }

  fs.writeFileSync(
    path.join(GRADES_DIR, 'latest.json'),
    JSON.stringify({ generated_at: new Date().toISOString(), tokens: summary }, null, 2)
  );
  console.log(`\nWrote ${files.length} token grade(s) + latest.json`);
}

main();
