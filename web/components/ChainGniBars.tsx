"use client";

import { CHAIN_COLORS } from "@/lib/chain-colors";
import type { ChainGni } from "@/lib/chain-aggregates";

// GDP vs GNI — how much of each chain's output stays in the on-chain
// economy (app revenue) vs leaves it as stablecoin-issuer reserve yield
// (Circle / Tether). The country analogy: GDP counts what's produced on
// your soil; GNI is what your residents actually keep.

const RETAINED = "#6B9A4F"; // matches the sinks/buy-side green used elsewhere
const EXPORTED = "#B65854"; // matches the sources/sell-side red

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

export function ChainGniBars({
  rows,
  chainNames,
  windowDays
}: {
  rows: ChainGni[];
  chainNames: Record<string, string>;
  windowDays: number;
}) {
  if (rows.length === 0) {
    return <p className="text-xs text-fg-muted py-6 text-center">No history yet.</p>;
  }
  return (
    <div>
      <div className="flex items-center gap-4 mb-3 text-[11px] text-fg-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: RETAINED }} />
          retained on-chain (app revenue)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: EXPORTED }} />
          exported to issuers (Circle / Tether reserve yield)
        </span>
        <span className="ml-auto">{windowDays}d window</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => {
          const total = r.retainedUsd + r.exportedUsd;
          const expPct = r.exportedPct * 100;
          return (
            <div key={r.slug} className="flex items-center gap-3">
              <span className="w-28 shrink-0 flex items-center gap-1.5 text-xs text-fg truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: CHAIN_COLORS[r.slug] || "#71717a" }}
                />
                {chainNames[r.slug] ?? r.slug}
              </span>
              <div
                className="flex-1 h-5 rounded-sm overflow-hidden flex"
                title={`${chainNames[r.slug] ?? r.slug}: retained ${fmt(r.retainedUsd)} · exported ${fmt(r.exportedUsd)} (${expPct.toFixed(0)}%)`}
              >
                <div style={{ width: `${100 - expPct}%`, background: RETAINED, opacity: 0.85 }} />
                <div style={{ width: `${expPct}%`, background: EXPORTED, opacity: 0.85 }} />
              </div>
              <span className="w-16 shrink-0 text-right font-mono tabular-nums text-xs text-fg">
                {expPct.toFixed(0)}%
              </span>
              <span className="w-20 shrink-0 text-right font-mono tabular-nums text-[11px] text-fg-muted">
                {fmt(total)}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-fg-faint mt-3 leading-relaxed">
        % = share of {windowDays}d GDP exported. Right column = total {windowDays}d GDP. A high
        exported share means the chain&apos;s measured output is mostly an issuer&apos;s reserve
        yield passing through — a remittance economy, not a domestic one.
      </p>
    </div>
  );
}
