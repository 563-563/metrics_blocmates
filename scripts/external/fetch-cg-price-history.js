#!/usr/bin/env node
/**
 * Daily price history per cohort protocol from CoinGecko market_chart.
 * Independent of buyback activity — needed so HM-over-time has price
 * coverage even when a protocol pauses buybacks (AAVE's price was
 * previously only available on buyback days).
 *
 * Reads coingecko_id per protocol from data/config.json (matched by symbol
 * to the HM seed). Writes data/external/cg/<slug>-price-daily.json.
 *
 * Fetched rows are MERGED into the existing file by date, so the file
 * accumulates history regardless of --days. That makes a small daily window
 * (--days 14 in the cron) sufficient: it refreshes the recent edge and the
 * long tail persists from previous runs. It also means --days can never
 * truncate history (the old overwrite behavior shrank a 365-row file to
 * whatever window was passed).
 *
 * Run: node scripts/external/fetch-cg-price-history.js [--days 365]
 */

const fs = require('fs');
const path = require('path');
const { getDailyPrices } = require('../lib/cg-prices');

const ROOT = path.join(__dirname, '..', '..');
const HM_SEED = path.join(ROOT, 'data', 'hm', 'config.json');
const TOKEN_CONFIG = path.join(ROOT, 'data', 'config.json');
const OUT_DIR = path.join(ROOT, 'data', 'external', 'cg');

function getArgInt(name, dflt) {
  const i = process.argv.indexOf(name);
  if (i < 0) return dflt;
  const v = parseInt(process.argv[i + 1], 10);
  return Number.isFinite(v) ? v : dflt;
}
const DAYS = getArgInt('--days', 365);

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const seed = loadJson(HM_SEED);
  const tokenCfg = loadJson(TOKEN_CONFIG);
  const cgBySymbol = new Map((tokenCfg.tokens || []).map((t) => [t.symbol, t.coingecko_id]));

  for (const row of Object.values(seed.protocols)) {
    const cgId = cgBySymbol.get(row.config_symbol);
    if (!cgId) { console.log(`[cg-price] ${row.symbol}: no coingecko_id, skip`); continue; }
    try {
      const m = await getDailyPrices(cgId, DAYS);
      const out = path.join(OUT_DIR, `${row.slug}-price-daily.json`);
      let existing = [];
      try { existing = JSON.parse(fs.readFileSync(out, 'utf8')); } catch { /* first run */ }
      const byDate = new Map(existing.map((r) => [r.date, r]));
      for (const [date, price_usd] of m.entries()) byDate.set(date, { date, price_usd });
      const rows = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
      fs.writeFileSync(out, JSON.stringify(rows, null, 2));
      console.log(`[cg-price] ${row.symbol}: fetched ${m.size} days, file now ${rows.length} days → ${path.relative(ROOT, out)}`);
    } catch (err) {
      console.warn(`[cg-price] ${row.symbol}: ${err.message}`);
    }
    await sleep(1500); // be gentle to CG free tier
  }
}

main();
