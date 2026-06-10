#!/usr/bin/env node
/**
 * Ingest Hyperliquid Assistance Fund buybacks from the public HL Info API.
 *
 * Ported from truepressure-extracted/.../workers/adapters/hyperliquid/buybacks.ts
 * Writes JSON files instead of Supabase rows. Idempotent — re-runs merge by date key.
 *
 * Outputs:
 *   data/onchain/hype-af/buybacks.json
 *     [{ date, amount_tokens, amount_usd, fill_count, source: 'onchain', verification: 'onchain' }, ...]
 *   data/onchain/hype-af/treasury.json
 *     [{ date, amount_tokens, amount_usd, source: 'onchain' }, ...]
 *
 * Limitation: userFills returns up to ~2000 fills which covers ~3-4 days at
 * current cadence. For full historical backfill, paginate via userFillsByTime.
 * Daily cron runs keep the trailing window fresh and merge into the existing
 * history file.
 *
 * Run: node scripts/onchain/hype/fetch-af.js
 */

const fs = require('fs');
const path = require('path');

const { userFills, getHypePerpQuote } = require('./hl-api');
const { ensureDir, loadJsonOrDefault, mergeDaily } = require('../../lib/evm-adapter-utils');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'hype-af');
const BUYBACKS_PATH = path.join(OUT_DIR, 'buybacks.json');
const TREASURY_PATH = path.join(OUT_DIR, 'treasury.json');

const AF_ADDRESS = '0xfefefefefefefefefefefefefefefefefefefefe';
const HYPE_SPOT_PAIR = '@107';

async function main() {
  ensureDir(OUT_DIR);

  console.log(`[hype-af] fetching userFills for ${AF_ADDRESS}`);
  const fills = await userFills(AF_ADDRESS, false);
  if (!Array.isArray(fills)) {
    throw new Error(`userFills returned non-array: ${typeof fills}`);
  }
  console.log(`[hype-af] ${fills.length} fills returned`);

  const buys = fills.filter((f) => f.side === 'B' && f.coin === HYPE_SPOT_PAIR);
  console.log(`[hype-af] ${buys.length} HYPE buys (side=B coin=${HYPE_SPOT_PAIR})`);

  if (buys.length === 0) {
    console.log('[hype-af] no buyback fills — nothing to write');
    return;
  }

  // Aggregate by UTC date.
  // Sort newest first so the per-day latestStartPosition picks the most recent value.
  const sorted = buys.slice().sort((a, b) => b.time - a.time);
  const byDay = new Map();
  for (const f of sorted) {
    const day = new Date(f.time).toISOString().slice(0, 10);
    const sz = parseFloat(f.sz);
    const px = parseFloat(f.px);
    const startPos = parseFloat(f.startPosition);
    const e = byDay.get(day) ?? { tokens: 0, usd: 0, count: 0, latestStartPos: startPos };
    e.tokens += sz;
    e.usd += sz * px;
    e.count += 1;
    byDay.set(day, e);
  }

  const incomingBuybacks = Array.from(byDay.entries()).map(([date, v]) => ({
    date,
    amount_tokens: v.tokens,
    amount_usd: v.usd,
    avg_price_usd: v.usd / v.tokens,
    fill_count: v.count,
    source: 'hyperliquid_info_api',
    verification: 'onchain'
  }));

  const existing = loadJsonOrDefault(BUYBACKS_PATH, []);
  const merged = mergeDaily(existing, incomingBuybacks);
  fs.writeFileSync(BUYBACKS_PATH, JSON.stringify(merged, null, 2));
  console.log(`[hype-af] wrote ${path.relative(ROOT, BUYBACKS_PATH)} (${merged.length} day rows total, ${incomingBuybacks.length} this run)`);

  // Treasury snapshot — newest fill's startPosition + size estimates AF balance.
  const newest = sorted[0];
  const newestBalance = parseFloat(newest.startPosition) + parseFloat(newest.sz);
  const today = new Date().toISOString().slice(0, 10);

  let livePrice;
  try {
    const quote = await getHypePerpQuote();
    livePrice = quote.markPriceUsd;
  } catch (err) {
    console.warn(`[hype-af] could not fetch live HL perp price: ${err.message}`);
    livePrice = newest ? parseFloat(newest.px) : 0;
  }

  const treasuryRow = {
    date: today,
    amount_tokens: newestBalance,
    amount_usd: newestBalance * livePrice,
    price_usd_at_snapshot: livePrice,
    source: 'hyperliquid_info_api',
    verification: 'onchain'
  };

  const treasuryExisting = loadJsonOrDefault(TREASURY_PATH, []);
  const treasuryMerged = mergeDaily(treasuryExisting, [treasuryRow]);
  fs.writeFileSync(TREASURY_PATH, JSON.stringify(treasuryMerged, null, 2));
  console.log(`[hype-af] wrote ${path.relative(ROOT, TREASURY_PATH)} — AF balance ${Math.round(newestBalance).toLocaleString()} HYPE @ $${livePrice.toFixed(2)}`);

  // Summary
  const sum30d = incomingBuybacks.reduce((s, r) => s + r.amount_usd, 0);
  console.log(`\n[hype-af] summary:`);
  console.log(`  daily buyback rows (this fetch): ${incomingBuybacks.length}`);
  console.log(`  total USD across fetched fills: $${sum30d.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
  console.log(`  AF balance snapshot: ${Math.round(newestBalance).toLocaleString()} HYPE ($${(newestBalance * livePrice / 1e6).toFixed(2)}M)`);
}

main().catch((err) => {
  console.error('[hype-af] failed:', err.message);
  process.exit(1);
});
