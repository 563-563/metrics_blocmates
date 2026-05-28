import type { HmProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Adjusted MCap visualized as a balance scale resting on the Float base.
// Two pans hang from the beam:
//   • LEFT  pan = 24mo Buybacks  — supply compression (pulls beam down)
//   • RIGHT pan = 24mo Unlocks + Emissions — supply expansion (pushes beam up)
// The beam tilts by the relative imbalance, so the geometric tilt directly
// matches the sign of (Adj MCap − Float).
//
// Below the fulcrum sits the Float MCap (current circulating × price) — the
// anchor mass that doesn't move. Adj MCap label above the beam is the result.

const W = 640;
const H = 380;
const BEAM_LEN = 220; // half-length from fulcrum to each pan
const FULCRUM_Y = 200;

export function AdjMcapBalance({ p }: { p: HmProtocol }) {
  const float = p.float_mcap_usd ?? 0;
  const unlocksTotal =
    (p.unlocks_24mo_usd ?? 0) + (p.emissions_24mo_usd ?? 0);
  const buybacks = p.buybacks_24mo_usd ?? 0;
  const adjMcap = p.adj_mcap_usd ?? 0;
  const netChange = unlocksTotal - buybacks;

  // Tilt: −30° (buyback-heavy, supply compresses) → +30° (unlock-heavy).
  const sum = unlocksTotal + buybacks;
  const ratio = sum > 0 ? (unlocksTotal - buybacks) / sum : 0;
  const tiltDeg = ratio * 28;

  // Pan visual size scales with relative weight on each side (capped).
  const maxSide = Math.max(unlocksTotal, buybacks, 1);
  const panScale = (v: number) =>
    v <= 0 ? 0.6 : 0.7 + Math.min(0.8, v / maxSide);

  const leftScale = panScale(buybacks);
  const rightScale = panScale(unlocksTotal);

  const cx = W / 2;
  const netColor = netChange > 0 ? "#f59e0b" : netChange < 0 ? "#10b981" : "#71717a";
  const netLabel =
    netChange > 0
      ? "supply expansion"
      : netChange < 0
        ? "supply compression"
        : "supply unchanged";

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        style={{ maxHeight: 460 }}
      >
        {/* Top — Adj MCap result */}
        <text
          x={cx}
          y={28}
          textAnchor="middle"
          fontSize="11"
          fill="#a1a1aa"
          letterSpacing="1.5"
        >
          ADJUSTED MCAP
        </text>
        <text x={cx} y={58} textAnchor="middle" fontSize="24" fill="#e4e4e7" fontWeight="600">
          {fmtUsd(adjMcap)}
        </text>
        {sum > 0 && (
          <text x={cx} y={78} textAnchor="middle" fontSize="12" fill={netColor}>
            {netChange > 0 ? "+" : netChange < 0 ? "−" : ""}
            {fmtUsd(Math.abs(netChange))} · {netLabel} over 24mo
          </text>
        )}

        {/* Beam group — rotated by tilt */}
        <g transform={`translate(${cx} ${FULCRUM_Y}) rotate(${-tiltDeg})`}>
          {/* Beam */}
          <rect
            x={-BEAM_LEN}
            y={-3}
            width={BEAM_LEN * 2}
            height={6}
            fill="#52525b"
            rx={3}
          />
          {/* Connector lines down to pans */}
          <line x1={-BEAM_LEN + 10} y1={3} x2={-BEAM_LEN + 10} y2={42} stroke="#52525b" strokeWidth={1} />
          <line x1={BEAM_LEN - 10} y1={3} x2={BEAM_LEN - 10} y2={42} stroke="#52525b" strokeWidth={1} />

          {/* LEFT pan — buybacks (supply compression) */}
          <g transform={`translate(${-BEAM_LEN + 10} 62) scale(${leftScale})`}>
            <ellipse
              cx={0}
              cy={0}
              rx={70}
              ry={10}
              fill="#10b981"
              fillOpacity={buybacks > 0 ? 0.18 : 0.06}
              stroke="#10b981"
              strokeOpacity={buybacks > 0 ? 0.9 : 0.35}
              strokeWidth={1.5}
            />
            <text x={0} y={-30} textAnchor="middle" fontSize="10.5" fill="#a1a1aa" letterSpacing="0.5">
              Buybacks · 24mo
            </text>
            <text
              x={0}
              y={6}
              textAnchor="middle"
              fontSize="15"
              fill={buybacks > 0 ? "#10b981" : "#52525b"}
              fontWeight="600"
            >
              {fmtUsd(buybacks)}
            </text>
            <text x={0} y={26} textAnchor="middle" fontSize="10" fill="#71717a">
              compression
            </text>
          </g>

          {/* RIGHT pan — unlocks + emissions (supply expansion) */}
          <g transform={`translate(${BEAM_LEN - 10} 62) scale(${rightScale})`}>
            <ellipse
              cx={0}
              cy={0}
              rx={80}
              ry={10}
              fill="#f59e0b"
              fillOpacity={unlocksTotal > 0 ? 0.18 : 0.06}
              stroke="#f59e0b"
              strokeOpacity={unlocksTotal > 0 ? 0.9 : 0.35}
              strokeWidth={1.5}
            />
            <text x={0} y={-30} textAnchor="middle" fontSize="10.5" fill="#a1a1aa" letterSpacing="0.5">
              Unlocks + Emissions · 24mo
            </text>
            <text
              x={0}
              y={6}
              textAnchor="middle"
              fontSize="15"
              fill={unlocksTotal > 0 ? "#f59e0b" : "#52525b"}
              fontWeight="600"
            >
              {fmtUsd(unlocksTotal)}
            </text>
            <text x={0} y={26} textAnchor="middle" fontSize="10" fill="#71717a">
              expansion
            </text>
          </g>
        </g>

        {/* Fulcrum */}
        <polygon
          points={`${cx - 16},${FULCRUM_Y + 22} ${cx + 16},${FULCRUM_Y + 22} ${cx},${FULCRUM_Y - 4}`}
          fill="#71717a"
        />

        {/* Float base */}
        <rect
          x={cx - 130}
          y={FULCRUM_Y + 28}
          width={260}
          height={62}
          fill="#18181b"
          stroke="#3f3f46"
          rx={4}
        />
        <text x={cx} y={FULCRUM_Y + 52} textAnchor="middle" fontSize="10.5" fill="#a1a1aa" letterSpacing="0.5">
          FLOAT MCAP · current circ × price
        </text>
        <text x={cx} y={FULCRUM_Y + 76} textAnchor="middle" fontSize="17" fill="#e4e4e7" fontWeight="600">
          {fmtUsd(float)}
        </text>
      </svg>
    </div>
  );
}
