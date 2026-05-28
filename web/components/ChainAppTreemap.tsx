"use client";

import { useState } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { FlatApp } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

const TEXT_FILL = "#f4f4f5";
const TEXT_STROKE = "rgba(0,0,0,0.55)";

type Hovered = {
  name: string;
  chain: string;
  category: string;
  size: number;
  color: string;
  x: number;
  y: number;
};

// Make `setHover` available to the SVG content renderer via a module-level
// callback closure — Recharts doesn't pass arbitrary props through `content`.
let activeSetHover: ((h: Hovered | null) => void) | null = null;

function TmContent(props: any) {
  const { x, y, width, height, depth, name, size } = props;
  if (depth === 0 || width == null || height == null) return null;

  const safeName = typeof name === "string" ? name : "";
  const safeSize = typeof size === "number" ? size : 0;
  const fill = props.color || "#71717a";
  const chain = props.chain || "";
  const category = props.category || "";

  const showName = width > 60 && height > 22 && safeName.length > 0;
  const showValue = width > 90 && height > 42 && safeSize > 0;
  const maxChars = Math.max(4, Math.floor(width / 7));
  const displayName =
    safeName.length > maxChars ? `${safeName.slice(0, maxChars - 1)}…` : safeName;

  const onEnter = (e: React.MouseEvent) => {
    if (!activeSetHover) return;
    const target = (e.currentTarget as SVGElement).getBoundingClientRect();
    const containerRect = (
      (e.currentTarget as SVGElement).ownerSVGElement?.parentElement as HTMLElement
    )?.getBoundingClientRect();
    if (!containerRect) return;
    activeSetHover({
      name: safeName,
      chain,
      category,
      size: safeSize,
      color: fill,
      x: target.left - containerRect.left + target.width / 2,
      y: target.top - containerRect.top
    });
  };
  const onLeave = () => activeSetHover?.(null);

  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill, fillOpacity: 0.88, stroke: "#0a0a0a", strokeWidth: 1 }}
      />
      {showName && (
        <text
          x={x + 6}
          y={y + 15}
          fontSize={11}
          fontWeight={600}
          style={{
            fill: TEXT_FILL,
            stroke: TEXT_STROKE,
            strokeWidth: 3,
            paintOrder: "stroke",
            pointerEvents: "none"
          }}
        >
          {displayName}
        </text>
      )}
      {showValue && (
        <text
          x={x + 6}
          y={y + 31}
          fontSize={10}
          style={{
            fill: TEXT_FILL,
            stroke: TEXT_STROKE,
            strokeWidth: 3,
            paintOrder: "stroke",
            fillOpacity: 0.9,
            pointerEvents: "none"
          }}
        >
          {fmt(safeSize)}
        </text>
      )}
    </g>
  );
}

export function ChainAppTreemap({
  apps,
  topN = 200,
  chainLookup
}: {
  apps: FlatApp[];
  topN?: number;
  chainLookup: Array<{ slug: string; name: string }>;
}) {
  const [hover, setHover] = useState<Hovered | null>(null);
  activeSetHover = setHover; // refresh closure binding on every render

  const data = apps
    .filter((a) => a.revenue_30d > 0)
    .sort((a, b) => b.revenue_30d - a.revenue_30d)
    .slice(0, topN)
    .map((a) => ({
      name: a.name,
      size: a.revenue_30d,
      chain: a.chain,
      category: a.category,
      color: CHAIN_COLORS[a.chain] || "#71717a"
    }));

  if (data.length === 0) {
    return <p className="text-xs text-zinc-600 py-6 text-center">No app data.</p>;
  }

  // Legend — chains in the data, biggest contribution first.
  const chainTotals = new Map<string, number>();
  for (const d of data) chainTotals.set(d.chain, (chainTotals.get(d.chain) || 0) + d.size);
  const legendChains = [...chainTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => {
      const meta = chainLookup.find((c) => c.slug === slug);
      return { slug, name: meta?.name || slug, color: CHAIN_COLORS[slug] || "#71717a" };
    });

  return (
    <div>
      <div className="relative h-[520px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            stroke="#0a0a0a"
            content={<TmContent />}
            isAnimationActive={false}
          />
        </ResponsiveContainer>
        {hover && (
          <div
            className="pointer-events-none absolute z-20 rounded-md border border-zinc-700 bg-zinc-950/95 px-3 py-2 text-xs shadow-2xl"
            style={{
              left: Math.max(8, Math.min(hover.x - 130, 1100)),
              top: Math.max(8, hover.y - 78),
              width: 260
            }}
          >
            <div style={{ color: hover.color }} className="font-semibold leading-snug">
              {hover.name}
            </div>
            <div className="text-zinc-400 mt-0.5">
              {hover.chain} · {hover.category}
            </div>
            <div className="text-zinc-100 mt-1">
              <span className="text-zinc-500">30d revenue </span>
              <strong>{fmt(hover.size)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Chain color legend */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Chain color key</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1.5 text-[11px]">
          {legendChains.map((c) => (
            <span key={c.slug} className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: c.color }}
              />
              <span className="text-zinc-300 truncate">{c.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
