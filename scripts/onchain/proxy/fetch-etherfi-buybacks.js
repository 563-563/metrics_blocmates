#!/usr/bin/env node
/**
 * ETHFI buyback proxy fetcher.
 *
 * DefiLlama splits ether.fi across three sub-protocols (no parent fees endpoint):
 *   - ether.fi-liquid          (Onchain Capital Allocator, the big one)
 *   - etherfi-cash-liquid      (Crypto Card Issuer)
 *   - etherfi-borrowing-market (Lending)
 *
 * Per DAO Proposal #8: 10% of total protocol revenue is routed to ETHFI value
 * accrual — 5% open-market buyback + burn, 5% sETHFI staker distributions
 * (which is also bought ETHFI). Combined → all 10% is supply-compressive.
 *
 * We sum dailyRevenue across the three sub-protocols, multiply by 0.10, and
 * write a daily series in the proxy-buyback format. The $50M treasury buyback
 * approved Nov 2025 (triggers at price < $3 — ACTIVE) is NOT layered in here
 * because it's discretionary and not visible in DL's daily series; treat that
 * as a separate editorial signal on top.
 *
 * Output: data/onchain/proxy/ether-fi/buybacks.json
 *
 * Run: node scripts/onchain/proxy/fetch-etherfi-buybacks.js
 */

const fs = require('fs');
const path = require('path');

const { getDailyPrices } = require('../../lib/cg-prices');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'proxy', 'ether-fi');
const OUT_PATH = path.join(OUT_DIR, 'buybacks.json');

const SUB_SLUGS = [
  'ether.fi-liquid',
  'etherfi-cash-liquid',
  'etherfi-borrowing-market'
];

// ETHFI accrual: 5% buyback+burn + 5% sETHFI distributions = 10%.
const ACCRUAL_PCT = 0.10;

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function loadJsonOrDefault(p, fb) {
  if (!fs.existsSync(p)) return fb;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fb; }
}
function mergeDaily(existing, incoming) {
  const m = new Map();
  for (const r of existing) m.set(r.date, r);
  for (const r of incoming) m.set(r.date, r);
  return Array.from(m.values()).sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchDailyRevenue(slug) {
  const url = `https://api.llama.fi/summary/fees/${encodeURIComponent(slug)}?dataType=dailyRevenue`;
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${slug} dailyRevenue: HTTP ${res.status}`);
  const json = await res.json();
  return json.totalDataChart || [];
}

async function main() {
  ensureDir(OUT_DIR);

  // Sum dailyRevenue across the three sub-protocols into one per-day map.
  const byDate = new Map();
  for (const slug of SUB_SLUGS) {
    try {
      const chart = await fetchDailyRevenue(slug);
      console.log(`[etherfi-buyback] ${slug}: ${chart.length} daily rows`);
      for (const [ts, usd] of chart) {
        const date = new Date(ts * 1000).toISOString().slice(0, 10);
        byDate.set(date, (byDate.get(date) || 0) + (Number(usd) || 0));
      }
    } catch (err) {
      console.warn(`[etherfi-buyback] ${slug}: ${err.message}`);
    }
  }

  if (byDate.size === 0) {
    throw new Error('no daily revenue rows from any sub-protocol');
  }

  // Daily ETHFI price for token-count derivation.
  let priceMap = new Map();
  try {
    priceMap = await getDailyPrices('ether-fi', 365);
  } catch (err) {
    console.warn(`[etherfi-buyback] CG price fetch failed: ${err.message}`);
  }
  const latestPrice = priceMap.size
    ? Array.from(priceMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).pop()[1]
    : null;

  const rows = Array.from(byDate.entries())
    .map(([date, totalRevUsd]) => {
      const buybackUsd = totalRevUsd * ACCRUAL_PCT;
      const px = priceMap.get(date) ?? latestPrice;
      return {
        date,
        amount_usd: buybackUsd,
        amount_tokens: px ? buybackUsd / px : null,
        price_usd: px,
        source: `defillama_aggregated_dailyRevenue_x_${ACCRUAL_PCT}`,
        verification: 'proxy'
      };
    })
    .filter((r) => r.amount_usd > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  const merged = mergeDaily(loadJsonOrDefault(OUT_PATH, []), rows);
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

  const sum30 = rows.slice(-30).reduce((s, r) => s + r.amount_usd, 0);
  const annualized = (sum30 / 30) * 365;
  const totalRev30 = Array.from(byDate.entries())
    .filter(([d]) => d >= rows[rows.length - 30]?.date)
    .reduce((s, [, v]) => s + v, 0);
  console.log('');
  console.log(`[etherfi-buyback] ${rows.length} non-zero rows`);
  console.log(`  protocol revenue (3 sub-protocols, last 30d): $${Math.round(totalRev30).toLocaleString()}`);
  console.log(`  ETHFI accrual (10%): last 30d = $${Math.round(sum30).toLocaleString()} → annualized $${Math.round(annualized).toLocaleString()}/yr`);
  console.log(`[etherfi-buyback] wrote ${path.relative(ROOT, OUT_PATH)} (${merged.length} rows)`);
}

main().catch((err) => {
  console.error('[etherfi-buyback] failed:', err.message);
  process.exit(1);
});
