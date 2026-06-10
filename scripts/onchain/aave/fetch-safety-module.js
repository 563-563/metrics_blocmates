#!/usr/bin/env node
/**
 * Daily snapshot of stkAAVE totalSupply + Ecosystem Reserve AAVE balance.
 * Day-over-day diff on stkAAVE.totalSupply() is the net staking lockup
 * (TP sink component, METHODOLOGY §2.6). Ecosystem Reserve outflow rate
 * is the Cat C emissions stream (informational).
 *
 * Outputs:
 *   data/onchain/aave/staking.json
 *     [{ date, total_staked_tokens, delta_tokens, delta_basis_date, ... }]
 *   data/onchain/aave/ecosystem-reserve.json
 *     [{ date, balance_tokens, ... }]
 *
 * Run: node scripts/onchain/aave/fetch-safety-module.js
 */

const fs = require('fs');
const path = require('path');

const { mainnet } = require('../../lib/alchemy');
const { ensureDir, loadJsonOrDefault, mergeDaily, hexToTokens, balanceOfData, TOTAL_SUPPLY_SELECTOR, priorDateRow } = require('../../lib/evm-adapter-utils');
const { AAVE, STK_AAVE, ECOSYSTEM_RESERVE } = require('./addresses');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'aave');
const STAKING_PATH = path.join(OUT_DIR, 'staking.json');
const RESERVE_PATH = path.join(OUT_DIR, 'ecosystem-reserve.json');

const AAVE_DECIMALS = 18;
// stkAAVE has 18 decimals too — same ratio as the underlying.
const STK_AAVE_DECIMALS = 18;

async function main() {
  ensureDir(OUT_DIR);
  const todayIso = new Date().toISOString().slice(0, 10);

  // 1. stkAAVE totalSupply
  console.log(`[aave-sm] reading stkAAVE.totalSupply()`);
  const totalSupplyHex = await mainnet.ethCall(STK_AAVE, TOTAL_SUPPLY_SELECTOR);
  const totalStaked = hexToTokens(totalSupplyHex, STK_AAVE_DECIMALS);

  const stakingExisting = loadJsonOrDefault(STAKING_PATH, []);
  const prev = priorDateRow(stakingExisting, todayIso);
  const delta = prev ? totalStaked - prev.total_staked_tokens : 0;

  const stakingRow = {
    date: todayIso,
    total_staked_tokens: totalStaked,
    delta_tokens: delta,
    delta_basis_date: prev?.date ?? null,
    source: 'alchemy_eth_call_totalSupply',
    verification: 'onchain'
  };
  const stakingMerged = mergeDaily(stakingExisting, [stakingRow]);
  fs.writeFileSync(STAKING_PATH, JSON.stringify(stakingMerged, null, 2));

  // 2. Ecosystem Reserve balance
  console.log(`[aave-sm] reading AAVE.balanceOf(EcosystemReserve)`);
  const reserveHex = await mainnet.ethCall(AAVE, balanceOfData(ECOSYSTEM_RESERVE));
  const reserveBalance = hexToTokens(reserveHex, AAVE_DECIMALS);

  const reserveRow = {
    date: todayIso,
    balance_tokens: reserveBalance,
    source: 'alchemy_eth_call_balanceOf',
    verification: 'onchain'
  };
  const reserveExisting = loadJsonOrDefault(RESERVE_PATH, []);
  const reserveMerged = mergeDaily(reserveExisting, [reserveRow]);
  fs.writeFileSync(RESERVE_PATH, JSON.stringify(reserveMerged, null, 2));

  // Summary
  console.log('');
  console.log(`[aave-sm] ${todayIso}`);
  console.log(`  stkAAVE total supply: ${totalStaked.toLocaleString(undefined, { maximumFractionDigits: 2 })} stkAAVE`);
  if (prev) {
    const sign = delta >= 0 ? '+' : '−';
    console.log(`  delta vs ${prev.date}: ${sign}${Math.abs(delta).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
  } else {
    console.log(`  no prior snapshot — baseline established`);
  }
  console.log(`  Ecosystem Reserve AAVE: ${reserveBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
  console.log(`[aave-sm] wrote ${path.relative(ROOT, STAKING_PATH)} (${stakingMerged.length} day rows)`);
  console.log(`[aave-sm] wrote ${path.relative(ROOT, RESERVE_PATH)} (${reserveMerged.length} day rows)`);
}

main().catch((err) => {
  console.error('[aave-sm] failed:', err.message);
  process.exit(1);
});
