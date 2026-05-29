// Page-level header matching the onchain.markets reference:
//   - Big bold title with an accent-colored period
//   - Optional uppercase preview/badge chip beside it
//   - Body-sized description (not the tiny xs we had)
//   - Tiny monospace uppercase "AS OF …" meta line below
//   - Right-hand slot for toggles / page-level controls

export function PageHeader({
  title,
  badge,
  description,
  meta,
  right
}: {
  title: string;
  badge?: string;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className="mb-10">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg">
            {title}
            <span className="text-accent">.</span>
          </h1>
          {badge && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-fg-muted border border-line rounded px-2 py-1">
              {badge}
            </span>
          )}
        </div>
        {right && <div className="flex items-center gap-4 text-xs text-fg-muted flex-wrap">{right}</div>}
      </div>
      {description && (
        <p className="text-sm text-fg-muted leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
      {meta && (
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-fg-faint mt-3">
          {meta}
        </p>
      )}
    </header>
  );
}
