import Link from "next/link";
import { chains } from "@/lib/chains";
import {
  chainSummaryWithoutStablecoins,
  getStackedGdpSeries,
  getQuadrantFrames,
  getChainGrowth,
  getGniSplit,
  getConcentration,
  getRaceFrames,
  getBuffettSeries,
  getAllApps,
  getCategoryMatrix
} from "@/lib/chain-aggregates";
import { ChainGrowthGrid } from "@/components/ChainGrowthGrid";
import { ChainGniBars } from "@/components/ChainGniBars";
import { ChainConcentration } from "@/components/ChainConcentration";
import { ChainGdpRace } from "@/components/ChainGdpRace";
import { ChainBuffettGrid } from "@/components/ChainBuffettGrid";
import { ChainQuadrant } from "@/components/ChainQuadrant";
import { ChainStackedArea } from "@/components/ChainStackedArea";
import { ChainCategoryHeatmap } from "@/components/ChainCategoryHeatmap";
import { ChainAppTreemap } from "@/components/ChainAppTreemap";
import { InfoTip } from "@/components/InfoTip";
import { StablecoinToggle } from "@/components/StablecoinToggle";
import { ChartRangeToggle } from "@/components/ChartRangeToggle";
import { parseChartRange, RANGE_DAYS, RANGE_LABEL } from "@/lib/chart-range";

export const dynamic = "force-dynamic";

export default async function ChainCharts({
  searchParams
}: {
  searchParams: Promise<{ include_stablecoins?: string; range?: string }>;
}) {
  const params = await searchParams;
  const includeStablecoins = params.include_stablecoins !== "false";
  const range = parseChartRange(params.range);
  const cohort = includeStablecoins
    ? chains.chains
    : chains.chains.map(chainSummaryWithoutStablecoins);
  const stackedSeries = getStackedGdpSeries(RANGE_DAYS[range], 7, includeStablecoins);
  const quadrantFrames = getQuadrantFrames(includeStablecoins);
  const growth = getChainGrowth(includeStablecoins);
  const gni = getGniSplit(30);
  const concentration = getConcentration(includeStablecoins);
  const raceFrames = getRaceFrames(includeStablecoins);
  const buffett = getBuffettSeries(includeStablecoins);
  const allApps = getAllApps(includeStablecoins);
  const matrix = getCategoryMatrix(10, includeStablecoins);
  const chainOrder = cohort.map((c) => c.slug);
  const chainNames = Object.fromEntries(cohort.map((c) => [c.slug, c.name]));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">chains · charts</h1>
          <div className="flex items-center gap-4 text-[11px] text-fg-muted flex-wrap">
            <StablecoinToggle />
            <Link href="/chains" className="hover:text-fg transition">← chains table</Link>
            <span>As of {chains.as_of}</span>
          </div>
        </div>
        <p className="text-xs text-fg-muted mt-2 leading-relaxed max-w-2xl">
          Visual gallery for the 24-chain cohort. Methodology and methodology controls match the
          chains table — stablecoin issuer attribution included; ETF and off-chain other excluded.
        </p>
      </header>

      <Section
        id="stacked"
        title={`Daily GDP · ${RANGE_LABEL[range]}, stacked by chain (7d smoothed)`}
        info={
          <>
            Total Chain-GDP across the cohort, stacked bottom-up in size order. 7-day rolling
            average so one-off DL refund/correction days don&apos;t blow out the y-axis.
            Hover for the day&apos;s top contributors. Coverage start varies by chain —
            DefiLlama&apos;s Ethereum series reaches back to 2018, newer chains begin at
            their launch — so early years show fewer stacked layers.
          </>
        }
        controls={<ChartRangeToggle />}
      >
        <ChainStackedArea
          series={stackedSeries}
          chainOrder={chainOrder}
          chainNames={chainNames}
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
            attributed to — Tether on Tron and Ethereum dominate by area. Flip the{" "}
            <strong>cross-chain apps</strong> toggle to merge same-named deployments
            (Tether, Circle, Uniswap…) into single grey cells summed across chains —
            hover a merged cell for its per-chain split.
          </>
        }
      >
        <ChainAppTreemap apps={allApps} topN={200} chainLookup={cohort.map((c) => ({ slug: c.slug, name: c.name }))} />
      </Section>

      <Section
        id="quadrant"
        title="Strategic positioning — productivity × tax burden · 30d GDP ann. / TVL vs 7d REV / GDP"
        info={
          <>
            X = capital productivity (trailing-30d GDP, annualized, ÷ TVL). Y = infrastructure
            tax burden (7d REV ÷ 7d GDP), clamped so a single outlier doesn&apos;t crush the
            cluster. Bubble area ∝ today&apos;s mcap (fallback to TVL or GDP for chains with no
            native token), held constant across time. Drag the slider — or hit play — to watch
            each chain&apos;s position evolve week by week across the full history.
          </>
        }
      >
        <ChainQuadrant chains={cohort} frames={quadrantFrames} />
      </Section>

      <Section
        id="race"
        title="GDP rank race · trailing 30d, weekly frames"
        info={
          <>
            The cohort league table through time — each frame ranks chains by their
            trailing-30d GDP. Hit play to watch economies overtake each other; drag the
            slider to inspect any week.
          </>
        }
      >
        <ChainGdpRace frames={raceFrames} chainNames={chainNames} />
      </Section>

      <Section
        id="growth"
        title="Recession watch — quarterly GDP growth · trailing 90d windows"
        info={
          <>
            Each bar is one quarter&apos;s GDP growth vs the quarter before (trailing-90d
            sums anchored to the chain&apos;s latest data day, up to 8 quarters). The classic
            definition applies literally: two consecutive negative quarters ={" "}
            <strong>recession</strong>. QoQ = latest quarter; YoY = trailing 365d vs the
            365d before. Bars cap at ±50%.
          </>
        }
      >
        <ChainGrowthGrid growth={growth} chainNames={chainNames} />
      </Section>

      <Section
        id="gni"
        title="GDP vs GNI — value retained vs exported · 30d"
        info={
          <>
            A country&apos;s GDP counts what is produced on its soil; GNI counts what its
            residents keep. Chain version: stablecoin-issuer attribution (Circle / Tether
            reserve yield) is output generated ON the chain but captured off it. This chart
            always includes stablecoin attribution regardless of the page toggle — the split
            is the whole point.
          </>
        }
      >
        <ChainGniBars rows={gni} chainNames={chainNames} windowDays={30} />
      </Section>

      <Section
        id="hhi"
        title="Economic concentration — HHI by app · 30d revenue"
        info={
          <>
            Herfindahl-Hirschman index over each app&apos;s share of chain GDP — the same
            statistic antitrust regulators use for market concentration, with the same
            thresholds. Bottom-right = large diversified economy; top = one-company town.
          </>
        }
      >
        <ChainConcentration rows={concentration} chainNames={chainNames} />
      </Section>

      <Section
        id="buffett"
        title="Buffett Indicator — native-token mcap ÷ annualized GDP · trailing 30d, weekly"
        info={
          <>
            The metric Buffett applies to countries (total market cap ÷ GNP), per chain:
            native-token market cap divided by trailing-30d GDP annualized. Lower = the
            token is cheap relative to the economy it taxes; sorted cheapest-first.
            mcap history comes from CoinGecko (free tier reaches ~1 year back and grows
            daily from here). Chains without a native token are absent by construction.
          </>
        }
      >
        <ChainBuffettGrid series={buffett} chainNames={chainNames} />
      </Section>

      <footer className="pt-6 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>Visual gallery. The numerical reference table lives at <Link href="/chains" className="text-fg-muted hover:text-fg">/chains</Link>.</p>
      </footer>
    </div>
  );
}

function Section({
  title,
  info,
  id,
  controls,
  children
}: {
  title: string;
  info?: React.ReactNode;
  id?: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10 border border-line rounded-md p-6 bg-canvas scroll-mt-6">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-xs uppercase tracking-widest text-fg-muted">
          {title}
          {info && <InfoTip>{info}</InfoTip>}
        </h2>
        {controls}
      </div>
      {children}
    </section>
  );
}
