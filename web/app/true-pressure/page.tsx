import { hm, np } from "@/lib/data";
import { fmtUsdSigned } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { KpiBig } from "@/components/KpiBig";
import { TruePressureTable, type TpRow } from "@/components/TruePressureTable";

// Page is dynamic so the direction-filter searchParam (?dir=sellers|buyers)
// updates server-rendered output on each click.
export const dynamic = "force-dynamic";

export default async function TruePressurePage({
  searchParams
}: {
  searchParams: Promise<{ dir?: string }>;
}) {
  const params = await searchParams;
  const filter = params.dir === "sellers" || params.dir === "buyers" ? params.dir : null;

  const allRows: TpRow[] = hm.protocols.map((p) => {
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

  // Cohort-wide counts come from the unfiltered set; the table renders the
  // filtered subset. This keeps the KPI numbers meaningful while the user
  // drills into a direction.
  const netSellers = allRows.filter((r) => r.npDir === "seller").length;
  const netBuyers = allRows.filter((r) => r.npDir === "buyer").length;
  const rows =
    filter === "sellers"
      ? allRows.filter((r) => r.npDir === "seller")
      : filter === "buyers"
        ? allRows.filter((r) => r.npDir === "buyer")
        : allRows;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader
        title="True Pressure"
        description="Whether a protocol is currently a net buyer or seller of its own token. Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups). Unlocks are sell-probability weighted."
        meta={`As of ${np.as_of} · ${allRows.length} protocols${filter ? ` · filtered: ${filter}` : ""}`}
      />

      {/* Cohort KPI strip — Net sellers / Net buyers cards are clickable filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiBig label="Tracked protocols" value={`${allRows.length}`} sub="in cohort" />
        <KpiBig
          label="Net sellers"
          value={`${netSellers}`}
          sub="click to filter"
          valueClass={netSellers > 0 ? "text-negative" : "text-fg"}
          href={filter === "sellers" ? "/true-pressure" : "/true-pressure?dir=sellers"}
          active={filter === "sellers"}
        />
        <KpiBig
          label="Net buyers"
          value={`${netBuyers}`}
          sub="click to filter"
          valueClass={netBuyers > 0 ? "text-positive" : "text-fg"}
          href={filter === "buyers" ? "/true-pressure" : "/true-pressure?dir=buyers"}
          active={filter === "buyers"}
        />
        <KpiBig
          label="Total cohort NP"
          value={fmtUsdSigned(allRows.reduce((s, r) => s + (r.npUsd ?? 0), 0))}
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

