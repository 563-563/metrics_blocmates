#!/usr/bin/env node
/**
 * Backfill Hyperliquid Assistance Fund buyback history via userFillsByTime.
 *
 * userFills caps at ~2000 fills (≈ 4-5 days of AF activity). For HM annualization
 * we want ~90 days of trailing data. This script paginates backward through time:
 *   - request [startTime, endTime] window of size CHUNK_DAYS
 *   - aggregate fills to daily totals
 *   - step the window back by CHUNK_DAYS
 *   - stop when we've covered LOOKBACK_DAYS OR the API returns nothing
 *
 * Idempotent — merges with existing data/onchain/hype-af/buybacks.json by date.
 *
 * Run:
 *   node scripts/onchain/hype/backfill-af.js               # default 90 days
 *   node scripts/onchain/hype/backfill-af.js --days 30     # custom lookback
 *
 * Safeguards: max iteration cap, sleep between requests.
 */

const fs = require('fs');
const path = require('path');

const { userFillsByTime } = require('./hl-api');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'hype-af');
const BUYBACKS_PATH = path.join(OUT_DIR, 'buybacks.json');

const AF_ADDRESS = '0xfefefefefefefefefefefefefefefefefefefefe';
const HYPE_SPOT_PAIR = '@107';

// Pagination tuning
const CHUNK_DAYS = 3;        // each request covers ~3 days (well under the 2000-fill cap at ~500/day)
const MAX_ITERATIONS = 50;   // safety cap (50 × 3d = 150d max)
const SLEEP_MS = 350;        // pause between requests to be polite to the public API

function getArgInt(name, dflt) {
  const i = process.argv.indexOf(name);
  if (i < 0) return dflt;
  const v = parseInt(process.argv[i + 1], 10);
  return Number.isFinite(v) ? v : dflt;
}

const LOOKBACK_DAYS = getArgInt('--days', 90);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fillsToDailyMap(fills) {
  const sorted = fills.slice().sort((a, b) => b.time - a.time);
  const byDay = new Map();
  for (const f of sorted) {
    if (f.side !== 'B' || f.coin !== HYPE_SPOT_PAIR) continue;
    const day = new Date(f.time).toISOString().slice(0, 10);
    const sz = parseFloat(f.sz);
    const px = parseFloat(f.px);
    const e = byDay.get(day) ?? { tokens: 0, usd: 0, count: 0 };
    e.tokens += sz;
    e.usd += sz * px;
    e.count += 1;
    byDay.set(day, e);
  }
  return byDay;
}

function mergeDailyMaps(target, addition) {
  // additive merge — sum tokens/usd/count when the same date appears in both
  for (const [day, v] of addition.entries()) {
    const e = target.get(day) ?? { tokens: 0, usd: 0, count: 0 };
    e.tokens += v.tokens;
    e.usd += v.usd;
    e.count += v.count;
    target.set(day, e);
  }
  return target;
}

async function main() {
  ensureDir(OUT_DIR);

  const now = Date.now();
  const lookbackMs = LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
  const targetStartMs = now - lookbackMs;

  console.log(`[backfill-af] backfilling ${LOOKBACK_DAYS}d of AF buybacks`);
  console.log(`[backfill-af] window ${new Date(targetStartMs).toISOString()} → now`);

  const aggregated = new Map();
  let endMs = now;
  let iterations = 0;
  let totalFills = 0;
  let totalBuys = 0;

  while (endMs > targetStartMs && iterations < MAX_ITERATIONS) {
    const startMs = Math.max(endMs - CHUNK_DAYS * 24 * 60 * 60 * 1000, targetStartMs);
    iterations++;

    process.stdout.write(`[backfill-af] iter ${iterations}: [${new Date(startMs).toISOString().slice(0,16)} → ${new Date(endMs).toISOString().slice(0,16)}] ... `);

    const fills = await userFillsByTime(AF_ADDRESS, startMs, endMs);
    if (!Array.isArray(fills)) throw new Error(`userFillsByTime returned non-array (${typeof fills})`);

    const buys = fills.filter((f) => f.side === 'B' && f.coin === HYPE_SPOT_PAIR);
    totalFills += fills.length;
    totalBuys += buys.length;

    const dailyMap = fillsToDailyMap(fills);
    mergeDailyMaps(aggregated, dailyMap);

    console.log(`${fills.length} fills (${buys.length} HYPE buys), ${dailyMap.size} days touched`);

    if (fills.length >= 2000) {
      console.warn(`[backfill-af]   warning: chunk hit 2000-fill cap — consider smaller CHUNK_DAYS for higher fidelity`);
    }
    if (fills.length === 0) {
      console.log(`[backfill-af]   empty window — assuming pre-AF activity, stopping`);
      break;
    }

    endMs = startMs;
    if (endMs <= targetStartMs) break;
    await sleep(SLEEP_MS);
  }

  if (iterations >= MAX_ITERATIONS) {
    console.warn(`[backfill-af] hit MAX_ITERATIONS=${MAX_ITERATIONS}`);
  }

  // Build daily rows from the aggregated map.
  const incoming = Array.from(aggregated.entries())
    .map(([date, v]) => ({
      date,
      amount_tokens: v.tokens,
      amount_usd: v.usd,
      avg_price_usd: v.tokens > 0 ? v.usd / v.tokens : 0,
      fill_count: v.count,
      source: 'hyperliquid_info_api_backfill',
      verification: 'onchain'
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Merge with existing buybacks.json — backfill data wins (it's a fresh full pull).
  const existing = loadJsonOrDefault(BUYBACKS_PATH, []);
  const byDate = new Map();
  for (const r of existing) byDate.set(r.date, r);
  for (const r of incoming) byDate.set(r.date, r);
  const merged = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));

  fs.writeFileSync(BUYBACKS_PATH, JSON.stringify(merged, null, 2));

  const sumUsd = incoming.reduce((s, r) => s + r.amount_usd, 0);
  const sumTokens = incoming.reduce((s, r) => s + r.amount_tokens, 0);

  console.log(`\n[backfill-af] done.`);
  console.log(`  iterations: ${iterations}`);
  console.log(`  total fills inspected: ${totalFills.toLocaleString()}`);
  console.log(`  HYPE buy fills:        ${totalBuys.toLocaleString()}`);
  console.log(`  daily rows in backfill: ${incoming.length}`);
  console.log(`  total rows in buybacks.json: ${merged.length}`);
  console.log(`  backfill USD total:    $${sumUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
  console.log(`  backfill HYPE total:   ${Math.round(sumTokens).toLocaleString()} HYPE`);
  if (incoming.length > 0) {
    const first = incoming[0].date;
    const last = incoming[incoming.length - 1].date;
    const days = (new Date(last) - new Date(first)) / (24 * 60 * 60 * 1000) + 1;
    const avgDaily = sumUsd / days;
    console.log(`  range: ${first} → ${last} (${days} days)`);
    console.log(`  avg daily: $${avgDaily.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day`);
    console.log(`  annualized: $${(avgDaily * 365 / 1e6).toFixed(1)}M/yr`);
  }
}

main().catch((err) => {
  console.error('[backfill-af] failed:', err.message);
  process.exit(1);
});
