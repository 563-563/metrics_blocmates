import Link from "next/link";
import type { HmProtocol } from "@/lib/data";
import { bandColor, fmtMultiple, fmtUsd, verificationColor } from "@/lib/format";

export function HmCohortTable({ protocols }: { protocols: HmProtocol[] }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
          <th className="text-left py-2 font-normal">Protocol</th>
          <th className="text-left py-2 font-normal">Phase</th>
          <th className="text-right py-2 font-normal">Adj MCap</th>
          <th className="text-right py-2 font-normal">Real Capture</th>
          <th className="text-right py-2 font-normal">HM</th>
          <th className="text-right py-2 font-normal">Band</th>
          <th className="text-right py-2 font-normal">Verification</th>
        </tr>
      </thead>
      <tbody>
        {protocols.map((p) => (
          <tr key={p.slug} className="border-b border-zinc-900 hover:bg-zinc-950/60">
            <td className="py-3">
              <Link
                href={`/${p.slug}`}
                className="text-zinc-100 hover:underline underline-offset-2"
              >
                {p.name}
              </Link>
              <span className="text-zinc-500 ml-2 text-xs">${p.symbol}</span>
            </td>
            <td className="py-3 text-zinc-400 text-xs">
              <code className="bg-zinc-900 px-1.5 py-0.5 rounded">{p.phase.active}</code>
            </td>
            <td className="py-3 text-right text-zinc-300">{fmtUsd(p.adj_mcap_usd)}</td>
            <td className="py-3 text-right text-zinc-300">{fmtUsd(p.real_capture_usd)}/yr</td>
            <td className={`py-3 text-right text-lg font-semibold ${bandColor(p.hm_band)}`}>
              {fmtMultiple(p.hm)}
            </td>
            <td className={`py-3 text-right text-xs ${bandColor(p.hm_band)}`}>{p.hm_band}</td>
            <td className="py-3 text-right text-xs">
              <span className={verificationColor(p.annual_buyback_verification)}>
                {p.annual_buyback_verification}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
