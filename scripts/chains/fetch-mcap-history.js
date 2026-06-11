#!/usr/bin/env node
/**
 * Native-token market-cap history per chain — feeds the Buffett Indicator
 * (mcap ÷ annualized GDP) on the chains dashboard.
 *
 * Source: CoinGecko /coins/{id}/market_chart (market_caps series). The free
 * tier caps history at 365 days, so a fresh file starts one year deep and
 * the daily cron run extends it forward (merge by date, never overwrite the
 * past) — coverage grows beyond a year over time.
 *
 * Output: data/chains/mcap-history/<slug>.json — [{ date, mcap }]
 *
 * Run: node scripts/chains/fetch-mcap-history.js [--force]
 *   --force re-fetches even when a chain's file already has yesterday's row.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CONFIG_PATH = path.join(ROOT, 'data', 'chains', 'config.json');
const OUT_DIR = path.join(ROOT, 'data', 'chains', 'mcap-history');

const CG_BASE = 'https://api.coingecko.com/api/v3';
const FETCH_DELAY_MS = 2500; // free-tier friendly: ~24 calls/min ceiling

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchMarketChart(cgId, days) {
  const url = `${CG_BASE}/coins/${encodeURIComponent(cgId)}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (res.status === 429) {
      console.warn(`  [${cgId}] rate-limited, waiting 60s`);
      await sleep(60_000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    await sleep(FETCH_DELAY_MS);
    return json.market_caps || []; // [[tsMs, mcap], ...]
  }
  throw new Error(`gave up on ${cgId} after rate limits`);
}

function readExisting(file) {
  try {
    const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

async function main() {
  const force = process.argv.includes('--force');
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 8.64e7).toISOString().slice(0, 10);

  let fetched = 0;
  let skipped = 0;
  for (const [slug, c] of Object.entries(cfg.chains)) {
    if (!c.cg_id) continue;
    const file = path.join(OUT_DIR, `${slug}.json`);
    const existing = readExisting(file);
    const lastDate = existing.length > 0 ? existing[existing.length - 1].date : null;

    if (!force && lastDate && lastDate >= yesterday) {
      skipped++;
      continue; // already fresh — the cron runs daily, this is the common path
    }

    // New file → take the full free-tier year; otherwise a 30d top-up
    // comfortably covers any cron gap.
    const days = existing.length === 0 ? 365 : 30;
    let series;
    try {
      series = await fetchMarketChart(c.cg_id, days);
    } catch (e) {
      console.warn(`  ${slug} (${c.cg_id}): ${e.message} — keeping existing ${existing.length} rows`);
      continue;
    }

    const byDate = new Map(existing.map((r) => [r.date, r.mcap]));
    for (const [ts, mcap] of series) {
      const m = Number(mcap);
      if (!m || m <= 0) continue;
      const date = new Date(ts).toISOString().slice(0, 10);
      if (date > today) continue;
      byDate.set(date, Math.round(m)); // newest fetch wins on overlap
    }
    const merged = [...byDate.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, mcap]) => ({ date, mcap }));
    fs.writeFileSync(file, JSON.stringify(merged, null, 2));
    console.log(`  ${slug}: ${existing.length} → ${merged.length} rows (fetched ${days}d)`);
    fetched++;
  }
  console.log(`[mcap-history] done — ${fetched} fetched, ${skipped} already fresh`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
