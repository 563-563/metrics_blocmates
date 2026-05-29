import Link from "next/link";
import { chains, getChainHistory } from "@/lib/chains";
import {
  chainSummaryWithoutStablecoins,
  getCohortMonthlyDelta
} from "@/lib/chain-aggregates";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import { fmtUsd } from "@/lib/format";
import { ChainScaleBar } from "@/components/ChainScaleBar";
import { ChainTrendSparkline } from "@/components/ChainTrendSparkline";
import { ChartTeasers } from "@/components/ChartTeasers";
import { InfoTip } from "@/components/InfoTip";
import { KpiBig } from "@/components/KpiBig";
import { StablecoinToggle } from "@/components/StablecoinToggle";

// Page is dynamic so the stablecoin toggle re-renders. The data is bundled
// at build time so the search-param render is still fast (no fetches).
export const dynamic = "force-dynamic";

// Fallback chain logo when CoinGecko has no native-token icon (Base, edgeX,
// Ink, Plasma, MegaETH, Katana). DeFiLlama's chain-icon CDN keys on slug.
function chainImage(slug: string, cgImage: string | null): string {
  return cgImage || `https://icons.llamao.fi/icons/chains/rsz_${slug}.jpg`;
}

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

export default async function ChainsIndex({
  searchParams
}: {
  searchParams: Promise<{ include_stablecoins?: string }>;
}) {
  const params = await searchParams;
  const includeStablecoins = params.include_stablecoins !== "false";
  const baseChains = includeStablecoins
    ? chains.chains
    : chains.chains.map(chainSummaryWithoutStablecoins);
  // Re-sort by adjusted GDP when stablecoins are excluded.
  const sortedChains = [...baseChains].sort((a, b) => (b.gdp_30d_usd || 0) - (a.gdp_30d_usd || 0));

  const trackedChains = sortedChains.length;
  const deltas = getCohortMonthlyDelta(includeStablecoins);

  const maxGdp = Math.max(...sortedChains.map((c) => c.gdp_30d_usd || 0));
  const maxMcap = Math.max(...sortedChains.map((c) => c.mcap_usd || 0));
  const maxTvl = Math.max(...sortedChains.map((c) => c.tvl_usd || 0));

  // Sparklines: use gdp_app when stablecoins excluded so the line tracks
  // app-only flows.
  const sparklineData = new Map<string, number[]>();
  for (const c of sortedChains) {
    const hist = getChainHistory(c.slug).slice(-30);
    sparklineData.set(
      c.slug,
      hist.map((d) => (includeStablecoins ? d.gdp : d.gdp_app))
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-6 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">chains · GDP</h1>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 flex-wrap">
            <StablecoinToggle />
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

      {/* Headline KPI strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <KpiBig label="Total tracked chains" value={`${trackedChains}`} sub="active in cohort" />
        <KpiBig
          label="Total monthly GDP"
          value={fmtUsd(deltas.gdp.current)}
          delta={deltas.gdp.deltaPct}
          sub="trailing 30d, all chains"
        />
        <KpiBig
          label="Total TVL"
          value={fmtUsd(deltas.tvl.current)}
          delta={deltas.tvl.deltaPct}
          sub="latest snapshot, all chains"
        />
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
              <tr className="text-zinc-100 text-[10px] uppercase tracking-widest">
                <th className="text-left font-normal py-2 px-2">Chain</th>
                <th className="text-right font-normal py-2 px-2 w-[130px]">Monthly GDP</th>
                <th className="text-right font-normal py-2 px-2 w-[110px]">Annualized</th>
                <th className="text-left font-normal py-2 px-2 w-[90px]">30d trend</th>
                <th className="text-right font-normal py-2 px-2 w-[130px]">Mcap</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">GDP Mult.</th>
                <th className="text-right font-normal py-2 px-2 w-[130px]">TVL</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">GDP / TVL</th>
                <th className="text-right font-normal py-2 px-2 w-[80px]">REV / GDP</th>
                <th className="text-left font-normal py-2 px-2">Top app</th>
              </tr>
            </thead>
            <tbody>
              {sortedChains.map((c) => {
                const hasStruct = !!c.structural_note;
                const color = CHAIN_COLORS[c.slug] || "#71717a";
                const spark = sparklineData.get(c.slug) || [];
                const isStableTop = c.top_category === "Stablecoin Issuer";
                return (
                  <tr key={c.slug} className="border-zinc-900 group hover:bg-zinc-950/60 transition">
                    <td className="py-2.5 px-2 border-t border-zinc-900">
                      <Link href={`/chains/${c.slug}`} className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={chainImage(c.slug, c.image)}
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full bg-zinc-800 shrink-0"
                          loading="lazy"
                        />
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
                    <td className="py-2.5 px-2 border-t border-zinc-900 text-right tabular-nums text-zinc-300">
                      {fmtUsd(c.gdp_annualized_usd)}
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

