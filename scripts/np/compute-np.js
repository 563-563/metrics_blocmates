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
//
// Modes:
//   daily_series / daily_delta — pre-computed per-day value from `amount_field`
//   daily_snapshot_diff        — derive day-over-day delta from a running-total
//                                snapshot field. ROBUST against intra-day cron
//                                re-runs that would corrupt a pre-stored delta
//                                (e.g. fetch-staking writes hourly and would
//                                otherwise overwrite the day's delta).
function loadDailyMap(seedSource) {
  if (!seedSource || seedSource.type === 'none') return new Map();
  if (
    seedSource.type !== 'daily_series' &&
    seedSource.type !== 'daily_delta' &&
    seedSource.type !== 'daily_snapshot_diff'
  ) return new Map();
  const abs = path.join(ROOT, seedSource.path);
  if (!fs.existsSync(abs)) return new Map();
  const rows = loadJson(abs);
  if (!Array.isArray(rows)) return new Map();
  const m = new Map();

  if (seedSource.type === 'daily_snapshot_diff') {
    const totalField = seedSource.total_field || 'total_staked_tokens';
    const sorted = rows
      .filter((r) => r.date && Number.isFinite(Number(r[totalField])))
      .sort((a, b) => a.date.localeCompare(b.date));
    for (let i = 1; i < sorted.length; i++) {
      const diff = Number(sorted[i][totalField]) - Number(sorted[i - 1][totalField]);
      m.set(sorted[i].date, diff);
    }
    return m;
  }

  const field = seedSource.amount_field || 'amount_tokens';
  for (const r of rows) {
    if (!r.date) continue;
    const v = Number(r[field]);
    if (!Number.isFinite(v)) continue;
    m.set(r.date, v);
  }
  return m;
}

// Generate daily unlock map from a tokenomics module exposing generateUnlockSchedule.
// Default sell-probability by recipient type (truepressure SCHEMA defaults).
// Net Pressure weights scheduled unlocks by how likely the recipient is to
// actually sell — otherwise large team/vesting tranches that are mostly
// re-staked drown out the real signal (the HYPE problem).
// NOTE: this weighting applies ONLY to TP. HM's Adjusted MCap uses gross
// unlocks (future supply exists whether sold or not).
const DEFAULT_SELL_PROB = {
  team: 0.10,
  foundation: 0.30,
  seed: 0.80,
  series_a: 0.65,
  series_b: 0.65,
  public_sale: 0.20,
  airdrop: 0.20,
  advisor: 0.65
};
const FALLBACK_SELL_PROB = 0.30;

// Expand a generic schedule_file event list into a flat array of per-day
// unlock entries with recipient_type carried through for sell-probability
// weighting.
//
// Event types:
//   cliff   — single-day release: { date, amount_tokens }
//   linear  — straight-line release over a window: { start_date, end_date,
//             total_amount_tokens } → amount/days per day, inclusive of both
//             endpoints
//   monthly — repeating release on day_of_month: { start_date, end_date,
//             amount_tokens_per_event, day_of_month }
function expandScheduleEvents(events) {
  const out = [];
  for (const ev of events || []) {
    const rtype = ev.recipient_type;
    if (ev.type === 'cliff') {
      out.push({ date: ev.date, amount_tokens: Number(ev.amount_tokens) || 0, recipient_type: rtype });
    } else if (ev.type === 'linear') {
      const start = new Date(ev.start_date + 'T00:00:00Z');
      const end   = new Date(ev.end_date   + 'T00:00:00Z');
      const days  = Math.round((end - start) / 86400000) + 1;
      if (days <= 0) continue;
      const perDay = (Number(ev.total_amount_tokens) || 0) / days;
      for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setUTCDate(d.getUTCDate() + i);
        out.push({ date: d.toISOString().slice(0, 10), amount_tokens: perDay, recipient_type: rtype });
      }
    } else if (ev.type === 'monthly') {
      const start = new Date(ev.start_date + 'T00:00:00Z');
      const end   = new Date(ev.end_date   + 'T00:00:00Z');
      const dom   = ev.day_of_month || start.getUTCDate();
      const cur   = new Date(start);
      cur.setUTCDate(dom);
      if (cur < start) cur.setUTCMonth(cur.getUTCMonth() + 1);
      while (cur <= end) {
        out.push({
          date: cur.toISOString().slice(0, 10),
          amount_tokens: Number(ev.amount_tokens_per_event) || 0,
          recipient_type: rtype
        });
        cur.setUTCMonth(cur.getUTCMonth() + 1);
        cur.setUTCDate(dom);
      }
    }
  }
  return out;
}

// Returns { gross: Map<date,tokens>, adjusted: Map<date,sell-prob-weighted tokens>,
//           byRecipient: Map<date, Record<recipientType, tokens>>, sellProb }.
// byRecipient carries UNWEIGHTED tokens split by recipient type so the
// frontend can re-weight with user-chosen sell probabilities (the unlock-
// assumption sliders) and still reconcile to the headline when using the
// defaults. Unknown recipient types bucket under 'other' (FALLBACK_SELL_PROB).
function loadUnlockMaps(seedSource) {
  const empty = { gross: new Map(), adjusted: new Map(), byRecipient: new Map(), sellProb: { ...DEFAULT_SELL_PROB } };
  if (!seedSource) return empty;

  // Per-protocol override of sell-probabilities (by recipient type) if present.
  const sellProb = { ...DEFAULT_SELL_PROB, ...(seedSource.sell_probability_by_recipient || {}) };

  const byRecipient = new Map();
  const addRecipient = (date, rtype, amt) => {
    const key = rtype != null && sellProb[rtype] != null ? rtype : 'other';
    const rec = byRecipient.get(date) || {};
    rec[key] = (rec[key] || 0) + amt;
    byRecipient.set(date, rec);
  };

  // Path 1: deterministic_schedule — protocol-specific JS module with
  // generateUnlockSchedule(asOf) function. Used by HYPE.
  if (seedSource.type === 'deterministic_schedule') {
    const abs = path.join(ROOT, seedSource.module);
    const mod = require(abs);
    if (typeof mod.generateUnlockSchedule !== 'function') return empty;
    const rows = mod.generateUnlockSchedule(new Date());
    const allocations = mod.ALLOCATIONS || mod.HYPE_ALLOCATIONS || {};
    const recipientByBucket = {};
    for (const [k, v] of Object.entries(allocations)) recipientByBucket[k] = v.recipient_type;

    const gross = new Map();
    const adjusted = new Map();
    for (const r of rows) {
      const amt = Number(r.amount_tokens);
      gross.set(r.unlock_date, (gross.get(r.unlock_date) || 0) + amt);
      const rtype = recipientByBucket[r.bucket];
      const p = rtype != null && sellProb[rtype] != null ? sellProb[rtype] : FALLBACK_SELL_PROB;
      adjusted.set(r.unlock_date, (adjusted.get(r.unlock_date) || 0) + amt * p);
      addRecipient(r.unlock_date, rtype, amt);
    }
    return { gross, adjusted, byRecipient, sellProb };
  }

  // Path 2: schedule_file — JSON-driven generic schedule for protocols we
  // don't have a tokenomics module for. Format:
  //   { events: [{ type, date|start_date+end_date, amount_tokens|total_amount_tokens|amount_tokens_per_event, recipient_type, bucket, note }, ...] }
  // Recipient types map to DEFAULT_SELL_PROB. Unknown types fall back to
  // FALLBACK_SELL_PROB.
  if (seedSource.type === 'schedule_file') {
    const abs = path.join(ROOT, seedSource.path);
    if (!fs.existsSync(abs)) return empty;
    const schedule = loadJson(abs);
    const expanded = expandScheduleEvents(schedule.events);
    const gross = new Map();
    const adjusted = new Map();
    for (const ev of expanded) {
      const amt = Number(ev.amount_tokens) || 0;
      if (amt <= 0) continue;
      gross.set(ev.date, (gross.get(ev.date) || 0) + amt);
      const p = ev.recipient_type != null && sellProb[ev.recipient_type] != null
        ? sellProb[ev.recipient_type]
        : FALLBACK_SELL_PROB;
      adjusted.set(ev.date, (adjusted.get(ev.date) || 0) + amt * p);
      addRecipient(ev.date, ev.recipient_type, amt);
    }
    return { gross, adjusted, byRecipient, sellProb };
  }

  return empty;
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
  const { gross: unlocks, adjusted: unlocksAdj, byRecipient: unlocksByRecipient, sellProb } = loadUnlockMaps(seed.sources.unlocks);
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

  for (const m of [unlocksAdj]) {
    for (const k of m.keys()) dateSet.add(k);
  }
  const sortedDates2 = Array.from(dateSet).sort();

  const series = sortedDates2.map((date) => {
    const u    = unlocks.get(date) || 0;        // gross scheduled unlock
    const uAdj = unlocksAdj.get(date) || 0;     // sell-probability weighted
    const b  = buybacks.get(date) || 0;
    const ts = treasurySells.get(date) || 0;
    const bn = burns.get(date) || 0;
    const ta = treasuryAcc.get(date) || 0;
    const ns = staking.get(date) || 0;

    const sinkTa = Math.max(ta, 0);
    const sinkNs = Math.max(ns, 0);
    // Headline net pressure uses sell-probability-weighted unlocks.
    const net = (uAdj + ts) - (b + bn + sinkTa + sinkNs);
    // Gross variant (100% sell-through) kept for the deep page.
    const netGross = (u + ts) - (b + bn + sinkTa + sinkNs);

    const dayPrice = dailyPrice.get(date);
    const priceForUsd = dayPrice != null ? dayPrice : priceUsdToday;
    const priceSource = dayPrice != null ? 'daily_series' : 'today_fallback';

    return {
      date,
      is_future: date > today,
      unlocks_tokens: u,
      unlocks_tokens_adjusted: uAdj,
      treasury_sells_tokens: ts,
      buybacks_tokens: b,
      burns_tokens: bn,
      treasury_accumulation_tokens: ta,
      net_staking_lockups_tokens: ns,
      net_pressure_tokens: net,
      net_pressure_tokens_gross: netGross,
      price_usd_for_day: priceForUsd,
      price_source_for_day: priceSource,
      net_pressure_usd: net * priceForUsd,
      net_pressure_usd_gross: netGross * priceForUsd
    };
  });

  return { series, unlocksByRecipient, sellProb };
}

function rollupWindow(series, windowDays, buybackDates, unlocksByRecipient) {
  const today = todayIso();
  const cutoff = daysAgoIso(windowDays);
  const slice = series.filter((r) => !r.is_future && r.date > cutoff && r.date <= today);
  // Per-recipient-type unlock sums (UNWEIGHTED tokens + per-day-priced USD)
  // for the window — the raw material for the frontend's unlock-assumption
  // sliders. Σ usd[rtype] × default_sell_prob[rtype] reconciles with
  // unlocks_usd_adjusted.
  const byRecipient = {};
  const sum = {
    unlocks_tokens: 0,
    unlocks_tokens_adjusted: 0,
    treasury_sells_tokens: 0,
    buybacks_tokens: 0,
    burns_tokens: 0,
    treasury_accumulation_tokens: 0,
    net_staking_lockups_tokens: 0,
    net_pressure_tokens: 0,
    net_pressure_tokens_gross: 0,
    // Per-day USD components — summed so the rollup reflects time-weighted price.
    // ALL components get a per-day-priced USD column so the frontend never has
    // to convert tokens at today's price (which silently disagrees with the
    // headline net when price moved — the SourcesSinksFlow visual once showed
    // +$12.9M/day against a −$3.7M/day headline this way).
    unlocks_usd: 0,
    unlocks_usd_adjusted: 0,
    treasury_sells_usd: 0,
    buybacks_usd: 0,
    burns_usd: 0,
    treasury_accumulation_usd: 0,
    net_staking_lockups_usd: 0,
    net_pressure_usd_perday: 0,
    net_pressure_usd_gross_perday: 0
  };
  let daysWithDailyPrice = 0;
  for (const r of slice) {
    sum.unlocks_tokens += r.unlocks_tokens;
    sum.unlocks_tokens_adjusted += r.unlocks_tokens_adjusted || 0;
    sum.treasury_sells_tokens += r.treasury_sells_tokens;
    sum.buybacks_tokens += r.buybacks_tokens;
    sum.burns_tokens += r.burns_tokens;
    sum.treasury_accumulation_tokens += r.treasury_accumulation_tokens;
    sum.net_staking_lockups_tokens += r.net_staking_lockups_tokens;
    sum.net_pressure_tokens += r.net_pressure_tokens;
    sum.net_pressure_tokens_gross += r.net_pressure_tokens_gross || 0;
    sum.unlocks_usd += r.unlocks_tokens * r.price_usd_for_day;
    sum.unlocks_usd_adjusted += (r.unlocks_tokens_adjusted || 0) * r.price_usd_for_day;
    sum.treasury_sells_usd += (r.treasury_sells_tokens || 0) * r.price_usd_for_day;
    sum.buybacks_usd += r.buybacks_tokens * r.price_usd_for_day;
    sum.burns_usd += (r.burns_tokens || 0) * r.price_usd_for_day;
    // Sink USD columns mirror the net formula's PER-DAY clamping (sinkTa/sinkNs
    // in buildDailySeries): a day of net unstaking contributes 0 to the sink,
    // not a negative. Without this the components can't reconcile to
    // net_pressure_usd. Identity: net_usd = unlocks_usd_adjusted +
    // treasury_sells_usd − (buybacks_usd + burns_usd + treasury_accumulation_usd
    // + net_staking_lockups_usd).
    sum.treasury_accumulation_usd += Math.max(r.treasury_accumulation_tokens || 0, 0) * r.price_usd_for_day;
    sum.net_staking_lockups_usd += Math.max(r.net_staking_lockups_tokens || 0, 0) * r.price_usd_for_day;
    sum.net_pressure_usd_perday += r.net_pressure_usd;
    sum.net_pressure_usd_gross_perday += (r.net_pressure_usd_gross || 0);
    if (r.price_source_for_day === 'daily_series') daysWithDailyPrice++;
    const rec = unlocksByRecipient?.get(r.date);
    if (rec) {
      for (const [rtype, tokens] of Object.entries(rec)) {
        const acc = byRecipient[rtype] || (byRecipient[rtype] = { tokens: 0, usd: 0 });
        acc.tokens += tokens;
        acc.usd += tokens * r.price_usd_for_day;
      }
    }
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
    unlocks_by_recipient: byRecipient,
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

  const { series, unlocksByRecipient, sellProb } = buildDailySeries(seedRow, price);
  const buybackDates = loadDailyMap(seedRow.sources.buybacks);
  const windowDefs = [
    { key: '24h', days: 1 },
    { key: '7d',  days: 7 },
    { key: '30d', days: 30 },
    { key: '90d', days: 90 }
  ];
  const rollups = {};
  for (const { key, days } of windowDefs) {
    const r = rollupWindow(series, days, buybackDates, unlocksByRecipient);
    // Prefer the time-weighted per-day USD sum; fall back to tokens × today
    // when no daily price was available for any day in the window.
    const usdPreferred = r.daily_price_coverage_pct > 0
      ? r.net_pressure_usd_perday
      : r.net_pressure_tokens * price;
    const usdGrossPreferred = r.daily_price_coverage_pct > 0
      ? r.net_pressure_usd_gross_perday
      : r.net_pressure_tokens_gross * price;
    rollups[key] = {
      ...r,
      net_pressure_usd: usdPreferred,
      net_pressure_usd_gross: usdGrossPreferred,
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
    // Default sell-probability weights actually applied to this protocol's
    // unlocks (incl. per-protocol overrides). The frontend's assumption
    // sliders initialize from these.
    unlock_weighting: { sell_probability: sellProb, fallback: FALLBACK_SELL_PROB },
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
  lines.push('Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.');
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
