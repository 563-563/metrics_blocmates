/**
 * Tiny CoinGecko daily-price-history client.
 *
 * Returns a Map<dateISO, priceUSD> for the trailing N days of a CG-listed coin.
 * Free tier supports up to 365 days of daily granularity.
 *
 * Usage:
 *   const { getDailyPrices } = require('../lib/cg-prices');
 *   const prices = await getDailyPrices('aave', 365);
 *   prices.get('2026-04-19'); // → 88.42
 */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getDailyPrices(coingeckoId, days = 365) {
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coingeckoId)}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  let res;
  for (let attempt = 0; attempt <= 2; attempt++) {
    res = await fetch(url, { headers: { accept: 'application/json' } });
    if (res.status === 429) {
      const wait = 60_000;
      console.warn(`[cg-prices] rate-limited on ${coingeckoId}, waiting ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    break;
  }
  if (!res.ok) {
    throw new Error(`[cg-prices] ${coingeckoId}: HTTP ${res.status}`);
  }
  const json = await res.json();
  const arr = json.prices || []; // [[timestampMs, price], ...]
  const m = new Map();
  for (const [ts, px] of arr) {
    const date = new Date(ts).toISOString().slice(0, 10);
    // If multiple entries for same UTC date (CG sometimes does this), keep the latest.
    m.set(date, px);
  }
  return m;
}

/**
 * Cache-aware variant. fetch-cg-price-history.js maintains per-protocol daily
 * price files at data/external/cg/<slug>-price-daily.json; when that file is
 * fresh (last row within maxStaleDays), read it instead of re-hitting CG.
 * Falls back to a live getDailyPrices() call when the file is missing or
 * stale, so callers behave identically outside the cron (where the history
 * step runs first).
 */
const fs = require('fs');
const path = require('path');

async function getDailyPricesCached({ slug, coingeckoId, days = 365, maxStaleDays = 2 }) {
  const cachePath = path.join(__dirname, '..', '..', 'data', 'external', 'cg', `${slug}-price-daily.json`);
  try {
    const rows = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    if (Array.isArray(rows) && rows.length > 0) {
      const lastDate = rows[rows.length - 1].date;
      const ageDays = (Date.now() - new Date(lastDate).getTime()) / 8.64e7;
      if (ageDays <= maxStaleDays) {
        const cutoff = new Date(Date.now() - days * 8.64e7).toISOString().slice(0, 10);
        const m = new Map();
        for (const r of rows) {
          if (r.date >= cutoff && Number.isFinite(r.price_usd)) m.set(r.date, r.price_usd);
        }
        if (m.size > 0) {
          console.log(`[cg-prices] ${slug}: served ${m.size} days from cache (${path.basename(cachePath)})`);
          return m;
        }
      }
    }
  } catch { /* missing or unparseable cache — fall through to live fetch */ }
  return getDailyPrices(coingeckoId, days);
}

module.exports = { getDailyPrices, getDailyPricesCached };
