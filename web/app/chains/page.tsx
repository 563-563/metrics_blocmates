import Link from "next/link";
import { chains, getChainHistory } from "@/lib/chains";
import {
  chainSummaryWithoutStablecoins,
  getCohortMonthlyDelta
} from "@/lib/chain-aggregates";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import { fmtUsd } from "@/lib/format";
import { ChainsTable } from "@/components/ChainsTable";
import { ChartTeasers } from "@/components/ChartTeasers";
import { InfoTip } from "@/components/InfoTip";
import { KpiBig } from "@/components/KpiBig";
import { PageHeader } from "@/components/PageHeader";
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
    case "high":      return "text-positive";
    case "med-high":  return "text-positive";
    case "med-low":   return "text-accent";
    case "low":       return "text-negative";
    default:          return "text-fg-muted";
  }
}
function revGdpClass(band: string | null): string {
  switch (band) {
    case "app-friendly": return "text-positive";
    case "modest":       return "text-positive";
    case "heavy":        return "text-accent";
    case "extractive":   return "text-negative";
    default:             return "text-fg-muted";
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader
        title="Chain GDP"
        description="Chain GDP is the sum of application revenue on each chain."
        meta={`As of ${chains.as_of} · ${chains.chains.length} chains tracked`}
        right={
          <>
            <StablecoinToggle />
            <Link href="/chains/charts" className="hover:text-fg transition">charts →</Link>
          </>
        }
      />

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
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">
            Visual gallery — click for full charts
          </p>
          <Link href="/chains/charts" className="text-[11px] text-fg-muted hover:text-fg transition">
            open gallery →
          </Link>
        </div>
        <ChartTeasers />
      </div>

      {/* Main detail table */}
      <section className="mb-10 border border-line rounded-md bg-canvas p-0">
        <div className="px-5 pt-4 pb-3">
          <h2 className="text-xs uppercase tracking-widest text-fg-muted">
            All chains — detailed
            <InfoTip>
              Ranked by 30d GDP. Bars under GDP / Mcap / TVL are relative to the cohort max
              (chain-colored). 30d trend = daily GDP sparkline with a terminal dot colored
              by net direction.
            </InfoTip>
          </h2>
        </div>
        <ChainsTable
          chains={sortedChains}
          sparklineData={Object.fromEntries(sparklineData)}
        />

        <div className="px-5 py-3 border-t border-line-faint text-[11px] text-fg-muted leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
          <span><span className="text-fg-muted">GDP Multiple</span> = mcap ÷ annualized GDP</span>
          <span><span className="text-fg-muted">GDP / TVL</span> = capital productivity (annualized)</span>
          <span><span className="text-fg-muted">REV / GDP</span> = infrastructure tax burden (7d)</span>
          <span><span className="text-accent">cyan top app</span> = stablecoin-issuer attribution</span>
          <span><span className="text-accent/80">⚠</span> = structural note (hover the chain)</span>
        </div>
      </section>

      <footer className="mt-6 pt-6 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          {chains.methodology.gdp_definition}. {chains.methodology.stablecoin_attribution.replace(/^included /, "Stablecoin attribution ")}.
          REV is {chains.methodology.rev_definition}. Bitcoin excluded — no app-revenue endpoint, and we don&apos;t attribute ETF flows.
        </p>
      </footer>
    </div>
  );
}

