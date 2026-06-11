"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainGrowth } from "@/lib/chain-aggregates";

// Recession watch — small multiples of quarterly GDP growth per chain,
// Economist-style. Bars are trailing-90d windows vs the prior 90d; the
// classic rule applies literally: two consecutive negative quarters = the
// economy is in recession.

const BAR_CAP = 50; // |growth| % at which a bar hits full height

function growthColor(g: number): string {
  return g >= 0 ? "rgb(var(--positive))" : "rgb(var(--negative))";
}

function fmtPct(v: number | null): string {
  if (v == null) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}%`;
}

export function ChainGrowthGrid({
  growth,
  chainNames
}: {
  growth: ChainGrowth[];
  chainNames: Record<string, string>;
}) {
  if (growth.length === 0) {
    return <p className="text-xs text-fg-muted py-6 text-center">No history yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {growth.map((g) => {
        const color = CHAIN_COLORS[g.slug] || "#71717a";
        return (
          <div key={g.slug} className="border border-line rounded-md p-3 bg-surface">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-fg truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                {chainNames[g.slug] ?? g.slug}
              </span>
              {g.inRecession && (
                <span className="text-[9px] uppercase tracking-widest text-negative border border-negative/40 bg-negative/10 rounded-full px-1.5 py-0.5 shrink-0">
                  recession
                </span>
              )}
              {g.tooYoung && (
                <span className="text-[9px] uppercase tracking-widest text-fg-faint border border-line rounded-full px-1.5 py-0.5 shrink-0">
                  too young
                </span>
              )}
            </div>

            {/* Quarterly growth bars, oldest → newest, zero-axis centered */}
            <div className="flex items-center gap-1 h-14" aria-hidden="true">
              {g.quarters.map((q) => {
                const h = Math.min(Math.abs(q.growthPct) / BAR_CAP, 1) * 50;
                return (
                  <div
                    key={q.end}
                    className="flex-1 relative h-full"
                    title={`Q ending ${q.end}: ${fmtPct(q.growthPct)}`}
                  >
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-line" />
                    <div
                      className="absolute left-0 right-0 rounded-sm"
                      style={{
                        background: growthColor(q.growthPct),
                        opacity: 0.85,
                        height: `${Math.max(h, 2)}%`,
                        ...(q.growthPct >= 0
                          ? { bottom: "50%" }
                          : { top: "50%" })
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-2 text-[11px] font-mono tabular-nums">
              <span>
                <span className="text-fg-faint">QoQ </span>
                <span style={{ color: g.qoqPct != null ? growthColor(g.qoqPct) : undefined }}>
                  {fmtPct(g.qoqPct)}
                </span>
              </span>
              <span>
                <span className="text-fg-faint">YoY </span>
                <span style={{ color: g.yoyPct != null ? growthColor(g.yoyPct) : undefined }}>
                  {fmtPct(g.yoyPct)}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
