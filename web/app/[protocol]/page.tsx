import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug,
  onchainFeeds
} from "@/lib/data";
import { getTokenomicsBySlug } from "@/lib/tokenomics";
import { fmtUsd, fmtTokens, fmtPct, bandColor, fmtMultiple } from "@/lib/format";
import { HmBreakdownTable } from "@/components/HmBreakdownTable";
import { BuybackChart } from "@/components/BuybackChart";
import { AfBalanceChart } from "@/components/AfBalanceChart";
import { NetPressureChart } from "@/components/NetPressureChart";
import { TpRollupGrid } from "@/components/TpRollupGrid";
import { UnlockAllocationTable } from "@/components/UnlockAllocationTable";
import { UpcomingUnlocksTable } from "@/components/UpcomingUnlocksTable";

export const revalidate = 300;

export function generateStaticParams() {
  return PROTOCOL_SLUGS.map((slug) => ({ protocol: slug }));
}

export default async function ProtocolPage({
  params
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = await params;
  const hmP = getHmProtocolBySlug(protocol);
  if (!hmP) notFound();
  const npP = getNpProtocolBySlug(protocol);
  const feeds = onchainFeeds[protocol] ?? {};
  const tokenomics = getTokenomicsBySlug(protocol);

  // Last 90 days of buybacks for the bar chart.
  const buybacks = (feeds.buybacks ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const last90Buybacks = buybacks.slice(-90).map((r) => ({
    date: r.date,
    usd: r.amount_usd,
    tokens: r.amount_tokens
  }));

  // AF balance — weekly downsample.
  const afHist = (feeds.afHistory ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const afWeekly = afHist
    .filter((_, i, arr) => i % 7 === 0 || i === arr.length - 1)
    .map((r) => ({ date: r.date, balance_tokens: r.balance_tokens }));

  // Net Pressure daily — last 90 historical days.
  const today = new Date().toISOString().slice(0, 10);
  const npDaily =
    npP?.daily
      ?.filter((r) => !r.is_future && r.date <= today)
      .slice(-90)
      .map((r) => ({
        date: r.date,
        net_pressure_usd: r.net_pressure_usd,
        net_pressure_tokens: r.net_pressure_tokens
      })) ?? [];

  const circ = npP?.static_reference?.circulating_supply?.circulating_supply;
  const totalSupply = npP?.static_reference?.circulating_supply?.total_supply;
  const afBalance = npP?.static_reference?.af_balance?.amount_tokens;
  const totalStaked = npP?.static_reference?.total_staked?.total_staked_tokens;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300">
          ← cohort
        </Link>
      </nav>

      {/* Header band */}
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <h1 className="text-3xl font-semibold tracking-tight">{hmP.name}</h1>
          <span className="text-zinc-500 text-sm">${hmP.symbol}</span>
          <span className="text-zinc-600 text-xs ml-2">{hmP.category}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
          <Stat
            label="Price"
            value={`$${hmP.price_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })}`}
            sub={hmP.price_source}
          />
          <Stat
            label="Circulating"
            value={fmtTokens(circ ?? hmP.circulating_supply_tokens)}
            sub={
              totalSupply
                ? `${fmtPct((circ ?? 0) / totalSupply)} of max`
                : hmP.circulating_supply_source
            }
          />
          <Stat
            label="Float MCap"
            value={fmtUsd(hmP.float_mcap_usd)}
            sub={`Adj ${fmtUsd(hmP.adj_mcap_usd)}`}
          />
          <Stat
            label="HM"
            value={fmtMultiple(hmP.hm)}
            sub={hmP.hm_band}
            valueClass={bandColor(hmP.hm_band)}
          />
          <Stat
            label="Phase"
            value={hmP.phase.active}
            sub={hmP.phase.notes?.slice(0, 64)}
          />
        </div>
      </header>

      {/* Section 1 — HM breakdown */}
      <Section title="Holder Multiple — breakdown">
        <HmBreakdownTable p={hmP} />
        {hmP.annual_buyback_source?.lifetime_annual_usd != null && (
          <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
            <span className="text-zinc-400">Buyback rate lens.</span> Recent{" "}
            {hmP.annual_buyback_source.days_used}d annualized:{" "}
            <span className="text-zinc-300">{fmtUsd(hmP.annual_buyback_source.annual_usd ?? 0)}/yr</span>.
            Lifetime ({hmP.annual_buyback_source.lifetime_days}d, cumulative{" "}
            {fmtUsd(hmP.annual_buyback_source.lifetime_cumulative_usd ?? 0)}):{" "}
            <span className="text-zinc-300">{fmtUsd(hmP.annual_buyback_source.lifetime_annual_usd)}/yr</span>.
            Recent rate is{" "}
            <span
              className={
                (hmP.annual_buyback_source.rate_vs_lifetime_pct ?? 0) < 0
                  ? "text-amber-400"
                  : "text-emerald-400"
              }
            >
              {(hmP.annual_buyback_source.rate_vs_lifetime_pct ?? 0) > 0 ? "+" : ""}
              {(hmP.annual_buyback_source.rate_vs_lifetime_pct ?? 0).toFixed(1)}%
            </span>{" "}
            vs lifetime average.
          </p>
        )}
      </Section>

      {/* Section 2 — Buyback + AF balance charts */}
      <Section title="Buyback flow + treasury accumulation">
        {last90Buybacks.length > 0 ? (
          <>
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Daily buybacks (USD) · last 90 days
            </h3>
            <BuybackChart data={last90Buybacks} />
            {afWeekly.length > 0 && (
              <>
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 mt-8 mb-2">
                  Treasury / fund balance · since TGE
                </h3>
                <AfBalanceChart data={afWeekly} symbol={hmP.symbol} />
              </>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-zinc-800">
              <Stat
                label="Lifetime buyback"
                value={fmtUsd(hmP.annual_buyback_source?.lifetime_cumulative_usd ?? 0)}
                sub={`${hmP.annual_buyback_source?.lifetime_days ?? 0}d on-chain`}
              />
              <Stat label="Annual rate (60d)" value={fmtUsd(hmP.annual_buyback_usd)} />
              {afBalance != null && (
                <Stat
                  label="Treasury balance"
                  value={fmtTokens(afBalance)}
                  sub={fmtUsd(afBalance * hmP.price_usd)}
                />
              )}
              {totalStaked != null && circ != null && (
                <Stat
                  label="Staked"
                  value={fmtTokens(totalStaked)}
                  sub={`${fmtPct(totalStaked / circ)} of circ`}
                />
              )}
            </div>
          </>
        ) : (
          <Placeholder>
            On-chain buyback adapter pending for {hmP.symbol}.
            <br />
            HM input uses governance-stated rate of {fmtUsd(hmP.annual_buyback_usd)}/yr.
            <br />
            See <code className="text-zinc-500">ONCHAIN-INTEGRATION-PLAN.md</code> for status.
          </Placeholder>
        )}
      </Section>

      {/* Section 3 — TP daily + rollups */}
      <Section title="Net Pressure (TP)">
        {npP ? (
          <>
            <TpRollupGrid np={npP} />
            {npDaily.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  Daily Net Pressure (USD) · last 90 days
                </h3>
                <NetPressureChart data={npDaily} symbol={hmP.symbol} />
                <p className="text-[10px] text-zinc-600 mt-3 leading-relaxed">
                  Red = supply hitting market faster than the protocol absorbs.
                  Green = protocol is net buyer. USD uses per-day historical price
                  where available.
                </p>
              </div>
            )}
          </>
        ) : (
          <Placeholder>
            TP daily series requires the on-chain adapter. Pending for {hmP.symbol}.
          </Placeholder>
        )}
      </Section>

      {/* Section 4 — Unlock allocation + upcoming events */}
      <Section title="Unlock schedule">
        {tokenomics ? (
          <>
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Allocation breakdown
            </h3>
            <UnlockAllocationTable
              buckets={tokenomics.allocations}
              symbol={hmP.symbol}
            />
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mt-8 mb-2">
              Upcoming unlocks
            </h3>
            <UpcomingUnlocksTable
              schedule={tokenomics.schedule}
              priceUsd={hmP.price_usd}
              symbol={hmP.symbol}
            />
          </>
        ) : (
          <Placeholder>
            Per-protocol tokenomics module not yet defined for {hmP.symbol}.
            <br />
            HM seed flags 24mo unlocks at{" "}
            {Math.round(hmP.unlocks_24mo_tokens).toLocaleString()} {hmP.symbol} (
            {fmtUsd(hmP.unlocks_24mo_usd)}) — see <code className="text-zinc-500">data/hm/config.json</code>.
          </Placeholder>
        )}
      </Section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>
          Sources:{" "}
          {(hmP.sources || []).join(" · ")}
          {hmP.sources && hmP.sources.length > 0 ? " · " : ""}editorial seed at{" "}
          <code className="text-zinc-500">data/hm/config.json</code>.
        </p>
      </footer>
    </main>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 border border-zinc-800 rounded-md p-6 bg-zinc-950">
      <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-zinc-500 leading-relaxed py-8 text-center bg-zinc-900/50 rounded">
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  valueClass
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </p>
      <p className={`text-lg ${valueClass ?? "text-zinc-100"}`}>{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
