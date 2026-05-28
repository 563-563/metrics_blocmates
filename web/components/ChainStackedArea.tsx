"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { StackedDay } from "@/lib/chain-aggregates";

function fmt(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1e9) return `$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(abs / 1e6).toFixed(0)}M`;
  if (abs >= 1e3) return `$${(abs / 1e3).toFixed(0)}K`;
  return `$${abs.toFixed(0)}`;
}

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (Number(p.value) || 0), 0);
  const sorted = payload
    .filter((p: any) => Number(p.value) > 0)
    .sort((a: any, b: any) => Number(b.value) - Number(a.value))
    .slice(0, 8);
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        padding: "6px 10px",
        fontSize: 12,
        color: "#e4e4e7",
        maxWidth: 280
      }}
    >
      <div style={{ color: "#888", marginBottom: 4 }}>{label} · total {fmt(total)}</div>
      {sorted.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, lineHeight: 1.55 }}>
          {p.dataKey} <strong>{fmt(p.value)}</strong>{" "}
          <span style={{ color: "#888" }}>{((p.value / total) * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

// Daily GDP per chain stacked as an area chart, last 90 days. Chains are
// stacked bottom-up in descending order of their 30d aggregate so the biggest
// economies form the foundation.
export function ChainStackedArea({
  series,
  chainOrder
}: {
  series: StackedDay[];
  chainOrder: string[]; // slugs sorted by 30d aggregate, big-first
}) {
  if (!series || series.length < 2) {
    return <p className="text-xs text-zinc-600 py-6 text-center">No history yet.</p>;
  }
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            minTickGap={48}
          />
          <YAxis
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={fmt}
            label={{
              value: "Daily GDP (USD)",
              angle: -90,
              position: "insideLeft",
              offset: 4,
              style: { textAnchor: "middle", fill: "#a1a1aa", fontSize: 11 }
            }}
          />
          <Tooltip content={<Tip />} />
          {chainOrder.map((slug) => (
            <Area
              key={slug}
              type="monotone"
              dataKey={slug}
              stackId="1"
              stroke={CHAIN_COLORS[slug] || "#71717a"}
              fill={CHAIN_COLORS[slug] || "#71717a"}
              fillOpacity={0.62}
              strokeWidth={0.4}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
