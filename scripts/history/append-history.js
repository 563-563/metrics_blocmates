#!/usr/bin/env node
/**
 * Append today's DL+CG snapshot from data/latest.json into per-symbol history
 * files at data/history/<SYMBOL>.json. Idempotent — re-runs on the same UTC
 * date overwrite that date's row rather than duplicating.
 *
 * Also appends a row to data/history/_hm-history.json and
 * data/history/_np-history.json (when the snapshots exist) so the headline
 * multiples accumulate without re-reading the full per-day snapshot files.
 *
 * Schema per token row:
 *   {
 *     date, price, mcap, fdv, circulating_supply, total_supply,
 *     tvl, fees_24h, fees_7d, fees_30d, fees_1y,
 *     revenue_30d, revenue_1y,
 *     holders_revenue_30d, holders_revenue_1y, holders_revenue_annualized,
 *     mcap_to_fees, mcap_to_revenue, source_updated_at
 *   }
 *
 * Run: node scripts/history/append-history.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LATEST_PATH       = path.join(ROOT, 'data', 'latest.json');
const HM_SNAPSHOT_PATH  = path.join(ROOT, 'data', 'hm', 'snapshots', 'latest.json');
const NP_SNAPSHOT_PATH  = path.join(ROOT, 'data', 'np', 'snapshots', 'latest.json');
const HISTORY_DIR       = path.join(ROOT, 'data', 'history');
const HM_HISTORY_PATH   = path.join(HISTORY_DIR, '_hm-history.json');
const NP_HISTORY_PATH   = path.join(HISTORY_DIR, '_np-history.json');

function loadJsonOrDefault(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Replace any existing row for `date`, then sort.
function upsertByDate(rows, newRow) {
  const filtered = rows.filter((r) => r.date !== newRow.date);
  filtered.push(newRow);
  return filtered.sort((a, b) => a.date.localeCompare(b.date));
}

function pickTokenRow(t, date, sourceUpdatedAt) {
  return {
    date,
    price: t.price ?? null,
    price_change_24h_pct: t.price_change_24h_pct ?? null,
    volume_24h: t.volume_24h ?? null,
    mcap: t.market_cap ?? null,
    fdv: t.fdv ?? null,
    circulating_supply: t.circulating_supply ?? null,
    total_supply: t.total_supply ?? null,
    tvl: t.tvl ?? null,
    fees_24h: t.fees_24h ?? null,
    fees_7d: t.fees_7d ?? null,
    fees_30d: t.fees_30d ?? null,
    fees_1y: t.fees_1y ?? null,
    revenue_24h: t.revenue_24h ?? null,
    revenue_7d: t.revenue_7d ?? null,
    revenue_30d: t.revenue_30d ?? null,
    revenue_1y: t.revenue_1y ?? null,
    holders_revenue_24h: t.holders_revenue_24h ?? null,
    holders_revenue_7d: t.holders_revenue_7d ?? null,
    holders_revenue_30d: t.holders_revenue_30d ?? null,
    holders_revenue_1y: t.holders_revenue_1y ?? null,
    holders_revenue_annualized: t.holders_revenue_annualized ?? null,
    mcap_to_fees: t.mcap_to_fees ?? null,
    mcap_to_revenue: t.mcap_to_revenue ?? null,
    mcap_to_tvl: t.mcap_to_tvl ?? null,
    source_updated_at: sourceUpdatedAt
  };
}

function appendPerToken(latest) {
  ensureDir(HISTORY_DIR);
  const date = todayIso();
  const sourceUpdatedAt = latest.updated_at || null;
  let written = 0;
  let skipped = 0;
  for (const t of latest.tokens || []) {
    if (!t.symbol) { skipped++; continue; }
    const file = path.join(HISTORY_DIR, `${t.symbol}.json`);
    const existing = loadJsonOrDefault(file, []);
    const row = pickTokenRow(t, date, sourceUpdatedAt);
    const updated = upsertByDate(existing, row);
    fs.writeFileSync(file, JSON.stringify(updated, null, 2));
    written++;
  }
  return { written, skipped };
}

function appendHmHistory() {
  if (!fs.existsSync(HM_SNAPSHOT_PATH)) return null;
  const snap = JSON.parse(fs.readFileSync(HM_SNAPSHOT_PATH, 'utf8'));
  if (snap.mode === 'reproduce-article') return { skipped: 'mode=reproduce-article' };

  const date = snap.as_of || todayIso();
  const row = {
    date,
    generated_at: snap.generated_at,
    mode: snap.mode,
    protocols: {}
  };
  for (const p of snap.protocols || []) {
    row.protocols[p.symbol] = {
      price_usd: p.price_usd,
      float_mcap_usd: p.float_mcap_usd,
      adj_mcap_usd: p.adj_mcap_usd,
      fdv_usd: p.fdv_usd,
      real_capture_usd: p.real_capture_usd,
      annual_buyback_usd: p.annual_buyback_usd,
      annual_holder_yield_usd: p.annual_holder_yield_usd,
      unlocks_24mo_usd: p.unlocks_24mo_usd,
      emissions_24mo_usd: p.emissions_24mo_usd,
      buybacks_24mo_usd: p.buybacks_24mo_usd,
      hm: p.hm,
      hm_band: p.hm_band,
      verification: p.annual_buyback_verification,
      phase: p.phase?.active || null
    };
  }
  const existing = loadJsonOrDefault(HM_HISTORY_PATH, []);
  const updated = upsertByDate(existing, row);
  fs.writeFileSync(HM_HISTORY_PATH, JSON.stringify(updated, null, 2));
  return { written: Object.keys(row.protocols).length };
}

function appendNpHistory() {
  if (!fs.existsSync(NP_SNAPSHOT_PATH)) return null;
  const snap = JSON.parse(fs.readFileSync(NP_SNAPSHOT_PATH, 'utf8'));
  const date = snap.as_of || todayIso();
  const row = {
    date,
    generated_at: snap.generated_at,
    protocols: {}
  };
  for (const p of snap.protocols || []) {
    const rollups = p.rollups || {};
    row.protocols[p.symbol] = {
      price_usd: p.price_usd,
      static_reference: p.static_reference,
      rollups: Object.fromEntries(
        Object.entries(rollups).map(([k, r]) => [k, {
          net_pressure_tokens: r.net_pressure_tokens,
          net_pressure_usd: r.net_pressure_usd,
          unlocks_tokens: r.unlocks_tokens,
          buybacks_tokens: r.buybacks_tokens,
          buyback_coverage_pct: r.buyback_coverage_pct,
          coverage_complete: r.coverage_complete
        }])
      )
    };
  }
  const existing = loadJsonOrDefault(NP_HISTORY_PATH, []);
  const updated = upsertByDate(existing, row);
  fs.writeFileSync(NP_HISTORY_PATH, JSON.stringify(updated, null, 2));
  return { written: Object.keys(row.protocols).length };
}

function main() {
  const latest = loadJsonOrDefault(LATEST_PATH, null);
  if (!latest) {
    console.error('[history] data/latest.json missing — run scripts/fetch-data.js first');
    process.exit(1);
  }

  ensureDir(HISTORY_DIR);
  const tokenResult = appendPerToken(latest);
  const hmResult = appendHmHistory();
  const npResult = appendNpHistory();

  console.log(`[history] per-token: ${tokenResult.written} symbols written to data/history/`);
  if (hmResult) console.log(`[history] HM history: ${JSON.stringify(hmResult)}`);
  else         console.log(`[history] HM history: skipped (data/hm/snapshots/latest.json missing)`);
  if (npResult) console.log(`[history] NP history: ${JSON.stringify(npResult)}`);
  else         console.log(`[history] NP history: skipped (data/np/snapshots/latest.json missing)`);
}

main();
