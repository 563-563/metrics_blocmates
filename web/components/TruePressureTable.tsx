"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { HmProtocol, NpRollup } from "@/lib/data";
import { fmtUsdSigned, fmtTokensSigned, fmtPct } from "@/lib/format";
import { compareNum, compareStr, useSort } from "@/lib/use-sort";

export type TpRow = {
  p: HmProtocol;
  r7?: NpRollup;
  npTokens: number | null;
  npUsd: number | null;
  npDir: "seller" | "buyer" | "flat" | "none";
  pctSupply: number | null;
};

type SortKey = "name" | "np_30d" | "np_7d" | "tokens" | "pct_supply" | "direction";

function dirClass(d: TpRow["npDir"]) {
  if (d === "seller") return "text-negative";
  if (d === "buyer") return "text-positive";
  return "text-fg-faint";
}
function dirBarClass(d: TpRow["npDir"]) {
  if (d === "seller") return "bg-negative";
  if (d === "buyer") return "bg-positive";
  return "bg-fg-faint";
}
function dirArrow(d: TpRow["npDir"]) {
  if (d === "seller") return "▲";
  if (d === "buyer") return "▼";
  return "·";
}
const DIR_RANK: Record<TpRow["npDir"], number> = { seller: 3, buyer: 2, flat: 1, none: 0 };

function SortHeader({
  active,
  dir,
  onClick,
  children,
  align = "left",
  width
}: {
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
}) {
  const arrow = active ? (dir === "asc" ? "↑" : "↓") : "·";
  const alignCls = align === "right" ? "text-right" : "text-left";
  return (
    <th
      onClick={onClick}
      className={`${alignCls} font-normal py-2 px-2 cursor-pointer select-none hover:text-accent transition text-fg`}
      style={width ? { width } : undefined}
    >
      <span className={`inline-flex items-baseline gap-1 ${align === "right" ? "justify-end" : ""}`}>
        {align === "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">{arrow}</span>
        )}
        {children}
        {align !== "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">{arrow}</span>
        )}
      </span>
    </th>
  );
}

export function TruePressureTable({ rows }: { rows: TpRow[] }) {
  const { sortKey, sortDir, toggle } = useSort<SortKey>("np_30d", "desc");

  const sorted = useMemo(() => {
    const out = rows.slice();
    out.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return compareStr(a.p.name, b.p.name, sortDir);
        case "np_30d":
          // sort by absolute magnitude so loudest movers float regardless of sign
          return compareNum(Math.abs(a.npUsd ?? 0), Math.abs(b.npUsd ?? 0), sortDir);
        case "np_7d":
          return compareNum(Math.abs(a.r7?.net_pressure_usd ?? 0), Math.abs(b.r7?.net_pressure_usd ?? 0), sortDir);
        case "tokens":
          return compareNum(Math.abs(a.npTokens ?? 0), Math.abs(b.npTokens ?? 0), sortDir);
        case "pct_supply":
          return compareNum(Math.abs(a.pctSupply ?? 0), Math.abs(b.pctSupply ?? 0), sortDir);
        case "direction":
          return compareNum(DIR_RANK[a.npDir], DIR_RANK[b.npDir], sortDir);
        default:
          return 0;
      }
    });
    return out;
  }, [rows, sortKey, sortDir]);

  const maxAbs = Math.max(1, ...rows.map((r) => Math.abs(r.npUsd ?? 0)));

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest">
            <SortHeader active={sortKey === "name"} dir={sortDir} onClick={() => toggle("name", "asc")}>
              Protocol
            </SortHeader>
            <SortHeader active={sortKey === "np_30d"} dir={sortDir} onClick={() => toggle("np_30d")} width="220px">
              Net Pressure · 30d
            </SortHeader>
            <SortHeader active={sortKey === "np_7d"} dir={sortDir} onClick={() => toggle("np_7d")} align="right" width="140px">
              7d
            </SortHeader>
            <SortHeader active={sortKey === "tokens"} dir={sortDir} onClick={() => toggle("tokens")} align="right" width="120px">
              Tokens · 30d
            </SortHeader>
            <SortHeader active={sortKey === "pct_supply"} dir={sortDir} onClick={() => toggle("pct_supply")} align="right" width="100px">
              % supply
            </SortHeader>
            <SortHeader active={sortKey === "direction"} dir={sortDir} onClick={() => toggle("direction")} align="right" width="120px">
              Direction
            </SortHeader>
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ p, r7, npUsd, npTokens, npDir, pctSupply }) => {
            const cls = dirClass(npDir);
            const barCls = dirBarClass(npDir);
            const arrow = dirArrow(npDir);
            const barPct = npUsd != null ? (Math.abs(npUsd) / maxAbs) * 100 : 0;
            return (
              <tr key={p.slug} className="border-line-faint group">
                <td className="py-3 px-2 border-t border-line-faint">
                  <Link href={`/${p.slug}/tp`} className="flex items-center gap-2.5">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" width={28} height={28} className="rounded-full bg-surface-elev shrink-0" loading="lazy" />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-surface-elev shrink-0" />
                    )}
                    <span>
                      <span className="block text-fg group-hover:text-accent font-medium">{p.name}</span>
                      <span className="block text-[11px] text-fg-muted">
                        ${p.symbol} · <span className="text-fg-faint">{p.phase.active}</span>
                      </span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 px-2 border-t border-line-faint">
                  <Link href={`/${p.slug}/tp`} className="block">
                    {npUsd != null ? (
                      <>
                        <div className={`flex items-baseline gap-1.5 ${cls}`}>
                          <span aria-hidden="true" className="text-xs">{arrow}</span>
                          <span className="text-sm font-mono font-medium tabular-nums">{fmtUsdSigned(npUsd)}</span>
                        </div>
                        <div className="mt-1 h-[3px] rounded-full bg-line-faint overflow-hidden">
                          <div className={`h-full rounded-full ${barCls}`} style={{ width: `${barPct}%` }} />
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-fg-faint">no flow data</span>
                    )}
                  </Link>
                </td>
                <td className={`py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums ${cls}`}>
                  {r7?.net_pressure_usd != null ? fmtUsdSigned(r7.net_pressure_usd) : <span className="text-fg-faint">—</span>}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                  {npTokens != null ? `${fmtTokensSigned(npTokens)} ${p.symbol}` : <span className="text-fg-faint">—</span>}
                </td>
                <td className="py-3 px-2 border-t border-line-faint text-right font-mono tabular-nums text-fg-muted">
                  {pctSupply != null ? fmtPct(pctSupply, 2) : <span className="text-fg-faint">—</span>}
                </td>
                <td className={`py-3 px-2 border-t border-line-faint text-right ${cls}`}>
                  <span className="text-xs uppercase tracking-widest">
                    {npDir === "seller" ? "net seller" : npDir === "buyer" ? "net buyer" : "—"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
