import Link from "next/link";
import { hm, onchainFeeds, getHmHistory } from "@/lib/data";
import { fmtMultiple, fmtUsd } from "@/lib/format";
import { Sparkline } from "@/components/Sparkline";
import { KpiBig } from "@/components/KpiBig";

export const revalidate = 300;

// Cohort-level month-over-month deltas. Reads each protocol's HM history
// file, sums today's Adj MCap / Real Capture across the cohort and again
// 30 days back, returns the delta %. Falls back to nulls when history
// doesn't go back far enough.
function cohortDelta() {
  let currAdj = 0, priorAdj = 0;
  let currRC = 0, priorRC = 0;
  let priorAvailable = true;
  for (const p of hm.protocols) {
    const hist = getHmHistory(p.slug) as unknown as Array<{
      adj_mcap_usd?: number;
      real_capture_usd?: number;
    }>;
    if (!hist.length) continue;
    const today = hist[hist.length - 1];
    const prior = hist.length >= 31 ? hist[hist.length - 31] : null;
    currAdj += Number(today.adj_mcap_usd) || 0;
    currRC += Number(today.real_capture_usd) || 0;
    if (prior) {
      priorAdj += Number(prior.adj_mcap_usd) || 0;
      priorRC += Number(prior.real_capture_usd) || 0;
    } else {
      priorAvailable = false;
    }
  }
  const pct = (cur: number, pri: number): number | null =>
    priorAvailable && pri > 0 ? (cur - pri) / pri : null;
  return {
    adj: { current: currAdj, deltaPct: pct(currAdj, priorAdj) },
    rc: { current: currRC, deltaPct: pct(currRC, priorRC) },
    cohortMult: currRC > 0 ? currAdj / currRC : null,
    priorCohortMult:
      priorAvailable && priorRC > 0 ? priorAdj / priorRC : null
  };
}

// HM → palette-aware tone. Returns semantic Tailwind classes for text +
// bar fill + a one-word band label. No more rgba tints — palette tokens
// handle theming automatically.
function hmHeat(hm: number): { textClass: string; barClass: string; label: string } {
  if (!Number.isFinite(hm)) return { textClass: "text-fg-muted", barClass: "bg-fg-faint", label: "no capture" };
  if (hm < 10) return { textClass: "text-positive", barClass: "bg-positive", label: "exceptional" };
  if (hm < 20) return { textClass: "text-positive", barClass: "bg-positive", label: "strong" };
  if (hm < 35) return { textClass: "text-fg", barClass: "bg-fg-muted", label: "fair" };
  if (hm < 50) return { textClass: "text-accent", barClass: "bg-accent", label: "expensive" };
  return { textClass: "text-negative", barClass: "bg-negative", label: "speculative" };
}

// HM magnitude bar fill — cap display at 120× so ∞ and >100 read as "full/off the chart".
function hmBarPct(hm: number): number {
  if (!Number.isFinite(hm)) return 100;
  return Math.min(hm / 120, 1) * 100;
}

function verifPill(v: string): { label: string; cls: string; dot: string } {
  switch (v) {
    case "onchain":
      return { label: "on-chain", cls: "text-positive border-positive/40 bg-positive/10", dot: "bg-positive" };
    case "onchain_aggregate":
      return { label: "on-chain~", cls: "text-positive border-positive/40 bg-positive/10", dot: "bg-positive/70" };
    case "onchain_dormant":
      return { label: "dormant", cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
    case "proxy":
      return { label: "proxy", cls: "text-accent border-accent/40 bg-accent/10", dot: "bg-accent" };
    case "governance_stated":
      return { label: "stated", cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
    default:
      return { label: v, cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
  }
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

    return {
      p,
      heat: hmHeat(p.hm),
      barPct: hmBarPct(p.hm),
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Holder Multiple</h1>
          <div className="flex items-center gap-4 text-[11px] text-fg-muted">
            <span>As of {hm.as_of} · {onchainCount}/{hm.protocols.length} on-chain verified</span>
          </div>
        </div>
        <p className="text-xs text-fg-muted mt-2 leading-relaxed max-w-2xl">
          Holder Multiple — how cheap a protocol&apos;s token is per dollar of value returned
          to holders. Lower is cheaper. HM = Adjusted MCap ÷ Annual Real Capture.
        </p>
      </header>

      {/* Cohort headline KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KpiBig label="Tracked protocols" value={`${hm.protocols.length}`} sub="active in cohort" />
        <KpiBig
          label="Σ Adjusted MCap"
          value={fmtUsd(deltas.adj.current)}
          delta={deltas.adj.deltaPct}
          sub="across cohort"
        />
        <KpiBig
          label="Σ Real Capture"
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
          sub="Σ mcap ÷ Σ capture"
        />
      </div>

      {/* Heat-graded power table */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
          <thead>
            <tr className="text-fg text-[10px] uppercase tracking-widest">
              <th className="text-left font-normal py-2 px-2">Protocol</th>
              <th className="text-left font-normal py-2 px-2 w-[200px]">Holder Multiple</th>
              <th className="text-left font-normal py-2 px-2 w-[120px]">Buyback 90d</th>
              <th className="text-right font-normal py-2 px-2">Real Capture</th>
              <th className="text-right font-normal py-2 px-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, heat, barPct, spark, verif }) => {
              return (
                <tr key={p.slug} className="border-line-faint group">
                  {/* Protocol */}
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/${p.slug}`} className="flex items-center gap-2.5">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt=""
                          width={28}
                          height={28}
                          className="rounded-full bg-surface-elev shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-surface-elev shrink-0" />
                      )}
                      <span>
                        <span className="block text-fg group-hover:text-accent font-medium">{p.name}</span>
                        <span className="block text-[11px] text-fg-muted">
                          ${p.symbol} · <span className="text-fg-faint">{p.phase.active}</span>
                        </span>
                      </span>
                    </Link>
                  </td>

                  {/* HM — number + band label + subtle magnitude bar */}
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/${p.slug}/hm`} className="block px-1">
                      <div className="flex items-baseline justify-between">
                        <span className={`text-lg font-mono font-semibold tabular-nums ${heat.textClass}`}>
                          {fmtMultiple(p.hm)}
                        </span>
                        <span className={`text-[10px] uppercase tracking-widest ${heat.textClass}`}>
                          {heat.label}
                        </span>
                      </div>
                      <div className="mt-1.5 h-[3px] rounded-full bg-line-faint overflow-hidden">
                        <div className={`h-full rounded-full ${heat.barClass}`} style={{ width: `${barPct}%` }} />
                      </div>
                    </Link>
                  </td>

                  {/* Buyback 90d sparkline — palette-aware via parent text color */}
                  <td className="py-3 px-2 border-t border-line-faint text-positive">
                    <Sparkline data={spark} color="currentColor" />
                  </td>

                  {/* Real Capture */}
                  <td className="py-3 px-2 border-t border-line-faint text-right text-fg-muted">
                    {p.real_capture_usd > 0 ? `${fmtUsd(p.real_capture_usd)}/yr` : "—"}
                  </td>

                  {/* Verification pill */}
                  <td className="py-3 px-2 border-t border-line-faint text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] ${verif.cls}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${verif.dot}`} />
                      {verif.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 text-[11px] text-fg-muted leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
        <span>HM cell: <span className="text-positive">green = cheap</span> → <span className="text-negative">red = expensive</span></span>
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

