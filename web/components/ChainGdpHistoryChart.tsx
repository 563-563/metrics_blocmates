"use client";

import {
  Area,
  ComposedChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { ChainHistoryPoint } from "@/lib/chains";

const GDP_COLOR = "#84cc16";
const REV_COLOR = "#f43f5e";

function fmtMoney(v: number): string {
  const abs = Math.abs(v);
  const sign = v < 0 ? "−" : "";
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const g = payload.find((p: any) => p.dataKey === "gdp");
  const r = payload.find((p: any) => p.dataKey === "rev");
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        padding: "6px 9px",
        fontSize: 12
      }}
    >
      <div style={{ color: "#888", marginBottom: 3 }}>{label}</div>
      {g && (
        <div style={{ color: GDP_COLOR }}>
          GDP <strong>{fmtMoney(Number(g.value))}</strong>
        </div>
      )}
      {r && r.value != null && (
        <div style={{ color: REV_COLOR }}>
          REV <strong>{fmtMoney(Number(r.value))}</strong>
        </div>
      )}
    </div>
  );
}

export function ChainGdpHistoryChart({ data }: { data: ChainHistoryPoint[] }) {
  const pts = (data || []).slice(-90);
  if (pts.length < 2) {
    return (
      <p className="text-xs text-zinc-600 py-8 text-center">
        Not enough history yet.
      </p>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={pts} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
          <defs>
            <linearGradient id="gdpFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GDP_COLOR} stopOpacity={0.35} />
              <stop offset="100%" stopColor={GDP_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={fmtMoney}
            label={{
              value: "Daily $ (USD)",
              angle: -90,
              position: "insideLeft",
              offset: 4,
              style: { textAnchor: "middle", fill: GDP_COLOR, fontSize: 11 }
            }}
          />
          <Tooltip content={<Tip />} />
          <Area
            type="monotone"
            dataKey="gdp"
            name="gdp"
            stroke={GDP_COLOR}
            strokeWidth={1.5}
            fill="url(#gdpFill)"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="rev"
            name="rev"
            stroke={REV_COLOR}
            strokeWidth={1}
            strokeDasharray="3 2"
            dot={false}
            isAnimationActive={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
