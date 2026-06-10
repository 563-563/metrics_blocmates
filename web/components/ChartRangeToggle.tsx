"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CHART_RANGES, parseChartRange, type ChartRange } from "@/lib/chart-range";

// URL-driven time-range selector for history charts. ?range=1y|2y|all widens
// the window; default (no param) = 180d. Composes with the stablecoin toggle
// since both read/write the same URLSearchParams.
export function ChartRangeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const active = parseChartRange(sp.get("range"));

  function setRange(r: ChartRange) {
    const next = new URLSearchParams(sp.toString());
    if (r === "all") next.delete("range");
    else next.set("range", r);
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-fg-muted">Range</span>
      <span className="inline-flex border border-line rounded overflow-hidden">
        {CHART_RANGES.map((r, i) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`px-2 py-0.5 text-[11px] transition ${i > 0 ? "border-l border-line" : ""} ${
              active === r ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"
            }`}
          >
            {r}
          </button>
        ))}
      </span>
    </span>
  );
}
