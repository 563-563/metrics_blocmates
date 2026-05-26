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

export type AfBalancePoint = { date: string; balance_tokens: number };

export function AfBalanceChart({
  data,
  symbol = "tokens"
}: {
  data: AfBalancePoint[];
  symbol?: string;
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="afFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
          <XAxis
            dataKey="date"
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            minTickGap={48}
          />
          <YAxis
            stroke="#666"
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v: number) =>
              v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e3).toFixed(0)}K`
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
            formatter={(value: number) => [
              `${Math.round(value).toLocaleString()} ${symbol}`,
              "balance"
            ]}
          />
          <Area
            type="monotone"
            dataKey="balance_tokens"
            stroke="#10b981"
            strokeWidth={1.5}
            fill="url(#afFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
