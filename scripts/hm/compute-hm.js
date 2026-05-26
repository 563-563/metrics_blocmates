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
 *
 * Run:
 *   node scripts/hm/compute-hm.js                  # live mode
 *   node scripts/hm/compute-hm.js --reproduce-article
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LATEST_PATH    = path.join(ROOT, 'data', 'latest.json');
const SEED_PATH      = path.join(ROOT, 'data', 'hm', 'config.json');
const SNAPSHOTS_DIR  = path.join(ROOT, 'data', 'hm', 'snapshots');
const REPORTS_DIR    = path.join(ROOT, 'data', 'hm', 'reports');

const args = new Set(process.argv.slice(2));
const REPRODUCE_ARTICLE = args.has('--reproduce-article');

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

  const window = seedRow.onchain_buyback_annualize_days || 7;
  const minDays = seedRow.onchain_buyback_min_days || 3;
  if (whole.length < minDays) return null;

  const slice = whole.slice(-window);
  const sumUsd = slice.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const annualUsd = (sumUsd / slice.length) * 365;

  // Lifetime annualized — informational lens alongside the 30d primary.
  const lifetimeSumUsd = whole.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
  const firstDay = whole[0]?.date;
  const lastDay  = whole[whole.length - 1]?.date;
  let lifetimeAnnualUsd = null;
  let lifetimeDays = null;
  if (firstDay && lastDay) {
    lifetimeDays = Math.max(1, Math.round((new Date(lastDay) - new Date(firstDay)) / (24 * 60 * 60 * 1000)) + 1);
    lifetimeAnnualUsd = (lifetimeSumUsd / lifetimeDays) * 365;
  }

  return {
    annual_usd: annualUsd,
    days_used: slice.length,
    window_requested: window,
    source: 'onchain_feed',
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
  const annualBuybackVerification = onchainBuyback ? 'onchain' : (seedRow.annual_buyback_verification || 'governance_stated');
  const annualBuybackSource = onchainBuyback ? onchainBuyback : { source: 'seed' };

  const annualHolderYieldUsd = seedRow.annual_holder_yield_usd || 0;
  const realCaptureUsd       = annualBuybackUsd + annualHolderYieldUsd;

  const hm = realCaptureUsd > 0 ? adjMcapUsd / realCaptureUsd : Infinity;

  return {
    slug: seedRow.slug,
    name: seedRow.name,
    symbol: seedRow.symbol,
    category: seedRow.category,
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
    annual_holder_yield_verification: seedRow.annual_holder_yield_verification,
    real_capture_usd: realCaptureUsd,
    hm,
    hm_band: hmBand(hm),
    sources: seedRow.sources,
    live_data_present: live !== null
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
  const latest = fs.existsSync(LATEST_PATH) ? loadJson(LATEST_PATH) : { tokens: [] };

  const generatedAt = new Date().toISOString();
  const asOf = generatedAt.slice(0, 10);

  const protocols = Object.values(seed.protocols).map((row) => computeProtocol(row, latest));

  const snapshot = {
    schema_version: 1,
    generated_at: generatedAt,
    as_of: asOf,
    mode: REPRODUCE_ARTICLE ? 'reproduce-article' : 'live',
    latest_data_as_of: latest.updated_at || null,
    protocols
  };

  ensureDir(SNAPSHOTS_DIR);
  ensureDir(REPORTS_DIR);

  const snapPath   = path.join(SNAPSHOTS_DIR, `${asOf}.json`);
  const snapLatest = path.join(SNAPSHOTS_DIR, 'latest.json');
  const reportPath   = path.join(REPORTS_DIR, `${asOf}.md`);
  const reportLatest = path.join(REPORTS_DIR, 'latest.md');

  fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2));
  fs.writeFileSync(snapLatest, JSON.stringify(snapshot, null, 2));

  const report = renderReport(snapshot);
  fs.writeFileSync(reportPath, report);
  fs.writeFileSync(reportLatest, report);

  // Console summary
  console.log(`\nHM snapshot — mode: ${snapshot.mode}`);
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
  console.log(`Wrote: ${path.relative(ROOT, snapPath)}`);
  console.log(`Wrote: ${path.relative(ROOT, reportPath)}`);
  console.log(`Wrote: ${path.relative(ROOT, snapLatest)} (copy)`);
  console.log(`Wrote: ${path.relative(ROOT, reportLatest)} (copy)`);
}

main();
