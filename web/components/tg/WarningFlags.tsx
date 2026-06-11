"use client";

// Red/yellow flags from the grade file + any live SS-PE stability warnings.

const FLAG_LABELS: Record<string, string> = {
  no_hard_token_claim: "No hard token claim",
  offchain_asset_custody: "Off-chain asset custody",
  unlocked_not_circulating_overhang: "Unlocked-not-circulating overhang",
  regulatory_gacha_or_gambling_surface: "Regulatory: gacha / gambling surface",
  high_whale_concentration: "High whale concentration"
};

export function WarningFlags({
  flags,
  warnings
}: {
  flags: string[];
  warnings: string[];
}) {
  if ((!flags || flags.length === 0) && (!warnings || warnings.length === 0)) {
    return <p className="text-xs text-fg-muted">No flags raised.</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {flags.map((f) => (
        <span
          key={f}
          className="text-[11px] text-negative border border-negative/40 bg-negative/10 rounded-full px-2.5 py-1"
        >
          ⚑ {FLAG_LABELS[f] ?? f.replace(/_/g, " ")}
        </span>
      ))}
      {warnings.map((w) => (
        <span
          key={w}
          className="text-[11px] text-accent border border-accent/40 bg-accent/10 rounded-full px-2.5 py-1"
        >
          ⚠ {w}
        </span>
      ))}
    </div>
  );
}
