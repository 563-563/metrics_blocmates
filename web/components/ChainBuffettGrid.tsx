"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import { Sparkline } from "@/components/Sparkline";
import type { BuffettSeries } from "@/lib/chain-aggregates";

// Buffett Indicator small multiples — native-token mcap ÷ annualized GDP,
// the metric Buffett uses on countries (market cap / GNP), per chain.
// Sorted cheapest-first. Each cell's sparkline has its own y-scale; the
// numbers are what compare across cells.

function fmtX(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k×`;
  if (v >= 100) return `${v.toFixed(0)}×`;
  return `${v.toFixed(1)}×`;
}

export function ChainBuffettGrid({
  series,
  chainNames
}: {
  series: BuffettSeries[];
  chainNames: Record<string, string>;
}) {
  if (series.length === 0) {
    return (
      <p className="text-xs text-fg-muted py-6 text-center">
        mcap history not fetched yet — run scripts/chains/fetch-mcap-history.js.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {series.map((s) => {
        const color = CHAIN_COLORS[s.slug] || "#71717a";
        const span = `${s.points[0].date.slice(0, 7)} → ${s.points[s.points.length - 1].date.slice(0, 7)}`;
        return (
          <div key={s.slug} className="border border-line rounded-md p-3 bg-surface">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-fg truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                {chainNames[s.slug] ?? s.slug}
              </span>
              <span className="font-mono tabular-nums text-sm text-fg shrink-0">
                {fmtX(s.latest)}
              </span>
            </div>
            <div style={{ color }}>
              <Sparkline data={s.points.map((p) => p.multiple)} color={color} width={200} height={36} />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-fg-muted font-mono tabular-nums">
              <span title={span}>range {fmtX(s.min)}–{fmtX(s.max)}</span>
              <span>{span}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
