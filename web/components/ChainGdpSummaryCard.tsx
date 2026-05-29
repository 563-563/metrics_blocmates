import Link from "next/link";
import type { ChainSummary } from "@/lib/chains";
import { fmtUsd } from "@/lib/format";

// Compact card showing the chain-side lens for a protocol token whose
// underlying L1/L2 we also track. Renders on /hyperliquid/hm to surface
// the dual lens — HYPE the protocol token AND Hyperliquid the chain.
export function ChainGdpSummaryCard({ chain }: { chain: ChainSummary }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm">
        <Stat
          label="Chain GDP · 30d"
          value={fmtUsd(chain.gdp_30d_usd)}
          sub={`annualized ${fmtUsd(chain.gdp_annualized_usd)}`}
        />
        <Stat
          label="GDP Multiple"
          value={chain.gdp_multiple != null ? `${chain.gdp_multiple.toFixed(1)}×` : "—"}
          sub="mcap ÷ annualized GDP"
        />
        <Stat
          label="REV · 30d"
          value={chain.rev_30d_usd > 0 ? fmtUsd(chain.rev_30d_usd) : "—"}
          sub="validator / sequencer fees"
        />
        <Stat
          label="TVL"
          value={chain.tvl_usd != null ? fmtUsd(chain.tvl_usd) : "—"}
          sub={`${chain.protocol_count} apps`}
        />
      </div>

      {chain.structural_note && (
        <div className="mt-5 rounded-md border border-accent/40 bg-accent-soft/40 px-3 py-2.5 text-xs text-accent leading-relaxed">
          <span className="font-medium">⚠ Structural note · </span>
          {chain.structural_note}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-line flex items-baseline justify-between gap-3">
        <p className="text-xs text-fg-muted leading-relaxed">
          The same token tracked here as a protocol (Holder Multiple) is also
          the native asset of a chain (Chain GDP / GDP Multiple). Two valuation lenses,
          same asset.
        </p>
        <Link
          href={`/chains/${chain.slug}`}
          className="shrink-0 text-xs text-fg-muted hover:text-white transition border border-line hover:border-fg-muted rounded px-2.5 py-1"
        >
          Full chain view →
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-1">{label}</p>
      <p className="text-base text-fg tabular-nums">{value}</p>
      {sub && <p className="text-[11px] text-fg-muted mt-0.5">{sub}</p>}
    </div>
  );
}
