import type { HmProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Adj MCap = Float + 24mo Unlocks/Emissions − 24mo Buybacks.
//
// Visualized as a real balance scale on top of the Float base. The pans hang
// from the beam endpoints by gravity (chains stay vertical) and the HEAVIER
// SIDE GOES DOWN — like a physical scale. Pan radius scales with absolute
// weight; everything else uses fixed, consistent type so the visual reads as
// a precise instrument rather than a vibe-coded sketch.

const W = 720;
const H = 460;
const CX = W / 2;
const FY = 220; // fulcrum y
const BEAM_L = 200; // half-length
const CHAIN_L = 16; // chain hangs vertically by gravity
const MAX_TILT_DEG = 18;
const MIN_PAN_R = 32;
const MAX_PAN_R = 56;

export function AdjMcapBalance({ p }: { p: HmProtocol }) {
  const float = p.float_mcap_usd ?? 0;
  const unlocksTotal =
    (p.unlocks_24mo_usd ?? 0) + (p.emissions_24mo_usd ?? 0);
  const buybacks = p.buybacks_24mo_usd ?? 0;
  const adjMcap = p.adj_mcap_usd ?? 0;
  const netChange = unlocksTotal - buybacks;

  // Positive tilt = unlocks heavier = clockwise rotation in SVG = right pan
  // DOWN (the heavier side falls). The math below leaves chains vertical, so
  // the pans translate but never rotate, matching a real scale.
  const sum = unlocksTotal + buybacks;
  const ratio = sum > 0 ? (unlocksTotal - buybacks) / sum : 0;
  const tiltDeg = ratio * MAX_TILT_DEG;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // Beam endpoints after rotating around the fulcrum.
  const leftBeam = {
    x: CX - BEAM_L * Math.cos(tiltRad),
    y: FY - BEAM_L * Math.sin(tiltRad)
  };
  const rightBeam = {
    x: CX + BEAM_L * Math.cos(tiltRad),
    y: FY + BEAM_L * Math.sin(tiltRad)
  };
  // Pans hang by gravity → chain is vertical → pan is directly below the
  // beam endpoint by CHAIN_L + pan radius.

  const maxSide = Math.max(unlocksTotal, buybacks, 1);
  const panR = (v: number) =>
    v <= 0 ? MIN_PAN_R : MIN_PAN_R + (MAX_PAN_R - MIN_PAN_R) * Math.min(1, v / maxSide);
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
        style={{ maxHeight: 480 }}
      >
        {/* Result header */}
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
        <line
          x1={leftBeam.x}
          y1={leftBeam.y}
          x2={leftPan.x}
          y2={leftPan.y - lR}
          stroke="#52525b"
          strokeWidth={1.2}
        />
        <line
          x1={rightBeam.x}
          y1={rightBeam.y}
          x2={rightPan.x}
          y2={rightPan.y - rR}
          stroke="#52525b"
          strokeWidth={1.2}
        />

        {/* LEFT pan — buybacks (compression) */}
        <g>
          <text
            x={leftPan.x}
            y={leftPan.y - lR - 14}
            textAnchor="middle"
            fontSize="11"
            fill="#a1a1aa"
            letterSpacing="0.5"
          >
            BUYBACKS · 24mo
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

        {/* RIGHT pan — unlocks + emissions (expansion) */}
        <g>
          <text
            x={rightPan.x}
            y={rightPan.y - rR - 14}
            textAnchor="middle"
            fontSize="11"
            fill="#a1a1aa"
            letterSpacing="0.5"
          >
            UNLOCKS + EMISSIONS · 24mo
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
        <rect
          x={CX - 130}
          y={380}
          width={260}
          height={56}
          fill="#18181b"
          stroke="#3f3f46"
          rx={4}
        />
        <text
          x={CX}
          y={402}
          textAnchor="middle"
          fontSize="11"
          fill="#a1a1aa"
          letterSpacing="1.5"
        >
          FLOAT MCAP
        </text>
        <text
          x={CX}
          y={424}
          textAnchor="middle"
          fontSize="16"
          fill="#e4e4e7"
          fontWeight="600"
        >
          {fmtUsd(float)}
        </text>
      </svg>
    </div>
  );
}
