"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { ChainSummary } from "@/lib/chains";
import { CHAIN_COLORS } from "@/lib/chain-colors";
import { fmtUsd } from "@/lib/format";
import { ChainScaleBar } from "./ChainScaleBar";
import { ChainTrendSparkline } from "./ChainTrendSparkline";
import { compareNum, compareStr, useSort } from "@/lib/use-sort";
import { ScrollableTable } from "./ScrollableTable";

type SortKey =
  | "name"
  | "monthly_gdp"
  | "annualized"
  | "trend"
  | "mcap"
  | "gdp_multiple"
  | "tvl"
  | "gdp_over_tvl"
  | "rev_over_gdp"
  | "top_app";

function chainImage(slug: string, cgImage: string | null): string {
  return cgImage || `https://icons.llamao.fi/icons/chains/rsz_${slug}.jpg`;
}

function gdpTvlClass(band: string | null): string {
  switch (band) {
    case "high":      return "text-positive";
    case "med-high":  return "text-positive";
    case "med-low":   return "text-accent";
    case "low":       return "text-negative";
    default:          return "text-fg-muted";
  }
}
function revGdpClass(band: string | null): string {
  switch (band) {
    case "app-friendly": return "text-positive";
    case "modest":       return "text-positive";
    case "heavy":        return "text-accent";
    case "extractive":   return "text-negative";
    default:             return "text-fg-muted";
  }
}
function fmtPctOrDash(v: number | null, dec = 1): string {
  return v == null ? "—" : `${(v * 100).toFixed(dec)}%`;
}
function fmtMultOrDash(v: number | null): string {
  return v == null ? "—" : `${v.toFixed(1)}×`;
}

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
      className={`${alignCls} font-normal py-3 px-2 cursor-pointer select-none hover:text-accent transition text-fg`}
      style={width ? { width } : undefined}
    >
      <span
        className={`inline-flex items-baseline gap-1 ${align === "right" ? "justify-end" : ""}`}
      >
        {align === "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">
            {arrow}
          </span>
        )}
        {children}
        {align !== "right" && (
          <span className={`text-[9px] ${active ? "text-accent" : "text-fg-faint"}`} aria-hidden="true">
            {arrow}
          </span>
        )}
      </span>
    </th>
  );
}

export function ChainsTable({
  chains,
  sparklineData
}: {
  chains: ChainSummary[];
  sparklineData: Record<string, number[]>;
}) {
  const { sortKey, sortDir, toggle } = useSort<SortKey>("monthly_gdp", "desc");

  const sorted = useMemo(() => {
    const out = chains.slice();
    out.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return compareStr(a.name, b.name, sortDir);
        case "monthly_gdp":
          return compareNum(a.gdp_30d_usd, b.gdp_30d_usd, sortDir);
        case "annualized":
          return compareNum(a.gdp_annualized_usd, b.gdp_annualized_usd, sortDir);
        case "trend": {
          const av = sparklineData[a.slug]?.slice(-1)[0] ?? null;
          const bv = sparklineData[b.slug]?.slice(-1)[0] ?? null;
          return compareNum(av, bv, sortDir);
        }
        case "mcap":
          return compareNum(a.mcap_usd, b.mcap_usd, sortDir);
        case "gdp_multiple":
          return compareNum(a.gdp_multiple, b.gdp_multiple, sortDir);
        case "tvl":
          return compareNum(a.tvl_usd, b.tvl_usd, sortDir);
        case "gdp_over_tvl":
          return compareNum(a.gdp_over_tvl_ann, b.gdp_over_tvl_ann, sortDir);
        case "rev_over_gdp":
          return compareNum(a.rev_over_gdp_7d, b.rev_over_gdp_7d, sortDir);
        case "top_app":
          return compareStr(a.top_protocol ?? "", b.top_protocol ?? "", sortDir);
        default:
          return 0;
      }
    });
    return out;
  }, [chains, sparklineData, sortKey, sortDir]);

  const maxGdp = Math.max(...chains.map((c) => c.gdp_30d_usd || 0));
  const maxMcap = Math.max(...chains.map((c) => c.mcap_usd || 0));
  const maxTvl = Math.max(...chains.map((c) => c.tvl_usd || 0));

  return (
    <ScrollableTable>
      <table className="w-full text-sm border-separate border-spacing-0 min-w-[1040px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest">
            <SortHeader active={sortKey === "name"} dir={sortDir} onClick={() => toggle("name", "asc")}>
              Chain
            </SortHeader>
            <SortHeader active={sortKey === "monthly_gdp"} dir={sortDir} onClick={() => toggle("monthly_gdp")} align="right" width="130px">
              Monthly GDP
            </SortHeader>
            <SortHeader active={sortKey === "annualized"} dir={sortDir} onClick={() => toggle("annualized")} align="right" width="110px">
              Annualized
            </SortHeader>
            <SortHeader active={sortKey === "trend"} dir={sortDir} onClick={() => toggle("trend")} width="90px">
              30d trend
            </SortHeader>
            <SortHeader active={sortKey === "mcap"} dir={sortDir} onClick={() => toggle("mcap")} align="right" width="130px">
              Mcap
            </SortHeader>
            <SortHeader active={sortKey === "gdp_multiple"} dir={sortDir} onClick={() => toggle("gdp_multiple")} align="right" width="80px">
              GDP Mult.
            </SortHeader>
            <SortHeader active={sortKey === "tvl"} dir={sortDir} onClick={() => toggle("tvl")} align="right" width="130px">
              TVL
            </SortHeader>
            <SortHeader active={sortKey === "gdp_over_tvl"} dir={sortDir} onClick={() => toggle("gdp_over_tvl")} align="right" width="80px">
              GDP / TVL
            </SortHeader>
            <SortHeader active={sortKey === "rev_over_gdp"} dir={sortDir} onClick={() => toggle("rev_over_gdp")} align="right" width="80px">
              REV / GDP
            </SortHeader>
            <SortHeader active={sortKey === "top_app"} dir={sortDir} onClick={() => toggle("top_app", "asc")}>
              Top app
            </SortHeader>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c) => {
            const hasStruct = !!c.structural_note;
            const color = CHAIN_COLORS[c.slug] || "#71717a";
            const spark = sparklineData[c.slug] || [];
            const isStableTop = c.top_category === "Stablecoin Issuer";
            return (
              <tr key={c.slug} className="border-line-faint group hover:bg-canvas/60 transition">
                <td className="py-2.5 px-2 border-t border-line-faint">
                  <Link href={`/chains/${c.slug}`} className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={chainImage(c.slug, c.image)}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full bg-surface-elev shrink-0"
                      loading="lazy"
                    />
                    <span>
                      <span className="block text-fg group-hover:text-accent font-medium leading-tight">
                        {c.name}
                        {hasStruct && (
                          <span className="ml-1 text-accent/80" title={c.structural_note ?? ""}>
                            ⚠
                          </span>
                        )}
                      </span>
                      <span className="block text-[11px] text-fg-muted">
                        {c.symbol ? `$${c.symbol}` : <span className="text-fg-faint">no native</span>}
                      </span>
                    </span>
                  </Link>
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-right tabular-nums text-fg">
                  {fmtUsd(c.gdp_30d_usd)}
                  <ChainScaleBar value={c.gdp_30d_usd} max={maxGdp} color={color} />
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-right tabular-nums text-fg-muted">
                  {fmtUsd(c.gdp_annualized_usd)}
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint">
                  <ChainTrendSparkline values={spark} color={color} />
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-right tabular-nums text-fg-muted">
                  {c.mcap_usd != null ? fmtUsd(c.mcap_usd) : <span className="text-fg-faint">—</span>}
                  <ChainScaleBar value={c.mcap_usd} max={maxMcap} color={color} />
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-right tabular-nums text-fg">
                  {fmtMultOrDash(c.gdp_multiple)}
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-right tabular-nums text-fg-muted">
                  {c.tvl_usd != null ? fmtUsd(c.tvl_usd) : <span className="text-fg-faint">—</span>}
                  <ChainScaleBar value={c.tvl_usd} max={maxTvl} color={color} />
                </td>
                <td className={`py-2.5 px-2 border-t border-line-faint text-right tabular-nums ${gdpTvlClass(c.gdp_over_tvl_band)}`}>
                  {fmtPctOrDash(c.gdp_over_tvl_ann)}
                </td>
                <td className={`py-2.5 px-2 border-t border-line-faint text-right tabular-nums ${revGdpClass(c.rev_over_gdp_band)}`}>
                  {fmtPctOrDash(c.rev_over_gdp_7d)}
                </td>
                <td className="py-2.5 px-2 border-t border-line-faint text-fg-muted">
                  {c.top_protocol ? (
                    <span>
                      <span className={`${isStableTop ? "text-accent" : "text-fg"}`}>{c.top_protocol}</span>
                      {c.top_category && (
                        <span className="block text-[11px] text-fg-muted">{c.top_category}</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-fg-faint">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ScrollableTable>
  );
}
