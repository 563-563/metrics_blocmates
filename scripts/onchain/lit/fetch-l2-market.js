#!/usr/bin/env node
/**
 * zkLighter L2 market snapshot for LIT/USDC spot (market_id 2049).
 *
 * Reads the unauthenticated orderBookDetails endpoint to capture daily
 * market stats: last price, 24h volume, open interest. The Lighter buyback
 * mechanism executes on this market, so it's the right anchor even though
 * we can't pull individual trade fills without a Lighter API key.
 *
 * Outputs:
 *   data/onchain/lit/l2-market.json
 *     [{ date, market_id, last_price, daily_volume, ..., source, verification }]
 *
 * Run: node scripts/onchain/lit/fetch-l2-market.js
 */

const fs = require('fs');
const path = require('path');

const zkl = require('../../lib/zklighter');
const ADDR = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'lit');
const OUT_PATH = path.join(OUT_DIR, 'l2-market.json');

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

async function main() {
  ensureDir(OUT_DIR);
  const todayIso = new Date().toISOString().slice(0, 10);
  const marketId = ADDR.L2.LIT_USDC_SPOT_MARKET_ID;

  console.log(`[lit-l2-market] reading orderBookDetails for LIT/USDC spot (market_id=${marketId})`);
  const details = await zkl.orderBookDetails(marketId);

  // The response shape varies — capture the whole thing plus extract common fields.
  const book = details.order_book_details?.[0] || details.order_book?.[0] || details;

  const row = {
    date: todayIso,
    market_id: marketId,
    symbol: book?.symbol ?? 'LIT/USDC',
    last_price: book?.last_trade_price ?? book?.last_price ?? null,
    daily_volume: book?.daily_volume ?? book?.volume_24h ?? null,
    open_interest: book?.open_interest ?? null,
    daily_trades: book?.daily_trades ?? null,
    raw_response_keys: Object.keys(book || {}),
    source: 'zklighter_orderbookdetails',
    verification: 'onchain'
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(OUT_PATH, []), [row]), null, 2));

  console.log(`[lit-l2-market] ${todayIso}`);
  console.log(`  LIT/USDC last price: ${row.last_price ?? '(not exposed in response)'}`);
  console.log(`  daily volume:        ${row.daily_volume ?? '(not exposed)'}`);
  console.log(`  open interest:       ${row.open_interest ?? '(n/a, spot market)'}`);
  if (!zkl.hasAuth()) {
    console.log('');
    console.log('  ⚠ LIGHTER_API_KEY not set — buyback fill ingestion unavailable.');
    console.log('    Sign up via the Python SDK setup at github.com/elliottech/lighter-python');
    console.log('    and add LIGHTER_API_KEY + LIGHTER_ACCOUNT_INDEX to .env');
  }
  console.log(`[lit-l2-market] wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((err) => {
  console.error('[lit-l2-market] failed:', err.message);
  process.exit(1);
});
