"use client";

import { useRef, useState } from "react";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { BuffettSeries } from "@/lib/chain-aggregates";

// Buffett Indicator small multiples — native-token mcap ÷ annualized GDP,
// the metric Buffett uses on countries (market cap / GNP), per chain.
// Sorted cheapest-first. Each cell's sparkline has its own y-scale and is
// hoverable: a guide line + tooltip show the multiple at any week.

const VW = 200; // sparkline viewBox width
const VH = 44; // viewBox height
const PAD = 3;

function fmtX(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k×`;
  if (v >= 100) return `${v.toFixed(0)}×`;
  return `${v.toFixed(1)}×`;
}

function BuffettCell({
  s,
  name,
  color
}: {
  s: BuffettSeries;
  name: string;
  color: string;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const n = s.points.length;
  const values = s.points.map((p) => p.multiple);
  const range = s.max - s.min || 1;
  const xFor = (i: number) => (i / (n - 1)) * VW;
  const yFor = (v: number) => PAD + (VH - PAD * 2) * (1 - (v - s.min) / range);
  const line = values.map((v, i) => `${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(" ");
  const area =
    `M 0,${VH} ` +
    values.map((v, i) => `L ${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(" ") +
    ` L ${VW},${VH} Z`;
  const gid = `buf-${s.slug}`;

  function onMove(e: React.MouseEvent) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const frac = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setHoverIdx(Math.round(frac * (n - 1)));
  }

  const hovered = hoverIdx != null ? s.points[hoverIdx] : null;
  const first = s.points[0];
  const deltaPct = hovered ? ((hovered.multiple / first.multiple - 1) * 100) : null;
  const span = `${first.date.slice(0, 7)} → ${s.points[n - 1].date.slice(0, 7)}`;

  return (
    <div className="relative border border-line rounded-md p-3 bg-surface">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-fg truncate">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          {name}
        </span>
        <span className="font-mono tabular-nums text-sm text-fg shrink-0">
          {fmtX(hovered ? hovered.multiple : s.latest)}
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        className="block w-full cursor-crosshair"
        style={{ height: VH }}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth={1.25}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {hoverIdx != null && (
          <>
            <line
              x1={xFor(hoverIdx)}
              x2={xFor(hoverIdx)}
              y1={0}
              y2={VH}
              stroke="rgb(var(--fg-faint))"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeDasharray="3 3"
            />
            <circle cx={xFor(hoverIdx)} cy={yFor(values[hoverIdx])} r={2.4} fill={color} />
          </>
        )}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-line bg-canvas/95 px-2.5 py-2 text-[11px] leading-relaxed shadow-xl whitespace-nowrap"
          style={{
            bottom: "calc(100% - 6px)",
            left: `${Math.min(Math.max((hoverIdx! / (n - 1)) * 100, 22), 78)}%`,
            transform: "translateX(-50%)"
          }}
        >
          <span className="block text-fg-muted">{hovered.date}</span>
          <span className="block font-mono tabular-nums text-fg">
            {fmtX(hovered.multiple)} <span className="text-fg-muted">mcap ÷ ann. GDP</span>
          </span>
          {deltaPct != null && (
            <span
              className="block font-mono tabular-nums"
              style={{
                color:
                  deltaPct > 0 ? "rgb(var(--negative))" : deltaPct < 0 ? "rgb(var(--positive))" : undefined
              }}
            >
              {deltaPct > 0 ? "+" : ""}
              {deltaPct.toFixed(0)}% since {first.date.slice(0, 7)}
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between mt-1.5 text-[10px] text-fg-muted font-mono tabular-nums">
        <span>range {fmtX(s.min)}–{fmtX(s.max)}</span>
        <span>{span}</span>
      </div>
    </div>
  );
}

export function ChainBuffettGrid({
  series,
  chainNames
}: {
  series: BuffettSeries[];
  chainNames: Record<string, string>;
}) {
  if (series.length === 0) {
    return (
      <p className="text-xs text-fg-muted py-6 text-center">
        mcap history not fetched yet — run scripts/chains/fetch-mcap-history.js.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {series.map((s) => (
        <BuffettCell
          key={s.slug}
          s={s}
          name={chainNames[s.slug] ?? s.slug}
          color={CHAIN_COLORS[s.slug] || "#71717a"}
        />
      ))}
    </div>
  );
}
