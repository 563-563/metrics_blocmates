"use client";

import { useState } from "react";
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

function fmtUsd(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

type Tip = { qIndex: number; end: string; growthPct: number; gdpUsd: number };

function GrowthCard({
  g,
  name,
  color
}: {
  g: ChainGrowth;
  name: string;
  color: string;
}) {
  const [tip, setTip] = useState<Tip | null>(null);
  const count = g.quarters.length || 1;

  return (
    <div className="relative border border-line rounded-md p-3 bg-surface">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-fg truncate">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          {name}
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
      <div className="flex items-center gap-1 h-14">
        {g.quarters.map((q, i) => {
          const h = Math.min(Math.abs(q.growthPct) / BAR_CAP, 1) * 50;
          return (
            <div
              key={q.end}
              className="flex-1 relative h-full cursor-help"
              onMouseEnter={() => setTip({ qIndex: i, ...q })}
              onMouseLeave={() => setTip(null)}
            >
              <div className="absolute left-0 right-0 top-1/2 h-px bg-line" />
              <div
                className="absolute left-0 right-0 rounded-sm"
                style={{
                  background: growthColor(q.growthPct),
                  opacity: tip && tip.qIndex === i ? 1 : 0.85,
                  height: `${Math.max(h, 2)}%`,
                  ...(q.growthPct >= 0 ? { bottom: "50%" } : { top: "50%" })
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Hover tooltip for the bar under the cursor */}
      {tip && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-line bg-canvas/95 px-2.5 py-2 text-[11px] leading-relaxed shadow-xl whitespace-nowrap"
          style={{
            bottom: "calc(100% - 8px)",
            left: `${Math.min(Math.max(((tip.qIndex + 0.5) / count) * 100, 18), 82)}%`,
            transform: "translateX(-50%)"
          }}
        >
          <span className="block text-fg-muted">quarter ending {tip.end}</span>
          <span className="block font-mono tabular-nums" style={{ color: growthColor(tip.growthPct) }}>
            {fmtPct(tip.growthPct)} vs prior quarter
          </span>
          <span className="block text-fg">GDP {fmtUsd(tip.gdpUsd)} over 90d</span>
        </div>
      )}

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
      {growth.map((g) => (
        <GrowthCard
          key={g.slug}
          g={g}
          name={chainNames[g.slug] ?? g.slug}
          color={CHAIN_COLORS[g.slug] || "#71717a"}
        />
      ))}
    </div>
  );
}
