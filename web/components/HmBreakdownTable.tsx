import type { HmProtocol } from "@/lib/data";
import {
  bandColor,
  fmtMultiple,
  fmtUsd,
  fmtUsdSigned,
  verificationColor
} from "@/lib/format";

export function HmBreakdownTable({ p }: { p: HmProtocol }) {
  const bs = p.annual_buyback_source;
  const buybackNote =
    bs?.source === "onchain_feed" && bs.days_used
      ? `last ${bs.days_used}d annualized · onchain`
      : `verification: ${p.annual_buyback_verification}`;

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
          <th className="text-left py-2 font-normal w-12">#</th>
          <th className="text-left py-2 font-normal">Metric</th>
          <th className="text-right py-2 font-normal">Value</th>
          <th className="text-left py-2 font-normal pl-6">Notes</th>
        </tr>
      </thead>
      <tbody className="text-zinc-300">
        <Row n={1} label="Token price" value={`$${p.price_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })}`} note={`source: ${p.price_source}`} />
        <Row
          n={2}
          label="Current float market cap"
          value={fmtUsd(p.float_mcap_usd)}
          note={`${Math.round(p.circulating_supply_tokens).toLocaleString()} ${p.symbol} · circ source: ${p.circulating_supply_source}`}
        />
        <Row n={3} label="+ 24mo unlocks" value={fmtUsdSigned(p.unlocks_24mo_usd)} note={p.unlocks_24mo_notes ?? ""} />
        <Row n={4} label="+ 24mo emissions" value={fmtUsdSigned(p.emissions_24mo_usd)} note={p.emissions_24mo_notes ?? ""} />
        <Row n={5} label="− 24mo buybacks" value={fmtUsdSigned(-p.buybacks_24mo_usd)} note={p.buybacks_24mo_notes ?? ""} />
        <Row
          n={6}
          label={<span className="font-semibold">Adjusted MCap</span>}
          value={<span className="font-semibold">{fmtUsd(p.adj_mcap_usd)}</span>}
          note="Lines 2 + 3 + 4 − 5"
        />
        <Row
          n={7}
          label="Annual buyback (Category A)"
          value={fmtUsd(p.annual_buyback_usd)}
          note={
            <span className={verificationColor(p.annual_buyback_verification)}>
              {buybackNote}
            </span>
          }
        />
        <Row
          n={8}
          label={`Annual external cashflow yield to ${p.symbol} (Category B)`}
          value={fmtUsd(p.annual_holder_yield_usd)}
          note={
            <>
              {p.annual_holder_yield_notes ? (
                <span className="block text-zinc-500">{p.annual_holder_yield_notes}</span>
              ) : null}
              <span className={verificationColor(p.annual_holder_yield_verification)}>
                verification: {p.annual_holder_yield_verification}
              </span>
            </>
          }
        />
        <Row
          n={9}
          label={<span className="font-semibold">Total Real Capture</span>}
          value={<span className="font-semibold">{fmtUsd(p.real_capture_usd)}/yr</span>}
          note="Lines 7 + 8"
        />
        <Row
          n={10}
          label={<span className="font-semibold">Holder Multiple (HM)</span>}
          value={
            <span className={`font-semibold text-lg ${bandColor(p.hm_band)}`}>
              {fmtMultiple(p.hm)}
            </span>
          }
          note={<span className={bandColor(p.hm_band)}>{p.hm_band}</span>}
        />
      </tbody>
    </table>
  );
}

function Row({
  n,
  label,
  value,
  note
}: {
  n: number;
  label: React.ReactNode;
  value: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <tr className="border-b border-zinc-900">
      <td className="py-2 text-zinc-500 text-xs">{n}</td>
      <td className="py-2 pr-4">{label}</td>
      <td className="py-2 text-right">{value}</td>
      <td className="py-2 pl-6 text-xs text-zinc-500 leading-relaxed">{note}</td>
    </tr>
  );
}
