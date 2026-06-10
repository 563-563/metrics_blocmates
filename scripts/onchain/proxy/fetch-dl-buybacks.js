#!/usr/bin/env node
/**
 * Generic DefiLlama daily-buyback proxy fetcher.
 *
 * For every protocol in data/config.json that:
 *   - has a defillama_slug
 *   - has value_accrual.mechanism in [buyback, buyback-burn, burn-mint]
 *   - has value_accrual.status === 'executing'
 *   - is NOT already covered by a dedicated on-chain adapter (HYPE/AAVE/SKY/LIT
 *     each have their own buyback feed sourced directly on-chain)
 *
 * …pull DefiLlama's daily holdersRevenue series and write it as a proxy
 * buyback feed under data/onchain/proxy/<slug>/buybacks.json.
 *
 * The output schema matches the existing dedicated adapters so compute-np.js
 * can consume it via the `daily_series` source type without branching:
 *
 *   [
 *     { date, amount_usd, amount_tokens, price_usd, source, verification:
 *       'proxy' }, ...
 *   ]
 *
 * For protocols where DL holdersRevenue is null (treasury-level buybacks like
 * COW, or proposed mechanisms), we fall back to revenue × accrual_pct so the
 * feed at least carries the editorial estimate. The verification stays 'proxy'
 * either way — `governance_stated` would be appropriate for fee-switch-pending
 * cases but the compute layer doesn't yet distinguish.
 *
 * Run: node scripts/onchain/proxy/fetch-dl-buybacks.js
 */

const fs = require('fs');
const path = require('path');

const { getDailyPrices } = require('../../lib/cg-prices');
const { ensureDir, loadJsonOrDefault, mergeDaily } = require('../../lib/evm-adapter-utils');

const ROOT = path.join(__dirname, '..', '..', '..');
const CONFIG_PATH = path.join(ROOT, 'data', 'config.json');
const OVERRIDES_PATH = path.join(ROOT, 'data', 'hm', 'config.json');
const OUT_BASE = path.join(ROOT, 'data', 'onchain', 'proxy');

// Slugs that have their own dedicated on-chain adapter — skip them here so we
// don't overwrite the higher-quality feed.
const SKIP_SYMBOLS = new Set(['HYPE', 'AAVE', 'SKY', 'LIT', 'CC', 'HNT']);

// Mechanisms that contribute to Category A supply-side compression. Only these
// produce a useful buyback feed for TP/NP purposes — fee-share-lockers etc.
// flow yield to holders without affecting tokens-on-the-market.
const CAT_A_MECHANISMS = new Set(['buyback', 'buyback-burn', 'burn-mint']);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

async function fetchDailySeries(slug, dataType) {
  const url = `https://api.llama.fi/summary/fees/${slug}?dataType=${dataType}`;
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`DL ${slug} ${dataType}: HTTP ${res.status}`);
  }
  const json = await res.json();
  // DL returns totalDataChart: [[ts, usd], ...] when the dataType has data.
  // For protocols where the dataType is absent (e.g. holdersRevenue for COW),
  // totalDataChart is missing or empty — that's a signal to fall back.
  const chart = json.totalDataChart || [];
  return chart;
}

async function fetchOneProtocol(cfg, override) {
  const slug = cfg.defillama_slug;
  const va = cfg.value_accrual || {};
  const symbolDir = path.join(OUT_BASE, slug);

  // Fallback chain: dailyHoldersRevenue → dailyRevenue × accrual_pct → dailyFees × accrual_pct.
  // CARDS in particular returns 358 days of zero holdersRevenue (DL doesn't
  // classify the on-chain buyback-burn as holders_revenue) but has full dailyFees
  // coverage — we apply the editorial accrual_pct to recover the buyback signal.
  const seriesAttempts = [
    { dataType: 'dailyHoldersRevenue', kind: 'holders_revenue', multiplier: 1.0 },
    { dataType: 'dailyRevenue',        kind: 'revenue_x_accrual_pct', multiplier: va.accrual_pct ?? 1.0 },
    { dataType: 'dailyFees',           kind: 'fees_x_accrual_pct',    multiplier: va.accrual_pct ?? 1.0 }
  ];
  let chart = [];
  let series_kind = null;
  let multiplier = 1.0;
  for (const attempt of seriesAttempts) {
    try {
      const candidateChart = await fetchDailySeries(slug, attempt.dataType);
      const sumAll = candidateChart.reduce((s, [, v]) => s + (Number(v) || 0), 0);
      if (sumAll > 0) {
        chart = candidateChart;
        series_kind = attempt.kind;
        multiplier = attempt.multiplier;
        if (attempt.dataType !== 'dailyHoldersRevenue') {
          console.log(`[proxy-bb] ${cfg.symbol}: fell back to ${attempt.dataType} × ${multiplier}`);
        }
        break;
      }
    } catch (err) {
      // 400/404 here means the dataType doesn't exist for this protocol — just
      // walk to the next attempt rather than logging at error level.
      if (attempt.dataType === 'dailyHoldersRevenue') {
        console.warn(`[proxy-bb] ${cfg.symbol}: holdersRevenue not available (${err.message.split(':').slice(-1)[0].trim()})`);
      }
    }
  }
  if (chart.length === 0 || series_kind === null) {
    console.warn(`[proxy-bb] ${cfg.symbol}: no daily series available after fallback chain`);
    return null;
  }

  // Note: multiplier was already set above in the fallback chain.
  const accrualPct = override?.accrual_pct_override ?? va.accrual_pct ?? 1.0;
  if (override?.accrual_pct_override != null && series_kind !== 'holders_revenue') {
    multiplier = override.accrual_pct_override;
  }

  // Daily price for token-count derivation. CG free-tier gives 365d daily.
  let priceMap = new Map();
  try {
    priceMap = await getDailyPrices(cfg.coingecko_id, 365);
  } catch (err) {
    console.warn(`[proxy-bb] ${cfg.symbol}: CG price fetch failed (${err.message}); amount_tokens will be null`);
  }
  const latestPrice = priceMap.size
    ? Array.from(priceMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).pop()[1]
    : null;

  const rows = chart
    .map(([ts, usd]) => {
      const date = new Date(ts * 1000).toISOString().slice(0, 10);
      const adjustedUsd = (Number(usd) || 0) * multiplier;
      const px = priceMap.get(date) ?? latestPrice;
      return {
        date,
        amount_usd: adjustedUsd,
        amount_tokens: px ? adjustedUsd / px : null,
        price_usd: px,
        source: `defillama_daily_${series_kind}${multiplier !== 1 ? `_x_${multiplier}` : ''}`,
        verification: 'proxy'
      };
    })
    .filter((r) => r.amount_usd > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (rows.length === 0) {
    console.warn(`[proxy-bb] ${cfg.symbol}: no non-zero days; skipping write`);
    return null;
  }

  ensureDir(symbolDir);
  const outPath = path.join(symbolDir, 'buybacks.json');
  const merged = mergeDaily(loadJsonOrDefault(outPath, []), rows);
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));

  const sum30 = rows.slice(-30).reduce((s, r) => s + r.amount_usd, 0);
  const annualized = (sum30 / 30) * 365;
  return {
    symbol: cfg.symbol,
    slug,
    rows: rows.length,
    last30_usd: sum30,
    annualized_usd: annualized,
    series_kind,
    out_path: path.relative(ROOT, outPath)
  };
}

async function main() {
  const cfg = loadJson(CONFIG_PATH);
  const overrides = loadJsonOrDefault(OVERRIDES_PATH, {}).synthesized_overrides || {};

  const eligible = cfg.tokens.filter((t) => {
    if (SKIP_SYMBOLS.has(t.symbol)) return false;
    if (!t.defillama_slug) return false;
    if (!t.coingecko_id) return false;
    const va = t.value_accrual || {};
    // Allow override to force-include (e.g. COW) or force-skip (paused mechanisms)
    const status = overrides[t.symbol]?.va_status_override ?? va.status;
    if (status !== 'executing') return false;
    if (!CAT_A_MECHANISMS.has(va.mechanism)) return false;
    return true;
  });

  console.log(`[proxy-bb] ${eligible.length} eligible protocols: ${eligible.map((t) => t.symbol).join(', ')}`);
  console.log('');

  const results = [];
  for (const t of eligible) {
    console.log(`[proxy-bb] ${t.symbol} (${t.defillama_slug})…`);
    try {
      const r = await fetchOneProtocol(t, overrides[t.symbol]);
      if (r) results.push(r);
    } catch (err) {
      console.error(`[proxy-bb] ${t.symbol} failed:`, err.message);
    }
    // Be gentle on DL — small pause between protocols.
    await sleep(500);
  }

  console.log('');
  console.log('[proxy-bb] summary:');
  for (const r of results) {
    console.log(`  ${r.symbol.padEnd(8)} ${r.rows.toString().padStart(4)} rows · last30 $${Math.round(r.last30_usd).toLocaleString().padStart(12)} · annualized $${Math.round(r.annualized_usd).toLocaleString().padStart(13)}/yr · ${r.series_kind}`);
  }
  console.log('');
  console.log(`[proxy-bb] wrote ${results.length} feed(s)`);
}

main().catch((err) => {
  console.error('[proxy-bb] failed:', err.message);
  process.exit(1);
});
