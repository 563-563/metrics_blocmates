// Per-token version of the index explainer: the same three pictures, drawn
// with THIS token's actual numbers. Pure markup from computed grade fields —
// no client state, no recomputation.

import { fmtUsd } from "@/lib/format";
import type { TokenGrade } from "@/lib/tg-data";

const KE_COLORS: Record<string, string> = {
  risk_free_rate: "#94a3b8",
  equity_risk_premium: "#a8a29e",
  crypto_liquidity_premium: "#38bdf8",
  regulatory_premium: "#f59e0b",
  custody_operational_premium: "#fb923c",
  governance_supply_premium: "#a855f7",
  economic_alignment_premium: "#ef4444",
  technical_reconciliation_premium: "#71717a"
};
const KE_LABELS: Record<string, string> = {
  risk_free_rate: "T-bill",
  equity_risk_premium: "equity risk",
  crypto_liquidity_premium: "liquidity",
  regulatory_premium: "regulatory",
  custody_operational_premium: "custody",
  governance_supply_premium: "governance",
  economic_alignment_premium: "alignment",
  technical_reconciliation_premium: "technical"
};

export function TokenDiscountStory({ grade }: { grade: TokenGrade }) {
  const b = grade.business;
  const v = grade.valuation;
  const revenue = b.post_buyback_net_revenue;
  const clean = b.clean_platform_earnings;
  const slice = v.token_attributable_earnings;
  const implied = v.implied_token_value ?? 0;
  const fullEq = v.implied_full_equity ?? 0;
  const discount = v.trust_discount;
  const mcap = v.market_cap;

  if (!revenue || revenue <= 0) {
    return (
      <p className="text-xs text-fg-muted leading-relaxed">
        No measured revenue for {grade.symbol} yet (DefiLlama shows $0 for this protocol), so the
        value funnel and discount can&apos;t be drawn — the implied value is $0 by construction.
        See the flags below for why, and the evidence pipeline for how this gets fixed.
      </p>
    );
  }

  const funnelMax = Math.max(revenue, implied, 1);
  const funnel = [
    {
      label: "The business earns",
      value: revenue,
      color: "#6B9A4F",
      note: `${fmtUsd(revenue)} annual revenue (${b.revenue_run_rate_window} window, live from DefiLlama)`
    },
    {
      label: "After real costs",
      value: clean,
      color: "#84A76C",
      note: `${fmtUsd(clean)} clean earnings — ${(b.clean_conversion * 100).toFixed(0)}% clean conversion`
    },
    {
      label: "The token's slice",
      value: slice,
      color: "#CDA24A",
      note: `${fmtUsd(slice)} — the token receives ${(grade.token.token_alignment_factor * 100).toFixed(0)}% of clean earnings (grade ${grade.token.token_alignment_grade})`
    },
    {
      label: "Worth as this token",
      value: implied,
      color: "#818cf8",
      note: `${fmtUsd(implied)} — that slice × the ${v.ss_pe != null ? `${v.ss_pe.toFixed(2)}×` : "—"} multiple its ${(grade.ke_build_up.ke * 100).toFixed(1)}% Ke deserves`
    }
  ];

  const buildUp = grade.ke_build_up as unknown as Record<string, number>;
  const keParts = Object.keys(KE_LABELS)
    .map((key) => ({ key, pts: (buildUp[key] ?? 0) * 100 }))
    .filter((p) => p.pts > 0.01);
  const keTotal = grade.ke_build_up.ke * 100;

  const gapMax = Math.max(fullEq, implied, mcap ?? 0, 1);

  return (
    <div className="space-y-6">
      {/* 1 — the funnel, real numbers */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          1 · From {grade.project}&apos;s business to {grade.symbol}&apos;s value
        </p>
        <div className="space-y-1.5">
          {funnel.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-[11px] text-fg text-right">{s.label}</span>
              <div className="flex-1">
                <div
                  className="h-4 rounded-sm"
                  style={{
                    width: `${Math.max((s.value / funnelMax) * 100, 0.6)}%`,
                    background: s.color,
                    opacity: 0.85
                  }}
                />
              </div>
              <span className="w-72 shrink-0 text-[10px] text-fg-muted leading-tight hidden md:block">
                {s.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2 — this token's risk stack */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          2 · {grade.symbol}&apos;s risk stack — Ke {(keTotal).toFixed(1)}% (grade {grade.ke_build_up.ke_grade})
        </p>
        <div className="flex h-6 rounded-sm overflow-hidden mb-1.5">
          {keParts.map((p) => (
            <div
              key={p.key}
              title={`${KE_LABELS[p.key]}: ${p.pts.toFixed(1)}pts`}
              style={{ width: `${(p.pts / keTotal) * 100}%`, background: KE_COLORS[p.key], opacity: 0.85 }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
          {keParts.map((p) => (
            <span key={p.key} className="flex items-center gap-1 text-[10px] text-fg-muted">
              <span className="w-2 h-2 rounded-sm" style={{ background: KE_COLORS[p.key] }} />
              {KE_LABELS[p.key]} {p.pts.toFixed(1)}%
            </span>
          ))}
        </div>
        <p className="text-[10px] text-fg-muted leading-relaxed">
          A real share of stock stops near 9%; a perfect token stops near 14.5%. Everything above
          that in {grade.symbol}&apos;s stack is risk the market charges this specific design —
          the CLARITY scenario below shows which slices a statute could shrink.
        </p>
      </div>

      {/* 3 — the gap, with the market's actual price for context */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          3 · The Trust Discount — {discount != null ? `${(discount * 100).toFixed(0)}%` : "n/a"}
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-[11px] text-fg text-right">As equity</span>
            <div className="flex-1">
              <div className="h-5 rounded-sm bg-positive/70" style={{ width: `${(fullEq / gapMax) * 100}%` }} />
            </div>
            <span className="w-24 shrink-0 font-mono tabular-nums text-[11px] text-fg">{fmtUsd(fullEq)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-[11px] text-fg text-right">As this token</span>
            <div className="flex-1 relative">
              <div className="h-5 rounded-sm bg-accent/80" style={{ width: `${Math.max((implied / gapMax) * 100, 0.6)}%` }} />
              {discount != null && discount > 0.05 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-[10px] text-negative font-medium whitespace-nowrap"
                  style={{ left: `${Math.min((implied / gapMax) * 100 + 2, 60)}%` }}
                >
                  ← the missing {(discount * 100).toFixed(0)}% is the Trust Discount
                </span>
              )}
            </div>
            <span className="w-24 shrink-0 font-mono tabular-nums text-[11px] text-fg">{fmtUsd(implied)}</span>
          </div>
          {mcap != null && (
            <div className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-[11px] text-fg-muted text-right">Market pays</span>
              <div className="flex-1">
                <div
                  className="h-5 rounded-sm border border-fg-muted/50 bg-fg-faint/20"
                  style={{ width: `${Math.max((mcap / gapMax) * 100, 0.6)}%` }}
                />
              </div>
              <span className="w-24 shrink-0 font-mono tabular-nums text-[11px] text-fg-muted">{fmtUsd(mcap)}</span>
            </div>
          )}
        </div>
        <p className="text-[10px] text-fg-muted mt-2 leading-relaxed">
          Same business, two prices: {fmtUsd(fullEq)} if {grade.symbol} were a real share,{" "}
          {fmtUsd(implied)} as the claim it actually is.
          {mcap != null && implied > 0 && (
            <>
              {" "}The market currently pays {fmtUsd(mcap)} —{" "}
              {mcap > implied
                ? `a premium over the graded claim (betting on growth or future alignment)`
                : `below the graded claim's value`}
              .
            </>
          )}{" "}
          Every point of the discount is a design choice governance could change — the claim
          ladder below shows what each step is worth.
        </p>
      </div>
    </div>
  );
}
