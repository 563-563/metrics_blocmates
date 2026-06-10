#!/usr/bin/env node
/**
 * Pipeline output validation gate.
 *
 * Runs in the data cron AFTER all fetch + compute steps and BEFORE the git
 * commit. Exits non-zero if core outputs are stale or structurally broken, so
 * a bad run never ships. This is what lets the adapter fetch steps carry
 * continue-on-error: a flaky non-core adapter doesn't block the refresh, but
 * anything that corrupts or stales the CORE outputs (latest.json, HM/NP
 * snapshots, the HYPE buyback feed) fails the run before commit.
 *
 * Core cohort: HYPE, AAVE, SKY, LIT (per CLAUDE.md).
 *
 * Flags:
 *   --structure-only     skip freshness checks. For local runs against data
 *                        that was last committed by an earlier cron.
 *   --max-age-hours N    freshness tolerance for data/latest.json
 *                        (default 2 — fetch-data.js ran minutes earlier in
 *                        the same job).
 *
 * Run:
 *   node scripts/lib/validate-pipeline.js                    # CI gate
 *   node scripts/lib/validate-pipeline.js --structure-only   # local
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LATEST_PATH = path.join(ROOT, 'data', 'latest.json');
const HM_SEED_PATH = path.join(ROOT, 'data', 'hm', 'config.json');
const HM_LATEST_PATH = path.join(ROOT, 'data', 'hm', 'snapshots', 'latest.json');
const NP_LATEST_PATH = path.join(ROOT, 'data', 'np', 'snapshots', 'latest.json');

const CORE_SYMBOLS = ['HYPE', 'AAVE', 'SKY', 'LIT'];
// HYPE's AF buys back daily — a feed whose last row is older than this many
// days means the on-chain refresh has been failing silently.
const HYPE_FEED_MAX_AGE_DAYS = 5;

const argv = process.argv.slice(2);
const STRUCTURE_ONLY = argv.includes('--structure-only');
const maxAgeIdx = argv.indexOf('--max-age-hours');
const MAX_AGE_HOURS = maxAgeIdx >= 0 ? Number(argv[maxAgeIdx + 1]) : 2;

const errors = [];
const warnings = [];

function loadJsonOrError(p, label) {
  if (!fs.existsSync(p)) {
    errors.push(`${label}: file missing (${path.relative(ROOT, p)})`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    errors.push(`${label}: unparseable JSON (${e.message})`);
    return null;
  }
}

const todayIso = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------- latest.json
const latest = loadJsonOrError(LATEST_PATH, 'data/latest.json');
if (latest) {
  if (!Array.isArray(latest.tokens) || latest.tokens.length === 0) {
    errors.push('data/latest.json: tokens array empty or missing');
  } else {
    if (latest.tokens.length < 30) {
      warnings.push(`data/latest.json: only ${latest.tokens.length} tokens (expected ~38) — did fetch-data drop part of the cohort?`);
    }
    for (const sym of CORE_SYMBOLS) {
      const t = latest.tokens.find((x) => x.symbol === sym);
      if (!t) {
        errors.push(`data/latest.json: core token ${sym} missing`);
      } else if (!Number.isFinite(t.price) || t.price <= 0) {
        errors.push(`data/latest.json: core token ${sym} has bad price (${t.price})`);
      }
    }
  }
  if (!STRUCTURE_ONLY) {
    const ageHours = (Date.now() - new Date(latest.updated_at).getTime()) / 3.6e6;
    if (!Number.isFinite(ageHours) || ageHours > MAX_AGE_HOURS) {
      errors.push(`data/latest.json: stale — updated_at ${latest.updated_at} is ${ageHours.toFixed(1)}h old (max ${MAX_AGE_HOURS}h)`);
    }
  }
}

// ------------------------------------------------------------- HM snapshot
const hm = loadJsonOrError(HM_LATEST_PATH, 'data/hm/snapshots/latest.json');
if (hm) {
  if (hm.mode !== 'live') {
    errors.push(`HM snapshot: mode is '${hm.mode}' — a reproduce-article run overwrote latest.json`);
  }
  if (!STRUCTURE_ONLY && hm.as_of !== todayIso) {
    errors.push(`HM snapshot: as_of ${hm.as_of} ≠ today ${todayIso} — compute-hm did not run this cycle`);
  }
  if (!Array.isArray(hm.protocols) || hm.protocols.length === 0) {
    errors.push('HM snapshot: protocols array empty');
  } else {
    for (const sym of CORE_SYMBOLS) {
      const p = hm.protocols.find((x) => x.symbol === sym);
      if (!p) {
        errors.push(`HM snapshot: core protocol ${sym} missing`);
        continue;
      }
      // Warning, not error: a core protocol with zero real capture renders as
      // "no real capture" on the dashboard. Can be legitimate (dormant farm —
      // SKY since 2025-11) but always deserves eyes, so it's surfaced every run.
      if (!Number.isFinite(p.hm) || p.hm <= 0) {
        warnings.push(`HM snapshot: ${sym} HM is ${p.hm} (real capture $${p.real_capture_usd}) — core protocol showing 'no real capture'`);
      }
      if (!Number.isFinite(p.adj_mcap_usd) || p.adj_mcap_usd <= 0) {
        errors.push(`HM snapshot: ${sym} adj_mcap_usd is ${p.adj_mcap_usd}`);
      }
    }
    // CLAUDE.md: when an onchain feed is wired, compute must prefer it. HYPE's
    // feed is committed, so a fallback to seed means the feed broke.
    const hype = hm.protocols.find((x) => x.symbol === 'HYPE');
    if (hype && hype.annual_buyback_source?.source !== 'onchain_feed') {
      errors.push(`HM snapshot: HYPE annual buyback fell back to seed (source: ${hype.annual_buyback_source?.source}) — onchain feed missing or too short`);
    }
  }
}

// ------------------------------------------------------------- NP snapshot
const np = loadJsonOrError(NP_LATEST_PATH, 'data/np/snapshots/latest.json');
if (np) {
  if (!STRUCTURE_ONLY && np.as_of !== todayIso) {
    errors.push(`NP snapshot: as_of ${np.as_of} ≠ today ${todayIso} — compute-np did not run this cycle`);
  }
  if (!Array.isArray(np.protocols) || np.protocols.length === 0) {
    errors.push('NP snapshot: protocols array empty');
  }
}

// ------------------------------------------------- on-chain feed structure
const seed = loadJsonOrError(HM_SEED_PATH, 'data/hm/config.json');
if (seed?.protocols) {
  for (const [slug, row] of Object.entries(seed.protocols)) {
    for (const key of ['onchain_buybacks_path', 'onchain_holder_yield_path']) {
      const rel = row[key];
      if (!rel) continue;
      const feed = loadJsonOrError(path.join(ROOT, rel), `${slug} ${key}`);
      if (!feed) continue;
      if (!Array.isArray(feed)) {
        errors.push(`${slug} ${key}: not an array (${rel})`);
        continue;
      }
      const badRow = feed.find((r) => !r.date || (r.amount_usd != null && !Number.isFinite(Number(r.amount_usd))));
      if (badRow) {
        errors.push(`${slug} ${key}: malformed row ${JSON.stringify(badRow).slice(0, 120)}`);
      }
      // Recency only enforced for HYPE — AF buys daily. Other protocols'
      // buyback cadence is legitimately sparse/dormant.
      if (!STRUCTURE_ONLY && slug === 'hyperliquid' && key === 'onchain_buybacks_path' && feed.length > 0) {
        const lastDate = feed.map((r) => r.date).sort().pop();
        const ageDays = (new Date(todayIso) - new Date(lastDate)) / 8.64e7;
        if (ageDays > HYPE_FEED_MAX_AGE_DAYS) {
          errors.push(`hyperliquid buyback feed: last row ${lastDate} is ${ageDays.toFixed(0)}d old (max ${HYPE_FEED_MAX_AGE_DAYS}d) — fetch-af has been failing`);
        }
      }
    }
  }
}

// -------------------------------------------------------------------- report
for (const w of warnings) console.warn(`WARN  ${w}`);
if (errors.length > 0) {
  for (const e of errors) console.error(`ERROR ${e}`);
  console.error(`\nValidation FAILED with ${errors.length} error(s) — refusing to ship this run.`);
  process.exitCode = 1;
} else {
  console.log(`Validation passed${STRUCTURE_ONLY ? ' (structure-only)' : ''} — ${warnings.length} warning(s).`);
}
