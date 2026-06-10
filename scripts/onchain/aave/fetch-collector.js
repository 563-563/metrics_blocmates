#!/usr/bin/env node
/**
 * Ingest AAVE Transfer events INTO the v3 Collector (`0x464C71f6...`).
 * Aggregates daily, writes idempotent JSON. Snapshots current Collector
 * balance into a treasury-history file.
 *
 * Spec: METHODOLOGY.md §1.6 (Annual Buyback Cat A) + §2.3 (Daily Buybacks)
 *       + §2.5 (Daily Treasury Accumulation).
 *
 * Caveat: counts ALL net AAVE inflow to Collector, not just TokenLogic
 * buybacks. In practice this is dominated by buyback flow but may include
 * miscellaneous deposits. Documented in verification = 'onchain_aggregate'.
 *
 * Outputs:
 *   data/onchain/aave/buybacks.json
 *     [{ date, amount_tokens, tx_count, source, verification }, ...]
 *   data/onchain/aave/treasury.json
 *     [{ date, balance_tokens, source, verification }, ...]
 *
 * Run:
 *   node scripts/onchain/aave/fetch-collector.js               # default 30d
 *   node scripts/onchain/aave/fetch-collector.js --days 90     # custom lookback
 *   node scripts/onchain/aave/fetch-collector.js --backfill    # since v3 Collector activated
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const { getDailyPricesCached } = require('../../lib/cg-prices');
const { resolveFromBlock, writeCheckpoint } = require('../../lib/scan-checkpoint');
const { ensureDir, loadJsonOrDefault, mergeDaily, getArgInt, hexToTokens, balanceOfData } = require('../../lib/evm-adapter-utils');
const { AAVE, COLLECTOR_V3 } = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'aave');
const BUYBACKS_PATH = path.join(OUT_DIR, 'buybacks.json');
const TREASURY_PATH = path.join(OUT_DIR, 'treasury.json');
const CHECKPOINTS_PATH = path.join(OUT_DIR, 'checkpoints.json');

// Aave V3 Collector was deployed around block 16291127 (Jan 2023). Anything
// earlier is V2 (different address). For first-time backfill, start there.
const COLLECTOR_V3_DEPLOY_BLOCK = 16291127;

const BACKFILL = process.argv.includes('--backfill');
const LOOKBACK_DAYS = getArgInt('--days', 30);

async function getCurrentBlock() {
  const hex = await mainnet.getBlockNumber();
  return parseInt(hex, 16);
}

async function getAaveBalance(addr) {
  const result = await mainnet.ethCall(AAVE, balanceOfData(addr));
  return hexToTokens(result);
}

async function main() {
  ensureDir(OUT_DIR);

  const currentBlock = await getCurrentBlock();
  console.log(`[aave-collector] current block: ${currentBlock.toLocaleString()}`);

  let fromBlock;
  if (BACKFILL) {
    fromBlock = COLLECTOR_V3_DEPLOY_BLOCK;
    console.log(`[aave-collector] --backfill: pulling from V3 Collector deploy block ${fromBlock.toLocaleString()}`);
  } else {
    // ~12s blocks on mainnet => ~7200 blocks/day. Add safety margin.
    const blocksPerDay = 7200;
    const windowFromBlock = Math.max(COLLECTOR_V3_DEPLOY_BLOCK, currentBlock - LOOKBACK_DAYS * blocksPerDay - blocksPerDay);
    const resolved = resolveFromBlock({
      checkpointPath: CHECKPOINTS_PATH,
      key: 'collector_inflow',
      windowFromBlock,
      floorBlock: COLLECTOR_V3_DEPLOY_BLOCK
    });
    fromBlock = resolved.fromBlock;
    console.log(`[aave-collector] ${resolved.resumed ? 'resuming from checkpoint' : `trailing ${LOOKBACK_DAYS}d`} → block ${fromBlock.toLocaleString()} → ${currentBlock.toLocaleString()}`);
  }

  console.log(`[aave-collector] querying alchemy_getAssetTransfers for AAVE → Collector`);
  const transfers = await mainnet.getAssetTransfersAll({
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: '0x' + currentBlock.toString(16),
    category: ['erc20'],
    contractAddresses: [AAVE],
    toAddress: COLLECTOR_V3,
    order: 'asc',
    maxCount: '0x3e8',
    withMetadata: true
  });
  console.log(`[aave-collector] ${transfers.length} transfer events received`);

  if (transfers.length === 0) {
    console.log('[aave-collector] no transfers in window — nothing to write to buybacks.json');
  }

  // Aggregate by UTC date.
  const byDay = new Map();
  for (const t of transfers) {
    const ts = t.metadata?.blockTimestamp;
    if (!ts) continue;
    const date = ts.slice(0, 10);
    const tokens = Number(t.value);
    if (!Number.isFinite(tokens)) continue;
    const e = byDay.get(date) ?? { tokens: 0, count: 0, fromAddrs: new Set() };
    e.tokens += tokens;
    e.count += 1;
    e.fromAddrs.add(t.from?.toLowerCase());
    byDay.set(date, e);
  }

  // Pull per-day CG prices once for the lookback window so we can convert
  // each daily token flow into USD at that day's price (METHODOLOGY §2.7).
  // CG free tier caps daily granularity at 365 days; we ask for the window
  // we need and fall back to today's price if a date isn't covered.
  const cgDays = Math.min(365, Math.max(LOOKBACK_DAYS + 7, 60));
  let priceMap = new Map();
  try {
    console.log(`[aave-collector] loading ${cgDays}d daily AAVE price (local cache, CG fallback)`);
    priceMap = await getDailyPricesCached({ slug: 'aave', coingeckoId: 'aave', days: cgDays });
    console.log(`[aave-collector] ${priceMap.size} daily prices loaded`);
  } catch (err) {
    console.warn(`[aave-collector] CG price fetch failed: ${err.message}`);
    console.warn('[aave-collector] proceeding with token-only rows (no USD column)');
  }

  // Latest price as fallback for any date the CG history doesn't cover.
  let latestPrice = null;
  if (priceMap.size > 0) {
    const sorted = Array.from(priceMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    latestPrice = sorted[sorted.length - 1][1];
  }

  const incoming = Array.from(byDay.entries())
    .map(([date, v]) => {
      const pxThatDay = priceMap.get(date);
      const usedPrice = pxThatDay ?? latestPrice;
      const amount_usd = usedPrice != null ? v.tokens * usedPrice : null;
      return {
        date,
        amount_tokens: v.tokens,
        amount_usd,
        avg_price_usd: usedPrice,
        price_source: pxThatDay != null ? 'cg_daily' : (latestPrice != null ? 'cg_latest_fallback' : 'unknown'),
        tx_count: v.count,
        unique_senders: v.fromAddrs.size,
        source: 'alchemy_asset_transfers',
        verification: 'onchain_aggregate'
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const existing = loadJsonOrDefault(BUYBACKS_PATH, []);
  const merged = mergeDaily(existing, incoming);
  fs.writeFileSync(BUYBACKS_PATH, JSON.stringify(merged, null, 2));
  writeCheckpoint({ checkpointPath: CHECKPOINTS_PATH, key: 'collector_inflow', block: currentBlock });

  // Snapshot today's Collector balance.
  const balanceNow = await getAaveBalance(COLLECTOR_V3);
  const todayIso = new Date().toISOString().slice(0, 10);
  const treasuryRow = {
    date: todayIso,
    balance_tokens: balanceNow,
    source: 'alchemy_eth_call_balanceOf',
    verification: 'onchain'
  };
  const treasuryExisting = loadJsonOrDefault(TREASURY_PATH, []);
  const treasuryMerged = mergeDaily(treasuryExisting, [treasuryRow]);
  fs.writeFileSync(TREASURY_PATH, JSON.stringify(treasuryMerged, null, 2));

  // Summary
  const sumTokens = incoming.reduce((s, r) => s + r.amount_tokens, 0);
  const sumUsd = incoming.reduce((s, r) => s + (r.amount_usd || 0), 0);
  console.log('');
  console.log(`[aave-collector] daily rows this run: ${incoming.length}`);
  console.log(`[aave-collector] total inflow window: ${sumTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} AAVE / $${sumUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
  if (incoming.length > 0) {
    const first = incoming[0].date;
    const last = incoming[incoming.length - 1].date;
    const days = Math.max(1, (new Date(last) - new Date(first)) / 86400000 + 1);
    console.log(`[aave-collector] range: ${first} → ${last} (${days.toFixed(0)} days)`);
    console.log(`[aave-collector] avg daily: ${(sumTokens / days).toFixed(2)} AAVE/day`);
  }
  console.log(`[aave-collector] Collector balance snapshot ${todayIso}: ${balanceNow.toLocaleString(undefined, { maximumFractionDigits: 2 })} AAVE`);
  console.log(`[aave-collector] buybacks.json now has ${merged.length} day rows total`);
  console.log(`[aave-collector] wrote ${path.relative(ROOT, BUYBACKS_PATH)}`);
  console.log(`[aave-collector] wrote ${path.relative(ROOT, TREASURY_PATH)}`);
}

main().catch((err) => {
  console.error('[aave-collector] failed:', err.message);
  process.exit(1);
});
