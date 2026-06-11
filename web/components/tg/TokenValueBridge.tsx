"use client";

import { fmtUsd } from "@/lib/format";

// The value bridge: trusted revenue → clean earnings → token earnings →
// implied token value. Each bar is sized vs the largest step so the
// "leakage" at each stage is visible at a glance.

export function TokenValueBridge({
  trustedRevenue,
  cleanEarnings,
  tokenEarnings,
  impliedValue,
  marketCap,
  fdv
}: {
  trustedRevenue: number;
  cleanEarnings: number;
  tokenEarnings: number;
  impliedValue: number | null;
  marketCap: number | null;
  fdv: number | null;
}) {
  const steps = [
    { label: "Trusted revenue", value: trustedRevenue, color: "#6B9A4F", note: "run-rate × durability" },
    { label: "Clean platform earnings", value: cleanEarnings, color: "#84A76C", note: "× clean conversion" },
    { label: "Token-attributable earnings", value: tokenEarnings, color: "#CDA24A", note: "× token alignment" },
    { label: "Implied token value", value: impliedValue, color: "#818cf8", note: "× SS-PE" }
  ];
  const max = Math.max(...steps.map((s) => s.value ?? 0), marketCap ?? 0, 1);

  return (
    <div>
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-52 shrink-0 text-[11px] text-fg-muted">
              {s.label}
              <span className="block text-[10px] text-fg-faint">{s.note}</span>
            </span>
            <div className="flex-1 h-5 relative">
              <div
                className="h-full rounded-sm"
                style={{
                  width: `${Math.max(((s.value ?? 0) / max) * 100, 0.6)}%`,
                  background: s.color,
                  opacity: 0.85
                }}
              />
            </div>
            <span className="w-20 text-right font-mono tabular-nums text-xs text-fg">
              {s.value != null ? fmtUsd(s.value) : "unstable"}
            </span>
          </div>
        ))}
      </div>

      {(marketCap != null || fdv != null) && (
        <div className="mt-4 pt-3 border-t border-line flex flex-wrap gap-x-8 gap-y-1 text-xs">
          {marketCap != null && (
            <span>
              <span className="text-fg-muted">vs market cap {fmtUsd(marketCap)}: </span>
              <span className="font-mono tabular-nums text-fg">
                {impliedValue != null ? `${(impliedValue / marketCap).toFixed(2)}×` : "—"}
              </span>
            </span>
          )}
          {fdv != null && (
            <span>
              <span className="text-fg-muted">vs FDV {fmtUsd(fdv)}: </span>
              <span className="font-mono tabular-nums text-fg">
                {impliedValue != null ? `${(impliedValue / fdv).toFixed(2)}×` : "—"}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
