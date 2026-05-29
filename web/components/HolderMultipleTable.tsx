"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { HmProtocol } from "@/lib/data";
import { fmtMultiple, fmtUsd } from "@/lib/format";
import { Sparkline } from "./Sparkline";
import { compareNum, compareStr, useSort } from "@/lib/use-sort";

// Only these slugs have a per-protocol detail page (/[slug] + /[slug]/hm).
// Synthesized rows from data/config.json render as plain text instead of
// clickable links to avoid 404-on-click. When detail pages exist for more
// protocols, add them here.
const PROTOCOLS_WITH_DETAIL_PAGE = new Set(["sky", "aave", "hyperliquid", "lighter"]);

export type HmRow = {
  p: HmProtocol;
  // Bar magnitude only — no band label text, no colored cell — reader judges.
  barPct: number;
  hmMoMPct: number | null;
  spark: number[];
  verif: { label: string; cls: string; dot: string };
};

type SortKey = "name" | "hm" | "hm_mom" | "buyback90" | "real_capture" | "verif";

const VERIF_RANK: Record<string, number> = {
  onchain: 5,
  onchain_aggregate: 4,
  proxy: 3,
  governance_stated: 2,
  onchain_dormant: 1
};

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
      className={`${alignCls} font-normal py-2 px-2 cursor-pointer select-none hover:text-accent transition ${
        active ? "text-fg" : "text-fg"
      }`}
      style={width ? { width } : undefined}
    >
      <span className="inline-flex items-baseline gap-1">
        {children}
        <span
          className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`}
          aria-hidden="true"
        >
          {arrow}
        </span>
      </span>
    </th>
  );
}

export function HolderMultipleTable({ rows }: { rows: HmRow[] }) {
  const { sortKey, sortDir, toggle } = useSort<SortKey>("real_capture", "desc");

  const sorted = useMemo(() => {
    const out = rows.slice();
    out.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return compareStr(a.p.name, b.p.name, sortDir);
        case "hm":
          return compareNum(a.p.hm, b.p.hm, sortDir);
        case "hm_mom":
          return compareNum(a.hmMoMPct, b.hmMoMPct, sortDir);
        case "buyback90":
          return compareNum(
            a.spark.reduce((s, v) => s + v, 0),
            b.spark.reduce((s, v) => s + v, 0),
            sortDir
          );
        case "real_capture":
          return compareNum(a.p.real_capture_usd, b.p.real_capture_usd, sortDir);
        case "verif":
          return compareNum(
            VERIF_RANK[a.p.annual_buyback_verification] ?? 0,
            VERIF_RANK[b.p.annual_buyback_verification] ?? 0,
            sortDir
          );
        default:
          return 0;
      }
    });
    return out;
  }, [rows, sortKey, sortDir]);

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm border-separate border-spacing-0 min-w-[760px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest">
            <SortHeader active={sortKey === "name"} dir={sortDir} onClick={() => toggle("name", "asc")}>
              Protocol
            </SortHeader>
            <SortHeader
              active={sortKey === "hm"}
              dir={sortDir}
              onClick={() => toggle("hm", "asc")}
              width="200px"
            >
              Holder Multiple
            </SortHeader>
            <SortHeader
              active={sortKey === "hm_mom"}
              dir={sortDir}
              onClick={() => toggle("hm_mom")}
              align="right"
              width="100px"
            >
              30d Δ
            </SortHeader>
            <SortHeader
              active={sortKey === "buyback90"}
              dir={sortDir}
              onClick={() => toggle("buyback90")}
              width="120px"
            >
              Buyback 90d
            </SortHeader>
            <SortHeader
              active={sortKey === "real_capture"}
              dir={sortDir}
              onClick={() => toggle("real_capture")}
              align="right"
            >
              Real Capture
            </SortHeader>
            <SortHeader
              active={sortKey === "verif"}
              dir={sortDir}
              onClick={() => toggle("verif")}
              align="right"
            >
              Data
            </SortHeader>
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ p, barPct, hmMoMPct, spark, verif }) => {
            const hasDetailPage = PROTOCOLS_WITH_DETAIL_PAGE.has(p.slug);
            const protocolInner = (
              <>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full bg-surface-elev shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-surface-elev shrink-0" />
                )}
                <span>
                  <span className={`block font-medium ${hasDetailPage ? "text-fg group-hover:text-accent" : "text-fg"}`}>{p.name}</span>
                  <span className="block text-[11px] text-fg-muted">
                    ${p.symbol} · <span className="text-fg-faint">{p.phase.active}</span>
                  </span>
                </span>
              </>
            );
            const hmInner = (
              <>
                <span className="text-lg font-mono font-semibold tabular-nums text-fg">
                  {fmtMultiple(p.hm)}
                </span>
                <div className="mt-1.5 h-[3px] rounded-full bg-line-faint overflow-hidden">
                  <div className="h-full rounded-full bg-fg-muted" style={{ width: `${barPct}%` }} />
                </div>
              </>
            );
            return (
            <tr key={p.slug} className="border-line-faint group">
              <td className="py-3 px-2 border-t border-line-faint">
                {hasDetailPage ? (
                  <Link href={`/${p.slug}`} className="flex items-center gap-2.5">
                    {protocolInner}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2.5">{protocolInner}</div>
                )}
              </td>
              <td className="py-3 px-2 border-t border-line-faint">
                {hasDetailPage ? (
                  <Link href={`/${p.slug}/hm`} className="block px-1">
                    {hmInner}
                  </Link>
                ) : (
                  <div className="block px-1">{hmInner}</div>
                )}
              </td>
              <td className="py-3 px-2 border-t border-line-faint text-right tabular-nums">
                {hmMoMPct == null ? (
                  <span className="text-fg-faint">—</span>
                ) : (
                  <span className={hmMoMPct > 0 ? "text-negative" : hmMoMPct < 0 ? "text-positive" : "text-fg-muted"}>
                    {hmMoMPct > 0 ? "↑" : hmMoMPct < 0 ? "↓" : "·"}{" "}
                    {Math.abs(hmMoMPct).toFixed(1)}%
                  </span>
                )}
              </td>
              <td className="py-3 px-2 border-t border-line-faint text-positive">
                <Sparkline data={spark} color="currentColor" />
              </td>
              <td className="py-3 px-2 border-t border-line-faint text-right tabular-nums text-fg-muted">
                {p.real_capture_usd > 0 ? `${fmtUsd(p.real_capture_usd)}/yr` : "—"}
              </td>
              <td className="py-3 px-2 border-t border-line-faint text-right">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${verif.cls}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${verif.dot}`} />
                  {verif.label}
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
