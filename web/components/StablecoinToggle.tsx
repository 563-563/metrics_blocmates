"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

// URL-driven toggle. ?include_stablecoins=false hides stablecoin issuer
// attribution everywhere on /chains, /chains/charts, /chains/[slug]. Default
// (no param) = included.
export function StablecoinToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const excluded = sp.get("include_stablecoins") === "false";

  function setIncluded(include: boolean) {
    const next = new URLSearchParams(sp.toString());
    if (include) next.delete("include_stablecoins");
    else next.set("include_stablecoins", "false");
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-widest text-fg-muted">Stablecoins</span>
      <span className="inline-flex border border-line rounded overflow-hidden">
        <button
          type="button"
          onClick={() => setIncluded(true)}
          className={`px-2 py-0.5 text-[11px] transition ${
            excluded
              ? "text-fg-muted hover:text-fg"
              : "bg-surface-elev text-fg"
          }`}
        >
          included
        </button>
        <button
          type="button"
          onClick={() => setIncluded(false)}
          className={`px-2 py-0.5 text-[11px] transition border-l border-line ${
            excluded
              ? "bg-surface-elev text-fg"
              : "text-fg-muted hover:text-fg"
          }`}
        >
          excluded
        </button>
      </span>
    </span>
  );
}
