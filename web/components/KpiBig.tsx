// Shared headline-KPI card. Sized + spaced to match the onchain.markets
// reference — large mono numbers, uppercase letter-spaced label + sub.

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

  const valueSize = tier === "primary" ? "text-4xl md:text-5xl" : "text-2xl";
  const padding = tier === "primary" ? "px-6 py-5" : "px-5 py-4";

  return (
    <div className={`border border-line rounded-lg bg-canvas ${padding}`}>
      <p className="text-[10px] uppercase tracking-[0.14em] text-fg-muted">
        {label}
      </p>
      <p
        className={`font-mono font-semibold tabular-nums mt-3 leading-none ${valueSize} ${
          valueClass || "text-fg"
        }`}
      >
        {value}
      </p>
      <div className="mt-3 flex items-baseline gap-3 flex-wrap">
        {dPct != null && (
          <span className={`text-sm tabular-nums ${dColor}`}>
            {dArrow} {Math.abs(dPct).toFixed(1)}%
            <span className="text-fg-faint text-xs ml-1">mo/mo</span>
          </span>
        )}
        {sub && (
          <span className="text-[10px] uppercase tracking-[0.14em] text-fg-muted">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
