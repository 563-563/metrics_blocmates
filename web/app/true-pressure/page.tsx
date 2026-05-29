import { hm, np } from "@/lib/data";
import { fmtUsdSigned } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { KpiBig } from "@/components/KpiBig";
import { TruePressureTable, type TpRow } from "@/components/TruePressureTable";

export const revalidate = 300;

export default function TruePressurePage() {
  const rows: TpRow[] = hm.protocols.map((p) => {
    const npP = np.protocols.find((n) => n.slug === p.slug);
    const r30 = npP?.rollups?.["30d"];
    const r7 = npP?.rollups?.["7d"];
    const totalSupply =
      npP?.static_reference?.circulating_supply?.total_supply ?? p.circulating_supply_tokens;
    const npTokens = r30?.net_pressure_tokens ?? null;
    const npUsd = r30?.net_pressure_usd ?? null;
    const npDir: TpRow["npDir"] =
      npTokens == null ? "none" : npTokens > 0 ? "seller" : npTokens < 0 ? "buyer" : "flat";
    const pctSupply = npTokens != null && totalSupply ? npTokens / totalSupply : null;
    return { p, r7, npTokens, npUsd, npDir, pctSupply };
  });

  const netSellers = rows.filter((r) => r.npDir === "seller").length;
  const netBuyers = rows.filter((r) => r.npDir === "buyer").length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader
        title="True Pressure"
        description="Whether a protocol is currently a net buyer or seller of its own token. Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups). Unlocks are sell-probability weighted."
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
          label="Total cohort NP"
          value={fmtUsdSigned(rows.reduce((s, r) => s + (r.npUsd ?? 0), 0))}
          sub="aggregate 30d"
        />
      </div>

      {/* Leaderboard — sortable client component */}
      <TruePressureTable rows={rows} />

      <div className="mt-6 text-[11px] text-fg-muted leading-relaxed flex flex-wrap gap-x-6 gap-y-1">
        <span><span aria-hidden="true" className="text-negative">▲</span> red = net seller</span>
        <span><span aria-hidden="true" className="text-positive">▼</span> green = net buyer</span>
        <span>Unlocks weighted: team ×0.10 · foundation ×0.30 · emissions ×0.40 · airdrop ×0.20</span>
        <span>Click any row for the full sources/sinks visual.</span>
      </div>
    </div>
  );
}

