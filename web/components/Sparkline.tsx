"use client";

/**
 * Minimal inline SVG sparkline. No deps. Renders a trend line from a numeric
 * array; optionally an area fill and a final-point dot.
 */
export function Sparkline({
  data,
  color = "#10b981",
  width = 96,
  height = 26,
  fill = true
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}) {
  const clean = (data || []).filter((v) => Number.isFinite(v));
  if (clean.length < 2) {
    return <span className="text-zinc-700 text-xs">—</span>;
  }
  const min = Math.min(...clean);
  const max = Math.max(...clean);
  const range = max - min || 1;
  const pad = 2;
  const h = height - pad * 2;

  const xy = clean.map((v, i) => {
    const x = (i / (clean.length - 1)) * width;
    const y = pad + (h - ((v - min) / range) * h);
    return [x, y] as const;
  });

  const line = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath =
    `M ${xy[0][0].toFixed(1)},${height} ` +
    xy.map(([x, y]) => `L ${x.toFixed(1)},${y.toFixed(1)}`).join(" ") +
    ` L ${xy[xy.length - 1][0].toFixed(1)},${height} Z`;
  const last = xy[xy.length - 1];

  const gid = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg width={width} height={height} className="block">
      {fill && (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gid})`} />
        </>
      )}
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last[0]} cy={last[1]} r={1.6} fill={color} />
    </svg>
  );
}
