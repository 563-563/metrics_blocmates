import Link from "next/link";
import { hm, np, onchainFeeds } from "@/lib/data";
import { fmtMultiple, fmtUsd, fmtUsdSigned, fmtTokensSigned, fmtPct } from "@/lib/format";
import { Sparkline } from "@/components/Sparkline";

export const revalidate = 300;

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
    const npP = np.protocols.find((n) => n.slug === p.slug);
    const np30 = npP?.rollups?.["30d"];
    const totalSupply =
      npP?.static_reference?.circulating_supply?.total_supply ?? p.circulating_supply_tokens;

    // 90d buyback sparkline (daily USD).
    const feed = onchainFeeds[p.slug]?.buybacks ?? [];
    const spark = feed
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-90)
      .map((r) => Number(r.amount_usd) || 0);

    const npTokens = np30?.net_pressure_tokens ?? null;
    const npUsd = np30?.net_pressure_usd ?? null;
    const npDir = npTokens == null ? "none" : npTokens > 0 ? "seller" : npTokens < 0 ? "buyer" : "flat";

    return {
      p,
      heat: hmHeat(p.hm),
      barPct: hmBarPct(p.hm),
      np30,
      npTokens,
      npUsd,
      npDir,
      pctSupply: npTokens != null && totalSupply ? npTokens / totalSupply : null,
      spark,
      verif: verifPill(p.annual_buyback_verification)
    };
  });

  // Cohort-max |NP usd| for the magnitude bars.
  const maxNpUsd = Math.max(1, ...rows.map((r) => Math.abs(r.npUsd ?? 0)));

  const totalRealCapture = hm.protocols.reduce((s, p) => s + p.real_capture_usd, 0);
  const totalAdjMcap = hm.protocols.reduce((s, p) => s + p.adj_mcap_usd, 0);
  const onchainCount = hm.protocols.filter((p) =>
    p.annual_buyback_verification.startsWith("onchain")
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8 border-b border-line pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">truepressure-hm</h1>
          <div className="flex items-center gap-4 text-[11px] text-fg-muted">
            <Link href="/chains" className="hover:text-fg transition">chains →</Link>
            <span>As of {hm.as_of} · {onchainCount}/{hm.protocols.length} on-chain verified</span>
          </div>
        </div>
        <p className="text-xs text-fg-muted mt-2 leading-relaxed max-w-2xl">
          Two lenses per protocol. <span className="text-positive">Holder Multiple</span> — how
          cheap the token is per dollar of value returned to holders (lower = cheaper).
          <span className="text-negative"> Net Pressure</span> — is the protocol a net buyer
          (🟢) or seller (🔴) of its own token right now.
        </p>
      </header>

      {/* Cohort KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 text-sm">
        <Kpi label="Protocols" value={`${hm.protocols.length}`} />
        <Kpi label="Σ Adj MCap" value={fmtUsd(totalAdjMcap)} />
        <Kpi label="Σ Real Capture" value={`${fmtUsd(totalRealCapture)}/yr`} />
        <Kpi
          label="Cohort multiple"
          value={`${(totalAdjMcap / totalRealCapture).toFixed(1)}×`}
          sub="Σ mcap ÷ Σ capture"
        />
      </div>

      {/* Heat-graded power table */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
          <thead>
            <tr className="text-fg text-[10px] uppercase tracking-widest">
              <th className="text-left font-normal py-2 px-2">Protocol</th>
              <th className="text-left font-normal py-2 px-2 w-[180px]">Holder Multiple</th>
              <th className="text-left font-normal py-2 px-2 w-[180px]">Net Pressure · 30d</th>
              <th className="text-left font-normal py-2 px-2 w-[110px]">Buyback 90d</th>
              <th className="text-right font-normal py-2 px-2">Real Capture</th>
              <th className="text-right font-normal py-2 px-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, heat, barPct, npUsd, npTokens, npDir, pctSupply, spark, verif }) => {
              const npClass = npDir === "seller" ? "text-negative" : npDir === "buyer" ? "text-positive" : "text-fg-faint";
              const npBarClass = npDir === "seller" ? "bg-negative" : npDir === "buyer" ? "bg-positive" : "bg-fg-faint";
              const npArrow = npDir === "seller" ? "▲" : npDir === "buyer" ? "▼" : "·";
              const npBarPct = npUsd != null ? (Math.abs(npUsd) / maxNpUsd) * 100 : 0;
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

                  {/* NP 30d — value + arrow + bar */}
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/${p.slug}/tp`} className="block">
                      {npUsd != null && npTokens != null ? (
                        <>
                          <div className={`flex items-baseline gap-1.5 ${npClass}`}>
                            <span className="text-xs">{npArrow}</span>
                            <span className="text-sm font-mono font-medium tabular-nums">
                              {fmtUsdSigned(npUsd)}
                            </span>
                          </div>
                          <div className="text-[10px] text-fg-muted font-mono tabular-nums">
                            {fmtTokensSigned(npTokens)} {p.symbol}
                            {pctSupply != null ? ` · ${fmtPct(pctSupply, 2)}` : ""}
                          </div>
                          <div className="mt-1 h-[3px] rounded-full bg-line-faint overflow-hidden">
                            <div className={`h-full rounded-full ${npBarClass}`} style={{ width: `${npBarPct}%` }} />
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-fg-faint">no flow data</span>
                      )}
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
        <span>NP: <span className="text-negative">▲ red = net seller</span> · <span className="text-positive">▼ green = net buyer</span> (unlocks sell-probability weighted)</span>
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

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-1">{label}</p>
      <p className="text-lg text-fg">{value}</p>
      {sub && <p className="text-[10px] text-fg-muted mt-0.5">{sub}</p>}
    </div>
  );
}
