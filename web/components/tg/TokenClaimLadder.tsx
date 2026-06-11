"use client";

import { CLAIM_LADDER } from "@/lib/token-grading";
import { fmtUsd } from "@/lib/format";

// The claim ladder — five rungs from narrative token to full equity.
// Clicking a rung (token-discount mode) loads its default alignment + Ke.

export function TokenClaimLadder({
  selectedKey,
  currentKey,
  impliedBykey,
  onSelect,
  disabled
}: {
  selectedKey: string;
  currentKey: string; // the token's actual graded category
  impliedBykey: Record<string, number | null>; // rung key → implied value
  onSelect: (key: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      {[...CLAIM_LADDER].reverse().map((rung) => {
        const selected = rung.key === selectedKey;
        const isCurrent = rung.key === currentKey;
        const implied = impliedBykey[rung.key];
        return (
          <button
            key={rung.key}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(rung.key)}
            className={`w-full text-left border rounded-md px-3 py-2.5 transition flex items-baseline gap-3 flex-wrap ${
              selected
                ? "border-accent bg-accent/5"
                : "border-line hover:border-fg-muted"
            } ${disabled ? "opacity-60 cursor-default" : "cursor-pointer"}`}
          >
            <span className="flex-1 min-w-48">
              <span className="block text-sm text-fg">
                {rung.category}
                {isCurrent && (
                  <span className="ml-2 text-[9px] uppercase tracking-widest text-accent border border-accent/40 rounded-full px-1.5 py-0.5">
                    current grade
                  </span>
                )}
              </span>
              <span className="block text-[11px] text-fg-muted mt-0.5">{rung.description}</span>
            </span>
            <span className="font-mono tabular-nums text-[11px] text-fg-muted">
              align {(rung.default_alignment * 100).toFixed(0)}% · Ke {(rung.default_ke * 100).toFixed(1)}%
            </span>
            <span className="font-mono tabular-nums text-sm text-fg w-20 text-right">
              {implied != null ? fmtUsd(implied) : "—"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
