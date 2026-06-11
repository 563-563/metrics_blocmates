// Server-side aggregate readers for chain-cohort visualizations.
//
// Data comes from the per-chain maps in ./chains, which are populated at
// module init via webpack's context-module pattern — so this works in both
// SSG and runtime (force-dynamic) contexts without needing fs at request
// time.

import {
  CATEGORIES_MAP,
  CATEGORY_HISTORY_MAP,
  CHAIN_SLUGS,
  HISTORY_MAP,
  MCAP_HISTORY_MAP,
  PROTOCOLS_MAP,
  type ChainCategory,
  type ChainHistoryPoint,
  type ChainProtocol,
  type ChainSummary
} from "./chains";

function productivityBand(ratio: number | null): ChainSummary["gdp_over_tvl_band"] {
  if (ratio == null) return null;
  if (ratio > 0.5) return "high";
  if (ratio > 0.15) return "med-high";
  if (ratio > 0.08) return "med-low";
  return "low";
}
function taxBurdenBand(ratio: number | null): ChainSummary["rev_over_gdp_band"] {
  if (ratio == null) return null;
  if (ratio < 0.1) return "app-friendly";
  if (ratio < 0.3) return "modest";
  if (ratio < 1.0) return "heavy";
  return "extractive";
}

// Recompute chain summary fields with stablecoin-issuer attribution stripped
// out. Recomputes derived metrics (annualized GDP, GDP Multiple, GDP/TVL,
// REV/GDP) and their bands. Top-app/category fall back to the pre-computed
// `*_excl_stable` fields from the pipeline.
export function chainSummaryWithoutStablecoins(c: ChainSummary): ChainSummary {
  const newGdp30 = c.gdp_app_30d_usd;
  const newAnn = (newGdp30 * 365) / 30;
  const newGdpMult = c.mcap_usd && newAnn > 0 ? c.mcap_usd / newAnn : null;
  const newGdpTvl = c.tvl_usd && c.tvl_usd > 0 && newAnn > 0 ? newAnn / c.tvl_usd : null;
  const newRevGdp = c.rev_30d_usd > 0 && newGdp30 > 0 ? c.rev_30d_usd / newGdp30 : null;
  return {
    ...c,
    gdp_30d_usd: newGdp30,
    gdp_annualized_usd: newAnn,
    gdp_stable_30d_usd: 0,
    gdp_multiple: newGdpMult,
    gdp_over_tvl_ann: newGdpTvl,
    gdp_over_tvl_band: productivityBand(newGdpTvl),
    rev_over_gdp_7d: newRevGdp,
    rev_over_gdp_band: taxBurdenBand(newRevGdp),
    top_protocol: c.top_protocol_excl_stable ?? c.top_protocol,
    top_category: c.top_category_excl_stable ?? c.top_category
  };
}


// One row per date with a key per chain holding that day's GDP. Optionally
// smoothed by a trailing N-day rolling mean — buries one-off spikes from
// DL refund/correction days so the cohort dynamics are legible.
export type StackedDay = { date: string; [chainSlug: string]: string | number };
// When includeStablecoins is false, sum `gdp_app` per day instead of `gdp`.
// `days = Infinity` returns the full stored history (Ethereum back to 2018);
// Array.prototype.slice clamps -Infinity to 0 so the windows below hold.
export function getStackedGdpSeries(days = 180, smoothing = 7, includeStablecoins = true): StackedDay[] {
  const perChain = new Map<string, ChainHistoryPoint[]>();
  const allDates = new Set<string>();
  for (const slug of CHAIN_SLUGS) {
    const hist = (HISTORY_MAP[slug] || []);
    // Take a window large enough to compute the rolling mean for the first
    // visible day too (need `days + smoothing` source days).
    const window = hist.slice(-(days + smoothing));
    perChain.set(slug, window);
    for (const d of window.slice(-days)) allDates.add(d.date);
  }
  const sortedDates = [...allDates].sort().slice(-days);
  // For each chain, build a date → smoothed-gdp map.
  const smoothedByChain = new Map<string, Map<string, number>>();
  for (const [slug, hist] of perChain) {
    const m = new Map<string, number>();
    for (let i = 0; i < hist.length; i++) {
      const start = Math.max(0, i - smoothing + 1);
      const slice = hist.slice(start, i + 1);
      const avg =
        slice.reduce(
          (s, r) => s + Math.max(0, includeStablecoins ? r.gdp : r.gdp_app),
          0
        ) / slice.length;
      // Whole dollars — sub-dollar precision is invisible at chart scale and
      // bloats the RSC payload badly on multi-year windows.
      m.set(hist[i].date, Math.round(avg));
    }
    smoothedByChain.set(slug, m);
  }
  return sortedDates.map((date) => {
    const row: StackedDay = { date };
    for (const slug of CHAIN_SLUGS) {
      row[slug] = smoothedByChain.get(slug)?.get(date) ?? 0;
    }
    return row;
  });
}

// ── Quadrant time machine ───────────────────────────────────────────────
// Weekly-sampled history of the strategic-positioning metrics so the client
// can scrub a slider and watch chains move. Per chain per sample date:
//   x = trailing-30d GDP annualized / TVL (capital productivity)
//   y = trailing-7d REV / trailing-7d GDP (tax burden)
// A chain appears in a frame only once it has a full 30d GDP window, a TVL
// reading within the last 14 days, and non-zero 7d REV — same exclusions as
// the live quadrant, applied historically.
export type QuadrantPoint = { slug: string; x: number; y: number; gdp30: number; tvl: number };
export type QuadrantFrame = { date: string; points: QuadrantPoint[] };

export function getQuadrantFrames(includeStablecoins = true, stepDays = 7): QuadrantFrame[] {
  type Prepped = {
    slug: string;
    dates: string[];
    dateIdx: Map<string, number>;
    gdpPrefix: number[]; // gdpPrefix[i] = sum of gdp[0..i-1]
    revPrefix: number[];
    tvl: (number | null)[];
  };
  const prepped: Prepped[] = [];
  let latest = "";
  for (const slug of CHAIN_SLUGS) {
    const hist = HISTORY_MAP[slug] || [];
    if (hist.length === 0) continue;
    const dates = hist.map((r) => r.date);
    const dateIdx = new Map(dates.map((d, i) => [d, i]));
    const gdpPrefix = [0];
    const revPrefix = [0];
    for (const r of hist) {
      const g = Math.max(0, includeStablecoins ? r.gdp : r.gdp_app);
      gdpPrefix.push(gdpPrefix[gdpPrefix.length - 1] + g);
      revPrefix.push(revPrefix[revPrefix.length - 1] + Math.max(0, r.rev ?? 0));
    }
    prepped.push({ slug, dates, dateIdx, gdpPrefix, revPrefix, tvl: hist.map((r) => r.tvl) });
    const last = dates[dates.length - 1];
    if (last > latest) latest = last;
  }
  if (!latest) return [];

  // Index of the last history row on or before `day` (chains lag the global
  // latest date by a day or two; a 3-day grace keeps them in the last frame).
  function idxOnOrBefore(c: Prepped, day: string): number | null {
    for (let back = 0; back < 3; back++) {
      const d = new Date(day + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() - back);
      const i = c.dateIdx.get(d.toISOString().slice(0, 10));
      if (i != null) return i;
    }
    return null;
  }

  // Sample dates: step backward weekly from the global latest so the final
  // frame is always "today".
  const sampleDates: string[] = [];
  const earliest = prepped.reduce((m, c) => (c.dates[0] < m ? c.dates[0] : m), latest);
  const cursor = new Date(latest + "T00:00:00Z");
  while (cursor.toISOString().slice(0, 10) >= earliest) {
    sampleDates.unshift(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() - stepDays);
  }

  const frames: QuadrantFrame[] = [];
  for (const day of sampleDates) {
    const points: QuadrantPoint[] = [];
    for (const c of prepped) {
      const i = idxOnOrBefore(c, day);
      if (i == null || i < 29) continue; // need a full 30d GDP window
      const gdp30 = c.gdpPrefix[i + 1] - c.gdpPrefix[i - 29];
      if (gdp30 <= 0) continue;
      // Most recent TVL reading within 14 days.
      let tvl: number | null = null;
      for (let j = i; j >= Math.max(0, i - 14); j--) {
        if (c.tvl[j] != null && c.tvl[j]! > 0) { tvl = c.tvl[j]; break; }
      }
      if (tvl == null) continue;
      const gdp7 = c.gdpPrefix[i + 1] - c.gdpPrefix[i - 6];
      const rev7 = c.revPrefix[i + 1] - c.revPrefix[i - 6];
      if (gdp7 <= 0 || rev7 <= 0) continue;
      const gdpAnn = (gdp30 * 365) / 30;
      points.push({
        slug: c.slug,
        x: Number((gdpAnn / tvl).toFixed(4)),
        y: Number((rev7 / gdp7).toFixed(4)),
        gdp30: Math.round(gdp30),
        tvl: Math.round(tvl)
      });
    }
    if (points.length >= 3) frames.push({ date: day, points });
  }
  return frames;
}

// ── Macro: GDP growth & recession watch ─────────────────────────────────
// Country-statistics treatment of the GDP series: quarterly (90d) growth
// rates, YoY, and the classic recession rule — two consecutive quarters of
// negative growth. Quarters are trailing windows anchored to each chain's
// own latest data day, not calendar quarters.
export type ChainGrowth = {
  slug: string;
  gdp30: number;
  // Oldest → newest. Up to 8 quarters; only windows with full 90d coverage.
  quarters: Array<{ end: string; growthPct: number; gdpUsd: number }>;
  qoqPct: number | null;
  yoyPct: number | null;
  inRecession: boolean;
  tooYoung: boolean; // < 2 measurable quarters
};

export function getChainGrowth(includeStablecoins = true): ChainGrowth[] {
  const key = includeStablecoins ? "gdp" : "gdp_app";
  const out: ChainGrowth[] = [];
  for (const slug of CHAIN_SLUGS) {
    const hist = HISTORY_MAP[slug] || [];
    if (hist.length < 30) continue;
    const vals = hist.map((r) => Math.max(0, Number((r as any)[key]) || 0));
    const n = vals.length;
    const winSum = (endOffset: number, days: number): number | null => {
      const end = n - endOffset;
      const start = end - days;
      if (start < 0) return null;
      let s = 0;
      for (let i = start; i < end; i++) s += vals[i];
      return s;
    };
    const quarters: ChainGrowth["quarters"] = [];
    for (let k = 7; k >= 0; k--) {
      const cur = winSum(90 * k, 90);
      const prev = winSum(90 * (k + 1), 90);
      if (cur == null || prev == null || prev <= 0) continue;
      quarters.push({
        end: hist[n - 1 - 90 * k].date,
        growthPct: (cur / prev - 1) * 100,
        gdpUsd: Math.round(cur)
      });
    }
    const last = quarters[quarters.length - 1] ?? null;
    const prior = quarters[quarters.length - 2] ?? null;
    const y0 = winSum(0, 365);
    const y1 = winSum(365, 365);
    out.push({
      slug,
      gdp30: winSum(0, 30) ?? 0,
      quarters,
      qoqPct: last?.growthPct ?? null,
      yoyPct: y0 != null && y1 != null && y1 > 0 ? (y0 / y1 - 1) * 100 : null,
      inRecession: last != null && prior != null && last.growthPct < 0 && prior.growthPct < 0,
      tooYoung: quarters.length < 2
    });
  }
  return out.sort((a, b) => b.gdp30 - a.gdp30);
}

// ── Macro: GDP vs GNI (value retained vs exported) ──────────────────────
// Stablecoin-issuer attribution is output generated ON the chain but
// captured by an off-chain entity — the GNI gap. Always computed with
// stablecoins included: the split IS the chart.
export type ChainGni = {
  slug: string;
  retainedUsd: number; // app revenue staying in the on-chain economy
  exportedUsd: number; // Circle/Tether reserve yield leaving it
  exportedPct: number;
};

export function getGniSplit(windowDays = 30): ChainGni[] {
  const out: ChainGni[] = [];
  for (const slug of CHAIN_SLUGS) {
    const hist = (HISTORY_MAP[slug] || []).slice(-windowDays);
    if (hist.length === 0) continue;
    let app = 0;
    let stable = 0;
    for (const r of hist) {
      app += Math.max(0, r.gdp_app);
      stable += Math.max(0, r.gdp_stable);
    }
    const total = app + stable;
    if (total <= 0) continue;
    out.push({
      slug,
      retainedUsd: Math.round(app),
      exportedUsd: Math.round(stable),
      exportedPct: stable / total
    });
  }
  return out.sort((a, b) => b.exportedPct - a.exportedPct);
}

// ── Macro: economic concentration (Herfindahl-Hirschman index) ──────────
// HHI over per-app shares of chain GDP, scaled 0–10,000 like the antitrust
// convention (>2,500 = highly concentrated). Only the top-25 apps per chain
// are stored, with the long tail treated as dust — that biases HHI DOWN, so
// high readings are trustworthy and low readings are lower bounds.
export type ChainHhi = {
  slug: string;
  hhi: number;
  gdp30: number;
  topApp: string;
  topSharePct: number;
  appsListed: number;
};

export function getConcentration(includeStablecoins = true): ChainHhi[] {
  const out: ChainHhi[] = [];
  for (const slug of CHAIN_SLUGS) {
    const protos = (PROTOCOLS_MAP[slug] || []).filter(
      (p) => includeStablecoins || p.category !== "Stablecoin Issuer"
    );
    if (protos.length === 0) continue;
    const total = protos.reduce((s, p) => s + Math.max(0, p.revenue_30d), 0);
    if (total <= 0) continue;
    let hhi = 0;
    for (const p of protos) {
      const share = Math.max(0, p.revenue_30d) / total;
      hhi += share * share;
    }
    const top = protos.reduce((a, b) => (b.revenue_30d > a.revenue_30d ? b : a));
    out.push({
      slug,
      hhi: Math.round(hhi * 10000),
      gdp30: Math.round(total),
      topApp: top.name,
      topSharePct: (Math.max(0, top.revenue_30d) / total) * 100,
      appsListed: protos.length
    });
  }
  return out.sort((a, b) => b.gdp30 - a.gdp30);
}

// ── Macro: GDP bar-chart race frames ────────────────────────────────────
// Weekly samples of each chain's trailing-30d GDP, ranked. Same prefix-sum
// + weekly-stepping approach as getQuadrantFrames.
export type RaceFrame = { date: string; bars: Array<{ slug: string; gdp30: number }> };

export function getRaceFrames(includeStablecoins = true, stepDays = 7): RaceFrame[] {
  const key = includeStablecoins ? "gdp" : "gdp_app";
  const prepped: Array<{
    slug: string;
    dates: string[];
    dateIdx: Map<string, number>;
    prefix: number[];
  }> = [];
  let latest = "";
  for (const slug of CHAIN_SLUGS) {
    const hist = HISTORY_MAP[slug] || [];
    if (hist.length === 0) continue;
    const dates = hist.map((r) => r.date);
    const prefix = [0];
    for (const r of hist) {
      prefix.push(prefix[prefix.length - 1] + Math.max(0, Number((r as any)[key]) || 0));
    }
    prepped.push({ slug, dates, dateIdx: new Map(dates.map((d, i) => [d, i])), prefix });
    if (dates[dates.length - 1] > latest) latest = dates[dates.length - 1];
  }
  if (!latest) return [];

  const earliest = prepped.reduce((m, c) => (c.dates[0] < m ? c.dates[0] : m), latest);
  const sampleDates: string[] = [];
  const cursor = new Date(latest + "T00:00:00Z");
  while (cursor.toISOString().slice(0, 10) >= earliest) {
    sampleDates.unshift(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() - stepDays);
  }

  const frames: RaceFrame[] = [];
  for (const day of sampleDates) {
    const bars: RaceFrame["bars"] = [];
    for (const c of prepped) {
      let i: number | null = null;
      for (let back = 0; back < 3; back++) {
        const d = new Date(day + "T00:00:00Z");
        d.setUTCDate(d.getUTCDate() - back);
        const k = c.dateIdx.get(d.toISOString().slice(0, 10));
        if (k != null) { i = k; break; }
      }
      if (i == null || i < 29) continue;
      const gdp30 = c.prefix[i + 1] - c.prefix[i - 29];
      if (gdp30 > 0) bars.push({ slug: c.slug, gdp30: Math.round(gdp30) });
    }
    if (bars.length >= 2) {
      bars.sort((a, b) => b.gdp30 - a.gdp30);
      frames.push({ date: day, bars });
    }
  }
  return frames;
}

// ── Macro: Buffett Indicator (mcap ÷ annualized GDP) over time ──────────
// The country version values an equity market against national output;
// here: native-token mcap ÷ (trailing-30d GDP × 365/30). mcap history comes
// from data/chains/mcap-history/ (CG free tier = 365d deep, grows daily),
// so coverage starts ~a year back even where GDP history is longer.
export type BuffettSeries = {
  slug: string;
  latest: number;
  min: number;
  max: number;
  points: Array<{ date: string; multiple: number }>;
};

export function getBuffettSeries(includeStablecoins = true, stepDays = 7): BuffettSeries[] {
  const key = includeStablecoins ? "gdp" : "gdp_app";
  const out: BuffettSeries[] = [];
  for (const slug of CHAIN_SLUGS) {
    const mcaps = MCAP_HISTORY_MAP[slug] || [];
    const hist = HISTORY_MAP[slug] || [];
    if (mcaps.length === 0 || hist.length < 30) continue;
    const mcapByDate = new Map(mcaps.map((r) => [r.date, r.mcap]));
    const prefix = [0];
    for (const r of hist) {
      prefix.push(prefix[prefix.length - 1] + Math.max(0, Number((r as any)[key]) || 0));
    }
    const dateIdx = new Map(hist.map((r, i) => [r.date, i]));
    const points: BuffettSeries["points"] = [];
    // Weekly back from the chain's latest GDP day.
    const latestDate = hist[hist.length - 1].date;
    const cursor = new Date(latestDate + "T00:00:00Z");
    const samples: string[] = [];
    while (samples.length < 600) {
      const d = cursor.toISOString().slice(0, 10);
      if (d < hist[0].date) break;
      samples.unshift(d);
      cursor.setUTCDate(cursor.getUTCDate() - stepDays);
    }
    for (const day of samples) {
      const i = dateIdx.get(day);
      if (i == null || i < 29) continue;
      const gdp30 = prefix[i + 1] - prefix[i - 29];
      if (gdp30 <= 0) continue;
      // mcap reading on the day, or up to 3 days back (CG gaps).
      let mcap: number | null = null;
      for (let back = 0; back < 4; back++) {
        const d = new Date(day + "T00:00:00Z");
        d.setUTCDate(d.getUTCDate() - back);
        const m = mcapByDate.get(d.toISOString().slice(0, 10));
        if (m != null && m > 0) { mcap = m; break; }
      }
      if (mcap == null) continue;
      const annualized = (gdp30 * 365) / 30;
      points.push({ date: day, multiple: Number((mcap / annualized).toFixed(2)) });
    }
    if (points.length < 4) continue;
    const multiples = points.map((p) => p.multiple);
    out.push({
      slug,
      latest: multiples[multiples.length - 1],
      min: Math.min(...multiples),
      max: Math.max(...multiples),
      points
    });
  }
  return out.sort((a, b) => a.latest - b.latest);
}

// ── Macro: structural transformation (sector mix over time) ─────────────
// Monthly category shares of a chain's GDP — the agriculture→industry→
// services chart, for blockspace. Top-N categories by lifetime revenue keep
// their own band; the rest fold into "Other". The current partial month is
// dropped (it would always dip at the right edge).
export type SectorMixSeries = {
  categories: string[]; // band order, largest lifetime first; "Other" last
  rows: Array<{ month: string } & Record<string, number | string>>; // shares 0–1
};

export function getSectorMix(
  slug: string,
  topN = 8,
  includeStablecoins = true
): SectorMixSeries | null {
  const hist = CATEGORY_HISTORY_MAP[slug] || [];
  if (hist.length < 3) return null;
  const currentMonth = (HISTORY_MAP[slug]?.slice(-1)[0]?.date ?? "").slice(0, 7);
  const raw = hist.filter((m) => m.month !== currentMonth);
  // Honor the page-wide stablecoin toggle: with issuers excluded, shares
  // re-derive over app categories only.
  const months = includeStablecoins
    ? raw
    : raw.map((m) => ({
        month: m.month,
        categories: Object.fromEntries(
          Object.entries(m.categories).filter(([cat]) => cat !== "Stablecoin Issuer")
        )
      }));
  if (months.length < 3) return null;

  const lifetime = new Map<string, number>();
  for (const m of months) {
    for (const [cat, v] of Object.entries(m.categories)) {
      lifetime.set(cat, (lifetime.get(cat) || 0) + v);
    }
  }
  const top = [...lifetime.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([cat]) => cat);
  const topSet = new Set(top);
  const hasOther = lifetime.size > top.length;

  const rows = months.map((m) => {
    const total = Object.values(m.categories).reduce((s, v) => s + v, 0);
    const row: SectorMixSeries["rows"][number] = { month: m.month };
    let other = 0;
    for (const [cat, v] of Object.entries(m.categories)) {
      if (topSet.has(cat)) row[cat] = total > 0 ? Number((v / total).toFixed(4)) : 0;
      else other += v;
    }
    for (const cat of top) if (row[cat] == null) row[cat] = 0;
    if (hasOther) row.Other = total > 0 ? Number((other / total).toFixed(4)) : 0;
    return row;
  });

  return { categories: hasOther ? [...top, "Other"] : top, rows };
}

// One entry per (chain, app). Used by the treemap. Stablecoin issuers
// already appear in protocols.json as virtual entries with attribution flag.
export type FlatApp = {
  chain: string;
  name: string;
  category: string;
  revenue_30d: number;
  attribution?: string;
};
export function getAllApps(includeStablecoins = true): FlatApp[] {
  const out: FlatApp[] = [];
  for (const slug of CHAIN_SLUGS) {
    const protos = PROTOCOLS_MAP[slug] || [];
    for (const p of protos) {
      if (!includeStablecoins && p.category === "Stablecoin Issuer") continue;
      out.push({
        chain: slug,
        name: p.name,
        category: p.category,
        revenue_30d: p.revenue_30d,
        attribution: (p as any).attribution
      });
    }
  }
  return out;
}

// Cohort month-over-month deltas — sum each chain's current 30d window
// against the prior 30d window. For TVL (a stock), compare the most recent
// non-null per chain vs the most recent non-null ~30d ago.
export type CohortDelta = {
  current: number;
  prior: number;
  deltaPct: number | null;
};
export type CohortDeltas = { gdp: CohortDelta; tvl: CohortDelta };

export function getCohortMonthlyDelta(includeStablecoins = true): CohortDeltas {
  let gdpCurrent = 0;
  let gdpPrior = 0;
  let tvlCurrent = 0;
  let tvlPrior = 0;
  const gdpKey = includeStablecoins ? "gdp" : "gdp_app";
  for (const slug of CHAIN_SLUGS) {
    const hist = (HISTORY_MAP[slug] || []);
    const current30 = hist.slice(-30);
    const prior30 = hist.slice(-60, -30);
    for (const r of current30) gdpCurrent += Math.max(0, Number((r as any)[gdpKey]) || 0);
    for (const r of prior30) gdpPrior += Math.max(0, Number((r as any)[gdpKey]) || 0);

    const latestTvl = [...current30].reverse().find((r) => r.tvl != null)?.tvl ?? null;
    const priorTvl = [...prior30].reverse().find((r) => r.tvl != null)?.tvl ?? null;
    if (latestTvl != null) tvlCurrent += latestTvl;
    if (priorTvl != null) tvlPrior += priorTvl;
  }
  const pct = (cur: number, pri: number): number | null =>
    pri > 0 ? (cur - pri) / pri : null;
  return {
    gdp: { current: gdpCurrent, prior: gdpPrior, deltaPct: pct(gdpCurrent, gdpPrior) },
    tvl: { current: tvlCurrent, prior: tvlPrior, deltaPct: pct(tvlCurrent, tvlPrior) }
  };
}

// Per-chain month-over-month deltas — same shape as the cohort version,
// but for a single chain's history. Powers the headline KPI cards on
// /chains/[slug]. TVL is a stock (latest non-null vs ~30d-ago non-null);
// GDP and REV are flows (sum over the 30d window).
export type ChainDeltas = { gdp: CohortDelta; tvl: CohortDelta; rev: CohortDelta };

export function getChainMonthlyDelta(slug: string, includeStablecoins = true): ChainDeltas {
  const hist = HISTORY_MAP[slug] || [];
  const current30 = hist.slice(-30);
  const prior30 = hist.slice(-60, -30);
  const gdpKey = includeStablecoins ? "gdp" : "gdp_app";

  const sumPos = (rows: ChainHistoryPoint[], k: "gdp" | "gdp_app" | "rev") =>
    rows.reduce((s, r) => s + Math.max(0, Number((r as any)[k]) || 0), 0);
  const latestNonNull = (rows: ChainHistoryPoint[], k: "tvl"): number | null => {
    for (let i = rows.length - 1; i >= 0; i--) {
      const v = (rows[i] as any)[k];
      if (v != null) return Number(v);
    }
    return null;
  };

  const gdpCur = sumPos(current30, gdpKey);
  const gdpPri = sumPos(prior30, gdpKey);
  const revCur = sumPos(current30, "rev");
  const revPri = sumPos(prior30, "rev");
  const tvlCur = latestNonNull(current30, "tvl");
  const tvlPri = latestNonNull(prior30, "tvl");

  const pct = (cur: number, pri: number): number | null =>
    pri > 0 ? (cur - pri) / pri : null;

  return {
    gdp: { current: gdpCur, prior: gdpPri, deltaPct: pct(gdpCur, gdpPri) },
    tvl: {
      current: tvlCur ?? 0,
      prior: tvlPri ?? 0,
      deltaPct: tvlCur != null && tvlPri != null ? pct(tvlCur, tvlPri) : null
    },
    rev: { current: revCur, prior: revPri, deltaPct: pct(revCur, revPri) }
  };
}

// Heatmap matrix: rows = chains, columns = top-N categories overall.
// Each cell = chain's 30d revenue in that category.
export type CategoryMatrix = {
  chains: string[];
  categories: string[];
  cells: number[][]; // cells[chainIdx][categoryIdx]
  rowTotals: number[];
};
export function getCategoryMatrix(topNCategories = 10, includeStablecoins = true): CategoryMatrix {
  const perChain = new Map<string, ChainCategory[]>();
  const catTotals = new Map<string, number>();
  for (const slug of CHAIN_SLUGS) {
    const raw = CATEGORIES_MAP[slug] || [];
    const cats = includeStablecoins
      ? raw
      : raw.filter((c) => c.category !== "Stablecoin Issuer");
    perChain.set(slug, cats);
    for (const c of cats) {
      catTotals.set(c.category, (catTotals.get(c.category) || 0) + c.revenue_30d);
    }
  }
  const topCategories = [...catTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topNCategories)
    .map(([cat]) => cat);

  const cells: number[][] = [];
  const rowTotals: number[] = [];
  for (const slug of CHAIN_SLUGS) {
    const cats = perChain.get(slug) || [];
    const row = topCategories.map((cat) => {
      const m = cats.find((c) => c.category === cat);
      return m ? m.revenue_30d : 0;
    });
    cells.push(row);
    rowTotals.push(row.reduce((s, v) => s + v, 0));
  }
  return { chains: CHAIN_SLUGS.slice(), categories: topCategories, cells, rowTotals };
}
