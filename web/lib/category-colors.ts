// Deterministic category → color mapping, shared by the heatmap and the
// sector-mix (structural transformation) charts so the eye builds one
// association per category across visuals.

export const CATEGORY_COLORS: Record<string, string> = {
  Derivatives: "#a78bfa",
  Dexs: "#84cc16",
  Lending: "#f59e0b",
  Launchpad: "#ec4899",
  "Liquid Staking": "#10b981",
  "Stablecoin Issuer": "#22d3ee",
  "Prediction Market": "#fbbf24",
  "NFT Marketplace": "#fb7185",
  Services: "#94a3b8",
  Yield: "#34d399",
  "Block Builders": "#818cf8",
  Bridge: "#06b6d4",
  "Cross Chain Bridge": "#06b6d4",
  "Crypto Card Issuer": "#fda4af",
  "DEX Aggregator": "#a3e635",
  Interface: "#c084fc",
  "Reserve Currency": "#eab308",
  "Gamified Mining": "#fb923c",
  Wallets: "#f472b6",
  "Telegram Bot": "#60a5fa",
  CDP: "#facc15",
  RWA: "#2dd4bf",
  "Basis Trading": "#8b5cf6",
  Gaming: "#f87171",
  Other: "#78716c"
};

export const CATEGORY_FALLBACK = "#71717a";

export function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? CATEGORY_FALLBACK;
}
