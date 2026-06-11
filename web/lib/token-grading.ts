// Token-grading engine — TypeScript mirror of scripts/tg/token-grading.js
// for client-side scenario math. Keep the two in lockstep; the canonical
// constants and the CI acceptance check live on the scripts side
// (compute-tg.js --check).

// risk_free_rate tracks the 3M T-bill (3.71% on 2026-06-11). Keep in
// lockstep with scripts/tg/token-grading.js.
export const MACRO_DEFAULTS = {
  risk_free_rate: 0.037,
  equity_risk_premium: 0.055
};

export const KE_COMPONENT_MAX: Record<string, number> = {
  crypto_liquidity_premium: 0.07,
  regulatory_premium: 0.08,
  custody_operational_premium: 0.05,
  governance_supply_premium: 0.07,
  economic_alignment_premium: 0.08,
  technical_reconciliation_premium: 0.03
};

export type ClaimRung = {
  key: string;
  category: string;
  description: string;
  alignment_range: [number, number];
  ke_range: [number, number];
  default_alignment: number;
  default_ke: number;
};

export const CLAIM_LADDER: ClaimRung[] = [
  {
    key: "no_utility",
    category: "Current-state no utility",
    description: "No hard claim on revenue, assets, or governance",
    alignment_range: [0, 0.05],
    ke_range: [0.35, 0.45],
    default_alignment: 0.03,
    default_ke: 0.38
  },
  {
    key: "soft_utility",
    category: "Soft utility / access",
    description: "Discounts, perks, status, product access",
    alignment_range: [0.05, 0.15],
    ke_range: [0.3, 0.35],
    default_alignment: 0.12,
    default_ke: 0.32
  },
  {
    key: "treasury_claim",
    category: "Treasury-asset claim",
    description: "Token has claim on treasury / inventory / assets",
    alignment_range: [0.25, 0.5],
    ke_range: [0.24, 0.3],
    default_alignment: 0.35,
    default_ke: 0.26
  },
  {
    key: "revenue_treasury_gov",
    category: "Revenue + treasury governance",
    description: "Token receives/controls revenue plus treasury governance",
    alignment_range: [0.5, 0.8],
    ke_range: [0.18, 0.24],
    default_alignment: 0.65,
    default_ke: 0.2
  },
  {
    key: "full_equity",
    category: "Full equity / IP / token alignment",
    description: "Token is sole claim on equity, IP, cash flows, treasury, governance",
    alignment_range: [1.0, 1.0],
    ke_range: [0.12, 0.18],
    default_alignment: 1.0,
    default_ke: 0.145
  }
];

export function calculateCleanEarnings({
  post_buyback_net_revenue,
  durability_adjustment = 1.0,
  clean_conversion
}: {
  post_buyback_net_revenue: number;
  durability_adjustment?: number;
  clean_conversion: number;
}): number {
  return post_buyback_net_revenue * durability_adjustment * clean_conversion;
}

export function calculateROE(cleanEarnings: number, denominator: number): number | null {
  if (!denominator || denominator <= 0) return null;
  return cleanEarnings / denominator;
}

export function calculateKe(buildUp: Record<string, number | undefined>): number {
  return (
    (buildUp.risk_free_rate ?? MACRO_DEFAULTS.risk_free_rate) +
    (buildUp.equity_risk_premium ?? MACRO_DEFAULTS.equity_risk_premium) +
    (buildUp.crypto_liquidity_premium ?? 0) +
    (buildUp.regulatory_premium ?? 0) +
    (buildUp.custody_operational_premium ?? 0) +
    (buildUp.governance_supply_premium ?? 0) +
    (buildUp.economic_alignment_premium ?? 0) +
    (buildUp.technical_reconciliation_premium ?? 0)
  );
}

// SS-PE = (1 − g/ROE) / (Ke − g); null when unstable (Ke ≤ g).
export function calculateSSPE(roe: number, ke: number, g: number): number | null {
  if (roe == null || ke == null || g == null) return null;
  if (ke <= g) return null;
  return (1 - g / roe) / (ke - g);
}

export function sspeWarnings(roe: number, ke: number, g: number): string[] {
  const warnings: string[] = [];
  if (ke <= g) warnings.push("SS-PE undefined: Ke ≤ g");
  if (g >= roe) warnings.push("Payout ≤ 0: terminal g exceeds ROE reinvestment capacity");
  return warnings;
}

export function calculateTokenValue(
  cleanEarnings: number,
  tokenAlignment: number,
  sspe: number | null
): number | null {
  if (sspe == null) return null;
  return cleanEarnings * tokenAlignment * sspe;
}

export function assignTokenAlignmentGrade(tokenAlignment: number): string {
  const pct = tokenAlignment * 100;
  if (pct >= 85) return "A";
  if (pct >= 60) return "B";
  if (pct >= 30) return "C";
  if (pct > 5) return "D";
  return "F";
}

export function assignKeGrade(ke: number): string {
  const pct = ke * 100;
  if (pct < 16) return "A";
  if (pct <= 22) return "B";
  if (pct <= 30) return "C";
  if (pct <= 40) return "D";
  return "F";
}

export function assignCleanConversionGrade(cleanConversion: number): string {
  const pct = cleanConversion * 100;
  if (pct > 75) return "A";
  if (pct >= 60) return "B";
  if (pct >= 40) return "C";
  if (pct >= 20) return "D";
  return "F";
}

export function assignROEGrade(roe: number): string {
  const pct = roe * 100;
  if (pct >= 200) return "A";
  if (pct >= 100) return "B";
  if (pct >= 50) return "C";
  if (pct >= 20) return "D";
  return "F";
}

export function gradeColorClass(grade: string): string {
  switch (grade) {
    case "A":
      return "text-positive";
    case "B":
      return "text-positive";
    case "C":
      return "text-fg";
    case "D":
      return "text-accent";
    default:
      return "text-negative";
  }
}
