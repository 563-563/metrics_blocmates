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
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
          <XAxis
            dataKey="date"
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
            minTickGap={48}
          />
          <YAxis
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
            tickFormatter={(v: number) =>
              v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e3).toFixed(0)}K`
            }
          />
          <Tooltip
            contentStyle={{
              background: "rgb(var(--surface))",
              border: "1px solid rgb(var(--line))",
              fontSize: 12
            }}
            labelStyle={{ color: "rgb(var(--fg-muted))" }}
            itemStyle={{ color: "rgb(var(--fg))" }}
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
