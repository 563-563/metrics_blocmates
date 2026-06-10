#!/usr/bin/env node
/**
 * Daily snapshot of SKY locked in the LockStake Engine.
 *
 * Approach: read `SKY.balanceOf(LOCKSTAKE_ENGINE)` — the total SKY held by
 * the LSE contract IS the total currently locked. Day-over-day diff is the
 * net staking lockup (TP sink component).
 *
 * Outputs:
 *   data/onchain/sky/lockstake.json
 *     [{ date, total_staked_tokens, delta_tokens, ... }, ...]
 *
 * Run: node scripts/onchain/sky/fetch-lockstake.js
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const { ensureDir, loadJsonOrDefault, mergeDaily, hexToTokens, balanceOfData, priorDateRow } = require('../../lib/evm-adapter-utils');
const ADDR = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'sky');
const OUT_PATH = path.join(OUT_DIR, 'lockstake.json');

async function main() {
  ensureDir(OUT_DIR);
  const todayIso = new Date().toISOString().slice(0, 10);

  console.log('[sky-lockstake] reading SKY.balanceOf(LOCKSTAKE_ENGINE)');
  const balHex = await mainnet.ethCall(ADDR.SKY, balanceOfData(ADDR.LOCKSTAKE_ENGINE));
  const totalStaked = hexToTokens(balHex);

  const existing = loadJsonOrDefault(OUT_PATH, []);
  const prev = priorDateRow(existing, todayIso);
  const delta = prev ? totalStaked - prev.total_staked_tokens : 0;

  const row = {
    date: todayIso,
    total_staked_tokens: totalStaked,
    delta_tokens: delta,
    delta_basis_date: prev?.date ?? null,
    source: 'alchemy_eth_call_balanceOf',
    verification: 'onchain'
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(mergeDaily(existing, [row]), null, 2));

  console.log(`[sky-lockstake] ${todayIso}: ${totalStaked.toLocaleString(undefined, { maximumFractionDigits: 0 })} SKY locked`);
  if (prev) {
    const sign = delta >= 0 ? '+' : '−';
    console.log(`  delta vs ${prev.date}: ${sign}${Math.abs(delta).toLocaleString(undefined, { maximumFractionDigits: 0 })} SKY`);
  } else {
    console.log('  baseline (no prior snapshot)');
  }
  console.log(`[sky-lockstake] wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((err) => {
  console.error('[sky-lockstake] failed:', err.message);
  process.exit(1);
});
