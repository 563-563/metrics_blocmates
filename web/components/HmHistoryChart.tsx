"use client";

import { useRef, useState } from "react";
import {
  Line,
  ComposedChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useTheme } from "./ThemeProvider";
import { copyChartPng } from "@/lib/copy-chart-png";

export type HmHistoryPoint = { date: string; hm: number | null; price_usd?: number };

const BANDS_BASE = [
  { y1: 0, y2: 10, fill: "#5C8C3B" },   // cheap (green)
  { y1: 10, y2: 20, fill: "#7DAE53" },
  { y1: 20, y2: 35, fill: "#94837A" },  // fair (warm grey)
  { y1: 35, y2: 50, fill: "#C68C3B" },  // expensive (amber)
  { y1: 50, y2: 9999, fill: "#B25450" } // speculative (warm red)
];

function makeTip(hmColor: string, priceColor: string) {
  return function Tip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    const hm = payload.find((p: any) => p.dataKey === "hm");
    const price = payload.find((p: any) => p.dataKey === "price_usd");
    return (
      <div style={{ background: "rgb(var(--surface))", border: "1px solid rgb(var(--line))", padding: "6px 9px", fontSize: 12 }}>
        <div style={{ color: "rgb(var(--fg-muted))", marginBottom: 3 }}>{label}</div>
        {hm && (
          <div style={{ color: hmColor }}>
            HM <strong>{Number(hm.value).toFixed(1)}×</strong>
          </div>
        )}
        {price && (
          <div style={{ color: priceColor }}>
            Price ${Number(price.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        )}
      </div>
    );
  };
}

export function HmHistoryChart({
  data,
  copyTitle,
  copySubtitle
}: {
  data: HmHistoryPoint[];
  /** Optional title rendered onto the Copy-PNG output band. */
  copyTitle?: string;
  /** Optional subtitle rendered onto the Copy-PNG output band. */
  copySubtitle?: string;
}) {
  const { theme } = useTheme();
  const HM_COLOR = theme === "light" ? "#2A2620" : "#ECE6DD";
  const PRICE_COLOR = theme === "light" ? "#4D7A3C" : "#84A76C";
  const Tip = makeTip(HM_COLOR, PRICE_COLOR);
  // Band tints — strong enough to actually demarcate the bands on cream
  // (the previous 0.12 was still washing out). Dark mode keeps a subtler 0.10.
  const BAND_OPACITY = theme === "light" ? 0.28 : 0.1;

  const containerRef = useRef<HTMLDivElement>(null);
  const [copyLabel, setCopyLabel] = useState("Copy PNG");

  const pts = (data || []).filter((d) => d.hm != null);
  if (pts.length < 2) {
    return <p className="text-xs text-fg-faint py-8 text-center">Not enough history yet.</p>;
  }
  const maxHm = Math.max(...pts.map((d) => d.hm as number));
  const yMax = Math.min(Math.ceil((maxHm * 1.1) / 10) * 10, 150);
  const hasPrice = pts.some((d) => d.price_usd != null);

  const handleCopy = async () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;
    setCopyLabel("…");
    const result = await copyChartPng(
      svg as SVGSVGElement,
      copyTitle ?? "Holder Multiple over time",
      copySubtitle ?? `${pts.length} day history`,
      {
        width: svg.clientWidth || 800,
        height: svg.clientHeight || 288,
        background: theme === "light" ? "#FAF7F2" : "#1C1B18",
        titleColor: theme === "light" ? "#1A1A1A" : "#ECE6DD",
        subtitleColor: theme === "light" ? "#8A8F98" : "#9A958C",
        watermarkColor: theme === "light" ? "#9A958C" : "#7A736A",
        filenameSlug: (copyTitle ?? "hm-history").replace(/\s+/g, "-").toLowerCase()
      }
    );
    setCopyLabel(result === "copied" ? "Copied!" : result === "saved" ? "Saved" : "Failed");
    setTimeout(() => setCopyLabel("Copy PNG"), 1600);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-0 right-0 z-10 text-[10px] uppercase tracking-widest text-fg-muted hover:text-fg border border-line hover:border-accent rounded px-2 py-1 transition"
        aria-label="Copy chart as PNG"
      >
        {copyLabel}
      </button>
      <div ref={containerRef} className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={pts} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
          {BANDS_BASE.map((b, i) => (
            <ReferenceArea
              key={i}
              yAxisId="hm"
              y1={b.y1}
              y2={Math.min(b.y2, yMax)}
              fill={b.fill}
              fillOpacity={BAND_OPACITY}
              stroke="none"
              ifOverflow="hidden"
            />
          ))}
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" vertical={false} />
          <XAxis dataKey="date" stroke="rgb(var(--fg-faint))" tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }} minTickGap={48} />
          <YAxis
            yAxisId="hm"
            stroke="rgb(var(--fg-faint))"
            domain={[0, yMax]}
            tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
            tickFormatter={(v: number) => `${v}×`}
            label={{ value: "Holder Multiple (×)", angle: -90, position: "insideLeft", offset: 4, style: { textAnchor: "middle", fill: HM_COLOR, fontSize: 11 } }}
          />
          {hasPrice && (
            <YAxis
              yAxisId="price"
              orientation="right"
              stroke="rgb(var(--fg-faint))"
              tick={{ fontSize: 10, fill: PRICE_COLOR }}
              tickFormatter={(v: number) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v.toFixed(v < 1 ? 3 : 2)}`}
              label={{ value: "Price (USD)", angle: 90, position: "insideRight", offset: 4, style: { textAnchor: "middle", fill: PRICE_COLOR, fontSize: 11 } }}
            />
          )}
          <Tooltip content={<Tip />} />
          <Line yAxisId="hm" type="monotone" dataKey="hm" stroke={HM_COLOR} strokeWidth={1.5} dot={false} />
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
