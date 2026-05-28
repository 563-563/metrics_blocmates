"use client";

import { ResponsiveContainer, Treemap } from "recharts";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { FlatApp } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

// Recharts invokes the custom content renderer for every node in the
// hierarchy — including the root, where name/color/size are undefined.
// All accessors below defensive-default so the root pass is a no-op
// rather than a crash.
function TmContent(props: any) {
  const { x, y, width, height, depth, name, size } = props;
  if (depth === 0 || width == null || height == null) return null;

  const safeName = typeof name === "string" ? name : "";
  const safeSize = typeof size === "number" ? size : 0;
  const fill = props.color || "#71717a";
  const chain = props.chain || "";
  const category = props.category || "";

  const showName = width > 70 && height > 26 && safeName.length > 0;
  const showValue = width > 90 && height > 42 && safeSize > 0;
  const maxChars = Math.max(4, Math.floor(width / 6));
  const displayName =
    safeName.length > maxChars ? `${safeName.slice(0, maxChars - 1)}…` : safeName;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill, fillOpacity: 0.85, stroke: "#0a0a0a", strokeWidth: 1 }}
      >
        <title>
          {safeName}
          {chain ? ` · ${chain}` : ""}
          {category ? ` · ${category}` : ""}
          {safeSize > 0 ? ` · ${fmt(safeSize)}` : ""}
        </title>
      </rect>
      {showName && (
        <text
          x={x + 6}
          y={y + 16}
          fill="#0a0a0a"
          fontSize={11}
          fontWeight={600}
          style={{ pointerEvents: "none" }}
        >
          {displayName}
        </text>
      )}
      {showValue && (
        <text
          x={x + 6}
          y={y + 32}
          fill="rgba(0,0,0,0.6)"
          fontSize={10}
          style={{ pointerEvents: "none" }}
        >
          {fmt(safeSize)}
        </text>
      )}
    </g>
  );
}

// Every app on every chain in one frame. Cell area ∝ 30d revenue, color =
// the chain it's on. Stablecoin-issuer virtual apps included.
export function ChainAppTreemap({
  apps,
  topN = 200
}: {
  apps: FlatApp[];
  topN?: number;
}) {
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

  return (
    <div className="h-[480px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          stroke="#0a0a0a"
          content={<TmContent />}
          isAnimationActive={false}
        />
      </ResponsiveContainer>
    </div>
  );
}
