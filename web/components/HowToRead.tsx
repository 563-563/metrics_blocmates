// Collapsible "How to read this" explainer — server-renderable (<details>,
// no JS). Sits between the page header and the data so first-time readers
// can self-serve the methodology without leaving the page, while returning
// readers scroll straight past one collapsed row.
export function HowToRead({
  title = "How to read this",
  children
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mb-8 border border-line rounded-md bg-surface/50 open:bg-surface/80 transition">
      <summary className="cursor-pointer select-none list-none px-4 py-3 text-[11px] uppercase tracking-widest text-fg-muted hover:text-fg transition flex items-center gap-2 [&::-webkit-details-marker]:hidden">
        <span className="text-fg-faint group-open:rotate-90 transition-transform inline-block" aria-hidden="true">
          ▸
        </span>
        {title}
      </summary>
      <div className="px-4 pb-5 pt-1 text-sm text-fg-muted leading-relaxed border-t border-line-faint">
        {children}
      </div>
    </details>
  );
}

// One color-keyed band chip for the HM band legend.
export function BandChip({ range, label, cls }: { range: string; label: string; cls: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 border rounded-full px-2.5 py-0.5 text-xs ${cls}`}>
      <span className="font-mono tabular-nums">{range}</span>
      <span className="opacity-80">{label}</span>
    </span>
  );
}
