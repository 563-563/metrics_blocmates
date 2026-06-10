/**
 * Block-scan checkpointing for the Alchemy adapters.
 *
 * Problem: the trailing-window scripts (aave/fetch-collector, sky/fetch-sbe,
 * sky/fetch-rewards-farm, lit/fetch-l1) re-scanned their full 30–90 day block
 * window on every cron run. The data is committed, so all but the last day or
 * two of that scan is already on disk — ~95% of the Alchemy calls were re-reads.
 *
 * Scheme: after a successful scan up to block B, store B in a checkpoints.json
 * next to the feed outputs (inside data/, so the cron commit persists it across
 * CI runs). The next run resumes from B − RESCAN_OVERLAP_BLOCKS instead of the
 * full window.
 *
 * The ~2-day overlap is correctness, not caution: feeds are daily aggregates
 * merged by date, so a scan that ended mid-day wrote a partial-day row.
 * Re-scanning from before that day's 00:00 UTC recomputes the full-day total
 * before mergeDaily replaces the row. Resuming exactly at B would merge a
 * "rest of the day" total over the full-day row and undercount.
 *
 * A checkpoint older than the script's normal lookback window still works —
 * the resume point is simply earlier and the scan catches up (e.g. after the
 * cron was paused for a month).
 *
 * Escape hatches: pass --no-checkpoint to force the full-window scan, or
 * delete data/onchain/<protocol>/checkpoints.json.
 */

const fs = require('fs');

const BLOCKS_PER_DAY = 7200; // ~12s blocks on mainnet
const RESCAN_OVERLAP_BLOCKS = 2 * BLOCKS_PER_DAY;

function readCheckpoints(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; }
}

/**
 * Pick the scan start block. Returns { fromBlock, resumed }.
 *   windowFromBlock — what the script would use without a checkpoint
 *                     (currentBlock − lookbackDays × BLOCKS_PER_DAY)
 *   floorBlock      — never scan earlier than this (contract deploy block)
 */
function resolveFromBlock({ checkpointPath, key, windowFromBlock, floorBlock = 0 }) {
  if (process.argv.includes('--no-checkpoint')) {
    return { fromBlock: Math.max(floorBlock, windowFromBlock), resumed: false };
  }
  const cp = readCheckpoints(checkpointPath)[key];
  if (!Number.isFinite(cp?.last_scanned_block)) {
    return { fromBlock: Math.max(floorBlock, windowFromBlock), resumed: false };
  }
  const resume = Math.max(floorBlock, cp.last_scanned_block - RESCAN_OVERLAP_BLOCKS);
  return { fromBlock: resume, resumed: true };
}

/** Record a successful scan up to `block`. Call AFTER the feed files are written. */
function writeCheckpoint({ checkpointPath, key, block }) {
  const all = readCheckpoints(checkpointPath);
  all[key] = { last_scanned_block: block, updated: new Date().toISOString() };
  fs.writeFileSync(checkpointPath, JSON.stringify(all, null, 2));
}

module.exports = { resolveFromBlock, writeCheckpoint, BLOCKS_PER_DAY, RESCAN_OVERLAP_BLOCKS };
