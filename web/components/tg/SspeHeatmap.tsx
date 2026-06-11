"use client";

import { calculateSSPE } from "@/lib/token-grading";

// SS-PE = (1 − g/ROE)/(Ke − g) across Ke (rows) × g (columns) at the
// current ROE. The active (Ke, g) cell is outlined. Unstable cells (Ke ≤ g)
// render as "—".

const KE_STEPS = [0.14, 0.18, 0.22, 0.26, 0.3, 0.34, 0.38, 0.42];
const G_STEPS = [0.01, 0.02, 0.03, 0.035, 0.04, 0.05, 0.06];

function cellColor(v: number | null, max: number): string {
  if (v == null || v <= 0) return "transparent";
  const t = Math.min(v / max, 1);
  return `rgba(132, 167, 108, ${0.08 + t * 0.55})`;
}

export function SspeHeatmap({ roe, ke, g }: { roe: number; ke: number; g: number }) {
  const grid = KE_STEPS.map((k) => G_STEPS.map((gg) => calculateSSPE(roe, k, gg)));
  const max = Math.max(...grid.flat().map((v) => (v != null && v > 0 ? v : 0)), 1);
  const nearestKe = KE_STEPS.reduce((a, b) => (Math.abs(b - ke) < Math.abs(a - ke) ? b : a));
  const nearestG = G_STEPS.reduce((a, b) => (Math.abs(b - g) < Math.abs(a - g) ? b : a));

  return (
    <div className="overflow-x-auto">
      <table className="text-[11px] font-mono tabular-nums border-separate border-spacing-0.5">
        <thead>
          <tr>
            <th className="text-left text-fg-muted font-normal pr-2 pb-1">Ke ↓ · g →</th>
            {G_STEPS.map((gg) => (
              <th key={gg} className="text-fg-muted font-normal px-1.5 pb-1">
                {(gg * 100).toFixed(1)}%
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {KE_STEPS.map((k, i) => (
            <tr key={k}>
              <td className="text-fg-muted pr-2">{(k * 100).toFixed(0)}%</td>
              {G_STEPS.map((gg, j) => {
                const v = grid[i][j];
                const active = k === nearestKe && gg === nearestG;
                return (
                  <td
                    key={gg}
                    className={`text-center px-1.5 py-1 rounded-sm ${active ? "ring-1 ring-accent" : ""}`}
                    style={{ background: cellColor(v, max) }}
                    title={`Ke ${(k * 100).toFixed(0)}% · g ${(gg * 100).toFixed(1)}% · ROE ${(roe * 100).toFixed(0)}%`}
                  >
                    <span className={v == null || v <= 0 ? "text-fg-faint" : "text-fg"}>
                      {v == null || v <= 0 ? "—" : v.toFixed(1)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-fg-faint mt-1.5">
        At ROE {(roe * 100).toFixed(0)}%. Outlined cell ≈ current Ke/g. &quot;—&quot; = unstable (Ke ≤ g).
      </p>
    </div>
  );
}
