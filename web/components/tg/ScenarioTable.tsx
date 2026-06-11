"use client";

import { fmtUsd } from "@/lib/format";
import type { TgScenarioOperating, TgScenarioTokenDiscount } from "@/lib/tg-data";

// Pre-computed scenario tables from the pipeline (compute-tg.js) — the
// published reference points, independent of whatever the user has dialed
// into the explorer above.

export function ScenarioTable({
  operating,
  tokenDiscount
}: {
  operating: TgScenarioOperating[];
  tokenDiscount: TgScenarioTokenDiscount[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-2">
          Operating mode — token design held constant
        </p>
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-fg-muted">
              <th className="text-left font-normal py-1.5">case</th>
              <th className="text-right font-normal py-1.5">clean conv</th>
              <th className="text-right font-normal py-1.5">ROE</th>
              <th className="text-right font-normal py-1.5">g</th>
              <th className="text-right font-normal py-1.5">SS-PE</th>
              <th className="text-right font-normal py-1.5">implied</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {operating.map((s) => (
              <tr key={s.name}>
                <td className="py-1.5 border-t border-line-faint text-fg capitalize">{s.name}</td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg-muted">
                  {(s.clean_conversion * 100).toFixed(0)}%
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg-muted">
                  {(s.underwriting_roe * 100).toFixed(0)}%
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg-muted">
                  {(s.terminal_g * 100).toFixed(1)}%
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg">
                  {s.ss_pe != null ? `${s.ss_pe.toFixed(2)}×` : "—"}
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg">
                  {s.implied_token_value != null ? fmtUsd(s.implied_token_value) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-2">
          Token-discount mode — business held constant
        </p>
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-fg-muted">
              <th className="text-left font-normal py-1.5">token state</th>
              <th className="text-right font-normal py-1.5">align</th>
              <th className="text-right font-normal py-1.5">Ke</th>
              <th className="text-right font-normal py-1.5">SS-PE</th>
              <th className="text-right font-normal py-1.5">implied</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {tokenDiscount.map((s) => (
              <tr key={s.key}>
                <td className="py-1.5 border-t border-line-faint text-fg">{s.category}</td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg-muted">
                  {(s.token_alignment_factor * 100).toFixed(0)}%
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg-muted">
                  {(s.ke * 100).toFixed(1)}%
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg">
                  {s.ss_pe != null ? `${s.ss_pe.toFixed(2)}×` : "—"}
                </td>
                <td className="py-1.5 border-t border-line-faint text-right text-fg">
                  {s.implied_token_value != null ? fmtUsd(s.implied_token_value) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
