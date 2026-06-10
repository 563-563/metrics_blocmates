/**
 * Shared utilities for the on-chain adapter scripts (scripts/onchain/**).
 *
 * Before this lib existed every adapter carried its own copy of these
 * (PROTOCOL-PLAYBOOK said "copy the closest example", which propagated the
 * copies). Adapters should import from here; copy the STRUCTURE of the
 * nearest adapter, not its helper functions.
 */

const fs = require('fs');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

/**
 * Merge daily-row arrays by date — incoming rows replace existing rows for
 * the same date wholesale. Adapters must therefore always write FULL-day
 * aggregates (see scan-checkpoint.js on why scans re-cover the last ~2 days).
 */
function mergeDaily(existing, incoming) {
  const m = new Map();
  for (const r of existing) m.set(r.date, r);
  for (const r of incoming) m.set(r.date, r);
  return Array.from(m.values()).sort((a, b) => a.date.localeCompare(b.date));
}

function getArgInt(name, dflt) {
  const i = process.argv.indexOf(name);
  if (i < 0) return dflt;
  const v = parseInt(process.argv[i + 1], 10);
  return Number.isFinite(v) ? v : dflt;
}

/** "0x…" fixed-decimal hex → human float. BigInt division avoids float loss. */
function hexToTokens(hex, decimals = 18) {
  if (!hex || hex === '0x') return 0;
  const wei = BigInt(hex);
  const whole = Number(wei / 10n ** BigInt(decimals));
  const frac = Number(wei % 10n ** BigInt(decimals)) / Number(10n ** BigInt(decimals));
  return whole + frac;
}

/** eth_call data for ERC-20 balanceOf(address). */
function balanceOfData(addr) {
  return '0x70a08231' + addr.slice(2).padStart(64, '0').toLowerCase();
}

/** eth_call data for ERC-20 totalSupply(). */
const TOTAL_SUPPLY_SELECTOR = '0x18160ddd';

/**
 * Most recent row from a date STRICTLY BEFORE todayIso.
 *
 * This is the only correct delta basis for daily snapshot feeds. Using the
 * last written row corrupts the persisted delta when the cron runs more than
 * once per day: the second run's "previous" row is today's own earlier
 * snapshot, so the stored delta becomes intra-day flux instead of
 * day-over-day change. (compute-np's `daily_snapshot_diff` source type also
 * recomputes deltas from the total column at read time, so consumers never
 * trust the persisted field — but persist it correctly anyway.)
 */
function priorDateRow(rows, todayIso) {
  return rows
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((r) => r.date < todayIso)
    .pop() || null;
}

module.exports = {
  ensureDir,
  loadJsonOrDefault,
  mergeDaily,
  getArgInt,
  hexToTokens,
  balanceOfData,
  TOTAL_SUPPLY_SELECTOR,
  priorDateRow
};
