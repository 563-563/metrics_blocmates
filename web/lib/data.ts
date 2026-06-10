// Data layer — direct JSON imports from sibling ../data/ folder. Next.js
// bundles these at build time, so the deployed app ships with the latest
// snapshot. Hourly cron updates the JSON; Vercel auto-rebuilds on push.

import hmSnapshotRaw from "../../data/hm/snapshots/latest.json";
import npSnapshotRaw from "../../data/np/snapshots/latest.json";
import hypeBuybacksRaw from "../../data/onchain/hype-af/buybacks.json";
import hypeAfHistoryRaw from "../../data/onchain/hype-af/treasury-history.json";
import aaveBuybacksRaw from "../../data/onchain/aave/buybacks.json";
import aaveTreasuryRaw from "../../data/onchain/aave/treasury.json";
import skyCatBInflowsRaw from "../../data/onchain/sky/cat-b-inflows.json";
import skyRewardsFarmBalanceRaw from "../../data/onchain/sky/rewards-farm-balance.json";
import litBuybacksRaw from "../../data/onchain/lit/buybacks.json";

// ─── Types matching compute outputs ──────────────────────────────────────

export type TmfStep = {
  n: number;
  name: string;
  dest: string;
  pct: number;
  status: "active" | "filling" | "locked";
  counts_to_abc?: boolean;
  is_gate?: boolean;
  target_usd?: number;
  unlocks?: string;
};
export type TmfWaterfall = {
  framework: string;
  current_phase: string;
  abc_floor_usd: number;
  abc_dest: string;
  abc_level_note: string;
  steps: TmfStep[];
  source: string;
};

export type HmProtocol = {
  slug: string;
  name: string;
  symbol: string;
  category: string;
  image?: string | null;
  revenue_30d?: number | null;
  revenue_1y?: number | null;
  holders_revenue_30d?: number | null;
  tmf_waterfall?: TmfWaterfall | null;
  phase: { active: string; notes?: string };
  price_usd: number;
  price_source: string;
  circulating_supply_tokens: number;
  circulating_supply_source: string;
  float_mcap_usd: number;
  unlocks_24mo_tokens: number;
  unlocks_24mo_usd: number;
  unlocks_24mo_notes?: string;
  emissions_24mo_tokens: number;
  emissions_24mo_usd: number;
  emissions_24mo_notes?: string;
  buybacks_24mo_usd: number;
  buybacks_24mo_notes?: string;
  adj_mcap_usd: number;
  annual_buyback_usd: number;
  annual_buyback_verification: string;
  annual_buyback_source?: {
    annual_usd?: number;
    days_used?: number;
    window_requested?: number;
    lifetime_annual_usd?: number;
    lifetime_days?: number;
    lifetime_cumulative_usd?: number;
    rate_vs_lifetime_pct?: number;
    source?: string;
  };
  annual_holder_yield_usd: number;
  annual_holder_yield_verification: string;
  annual_holder_yield_notes?: string;
  real_capture_usd: number;
  hm: number;
  hm_band: string;
  sources?: string[];
};

export type HmSnapshot = {
  schema_version: number;
  generated_at: string;
  as_of: string;
  mode: string;
  latest_data_as_of: string | null;
  protocols: HmProtocol[];
};

export type NpRollup = {
  window_days: number;
  days_observed: number;
  buyback_coverage_days: number;
  buyback_coverage_pct: number;
  coverage_complete: boolean;
  daily_price_coverage_pct: number;
  daily_price_complete: boolean;
  unlocks_tokens: number;
  unlocks_tokens_adjusted?: number;
  treasury_sells_tokens?: number;
  buybacks_tokens: number;
  burns_tokens: number;
  treasury_accumulation_tokens: number;
  net_staking_lockups_tokens: number;
  unlocks_usd?: number;
  unlocks_usd_adjusted?: number;
  treasury_sells_usd?: number;
  buybacks_usd?: number;
  burns_usd?: number;
  treasury_accumulation_usd?: number;
  net_staking_lockups_usd?: number;
  net_pressure_tokens: number;
  net_pressure_tokens_gross?: number;
  net_pressure_usd: number;
  net_pressure_usd_gross?: number;
  net_pressure_usd_method: "per_day_price" | "today_price";
  unlocks_by_recipient?: Record<string, { tokens: number; usd: number }>;
};

export type NpDaily = {
  date: string;
  is_future: boolean;
  unlocks_tokens: number;
  buybacks_tokens: number;
  net_pressure_tokens: number;
  net_pressure_tokens_gross?: number;
  net_pressure_usd: number;
  net_pressure_usd_gross?: number;
  price_usd_for_day: number;
  price_source_for_day: "daily_series" | "today_fallback";
};

export type NpProtocol = {
  slug: string;
  name: string;
  symbol: string;
  price_usd: number;
  static_reference: {
    circulating_supply?: { circulating_supply: number; total_supply: number };
    af_balance?: { amount_tokens: number };
    total_staked?: { total_staked_tokens: number };
  };
  unlock_weighting?: { sell_probability: Record<string, number>; fallback: number };
  rollups: { "24h": NpRollup; "7d": NpRollup; "30d": NpRollup; "90d": NpRollup };
  daily: NpDaily[];
};

// Published Net Pressure basis: GROSS scheduled unlocks (100% sell-through —
// the actual emissions hitting circulation), not the editorial sell-probability
// weighting. The weighted figure is still computed and shown as a secondary
// reference; readers apply their own weights via the protocol-page sliders.
// Older snapshots without the gross column fall back to the weighted net.
export function npHeadlineUsd(r: NpRollup | undefined | null): number | null {
  if (!r) return null;
  return r.net_pressure_usd_gross ?? r.net_pressure_usd ?? null;
}
export function npHeadlineTokens(r: NpRollup | undefined | null): number | null {
  if (!r) return null;
  return r.net_pressure_tokens_gross ?? r.net_pressure_tokens ?? null;
}

export type NpSnapshot = {
  schema_version: number;
  generated_at: string;
  as_of: string;
  protocols: NpProtocol[];
};

export type AfBuyback = {
  date: string;
  amount_tokens: number | null;
  amount_usd: number;
  avg_price_usd?: number;
  price_usd?: number;
  fill_count?: number | null;
  tx_count?: number;
  unique_senders?: number;
  price_source?: string;
  source: string;
  verification: string;
};

export type AfTreasuryHist = {
  date: string;
  balance_tokens: number;
  source: string;
  verification: string;
};

// ─── Loaders ─────────────────────────────────────────────────────────────

export const hm: HmSnapshot = hmSnapshotRaw as HmSnapshot;
export const np: NpSnapshot = npSnapshotRaw as unknown as NpSnapshot;
export const hypeBuybacks: AfBuyback[] = hypeBuybacksRaw as AfBuyback[];
export const hypeAfHistory: AfTreasuryHist[] = hypeAfHistoryRaw as AfTreasuryHist[];
export const aaveBuybacks: AfBuyback[] = aaveBuybacksRaw as AfBuyback[];
export const aaveTreasury: AfTreasuryHist[] = (aaveTreasuryRaw as Array<{
  date: string;
  balance_tokens: number;
  source: string;
  verification: string;
}>).map((r) => ({ ...r }));

// Sluggable list of all protocols in the cohort (used for static params).
export const PROTOCOL_SLUGS = hm.protocols.map((p) => p.slug);

export function getHmProtocolBySlug(slug: string): HmProtocol | undefined {
  return hm.protocols.find((p) => p.slug === slug);
}

export function getNpProtocolBySlug(slug: string): NpProtocol | undefined {
  return np.protocols.find((p) => p.slug === slug);
}

// Per-protocol on-chain feed map. Currently HYPE only — when AAVE/SKY/LIT
// adapters land, add their slug → daily-series mappings here.
export const litBuybacks: AfBuyback[] = litBuybacksRaw as AfBuyback[];

// HM-over-time series, loaded for every cohort slug that has a history file
// (backfill-hm-history.js writes them for core seeds AND proxy-tier tokens
// with a DL feed). Webpack context-module pattern, same as lib/chains.ts —
// the require resolves per-slug at build time; missing files just no-op.
export type HmHistoryPoint = { date: string; hm: number | null; price_usd?: number };
const hmHistory: Record<string, HmHistoryPoint[]> = {};
for (const slug of PROTOCOL_SLUGS) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    hmHistory[slug] = require(`../../data/hm/history/${slug}.json`) as HmHistoryPoint[];
  } catch {
    /* no series for this slug yet */
  }
}
export function getHmHistory(slug: string): HmHistoryPoint[] {
  return hmHistory[slug] ?? [];
}

export const onchainFeeds: Record<
  string,
  { buybacks?: AfBuyback[]; afHistory?: AfTreasuryHist[] }
> = {
  hyperliquid: { buybacks: hypeBuybacks, afHistory: hypeAfHistory },
  aave: { buybacks: aaveBuybacks, afHistory: aaveTreasury },
  lighter: { buybacks: litBuybacks }
};

// Proxy-tier buyback feeds (DL holdersRevenue/fees → data/onchain/proxy/).
// Loaded for every cohort slug not already wired above, so sparklines and
// buyback charts light up for the proxy tier too.
for (const slug of PROTOCOL_SLUGS) {
  if (onchainFeeds[slug]) continue;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const buybacks = require(`../../data/onchain/proxy/${slug}/buybacks.json`) as AfBuyback[];
    if (Array.isArray(buybacks) && buybacks.length > 0) onchainFeeds[slug] = { buybacks };
  } catch {
    /* no proxy feed for this slug */
  }
}
