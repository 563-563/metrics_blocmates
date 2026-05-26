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

module.exports = { getDailyPrices };
