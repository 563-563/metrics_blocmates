// Chain-GDP data layer. The snapshot lives in
// data/chains/snapshots/latest.json (24 chains, full summary). Per-chain
// history / protocols / categories are read at build time by Server
// Components.

import fs from "fs";
import path from "path";
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

// Server-side reads — bundled at build time when called from a Server
// Component via generateStaticParams.
const DATA_ROOT = path.join(process.cwd(), "..", "data", "chains");

export function getChainHistory(slug: string): ChainHistoryPoint[] {
  const f = path.join(DATA_ROOT, "history", `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(f, "utf8")) as ChainHistoryPoint[];
  } catch {
    return [];
  }
}

export function getChainProtocols(slug: string): ChainProtocol[] {
  const f = path.join(DATA_ROOT, "protocols", `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(f, "utf8")) as ChainProtocol[];
  } catch {
    return [];
  }
}

export function getChainCategories(slug: string): ChainCategory[] {
  const f = path.join(DATA_ROOT, "categories", `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(f, "utf8")) as ChainCategory[];
  } catch {
    return [];
  }
}
