import { hm, np, npHeadlineUsd, npHeadlineTokens } from "@/lib/data";
import { fmtUsdSigned, verifPill } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { KpiBig } from "@/components/KpiBig";
import { HowToRead } from "@/components/HowToRead";
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
    const npTokens = npHeadlineTokens(r30);
    const npUsd = npHeadlineUsd(r30);
    const np7Usd = npHeadlineUsd(r7);
    const npDir: TpRow["npDir"] =
      npTokens == null ? "none" : npTokens > 0 ? "seller" : npTokens < 0 ? "buyer" : "flat";
    const pctSupply = npTokens != null && totalSupply ? npTokens / totalSupply : null;
    // Data-quality pill: no daily flow series at all → "no adapter";
    // otherwise the buyback feed's verification flag (the dominant TP sink).
    const verif =
      npTokens == null ? verifPill("pending") : verifPill(p.annual_buyback_verification);
    return { p, np7Usd, npTokens, npUsd, npDir, pctSupply, verif };
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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="True Pressure"
        description="Whether a protocol is currently a net buyer or seller of its own token. Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups). Unlocks are counted in full — the actual scheduled emissions."
        meta={`As of ${np.as_of} · ${allRows.length} protocols${filter ? ` · filtered: ${filter}` : ""}`}
      />

      <HowToRead>
        <p className="mb-3">
          <strong className="text-fg">
            Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation +
            Net Staking Lockups)
          </strong>
          , measured daily in tokens and priced at each day&apos;s historical price.{" "}
          <span className="text-negative">Positive (red ▲) = net seller</span> — supply is hitting
          the market faster than the protocol sinks it.{" "}
          <span className="text-positive">Negative (green ▼) = net buyer</span> — the protocol
          absorbs more than the market emits.
        </p>
        <p className="mb-1">
          Unlocks are counted at <strong className="text-fg">100% of the scheduled emission</strong>{" "}
          — the worst case, where every unlocked token hits the market. If you think a vested team
          token isn&apos;t automatically a sold token, each protocol page has sliders to dial in your
          own sell-through assumption per recipient type.
        </p>
        <p>
          The <strong className="text-fg">Data pill</strong> shows source quality:{" "}
          <span className="text-positive">on-chain</span> = chain-verified flows ·{" "}
          <span className="text-accent">proxy</span> = DefiLlama-derived ·{" "}
          <span className="text-accent">no adapter</span> = daily flow series not wired yet, so the
          protocol can&apos;t rank here — a coverage gap, not a zero.
        </p>
      </HowToRead>

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
        <span>Unlocks counted at 100% of schedule — adjust sell-through per protocol on its page</span>
        <span>Click any row for the full sources/sinks visual.</span>
      </div>
    </div>
  );
}

