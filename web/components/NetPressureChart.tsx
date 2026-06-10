"use client";

import { useRef, useState } from "react";
import { CopyPngButton } from "./CopyPngButton";
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

const PRICE_COLOR = "#84cc16";
const LINE_COLOR = "#a78bfa";
const SELLER = "#f43f5e";
const BUYER = "#10b981";

function fmtMoney(v: number): string {
  const abs = Math.abs(v);
  const sign = v < 0 ? "−" : "";
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

const VIEW_LABEL: Record<View, string> = {
  daily: "Net Pressure (daily)",
  rolling30: "Net Pressure (30d sum)",
  cumulative: "Net Pressure (cumulative)"
};

function makeTip(view: View, symbol: string) {
  const npKey = view === "daily" ? "net_pressure_usd" : view === "rolling30" ? "rolling30" : "cumulative";
  return function Tip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    const np = payload.find((p: any) => p.dataKey === npKey);
    const price = payload.find((p: any) => p.dataKey === "price_usd");
    const npVal = np != null ? Number(np.value) : null;
    const npColor = npVal == null ? "rgb(var(--fg))" : npVal > 0 ? SELLER : BUYER;
    return (
      <div style={{ background: "rgb(var(--surface))", border: "1px solid rgb(var(--line))", padding: "6px 9px", fontSize: 12 }}>
        <div style={{ color: "rgb(var(--fg-muted))", marginBottom: 3 }}>{label}</div>
        {npVal != null && (
          <div style={{ color: npColor }}>
            {VIEW_LABEL[view]} <strong>{npVal >= 0 ? "+" : ""}{fmtMoney(npVal)}</strong>
            <span style={{ color: "#71717a" }}> · {npVal > 0 ? "net seller" : npVal < 0 ? "net buyer" : "flat"}</span>
          </div>
        )}
        {price && (
          <div style={{ color: PRICE_COLOR }}>
            Price ${Number(price.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        )}
      </div>
    );
  };
}

export function NetPressureChart({ data, symbol }: { data: NpPoint[]; symbol: string }) {
  const [view, setView] = useState<View>("rolling30");
  const containerRef = useRef<HTMLDivElement>(null);

  const enriched = data.map((d, i) => {
    let rolling = 0;
    for (let j = Math.max(0, i - 29); j <= i; j++) rolling += data[j].net_pressure_usd;
    return { ...d, rolling30: rolling };
  }) as Array<NpPoint & { rolling30: number; cumulative?: number }>;
  let run = 0;
  for (const d of enriched) {
    run += d.net_pressure_usd;
    d.cumulative = run;
  }

  const hasPrice = data.some((d) => d.price_usd != null);
  const valueKey = view === "daily" ? "net_pressure_usd" : view === "rolling30" ? "rolling30" : "cumulative";
  const Tip = makeTip(view, symbol);

  return (
    <div>
      <div className="flex gap-1 mb-3 text-[10px] uppercase tracking-widest items-center">
        {([
          ["daily", "Daily"],
          ["rolling30", "30d rolling"],
          ["cumulative", "Cumulative"]
        ] as Array<[View, string]>).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-2.5 py-1 rounded border transition ${
              view === v ? "text-fg border-fg-muted bg-surface-elev" : "text-fg-muted border-line hover:text-fg-muted"
            }`}
          >
            {l}
          </button>
        ))}
        <CopyPngButton
          containerRef={containerRef}
          title={`${symbol} Net Pressure`}
          subtitle={VIEW_LABEL[view]}
          className="ml-auto"
        />
      </div>

      <div ref={containerRef} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={enriched} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
            <XAxis dataKey="date" stroke="rgb(var(--fg-faint))" tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }} minTickGap={32} />
            <YAxis
              yAxisId="np"
              stroke="rgb(var(--fg-faint))"
              tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
              tickFormatter={fmtMoney}
              label={{ value: "Net Pressure (USD)", angle: -90, position: "insideLeft", offset: 4, style: { textAnchor: "middle", fill: LINE_COLOR, fontSize: 11 } }}
            />
            {hasPrice && (
              <YAxis
                yAxisId="price"
                orientation="right"
                stroke="#3f6212"
                tick={{ fontSize: 10, fill: PRICE_COLOR }}
                tickFormatter={(v: number) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v.toFixed(v < 1 ? 3 : 2)}`}
                label={{ value: "Price (USD)", angle: 90, position: "insideRight", offset: 4, style: { textAnchor: "middle", fill: PRICE_COLOR, fontSize: 11 } }}
              />
            )}
            <ReferenceLine yAxisId="np" y={0} stroke="rgb(var(--line))" />
            <Tooltip content={<Tip />} />

            {view === "daily" ? (
              <Bar yAxisId="np" dataKey="net_pressure_usd">
                {enriched.map((d, i) => (
                  <Cell key={i} fill={d.net_pressure_usd >= 0 ? SELLER : BUYER} />
                ))}
              </Bar>
            ) : (
              <Line yAxisId="np" type="monotone" dataKey={valueKey} stroke={LINE_COLOR} strokeWidth={1.75} dot={false} />
            )}

            {hasPrice && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price_usd"
                name="price"
                stroke={PRICE_COLOR}
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
