import Link from "next/link";
import { notFound } from "next/navigation";
import { TG_SYMBOLS, getTokenGrade } from "@/lib/tg-data";
import { fmtUsd } from "@/lib/format";
import { gradeColorClass } from "@/lib/token-grading";
import { KpiBig } from "@/components/KpiBig";
import { TokenGradeExplorer } from "@/components/tg/TokenGradeExplorer";

export const revalidate = 300;

export function generateStaticParams() {
  return TG_SYMBOLS.map((symbol) => ({ symbol }));
}

export default async function TrustDiscountPage({
  params
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const grade = getTokenGrade(symbol);
  if (!grade) notFound();

  const v = grade.valuation;
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {grade.project} <span className="text-fg-muted text-lg">${grade.symbol}</span>
          </h1>
          <div className="flex items-center gap-4 text-[11px] text-fg-muted">
            <Link href="/trust-discount" className="hover:text-fg transition">
              ← all graded tokens
            </Link>
            <span>updated {grade.updated_at.slice(0, 10)}</span>
          </div>
        </div>
        <p className="text-xs text-fg-muted mt-2 leading-relaxed max-w-2xl">
          Current grade: <span className="text-fg">{grade.token.claim_category}</span> — alignment{" "}
          <span className={`font-mono ${gradeColorClass(grade.token.token_alignment_grade)}`}>
            {grade.token.token_alignment_grade}
          </span>{" "}
          ({(grade.token.token_alignment_factor * 100).toFixed(0)}% of clean earnings), Ke{" "}
          <span className={`font-mono ${gradeColorClass(grade.ke_build_up.ke_grade)}`}>
            {(grade.ke_build_up.ke * 100).toFixed(1)}% ({grade.ke_build_up.ke_grade})
          </span>
          .
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiBig
          label="Trust discount"
          value={v.trust_discount != null ? `${(v.trust_discount * 100).toFixed(0)}%` : "n/a"}
          sub="vs the same business as equity"
          valueClass={
            v.trust_discount == null
              ? "text-fg"
              : v.trust_discount >= 0.85
                ? "text-negative"
                : v.trust_discount >= 0.5
                  ? "text-accent"
                  : "text-positive"
          }
        />
        <KpiBig
          label="As this token"
          value={v.implied_token_value != null ? fmtUsd(v.implied_token_value) : "—"}
          sub={`${grade.token.claim_category} · SS-PE ${v.ss_pe != null ? `${v.ss_pe.toFixed(2)}×` : "—"}`}
        />
        <KpiBig
          label="As full equity"
          value={
            v.implied_full_equity != null && v.implied_full_equity > 0
              ? fmtUsd(v.implied_full_equity)
              : "—"
          }
          sub="alignment 100% at benchmark Ke"
        />
        <KpiBig
          label="vs market cap"
          value={
            v.implied_value_vs_market_cap != null
              ? `${v.implied_value_vs_market_cap.toFixed(2)}×`
              : "—"
          }
          sub={v.market_cap != null ? `mcap ${fmtUsd(v.market_cap)} (${v.market_source === "live_cg" ? "live" : "seed"})` : undefined}
          valueClass={
            v.implied_value_vs_market_cap != null && v.implied_value_vs_market_cap >= 1
              ? "text-positive"
              : "text-negative"
          }
        />
      </div>

      <TokenGradeExplorer grade={grade} />

      <footer className="pt-6 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          Formula chain:{" "}
          <code className="text-fg-muted">
            run-rate × durability × clean conversion × token alignment × SS-PE
          </code>{" "}
          · SS-PE = <code className="text-fg-muted">(1 − g/ROE) / (Ke − g)</code>. Published
          figures use the graded seed; sliders are scenario tools and never persist.
        </p>
      </footer>
    </div>
  );
}
