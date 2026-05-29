// Shared headline-KPI card. Borders-only, no fill — matches the
// onchain.markets style. Primary tier = large hero numbers; secondary tier
// = same card but smaller value.

export function KpiBig({
  label,
  value,
  sub,
  delta,
  valueClass,
  tier = "primary"
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  delta?: number | null;
  valueClass?: string;
  tier?: "primary" | "secondary";
}) {
  const dPct = delta == null ? null : delta * 100;
  const dColor =
    dPct == null
      ? "text-fg-faint"
      : dPct > 0
        ? "text-positive"
        : dPct < 0
          ? "text-negative"
          : "text-fg-muted";
  const dArrow = dPct == null ? "" : dPct > 0 ? "↑" : dPct < 0 ? "↓" : "·";

  const valueSize = tier === "primary" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl";
  const padding = tier === "primary" ? "px-5 py-4" : "px-4 py-3.5";

  return (
    <div className={`border border-line rounded-lg bg-canvas ${padding}`}>
      <p className="text-[10px] uppercase tracking-widest text-fg-muted">{label}</p>
      <p
        className={`font-mono font-semibold tabular-nums mt-2 leading-none ${valueSize} ${
          valueClass || "text-fg"
        }`}
      >
        {value}
      </p>
      <div className="flex items-baseline gap-3 mt-2 flex-wrap">
        {dPct != null && (
          <span className={`text-xs font-mono tabular-nums ${dColor}`}>
            {dArrow} {Math.abs(dPct).toFixed(1)}%
            <span className="text-fg-faint ml-1">mo/mo</span>
          </span>
        )}
        {sub && <span className="text-[11px] text-fg-muted">{sub}</span>}
      </div>
    </div>
  );
}
