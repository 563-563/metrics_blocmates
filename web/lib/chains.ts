// Chain-GDP data layer.
//
// The snapshot is statically imported (one file).
//
// Per-chain history / protocols / categories are STATICALLY BUNDLED via a
// Webpack context-module pattern: `require(\`../../data/chains/{kind}/${slug}.json\`)`
// inlines every matching file at build time so the data ships with the
// function bundle. We rely on this rather than runtime `fs.readFileSync`
// because Vercel's serverless functions don't include the repo's data
// folder unless it's reachable via the module graph.

import chainsSnapshotRaw from "../../data/chains/snapshots/latest.json";

export type ChainSummary = {
  slug: string;
  name: string;
  symbol: string | null;
  dl_chain: string | null;
  cg_id: string | null;
  image: string | null;
  mcap_usd: number | null;
  fdv_usd: number | null;
  price_usd: number | null;
  circulating: number | null;
  gdp_24h_usd: number;
  gdp_7d_usd: number;
  gdp_30d_usd: number;
  gdp_app_30d_usd: number;
  gdp_stable_30d_usd: number;
  gdp_annualized_usd: number;
  gdp_multiple: number | null;
  tvl_usd: number | null;
  gdp_over_tvl_ann: number | null;
  gdp_over_tvl_band: "high" | "med-high" | "med-low" | "low" | null;
  rev_24h_usd: number | null;
  rev_7d_usd: number;
  rev_30d_usd: number;
  rev_over_gdp_7d: number | null;
  rev_over_gdp_band: "app-friendly" | "modest" | "heavy" | "extractive" | null;
  top_protocol: string | null;
  top_category: string | null;
  top_protocol_excl_stable?: string | null;
  top_category_excl_stable?: string | null;
  protocol_count: number;
  stable_share_usdc: number;
  stable_share_usdt: number;
  structural_note: string | null;
  latest_date: string;
};

export type ChainsSnapshot = {
  generated_at: string;
  as_of: string;
  methodology: Record<string, string>;
  chains: ChainSummary[];
};

export type ChainHistoryPoint = {
  date: string;
  gdp: number;
  gdp_app: number;
  gdp_stable: number;
  tvl: number | null;
  rev: number | null;
};

export type ChainProtocol = {
  name: string;
  category: string;
  revenue_30d: number;
  pct_of_chain: number;
};

export type ChainCategory = {
  category: string;
  revenue_30d: number;
  pct: number;
};

export const chains = chainsSnapshotRaw as ChainsSnapshot;
export const CHAIN_SLUGS = chains.chains.map((c) => c.slug);

export function getChainBySlug(slug: string): ChainSummary | undefined {
  return chains.chains.find((c) => c.slug === slug);
}

// ─── Bundled per-chain data ──────────────────────────────────────────────
// Filled at module init using dynamic require with a template literal —
// Webpack ContextModuleFactory bundles every JSON file in the matched
// directories. Works in SSG and serverless (force-dynamic) alike.

export type ChainMcapPoint = { date: string; mcap: number };
export type ChainCategoryMonth = { month: string; categories: Record<string, number> };

export const HISTORY_MAP: Record<string, ChainHistoryPoint[]> = {};
export const PROTOCOLS_MAP: Record<string, ChainProtocol[]> = {};
export const CATEGORIES_MAP: Record<string, ChainCategory[]> = {};
export const MCAP_HISTORY_MAP: Record<string, ChainMcapPoint[]> = {};
export const CATEGORY_HISTORY_MAP: Record<string, ChainCategoryMonth[]> = {};

for (const slug of CHAIN_SLUGS) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    HISTORY_MAP[slug] = require(`../../data/chains/history/${slug}.json`) as ChainHistoryPoint[];
  } catch {
    /* file missing — silent */
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    MCAP_HISTORY_MAP[slug] = require(`../../data/chains/mcap-history/${slug}.json`) as ChainMcapPoint[];
  } catch {
    /* chains without a native token / fetcher not yet run — silent */
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    CATEGORY_HISTORY_MAP[slug] = require(`../../data/chains/category-history/${slug}.json`) as ChainCategoryMonth[];
  } catch {
    /* */
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    PROTOCOLS_MAP[slug] = require(`../../data/chains/protocols/${slug}.json`) as ChainProtocol[];
  } catch {
    /* */
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    CATEGORIES_MAP[slug] = require(`../../data/chains/categories/${slug}.json`) as ChainCategory[];
  } catch {
    /* */
  }
}

export function getChainHistory(slug: string): ChainHistoryPoint[] {
  return HISTORY_MAP[slug] || [];
}

export function getChainProtocols(slug: string): ChainProtocol[] {
  return PROTOCOLS_MAP[slug] || [];
}

export function getChainCategories(slug: string): ChainCategory[] {
  return CATEGORIES_MAP[slug] || [];
}
