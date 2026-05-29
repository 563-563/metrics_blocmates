"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainSummary } from "@/lib/chains";
import {
  CartesianGrid,
  ReferenceArea,
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

const Y_CAP = 0.8; // clamp Y so a single outlier doesn't crush the cluster

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
      <div style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>
        {d.name}
        {d.offscale && <span style={{ color: "#fbbf24" }}> ↑ off-scale</span>}
      </div>
      <div>GDP/TVL <strong>{(d.x * 100).toFixed(1)}%</strong> <span style={{ color: "#888" }}>· productivity</span></div>
      <div>REV/GDP <strong>{(d.yTrue * 100).toFixed(1)}%</strong> <span style={{ color: "#888" }}>· tax burden</span></div>
      <div style={{ color: "#a1a1aa", marginTop: 4 }}>mcap {fmt(d.z)} · TVL {fmt(d.tvl)} · GDP {fmt(d.gdp)}</div>
    </div>
  );
}

// Strategic positioning. X = capital productivity, Y = infrastructure tax
// burden (Y-clamped at Y_CAP — extreme outliers pinned to the top with a
// marker). Bubble size = mcap. Background quadrant tint as orientation aid.
export function ChainQuadrant({ chains }: { chains: ChainSummary[] }) {
  const data = chains
    .filter((c) => c.gdp_over_tvl_ann != null && c.rev_over_gdp_7d != null && (c.gdp_30d_usd || 0) > 0)
    .map((c) => {
      const yTrue = c.rev_over_gdp_7d!;
      const offscale = yTrue > Y_CAP;
      return {
        slug: c.slug,
        name: c.name,
        x: c.gdp_over_tvl_ann!,
        y: offscale ? Y_CAP : yTrue,
        yTrue,
        offscale,
        z: c.mcap_usd || c.tvl_usd || c.gdp_30d_usd || 1,
        tvl: c.tvl_usd,
        gdp: c.gdp_30d_usd,
        color: CHAIN_COLORS[c.slug] || "#71717a"
      };
    });

  if (data.length < 3) {
    return <p className="text-xs text-zinc-600 py-6 text-center">Need more data points.</p>;
  }

  const xMax = Math.max(...data.map((d) => d.x)) * 1.08;
  const zMax = Math.max(...data.map((d) => d.z));
  const offscaleNames = data.filter((d) => d.offscale).map((d) => `${d.name} ${(d.yTrue * 100).toFixed(0)}%`);

  return (
    <div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 28, left: 32, bottom: 36 }}>
            {/* Quadrant tints — orient the viewer at a glance */}
            <ReferenceArea x1={0} x2={0.3} y1={0.3} y2={Y_CAP} fill="#f43f5e" fillOpacity={0.05} />
            <ReferenceArea x1={0.3} x2={xMax} y1={0.3} y2={Y_CAP} fill="#f59e0b" fillOpacity={0.05} />
            <ReferenceArea x1={0} x2={0.3} y1={0} y2={0.3} fill="#52525b" fillOpacity={0.04} />
            <ReferenceArea x1={0.3} x2={xMax} y1={0} y2={0.3} fill="#10b981" fillOpacity={0.05} />

            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, xMax]}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              stroke="#666"
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              label={{
                value: "GDP / TVL (annualized) — capital productivity →",
                position: "insideBottom",
                offset: -16,
                style: { textAnchor: "middle", fill: "#d4d4d8", fontSize: 13 }
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, Y_CAP]}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              stroke="#666"
              tickFormatter={(v) => (v >= Y_CAP - 0.001 ? `≥${Math.round(Y_CAP * 100)}%` : `${(v * 100).toFixed(0)}%`)}
              label={{
                value: "REV / GDP — tax burden ↑",
                angle: -90,
                position: "insideLeft",
                offset: 8,
                style: { textAnchor: "middle", fill: "#d4d4d8", fontSize: 13 }
              }}
            />
            <ZAxis type="number" dataKey="z" range={[80, 1800]} domain={[0, zMax]} />
            <Tooltip content={<Tip />} cursor={{ strokeDasharray: "3 3", stroke: "#333" }} />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.slug} fill={d.color} fillOpacity={0.65} stroke={d.color} strokeWidth={1.4} />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                offset={10}
                style={{ fill: "#f4f4f5", fontSize: 13, fontWeight: 500, pointerEvents: "none" }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 text-xs text-zinc-400 leading-relaxed">
        Bubble area ∝ mcap. Quadrant tints:{" "}
        <span className="text-amber-300 font-medium">amber</span> = productive but heavily taxed ·{" "}
        <span className="text-emerald-300 font-medium">green</span> = productive &amp; app-friendly ·{" "}
        <span className="text-rose-300 font-medium">rose</span> = idle TVL extractive ·{" "}
        <span className="text-zinc-300 font-medium">grey</span> = idle &amp; untaxed.
        {offscaleNames.length > 0 && (
          <span className="block mt-1.5">
            <span className="text-amber-300 font-medium">↑ off-scale (Y clamped at {Math.round(Y_CAP * 100)}%):</span>{" "}
            {offscaleNames.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
