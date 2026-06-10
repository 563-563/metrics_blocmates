"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainSummary } from "@/lib/chains";
import type { QuadrantFrame } from "@/lib/chain-aggregates";
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
const X_CAP = 1.5; // clamp X — 2021-era fee spikes would squash today's cluster
const PLAY_MS = 150; // frame advance interval during playback

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
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--line))",
        padding: "6px 10px",
        fontSize: 12,
        color: "rgb(var(--fg))"
      }}
    >
      <div style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>
        {d.name}
        {(d.offscaleX || d.offscaleY) && (
          <span style={{ color: "rgb(var(--negative))" }}> off-scale</span>
        )}
      </div>
      <div>GDP/TVL <strong>{(d.xTrue * 100).toFixed(1)}%</strong> <span style={{ color: "rgb(var(--fg-muted))" }}>· productivity (30d ann.)</span></div>
      <div>REV/GDP <strong>{(d.yTrue * 100).toFixed(1)}%</strong> <span style={{ color: "rgb(var(--fg-muted))" }}>· tax burden (7d)</span></div>
      <div style={{ color: "rgb(var(--fg-muted))", marginTop: 4 }}>
        GDP 30d {fmt(d.gdp)} · TVL {fmt(d.tvl)} · mcap today {fmt(d.z)}
      </div>
    </div>
  );
}

// Strategic positioning over time. X = capital productivity (trailing-30d GDP
// annualized / TVL), Y = infrastructure tax burden (7d REV / 7d GDP), both
// clamped with off-scale markers. Bubble size = TODAY's mcap, held constant
// across frames so only position tells the historical story. The slider
// scrubs weekly frames; play animates them.
export function ChainQuadrant({
  chains,
  frames
}: {
  chains: ChainSummary[];
  frames: QuadrantFrame[];
}) {
  const [idx, setIdx] = useState(Math.max(0, frames.length - 1));
  const [playing, setPlaying] = useState(false);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      if (idxRef.current >= frames.length - 1) {
        setPlaying(false);
      } else {
        setIdx(idxRef.current + 1);
      }
    }, PLAY_MS);
    return () => clearInterval(t);
  }, [playing, frames.length]);

  const meta = useMemo(() => {
    const m = new Map<string, { name: string; color: string; z: number }>();
    for (const c of chains) {
      m.set(c.slug, {
        name: c.name,
        color: CHAIN_COLORS[c.slug] || "#71717a",
        z: c.mcap_usd || c.tvl_usd || c.gdp_30d_usd || 1
      });
    }
    return m;
  }, [chains]);

  // Stable axes across the whole timeline so dots move within a fixed space.
  const xMax = useMemo(() => {
    let m = 0;
    for (const f of frames) for (const p of f.points) m = Math.max(m, p.x);
    return Math.min(m, X_CAP) * 1.08 || 0.5;
  }, [frames]);
  const zMax = useMemo(
    () => Math.max(1, ...chains.map((c) => c.mcap_usd || c.tvl_usd || c.gdp_30d_usd || 1)),
    [chains]
  );

  const frame = frames[idx];
  const data = useMemo(() => {
    if (!frame) return [];
    return frame.points
      .filter((p) => meta.has(p.slug))
      .map((p) => {
        const m = meta.get(p.slug)!;
        const offscaleX = p.x > X_CAP;
        const offscaleY = p.y > Y_CAP;
        return {
          slug: p.slug,
          name: m.name,
          x: offscaleX ? X_CAP : p.x,
          xTrue: p.x,
          y: offscaleY ? Y_CAP : p.y,
          yTrue: p.y,
          offscaleX,
          offscaleY,
          z: m.z,
          tvl: p.tvl,
          gdp: p.gdp30,
          color: m.color
        };
      });
  }, [frame, meta]);

  if (frames.length === 0 || !frame) {
    return <p className="text-xs text-zinc-600 py-6 text-center">Need more data points.</p>;
  }

  const isLatest = idx === frames.length - 1;
  const offscaleNames = data
    .filter((d) => d.offscaleX || d.offscaleY)
    .map((d) => `${d.name} ${(d.yTrue * 100).toFixed(0)}%`);

  return (
    <div>
      {/* Time scrubber */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => {
            if (!playing && idx >= frames.length - 1) setIdx(0);
            setPlaying(!playing);
          }}
          className="text-[11px] uppercase tracking-widest border border-line rounded px-2.5 py-1 text-fg-muted hover:text-fg hover:border-accent transition w-16"
        >
          {playing ? "pause" : "play"}
        </button>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          step={1}
          value={idx}
          onChange={(e) => {
            setPlaying(false);
            setIdx(Number(e.target.value));
          }}
          aria-label="Quadrant date"
          className="flex-1 min-w-40 h-1.5 cursor-pointer"
          style={{ accentColor: "rgb(var(--accent))" }}
        />
        <span className="font-mono tabular-nums text-sm text-fg w-28 text-right">
          {frame.date}
          {isLatest && <span className="block text-[10px] text-fg-muted text-right">latest</span>}
        </span>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 28, left: 32, bottom: 36 }}>
            {/* Quadrant tints — orient the viewer at a glance */}
            <ReferenceArea x1={0} x2={0.3} y1={0.3} y2={Y_CAP} fill="#f43f5e" fillOpacity={0.05} />
            <ReferenceArea x1={0.3} x2={xMax} y1={0.3} y2={Y_CAP} fill="#f59e0b" fillOpacity={0.05} />
            <ReferenceArea x1={0} x2={0.3} y1={0} y2={0.3} fill="rgb(var(--fg-faint))" fillOpacity={0.04} />
            <ReferenceArea x1={0.3} x2={xMax} y1={0} y2={0.3} fill="#10b981" fillOpacity={0.05} />

            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, xMax]}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              label={{
                value: "GDP / TVL (30d, annualized) — capital productivity →",
                position: "insideBottom",
                offset: -16,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, Y_CAP]}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={(v) => (v >= Y_CAP - 0.001 ? `≥${Math.round(Y_CAP * 100)}%` : `${(v * 100).toFixed(0)}%`)}
              label={{
                value: "REV / GDP (7d) — tax burden ↑",
                angle: -90,
                position: "insideLeft",
                offset: 8,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <ZAxis type="number" dataKey="z" range={[80, 1800]} domain={[0, zMax]} />
            <Tooltip content={<Tip />} cursor={{ strokeDasharray: "3 3", stroke: "rgb(var(--line))" }} />
            <Scatter data={data} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.slug} fill={d.color} fillOpacity={0.65} stroke={d.color} strokeWidth={1.4} />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                offset={10}
                stroke="none"
                style={{ fill: "rgb(var(--fg))", fontSize: 13, fontWeight: 500, pointerEvents: "none" }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 text-xs text-zinc-400 leading-relaxed">
        Bubble area ∝ <strong>today&apos;s</strong> mcap (held constant while scrubbing — position is
        the story). Metrics at the selected date: X = trailing-30d GDP annualized ÷ TVL, Y = 7d REV ÷
        7d GDP. Quadrant tints:{" "}
        <span className="text-amber-300 font-medium">amber</span> = productive but heavily taxed ·{" "}
        <span className="text-emerald-300 font-medium">green</span> = productive &amp; app-friendly ·{" "}
        <span className="text-rose-300 font-medium">rose</span> = idle TVL extractive ·{" "}
        <span className="text-zinc-300 font-medium">grey</span> = idle &amp; untaxed. Chains enter the
        chart once they have 30d of GDP history, TVL and REV coverage.
        {offscaleNames.length > 0 && (
          <span className="block mt-1.5">
            <span className="text-negative font-medium">
              Off-scale (clamped at X {Math.round(X_CAP * 100)}% / Y {Math.round(Y_CAP * 100)}%):
            </span>{" "}
            {offscaleNames.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
