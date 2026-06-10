import type { NpProtocol } from "@/lib/data";
import { npHeadlineTokens, npHeadlineUsd } from "@/lib/data";
import { fmtPct, fmtTokensSigned, fmtUsdSigned } from "@/lib/format";

const WINDOWS: Array<keyof NpProtocol["rollups"]> = ["24h", "7d", "30d", "90d"];

export function TpRollupGrid({ np }: { np: NpProtocol }) {
  const totalSupply =
    np.static_reference?.circulating_supply?.total_supply || 0;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {WINDOWS.map((w) => {
        const r = np.rollups[w];
        if (!r) return null;
        const usd = npHeadlineUsd(r);
        const tokens = npHeadlineTokens(r) ?? 0;
        const positive = tokens > 0;
        const colorCls = positive ? "text-negative" : "text-positive";
        const pctSupply = totalSupply > 0 ? tokens / totalSupply : 0;
        const weightedDiverges =
          usd != null && Math.abs(usd - r.net_pressure_usd) > 1e6;
        return (
          <div key={w}>
            <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-1">
              {w}
              {!r.coverage_complete && (
                <span className="ml-1 text-amber-500" title={`buyback coverage ${Math.round(r.buyback_coverage_pct * 100)}%`}>⚠</span>
              )}
            </p>
            <p className={`text-lg ${colorCls}`}>
              {fmtUsdSigned(usd ?? 0)}
            </p>
            <p className="text-xs text-fg-muted mt-0.5">
              {fmtTokensSigned(tokens)} {np.symbol} · {fmtPct(pctSupply, 3)}
            </p>
            {weightedDiverges && (
              <p className="text-[11px] text-fg-muted mt-0.5">
                sell-weighted: {fmtUsdSigned(r.net_pressure_usd)}
              </p>
            )}
            <p className="text-[11px] text-fg-muted mt-1">
              {r.net_pressure_usd_method === "per_day_price"
                ? `USD: per-day (${Math.round(r.daily_price_coverage_pct * 100)}%)`
                : "USD: today's price"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
