"use client";

import { useMemo, useState } from "react";
import { fmtUsd } from "@/lib/format";
import { CLARITY_SCENARIO } from "@/lib/token-grading";
import { KpiBig } from "@/components/KpiBig";
import { TrustMap } from "./TrustMap";
import { TrustDiscountTable, type TdRow } from "./TrustDiscountTable";

// One CLARITY toggle drives everything below it: the cohort KPIs, the
// Trust Map, and the table all re-price together.

export function TrustDiscountDashboard({ rows }: { rows: TdRow[] }) {
  const [clarity, setClarity] = useState(false);

  const kpis = useMemo(() => {
    const v = (r: TdRow) => (clarity ? r.clarity : r.base);
    let forfeited = 0;
    let asEquity = 0;
    const discounts: number[] = [];
    let ownNothing = 0;
    for (const r of rows) {
      const x = v(r);
      if (x.implied_full_equity != null && x.implied_full_equity > 0) {
        asEquity += x.implied_full_equity;
        forfeited += Math.max(x.implied_full_equity - (x.implied ?? 0), 0);
      }
      if (x.trust_discount != null) discounts.push(x.trust_discount);
      if (r.alignment_grade === "F") ownNothing++;
    }
    discounts.sort((a, b) => a - b);
    const median =
      discounts.length > 0 ? discounts[Math.floor(discounts.length / 2)] : null;
    return { forfeited, asEquity, median, ownNothing };
  }, [rows, clarity]);

  return (
    <div>
      {/* The one scenario toggle */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <span className="text-[11px] text-fg-muted max-w-xl">
          {clarity ? (
            <>
              Scenario: <span className="text-fg">{CLARITY_SCENARIO.label}</span> — regulatory
              premium −65%, liquidity −30%, custody −20% in every required-return build-up,
              benchmark included. Alignment doesn&apos;t move: the law can&apos;t turn on a fee
              switch. Everything below is re-priced.
            </>
          ) : (
            "Current regime — premia as graded. Flip the scenario to re-price the KPIs, map, and table under statutory clarity."
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

      {/* Cohort KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiBig
          label="Forfeited to token design"
          value={fmtUsd(kpis.forfeited)}
          sub="cohort value lost vs equity wrappers"
          valueClass="text-negative"
        />
        <KpiBig
          label="Cohort value as equity"
          value={fmtUsd(kpis.asEquity)}
          sub="same businesses, real shares"
        />
        <KpiBig
          label="Median trust discount"
          value={kpis.median != null ? `${(kpis.median * 100).toFixed(0)}%` : "—"}
          sub="across graded tokens"
        />
        <KpiBig
          label="Tokens owning ~nothing"
          value={`${kpis.ownNothing} / ${rows.length}`}
          sub="alignment grade F"
          valueClass={kpis.ownNothing > 0 ? "text-negative" : "text-fg"}
        />
      </div>

      {/* The Trust Map */}
      <div className="mb-8 border border-line rounded-md p-6 bg-surface">
        <h2 className="text-xs uppercase tracking-widest text-fg-muted mb-4">
          The trust map — alignment × required return
        </h2>
        <TrustMap rows={rows} clarity={clarity} />
      </div>

      <TrustDiscountTable rows={rows} clarity={clarity} />
    </div>
  );
}
