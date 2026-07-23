# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-07-23T10:36:40.575Z
**As-of:** 2026-07-23

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $59.20    **Circulating:** 530.16M HYPE    **AF balance:** 45.98M HYPE    **Total staked:** 433.83M HYPE (81.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 7.2K | 🟢 −7.2K HYPE | −$425.5K | today @ $59.20 | -0.0007% |
| 7d | 7/7d | 0 | 100.2K | 🟢 −313.8K HYPE | −$18.58M | today @ $59.20 | -0.0314% |
| 30d | 30/30d | 17.45M | 179.8K | 🟢 −1.01M HYPE | −$59.75M | today @ $59.20 | -0.1009% |
| 90d | 90/90d | 52.34M | 1.01M | 🟢 −3.20M HYPE | −$250.84M | per-day (31%) | -0.3202% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | scripts/onchain/hype/tokenomics.js | onchain_equivalent | TP weights scheduled unlocks by sell-probability (team mostly re-stakes). HM uses gross. future_emissions is tagged foundation=0.40 since community rewards sell more than pure foundation treasury. |
| buybacks | data/onchain/hype-af/buybacks.json | onchain |  |
| burns | — | n/a | HYPE does not burn |
| treasury_accumulation | — | n/a | AF is buyback_wallet not treasury_wallet — already counted as buybacks |
| treasury_sells | — | n/a | AF only buys |
| net_staking_lockups | data/onchain/hype/staking.json | onchain | Net daily lockup = today's total_staked_tokens − yesterday's (delegations minus undelegations). Recomputed at compute time from the snapshot column, since the stored delta_tokens field is corrupted by intra-day cron re-runs (each hourly write overwrites today's row, so its persisted delta becomes intra-day flux instead of day-over-day). |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 3.8K | −3.8K | −$227.3K |
| 2026-07-11 | 0 | 607 | −6.6K | −$389.4K |
| 2026-07-12 | 0 | 948 | −119.4K | −$7.07M |
| 2026-07-13 | 0 | 1.9K | −1.9K | −$110.2K |
| 2026-07-14 | 0 | 709 | −16.3K | −$962.2K |
| 2026-07-15 | 0 | 4.2K | −13.4K | −$795.0K |
| 2026-07-16 | 0 | 1.4K | −1.4K | −$79.9K |
| 2026-07-17 | 0 | 8.1K | −43.8K | −$2.59M |
| 2026-07-18 | 0 | 8.9K | −8.9K | −$528.8K |
| 2026-07-19 | 0 | 9.2K | −46.7K | −$2.77M |
| 2026-07-20 | 0 | 24.4K | −164.8K | −$9.76M |
| 2026-07-21 | 0 | 20.7K | −20.7K | −$1.23M |
| 2026-07-22 | 0 | 21.6K | −21.6K | −$1.28M |
| 2026-07-23 | 0 | 7.2K | −7.2K | −$425.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-29 | 7.53M | $445.85M |
| 2026-08-06 | 9.92M | $587.07M |
| 2026-08-29 | 7.53M | $445.85M |
| 2026-09-06 | 9.92M | $587.07M |
| 2026-09-29 | 7.53M | $445.85M |
| 2026-10-06 | 9.92M | $587.07M |
| 2026-10-29 | 7.53M | $445.85M |
| 2026-11-06 | 9.92M | $587.07M |


---

## Aave (AAVE)

**Price:** $98.05    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −96 AAVE | −$9.5K | today @ $98.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −16.1K AAVE | −$1.58M | today @ $98.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −33.1K AAVE | −$3.25M | today @ $98.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −72.0K AAVE | −$7.06M | today @ $98.05 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No team vesting active; 99.9% circulating |
| buybacks | data/onchain/aave/buybacks.json | onchain_aggregate | ALL AAVE inflows to Collector — dominated by CoW-routed TokenLogic buybacks but may include non-buyback deposits |
| burns | — | n/a | AAVE does not burn |
| treasury_accumulation | — | n/a | Collector inflows already counted as buybacks; double-counting avoided |
| treasury_sells | — | n/a | Collector mostly accumulates; rare outflows uncategorized for now |
| net_staking_lockups | data/onchain/aave/staking.json | onchain | stkAAVE.totalSupply() snapshotted daily, diffed day-over-day |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-08 | 0 | 0 | −1.4K | −$133.9K |
| 2026-07-11 | 0 | 0 | −4.7K | −$464.6K |
| 2026-07-12 | 0 | 0 | −1.0K | −$102.6K |
| 2026-07-13 | 0 | 0 | 0 | $0 |
| 2026-07-14 | 0 | 0 | −2.4K | −$234.2K |
| 2026-07-15 | 0 | 0 | −2.5K | −$245.9K |
| 2026-07-16 | 0 | 0 | −4.5K | −$440.3K |
| 2026-07-17 | 0 | 0 | 0 | $0 |
| 2026-07-18 | 0 | 0 | 0 | $0 |
| 2026-07-19 | 0 | 0 | −4.4K | −$434.5K |
| 2026-07-20 | 0 | 0 | −291 | −$28.6K |
| 2026-07-21 | 0 | 0 | −237 | −$23.3K |
| 2026-07-22 | 0 | 0 | −11.1K | −$1.09M |
| 2026-07-23 | 0 | 0 | −96 | −$9.5K |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −2.35M SKY | −$144.0K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −3.37M SKY | −$206.8K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −39.38M SKY | −$2.41M | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −44.42M SKY | −$2.72M | today @ $0.06 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | 98.9% circulating; no remaining schedule |
| buybacks | data/onchain/sky/sbe-burns.json | onchain | SBE / MCD_FLAP burns to 0x0. Currently zero (Phase 1 bypass). Will become non-zero when ABC fill threshold ($150M) is reached. |
| burns | — | n/a | For SKY, burns and buybacks are the same thing (SBE IS the burn engine); counted once under buybacks |
| treasury_accumulation | — | n/a | ABC fill — contract address still TBD via ChainLog. Will track when discovered. |
| treasury_sells | — | n/a |  |
| net_staking_lockups | data/onchain/sky/lockstake.json | onchain | SKY.balanceOf(LockStakeEngine) daily Δ. ~10B SKY currently locked. |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-08 | 0 | 0 | −19.01M | −$1.17M |
| 2026-07-11 | 0 | 0 | −3.48M | −$213.4K |
| 2026-07-12 | 0 | 0 | 0 | $0 |
| 2026-07-13 | 0 | 0 | −253.0K | −$15.5K |
| 2026-07-14 | 0 | 0 | 0 | $0 |
| 2026-07-15 | 0 | 0 | −676.1K | −$41.4K |
| 2026-07-16 | 0 | 0 | −11.41M | −$699.5K |
| 2026-07-17 | 0 | 0 | 0 | $0 |
| 2026-07-18 | 0 | 0 | −686.0K | −$42.1K |
| 2026-07-19 | 0 | 0 | −11.9K | −$729.13 |
| 2026-07-20 | 0 | 0 | −74.9K | −$4.6K |
| 2026-07-21 | 0 | 0 | −71.6K | −$4.4K |
| 2026-07-22 | 0 | 0 | −179.8K | −$11.0K |
| 2026-07-23 | 0 | 0 | −2.35M | −$144.0K |


---

## Lighter (LIT)

**Price:** $2.22    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.22 | 0.0000% |
| 7d | 6/7d | 0 | 138.6K | 🟢 −138.6K LIT | −$312.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 934.6K | 🟢 −934.6K LIT | −$1.95M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.90M | 🟢 −4.90M LIT | −$6.76M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | Pre-cliff (Dec 22 2026) — no team unlocks. Tokenomics module pending. |
| buybacks | data/onchain/lit/buybacks.json | proxy | DL holdersRevenue proxy ($ ÷ daily price → estimated LIT bought). Direct zkLighter trade feed pending a Lighter API key — will upgrade to onchain when available. |
| burns | — | n/a | Unknown — verify whether Lighter burns vs holds after API key obtained |
| treasury_accumulation | — | n/a | L2 protocol accounts not yet discovered |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a | LIT L2 staking contract not yet identified |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-09 | 0 | 34.5K | −34.5K | −$80.3K |
| 2026-07-10 | 0 | 24.3K | −24.3K | −$58.2K |
| 2026-07-11 | 0 | 18.9K | −18.9K | −$50.8K |
| 2026-07-12 | 0 | 14.0K | −14.0K | −$36.1K |
| 2026-07-13 | 0 | 32.5K | −32.5K | −$85.3K |
| 2026-07-14 | 0 | 30.3K | −30.3K | −$69.8K |
| 2026-07-15 | 0 | 33.2K | −33.2K | −$86.1K |
| 2026-07-16 | 0 | 30.8K | −30.8K | −$74.4K |
| 2026-07-17 | 0 | 25.0K | −25.0K | −$57.2K |
| 2026-07-18 | 0 | 18.9K | −18.9K | −$43.3K |
| 2026-07-19 | 0 | 15.0K | −15.0K | −$33.9K |
| 2026-07-20 | 0 | 26.1K | −26.1K | −$57.6K |
| 2026-07-21 | 0 | 28.8K | −28.8K | −$62.6K |
| 2026-07-22 | 0 | 24.9K | −24.9K | −$58.3K |


---

## Morpho (MORPHO)

**Price:** $1.99    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$193.8K | today @ $1.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.36M | today @ $1.99 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.81M | today @ $1.99 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$17.44M | today @ $1.99 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/morpho/unlocks.json | proxy | Editorial schedule transcribed from defillama.com/unlocks/morpho (2026-05-29) |
| buybacks | — | n/a | Fee switch proposed but not activated — Cat A buyback mechanism dormant |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-11 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-12 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-13 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-14 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-15 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-16 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-17 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-18 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-19 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-20 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-21 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-22 | 202.7K | 0 | +97.4K | +$193.8K |
| 2026-07-23 | 202.7K | 0 | +97.4K | +$193.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 202.7K | $403.3K |
| 2026-07-25 | 202.7K | $403.3K |
| 2026-07-26 | 202.7K | $403.3K |
| 2026-07-27 | 202.7K | $403.3K |
| 2026-07-28 | 202.7K | $403.3K |
| 2026-07-29 | 202.7K | $403.3K |
| 2026-07-30 | 202.7K | $403.3K |
| 2026-07-31 | 202.7K | $403.3K |


---

## Pendle (PENDLE)

**Price:** $1.60    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.60 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.60 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.60 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.60 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/pendle/unlocks.json | proxy | Fully unlocked per DL (100%) — events: [] |
| buybacks | — | n/a | fee-share-lockers (Cat B yield to vePENDLE) — no supply-side compression |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |


---

## Jito (JTO)

**Price:** $0.62    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$133.6K | today @ $0.62 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$935.4K | today @ $0.62 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$4.01M | today @ $0.62 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$12.03M | today @ $0.62 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/jito/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/jito (2026-05-29) |
| buybacks | — | n/a | JIP-31 paused buybacks Q1-Q3 2026 — BAM validator subsidies redirect. Will resume. |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-11 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-12 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-13 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-14 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-15 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-16 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-17 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-18 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-19 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-20 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-21 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-22 | 626.2K | 0 | +214.3K | +$133.6K |
| 2026-07-23 | 626.2K | 0 | +214.3K | +$133.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 626.2K | $390.5K |
| 2026-07-25 | 626.2K | $390.5K |
| 2026-07-26 | 626.2K | $390.5K |
| 2026-07-27 | 626.2K | $390.5K |
| 2026-07-28 | 626.2K | $390.5K |
| 2026-07-29 | 626.2K | $390.5K |
| 2026-07-30 | 626.2K | $390.5K |
| 2026-07-31 | 626.2K | $390.5K |


---

## Jupiter (JUP)

**Price:** $0.19    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.19 | 0.0000% |
| 7d | 6/7d | 0 | 1.74M | 🟢 −1.74M JUP | −$342.1K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 10.20M | 🔴 +5.36M JUP | +$1.41M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 33.98M | 🔴 +12.68M JUP | +$2.77M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/jupiter/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/jupiter (2026-05-29) |
| buybacks | data/onchain/proxy/jupiter/buybacks.json | proxy | DL daily holdersRevenue (50% revenue → JUP buybacks since Feb 2025) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-09 | 0 | 262.7K | −262.7K | −$56.0K |
| 2026-07-10 | 0 | 487.2K | −487.2K | −$103.8K |
| 2026-07-11 | 0 | 273.0K | −273.0K | −$55.5K |
| 2026-07-12 | 0 | 240.6K | −240.6K | −$48.7K |
| 2026-07-13 | 0 | 302.0K | −302.0K | −$60.7K |
| 2026-07-14 | 0 | 374.5K | −374.5K | −$77.5K |
| 2026-07-15 | 0 | 287.9K | −287.9K | −$60.9K |
| 2026-07-16 | 0 | 252.8K | −252.8K | −$52.3K |
| 2026-07-17 | 0 | 394.3K | −394.3K | −$77.2K |
| 2026-07-18 | 0 | 230.6K | −230.6K | −$44.7K |
| 2026-07-19 | 0 | 218.6K | −218.6K | −$42.6K |
| 2026-07-20 | 0 | 263.5K | −263.5K | −$51.6K |
| 2026-07-21 | 0 | 358.0K | −358.0K | −$70.1K |
| 2026-07-22 | 0 | 279.1K | −279.1K | −$55.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-27 | 53.47M | $10.33M |
| 2026-08-27 | 53.47M | $10.33M |
| 2026-09-27 | 53.47M | $10.33M |
| 2026-10-27 | 53.47M | $10.33M |
| 2026-11-27 | 53.47M | $10.33M |
| 2026-12-27 | 53.47M | $10.33M |
| 2027-01-27 | 53.47M | $10.33M |
| 2027-02-27 | 53.47M | $10.33M |


---

## Fluid (FLUID)

**Price:** $1.07    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$2.9K | today @ $1.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$20.6K | today @ $1.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$249.1K | today @ $1.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$747.4K | today @ $1.07 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/fluid/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/fluid (2026-05-29) |
| buybacks | data/onchain/proxy/fluid/buybacks.json | proxy | DL daily holdersRevenue (100% mainnet rev → FLUID buybacks since Oct 2025) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-11 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-12 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-13 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-14 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-15 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-16 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-17 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-18 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-19 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-20 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-21 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-22 | 9.1K | 0 | +2.7K | +$2.9K |
| 2026-07-23 | 9.1K | 0 | +2.7K | +$2.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 9.1K | $9.8K |
| 2026-07-25 | 9.1K | $9.8K |
| 2026-07-26 | 9.1K | $9.8K |
| 2026-07-27 | 9.1K | $9.8K |
| 2026-07-28 | 9.1K | $9.8K |
| 2026-07-29 | 9.1K | $9.8K |
| 2026-07-30 | 9.1K | $9.8K |
| 2026-07-31 | 9.1K | $9.8K |


---

## Collector Crypt (CARDS)

**Price:** $0.14    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 4.41M | 🟢 −4.41M CARDS | −$621.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 16.47M | 🟢 −16.47M CARDS | −$2.45M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 14.25M | 55.31M | 🟢 −43.92M CARDS | −$7.94M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 42.76M | 182.12M | 🟢 −147.95M CARDS | −$24.75M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/collector-crypt/unlocks.json | proxy | Editorial schedule from collector-crypt portal — TEAM CLIFF Sep 1 2026 (32.5M CARDS/month × 12mo) |
| buybacks | data/onchain/proxy/collector-crypt/buybacks.json | proxy | DL daily revenue × 0.875 accrual_pct (DL doesn't classify burn as holdersRevenue) |
| burns | — | n/a | Counted under buybacks (buyback-burn mechanism) |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 2.19M | −2.19M | −$363.3K |
| 2026-07-11 | 0 | 853.5K | −853.5K | −$141.8K |
| 2026-07-12 | 0 | 835.5K | −835.5K | −$125.4K |
| 2026-07-13 | 0 | 2.62M | −2.62M | −$377.3K |
| 2026-07-14 | 0 | 3.53M | −3.53M | −$592.3K |
| 2026-07-15 | 0 | 2.98M | −2.98M | −$524.0K |
| 2026-07-16 | 0 | 2.01M | −2.01M | −$318.4K |
| 2026-07-17 | 0 | 2.09M | −2.09M | −$303.4K |
| 2026-07-18 | 0 | 2.56M | −2.56M | −$384.5K |
| 2026-07-19 | 0 | 1.22M | −1.22M | −$197.3K |
| 2026-07-20 | 0 | 1.75M | −1.75M | −$268.0K |
| 2026-07-21 | 0 | 812.1K | −812.1K | −$124.0K |
| 2026-07-22 | 0 | 3.64M | −3.64M | −$556.3K |
| 2026-07-23 | 0 | 4.41M | −4.41M | −$621.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 14.25M | $1.93M |
| 2026-09-01 | 44.67M | $6.05M |
| 2026-10-01 | 44.67M | $6.05M |
| 2026-11-01 | 44.67M | $6.05M |
| 2026-12-01 | 44.67M | $6.05M |
| 2027-01-01 | 44.67M | $6.05M |
| 2027-02-01 | 44.67M | $6.05M |
| 2027-03-01 | 44.67M | $6.05M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$310.2K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 2.52B | 1.54B | 🟢 −417.63M PUMP | −$747.8K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 18.28B | 8.67B | 🟢 −1.98B PUMP | −$3.14M | per-day (97%) | 0.0000% |
| 90d | 89/90d | 38.28B | 26.28B | 🟢 −13.59B PUMP | −$22.94M | per-day (99%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/pump.fun/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/pump-fun |
| buybacks | data/onchain/proxy/pump.fun/buybacks.json | proxy | DL daily holdersRevenue (~100% fees → PUMP buyback) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 359.91M | 244.86M | −84.55M | −$125.1K |
| 2026-07-11 | 359.91M | 198.10M | −37.79M | −$55.1K |
| 2026-07-12 | 10.36B | 215.39M | +2.94B | +$4.10M |
| 2026-07-13 | 359.91M | 256.93M | −96.62M | −$141.1K |
| 2026-07-14 | 359.91M | 328.70M | −168.39M | −$248.5K |
| 2026-07-15 | 359.91M | 283.65M | −123.34M | −$187.2K |
| 2026-07-16 | 359.91M | 242.50M | −82.19M | −$139.2K |
| 2026-07-17 | 359.91M | 234.33M | −74.03M | −$125.6K |
| 2026-07-18 | 359.91M | 262.95M | −102.64M | −$168.0K |
| 2026-07-19 | 359.91M | 280.89M | −120.58M | −$200.2K |
| 2026-07-20 | 359.91M | 237.26M | −76.96M | −$154.1K |
| 2026-07-21 | 359.91M | 248.93M | −88.62M | −$179.3K |
| 2026-07-22 | 359.91M | 275.42M | −115.12M | −$230.7K |
| 2026-07-23 | 359.91M | 0 | +160.31M | +$310.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 359.91M | $696.3K |
| 2026-07-25 | 359.91M | $696.3K |
| 2026-07-26 | 359.91M | $696.3K |
| 2026-07-27 | 359.91M | $696.3K |
| 2026-07-28 | 359.91M | $696.3K |
| 2026-07-29 | 359.91M | $696.3K |
| 2026-07-30 | 359.91M | $696.3K |
| 2026-07-31 | 359.91M | $696.3K |


---

## LayerZero (ZRO)

**Price:** $0.82    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.82 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$9.37M | today @ $0.82 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 144.1K | 🔴 +11.32M ZRO | +$9.23M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 539.6K | 🔴 +33.85M ZRO | +$27.47M | per-day (57%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/layerzero/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/layerzero |
| buybacks | data/onchain/proxy/layerzero/buybacks.json | proxy | DL daily holdersRevenue (Dec 2025 fee-switch activation — 100% LZ fees → ZRO burn) |
| burns | — | n/a | Burns counted under buybacks (Firepit destination) |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.37M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.37M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.37M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.37M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.37M |
| 2026-07-08 | 0 | 144.1K | −144.1K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$9.37M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-20 | 23.63M | $19.31M |
| 2026-09-20 | 23.63M | $19.31M |
| 2026-10-20 | 23.63M | $19.31M |
| 2026-11-20 | 23.63M | $19.31M |
| 2026-12-20 | 23.63M | $19.31M |
| 2027-01-20 | 23.63M | $19.31M |
| 2027-02-20 | 23.63M | $19.31M |
| 2027-03-20 | 23.63M | $19.31M |


---

## Ethena (ENA)

**Price:** $0.09    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$376.5K | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.64M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$11.30M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$33.89M | today @ $0.09 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/ethena/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/ethena |
| buybacks | — | n/a | Mechanism=none — only mint fees (~$2.6M/yr) to ENA; sUSDe yield doesn't accrue to ENA holders |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-11 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-12 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-13 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-14 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-15 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-16 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-17 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-18 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-19 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-20 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-21 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-22 | 10.75M | 0 | +4.11M | +$376.5K |
| 2026-07-23 | 10.75M | 0 | +4.11M | +$376.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 10.75M | $984.5K |
| 2026-07-25 | 10.75M | $984.5K |
| 2026-07-26 | 10.75M | $984.5K |
| 2026-07-27 | 10.75M | $984.5K |
| 2026-07-28 | 10.75M | $984.5K |
| 2026-07-29 | 10.75M | $984.5K |
| 2026-07-30 | 10.75M | $984.5K |
| 2026-07-31 | 10.75M | $984.5K |


---

## Aerodrome (AERO)

**Price:** $0.42    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.42 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.42 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.42 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.42 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/aerodrome/unlocks.json | proxy | 100% unlocked — events: []; emissions handled at runtime if/when on-chain feed wired |
| buybacks | — | n/a | fee-share-lockers (Cat B) — 100% fees to veAERO, no supply compression |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |


---

## dYdX (DYDX)

**Price:** $0.13    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$9.8K | today @ $0.13 | 0.0000% |
| 7d | 6/7d | 1.33M | 318.5K | 🔴 +220.0K DYDX | +$27.1K | per-day (86%) | 0.0000% |
| 30d | 24/30d | 5.68M | 1.84M | 🔴 +466.5K DYDX | +$66.2K | per-day (80%) | 0.0000% |
| 90d | 84/90d | 16.10M | 4.50M | 🔴 +2.04M DYDX | +$293.8K | per-day (93%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/dydx/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/dydx — 99.26% already unlocked, vesting tail completes ~Q3 2026 |
| buybacks | data/onchain/proxy/dydx/buybacks.json | proxy | DL daily holdersRevenue (75% fees → TWAP buyback by Treasury SubDAO; forward run-rate is fwd-correct) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a | Bought tokens are staked to validators, not burned — accumulation = buybacks, no double-count |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 189.4K | 63.1K | +13.9K | +$1.9K |
| 2026-07-11 | 189.4K | 23.5K | +53.5K | +$7.0K |
| 2026-07-12 | 189.4K | 59.0K | +17.9K | +$2.3K |
| 2026-07-13 | 189.4K | 90.7K | −13.8K | −$1.8K |
| 2026-07-14 | 189.4K | 154.7K | −77.7K | −$9.4K |
| 2026-07-15 | 189.4K | 145.6K | −68.7K | −$8.2K |
| 2026-07-16 | 189.4K | 109.6K | −32.7K | −$4.0K |
| 2026-07-17 | 189.4K | 97.2K | −20.3K | −$2.5K |
| 2026-07-18 | 189.4K | 20.7K | +56.2K | +$7.0K |
| 2026-07-19 | 189.4K | 16.9K | +60.1K | +$7.3K |
| 2026-07-20 | 189.4K | 47.2K | +29.7K | +$3.5K |
| 2026-07-21 | 189.4K | 35.2K | +41.7K | +$5.0K |
| 2026-07-22 | 189.4K | 101.4K | −24.5K | −$3.0K |
| 2026-07-23 | 189.4K | 0 | +76.9K | +$9.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 189.4K | $24.1K |
| 2026-07-25 | 189.4K | $24.1K |
| 2026-07-26 | 189.4K | $24.1K |
| 2026-07-27 | 189.4K | $24.1K |
| 2026-07-28 | 189.4K | $24.1K |
| 2026-07-29 | 189.4K | $24.1K |
| 2026-07-30 | 189.4K | $24.1K |
| 2026-07-31 | 189.4K | $24.1K |


---

## Meteora (MET)

**Price:** $0.16    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$18.0K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$126.3K | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$541.5K | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.62M | today @ $0.16 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/meteora/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/meteora |
| buybacks | — | n/a | Fee-share proposed but not live — no buyback mechanism |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-11 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-12 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-13 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-14 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-15 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-16 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-17 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-18 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-19 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-20 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-21 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-22 | 291.3K | 0 | +110.1K | +$18.0K |
| 2026-07-23 | 291.3K | 0 | +110.1K | +$18.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 291.3K | $47.7K |
| 2026-07-25 | 291.3K | $47.7K |
| 2026-07-26 | 291.3K | $47.7K |
| 2026-07-27 | 291.3K | $47.7K |
| 2026-07-28 | 291.3K | $47.7K |
| 2026-07-29 | 291.3K | $47.7K |
| 2026-07-30 | 291.3K | $47.7K |
| 2026-07-31 | 291.3K | $47.7K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.5K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$17.5K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$75.0K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$225.0K | today @ $0.02 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/sanctum/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/sanctum |
| buybacks | — | n/a | Mechanism=none — protocol earns ~$6M/yr retained by treasury, no holder accrual |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-11 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-12 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-13 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-14 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-15 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-16 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-17 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-18 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-19 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-20 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-21 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-22 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-23 | 347.8K | 0 | +118.1K | +$2.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 347.8K | $7.4K |
| 2026-07-25 | 347.8K | $7.4K |
| 2026-07-26 | 347.8K | $7.4K |
| 2026-07-27 | 347.8K | $7.4K |
| 2026-07-28 | 347.8K | $7.4K |
| 2026-07-29 | 347.8K | $7.4K |
| 2026-07-30 | 347.8K | $7.4K |
| 2026-07-31 | 347.8K | $7.4K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$27.3K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$117.0K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 62.57M | 0 | 🔴 +30.92M DRIFT | +$398.4K | today @ $0.01 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | data/onchain/proxy/drift/unlocks.json | proxy | Editorial schedule from defillama.com/unlocks/drift |
| buybacks | — | n/a | Mechanism=none — $1M DIP-4 buyback proposed but not confirmed executing; DIP-9 sends $1.5M/mo to Drift Labs (extractive) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-11 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-12 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-13 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-14 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-15 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-16 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-17 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-18 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-19 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-20 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-21 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-22 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-23 | 644.2K | 0 | +302.8K | +$3.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-24 | 644.2K | $8.3K |
| 2026-07-25 | 644.2K | $8.3K |
| 2026-07-26 | 644.2K | $8.3K |
| 2026-07-27 | 644.2K | $8.3K |
| 2026-07-28 | 644.2K | $8.3K |
| 2026-07-29 | 644.2K | $8.3K |
| 2026-07-30 | 644.2K | $8.3K |
| 2026-07-31 | 644.2K | $8.3K |


---

## Uniswap (UNI)

**Price:** $3.86    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 33.8K | 🟢 −33.8K UNI | −$128.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 196.0K | 🟢 −196.0K UNI | −$709.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 1.16M | 🟢 −1.16M UNI | −$3.73M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.97M | 🟢 −3.97M UNI | −$12.32M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet |
| buybacks | data/onchain/proxy/uniswap/buybacks.json | proxy | DL daily holdersRevenue (17% LP fees → TokenJar → Firepit burn since Dec 2025) |
| burns | — | n/a | Burns counted under buybacks (Firepit destination) |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 29.4K | −29.4K | −$99.7K |
| 2026-07-11 | 0 | 20.8K | −20.8K | −$73.5K |
| 2026-07-12 | 0 | 21.9K | −21.9K | −$80.4K |
| 2026-07-13 | 0 | 37.3K | −37.3K | −$134.2K |
| 2026-07-14 | 0 | 35.2K | −35.2K | −$125.1K |
| 2026-07-15 | 0 | 45.5K | −45.5K | −$166.8K |
| 2026-07-16 | 0 | 36.5K | −36.5K | −$131.7K |
| 2026-07-17 | 0 | 40.0K | −40.0K | −$141.8K |
| 2026-07-18 | 0 | 7.8K | −7.8K | −$28.1K |
| 2026-07-19 | 0 | 17.8K | −17.8K | −$63.5K |
| 2026-07-20 | 0 | 42.0K | −42.0K | −$147.3K |
| 2026-07-21 | 0 | 22.4K | −22.4K | −$81.1K |
| 2026-07-22 | 0 | 32.3K | −32.3K | −$120.1K |
| 2026-07-23 | 0 | 33.8K | −33.8K | −$128.0K |


---

## Raydium (RAY)

**Price:** $0.66    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 15.9K | 🟢 −15.9K RAY | −$10.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 109.0K | 🟢 −109.0K RAY | −$74.3K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 684.4K | 🟢 −684.4K RAY | −$450.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.70M | 🟢 −2.70M RAY | −$1.89M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet — RAY largely vested |
| buybacks | data/onchain/proxy/raydium/buybacks.json | proxy | DL daily holdersRevenue (12% trading fees → automatic RAY buyback & burn) |
| burns | — | n/a | Burns counted under buybacks |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 19.4K | −19.4K | −$13.2K |
| 2026-07-11 | 0 | 10.0K | −10.0K | −$7.0K |
| 2026-07-12 | 0 | 10.8K | −10.8K | −$7.4K |
| 2026-07-13 | 0 | 19.1K | −19.1K | −$13.0K |
| 2026-07-14 | 0 | 24.1K | −24.1K | −$16.0K |
| 2026-07-15 | 0 | 17.7K | −17.7K | −$12.1K |
| 2026-07-16 | 0 | 18.6K | −18.6K | −$12.8K |
| 2026-07-17 | 0 | 17.3K | −17.3K | −$11.6K |
| 2026-07-18 | 0 | 13.7K | −13.7K | −$9.3K |
| 2026-07-19 | 0 | 12.7K | −12.7K | −$8.6K |
| 2026-07-20 | 0 | 19.1K | −19.1K | −$12.9K |
| 2026-07-21 | 0 | 15.2K | −15.2K | −$10.7K |
| 2026-07-22 | 0 | 15.1K | −15.1K | −$10.8K |
| 2026-07-23 | 0 | 15.9K | −15.9K | −$10.5K |


---

## Euler (EUL)

**Price:** $1.01    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.01 | 0.0000% |
| 90d | ⚠ 1/90d partial | 0 | 552 | 🟢 −552 EUL | −$795.00 | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet |
| buybacks | data/onchain/proxy/euler/buybacks.json | proxy | DL daily holdersRevenue (FeeFlow automated buyback) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-04-03 | 0 | 22.0K | −22.0K | −$20.0K |
| 2026-04-05 | 0 | 332 | −332 | −$310.00 |
| 2026-04-06 | 0 | 1.3K | −1.3K | −$1.2K |
| 2026-04-08 | 0 | 579 | −579 | −$550.00 |
| 2026-04-09 | 0 | 82 | −82 | −$83.00 |
| 2026-04-10 | 0 | 116 | −116 | −$112.00 |
| 2026-04-11 | 0 | 19.1K | −19.1K | −$20.7K |
| 2026-04-12 | 0 | 243 | −243 | −$255.00 |
| 2026-04-13 | 0 | 9 | −9 | −$9.00 |
| 2026-04-15 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-04-18 | 0 | 52 | −52 | −$82.00 |
| 2026-04-19 | 0 | 62 | −62 | −$82.00 |
| 2026-04-21 | 0 | 244 | −244 | −$317.00 |
| 2026-04-25 | 0 | 552 | −552 | −$795.00 |


---

## Gains Network (GNS)

**Price:** $0.56    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.56 | 0.0000% |
| 7d | 6/7d | 0 | 37.9K | 🟢 −37.9K GNS | −$22.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 135.6K | 🟢 −135.6K GNS | −$79.5K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 899.0K | 🟢 −899.0K GNS | −$478.4K | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet — GNS mostly vested |
| buybacks | data/onchain/proxy/gains-network/buybacks.json | proxy | DL daily holdersRevenue (algorithmic GNS buyback at TWAP +1% then burn) |
| burns | — | n/a | Burns counted under buybacks |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-09 | 0 | 4.3K | −4.3K | −$2.6K |
| 2026-07-10 | 0 | 2.9K | −2.9K | −$1.8K |
| 2026-07-11 | 0 | 1.8K | −1.8K | −$1.1K |
| 2026-07-12 | 0 | 3.2K | −3.2K | −$1.9K |
| 2026-07-13 | 0 | 7.3K | −7.3K | −$4.4K |
| 2026-07-14 | 0 | 2.5K | −2.5K | −$1.5K |
| 2026-07-15 | 0 | 6.7K | −6.7K | −$4.2K |
| 2026-07-16 | 0 | 6.5K | −6.5K | −$4.1K |
| 2026-07-17 | 0 | 7.0K | −7.0K | −$4.3K |
| 2026-07-18 | 0 | 3.9K | −3.9K | −$2.4K |
| 2026-07-19 | 0 | 7.7K | −7.7K | −$4.6K |
| 2026-07-20 | 0 | 8.7K | −8.7K | −$5.3K |
| 2026-07-21 | 0 | 4.1K | −4.1K | −$2.3K |
| 2026-07-22 | 0 | 6.5K | −6.5K | −$3.6K |


---

## Orca (ORCA)

**Price:** $1.18    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.18 | 0.0000% |
| 7d | 6/7d | 0 | 8.4K | 🟢 −8.4K ORCA | −$10.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 62.9K | 🟢 −62.9K ORCA | −$74.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 184.8K | 🟢 −184.8K ORCA | −$233.6K | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet |
| buybacks | data/onchain/proxy/orca/buybacks.json | proxy | DL daily holdersRevenue (40% Whirlpool fees → xORCA buyback) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-09 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-07-10 | 0 | 1.8K | −1.8K | −$2.2K |
| 2026-07-11 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-12 | 0 | 1.2K | −1.2K | −$1.5K |
| 2026-07-13 | 0 | 1.9K | −1.9K | −$2.2K |
| 2026-07-14 | 0 | 2.0K | −2.0K | −$2.2K |
| 2026-07-15 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-07-16 | 0 | 1.6K | −1.6K | −$1.9K |
| 2026-07-17 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-07-18 | 0 | 831 | −831 | −$975.00 |
| 2026-07-19 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-20 | 0 | 2.1K | −2.1K | −$2.5K |
| 2026-07-21 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-07-22 | 0 | 1.5K | −1.5K | −$1.8K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 197.9K | 🟢 −197.9K MNDE | −$3.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.33M | 🟢 −1.33M MNDE | −$25.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 4.53M | 🟢 −4.53M MNDE | −$85.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 15.20M | 🟢 −15.20M MNDE | −$291.0K | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet |
| buybacks | data/onchain/proxy/marinade/buybacks.json | proxy | DL daily holdersRevenue (50% protocol rev → MNDE buyback) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 158.3K | −158.3K | −$3.0K |
| 2026-07-11 | 0 | 155.9K | −155.9K | −$3.0K |
| 2026-07-12 | 0 | 163.6K | −163.6K | −$3.1K |
| 2026-07-13 | 0 | 158.3K | −158.3K | −$3.0K |
| 2026-07-14 | 0 | 172.6K | −172.6K | −$3.3K |
| 2026-07-15 | 0 | 171.3K | −171.3K | −$3.2K |
| 2026-07-16 | 0 | 159.7K | −159.7K | −$3.0K |
| 2026-07-17 | 0 | 172.6K | −172.6K | −$3.3K |
| 2026-07-18 | 0 | 181.1K | −181.1K | −$3.4K |
| 2026-07-19 | 0 | 185.2K | −185.2K | −$3.5K |
| 2026-07-20 | 0 | 186.6K | −186.6K | −$3.5K |
| 2026-07-21 | 0 | 200.9K | −200.9K | −$3.8K |
| 2026-07-22 | 0 | 202.2K | −202.2K | −$3.8K |
| 2026-07-23 | 0 | 197.9K | −197.9K | −$3.7K |


---

## ether.fi (ETHFI)

**Price:** $0.46    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 8.6K | 🟢 −8.6K ETHFI | −$4.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 131.5K | 🟢 −131.5K ETHFI | −$58.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 722.9K | 🟢 −722.9K ETHFI | −$281.1K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.44M | 🟢 −2.44M ETHFI | −$934.3K | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet — ETHFI mostly vested per CGS |
| buybacks | data/onchain/proxy/ether-fi/buybacks.json | proxy | Aggregated dailyRevenue across 3 DL sub-protocols × 10% accrual (DAO Proposal #8: 5% buyback+burn + 5% sETHFI distributions). Excludes $50M discretionary treasury buyback (Nov 2025). |
| burns | — | n/a | >85% of bought ETHFI is burned per notes |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-10 | 0 | 25.0K | −25.0K | −$9.7K |
| 2026-07-11 | 0 | 25.9K | −25.9K | −$10.5K |
| 2026-07-12 | 0 | 28.5K | −28.5K | −$11.8K |
| 2026-07-13 | 0 | 25.5K | −25.5K | −$10.8K |
| 2026-07-14 | 0 | 29.1K | −29.1K | −$11.1K |
| 2026-07-15 | 0 | 26.1K | −26.1K | −$10.3K |
| 2026-07-16 | 0 | 23.6K | −23.6K | −$10.4K |
| 2026-07-17 | 0 | 20.4K | −20.4K | −$8.5K |
| 2026-07-18 | 0 | 20.4K | −20.4K | −$9.0K |
| 2026-07-19 | 0 | 21.0K | −21.0K | −$9.4K |
| 2026-07-20 | 0 | 20.3K | −20.3K | −$9.0K |
| 2026-07-21 | 0 | 21.8K | −21.8K | −$9.9K |
| 2026-07-22 | 0 | 19.1K | −19.1K | −$8.8K |
| 2026-07-23 | 0 | 8.6K | −8.6K | −$4.0K |


---

## CoW Protocol (COW)

**Price:** $0.14    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.14 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 631.9K | 🟢 −631.9K COW | −$85.9K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 5.47M | 🟢 −5.47M COW | −$785.0K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 18.20M | 🟢 −18.20M COW | −$2.78M | per-day (100%) | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | No editorial unlock schedule yet |
| buybacks | data/onchain/proxy/cowswap/buybacks.json | proxy | DL daily revenue × 0.8 (CIP-38 treasury-level buybacks; DL holdersRevenue null — fees fallback) |
| burns | — | n/a |  |
| treasury_accumulation | — | n/a |  |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a |  |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-07-08 | 0 | 186.2K | −186.2K | −$26.1K |
| 2026-07-09 | 0 | 72.1K | −72.1K | −$9.8K |
| 2026-07-10 | 0 | 183.3K | −183.3K | −$25.2K |
| 2026-07-11 | 0 | 139.2K | −139.2K | −$19.6K |
| 2026-07-12 | 0 | 82.3K | −82.3K | −$11.5K |
| 2026-07-13 | 0 | 326.3K | −326.3K | −$45.4K |
| 2026-07-14 | 0 | 317.1K | −317.1K | −$43.3K |
| 2026-07-15 | 0 | 149.8K | −149.8K | −$21.6K |
| 2026-07-16 | 0 | 153.8K | −153.8K | −$22.5K |
| 2026-07-17 | 0 | 136.5K | −136.5K | −$19.9K |
| 2026-07-18 | 0 | 61.6K | −61.6K | −$8.2K |
| 2026-07-19 | 0 | 73.6K | −73.6K | −$9.8K |
| 2026-07-20 | 0 | 185.8K | −185.8K | −$24.6K |
| 2026-07-21 | 0 | 174.4K | −174.4K | −$23.3K |


---
