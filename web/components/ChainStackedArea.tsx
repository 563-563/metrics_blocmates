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
  if (abs >= 1e6) return `$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(abs / 1e3).toFixed(0)}K`;
  return `$${abs.toFixed(0)}`;
}

// slug → display name. Recharts payload only knows dataKey (slug).
function makeTip(chainNames: Record<string, string>) {
  return function Tip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    const total = payload.reduce((s: number, p: any) => s + (Number(p.value) || 0), 0);
    const sorted = payload
      .filter((p: any) => Number(p.value) > 0)
      .sort((a: any, b: any) => Number(b.value) - Number(a.value))
      .slice(0, 8);
    return (
      <div
        style={{
          background: "rgb(var(--surface))",
          border: "1px solid rgb(var(--line))",
          padding: "8px 11px",
          fontSize: 13,
          color: "rgb(var(--fg))",
          minWidth: 220,
          maxWidth: 300
        }}
      >
        <div style={{ color: "rgb(var(--fg-muted))", marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span>{label}</span>
          <span style={{ color: "rgb(var(--fg))" }}>total <strong>{fmt(total)}</strong></span>
        </div>
        {sorted.map((p: any) => (
          <div
            key={p.dataKey}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              lineHeight: 1.6
            }}
          >
            <span style={{ color: p.color, fontWeight: 500 }}>
              {chainNames[p.dataKey] ?? p.dataKey}
            </span>
            <span style={{ color: "rgb(var(--fg))" }}>
              <strong>{fmt(p.value)}</strong>{" "}
              <span style={{ color: "#71717a", fontSize: 11 }}>
                {((p.value / total) * 100).toFixed(0)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };
}

export function ChainStackedArea({
  series,
  chainOrder,
  chainNames
}: {
  series: StackedDay[];
  chainOrder: string[];
  chainNames: Record<string, string>;
}) {
  if (!series || series.length < 2) {
    return <p className="text-xs text-zinc-600 py-6 text-center">No history yet.</p>;
  }
  const Tip = makeTip(chainNames);
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 16, left: 20, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
            minTickGap={48}
          />
          <YAxis
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
            tickFormatter={fmt}
            label={{
              value: "Daily GDP (USD)",
              angle: -90,
              position: "insideLeft",
              offset: 6,
              style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
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
              fillOpacity={0.7}
              strokeWidth={0.4}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
