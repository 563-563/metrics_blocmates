"use client";

// Shared labeled slider used across the explorer's interactive modules.

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  sub,
  onChange,
  disabled
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  sub?: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="w-44 shrink-0 text-sm text-fg">
        {label}
        {sub && <span className="block text-[10px] text-fg-muted">{sub}</span>}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className={`flex-1 min-w-32 h-1.5 ${disabled ? "opacity-40 cursor-default" : "cursor-pointer"}`}
        style={{ accentColor: "rgb(var(--accent))" }}
      />
      <span className="w-20 text-right font-mono tabular-nums text-sm text-fg">{display}</span>
    </div>
  );
}
