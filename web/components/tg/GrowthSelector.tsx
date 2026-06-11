"use client";

import { SliderRow } from "./SliderRow";

// Terminal growth — the g that SS-PE uses. Near-term growth deliberately
// does NOT feed the formula; it informs the score only.

const SCORE_BANDS = [
  { score: 0, label: "shrinking / fad risk", g: "0–1%" },
  { score: 1, label: "low durability", g: "1–2%" },
  { score: 2, label: "mature / GDP-like", g: "2–3%" },
  { score: 3, label: "good durable growth", g: "3–4%" },
  { score: 4, label: "strong category + retention", g: "4–5.5%" },
  { score: 5, label: "exceptional network effect", g: "5.5–7%" }
];

export function GrowthSelector({
  terminalG,
  onGChange,
  nearTermScore,
  durabilityScore,
  disabled
}: {
  terminalG: number;
  onGChange: (v: number) => void;
  nearTermScore: number;
  durabilityScore: number;
  disabled?: boolean;
}) {
  const activeBand = SCORE_BANDS.findLast((b, i) => terminalG * 100 >= [0, 1, 2, 3, 4, 5.5][i]);
  return (
    <div className="space-y-4">
      <SliderRow
        label="Terminal g"
        sub="steady-state growth — used in SS-PE"
        value={terminalG}
        min={0}
        max={0.07}
        step={0.0025}
        display={`${(terminalG * 100).toFixed(2)}%`}
        onChange={onGChange}
        disabled={disabled}
      />
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-fg-muted">
        <span>
          near-term growth score: <span className="text-fg font-mono">{nearTermScore}/5</span>
        </span>
        <span>
          durability score: <span className="text-fg font-mono">{durabilityScore}/5</span>
        </span>
        {activeBand && (
          <span>
            band: <span className="text-fg">{activeBand.label}</span> ({activeBand.g})
          </span>
        )}
      </div>
      <p className="text-[11px] text-fg-faint leading-relaxed">
        Score guide: {SCORE_BANDS.map((b) => `${b.score} = ${b.label} (${b.g})`).join(" · ")}
      </p>
    </div>
  );
}
