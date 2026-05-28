# Holder Multiple — Cohort Snapshot

**Generated:** 2026-05-28T12:48:45.498Z
**As-of:** 2026-05-28
**Mode:** live

## Cohort summary

| Protocol | Phase | Adj MCap | Real Capture | HM | Band |
|---|---|---|---|---|---|
| Sky (SKY) | `phase_1` | $1.53B | $0/yr | **∞×** | no real capture |
| Aave (AAVE) | `current` | $1.19B | $11.13M/yr | **106.5×** | speculative |
| Hyperliquid (HYPE) | `current` | $28.01B | $427.96M/yr | **65.4×** | speculative |
| Lighter (LIT) | `current` | $485.06M | $25.28M/yr | **19.2×** | strong |

## Per-protocol breakdown

### Sky (SKY) — HM ∞× _(no real capture)_

Phase: `phase_1` — Phase 1 of TMF framework. SBE bypassed during ABC fill (~15 months base case from Apr 2026). 40% of net revenue → ABC, 40% → SKY stakers (as USDS), 20% → Security/Maintenance.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $0.0657 | source: live |
| 2 | Current float market cap | $1.53B | 23,243,497,483 SKY × $0.065663 (circ source: live) |
| 3 | + 24mo unlocks | $0 | 98.9% circulating; no remaining schedule |
| 4 | + 24mo emissions | $0 | Staking yield paid in USDS, not new SKY |
| 5 | − 24mo buybacks | $0 | SBE bypassed during Phase 1; verified on-chain — MCD_FLAP + MCD_SPLIT have zero activity 90d (verification: governance_stated) |
| 6 | **Adjusted MCap** | **$1.53B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $0 | verification: governance_stated |
| 8 | Annual external cashflow yield to SKY (Category B) | $0 | Article: 40% × $180.73M net revenue paid in USDS to stkSKY (Cat B). On-chain (REWARDS_LSSKY_USDS = 0x38E4254b...) confirms USDS distribution mechanism — but inflows stopped 2025-11-03, 200+ days dormant. Either restructured post-Apr-2026 framework or paused. (verification: onchain_dormant) |
| 9 | **Total Real Capture** | **$0/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **∞×** | Line 6 ÷ Line 9 |

[Sources: DefiLlama, Sky ChainLog (REWARDS_LSSKY_USDS resolved on-chain), Sky governance forum]

---

### Aave (AAVE) — HM 106.5× _(speculative)_

Phase: `current` — ARFC $30M/yr buyback budget (cut from original $50M). AWW Framework commits 100% product revenue to DAO.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $80.52 | source: live |
| 2 | Current float market cap | $1.22B | 15,179,912 AAVE × $80.52 (circ source: live) |
| 3 | + 24mo unlocks | $0 | No team vesting; 99.9% circulating |
| 4 | + 24mo emissions | +$22.95M | Safety Module + Service Provider compensation (285K AAVE over 24mo) |
| 5 | − 24mo buybacks | −$60.00M | ARFC $30M/yr budget; seed value — overridden by onchain feed when present (verification: onchain_aggregate) |
| 6 | **Adjusted MCap** | **$1.19B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $11.13M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to AAVE (Category B) | $0 | No Category B yield — Safety Module rewards are stkAAVE emissions (Category C, dilution rebate) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$11.13M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **106.5×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$11.13M/yr** (HM input). Lifetime annualized (332d, cumulative $22.33M) = **$24.55M/yr**. Recent rate is **-54.7%** below lifetime average.

[Sources: DefiLlama, TokenLogic dashboard, Aave governance forum]

---

### Hyperliquid (HYPE) — HM 65.4× _(speculative)_

Phase: `current` — Assistance Fund captures ~99% of revenue for HYPE buybacks. Team vesting cliff active.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $56.93 | source: live |
| 2 | Current float market cap | $17.00B | 298,649,468 HYPE × $56.93 (circ source: onchain_feed) |
| 3 | + 24mo unlocks | +$11.86B | Y1 119M + Y2 89.3M team unlocks (Tokenomist scheduled rate) |
| 4 | + 24mo emissions | +$387.12M | Staking emissions paid from Future Emissions allocation (Category C — added to dilution side) |
| 5 | − 24mo buybacks | −$1.24B | 30d revenue × 12 × 99% AF capture rate (seed value — overridden by onchain feed when present) (verification: onchain) |
| 6 | **Adjusted MCap** | **$28.01B** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $427.96M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to HYPE (Category B) | $0 | No Category B — staking rewards are HYPE-denominated dilution rebate (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$427.96M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **65.4×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$427.96M/yr** (HM input). Lifetime annualized (434d, cumulative $902.47M) = **$758.99M/yr**. Recent rate is **-43.6%** below lifetime average.

[Sources: DefiLlama, Hyperliquid Info API, Tokenomist, Hyperliquid docs]

---

### Lighter (LIT) — HM 19.2× _(strong)_

Phase: `current` — TGE float. 99.5% of post-LLP revenue used to algorithmically buy back LIT. Team/investor cliff Dec 22 2026.

| # | Metric | Value | Notes |
|---|---|---|---|
| 1 | Token price | $1.098 | source: live |
| 2 | Current float market cap | $274.50M | 250,000,000 LIT × $1.098 (circ source: live) |
| 3 | + 24mo unlocks | +$237.17M | 54M Y1 + 162M Y2; cliff Dec 22 2026 unlocks 13.5M/mo across 36mo linear |
| 4 | + 24mo emissions | +$24.45M | Staking emissions over 24mo (Category C) |
| 5 | − 24mo buybacks | −$51.06M | 99.5% × post-LLP revenue. Proxy via DL holdersRevenue ($25.6M/yr, matches stated rate within 0.3%) until Lighter API key unlocks direct trade-level verification. (verification: proxy) |
| 6 | **Adjusted MCap** | **$485.06M** | Lines 2 + 3 + 4 − 5 |
| 7 | Annual buyback (Category A) | $25.28M | last 60d annualized — verification: onchain |
| 8 | Annual external cashflow yield to LIT (Category B) | $0 | No Category B — staking yield is LIT-denominated (Category C) (verification: governance_stated) |
| 9 | **Total Real Capture** | **$25.28M/yr** | Lines 7 + 8 |
| 10 | **Holder Multiple (HM)** | **19.2×** | Line 6 ÷ Line 9 |

**Buyback rate lens:** recent 60d annualized = **$25.28M/yr** (HM input). Lifetime annualized (143d, cumulative $18.55M) = **$47.35M/yr**. Recent rate is **-46.6%** below lifetime average.

[Sources: DefiLlama, Lighter docs]

## Methodology

- `Adjusted MCap = float_mcap + 24mo_unlocks + 24mo_emissions − 24mo_buybacks`
- `Total Real Capture = annual_buyback_usd + annual_holder_yield_usd` (Categories A + B; Category C token-denominated emissions are excluded)
- `HM = Adjusted MCap / Total Real Capture`

Bands per CLAUDE.md HM Interpretation Bands:

- **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative

Inputs sourced from `data/latest.json` (live DL+CG) for price/supply and from `data/hm/config.json` (editorial seed) for unlock schedules, buyback rates, and Category B yields. Buyback execution flagged with `verification` per the Buyback Quality Framework. v1 is lenient — `governance_stated` and `proxy` rows are accepted; `onchain` upgrade happens protocol-by-protocol.
