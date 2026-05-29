import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROTOCOL_SLUGS,
  getHmProtocolBySlug,
  getNpProtocolBySlug,
  onchainFeeds
} from "@/lib/data";
import {
  bandColor,
  fmtMultiple,
  fmtPct,
  fmtTokens,
  fmtTokensSigned,
  fmtUsd,
  fmtUsdSigned
} from "@/lib/format";
import { ProtocolHeader } from "@/components/ProtocolHeader";

export const revalidate = 300;

export function generateStaticParams() {
  return PROTOCOL_SLUGS.map((slug) => ({ protocol: slug }));
}

export default async function ProtocolLanding({
  params
}: {
  params: Promise<{ protocol: string }>;
}) {
  const { protocol } = await params;
  const hmP = getHmProtocolBySlug(protocol);
  if (!hmP) notFound();
  const npP = getNpProtocolBySlug(protocol);
  const feeds = onchainFeeds[protocol] ?? {};

  const bs = hmP.annual_buyback_source;
  const np30 = npP?.rollups?.["30d"];
  const totalSupply = npP?.static_reference?.circulating_supply?.total_supply;

  const hasOnchain = (feeds.buybacks?.length ?? 0) > 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <ProtocolHeader hmP={hmP} npP={npP} active="overview" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* HM card */}
        <Link
          href={`/${hmP.slug}/hm`}
          className="block border border-zinc-800 rounded-md p-6 bg-zinc-950 hover:bg-zinc-900/60 transition"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500">
              Holder Multiple
            </h2>
            <span className="text-zinc-500 text-xs">deep view →</span>
          </div>
          <p className={`text-4xl font-semibold ${bandColor(hmP.hm_band)}`}>
            {fmtMultiple(hmP.hm)}
          </p>
          <p className={`text-xs mt-1 ${bandColor(hmP.hm_band)}`}>{hmP.hm_band}</p>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-800">
            <Mini label="Adj MCap" value={fmtUsd(hmP.adj_mcap_usd)} />
            <Mini
              label="Real Capture"
              value={`${fmtUsd(hmP.real_capture_usd)}/yr`}
            />
            <Mini
              label="Annual buyback"
              value={fmtUsd(hmP.annual_buyback_usd)}
              sub={
                bs?.source === "onchain_feed" && bs.days_used
                  ? `${bs.days_used}d ann. · onchain`
                  : `verification: ${hmP.annual_buyback_verification}`
              }
            />
            <Mini
              label="Holder yield"
              value={fmtUsd(hmP.annual_holder_yield_usd)}
              sub="Cat B / external cashflow"
            />
          </div>
          {bs?.rate_vs_lifetime_pct != null && (
            <p className="text-[11px] text-zinc-500 mt-5">
              Recent rate{" "}
              <span
                className={
                  bs.rate_vs_lifetime_pct < 0 ? "text-amber-400" : "text-emerald-400"
                }
              >
                {bs.rate_vs_lifetime_pct > 0 ? "+" : ""}
                {bs.rate_vs_lifetime_pct.toFixed(1)}%
              </span>{" "}
              vs lifetime average of {fmtUsd(bs.lifetime_annual_usd ?? 0)}/yr.
            </p>
          )}
        </Link>

        {/* TP card */}
        <Link
          href={`/${hmP.slug}/tp`}
          className="block border border-zinc-800 rounded-md p-6 bg-zinc-950 hover:bg-zinc-900/60 transition"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500">
              Net Pressure — last 30d
            </h2>
            <span className="text-zinc-500 text-xs">deep view →</span>
          </div>
          {np30 ? (
            <>
              <p
                className={`text-4xl font-semibold ${
                  np30.net_pressure_tokens === 0
                    ? "text-zinc-200"
                    : np30.net_pressure_tokens > 0
                      ? "text-rose-400"
                      : "text-emerald-400"
                }`}
              >
                {fmtUsdSigned(np30.net_pressure_usd)}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {fmtTokensSigned(np30.net_pressure_tokens)} {hmP.symbol} ·{" "}
                {fmtPct(
                  np30.net_pressure_tokens /
                    (totalSupply || hmP.circulating_supply_tokens),
                  3
                )}{" "}
                of supply
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-800">
                <Mini
                  label="Unlocks (source)"
                  value={`${fmtTokens(np30.unlocks_tokens)} ${hmP.symbol}`}
                />
                <Mini
                  label="Buybacks (sink)"
                  value={`${fmtTokens(np30.buybacks_tokens)} ${hmP.symbol}`}
                />
                <Mini
                  label="Coverage"
                  value={`${np30.buyback_coverage_days}/${np30.window_days}d`}
                  sub={np30.coverage_complete ? "complete" : "partial"}
                />
                <Mini
                  label="USD method"
                  value={
                    np30.net_pressure_usd_method === "per_day_price"
                      ? "per-day"
                      : "today"
                  }
                  sub={
                    np30.net_pressure_usd_method === "per_day_price"
                      ? `${Math.round(np30.daily_price_coverage_pct * 100)}% covered`
                      : undefined
                  }
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-5">
                {np30.net_pressure_tokens > 0
                  ? "Market absorbed more supply than the protocol could sink."
                  : "Protocol absorbed more supply than the market emitted."}
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-500 py-10 text-center">
              On-chain flow adapter pending for {hmP.symbol}.
              <br />
              <span className="text-xs">
                See ONCHAIN-INTEGRATION-PLAN.md for status.
              </span>
            </p>
          )}
        </Link>
      </div>

      {/* Status footer */}
      <p className="text-[11px] text-zinc-600 mt-8 leading-relaxed">
        On-chain verification:{" "}
        <span
          className={
            hmP.annual_buyback_verification === "onchain"
              ? "text-emerald-400"
              : "text-amber-400"
          }
        >
          {hmP.annual_buyback_verification}
        </span>
        {!hasOnchain && (
          <>
            {" "}
            · TP daily flow series requires the on-chain adapter — pending for{" "}
            {hmP.symbol}.
          </>
        )}
      </p>
    </div>
  );
}

function Mini({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </p>
      <p className="text-sm text-zinc-200">{value}</p>
      {sub && <p className="text-[10px] text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
