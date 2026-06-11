"use client";

import { fmtUsd } from "@/lib/format";
import { assignROEGrade, gradeColorClass } from "@/lib/token-grading";
import { SliderRow } from "./SliderRow";

// Capital efficiency: clean earnings against several denominators, plus the
// chosen underwriting ROE (the one SS-PE actually uses).

export function RoeModule({
  cleanEarnings,
  activeCapital,
  operatingTreasury,
  totalAssetBase,
  underwritingRoe,
  onRoeChange,
  disabled
}: {
  cleanEarnings: number;
  activeCapital: number | null;
  operatingTreasury: number | null;
  totalAssetBase: number | null;
  underwritingRoe: number;
  onRoeChange: (v: number) => void;
  disabled?: boolean;
}) {
  const grade = assignROEGrade(underwritingRoe);
  const rows = [
    { label: "Active inventory ROE", denom: activeCapital },
    { label: "Operating treasury ROE", denom: operatingTreasury },
    { label: "Total asset ROE", denom: totalAssetBase }
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        {rows.map((r) => (
          <div key={r.label}>
            <p className="text-[10px] uppercase tracking-widest text-fg-muted">{r.label}</p>
            <p className="font-mono tabular-nums text-base text-fg mt-0.5">
              {r.denom && r.denom > 0 ? `${((cleanEarnings / r.denom) * 100).toFixed(0)}%` : "—"}
            </p>
            <p className="text-[10px] text-fg-faint">{r.denom ? `on ${fmtUsd(r.denom)}` : "no data"}</p>
          </div>
        ))}
      </div>

      <SliderRow
        label="Underwriting ROE"
        sub="the ROE SS-PE reinvests at — cap per business type"
        value={underwritingRoe}
        min={0.1}
        max={5}
        step={0.1}
        display={`${(underwritingRoe * 100).toFixed(0)}%`}
        onChange={onRoeChange}
        disabled={disabled}
      />

      <p className="text-xs">
        <span className="text-fg-muted">ROE grade: </span>
        <span className={`font-mono font-semibold ${gradeColorClass(grade)}`}>{grade}</span>
        <span className="text-fg-faint ml-3 text-[11px]">
          caps: marketplace 50–150% · high-turnover inventory 100–300% · software 100–500% · RWA/lending 10–50%
        </span>
      </p>
    </div>
  );
}
