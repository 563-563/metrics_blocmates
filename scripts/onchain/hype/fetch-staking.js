#!/usr/bin/env node
/**
 * Snapshot total HYPE staked across all HyperCore validators.
 * Daily delta day-over-day = net staking lockup (TP sink component).
 *
 * Uses HL Info API endpoint:
 *   { "type": "validatorSummaries" }
 *
 * Output:
 *   data/onchain/hype/staking.json
 *     [{ date, total_staked_tokens, validator_count, delta_tokens, source, verification }, ...]
 *
 * Run: node scripts/onchain/hype/fetch-staking.js
 */

const fs = require('fs');
const path = require('path');

const { info } = require('./hl-api');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'onchain', 'hype');
const OUT_PATH = path.join(OUT_DIR, 'staking.json');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function mergeDaily(existing, incoming) {
  const byDate = new Map();
  for (const r of existing) byDate.set(r.date, r);
  for (const r of incoming) byDate.set(r.date, r);
  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// HYPE on HyperCore uses 8 decimals (wei equivalent = 1e8 per HYPE).
const HYPE_DECIMALS = 8;
const HYPE_UNIT = 10 ** HYPE_DECIMALS;

// Extract a stake field from a validator entry — try the common names.
// Values are returned in 8-decimal native units; convert to whole HYPE.
function extractStake(v) {
  const candidates = ['stake', 'totalStake', 'amount', 'totalStaked', 'amountStaked'];
  for (const k of candidates) {
    const raw = v[k];
    if (raw == null) continue;
    const n = typeof raw === 'string' ? parseFloat(raw) : raw;
    if (Number.isFinite(n)) return n / HYPE_UNIT;
  }
  return null;
}

async function main() {
  ensureDir(OUT_DIR);

  console.log(`[hype-staking] querying validatorSummaries`);
  const summaries = await info({ type: 'validatorSummaries' });
  if (!Array.isArray(summaries)) {
    throw new Error(`validatorSummaries returned non-array (${typeof summaries})`);
  }
  console.log(`[hype-staking] ${summaries.length} validators returned`);

  if (summaries.length === 0) {
    console.warn('[hype-staking] no validators in response — nothing to snapshot');
    return;
  }

  // Inspect the first validator so we know the actual field shape.
  const sampleKeys = Object.keys(summaries[0]);
  console.log(`[hype-staking] sample validator keys: ${sampleKeys.join(', ')}`);

  let total = 0;
  let counted = 0;
  let missing = 0;
  for (const v of summaries) {
    const stake = extractStake(v);
    if (stake == null) {
      missing++;
      continue;
    }
    total += stake;
    counted++;
  }

  if (counted === 0) {
    console.error('[hype-staking] could not extract stake from any validator');
    console.error('[hype-staking] first validator dump:');
    console.error(JSON.stringify(summaries[0], null, 2).slice(0, 1000));
    throw new Error('stake field not recognised — inspect response and update extractStake()');
  }

  const todayIso = new Date().toISOString().slice(0, 10);

  const existing = loadJsonOrDefault(OUT_PATH, []);
  const sortedExisting = existing.slice().sort((a, b) => a.date.localeCompare(b.date));
  // Pick the most recent row from a *prior* date, not just the last write —
  // hourly cron runs overwrite today's row, and "previous written" would be
  // today itself, turning the persisted delta into intra-day flux. Compare
  // against yesterday's final total instead.
  const prevDateRow = sortedExisting.filter((r) => r.date < todayIso).pop() || null;
  const deltaTokens = prevDateRow ? (total - prevDateRow.total_staked_tokens) : 0;

  const row = {
    date: todayIso,
    total_staked_tokens: total,
    validator_count: summaries.length,
    validators_with_stake_field: counted,
    validators_missing_stake_field: missing,
    delta_tokens: deltaTokens,
    delta_basis_date: prevDateRow ? prevDateRow.date : null,
    source: 'hyperliquid_info_api',
    verification: 'onchain'
  };

  const merged = mergeDaily(existing, [row]);
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

  console.log(`\n[hype-staking] ${todayIso}`);
  console.log(`  total staked:    ${Math.round(total).toLocaleString()} HYPE (${counted} validators)`);
  if (prevDateRow) {
    const sign = deltaTokens >= 0 ? '+' : '−';
    console.log(`  delta vs ${prevDateRow.date}: ${sign}${Math.round(Math.abs(deltaTokens)).toLocaleString()} HYPE`);
  } else {
    console.log(`  no prior-date snapshot — delta=0 (baseline)`);
  }
  if (missing > 0) {
    console.warn(`  warning: ${missing} validators missing a recognised stake field`);
  }
  console.log(`[hype-staking] wrote ${path.relative(ROOT, OUT_PATH)} (${merged.length} day rows total)`);
}

main().catch((err) => {
  console.error('[hype-staking] failed:', err.message);
  process.exit(1);
});
