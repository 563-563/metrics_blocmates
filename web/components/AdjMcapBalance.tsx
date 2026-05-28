import type { HmProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Adj MCap = Float + 24mo Unlocks/Emissions − 24mo Buybacks
//
// A real balance scale. Pans hang vertically from the beam endpoints, so they
// translate but never rotate — labels stay axis-aligned. The HEAVIER side
// goes DOWN (correct physics). Only the pan circle scales with weight;
// every text element is locked to a fixed size at a fixed offset, so the
// composition reads as a precision instrument rather than free-floating
// elements at varied sizes.

const W = 720;
const H = 500;
const CX = W / 2;
const FY = 200; // fulcrum y
const BEAM_L = 168; // half-length — kept inward of the viewBox edges
const CHAIN_L = 36; // gap between beam end and pan top (room for top label)
const MAX_TILT_DEG = 16;
const MIN_PAN_R = 30;
const MAX_PAN_R = 52;

export function AdjMcapBalance({ p }: { p: HmProtocol }) {
  const float = p.float_mcap_usd ?? 0;
  const unlocksTotal =
    (p.unlocks_24mo_usd ?? 0) + (p.emissions_24mo_usd ?? 0);
  const buybacks = p.buybacks_24mo_usd ?? 0;
  const adjMcap = p.adj_mcap_usd ?? 0;
  const netChange = unlocksTotal - buybacks;

  // Tilt: positive when unlocks heavier. SVG rotate-positive = clockwise =
  // right end down (heavier side falls). Chains stay vertical (gravity).
  const sum = unlocksTotal + buybacks;
  const ratio = sum > 0 ? (unlocksTotal - buybacks) / sum : 0;
  const tiltDeg = ratio * MAX_TILT_DEG;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  const leftBeam = {
    x: CX - BEAM_L * Math.cos(tiltRad),
    y: FY - BEAM_L * Math.sin(tiltRad)
  };
  const rightBeam = {
    x: CX + BEAM_L * Math.cos(tiltRad),
    y: FY + BEAM_L * Math.sin(tiltRad)
  };

  const maxSide = Math.max(unlocksTotal, buybacks, 1);
  const panR = (v: number) =>
    v <= 0
      ? MIN_PAN_R
      : MIN_PAN_R + (MAX_PAN_R - MIN_PAN_R) * Math.min(1, v / maxSide);
  const lR = panR(buybacks);
  const rR = panR(unlocksTotal);
  const leftPan = { x: leftBeam.x, y: leftBeam.y + CHAIN_L + lR };
  const rightPan = { x: rightBeam.x, y: rightBeam.y + CHAIN_L + rR };

  const netColor =
    netChange > 0 ? "#f59e0b" : netChange < 0 ? "#10b981" : "#71717a";
  const netLabel =
    netChange > 0
      ? "supply expansion"
      : netChange < 0
        ? "supply compression"
        : "balanced";

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        style={{ maxHeight: 520 }}
      >
        {/* Header — Adj MCap result */}
        <text x={CX} y={28} textAnchor="middle" fontSize="11" fill="#a1a1aa" letterSpacing="1.5">
          ADJUSTED MCAP
        </text>
        <text x={CX} y={58} textAnchor="middle" fontSize="22" fill="#e4e4e7" fontWeight="600">
          {fmtUsd(adjMcap)}
        </text>
        {sum > 0 && (
          <text x={CX} y={80} textAnchor="middle" fontSize="12" fill={netColor}>
            {netChange > 0 ? "+" : "−"}
            {fmtUsd(Math.abs(netChange))} · {netLabel} over 24mo
          </text>
        )}

        {/* Beam — only this rotates */}
        <g transform={`rotate(${tiltDeg} ${CX} ${FY})`}>
          <rect
            x={CX - BEAM_L}
            y={FY - 3}
            width={BEAM_L * 2}
            height={6}
            fill="#52525b"
            rx={3}
          />
        </g>

        {/* Chains — vertical (gravity) */}
        <line x1={leftBeam.x} y1={leftBeam.y} x2={leftPan.x} y2={leftPan.y - lR} stroke="#52525b" strokeWidth={1.2} />
        <line x1={rightBeam.x} y1={rightBeam.y} x2={rightPan.x} y2={rightPan.y - rR} stroke="#52525b" strokeWidth={1.2} />

        {/* LEFT pan — buybacks (compression). Single-line top label. */}
        <g>
          <text
            x={leftPan.x}
            y={leftPan.y - lR - 14}
            textAnchor="middle"
            fontSize="11"
            fill="#a1a1aa"
            letterSpacing="0.5"
          >
            BUYBACKS
          </text>
          <circle
            cx={leftPan.x}
            cy={leftPan.y}
            r={lR}
            fill="#10b981"
            fillOpacity={buybacks > 0 ? 0.16 : 0.06}
            stroke="#10b981"
            strokeOpacity={buybacks > 0 ? 0.85 : 0.35}
            strokeWidth={1.5}
          />
          <text
            x={leftPan.x}
            y={leftPan.y + 5}
            textAnchor="middle"
            fontSize="14"
            fill={buybacks > 0 ? "#10b981" : "#52525b"}
            fontWeight="600"
          >
            {fmtUsd(buybacks)}
          </text>
          <text
            x={leftPan.x}
            y={leftPan.y + lR + 16}
            textAnchor="middle"
            fontSize="10"
            fill="#71717a"
          >
            compression
          </text>
        </g>

        {/* RIGHT pan — unlocks + emissions. Two-line top label to keep narrow. */}
        <g>
          <text textAnchor="middle" fontSize="11" fill="#a1a1aa" letterSpacing="0.5">
            <tspan x={rightPan.x} y={rightPan.y - rR - 26}>UNLOCKS</tspan>
            <tspan x={rightPan.x} y={rightPan.y - rR - 14}>+ EMISSIONS</tspan>
          </text>
          <circle
            cx={rightPan.x}
            cy={rightPan.y}
            r={rR}
            fill="#f59e0b"
            fillOpacity={unlocksTotal > 0 ? 0.16 : 0.06}
            stroke="#f59e0b"
            strokeOpacity={unlocksTotal > 0 ? 0.85 : 0.35}
            strokeWidth={1.5}
          />
          <text
            x={rightPan.x}
            y={rightPan.y + 5}
            textAnchor="middle"
            fontSize="14"
            fill={unlocksTotal > 0 ? "#f59e0b" : "#52525b"}
            fontWeight="600"
          >
            {fmtUsd(unlocksTotal)}
          </text>
          <text
            x={rightPan.x}
            y={rightPan.y + rR + 16}
            textAnchor="middle"
            fontSize="10"
            fill="#71717a"
          >
            expansion
          </text>
        </g>

        {/* Fulcrum */}
        <polygon
          points={`${CX - 16},${FY + 24} ${CX + 16},${FY + 24} ${CX},${FY - 2}`}
          fill="#71717a"
        />

        {/* Float base */}
        <rect x={CX - 130} y={440} width={260} height={56} fill="#18181b" stroke="#3f3f46" rx={4} />
        <text x={CX} y={462} textAnchor="middle" fontSize="11" fill="#a1a1aa" letterSpacing="1.5">
          FLOAT MCAP
        </text>
        <text x={CX} y={484} textAnchor="middle" fontSize="16" fill="#e4e4e7" fontWeight="600">
          {fmtUsd(float)}
        </text>
      </svg>
    </div>
  );
}
