import Link from "next/link";
import type { HmProtocol } from "@/lib/data";
import { bandColor, fmtMultiple, fmtUsd, verificationColor } from "@/lib/format";

export function HmCohortTable({ protocols }: { protocols: HmProtocol[] }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-fg text-xs uppercase tracking-wider border-b border-line">
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
          <tr key={p.slug} className="border-b border-line-faint hover:bg-surface/60">
            <td className="py-3">
              <Link
                href={`/${p.slug}`}
                className="text-fg hover:underline underline-offset-2"
              >
                {p.name}
              </Link>
              <span className="text-fg-muted ml-2 text-xs">${p.symbol}</span>
            </td>
            <td className="py-3 text-fg-muted text-xs">
              <code className="bg-surface px-1.5 py-0.5 rounded">{p.phase.active}</code>
            </td>
            <td className="py-3 text-right text-fg-muted">{fmtUsd(p.adj_mcap_usd)}</td>
            <td className="py-3 text-right text-fg-muted">{fmtUsd(p.real_capture_usd)}/yr</td>
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
