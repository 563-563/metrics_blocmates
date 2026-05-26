#!/usr/bin/env node
/**
 * Merge ASXN's hl-buybacks history into data/onchain/hype-af/buybacks.json.
 *
 * Defensive about field shape — ASXN's exact JSON layout isn't documented,
 * so this script tries a few common patterns and reports which one matched.
 * If none match, dumps the first row so we can update the field detection.
 *
 * Merge policy:
 *   - For dates where ASXN has data but our HL-Info-API file doesn't → take ASXN.
 *   - For dates where both have data → keep the existing HL row (it's our
 *     primary on-chain source; ASXN backfill is supplementary).
 *   - Output rows from ASXN get source: 'asxn_backfill', verification: 'onchain'
 *     (ASXN sources from on-chain themselves).
 *
 * Run: node scripts/external/asxn-merge.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const ASXN_PATH = path.join(ROOT, 'data', 'external', 'asxn', 'hl-buybacks.json');
const HYPE_PATH = path.join(ROOT, 'data', 'onchain', 'hype-af', 'buybacks.json');
const PRICE_OUT = path.join(ROOT, 'data', 'external', 'asxn', 'hype-price-daily.json');
const PRICE_SRC = path.join(ROOT, 'data', 'external', 'asxn', 'hype-price.json');

function loadJsonOrDie(p) {
  if (!fs.existsSync(p)) {
    console.error(`[merge] required file missing: ${path.relative(ROOT, p)}`);
    console.error('[merge] run scripts/external/asxn-backfill.js first');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

// Pull an array of rows out of whatever wrapper ASXN uses.
function extractRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.buybacks)) return payload.buybacks;
  if (Array.isArray(payload?.result)) return payload.result;
  console.error('[merge] could not find row array in ASXN payload. Top-level keys:', Object.keys(payload));
  process.exit(1);
}

// Normalise one ASXN row into our schema.
// Tries several common field names per slot — if all fail we dump and exit.
function normaliseRow(raw) {
  const date =
    raw.date || raw.day || raw.timestamp_day || raw.dt ||
    (raw.timestamp ? new Date(raw.timestamp * (raw.timestamp > 1e12 ? 1 : 1000)).toISOString().slice(0, 10) : null);

  const amount_usd =
    raw.amount_usd ?? raw.usd ?? raw.usd_amount ?? raw.usd_value ??
    raw.buyback_usd ?? raw.value_usd ??
    raw.ntl ?? null;  // HL native: ntl = notional USD

  const amount_tokens =
    raw.amount_tokens ?? raw.hype ?? raw.hype_amount ?? raw.amount_hype ??
    raw.tokens ?? raw.buyback_hype ??
    raw.sz ?? null;   // HL native: sz = size in tokens

  const avg_price_usd =
    raw.avg_price_usd ?? raw.avg_price ?? raw.price ?? raw.price_usd ??
    raw.average_price ?? raw.avg ??
    (amount_usd && amount_tokens ? amount_usd / amount_tokens : null);

  return { date, amount_usd, amount_tokens, avg_price_usd, _raw_keys: Object.keys(raw) };
}

function main() {
  const asxnPayload = loadJsonOrDie(ASXN_PATH);
  const asxnRows = extractRows(asxnPayload);
  console.log(`[merge] ASXN payload contains ${asxnRows.length} rows`);

  if (asxnRows.length === 0) {
    console.error('[merge] ASXN payload was empty array — nothing to merge');
    process.exit(1);
  }

  // Show first row keys so we can update normaliseRow() if needed.
  console.log(`[merge] first ASXN row keys: ${Object.keys(asxnRows[0]).join(', ')}`);

  const normalised = asxnRows.map(normaliseRow);
  const sample = normalised[0];
  console.log(`[merge] first normalised row: date=${sample.date} usd=${sample.amount_usd} tokens=${sample.amount_tokens} avg_px=${sample.avg_price_usd}`);

  const usable = normalised.filter((r) => r.date && (r.amount_usd != null || r.amount_tokens != null));
  if (usable.length === 0) {
    console.error('[merge] no rows could be normalised. Update normaliseRow() field aliases.');
    console.error('[merge] raw first row:', JSON.stringify(asxnRows[0], null, 2));
    process.exit(1);
  }
  console.log(`[merge] ${usable.length}/${normalised.length} rows usable`);

  // Build merged date map.
  const hypeRows = loadJsonOrDefault(HYPE_PATH, []);
  const byDate = new Map();
  for (const r of hypeRows) byDate.set(r.date, r);  // HL data first

  let added = 0;
  let skipped = 0;
  for (const r of usable) {
    if (byDate.has(r.date)) { skipped++; continue; }
    byDate.set(r.date, {
      date: r.date,
      amount_tokens: r.amount_tokens ?? 0,
      amount_usd: r.amount_usd ?? 0,
      avg_price_usd: r.avg_price_usd ?? 0,
      fill_count: null,  // ASXN doesn't expose per-fill count
      source: 'asxn_backfill',
      verification: 'onchain'
    });
    added++;
  }

  const merged = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(HYPE_PATH, JSON.stringify(merged, null, 2));

  console.log('');
  console.log(`[merge] HYPE buybacks.json:`);
  console.log(`  added from ASXN: ${added}`);
  console.log(`  preserved (HL-API authoritative): ${skipped}`);
  console.log(`  total rows now: ${merged.length}`);
  if (merged.length > 0) {
    console.log(`  date range: ${merged[0].date} → ${merged[merged.length - 1].date}`);
    const usdSum = merged.reduce((s, r) => s + Number(r.amount_usd || 0), 0);
    const tokSum = merged.reduce((s, r) => s + Number(r.amount_tokens || 0), 0);
    console.log(`  cumulative buyback: $${usdSum.toLocaleString(undefined, { maximumFractionDigits: 0 })} / ${Math.round(tokSum).toLocaleString()} HYPE`);
  }

  // Fold AF balance history into a treasury-history file (forward-only — existing single snapshot file is daily live snapshots).
  const AF_HOLDINGS_SRC = path.join(ROOT, 'data', 'external', 'asxn', 'assistance-fund-holdings.json');
  const AF_HIST_OUT = path.join(ROOT, 'data', 'onchain', 'hype-af', 'treasury-history.json');
  if (fs.existsSync(AF_HOLDINGS_SRC)) {
    const afRaw = JSON.parse(fs.readFileSync(AF_HOLDINGS_SRC, 'utf8'));
    const afRows = extractRows(afRaw);
    const afNorm = afRows
      .map((r) => ({
        date: r.datetime ? r.datetime.slice(0, 10) :
              r.date ? r.date :
              (r.timestamp ? new Date(r.timestamp * (r.timestamp > 1e12 ? 1 : 1000)).toISOString().slice(0, 10) : null),
        balance_tokens: r.balance ?? r.amount_tokens ?? r.amount ?? null,
        source: 'asxn_backfill',
        verification: 'onchain'
      }))
      .filter((r) => r.date && r.balance_tokens != null);
    fs.writeFileSync(AF_HIST_OUT, JSON.stringify(afNorm, null, 2));
    console.log(`[merge] wrote ${afNorm.length} AF balance history rows to ${path.relative(ROOT, AF_HIST_OUT)}`);
    if (afNorm.length > 0) {
      const first = afNorm[0], last = afNorm[afNorm.length - 1];
      const accum = last.balance_tokens - first.balance_tokens;
      console.log(`  range: ${first.date} (${Math.round(first.balance_tokens).toLocaleString()} HYPE) → ${last.date} (${Math.round(last.balance_tokens).toLocaleString()} HYPE)`);
      console.log(`  total accumulation: +${Math.round(accum).toLocaleString()} HYPE`);
    }
  }

  // While we're at it: extract daily HYPE price into its own file if present.
  if (fs.existsSync(PRICE_SRC)) {
    const pricePayload = JSON.parse(fs.readFileSync(PRICE_SRC, 'utf8'));
    const priceRows = extractRows(pricePayload);
    if (priceRows.length > 0) {
      console.log(`[merge] hype-price has ${priceRows.length} rows — first keys: ${Object.keys(priceRows[0]).join(', ')}`);
      // Just save normalised view — actual integration into compute-np.js is a follow-up.
      const priceNorm = priceRows
        .map((r) => ({
          date: r.date || r.day || (r.timestamp ? new Date(r.timestamp * (r.timestamp > 1e12 ? 1 : 1000)).toISOString().slice(0, 10) : null),
          price_usd: r.price ?? r.price_usd ?? r.close ?? r.avg ?? null,
          _raw_keys: Object.keys(r)
        }))
        .filter((r) => r.date && r.price_usd != null);
      fs.writeFileSync(PRICE_OUT, JSON.stringify(priceNorm.map(({_raw_keys, ...rest}) => rest), null, 2));
      console.log(`[merge] wrote ${priceNorm.length} HYPE daily prices to ${path.relative(ROOT, PRICE_OUT)}`);
    }
  }
}

main();
