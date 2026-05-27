"use client";

import { useState } from "react";
import {
  Bar,
  Line,
  Cell,
  ComposedChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export type NpPoint = {
  date: string;
  net_pressure_usd: number;
  net_pressure_tokens: number;
  price_usd?: number;
};

type View = "daily" | "rolling30" | "cumulative";

function fmtMoney(v: number): string {
  const abs = Math.abs(v);
  const sign = v < 0 ? "−" : "";
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

export function NetPressureChart({
  data,
  symbol
}: {
  data: NpPoint[];
  symbol: string;
}) {
  const [view, setView] = useState<View>("rolling30");

  // Derive rolling-30d sum and cumulative series.
  const enriched = data.map((d, i) => {
    let rolling = 0;
    for (let j = Math.max(0, i - 29); j <= i; j++) rolling += data[j].net_pressure_usd;
    return { ...d, rolling30: rolling };
  });
  let run = 0;
  for (const d of enriched as Array<NpPoint & { rolling30: number; cumulative?: number }>) {
    run += d.net_pressure_usd;
    d.cumulative = run;
  }

  const hasPrice = data.some((d) => d.price_usd != null);
  const valueKey = view === "daily" ? "net_pressure_usd" : view === "rolling30" ? "rolling30" : "cumulative";
  const lineColor = "#a78bfa"; // violet for the smoothed/cumulative line

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-1 mb-3 text-[10px] uppercase tracking-widest">
        {([
          ["daily", "Daily"],
          ["rolling30", "30d rolling"],
          ["cumulative", "Cumulative"]
        ] as Array<[View, string]>).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-2.5 py-1 rounded border transition ${
              view === v
                ? "text-zinc-100 border-zinc-600 bg-zinc-800"
                : "text-zinc-500 border-zinc-800 hover:text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={enriched} margin={{ top: 8, right: hasPrice ? 8 : 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 10, fill: "#888" }} minTickGap={32} />
            <YAxis
              yAxisId="np"
              stroke="#666"
              tick={{ fontSize: 10, fill: "#888" }}
              tickFormatter={fmtMoney}
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
            <ReferenceLine yAxisId="np" y={0} stroke="#3f3f46" />
            <Tooltip
              contentStyle={{ background: "#0a0a0a", border: "1px solid #1f1f1f", fontSize: 12 }}
              labelStyle={{ color: "#888" }}
              itemStyle={{ color: "#e4e4e7" }}
              formatter={(value: number, name: string) => {
                if (name === "price") return [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "price"];
                return [`${value >= 0 ? "+" : ""}${fmtMoney(value)}`, view === "daily" ? "Net Pressure" : view === "rolling30" ? "NP (30d sum)" : "NP (cumulative)"];
              }}
            />

            {/* Net Pressure: bars for daily, line for rolling/cumulative */}
            {view === "daily" ? (
              <Bar yAxisId="np" dataKey="net_pressure_usd">
                {enriched.map((d, i) => (
                  <Cell key={i} fill={d.net_pressure_usd >= 0 ? "#f43f5e" : "#10b981"} />
                ))}
              </Bar>
            ) : (
              <Line
                yAxisId="np"
                type="monotone"
                dataKey={valueKey}
                stroke={lineColor}
                strokeWidth={1.75}
                dot={false}
              />
            )}

            {/* Price overlay on right axis */}
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
    </div>
  );
}
