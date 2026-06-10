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
import { EmptyState } from "@/components/EmptyState";
import { NetPressureChart } from "@/components/NetPressureChart";
import { SourcesSinksFlow } from "@/components/SourcesSinksFlow";
import { TpRollupGrid } from "@/components/TpRollupGrid";
import { UnlockAssumptions } from "@/components/UnlockAssumptions";
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
        // Gross = actual scheduled emissions (100% sell-through), the
        // published basis. Falls back to the weighted net on old snapshots.
        net_pressure_usd: r.net_pressure_usd_gross ?? r.net_pressure_usd,
        net_pressure_tokens: r.net_pressure_tokens_gross ?? r.net_pressure_tokens,
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
              counted at the full scheduled emission (100% sell-through) — use
              the sliders below to apply your own sell-through assumption.
              When a sink runs net-reverse (e.g. net <em>un</em>staking), it
              flips to the sources side so the formula identity{" "}
              <code>(Unlocks + Sells) − (Buybacks + Burns + Accum + Lockups)</code>{" "}
              holds.
            </>
          }
        >
          <SourcesSinksFlow np={npP} priceUsd={hmP.price_usd} />
        </Section>
      )}

      {/* What-if: user-adjustable unlock sell-through weights */}
      {(() => {
        const r30 = npP?.rollups?.["30d"];
        const byRec = r30?.unlocks_by_recipient;
        if (!npP || !r30 || !byRec || Object.keys(byRec).length === 0) return null;
        const sinksUsd =
          (r30.buybacks_usd ?? 0) +
          (r30.burns_usd ?? 0) +
          (r30.treasury_accumulation_usd ?? 0) +
          (r30.net_staking_lockups_usd ?? 0);
        return (
          <Section
            title="Unlock assumptions — dial in your own"
            info={
              <>
                The published Net Pressure counts every unlock tranche in full — the
                worst case, where 100% of the scheduled emission is sold. If you think a
                vested team token is not automatically a sold token, these sliders
                re-derive the {r30.window_days}d net with YOUR sell-through assumptions.
                At 100% this reproduces the published figure exactly.
              </>
            }
          >
            <UnlockAssumptions
              symbol={hmP.symbol}
              windowDays={r30.window_days || 30}
              byRecipient={byRec}
              editorialWeights={npP.unlock_weighting?.sell_probability ?? {}}
              treasurySellsUsd={r30.treasury_sells_usd ?? 0}
              sinksUsd={sinksUsd}
              officialNetUsd={r30.net_pressure_usd_gross ?? r30.net_pressure_usd}
            />
          </Section>
        );
      })()}

      {/* Section 1 — Roll-ups */}
      <Section
        title="Net Pressure — roll-ups"
        info={
          <>
            Unlocks are counted at <strong>100% of the scheduled emission</strong>{" "}
            — the actual supply hitting circulation, no sell-probability
            discount. The &quot;sell-weighted&quot; line shows the editorial
            scenario (team ×0.10, foundation ×0.30, emissions ×0.40, airdrop
            ×0.20) for comparison. ⚠ next to a window = incomplete buyback
            coverage for that range.
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
  return <EmptyState>{children}</EmptyState>;
}
