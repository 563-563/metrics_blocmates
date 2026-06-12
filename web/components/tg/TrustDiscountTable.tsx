"use client";

import { useState } from "react";
import Link from "next/link";
import { fmtUsd } from "@/lib/format";
import { gradeColorClass, CLARITY_SCENARIO } from "@/lib/token-grading";

// Cohort table with the CLARITY-scenario toggle. Both regimes arrive
// precomputed from the server; the toggle just switches which set renders.

export type TdRegimeValues = {
  ke: number | null;
  ss_pe: number | null;
  implied: number | null;
  implied_full_equity: number | null;
  trust_discount: number | null;
};

export type TdRow = {
  symbol: string;
  project: string;
  claim_category: string | null;
  alignment_grade: string | null;
  alignment_factor: number | null;
  ke_grade: string | null;
  market_cap: number | null;
  flags: number;
  base: TdRegimeValues;
  clarity: TdRegimeValues;
};

function discountColor(d: number | null): string {
  if (d == null) return "text-fg-faint";
  if (d >= 0.85) return "text-negative";
  if (d >= 0.5) return "text-accent";
  return "text-positive";
}

export function TrustDiscountTable({ rows }: { rows: TdRow[] }) {
  const [clarity, setClarity] = useState(false);

  const sorted = [...rows].sort((a, b) => {
    const da = (clarity ? a.clarity : a.base).trust_discount;
    const db = (clarity ? b.clarity : b.base).trust_discount;
    if (da == null && db == null) return 0;
    if (da == null) return 1;
    if (db == null) return -1;
    return db - da;
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <span className="text-[11px] text-fg-muted max-w-xl">
          {clarity ? (
            <>
              Scenario: <span className="text-fg">{CLARITY_SCENARIO.label}</span> — regulatory
              premium −65%, liquidity −30%, custody −20% across every Ke build-up, benchmark
              included. Alignment itself doesn&apos;t move: the law can&apos;t turn on a fee switch.
            </>
          ) : (
            "Current regime — premia as graded. Flip the scenario to see what statutory clarity is worth to each token."
          )}
        </span>
        <span className="inline-flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-fg-muted">CLARITY Act</span>
          <span className="inline-flex border border-line rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setClarity(false)}
              className={`px-2.5 py-1 text-[11px] transition ${!clarity ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"}`}
            >
              today
            </button>
            <button
              type="button"
              onClick={() => setClarity(true)}
              className={`px-2.5 py-1 text-[11px] transition border-l border-line ${clarity ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"}`}
            >
              passed
            </button>
          </span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[820px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-fg-muted">
              <th className="text-left font-normal py-3 px-2">Token</th>
              <th className="text-left font-normal py-3 px-2">Claim category</th>
              <th className="text-right font-normal py-3 px-2">Trust discount</th>
              <th className="text-right font-normal py-3 px-2">As this token</th>
              <th className="text-right font-normal py-3 px-2">As equity</th>
              <th className="text-right font-normal py-3 px-2">Ke</th>
              <th className="text-right font-normal py-3 px-2">Align</th>
              <th className="text-right font-normal py-3 px-2">vs mcap</th>
              <th className="text-right font-normal py-3 px-2">Flags</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t) => {
              const v = clarity ? t.clarity : t.base;
              const vsMcap =
                v.implied != null && t.market_cap ? v.implied / t.market_cap : null;
              return (
                <tr key={t.symbol} className="group">
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/trust-discount/${t.symbol}`} className="block">
                      <span className="block text-fg group-hover:text-accent font-medium">
                        {t.project}
                      </span>
                      <span className="block text-[11px] text-fg-muted">${t.symbol}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-xs text-fg-muted">
                    {t.claim_category ?? "—"}
                  </td>
                  <td className={`py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums font-semibold ${discountColor(v.trust_discount)}`}>
                    {v.trust_discount != null ? `${(v.trust_discount * 100).toFixed(0)}%` : "n/a"}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg">
                    {v.implied != null ? fmtUsd(v.implied) : "—"}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                    {v.implied_full_equity != null && v.implied_full_equity > 0
                      ? fmtUsd(v.implied_full_equity)
                      : "—"}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                    <span className={gradeColorClass(t.ke_grade ?? "")}>
                      {v.ke != null ? `${(v.ke * 100).toFixed(1)}%` : "—"}
                    </span>
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                    <span className={gradeColorClass(t.alignment_grade ?? "")}>
                      {t.alignment_grade ?? "—"}
                    </span>
                    <span className="text-fg-muted text-xs ml-1.5">
                      {t.alignment_factor != null ? `${(t.alignment_factor * 100).toFixed(0)}%` : ""}
                    </span>
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                    {vsMcap != null ? (
                      <span className={vsMcap >= 1 ? "text-positive" : "text-negative"}>
                        {vsMcap.toFixed(2)}×
                      </span>
                    ) : (
                      <span className="text-fg-faint">—</span>
                    )}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                    {t.flags}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
