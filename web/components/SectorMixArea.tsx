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
import { categoryColor } from "@/lib/category-colors";
import type { SectorMixSeries } from "@/lib/chain-aggregates";

// Structural transformation — monthly category shares of a chain's GDP as a
// 100% stacked area. The development-economics chart (agriculture →
// industry → services), for blockspace.

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const rows = payload
    .filter((p: any) => Number(p.value) > 0.002)
    .sort((a: any, b: any) => Number(b.value) - Number(a.value));
  return (
    <div
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--line))",
        padding: "8px 11px",
        fontSize: 12,
        color: "rgb(var(--fg))",
        minWidth: 200
      }}
    >
      <div style={{ color: "rgb(var(--fg-muted))", marginBottom: 6 }}>{label}</div>
      {rows.map((p: any) => (
        <div
          key={p.dataKey}
          style={{ display: "flex", justifyContent: "space-between", gap: 12, lineHeight: 1.6 }}
        >
          <span style={{ color: p.color, fontWeight: 500 }}>{p.dataKey}</span>
          <span>{(Number(p.value) * 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

export function SectorMixArea({ mix }: { mix: SectorMixSeries }) {
  return (
    <div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mix.rows} margin={{ top: 8, right: 16, left: 4, bottom: 8 }} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="rgb(var(--fg-faint))"
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              minTickGap={48}
            />
            <YAxis
              stroke="rgb(var(--fg-faint))"
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              domain={[0, 1]}
            />
            <Tooltip content={<Tip />} />
            {mix.categories.map((cat) => (
              <Area
                key={cat}
                type="monotone"
                dataKey={cat}
                stackId="1"
                stroke={categoryColor(cat)}
                fill={categoryColor(cat)}
                fillOpacity={0.75}
                strokeWidth={0.4}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {mix.categories.map((cat) => (
          <span key={cat} className="flex items-center gap-1.5 text-[11px] text-fg-muted">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: categoryColor(cat) }} />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
