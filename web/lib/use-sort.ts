"use client";

import { useState } from "react";

// Shared sort-state hook for click-to-sort tables. Clicking an already-active
// column flips the direction; clicking a new column sets it active with the
// fallback default direction.
export function useSort<K extends string>(
  initialKey: K,
  initialDir: "asc" | "desc" = "desc"
) {
  const [sortKey, setSortKey] = useState<K>(initialKey);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(initialDir);

  function toggle(k: K, defaultDir: "asc" | "desc" = "desc") {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(defaultDir);
    }
  }
  return { sortKey, sortDir, toggle };
}

// Stable numeric compare that pushes null/NaN to the end regardless of direction.
export function compareNum(
  a: number | null | undefined,
  b: number | null | undefined,
  dir: "asc" | "desc"
): number {
  const aMissing = a == null || !Number.isFinite(a);
  const bMissing = b == null || !Number.isFinite(b);
  if (aMissing && bMissing) return 0;
  if (aMissing) return 1;
  if (bMissing) return -1;
  return dir === "asc" ? (a as number) - (b as number) : (b as number) - (a as number);
}

export function compareStr(a: string, b: string, dir: "asc" | "desc"): number {
  return dir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
}
