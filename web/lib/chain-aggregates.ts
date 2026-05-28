// Server-side aggregate readers for chain-cohort visualizations. Each is
// called once at build time (Server Component) and the result is baked into
// the static HTML.

import fs from "fs";
import path from "path";
import {
  CHAIN_SLUGS,
  type ChainCategory,
  type ChainHistoryPoint,
  type ChainProtocol
} from "./chains";

const DATA_ROOT = path.join(process.cwd(), "..", "data", "chains");

function readJsonSafe<T>(p: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as T;
  } catch {
    return fallback;
  }
}

// One row per date with a key per chain holding that day's GDP. Last 90d.
export type StackedDay = { date: string; [chainSlug: string]: string | number };
export function getStackedGdpSeries(days = 90): StackedDay[] {
  const perChain = new Map<string, ChainHistoryPoint[]>();
  const allDates = new Set<string>();
  for (const slug of CHAIN_SLUGS) {
    const hist = readJsonSafe<ChainHistoryPoint[]>(
      path.join(DATA_ROOT, "history", `${slug}.json`),
      []
    ).slice(-days);
    perChain.set(slug, hist);
    for (const d of hist) allDates.add(d.date);
  }
  const sortedDates = [...allDates].sort().slice(-days);
  return sortedDates.map((date) => {
    const row: StackedDay = { date };
    for (const slug of CHAIN_SLUGS) {
      const hist = perChain.get(slug) || [];
      const match = hist.find((h) => h.date === date);
      row[slug] = match && match.gdp > 0 ? match.gdp : 0;
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
export function getAllApps(): FlatApp[] {
  const out: FlatApp[] = [];
  for (const slug of CHAIN_SLUGS) {
    const protos = readJsonSafe<ChainProtocol[]>(
      path.join(DATA_ROOT, "protocols", `${slug}.json`),
      []
    );
    for (const p of protos) {
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

// Heatmap matrix: rows = chains, columns = top-N categories overall.
// Each cell = chain's 30d revenue in that category.
export type CategoryMatrix = {
  chains: string[];
  categories: string[];
  cells: number[][]; // cells[chainIdx][categoryIdx]
  rowTotals: number[];
};
export function getCategoryMatrix(topNCategories = 10): CategoryMatrix {
  const perChain = new Map<string, ChainCategory[]>();
  const catTotals = new Map<string, number>();
  for (const slug of CHAIN_SLUGS) {
    const cats = readJsonSafe<ChainCategory[]>(
      path.join(DATA_ROOT, "categories", `${slug}.json`),
      []
    );
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
