import type { TmfWaterfall as TmfWaterfallType, TmfStep } from "@/lib/data";
import { fmtUsd } from "@/lib/format";

// SKY's Treasury Management Function as a literal revenue waterfall: revenue
// enters at the top and DIMINISHES as each bucket takes its cut. The
// holder-facing buckets (burn + staking) run dry in Phase 1 because the ABC
// gate absorbs everything above it.

const C = {
  sm: "#64748b", // slate — Security & Maintenance
  abc: "#f59e0b", // amber — ABC gate
  burn: "#f43f5e", // rose — burn
  staking: "#10b981" // emerald — staking
};

function stepColor(step: TmfStep): string {
  if (step.is_gate) return C.abc;
  if (/burn/i.test(step.name)) return C.burn;
  if (/stak/i.test(step.name)) return C.staking;
  return C.sm;
}

export function TmfWaterfall({
  wf,
  annualRevenueUsd
}: {
  wf: TmfWaterfallType;
  annualRevenueUsd: number | null;
}) {
  const rev = annualRevenueUsd && annualRevenueUsd > 0 ? annualRevenueUsd : null;

  // Running remainder flowing DOWN the waterfall after each bucket takes its cut.
  let remaining = rev;
  const steps = wf.steps.map((s) => {
    const tookUsd = rev != null ? rev * s.pct : null;
    const before = remaining;
    if (remaining != null && tookUsd != null) remaining = Math.max(0, remaining - tookUsd);
    return { ...s, tookUsd, remainingAfter: remaining, flowIn: before };
  });

  return (
    <div>
      {/* Inflow header */}
      <div className="flex items-baseline justify-between border-b border-line pb-4 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-fg-muted">Net revenue in</p>
          <p className="text-[11px] text-fg-muted mt-1">
            trailing 1y · DefiLlama · {wf.framework}
          </p>
        </div>
        <p className="text-3xl font-semibold text-fg">{rev ? `${fmtUsd(rev)}` : "—"}<span className="text-sm text-fg-muted">/yr</span></p>
      </div>

      {/* Allocation split bar — instant read of where revenue is directed */}
      <div className="mb-6">
        <div className="flex h-6 rounded overflow-hidden border border-line">
          {steps.filter((s) => s.pct > 0).map((s) => (
            <div
              key={s.n}
              className="flex items-center justify-center text-[11px] font-medium text-black/80"
              style={{ width: `${s.pct * 100}%`, background: stepColor(s) }}
              title={`${s.name} · ${(s.pct * 100).toFixed(0)}%`}
            >
              {s.pct >= 0.15 ? `${(s.pct * 100).toFixed(0)}%` : ""}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-fg-muted mt-1.5">
          <span><span style={{ color: C.sm }}>■</span> Security &amp; Maintenance</span>
          <span><span style={{ color: C.abc }}>■</span> ABC buffer (gate)</span>
          <span className="text-fg-faint">Burn + Staking: 0% — locked</span>
        </div>
      </div>

      {/* The cascade */}
      <div className="relative">
        {steps.map((s, i) => {
          const color = stepColor(s);
          const locked = s.status === "locked";
          const gate = !!s.is_gate;
          // Width of this bucket's "stream" = share of the original revenue it receives.
          const streamPct = s.flowIn != null && rev ? Math.max(6, (s.flowIn / rev) * 100) : 100;

          return (
            <div key={s.n}>
              <div
                className={`rounded-lg border px-4 py-3.5 ${
                  gate
                    ? "border-accent/40 bg-accent-soft/40"
                    : locked
                      ? "border-dashed border-line bg-transparent"
                      : "border-line bg-surface/60"
                }`}
                style={!locked ? { borderLeft: `3px solid ${color}` } : undefined}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className={`text-base font-medium ${locked ? "text-fg-muted" : "text-fg"}`}>
                      <span className="text-fg-faint mr-2">{s.n}</span>
                      {s.name}
                      {locked && <span className="ml-2 text-accent text-sm">🔒 Phase 3</span>}
                    </p>
                    <p className="text-xs text-fg-muted mt-1">
                      → {s.dest}
                      {locked && s.unlocks ? <span className="text-fg-faint"> · {s.unlocks}</span> : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-lg font-semibold ${locked ? "text-fg-faint" : "text-fg"}`}>
                      {s.pct > 0 ? `${(s.pct * 100).toFixed(0)}%` : "0%"}
                    </p>
                    {s.tookUsd != null && s.pct > 0 ? (
                      <p className="text-xs text-fg-muted">{fmtUsd(s.tookUsd)}/yr</p>
                    ) : (
                      <p className="text-xs text-fg-faint">nothing</p>
                    )}
                  </div>
                </div>

                {/* ABC gate fill */}
                {gate && (
                  <div className="mt-3 pt-3 border-t border-accent/40">
                    <div className="flex items-baseline justify-between text-xs mb-1.5">
                      <span className="text-accent">Turbo-fill toward Phase 3 trigger</span>
                      <span className="text-fg-muted">floor {fmtUsd(s.target_usd ?? wf.abc_floor_usd)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(245,158,11,0.7) 0 7px, rgba(245,158,11,0.22) 7px 14px)"
                        }}
                      />
                    </div>
                    <p className="text-xs text-fg-muted mt-2 leading-relaxed">
                      {wf.abc_level_note}
                    </p>
                  </div>
                )}
              </div>

              {/* Flow connector — shows the diminishing stream between buckets */}
              {i < steps.length - 1 && (
                <div className="flex items-center gap-2 py-2 pl-4">
                  <span className="text-fg-muted text-lg leading-none">↓</span>
                  {s.remainingAfter != null && rev != null && (
                    <span className="text-xs text-fg-muted">
                      {s.remainingAfter > rev * 0.005 ? (
                        <>
                          <span className="text-fg">{fmtUsd(s.remainingAfter)}/yr</span> continues down
                        </>
                      ) : (
                        <span className="text-negative/80">
                          ~$0 reaches the buckets below — ABC absorbs the stream in Phase 1
                        </span>
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Why ∞ */}
      <div className="mt-6 rounded-md border border-line bg-surface/40 px-4 py-3">
        <p className="text-sm text-fg-muted leading-relaxed">
          <span className="text-fg font-medium">Why SKY&apos;s HM is ∞ today:</span> in Phase 1
          the waterfall fills the ABC solvency buffer first, so the burn and staking-reward
          buckets — the only two that reach SKY holders — run dry. SKY earns{" "}
          {rev ? <span className="text-fg">{fmtUsd(rev)}/yr</span> : "revenue"} but retains
          nearly all of it. Holder capture (and a finite HM) resumes at Phase 3, once ABC clears
          its {fmtUsd(wf.abc_floor_usd)} floor.
        </p>
        <p className="text-xs text-fg-faint mt-2">Source: {wf.source}</p>
      </div>
    </div>
  );
}
