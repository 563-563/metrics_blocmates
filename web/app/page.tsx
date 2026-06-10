import { hm, onchainFeeds, getHmHistory } from "@/lib/data";
import { fmtUsd, verifPill } from "@/lib/format";
import { KpiBig } from "@/components/KpiBig";
import { PageHeader } from "@/components/PageHeader";
import { HolderMultipleTable } from "@/components/HolderMultipleTable";
import { HowToRead, BandChip } from "@/components/HowToRead";

export const revalidate = 300;

// Cohort-level month-over-month deltas.
//
// Current totals come from the live snapshot (all protocols counted, including
// synthesized ones without a per-protocol history file yet).
//
// For the 30d prior basis, we use the history file when available; for any
// protocol without ≥31d of history we count its CURRENT value as the prior,
// neutralizing its delta contribution. The headline number is correct for the
// full cohort, and the delta % accurately reflects growth among the protocols
// we can actually measure over time. As history accumulates for synthesized
// rows, they'll naturally start contributing real deltas.
function cohortDelta() {
  let currAdj = 0, priorAdj = 0;
  let currRC = 0, priorRC = 0;
  for (const p of hm.protocols) {
    const curAdjP = Number(p.adj_mcap_usd) || 0;
    const curRcP  = Number(p.real_capture_usd) || 0;
    currAdj += curAdjP;
    currRC  += curRcP;
    const hist = getHmHistory(p.slug) as unknown as Array<{
      adj_mcap_usd?: number;
      real_capture_usd?: number;
    }>;
    const prior = hist.length >= 31 ? hist[hist.length - 31] : null;
    if (prior) {
      priorAdj += Number(prior.adj_mcap_usd) || 0;
      priorRC  += Number(prior.real_capture_usd) || 0;
    } else {
      priorAdj += curAdjP;
      priorRC  += curRcP;
    }
  }
  const pct = (cur: number, pri: number): number | null =>
    pri > 0 ? (cur - pri) / pri : null;
  return {
    adj: { current: currAdj, deltaPct: pct(currAdj, priorAdj) },
    rc: { current: currRC, deltaPct: pct(currRC, priorRC) },
    cohortMult: currRC > 0 ? currAdj / currRC : null,
    priorCohortMult: priorRC > 0 ? priorAdj / priorRC : null
  };
}

// HM magnitude bar fill — cap display at 120× so ∞ and >100 read as "full/off the chart".
function hmBarPct(hm: number): number {
  if (!Number.isFinite(hm)) return 100;
  return Math.min(hm / 120, 1) * 100;
}

export default function Home() {
  // Build per-protocol rows with everything precomputed.
  const rows = hm.protocols.map((p) => {
    // 90d buyback sparkline (daily USD).
    const feed = onchainFeeds[p.slug]?.buybacks ?? [];
    const spark = feed
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-90)
      .map((r) => Number(r.amount_usd) || 0);

    // HM 30d change — % vs 30 days ago.
    const hist = getHmHistory(p.slug);
    let hmMoMPct: number | null = null;
    if (hist.length >= 31) {
      const today = hist[hist.length - 1]?.hm;
      const prior = hist[hist.length - 31]?.hm;
      if (
        today != null &&
        prior != null &&
        Number.isFinite(today) &&
        Number.isFinite(prior) &&
        prior > 0
      ) {
        hmMoMPct = ((today - prior) / prior) * 100;
      }
    }

    return {
      p,
      barPct: hmBarPct(p.hm),
      hmMoMPct,
      spark,
      verif: verifPill(p.annual_buyback_verification)
    };
  });

  const onchainCount = hm.protocols.filter((p) =>
    p.annual_buyback_verification.startsWith("onchain")
  ).length;
  const deltas = cohortDelta();
  const cohortMultDelta =
    deltas.cohortMult != null && deltas.priorCohortMult && deltas.priorCohortMult > 0
      ? (deltas.cohortMult - deltas.priorCohortMult) / deltas.priorCohortMult
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="Holder Multiple"
        description="How cheap a protocol's token is per dollar of value returned to holders. Lower is cheaper. HM = Adjusted MCap ÷ Annual Real Capture."
        meta={`As of ${hm.as_of} · ${onchainCount}/${hm.protocols.length} on-chain verified`}
      />

      <HowToRead>
        <p className="mb-3">
          <strong className="text-fg">HM = Adjusted MCap ÷ Annual Real Capture</strong> — how many dollars of
          (unlock-adjusted) market cap you pay per dollar the protocol actually returns to token
          holders each year, via buybacks/burns (Category A) or stable-denominated yield to native
          stakers (Category B). Like a P/E: <strong className="text-fg">lower is cheaper</strong>.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <BandChip range="<10×" label="exceptional" cls="text-positive border-positive/40 bg-positive/10" />
          <BandChip range="10–20×" label="strong" cls="text-positive border-positive/30 bg-positive/5" />
          <BandChip range="20–35×" label="fair value" cls="text-fg-muted border-line bg-surface" />
          <BandChip range="35–50×" label="expensive" cls="text-accent border-accent/40 bg-accent/10" />
          <BandChip range=">50×" label="speculative" cls="text-negative border-negative/40 bg-negative/10" />
        </div>
        <p className="mb-1">
          The <strong className="text-fg">Data pill</strong> is each row&apos;s confidence level:{" "}
          <span className="text-positive">on-chain</span> = verified from chain reads (~ = aggregate
          inflow, may include non-buyback flow) · <span className="text-accent">proxy</span> =
          inferred from DefiLlama holders-revenue · <span className="text-fg">stated</span> =
          governance docs, unverified · <span className="text-fg">dormant</span> = mechanism
          verified on-chain but currently inactive (counts as $0 — that&apos;s the honest read, not a bug).
        </p>
        <p>
          A protocol with no active value return shows <span className="font-mono">∞×</span> /
          &ldquo;no real capture&rdquo;. Sorting and 30d Δ: falling HM = getting cheaper.
        </p>
      </HowToRead>

      {/* Cohort headline KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KpiBig label="Total tracked protocols" value={`${hm.protocols.length}`} sub="active in cohort" />
        <KpiBig
          label="Total adjusted mcap"
          value={fmtUsd(deltas.adj.current)}
          delta={deltas.adj.deltaPct}
          sub="across cohort"
        />
        <KpiBig
          label="Total real capture"
          value={`${fmtUsd(deltas.rc.current)}/yr`}
          delta={deltas.rc.deltaPct}
          sub="across cohort"
        />
        <KpiBig
          label="Cohort multiple"
          value={
            deltas.cohortMult != null && Number.isFinite(deltas.cohortMult)
              ? `${deltas.cohortMult.toFixed(1)}×`
              : "—"
          }
          delta={cohortMultDelta}
          sub="total mcap ÷ total capture"
        />
      </div>

      {/* Heat-graded power table — sortable client component */}
      <HolderMultipleTable rows={rows} />

      {/* Legend */}
      <div className="mt-4 text-[11px] text-fg-muted leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
        <span><span className="text-positive">30d Δ ↓</span> = HM falling (cheaper); <span className="text-negative">↑</span> = HM rising (more expensive)</span>
        <span>Sparkline = 90d daily buyback trend</span>
        <span>Pill = data quality (on-chain / proxy / stated / dormant)</span>
      </div>

      <footer className="pt-8 border-t border-line text-xs text-fg-faint leading-relaxed mt-10">
        <p className="mb-2">
          Sources: DefiLlama, CoinGecko, Hyperliquid Info API, Alchemy (mainnet),
          Sky ChainLog, ASXN (HYPE backfill). Editorial seed at{" "}
          <code className="text-fg-muted">data/hm/config.json</code>. Click any cell to drill in.
        </p>
        <p>
          Regression: <code className="text-fg-muted">node scripts/hm/compute-hm.js --reproduce-article</code>{" "}
          → SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×.
        </p>
      </footer>
    </div>
  );
}

