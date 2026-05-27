# Holder Multiple — Cohort Snapshot

**Generated:** 2026-05-27T14:20:50.084Z
**As-of:** 2026-05-27
**Mode:** live

## Cohort summary

| Protocol | Phase | Adj MCap | Real Capture | HM | Band |
|---|---|---|---|---|---|
| Sky (SKY) | `phase_1` | $1.60B | $0/yr | **∞×** | no real capture |
| Aave (AAVE) | `current` | $1.25B | $11.64M/yr | **107.8×** | speculative |
| Hyperliquid (HYPE) | `current` | $31.10B | $430.17M/yr | **72.3×** | speculative |
| Lighter (LIT) | `current` | $534.86M | $25.17M/yr | **21.3×** | fair value |

## Per-protocol breakdown

### Sky (SKY) — HM ∞× _(no real capture)_

Phase: `phase_1` — Phase 1 of TMF framework. SBE bypassed during ABC fill (~15 months base case from Apr 2026). 40% of net revenue → ABC, 40% → SKY stakers (as USDS), 20% → Security/Maintenance.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $0.0686 | source: live |
| 2 | Current float market cap | $1.60B | 23,244,211,861 SKY × $0.068621 (circ source: live) |
| 3 | + 24mo unlocks | $0 | 98.9% circulating; no remaining schedule |
| 4 | + 24mo emissions | $0 | Staking yield paid in USDS, not new SKY |
| 5 | − 24mo buybacks | $0 | SBE bypassed during Phase 1; verified on-chain — MCD_FLAP + MCD_SPLIT have zero activity 90d (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$1.60B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $0 | verification: governance_stated |
| 8 | Annual external cashflow yield to SKY (Category B) | $0 | Article: 40% × $180.73M net revenue paid in USDS to stkSKY (Cat B). On-chain (REWARDS_LSSKY_USDS = 0x38E4254b...) confirms USDS distribution mechanism — but inflows stopped 2025-11-03, 200+ days dormant. Either restructured post-Apr-2026 framework or paused. (verification: onchain_dormant) |
| 9 | **Total Real Capture** | **$0/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **∞×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Sky ChainLog (REWARDS_LSSKY_USDS resolved on-chain), Sky governance forum]

---

### Aave (AAVE) — HM 107.8× _(speculative)_

Phase: `current` — ARFC $30M/yr buyback budget (cut from original $50M). AWW Framework commits 100% product revenue to DAO.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $85.01 | source: live |
| 2 | Current float market cap | $1.29B | 15,179,912 AAVE × $85.01 (circ source: live) |
| 3 | + 24mo unlocks | $0 | No team vesting; 99.9% circulating |
| 4 | + 24mo emissions | +$24.23M | Safety Module + Service Provider compensation (285K AAVE over 24mo) |
| 5 | − 24mo buybacks | −$60.00M | ARFC $30M/yr budget; seed value — overridden by onchain feed when present (verification: onchain_aggregate) |
| 6 | **Adjusted MCap** | **$1.25B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $11.64M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to AAVE (Category B) | $0 | No Category B yield — Safety Module rewards are stkAAVE emissions (Category C, dilution rebate) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$11.64M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **107.8×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$11.64M/yr** (HM input). Lifetime annualized (332d, cumulative $22.33M) = **$24.55M/yr**. Recent rate is **-52.6%** below lifetime average.

[Sources: DefiLlama, TokenLogic dashboard, Aave governance forum]

---

### Hyperliquid (HYPE) — HM 72.3× _(speculative)_

Phase: `current` — Assistance Fund captures ~99% of revenue for HYPE buybacks. Team vesting cliff active.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $62.95 | source: live |
| 2 | Current float market cap | $18.80B | 298,649,468 HYPE × $62.95 (circ source: onchain_feed) |
| 3 | + 24mo unlocks | +$13.11B | Y1 119M + Y2 89.3M team unlocks (Tokenomist scheduled rate) |
| 4 | + 24mo emissions | +$428.06M | Staking emissions paid from Future Emissions allocation (Category C — added to dilution side) |
| 5 | − 24mo buybacks | −$1.24B | 30d revenue × 12 × 99% AF capture rate (seed value — overridden by onchain feed when present) (verification: onchain) |
| 6 | **Adjusted MCap** | **$31.10B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $430.17M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to HYPE (Category B) | $0 | No Category B — staking rewards are HYPE-denominated dilution rebate (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$430.17M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **72.3×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$430.17M/yr** (HM input). Lifetime annualized (433d, cumulative $902.18M) = **$760.50M/yr**. Recent rate is **-43.4%** below lifetime average.

[Sources: DefiLlama, Hyperliquid Info API, Tokenomist, Hyperliquid docs]

---

### Lighter (LIT) — HM 21.3× _(fair value)_

Phase: `current` — TGE float. 99.5% of post-LLP revenue used to algorithmically buy back LIT. Team/investor cliff Dec 22 2026.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $1.2 | source: live |
| 2 | Current float market cap | $300.00M | 250,000,000 LIT × $1.2 (circ source: live) |
| 3 | + 24mo unlocks | +$259.20M | 54M Y1 + 162M Y2; cliff Dec 22 2026 unlocks 13.5M/mo across 36mo linear |
| 4 | + 24mo emissions | +$26.72M | Staking emissions over 24mo (Category C) |
| 5 | − 24mo buybacks | −$51.06M | 99.5% × post-LLP revenue. Proxy via DL holdersRevenue ($25.6M/yr, matches stated rate within 0.3%) until Lighter API key unlocks direct trade-level verification. (verification: proxy) |
| 6 | **Adjusted MCap** | **$534.86M** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $25.17M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to LIT (Category B) | $0 | No Category B — staking yield is LIT-denominated (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$25.17M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **21.3×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$25.17M/yr** (HM input). Lifetime annualized (142d, cumulative $18.48M) = **$47.51M/yr**. Recent rate is **-47.0%** below lifetime average.

[Sources: DefiLlama, Lighter docs]

## Methodology

- `Adjusted MCap = float_mcap + 24mo_unlocks + 24mo_emissions − 24mo_buybacks`
- `Total Real Capture = annual_buyback_usd + annual_holder_yield_usd` (Categories A + B; Category C token-denominated emissions are excluded)
- `HM = Adjusted MCap / Total Real Capture`

Bands per CLAUDE.md HM Interpretation Bands:

- **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative

Inputs sourced from `data/latest.json` (live DL+CG) for price/supply and from `data/hm/config.json` (editorial seed) for unlock schedules, buyback rates, and Category B yields. Buyback execution flagged with `verification` per the Buyback Quality Framework. v1 is lenient — `governance_stated` and `proxy` rows are accepted; `onchain` upgrade happens protocol-by-protocol.
