"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export type UnlockEvent = {
  bucket: string;
  unlock_date: string;
  amount_tokens: number;
  is_projected: boolean;
};

const BUCKET_COLORS: Record<string, string> = {
  genesis_distribution: "#10b981",
  core_contributors: "#f59e0b",
  future_emissions: "#6366f1",
  hyper_foundation: "#a78bfa",
  community_grants: "#22d3ee",
  hip2_hyperliquidity: "#64748b"
};

function labelize(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Bucket render order: stack largest at bottom so the chart reads naturally.
const STACK_ORDER = [
  "genesis_distribution",
  "future_emissions",
  "core_contributors",
  "hyper_foundation",
  "community_grants",
  "hip2_hyperliquidity"
];

export function UnlockScheduleChart({
  schedule,
  totalSupply,
  symbol = "tokens"
}: {
  schedule: UnlockEvent[];
  totalSupply?: number;
  symbol?: string;
}) {
  // Aggregate by date, build cumulative per bucket.
  const sorted = schedule.slice().sort((a, b) => a.unlock_date.localeCompare(b.unlock_date));
  const dates = Array.from(new Set(sorted.map((r) => r.unlock_date)));
  const allBuckets = Array.from(new Set(sorted.map((r) => r.bucket)));
  const buckets = STACK_ORDER.filter((k) => allBuckets.includes(k)).concat(
    allBuckets.filter((k) => !STACK_ORDER.includes(k))
  );

  const cumulative: Record<string, number> = {};
  for (const b of buckets) cumulative[b] = 0;

  // For "projected" hint we mark rows where ALL events at that date are projected.
  const todayIso = new Date().toISOString().slice(0, 10);
  const firstProjectedDate = sorted.find((r) => r.is_projected)?.unlock_date ?? null;

  const points = dates.map((date) => {
    const events = sorted.filter((r) => r.unlock_date === date);
    for (const e of events) {
      cumulative[e.bucket] = (cumulative[e.bucket] ?? 0) + e.amount_tokens;
    }
    return { date, ...cumulative };
  });

  // Pad to today if the last historical event predates today (gives the
  // chart a visible "we are here" reference even when nothing unlocked recently).
  if (points.length > 0 && points[points.length - 1].date < todayIso) {
    const last = points[points.length - 1];
    points.push({ ...last, date: todayIso });
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
          <XAxis
            dataKey="date"
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
            minTickGap={48}
          />
          <YAxis
            stroke="rgb(var(--fg-faint))"
            tick={{ fontSize: 10, fill: "rgb(var(--fg-muted))" }}
            tickFormatter={(v: number) => {
              if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
              if (v >= 1e6) return `${(v / 1e6).toFixed(0)}M`;
              if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
              return `${v}`;
            }}
          />
          {firstProjectedDate && firstProjectedDate >= todayIso && (
            <ReferenceLine
              x={todayIso}
              stroke="rgb(var(--fg-faint))"
              strokeDasharray="2 4"
              label={{ value: "today", position: "insideTop", fill: "#71717a", fontSize: 10 }}
            />
          )}
          <Tooltip
            contentStyle={{
              background: "rgb(var(--surface))",
              border: "1px solid rgb(var(--line))",
              fontSize: 12
            }}
            labelStyle={{ color: "rgb(var(--fg-muted))" }}
            itemStyle={{ color: "rgb(var(--fg))" }}
            formatter={(value: number, name: string) => [
              `${Math.round(value).toLocaleString()} ${symbol}${
                totalSupply ? ` (${((value / totalSupply) * 100).toFixed(2)}%)` : ""
              }`,
              labelize(name)
            ]}
            itemSorter={(item) =>
              -(STACK_ORDER.indexOf(String(item.dataKey)) + 1 || 999)
            }
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: 10, color: "rgb(var(--fg-muted))", paddingTop: 8 }}
            formatter={(value) => (
              <span style={{ color: "rgb(var(--fg-muted))" }}>{labelize(value)}</span>
            )}
          />
          {buckets.map((b) => (
            <Area
              key={b}
              type="monotone"
              dataKey={b}
              stackId="1"
              stroke={BUCKET_COLORS[b] ?? "rgb(var(--fg-faint))"}
              fill={BUCKET_COLORS[b] ?? "rgb(var(--fg-faint))"}
              fillOpacity={0.45}
              strokeWidth={1}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
