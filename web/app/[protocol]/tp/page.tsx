import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug
} from "@/lib/data";
import { getTokenomicsBySlug } from "@/lib/tokenomics";
import { fmtUsd } from "@/lib/format";
import { ProtocolHeader } from "@/components/ProtocolHeader";
import { InfoTip } from "@/components/InfoTip";
import { NetPressureChart } from "@/components/NetPressureChart";
import { SourcesSinksFlow } from "@/components/SourcesSinksFlow";
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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <ProtocolHeader hmP={hmP} npP={npP} active="tp" />

      {/* Sources & Sinks — animated flow visual */}
      {npP && (
        <Section
          title="Sources & Sinks — the pressure system"
          info={
            <>
              Particle speed and density track each component&apos;s 30d $/day rate.
              Idle (faint) curves carry no flow over the window. Unlocks are
              sell-probability weighted: team ×0.10, foundation ×0.30,
              emissions ×0.40, airdrop ×0.20. When a sink runs net-reverse
              (e.g. net <em>un</em>staking), it flips to the sources side so
              the formula identity{" "}
              <code>(Unlocks + Sells) − (Buybacks + Burns + Accum + Lockups)</code>{" "}
              holds.
            </>
          }
        >
          <SourcesSinksFlow np={npP} priceUsd={hmP.price_usd} />
        </Section>
      )}

      {/* Section 1 — Roll-ups */}
      <Section
        title="Net Pressure — roll-ups"
        info={
          <>
            Unlocks are <strong>sell-probability weighted</strong> — team /
            core-contributor vesting is discounted (×0.10) because it&apos;s
            mostly re-staked rather than sold; foundation / emissions
            ×0.30–0.40, airdrop ×0.20. The &quot;gross (100% sell)&quot; line
            shows the worst-case scheduled supply for comparison. ⚠ next to a
            window = incomplete buyback coverage for that range.
          </>
        }
      >
        {npP ? (
          <TpRollupGrid np={npP} />
        ) : (
          <Placeholder>
            TP roll-ups require the on-chain adapter. Pending for {hmP.symbol}.
          </Placeholder>
        )}
      </Section>

      {/* Section 2 — NP time series */}
      <Section
        title="Net Pressure — over time · last 90 days"
        info={
          <>
            <strong>Daily</strong> = per-day flow (red bars = net seller, green
            = net buyer). <strong>30d rolling</strong> = trailing-30-day sum
            (smooths the monthly unlock spikes — best for trend).{" "}
            <strong>Cumulative</strong> = running total since the series start.
            Dashed lime line = price (right axis). USD values use per-day
            historical price.
          </>
        }
      >
        {npDaily.length > 0 ? (
          <NetPressureChart data={npDaily} symbol={hmP.symbol} />
        ) : (
          <Placeholder>
            On-chain flow adapter pending for {hmP.symbol}.
          </Placeholder>
        )}
      </Section>

      {/* Section 3 — Unlock schedule chart */}
      <Section
        title="Unlock schedule — cumulative by recipient"
        info={
          <>
            Stacked area shows cumulative tokens unlocked per recipient bucket
            over the full vesting schedule. Forward of today is the projected
            schedule — actual unlocks may diverge if team members elect to
            re-vest or governance amends the schedule.
          </>
        }
      >
        {tokenomics ? (
          <UnlockScheduleChart
            schedule={tokenomics.schedule}
            totalSupply={tokenomics.total_supply}
            symbol={hmP.symbol}
          />
        ) : (
          <Placeholder>
            Tokenomics module not yet defined for {hmP.symbol}.
            <br />
            See <code className="text-fg-muted">scripts/onchain/&lt;slug&gt;/tokenomics.js</code>
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
            <code className="text-fg-muted">data/hm/config.json</code>.
          </Placeholder>
        )}
      </Section>

      <footer className="pt-6 border-t border-line text-xs text-fg-faint leading-relaxed">
        <p>
          Net Pressure formula:{" "}
          <code className="text-fg-muted">
            (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury
            Accumulation + Net Staking Lockups)
          </code>
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
