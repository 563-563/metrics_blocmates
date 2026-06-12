#!/usr/bin/env node
/**
 * Token-grading engine — canonical implementation of the Token Grading /
 * Ke / SS-PE framework (TOKEN_GRADING_DASHBOARD_BUILD_SPEC.md).
 *
 * Core question: how good is the business, and how much of that business
 * does the token actually own?
 *
 *   trusted_revenue            = selected_run_rate × durability_adjustment
 *   clean_platform_earnings    = trusted_revenue × clean_conversion
 *   token_attributable_earnings= clean_platform_earnings × token_alignment_factor
 *   SS-PE                      = (1 − g / ROE) / (Ke − g)
 *   implied_token_value        = token_attributable_earnings × SS-PE
 *
 * web/lib/token-grading.ts mirrors this module for client-side scenario
 * math — keep the two in lockstep (compute-tg --check guards this side).
 */

// ── Framework constants ──────────────────────────────────────────────────

// risk_free_rate tracks the 3M T-bill (3.71% on 2026-06-11, FRED DGS3MO /
// TradingEconomics). Update when it moves materially; the CI acceptance
// anchors are NOT affected (they pin the spec's ladder Ke constants).
const MACRO_DEFAULTS = {
  risk_free_rate: 0.037,
  equity_risk_premium: 0.055
};

// Ke build-up component ceilings; premium = max × score / 5 (score 0–5).
const KE_COMPONENT_MAX = {
  crypto_liquidity_premium: 0.07,
  regulatory_premium: 0.08,
  custody_operational_premium: 0.05,
  governance_supply_premium: 0.07,
  economic_alignment_premium: 0.08,
  technical_reconciliation_premium: 0.03
};

// Token claim ladder — categories with default alignment / Ke used by the
// token-discount scenario table.
const CLAIM_LADDER = [
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

// Durability score (0–5) → revenue haircut (midpoint of the spec band).
const DURABILITY_HAIRCUT = {
  5: 0.05,
  4: 0.15,
  3: 0.275,
  2: 0.425,
  1: 0.6,
  0: 0.75
};

// Growth score (0–5) → terminal g (midpoint of the spec band).
const GROWTH_SCORE_G = {
  0: 0.005,
  1: 0.015,
  2: 0.025,
  3: 0.035,
  4: 0.0475,
  5: 0.0625
};

// ── Core calculations ────────────────────────────────────────────────────

function calculateTrustedRevenue(selectedRunRate, durabilityAdjustment = 1.0) {
  return selectedRunRate * durabilityAdjustment;
}

// Clean conversion from the cost bridge (all inputs as fractions of
// post-buyback net revenue).
function cleanConversionFromCosts({
  cogs_pct = 0,
  custody_ops_pct = 0,
  payment_pct = 0,
  fulfillment_net_pct = 0,
  opex_pct = 0
}) {
  const totalCost = cogs_pct + custody_ops_pct + payment_pct + fulfillment_net_pct + opex_pct;
  return 1 - totalCost;
}

function calculateCleanEarnings({
  post_buyback_net_revenue,
  durability_adjustment = 1.0,
  clean_conversion
}) {
  const trusted = calculateTrustedRevenue(post_buyback_net_revenue, durability_adjustment);
  return trusted * clean_conversion;
}

function calculateROE(cleanEarnings, denominator) {
  if (!denominator || denominator <= 0) return null;
  return cleanEarnings / denominator;
}

// Ke from explicit premium components (sum), tolerating missing fields.
function calculateKe(buildUp) {
  const parts = [
    buildUp.risk_free_rate ?? MACRO_DEFAULTS.risk_free_rate,
    buildUp.equity_risk_premium ?? MACRO_DEFAULTS.equity_risk_premium,
    buildUp.crypto_liquidity_premium ?? 0,
    buildUp.regulatory_premium ?? 0,
    buildUp.custody_operational_premium ?? 0,
    buildUp.governance_supply_premium ?? 0,
    buildUp.economic_alignment_premium ?? 0,
    buildUp.technical_reconciliation_premium ?? 0
  ];
  return parts.reduce((s, v) => s + v, 0);
}

// Ke from 0–5 component scores: premium = max × score / 5.
function keFromScores(scores) {
  let ke = MACRO_DEFAULTS.risk_free_rate + MACRO_DEFAULTS.equity_risk_premium;
  for (const [component, max] of Object.entries(KE_COMPONENT_MAX)) {
    const score = scores[component];
    if (score != null) ke += (max * Math.min(Math.max(score, 0), 5)) / 5;
  }
  return ke;
}

// SS-PE = (1 − g/ROE) / (Ke − g). Returns null when the formula is
// unstable (Ke ≤ g). A non-positive payout factor (g ≥ ROE) returns the
// raw (≤ 0) value — surface it via sspeWarnings, don't hide it.
function calculateSSPE(roe, ke, g) {
  if (roe == null || ke == null || g == null) return null;
  if (ke <= g) return null;
  return (1 - g / roe) / (ke - g);
}

function sspeWarnings(roe, ke, g) {
  const warnings = [];
  if (ke != null && g != null && ke <= g) {
    warnings.push("ke_below_or_equal_g: SS-PE undefined/unstable (Ke ≤ g)");
  }
  if (roe != null && g != null && g >= roe) {
    warnings.push("g_at_or_above_roe: payout factor ≤ 0 — terminal g exceeds reinvestment capacity");
  }
  return warnings;
}

function calculateTokenValue(cleanEarnings, tokenAlignment, sspe) {
  if (sspe == null) return null;
  return cleanEarnings * tokenAlignment * sspe;
}

// ── Grade assignment (spec §4.2, §5.3, §6.4, §7.4) ──────────────────────

function assignTokenAlignmentGrade(tokenAlignment) {
  const pct = tokenAlignment * 100;
  if (pct >= 85) return "A";
  if (pct >= 60) return "B";
  if (pct >= 30) return "C";
  if (pct > 5) return "D";
  return "F";
}

function assignKeGrade(ke) {
  const pct = ke * 100;
  if (pct < 16) return "A";
  if (pct <= 22) return "B";
  if (pct <= 30) return "C";
  if (pct <= 40) return "D";
  return "F";
}

function assignCleanConversionGrade(cleanConversion) {
  const pct = cleanConversion * 100;
  if (pct > 75) return "A";
  if (pct >= 60) return "B";
  if (pct >= 40) return "C";
  if (pct >= 20) return "D";
  return "F";
}

// Boundary note: the seed example grades underwriting_roe = 200% as "A",
// so the A band is inclusive at 200%.
function assignROEGrade(roe) {
  const pct = roe * 100;
  if (pct >= 200) return "A";
  if (pct >= 100) return "B";
  if (pct >= 50) return "C";
  if (pct >= 20) return "D";
  return "F";
}

// ── Scenario builders ────────────────────────────────────────────────────

// Token-discount mode: hold business constant, walk the claim ladder.
function buildTokenDiscountScenarios({ cleanEarnings, roe, g }) {
  return CLAIM_LADDER.map((rung) => {
    const sspe = calculateSSPE(roe, rung.default_ke, g);
    return {
      key: rung.key,
      category: rung.category,
      token_alignment_factor: rung.default_alignment,
      ke: rung.default_ke,
      ss_pe: sspe,
      token_attributable_earnings: cleanEarnings * rung.default_alignment,
      implied_token_value: calculateTokenValue(cleanEarnings, rung.default_alignment, sspe)
    };
  });
}

// Operating mode: hold token design constant, vary business assumptions.
function buildOperatingScenarios({ cases, tokenAlignment, ke }) {
  return cases.map((c) => {
    const cleanEarnings = calculateCleanEarnings({
      post_buyback_net_revenue: c.post_buyback_net_revenue,
      durability_adjustment: c.durability_adjustment ?? 1.0,
      clean_conversion: c.clean_conversion
    });
    const sspe = calculateSSPE(c.underwriting_roe, ke, c.terminal_g);
    return {
      name: c.name,
      post_buyback_net_revenue: c.post_buyback_net_revenue,
      clean_conversion: c.clean_conversion,
      underwriting_roe: c.underwriting_roe,
      terminal_g: c.terminal_g,
      clean_platform_earnings: cleanEarnings,
      ss_pe: sspe,
      implied_token_value: calculateTokenValue(cleanEarnings, tokenAlignment, sspe),
      warnings: sspeWarnings(c.underwriting_roe, ke, c.terminal_g)
    };
  });
}

// ── CLARITY Act scenario ─────────────────────────────────────────────────
// "CLARITY passes + friendly SEC/CFTC": statutory jurisdiction clarity
// compresses the premia that price regulatory ambiguity. Multipliers are
// applied to each token's Ke build-up components; everything not listed is
// untouched (smart-contract risk doesn't care about Congress).
const CLARITY_SCENARIO = {
  key: 'clarity_act',
  label: 'CLARITY Act + friendly SEC/CFTC',
  multipliers: {
    regulatory_premium: 0.35,
    crypto_liquidity_premium: 0.7,
    custody_operational_premium: 0.8
  }
  // Per-component methodology + rationale text lives in the web mirror
  // (web/lib/token-grading.ts KE_COMPONENT_INFO) where it renders; the
  // multipliers above are the canonical scenario definition.
};

// The full-equity benchmark rung (14.5%) decomposed into residual premia so
// the SAME multipliers can compress it consistently. Sums to rf + ERP +
// 5.3pts ≈ the spec's full-alignment Ke at current macro.
const FULL_EQUITY_BENCHMARK = {
  risk_free_rate: MACRO_DEFAULTS.risk_free_rate,
  equity_risk_premium: MACRO_DEFAULTS.equity_risk_premium,
  crypto_liquidity_premium: 0.02,
  regulatory_premium: 0.018,
  custody_operational_premium: 0.005,
  governance_supply_premium: 0,
  economic_alignment_premium: 0,
  technical_reconciliation_premium: 0.01
};

// Apply scenario multipliers to a Ke build-up; returns a new build-up with
// recomputed total.
function applyClarityScenario(buildUp) {
  const adjusted = { ...buildUp };
  for (const [component, mult] of Object.entries(CLARITY_SCENARIO.multipliers)) {
    if (adjusted[component] != null) {
      adjusted[component] = Math.round(adjusted[component] * mult * 10000) / 10000;
    }
  }
  adjusted.ke = Math.round(calculateKe(adjusted) * 10000) / 10000;
  return adjusted;
}

function fullEquityKe(clarity = false) {
  const buildUp = clarity ? applyClarityScenario(FULL_EQUITY_BENCHMARK) : FULL_EQUITY_BENCHMARK;
  return calculateKe(buildUp);
}

// Trust Discount: how much value the token forfeits vs the SAME business
// wrapped as full equity (alignment 1.0, benchmark Ke). 0 = equity-grade
// claim; 1 = the token owns none of it.
function trustDiscount(impliedCurrent, impliedFullEquity) {
  if (impliedFullEquity == null || impliedFullEquity <= 0) return null;
  const current = impliedCurrent ?? 0;
  return Math.min(Math.max(1 - current / impliedFullEquity, 0), 1);
}

module.exports = {
  MACRO_DEFAULTS,
  CLARITY_SCENARIO,
  FULL_EQUITY_BENCHMARK,
  applyClarityScenario,
  fullEquityKe,
  trustDiscount,
  KE_COMPONENT_MAX,
  CLAIM_LADDER,
  DURABILITY_HAIRCUT,
  GROWTH_SCORE_G,
  calculateTrustedRevenue,
  cleanConversionFromCosts,
  calculateCleanEarnings,
  calculateROE,
  calculateKe,
  keFromScores,
  calculateSSPE,
  sspeWarnings,
  calculateTokenValue,
  assignTokenAlignmentGrade,
  assignKeGrade,
  assignCleanConversionGrade,
  assignROEGrade,
  buildTokenDiscountScenarios,
  buildOperatingScenarios
};
