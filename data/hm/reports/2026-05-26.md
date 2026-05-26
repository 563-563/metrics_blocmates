# Holder Multiple — Cohort Snapshot

**Generated:** 2026-05-26T18:08:21.332Z
**As-of:** 2026-05-26
**Mode:** live

## Cohort summary

| Protocol | Phase | Adj MCap | Real Capture | HM | Band |
|---|---|---|---|---|---|
| Sky (SKY) | `phase_1` | $1.61B | $0/yr | **∞×** | no real capture |
| Aave (AAVE) | `current` | $1.27B | $12.15M/yr | **104.5×** | speculative |
| Hyperliquid (HYPE) | `current` | $30.34B | $431.89M/yr | **70.2×** | speculative |
| Lighter (LIT) | `current` | $564.16M | $25.53M/yr | **22.1×** | fair value |

## Per-protocol breakdown

### Sky (SKY) — HM ∞× _(no real capture)_

Phase: `phase_1` — Phase 1 of TMF framework. SBE bypassed during ABC fill (~15 months base case from Apr 2026). 40% of net revenue → ABC, 40% → SKY stakers (as USDS), 20% → Security/Maintenance.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $0.0694 | source: live |
| 2 | Current float market cap | $1.61B | 23,244,725,697 SKY × $0.069364 (circ source: live) |
| 3 | + 24mo unlocks | $0 | 98.9% circulating; no remaining schedule |
| 4 | + 24mo emissions | $0 | Staking yield paid in USDS, not new SKY |
| 5 | − 24mo buybacks | $0 | SBE bypassed during Phase 1; verified on-chain — MCD_FLAP + MCD_SPLIT have zero activity 90d (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$1.61B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $0 | verification: governance_stated |
| 8 | Annual external cashflow yield to SKY (Category B) | $0 | Article: 40% × $180.73M net revenue paid in USDS to stkSKY (Cat B). On-chain (REWARDS_LSSKY_USDS = 0x38E4254b...) confirms USDS distribution mechanism — but inflows stopped 2025-11-03, 200+ days dormant. Either restructured post-Apr-2026 framework or paused. (verification: onchain_dormant) |
| 9 | **Total Real Capture** | **$0/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **∞×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Sky ChainLog (REWARDS_LSSKY_USDS resolved on-chain), Sky governance forum]

---

### Aave (AAVE) — HM 104.5× _(speculative)_

Phase: `current` — ARFC $30M/yr buyback budget (cut from original $50M). AWW Framework commits 100% product revenue to DAO.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $86 | source: live |
| 2 | Current float market cap | $1.31B | 15,179,912 AAVE × $86 (circ source: live) |
| 3 | + 24mo unlocks | $0 | No team vesting; 99.9% circulating |
| 4 | + 24mo emissions | +$24.51M | Safety Module + Service Provider compensation (285K AAVE over 24mo) |
| 5 | − 24mo buybacks | −$60.00M | ARFC $30M/yr budget; seed value — overridden by onchain feed when present (verification: onchain) |
| 6 | **Adjusted MCap** | **$1.27B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $12.15M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to AAVE (Category B) | $0 | No Category B yield — Safety Module rewards are stkAAVE emissions (Category C, dilution rebate) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$12.15M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **104.5×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$12.15M/yr** (HM input). Lifetime annualized (332d, cumulative $22.33M) = **$24.55M/yr**. Recent rate is **-50.5%** below lifetime average.

[Sources: DefiLlama, TokenLogic dashboard, Aave governance forum]

---

### Hyperliquid (HYPE) — HM 70.2× _(speculative)_

Phase: `current` — Assistance Fund captures ~99% of revenue for HYPE buybacks. Team vesting cliff active.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $61.46 | source: live |
| 2 | Current float market cap | $18.35B | 298,649,468 HYPE × $61.46 (circ source: onchain_feed) |
| 3 | + 24mo unlocks | +$12.80B | Y1 119M + Y2 89.3M team unlocks (Tokenomist scheduled rate) |
| 4 | + 24mo emissions | +$417.93M | Staking emissions paid from Future Emissions allocation (Category C — added to dilution side) |
| 5 | − 24mo buybacks | −$1.24B | 30d revenue × 12 × 99% AF capture rate (seed value — overridden by onchain feed when present) (verification: onchain) |
| 6 | **Adjusted MCap** | **$30.34B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $431.89M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to HYPE (Category B) | $0 | No Category B — staking rewards are HYPE-denominated dilution rebate (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$431.89M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **70.2×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$431.89M/yr** (HM input). Lifetime annualized (432d, cumulative $901.14M) = **$761.38M/yr**. Recent rate is **-43.3%** below lifetime average.

[Sources: DefiLlama, Hyperliquid Info API, Tokenomist, Hyperliquid docs]

---

### Lighter (LIT) — HM 22.1× _(fair value)_

Phase: `current` — TGE float. 99.5% of post-LLP revenue used to algorithmically buy back LIT. Team/investor cliff Dec 22 2026.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $1.26 | source: live |
| 2 | Current float market cap | $315.00M | 250,000,000 LIT × $1.26 (circ source: live) |
| 3 | + 24mo unlocks | +$272.16M | 54M Y1 + 162M Y2; cliff Dec 22 2026 unlocks 13.5M/mo across 36mo linear |
| 4 | + 24mo emissions | +$28.06M | Staking emissions over 24mo (Category C) |
| 5 | − 24mo buybacks | −$51.06M | 99.5% × post-LLP revenue (LLP collects liquidation fees first) (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$564.16M** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $25.53M | verification: governance_stated |
| 8 | Annual external cashflow yield to LIT (Category B) | $0 | No Category B — staking yield is LIT-denominated (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$25.53M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **22.1×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Lighter docs]

## Methodology

- `Adjusted MCap = float_mcap + 24mo_unlocks + 24mo_emissions − 24mo_buybacks`
- `Total Real Capture = annual_buyback_usd + annual_holder_yield_usd` (Categories A + B; Category C token-denominated emissions are excluded)
- `HM = Adjusted MCap / Total Real Capture`

Bands per CLAUDE.md HM Interpretation Bands:

- **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative

Inputs sourced from `data/latest.json` (live DL+CG) for price/supply and from `data/hm/config.json` (editorial seed) for unlock schedules, buyback rates, and Category B yields. Buyback execution flagged with `verification` per the Buyback Quality Framework. v1 is lenient — `governance_stated` and `proxy` rows are accepted; `onchain` upgrade happens protocol-by-protocol.
