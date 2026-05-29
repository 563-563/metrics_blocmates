"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainSummary } from "@/lib/chains";

function fmt(v: number | null | undefined): string {
  if (v == null) return "—";
  const abs = Math.abs(v);
  if (abs >= 1e9) return `$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(abs / 1e3).toFixed(0)}K`;
  return `$${abs.toFixed(0)}`;
}

// Horizontal-bar leaderboard. Top N chains, two metric bars per row
// (GDP + Mcap) on a shared linear scale so the relative scale is honest.
export function ChainLeaderboard({
  chains,
  topN = 14
}: {
  chains: ChainSummary[];
  topN?: number;
}) {
  const rows = chains.slice(0, topN);
  const maxGdp = Math.max(...rows.map((c) => c.gdp_30d_usd || 0));
  const maxMcap = Math.max(...rows.map((c) => c.mcap_usd || 0));
  const maxOverall = Math.max(maxGdp, maxMcap);

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-[110px_1fr_110px] text-[10px] uppercase tracking-widest text-fg-muted pb-1.5 border-b border-line">
        <span>Chain</span>
        <span className="text-center">
          <span className="inline-block w-2 h-2 align-middle mr-1.5" style={{ background: "currentColor" }} />
          GDP 30d (chain color) · <span className="text-fg-faint">Mcap (faint)</span>
        </span>
        <span className="text-right">GDP / Mcap</span>
      </div>
      {rows.map((c) => {
        const color = CHAIN_COLORS[c.slug] ?? "#71717a";
        const gdpPct = (c.gdp_30d_usd / maxOverall) * 100;
        const mcapPct = c.mcap_usd ? (c.mcap_usd / maxOverall) * 100 : 0;
        return (
          <div key={c.slug} className="grid grid-cols-[110px_1fr_110px] items-center gap-3">
            <span className="text-fg text-xs truncate">{c.name}</span>
            <div className="relative h-5">
              {/* Mcap bar (faint, full width) */}
              {mcapPct > 0 && (
                <div
                  className="absolute inset-y-0 left-0 rounded-sm"
                  style={{ width: `${mcapPct}%`, background: color, opacity: 0.18 }}
                />
              )}
              {/* GDP bar (vivid, narrower) */}
              <div
                className="absolute inset-y-0 left-0 rounded-sm"
                style={{ width: `${gdpPct}%`, background: color, opacity: 0.95 }}
              />
            </div>
            <span className="text-right tabular-nums text-fg-muted text-xs">
              <span className="text-fg">{fmt(c.gdp_30d_usd)}</span>
              <span className="text-fg-faint"> / {fmt(c.mcap_usd)}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
