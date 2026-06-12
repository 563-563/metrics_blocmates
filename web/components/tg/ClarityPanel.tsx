"use client";

import { useState } from "react";
import { fmtUsd } from "@/lib/format";
import {
  CLARITY_SCENARIO,
  KE_COMPONENT_INFO,
  applyClarityScenario,
  calculateSSPE,
  calculateTokenValue,
  fullEquityKe,
  trustDiscount
} from "@/lib/token-grading";
import type { TokenGrade } from "@/lib/tg-data";

// Policy scenario: re-price this token under "CLARITY Act + friendly
// SEC/CFTC". Each premium row shows the scoring rubric it comes from
// (premium = max × score / 5, with the spec's 0/5 anchors) and exactly
// what the law does to that scoring dimension.

export function ClarityPanel({ grade }: { grade: TokenGrade }) {
  const [on, setOn] = useState(false);

  const base = grade.ke_build_up as unknown as Record<string, number>;
  const adjusted = applyClarityScenario(base);
  const cleanEarnings = grade.business.clean_platform_earnings;
  const roe = grade.capital_efficiency.underwriting_roe;
  const g = grade.growth.terminal_g;
  const alignment = grade.token.token_alignment_factor;

  const regime = (buildUp: Record<string, number>, clarity: boolean) => {
    const sspe = calculateSSPE(roe, buildUp.ke, g);
    const implied = calculateTokenValue(cleanEarnings, alignment, sspe);
    const fullEq = calculateTokenValue(cleanEarnings, 1.0, calculateSSPE(roe, fullEquityKe(clarity), g));
    return { ke: buildUp.ke, sspe, implied, fullEq, discount: trustDiscount(implied, fullEq) };
  };
  const today = regime(base, false);
  const passed = regime(adjusted, true);
  const active = on ? passed : today;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <span className="text-[11px] text-fg-muted">
          Re-price this token under <span className="text-fg">{CLARITY_SCENARIO.label}</span> —
          statutory premia compress; token design stays exactly as graded. Each premium is
          scored 0–5 (premium = ceiling × score ÷ 5); the notes explain which scores the law
          can actually move.
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">CLARITY Act</span>
          <span className="inline-flex border border-line rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setOn(false)}
              className={`px-2.5 py-1 text-[11px] transition ${!on ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"}`}
            >
              today
            </button>
            <button
              type="button"
              onClick={() => setOn(true)}
              className={`px-2.5 py-1 text-[11px] transition border-l border-line ${on ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"}`}
            >
              passed
            </button>
          </span>
        </span>
      </div>

      {/* Premium-by-premium before → after, grounded in the scoring rubric */}
      <div className="space-y-3.5">
        {KE_COMPONENT_INFO.map((info) => {
          const before = base[info.key] ?? 0;
          const after = adjusted[info.key] ?? 0;
          const changed = Math.abs(after - before) > 1e-6;
          const shown = on ? after : before;
          const max = Math.max(base.ke, 0.0001);
          // Implied current score from the graded premium (premium = max × score/5).
          const score =
            info.maxPremium && info.maxPremium > 0
              ? Math.round(((before / info.maxPremium) * 5) * 10) / 10
              : null;
          return (
            <div key={info.key} className="flex items-start gap-3">
              <span className="w-48 shrink-0 pt-0.5">
                <span className="block text-[11px] text-fg">{info.label}</span>
                {info.maxPremium != null ? (
                  <span className="block text-[10px] text-fg-faint">
                    scored {score != null ? `${score}/5` : "—"} of {(info.maxPremium * 100).toFixed(0)}% ceiling
                  </span>
                ) : (
                  <span className="block text-[10px] text-fg-faint">macro base</span>
                )}
              </span>
              <div className="flex-1">
                <div className="h-3.5 relative">
                  {on && changed && (
                    <div
                      className="absolute h-full rounded-sm border border-line"
                      style={{ width: `${(before / max) * 100}%` }}
                    />
                  )}
                  <div
                    className={`absolute h-full rounded-sm transition-all duration-300 ${changed ? "bg-accent/80" : "bg-fg-faint/40"}`}
                    style={{ width: `${Math.max((shown / max) * 100, 0.5)}%` }}
                  />
                </div>
                {info.score0 && (
                  <p className="text-[10px] text-fg-faint leading-snug mt-1">
                    <span className="text-fg-muted">Rubric:</span> score 0 = {info.score0} · score
                    5 = {info.score5}.
                  </p>
                )}
                <p className="text-[10px] text-fg-faint leading-snug mt-0.5">
                  <span className="text-fg-muted">Under CLARITY:</span> {info.clarity}
                </p>
              </div>
              <span className="w-24 shrink-0 text-right font-mono tabular-nums text-[11px] pt-0.5">
                <span className="text-fg">{(shown * 100).toFixed(1)}%</span>
                {changed && (
                  <span className={on ? "text-positive" : "text-fg-faint"}>
                    {" "}
                    {on ? `(was ${(before * 100).toFixed(1)}%)` : `(→ ${(after * 100).toFixed(1)}%)`}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Regime summary */}
      <div className="mt-5 pt-4 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Ke</p>
          <p className="font-mono tabular-nums text-base text-fg mt-0.5">
            {(active.ke * 100).toFixed(1)}%
            {on && <span className="text-positive text-xs ml-1.5">−{((today.ke - passed.ke) * 100).toFixed(1)}pts</span>}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">SS-PE</p>
          <p className="font-mono tabular-nums text-base text-fg mt-0.5">
            {active.sspe != null ? `${active.sspe.toFixed(2)}×` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Implied value</p>
          <p className="font-mono tabular-nums text-base text-fg mt-0.5">
            {active.implied != null ? fmtUsd(active.implied) : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Trust discount</p>
          <p className="font-mono tabular-nums text-base font-semibold mt-0.5 text-fg">
            {active.discount != null ? `${(active.discount * 100).toFixed(0)}%` : "n/a"}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-fg-faint mt-4 leading-relaxed">
        The benchmark compresses too (full-equity Ke {(fullEquityKe(false) * 100).toFixed(1)}% →{" "}
        {(fullEquityKe(true) * 100).toFixed(1)}%), so the discount stays a fair fight — both
        wrappers benefit from clarity. What the law cannot do is move the alignment factor: a
        statute doesn&apos;t route revenue to holders. Bill status: passed Senate Banking markup
        May 2026, pending floor time.
      </p>
    </div>
  );
}
