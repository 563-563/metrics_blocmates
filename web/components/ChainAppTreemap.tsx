"use client";

import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { FlatApp } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

type TmDatum = { name: string; size: number; chain: string; category: string; color: string; attribution?: string };

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d || !d.chain) return null;
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        padding: "6px 10px",
        fontSize: 12,
        color: "#e4e4e7",
        maxWidth: 260
      }}
    >
      <div style={{ color: d.color, fontWeight: 600 }}>{d.name}</div>
      <div style={{ color: "#a1a1aa", marginTop: 2 }}>
        {d.chain} · {d.category}
        {d.attribution && <span style={{ color: "#22d3ee" }}> · attribution</span>}
      </div>
      <div style={{ marginTop: 4 }}>30d revenue <strong>{fmt(d.size)}</strong></div>
    </div>
  );
}

// Custom content renderer — labels inline when the cell is large enough to
// hold readable text. Smaller cells rely on the tooltip.
function TmContent(props: any) {
  const { x, y, width, height, name, color, size } = props;
  const showName = width > 70 && height > 26;
  const showValue = width > 90 && height > 42;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: color, fillOpacity: 0.85, stroke: "#0a0a0a", strokeWidth: 1 }}
      />
      {showName && (
        <text
          x={x + 6}
          y={y + 16}
          fill="#0a0a0a"
          fontSize={11}
          fontWeight={600}
          style={{ pointerEvents: "none" }}
        >
          {name.length > Math.floor(width / 6) ? `${name.slice(0, Math.floor(width / 6) - 1)}…` : name}
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
          {fmt(size)}
        </text>
      )}
    </g>
  );
}

// Every app on every chain in one frame. Cell area ∝ 30d revenue, color =
// the chain it's on. Reveals which chain hosts which dominant app and lets
// you see "Tether on Tron" the size of all of Solana at a glance.
export function ChainAppTreemap({
  apps,
  topN = 200
}: {
  apps: FlatApp[];
  topN?: number;
}) {
  // Top N to keep the canvas legible (200 fills the area; beyond that, cells
  // shrink to invisibility on small viewports).
  const sorted = apps
    .filter((a) => a.revenue_30d > 0)
    .sort((a, b) => b.revenue_30d - a.revenue_30d)
    .slice(0, topN)
    .map<TmDatum>((a) => ({
      name: a.name,
      size: a.revenue_30d,
      chain: a.chain,
      category: a.category,
      color: CHAIN_COLORS[a.chain] || "#71717a",
      attribution: a.attribution
    }));

  if (sorted.length === 0) {
    return <p className="text-xs text-zinc-600 py-6 text-center">No app data.</p>;
  }

  return (
    <div>
      <div className="h-[480px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={sorted}
            dataKey="size"
            stroke="#0a0a0a"
            content={<TmContent />}
            isAnimationActive={false}
          >
            <Tooltip content={<Tip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
