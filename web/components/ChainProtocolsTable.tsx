import type { ChainProtocol } from "@/lib/chains";
import { fmtUsd } from "@/lib/format";

export function ChainProtocolsTable({
  protocols,
  limit = 15
}: {
  protocols: ChainProtocol[];
  limit?: number;
}) {
  const rows = (protocols || []).slice(0, limit);
  if (rows.length === 0) {
    return <p className="text-xs text-fg-faint py-4">No protocol data.</p>;
  }
  return (
    <table className="w-full text-sm border-separate border-spacing-0">
      <thead>
        <tr className="text-fg text-[10px] uppercase tracking-widest">
          <th className="text-left font-normal py-2 px-2 w-[24px]">#</th>
          <th className="text-left font-normal py-2 px-2">Protocol</th>
          <th className="text-left font-normal py-2 px-2">Category</th>
          <th className="text-right font-normal py-2 px-2">Revenue · 30d</th>
          <th className="text-right font-normal py-2 px-2 w-[80px]">% chain</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p, i) => (
          <tr key={p.name + i} className="border-line-faint">
            <td className="py-2 px-2 border-t border-line-faint text-fg-faint tabular-nums">
              {i + 1}
            </td>
            <td className="py-2 px-2 border-t border-line-faint text-fg">{p.name}</td>
            <td className="py-2 px-2 border-t border-line-faint text-fg-muted">{p.category}</td>
            <td className="py-2 px-2 border-t border-line-faint text-right tabular-nums text-fg">
              {fmtUsd(p.revenue_30d)}
            </td>
            <td className="py-2 px-2 border-t border-line-faint text-right tabular-nums text-fg-muted">
              {p.pct_of_chain.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
