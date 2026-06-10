"use client";

import { useMemo, useState } from "react";
import { fmtUsd } from "@/lib/format";

// What-if sliders over the unlock sell-probability weights. The published
// Net Pressure counts unlocks at 100% sell-through (the actual scheduled
// emissions — worst case); this lets a reader dial DOWN their own
// sell-through assumption per recipient type and see the 30d net re-derive
// live. Pure client state — published figures unchanged.
//
// Math: customNet = Σ(unlock_usd[rtype] × weight[rtype]) + treasurySellsUsd
//                 − sinksUsd. All inputs are per-day-priced sums from the
// rollup, so at 100% weights this reproduces the headline exactly.

const RTYPE_LABEL: Record<string, string> = {
  team: "Team",
  foundation: "Foundation",
  seed: "Seed investors",
  series_a: "Series A",
  series_b: "Series B",
  public_sale: "Public sale",
  airdrop: "Airdrop",
  advisor: "Advisors",
  other: "Other / unclassified"
};

export function UnlockAssumptions({
  symbol,
  windowDays,
  byRecipient,
  editorialWeights,
  treasurySellsUsd,
  sinksUsd,
  officialNetUsd
}: {
  symbol: string;
  windowDays: number;
  byRecipient: Record<string, { tokens: number; usd: number }>;
  editorialWeights: Record<string, number>;
  treasurySellsUsd: number;
  sinksUsd: number;
  officialNetUsd: number;
}) {
  const rtypes = useMemo(
    () =>
      Object.entries(byRecipient)
        .filter(([, v]) => v.usd > 0)
        .sort((a, b) => b[1].usd - a[1].usd)
        .map(([k]) => k),
    [byRecipient]
  );

  // Published basis: every tranche sells through in full.
  const fullSell = useMemo(() => {
    const d: Record<string, number> = {};
    for (const rt of rtypes) d[rt] = 100;
    return d;
  }, [rtypes]);

  // Editorial sell-probability preset (team ×0.10 etc.) — the old published
  // basis, kept as a one-click starting point for a softer scenario.
  const editorial = useMemo(() => {
    const d: Record<string, number> = {};
    for (const rt of rtypes) d[rt] = Math.round((editorialWeights[rt] ?? 0.3) * 100);
    return d;
  }, [rtypes, editorialWeights]);

  const [weights, setWeights] = useState<Record<string, number>>(fullSell);
  const isFullSell = rtypes.every((rt) => weights[rt] === fullSell[rt]);
  const isEditorial = rtypes.every((rt) => weights[rt] === editorial[rt]);

  const customUnlocksUsd = rtypes.reduce(
    (s, rt) => s + byRecipient[rt].usd * ((weights[rt] ?? 0) / 100),
    0
  );
  const customNet = customUnlocksUsd + treasurySellsUsd - sinksUsd;

  const dir = (v: number) => (v > 0 ? "net seller" : v < 0 ? "net buyer" : "flat");
  const dirCls = (v: number) =>
    v > 0 ? "text-negative" : v < 0 ? "text-positive" : "text-fg-muted";

  if (rtypes.length === 0) return null;

  return (
    <div>
      <div className="space-y-4 mb-6">
        {rtypes.map((rt) => {
          const w = weights[rt] ?? 0;
          const catPerDay = (byRecipient[rt].usd * (w / 100)) / windowDays;
          return (
            <div key={rt} className="flex items-center gap-4 flex-wrap">
              <span className="w-40 shrink-0 text-sm text-fg">
                {RTYPE_LABEL[rt] ?? rt}
                <span className="block text-[10px] text-fg-muted">
                  {fmtUsd(byRecipient[rt].usd)} unlocked · {windowDays}d
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={w}
                onChange={(e) => setWeights({ ...weights, [rt]: Number(e.target.value) })}
                aria-label={`${RTYPE_LABEL[rt] ?? rt} sell-through %`}
                className="flex-1 min-w-32 h-1.5 cursor-pointer"
                style={{ accentColor: "rgb(var(--accent))" }}
              />
              <span className="w-12 text-right font-mono tabular-nums text-sm text-fg">
                {w}%
              </span>
              <span className="w-24 text-right font-mono tabular-nums text-[11px] text-fg-muted">
                {fmtUsd(catPerDay)}/day
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-line pt-4 flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-fg-muted">
            Your scenario · {windowDays}d net pressure
          </p>
          <p className={`text-2xl font-mono font-semibold tabular-nums mt-1 ${dirCls(customNet)}`}>
            {customNet >= 0 ? "+" : "−"}
            {fmtUsd(Math.abs(customNet))}
            <span className="text-sm ml-2 uppercase tracking-widest">{dir(customNet)}</span>
          </p>
          <p className="text-[11px] text-fg-muted mt-1">
            {fmtUsd(Math.abs(customNet) / windowDays)}/day · published (100% sell-through):{" "}
            <span className={dirCls(officialNetUsd)}>
              {officialNetUsd >= 0 ? "+" : "−"}
              {fmtUsd(Math.abs(officialNetUsd))}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setWeights(editorial)}
            disabled={isEditorial}
            className="text-[10px] uppercase tracking-widest border border-line rounded px-2.5 py-1 text-fg-muted hover:text-fg hover:border-accent transition disabled:opacity-40 disabled:cursor-default"
          >
            Editorial preset
          </button>
          <button
            type="button"
            onClick={() => setWeights(fullSell)}
            disabled={isFullSell}
            className="text-[10px] uppercase tracking-widest border border-line rounded px-2.5 py-1 text-fg-muted hover:text-fg hover:border-accent transition disabled:opacity-40 disabled:cursor-default"
          >
            Reset to 100%
          </button>
        </div>
      </div>

      <p className="text-[11px] text-fg-faint mt-4 leading-relaxed">
        Scenario tool — re-weights {symbol}&apos;s scheduled {windowDays}d unlocks by your
        sell-through assumption per recipient type. Buybacks, burns, treasury and staking
        flows stay as observed on-chain. The dashboard&apos;s published figures always count
        unlocks in full (100% sell-through); the editorial preset applies the old
        sell-probability weights (team ×0.10, foundation ×0.30, emissions ×0.40, airdrop ×0.20).
      </p>
    </div>
  );
}
