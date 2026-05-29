import Link from "next/link";
import { chains } from "@/lib/chains";
import {
  chainSummaryWithoutStablecoins,
  getStackedGdpSeries,
  getAllApps,
  getCategoryMatrix
} from "@/lib/chain-aggregates";
import { ChainQuadrant } from "@/components/ChainQuadrant";
import { ChainStackedArea } from "@/components/ChainStackedArea";
import { ChainCategoryHeatmap } from "@/components/ChainCategoryHeatmap";
import { ChainAppTreemap } from "@/components/ChainAppTreemap";
import { InfoTip } from "@/components/InfoTip";
import { StablecoinToggle } from "@/components/StablecoinToggle";

export const dynamic = "force-dynamic";

export default async function ChainCharts({
  searchParams
}: {
  searchParams: Promise<{ include_stablecoins?: string }>;
}) {
  const params = await searchParams;
  const includeStablecoins = params.include_stablecoins !== "false";
  const cohort = includeStablecoins
    ? chains.chains
    : chains.chains.map(chainSummaryWithoutStablecoins);
  const stackedSeries = getStackedGdpSeries(180, 7, includeStablecoins);
  const allApps = getAllApps(includeStablecoins);
  const matrix = getCategoryMatrix(10, includeStablecoins);
  const chainOrder = cohort.map((c) => c.slug);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">chains · charts</h1>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 flex-wrap">
            <StablecoinToggle />
            <Link href="/chains" className="hover:text-zinc-200 transition">← chains table</Link>
            <span>As of {chains.as_of}</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-2xl">
          Visual gallery for the 24-chain cohort. Methodology and methodology controls match the
          chains table — stablecoin issuer attribution included; ETF and off-chain other excluded.
        </p>
      </header>

      <Section
        id="quadrant"
        title="Strategic positioning — productivity × tax burden"
        info={
          <>
            X = capital productivity (annualized GDP / TVL). Y = infrastructure tax burden
            (REV / GDP, 7d), clamped at 80% so a single outlier doesn&apos;t crush the cluster.
            Bubble area ∝ mcap (fallback to TVL or GDP for chains with no native token).
            Quadrant tints orient you to the four corners.
          </>
        }
      >
        <ChainQuadrant chains={cohort} />
      </Section>

      <Section
        id="stacked"
        title="Daily GDP · last 180 days, stacked by chain (7d smoothed)"
        info={
          <>
            Total Chain-GDP across the cohort, stacked bottom-up in size order. 7-day rolling
            average so one-off DL refund/correction days don&apos;t blow out the y-axis.
            Hover for the day&apos;s top contributors.
          </>
        }
      >
        <ChainStackedArea
          series={stackedSeries}
          chainOrder={chainOrder}
          chainNames={Object.fromEntries(cohort.map((c) => [c.slug, c.name]))}
        />
      </Section>

      <Section
        id="heatmap"
        title="Category composition · 30d"
        info={
          <>
            Each cell shows that chain&apos;s 30d revenue in a category. Color intensity
            = share of the chain&apos;s GDP that category represents. Tells you{" "}
            <em>what kind of economy</em> each chain is.
          </>
        }
      >
        <ChainCategoryHeatmap matrix={matrix} chains={cohort} />
      </Section>

      <Section
        id="treemap"
        title="Every app, every chain — 30d revenue"
        info={
          <>
            Cell area ∝ that app&apos;s 30d revenue; cell color = the chain it&apos;s on.
            Hover any cell for app name, chain, category, and exact revenue. Stablecoin
            issuers (Circle / Tether) appear as virtual apps on whichever chain they&apos;re
            attributed to — Tether on Tron and Ethereum dominate by area.
          </>
        }
      >
        <ChainAppTreemap apps={allApps} topN={200} chainLookup={cohort.map((c) => ({ slug: c.slug, name: c.name }))} />
      </Section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>Visual gallery. The numerical reference table lives at <Link href="/chains" className="text-zinc-400 hover:text-zinc-200">/chains</Link>.</p>
      </footer>
    </main>
  );
}

function Section({
  title,
  info,
  id,
  children
}: {
  title: string;
  info?: React.ReactNode;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10 border border-zinc-800 rounded-md p-6 bg-zinc-950 scroll-mt-6">
      <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
        {title}
        {info && <InfoTip>{info}</InfoTip>}
      </h2>
      {children}
    </section>
  );
}
