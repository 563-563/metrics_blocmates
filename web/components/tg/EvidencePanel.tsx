"use client";

import type { TgEvidence } from "@/lib/tg-data";

// Evidence backing the grade inputs — claim, source link, confidence,
// direction. Populated by scripts/tg/token-grade-check.js apply.

const DIR_CLS: Record<string, string> = {
  positive: "text-positive",
  negative: "text-negative",
  neutral: "text-fg-muted"
};

export function EvidencePanel({ evidence }: { evidence: TgEvidence[] }) {
  if (!evidence || evidence.length === 0) {
    return (
      <p className="text-xs text-fg-muted">
        No evidence on file yet — run{" "}
        <code className="text-fg-muted">node scripts/tg/token-grade-check.js prompt</code> and apply
        the answer.
      </p>
    );
  }
  return (
    <div className="space-y-2.5">
      {evidence.map((e, i) => (
        <div key={`${e.field}-${i}`} className="border border-line rounded-md px-3 py-2.5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <span className="text-[10px] uppercase tracking-widest text-fg-faint font-mono">
              {e.field}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-fg-muted">
              {e.direction && <span className={`${DIR_CLS[e.direction] ?? ""} mr-2`}>{e.direction}</span>}
              confidence: {e.confidence} · {e.updated_at.slice(0, 10)}
            </span>
          </div>
          <p className="text-sm text-fg mt-1">{e.claim}</p>
          <a
            href={e.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-accent hover:text-fg transition break-all"
          >
            {e.source_url}
          </a>
        </div>
      ))}
    </div>
  );
}
