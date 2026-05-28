import Link from "next/link";
import { chains, getChainHistory } from "@/lib/chains";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import { fmtUsd } from "@/lib/format";
import { ChainScaleBar } from "@/components/ChainScaleBar";
import { ChainTrendSparkline } from "@/components/ChainTrendSparkline";
import { ChartTeasers } from "@/components/ChartTeasers";
import { InfoTip } from "@/components/InfoTip";

export const revalidate = 300;

function gdpTvlClass(band: string | null): string {
  switch (band) {
    case "high":      return "text-emerald-300";
    case "med-high":  return "text-lime-300";
    case "med-low":   return "text-amber-300";
    case "low":       return "text-rose-300";
    default:          return "text-zinc-500";
  }
}
function revGdpClass(band: string | null): string {
  switch (band) {
    case "app-friendly": return "text-emerald-300";
    case "modest":       return "text-lime-300";
    case "heavy":        return "text-amber-300";
    case "extractive":   return "text-rose-300";
    default:             return "text-zinc-500";
  }
}
function fmtPctOrDash(v: number | null, dec = 1): string {
  return v == null ? "—" : `${(v * 100).toFixed(dec)}%`;
}
function fmtMultOrDash(v: number | null): string {
  return v == null ? "—" : `${v.toFixed(1)}×`;
}

export default function ChainsIndex() {
  const totalGdp30d = chains.chains.reduce((s, c) => s + (c.gdp_30d_usd || 0), 0);
  const totalTvl = chains.chains.reduce((s, c) => s + (c.tvl_usd || 0), 0);
  const totalMcap = chains.chains.reduce((s, c) => s + (c.mcap_usd || 0), 0);
  const trackedChains = chains.chains.length;

  const maxGdp = Math.max(...chains.chains.map((c) => c.gdp_30d_usd || 0));
  const maxMcap = Math.max(...chains.chains.map((c) => c.mcap_usd || 0));
  const maxTvl = Math.max(...chains.chains.map((c) => c.tvl_usd || 0));

  const sparklineData = new Map<string, number[]>();
  for (const c of chains.chains) {
    const hist = getChainHistory(c.slug).slice(-30);
    sparklineData.set(c.slug, hist.map((d) => d.gdp));
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-6 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">chains · GDP</h1>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <Link href="/" className="hover:text-zinc-200 transition">← protocols</Link>
            <Link href="/chains/charts" className="hover:text-zinc-200 transition">charts →</Link>
            <span>As of {chains.as_of}</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-2xl">
          <span className="text-zinc-300">Chain-GDP</span> = sum of <code>dailyRevenue</code> across
          apps on each chain, excluding the infrastructure layer (REV). Stablecoin issuer
          revenue (USDC/USDT) included; ETF and off-chain &quot;other&quot; are not.
        </p>
      </header>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6 text-sm">
        <Kpi label="Tracked" value={`${trackedChains}`} sub="chains" />
        <Kpi label="Σ GDP · 30d" value={fmtUsd(totalGdp30d)} />
        <Kpi label="Σ TVL" value={fmtUsd(totalTvl)} />
        <Kpi label="Σ native mcap" value={fmtUsd(totalMcap)} sub="ex no-native-token chains" />
      </div>

      {/* Chart teaser strip — clicks land on /chains/charts */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2.5">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
            Visual gallery — click for full charts
          </p>
          <Link href="/chains/charts" className="text-[11px] text-zinc-500 hover:text-zinc-200 transition">
            open gallery →
          </Link>
        </div>
        <ChartTeasers />
      </div>

      {/* Main detail table */}
      <section className="mb-10 border border-zinc-800 rounded-md bg-zinc-950 p-0">
        <div className="px-5 pt-4 pb-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500">
            All chains — detailed
            <InfoTip>
              Ranked by 30d GDP. Bars under GDP / Mcap / TVL are relative to the cohort max
              (chain-colored). 30d trend = daily GDP sparkline with a terminal dot colored
              by net direction.
            </InfoTip>
          </h2>
        </div>
        <div className="overflow-x-auto px-2 pb-2">
          <table className="w-full text-sm border-separate border-spacing-0 min-w-[1040px]">
            <thead>
              <tr className="text-zinc-500 text-[10px] uppercase tracking-widest">
                <th className="text-left font-normal py-2 px-2">Chain</th>
                <th className="text-right font-normal py-2 px-2 w-[140px]">GDP · 30d</th>
                <th className="text-left font-normal py-2 px-2 w-[100px]">30d trend</th>
                <th className="text-right font-normal py-2 px-2 w-[140px]">Mcap</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">GDP Mult.</th>
                <th className="text-right font-normal py-2 px-2 w-[140px]">TVL</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">GDP / TVL</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">REV / GDP</th>
                <th className="text-left font-normal py-2 px-2">Top app</th>
              </tr>
            </thead>
            <tbody>
              {chains.chains.map((c) => {
                const hasStruct = !!c.structural_note;
                const color = CHAIN_COLORS[c.slug] || "#71717a";
                const spark = sparklineData.get(c.slug) || [];
                const isStableTop = c.top_category === "Stablecoin Issuer";
                return (
                  <tr key={c.slug} className="border-zinc-900 group hover:bg-zinc-950/60 transition">
                    <td className="py-2.5 px-2 border-t border-zinc-900">
                      <Link href={`/chains/${c.slug}`} className="flex items-center gap-2.5">
                        {c.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={c.image}
                            alt=""
                            width={24}
                            height={24}
                            className="rounded-full bg-zinc-800 shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <span className="w-[24px] h-[24px] rounded-full bg-zinc-800 shrink-0" />
                        )}
                        <span>
                          <span className="block text-zinc-100 group-hover:text-white font-medium leading-tight">
                            {c.name}
                            {hasStruct && (
                              <span className="ml-1 text-amber-400/80" title={c.structural_note ?? ""}>
                                ⚠
                              </span>
                            )}
                          </span>
                          <span className="block text-[11px] text-zinc-500">
                            {c.symbol ? `$${c.symbol}` : <span className="text-zinc-600">no native</span>}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums text-zinc-100">
                      {fmtUsd(c.gdp_30d_usd)}
                      <ChainScaleBar value={c.gdp_30d_usd} max={maxGdp} color={color} />
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900">
                      <ChainTrendSparkline values={spark} color={color} />
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums text-zinc-300">
                      {c.mcap_usd != null ? fmtUsd(c.mcap_usd) : <span className="text-zinc-600">—</span>}
                      <ChainScaleBar value={c.mcap_usd} max={maxMcap} color={color} />
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums text-zinc-100">
                      {fmtMultOrDash(c.gdp_multiple)}
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums text-zinc-300">
                      {c.tvl_usd != null ? fmtUsd(c.tvl_usd) : <span className="text-zinc-600">—</span>}
                      <ChainScaleBar value={c.tvl_usd} max={maxTvl} color={color} />
                    </td>
                    <td className={`py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums ${gdpTvlClass(c.gdp_over_tvl_band)}`}>
                      {fmtPctOrDash(c.gdp_over_tvl_ann)}
                    </td>
                    <td className={`py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums ${revGdpClass(c.rev_over_gdp_band)}`}>
                      {fmtPctOrDash(c.rev_over_gdp_7d)}
                    </td>
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-zinc-300">
                      {c.top_protocol ? (
                        <span>
                          <span className={`${isStableTop ? "text-cyan-300" : "text-zinc-100"}`}>{c.top_protocol}</span>
                          {c.top_category && (
                            <span className="block text-[11px] text-zinc-500">{c.top_category}</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-zinc-900 text-[11px] text-zinc-500 leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
          <span><span className="text-zinc-400">GDP Multiple</span> = mcap ÷ annualized GDP</span>
          <span><span className="text-zinc-400">GDP / TVL</span> = capital productivity (annualized)</span>
          <span><span className="text-zinc-400">REV / GDP</span> = infrastructure tax burden (7d)</span>
          <span><span className="text-cyan-300">cyan top app</span> = stablecoin-issuer attribution</span>
          <span><span className="text-amber-400/80">⚠</span> = structural note (hover the chain)</span>
        </div>
      </section>

      <footer className="mt-6 pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>
          {chains.methodology.gdp_definition}. {chains.methodology.stablecoin_attribution.replace(/^included /, "Stablecoin attribution ")}.
          REV is {chains.methodology.rev_definition}. Bitcoin excluded — no app-revenue endpoint, and we don&apos;t attribute ETF flows.
        </p>
      </footer>
    </main>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      <p className="text-zinc-100 font-medium">{value}</p>
      {sub && <p className="text-[11px] text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
