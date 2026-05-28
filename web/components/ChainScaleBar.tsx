// Tiny inline horizontal bar for a numeric cell. Width is the value's share
// of the cohort max — gives an at-a-glance sense of magnitude across rows.
export function ChainScaleBar({
  value,
  max,
  color = "#a1a1aa"
}: {
  value: number | null;
  max: number;
  color?: string;
}) {
  const v = Number(value) || 0;
  const pct = max > 0 ? Math.min(100, (v / max) * 100) : 0;
  return (
    <div className="w-full h-1.5 bg-zinc-900/60 rounded-sm mt-1 overflow-hidden">
      <div
        className="h-full rounded-sm"
        style={{ width: `${pct}%`, background: color, opacity: v > 0 ? 1 : 0 }}
      />
    </div>
  );
}
