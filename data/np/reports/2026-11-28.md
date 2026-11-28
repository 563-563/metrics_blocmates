# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-28T00:15:51.082Z
**As-of:** 2026-11-28

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $63.65    **Circulating:** 599.96M HYPE    **AF balance:** 49.39M HYPE    **Total staked:** 436.92M HYPE (72.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 HYPE | $0 | today @ $63.65 | 0.0000% |
| 7d | 6/7d | 0 | 113.7K | 🟢 −307.5K HYPE | −$19.57M | today @ $63.65 | -0.0307% |
| 30d | 29/30d | 9.92M | 340.3K | 🟢 −359.6K HYPE | −$22.89M | today @ $63.65 | -0.0360% |
| 90d | 89/90d | 44.81M | 700.4K | 🟢 −8.15M HYPE | −$518.60M | today @ $63.65 | -0.8148% |

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
| 2026-11-15 | 0 | 9.7K | −9.7K | −$620.3K |
| 2026-11-16 | 0 | 20.5K | −20.5K | −$1.31M |
| 2026-11-17 | 0 | 11.4K | −65.2K | −$4.15M |
| 2026-11-18 | 0 | 23.9K | −23.9K | −$1.52M |
| 2026-11-19 | 0 | 10.7K | −191.2K | −$12.17M |
| 2026-11-20 | 0 | 14.6K | −14.6K | −$928.2K |
| 2026-11-21 | 0 | 16.7K | −16.7K | −$1.06M |
| 2026-11-22 | 0 | 10.6K | −148.2K | −$9.43M |
| 2026-11-23 | 0 | 361 | −361 | −$22.9K |
| 2026-11-24 | 0 | 15.3K | −15.3K | −$971.3K |
| 2026-11-25 | 0 | 37.6K | −82.5K | −$5.25M |
| 2026-11-26 | 0 | 20.1K | −31.4K | −$2.00M |
| 2026-11-27 | 0 | 29.7K | −29.7K | −$1.89M |
| 2026-11-28 | 0 | 0 | 0 | $0 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $479.37M |
| 2026-12-06 | 9.92M | $631.20M |
| 2026-12-29 | 7.53M | $479.37M |
| 2027-01-06 | 9.92M | $631.20M |
| 2027-01-29 | 7.53M | $479.37M |
| 2027-02-06 | 9.92M | $631.20M |
| 2027-03-01 | 7.53M | $479.37M |
| 2027-03-06 | 9.92M | $631.20M |


---

## Aave (AAVE)

**Price:** $95.68    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −7.3K AAVE | −$701.9K | today @ $95.68 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.3K AAVE | −$701.9K | today @ $95.68 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −33.6K AAVE | −$3.21M | today @ $95.68 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −75.6K AAVE | −$7.23M | today @ $95.68 | 0.0000% |

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
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$75.9K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$32.3K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | 0 | $0 |
| 2026-11-14 | 0 | 0 | −1.4K | −$137.5K |
| 2026-11-17 | 0 | 0 | −3.0K | −$282.7K |
| 2026-11-19 | 0 | 0 | 0 | $0 |
| 2026-11-21 | 0 | 0 | −20.7K | −$1.98M |
| 2026-11-25 | 0 | 0 | 0 | $0 |
| 2026-11-26 | 0 | 0 | 0 | $0 |
| 2026-11-27 | 0 | 0 | 0 | $0 |
| 2026-11-28 | 0 | 0 | −7.3K | −$701.9K |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.43M SKY | −$388.8K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −31.12M SKY | −$1.63M | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −136.07M SKY | −$7.12M | today @ $0.05 | 0.0000% |

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
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$251.5K |
| 2026-11-06 | 0 | 0 | −6.56M | −$343.3K |
| 2026-11-07 | 0 | 0 | −1.07M | −$56.0K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | −1.34M | −$70.3K |
| 2026-11-14 | 0 | 0 | −497.7K | −$26.0K |
| 2026-11-17 | 0 | 0 | −5.69M | −$297.6K |
| 2026-11-19 | 0 | 0 | −3.71M | −$194.2K |
| 2026-11-21 | 0 | 0 | 0 | $0 |
| 2026-11-25 | 0 | 0 | 0 | $0 |
| 2026-11-26 | 0 | 0 | −7.43M | −$388.8K |
| 2026-11-27 | 0 | 0 | 0 | $0 |
| 2026-11-28 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $2.68    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.68 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 235.9K | 🟢 −235.9K LIT | −$564.0K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.21M | 🟢 −1.21M LIT | −$3.50M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 3.06M | 🟢 −3.06M LIT | −$10.26M | per-day (100%) | 0.0000% |

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
| 2026-11-13 | 0 | 53.6K | −53.6K | −$172.3K |
| 2026-11-14 | 0 | 46.8K | −46.8K | −$152.0K |
| 2026-11-15 | 0 | 56.4K | −56.4K | −$162.4K |
| 2026-11-16 | 0 | 55.6K | −55.6K | −$157.4K |
| 2026-11-17 | 0 | 37.3K | −37.3K | −$110.8K |
| 2026-11-18 | 0 | 36.1K | −36.1K | −$104.3K |
| 2026-11-19 | 0 | 48.9K | −48.9K | −$133.1K |
| 2026-11-20 | 0 | 61.1K | −61.1K | −$168.5K |
| 2026-11-21 | 0 | 80.1K | −80.1K | −$188.6K |
| 2026-11-22 | 0 | 33.2K | −33.2K | −$77.4K |
| 2026-11-23 | 0 | 81.2K | −81.2K | −$194.5K |
| 2026-11-24 | 0 | 41.4K | −41.4K | −$100.4K |
| 2026-11-25 | 0 | 39.5K | −39.5K | −$94.3K |
| 2026-11-26 | 0 | 40.6K | −40.6K | −$97.3K |


---

## Morpho (MORPHO)

**Price:** $1.64    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$159.7K | today @ $1.64 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.12M | today @ $1.64 | 0.0000% |
| 30d | ⚠ 0/30d partial | 7.08M | 0 | 🔴 +3.12M MORPHO | +$5.12M | today @ $1.64 | 0.0000% |
| 90d | ⚠ 0/90d partial | 19.24M | 0 | 🔴 +8.96M MORPHO | +$14.70M | today @ $1.64 | 0.0000% |

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
| 2026-11-15 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-16 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-17 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-18 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-19 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-20 | 1.20M | 0 | +297.4K | +$487.7K |
| 2026-11-21 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-22 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-23 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-24 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-25 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-26 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-27 | 202.7K | 0 | +97.4K | +$159.7K |
| 2026-11-28 | 202.7K | 0 | +97.4K | +$159.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 202.7K | $332.4K |
| 2026-11-30 | 202.7K | $332.4K |
| 2026-12-01 | 202.7K | $332.4K |
| 2026-12-02 | 202.7K | $332.4K |
| 2026-12-03 | 202.7K | $332.4K |
| 2026-12-04 | 202.7K | $332.4K |
| 2026-12-05 | 202.7K | $332.4K |
| 2026-12-06 | 202.7K | $332.4K |


---

## Pendle (PENDLE)

**Price:** $1.21    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.21 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.21 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.21 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.21 | 0.0000% |

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

**Price:** $0.24    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$51.6K | today @ $0.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$360.9K | today @ $0.24 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$1.55M | today @ $0.24 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$4.64M | today @ $0.24 | 0.0000% |

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
| 2026-11-15 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-16 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-17 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-18 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-19 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-20 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-21 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-22 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-23 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-24 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-25 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-26 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-27 | 626.2K | 0 | +214.3K | +$51.6K |
| 2026-11-28 | 626.2K | 0 | +214.3K | +$51.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 626.2K | $150.6K |
| 2026-11-30 | 626.2K | $150.6K |
| 2026-12-01 | 626.2K | $150.6K |
| 2026-12-02 | 626.2K | $150.6K |
| 2026-12-03 | 626.2K | $150.6K |
| 2026-12-04 | 626.2K | $150.6K |
| 2026-12-05 | 626.2K | $150.6K |
| 2026-12-06 | 626.2K | $150.6K |


---

## Jupiter (JUP)

**Price:** $0.25    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.25 | 0.0000% |
| 7d | ⚠ 4/7d partial | 53.47M | 868.3K | 🔴 +14.68M JUP | +$3.67M | per-day (80%) | 0.0000% |
| 30d | 27/30d | 53.47M | 16.26M | 🟢 −711.8K JUP | −$259.0K | per-day (96%) | 0.0000% |
| 90d | 87/90d | 160.41M | 30.80M | 🔴 +15.86M JUP | +$5.30M | per-day (99%) | 0.0000% |

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
| 2026-11-13 | 0 | 2.14M | −2.14M | −$567.4K |
| 2026-11-14 | 0 | 753.4K | −753.4K | −$199.6K |
| 2026-11-15 | 0 | 873.8K | −873.8K | −$216.8K |
| 2026-11-16 | 0 | 1.43M | −1.43M | −$381.1K |
| 2026-11-17 | 0 | 265.7K | −265.7K | −$64.0K |
| 2026-11-18 | 0 | 239.0K | −239.0K | −$62.7K |
| 2026-11-19 | 0 | 218.1K | −218.1K | −$57.2K |
| 2026-11-20 | 0 | 508.6K | −508.6K | −$127.1K |
| 2026-11-21 | 0 | 613.3K | −613.3K | −$139.5K |
| 2026-11-22 | 0 | 298.9K | −298.9K | −$65.1K |
| 2026-11-23 | 0 | 355.5K | −355.5K | −$79.8K |
| 2026-11-24 | 0 | 211.9K | −211.9K | −$50.2K |
| 2026-11-25 | 0 | 2.0K | −2.0K | −$452.00 |
| 2026-11-27 | 53.47M | 0 | +15.55M | +$3.87M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-27 | 53.47M | $13.29M |
| 2027-01-27 | 53.47M | $13.29M |
| 2027-02-27 | 53.47M | $13.29M |
| 2027-03-27 | 53.47M | $13.29M |
| 2027-04-27 | 53.47M | $13.29M |
| 2027-05-27 | 53.47M | $13.29M |
| 2027-06-27 | 53.47M | $13.29M |
| 2027-07-27 | 53.47M | $13.29M |


---

## Fluid (FLUID)

**Price:** $1.50    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$4.1K | today @ $1.50 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$28.8K | today @ $1.50 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$348.3K | today @ $1.50 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.04M | today @ $1.50 | 0.0000% |

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
| 2026-11-15 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-16 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-17 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-18 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-19 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-20 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-21 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-22 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-23 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-24 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-25 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-26 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-27 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-28 | 9.1K | 0 | +2.7K | +$4.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 9.1K | $13.7K |
| 2026-11-30 | 9.1K | $13.7K |
| 2026-12-01 | 9.1K | $13.7K |
| 2026-12-02 | 9.1K | $13.7K |
| 2026-12-03 | 9.1K | $13.7K |
| 2026-12-04 | 9.1K | $13.7K |
| 2026-12-05 | 509.1K | $763.7K |
| 2026-12-06 | 9.1K | $13.7K |


---

## Collector Crypt (CARDS)

**Price:** $0.17    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.17 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 505.8K | 🟢 −505.8K CARDS | −$80.1K | per-day (100%) | 0.0000% |
| 30d | ⚠ 22/30d partial | 44.67M | 1.59M | 🔴 +10.35M CARDS | +$2.53M | per-day (100%) | 0.0000% |
| 90d | 73/90d | 134.02M | 63.27M | 🟢 −27.46M CARDS | −$2.57M | per-day (99%) | 0.0000% |

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
| 2026-11-07 | 0 | 14.5K | −14.5K | −$3.5K |
| 2026-11-08 | 0 | 16.3K | −16.3K | −$3.8K |
| 2026-11-09 | 0 | 32.5K | −32.5K | −$6.9K |
| 2026-11-10 | 0 | 12.5K | −12.5K | −$2.8K |
| 2026-11-11 | 0 | 16.3K | −16.3K | −$3.7K |
| 2026-11-12 | 0 | 27.0K | −27.0K | −$5.2K |
| 2026-11-13 | 0 | 23.1K | −23.1K | −$4.5K |
| 2026-11-14 | 0 | 8.0K | −8.0K | −$1.6K |
| 2026-11-15 | 0 | 11.8K | −11.8K | −$1.9K |
| 2026-11-19 | 0 | 60.2K | −60.2K | −$9.6K |
| 2026-11-20 | 0 | 47.8K | −47.8K | −$7.9K |
| 2026-11-21 | 0 | 16.7K | −16.7K | −$2.4K |
| 2026-11-22 | 0 | 17.1K | −17.1K | −$2.7K |
| 2026-11-23 | 0 | 488.7K | −488.7K | −$77.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-01 | 44.67M | $7.42M |
| 2027-01-01 | 44.67M | $7.42M |
| 2027-02-01 | 44.67M | $7.42M |
| 2027-03-01 | 44.67M | $7.42M |
| 2027-04-01 | 44.67M | $7.42M |
| 2027-05-01 | 44.67M | $7.42M |
| 2027-06-01 | 44.67M | $7.42M |
| 2027-07-01 | 44.67M | $7.42M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$416.7K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 5/7d partial | 2.52B | 1.08B | 🔴 +41.58M PUMP | +$131.3K | per-day (71%) | 0.0000% |
| 30d | 28/30d | 20.80B | 4.94B | 🔴 +2.87B PUMP | +$10.19M | per-day (93%) | 0.0000% |
| 90d | 88/90d | 62.39B | 16.23B | 🔴 +7.20B PUMP | +$30.00M | per-day (98%) | 0.0000% |

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
| 2026-11-15 | 359.91M | 166.64M | −6.34M | −$18.5K |
| 2026-11-16 | 359.91M | 194.28M | −33.97M | −$100.9K |
| 2026-11-17 | 359.91M | 215.20M | −54.89M | −$155.6K |
| 2026-11-18 | 359.91M | 251.52M | −91.22M | −$257.0K |
| 2026-11-19 | 359.91M | 214.40M | −54.09M | −$140.5K |
| 2026-11-20 | 359.91M | 192.96M | −32.65M | −$86.3K |
| 2026-11-21 | 359.91M | 186.22M | −25.91M | −$62.8K |
| 2026-11-22 | 359.91M | 181.07M | −20.77M | −$48.8K |
| 2026-11-23 | 359.91M | 226.55M | −66.24M | −$172.2K |
| 2026-11-24 | 359.91M | 224.33M | −64.02M | −$162.0K |
| 2026-11-25 | 359.91M | 239.35M | −79.04M | −$193.0K |
| 2026-11-26 | 359.91M | 209.27M | −48.97M | −$126.0K |
| 2026-11-27 | 359.91M | 0 | +160.31M | +$416.7K |
| 2026-11-28 | 359.91M | 0 | +160.31M | +$416.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 359.91M | $935.4K |
| 2026-11-30 | 359.91M | $935.4K |
| 2026-12-01 | 359.91M | $935.4K |
| 2026-12-02 | 359.91M | $935.4K |
| 2026-12-03 | 359.91M | $935.4K |
| 2026-12-04 | 359.91M | $935.4K |
| 2026-12-05 | 359.91M | $935.4K |
| 2026-12-06 | 359.91M | $935.4K |


---

## LayerZero (ZRO)

**Price:** $1.09    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.09 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$12.18M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$36.96M | per-day (40%) | 0.0000% |

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
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$12.48M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |
| 2026-11-20 | 23.63M | 0 | +11.46M | +$12.48M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-20 | 23.63M | $25.73M |
| 2027-01-20 | 23.63M | $25.73M |
| 2027-02-20 | 23.63M | $25.73M |
| 2027-03-20 | 23.63M | $25.73M |
| 2027-04-20 | 23.63M | $25.73M |
| 2027-05-20 | 23.63M | $25.73M |
| 2027-06-20 | 23.63M | $25.73M |
| 2027-07-20 | 23.63M | $25.73M |


---

## Ethena (ENA)

**Price:** $0.10    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$428.1K | today @ $0.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$3.00M | today @ $0.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$12.84M | today @ $0.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$38.53M | today @ $0.10 | 0.0000% |

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
| 2026-11-15 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-16 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-17 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-18 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-19 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-20 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-21 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-22 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-23 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-24 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-25 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-26 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-27 | 10.75M | 0 | +4.11M | +$428.1K |
| 2026-11-28 | 10.75M | 0 | +4.11M | +$428.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 10.75M | $1.12M |
| 2026-11-30 | 10.75M | $1.12M |
| 2026-12-01 | 10.75M | $1.12M |
| 2026-12-02 | 10.75M | $1.12M |
| 2026-12-03 | 10.75M | $1.12M |
| 2026-12-04 | 10.75M | $1.12M |
| 2026-12-05 | 10.75M | $1.12M |
| 2026-12-06 | 10.75M | $1.12M |


---

## Aerodrome (AERO)

**Price:** $0.39    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |

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

**Price:** $0.07    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 680.1K | 🟢 −680.1K DYDX | −$47.8K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 2.52M | 🟢 −2.52M DYDX | −$216.7K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 6.50M | 🟢 −6.50M DYDX | −$714.3K | per-day (100%) | 0.0000% |

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
| 2026-11-13 | 0 | 81.4K | −81.4K | −$7.5K |
| 2026-11-14 | 0 | 79.5K | −79.5K | −$7.1K |
| 2026-11-15 | 0 | 160.8K | −160.8K | −$12.4K |
| 2026-11-16 | 0 | 93.9K | −93.9K | −$7.5K |
| 2026-11-17 | 0 | 86.1K | −86.1K | −$6.9K |
| 2026-11-18 | 0 | 71.1K | −71.1K | −$5.9K |
| 2026-11-19 | 0 | 22.7K | −22.7K | −$1.8K |
| 2026-11-20 | 0 | 48.4K | −48.4K | −$3.7K |
| 2026-11-21 | 0 | 75.6K | −75.6K | −$5.4K |
| 2026-11-22 | 0 | 74.4K | −74.4K | −$5.1K |
| 2026-11-23 | 0 | 113.8K | −113.8K | −$7.9K |
| 2026-11-24 | 0 | 210.8K | −210.8K | −$15.1K |
| 2026-11-25 | 0 | 238.9K | −238.9K | −$16.7K |
| 2026-11-26 | 0 | 42.3K | −42.3K | −$2.9K |


---

## Meteora (MET)

**Price:** $0.20    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$21.7K | today @ $0.20 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$151.7K | today @ $0.20 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$650.0K | today @ $0.20 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.95M | today @ $0.20 | 0.0000% |

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
| 2026-11-15 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-16 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-17 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-18 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-19 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-20 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-21 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-22 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-23 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-24 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-25 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-26 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-27 | 291.3K | 0 | +110.1K | +$21.7K |
| 2026-11-28 | 291.3K | 0 | +110.1K | +$21.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 291.3K | $57.3K |
| 2026-11-30 | 291.3K | $57.3K |
| 2026-12-01 | 291.3K | $57.3K |
| 2026-12-02 | 291.3K | $57.3K |
| 2026-12-03 | 291.3K | $57.3K |
| 2026-12-04 | 291.3K | $57.3K |
| 2026-12-05 | 291.3K | $57.3K |
| 2026-12-06 | 291.3K | $57.3K |


---

## Sanctum (CLOUD)

**Price:** $0.05    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$6.0K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$41.9K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$179.4K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$766.1K | today @ $0.05 | 0.0000% |

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
| 2026-11-15 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-16 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-17 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-18 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-19 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-20 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-21 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-22 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-23 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-24 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-25 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-26 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-27 | 347.8K | 0 | +118.1K | +$6.0K |
| 2026-11-28 | 347.8K | 0 | +118.1K | +$6.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 347.8K | $17.6K |
| 2026-11-30 | 347.8K | $17.6K |
| 2026-12-01 | 347.8K | $17.6K |
| 2026-12-02 | 347.8K | $17.6K |
| 2026-12-03 | 347.8K | $17.6K |
| 2026-12-04 | 347.8K | $17.6K |
| 2026-12-05 | 347.8K | $17.6K |
| 2026-12-06 | 347.8K | $17.6K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$2.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$19.2K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$82.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$246.8K | today @ $0.01 | 0.0000% |

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
| 2026-11-15 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-16 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-17 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-18 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-19 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-20 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-21 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-22 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-23 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-24 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-25 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-26 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-27 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-28 | 644.2K | 0 | +302.8K | +$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 644.2K | $5.8K |
| 2026-11-30 | 644.2K | $5.8K |
| 2026-12-01 | 644.2K | $5.8K |
| 2026-12-02 | 644.2K | $5.8K |
| 2026-12-03 | 644.2K | $5.8K |
| 2026-12-04 | 644.2K | $5.8K |
| 2026-12-05 | 644.2K | $5.8K |
| 2026-12-06 | 644.2K | $5.8K |


---

## Uniswap (UNI)

**Price:** $4.83    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.83 | 0.0000% |
| 7d | 6/7d | 0 | 231.2K | 🟢 −231.2K UNI | −$1.09M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.18M | 🟢 −1.18M UNI | −$6.92M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.50M | 🟢 −4.50M UNI | −$30.50M | per-day (100%) | 0.0000% |

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
| 2026-11-14 | 0 | 61.2K | −61.2K | −$351.8K |
| 2026-11-15 | 0 | 47.3K | −47.3K | −$231.1K |
| 2026-11-16 | 0 | 33.7K | −33.7K | −$174.5K |
| 2026-11-17 | 0 | 41.0K | −41.0K | −$211.6K |
| 2026-11-18 | 0 | 35.2K | −35.2K | −$187.0K |
| 2026-11-19 | 0 | 46.7K | −46.7K | −$242.0K |
| 2026-11-20 | 0 | 65.2K | −65.2K | −$321.4K |
| 2026-11-21 | 0 | 57.5K | −57.5K | −$257.0K |
| 2026-11-22 | 0 | 25.6K | −25.6K | −$121.4K |
| 2026-11-23 | 0 | 58.8K | −58.8K | −$275.5K |
| 2026-11-24 | 0 | 33.4K | −33.4K | −$161.7K |
| 2026-11-25 | 0 | 52.3K | −52.3K | −$246.6K |
| 2026-11-26 | 0 | 21.8K | −21.8K | −$103.2K |
| 2026-11-27 | 0 | 39.2K | −39.2K | −$182.6K |


---

## Raydium (RAY)

**Price:** $1.30    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.30 | 0.0000% |
| 7d | 6/7d | 0 | 132.9K | 🟢 −132.9K RAY | −$172.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 702.8K | 🟢 −702.8K RAY | −$1.07M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.86M | 🟢 −4.86M RAY | −$7.30M | per-day (100%) | 0.0000% |

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
| 2026-11-14 | 0 | 19.3K | −19.3K | −$28.7K |
| 2026-11-15 | 0 | 19.4K | −19.4K | −$26.1K |
| 2026-11-16 | 0 | 24.7K | −24.7K | −$35.4K |
| 2026-11-17 | 0 | 23.0K | −23.0K | −$32.1K |
| 2026-11-18 | 0 | 27.0K | −27.0K | −$39.4K |
| 2026-11-19 | 0 | 26.6K | −26.6K | −$37.2K |
| 2026-11-20 | 0 | 32.1K | −32.1K | −$44.6K |
| 2026-11-21 | 0 | 24.3K | −24.3K | −$31.3K |
| 2026-11-22 | 0 | 17.5K | −17.5K | −$23.4K |
| 2026-11-23 | 0 | 36.5K | −36.5K | −$48.1K |
| 2026-11-24 | 0 | 19.4K | −19.4K | −$25.5K |
| 2026-11-25 | 0 | 29.6K | −29.6K | −$36.5K |
| 2026-11-26 | 0 | 13.8K | −13.8K | −$18.3K |
| 2026-11-27 | 0 | 16.0K | −16.0K | −$20.7K |


---

## Euler (EUL)

**Price:** $0.74    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.74 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.74 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.08 | per-day (100%) | 0.0000% |
| 90d | ⚠ 6/90d partial | 0 | 0 | 🟢 −0 EUL | −$0.35 | per-day (100%) | 0.0000% |

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
| 2026-04-13 | 0 | 9 | −9 | −$8.63 |
| 2026-04-15 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-04-18 | 0 | 52 | −52 | −$82.00 |
| 2026-04-19 | 0 | 62 | −62 | −$82.00 |
| 2026-04-21 | 0 | 244 | −244 | −$317.00 |
| 2026-04-25 | 0 | 552 | −552 | −$795.00 |
| 2026-08-12 | 0 | 1 | −1 | −$1.15 |
| 2026-08-26 | 0 | 0 | −0 | −$0.01 |
| 2026-09-09 | 0 | 0 | −0 | −$0.01 |
| 2026-09-23 | 0 | 0 | −0 | −$0.02 |
| 2026-10-07 | 0 | 0 | −0 | −$0.02 |
| 2026-10-18 | 0 | 0 | −0 | −$0.22 |
| 2026-10-31 | 0 | 0 | −0 | −$0.07 |
| 2026-11-14 | 0 | 0 | −0 | −$0.01 |


---

## Gains Network (GNS)

**Price:** $0.28    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.28 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 52.3K | 🟢 −52.3K GNS | −$14.8K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 116.3K | 🟢 −116.3K GNS | −$36.8K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 289.2K | 🟢 −289.2K GNS | −$114.5K | per-day (100%) | 0.0000% |

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
| 2026-11-09 | 0 | 1.1K | −1.1K | −$536.00 |
| 2026-11-10 | 0 | 2.9K | −2.9K | −$1.2K |
| 2026-11-15 | 0 | 1.6K | −1.6K | −$525.00 |
| 2026-11-16 | 0 | 9.3K | −9.3K | −$3.1K |
| 2026-11-17 | 0 | 4.9K | −4.9K | −$1.6K |
| 2026-11-18 | 0 | 3.1K | −3.1K | −$996.00 |
| 2026-11-19 | 0 | 7.2K | −7.2K | −$2.3K |
| 2026-11-20 | 0 | 6.9K | −6.9K | −$2.2K |
| 2026-11-21 | 0 | 5.7K | −5.7K | −$1.7K |
| 2026-11-22 | 0 | 4.3K | −4.3K | −$1.3K |
| 2026-11-23 | 0 | 6.3K | −6.3K | −$1.9K |
| 2026-11-24 | 0 | 8.3K | −8.3K | −$2.4K |
| 2026-11-25 | 0 | 29.9K | −29.9K | −$8.2K |
| 2026-11-26 | 0 | 3.5K | −3.5K | −$984.00 |


---

## Orca (ORCA)

**Price:** $1.25    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.25 | 0.0000% |
| 7d | 6/7d | 0 | 8.0K | 🟢 −8.0K ORCA | −$9.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 104.0K | 🟢 −104.0K ORCA | −$141.7K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 629.3K | 🟢 −629.3K ORCA | −$985.4K | per-day (100%) | 0.0000% |

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
| 2026-11-14 | 0 | 2.0K | −2.0K | −$2.5K |
| 2026-11-15 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-16 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-11-17 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-18 | 0 | 1.3K | −1.3K | −$1.5K |
| 2026-11-19 | 0 | 2.4K | −2.4K | −$2.7K |
| 2026-11-20 | 0 | 2.0K | −2.0K | −$2.2K |
| 2026-11-21 | 0 | 1.5K | −1.5K | −$1.6K |
| 2026-11-22 | 0 | 899 | −899 | −$1.1K |
| 2026-11-23 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-11-24 | 0 | 1.2K | −1.2K | −$1.4K |
| 2026-11-25 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-11-26 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-11-27 | 0 | 1.3K | −1.3K | −$1.6K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | 6/7d | 0 | 1.28M | 🟢 −1.28M MNDE | −$24.2K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 6.74M | 🟢 −6.74M MNDE | −$143.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 25.00M | 🟢 −25.00M MNDE | −$558.2K | per-day (100%) | 0.0000% |

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
| 2026-11-14 | 0 | 198.2K | −198.2K | −$4.2K |
| 2026-11-15 | 0 | 219.1K | −219.1K | −$4.3K |
| 2026-11-16 | 0 | 207.1K | −207.1K | −$4.1K |
| 2026-11-17 | 0 | 216.9K | −216.9K | −$4.3K |
| 2026-11-18 | 0 | 208.0K | −208.0K | −$4.1K |
| 2026-11-19 | 0 | 209.5K | −209.5K | −$4.1K |
| 2026-11-20 | 0 | 198.5K | −198.5K | −$3.9K |
| 2026-11-21 | 0 | 213.0K | −213.0K | −$4.0K |
| 2026-11-22 | 0 | 213.1K | −213.1K | −$4.0K |
| 2026-11-23 | 0 | 217.2K | −217.2K | −$4.1K |
| 2026-11-24 | 0 | 205.2K | −205.2K | −$4.0K |
| 2026-11-25 | 0 | 215.0K | −215.0K | −$4.0K |
| 2026-11-26 | 0 | 215.5K | −215.5K | −$4.1K |
| 2026-11-27 | 0 | 211.8K | −211.8K | −$4.0K |


---

## ether.fi (ETHFI)

**Price:** $0.44    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.44 | 0.0000% |
| 7d | 6/7d | 0 | 95.2K | 🟢 −95.2K ETHFI | −$44.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 385.0K | 🟢 −385.0K ETHFI | −$206.7K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 970.7K | 🟢 −970.7K ETHFI | −$595.1K | per-day (100%) | 0.0000% |

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
| 2026-11-14 | 0 | 11.8K | −11.8K | −$6.7K |
| 2026-11-15 | 0 | 11.2K | −11.2K | −$5.5K |
| 2026-11-16 | 0 | 13.8K | −13.8K | −$6.8K |
| 2026-11-17 | 0 | 16.9K | −16.9K | −$7.9K |
| 2026-11-18 | 0 | 14.5K | −14.5K | −$7.0K |
| 2026-11-19 | 0 | 13.0K | −13.0K | −$6.3K |
| 2026-11-20 | 0 | 14.6K | −14.6K | −$7.1K |
| 2026-11-21 | 0 | 14.2K | −14.2K | −$6.3K |
| 2026-11-22 | 0 | 11.2K | −11.2K | −$5.3K |
| 2026-11-23 | 0 | 18.4K | −18.4K | −$9.2K |
| 2026-11-24 | 0 | 14.5K | −14.5K | −$7.1K |
| 2026-11-25 | 0 | 15.7K | −15.7K | −$7.3K |
| 2026-11-26 | 0 | 17.0K | −17.0K | −$7.6K |
| 2026-11-27 | 0 | 18.5K | −18.5K | −$8.3K |


---

## CoW Protocol (COW)

**Price:** $0.10    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.10 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 2.05M | 🟢 −2.05M COW | −$190.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 13.90M | 🟢 −13.90M COW | −$1.38M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 27.87M | 🟢 −27.87M COW | −$3.32M | per-day (100%) | 0.0000% |

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
| 2026-11-13 | 0 | 1.17M | −1.17M | −$116.4K |
| 2026-11-14 | 0 | 1.35M | −1.35M | −$134.0K |
| 2026-11-15 | 0 | 792.3K | −792.3K | −$70.3K |
| 2026-11-16 | 0 | 417.5K | −417.5K | −$38.7K |
| 2026-11-17 | 0 | 352.2K | −352.2K | −$32.3K |
| 2026-11-18 | 0 | 231.4K | −231.4K | −$22.1K |
| 2026-11-19 | 0 | 367.5K | −367.5K | −$34.0K |
| 2026-11-20 | 0 | 1.55M | −1.55M | −$143.1K |
| 2026-11-21 | 0 | 843.9K | −843.9K | −$72.9K |
| 2026-11-22 | 0 | 267.4K | −267.4K | −$23.7K |
| 2026-11-23 | 0 | 691.4K | −691.4K | −$61.8K |
| 2026-11-24 | 0 | 194.9K | −194.9K | −$18.3K |
| 2026-11-25 | 0 | 375.2K | −375.2K | −$35.7K |
| 2026-11-26 | 0 | 517.0K | −517.0K | −$50.9K |


---
