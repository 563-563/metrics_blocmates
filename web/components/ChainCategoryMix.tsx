import type { ChainCategory } from "@/lib/chains";
import { fmtUsd } from "@/lib/format";

// Color palette — deterministic per category so the same category gets the
// same color across chains. Stablecoin Issuer gets a distinct cyan to mark
// it as off-chain attribution.
const PALETTE = [
  "#f97316", "#84cc16", "#eab308", "#a78bfa", "#f43f5e",
  "#10b981", "#ec4899", "#22d3ee", "#fb7185", "#fbbf24"
];

function colorForCategory(cat: string, idx: number): string {
  if (cat === "Stablecoin Issuer") return "#22d3ee";
  // simple stable hash for category → palette slot
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return PALETTE[(h + idx) % PALETTE.length];
}

export function ChainCategoryMix({ categories }: { categories: ChainCategory[] }) {
  if (!categories || categories.length === 0) {
    return <p className="text-xs text-zinc-600 py-4">No category data.</p>;
  }
  const rows = categories.filter((c) => c.revenue_30d > 0);
  const total = rows.reduce((s, c) => s + c.revenue_30d, 0);
  if (total <= 0) {
    return <p className="text-xs text-zinc-600 py-4">No positive revenue this period.</p>;
  }

  return (
    <div>
      {/* Stacked horizontal bar */}
      <div className="flex h-7 rounded overflow-hidden border border-zinc-800">
        {rows.map((c, i) => {
          const pct = (c.revenue_30d / total) * 100;
          if (pct < 0.5) return null;
          return (
            <div
              key={c.category}
              className="flex items-center justify-center text-[10px] font-medium text-black/80"
              style={{ width: `${pct}%`, background: colorForCategory(c.category, i) }}
              title={`${c.category} · ${fmtUsd(c.revenue_30d)} · ${pct.toFixed(1)}%`}
            >
              {pct >= 8 ? `${pct.toFixed(0)}%` : ""}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-xs">
        {rows.slice(0, 12).map((c, i) => (
          <div key={c.category} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: colorForCategory(c.category, i) }}
              />
              <span className="text-zinc-300 truncate">{c.category}</span>
            </span>
            <span className="text-zinc-500 tabular-nums shrink-0">
              {fmtUsd(c.revenue_30d)}{" "}
              <span className="text-zinc-600">{((c.revenue_30d / total) * 100).toFixed(0)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
