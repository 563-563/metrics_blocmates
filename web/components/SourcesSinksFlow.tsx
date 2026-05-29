import type { NpProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Animated Sources & Sinks flow — the Net Pressure formula visualized as
// curved streams of particles meeting at a central "market" node.
//
//   (Unlocks + Treasury Sells)
//        − (Buybacks + Burns + Treasury accum + Net staking lockups)
//
// Each component renders as a cubic-Bezier curve carrying particles from its
// label to the center; speed and particle density track the component's 30d
// $/day rate. Negative-sink components (e.g. net UN-staking) flip to the
// sources side automatically so the formula identity stays exact.

type Row = {
  key: string;
  label: string;
  perDayUsd: number;
  intended: "source" | "sink";
};

// Muted theme-neutral hues that read in BOTH light cream and dark warm
// backgrounds. Brighter rose/emerald clashed on cream.
const SRC_COLOR = "#B65854"; // sources / sell pressure
const SINK_COLOR = "#6B9A4F"; // sinks / buy pressure
const NEUTRAL_COLOR = "#948D80"; // flat / idle (matches fg-muted in light)

function classifyRow(row: Row): "source" | "sink" | "idle" {
  if (row.perDayUsd === 0) return "idle";
  if (row.perDayUsd > 0) return row.intended;
  // Negative magnitude → flip side (a negative sink IS source pressure).
  return row.intended === "sink" ? "source" : "sink";
}

function displayLabel(row: Row): string {
  if (row.perDayUsd >= 0) return row.label;
  // For negative magnitudes, rename to reflect the reversed direction.
  if (row.key === "staking") return "Net unstaking";
  if (row.key === "treasury_accum") return "Treasury distribution";
  return `Net reversal: ${row.label}`;
}

export function SourcesSinksFlow({
  np,
  priceUsd
}: {
  np: NpProtocol;
  priceUsd: number;
}) {
  const r = np.rollups["30d"];
  if (!r) return null;
  const days = r.window_days || 30;
  const tokToUsdPerDay = (t: number) => (t * priceUsd) / days;

  const allRows: Row[] = [
    { key: "unlocks", label: "Unlocks", perDayUsd: (r.unlocks_usd ?? 0) / days, intended: "source" },
    { key: "treasury_sells", label: "Treasury sells", perDayUsd: tokToUsdPerDay(r.treasury_sells_tokens || 0), intended: "source" },
    { key: "buybacks", label: "Buybacks", perDayUsd: (r.buybacks_usd ?? 0) / days, intended: "sink" },
    { key: "burns", label: "Burns", perDayUsd: tokToUsdPerDay(r.burns_tokens || 0), intended: "sink" },
    { key: "treasury_accum", label: "Treasury accum", perDayUsd: tokToUsdPerDay(r.treasury_accumulation_tokens || 0), intended: "sink" },
    { key: "staking", label: "Net staking lockups", perDayUsd: tokToUsdPerDay(r.net_staking_lockups_tokens || 0), intended: "sink" }
  ];

  const sources = allRows.filter((row) => classifyRow(row) === "source");
  const sinks = allRows.filter((row) => classifyRow(row) === "sink");
  const idle = allRows.filter((row) => classifyRow(row) === "idle");

  // Place idle rows back on their intended side (just greyed) so structure stays legible.
  const sourcesAll = [...sources, ...idle.filter((row) => row.intended === "source")];
  const sinksAll = [...sinks, ...idle.filter((row) => row.intended === "sink")];

  const sourcesTotal = sourcesAll.reduce((s, x) => s + Math.abs(x.perDayUsd), 0);
  const sinksTotal = sinksAll.reduce((s, x) => s + Math.abs(x.perDayUsd), 0);
  const netPerDay = sourcesTotal - sinksTotal;
  const netDir: "seller" | "buyer" | "flat" =
    Math.abs(netPerDay) < Math.max(sourcesTotal, sinksTotal) * 0.02
      ? "flat"
      : netPerDay > 0
        ? "seller"
        : "buyer";
  const netColor = netDir === "seller" ? SRC_COLOR : netDir === "buyer" ? SINK_COLOR : NEUTRAL_COLOR;
  const netLabel = netDir === "seller" ? "NET SELLER" : netDir === "buyer" ? "NET BUYER" : "BALANCED";
  // Shape redundancy alongside color for colorblind accessibility.
  const netGlyph = netDir === "seller" ? "▲" : netDir === "buyer" ? "▼" : "·";
  const maxRate = Math.max(
    1,
    ...allRows.map((row) => Math.abs(row.perDayUsd))
  );

  // ---- SVG layout
  const W = 900;
  const H = 380;
  const CX = W / 2;
  const CY = H / 2;
  const NODE_R = 38;
  const LEFT_ANCHOR = 230; // where source curves start (after the label column)
  const RIGHT_ANCHOR = W - 230;

  const yFor = (count: number, i: number) => {
    if (count === 1) return CY;
    const span = H - 80;
    const top = 40;
    return top + (span * i) / (count - 1);
  };

  // Per-row particle config — heavier flow = more & faster particles.
  function particleConfig(row: Row): { count: number; durSec: number } | null {
    if (row.perDayUsd === 0) return null;
    const ratio = Math.min(1, Math.abs(row.perDayUsd) / maxRate);
    const count = Math.max(2, Math.min(6, Math.round(2 + ratio * 4)));
    const durSec = 4.5 - ratio * 3.2; // 4.5s slow → 1.3s fast
    return { count, durSec };
  }

  return (
    <div>
      {/* Header — totals. ▲/▼ glyphs alongside colors so the
          direction is readable without relying on red vs green alone. */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-line">
        <div className="text-left">
          <p className="text-[11px] uppercase tracking-widest text-fg-muted">Sources · 30d</p>
          <p className="text-xl font-semibold mt-1 font-mono tabular-nums" style={{ color: SRC_COLOR }}>
            <span aria-hidden="true" className="mr-1">▲</span>
            +{fmtUsd(sourcesTotal)}/day
          </p>
          <p className="text-[11px] text-fg-muted mt-0.5">sell pressure</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-fg-muted">Net Pressure</p>
          <p className="text-xl font-semibold mt-1 font-mono tabular-nums" style={{ color: netColor }}>
            <span aria-hidden="true" className="mr-1">{netGlyph}</span>
            {netPerDay >= 0 ? "+" : "−"}
            {fmtUsd(Math.abs(netPerDay))}/day
          </p>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: netColor }}>
            {netLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-widest text-fg-muted">Sinks · 30d</p>
          <p className="text-xl font-semibold mt-1 font-mono tabular-nums" style={{ color: SINK_COLOR }}>
            <span aria-hidden="true" className="mr-1">▼</span>
            −{fmtUsd(sinksTotal)}/day
          </p>
          <p className="text-[11px] text-fg-muted mt-0.5">buy pressure</p>
        </div>
      </div>

      {/* The flow */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto select-none"
          style={{ maxHeight: 460 }}
        >
          <defs>
            <radialGradient id="market-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={netColor} stopOpacity="0.45" />
              <stop offset="60%" stopColor={netColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor={netColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Curves + particles + labels — sources */}
          {sourcesAll.map((row, i) => {
            const y = yFor(sourcesAll.length, i);
            const startX = LEFT_ANCHOR;
            const endX = CX - NODE_R;
            // Cubic Bezier control points create the gentle S-curve toward center.
            const c1x = startX + (endX - startX) * 0.45;
            const c2x = startX + (endX - startX) * 0.7;
            const d = `M ${startX} ${y} C ${c1x} ${y}, ${c2x} ${CY}, ${endX} ${CY}`;
            const pathId = `src-path-${i}`;
            const cfg = particleConfig(row);
            const idleRow = row.perDayUsd === 0;
            const display = displayLabel(row);

            return (
              <g key={row.key}>
                <path
                  id={pathId}
                  d={d}
                  fill="none"
                  stroke={SRC_COLOR}
                  strokeWidth={idleRow ? 0.7 : 1.2}
                  opacity={idleRow ? 0.18 : 0.32}
                />
                {cfg &&
                  Array.from({ length: cfg.count }).map((_, k) => (
                    <circle key={k} r={3.4} fill={SRC_COLOR} opacity={0.95}>
                      <animateMotion
                        dur={`${cfg.durSec.toFixed(2)}s`}
                        begin={`${((cfg.durSec * k) / cfg.count).toFixed(2)}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  ))}
                <text x={LEFT_ANCHOR - 14} y={y - 4} textAnchor="end" fontSize="14" style={{ fill: idleRow ? "rgb(var(--fg-faint))" : "rgb(var(--fg))" }}>
                  {display}
                </text>
                <text x={LEFT_ANCHOR - 14} y={y + 14} textAnchor="end" fontSize="11.5" style={{ fill: idleRow ? "rgb(var(--fg-faint))" : "rgb(var(--fg-muted))" }}>
                  {idleRow ? "—" : `${fmtUsd(Math.abs(row.perDayUsd))}/day`}
                </text>
              </g>
            );
          })}

          {/* Curves + particles + labels — sinks.
              Path drawn FROM the market node OUT toward the sink label so
              animateMotion carries particles outward — sinks pull tokens OUT
              of the system, not into it. */}
          {sinksAll.map((row, i) => {
            const y = yFor(sinksAll.length, i);
            const labelX = RIGHT_ANCHOR;
            const marketX = CX + NODE_R;
            const c1x = marketX + (labelX - marketX) * 0.3;
            const c2x = marketX + (labelX - marketX) * 0.55;
            // Start at the market, curve out to the sink label.
            const d = `M ${marketX} ${CY} C ${c1x} ${CY}, ${c2x} ${y}, ${labelX} ${y}`;
            const pathId = `sink-path-${i}`;
            const cfg = particleConfig(row);
            const idleRow = row.perDayUsd === 0;
            const display = displayLabel(row);

            return (
              <g key={row.key}>
                <path
                  id={pathId}
                  d={d}
                  fill="none"
                  stroke={SINK_COLOR}
                  strokeWidth={idleRow ? 0.7 : 1.2}
                  opacity={idleRow ? 0.18 : 0.32}
                />
                {cfg &&
                  Array.from({ length: cfg.count }).map((_, k) => (
                    <circle key={k} r={3.4} fill={SINK_COLOR} opacity={0.95}>
                      <animateMotion
                        dur={`${cfg.durSec.toFixed(2)}s`}
                        begin={`${((cfg.durSec * k) / cfg.count).toFixed(2)}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  ))}
                <text x={RIGHT_ANCHOR + 14} y={y - 4} textAnchor="start" fontSize="14" style={{ fill: idleRow ? "rgb(var(--fg-faint))" : "rgb(var(--fg))" }}>
                  {display}
                </text>
                <text x={RIGHT_ANCHOR + 14} y={y + 14} textAnchor="start" fontSize="11.5" style={{ fill: idleRow ? "rgb(var(--fg-faint))" : "rgb(var(--fg-muted))" }}>
                  {idleRow ? "—" : `${fmtUsd(Math.abs(row.perDayUsd))}/day`}
                </text>
              </g>
            );
          })}

          {/* Central market node */}
          <circle cx={CX} cy={CY} r={NODE_R + 18} fill="url(#market-glow)" />
          <circle
            cx={CX}
            cy={CY}
            r={NODE_R}
            style={{ fill: "rgb(var(--canvas))", stroke: netColor }}
            strokeWidth={2}
          />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="22" fill={netColor} fontWeight="600">
            {netDir === "seller" ? "↑" : netDir === "buyer" ? "↓" : "·"}
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="9" style={{ fill: "rgb(var(--fg-muted))" }} letterSpacing="1.5">
            MARKET
          </text>
        </svg>
      </div>

    </div>
  );
}
