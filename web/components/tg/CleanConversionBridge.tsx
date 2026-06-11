"use client";

import { fmtUsd } from "@/lib/format";
import { assignCleanConversionGrade, gradeColorClass } from "@/lib/token-grading";
import { SliderRow } from "./SliderRow";

// Business quality: run-rate window, durability haircut, clean conversion —
// the bridge from post-buyback net revenue to clean platform earnings.

export function CleanConversionBridge({
  windows,
  selectedWindow,
  onWindowChange,
  durabilityAdj,
  onDurabilityChange,
  cleanConversion,
  onCleanConversionChange,
  runRate,
  trustedRevenue,
  cleanEarnings,
  disabled
}: {
  windows: Array<{ key: string; value: number }>;
  selectedWindow: string;
  onWindowChange: (key: string) => void;
  durabilityAdj: number;
  onDurabilityChange: (v: number) => void;
  cleanConversion: number;
  onCleanConversionChange: (v: number) => void;
  runRate: number;
  trustedRevenue: number;
  cleanEarnings: number;
  disabled?: boolean;
}) {
  const grade = assignCleanConversionGrade(cleanConversion);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-fg w-44 shrink-0">
          Revenue run-rate
          <span className="block text-[10px] text-fg-muted">annualized window</span>
        </span>
        <span className="inline-flex border border-line rounded overflow-hidden">
          {windows.map((w, i) => (
            <button
              key={w.key}
              type="button"
              disabled={disabled}
              onClick={() => onWindowChange(w.key)}
              className={`px-2.5 py-1 text-[11px] transition ${i > 0 ? "border-l border-line" : ""} ${
                selectedWindow === w.key ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"
              } ${disabled ? "opacity-50 cursor-default" : ""}`}
            >
              {w.key}
            </button>
          ))}
        </span>
        <span className="font-mono tabular-nums text-sm text-fg ml-auto">{fmtUsd(runRate)}/yr</span>
      </div>

      <SliderRow
        label="Durability adjustment"
        sub="haircut for retention / concentration / volatility"
        value={durabilityAdj}
        min={0.3}
        max={1}
        step={0.05}
        display={`×${durabilityAdj.toFixed(2)}`}
        onChange={onDurabilityChange}
        disabled={disabled}
      />
      <SliderRow
        label="Clean conversion"
        sub="% of net revenue that becomes clean earnings"
        value={cleanConversion}
        min={0.1}
        max={0.95}
        step={0.01}
        display={`${(cleanConversion * 100).toFixed(0)}%`}
        onChange={onCleanConversionChange}
        disabled={disabled}
      />

      <div className="pt-3 border-t border-line grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Trusted revenue</p>
          <p className="font-mono tabular-nums text-base text-fg mt-0.5">{fmtUsd(trustedRevenue)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Clean earnings</p>
          <p className="font-mono tabular-nums text-base text-fg mt-0.5">{fmtUsd(cleanEarnings)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">Conversion grade</p>
          <p className={`font-mono text-base font-semibold mt-0.5 ${gradeColorClass(grade)}`}>{grade}</p>
        </div>
      </div>
    </div>
  );
}
