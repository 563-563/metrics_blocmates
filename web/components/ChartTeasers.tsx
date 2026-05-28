import Link from "next/link";

// Compact teaser strip — small hand-drawn SVG previews that hint at the
// shape of each chart on /chains/charts. Real interactive charts live there.

type Teaser = {
  title: string;
  anchor: string;
  preview: React.ReactNode;
  subtitle: string;
};

function QuadrantPreview() {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <rect x={0} y={0} width={50} height={30} fill="#f43f5e" fillOpacity={0.08} />
      <rect x={50} y={0} width={50} height={30} fill="#f59e0b" fillOpacity={0.08} />
      <rect x={0} y={30} width={50} height={30} fill="#52525b" fillOpacity={0.08} />
      <rect x={50} y={30} width={50} height={30} fill="#10b981" fillOpacity={0.08} />
      <line x1={50} y1={0} x2={50} y2={60} stroke="#27272a" strokeDasharray="2 2" />
      <line x1={0} y1={30} x2={100} y2={30} stroke="#27272a" strokeDasharray="2 2" />
      <circle cx={84} cy={40} r={7} fill="#84cc16" fillOpacity={0.7} />
      <circle cx={82} cy={42} r={4} fill="#ef4444" fillOpacity={0.7} />
      <circle cx={30} cy={48} r={10} fill="#818cf8" fillOpacity={0.7} />
      <circle cx={56} cy={43} r={5} fill="#14b8a6" fillOpacity={0.7} />
      <circle cx={66} cy={45} r={3} fill="#a855f7" fillOpacity={0.7} />
      <circle cx={20} cy={50} r={3} fill="#06b6d4" fillOpacity={0.7} />
      <circle cx={15} cy={10} r={2.5} fill="#fda4af" fillOpacity={0.7} />
    </svg>
  );
}

function StackedAreaPreview() {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <path d="M 0 60 L 0 40 C 12 38, 28 32, 40 34 C 56 36, 76 30, 100 28 L 100 60 Z" fill="#818cf8" fillOpacity={0.65} />
      <path d="M 0 40 L 0 28 C 12 26, 28 22, 40 24 C 56 26, 76 20, 100 18 L 100 28 C 76 30, 56 36, 40 34 C 28 32, 12 38, 0 40 Z" fill="#ef4444" fillOpacity={0.65} />
      <path d="M 0 28 L 0 18 C 12 16, 28 14, 40 16 C 56 18, 76 12, 100 10 L 100 18 C 76 20, 56 26, 40 24 C 28 22, 12 26, 0 28 Z" fill="#14b8a6" fillOpacity={0.65} />
      <path d="M 0 18 L 0 12 C 12 10, 28 9, 40 11 C 56 12, 76 8, 100 7 L 100 10 C 76 12, 56 18, 40 16 C 28 14, 12 16, 0 18 Z" fill="#84cc16" fillOpacity={0.65} />
    </svg>
  );
}

function HeatmapPreview() {
  const cells = [
    [9, 6, 1, 0, 0, 0],
    [9, 1, 1, 0, 0, 0],
    [2, 8, 0, 0, 1, 1],
    [0, 1, 8, 0, 0, 0],
    [2, 4, 0, 0, 3, 0],
    [0, 1, 0, 6, 0, 1]
  ];
  const cats = ["#22d3ee", "#a78bfa", "#84cc16", "#ec4899", "#f59e0b", "#fbbf24"];
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      {cells.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 16.6 + 1}
            y={r * 9 + 2}
            width={15.6}
            height={8}
            fill={cats[c]}
            fillOpacity={v / 12}
          />
        ))
      )}
    </svg>
  );
}

function TreemapPreview() {
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <rect x={0} y={0} width={42} height={60} fill="#ef4444" fillOpacity={0.85} />
      <rect x={42} y={0} width={30} height={40} fill="#818cf8" fillOpacity={0.85} />
      <rect x={42} y={40} width={30} height={20} fill="#14b8a6" fillOpacity={0.85} />
      <rect x={72} y={0} width={28} height={22} fill="#84cc16" fillOpacity={0.85} />
      <rect x={72} y={22} width={14} height={20} fill="#a855f7" fillOpacity={0.85} />
      <rect x={86} y={22} width={14} height={20} fill="#f59e0b" fillOpacity={0.85} />
      <rect x={72} y={42} width={14} height={18} fill="#06b6d4" fillOpacity={0.85} />
      <rect x={86} y={42} width={14} height={18} fill="#ec4899" fillOpacity={0.85} />
    </svg>
  );
}

const TEASERS: Teaser[] = [
  {
    title: "Strategic positioning",
    subtitle: "productivity × tax burden",
    anchor: "quadrant",
    preview: <QuadrantPreview />
  },
  {
    title: "GDP over time",
    subtitle: "180d stacked, smoothed",
    anchor: "stacked",
    preview: <StackedAreaPreview />
  },
  {
    title: "Category mix",
    subtitle: "what each chain produces",
    anchor: "heatmap",
    preview: <HeatmapPreview />
  },
  {
    title: "Every app",
    subtitle: "treemap by chain",
    anchor: "treemap",
    preview: <TreemapPreview />
  }
];

export function ChartTeasers() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {TEASERS.map((t) => (
        <Link
          key={t.anchor}
          href={`/chains/charts#${t.anchor}`}
          className="block border border-zinc-800 rounded-md bg-zinc-950 hover:border-zinc-600 transition group overflow-hidden"
        >
          <div className="h-24 border-b border-zinc-900 bg-black/30">
            {t.preview}
          </div>
          <div className="px-3 py-2">
            <p className="text-xs text-zinc-100 font-medium leading-tight group-hover:text-white">
              {t.title}
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{t.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
