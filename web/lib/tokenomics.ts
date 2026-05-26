// Helper to pull per-protocol tokenomics from scripts/onchain/<slug>/tokenomics.js
// when one exists. Server-side only — uses dynamic require so we can ignore
// missing modules without bundling a hard import.

export type UnlockRow = {
  bucket: string;
  unlock_date: string;
  amount_tokens: number;
  is_projected: boolean;
};

export type AllocationBucket = {
  key: string;
  pct: number;
  tokens: number;
  label: string;
  recipient_type?: string;
  description?: string;
};

export type ProtocolTokenomics = {
  total_supply: number;
  tge_date: string;
  allocations: AllocationBucket[];
  schedule: UnlockRow[];
};

// Map of slug → tokenomics. Loaded lazily so missing modules don't crash the build.
function loadHype(): ProtocolTokenomics | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("../../scripts/onchain/hype/tokenomics.js") as {
      HYPE_TOTAL_SUPPLY: number;
      HYPE_TGE_DATE: Date;
      HYPE_ALLOCATIONS: Record<
        string,
        {
          pct: number;
          tokens: number;
          recipient_type: string;
          label: string;
          description: string;
        }
      >;
      generateUnlockSchedule: (asOf?: Date) => UnlockRow[];
    };
    const allocations: AllocationBucket[] = Object.entries(mod.HYPE_ALLOCATIONS).map(
      ([key, v]) => ({ key, ...v })
    );
    return {
      total_supply: mod.HYPE_TOTAL_SUPPLY,
      tge_date:
        mod.HYPE_TGE_DATE instanceof Date
          ? mod.HYPE_TGE_DATE.toISOString().slice(0, 10)
          : String(mod.HYPE_TGE_DATE).slice(0, 10),
      allocations,
      schedule: mod.generateUnlockSchedule(new Date())
    };
  } catch {
    return null;
  }
}

export function getTokenomicsBySlug(slug: string): ProtocolTokenomics | null {
  if (slug === "hyperliquid") return loadHype();
  return null;
}
