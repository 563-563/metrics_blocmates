import type { UnlockRow } from "@/lib/tokenomics";
import { fmtTokens, fmtUsd } from "@/lib/format";

function label(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const BUCKET_COLORS: Record<string, string> = {
  genesis_distribution: "#10b981",
  core_contributors: "#f59e0b",
  future_emissions: "#6366f1",
  hyper_foundation: "#a78bfa",
  community_grants: "#22d3ee",
  hip2_hyperliquidity: "#64748b"
};

export function UpcomingUnlocksTable({
  schedule,
  priceUsd,
  symbol,
  limit = 10
}: {
  schedule: UnlockRow[];
  priceUsd: number;
  symbol: string;
  limit?: number;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = schedule
    .filter((r) => r.unlock_date >= today && r.amount_tokens > 0)
    .sort((a, b) => a.unlock_date.localeCompare(b.unlock_date))
    .slice(0, limit);

  if (upcoming.length === 0) {
    return (
      <p className="text-xs text-fg-muted py-6 text-center">
        No upcoming unlocks (fully circulating or beyond projected schedule).
      </p>
    );
  }

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-fg text-xs uppercase tracking-wider border-b border-line">
          <th className="text-left py-2 font-normal">Date</th>
          <th className="text-left py-2 font-normal">Bucket</th>
          <th className="text-right py-2 font-normal">Tokens</th>
          <th className="text-right py-2 font-normal">USD @ today</th>
        </tr>
      </thead>
      <tbody>
        {upcoming.map((u, i) => (
          <tr key={`${u.unlock_date}-${u.bucket}-${i}`} className="border-b border-line-faint">
            <td className="py-2 text-fg-muted">{u.unlock_date}</td>
            <td className="py-2 text-fg-muted">
              <span
                className="inline-block w-2 h-2 mr-2 rounded-sm align-middle"
                style={{ background: BUCKET_COLORS[u.bucket] ?? "#52525b" }}
              />
              {label(u.bucket)}
            </td>
            <td className="py-2 text-right text-fg-muted">
              {fmtTokens(u.amount_tokens)} {symbol}
            </td>
            <td className="py-2 text-right text-fg-muted">
              {fmtUsd(u.amount_tokens * priceUsd)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
