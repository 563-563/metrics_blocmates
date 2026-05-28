"use client";

import { useEffect, useState } from "react";
import type { HmProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Years-to-recoup visualization: HM made visceral as a stack of yearly
// "bricks" of Real Capture beside a single tower of Adjusted MCap. Bricks
// stack from the bottom up; the counter ticks year-by-year. Stack height
// equals MCap tower height at year = HM.
//
// SKY (∞ HM, $0 Real Capture) renders as a frozen empty tower — the visual
// can't reach the top because no bricks accrue. Pairs with the TMF waterfall.

const TOWER_H = 320;
const MAX_BRICKS = 100; // visual cap for very high HMs
const STAGGER_MS = 38; // delay between consecutive bricks landing

export function HmStacker({ p }: { p: HmProtocol }) {
  const hm = p.hm;
  const adjMcap = p.adj_mcap_usd ?? 0;
  const realCapture = p.real_capture_usd ?? 0;
  const noCapture = hm == null || realCapture <= 0;

  const visualBricks = noCapture ? 0 : Math.min(hm, MAX_BRICKS);
  const overflowed = !noCapture && hm > MAX_BRICKS;
  const brickHeight = visualBricks > 0 ? TOWER_H / visualBricks : 0;

  // Counter animates from 0 to the visible-brick count in step with the stagger.
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (noCapture || visualBricks === 0) return;
    setCount(0);
    const step = STAGGER_MS;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setCount(i);
      if (i >= Math.ceil(visualBricks)) window.clearInterval(id);
    }, step);
    return () => window.clearInterval(id);
  }, [noCapture, visualBricks]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-10 items-end max-w-md mx-auto">
        {/* MCap tower */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Adjusted MCap
          </p>
          <div
            className="w-full bg-gradient-to-t from-zinc-800 to-zinc-700 border border-zinc-600 rounded-t-sm flex flex-col items-center justify-end pb-3"
            style={{ height: TOWER_H }}
          >
            <span className="text-zinc-100 font-semibold text-sm">{fmtUsd(adjMcap)}</span>
          </div>
          <div className="w-full h-1 bg-zinc-500" />
        </div>

        {/* Years-of-capture stacker */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Years of Real Capture
          </p>
          <div
            className="w-full border border-zinc-700 rounded-t-sm relative bg-zinc-950 overflow-hidden"
            style={{ height: TOWER_H }}
          >
            {noCapture ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                <p className="text-zinc-500 text-sm">0 / yr</p>
                <p className="text-[10px] text-zinc-600 leading-relaxed mt-2 max-w-[140px]">
                  stack frozen — no Real Capture flowing to holders in Phase 1
                </p>
              </div>
            ) : (
              <svg
                viewBox={`0 0 100 ${TOWER_H}`}
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                {Array.from({ length: Math.ceil(visualBricks) }).map((_, i) => {
                  const y = TOWER_H - (i + 1) * brickHeight;
                  // Last brick may be a fractional remainder for non-integer HMs.
                  const lastH =
                    i === Math.ceil(visualBricks) - 1
                      ? Math.max(0.5, brickHeight * (visualBricks - i) - 0.4)
                      : Math.max(0.5, brickHeight - 0.4);
                  const cumCapture = realCapture * (i + 1);
                  const pctOfMcap = (cumCapture / adjMcap) * 100;
                  return (
                    <rect
                      key={i}
                      x={6}
                      y={y}
                      width={88}
                      height={lastH}
                      fill="#10b981"
                      opacity={0}
                      rx={0.5}
                    >
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="0.85"
                        dur="0.22s"
                        begin={`${(i * STAGGER_MS) / 1000}s`}
                        fill="freeze"
                      />
                      <title>
                        Year {i + 1}: {fmtUsd(realCapture)} · cumulative{" "}
                        {fmtUsd(cumCapture)} ({pctOfMcap.toFixed(1)}% of Adj MCap)
                      </title>
                    </rect>
                  );
                })}
              </svg>
            )}
          </div>
          <div className="w-full h-1 bg-zinc-500" />
          <p className="text-zinc-100 font-semibold mt-3 text-2xl tabular-nums">
            {noCapture ? "∞" : count.toFixed(0)}
            {overflowed && "+"}{" "}
            <span className="text-xs text-zinc-500 font-normal">yrs</span>
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">
            {noCapture ? "never reaches MCap" : `${fmtUsd(realCapture)}/yr`}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800 text-sm text-zinc-300 leading-relaxed">
        {noCapture ? (
          <p>
            At <span className="text-zinc-100">{fmtUsd(realCapture)}/yr</span> of Real Capture, no
            length of time recoups today&apos;s{" "}
            <span className="text-zinc-100">{fmtUsd(adjMcap)}</span> Adjusted MCap — Holder
            Multiple is undefined.
          </p>
        ) : (
          <p>
            At today&apos;s capture rate of{" "}
            <span className="text-zinc-100">{fmtUsd(realCapture)}/yr</span>, it takes{" "}
            <span className="text-zinc-100 font-semibold">
              {(hm as number).toFixed(1)} years
            </span>{" "}
            of holder cash to equal the {fmtUsd(adjMcap)} Adjusted MCap — that&apos;s the{" "}
            {p.symbol} Holder Multiple.
            {overflowed && (
              <>
                {" "}
                (Visual capped at 100 bricks; actual multiple is{" "}
                <span className="text-zinc-100">{(hm as number).toFixed(0)}×</span>.)
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
