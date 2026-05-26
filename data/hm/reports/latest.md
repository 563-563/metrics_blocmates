# Holder Multiple — Cohort Snapshot

**Generated:** 2026-05-26T14:16:17.408Z
**As-of:** 2026-05-26
**Mode:** live

## Cohort summary

| Protocol | Phase | Adj MCap | Real Capture | HM | Band |
|---|---|---|---|---|---|
| Sky (SKY) | `phase_1` | $1.62B | $72.00M/yr | **22.5×** | fair value |
| Aave (AAVE) | `current` | $1.28B | $30.00M/yr | **42.6×** | expensive |
| Hyperliquid (HYPE) | `current` | $29.50B | $436.15M/yr | **67.6×** | speculative |
| Lighter (LIT) | `current` | $573.93M | $25.53M/yr | **22.5×** | fair value |

## Per-protocol breakdown

### Sky (SKY) — HM 22.5× _(fair value)_

Phase: `phase_1` — Phase 1 of TMF framework. SBE bypassed during ABC fill (~15 months base case from Apr 2026). 40% of net revenue → ABC, 40% → SKY stakers (as USDS), 20% → Security/Maintenance.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $0.0698 | source: live |
| 2 | Current float market cap | $1.62B | 23,244,725,697 SKY × $0.06982 (circ source: live) |
| 3 | + 24mo unlocks | $0 | 98.9% circulating; no remaining schedule |
| 4 | + 24mo emissions | $0 | Staking yield paid in USDS, not new SKY |
| 5 | − 24mo buybacks | $0 | SBE bypassed during Phase 1 (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$1.62B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $0 | verification: governance_stated |
| 8 | Annual external cashflow yield to SKY (Category B) | $72.00M | 40% × $180.73M net revenue paid in USDS to stkSKY — Category B external cashflow yield to native-token stakers (verification: governance_stated) |
| 9 | **Total Real Capture** | **$72.00M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **22.5×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Skyeco dashboard, Sky governance forum]

---

### Aave (AAVE) — HM 42.6× _(expensive)_

Phase: `current` — ARFC $30M/yr buyback budget (cut from original $50M). AWW Framework commits 100% product revenue to DAO.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $86.45 | source: live |
| 2 | Current float market cap | $1.31B | 15,179,912 AAVE × $86.45 (circ source: live) |
| 3 | + 24mo unlocks | $0 | No team vesting; 99.9% circulating |
| 4 | + 24mo emissions | +$24.64M | Safety Module + Service Provider compensation (285K AAVE over 24mo) |
| 5 | − 24mo buybacks | −$60.00M | ARFC $30M/yr budget; matches 2026 actual run-rate (verification: onchain) |
| 6 | **Adjusted MCap** | **$1.28B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $30.00M | verification: onchain |
| 8 | Annual external cashflow yield to AAVE (Category B) | $0 | No Category B yield — Safety Module rewards are stkAAVE emissions (Category C, dilution rebate) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$30.00M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **42.6×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, TokenLogic dashboard, Aave governance forum]

---

### Hyperliquid (HYPE) — HM 67.6× _(speculative)_

Phase: `current` — Assistance Fund captures ~99% of revenue for HYPE buybacks. Team vesting cliff active.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $59.84 | source: live |
| 2 | Current float market cap | $17.87B | 298,649,468 HYPE × $59.84 (circ source: onchain_feed) |
| 3 | + 24mo unlocks | +$12.46B | Y1 119M + Y2 89.3M team unlocks (Tokenomist scheduled rate) |
| 4 | + 24mo emissions | +$406.91M | Staking emissions paid from Future Emissions allocation (Category C — added to dilution side) |
| 5 | − 24mo buybacks | −$1.24B | 30d revenue × 12 × 99% AF capture rate (seed value — overridden by onchain feed when present) (verification: onchain) |
| 6 | **Adjusted MCap** | **$29.50B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $436.15M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to HYPE (Category B) | $0 | No Category B — staking rewards are HYPE-denominated dilution rebate (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$436.15M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **67.6×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$436.15M/yr** (HM input). Lifetime annualized (432d, cumulative $901.84M) = **$761.97M/yr**. Recent rate is **-42.8%** below lifetime average.

[Sources: DefiLlama, Hyperliquid Info API, Tokenomist, Hyperliquid docs]

---

### Lighter (LIT) — HM 22.5× _(fair value)_

Phase: `current` — TGE float. 99.5% of post-LLP revenue used to algorithmically buy back LIT. Team/investor cliff Dec 22 2026.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $1.28 | source: live |
| 2 | Current float market cap | $320.00M | 250,000,000 LIT × $1.28 (circ source: live) |
| 3 | + 24mo unlocks | +$276.48M | 54M Y1 + 162M Y2; cliff Dec 22 2026 unlocks 13.5M/mo across 36mo linear |
| 4 | + 24mo emissions | +$28.51M | Staking emissions over 24mo (Category C) |
| 5 | − 24mo buybacks | −$51.06M | 99.5% × post-LLP revenue (LLP collects liquidation fees first) (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$573.93M** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $25.53M | verification: governance_stated |
| 8 | Annual external cashflow yield to LIT (Category B) | $0 | No Category B — staking yield is LIT-denominated (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$25.53M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **22.5×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Lighter docs]

## Methodology

- `Adjusted MCap = float_mcap + 24mo_unlocks + 24mo_emissions − 24mo_buybacks`
- `Total Real Capture = annual_buyback_usd + annual_holder_yield_usd` (Categories A + B; Category C token-denominated emissions are excluded)
- `HM = Adjusted MCap / Total Real Capture`

Bands per CLAUDE.md HM Interpretation Bands:

- **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative

Inputs sourced from `data/latest.json` (live DL+CG) for price/supply and from `data/hm/config.json` (editorial seed) for unlock schedules, buyback rates, and Category B yields. Buyback execution flagged with `verification` per the Buyback Quality Framework. v1 is lenient — `governance_stated` and `proxy` rows are accepted; `onchain` upgrade happens protocol-by-protocol.
