"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainHhi } from "@/lib/chain-aggregates";
import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Economic concentration — Herfindahl-Hirschman index of each chain's GDP
// by app, against the chain's size. Antitrust thresholds reused verbatim:
// <1,500 unconcentrated · 1,500–2,500 moderate · >2,500 highly concentrated.
// Diversified industrial economies sit low; single-commodity economies top.

function fmtUsd(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--line))",
        padding: "6px 10px",
        fontSize: 12,
        color: "rgb(var(--fg))",
        maxWidth: 260
      }}
    >
      <div style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>{d.name}</div>
      <div>HHI <strong>{d.hhi.toLocaleString()}</strong></div>
      <div>GDP 30d <strong>{fmtUsd(d.gdp30)}</strong></div>
      <div style={{ color: "rgb(var(--fg-muted))", marginTop: 4 }}>
        top app: {d.topApp} ({d.topSharePct.toFixed(0)}% of GDP)
      </div>
    </div>
  );
}

export function ChainConcentration({
  rows,
  chainNames
}: {
  rows: ChainHhi[];
  chainNames: Record<string, string>;
}) {
  const data = rows.map((r) => ({
    ...r,
    name: chainNames[r.slug] ?? r.slug,
    color: CHAIN_COLORS[r.slug] || "#71717a"
  }));
  if (data.length < 3) {
    return <p className="text-xs text-fg-muted py-6 text-center">Need more data points.</p>;
  }
  const xMin = Math.min(...data.map((d) => d.gdp30)) * 0.7;
  const xMax = Math.max(...data.map((d) => d.gdp30)) * 1.4;

  return (
    <div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 36, left: 32, bottom: 36 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
            <XAxis
              type="number"
              dataKey="gdp30"
              scale="log"
              domain={[xMin, xMax]}
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={fmtUsd}
              label={{
                value: "GDP · 30d (log) — economy size →",
                position: "insideBottom",
                offset: -16,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <YAxis
              type="number"
              dataKey="hhi"
              domain={[0, 10000]}
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={(v) => v.toLocaleString()}
              label={{
                value: "HHI — concentration ↑",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <ReferenceLine
              y={1500}
              stroke="rgb(var(--fg-faint))"
              strokeDasharray="4 4"
              label={{ value: "1,500 — moderate", position: "insideTopRight", fontSize: 11, fill: "rgb(var(--fg-muted))" }}
            />
            <ReferenceLine
              y={2500}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: "2,500 — highly concentrated", position: "insideTopRight", fontSize: 11, fill: "#f59e0b" }}
            />
            <Tooltip content={<Tip />} cursor={{ strokeDasharray: "3 3", stroke: "rgb(var(--line))" }} />
            <Scatter data={data} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.slug} fill={d.color} fillOpacity={0.75} stroke={d.color} strokeWidth={1.2} />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                offset={8}
                stroke="none"
                style={{ fill: "rgb(var(--fg))", fontSize: 12, fontWeight: 500, pointerEvents: "none" }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-fg-faint mt-2 leading-relaxed">
        HHI = Σ(app share of GDP)² × 10,000 over each chain&apos;s tracked top-25 apps — the long
        tail is treated as dust, which biases HHI <em>down</em>: high readings are trustworthy,
        low readings are lower bounds. A chain at 10,000 is a one-company town.
      </p>
    </div>
  );
}
