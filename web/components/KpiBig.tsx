// Shared headline-KPI card. Primary tier = large hero numbers; secondary
// tier = same card shape but smaller value text so a row of secondaries
// reads as a derived/contextual layer underneath the primaries.

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
      ? "text-zinc-500"
      : dPct > 0
        ? "text-emerald-300"
        : dPct < 0
          ? "text-rose-300"
          : "text-zinc-400";
  const dArrow = dPct == null ? "" : dPct > 0 ? "↑" : dPct < 0 ? "↓" : "·";

  const valueSize =
    tier === "primary" ? "text-3xl md:text-4xl" : "text-2xl";
  const padding = tier === "primary" ? "px-5 py-5" : "px-4 py-4";

  return (
    <div className={`border border-zinc-800 rounded-md bg-zinc-950 ${padding}`}>
      <p className="text-[11px] uppercase tracking-widest text-zinc-400">{label}</p>
      <p
        className={`${valueSize} font-semibold tabular-nums mt-1.5 leading-none ${
          valueClass || "text-zinc-50"
        }`}
      >
        {value}
      </p>
      <div className="flex items-baseline gap-3 mt-2 flex-wrap">
        {dPct != null && (
          <span className={`text-sm tabular-nums ${dColor}`}>
            {dArrow} {Math.abs(dPct).toFixed(1)}%
            <span className="text-zinc-600 text-xs ml-1">mo/mo</span>
          </span>
        )}
        {sub && <span className="text-[11px] text-zinc-500">{sub}</span>}
      </div>
    </div>
  );
}
