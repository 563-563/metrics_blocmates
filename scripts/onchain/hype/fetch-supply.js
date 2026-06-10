#!/usr/bin/env node
/**
 * Compute HYPE circulating supply deterministically from the vesting schedule.
 * Sum of all unlocks where unlock_date <= today.
 *
 * Ported from truepressure-extracted/.../workers/adapters/hyperliquid/supply.ts.
 *
 * Output:
 *   data/onchain/hype/supply.json
 *     [{ date, circulating_supply, total_supply, max_supply, source, verification }, ...]
 *
 * Run: node scripts/onchain/hype/fetch-supply.js
 */

const fs = require('fs');
const path = require('path');

const { HYPE_TOTAL_SUPPLY, generateUnlockSchedule } = require('./tokenomics');
const { ensureDir, loadJsonOrDefault, mergeDaily } = require('../../lib/evm-adapter-utils');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'hype');
const OUT_PATH = path.join(OUT_DIR, 'supply.json');

function main() {
  ensureDir(OUT_DIR);

  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);

  const schedule = generateUnlockSchedule(today);
  const circulating = schedule
    .filter((r) => r.unlock_date <= todayIso)
    .reduce((s, r) => s + r.amount_tokens, 0);

  const row = {
    date: todayIso,
    circulating_supply: circulating,
    total_supply: HYPE_TOTAL_SUPPLY,
    max_supply: HYPE_TOTAL_SUPPLY,
    source: 'derived_from_tokenomics',
    verification: 'onchain_equivalent'
  };

  const existing = loadJsonOrDefault(OUT_PATH, []);
  const merged = mergeDaily(existing, [row]);
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

  console.log(`[hype-supply] ${todayIso} circulating=${Math.round(circulating).toLocaleString()} / total=${HYPE_TOTAL_SUPPLY.toLocaleString()}`);
  console.log(`[hype-supply] wrote ${path.relative(ROOT, OUT_PATH)} (${merged.length} day rows total)`);
}

main();
