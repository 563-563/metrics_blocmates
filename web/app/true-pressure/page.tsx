import Link from "next/link";
import { hm, np } from "@/lib/data";
import { fmtUsd, fmtUsdSigned, fmtTokensSigned, fmtPct } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { KpiBig } from "@/components/KpiBig";

export const revalidate = 300;

type NpDir = "seller" | "buyer" | "flat" | "none";

function dirClass(d: NpDir) {
  if (d === "seller") return "text-negative";
  if (d === "buyer") return "text-positive";
  return "text-fg-faint";
}
function dirBarClass(d: NpDir) {
  if (d === "seller") return "bg-negative";
  if (d === "buyer") return "bg-positive";
  return "bg-fg-faint";
}
function dirArrow(d: NpDir) {
  if (d === "seller") return "▲";
  if (d === "buyer") return "▼";
  return "·";
}

export default function TruePressurePage() {
  const rows = hm.protocols.map((p) => {
    const npP = np.protocols.find((n) => n.slug === p.slug);
    const r30 = npP?.rollups?.["30d"];
    const r7 = npP?.rollups?.["7d"];
    const totalSupply =
      npP?.static_reference?.circulating_supply?.total_supply ?? p.circulating_supply_tokens;
    const npTokens = r30?.net_pressure_tokens ?? null;
    const npUsd = r30?.net_pressure_usd ?? null;
    const npDir: NpDir =
      npTokens == null ? "none" : npTokens > 0 ? "seller" : npTokens < 0 ? "buyer" : "flat";
    const pctSupply = npTokens != null && totalSupply ? npTokens / totalSupply : null;
    return {
      p,
      r30,
      r7,
      npTokens,
      npUsd,
      npDir,
      pctSupply
    };
  });

  // Sort by absolute NP magnitude so loudest movers float to the top.
  rows.sort((a, b) => Math.abs(b.npUsd ?? 0) - Math.abs(a.npUsd ?? 0));
  const maxAbs = Math.max(1, ...rows.map((r) => Math.abs(r.npUsd ?? 0)));

  const netSellers = rows.filter((r) => r.npDir === "seller").length;
  const netBuyers = rows.filter((r) => r.npDir === "buyer").length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader
        title="True Pressure"
        description="Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups). Whether a protocol is currently a net buyer or seller of its own token. Unlocks are sell-probability weighted."
        meta={`As of ${np.as_of} · ${rows.length} protocols`}
      />

      {/* Cohort KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiBig label="Tracked protocols" value={`${rows.length}`} sub="in cohort" />
        <KpiBig
          label="Net sellers"
          value={`${netSellers}`}
          sub="30d window"
          valueClass={netSellers > 0 ? "text-negative" : "text-fg"}
        />
        <KpiBig
          label="Net buyers"
          value={`${netBuyers}`}
          sub="30d window"
          valueClass={netBuyers > 0 ? "text-positive" : "text-fg"}
        />
        <KpiBig
          label="Cohort Σ NP"
          value={fmtUsdSigned(rows.reduce((s, r) => s + (r.npUsd ?? 0), 0))}
          sub="aggregate 30d"
        />
      </div>

      {/* Leaderboard */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
          <thead>
            <tr className="text-fg text-[10px] uppercase tracking-widest">
              <th className="text-left font-normal py-2 px-2">Protocol</th>
              <th className="text-left font-normal py-2 px-2 w-[220px]">Net Pressure · 30d</th>
              <th className="text-right font-normal py-2 px-2 w-[140px]">7d</th>
              <th className="text-right font-normal py-2 px-2 w-[120px]">Tokens · 30d</th>
              <th className="text-right font-normal py-2 px-2 w-[100px]">% supply</th>
              <th className="text-right font-normal py-2 px-2 w-[120px]">Direction</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, r7, npUsd, npTokens, npDir, pctSupply }) => {
              const cls = dirClass(npDir);
              const barCls = dirBarClass(npDir);
              const arrow = dirArrow(npDir);
              const barPct = npUsd != null ? (Math.abs(npUsd) / maxAbs) * 100 : 0;
              return (
                <tr key={p.slug} className="border-line-faint group">
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/${p.slug}/tp`} className="flex items-center gap-2.5">
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
                        <span className="block text-fg group-hover:text-accent font-medium">
                          {p.name}
                        </span>
                        <span className="block text-[11px] text-fg-muted">
                          ${p.symbol} ·{" "}
                          <span className="text-fg-faint">{p.phase.active}</span>
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint">
                    <Link href={`/${p.slug}/tp`} className="block">
                      {npUsd != null ? (
                        <>
                          <div className={`flex items-baseline gap-1.5 ${cls}`}>
                            <span aria-hidden="true" className="text-xs">{arrow}</span>
                            <span className="text-sm font-mono font-medium tabular-nums">
                              {fmtUsdSigned(npUsd)}
                            </span>
                          </div>
                          <div className="mt-1 h-[3px] rounded-full bg-line-faint overflow-hidden">
                            <div
                              className={`h-full rounded-full ${barCls}`}
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-fg-faint">no flow data</span>
                      )}
                    </Link>
                  </td>
                  <td className={`py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums ${cls}`}>
                    {r7?.net_pressure_usd != null ? fmtUsdSigned(r7.net_pressure_usd) : <span className="text-fg-faint">—</span>}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                    {npTokens != null ? `${fmtTokensSigned(npTokens)} ${p.symbol}` : <span className="text-fg-faint">—</span>}
                  </td>
                  <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                    {pctSupply != null ? fmtPct(pctSupply, 2) : <span className="text-fg-faint">—</span>}
                  </td>
                  <td className={`py-3 px-2 border-t border-line-faint text-right ${cls}`}>
                    <span className="text-xs uppercase tracking-widest">
                      {npDir === "seller" ? "net seller" : npDir === "buyer" ? "net buyer" : "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-[11px] text-fg-muted leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
        <span><span aria-hidden="true" className="text-negative">▲</span> red = net seller</span>
        <span><span aria-hidden="true" className="text-positive">▼</span> green = net buyer</span>
        <span>Unlocks weighted: team ×0.10 · foundation ×0.30 · emissions ×0.40 · airdrop ×0.20</span>
        <span>Click any row for the full sources/sinks visual.</span>
      </div>
    </div>
  );
}

