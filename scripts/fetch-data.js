#!/usr/bin/env node
/**
 * Fetches fundamentals data from CoinGecko + DeFi Llama
 * and writes data/latest.json for the dashboard.
 *
 * Run: node scripts/fetch-data.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'data', 'config.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'latest.json');

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const DEFILLAMA_BASE = 'https://api.llama.fi';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJSON(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        console.warn(`Rate limited on ${url}, waiting 60s...`);
        await sleep(60000);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.json();
    } catch (err) {
      if (i === retries) {
        console.error(`Failed to fetch ${url}: ${err.message}`);
        return null;
      }
      await sleep(2000);
    }
  }
}

// ── CoinGecko: price, mcap, FDV, 24h change, volume ──
async function fetchCoinGeckoData(tokens) {
  const ids = tokens.map((t) => t.coingecko_id).join(',');
  const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
  const data = await fetchJSON(url);
  if (!data) return {};

  const map = {};
  for (const coin of data) {
    map[coin.id] = {
      price: coin.current_price,
      market_cap: coin.market_cap,
      fdv: coin.fully_diluted_valuation,
      price_change_24h_pct: coin.price_change_percentage_24h,
      volume_24h: coin.total_volume,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      ath: coin.ath,
      ath_change_pct: coin.ath_change_percentage,
      image: coin.image,
    };
  }
  return map;
}

const HISTORY_DAYS = 90;

// ── DeFi Llama: TVL for a protocol (parent aggregate) + history ──
async function fetchTVL(slug) {
  const url = `${DEFILLAMA_BASE}/protocol/${slug}`;
  const data = await fetchJSON(url);
  if (!data) return null;

  // Sum currentChainTvls excluding borrowed/staking/pool2
  const cct = data.currentChainTvls || {};
  let tvl = 0;
  for (const [chain, val] of Object.entries(cct)) {
    const lower = chain.toLowerCase();
    if (
      lower.includes('borrowed') ||
      lower.includes('staking') ||
      lower.includes('pool2') ||
      lower.includes('vesting')
    )
      continue;
    tvl += val;
  }

  // Compute cumulative TVL-days (in billions) over full protocol lifetime
  const fullTvl = data.tvl || [];
  let tvlDaysBd = 0;
  for (const d of fullTvl) {
    tvlDaysBd += (d.totalLiquidityUSD || 0) / 1e9;
  }

  // Extract last N days of TVL history
  const tvlHistory = fullTvl
    .slice(-HISTORY_DAYS)
    .map((d) => ({ date: d.date, value: d.totalLiquidityUSD }));

  // Token breakdown: latest snapshot from tokensInUsd
  let tokenBreakdown = null;
  let concentration = null;
  const tokensUsdSeries = data.tokensInUsd || [];
  if (tokensUsdSeries.length > 0) {
    const latest = tokensUsdSeries[tokensUsdSeries.length - 1];
    const entries = Object.entries(latest.tokens || {})
      .filter(([, v]) => typeof v === 'number' && v > 0)
      .sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((s, [, v]) => s + v, 0);
    if (total > 0) {
      tokenBreakdown = entries.slice(0, 15).map(([symbol, usd]) => ({
        symbol,
        usd,
        pct: usd / total,
      }));
      const top1 = entries[0]?.[1] || 0;
      const top3 = entries.slice(0, 3).reduce((s, [, v]) => s + v, 0);
      const top5 = entries.slice(0, 5).reduce((s, [, v]) => s + v, 0);
      const hhi = entries.reduce((s, [, v]) => s + Math.pow(v / total, 2), 0);
      concentration = {
        top1_pct: top1 / total,
        top3_pct: top3 / total,
        top5_pct: top5 / total,
        hhi,
        token_count: entries.length,
        snapshot_date: latest.date,
      };
    }
  }

  return {
    tvl,
    tvl_change_1d: data.change_1d ?? null,
    tvl_change_7d: data.change_7d ?? null,
    tvl_days_bd: tvlDaysBd,
    tvl_history: tvlHistory,
    token_breakdown: tokenBreakdown,
    concentration: concentration,
  };
}

// ── DeFi Llama: fees for a protocol (parent-level aggregate) + history ──
async function fetchFees(slug) {
  const url = `${DEFILLAMA_BASE}/summary/fees/${slug}`;
  const data = await fetchJSON(url);
  if (!data || data.error) return null;

  // Extract last N days of fee history
  const feeHistory = (data.totalDataChart || [])
    .slice(-HISTORY_DAYS)
    .map(([date, value]) => ({ date, value }));

  // Fallback: some DePIN/new protocols (e.g. Helium) don't return total1y yet —
  // annualize from total30d × 12 so downstream accrual math still works.
  const fees1y = data.total1y ?? (data.total30d != null ? data.total30d * 12 : null);

  return {
    fees_24h: data.total24h ?? null,
    fees_7d: data.total7d ?? null,
    fees_30d: data.total30d ?? null,
    fees_1y: fees1y,
    fees_all_time: data.totalAllTime ?? null,
    fees_change_1d: data.change_1d ?? null,
    fees_history: feeHistory,
  };
}

// ── DeFi Llama: revenue via overview endpoint (aggregated by parent) ──
// The /summary/revenue/{slug} endpoint returns 500, so we use the
// overview endpoint once and aggregate child protocols by parent.
async function fetchAllRevenue(tokens) {
  const url = `${DEFILLAMA_BASE}/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyRevenue`;
  const data = await fetchJSON(url);
  if (!data || !data.protocols) return {};

  // Build a set of slugs we care about
  const slugSet = new Set(tokens.map((t) => t.defillama_slug).filter(Boolean));

  // Aggregate child protocols by parent slug
  const agg = {};
  for (const p of data.protocols) {
    const slug = p.slug || '';
    const parent = (p.parentProtocol || '').replace('parent#', '');
    const key = slugSet.has(parent) ? parent : slugSet.has(slug) ? slug : null;
    if (!key) continue;

    if (!agg[key]) agg[key] = { revenue_24h: 0, revenue_7d: 0, revenue_30d: 0, revenue_1y: 0 };
    agg[key].revenue_24h += p.total24h || 0;
    agg[key].revenue_7d += p.total7d || 0;
    agg[key].revenue_30d += p.total30d || 0;
    agg[key].revenue_1y += p.total1y || 0;
  }
  return agg;
}

// ── DeFi Llama: holders revenue via overview endpoint (aggregated by parent) ──
// Mirrors fetchAllRevenue but uses dataType=dailyHoldersRevenue. This is the
// canonical "what flows to token holders" metric for buyback protocols
// (e.g. LIT, JUP, ORCA — DL only populates this when execution is verified).
async function fetchAllHoldersRevenue(tokens) {
  const url = `${DEFILLAMA_BASE}/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyHoldersRevenue`;
  const data = await fetchJSON(url);
  if (!data || !data.protocols) return {};

  const slugSet = new Set(tokens.map((t) => t.defillama_slug).filter(Boolean));

  const agg = {};
  for (const p of data.protocols) {
    const slug = p.slug || '';
    const parent = (p.parentProtocol || '').replace('parent#', '');
    const key = slugSet.has(parent) ? parent : slugSet.has(slug) ? slug : null;
    if (!key) continue;

    if (!agg[key]) agg[key] = { hr_24h: 0, hr_7d: 0, hr_30d: 0, hr_1y: 0 };
    agg[key].hr_24h += p.total24h || 0;
    agg[key].hr_7d += p.total7d || 0;
    agg[key].hr_30d += p.total30d || 0;
    agg[key].hr_1y += p.total1y || 0;
  }
  return agg;
}

// ── Main ──
async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  const tokens = config.tokens;

  console.log(`Fetching data for ${tokens.length} tokens...`);

  // 1. CoinGecko batch (single request)
  console.log('Fetching CoinGecko market data...');
  const cgData = await fetchCoinGeckoData(tokens);

  // 2. DeFi Llama: batch-fetch revenue + holders revenue (single requests, aggregated)
  console.log('Fetching DeFi Llama revenue overview...');
  const revenueMap = await fetchAllRevenue(tokens);
  console.log('Fetching DeFi Llama holders-revenue overview...');
  const holdersRevMap = await fetchAllHoldersRevenue(tokens);

  // 3. DeFi Llama: per-protocol TVL + fees
  const results = [];
  for (const token of tokens) {
    console.log(`  ${token.symbol}...`);
    const cg = cgData[token.coingecko_id] || {};

    let tvlData = {};
    let feesData = {};

    if (token.defillama_slug) {
      const [tvlResult, feesResult] = await Promise.all([
        fetchTVL(token.defillama_slug),
        fetchFees(token.defillama_slug),
      ]);
      tvlData = tvlResult || {};
      feesData = feesResult || {};
      await sleep(300);
    }

    const revenueData = revenueMap[token.defillama_slug] || {};
    const hrData = holdersRevMap[token.defillama_slug] || {};

    // Compute derived metrics
    const mcap = cg.market_cap || null;
    const fdv = cg.fdv || null;
    const fees30d = feesData.fees_30d || null;
    const rev30d = revenueData.revenue_30d || null;
    const hr30d = hrData.hr_30d || null;
    const annualizedFees = fees30d ? fees30d * 12 : null;
    const annualizedRevenue = rev30d ? rev30d * 12 : null;
    // Holders revenue: prefer 30d × 12 as the "forward run-rate" (per CLAUDE.md
    // framework — TTM can be backward-weighted). Fall back to trailing 1y only
    // when 30d data is missing. This correctly reflects:
    //   - Paused programs (SKY): 30d will be near-zero, exposing the pause
    //   - Decelerating programs (HYPE Apr 2026): 30d shows current rate
    //   - Accelerating programs (LIT, young protocols): 30d captures real run-rate
    //     (1y is partial-year and understates)
    const holdersRev1y = hrData.hr_1y || null;
    const holdersRev30dAnn = hr30d ? hr30d * 12 : null;
    const holdersRevAnnualized = holdersRev30dAnn || holdersRev1y;

    // ── Value accrual metrics (from config) ──
    const va = token.value_accrual || {};
    const vaAccrualBase = va.accrual_base;
    const vaAccrualPct = va.accrual_pct || 0;
    const vaStatus = va.status || 'none';

    // Choose which DeFi Llama metric to use as the accrual base
    let accrualBaseValue = null;
    if (vaAccrualBase === 'fees') {
      accrualBaseValue = feesData.fees_1y || null;
    } else if (vaAccrualBase === 'revenue') {
      accrualBaseValue = revenueData.revenue_1y || null;
    } else if (vaAccrualBase === 'holdersRevenue') {
      // Use the same max(1y, 30d×12) logic so newly-launched protocols
      // with verified buybacks (LIT, etc.) reflect current run-rate.
      accrualBaseValue = holdersRevAnnualized;
    }

    // Only compute if mechanism is active (executing or paused — not none/proposed)
    const isActive = ['executing', 'paused', 'conditional'].includes(vaStatus);
    const accrualAnnualEst = (isActive && accrualBaseValue && vaAccrualPct > 0)
      ? accrualBaseValue * vaAccrualPct
      : null;

    const accrualYieldMcap = (accrualAnnualEst && mcap) ? (accrualAnnualEst / mcap) * 100 : null;
    const accrualYieldFdv  = (accrualAnnualEst && fdv)  ? (accrualAnnualEst / fdv)  * 100 : null;

    // Dilution = % of total supply still locked/unvested
    const circSupply = cg.circulating_supply || null;
    const totalSupply = cg.total_supply || null;
    const dilutionPct = (circSupply && totalSupply && totalSupply > 0)
      ? (1 - circSupply / totalSupply) * 100
      : null;

    results.push({
      symbol: token.symbol,
      name: token.name,
      category: token.category,
      coingecko_id: token.coingecko_id,
      defillama_slug: token.defillama_slug,
      image: cg.image || null,

      // Price data
      price: cg.price || null,
      price_change_24h_pct: cg.price_change_24h_pct || null,
      volume_24h: cg.volume_24h || null,
      market_cap: mcap,
      fdv: fdv,
      circulating_supply: circSupply,
      total_supply: totalSupply,
      ath: cg.ath || null,
      ath_change_pct: cg.ath_change_pct || null,

      // TVL
      tvl: tvlData.tvl || null,
      tvl_change_1d: tvlData.tvl_change_1d || null,
      tvl_change_7d: tvlData.tvl_change_7d || null,
      tvl_days_bd: tvlData.tvl_days_bd || null,

      // Fees
      fees_24h: feesData.fees_24h || null,
      fees_7d: feesData.fees_7d || null,
      fees_30d: fees30d,
      fees_1y: feesData.fees_1y || null,
      fees_change_1d: feesData.fees_change_1d || null,

      // Revenue
      revenue_24h: revenueData.revenue_24h || null,
      revenue_7d: revenueData.revenue_7d || null,
      revenue_30d: rev30d,
      revenue_1y: revenueData.revenue_1y || null,

      // Holders revenue (DefiLlama dailyHoldersRevenue) — what actually flows to token holders
      // for verified buyback/burn protocols. Use as accrual_base="holdersRevenue" in config.
      holders_revenue_24h: hrData.hr_24h || null,
      holders_revenue_7d:  hrData.hr_7d  || null,
      holders_revenue_30d: hr30d,
      holders_revenue_1y:  holdersRev1y,
      holders_revenue_annualized: holdersRevAnnualized, // max(1y, 30d×12)

      // Derived multiples (annualized — lower = cheaper)
      mcap_to_fees: annualizedFees && mcap ? mcap / annualizedFees : null,
      fdv_to_fees: annualizedFees && fdv ? fdv / annualizedFees : null,
      mcap_to_revenue: annualizedRevenue && mcap ? mcap / annualizedRevenue : null,
      fdv_to_revenue: annualizedRevenue && fdv ? fdv / annualizedRevenue : null,
      mcap_to_tvl: mcap && tvlData.tvl ? mcap / tvlData.tvl : null,

      // Historical sparkline data (last 90 days)
      tvl_history: tvlData.tvl_history || [],
      fees_history: feesData.fees_history || [],

      // Token composition + concentration (from DeFi Llama tokensInUsd)
      token_breakdown: tvlData.token_breakdown || null,
      concentration: tvlData.concentration || null,

      // Value accrual (from config.json value_accrual block)
      va_mechanism:       va.mechanism       || 'none',
      va_status:          vaStatus,
      va_execution_type:  va.execution_type  || null,
      va_accrual_pct:     vaAccrualPct,
      va_tracking_source: va.tracking_source || null,
      va_last_verified:   va.last_verified   || null,
      va_notes:           va.notes           || null,
      accrual_annual_est: accrualAnnualEst,
      accrual_yield_mcap: accrualYieldMcap,
      accrual_yield_fdv:  accrualYieldFdv,
      dilution_pct:       dilutionPct,
    });
  }

  const output = {
    updated_at: new Date().toISOString(),
    tokens: results,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nDone! Wrote ${results.length} tokens to ${OUTPUT_PATH}`);
  console.log(`Updated at: ${output.updated_at}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
