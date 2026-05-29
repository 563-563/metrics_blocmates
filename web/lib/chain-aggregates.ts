// Server-side aggregate readers for chain-cohort visualizations.
//
// Data comes from the per-chain maps in ./chains, which are populated at
// module init via webpack's context-module pattern — so this works in both
// SSG and runtime (force-dynamic) contexts without needing fs at request
// time.

import {
  CATEGORIES_MAP,
  CHAIN_SLUGS,
  HISTORY_MAP,
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
      m.set(hist[i].date, avg);
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
