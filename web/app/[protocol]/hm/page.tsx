import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug,
  onchainFeeds
} from "@/lib/data";
import { getTokenomicsBySlug } from "@/lib/tokenomics";
import { fmtPct, fmtTokens, fmtUsd } from "@/lib/format";
import { ProtocolHeader } from "@/components/ProtocolHeader";
import { HmBreakdownTable } from "@/components/HmBreakdownTable";
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

  // Last 90 days of buybacks for the chart.
  const buybacks = (feeds.buybacks ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const last90 = buybacks.slice(-90).map((r) => ({
    date: r.date,
    usd: r.amount_usd,
    tokens: r.amount_tokens
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
    <main className="max-w-6xl mx-auto px-6 py-10">
      <ProtocolHeader hmP={hmP} npP={npP} active="hm" />

      {/* HM breakdown */}
      <Section title="Holder Multiple — breakdown">
        <HmBreakdownTable p={hmP} />
        {bs?.lifetime_annual_usd != null && (
          <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
            <span className="text-zinc-400">Buyback rate lens.</span> Recent{" "}
            {bs.days_used}d annualized:{" "}
            <span className="text-zinc-300">{fmtUsd(bs.annual_usd ?? 0)}/yr</span>.
            Lifetime ({bs.lifetime_days}d, cumulative{" "}
            {fmtUsd(bs.lifetime_cumulative_usd ?? 0)}):{" "}
            <span className="text-zinc-300">
              {fmtUsd(bs.lifetime_annual_usd)}/yr
            </span>
            . Recent rate is{" "}
            <span
              className={
                (bs.rate_vs_lifetime_pct ?? 0) < 0
                  ? "text-amber-400"
                  : "text-emerald-400"
              }
            >
              {(bs.rate_vs_lifetime_pct ?? 0) > 0 ? "+" : ""}
              {(bs.rate_vs_lifetime_pct ?? 0).toFixed(1)}%
            </span>{" "}
            vs lifetime average.
          </p>
        )}
      </Section>

      {/* Buyback + AF balance */}
      <Section title="Buyback flow + treasury accumulation">
        {last90.length > 0 ? (
          <>
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Daily buybacks (USD) · last 90 days
            </h3>
            <BuybackChart data={last90} />
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
            See <code className="text-zinc-500">ONCHAIN-INTEGRATION-PLAN.md</code>{" "}
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
            <code className="text-zinc-500">data/hm/config.json</code>.
          </Placeholder>
        )}
      </Section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>
          Sources: {(hmP.sources || []).join(" · ")}
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
    <section className="mb-10 border border-zinc-800 rounded-md p-6 bg-zinc-950">
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
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </p>
      <p className="text-sm text-zinc-100">{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
