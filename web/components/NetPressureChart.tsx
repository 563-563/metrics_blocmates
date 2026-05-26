"use client";

import {
  Bar,
  BarChart,
  Cell,
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
};

export function NetPressureChart({
  data,
  symbol
}: {
  data: NpPoint[];
  symbol: string;
}) {
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
            tickFormatter={(v: number) => {
              const abs = Math.abs(v);
              const sign = v < 0 ? "−" : "";
              if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
              if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
              return `${sign}$${abs.toFixed(0)}`;
            }}
          />
          <ReferenceLine y={0} stroke="#3f3f46" />
          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #1f1f1f",
              fontSize: 12
            }}
            labelStyle={{ color: "#888" }}
            formatter={(value: number, _name: string, payload) => {
              const tokens = (payload as { payload: NpPoint }).payload.net_pressure_tokens;
              return [
                `${value >= 0 ? "+" : ""}$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}  ·  ${tokens >= 0 ? "+" : ""}${Math.round(tokens).toLocaleString()} ${symbol}`,
                "Net Pressure"
              ];
            }}
          />
          <Bar dataKey="net_pressure_usd">
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.net_pressure_usd >= 0 ? "#f43f5e" : "#10b981"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
