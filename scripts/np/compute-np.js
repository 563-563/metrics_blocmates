#!/usr/bin/env node
/**
 * Net Pressure (TP) pipeline.
 *
 *   Net Pressure = (Unlocks + Treasury Sells)
 *                − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
 *
 * Positive = supply hitting the market faster than the protocol absorbs it.
 * Negative = protocol is a net buyer of its own token.
 *
 * Reads daily flow components from on-chain feeds + the deterministic unlock
 * schedule. Emits per-protocol daily series, time-window roll-ups, and a
 * markdown report. v1 supports HYPE; AAVE/SKY/LIT will be added as their
 * on-chain adapters land.
 *
 * Outputs:
 *   data/np/snapshots/<date>.json   machine-readable, all protocols + daily series
 *   data/np/snapshots/latest.json   copy of most recent
 *   data/np/reports/<date>.md       markdown — roll-ups + recent daily series + components
 *   data/np/reports/latest.md       copy of most recent
 *
 * Run:
 *   node scripts/np/compute-np.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SEED_PATH      = path.join(ROOT, 'data', 'np', 'config.json');
const LATEST_PATH    = path.join(ROOT, 'data', 'latest.json');
const SNAPSHOTS_DIR  = path.join(ROOT, 'data', 'np', 'snapshots');
const REPORTS_DIR    = path.join(ROOT, 'data', 'np', 'reports');

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fmtTokens(n) {
  if (!Number.isFinite(n) || n === 0) return '0';
  const abs = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${abs.toFixed(0)}`;
}

function fmtTokensSigned(n) {
  if (n === 0 || !Number.isFinite(n)) return '0';
  return (n > 0 ? '+' : '') + fmtTokens(n);
}

function fmtUsd(n) {
  if (!Number.isFinite(n) || n === 0) return '$0';
  const abs = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(2)}`;
}

function fmtUsdSigned(n) {
  if (n === 0 || !Number.isFinite(n)) return '$0';
  return (n > 0 ? '+' : '') + fmtUsd(n);
}

// Build a date → price map from a daily price file (currently ASXN OHLCV-shaped).
function loadDailyPriceMap(relPath) {
  if (!relPath) return new Map();
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return new Map();
  const rows = loadJson(abs);
  if (!Array.isArray(rows)) return new Map();
  const m = new Map();
  for (const r of rows) {
    const date = r.date || r.day;
    if (!date) continue;
    // ASXN-normalised: { date, price_usd } — fall back to close/price/open if shape varies.
    const px = r.price_usd ?? r.close ?? r.price ?? r.open ?? null;
    if (px != null && Number.isFinite(Number(px))) m.set(date, Number(px));
  }
  return m;
}

// Build a date → tokens map from a daily-series JSON file.
function loadDailyMap(seedSource) {
  if (!seedSource || seedSource.type === 'none') return new Map();
  if (seedSource.type !== 'daily_series' && seedSource.type !== 'daily_delta') return new Map();
  const abs = path.join(ROOT, seedSource.path);
  if (!fs.existsSync(abs)) return new Map();
  const rows = loadJson(abs);
  if (!Array.isArray(rows)) return new Map();
  const field = seedSource.amount_field || 'amount_tokens';
  const m = new Map();
  for (const r of rows) {
    if (!r.date) continue;
    const v = Number(r[field]);
    if (!Number.isFinite(v)) continue;
    m.set(r.date, v);
  }
  return m;
}

// Generate daily unlock map from a tokenomics module exposing generateUnlockSchedule.
function loadUnlockMap(seedSource) {
  if (!seedSource || seedSource.type !== 'deterministic_schedule') return new Map();
  const abs = path.join(ROOT, seedSource.module);
  const mod = require(abs);
  if (typeof mod.generateUnlockSchedule !== 'function') return new Map();
  const rows = mod.generateUnlockSchedule(new Date());
  const m = new Map();
  for (const r of rows) {
    const prev = m.get(r.unlock_date) || 0;
    m.set(r.unlock_date, prev + Number(r.amount_tokens));
  }
  return m;
}

function daysAgoIso(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Build the daily series for a protocol — one row per UTC date over the
// historical window we care about. Future-dated unlock entries are kept
// (forward-looking projection) but flagged so roll-ups ignore them.
//
// USD math uses per-day price when a daily_price_path is configured AND the
// date has a price. Falls back to today's live price for dates where the
// series doesn't cover (e.g. future-dated unlocks, or days before the price
// feed begins). Each row carries `price_source_for_day` so the report can
// flag rows that used the fallback.
function buildDailySeries(seed, priceUsdToday) {
  const unlocks = loadUnlockMap(seed.sources.unlocks);
  const buybacks = loadDailyMap(seed.sources.buybacks);
  const treasuryAcc = loadDailyMap(seed.sources.treasury_accumulation);
  const treasurySells = loadDailyMap(seed.sources.treasury_sells);
  const burns = loadDailyMap(seed.sources.burns);
  const staking = loadDailyMap(seed.sources.net_staking_lockups);
  const dailyPrice = loadDailyPriceMap(seed.daily_price_path);

  // Union of all dates from every component map.
  const dateSet = new Set();
  for (const m of [unlocks, buybacks, treasuryAcc, treasurySells, burns, staking]) {
    for (const k of m.keys()) dateSet.add(k);
  }

  const today = todayIso();
  const sortedDates = Array.from(dateSet).sort();

  return sortedDates.map((date) => {
    const u  = unlocks.get(date) || 0;
    const b  = buybacks.get(date) || 0;
    const ts = treasurySells.get(date) || 0;
    const bn = burns.get(date) || 0;
    const ta = treasuryAcc.get(date) || 0;
    const ns = staking.get(date) || 0;

    const sinkTa = Math.max(ta, 0);
    const sinkNs = Math.max(ns, 0);
    const net = (u + ts) - (b + bn + sinkTa + sinkNs);

    const dayPrice = dailyPrice.get(date);
    const priceForUsd = dayPrice != null ? dayPrice : priceUsdToday;
    const priceSource = dayPrice != null ? 'daily_series' : 'today_fallback';

    return {
      date,
      is_future: date > today,
      unlocks_tokens: u,
      treasury_sells_tokens: ts,
      buybacks_tokens: b,
      burns_tokens: bn,
      treasury_accumulation_tokens: ta,
      net_staking_lockups_tokens: ns,
      net_pressure_tokens: net,
      price_usd_for_day: priceForUsd,
      price_source_for_day: priceSource,
      net_pressure_usd: net * priceForUsd
    };
  });
}

function rollupWindow(series, windowDays, buybackDates) {
  const today = todayIso();
  const cutoff = daysAgoIso(windowDays);
  const slice = series.filter((r) => !r.is_future && r.date > cutoff && r.date <= today);
  const sum = {
    unlocks_tokens: 0,
    treasury_sells_tokens: 0,
    buybacks_tokens: 0,
    burns_tokens: 0,
    treasury_accumulation_tokens: 0,
    net_staking_lockups_tokens: 0,
    net_pressure_tokens: 0,
    // Per-day USD components — summed so the rollup reflects time-weighted price.
    unlocks_usd: 0,
    buybacks_usd: 0,
    net_pressure_usd_perday: 0
  };
  let daysWithDailyPrice = 0;
  for (const r of slice) {
    sum.unlocks_tokens += r.unlocks_tokens;
    sum.treasury_sells_tokens += r.treasury_sells_tokens;
    sum.buybacks_tokens += r.buybacks_tokens;
    sum.burns_tokens += r.burns_tokens;
    sum.treasury_accumulation_tokens += r.treasury_accumulation_tokens;
    sum.net_staking_lockups_tokens += r.net_staking_lockups_tokens;
    sum.net_pressure_tokens += r.net_pressure_tokens;
    sum.unlocks_usd += r.unlocks_tokens * r.price_usd_for_day;
    sum.buybacks_usd += r.buybacks_tokens * r.price_usd_for_day;
    sum.net_pressure_usd_perday += r.net_pressure_usd;
    if (r.price_source_for_day === 'daily_series') daysWithDailyPrice++;
  }
  // Buyback coverage — how many of the windowDays have an on-chain buyback observation.
  let buybackCoverageDays = 0;
  for (let i = 0; i < windowDays; i++) {
    const d = daysAgoIso(i);
    if (d <= today && buybackDates.has(d)) buybackCoverageDays++;
  }
  const coveragePct = windowDays > 0 ? buybackCoverageDays / windowDays : 0;
  const pricePct = slice.length > 0 ? daysWithDailyPrice / slice.length : 0;
  return {
    window_days: windowDays,
    days_observed: slice.length,
    buyback_coverage_days: buybackCoverageDays,
    buyback_coverage_pct: coveragePct,
    coverage_complete: coveragePct >= 0.8,
    daily_price_coverage_pct: pricePct,
    daily_price_complete: pricePct >= 0.8,
    ...sum
  };
}

function staticReference(seed) {
  const out = {};
  const sources = seed.static_reference_sources || {};
  for (const [key, relPath] of Object.entries(sources)) {
    const abs = path.join(ROOT, relPath);
    if (!fs.existsSync(abs)) continue;
    const rows = loadJson(abs);
    if (!Array.isArray(rows) || rows.length === 0) continue;
    const latest = rows.slice().sort((a, b) => a.date.localeCompare(b.date)).pop();
    out[key] = latest;
  }
  return out;
}

function findLiveToken(latest, symbol) {
  return (latest.tokens || []).find((t) => t.symbol === symbol) || null;
}

function computeProtocol(seedRow, latest) {
  const live = findLiveToken(latest, seedRow.config_symbol);
  const price = live?.price ?? 0;

  const series = buildDailySeries(seedRow, price);
  const buybackDates = loadDailyMap(seedRow.sources.buybacks);
  const windowDefs = [
    { key: '24h', days: 1 },
    { key: '7d',  days: 7 },
    { key: '30d', days: 30 },
    { key: '90d', days: 90 }
  ];
  const rollups = {};
  for (const { key, days } of windowDefs) {
    const r = rollupWindow(series, days, buybackDates);
    // Prefer the time-weighted per-day USD sum; fall back to tokens × today
    // when no daily price was available for any day in the window.
    const usdPreferred = r.daily_price_coverage_pct > 0
      ? r.net_pressure_usd_perday
      : r.net_pressure_tokens * price;
    rollups[key] = {
      ...r,
      net_pressure_usd: usdPreferred,
      net_pressure_usd_method: r.daily_price_coverage_pct > 0 ? 'per_day_price' : 'today_price'
    };
  }

  return {
    slug: seedRow.slug,
    name: seedRow.name,
    symbol: seedRow.symbol,
    price_usd: price,
    static_reference: staticReference(seedRow),
    components: seedRow.sources,  // pass-through for the report
    rollups,
    daily: series
  };
}

// ───────────────────────── reporting ─────────────────────────

function rollupRow(label, r, price, totalSupply) {
  const np = r.net_pressure_tokens;
  const npUsd = r.net_pressure_usd;
  const npPct = totalSupply > 0 ? np / totalSupply : 0;
  return {
    label,
    days_observed: r.days_observed,
    net_pressure_tokens: np,
    net_pressure_usd: npUsd,
    net_pressure_pct_supply: npPct,
    unlocks: r.unlocks_tokens,
    buybacks: r.buybacks_tokens,
    treasury_sells: r.treasury_sells_tokens,
    burns: r.burns_tokens,
    treasury_acc: r.treasury_accumulation_tokens,
    staking_lockup: r.net_staking_lockups_tokens
  };
}

function renderProtocolReport(p) {
  const totalSupply = (() => {
    const s = p.static_reference?.circulating_supply;
    return s?.total_supply || s?.max_supply || 0;
  })();
  const circulating = p.static_reference?.circulating_supply?.circulating_supply || 0;
  const afBalance = p.static_reference?.af_balance?.amount_tokens || 0;
  const totalStaked = p.static_reference?.total_staked?.total_staked_tokens || 0;

  const lines = [];
  lines.push(`## ${p.name} (${p.symbol})`);
  lines.push('');
  lines.push(`**Price:** $${p.price_usd.toFixed(2)}    **Circulating:** ${fmtTokens(circulating)} ${p.symbol}    **AF balance:** ${fmtTokens(afBalance)} ${p.symbol}    **Total staked:** ${fmtTokens(totalStaked)} ${p.symbol}${totalStaked > 0 && circulating > 0 ? ` (${((totalStaked / circulating) * 100).toFixed(1)}% of circ)` : ''}`);
  lines.push('');

  // Rollup table
  lines.push('### Net Pressure roll-ups');
  lines.push('');
  lines.push('| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |');
  lines.push('|---|---|---|---|---|---|---|---|');
  for (const w of ['24h', '7d', '30d', '90d']) {
    const r = p.rollups[w];
    if (!r) continue;
    const row = rollupRow(w, r, p.price_usd, totalSupply);
    const arrow = row.net_pressure_tokens === 0 ? '·' : (row.net_pressure_tokens > 0 ? '🔴' : '🟢');
    const coverage = `${r.buyback_coverage_days}/${r.window_days}d`;
    const coverageBadge = r.coverage_complete ? coverage : `⚠ ${coverage} partial`;
    const usdMethod = r.net_pressure_usd_method === 'per_day_price'
      ? `per-day (${Math.round(r.daily_price_coverage_pct * 100)}%)`
      : 'today @ $' + p.price_usd.toFixed(2);
    lines.push(`| ${w} | ${coverageBadge} | ${fmtTokens(row.unlocks)} | ${fmtTokens(row.buybacks)} | ${arrow} ${fmtTokensSigned(row.net_pressure_tokens)} ${p.symbol} | ${fmtUsdSigned(row.net_pressure_usd)} | ${usdMethod} | ${(row.net_pressure_pct_supply * 100).toFixed(4)}% |`);
  }
  lines.push('');
  lines.push('Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.');
  lines.push('');

  // Component coverage
  lines.push('### Component coverage');
  lines.push('');
  lines.push('| Component | Source | Verification | Note |');
  lines.push('|---|---|---|---|');
  for (const [key, s] of Object.entries(p.components || {})) {
    const src = s.type === 'none' ? '—' : s.path || s.module || s.type;
    lines.push(`| ${key} | ${src} | ${s.verification} | ${s.note || ''} |`);
  }
  lines.push('');

  // Recent daily series (last 14 historical days)
  const today = todayIso();
  const recent = (p.daily || [])
    .filter((r) => !r.is_future && r.date <= today)
    .slice(-14);
  if (recent.length > 0) {
    lines.push(`### Recent daily series (last ${recent.length} days)`);
    lines.push('');
    lines.push(`| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |`);
    lines.push(`|---|---|---|---|---|`);
    for (const r of recent) {
      lines.push(`| ${r.date} | ${fmtTokens(r.unlocks_tokens)} | ${fmtTokens(r.buybacks_tokens)} | ${fmtTokensSigned(r.net_pressure_tokens)} | ${fmtUsdSigned(r.net_pressure_usd)} |`);
    }
    lines.push('');
  }

  // Forward-looking unlocks
  const upcoming = (p.daily || [])
    .filter((r) => r.is_future && r.unlocks_tokens > 0)
    .slice(0, 8);
  if (upcoming.length > 0) {
    lines.push(`### Next ${upcoming.length} projected unlocks`);
    lines.push('');
    lines.push(`| Date | Unlocks (tokens) | Unlocks @ today's price |`);
    lines.push(`|---|---|---|`);
    for (const r of upcoming) {
      lines.push(`| ${r.date} | ${fmtTokens(r.unlocks_tokens)} | ${fmtUsd(r.unlocks_tokens * p.price_usd)} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function renderReport(snapshot) {
  const lines = [];
  lines.push(`# Net Pressure (TP) — Cohort Snapshot`);
  lines.push('');
  lines.push(`**Generated:** ${snapshot.generated_at}`);
  lines.push(`**As-of:** ${snapshot.as_of}`);
  lines.push('');
  lines.push('Formula:');
  lines.push('');
  lines.push('```');
  lines.push('Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)');
  lines.push('```');
  lines.push('');
  lines.push('Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.');
  lines.push('');
  for (const p of snapshot.protocols) {
    lines.push(renderProtocolReport(p));
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  const seed = loadJson(SEED_PATH);
  const latest = loadJsonOrDefault(LATEST_PATH, { tokens: [] });

  const generatedAt = new Date().toISOString();
  const asOf = generatedAt.slice(0, 10);

  const protocols = Object.values(seed.protocols).map((row) => computeProtocol(row, latest));

  const snapshot = {
    schema_version: 1,
    generated_at: generatedAt,
    as_of: asOf,
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
  console.log(`\nTP snapshot — ${asOf}`);
  console.log('');
  for (const p of snapshot.protocols) {
    console.log(`${p.name} (${p.symbol})  price=$${p.price_usd.toFixed(2)}`);
    for (const w of ['24h', '7d', '30d', '90d']) {
      const r = p.rollups[w];
      if (!r) continue;
      const arrow = r.net_pressure_tokens === 0 ? ' ' : (r.net_pressure_tokens > 0 ? '↑' : '↓');
      const cov = r.coverage_complete ? '  ' : '⚠ ';
      console.log(`  ${cov}${w.padEnd(5)} (bb ${r.buyback_coverage_days}/${r.window_days}d)  NP ${arrow} ${fmtTokensSigned(r.net_pressure_tokens).padStart(10)} ${p.symbol}  /  ${fmtUsdSigned(r.net_pressure_usd)}`);
    }
    console.log('');
  }
  console.log(`Wrote: ${path.relative(ROOT, snapPath)}`);
  console.log(`Wrote: ${path.relative(ROOT, reportPath)}`);
}

main();
