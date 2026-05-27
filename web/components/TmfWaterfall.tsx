import type { TmfWaterfall as TmfWaterfallType } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// SKY's Treasury Management Function rendered as a revenue waterfall. Revenue
// (dynamic, from DefiLlama) cascades through fixed buckets; holder-facing
// buckets (burn + staking) stay locked until the ABC solvency buffer fills.
export function TmfWaterfall({
  wf,
  annualRevenueUsd
}: {
  wf: TmfWaterfallType;
  annualRevenueUsd: number | null;
}) {
  const rev = annualRevenueUsd && annualRevenueUsd > 0 ? annualRevenueUsd : null;

  const statusChip = (s: string) => {
    if (s === "active") return { label: "active", cls: "text-emerald-300 border-emerald-800/60", dot: "bg-emerald-400" };
    if (s === "filling") return { label: "filling", cls: "text-amber-300 border-amber-800/60", dot: "bg-amber-400" };
    return { label: "locked", cls: "text-zinc-500 border-zinc-700", dot: "bg-zinc-600" };
  };

  return (
    <div>
      {/* Revenue inflow header */}
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          Net revenue in (trailing 1y, DefiLlama)
        </span>
        <span className="text-lg text-zinc-100">
          {rev ? `${fmtUsd(rev)}/yr` : "—"}
        </span>
      </div>
      <p className="text-[10px] text-zinc-600 mb-5">
        {wf.framework} · phase <code className="bg-zinc-900 px-1 rounded">{wf.current_phase}</code>
      </p>

      {/* Waterfall steps */}
      <div className="space-y-2">
        {wf.steps.map((step, i) => {
          const chip = statusChip(step.status);
          const stepUsd = rev != null ? rev * step.pct : null;
          const isGate = step.is_gate;
          const locked = step.status === "locked";
          return (
            <div key={step.n}>
              {/* connector */}
              {i > 0 && (
                <div className="flex justify-center">
                  <span className="text-zinc-700 text-xs leading-none">↓</span>
                </div>
              )}
              <div
                className={`rounded-md border px-4 py-3 ${
                  isGate
                    ? "border-amber-900/50 bg-amber-950/20"
                    : locked
                      ? "border-zinc-800 bg-zinc-950/40 opacity-70"
                      : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-200">
                      <span className="text-zinc-600 mr-1.5">{step.n}.</span>
                      {step.name}
                      {locked && <span className="ml-2 text-zinc-600">🔒</span>}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      → {step.dest}
                      {step.unlocks ? ` · ${step.unlocks}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-zinc-300">
                      {step.pct > 0 ? `${(step.pct * 100).toFixed(0)}%` : "—"}
                    </p>
                    {stepUsd != null && step.pct > 0 && (
                      <p className="text-[11px] text-zinc-500">
                        ≈ {fmtUsd(stepUsd)}/yr
                      </p>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 mt-1 rounded-full border px-1.5 py-0.5 text-[9px] ${chip.cls}`}
                    >
                      <span className={`w-1 h-1 rounded-full ${chip.dot}`} />
                      {chip.label}
                    </span>
                  </div>
                </div>

                {/* ABC gate: fill bar toward floor */}
                {isGate && (
                  <div className="mt-3 pt-3 border-t border-amber-900/30">
                    <div className="flex items-baseline justify-between text-[10px] mb-1">
                      <span className="text-amber-300/80">
                        Turbo-fill toward Phase 3 trigger
                      </span>
                      <span className="text-zinc-400">
                        floor {fmtUsd(step.target_usd ?? wf.abc_floor_usd)}
                      </span>
                    </div>
                    {/* Indeterminate fill — exact level not on-chain readable */}
                    <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500/50"
                        style={{
                          width: "100%",
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(245,158,11,0.55) 0 6px, rgba(245,158,11,0.18) 6px 12px)"
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-1.5 leading-relaxed">
                      {wf.abc_level_note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-zinc-600 mt-5 leading-relaxed">
        <span className="text-zinc-400">Why SKY&apos;s HM is ∞ today:</span> in Phase 1 the
        waterfall fills the ABC solvency buffer first — the burn and staking-reward buckets
        (the only ones that reach SKY holders) are bypassed. SKY earns{" "}
        {rev ? <span className="text-zinc-300">{fmtUsd(rev)}/yr</span> : "revenue"} but retains
        nearly all of it, so holder capture is ~0 until Phase 3. Source: {wf.source}
      </p>
    </div>
  );
}
