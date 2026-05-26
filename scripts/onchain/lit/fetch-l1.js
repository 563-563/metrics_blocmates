#!/usr/bin/env node
/**
 * L1 mainnet reads for LIT.
 *
 * What we can do unauthed via Alchemy:
 *   1. LIT.totalSupply() — circulating reference
 *   2. LIT.balanceOf(Escrow) — tokens bridged to / held by the rollup
 *   3. ERC-20 transfers TO/FROM Escrow (cross-chain flow)
 *   4. Top LIT holder discovery — enumerate large balance addresses
 *      from the deployment block forward, to find vesting contracts.
 *
 * What we can NOT do without a Lighter API key:
 *   - LIT buyback execution on L2 (zkLighter trades feed requires auth)
 *
 * Outputs:
 *   data/onchain/lit/l1-supply.json      daily LIT totalSupply snapshot
 *   data/onchain/lit/l1-escrow.json      daily Escrow LIT balance snapshot
 *   data/onchain/lit/l1-escrow-flow.json daily LIT in/out of Escrow
 *
 * Run: node scripts/onchain/lit/fetch-l1.js [--days N]
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const ADDR = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'lit');
const SUPPLY_PATH = path.join(OUT_DIR, 'l1-supply.json');
const ESCROW_PATH = path.join(OUT_DIR, 'l1-escrow.json');
const ESCROW_FLOW_PATH = path.join(OUT_DIR, 'l1-escrow-flow.json');

const BLOCKS_PER_DAY = 7200;

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
function hexToTokens(hex, decimals = 18) {
  if (!hex || hex === '0x') return 0;
  const wei = BigInt(hex);
  const whole = Number(wei / 10n ** BigInt(decimals));
  const frac = Number(wei % 10n ** BigInt(decimals)) / Number(10n ** BigInt(decimals));
  return whole + frac;
}
function balanceOfData(addr) {
  return '0x70a08231' + addr.slice(2).padStart(64, '0').toLowerCase();
}

async function main() {
  ensureDir(OUT_DIR);
  const todayIso = new Date().toISOString().slice(0, 10);

  // 1. LIT total supply
  console.log('[lit-l1] reading LIT.totalSupply()');
  const totalSupplyHex = await mainnet.ethCall(ADDR.L1.LIT, '0x18160ddd');
  const totalSupply = hexToTokens(totalSupplyHex);
  const supplyRow = {
    date: todayIso,
    total_supply_tokens: totalSupply,
    source: 'alchemy_eth_call_totalSupply',
    verification: 'onchain'
  };
  fs.writeFileSync(SUPPLY_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(SUPPLY_PATH, []), [supplyRow]), null, 2));

  // 2. Escrow LIT balance
  console.log('[lit-l1] reading LIT.balanceOf(Escrow)');
  const escrowBalHex = await mainnet.ethCall(ADDR.L1.LIT, balanceOfData(ADDR.L1.ZKLIGHTER_ESCROW));
  const escrowBal = hexToTokens(escrowBalHex);
  const escrowRow = {
    date: todayIso,
    balance_tokens: escrowBal,
    pct_of_supply: totalSupply > 0 ? escrowBal / totalSupply : 0,
    source: 'alchemy_eth_call_balanceOf',
    verification: 'onchain'
  };
  fs.writeFileSync(ESCROW_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(ESCROW_PATH, []), [escrowRow]), null, 2));

  // 3. LIT flow through Escrow (last N days)
  const currentBlock = parseInt(await mainnet.getBlockNumber(), 16);
  const fromBlock = currentBlock - LOOKBACK_DAYS * BLOCKS_PER_DAY;
  console.log(`[lit-l1] Escrow LIT flow last ${LOOKBACK_DAYS}d`);

  const aggregate = async (direction) => {
    const opts = {
      fromBlock: '0x' + fromBlock.toString(16),
      toBlock: 'latest',
      category: ['erc20'],
      contractAddresses: [ADDR.L1.LIT],
      order: 'asc',
      maxCount: '0x3e8',
      withMetadata: true
    };
    if (direction === 'in') opts.toAddress = ADDR.L1.ZKLIGHTER_ESCROW;
    else opts.fromAddress = ADDR.L1.ZKLIGHTER_ESCROW;
    const tx = await mainnet.getAssetTransfersAll(opts);
    const byDay = new Map();
    for (const t of tx) {
      const date = t.metadata?.blockTimestamp?.slice(0, 10);
      if (!date) continue;
      const v = Number(t.value);
      if (!Number.isFinite(v)) continue;
      const e = byDay.get(date) ?? { in: 0, out: 0, txs: 0 };
      e[direction === 'in' ? 'in' : 'out'] += v;
      e.txs += 1;
      byDay.set(date, e);
    }
    return byDay;
  };

  const inFlow = await aggregate('in');
  const outFlow = await aggregate('out');

  const allDates = new Set([...inFlow.keys(), ...outFlow.keys()]);
  const flowRows = Array.from(allDates).sort().map((date) => {
    const i = inFlow.get(date) || { in: 0, txs: 0 };
    const o = outFlow.get(date) || { out: 0, txs: 0 };
    return {
      date,
      lit_in_tokens: i.in || 0,
      lit_out_tokens: o.out || 0,
      net_tokens: (i.in || 0) - (o.out || 0),
      tx_count: (i.txs || 0) + (o.txs || 0),
      source: 'alchemy_asset_transfers',
      verification: 'onchain'
    };
  });

  fs.writeFileSync(ESCROW_FLOW_PATH, JSON.stringify(mergeDaily(loadJsonOrDefault(ESCROW_FLOW_PATH, []), flowRows), null, 2));

  // Summary
  console.log('');
  console.log(`[lit-l1] ${todayIso}`);
  console.log(`  LIT total supply: ${totalSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })} LIT`);
  console.log(`  Escrow balance:   ${escrowBal.toLocaleString(undefined, { maximumFractionDigits: 0 })} LIT (${(escrowRow.pct_of_supply * 100).toFixed(2)}% of supply)`);
  console.log(`  ${LOOKBACK_DAYS}d Escrow flow: ${flowRows.length} active days`);
  const sumIn = flowRows.reduce((s, r) => s + r.lit_in_tokens, 0);
  const sumOut = flowRows.reduce((s, r) => s + r.lit_out_tokens, 0);
  console.log(`    IN  (bridged to L2):   ${sumIn.toLocaleString(undefined, { maximumFractionDigits: 0 })} LIT`);
  console.log(`    OUT (bridged from L2): ${sumOut.toLocaleString(undefined, { maximumFractionDigits: 0 })} LIT`);
  console.log(`    NET:                   ${(sumIn - sumOut).toLocaleString(undefined, { maximumFractionDigits: 0 })} LIT`);
  console.log(`[lit-l1] wrote ${path.relative(ROOT, SUPPLY_PATH)}`);
  console.log(`[lit-l1] wrote ${path.relative(ROOT, ESCROW_PATH)}`);
  console.log(`[lit-l1] wrote ${path.relative(ROOT, ESCROW_FLOW_PATH)}`);
}

main().catch((err) => {
  console.error('[lit-l1] failed:', err.message);
  process.exit(1);
});
