"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainSummary } from "@/lib/chains";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
  LabelList
} from "recharts";

function fmt(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1e9) return `$${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `$${(abs / 1e6).toFixed(0)}M`;
  if (abs >= 1e3) return `$${(abs / 1e3).toFixed(0)}K`;
  return `$${abs.toFixed(0)}`;
}

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        padding: "6px 10px",
        fontSize: 12,
        color: "#e4e4e7"
      }}
    >
      <div style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>{d.name}</div>
      <div>GDP/TVL <strong>{(d.x * 100).toFixed(1)}%</strong> <span style={{ color: "#888" }}>· productivity</span></div>
      <div>REV/GDP <strong>{(d.y * 100).toFixed(1)}%</strong> <span style={{ color: "#888" }}>· tax burden</span></div>
      <div style={{ color: "#a1a1aa", marginTop: 4 }}>mcap {fmt(d.z)} · TVL {fmt(d.tvl)} · GDP {fmt(d.gdp)}</div>
    </div>
  );
}

// Strategic positioning. X = capital productivity, Y = infrastructure tax
// burden, bubble size = mcap. Reveals patterns hidden in the flat table.
export function ChainQuadrant({ chains }: { chains: ChainSummary[] }) {
  const data = chains
    .filter((c) => c.gdp_over_tvl_ann != null && c.rev_over_gdp_7d != null)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      x: c.gdp_over_tvl_ann!,
      y: c.rev_over_gdp_7d!,
      z: c.mcap_usd || c.tvl_usd || 1, // bubble size — fall back to TVL when no native token
      tvl: c.tvl_usd,
      gdp: c.gdp_30d_usd,
      color: CHAIN_COLORS[c.slug] || "#71717a"
    }));

  if (data.length < 3) {
    return <p className="text-xs text-zinc-600 py-6 text-center">Need more data points.</p>;
  }

  const xMax = Math.max(...data.map((d) => d.x)) * 1.1;
  const yMax = Math.max(...data.map((d) => d.y)) * 1.1;
  const zMax = Math.max(...data.map((d) => d.z));

  return (
    <div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 28, left: 28, bottom: 36 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, xMax]}
              tick={{ fontSize: 10, fill: "#888" }}
              stroke="#666"
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              label={{
                value: "GDP / TVL (annualized) — capital productivity →",
                position: "insideBottom",
                offset: -16,
                style: { textAnchor: "middle", fill: "#a1a1aa", fontSize: 11 }
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, yMax]}
              tick={{ fontSize: 10, fill: "#888" }}
              stroke="#666"
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              label={{
                value: "REV / GDP — tax burden ↑",
                angle: -90,
                position: "insideLeft",
                offset: 8,
                style: { textAnchor: "middle", fill: "#a1a1aa", fontSize: 11 }
              }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 1400]} domain={[0, zMax]} />
            <Tooltip content={<Tip />} cursor={{ strokeDasharray: "3 3", stroke: "#333" }} />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.slug} fill={d.color} fillOpacity={0.6} stroke={d.color} strokeWidth={1.4} />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                style={{ fill: "#a1a1aa", fontSize: 10, pointerEvents: "none" }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
        Bubble area ∝ mcap. <span className="text-zinc-400">Top-right</span> = productive at scale but heavily extracted;
        <span className="text-zinc-400"> top-left</span> = idle TVL with extractive REV;{" "}
        <span className="text-zinc-400">bottom-right</span> = productive and app-friendly;{" "}
        <span className="text-zinc-400">bottom-left</span> = idle and untaxed.
      </p>
    </div>
  );
}
