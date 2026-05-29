// Shared headline-KPI card. Sized + spaced to match the onchain.markets
// reference — large mono numbers, uppercase letter-spaced label + sub.
//
// When `href` is set the card becomes a Link with a hover affordance. When
// `active` is also true the card gets an accent ring to indicate the current
// filter selection. Used on the True Pressure landing to make the Net Sellers
// / Net Buyers KPI cards click-to-filter the table.

import Link from "next/link";

export function KpiBig({
  label,
  value,
  sub,
  delta,
  valueClass,
  tier = "primary",
  href,
  active = false
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  delta?: number | null;
  valueClass?: string;
  tier?: "primary" | "secondary";
  href?: string;
  active?: boolean;
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

  const borderCls = active
    ? "border-accent ring-1 ring-accent/40"
    : href
      ? "border-line hover:border-accent/60 transition"
      : "border-line";

  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-fg-muted">
          {label}
        </p>
        {href && (
          <span
            aria-hidden="true"
            className={`text-[10px] uppercase tracking-[0.14em] ${
              active ? "text-accent" : "text-fg-faint"
            }`}
          >
            {active ? "× clear" : "filter"}
          </span>
        )}
      </div>
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
    </>
  );

  const className = `block border rounded-lg bg-canvas ${padding} ${borderCls}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
