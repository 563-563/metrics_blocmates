// Shared between the server page (slices the series) and the client toggle
// (writes ?range=). Default (no param) = all history.
export const CHART_RANGES = ["180d", "1y", "2y", "all"] as const;
export type ChartRange = (typeof CHART_RANGES)[number];

export const RANGE_DAYS: Record<ChartRange, number> = {
  "180d": 180,
  "1y": 365,
  "2y": 730,
  all: Infinity
};

export const RANGE_LABEL: Record<ChartRange, string> = {
  "180d": "last 180 days",
  "1y": "last 1 year",
  "2y": "last 2 years",
  all: "all history"
};

export function parseChartRange(v: string | undefined | null): ChartRange {
  return (CHART_RANGES as readonly string[]).includes(v ?? "") ? (v as ChartRange) : "all";
}
