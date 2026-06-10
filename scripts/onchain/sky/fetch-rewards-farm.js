#!/usr/bin/env node
/**
 * Track Category B distribution to lockstake-SKY holders.
 *
 * The canonical USDS rewards farm (`REWARDS_LSSKY_USDS = 0x38E4254b...`)
 * was identified via Sky ChainLog. METHODOLOGY §5.1 flagged the Cat B
 * mechanism question; this adapter resolves it on-chain.
 *
 * Three series produced:
 *   data/onchain/sky/cat-b-inflows.json     daily USDS into the rewards farm
 *                                           (protocol revenue routing rate)
 *   data/onchain/sky/cat-b-outflows.json    daily USDS out to stakers
 *                                           (actual claims)
 *   data/onchain/sky/rewards-farm-balance.json
 *                                           daily farm balance snapshot
 *
 * Outflows minus inflows over the same window tells us whether the farm
 * is being drained (claims exceed deposits) or accumulating.
 *
 * Run: node scripts/onchain/sky/fetch-rewards-farm.js [--days N | --backfill]
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const { resolveFromBlock, writeCheckpoint } = require('../../lib/scan-checkpoint');
const { ensureDir, loadJsonOrDefault, mergeDaily, getArgInt, hexToTokens, balanceOfData } = require('../../lib/evm-adapter-utils');
const ADDR = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'sky');
const INFLOWS_PATH = path.join(OUT_DIR, 'cat-b-inflows.json');
const OUTFLOWS_PATH = path.join(OUT_DIR, 'cat-b-outflows.json');
const BALANCE_PATH = path.join(OUT_DIR, 'rewards-farm-balance.json');
const CHECKPOINTS_PATH = path.join(OUT_DIR, 'checkpoints.json');

const BLOCKS_PER_DAY = 7200;

// Farm was deployed around the May 2025 MKR→SKY phase one upgrade.
// Backfill from earlier than that hits empty windows fast, so start before.
const DEPLOY_BLOCK = 22500000;

const BACKFILL = process.argv.includes('--backfill');
const LOOKBACK_DAYS = getArgInt('--days', 90);

async function aggregateTransfers(direction, fromBlock, currentBlock) {
  const opts = {
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: '0x' + currentBlock.toString(16),
    category: ['erc20'],
    contractAddresses: [ADDR.USDS],
    order: 'asc',
    maxCount: '0x3e8',
    withMetadata: true
  };
  if (direction === 'in') opts.toAddress = ADDR.REWARDS_LSSKY_USDS;
  else opts.fromAddress = ADDR.REWARDS_LSSKY_USDS;

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
  let fromBlock;
  let scanLabel;
  if (BACKFILL) {
    fromBlock = DEPLOY_BLOCK;
    scanLabel = 'backfill from May 2025 deploy';
  } else {
    const resolved = resolveFromBlock({
      checkpointPath: CHECKPOINTS_PATH,
      key: 'rewards_farm',
      windowFromBlock: currentBlock - LOOKBACK_DAYS * BLOCKS_PER_DAY - BLOCKS_PER_DAY,
      floorBlock: DEPLOY_BLOCK
    });
    fromBlock = resolved.fromBlock;
    scanLabel = resolved.resumed ? 'checkpoint resume' : LOOKBACK_DAYS + 'd lookback';
  }

  console.log(`[sky-cat-b] block ${fromBlock.toLocaleString()} → ${currentBlock.toLocaleString()} (${scanLabel})`);

  console.log('[sky-cat-b] USDS inflows to rewards farm');
  const inflows = await aggregateTransfers('in', fromBlock, currentBlock);
  console.log(`  ${inflows.transfers.length} events / ${inflows.byDay.size} days`);

  console.log('[sky-cat-b] USDS outflows from rewards farm (staker claims)');
  const outflows = await aggregateTransfers('out', fromBlock, currentBlock);
  console.log(`  ${outflows.transfers.length} events / ${outflows.byDay.size} days`);

  const toRows = (byDay, kind) => Array.from(byDay.entries())
    .map(([date, v]) => ({
      date,
      amount_tokens: v.tokens,
      amount_usd: v.tokens,         // USDS is a USD-pegged stable; tokens ≈ USD
      tx_count: v.count,
      asset: 'USDS',
      source: 'alchemy_asset_transfers',
      kind,
      verification: 'onchain'
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const inRows = toRows(inflows.byDay, 'cat_b_revenue_routing');
  const outRows = toRows(outflows.byDay, 'cat_b_staker_claim');

  fs.writeFileSync(INFLOWS_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(INFLOWS_PATH, []), inRows), null, 2));
  fs.writeFileSync(OUTFLOWS_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(OUTFLOWS_PATH, []), outRows), null, 2));
  writeCheckpoint({ checkpointPath: CHECKPOINTS_PATH, key: 'rewards_farm', block: currentBlock });

  // Current balance snapshot
  const balHex = await mainnet.ethCall(ADDR.USDS, balanceOfData(ADDR.REWARDS_LSSKY_USDS));
  const balance = hexToTokens(balHex);
  const todayIso = new Date().toISOString().slice(0, 10);
  const balRow = {
    date: todayIso,
    balance_tokens: balance,
    asset: 'USDS',
    source: 'alchemy_eth_call_balanceOf',
    verification: 'onchain'
  };
  fs.writeFileSync(BALANCE_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(BALANCE_PATH, []), [balRow]), null, 2));

  // Summary
  const sumIn = inRows.reduce((s, r) => s + r.amount_usd, 0);
  const sumOut = outRows.reduce((s, r) => s + r.amount_usd, 0);
  const lastInDate = inRows.length ? inRows[inRows.length - 1].date : '(none)';
  const lastOutDate = outRows.length ? outRows[outRows.length - 1].date : '(none)';
  const daysSinceLastIn = lastInDate === '(none)' ? null : Math.round((new Date(todayIso) - new Date(lastInDate)) / 86400000);

  console.log('');
  console.log('[sky-cat-b] Summary');
  console.log(`  Window inflows:  $${sumIn.toLocaleString(undefined, { maximumFractionDigits: 0 })} (last: ${lastInDate}${daysSinceLastIn != null ? `, ${daysSinceLastIn}d ago` : ''})`);
  console.log(`  Window outflows: $${sumOut.toLocaleString(undefined, { maximumFractionDigits: 0 })} (last: ${lastOutDate})`);
  console.log(`  Current balance: $${balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);

  // Surface stale state explicitly
  if (daysSinceLastIn != null && daysSinceLastIn > 30) {
    console.log('');
    console.log(`  ⚠ NO CAT B REVENUE INFLOWS IN ${daysSinceLastIn} DAYS — protocol has paused USDS distribution to this farm,`);
    console.log(`     OR revenue is now being routed through a different contract (post-Phase 1 framework update April 2026).`);
  }

  console.log('');
  console.log(`[sky-cat-b] wrote ${path.relative(ROOT, INFLOWS_PATH)}`);
  console.log(`[sky-cat-b] wrote ${path.relative(ROOT, OUTFLOWS_PATH)}`);
  console.log(`[sky-cat-b] wrote ${path.relative(ROOT, BALANCE_PATH)}`);
}

main().catch((err) => {
  console.error('[sky-cat-b] failed:', err.message);
  process.exit(1);
});
