"use client";

import {
  Line,
  ComposedChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export type HmHistoryPoint = { date: string; hm: number | null; price_usd?: number };

// Band zones (match CLAUDE.md): <10 exceptional, 10-20 strong, 20-35 fair,
// 35-50 expensive, >50 speculative. Shaded faintly behind the line.
const BANDS = [
  { y1: 0, y2: 10, fill: "#10b981" },
  { y1: 10, y2: 20, fill: "#22c55e" },
  { y1: 20, y2: 35, fill: "#94a3b8" },
  { y1: 35, y2: 50, fill: "#f59e0b" },
  { y1: 50, y2: 9999, fill: "#f43f5e" }
];

export function HmHistoryChart({ data }: { data: HmHistoryPoint[] }) {
  const pts = (data || []).filter((d) => d.hm != null);
  if (pts.length < 2) {
    return <p className="text-xs text-zinc-600 py-8 text-center">Not enough history yet.</p>;
  }
  const maxHm = Math.max(...pts.map((d) => d.hm as number));
  const yMax = Math.min(Math.ceil((maxHm * 1.1) / 10) * 10, 150);
  const hasPrice = pts.some((d) => d.price_usd != null);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={pts} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          {BANDS.map((b, i) => (
            <ReferenceArea
              key={i}
              yAxisId="hm"
              y1={b.y1}
              y2={Math.min(b.y2, yMax)}
              fill={b.fill}
              fillOpacity={0.06}
              stroke="none"
              ifOverflow="hidden"
            />
          ))}
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
          <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10, fill: "#888" }} minTickGap={48} />
          <YAxis
            yAxisId="hm"
            stroke="#666"
            domain={[0, yMax]}
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v: number) => `${v}×`}
          />
          {hasPrice && (
            <YAxis
              yAxisId="price"
              orientation="right"
              stroke="#3f6212"
              tick={{ fontSize: 10, fill: "#84cc16" }}
              tickFormatter={(v: number) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v.toFixed(v < 1 ? 3 : 2)}`}
            />
          )}
          <Tooltip
            contentStyle={{ background: "#0a0a0a", border: "1px solid #1f1f1f", fontSize: 12 }}
            labelStyle={{ color: "#888" }}
            itemStyle={{ color: "#e4e4e7" }}
            formatter={(value: number, name: string) =>
              name === "price"
                ? [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "price"]
                : [`${Number(value).toFixed(1)}×`, "HM"]
            }
          />
          <Line yAxisId="hm" type="monotone" dataKey="hm" stroke="#e4e4e7" strokeWidth={1.5} dot={false} />
          {hasPrice && (
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price_usd"
              name="price"
              stroke="#84cc16"
              strokeWidth={1}
              strokeDasharray="3 2"
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
