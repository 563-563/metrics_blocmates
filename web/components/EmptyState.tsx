// Standard empty state for sections whose data source isn't wired (yet, or
// deliberately). Per CLAUDE.md, coverage gaps are part of the dashboard's
// signal — so this renders as an explicit labeled state (dashed border +
// status chip), not faint gray text that reads like a loading failure.
export function EmptyState({
  label = "adapter pending",
  children
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-dashed border-line bg-surface/40 py-8 px-4 text-center">
      <span className="inline-block text-[10px] uppercase tracking-widest text-accent border border-accent/40 bg-accent/10 rounded-full px-2.5 py-0.5 mb-3">
        {label}
      </span>
      <div className="text-sm text-fg-muted leading-relaxed max-w-md mx-auto">{children}</div>
    </div>
  );
}
