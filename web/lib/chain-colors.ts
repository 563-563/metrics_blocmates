// Deterministic chain → color mapping. Top GDP chains get memorable hues;
// the rest fan out across a curated palette. Same color used everywhere
// (table, leaderboard, quadrant, stacked area, treemap) so the eye builds
// a consistent association across visuals.

export const CHAIN_COLORS: Record<string, string> = {
  ethereum: "#818cf8",
  tron: "#ef4444",
  solana: "#14b8a6",
  hyperliquid: "#84cc16",
  bsc: "#f59e0b",
  base: "#3b82f6",
  polygon: "#a855f7",
  arbitrum: "#06b6d4",
  edgex: "#ec4899",
  ton: "#38bdf8",
  avalanche: "#f97316",
  zklighter: "#d946ef",
  sui: "#22d3ee",
  mantle: "#6366f1",
  optimism: "#fb7185",
  ink: "#4ade80",
  scroll: "#fbbf24",
  plasma: "#c084fc",
  starknet: "#fda4af",
  near: "#34d399",
  monad: "#fb923c",
  berachain: "#eab308",
  megaeth: "#94a3b8",
  katana: "#facc15"
};

const FALLBACK = "#71717a";

export function chainColor(slug: string): string {
  return CHAIN_COLORS[slug] ?? FALLBACK;
}
