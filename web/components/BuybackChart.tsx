"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export type BuybackPoint = { date: string; usd: number; tokens: number };

export function BuybackChart({ data }: { data: BuybackPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
          <XAxis
            dataKey="date"
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            minTickGap={32}
          />
          <YAxis
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v: number) =>
              v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${(v / 1e3).toFixed(0)}K`
            }
          />
          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #1f1f1f",
              fontSize: 12
            }}
            labelStyle={{ color: "#888" }}
            itemStyle={{ color: "#e4e4e7" }}
            formatter={(value: number, name: string) =>
              name === "usd"
                ? [`$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, "USD"]
                : [`${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} tokens`, "tokens"]
            }
          />
          <Bar dataKey="usd" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
