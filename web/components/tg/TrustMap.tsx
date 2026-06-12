"use client";

import {
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { fmtUsd } from "@/lib/format";
import { MACRO_DEFAULTS, fullEquityKe } from "@/lib/token-grading";
import type { TdRow } from "./TrustDiscountTable";

// The Trust Map — the whole framework as geography. X = alignment score
// (how much of the business the token owns), Y = required return (what the
// market charges the claim). Bottom-right = "owns the business, priced like
// equity"; top-left = "owns nothing, priced like a lottery ticket". Every
// token's possible journey is down and to the right.

function discountFill(d: number | null): string {
  if (d == null) return "#71717a";
  if (d >= 0.85) return "#B25B57";
  if (d >= 0.5) return "#CDA24A";
  return "#84A76C";
}

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgb(var(--line))",
        padding: "6px 10px",
        fontSize: 12,
        color: "rgb(var(--fg))"
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>
        {d.project} <span style={{ color: "rgb(var(--fg-muted))" }}>${d.symbol}</span>
      </div>
      <div>alignment <strong>{d.x.toFixed(0)}%</strong></div>
      <div>required return <strong>{d.y.toFixed(1)}%</strong></div>
      <div>
        trust discount{" "}
        <strong style={{ color: discountFill(d.discount) }}>
          {d.discount != null ? `${(d.discount * 100).toFixed(0)}%` : "n/a"}
        </strong>
      </div>
      <div style={{ color: "rgb(var(--fg-muted))", marginTop: 4 }}>
        mcap {d.mcap != null ? fmtUsd(d.mcap) : "—"}
      </div>
    </div>
  );
}

// Logo bubble: ring colored by discount severity, CG logo inside.
function LogoShape(props: any) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  const r = payload.r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 2.5} fill={discountFill(payload.discount)} fillOpacity={0.3} />
      {payload.image ? (
        <image
          href={payload.image}
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          preserveAspectRatio="xMidYMid slice"
          style={{ clipPath: `circle(${r}px at ${r}px ${r}px)` }}
        />
      ) : (
        <circle cx={cx} cy={cy} r={r} fill="rgb(var(--surface-elev))" stroke="rgb(var(--line))" />
      )}
    </g>
  );
}

export function TrustMap({ rows, clarity }: { rows: TdRow[]; clarity: boolean }) {
  const data = rows
    .filter((t) => {
      const v = clarity ? t.clarity : t.base;
      return t.alignment_factor != null && v.ke != null;
    })
    .map((t) => {
      const v = clarity ? t.clarity : t.base;
      const mcap = t.market_cap ?? 0;
      // Bubble radius ∝ sqrt(mcap), clamped for legibility.
      const r = Math.min(Math.max(Math.sqrt(mcap / 1e6) * 0.55, 7), 22);
      return {
        symbol: t.symbol,
        project: t.project,
        image: t.image,
        x: (t.alignment_factor ?? 0) * 100,
        y: (v.ke ?? 0) * 100,
        discount: v.trust_discount,
        mcap: t.market_cap,
        r
      };
    });

  if (data.length < 3) return null;

  const equityBase = (MACRO_DEFAULTS.risk_free_rate + MACRO_DEFAULTS.equity_risk_premium) * 100;
  const perfectToken = fullEquityKe(clarity) * 100;
  const yMax = Math.max(...data.map((d) => d.y)) + 3;
  const yMin = Math.max(equityBase - 2, 0);

  return (
    <div>
      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 28, left: 32, bottom: 36 }}>
            {/* Quadrant tints: top-left = trustless & expensive, bottom-right = aligned & cheap */}
            <ReferenceArea x1={0} x2={50} y1={(yMin + yMax) / 2} y2={yMax} fill="#B25B57" fillOpacity={0.05} />
            <ReferenceArea x1={50} x2={100} y1={yMin} y2={(yMin + yMax) / 2} fill="#84A76C" fillOpacity={0.06} />

            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={(v) => `${v}%`}
              label={{
                value: "Alignment score — how much of the business the token owns →",
                position: "insideBottom",
                offset: -16,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[yMin, yMax]}
              tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
              stroke="rgb(var(--fg-faint))"
              tickFormatter={(v) => `${v.toFixed(0)}%`}
              label={{
                value: "Required return — what the market charges the claim ↑",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle", fill: "rgb(var(--fg))", fontSize: 13 }
              }}
            />
            <ReferenceLine
              y={equityBase}
              stroke="rgb(var(--fg-faint))"
              strokeDasharray="4 4"
              label={{ value: `a stock ~${equityBase.toFixed(1)}%`, position: "insideBottomRight", fontSize: 11, fill: "rgb(var(--fg-muted))" }}
            />
            <ReferenceLine
              y={perfectToken}
              stroke="#84A76C"
              strokeDasharray="4 4"
              label={{ value: `perfect token ${perfectToken.toFixed(1)}%`, position: "insideTopRight", fontSize: 11, fill: "#84A76C" }}
            />
            <Tooltip content={<Tip />} cursor={{ strokeDasharray: "3 3", stroke: "rgb(var(--line))" }} />
            <Scatter data={data} shape={<LogoShape />} isAnimationActive={false} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-fg-faint mt-2 leading-relaxed">
        Bubble area ∝ market cap; ring color = trust discount severity (
        <span className="text-positive">low</span> · <span className="text-accent">mid</span> ·{" "}
        <span className="text-negative">severe</span>). Every fix a protocol can make — routing
        revenue, binding rights, clearing overhangs — moves its logo down and to the right.
        {clarity && " CLARITY scenario active: the whole cohort slides down as statutory premia compress."}
      </p>
    </div>
  );
}
