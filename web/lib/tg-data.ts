// Token-grade data layer. Same static-bundling pattern as the chains data:
// JSON ships with the function bundle via the module graph. Per-token files
// load through a Webpack context (template-literal require) keyed off the
// aggregate's symbol list — adding a token needs no code change here.

import latestRaw from "../../data/tg/token-grades/latest.json";

export type TgEvidence = {
  field: string;
  claim: string;
  source_url: string;
  confidence: string;
  direction?: string;
  updated_at: string;
};

export type TgScenarioTokenDiscount = {
  key: string;
  category: string;
  token_alignment_factor: number;
  ke: number;
  ss_pe: number | null;
  token_attributable_earnings: number;
  implied_token_value: number | null;
};

export type TgScenarioOperating = {
  name: string;
  post_buyback_net_revenue: number;
  clean_conversion: number;
  underwriting_roe: number;
  terminal_g: number;
  clean_platform_earnings: number;
  ss_pe: number | null;
  implied_token_value: number | null;
  warnings: string[];
};

export type TokenGrade = {
  symbol: string;
  project: string;
  coingecko_id?: string;
  updated_at: string;
  computed_at?: string;
  business: {
    revenue_run_rate_window: string;
    post_buyback_net_revenue: number;
    revenue_13w?: number;
    durability_adjustment: number;
    trusted_revenue: number;
    clean_conversion: number;
    clean_platform_earnings: number;
    clean_conversion_grade: string;
    durability_score: number;
    business_confidence: string;
  };
  capital_efficiency: {
    active_capital: number | null;
    operating_treasury: number | null;
    total_asset_base: number | null;
    active_capital_roe: number | null;
    operating_treasury_roe: number | null;
    total_asset_roe: number | null;
    underwriting_roe: number;
    roe_grade: string;
    roe_confidence: string;
  };
  growth: {
    near_term_growth_score: number;
    durability_score: number;
    terminal_g: number;
    growth_grade: string;
    growth_confidence: string;
  };
  token: {
    claim_category: string;
    claim_category_key?: string;
    token_alignment_factor: number;
    token_alignment_grade: string;
    value_capture_score: number;
    token_holder_rights_score: number;
    entity_alignment_score: number;
    transparency_score: number;
    token_confidence: string;
  };
  ke_build_up: {
    risk_free_rate: number;
    equity_risk_premium: number;
    crypto_liquidity_premium: number;
    regulatory_premium: number;
    custody_operational_premium: number;
    governance_supply_premium: number;
    economic_alignment_premium: number;
    technical_reconciliation_premium: number;
    ke: number;
    ke_grade: string;
  };
  valuation: {
    ss_pe: number | null;
    token_attributable_earnings: number;
    implied_token_value: number | null;
    market_cap: number | null;
    fdv: number | null;
    market_source?: string;
    implied_value_vs_market_cap: number | null;
    implied_value_vs_fdv: number | null;
    warnings?: string[];
  };
  scenarios?: {
    token_discount: TgScenarioTokenDiscount[];
    operating: TgScenarioOperating[];
  };
  evidence: TgEvidence[];
  flags: string[];
};

export type TgLatest = {
  generated_at: string;
  tokens: Array<{
    symbol: string;
    project: string;
    claim_category: string | null;
    token_alignment_factor: number | null;
    token_alignment_grade: string | null;
    ke: number | null;
    ke_grade: string | null;
    clean_conversion_grade: string | null;
    roe_grade: string | null;
    ss_pe: number | null;
    implied_token_value: number | null;
    market_cap: number | null;
    fdv: number | null;
    implied_value_vs_market_cap: number | null;
    implied_value_vs_fdv: number | null;
    flags: number;
  }>;
};

export const tgLatest = latestRaw as unknown as TgLatest;

const TOKEN_GRADES: Record<string, TokenGrade> = {};
for (const t of tgLatest.tokens) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    TOKEN_GRADES[t.symbol] = require(`../../data/tg/token-grades/${t.symbol}.json`) as TokenGrade;
  } catch {
    /* listed in aggregate but file missing — silent */
  }
}

export const TG_SYMBOLS = Object.keys(TOKEN_GRADES);

export function getTokenGrade(symbol: string): TokenGrade | undefined {
  return TOKEN_GRADES[symbol.toUpperCase()];
}
