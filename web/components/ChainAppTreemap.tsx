"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { FlatApp } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

const TEXT_FILL = "rgb(var(--fg))";
const TEXT_STROKE = "rgba(0,0,0,0.6)";

type Hovered = {
  name: string;
  chain: string;
  category: string;
  size: number;
  color: string;
  x: number;
  y: number;
};

let activeSetHover: ((h: Hovered | null) => void) | null = null;

function TmContent(props: any) {
  const { x, y, width, height, depth, name, size } = props;
  if (depth === 0 || width == null || height == null) return null;

  const safeName = typeof name === "string" ? name : "";
  const safeSize = typeof size === "number" ? size : 0;
  const fill = props.color || "#71717a";
  const chain = props.chain || "";
  const category = props.category || "";

  // Looser thresholds + bigger fonts than before.
  const showName = width > 56 && height > 24 && safeName.length > 0;
  const showValue = width > 80 && height > 44 && safeSize > 0;
  const maxChars = Math.max(4, Math.floor(width / 8));
  const displayName =
    safeName.length > maxChars ? `${safeName.slice(0, maxChars - 1)}…` : safeName;

  const onEnter = (e: React.MouseEvent) => {
    if (!activeSetHover) return;
    const target = (e.currentTarget as SVGElement).getBoundingClientRect();
    const container = (
      (e.currentTarget as SVGElement).ownerSVGElement?.parentElement as HTMLElement
    )?.getBoundingClientRect();
    if (!container) return;
    activeSetHover({
      name: safeName,
      chain,
      category,
      size: safeSize,
      color: fill,
      x: target.left - container.left + target.width / 2,
      y: target.top - container.top
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
        style={{ fill, fillOpacity: 0.9, stroke: "rgb(var(--surface))", strokeWidth: 1 }}
      />
      {showName && (
        <text
          x={x + 7}
          y={y + 18}
          fontSize={13}
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
          x={x + 7}
          y={y + 36}
          fontSize={12}
          style={{
            fill: TEXT_FILL,
            stroke: TEXT_STROKE,
            strokeWidth: 3,
            paintOrder: "stroke",
            fillOpacity: 0.95,
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
  activeSetHover = setHover;

  // Filter state: which chains are currently visible. Default all on.
  const [hiddenChains, setHiddenChains] = useState<Set<string>>(new Set());
  function toggleChain(slug: string) {
    setHiddenChains((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }
  function showAll() {
    setHiddenChains(new Set());
  }

  // Build the filtered data set.
  const data = useMemo(() => {
    return apps
      .filter((a) => a.revenue_30d > 0 && !hiddenChains.has(a.chain))
      .sort((a, b) => b.revenue_30d - a.revenue_30d)
      .slice(0, topN)
      .map((a) => ({
        name: a.name,
        size: a.revenue_30d,
        chain: a.chain,
        category: a.category,
        color: CHAIN_COLORS[a.chain] || "#71717a"
      }));
  }, [apps, hiddenChains, topN]);

  // Always show ALL chains in the filter, sorted by their total share.
  const allChainTotals = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of apps) m.set(a.chain, (m.get(a.chain) || 0) + a.revenue_30d);
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([slug]) => {
        const meta = chainLookup.find((c) => c.slug === slug);
        return { slug, name: meta?.name || slug, color: CHAIN_COLORS[slug] || "#71717a" };
      });
  }, [apps, chainLookup]);

  return (
    <div>
      <div className="relative h-[520px] w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="size"
              stroke="rgb(var(--surface))"
              content={<TmContent />}
              isAnimationActive={false}
            />
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-fg-muted">
            All chains hidden — click one below to show again.
          </div>
        )}
        {hover && (
          <div
            className="pointer-events-none absolute z-20 rounded-md border border-line bg-canvas/95 px-3 py-2 text-sm shadow-2xl"
            style={{
              left: Math.max(8, Math.min(hover.x - 140, 1100)),
              top: Math.max(8, hover.y - 86),
              width: 280
            }}
          >
            <div style={{ color: hover.color }} className="font-semibold leading-snug text-[13px]">
              {hover.name}
            </div>
            <div className="text-fg-muted mt-0.5 text-xs">
              {hover.chain} · {hover.category}
            </div>
            <div className="text-fg mt-1.5">
              <span className="text-fg-muted text-xs">30d revenue </span>
              <strong className="text-base">{fmt(hover.size)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Interactive chain filter — click a chain to hide / show */}
      <div className="mt-4 pt-4 border-t border-line">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">
            Chains — click to toggle ({allChainTotals.length - hiddenChains.size} of {allChainTotals.length} shown)
          </p>
          {hiddenChains.size > 0 && (
            <button
              onClick={showAll}
              className="text-[11px] text-fg-muted hover:text-fg border border-line hover:border-zinc-500 rounded px-2 py-0.5 transition"
            >
              show all
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-1.5">
          {allChainTotals.map((c) => {
            const hidden = hiddenChains.has(c.slug);
            return (
              <button
                key={c.slug}
                onClick={() => toggleChain(c.slug)}
                className={`flex items-center gap-2 text-xs px-1.5 py-1 rounded transition text-left ${
                  hidden ? "opacity-40 hover:opacity-70" : "hover:bg-surface"
                }`}
                title={hidden ? "Show" : "Hide"}
              >
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: c.color }}
                />
                <span className={`truncate ${hidden ? "text-fg-muted line-through" : "text-fg"}`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
