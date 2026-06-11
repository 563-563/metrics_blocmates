import Link from "next/link";
import { tgLatest } from "@/lib/tg-data";
import { fmtUsd } from "@/lib/format";
import { gradeColorClass } from "@/lib/token-grading";
import { PageHeader } from "@/components/PageHeader";
import { HowToRead } from "@/components/HowToRead";

export const revalidate = 300;

export default function TokenGradeIndex() {
  const rows = tgLatest.tokens;
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="Token Grade"
        description="How good is the business — and how much of it does the token actually own? Grades the token's economic claim, prices that claim with a built-up cost of equity, and converts it to an implied value via a steady-state P/E."
        meta={`As of ${tgLatest.generated_at.slice(0, 10)} · ${rows.length} token${rows.length === 1 ? "" : "s"} graded`}
      />

      <HowToRead>
        <p className="mb-3">
          <strong className="text-fg">
            implied value = revenue × clean conversion × token alignment × SS-PE
          </strong>
          , where SS-PE = (1 − g/ROE) / (Ke − g). Two dials are about the business (clean
          conversion, ROE/g) and two are about the token&apos;s claim on it (alignment, Ke).
        </p>
        <p>
          A great business with a no-claim token can still be a poor token. The{" "}
          <strong className="text-fg">alignment grade</strong> (A = token is effectively
          equity, F = no meaningful claim) and <strong className="text-fg">Ke grade</strong>{" "}
          (A = equity-like required return, F = speculative option) carry the token side; the
          claim ladder on each token&apos;s page shows what the same business would be worth
          at every rung.
        </p>
      </HowToRead>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-fg-muted">
              <th className="text-left font-normal py-3 px-2">Token</th>
              <th className="text-left font-normal py-3 px-2">Claim category</th>
              <th className="text-right font-normal py-3 px-2">Alignment</th>
              <th className="text-right font-normal py-3 px-2">Ke</th>
              <th className="text-right font-normal py-3 px-2">SS-PE</th>
              <th className="text-right font-normal py-3 px-2">Implied value</th>
              <th className="text-right font-normal py-3 px-2">vs mcap</th>
              <th className="text-right font-normal py-3 px-2">vs FDV</th>
              <th className="text-right font-normal py-3 px-2">Flags</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.symbol} className="group">
                <td className="py-3 px-2 border-t border-line-faint">
                  <Link href={`/token-grade/${t.symbol}`} className="block">
                    <span className="block text-fg group-hover:text-accent font-medium">
                      {t.project}
                    </span>
                    <span className="block text-[11px] text-fg-muted">${t.symbol}</span>
                  </Link>
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-xs text-fg-muted">
                  {t.claim_category ?? "—"}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                  <span className={gradeColorClass(t.token_alignment_grade ?? "")}>
                    {t.token_alignment_grade ?? "—"}
                  </span>
                  <span className="text-fg-muted text-xs ml-1.5">
                    {t.token_alignment_factor != null
                      ? `${(t.token_alignment_factor * 100).toFixed(0)}%`
                      : ""}
                  </span>
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                  <span className={gradeColorClass(t.ke_grade ?? "")}>{t.ke_grade ?? "—"}</span>
                  <span className="text-fg-muted text-xs ml-1.5">
                    {t.ke != null ? `${(t.ke * 100).toFixed(0)}%` : ""}
                  </span>
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg">
                  {t.ss_pe != null ? `${t.ss_pe.toFixed(2)}×` : "—"}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg">
                  {t.implied_token_value != null ? fmtUsd(t.implied_token_value) : "—"}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums">
                  {t.implied_value_vs_market_cap != null ? (
                    <span
                      className={
                        t.implied_value_vs_market_cap >= 1 ? "text-positive" : "text-negative"
                      }
                    >
                      {t.implied_value_vs_market_cap.toFixed(2)}×
                    </span>
                  ) : (
                    <span className="text-fg-faint">—</span>
                  )}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                  {t.implied_value_vs_fdv != null ? `${t.implied_value_vs_fdv.toFixed(2)}×` : "—"}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                  {t.flags}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="pt-6 mt-8 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          Engine: <code className="text-fg-muted">scripts/tg/token-grading.js</code> · evidence
          pipeline: <code className="text-fg-muted">scripts/tg/token-grade-check.js</code> ·
          regression: <code className="text-fg-muted">node scripts/tg/compute-tg.js --check</code>.
          Market caps refresh with the data cron; grade inputs change only through applied,
          sourced evidence.
        </p>
      </footer>
    </div>
  );
}
