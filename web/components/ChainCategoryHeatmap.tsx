import type { CategoryMatrix } from "@/lib/chain-aggregates";
import type { ChainSummary } from "@/lib/chains";
import { CHAIN_COLORS } from "@/lib/chain-colors";

function fmt(v: number): string {
  if (v <= 0) return "—";
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

// Heat each cell by share-of-row (so reading a row tells you that chain's
// category mix). Cell tint = the category's column color × intensity.
const CATEGORY_COLORS: Record<string, string> = {
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
  "Gamified Mining": "#fb923c"
};
const FALLBACK_COLOR = "#71717a";

export function ChainCategoryHeatmap({
  matrix,
  chains
}: {
  matrix: CategoryMatrix;
  chains: ChainSummary[];
}) {
  if (!matrix || matrix.chains.length === 0 || matrix.categories.length === 0) {
    return <p className="text-xs text-zinc-600 py-4">No category data.</p>;
  }
  // Sort chains by row total (biggest economy first), keep matrix order aligned
  const chainBySlug = new Map(chains.map((c) => [c.slug, c]));
  const rowsWithTotals = matrix.chains.map((slug, i) => ({
    slug,
    total: matrix.rowTotals[i],
    cells: matrix.cells[i]
  }));
  rowsWithTotals.sort((a, b) => b.total - a.total);
  const rows = rowsWithTotals.filter((r) => r.total > 0);

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="text-[11px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-left font-normal text-zinc-500 uppercase tracking-widest py-1.5 px-2 sticky left-0 bg-zinc-950">
              Chain
            </th>
            {matrix.categories.map((cat) => (
              <th
                key={cat}
                className="text-left font-normal text-zinc-500 uppercase tracking-widest py-1.5 px-2"
                style={{ minWidth: 88 }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: CATEGORY_COLORS[cat] || FALLBACK_COLOR }}
                  />
                  <span className="truncate">{cat}</span>
                </span>
              </th>
            ))}
            <th className="text-right font-normal text-zinc-500 uppercase tracking-widest py-1.5 px-2">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const c = chainBySlug.get(r.slug);
            const chainColor = CHAIN_COLORS[r.slug] || FALLBACK_COLOR;
            return (
              <tr key={r.slug}>
                <td className="py-1.5 px-2 border-t border-zinc-900 sticky left-0 bg-zinc-950">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-sm shrink-0"
                      style={{ background: chainColor }}
                    />
                    <span className="text-zinc-200">{c?.name ?? r.slug}</span>
                  </span>
                </td>
                {r.cells.map((v, j) => {
                  const cat = matrix.categories[j];
                  const pct = r.total > 0 ? v / r.total : 0;
                  const color = CATEGORY_COLORS[cat] || FALLBACK_COLOR;
                  // Cell intensity = share of row. ≤1% = nearly invisible.
                  const opacity = pct < 0.01 ? 0 : 0.12 + Math.min(0.6, pct);
                  return (
                    <td
                      key={cat}
                      className="border-t border-zinc-900 px-2 py-1.5 tabular-nums text-zinc-300"
                      style={{ background: pct > 0 ? color : "transparent", backgroundColor: pct > 0 ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}` : "transparent" }}
                      title={`${cat}: ${fmt(v)} (${(pct * 100).toFixed(1)}% of chain GDP)`}
                    >
                      {v > 0 ? fmt(v) : <span className="text-zinc-700">—</span>}
                    </td>
                  );
                })}
                <td className="border-t border-zinc-900 px-2 py-1.5 text-right tabular-nums text-zinc-100">
                  {fmt(r.total)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
