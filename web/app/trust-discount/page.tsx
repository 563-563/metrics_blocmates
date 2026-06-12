import { TG_SYMBOLS, getTokenGrade, tgLatest } from "@/lib/tg-data";
import { hm } from "@/lib/data";
import {
  applyClarityScenario,
  calculateSSPE,
  calculateTokenValue,
  fullEquityKe,
  trustDiscount
} from "@/lib/token-grading";
import { PageHeader } from "@/components/PageHeader";
import { HowToRead } from "@/components/HowToRead";
import { type TdRow, type TdRegimeValues } from "@/components/tg/TrustDiscountTable";
import { TrustDiscountDashboard } from "@/components/tg/TrustDiscountDashboard";
import { TrustDiscountExplainer } from "@/components/tg/TrustDiscountExplainer";
import type { TokenGrade } from "@/lib/tg-data";

export const revalidate = 300;

// Both regimes are derived server-side from each token's grade file; the
// client toggle just switches which set renders.
function regimeValues(grade: TokenGrade, clarity: boolean): TdRegimeValues {
  const cleanEarnings = grade.business.clean_platform_earnings;
  const roe = grade.capital_efficiency.underwriting_roe;
  const g = grade.growth.terminal_g;
  const buildUp = clarity
    ? applyClarityScenario(grade.ke_build_up as unknown as Record<string, number>)
    : (grade.ke_build_up as unknown as Record<string, number>);
  const ke = buildUp.ke;
  const sspe = calculateSSPE(roe, ke, g);
  const implied = calculateTokenValue(cleanEarnings, grade.token.token_alignment_factor, sspe);
  const impliedFullEquity = calculateTokenValue(
    cleanEarnings,
    1.0,
    calculateSSPE(roe, fullEquityKe(clarity), g)
  );
  return {
    ke,
    ss_pe: sspe,
    implied,
    implied_full_equity: impliedFullEquity,
    trust_discount: trustDiscount(implied, impliedFullEquity)
  };
}

export default function TrustDiscountIndex() {
  const rows: TdRow[] = TG_SYMBOLS.map((sym) => {
    const grade = getTokenGrade(sym)!;
    const hmP = hm.protocols.find(
      (p) => p.slug === (grade as { hm_slug?: string }).hm_slug || p.symbol === grade.symbol
    );
    return {
      symbol: grade.symbol,
      project: grade.project,
      image: hmP?.image ?? null,
      claim_category: grade.token.claim_category,
      alignment_grade: grade.token.token_alignment_grade,
      alignment_factor: grade.token.token_alignment_factor,
      ke_grade: grade.ke_build_up.ke_grade,
      market_cap: grade.valuation.market_cap,
      flags: grade.flags.length,
      base: regimeValues(grade, false),
      clarity: regimeValues(grade, true)
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="Trust Discount"
        description="How much value a token forfeits because holders can't trust they'll receive the business's economics."
        meta={`As of ${tgLatest.generated_at.slice(0, 10)} · ${rows.length} tokens graded`}
      />

      <HowToRead>
        <p className="mb-3">
          <strong className="text-fg">
            Trust Discount = 1 − (implied value at the current claim) ÷ (implied value as full
            equity)
          </strong>
          . Both sides hold the business constant — revenue, margins, growth — and change only
          the wrapper. 0% = the token is effectively a share; 100% = the token owns none of the
          business it points at. Every point of the discount is fixable by governance: bind the
          claim, route the revenue, transfer the rights.
        </p>
        <p>
          The <strong className="text-fg">CLARITY Act toggle</strong> re-prices the cohort under
          statutory SEC/CFTC clarity: the regulatory, liquidity, and custody premia compress in
          every Ke build-up (benchmark included), but alignment itself doesn&apos;t move — the law
          can&apos;t turn on a fee switch. Each token&apos;s page breaks down premium-by-premium
          what the law changes.
        </p>
        <TrustDiscountExplainer />
      </HowToRead>

      <TrustDiscountDashboard rows={rows} />

      <footer className="pt-6 mt-8 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          Engine: <code className="text-fg-muted">scripts/tg/token-grading.js</code> · evidence
          pipeline: <code className="text-fg-muted">scripts/tg/token-grade-check.js</code> ·
          regression: <code className="text-fg-muted">node scripts/tg/compute-tg.js --check</code>.
          Revenue, alignment, and market data re-bind to the live pipeline on every cron run;
          grade inputs change only through applied, sourced evidence.
        </p>
      </footer>
    </div>
  );
}
