#!/usr/bin/env node
/**
 * Chain-GDP Tracker — Node implementation.
 *
 * For each configured chain, fetches from DefiLlama (free, no auth):
 *   1. /overview/fees/{chain} — daily protocol-level revenue breakdown
 *      → GDP = sum(dailyRevenue) excluding category=Chain protocols (those are REV)
 *   2. /v2/historicalChainTvl/{chain} — daily TVL history
 *   3. /summary/fees/{slug}?dataType=dailyFees — REV (base + priority fees)
 *
 * Cross-chain attribution:
 *   - USDC/USDT chain supply shares from /stablecoins?includePrices=true
 *   - Circle / Tether daily revenue from /summary/fees/{circle|tether}
 *   - Per-chain stablecoin attribution = (USDC chain share × Circle rev) +
 *     (USDT chain share × Tether rev). INCLUDED in primary GDP per paper.
 *   - ETF attribution and generic "off-chain other" are NOT included.
 *
 * Market caps for native tokens pulled from /coins/markets (CoinGecko).
 *
 * Outputs under data/chains/:
 *   - snapshots/latest.json + snapshots/<YYYY-MM-DD>.json — full per-chain snapshot
 *   - history/<slug>.json — daily GDP+TVL+REV time series
 *   - protocols/<slug>.json — top-25 protocols by 30d revenue
 *   - categories/<slug>.json — 30d category breakdown
 *
 * Run: node scripts/chains/fetch-chain-gdp.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CONFIG_PATH = path.join(ROOT, 'data', 'chains', 'config.json');
const OUT_DIR = path.join(ROOT, 'data', 'chains');

const DL_BASE = 'https://api.llama.fi';
const DL_STABLE = 'https://stablecoins.llama.fi';
const CG_BASE = 'https://api.coingecko.com/api/v3';

const FETCH_DELAY_MS = 1200;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, label = '') {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { accept: 'application/json' } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      await sleep(FETCH_DELAY_MS);
      return j;
    } catch (e) {
      console.warn(`  [retry ${attempt + 1}/3] ${label || url}: ${e.message}`);
      await sleep(FETCH_DELAY_MS * 2);
    }
  }
  throw new Error(`Failed to fetch ${label || url}`);
}

function tsToDay(ts) {
  return new Date(ts * 1000).toISOString().slice(0, 10);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// ── DL fetchers ──────────────────────────────────────────────────────────────

async function fetchGlobalProtocolCategories() {
  const data = await fetchJson(
    `${DL_BASE}/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyRevenue`,
    'global-fees-metadata'
  );
  const cats = {};
  for (const p of data.protocols || []) {
    if (p.name) cats[p.name] = p.category || 'Unknown';
  }
  return cats;
}

async function fetchChainGdpBreakdown(dlChain) {
  const url =
    `${DL_BASE}/overview/fees/${encodeURIComponent(dlChain)}` +
    `?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=false&dataType=dailyRevenue`;
  const data = await fetchJson(url, `GDP:${dlChain}`);

  // Identify Chain-category protocols to exclude from app GDP
  const chainCatProtos = new Set();
  for (const p of data.protocols || []) {
    if (p.category === 'Chain' && p.name) chainCatProtos.add(p.name);
  }

  // Daily aggregate — use breakdown to exclude Chain-category protocols
  const dailyAgg = [];
  const breakdown = data.totalDataChartBreakdown || [];
  if (breakdown.length > 0 && chainCatProtos.size > 0) {
    for (const [ts, protocols] of breakdown) {
      const day = tsToDay(ts);
      let dayTotal = 0;
      for (const [name, rev] of Object.entries(protocols || {})) {
        if (!chainCatProtos.has(name)) dayTotal += Number(rev) || 0;
      }
      dailyAgg.push([day, dayTotal]);
    }
  } else {
    for (const [ts, val] of data.totalDataChart || []) {
      dailyAgg.push([tsToDay(ts), Number(val) || 0]);
    }
  }

  const dailyBreakdown = [];
  for (const [ts, protos] of breakdown) {
    dailyBreakdown.push([tsToDay(ts), protos || {}]);
  }

  const protocols30d = [];
  for (const p of data.protocols || []) {
    const t30 = p.total30d;
    if (t30 && t30 > 0 && p.category !== 'Chain') {
      protocols30d.push({
        name: p.name || 'Unknown',
        category: p.category || 'Unknown',
        revenue_30d: t30
      });
    }
  }

  return { dailyAgg, dailyBreakdown, protocols30d, excluded: [...chainCatProtos] };
}

async function fetchChainTvl(dlChain) {
  try {
    const data = await fetchJson(
      `${DL_BASE}/v2/historicalChainTvl/${encodeURIComponent(dlChain)}`,
      `TVL:${dlChain}`
    );
    return (Array.isArray(data) ? data : []).map((d) => [tsToDay(d.date), Number(d.tvl) || 0]);
  } catch (e) {
    console.warn(`  no TVL for ${dlChain}: ${e.message}`);
    return [];
  }
}

async function fetchChainRev(revSlug) {
  if (!revSlug) return [];
  try {
    const data = await fetchJson(
      `${DL_BASE}/summary/fees/${revSlug}?dataType=dailyFees`,
      `REV:${revSlug}`
    );
    return (data.totalDataChart || []).map(([ts, val]) => [tsToDay(ts), Number(val) || 0]);
  } catch (e) {
    console.warn(`  no REV for ${revSlug}: ${e.message}`);
    return [];
  }
}

async function fetchStablecoinShares(stableKeys) {
  console.log('Fetching stablecoin chain shares...');
  const data = await fetchJson(
    `${DL_STABLE}/stablecoins?includePrices=true`,
    'stablecoins'
  );
  const result = { usdc: {}, usdt: {} };
  const targets = [
    ['usdc', 'USDC', 'USD Coin'],
    ['usdt', 'USDT', 'Tether']
  ];
  for (const [key, symbol, name] of targets) {
    for (const asset of data.peggedAssets || []) {
      if (asset.symbol === symbol && asset.name === name) {
        const total = Number(asset.circulating?.peggedUSD) || 1;
        const cc = asset.chainCirculating || {};
        for (const [chainSlug, stableKey] of Object.entries(stableKeys)) {
          if (!stableKey) {
            result[key][chainSlug] = 0;
            continue;
          }
          const supply = Number(cc[stableKey]?.current?.peggedUSD) || 0;
          result[key][chainSlug] = total > 0 ? supply / total : 0;
        }
        break;
      }
    }
  }
  return result;
}

async function fetchStablecoinRevenue() {
  console.log('Fetching Circle / Tether revenue series...');
  const circle = await fetchJson(
    `${DL_BASE}/summary/fees/circle?dataType=dailyRevenue`,
    'Circle'
  );
  const tether = await fetchJson(
    `${DL_BASE}/summary/fees/tether?dataType=dailyRevenue`,
    'Tether'
  );
  const circleByDay = new Map();
  for (const [ts, val] of circle.totalDataChart || []) circleByDay.set(tsToDay(ts), Number(val) || 0);
  const tetherByDay = new Map();
  for (const [ts, val] of tether.totalDataChart || []) tetherByDay.set(tsToDay(ts), Number(val) || 0);
  return { circleByDay, tetherByDay };
}

async function fetchNativeTokenMcaps(cgIds) {
  const ids = cgIds.filter(Boolean);
  if (ids.length === 0) return {};
  console.log(`Fetching CG market data for ${ids.length} native tokens...`);
  try {
    const url = `${CG_BASE}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&per_page=250`;
    const data = await fetchJson(url, 'CG-markets');
    const result = {};
    for (const t of data || []) {
      result[t.id] = {
        mcap: t.market_cap,
        fdv: t.fully_diluted_valuation,
        price: t.current_price,
        circulating: t.circulating_supply,
        image: t.image
      };
    }
    // Note which ids didn't come back
    const missing = ids.filter((id) => !result[id]);
    if (missing.length > 0) console.warn(`  CG missing: ${missing.join(', ')}`);
    return result;
  } catch (e) {
    console.warn(`  CG fetch failed: ${e.message}`);
    return {};
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

function gdpMultipleBand(mult) {
  if (mult == null) return null;
  if (mult < 10) return 'exceptional';
  if (mult < 50) return 'fair';
  if (mult < 200) return 'expensive';
  return 'speculative';
}

function productivityBand(ratio) {
  if (ratio == null) return null;
  if (ratio > 0.5) return 'high';
  if (ratio > 0.15) return 'med-high';
  if (ratio > 0.08) return 'med-low';
  return 'low';
}

function taxBurdenBand(ratio) {
  if (ratio == null) return null;
  if (ratio < 0.1) return 'app-friendly';
  if (ratio < 0.3) return 'modest';
  if (ratio < 1.0) return 'heavy';
  return 'extractive';
}

async function main() {
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const chains = cfg.chains;

  // Heavy fetch (~75 DL calls, ~90s). Skip if today's snapshot already exists.
  // The hourly cron calls this; only the first run of the UTC day does work.
  const asOf = new Date().toISOString().slice(0, 10);
  const todaySnapshot = path.join(OUT_DIR, 'snapshots', `${asOf}.json`);
  if (!process.argv.includes('--force') && fs.existsSync(todaySnapshot)) {
    console.log(`[chain-gdp] today's snapshot already exists (${asOf}). Skip. Pass --force to override.`);
    return;
  }

  ensureDir(OUT_DIR);
  ensureDir(path.join(OUT_DIR, 'snapshots'));
  ensureDir(path.join(OUT_DIR, 'history'));
  ensureDir(path.join(OUT_DIR, 'protocols'));
  ensureDir(path.join(OUT_DIR, 'categories'));

  // 1. Global metadata
  console.log('Step 1/4: Fetching protocol category metadata...');
  const protoCategories = await fetchGlobalProtocolCategories();
  console.log(`  ${Object.keys(protoCategories).length} protocols with category metadata`);

  // 2. Per-chain raw data
  console.log(`\nStep 2/4: Fetching per-chain data (${Object.keys(chains).length} chains)...`);
  const chainRaw = {};
  for (const [slug, c] of Object.entries(chains)) {
    console.log(`\n  --- ${c.name} (${slug}) ---`);
    let dailyAgg = [];
    let dailyBreakdown = [];
    let protocols30d = [];
    let excluded = [];
    if (c.dl_chain) {
      try {
        const r = await fetchChainGdpBreakdown(c.dl_chain);
        dailyAgg = r.dailyAgg;
        dailyBreakdown = r.dailyBreakdown;
        protocols30d = r.protocols30d;
        excluded = r.excluded;
        console.log(`    GDP: ${dailyAgg.length} days, ${protocols30d.length} protocols (30d)`);
        if (excluded.length > 0) console.log(`    Excluded (Chain category): ${excluded.join(', ')}`);
      } catch (e) {
        console.warn(`    GDP fetch failed: ${e.message}`);
      }
    }
    const tvl = c.dl_chain ? await fetchChainTvl(c.dl_chain) : [];
    if (tvl.length) console.log(`    TVL: ${tvl.length} days`);
    const rev = c.dl_rev_slug ? await fetchChainRev(c.dl_rev_slug) : [];
    if (rev.length) console.log(`    REV: ${rev.length} days`);
    chainRaw[slug] = { dailyAgg, dailyBreakdown, protocols30d, tvl, rev, excluded };
  }

  // 3. Stablecoin attribution + native mcaps
  console.log('\nStep 3/4: Stablecoin attribution + native mcaps...');
  const stableKeys = Object.fromEntries(
    Object.entries(chains).map(([slug, c]) => [slug, c.dl_stable_key])
  );
  const shares = await fetchStablecoinShares(stableKeys);
  const { circleByDay, tetherByDay } = await fetchStablecoinRevenue();
  const cgIds = Object.values(chains).map((c) => c.cg_id).filter(Boolean);
  const cgData = await fetchNativeTokenMcaps(cgIds);

  // 4. Compute outputs
  console.log('\nStep 4/4: Computing per-chain outputs...');
  const asOf = new Date().toISOString().slice(0, 10);
  const snapshot = {
    generated_at: new Date().toISOString(),
    as_of: asOf,
    methodology: {
      gdp_definition: 'sum(dailyRevenue) excluding Chain-category protocols',
      stablecoin_attribution: 'included (USDC chain share × Circle daily revenue + USDT chain share × Tether daily revenue)',
      etf_attribution: 'excluded',
      offchain_other: 'excluded',
      rev_definition: 'dailyFees from /summary/fees/{slug} — base + priority fees'
    },
    chains: []
  };

  for (const [slug, c] of Object.entries(chains)) {
    const d = chainRaw[slug];
    if (!d) continue;

    const usdcShare = shares.usdc[slug] || 0;
    const usdtShare = shares.usdt[slug] || 0;

    const tvlMap = new Map(d.tvl);
    const revMap = new Map(d.rev);

    // Build daily series with attribution
    const dailySeries = d.dailyAgg.map(([day, gdpApp]) => {
      const circleAttr = (circleByDay.get(day) || 0) * usdcShare;
      const tetherAttr = (tetherByDay.get(day) || 0) * usdtShare;
      const gdpStable = circleAttr + tetherAttr;
      const gdp = gdpApp + gdpStable;
      return {
        date: day,
        gdp,
        gdp_app: gdpApp,
        gdp_stable: gdpStable,
        tvl: tvlMap.get(day) ?? null,
        rev: revMap.get(day) ?? null
      };
    });

    if (dailySeries.length === 0) {
      console.warn(`  ${slug}: no daily series, skipping`);
      continue;
    }

    const latestDate = dailySeries[dailySeries.length - 1].date;

    // Period sums (last 7d, last 30d)
    const last7 = dailySeries.slice(-7);
    const last30 = dailySeries.slice(-30);
    const sum = (arr, k) => arr.reduce((s, r) => s + (Number(r[k]) || 0), 0);
    const gdp24h = dailySeries[dailySeries.length - 1].gdp;
    const gdp7d = sum(last7, 'gdp');
    const gdp30d = sum(last30, 'gdp');
    const gdpApp30d = sum(last30, 'gdp_app');
    const gdpStable30d = sum(last30, 'gdp_stable');
    const rev7d = sum(last7, 'rev');
    const rev30d = sum(last30, 'rev');

    // Latest TVL (find most recent non-null from the day series)
    let latestTvl = null;
    for (let i = dailySeries.length - 1; i >= 0; i--) {
      if (dailySeries[i].tvl != null) {
        latestTvl = dailySeries[i].tvl;
        break;
      }
    }
    // Fall back to last entry in raw tvl series if not aligned to dailySeries dates
    if (latestTvl == null && d.tvl.length > 0) latestTvl = d.tvl[d.tvl.length - 1][1];

    const cg = c.cg_id ? cgData[c.cg_id] : null;
    const mcap = cg?.mcap ?? null;

    const gdpAnnualized = gdp30d * (365 / 30);
    const gdpMultiple = mcap && gdpAnnualized > 0 ? mcap / gdpAnnualized : null;
    const gdpOverTvlAnn = latestTvl && latestTvl > 0 ? gdpAnnualized / latestTvl : null;
    const revOverGdp7d = gdp7d > 0 && rev7d > 0 ? rev7d / gdp7d : null;

    // Top protocol and category
    const protos = d.protocols30d.slice().sort((a, b) => b.revenue_30d - a.revenue_30d);
    const topProtocol = protos[0]?.name || null;
    const catSums = {};
    for (const p of protos) catSums[p.category] = (catSums[p.category] || 0) + p.revenue_30d;
    const topCategory =
      Object.entries(catSums).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    snapshot.chains.push({
      slug,
      name: c.name,
      symbol: c.symbol,
      dl_chain: c.dl_chain,
      cg_id: c.cg_id,
      image: cg?.image ?? null,
      mcap_usd: mcap,
      fdv_usd: cg?.fdv ?? null,
      price_usd: cg?.price ?? null,
      circulating: cg?.circulating ?? null,
      gdp_24h_usd: gdp24h,
      gdp_7d_usd: gdp7d,
      gdp_30d_usd: gdp30d,
      gdp_app_30d_usd: gdpApp30d,
      gdp_stable_30d_usd: gdpStable30d,
      gdp_annualized_usd: gdpAnnualized,
      gdp_multiple: gdpMultiple,
      gdp_multiple_band: gdpMultipleBand(gdpMultiple),
      tvl_usd: latestTvl,
      gdp_over_tvl_ann: gdpOverTvlAnn,
      gdp_over_tvl_band: productivityBand(gdpOverTvlAnn),
      rev_24h_usd: dailySeries[dailySeries.length - 1].rev,
      rev_7d_usd: rev7d,
      rev_30d_usd: rev30d,
      rev_over_gdp_7d: revOverGdp7d,
      rev_over_gdp_band: taxBurdenBand(revOverGdp7d),
      top_protocol: topProtocol,
      top_category: topCategory,
      protocol_count: protos.length,
      stable_share_usdc: usdcShare,
      stable_share_usdt: usdtShare,
      latest_date: latestDate
    });

    // Per-chain daily history
    fs.writeFileSync(
      path.join(OUT_DIR, 'history', `${slug}.json`),
      JSON.stringify(dailySeries, null, 2)
    );

    // Top-25 protocols
    const chainTotal = protos.reduce((s, p) => s + p.revenue_30d, 0);
    const top25 = protos.slice(0, 25).map((p) => ({
      ...p,
      pct_of_chain: chainTotal > 0 ? (100 * p.revenue_30d) / chainTotal : 0
    }));
    fs.writeFileSync(
      path.join(OUT_DIR, 'protocols', `${slug}.json`),
      JSON.stringify(top25, null, 2)
    );

    // Category breakdown
    const catEntries = Object.entries(catSums)
      .map(([cat, rev]) => ({
        category: cat,
        revenue_30d: rev,
        pct: chainTotal > 0 ? (100 * rev) / chainTotal : 0
      }))
      .sort((a, b) => b.revenue_30d - a.revenue_30d);
    if (gdpStable30d > 0) {
      const stableTotal = chainTotal + gdpStable30d;
      catEntries.push({
        category: 'Stablecoin Issuer',
        revenue_30d: gdpStable30d,
        pct: stableTotal > 0 ? (100 * gdpStable30d) / stableTotal : 0
      });
    }
    fs.writeFileSync(
      path.join(OUT_DIR, 'categories', `${slug}.json`),
      JSON.stringify(catEntries, null, 2)
    );
  }

  // Sort by GDP 30d descending
  snapshot.chains.sort((a, b) => (b.gdp_30d_usd || 0) - (a.gdp_30d_usd || 0));

  fs.writeFileSync(
    path.join(OUT_DIR, 'snapshots', 'latest.json'),
    JSON.stringify(snapshot, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'snapshots', `${asOf}.json`),
    JSON.stringify(snapshot, null, 2)
  );

  // Console summary
  console.log('\n' + '='.repeat(78));
  console.log('CHAIN-GDP TRACKER — SUMMARY');
  console.log('='.repeat(78));
  console.log(`as_of: ${asOf}`);
  console.log(`chains: ${snapshot.chains.length}\n`);
  console.log(
    'chain'.padEnd(14) +
      'GDP-30d'.padStart(12) +
      'annualized'.padStart(14) +
      'mcap'.padStart(12) +
      'GDP-mult'.padStart(11) +
      'TVL'.padStart(12) +
      'GDP/TVL'.padStart(10) +
      'REV/GDP'.padStart(10)
  );
  for (const c of snapshot.chains.slice(0, 15)) {
    const fmt = (v, scale = 1e6, suf = 'M', dec = 1) =>
      v == null ? 'n/a'.padStart(12) : ('$' + (v / scale).toFixed(dec) + suf).padStart(12);
    const mult = c.gdp_multiple == null ? 'n/a' : c.gdp_multiple.toFixed(1) + '×';
    const ratioPct = (v) => (v == null ? 'n/a' : (v * 100).toFixed(1) + '%');
    console.log(
      c.name.padEnd(14) +
        fmt(c.gdp_30d_usd) +
        fmt(c.gdp_annualized_usd, 1e9, 'B', 2) +
        (c.mcap_usd != null
          ? '$' + (c.mcap_usd / 1e9).toFixed(2) + 'B'
          : 'n/a'
        ).padStart(12) +
        mult.padStart(11) +
        (c.tvl_usd != null ? '$' + (c.tvl_usd / 1e9).toFixed(2) + 'B' : 'n/a').padStart(12) +
        ratioPct(c.gdp_over_tvl_ann).padStart(10) +
        ratioPct(c.rev_over_gdp_7d).padStart(10)
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
