// Shared headline-KPI card. Used on /chains for cohort totals and on
// /chains/[slug] for per-chain headlines. Bordered, monospace, large value
// with optional month-over-month delta and a small descriptive sub-line.

export function KpiBig({
  label,
  value,
  sub,
  delta,
  valueClass
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  delta?: number | null;
  valueClass?: string;
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

  return (
    <div className="border border-zinc-800 rounded-md bg-zinc-950 px-5 py-5">
      <p className="text-[11px] uppercase tracking-widest text-zinc-400">{label}</p>
      <p
        className={`text-3xl md:text-4xl font-semibold tabular-nums mt-1.5 leading-none ${
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
