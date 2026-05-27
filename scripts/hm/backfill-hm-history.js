#!/usr/bin/env node
/**
 * Recompute the Holder Multiple as-of each of the last N days, producing a
 * per-protocol HM time series for charting.
 *
 * For each historical date D:
 *   price(D)          from the protocol's daily price feed
 *   float_mcap(D)     = price(D) × circulating (current circ held constant —
 *                       it moves slowly; the series is driven by price + buyback)
 *   24mo unlocks(D)   = unlocks_24mo_tokens × price(D)   (gross, per HM spec)
 *   24mo emissions(D) = emissions_24mo_tokens × price(D)
 *   annual_buyback(D) = trailing-60d buyback sum as-of D ÷ 60 × 365
 *   adj_mcap(D)       = float + unlocks + emissions − annual_buyback(D)×2
 *   real_capture(D)   = annual_buyback(D) + annual_holder_yield (Cat B, static)
 *   HM(D)             = adj_mcap(D) / real_capture(D)
 *
 * Only protocols with a daily buyback feed AND a daily price source produce a
 * series. SKY (dormant, no buyback) is skipped — its HM is ∞ throughout.
 *
 * Output: data/hm/history/<slug>.json
 *   [{ date, hm, hm_band, price_usd, adj_mcap_usd, real_capture_usd,
 *      annual_buyback_usd }, ...]
 *
 * Run: node scripts/hm/backfill-hm-history.js [--days 120]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SEED_PATH = path.join(ROOT, 'data', 'hm', 'config.json');
const LATEST_PATH = path.join(ROOT, 'data', 'latest.json');
const OUT_DIR = path.join(ROOT, 'data', 'hm', 'history');

function getArgInt(name, dflt) {
  const i = process.argv.indexOf(name);
  if (i < 0) return dflt;
  const v = parseInt(process.argv[i + 1], 10);
  return Number.isFinite(v) ? v : dflt;
}
const DAYS = getArgInt('--days', 120);

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function loadJsonOrDefault(p, fb) {
  if (!fs.existsSync(p)) return fb;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fb; }
}
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function hmBand(hm) {
  if (!isFinite(hm)) return 'no real capture';
  if (hm < 10) return 'exceptional';
  if (hm < 20) return 'strong';
  if (hm < 35) return 'fair value';
  if (hm < 50) return 'expensive';
  return 'speculative';
}

// Daily price map for a protocol: prefer the configured daily price feed,
// else the protocol's buyback feed's avg/price column, else null.
function buildPriceMap(seedRow) {
  const candidates = [
    seedRow.onchain_buybacks_path && { path: seedRow.onchain_buybacks_path, fields: ['avg_price_usd', 'price_usd'] }
  ].filter(Boolean);
  // Prefer an independent daily price feed (covers paused-buyback periods):
  //  1. CG price-history file (all protocols, from fetch-cg-price-history.js)
  //  2. HYPE's deeper ASXN OHLCV
  const cgPrice = `data/external/cg/${seedRow.slug}-price-daily.json`;
  if (fs.existsSync(path.join(ROOT, cgPrice))) {
    candidates.unshift({ path: cgPrice, fields: ['price_usd', 'close', 'price'] });
  }
  const hypePrice = path.join(ROOT, 'data', 'external', 'asxn', 'hype-price-daily.json');
  if (seedRow.slug === 'hyperliquid' && fs.existsSync(hypePrice)) {
    candidates.unshift({ path: 'data/external/asxn/hype-price-daily.json', fields: ['price_usd', 'close', 'price'] });
  }
  const m = new Map();
  for (const c of candidates) {
    const abs = path.join(ROOT, c.path);
    if (!fs.existsSync(abs)) continue;
    const rows = loadJson(abs);
    if (!Array.isArray(rows)) continue;
    for (const r of rows) {
      if (!r.date || m.has(r.date)) continue;
      for (const f of c.fields) {
        if (r[f] != null && Number.isFinite(Number(r[f]))) { m.set(r.date, Number(r[f])); break; }
      }
    }
  }
  return m;
}

// Daily buyback USD map.
function buildBuybackMap(seedRow) {
  const m = new Map();
  if (!seedRow.onchain_buybacks_path) return m;
  const abs = path.join(ROOT, seedRow.onchain_buybacks_path);
  if (!fs.existsSync(abs)) return m;
  const rows = loadJson(abs);
  if (!Array.isArray(rows)) return m;
  for (const r of rows) {
    if (r.date && r.amount_usd != null) m.set(r.date, Number(r.amount_usd));
  }
  return m;
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function main() {
  ensureDir(OUT_DIR);
  const seed = loadJson(SEED_PATH);
  const latest = loadJsonOrDefault(LATEST_PATH, { tokens: [] });

  const window = 60; // buyback trailing-window days (matches compute-hm default)

  for (const seedRow of Object.values(seed.protocols)) {
    const priceMap = buildPriceMap(seedRow);
    const buybackMap = buildBuybackMap(seedRow);
    if (priceMap.size === 0 || buybackMap.size === 0) {
      // Write an empty series so frontend imports stay uniform across protocols.
      fs.writeFileSync(path.join(OUT_DIR, `${seedRow.slug}.json`), '[]\n');
      console.log(`[hm-history] ${seedRow.symbol}: skipped (no price/buyback feed) — wrote empty series`);
      continue;
    }

    const live = (latest.tokens || []).find((t) => t.symbol === seedRow.config_symbol);
    // Circulating held constant across the series (slow-moving). On-chain
    // override > live CG > article reference.
    let circulating = live?.circulating_supply ?? seedRow.article_circulating_tokens;
    if (seedRow.onchain_circulating_path) {
      const p = path.join(ROOT, seedRow.onchain_circulating_path);
      if (fs.existsSync(p)) {
        const payload = loadJson(p);
        const jp = (seedRow.onchain_circulating_jsonpath || 'circulating_supply').split('.');
        let v = payload; for (const seg of jp) v = v?.[seg];
        if (typeof v === 'number' && v > 0) circulating = v;
      }
    }

    const unlocksTok = seedRow.unlocks_24mo_tokens || 0;
    const emissionsTok = seedRow.emissions_24mo_tokens || 0;
    const holderYield = seedRow.annual_holder_yield_usd || 0; // static Cat B fallback

    const rows = [];
    const buybackDates = Array.from(buybackMap.keys()).sort();
    for (let i = DAYS - 1; i >= 0; i--) {
      const date = isoDaysAgo(i);
      const price = priceMap.get(date);
      if (price == null) continue; // no price that day → skip

      // trailing-60d buyback sum ending on `date`
      const start = isoDaysAgo(i + window - 1);
      let sumBB = 0, have = false;
      for (const d of buybackDates) {
        if (d > start && d <= date) { sumBB += buybackMap.get(d); have = true; }
      }
      if (!have) continue; // no buyback data in window → skip (feed not deep enough)
      const annualBuyback = (sumBB / window) * 365;

      const floatMcap = price * circulating;
      const unlocksUsd = price * unlocksTok;
      const emissionsUsd = price * emissionsTok;
      const adjMcap = floatMcap + unlocksUsd + emissionsUsd - annualBuyback * 2;
      const realCapture = annualBuyback + holderYield;
      const hm = realCapture > 0 ? adjMcap / realCapture : Infinity;

      rows.push({
        date,
        hm: isFinite(hm) ? Number(hm.toFixed(2)) : null,
        hm_band: hmBand(hm),
        price_usd: price,
        adj_mcap_usd: Math.round(adjMcap),
        real_capture_usd: Math.round(realCapture),
        annual_buyback_usd: Math.round(annualBuyback)
      });
    }

    const outPath = path.join(OUT_DIR, `${seedRow.slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(rows, null, 2));
    const valid = rows.filter((r) => r.hm != null);
    const lo = valid.length ? Math.min(...valid.map((r) => r.hm)) : null;
    const hi = valid.length ? Math.max(...valid.map((r) => r.hm)) : null;
    console.log(`[hm-history] ${seedRow.symbol}: ${rows.length} days (${rows[0]?.date}→${rows[rows.length-1]?.date}), HM range ${lo}×–${hi}×`);
  }
}

main();
