"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { fmtUsd } from "@/lib/format";
import { gradeColorClass, CLARITY_SCENARIO } from "@/lib/token-grading";
import { compareNum, compareStr, useSort } from "@/lib/use-sort";
import { InfoTip } from "@/components/InfoTip";

// Cohort table with the CLARITY-scenario toggle, sortable columns, a text
// filter, and claim-category chips. Both regimes arrive precomputed from
// the server; the toggle just switches which set renders (and re-sorts).

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
  image: string | null;
  claim_category: string | null;
  alignment_grade: string | null;
  alignment_factor: number | null;
  ke_grade: string | null;
  market_cap: number | null;
  flags: number;
  base: TdRegimeValues;
  clarity: TdRegimeValues;
};

type SortKey =
  | "project"
  | "category"
  | "discount"
  | "implied"
  | "full_equity"
  | "mcap"
  | "ke"
  | "alignment"
  | "vs_mcap"
  | "flags";

function discountColor(d: number | null): string {
  if (d == null) return "text-fg-faint";
  if (d >= 0.85) return "text-negative";
  if (d >= 0.5) return "text-accent";
  return "text-positive";
}

function SortHeader({
  active,
  dir,
  onClick,
  children,
  tip,
  align = "right"
}: {
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  children: React.ReactNode;
  tip?: React.ReactNode;
  align?: "left" | "right";
}) {
  const arrow = active ? (dir === "asc" ? "↑" : "↓") : "·";
  return (
    <th
      onClick={onClick}
      className={`${align === "right" ? "text-right" : "text-left"} font-normal py-3 px-2 cursor-pointer select-none hover:text-accent transition text-fg`}
    >
      <span className={`inline-flex items-baseline gap-1 ${align === "right" ? "justify-end" : ""}`}>
        {align === "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">{arrow}</span>
        )}
        {children}
        {/* stopPropagation so opening the tooltip doesn't trigger a sort */}
        {tip && (
          <span onClick={(e) => e.stopPropagation()} className="normal-case tracking-normal">
            <InfoTip>{tip}</InfoTip>
          </span>
        )}
        {align !== "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">{arrow}</span>
        )}
      </span>
    </th>
  );
}

export function TrustDiscountTable({ rows }: { rows: TdRow[] }) {
  const [clarity, setClarity] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { sortKey, sortDir, toggle } = useSort<SortKey>("discount", "desc");

  const categories = useMemo(
    () => [...new Set(rows.map((r) => r.claim_category).filter(Boolean))] as string[],
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (categoryFilter && r.claim_category !== categoryFilter) return false;
      if (q && !r.project.toLowerCase().includes(q) && !r.symbol.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [rows, query, categoryFilter]);

  const sorted = useMemo(() => {
    const v = (r: TdRow) => (clarity ? r.clarity : r.base);
    const out = [...filtered];
    out.sort((a, b) => {
      switch (sortKey) {
        case "project":
          return compareStr(a.project, b.project, sortDir);
        case "category":
          return compareStr(a.claim_category ?? "", b.claim_category ?? "", sortDir);
        case "discount":
          return compareNum(v(a).trust_discount ?? -1, v(b).trust_discount ?? -1, sortDir);
        case "implied":
          return compareNum(v(a).implied ?? 0, v(b).implied ?? 0, sortDir);
        case "full_equity":
          return compareNum(v(a).implied_full_equity ?? 0, v(b).implied_full_equity ?? 0, sortDir);
        case "mcap":
          return compareNum(a.market_cap ?? 0, b.market_cap ?? 0, sortDir);
        case "ke":
          return compareNum(v(a).ke ?? 0, v(b).ke ?? 0, sortDir);
        case "alignment":
          return compareNum(a.alignment_factor ?? 0, b.alignment_factor ?? 0, sortDir);
        case "vs_mcap": {
          const ra = v(a).implied != null && a.market_cap ? v(a).implied! / a.market_cap : -1;
          const rb = v(b).implied != null && b.market_cap ? v(b).implied! / b.market_cap : -1;
          return compareNum(ra, rb, sortDir);
        }
        case "flags":
          return compareNum(a.flags, b.flags, sortDir);
        default:
          return 0;
      }
    });
    return out;
  }, [filtered, sortKey, sortDir, clarity]);

  return (
    <div>
      {/* Controls: scenario toggle · search · category chips */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
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

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filter tokens…"
          aria-label="Filter tokens"
          className="bg-surface border border-line rounded px-2.5 py-1 text-xs text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent w-40"
        />
        <button
          type="button"
          onClick={() => setCategoryFilter(null)}
          className={`text-[11px] rounded-full border px-2.5 py-0.5 transition ${
            categoryFilter == null
              ? "border-accent text-fg bg-accent/10"
              : "border-line text-fg-muted hover:text-fg"
          }`}
        >
          all claims
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}
            className={`text-[11px] rounded-full border px-2.5 py-0.5 transition ${
              categoryFilter === c
                ? "border-accent text-fg bg-accent/10"
                : "border-line text-fg-muted hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="text-[11px] text-fg-faint ml-auto">
          {sorted.length} of {rows.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[820px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest">
              <SortHeader active={sortKey === "project"} dir={sortDir} onClick={() => toggle("project", "asc")} align="left">
                Token
              </SortHeader>
              <SortHeader
                active={sortKey === "category"}
                dir={sortDir}
                onClick={() => toggle("category", "asc")}
                align="left"
                tip="Where the token sits on the claim ladder — from no utility (owns nothing) up to full equity (owns everything). Derived from the protocol's live value-accrual mechanism and status."
              >
                Claim category
              </SortHeader>
              <SortHeader
                active={sortKey === "discount"}
                dir={sortDir}
                onClick={() => toggle("discount")}
                tip={
                  <>
                    <span className="block mb-2">
                      The headline: how much value the token forfeits vs the same business as
                      equity. 1 − (as this token ÷ as equity).
                    </span>
                    <span className="block mb-2">
                      Green = near-equity claim · red = the token owns almost none of the
                      business.
                    </span>
                    <span className="block">Every point is fixable by governance.</span>
                  </>
                }
              >
                Trust discount
              </SortHeader>
              <SortHeader
                active={sortKey === "implied"}
                dir={sortDir}
                onClick={() => toggle("implied")}
                tip="What the token's actual claim is worth: clean earnings × the share the token receives (alignment) × a steady-state earnings multiple priced for this claim's risk."
              >
                As this token
              </SortHeader>
              <SortHeader
                active={sortKey === "full_equity"}
                dir={sortDir}
                onClick={() => toggle("full_equity")}
                tip="What the same business would be worth if the token were a real share: 100% of earnings at the full-equity benchmark required return (14.5% today)."
              >
                As equity
              </SortHeader>
              <SortHeader
                active={sortKey === "mcap"}
                dir={sortDir}
                onClick={() => toggle("mcap")}
                tip="Live circulating market cap (CoinGecko, refreshed with the data cron)."
              >
                Mcap
              </SortHeader>
              <SortHeader
                active={sortKey === "ke"}
                dir={sortDir}
                onClick={() => toggle("ke")}
                tip={
                  <>
                    <span className="block mb-2">
                      The return this claim must &quot;pay&quot; for its risk (the cost of equity,
                      Ke). Starts at T-bill + equity risk (~9%), then scored premia stack on top:
                      liquidity, regulatory, custody, governance/supply, economic alignment,
                      technical.
                    </span>
                    <span className="block">
                      Higher required return = lower earnings multiple. The color is the letter
                      grade.
                    </span>
                  </>
                }
              >
                Required return
              </SortHeader>
              <SortHeader
                active={sortKey === "alignment"}
                dir={sortDir}
                onClick={() => toggle("alignment")}
                tip={
                  <>
                    <span className="block mb-2">
                      The share of clean earnings the token actually receives — verified capture
                      ÷ earnings, both measured over the SAME trailing window (on-chain feeds
                      where we have them, DefiLlama holders-revenue otherwise).
                    </span>
                    <span className="block">
                      Re-derived every data refresh. A = effectively equity · F = no meaningful
                      claim.
                    </span>
                  </>
                }
              >
                Alignment score
              </SortHeader>
              <SortHeader
                active={sortKey === "vs_mcap"}
                dir={sortDir}
                onClick={() => toggle("vs_mcap")}
                tip={
                  <>
                    <span className="block mb-2">Implied value ÷ market cap.</span>
                    <span className="block">
                      Above 1× = the market prices the token below what its graded claim is
                      worth · below 1× = the market pays a premium over the claim (betting on
                      growth or future alignment).
                    </span>
                  </>
                }
              >
                vs mcap
              </SortHeader>
              <SortHeader
                active={sortKey === "flags"}
                dir={sortDir}
                onClick={() => toggle("flags")}
                tip="Open warnings on this grade — data gaps, unlock overhangs, exploits, dormant mechanisms. Details on the token's page."
              >
                Flags
              </SortHeader>
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
                    <Link href={`/trust-discount/${t.symbol}`} className="flex items-center gap-2.5">
                      {t.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.image} alt="" width={28} height={28} className="rounded-full bg-surface-elev shrink-0" loading="lazy" />
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-surface-elev shrink-0" />
                      )}
                      <span>
                        <span className="block text-fg group-hover:text-accent font-medium">
                          {t.project}
                        </span>
                        <span className="block text-[11px] text-fg-muted">${t.symbol}</span>
                      </span>
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
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg">
                    {t.market_cap != null ? fmtUsd(t.market_cap) : "—"}
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
