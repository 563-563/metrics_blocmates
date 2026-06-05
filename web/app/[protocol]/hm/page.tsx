import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug,
  getHmHistory,
  onchainFeeds
} from "@/lib/data";
import { getTokenomicsBySlug } from "@/lib/tokenomics";
import { fmtPct, fmtTokens, fmtUsd } from "@/lib/format";
import { ProtocolHeader } from "@/components/ProtocolHeader";
import { AdjMcapBalance } from "@/components/AdjMcapBalance";
import { ChainGdpSummaryCard } from "@/components/ChainGdpSummaryCard";
import { HmBreakdownTable } from "@/components/HmBreakdownTable";
import { HmHistoryChart } from "@/components/HmHistoryChart";
import { HmStacker } from "@/components/HmStacker";
import { InfoTip } from "@/components/InfoTip";
import { TmfWaterfall } from "@/components/TmfWaterfall";
import { getChainBySlug } from "@/lib/chains";
import { BuybackChart } from "@/components/BuybackChart";
import { AfBalanceChart } from "@/components/AfBalanceChart";
import { UnlockAllocationTable } from "@/components/UnlockAllocationTable";

export const revalidate = 300;

export function generateStaticParams() {
  return PROTOCOL_SLUGS.map((slug) => ({ protocol: slug }));
}

export default async function HmDeepPage({
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
  const hmHistory = getHmHistory(protocol);
  // For protocols whose native token is also a chain we track (e.g. HYPE →
  // Hyperliquid L1), surface the chain-side lens alongside the protocol HM.
  const chain = getChainBySlug(protocol);

  // Last 90 days of buybacks for the chart.
  const buybacks = (feeds.buybacks ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const last90 = buybacks.slice(-90).map((r) => ({
    date: r.date,
    usd: r.amount_usd,
    tokens: r.amount_tokens ?? 0
  }));

  // AF balance — weekly downsample for cleanliness.
  const afHist = (feeds.afHistory ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const afWeekly = afHist
    .filter((_, i, arr) => i % 7 === 0 || i === arr.length - 1)
    .map((r) => ({ date: r.date, balance_tokens: r.balance_tokens }));

  const afBalance = npP?.static_reference?.af_balance?.amount_tokens;
  const circ = npP?.static_reference?.circulating_supply?.circulating_supply;
  const totalStaked = npP?.static_reference?.total_staked?.total_staked_tokens;
  const bs = hmP.annual_buyback_source;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <ProtocolHeader hmP={hmP} npP={npP} active="hm" />

      {/* HM breakdown */}
      <Section
        title="Holder Multiple — breakdown"
        info={
          <>
            <strong>HM = Adjusted MCap / Annual Real Capture.</strong>{" "}
            Adjusted MCap = Float + 24mo scheduled unlocks/emissions − 24mo
            projected buybacks. Real Capture = Cat A (buyback / burn / supply
            compression) + Cat B (external cashflow yield to native holders).
            Cat C (token-denominated emissions to stakers) is excluded — it&apos;s
            a dilution rebate, not real value capture.
          </>
        }
      >
        <HmBreakdownTable p={hmP} />
        {bs?.lifetime_annual_usd != null && (
          <p className="text-xs text-fg-muted mt-4 leading-relaxed">
            <span className="text-fg-muted">Buyback rate lens.</span> Recent{" "}
            {bs.days_used}d annualized:{" "}
            <span className="text-fg-muted">{fmtUsd(bs.annual_usd ?? 0)}/yr</span>.
            Lifetime ({bs.lifetime_days}d, cumulative{" "}
            {fmtUsd(bs.lifetime_cumulative_usd ?? 0)}):{" "}
            <span className="text-fg-muted">
              {fmtUsd(bs.lifetime_annual_usd)}/yr
            </span>
            . Recent rate is{" "}
            <span
              className={
                (bs.rate_vs_lifetime_pct ?? 0) < 0
                  ? "text-accent"
                  : "text-positive"
              }
            >
              {(bs.rate_vs_lifetime_pct ?? 0) > 0 ? "+" : ""}
              {(bs.rate_vs_lifetime_pct ?? 0).toFixed(1)}%
            </span>{" "}
            vs lifetime average.
          </p>
        )}
      </Section>

      {/* Years-to-recoup brick stacker — HM made visceral */}
      <Section
        title="Years to recoup — the multiple, counted"
        info={
          <>
            Each brick is one year of Real Capture at the current rate. The stack
            reaches the Adjusted MCap tower at year ={" "}
            <strong>HM</strong> — that&apos;s exactly what the multiple measures.
            Hover a brick for cumulative capture &amp; % of MCap recouped.
            Visual capped at 100 bricks for high HMs. SKY shows a frozen
            empty stack because no capture is flowing to holders in Phase 1.
          </>
        }
      >
        <HmStacker p={hmP} />
      </Section>

      {/* Adjusted MCap balance — supply forces behind the numerator */}
      <Section
        title="Adjusted MCap — the supply scale"
        info={
          <>
            Adj MCap = Float + 24mo Unlocks/Emissions − 24mo Buybacks. The beam
            tilts toward the heavier side: <strong>right</strong> = unlock /
            emission expansion makes Adj MCap larger than Float;{" "}
            <strong>left</strong> = buyback compression makes Adj MCap smaller.
            Pan size also scales with the absolute weight. Float (anchor mass)
            sits under the fulcrum unchanged.
          </>
        }
      >
        <AdjMcapBalance p={hmP} />
      </Section>

      {/* Chain-side lens — when this protocol token IS also a chain native */}
      {chain && (
        <Section
          title="Chain GDP — the same token, the chain lens"
          info={
            <>
              This token is the native asset of a chain we also track on{" "}
              <Link href="/chains" className="underline">/chains</Link>. Holder Multiple
              measures it as a <em>protocol</em> token (cash returned to holders); GDP
              Multiple measures it as a <em>chain</em> native (mcap vs the productive output of all apps
              on the chain). Same asset, two lenses — useful as a sanity check on
              which view the market is pricing.
            </>
          }
        >
          <ChainGdpSummaryCard chain={chain} />
        </Section>
      )}

      {/* TMF revenue waterfall — SKY only (explains the ∞ HM) */}
      {hmP.tmf_waterfall && (
        <Section
          title="Revenue waterfall — where the money goes"
          info={
            <>
              TMF (Treasury Management Function) is Sky&apos;s fixed-waterfall
              allocation framework. Net revenue cascades through buckets in
              order; the holder-facing buckets (Smart Burn, Staking Rewards)
              stay locked until the ABC solvency buffer clears its Phase 1
              floor. Percentages are governance framework params, editable in
              <code className="text-fg-muted"> data/hm/config.json</code>.
            </>
          }
        >
          <TmfWaterfall
            wf={hmP.tmf_waterfall}
            annualRevenueUsd={hmP.revenue_1y ?? null}
          />
        </Section>
      )}

      {/* HM over time */}
      <Section
        title="Holder Multiple — over time"
        info={
          <>
            HM is recomputed as-of each day from that day&apos;s price and a
            trailing-60d buyback rate (circulating held constant). Band
            shading: green = cheap, amber = expensive, red = speculative.
            Dashed lime line = price on the right axis — watch HM rise when
            price outruns the buyback. Rising HM = getting pricier per dollar
            returned to holders.
          </>
        }
      >
        {hmHistory.filter((d) => d.hm != null).length >= 2 ? (
          <HmHistoryChart data={hmHistory} />
        ) : (
          <Placeholder>
            HM time series needs a daily price + buyback feed. Not available for{" "}
            {hmP.symbol} ({hmP.annual_buyback_verification === "onchain_dormant"
              ? "buyback mechanism dormant"
              : "feed pending"}).
          </Placeholder>
        )}
      </Section>

      {/* Buyback + AF balance */}
      <Section title="Buyback flow + treasury accumulation">
        {last90.length > 0 ? (
          <>
            <h3 className="text-xs uppercase tracking-widest text-fg-muted mb-2">
              Daily buybacks (USD) · last 90 days
            </h3>
            <BuybackChart data={last90} />
            {afWeekly.length > 0 && (
              <>
                <h3 className="text-xs uppercase tracking-widest text-fg-muted mt-8 mb-2">
                  Treasury / fund balance · since TGE
                </h3>
                <AfBalanceChart data={afWeekly} symbol={hmP.symbol} />
              </>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-line">
              <Stat
                label="Lifetime buyback"
                value={fmtUsd(bs?.lifetime_cumulative_usd ?? 0)}
                sub={`${bs?.lifetime_days ?? 0}d on-chain`}
              />
              <Stat
                label="Annual rate (60d)"
                value={fmtUsd(hmP.annual_buyback_usd)}
              />
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
            HM input uses governance-stated rate of{" "}
            {fmtUsd(hmP.annual_buyback_usd)}/yr.
            <br />
            See <code className="text-fg-muted">ONCHAIN-INTEGRATION-PLAN.md</code>{" "}
            for adapter status.
          </Placeholder>
        )}
      </Section>

      {/* Allocation breakdown */}
      <Section title="Allocation breakdown">
        {tokenomics ? (
          <UnlockAllocationTable
            buckets={tokenomics.allocations}
            symbol={hmP.symbol}
          />
        ) : (
          <Placeholder>
            Per-protocol tokenomics module not yet defined for {hmP.symbol}.
            <br />
            HM seed flags 24mo unlocks at{" "}
            {Math.round(hmP.unlocks_24mo_tokens).toLocaleString()} {hmP.symbol} (
            {fmtUsd(hmP.unlocks_24mo_usd)}) — see{" "}
            <code className="text-fg-muted">data/hm/config.json</code>.
          </Placeholder>
        )}
      </Section>

      <footer className="pt-6 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          Sources: {(hmP.sources || []).join(" · ")}
          {hmP.sources && hmP.sources.length > 0 ? " · " : ""}editorial seed at{" "}
          <code className="text-fg-muted">data/hm/config.json</code>.
        </p>
      </footer>
    </div>
  );
}

function Section({
  title,
  info,
  children
}: {
  title: string;
  info?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border border-line rounded-md p-6 bg-surface">
      <h2 className="text-xs uppercase tracking-widest text-fg-muted mb-4">
        {title}
        {info && <InfoTip>{info}</InfoTip>}
      </h2>
      {children}
    </section>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-fg-muted leading-relaxed py-8 text-center bg-surface/50 rounded">
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-1">
        {label}
      </p>
      <p className="text-sm text-fg">{value}</p>
      {sub && <p className="text-xs text-fg-muted mt-0.5">{sub}</p>}
    </div>
  );
}
