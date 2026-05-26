import type { NpProtocol } from "@/lib/data";
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
        const positive = r.net_pressure_tokens > 0;
        const colorCls = positive ? "text-rose-400" : "text-emerald-400";
        const pctSupply = totalSupply > 0 ? r.net_pressure_tokens / totalSupply : 0;
        return (
          <div key={w}>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
              {w}
              {!r.coverage_complete && (
                <span className="ml-1 text-amber-500" title={`buyback coverage ${Math.round(r.buyback_coverage_pct * 100)}%`}>⚠</span>
              )}
            </p>
            <p className={`text-lg ${colorCls}`}>
              {fmtTokensSigned(r.net_pressure_tokens)} {np.symbol}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {fmtUsdSigned(r.net_pressure_usd)} · {fmtPct(pctSupply, 3)}
            </p>
            {r.net_pressure_usd_gross != null &&
              Math.abs(r.net_pressure_usd_gross - r.net_pressure_usd) > 1e6 && (
                <p className="text-[10px] text-zinc-600 mt-0.5">
                  gross (100% sell): {fmtUsdSigned(r.net_pressure_usd_gross)}
                </p>
              )}
            <p className="text-[10px] text-zinc-600 mt-1">
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
