"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { CHAIN_COLORS, MULTI_CHAIN_COLOR } from "@/lib/chain-colors";
import type { FlatApp } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

// Plain black text on every cell, no stroke. Pure black both modes.
const CELL_TEXT_FILL = "#000000";

type Breakdown = Array<{ slug: string; chain: string; value: number }>;

type Hovered = {
  name: string;
  chain: string;
  category: string;
  size: number;
  color: string;
  breakdown: Breakdown | null;
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
  const breakdown: Breakdown | null = props.breakdown || null;

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
      breakdown,
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
          fill={CELL_TEXT_FILL}
          stroke="none"
          style={{ pointerEvents: "none" }}
        >
          {displayName}
        </text>
      )}
      {showValue && (
        <text
          x={x + 7}
          y={y + 36}
          fontSize={12}
          fill={CELL_TEXT_FILL}
          stroke="none"
          style={{ pointerEvents: "none" }}
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

  // Cross-chain merge: one cell per app NAME, summed across visible chains.
  const [merged, setMerged] = useState(false);

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
  function hideAll() {
    setHiddenChains(new Set(apps.map((a) => a.chain)));
  }

  const chainName = useMemo(() => {
    const m = new Map(chainLookup.map((c) => [c.slug, c.name]));
    return (slug: string) => m.get(slug) || slug;
  }, [chainLookup]);

  // Build the data set: filter hidden chains, optionally merge same-named
  // apps across chains, THEN rank and cut to topN (merging changes ranking).
  const data = useMemo(() => {
    const visible = apps.filter((a) => a.revenue_30d > 0 && !hiddenChains.has(a.chain));
    let cells: Array<{
      name: string;
      size: number;
      chain: string;
      category: string;
      color: string;
      breakdown: Breakdown | null;
    }>;
    if (!merged) {
      cells = visible.map((a) => ({
        name: a.name,
        size: a.revenue_30d,
        chain: chainName(a.chain),
        category: a.category,
        color: CHAIN_COLORS[a.chain] || "#71717a",
        breakdown: null
      }));
    } else {
      const groups = new Map<string, FlatApp[]>();
      for (const a of visible) {
        const g = groups.get(a.name);
        if (g) g.push(a);
        else groups.set(a.name, [a]);
      }
      cells = [...groups.values()].map((g) => {
        g.sort((a, b) => b.revenue_30d - a.revenue_30d);
        const size = g.reduce((s, a) => s + a.revenue_30d, 0);
        if (g.length === 1) {
          const a = g[0];
          return {
            name: a.name,
            size,
            chain: chainName(a.chain),
            category: a.category,
            color: CHAIN_COLORS[a.chain] || "#71717a",
            breakdown: null
          };
        }
        return {
          name: g[0].name,
          size,
          chain: `${g.length} chains`,
          category: g[0].category, // largest deployment's category
          color: MULTI_CHAIN_COLOR,
          breakdown: g.map((a) => ({ slug: a.chain, chain: chainName(a.chain), value: a.revenue_30d }))
        };
      });
    }
    return cells.sort((a, b) => b.size - a.size).slice(0, topN);
  }, [apps, hiddenChains, topN, merged, chainName]);

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
      {/* Cross-chain merge toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <span className="text-[11px] text-fg-muted">
          {merged ? (
            <>
              <span
                className="inline-block w-3 h-3 rounded-sm align-[-2px] mr-1.5"
                style={{ background: MULTI_CHAIN_COLOR }}
              />
              grey cell = one app summed across its chains — hover for the per-chain split
            </>
          ) : (
            "Cell color = the chain each deployment lives on"
          )}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">
            Cross-chain apps
          </span>
          <span className="inline-flex border border-line rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setMerged(false)}
              className={`px-2 py-0.5 text-[11px] transition ${
                merged ? "text-fg-muted hover:text-fg" : "bg-surface-elev text-fg"
              }`}
            >
              per-chain
            </button>
            <button
              type="button"
              onClick={() => setMerged(true)}
              className={`px-2 py-0.5 text-[11px] transition border-l border-line ${
                merged ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              merged
            </button>
          </span>
        </span>
      </div>

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
            {hover.breakdown && (
              <div className="mt-1.5 pt-1.5 border-t border-line text-xs">
                {hover.breakdown.slice(0, 6).map((b) => (
                  <div key={b.slug} className="flex justify-between gap-3 leading-relaxed">
                    <span style={{ color: CHAIN_COLORS[b.slug] || "rgb(var(--fg-muted))" }}>
                      {b.chain}
                    </span>
                    <span className="text-fg tabular-nums">
                      {fmt(b.value)}{" "}
                      <span className="text-fg-muted">
                        {((b.value / hover.size) * 100).toFixed(0)}%
                      </span>
                    </span>
                  </div>
                ))}
                {hover.breakdown.length > 6 && (
                  <div className="text-fg-muted mt-0.5">
                    +{hover.breakdown.length - 6} more chains
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive chain filter — click a chain to hide / show */}
      <div className="mt-4 pt-4 border-t border-line">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">
            Chains — click to toggle ({allChainTotals.length - hiddenChains.size} of {allChainTotals.length} shown)
            {merged && <span className="normal-case tracking-normal"> · hidden chains drop out of merged totals</span>}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={showAll}
              disabled={hiddenChains.size === 0}
              className="text-[11px] text-fg-muted hover:text-fg border border-line hover:border-fg-muted rounded px-2 py-0.5 transition disabled:opacity-40 disabled:hover:text-fg-muted disabled:hover:border-line"
            >
              show all
            </button>
            <button
              onClick={hideAll}
              disabled={hiddenChains.size >= allChainTotals.length}
              className="text-[11px] text-fg-muted hover:text-fg border border-line hover:border-fg-muted rounded px-2 py-0.5 transition disabled:opacity-40 disabled:hover:text-fg-muted disabled:hover:border-line"
            >
              hide all
            </button>
          </div>
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
