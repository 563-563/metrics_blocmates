import type { AllocationBucket } from "@/lib/tokenomics";
import { fmtPct, fmtTokens } from "@/lib/format";

const BUCKET_COLORS: Record<string, string> = {
  genesis_distribution: "#10b981",
  core_contributors: "#f59e0b",
  future_emissions: "#6366f1",
  hyper_foundation: "#a78bfa",
  community_grants: "#22d3ee",
  hip2_hyperliquidity: "#64748b"
};

function label(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function UnlockAllocationTable({
  buckets,
  symbol
}: {
  buckets: AllocationBucket[];
  symbol: string;
}) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-fg text-xs uppercase tracking-wider border-b border-line">
          <th className="text-left py-2 font-normal w-2/5">Bucket</th>
          <th className="text-left py-2 font-normal">Recipient</th>
          <th className="text-right py-2 font-normal">Tokens</th>
          <th className="text-right py-2 font-normal">% of supply</th>
        </tr>
      </thead>
      <tbody>
        {buckets.map((b) => (
          <tr key={b.key} className="border-b border-line-faint">
            <td className="py-2 text-fg-muted">
              <span
                className="inline-block w-2 h-2 mr-3 rounded-sm align-middle"
                style={{ background: BUCKET_COLORS[b.key] ?? "#52525b" }}
              />
              {b.label || label(b.key)}
            </td>
            <td className="py-2 text-fg-muted text-xs">
              {b.recipient_type ?? "—"}
            </td>
            <td className="py-2 text-right text-fg-muted">
              {fmtTokens(b.tokens)} {symbol}
            </td>
            <td className="py-2 text-right text-fg-muted">
              {fmtPct(b.pct, 2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
