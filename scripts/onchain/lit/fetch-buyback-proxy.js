#!/usr/bin/env node
/**
 * LIT buyback PROXY from DefiLlama holdersRevenue.
 *
 * The direct buyback feed (zkLighter /trades) requires a Lighter API key we
 * don't have. But Lighter routes 99.5% of post-LLP revenue to LIT buybacks,
 * and DefiLlama's `holdersRevenue` for Lighter captures exactly that
 * holder-directed revenue. So DL holdersRevenue ≈ buyback spend.
 *
 * This is a PROXY (verification: 'proxy'), not direct on-chain verification.
 * It auto-upgrades to 'onchain' the day the zkLighter trades adapter lands.
 *
 * Cross-check (2026-05-26): DL annualized $25.6M/yr vs article-stated
 * $25.53M/yr — within 0.3%.
 *
 * Output:
 *   data/onchain/lit/buybacks.json
 *     [{ date, amount_usd, source, verification: 'proxy' }, ...]
 *
 * Run: node scripts/onchain/lit/fetch-buyback-proxy.js
 */

const fs = require('fs');
const path = require('path');

const { getDailyPrices } = require('../../lib/cg-prices');
const { ensureDir, loadJsonOrDefault, mergeDaily } = require('../../lib/evm-adapter-utils');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'lit');
const OUT_PATH = path.join(OUT_DIR, 'buybacks.json');

const DL_URL = 'https://api.llama.fi/summary/fees/lighter?dataType=dailyHoldersRevenue';

async function main() {
  ensureDir(OUT_DIR);

  console.log('[lit-buyback-proxy] fetching Lighter dailyHoldersRevenue from DefiLlama');
  const res = await fetch(DL_URL, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`DefiLlama HTTP ${res.status}`);
  const json = await res.json();
  const chart = json.totalDataChart || [];
  console.log(`[lit-buyback-proxy] ${chart.length} daily points`);

  // Daily LIT price so we can express the $-denominated buyback proxy as an
  // estimated token count too (TP needs token flow, HM uses USD).
  let priceMap = new Map();
  try {
    priceMap = await getDailyPrices('lighter', 365);
    console.log(`[lit-buyback-proxy] ${priceMap.size} daily LIT prices loaded`);
  } catch (err) {
    console.warn(`[lit-buyback-proxy] CG price fetch failed: ${err.message} — tokens column will be null`);
  }
  const latestPrice = priceMap.size
    ? Array.from(priceMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).pop()[1]
    : null;

  const rows = chart
    .map(([ts, usd]) => {
      const date = new Date(ts * 1000).toISOString().slice(0, 10);
      const px = priceMap.get(date) ?? latestPrice;
      return {
        date,
        amount_usd: usd,
        amount_tokens: px ? usd / px : null,
        price_usd: px,
        source: 'defillama_daily_holders_revenue',
        verification: 'proxy'
      };
    })
    .filter((r) => r.amount_usd > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  const merged = mergeDaily(loadJsonOrDefault(OUT_PATH, []), rows);
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

  const sum30 = rows.slice(-30).reduce((s, r) => s + r.amount_usd, 0);
  const annualized = (sum30 / 30) * 365;
  console.log('');
  console.log(`[lit-buyback-proxy] ${rows.length} non-zero daily rows`);
  console.log(`  last 30d: $${sum30.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
  console.log(`  annualized: $${annualized.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr (verification: proxy)`);
  console.log(`[lit-buyback-proxy] wrote ${path.relative(ROOT, OUT_PATH)} (${merged.length} rows total)`);
}

main().catch((err) => {
  console.error('[lit-buyback-proxy] failed:', err.message);
  process.exit(1);
});
