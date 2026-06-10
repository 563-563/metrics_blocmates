#!/usr/bin/env node
/**
 * Holder Multiple (HM) pipeline — reads data/latest.json (live DL+CG) and
 * data/hm/config.json (editorial seed) and emits the HM breakdown per protocol.
 *
 *   HM = Adjusted MCap / Total Real Capture
 *
 *   Adjusted MCap = float_mcap
 *                 + 24mo_unlocks_usd
 *                 + 24mo_emissions_usd
 *                 − 24mo_buybacks_usd
 *
 *   Total Real Capture = annual_buyback_usd + annual_holder_yield_usd
 *
 * Token-quantity inputs (unlocks_24mo_tokens, emissions_24mo_tokens) are
 * multiplied by the live price at compute time. Dollar inputs
 * (annual_buyback_usd, annual_holder_yield_usd, buyback_24mo_usd) are taken
 * from the seed as-is in v1.
 *
 * Outputs:
 *   data/hm/snapshots/<date>.json   machine-readable breakdown
 *   data/hm/snapshots/latest.json   copy of most recent
 *   data/hm/reports/<date>.md       article-format markdown
 *   data/hm/reports/latest.md       copy of most recent
 *
 * Flags:
 *   --reproduce-article    use article_price_usd + article_circulating_tokens
 *                          from the seed instead of live values. Used to
 *                          verify the formula reproduces 26× / 46× / 34× / 15×.
 *   --check                regression mode: implies --reproduce-article, writes
 *                          NO files, and exits non-zero unless every HM matches
 *                          the published article values (ARTICLE_EXPECTED_HM).
 *                          Run by CI on every push.
 *
 * Run:
 *   node scripts/hm/compute-hm.js                  # live mode
 *   node scripts/hm/compute-hm.js --reproduce-article
 *   node scripts/hm/compute-hm.js --check          # CI regression
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LATEST_PATH    = path.join(ROOT, 'data', 'latest.json');
const SEED_PATH      = path.join(ROOT, 'data', 'hm', 'config.json');
const CONFIG_PATH    = path.join(ROOT, 'data', 'config.json');
const SNAPSHOTS_DIR  = path.join(ROOT, 'data', 'hm', 'snapshots');
const REPORTS_DIR    = path.join(ROOT, 'data', 'hm', 'reports');

const args = new Set(process.argv.slice(2));
const CHECK = args.has('--check');
const REPRODUCE_ARTICLE = args.has('--reproduce-article') || CHECK;

// Published-article regression anchors (CLAUDE.md § Reproduce-article mode).
// --check fails if reproduce-article output deviates at 0.1× precision. If the
// article is ever republished with new numbers, update these alongside the
// seed's article_* fields in the same commit.
const ARTICLE_EXPECTED_HM = { SKY: 26.3, AAVE: 46.3, HYPE: 34.5, LIT: 15.4 };

// Tokens excluded from cohort iteration. CC: no DefiLlama coverage (manual data
// only). HNT: deferred per user (Apr 2026) — separate burn-and-mint analysis,
// requires its own income-statement treatment.
const SKIP_SYMBOLS = new Set(['CC', 'HNT']);

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fmtUsd(n) {
  if (n === 0) return '$0';
  const abs = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

function fmtUsdSigned(n) {
  if (n === 0) return '$0';
  return (n > 0 ? '+' : '') + fmtUsd(n);
}

function fmtMultiple(n) {
  if (!isFinite(n)) return '∞×';
  return `${n.toFixed(1)}×`;
}

// HM bands per CLAUDE.md
function hmBand(hm) {
  if (!isFinite(hm)) return 'no real capture';
  if (hm < 10) return 'exceptional';
  if (hm < 20) return 'strong';
  if (hm < 35) return 'fair value';
  if (hm < 50) return 'expensive';
  return 'speculative';
}

function findLiveToken(latest, symbol) {
  return (latest.tokens || []).find((t) => t.symbol === symbol) || null;
}

// Read on-chain buyback feed if the seed points to one. Returns either
// { annual_usd, days, used_rows, source: 'onchain' } or null. If REPRODUCE_ARTICLE
// is on, or if the file is missing / has too few rows, we return null and the
// seed value is used.
function readOnchainBuybackAnnualized(seedRow) {
  if (REPRODUCE_ARTICLE) return null;
  const relPath = seedRow.onchain_buybacks_path;
  if (!relPath) return null;
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  const rows = loadJson(abs);
  if (!Array.isArray(rows) || rows.length === 0) return null;

  // Drop the last (possibly partial) row if it's today — partial days
  // under-state the run-rate. The remaining tail is whole UTC days.
  const todayIso = new Date().toISOString().slice(0, 10);
  const sorted = rows.slice().sort((a, b) => a.date.localeCompare(b.date));
  const whole = sorted.filter((r) => r.date < todayIso);

  const window = seedRow.onchain_buyback_annualize_days || 30;
  const minDays = seedRow.onchain_buyback_min_days || 7;
  if (whole.length < minDays) return null;

  // CALENDAR-DAY window ending yesterday (today excluded — partial day).
  // Days with no buyback activity are absent from the file but count as $0
  // in the average. Without this, a protocol that pauses buybacks would
  // misleadingly show its OLD rate as the "recent" annualization.
  const yesterday = new Date(todayIso);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const windowStart = new Date(yesterday);
  windowStart.setUTCDate(windowStart.getUTCDate() - window + 1);
  const windowStartIso = windowStart.toISOString().slice(0, 10);
  const windowEndIso = yesterday.toISOString().slice(0, 10);
  const slice = whole.filter((r) => r.date >= windowStartIso && r.date <= windowEndIso);
  const sumUsd = slice.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const annualUsd = (sumUsd / window) * 365;
  const activeDays = slice.length;

  // Lifetime annualized — informational lens alongside the recent.
  const lifetimeSumUsd = whole.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const firstDay = whole[0]?.date;
  const lastDay  = whole[whole.length - 1]?.date;
  let lifetimeAnnualUsd = null;
  let lifetimeDays = null;
  if (firstDay && lastDay) {
    lifetimeDays = Math.max(1, Math.round((new Date(lastDay) - new Date(firstDay)) / (24 * 60 * 60 * 1000)) + 1);
    lifetimeAnnualUsd = (lifetimeSumUsd / lifetimeDays) * 365;
  }

  // Feed-level verification: take the dominant `verification` on the rows.
  // Most feeds are uniform ('onchain'), but the LIT proxy carries 'proxy'
  // and SKY can carry 'onchain_dormant' semantics. Default 'onchain'.
  const verifCounts = {};
  for (const r of whole) {
    const v = r.verification || 'onchain';
    verifCounts[v] = (verifCounts[v] || 0) + 1;
  }
  const feedVerification = Object.entries(verifCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'onchain';

  return {
    annual_usd: annualUsd,
    window_days: window,
    active_days_in_window: activeDays,
    window_start: windowStartIso,
    window_end: windowEndIso,
    days_used: window,
    window_requested: window,
    source: 'onchain_feed',
    feed_verification: feedVerification,
    feed_path: relPath,
    lifetime_annual_usd: lifetimeAnnualUsd,
    lifetime_days: lifetimeDays,
    lifetime_cumulative_usd: lifetimeSumUsd,
    rate_vs_lifetime_pct: lifetimeAnnualUsd ? (annualUsd / lifetimeAnnualUsd - 1) * 100 : null
  };
}

// Resolve a nested JSON path like "current_metrics.circulating_supply" against
// any object. Returns null if any segment is missing.
function resolveJsonPath(obj, dotted) {
  if (!dotted) return null;
  let cur = obj;
  for (const seg of dotted.split('.')) {
    if (cur == null || typeof cur !== 'object') return null;
    cur = cur[seg];
  }
  return cur;
}

// Read a verified-on-chain holder yield (Category B) rate if the seed
// points at one. Mirrors the buyback annualization: calendar-day window
// ending yesterday, dormant days correctly count as $0.
function readOnchainHolderYieldAnnualized(seedRow) {
  if (REPRODUCE_ARTICLE) return null;
  const relPath = seedRow.onchain_holder_yield_path;
  if (!relPath) return null;
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  const rows = loadJson(abs);
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const todayIso = new Date().toISOString().slice(0, 10);
  const sorted = rows.slice().sort((a, b) => a.date.localeCompare(b.date));
  const whole = sorted.filter((r) => r.date < todayIso);

  const window = seedRow.onchain_holder_yield_annualize_days || 60;
  const minDays = seedRow.onchain_holder_yield_min_days || 14;
  // If there's not enough history at all, fall back to seed.
  if (whole.length < 1) return null;

  const yesterday = new Date(todayIso);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const windowStart = new Date(yesterday);
  windowStart.setUTCDate(windowStart.getUTCDate() - window + 1);
  const windowStartIso = windowStart.toISOString().slice(0, 10);
  const windowEndIso = yesterday.toISOString().slice(0, 10);
  const slice = whole.filter((r) => r.date >= windowStartIso && r.date <= windowEndIso);
  const sumUsd = slice.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const annualUsd = (sumUsd / window) * 365;
  const activeDays = slice.length;

  // Lifetime
  const lifetimeSumUsd = whole.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const firstDay = whole[0]?.date;
  const lastDay = whole[whole.length - 1]?.date;
  let lifetimeAnnualUsd = null;
  let lifetimeDays = null;
  if (firstDay && lastDay) {
    lifetimeDays = Math.max(1, Math.round((new Date(lastDay) - new Date(firstDay)) / (24 * 60 * 60 * 1000)) + 1);
    lifetimeAnnualUsd = (lifetimeSumUsd / lifetimeDays) * 365;
  }
  const daysSinceLastObs = lastDay
    ? Math.round((new Date(todayIso) - new Date(lastDay)) / (24 * 60 * 60 * 1000))
    : null;

  return {
    annual_usd: annualUsd,
    window_days: window,
    active_days_in_window: activeDays,
    window_start: windowStartIso,
    window_end: windowEndIso,
    source: 'onchain_feed',
    feed_path: relPath,
    lifetime_annual_usd: lifetimeAnnualUsd,
    lifetime_days: lifetimeDays,
    lifetime_cumulative_usd: lifetimeSumUsd,
    days_since_last_observation: daysSinceLastObs,
    is_dormant: daysSinceLastObs != null && daysSinceLastObs > 30,
    rate_vs_lifetime_pct: lifetimeAnnualUsd ? (annualUsd / lifetimeAnnualUsd - 1) * 100 : null
  };
}

// Read a verified-on-chain circulating supply if the seed points at one.
// Useful when CG's circulating differs from the article/HM-methodology
// definition (e.g. HYPE: ASXN says 298.65M, CG says 238.4M).
function readOnchainCirculating(seedRow) {
  if (REPRODUCE_ARTICLE) return null;
  const relPath = seedRow.onchain_circulating_path;
  if (!relPath) return null;
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  const payload = loadJson(abs);
  const jp = seedRow.onchain_circulating_jsonpath || 'circulating_supply';
  const v = resolveJsonPath(payload, jp);
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null;
  return { value: v, source: relPath, jsonpath: jp };
}

// Map a value-accrual mechanism string from data/config.json onto the
// Category A/B taxonomy in CLAUDE.md.
//   Cat A = supply-side (buyback, burn, burn-mint) — goes into annual_buyback_usd
//   Cat B = external cashflow yield to native holders (fee-share variants) —
//           goes into annual_holder_yield_usd
// Anything else (mechanism = "none") contributes nothing to Real Capture.
function classifyMechanism(mechanism) {
  if (!mechanism) return 'none';
  if (/(^|-)buyback|burn/.test(mechanism)) return 'A';
  if (/share/.test(mechanism)) return 'B';
  if (mechanism === 'none') return 'none';
  return 'A';  // unknown mechanisms default to Cat A
}

// Verification pill class derived from value_accrual.status. The status
// field in data/config.json is the canonical signal — execution-level
// truth (e.g. "is on-chain holders_revenue actually populating?") is layered
// on top via per-protocol overrides in data/hm/config.json.synthesized_overrides.
function verificationFromStatus(status) {
  switch (status) {
    case 'executing':    return 'proxy';            // DL/external feed agrees
    case 'paused':       return 'onchain_dormant';
    case 'conditional':  return 'governance_stated';
    case 'proposed':     return 'governance_stated';
    case 'unverified':   return 'governance_stated';
    case 'none':         return 'governance_stated';
    default:             return 'governance_stated';
  }
}

// Build a synthetic editorial seed for a token that has no entry in
// data/hm/config.json. Inputs:
//   configEntry  — the row from data/config.json (carries va_mechanism etc.)
//   liveToken    — the row from data/latest.json (price, supply, accrual_annual_est)
//   override     — optional row from data/hm/config.json.synthesized_overrides
// The synthetic seed is the same shape the existing computeProtocol() consumes,
// so we can flow it through that codepath without branching the math.
function synthesizeSeedFromConfig(configEntry, liveToken, override) {
  const va = configEntry.value_accrual || {};
  const status = override?.va_status_override ?? va.status ?? 'none';
  const mechanism = va.mechanism || 'none';

  // Real-capture sourcing:
  //   1) explicit override > 2) live accrual_annual_est > 3) zero
  // Then statuses that mean "money isn't flowing right now" force it to zero.
  let rawAccrual;
  if (override?.accrual_annual_est_override != null) {
    rawAccrual = override.accrual_annual_est_override;
  } else if (Number.isFinite(liveToken?.accrual_annual_est)) {
    rawAccrual = liveToken.accrual_annual_est;
  } else {
    rawAccrual = 0;
  }
  const zeroByStatus = ['paused', 'proposed', 'conditional', 'unverified', 'none'].includes(status);
  const realCapture = (zeroByStatus && override?.accrual_annual_est_override == null) ? 0 : rawAccrual;

  const cat = classifyMechanism(mechanism);
  const annualBuybackUsd     = cat === 'A' ? realCapture : 0;
  const annualHolderYieldUsd = cat === 'B' ? realCapture : 0;

  const verif = override?.verification_override ?? verificationFromStatus(status);
  const noteSnippet = va.notes ? va.notes.slice(0, 240) + (va.notes.length > 240 ? '…' : '') : '';

  return {
    // Prefer defillama_slug as the canonical slug for cross-system lookups
    // (NP config, on-chain feeds, web routing). coingecko_id is fallback for
    // tokens DL doesn't cover (CC, RLB — manual-data protocols).
    slug: configEntry.defillama_slug || configEntry.coingecko_id || configEntry.symbol.toLowerCase(),
    name: configEntry.name,
    symbol: configEntry.symbol,
    config_symbol: configEntry.symbol,
    category: configEntry.category,
    phase: { active: status, notes: noteSnippet },
    // article_* are unused outside reproduce-article mode; we still populate them
    // so any downstream consumer that reads the field doesn't get undefined.
    article_price_usd: liveToken?.price ?? 0,
    article_circulating_tokens: liveToken?.circulating_supply ?? 0,
    unlocks_24mo_tokens: 0,
    unlocks_24mo_notes: 'no editorial schedule — Adj MCap reflects float only',
    emissions_24mo_tokens: 0,
    emissions_24mo_notes: '',
    annual_buyback_usd: annualBuybackUsd,
    annual_buyback_notes: cat === 'A' ? `${mechanism} (${status}): ${noteSnippet}` : '',
    annual_buyback_verification: verif,
    // Phase A synthesized rows: hold the 24mo reflexive math symmetric at zero.
    // Without an editorial unlock schedule, including the buyback subtraction
    // alone produces an asymmetric Adj MCap that goes negative on aggressive-
    // buyback names (e.g. CARDS, PUMP) where annual buyback is large vs float.
    // Phase B fills in unlocks_24mo_tokens per protocol, at which point
    // buyback_24mo_usd should be restored to annualBuybackUsd × 2 so the
    // reflexive supply-compression effect is credited (per CLAUDE.md).
    buyback_24mo_usd: 0,
    annual_holder_yield_usd: annualHolderYieldUsd,
    annual_holder_yield_notes: cat === 'B' ? `${mechanism} (${status}): ${noteSnippet}` : '',
    annual_holder_yield_verification: verif,
    sources: ['DefiLlama (revenue/holders revenue)', 'CoinGecko (price/supply)', 'data/config.json (mechanism/status)'],
    _synthesized: true,
    _override_applied: override ? Object.keys(override).filter((k) => k !== 'comment') : []
  };
}

function computeProtocol(seedRow, latest) {
  const live = findLiveToken(latest, seedRow.config_symbol);

  // Price: live takes precedence unless reproducing the article
  const price = REPRODUCE_ARTICLE
    ? seedRow.article_price_usd
    : (live?.price ?? seedRow.article_price_usd);

  // Circulating supply: on-chain feed > live (CG) > seed fallback.
  const onchainCirc = readOnchainCirculating(seedRow);
  const circulating = REPRODUCE_ARTICLE
    ? seedRow.article_circulating_tokens
    : (onchainCirc?.value ?? live?.circulating_supply ?? seedRow.article_circulating_tokens);
  const circulatingSource = REPRODUCE_ARTICLE
    ? 'article'
    : (onchainCirc ? 'onchain_feed' : (live?.circulating_supply != null ? 'live' : 'seed_fallback'));

  const floatMcapUsd    = price * circulating;
  const unlocks24moUsd  = price * (seedRow.unlocks_24mo_tokens || 0);
  const emissions24moUsd = price * (seedRow.emissions_24mo_tokens || 0);
  const buybacks24moUsd = seedRow.buyback_24mo_usd || 0;

  const adjMcapUsd = floatMcapUsd + unlocks24moUsd + emissions24moUsd - buybacks24moUsd;

  // Annual buyback — prefer on-chain feed when present, fall back to seed.
  const onchainBuyback = readOnchainBuybackAnnualized(seedRow);
  const annualBuybackUsd = onchainBuyback ? onchainBuyback.annual_usd : (seedRow.annual_buyback_usd || 0);
  const annualBuybackVerification = onchainBuyback
    ? (onchainBuyback.feed_verification || 'onchain')
    : (seedRow.annual_buyback_verification || 'governance_stated');
  const annualBuybackSource = onchainBuyback ? onchainBuyback : { source: 'seed' };

  // Holder yield (Cat B) — prefer on-chain feed when present, fall back to seed.
  const onchainHolderYield = readOnchainHolderYieldAnnualized(seedRow);
  const annualHolderYieldUsd = onchainHolderYield
    ? onchainHolderYield.annual_usd
    : (seedRow.annual_holder_yield_usd || 0);
  const annualHolderYieldVerification = onchainHolderYield
    ? (onchainHolderYield.is_dormant ? 'onchain_dormant' : 'onchain')
    : (seedRow.annual_holder_yield_verification || 'governance_stated');
  const annualHolderYieldSource = onchainHolderYield ? onchainHolderYield : { source: 'seed' };

  const realCaptureUsd = annualBuybackUsd + annualHolderYieldUsd;

  const hm = realCaptureUsd > 0 ? adjMcapUsd / realCaptureUsd : Infinity;

  return {
    slug: seedRow.slug,
    name: seedRow.name,
    symbol: seedRow.symbol,
    category: seedRow.category,
    image: live?.image ?? null,
    // Live revenue (DefiLlama) — dynamic, refreshes hourly. Used by SKY's
    // TMF waterfall and available generally.
    revenue_30d: live?.revenue_30d ?? null,
    revenue_1y: live?.revenue_1y ?? null,
    holders_revenue_30d: live?.holders_revenue_30d ?? null,
    // Optional per-protocol revenue-waterfall config (currently SKY only).
    tmf_waterfall: seedRow.tmf_waterfall ?? null,
    phase: seedRow.phase,
    price_usd: price,
    price_source: REPRODUCE_ARTICLE ? 'article' : (live?.price != null ? 'live' : 'seed_fallback'),
    circulating_supply_tokens: circulating,
    circulating_supply_source: circulatingSource,
    float_mcap_usd: floatMcapUsd,
    unlocks_24mo_tokens: seedRow.unlocks_24mo_tokens || 0,
    unlocks_24mo_usd: unlocks24moUsd,
    unlocks_24mo_notes: seedRow.unlocks_24mo_notes,
    emissions_24mo_tokens: seedRow.emissions_24mo_tokens || 0,
    emissions_24mo_usd: emissions24moUsd,
    emissions_24mo_notes: seedRow.emissions_24mo_notes,
    buybacks_24mo_usd: buybacks24moUsd,
    buybacks_24mo_notes: seedRow.annual_buyback_notes,
    adj_mcap_usd: adjMcapUsd,
    annual_buyback_usd: annualBuybackUsd,
    annual_buyback_verification: annualBuybackVerification,
    annual_buyback_source: annualBuybackSource,
    annual_buyback_seed_usd: seedRow.annual_buyback_usd || 0,
    annual_holder_yield_usd: annualHolderYieldUsd,
    annual_holder_yield_notes: seedRow.annual_holder_yield_notes,
    annual_holder_yield_verification: annualHolderYieldVerification,
    annual_holder_yield_source: annualHolderYieldSource,
    annual_holder_yield_seed_usd: seedRow.annual_holder_yield_usd || 0,
    real_capture_usd: realCaptureUsd,
    hm,
    hm_band: hmBand(hm),
    sources: seedRow.sources,
    live_data_present: live !== null,
    synthesized: Boolean(seedRow._synthesized),
    override_fields: seedRow._override_applied || []
  };
}

function renderBreakdownTable(p) {
  const r = (label, value, notes) =>
    `| ${label} | ${value} | ${notes ?? ''} |`;
  const lines = [
    `### ${p.name} (${p.symbol}) — HM ${fmtMultiple(p.hm)} _(${p.hm_band})_`,
    '',
    `Phase: \`${p.phase.active}\` — ${p.phase.notes ?? ''}`,
    '',
    `| # | Metric | Value | Notes |`,
    `|---|---|---|---|`,
    `| 1 | Token price | $${p.price_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })} | source: ${p.price_source} |`,
    `| 2 | Current float market cap | ${fmtUsd(p.float_mcap_usd)} | ${Math.round(p.circulating_supply_tokens).toLocaleString()} ${p.symbol} × $${p.price_usd} (circ source: ${p.circulating_supply_source}) |`,
    `| 3 | + 24mo unlocks | ${fmtUsdSigned(p.unlocks_24mo_usd)} | ${p.unlocks_24mo_notes ?? ''} |`,
    `| 4 | + 24mo emissions | ${fmtUsdSigned(p.emissions_24mo_usd)} | ${p.emissions_24mo_notes ?? ''} |`,
    `| 5 | − 24mo buybacks | ${fmtUsdSigned(-p.buybacks_24mo_usd)} | ${p.buybacks_24mo_notes ?? ''} (verification: ${p.annual_buyback_verification}) |`,
    `| 6 | **Adjusted MCap** | **${fmtUsd(p.adj_mcap_usd)}** | Lines 2 + 3 + 4 − 5 |`,
    `| 7 | Annual buyback (Category A) | ${fmtUsd(p.annual_buyback_usd)} | ${p.annual_buyback_source?.source === 'onchain_feed' ? `last ${p.annual_buyback_source.days_used}d annualized — verification: onchain` : `verification: ${p.annual_buyback_verification}`} |`,
    `| 8 | Annual external cashflow yield to ${p.symbol} (Category B) | ${fmtUsd(p.annual_holder_yield_usd)} | ${p.annual_holder_yield_notes ?? ''} (verification: ${p.annual_holder_yield_verification}) |`,
    `| 9 | **Total Real Capture** | **${fmtUsd(p.real_capture_usd)}/yr** | Lines 7 + 8 |`,
    `| 10 | **Holder Multiple (HM)** | **${fmtMultiple(p.hm)}** | Line 6 ÷ Line 9 |`,
    ''
  ];

  // Lifetime annualization comparison — only when on-chain feed gives us one.
  const bs = p.annual_buyback_source;
  if (bs && bs.lifetime_annual_usd != null && bs.lifetime_annual_usd > 0) {
    const trendSign = bs.rate_vs_lifetime_pct >= 0 ? '+' : '';
    const trendWord = bs.rate_vs_lifetime_pct >= 0 ? 'above' : 'below';
    lines.push(
      `**Buyback rate lens:** recent ${bs.days_used}d annualized = **${fmtUsd(bs.annual_usd)}/yr** (HM input). Lifetime annualized (${bs.lifetime_days}d, cumulative ${fmtUsd(bs.lifetime_cumulative_usd)}) = **${fmtUsd(bs.lifetime_annual_usd)}/yr**. Recent rate is **${trendSign}${bs.rate_vs_lifetime_pct.toFixed(1)}%** ${trendWord} lifetime average.`,
      ''
    );
  }

  lines.push(`[Sources: ${(p.sources || []).join(', ')}]`);
  lines.push('');
  return lines.join('\n');
}

function renderSummaryTable(snapshot) {
  const lines = [
    `| Protocol | Phase | Adj MCap | Real Capture | HM | Band |`,
    `|---|---|---|---|---|---|`
  ];
  for (const p of snapshot.protocols) {
    lines.push(
      `| ${p.name} (${p.symbol}) | \`${p.phase.active}\` | ${fmtUsd(p.adj_mcap_usd)} | ${fmtUsd(p.real_capture_usd)}/yr | **${fmtMultiple(p.hm)}** | ${p.hm_band} |`
    );
  }
  return lines.join('\n');
}

function renderReport(snapshot) {
  const mode = snapshot.mode === 'reproduce-article' ? ' (article-reproduction mode)' : '';
  return [
    `# Holder Multiple — Cohort Snapshot${mode}`,
    '',
    `**Generated:** ${snapshot.generated_at}`,
    `**As-of:** ${snapshot.as_of}`,
    `**Mode:** ${snapshot.mode}`,
    '',
    '## Cohort summary',
    '',
    renderSummaryTable(snapshot),
    '',
    '## Per-protocol breakdown',
    '',
    snapshot.protocols.map(renderBreakdownTable).join('\n---\n\n'),
    '## Methodology',
    '',
    '- `Adjusted MCap = float_mcap + 24mo_unlocks + 24mo_emissions − 24mo_buybacks`',
    '- `Total Real Capture = annual_buyback_usd + annual_holder_yield_usd` (Categories A + B; Category C token-denominated emissions are excluded)',
    '- `HM = Adjusted MCap / Total Real Capture`',
    '',
    'Bands per CLAUDE.md HM Interpretation Bands:',
    '',
    '- **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative',
    '',
    'Inputs sourced from `data/latest.json` (live DL+CG) for price/supply and from `data/hm/config.json` (editorial seed) for unlock schedules, buyback rates, and Category B yields. Buyback execution flagged with `verification` per the Buyback Quality Framework. v1 is lenient — `governance_stated` and `proxy` rows are accepted; `onchain` upgrade happens protocol-by-protocol.',
    ''
  ].join('\n');
}

function main() {
  const seed = loadJson(SEED_PATH);
  const config = loadJson(CONFIG_PATH);
  const latest = fs.existsSync(LATEST_PATH) ? loadJson(LATEST_PATH) : { tokens: [] };

  const generatedAt = new Date().toISOString();
  const asOf = generatedAt.slice(0, 10);

  // Index editorial seeds by config_symbol so we can match config.json entries.
  const seedBySymbol = new Map();
  for (const row of Object.values(seed.protocols)) {
    seedBySymbol.set(row.config_symbol, row);
  }
  const overrides = seed.synthesized_overrides || {};

  let protocols;
  if (REPRODUCE_ARTICLE) {
    // Reproduce-article mode only runs the editorial-seeded tokens — synthesized
    // rows have no article_* anchor so they'd produce noise.
    protocols = Object.values(seed.protocols).map((row) => computeProtocol(row, latest));
  } else {
    // Live mode iterates the full cohort from data/config.json. Tokens with an
    // editorial seed use that; tokens without get a synthesized seed derived
    // from data/latest.json (forward run-rate primary) + data/config.json
    // (mechanism / status / notes) + any per-symbol override.
    protocols = [];
    for (const cfg of config.tokens) {
      if (SKIP_SYMBOLS.has(cfg.symbol)) continue;
      const editorial = seedBySymbol.get(cfg.symbol);
      if (editorial) {
        protocols.push(computeProtocol(editorial, latest));
      } else {
        const live = findLiveToken(latest, cfg.symbol);
        if (!live) continue;  // no live data yet — fetch-data hasn't seen it
        const synthSeed = synthesizeSeedFromConfig(cfg, live, overrides[cfg.symbol]);
        protocols.push(computeProtocol(synthSeed, latest));
      }
    }
  }

  const snapshot = {
    schema_version: 1,
    generated_at: generatedAt,
    as_of: asOf,
    mode: REPRODUCE_ARTICLE ? 'reproduce-article' : 'live',
    latest_data_as_of: latest.updated_at || null,
    protocols
  };

  let snapPath, reportPath, snapLatest, reportLatest;
  if (!CHECK) {
    ensureDir(SNAPSHOTS_DIR);
    ensureDir(REPORTS_DIR);

    snapPath   = path.join(SNAPSHOTS_DIR, `${asOf}.json`);
    snapLatest = path.join(SNAPSHOTS_DIR, 'latest.json');
    reportPath   = path.join(REPORTS_DIR, `${asOf}.md`);
    reportLatest = path.join(REPORTS_DIR, 'latest.md');

    fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2));
    fs.writeFileSync(snapLatest, JSON.stringify(snapshot, null, 2));

    const report = renderReport(snapshot);
    fs.writeFileSync(reportPath, report);
    fs.writeFileSync(reportLatest, report);
  }

  // Console summary
  console.log(`\nHM snapshot — mode: ${snapshot.mode}${CHECK ? ' (check — nothing written)' : ''}`);
  console.log(`Generated: ${generatedAt}`);
  if (snapshot.latest_data_as_of) {
    console.log(`Live data (data/latest.json) as of: ${snapshot.latest_data_as_of}`);
  } else {
    console.log(`No data/latest.json found — used seed fallbacks.`);
  }
  console.log('');
  const colWidth = { name: 22, phase: 12, hm: 9, band: 14 };
  console.log(
    'Protocol'.padEnd(colWidth.name) +
    'Phase'.padEnd(colWidth.phase) +
    'HM'.padEnd(colWidth.hm) +
    'Band'.padEnd(colWidth.band)
  );
  console.log('-'.repeat(colWidth.name + colWidth.phase + colWidth.hm + colWidth.band));
  for (const p of snapshot.protocols) {
    console.log(
      `${p.name} (${p.symbol})`.padEnd(colWidth.name) +
      p.phase.active.padEnd(colWidth.phase) +
      fmtMultiple(p.hm).padEnd(colWidth.hm) +
      p.hm_band.padEnd(colWidth.band)
    );
  }
  console.log('');

  if (CHECK) {
    let failed = false;
    for (const [symbol, expected] of Object.entries(ARTICLE_EXPECTED_HM)) {
      const p = snapshot.protocols.find((x) => x.symbol === symbol);
      const actual = p && isFinite(p.hm) ? Number(p.hm.toFixed(1)) : null;
      const ok = actual === expected;
      if (!ok) failed = true;
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${symbol}: expected ${expected}× — got ${p ? fmtMultiple(p.hm) : 'missing from snapshot'}`);
    }
    if (failed) {
      console.error('\n--check FAILED: reproduce-article output deviates from the published article.');
      console.error('Either a compute-layer change broke the HM formula, or the seed\'s article_*');
      console.error('reference values changed without updating ARTICLE_EXPECTED_HM.');
      process.exitCode = 1;
    } else {
      console.log('\n--check passed: article HM values reproduced exactly.');
    }
    return;
  }

  console.log(`Wrote: ${path.relative(ROOT, snapPath)}`);
  console.log(`Wrote: ${path.relative(ROOT, reportPath)}`);
  console.log(`Wrote: ${path.relative(ROOT, snapLatest)} (copy)`);
  console.log(`Wrote: ${path.relative(ROOT, reportLatest)} (copy)`);
}

main();
