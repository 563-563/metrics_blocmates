// Lightweight inline SVG sparkline for the daily-GDP trend column. No JS lib;
// just a path string. Last 30 points by default.
export function ChainTrendSparkline({
  values,
  color = "#a1a1aa",
  width = 80,
  height = 22
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  if (!values || values.length < 2) {
    return <span className="text-zinc-700 text-[10px]">—</span>;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const pts = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = values[values.length - 1];
  const first = values[0];
  const lastY = height - ((last - min) / range) * height;
  return (
    <svg width={width} height={height} className="block">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.2} />
      {/* terminal dot — colored by net direction */}
      <circle cx={width} cy={lastY} r={1.8} fill={last >= first ? "#84cc16" : "#f43f5e"} />
    </svg>
  );
}
