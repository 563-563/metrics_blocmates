import Link from "next/link";
import type { HmProtocol, NpProtocol } from "@/lib/data";
import { bandColor, fmtMultiple, fmtPct, fmtTokens, fmtUsd } from "@/lib/format";

export function ProtocolHeader({
  hmP,
  npP,
  active
}: {
  hmP: HmProtocol;
  npP?: NpProtocol;
  active: "overview" | "hm" | "tp";
}) {
  const circ =
    npP?.static_reference?.circulating_supply?.circulating_supply ??
    hmP.circulating_supply_tokens;
  const totalSupply = npP?.static_reference?.circulating_supply?.total_supply;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs">
        <Link href="/" className="text-fg-muted hover:text-fg-muted">
          ← all projects
        </Link>
      </nav>

      {/* Title row */}
      <div className="flex items-center gap-3 mb-2">
        {hmP.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hmP.image}
            alt=""
            width={36}
            height={36}
            className="rounded-full bg-surface-elev shrink-0"
            loading="lazy"
          />
        ) : (
          <span className="w-9 h-9 rounded-full bg-surface-elev shrink-0" />
        )}
        <h1 className="text-3xl font-semibold tracking-tight">{hmP.name}</h1>
        <span className="text-fg-muted text-sm">${hmP.symbol}</span>
        <span className="text-fg-faint text-xs ml-2">{hmP.category}</span>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6 pb-6 border-b border-line">
        <Stat
          label="Price"
          value={`$${hmP.price_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })}`}
          sub={hmP.price_source}
        />
        <Stat
          label="Circulating"
          value={fmtTokens(circ)}
          sub={
            totalSupply
              ? `${fmtPct(circ / totalSupply)} of max`
              : hmP.circulating_supply_source
          }
        />
        <Stat
          label="Float MCap"
          value={fmtUsd(hmP.float_mcap_usd)}
          sub={`Adj ${fmtUsd(hmP.adj_mcap_usd)}`}
        />
        <Stat
          label="HM"
          value={fmtMultiple(hmP.hm)}
          sub={hmP.hm_band}
          valueClass={bandColor(hmP.hm_band)}
        />
        <Stat
          label="Phase"
          value={hmP.phase.active}
          sub={hmP.phase.notes?.slice(0, 64)}
        />
      </div>

      {/* View tabs */}
      <div className="flex gap-1 mt-6 mb-8 border-b border-line">
        <TabLink
          href={`/${hmP.slug}`}
          active={active === "overview"}
          label="Overview"
        />
        <TabLink
          href={`/${hmP.slug}/hm`}
          active={active === "hm"}
          label="Holder Multiple"
        />
        <TabLink
          href={`/${hmP.slug}/tp`}
          active={active === "tp"}
          label="Net Pressure"
        />
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  sub,
  valueClass
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-1">
        {label}
      </p>
      <p className={`text-lg ${valueClass ?? "text-fg"}`}>{value}</p>
      {sub && <p className="text-xs text-fg-muted mt-0.5">{sub}</p>}
    </div>
  );
}

function TabLink({
  href,
  active,
  label
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-xs uppercase tracking-widest border-b-2 -mb-px transition ${
        active
          ? "text-fg border-fg"
          : "text-fg-muted border-transparent hover:text-fg-muted"
      }`}
    >
      {label}
    </Link>
  );
}
