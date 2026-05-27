import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug
} from "@/lib/data";
import { getTokenomicsBySlug } from "@/lib/tokenomics";
import { fmtUsd } from "@/lib/format";
import { ProtocolHeader } from "@/components/ProtocolHeader";
import { NetPressureChart } from "@/components/NetPressureChart";
import { TpRollupGrid } from "@/components/TpRollupGrid";
import { UnlockScheduleChart } from "@/components/UnlockScheduleChart";
import { UpcomingUnlocksTable } from "@/components/UpcomingUnlocksTable";

export const revalidate = 300;

export function generateStaticParams() {
  return PROTOCOL_SLUGS.map((slug) => ({ protocol: slug }));
}

export default async function TpDeepPage({
  params
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = await params;
  const hmP = getHmProtocolBySlug(protocol);
  if (!hmP) notFound();
  const npP = getNpProtocolBySlug(protocol);
  const tokenomics = getTokenomicsBySlug(protocol);

  const today = new Date().toISOString().slice(0, 10);
  const npDaily =
    npP?.daily
      ?.filter((r) => !r.is_future && r.date <= today)
      .slice(-90)
      .map((r) => ({
        date: r.date,
        net_pressure_usd: r.net_pressure_usd,
        net_pressure_tokens: r.net_pressure_tokens,
        price_usd: r.price_usd_for_day
      })) ?? [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <ProtocolHeader hmP={hmP} npP={npP} active="tp" />

      {/* Section 1 — Roll-ups */}
      <Section title="Net Pressure — roll-ups">
        {npP ? (
          <>
            <TpRollupGrid np={npP} />
            <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
              Unlocks are <span className="text-zinc-400">sell-probability weighted</span> —
              team/core-contributor vesting is discounted (×0.10) because it&apos;s mostly
              re-staked rather than sold, foundation/emissions ×0.30-0.40, airdrop ×0.20.
              The &quot;gross (100% sell)&quot; line shows the worst-case scheduled supply for comparison.
            </p>
          </>
        ) : (
          <Placeholder>
            TP roll-ups require the on-chain adapter. Pending for {hmP.symbol}.
          </Placeholder>
        )}
      </Section>

      {/* Section 2 — NP time series */}
      <Section title="Net Pressure — over time · last 90 days">
        {npDaily.length > 0 ? (
          <>
            <NetPressureChart data={npDaily} symbol={hmP.symbol} />
            <p className="text-[10px] text-zinc-600 mt-3 leading-relaxed">
              <span className="text-zinc-400">Daily</span> = per-day flow (red bars = net
              seller, green = net buyer). <span className="text-zinc-400">30d rolling</span> =
              trailing-30-day sum (smooths the monthly unlock spikes — best for trend).
              <span className="text-zinc-400"> Cumulative</span> = running total since the
              series start. Dashed lime line = price (right axis). USD uses per-day historical
              price.
            </p>
          </>
        ) : (
          <Placeholder>
            On-chain flow adapter pending for {hmP.symbol}.
          </Placeholder>
        )}
      </Section>

      {/* Section 3 — Unlock schedule chart */}
      <Section title="Unlock schedule — cumulative by recipient">
        {tokenomics ? (
          <>
            <UnlockScheduleChart
              schedule={tokenomics.schedule}
              totalSupply={tokenomics.total_supply}
              symbol={hmP.symbol}
            />
            <p className="text-[10px] text-zinc-600 mt-3 leading-relaxed">
              Stacked area shows cumulative tokens unlocked per recipient
              bucket over the full vesting schedule. Forward of today is the
              projected schedule — actual unlocks may diverge if team members
              elect to re-vest or governance amends the schedule.
            </p>
          </>
        ) : (
          <Placeholder>
            Tokenomics module not yet defined for {hmP.symbol}.
            <br />
            See <code className="text-zinc-500">scripts/onchain/&lt;slug&gt;/tokenomics.js</code>
            {" "}for the HYPE reference implementation.
          </Placeholder>
        )}
      </Section>

      {/* Section 4 — Upcoming events */}
      <Section title="Upcoming unlock events">
        {tokenomics ? (
          <UpcomingUnlocksTable
            schedule={tokenomics.schedule}
            priceUsd={hmP.price_usd}
            symbol={hmP.symbol}
            limit={12}
          />
        ) : (
          <Placeholder>
            HM seed flags 24mo unlocks at{" "}
            {Math.round(hmP.unlocks_24mo_tokens).toLocaleString()} {hmP.symbol}
            {" "}({fmtUsd(hmP.unlocks_24mo_usd)} at today&apos;s price). See{" "}
            <code className="text-zinc-500">data/hm/config.json</code>.
          </Placeholder>
        )}
      </Section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>
          Net Pressure formula:{" "}
          <code className="text-zinc-500">
            (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury
            Accumulation + Net Staking Lockups)
          </code>
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
