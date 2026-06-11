"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { RaceFrame } from "@/lib/chain-aggregates";

// GDP bar-chart race — ranked trailing-30d GDP per chain, weekly frames.
// Bars are absolutely positioned and CSS-transition both their vertical
// rank slot and width, so playback reads as the classic bar race without
// an animation library.

const ROW_H = 30;
const PLAY_MS = 220;
const TOP_N = 15;

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

export function ChainGdpRace({
  frames,
  chainNames
}: {
  frames: RaceFrame[];
  chainNames: Record<string, string>;
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

  const frame = frames[idx];

  // Every slug that EVER appears keeps a persistent element so rank moves
  // animate; slugs outside the current frame's top-N park below the fold.
  const allSlugs = useMemo(() => {
    const s = new Set<string>();
    for (const f of frames) for (const b of f.bars) s.add(b.slug);
    return [...s];
  }, [frames]);

  const layout = useMemo(() => {
    if (!frame) return new Map<string, { rank: number; gdp30: number } | null>();
    const m = new Map<string, { rank: number; gdp30: number } | null>();
    for (const slug of allSlugs) m.set(slug, null);
    frame.bars.slice(0, TOP_N).forEach((b, rank) => m.set(b.slug, { rank, gdp30: b.gdp30 }));
    return m;
  }, [frame, allSlugs]);

  if (frames.length === 0 || !frame) {
    return <p className="text-xs text-fg-muted py-6 text-center">No history yet.</p>;
  }

  const maxVal = Math.max(1, ...frame.bars.slice(0, TOP_N).map((b) => b.gdp30));
  const visible = Math.min(TOP_N, frame.bars.length);
  const isLatest = idx === frames.length - 1;

  return (
    <div>
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
          aria-label="Race date"
          className="flex-1 min-w-40 h-1.5 cursor-pointer"
          style={{ accentColor: "rgb(var(--accent))" }}
        />
        <span className="font-mono tabular-nums text-sm text-fg w-28 text-right">
          {frame.date}
          {isLatest && <span className="block text-[10px] text-fg-muted text-right">latest</span>}
        </span>
      </div>

      <div className="relative overflow-hidden" style={{ height: visible * ROW_H }}>
        {allSlugs.map((slug) => {
          const pos = layout.get(slug);
          const name = chainNames[slug] ?? slug;
          const color = CHAIN_COLORS[slug] || "#71717a";
          const y = pos ? pos.rank * ROW_H : visible * ROW_H + 8; // park off-canvas
          const widthPct = pos ? Math.max((pos.gdp30 / maxVal) * 100, 1.5) : 0;
          return (
            <div
              key={slug}
              className="absolute left-0 right-0 flex items-center gap-2"
              style={{
                height: ROW_H - 6,
                transform: `translateY(${y}px)`,
                opacity: pos ? 1 : 0,
                transition: `transform ${PLAY_MS}ms linear, opacity ${PLAY_MS}ms linear`
              }}
            >
              <span className="w-24 shrink-0 text-right text-xs text-fg truncate">{name}</span>
              <div className="flex-1 h-full relative">
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${widthPct}%`,
                    background: color,
                    opacity: 0.8,
                    transition: `width ${PLAY_MS}ms linear`
                  }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-[11px] font-mono tabular-nums text-fg-muted whitespace-nowrap"
                  style={{
                    left: `${widthPct}%`,
                    paddingLeft: 6,
                    transition: `left ${PLAY_MS}ms linear`
                  }}
                >
                  {pos ? fmt(pos.gdp30) : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-fg-faint mt-3">
        Trailing-30d GDP, weekly frames, top {TOP_N} shown. Chains slide in once they have 30 days
        of history.
      </p>
    </div>
  );
}
