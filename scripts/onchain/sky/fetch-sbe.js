#!/usr/bin/env node
/**
 * Track Smart Burn Engine (Flapper) activity.
 *
 * The SBE buys SKY from the open market when surplus accrues via the
 * Splitter. During Phase 1 of the TMF framework the SBE is bypassed, so
 * we expect zero activity until ABC reaches $150M and Phase 3 activates.
 *
 * Adapter watches:
 *   - SKY transfers from FLAP to 0x0 (burns)
 *   - SKY balance of FLAP (intermediate during auction cycle)
 *   - SKY/USDS movement through MCD_SPLIT
 *
 * Outputs:
 *   data/onchain/sky/sbe-burns.json     daily SKY burns from Flapper
 *   data/onchain/sky/splitter-flow.json  daily USDS+SKY through Splitter
 *
 * Run: node scripts/onchain/sky/fetch-sbe.js [--days N]
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const ADDR = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'sky');
const BURNS_PATH = path.join(OUT_DIR, 'sbe-burns.json');
const SPLITTER_PATH = path.join(OUT_DIR, 'splitter-flow.json');

const BLOCKS_PER_DAY = 7200;
const BURN_ADDR = '0x0000000000000000000000000000000000000000';

function getArgInt(name, dflt) {
  const i = process.argv.indexOf(name);
  if (i < 0) return dflt;
  const v = parseInt(process.argv[i + 1], 10);
  return Number.isFinite(v) ? v : dflt;
}
const LOOKBACK_DAYS = getArgInt('--days', 90);

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

async function aggregateByDay(opts) {
  const transfers = await mainnet.getAssetTransfersAll(opts);
  const byDay = new Map();
  for (const t of transfers) {
    const ts = t.metadata?.blockTimestamp;
    if (!ts) continue;
    const date = ts.slice(0, 10);
    const v = Number(t.value);
    if (!Number.isFinite(v)) continue;
    const e = byDay.get(date) ?? { tokens: 0, count: 0 };
    e.tokens += v;
    e.count += 1;
    byDay.set(date, e);
  }
  return { transfers, byDay };
}

async function main() {
  ensureDir(OUT_DIR);
  const currentBlock = parseInt(await mainnet.getBlockNumber(), 16);
  const fromBlock = currentBlock - LOOKBACK_DAYS * BLOCKS_PER_DAY;
  console.log(`[sky-sbe] block ${fromBlock.toLocaleString()} → ${currentBlock.toLocaleString()} (${LOOKBACK_DAYS}d)`);

  // SBE burns: SKY transfers from Flapper to 0x0
  console.log('[sky-sbe] querying SKY burns from Flapper');
  const burns = await aggregateByDay({
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: '0x' + currentBlock.toString(16),
    category: ['erc20'],
    contractAddresses: [ADDR.SKY],
    fromAddress: ADDR.MCD_FLAP,
    toAddress: BURN_ADDR,
    order: 'asc',
    maxCount: '0x3e8',
    withMetadata: true
  });
  console.log(`  ${burns.transfers.length} burn events / ${burns.byDay.size} days`);

  const burnRows = Array.from(burns.byDay.entries()).map(([date, v]) => ({
    date,
    amount_tokens: v.tokens,
    tx_count: v.count,
    asset: 'SKY',
    direction: 'burn',
    source: 'alchemy_asset_transfers',
    verification: 'onchain'
  })).sort((a, b) => a.date.localeCompare(b.date));

  fs.writeFileSync(BURNS_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(BURNS_PATH, []), burnRows), null, 2));

  // Splitter flow — any USDS or SKY moving through MCD_SPLIT
  console.log('[sky-sbe] querying Splitter outflows (USDS + SKY)');
  const out_usds = await aggregateByDay({
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: '0x' + currentBlock.toString(16),
    category: ['erc20'],
    contractAddresses: [ADDR.USDS],
    fromAddress: ADDR.MCD_SPLIT,
    order: 'asc',
    maxCount: '0x3e8',
    withMetadata: true
  });
  const out_sky = await aggregateByDay({
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: '0x' + currentBlock.toString(16),
    category: ['erc20'],
    contractAddresses: [ADDR.SKY],
    fromAddress: ADDR.MCD_SPLIT,
    order: 'asc',
    maxCount: '0x3e8',
    withMetadata: true
  });
  console.log(`  USDS: ${out_usds.transfers.length} / SKY: ${out_sky.transfers.length}`);

  // Merge USDS + SKY flow per date
  const flowByDate = new Map();
  for (const [date, v] of out_usds.byDay.entries()) {
    flowByDate.set(date, { date, usds_out: v.tokens, sky_out: 0, tx_count: v.count });
  }
  for (const [date, v] of out_sky.byDay.entries()) {
    const e = flowByDate.get(date) ?? { date, usds_out: 0, sky_out: 0, tx_count: 0 };
    e.sky_out += v.tokens;
    e.tx_count += v.count;
    flowByDate.set(date, e);
  }
  const splitterRows = Array.from(flowByDate.values())
    .map((r) => ({
      ...r,
      source: 'alchemy_asset_transfers',
      verification: 'onchain'
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  fs.writeFileSync(SPLITTER_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(SPLITTER_PATH, []), splitterRows), null, 2));

  console.log('');
  const sumBurn = burnRows.reduce((s, r) => s + r.amount_tokens, 0);
  console.log(`[sky-sbe] window burns: ${sumBurn.toLocaleString(undefined, { maximumFractionDigits: 0 })} SKY`);
  console.log(`[sky-sbe] window Splitter outflow days: ${splitterRows.length}`);
  if (sumBurn === 0 && splitterRows.length === 0) {
    console.log('[sky-sbe] confirms Phase 1 — SBE bypassed, no burns or Splitter activity.');
  }
  console.log(`[sky-sbe] wrote ${path.relative(ROOT, BURNS_PATH)}`);
  console.log(`[sky-sbe] wrote ${path.relative(ROOT, SPLITTER_PATH)}`);
}

main().catch((err) => {
  console.error('[sky-sbe] failed:', err.message);
  process.exit(1);
});
