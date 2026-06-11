"use client";

import { gradeColorClass } from "@/lib/token-grading";

// Ke build-up as a transparent waterfall: each premium stacks on the
// risk-free base until the total cost of equity.

const COMPONENT_LABELS: Array<{ key: string; label: string }> = [
  { key: "risk_free_rate", label: "Risk-free rate" },
  { key: "equity_risk_premium", label: "Equity risk premium" },
  { key: "crypto_liquidity_premium", label: "Crypto / liquidity" },
  { key: "regulatory_premium", label: "Regulatory" },
  { key: "custody_operational_premium", label: "Custody / ops" },
  { key: "governance_supply_premium", label: "Governance / supply" },
  { key: "economic_alignment_premium", label: "Economic alignment" },
  { key: "technical_reconciliation_premium", label: "Technical / reconciliation" }
];

export function KeBuildUpWaterfall({
  buildUp,
  ke,
  keGrade
}: {
  buildUp: Record<string, number>;
  ke: number;
  keGrade: string;
}) {
  let running = 0;
  const rows = COMPONENT_LABELS.map(({ key, label }) => {
    const value = buildUp[key] ?? 0;
    const start = running;
    running += value;
    return { key, label, value, start };
  });
  const max = Math.max(running, 0.0001);

  return (
    <div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-3">
            <span className="w-44 shrink-0 text-[11px] text-fg-muted truncate">{r.label}</span>
            <div className="flex-1 h-4 relative">
              <div
                className="absolute h-full rounded-sm bg-accent/70"
                style={{
                  left: `${(r.start / max) * 100}%`,
                  width: `${Math.max((r.value / max) * 100, 0.5)}%`
                }}
              />
            </div>
            <span className="w-14 text-right font-mono tabular-nums text-[11px] text-fg">
              {(r.value * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-line">
        <span className="w-44 shrink-0 text-xs text-fg font-medium">Ke — cost of equity</span>
        <div className="flex-1" />
        <span className={`font-mono tabular-nums text-sm font-semibold ${gradeColorClass(keGrade)}`}>
          {(ke * 100).toFixed(1)}% · grade {keGrade}
        </span>
      </div>
    </div>
  );
}
