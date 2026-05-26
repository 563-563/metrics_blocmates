import Link from "next/link";
import { hm, np, onchainFeeds } from "@/lib/data";
import { fmtMultiple, fmtUsd, fmtUsdSigned, fmtTokensSigned, fmtPct } from "@/lib/format";
import { Sparkline } from "@/components/Sparkline";

export const revalidate = 300;

// HM → heat color (cheap = green, expensive = red). Returns cell tint + text.
function hmHeat(hm: number): { bg: string; text: string; barColor: string } {
  if (!Number.isFinite(hm)) return { bg: "rgba(120,20,35,0.55)", text: "#fda4af", barColor: "#9f1239" };
  if (hm < 10) return { bg: "rgba(16,185,129,0.22)", text: "#6ee7b7", barColor: "#10b981" };
  if (hm < 20) return { bg: "rgba(16,185,129,0.14)", text: "#86efac", barColor: "#22c55e" };
  if (hm < 35) return { bg: "rgba(148,163,184,0.12)", text: "#e2e8f0", barColor: "#94a3b8" };
  if (hm < 50) return { bg: "rgba(245,158,11,0.18)", text: "#fcd34d", barColor: "#f59e0b" };
  return { bg: "rgba(244,63,94,0.20)", text: "#fda4af", barColor: "#f43f5e" };
}

// HM magnitude bar fill — cap display at 120× so ∞ and >100 read as "full/off the chart".
function hmBarPct(hm: number): number {
  if (!Number.isFinite(hm)) return 100;
  return Math.min(hm / 120, 1) * 100;
}

function verifPill(v: string): { label: string; cls: string; dot: string } {
  switch (v) {
    case "onchain":
      return { label: "on-chain", cls: "text-emerald-300 border-emerald-800/60 bg-emerald-950/40", dot: "bg-emerald-400" };
    case "onchain_aggregate":
      return { label: "on-chain~", cls: "text-emerald-300 border-emerald-800/60 bg-emerald-950/30", dot: "bg-emerald-400/70" };
    case "onchain_dormant":
      return { label: "dormant", cls: "text-zinc-400 border-zinc-700 bg-zinc-900", dot: "bg-zinc-500" };
    case "proxy":
      return { label: "proxy", cls: "text-sky-300 border-sky-900/60 bg-sky-950/40", dot: "bg-sky-400" };
    case "governance_stated":
      return { label: "stated", cls: "text-amber-300 border-amber-900/60 bg-amber-950/40", dot: "bg-amber-400" };
    default:
      return { label: v, cls: "text-zinc-500 border-zinc-800 bg-zinc-900", dot: "bg-zinc-600" };
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
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">truepressure-hm</h1>
          <div className="text-[11px] text-zinc-500 text-right">
            As of {hm.as_of} · {onchainCount}/{hm.protocols.length} on-chain verified
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-2xl">
          Two lenses per protocol. <span className="text-emerald-300">Holder Multiple</span> — how
          cheap the token is per dollar of value returned to holders (lower = cheaper).
          <span className="text-rose-300"> Net Pressure</span> — is the protocol a net buyer
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
            <tr className="text-zinc-500 text-[10px] uppercase tracking-widest">
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
              const npColor = npDir === "seller" ? "#f43f5e" : npDir === "buyer" ? "#10b981" : "#71717a";
              const npArrow = npDir === "seller" ? "▲" : npDir === "buyer" ? "▼" : "·";
              const npBarPct = npUsd != null ? (Math.abs(npUsd) / maxNpUsd) * 100 : 0;
              return (
                <tr key={p.slug} className="border-zinc-900 group">
                  {/* Protocol */}
                  <td className="py-3 px-2 border-t border-zinc-900">
                    <Link href={`/${p.slug}`} className="block">
                      <div className="text-zinc-100 group-hover:text-white font-medium">{p.name}</div>
                      <div className="text-[11px] text-zinc-500">
                        ${p.symbol} · <span className="text-zinc-600">{p.phase.active}</span>
                      </div>
                    </Link>
                  </td>

                  {/* HM — heat cell + bar + band */}
                  <td className="py-3 px-2 border-t border-zinc-900">
                    <Link href={`/${p.slug}/hm`} className="block">
                      <div
                        className="rounded px-2 py-1.5"
                        style={{ background: heat.bg }}
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-semibold" style={{ color: heat.text }}>
                            {fmtMultiple(p.hm)}
                          </span>
                          <span className="text-[10px]" style={{ color: heat.text }}>
                            {p.hm_band}
                          </span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${barPct}%`, background: heat.barColor }}
                          />
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* NP 30d — value + arrow + bar */}
                  <td className="py-3 px-2 border-t border-zinc-900">
                    <Link href={`/${p.slug}/tp`} className="block">
                      {npUsd != null && npTokens != null ? (
                        <>
                          <div className="flex items-baseline gap-1.5">
                            <span style={{ color: npColor }} className="text-xs">{npArrow}</span>
                            <span className="text-sm font-medium" style={{ color: npColor }}>
                              {fmtUsdSigned(npUsd)}
                            </span>
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            {fmtTokensSigned(npTokens)} {p.symbol}
                            {pctSupply != null ? ` · ${fmtPct(pctSupply, 2)}` : ""}
                          </div>
                          <div className="mt-1 h-1 rounded-full bg-black/40 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${npBarPct}%`, background: npColor }}
                            />
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-zinc-600">no flow data</span>
                      )}
                    </Link>
                  </td>

                  {/* Buyback 90d sparkline */}
                  <td className="py-3 px-2 border-t border-zinc-900">
                    <Sparkline data={spark} color="#10b981" />
                  </td>

                  {/* Real Capture */}
                  <td className="py-3 px-2 border-t border-zinc-900 text-right text-zinc-300">
                    {p.real_capture_usd > 0 ? `${fmtUsd(p.real_capture_usd)}/yr` : "—"}
                  </td>

                  {/* Verification pill */}
                  <td className="py-3 px-2 border-t border-zinc-900 text-right">
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
      <div className="mt-4 text-[10px] text-zinc-600 leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
        <span>HM cell: <span className="text-emerald-400">green = cheap</span> → <span className="text-rose-400">red = expensive</span></span>
        <span>NP: <span className="text-rose-400">▲ red = net seller</span> · <span className="text-emerald-400">▼ green = net buyer</span></span>
        <span>Sparkline = 90d daily buyback trend</span>
        <span>Pill = data quality (on-chain / proxy / stated / dormant)</span>
      </div>

      <footer className="pt-8 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed mt-10">
        <p className="mb-2">
          Sources: DefiLlama, CoinGecko, Hyperliquid Info API, Alchemy (mainnet),
          Sky ChainLog, ASXN (HYPE backfill). Editorial seed at{" "}
          <code className="text-zinc-500">data/hm/config.json</code>. Click any cell to drill in.
        </p>
        <p>
          Regression: <code className="text-zinc-500">node scripts/hm/compute-hm.js --reproduce-article</code>{" "}
          → SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×.
        </p>
      </footer>
    </main>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      <p className="text-lg text-zinc-100">{value}</p>
      {sub && <p className="text-[10px] text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
