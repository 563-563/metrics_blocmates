# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-10-03T22:55:04.436Z
**As-of:** 2026-10-03

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $89.67    **Circulating:** 572.59M HYPE    **AF balance:** 47.66M HYPE    **Total staked:** 437.04M HYPE (76.3% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 7.6K | 🟢 −18.4K HYPE | −$1.65M | today @ $89.67 | -0.0018% |
| 7d | 7/7d | 7.53M | 55.7K | 🔴 +2.25M HYPE | +$201.87M | today @ $89.67 | 0.2251% |
| 30d | 30/30d | 17.45M | 204.0K | 🟢 −2.79M HYPE | −$250.52M | today @ $89.67 | -0.2794% |
| 90d | 90/90d | 52.34M | 443.0K | 🟢 −8.07M HYPE | −$724.01M | today @ $89.67 | -0.8074% |

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
| 2026-09-20 | 0 | 8.3K | −8.3K | −$740.1K |
| 2026-09-21 | 0 | 6.7K | −6.7K | −$599.5K |
| 2026-09-22 | 0 | 12.0K | −12.0K | −$1.07M |
| 2026-09-23 | 0 | 2.4K | −122.3K | −$10.97M |
| 2026-09-24 | 0 | 1.8K | −1.8K | −$157.3K |
| 2026-09-25 | 0 | 12.9K | −157.9K | −$14.16M |
| 2026-09-26 | 0 | 7.0K | −7.0K | −$629.6K |
| 2026-09-27 | 0 | 7.0K | −283.5K | −$25.42M |
| 2026-09-28 | 0 | 2.4K | −2.4K | −$219.5K |
| 2026-09-29 | 7.53M | 5.3K | +2.88M | +$258.03M |
| 2026-09-30 | 0 | 3.6K | −3.6K | −$322.2K |
| 2026-10-01 | 0 | 3.3K | −291.9K | −$26.18M |
| 2026-10-02 | 0 | 26.5K | −26.5K | −$2.37M |
| 2026-10-03 | 0 | 7.6K | −18.4K | −$1.65M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-06 | 9.92M | $889.23M |
| 2026-10-29 | 7.53M | $675.33M |
| 2026-11-06 | 9.92M | $889.23M |
| 2026-11-29 | 7.53M | $675.33M |
| 2026-12-06 | 9.92M | $889.23M |
| 2026-12-29 | 7.53M | $675.33M |
| 2027-01-06 | 9.92M | $889.23M |
| 2027-01-29 | 7.53M | $675.33M |


---

## Aave (AAVE)

**Price:** $180.29    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $180.29 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −39.1K AAVE | −$7.05M | today @ $180.29 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −39.1K AAVE | −$7.05M | today @ $180.29 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −282.2K AAVE | −$50.88M | today @ $180.29 | 0.0000% |

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
| 2026-08-14 | 0 | 0 | 0 | $0 |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$206.8K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$23.6K |
| 2026-08-20 | 0 | 0 | −2.0K | −$367.2K |
| 2026-08-21 | 0 | 0 | −499 | −$90.0K |
| 2026-08-22 | 0 | 0 | −387 | −$69.8K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$106.8K |
| 2026-08-25 | 0 | 0 | −1.5K | −$273.1K |
| 2026-08-26 | 0 | 0 | −3.9K | −$696.3K |
| 2026-09-29 | 0 | 0 | −39.1K | −$7.05M |


---

## Sky (SKY)

**Price:** $0.09    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −55.20M SKY | −$4.98M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −55.20M SKY | −$4.98M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −183.63M SKY | −$16.56M | today @ $0.09 | 0.0000% |

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
| 2026-08-14 | 0 | 0 | −539.8K | −$48.7K |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | −254.9K | −$23.0K |
| 2026-08-17 | 0 | 0 | −1.72M | −$155.4K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.51M |
| 2026-08-19 | 0 | 0 | −10.18M | −$917.9K |
| 2026-08-20 | 0 | 0 | −4.64M | −$418.7K |
| 2026-08-21 | 0 | 0 | −4.01M | −$362.0K |
| 2026-08-22 | 0 | 0 | −2.79M | −$251.4K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$897.4K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$130.9K |
| 2026-09-29 | 0 | 0 | −55.20M | −$4.98M |


---

## Lighter (LIT)

**Price:** $3.59    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.59 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 10.0K | 🟢 −10.0K LIT | −$48.7K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 437.0K | 🟢 −437.0K LIT | −$2.03M | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 2.24M | 🟢 −2.24M LIT | −$6.81M | per-day (100%) | 0.0000% |

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
| 2026-09-14 | 0 | 23.7K | −23.7K | −$97.6K |
| 2026-09-15 | 0 | 28.2K | −28.2K | −$123.7K |
| 2026-09-16 | 0 | 23.1K | −23.1K | −$92.7K |
| 2026-09-17 | 0 | 19.5K | −19.5K | −$89.7K |
| 2026-09-18 | 0 | 23.3K | −23.3K | −$112.3K |
| 2026-09-19 | 0 | 19.6K | −19.6K | −$93.5K |
| 2026-09-20 | 0 | 10.3K | −10.3K | −$49.5K |
| 2026-09-21 | 0 | 25.6K | −25.6K | −$122.2K |
| 2026-09-22 | 0 | 19.7K | −19.7K | −$93.3K |
| 2026-09-23 | 0 | 28.1K | −28.1K | −$142.5K |
| 2026-09-24 | 0 | 21.2K | −21.2K | −$112.7K |
| 2026-09-25 | 0 | 15.0K | −15.0K | −$76.2K |
| 2026-09-26 | 0 | 11.6K | −11.6K | −$56.1K |
| 2026-09-27 | 0 | 10.0K | −10.0K | −$48.7K |


---

## Morpho (MORPHO)

**Price:** $2.78    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$270.7K | today @ $2.78 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.89M | today @ $2.78 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$8.12M | today @ $2.78 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$24.36M | today @ $2.78 | 0.0000% |

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
| 2026-09-20 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-21 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-22 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-23 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-24 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-25 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-26 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-27 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-28 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-29 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-09-30 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-10-01 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-10-02 | 202.7K | 0 | +97.4K | +$270.7K |
| 2026-10-03 | 202.7K | 0 | +97.4K | +$270.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 202.7K | $563.5K |
| 2026-10-05 | 202.7K | $563.5K |
| 2026-10-06 | 202.7K | $563.5K |
| 2026-10-07 | 202.7K | $563.5K |
| 2026-10-08 | 202.7K | $563.5K |
| 2026-10-09 | 202.7K | $563.5K |
| 2026-10-10 | 202.7K | $563.5K |
| 2026-10-11 | 202.7K | $563.5K |


---

## Pendle (PENDLE)

**Price:** $2.40    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.40 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.40 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.40 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.40 | 0.0000% |

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

**Price:** $0.57    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$121.7K | today @ $0.57 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$852.0K | today @ $0.57 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.65M | today @ $0.57 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$10.95M | today @ $0.57 | 0.0000% |

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
| 2026-09-20 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-21 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-22 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-23 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-24 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-25 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-26 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-27 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-28 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-29 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-09-30 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-10-01 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-10-02 | 626.2K | 0 | +214.3K | +$121.7K |
| 2026-10-03 | 626.2K | 0 | +214.3K | +$121.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 626.2K | $355.7K |
| 2026-10-05 | 626.2K | $355.7K |
| 2026-10-06 | 626.2K | $355.7K |
| 2026-10-07 | 626.2K | $355.7K |
| 2026-10-08 | 626.2K | $355.7K |
| 2026-10-09 | 626.2K | $355.7K |
| 2026-10-10 | 626.2K | $355.7K |
| 2026-10-11 | 626.2K | $355.7K |


---

## Jupiter (JUP)

**Price:** $0.33    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.33 | 0.0000% |
| 7d | ⚠ 1/7d partial | 53.47M | 290.4K | 🔴 +15.26M JUP | +$5.17M | per-day (100%) | 0.0000% |
| 30d | 24/30d | 53.47M | 10.35M | 🔴 +5.20M JUP | +$2.63M | per-day (100%) | 0.0000% |
| 90d | 84/90d | 160.41M | 35.62M | 🔴 +11.03M JUP | +$4.00M | per-day (100%) | 0.0000% |

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
| 2026-09-14 | 0 | 375.5K | −375.5K | −$86.6K |
| 2026-09-15 | 0 | 548.8K | −548.8K | −$131.0K |
| 2026-09-16 | 0 | 373.5K | −373.5K | −$80.7K |
| 2026-09-17 | 0 | 346.2K | −346.2K | −$75.8K |
| 2026-09-18 | 0 | 534.9K | −534.9K | −$127.1K |
| 2026-09-19 | 0 | 400.9K | −400.9K | −$106.4K |
| 2026-09-20 | 0 | 313.4K | −313.4K | −$88.3K |
| 2026-09-21 | 0 | 448.6K | −448.6K | −$134.1K |
| 2026-09-22 | 0 | 391.6K | −391.6K | −$116.7K |
| 2026-09-23 | 0 | 376.5K | −376.5K | −$113.6K |
| 2026-09-24 | 0 | 344.7K | −344.7K | −$100.2K |
| 2026-09-25 | 0 | 373.3K | −373.3K | −$112.6K |
| 2026-09-26 | 0 | 293.3K | −293.3K | −$100.1K |
| 2026-09-27 | 53.47M | 290.4K | +15.26M | +$5.17M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-27 | 53.47M | $17.57M |
| 2026-11-27 | 53.47M | $17.57M |
| 2026-12-27 | 53.47M | $17.57M |
| 2027-01-27 | 53.47M | $17.57M |
| 2027-02-27 | 53.47M | $17.57M |
| 2027-03-27 | 53.47M | $17.57M |
| 2027-04-27 | 53.47M | $17.57M |
| 2027-05-27 | 53.47M | $17.57M |


---

## Fluid (FLUID)

**Price:** $1.69    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$4.6K | today @ $1.69 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$32.4K | today @ $1.69 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$392.4K | today @ $1.69 | 0.0000% |
| 90d | ⚠ 0/90d partial | 1.82M | 0 | 🔴 +546.6K FLUID | +$923.7K | today @ $1.69 | 0.0000% |

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
| 2026-09-20 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-21 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-22 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-23 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-24 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-25 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-26 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-27 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-28 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-29 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-09-30 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-10-01 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-10-02 | 9.1K | 0 | +2.7K | +$4.6K |
| 2026-10-03 | 9.1K | 0 | +2.7K | +$4.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 9.1K | $15.4K |
| 2026-10-05 | 509.1K | $860.4K |
| 2026-10-06 | 9.1K | $15.4K |
| 2026-10-07 | 9.1K | $15.4K |
| 2026-10-08 | 9.1K | $15.4K |
| 2026-10-09 | 9.1K | $15.4K |
| 2026-10-10 | 9.1K | $15.4K |
| 2026-10-11 | 9.1K | $15.4K |


---

## Collector Crypt (CARDS)

**Price:** $0.27    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.27 | 0.0000% |
| 7d | ⚠ 2/7d partial | 44.67M | 2.53M | 🔴 +9.41M CARDS | +$2.74M | per-day (67%) | 0.0000% |
| 30d | 25/30d | 44.67M | 56.93M | 🟢 −44.99M CARDS | −$5.27M | per-day (96%) | 0.0000% |
| 90d | 85/90d | 103.60M | 176.65M | 🟢 −141.39M CARDS | −$20.15M | per-day (99%) | 0.0000% |

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
| 2026-09-16 | 0 | 2.05M | −2.05M | −$255.7K |
| 2026-09-17 | 0 | 1.99M | −1.99M | −$246.9K |
| 2026-09-18 | 0 | 613.3K | −613.3K | −$82.1K |
| 2026-09-19 | 0 | 2.68M | −2.68M | −$462.6K |
| 2026-09-20 | 0 | 2.72M | −2.72M | −$469.1K |
| 2026-09-21 | 0 | 3.29M | −3.29M | −$558.5K |
| 2026-09-22 | 0 | 2.05M | −2.05M | −$395.4K |
| 2026-09-23 | 0 | 2.01M | −2.01M | −$354.0K |
| 2026-09-24 | 0 | 2.06M | −2.06M | −$356.0K |
| 2026-09-25 | 0 | 3.08M | −3.08M | −$480.0K |
| 2026-09-26 | 0 | 2.01M | −2.01M | −$378.3K |
| 2026-09-27 | 0 | 1.67M | −1.67M | −$311.2K |
| 2026-09-28 | 0 | 859.6K | −859.6K | −$168.5K |
| 2026-10-01 | 44.67M | 0 | +11.94M | +$3.22M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 44.67M | $12.05M |
| 2026-12-01 | 44.67M | $12.05M |
| 2027-01-01 | 44.67M | $12.05M |
| 2027-02-01 | 44.67M | $12.05M |
| 2027-03-01 | 44.67M | $12.05M |
| 2027-04-01 | 44.67M | $12.05M |
| 2027-05-01 | 44.67M | $12.05M |
| 2027-06-01 | 44.67M | $12.05M |


---

## pump.fun (PUMP)

**Price:** $0.01    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$1.01M | today @ $0.01 | 0.0000% |
| 7d | ⚠ 1/7d partial | 2.52B | 283.25M | 🔴 +838.91M PUMP | +$5.53M | per-day (14%) | 0.0000% |
| 30d | 24/30d | 20.80B | 4.46B | 🔴 +3.34B PUMP | +$14.35M | per-day (80%) | 0.0000% |
| 90d | 84/90d | 62.39B | 21.06B | 🔴 +2.36B PUMP | +$9.77M | per-day (93%) | 0.0000% |

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
| 2026-09-20 | 359.91M | 178.87M | −18.56M | −$79.0K |
| 2026-09-21 | 359.91M | 209.81M | −49.51M | −$209.2K |
| 2026-09-22 | 359.91M | 192.50M | −32.19M | −$140.8K |
| 2026-09-23 | 359.91M | 169.92M | −9.61M | −$43.0K |
| 2026-09-24 | 359.91M | 202.83M | −42.52M | −$170.2K |
| 2026-09-25 | 359.91M | 225.74M | −65.43M | −$251.9K |
| 2026-09-26 | 359.91M | 335.15M | −174.84M | −$733.0K |
| 2026-09-27 | 359.91M | 283.25M | −122.94M | −$539.9K |
| 2026-09-28 | 359.91M | 0 | +160.31M | +$1.01M |
| 2026-09-29 | 359.91M | 0 | +160.31M | +$1.01M |
| 2026-09-30 | 359.91M | 0 | +160.31M | +$1.01M |
| 2026-10-01 | 359.91M | 0 | +160.31M | +$1.01M |
| 2026-10-02 | 359.91M | 0 | +160.31M | +$1.01M |
| 2026-10-03 | 359.91M | 0 | +160.31M | +$1.01M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 359.91M | $2.27M |
| 2026-10-05 | 359.91M | $2.27M |
| 2026-10-06 | 359.91M | $2.27M |
| 2026-10-07 | 359.91M | $2.27M |
| 2026-10-08 | 359.91M | $2.27M |
| 2026-10-09 | 359.91M | $2.27M |
| 2026-10-10 | 359.91M | $2.27M |
| 2026-10-11 | 359.91M | $2.27M |


---

## LayerZero (ZRO)

**Price:** $2.02    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $2.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $2.02 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 169.3K | 🔴 +11.29M ZRO | +$22.96M | per-day (50%) | 0.0000% |
| 90d | ⚠ 3/90d partial | 70.89M | 483.4K | 🔴 +33.91M ZRO | +$69.01M | per-day (50%) | 0.0000% |

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
| 2026-03-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$23.16M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$23.16M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-20 | 23.63M | $47.73M |
| 2026-11-20 | 23.63M | $47.73M |
| 2026-12-20 | 23.63M | $47.73M |
| 2027-01-20 | 23.63M | $47.73M |
| 2027-02-20 | 23.63M | $47.73M |
| 2027-03-20 | 23.63M | $47.73M |
| 2027-04-20 | 23.63M | $47.73M |
| 2027-05-20 | 23.63M | $47.73M |


---

## Ethena (ENA)

**Price:** $0.24    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$979.9K | today @ $0.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$6.86M | today @ $0.24 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$29.40M | today @ $0.24 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$88.19M | today @ $0.24 | 0.0000% |

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
| 2026-09-20 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-21 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-22 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-23 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-24 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-25 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-26 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-27 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-28 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-29 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-09-30 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-10-01 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-10-02 | 10.75M | 0 | +4.11M | +$979.9K |
| 2026-10-03 | 10.75M | 0 | +4.11M | +$979.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 10.75M | $2.56M |
| 2026-10-05 | 10.75M | $2.56M |
| 2026-10-06 | 10.75M | $2.56M |
| 2026-10-07 | 10.75M | $2.56M |
| 2026-10-08 | 10.75M | $2.56M |
| 2026-10-09 | 10.75M | $2.56M |
| 2026-10-10 | 10.75M | $2.56M |
| 2026-10-11 | 10.75M | $2.56M |


---

## Aerodrome (AERO)

**Price:** $0.84    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.84 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.84 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.84 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.84 | 0.0000% |

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

**Price:** $0.15    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.15 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 98.1K | 🟢 −98.1K DYDX | −$14.0K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 1.65M | 🟢 −1.65M DYDX | −$205.1K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 10.61M | 6.31M | 🟢 −2.00M DYDX | −$242.7K | per-day (100%) | 0.0000% |

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
| 2026-09-14 | 0 | 68.9K | −68.9K | −$7.7K |
| 2026-09-15 | 0 | 91.6K | −91.6K | −$10.4K |
| 2026-09-16 | 0 | 31.4K | −31.4K | −$3.3K |
| 2026-09-17 | 0 | 60.1K | −60.1K | −$6.4K |
| 2026-09-18 | 0 | 164.3K | −164.3K | −$18.9K |
| 2026-09-19 | 0 | 37.7K | −37.7K | −$4.8K |
| 2026-09-20 | 0 | 53.0K | −53.0K | −$7.0K |
| 2026-09-21 | 0 | 172.7K | −172.7K | −$22.4K |
| 2026-09-22 | 0 | 86.4K | −86.4K | −$12.0K |
| 2026-09-23 | 0 | 88.4K | −88.4K | −$12.4K |
| 2026-09-24 | 0 | 141.7K | −141.7K | −$18.0K |
| 2026-09-25 | 0 | 84.2K | −84.2K | −$11.2K |
| 2026-09-26 | 0 | 29.6K | −29.6K | −$4.0K |
| 2026-09-27 | 0 | 98.1K | −98.1K | −$14.0K |


---

## Meteora (MET)

**Price:** $0.30    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$33.2K | today @ $0.30 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$232.1K | today @ $0.30 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$994.9K | today @ $0.30 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.98M | today @ $0.30 | 0.0000% |

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
| 2026-09-20 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-21 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-22 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-23 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-24 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-25 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-26 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-27 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-28 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-29 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-09-30 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-10-01 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-10-02 | 291.3K | 0 | +110.1K | +$33.2K |
| 2026-10-03 | 291.3K | 0 | +110.1K | +$33.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 291.3K | $87.7K |
| 2026-10-05 | 291.3K | $87.7K |
| 2026-10-06 | 291.3K | $87.7K |
| 2026-10-07 | 291.3K | $87.7K |
| 2026-10-08 | 291.3K | $87.7K |
| 2026-10-09 | 291.3K | $87.7K |
| 2026-10-10 | 291.3K | $87.7K |
| 2026-10-11 | 291.3K | $87.7K |


---

## Sanctum (CLOUD)

**Price:** $0.07    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$7.9K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$55.0K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$235.8K | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$707.3K | today @ $0.07 | 0.0000% |

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
| 2026-09-20 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-21 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-22 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-23 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-24 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-25 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-26 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-27 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-28 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-29 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-30 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-01 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-02 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-03 | 347.8K | 0 | +118.1K | +$7.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 347.8K | $23.2K |
| 2026-10-05 | 347.8K | $23.2K |
| 2026-10-06 | 347.8K | $23.2K |
| 2026-10-07 | 347.8K | $23.2K |
| 2026-10-08 | 347.8K | $23.2K |
| 2026-10-09 | 347.8K | $23.2K |
| 2026-10-10 | 347.8K | $23.2K |
| 2026-10-11 | 347.8K | $23.2K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$6.1K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$42.6K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$182.6K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$547.7K | today @ $0.02 | 0.0000% |

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
| 2026-09-20 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-21 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-22 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-23 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-24 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-25 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-26 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-27 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-28 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-29 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-09-30 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-10-01 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-10-02 | 644.2K | 0 | +302.8K | +$6.1K |
| 2026-10-03 | 644.2K | 0 | +302.8K | +$6.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-04 | 644.2K | $12.9K |
| 2026-10-05 | 644.2K | $12.9K |
| 2026-10-06 | 644.2K | $12.9K |
| 2026-10-07 | 644.2K | $12.9K |
| 2026-10-08 | 644.2K | $12.9K |
| 2026-10-09 | 644.2K | $12.9K |
| 2026-10-10 | 644.2K | $12.9K |
| 2026-10-11 | 644.2K | $12.9K |


---

## Uniswap (UNI)

**Price:** $9.04    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $9.04 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 69.0K | 🟢 −69.0K UNI | −$668.7K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 1.82M | 🟢 −1.82M UNI | −$12.97M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 5.48M | 🟢 −5.48M UNI | −$27.88M | per-day (100%) | 0.0000% |

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
| 2026-09-15 | 0 | 68.2K | −68.2K | −$445.5K |
| 2026-09-16 | 0 | 77.8K | −77.8K | −$495.4K |
| 2026-09-17 | 0 | 81.5K | −81.5K | −$545.4K |
| 2026-09-18 | 0 | 59.1K | −59.1K | −$460.8K |
| 2026-09-19 | 0 | 31.3K | −31.3K | −$277.3K |
| 2026-09-20 | 0 | 28.2K | −28.2K | −$244.4K |
| 2026-09-21 | 0 | 74.0K | −74.0K | −$646.3K |
| 2026-09-22 | 0 | 50.1K | −50.1K | −$450.8K |
| 2026-09-23 | 0 | 50.8K | −50.8K | −$518.7K |
| 2026-09-24 | 0 | 45.6K | −45.6K | −$421.5K |
| 2026-09-25 | 0 | 43.3K | −43.3K | −$396.1K |
| 2026-09-26 | 0 | 20.2K | −20.2K | −$194.1K |
| 2026-09-27 | 0 | 26.3K | −26.3K | −$254.7K |
| 2026-09-28 | 0 | 42.8K | −42.8K | −$413.9K |


---

## Raydium (RAY)

**Price:** $2.09    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $2.09 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 78.7K | 🟢 −78.7K RAY | −$167.3K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 2.97M | 🟢 −2.97M RAY | −$4.24M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 5.31M | 🟢 −5.31M RAY | −$5.84M | per-day (100%) | 0.0000% |

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
| 2026-09-15 | 0 | 93.8K | −93.8K | −$130.8K |
| 2026-09-16 | 0 | 135.2K | −135.2K | −$166.5K |
| 2026-09-17 | 0 | 96.9K | −96.9K | −$134.8K |
| 2026-09-18 | 0 | 143.3K | −143.3K | −$210.8K |
| 2026-09-19 | 0 | 87.8K | −87.8K | −$154.5K |
| 2026-09-20 | 0 | 81.6K | −81.6K | −$139.1K |
| 2026-09-21 | 0 | 165.1K | −165.1K | −$280.2K |
| 2026-09-22 | 0 | 137.8K | −137.8K | −$248.2K |
| 2026-09-23 | 0 | 92.5K | −92.5K | −$168.8K |
| 2026-09-24 | 0 | 91.9K | −91.9K | −$181.8K |
| 2026-09-25 | 0 | 76.9K | −76.9K | −$161.8K |
| 2026-09-26 | 0 | 41.3K | −41.3K | −$85.5K |
| 2026-09-27 | 0 | 32.6K | −32.6K | −$67.1K |
| 2026-09-28 | 0 | 46.1K | −46.1K | −$100.3K |


---

## Euler (EUL)

**Price:** $1.43    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.43 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.43 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.03 | per-day (100%) | 0.0000% |
| 90d | ⚠ 3/90d partial | 0 | 1 | 🟢 −1 EUL | −$1.22 | per-day (100%) | 0.0000% |

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
| 2026-08-12 | 0 | 1 | −1 | −$1.19 |
| 2026-09-09 | 0 | 0 | −0 | −$0.01 |
| 2026-09-23 | 0 | 0 | −0 | −$0.02 |


---

## Gains Network (GNS)

**Price:** $0.42    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.42 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 5.0K | 🟢 −5.0K GNS | −$2.4K | per-day (100%) | 0.0000% |
| 30d | ⚠ 23/30d partial | 0 | 63.6K | 🟢 −63.6K GNS | −$29.0K | per-day (100%) | 0.0000% |
| 90d | 83/90d | 0 | 355.6K | 🟢 −355.6K GNS | −$186.8K | per-day (100%) | 0.0000% |

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
| 2026-09-13 | 0 | 2.0K | −2.0K | −$849.00 |
| 2026-09-14 | 0 | 3.2K | −3.2K | −$1.4K |
| 2026-09-16 | 0 | 2.9K | −2.9K | −$1.2K |
| 2026-09-17 | 0 | 2.4K | −2.4K | −$967.00 |
| 2026-09-18 | 0 | 3.0K | −3.0K | −$1.2K |
| 2026-09-19 | 0 | 2.4K | −2.4K | −$1.0K |
| 2026-09-20 | 0 | 2.0K | −2.0K | −$861.00 |
| 2026-09-21 | 0 | 11.0K | −11.0K | −$4.9K |
| 2026-09-22 | 0 | 1.3K | −1.3K | −$564.00 |
| 2026-09-23 | 0 | 1.2K | −1.2K | −$563.00 |
| 2026-09-24 | 0 | 1.1K | −1.1K | −$517.00 |
| 2026-09-25 | 0 | 2.6K | −2.6K | −$1.2K |
| 2026-09-26 | 0 | 2.7K | −2.7K | −$1.3K |
| 2026-09-27 | 0 | 5.0K | −5.0K | −$2.4K |


---

## Orca (ORCA)

**Price:** $1.80    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.80 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 20.3K | 🟢 −20.3K ORCA | −$35.3K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 309.1K | 🟢 −309.1K ORCA | −$446.8K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 529.2K | 🟢 −529.2K ORCA | −$710.8K | per-day (100%) | 0.0000% |

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
| 2026-09-15 | 0 | 8.5K | −8.5K | −$11.5K |
| 2026-09-16 | 0 | 8.9K | −8.9K | −$11.7K |
| 2026-09-17 | 0 | 9.0K | −9.0K | −$11.8K |
| 2026-09-18 | 0 | 13.7K | −13.7K | −$19.1K |
| 2026-09-19 | 0 | 13.4K | −13.4K | −$19.8K |
| 2026-09-20 | 0 | 9.0K | −9.0K | −$13.0K |
| 2026-09-21 | 0 | 22.7K | −22.7K | −$32.7K |
| 2026-09-22 | 0 | 13.1K | −13.1K | −$19.8K |
| 2026-09-23 | 0 | 13.6K | −13.6K | −$20.9K |
| 2026-09-24 | 0 | 10.5K | −10.5K | −$16.1K |
| 2026-09-25 | 0 | 10.9K | −10.9K | −$17.2K |
| 2026-09-26 | 0 | 6.1K | −6.1K | −$10.3K |
| 2026-09-27 | 0 | 9.6K | −9.6K | −$15.7K |
| 2026-09-28 | 0 | 10.8K | −10.8K | −$19.6K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 571.4K | 🟢 −571.4K MNDE | −$15.9K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 8.62M | 🟢 −8.62M MNDE | −$171.9K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 21.00M | 🟢 −21.00M MNDE | −$408.2K | per-day (100%) | 0.0000% |

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
| 2026-09-15 | 0 | 333.5K | −333.5K | −$6.3K |
| 2026-09-16 | 0 | 349.9K | −349.9K | −$6.3K |
| 2026-09-17 | 0 | 354.6K | −354.6K | −$6.6K |
| 2026-09-18 | 0 | 392.1K | −392.1K | −$7.4K |
| 2026-09-19 | 0 | 386.4K | −386.4K | −$7.3K |
| 2026-09-20 | 0 | 388.7K | −388.7K | −$7.0K |
| 2026-09-21 | 0 | 424.0K | −424.0K | −$7.9K |
| 2026-09-22 | 0 | 408.6K | −408.6K | −$7.9K |
| 2026-09-23 | 0 | 403.1K | −403.1K | −$7.7K |
| 2026-09-24 | 0 | 364.8K | −364.8K | −$7.5K |
| 2026-09-25 | 0 | 397.2K | −397.2K | −$8.1K |
| 2026-09-26 | 0 | 358.7K | −358.7K | −$7.9K |
| 2026-09-27 | 0 | 286.7K | −286.7K | −$8.1K |
| 2026-09-28 | 0 | 284.7K | −284.7K | −$7.8K |


---

## ether.fi (ETHFI)

**Price:** $0.73    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.73 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 14.3K | 🟢 −14.3K ETHFI | −$10.3K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 236.7K | 🟢 −236.7K ETHFI | −$153.1K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 968.1K | 🟢 −968.1K ETHFI | −$479.7K | per-day (100%) | 0.0000% |

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
| 2026-09-15 | 0 | 9.5K | −9.5K | −$6.0K |
| 2026-09-16 | 0 | 9.8K | −9.8K | −$5.8K |
| 2026-09-17 | 0 | 10.7K | −10.7K | −$6.3K |
| 2026-09-18 | 0 | 11.0K | −11.0K | −$6.9K |
| 2026-09-19 | 0 | 8.2K | −8.2K | −$5.9K |
| 2026-09-20 | 0 | 7.9K | −7.9K | −$5.9K |
| 2026-09-21 | 0 | 9.3K | −9.3K | −$6.7K |
| 2026-09-22 | 0 | 8.2K | −8.2K | −$5.9K |
| 2026-09-23 | 0 | 8.6K | −8.6K | −$6.1K |
| 2026-09-24 | 0 | 9.7K | −9.7K | −$6.3K |
| 2026-09-25 | 0 | 9.4K | −9.4K | −$6.4K |
| 2026-09-26 | 0 | 8.1K | −8.1K | −$5.8K |
| 2026-09-27 | 0 | 6.5K | −6.5K | −$4.8K |
| 2026-09-28 | 0 | 7.7K | −7.7K | −$5.6K |


---

## CoW Protocol (COW)

**Price:** $0.16    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.16 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 97.2K | 🟢 −97.2K COW | −$16.1K | per-day (100%) | 0.0000% |
| 30d | ⚠ 23/30d partial | 0 | 5.62M | 🟢 −5.62M COW | −$788.8K | per-day (100%) | 0.0000% |
| 90d | 78/90d | 0 | 16.96M | 🟢 −16.96M COW | −$2.17M | per-day (100%) | 0.0000% |

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
| 2026-09-13 | 0 | 76.1K | −76.1K | −$10.6K |
| 2026-09-14 | 0 | 208.2K | −208.2K | −$28.4K |
| 2026-09-15 | 0 | 520.7K | −520.7K | −$70.3K |
| 2026-09-16 | 0 | 274.2K | −274.2K | −$35.8K |
| 2026-09-17 | 0 | 242.9K | −242.9K | −$32.0K |
| 2026-09-18 | 0 | 336.7K | −336.7K | −$45.2K |
| 2026-09-20 | 0 | 121.0K | −121.0K | −$19.2K |
| 2026-09-21 | 0 | 685.7K | −685.7K | −$108.8K |
| 2026-09-22 | 0 | 368.0K | −368.0K | −$58.4K |
| 2026-09-23 | 0 | 208.6K | −208.6K | −$32.6K |
| 2026-09-24 | 0 | 197.6K | −197.6K | −$27.9K |
| 2026-09-25 | 0 | 193.7K | −193.7K | −$27.9K |
| 2026-09-26 | 0 | 100.0K | −100.0K | −$15.2K |
| 2026-09-27 | 0 | 97.2K | −97.2K | −$16.1K |


---
