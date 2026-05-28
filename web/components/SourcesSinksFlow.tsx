import type { NpProtocol } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// Animated sources-vs-sinks visual. The Net Pressure formula made tactile:
//   (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accum + Net Staking Lockups)
// Sources flow rightward into a central "market" node, sinks flow leftward into
// it. Stream speed is inversely tied to each component's 30d $/day rate so a
// heavier flow visibly marches faster. Components with $0/day are shown idle
// (greyed, not animated) so the structure stays visible.

type Row = {
  key: string;
  label: string;
  sub?: string;
  perDayUsd: number;
};

// Map a $/day rate to an animation duration in seconds. Faster = stronger flow.
// Clamped so even huge flows don't seizure-strobe and tiny non-zero ones still move.
function speedFor(perDayUsd: number, maxPerDayUsd: number): string {
  if (perDayUsd <= 0 || maxPerDayUsd <= 0) return "0s";
  const ratio = Math.min(1, perDayUsd / maxPerDayUsd);
  // 4s (slow) at ratio→0, 0.7s (fast) at ratio→1
  const secs = 4 - 3.3 * ratio;
  return `${secs.toFixed(2)}s`;
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

  // Convert tokens → USD at current price for components without their own USD.
  const tokToUsdPerDay = (t: number) => (t * priceUsd) / days;

  const sources: Row[] = [
    {
      key: "unlocks",
      label: "Unlocks",
      sub: "sell-prob weighted",
      perDayUsd: (r.unlocks_usd ?? tokToUsdPerDay(r.unlocks_tokens_adjusted || 0) * days) / days
    },
    {
      key: "treasury_sells",
      label: "Treasury sells",
      perDayUsd: tokToUsdPerDay(r.treasury_sells_tokens || 0)
    }
  ];

  const sinks: Row[] = [
    {
      key: "buybacks",
      label: "Buybacks",
      perDayUsd: (r.buybacks_usd ?? tokToUsdPerDay(r.buybacks_tokens || 0) * days) / days
    },
    {
      key: "burns",
      label: "Burns",
      perDayUsd: tokToUsdPerDay(r.burns_tokens || 0)
    },
    {
      key: "treasury_accum",
      label: "Treasury accum",
      perDayUsd: tokToUsdPerDay(r.treasury_accumulation_tokens || 0)
    },
    {
      key: "staking",
      label: "Net staking lockups",
      perDayUsd: tokToUsdPerDay(r.net_staking_lockups_tokens || 0)
    }
  ];

  const sourcesTotal = sources.reduce((s, x) => s + x.perDayUsd, 0);
  const sinksTotal = sinks.reduce((s, x) => s + x.perDayUsd, 0);
  const netPerDay = sourcesTotal - sinksTotal;
  const netDir: "seller" | "buyer" | "flat" =
    netPerDay > sourcesTotal * 0.01 ? "seller" : netPerDay < -sinksTotal * 0.01 ? "buyer" : "flat";
  const maxRate = Math.max(...sources.map((x) => x.perDayUsd), ...sinks.map((x) => x.perDayUsd), 1);

  const SRC_COLOR = "#f43f5e"; // rose — sell pressure
  const SINK_COLOR = "#10b981"; // emerald — buy pressure

  const Stream = ({ row, side }: { row: Row; side: "source" | "sink" }) => {
    const idle = row.perDayUsd <= 0;
    const color = side === "source" ? SRC_COLOR : SINK_COLOR;
    return (
      <div className="flex items-center gap-3 py-2">
        {side === "source" && (
          <div className="text-right shrink-0 w-36">
            <p className="text-sm text-zinc-100 leading-tight">{row.label}</p>
            <p className="text-[11px] text-zinc-500">
              {idle ? <span className="text-zinc-600">—</span> : `${fmtUsd(row.perDayUsd)}/day`}
              {row.sub && <span className="text-zinc-600"> · {row.sub}</span>}
            </p>
          </div>
        )}
        <div className="flex-1 relative h-3 rounded overflow-hidden bg-zinc-900/40">
          <div
            className={`tp-stream h-full ${side === "sink" ? "reverse" : ""} ${idle ? "idle" : ""}`}
            style={{
              color,
              ['--speed' as any]: speedFor(row.perDayUsd, maxRate)
            }}
          />
        </div>
        {side === "sink" && (
          <div className="shrink-0 w-36">
            <p className="text-sm text-zinc-100 leading-tight">{row.label}</p>
            <p className="text-[11px] text-zinc-500">
              {idle ? <span className="text-zinc-600">—</span> : `${fmtUsd(row.perDayUsd)}/day`}
            </p>
          </div>
        )}
      </div>
    );
  };

  const netColor = netDir === "seller" ? SRC_COLOR : netDir === "buyer" ? SINK_COLOR : "#71717a";
  const netLabel = netDir === "seller" ? "NET SELLER" : netDir === "buyer" ? "NET BUYER" : "BALANCED";

  return (
    <div>
      {/* Header — totals on each side + the net */}
      <div className="grid grid-cols-3 gap-4 mb-5 pb-4 border-b border-zinc-800">
        <div className="text-left">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">Sources · 30d</p>
          <p className="text-xl font-semibold mt-1" style={{ color: SRC_COLOR }}>
            +{fmtUsd(sourcesTotal)}/day
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">sell pressure</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">Net Pressure</p>
          <p className="text-xl font-semibold mt-1" style={{ color: netColor }}>
            {netPerDay >= 0 ? "+" : "−"}{fmtUsd(Math.abs(netPerDay))}/day
          </p>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: netColor }}>
            {netLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">Sinks · 30d</p>
          <p className="text-xl font-semibold mt-1" style={{ color: SINK_COLOR }}>
            −{fmtUsd(sinksTotal)}/day
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">buy pressure</p>
        </div>
      </div>

      {/* The flow grid — sources stream rightward, sinks leftward, into the central node */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        {/* LEFT: sources */}
        <div className="space-y-1">
          {sources.map((row) => (
            <Stream key={row.key} row={row} side="source" />
          ))}
          {/* Pad to match heights when sinks has more rows */}
          {sources.length < sinks.length &&
            Array.from({ length: sinks.length - sources.length }).map((_, i) => (
              <div key={`pad-${i}`} className="py-2" style={{ height: 36 }} />
            ))}
        </div>

        {/* CENTER: the market node, indicating net direction */}
        <div className="flex flex-col items-center justify-center px-3 min-w-[88px]">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: netColor,
              background: `radial-gradient(circle, ${netColor}22 0%, transparent 70%)`
            }}
          >
            <span className="text-2xl" style={{ color: netColor }}>
              {netDir === "seller" ? "↑" : netDir === "buyer" ? "↓" : "•"}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">
            market
          </p>
        </div>

        {/* RIGHT: sinks */}
        <div className="space-y-1">
          {sinks.map((row) => (
            <Stream key={row.key} row={row} side="sink" />
          ))}
        </div>
      </div>

      <p className="text-[11px] text-zinc-500 mt-5 leading-relaxed">
        Stream speed = relative magnitude of each component&apos;s 30d $/day flow.
        Idle (grey) streams = $0 over the window. Unlocks are sell-probability
        weighted (team ×0.10, foundation ×0.30, emissions ×0.40, airdrop ×0.20).
        Net direction at the center = whether the sources beat the sinks.
      </p>
    </div>
  );
}
