# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-09-05T11:51:45.198Z
**As-of:** 2026-09-05

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $84.96    **Circulating:** 555.14M HYPE    **AF balance:** 47.02M HYPE    **Total staked:** 438.87M HYPE (79.1% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 3.7K | 🟢 −183.9K HYPE | −$15.63M | today @ $84.96 | -0.0184% |
| 7d | 7/7d | 0 | 87.8K | 🟢 −2.79M HYPE | −$236.80M | today @ $84.96 | -0.2787% |
| 30d | 30/30d | 7.53M | 224.1K | 🟢 −1.40M HYPE | −$119.09M | today @ $84.96 | -0.1402% |
| 90d | 90/90d | 42.43M | 404.1K | 🟢 −9.61M HYPE | −$816.24M | today @ $84.96 | -0.9607% |

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
| 2026-08-23 | 0 | 2.2K | −2.2K | −$190.6K |
| 2026-08-24 | 0 | 7.4K | −7.4K | −$627.7K |
| 2026-08-25 | 0 | 8.9K | −8.9K | −$756.0K |
| 2026-08-26 | 0 | 16.0K | −310.0K | −$26.33M |
| 2026-08-27 | 0 | 953 | −186.9K | −$15.88M |
| 2026-08-28 | 0 | 5.8K | −64.3K | −$5.46M |
| 2026-08-29 | 7.53M | 7.7K | +3.00M | +$255.29M |
| 2026-08-30 | 0 | 1.8K | −1.8K | −$149.0K |
| 2026-08-31 | 0 | 1.3K | −273.0K | −$23.19M |
| 2026-09-01 | 0 | 12.7K | −977.8K | −$83.07M |
| 2026-09-02 | 0 | 13.0K | −798.0K | −$67.80M |
| 2026-09-03 | 0 | 29.9K | −328.9K | −$27.94M |
| 2026-09-04 | 0 | 25.5K | −223.8K | −$19.01M |
| 2026-09-05 | 0 | 3.7K | −183.9K | −$15.63M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 9.92M | $842.52M |
| 2026-09-29 | 7.53M | $639.86M |
| 2026-10-06 | 9.92M | $842.52M |
| 2026-10-29 | 7.53M | $639.86M |
| 2026-11-06 | 9.92M | $842.52M |
| 2026-11-29 | 7.53M | $639.86M |
| 2026-12-06 | 9.92M | $842.52M |
| 2026-12-29 | 7.53M | $639.86M |


---

## Aave (AAVE)

**Price:** $129.85    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $129.85 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AAVE | $0 | today @ $129.85 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −12.2K AAVE | −$1.59M | today @ $129.85 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −246.2K AAVE | −$31.97M | today @ $129.85 | 0.0000% |

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
| 2026-08-13 | 0 | 0 | 0 | $0 |
| 2026-08-14 | 0 | 0 | 0 | $0 |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$149.0K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$17.0K |
| 2026-08-20 | 0 | 0 | −2.0K | −$264.5K |
| 2026-08-21 | 0 | 0 | −499 | −$64.8K |
| 2026-08-22 | 0 | 0 | −387 | −$50.3K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$77.0K |
| 2026-08-25 | 0 | 0 | −1.5K | −$196.7K |
| 2026-08-26 | 0 | 0 | −3.9K | −$501.5K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −68.58M SKY | −$4.60M | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −132.39M SKY | −$8.88M | today @ $0.07 | 0.0000% |

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
| 2026-08-13 | 0 | 0 | −291.2K | −$19.5K |
| 2026-08-14 | 0 | 0 | −539.8K | −$36.2K |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | −254.9K | −$17.1K |
| 2026-08-17 | 0 | 0 | −1.72M | −$115.5K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.12M |
| 2026-08-19 | 0 | 0 | −10.18M | −$682.3K |
| 2026-08-20 | 0 | 0 | −4.64M | −$311.2K |
| 2026-08-21 | 0 | 0 | −4.01M | −$269.1K |
| 2026-08-22 | 0 | 0 | −2.79M | −$186.9K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$667.1K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$97.3K |


---

## Lighter (LIT)

**Price:** $4.63    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $4.63 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 LIT | $0 | today @ $4.63 | 0.0000% |
| 30d | ⚠ 18/30d partial | 0 | 491.0K | 🟢 −491.0K LIT | −$1.29M | per-day (100%) | 0.0000% |
| 90d | 78/90d | 0 | 2.71M | 🟢 −2.71M LIT | −$5.54M | per-day (100%) | 0.0000% |

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
| 2026-08-11 | 0 | 21.9K | −21.9K | −$52.1K |
| 2026-08-12 | 0 | 23.4K | −23.4K | −$56.6K |
| 2026-08-13 | 0 | 24.7K | −24.7K | −$57.7K |
| 2026-08-14 | 0 | 17.1K | −17.1K | −$38.9K |
| 2026-08-15 | 0 | 11.0K | −11.0K | −$24.7K |
| 2026-08-16 | 0 | 10.9K | −10.9K | −$24.7K |
| 2026-08-17 | 0 | 15.3K | −15.3K | −$34.8K |
| 2026-08-18 | 0 | 14.4K | −14.4K | −$33.5K |
| 2026-08-19 | 0 | 51.9K | −51.9K | −$122.3K |
| 2026-08-20 | 0 | 59.7K | −59.7K | −$155.2K |
| 2026-08-21 | 0 | 64.1K | −64.1K | −$171.2K |
| 2026-08-22 | 0 | 51.0K | −51.0K | −$159.8K |
| 2026-08-23 | 0 | 23.1K | −23.1K | −$73.9K |
| 2026-08-24 | 0 | 37.8K | −37.8K | −$133.1K |


---

## Morpho (MORPHO)

**Price:** $2.53    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$246.3K | today @ $2.53 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.72M | today @ $2.53 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$7.39M | today @ $2.53 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$22.17M | today @ $2.53 | 0.0000% |

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
| 2026-08-23 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-24 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-25 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-26 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-27 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-28 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-29 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-30 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-08-31 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-09-01 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-09-02 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-09-03 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-09-04 | 202.7K | 0 | +97.4K | +$246.3K |
| 2026-09-05 | 202.7K | 0 | +97.4K | +$246.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 202.7K | $512.8K |
| 2026-09-07 | 202.7K | $512.8K |
| 2026-09-08 | 202.7K | $512.8K |
| 2026-09-09 | 202.7K | $512.8K |
| 2026-09-10 | 202.7K | $512.8K |
| 2026-09-11 | 202.7K | $512.8K |
| 2026-09-12 | 202.7K | $512.8K |
| 2026-09-13 | 202.7K | $512.8K |


---

## Pendle (PENDLE)

**Price:** $1.92    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.92 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.92 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.92 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.92 | 0.0000% |

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

**Price:** $0.42    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$89.9K | today @ $0.42 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$629.6K | today @ $0.42 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$2.70M | today @ $0.42 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$8.09M | today @ $0.42 | 0.0000% |

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
| 2026-08-23 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-24 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-25 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-26 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-27 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-28 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-29 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-30 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-08-31 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-09-01 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-09-02 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-09-03 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-09-04 | 626.2K | 0 | +214.3K | +$89.9K |
| 2026-09-05 | 626.2K | 0 | +214.3K | +$89.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 626.2K | $262.8K |
| 2026-09-07 | 626.2K | $262.8K |
| 2026-09-08 | 626.2K | $262.8K |
| 2026-09-09 | 626.2K | $262.8K |
| 2026-09-10 | 626.2K | $262.8K |
| 2026-09-11 | 626.2K | $262.8K |
| 2026-09-12 | 626.2K | $262.8K |
| 2026-09-13 | 626.2K | $262.8K |


---

## Jupiter (JUP)

**Price:** $0.23    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.23 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.23 | 0.0000% |
| 30d | ⚠ 19/30d partial | 53.47M | 9.38M | 🔴 +6.18M JUP | +$1.77M | per-day (95%) | 0.0000% |
| 90d | 79/90d | 160.41M | 31.42M | 🔴 +15.24M JUP | +$3.98M | per-day (99%) | 0.0000% |

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
| 2026-08-13 | 0 | 363.8K | −363.8K | −$62.1K |
| 2026-08-14 | 0 | 287.6K | −287.6K | −$48.9K |
| 2026-08-15 | 0 | 194.3K | −194.3K | −$32.9K |
| 2026-08-16 | 0 | 312.7K | −312.7K | −$52.0K |
| 2026-08-17 | 0 | 344.0K | −344.0K | −$57.5K |
| 2026-08-18 | 0 | 326.8K | −326.8K | −$55.0K |
| 2026-08-19 | 0 | 1.14M | −1.14M | −$190.9K |
| 2026-08-20 | 0 | 613.7K | −613.7K | −$111.4K |
| 2026-08-21 | 0 | 782.8K | −782.8K | −$149.7K |
| 2026-08-22 | 0 | 952.3K | −952.3K | −$198.0K |
| 2026-08-23 | 0 | 724.2K | −724.2K | −$147.1K |
| 2026-08-24 | 0 | 523.1K | −523.1K | −$112.9K |
| 2026-08-25 | 0 | 374.2K | −374.2K | −$78.9K |
| 2026-08-27 | 53.47M | 0 | +15.55M | +$3.50M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-27 | 53.47M | $12.04M |
| 2026-10-27 | 53.47M | $12.04M |
| 2026-11-27 | 53.47M | $12.04M |
| 2026-12-27 | 53.47M | $12.04M |
| 2027-01-27 | 53.47M | $12.04M |
| 2027-02-27 | 53.47M | $12.04M |
| 2027-03-27 | 53.47M | $12.04M |
| 2027-04-27 | 53.47M | $12.04M |


---

## Fluid (FLUID)

**Price:** $1.25    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 509.1K | 0 | 🔴 +152.7K FLUID | +$190.9K | today @ $1.25 | 0.0000% |
| 7d | ⚠ 0/7d partial | 563.9K | 0 | 🔴 +169.2K FLUID | +$211.5K | today @ $1.25 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$290.2K | today @ $1.25 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$870.7K | today @ $1.25 | 0.0000% |

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
| 2026-08-23 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-24 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-25 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-26 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-27 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-28 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-29 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-30 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-08-31 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-09-01 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-09-02 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-09-03 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-09-04 | 9.1K | 0 | +2.7K | +$3.4K |
| 2026-09-05 | 509.1K | 0 | +152.7K | +$190.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 9.1K | $11.4K |
| 2026-09-07 | 9.1K | $11.4K |
| 2026-09-08 | 9.1K | $11.4K |
| 2026-09-09 | 9.1K | $11.4K |
| 2026-09-10 | 9.1K | $11.4K |
| 2026-09-11 | 9.1K | $11.4K |
| 2026-09-12 | 9.1K | $11.4K |
| 2026-09-13 | 9.1K | $11.4K |


---

## Collector Crypt (CARDS)

**Price:** $0.14    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.14 | 0.0000% |
| 7d | ⚠ 0/7d partial | 44.67M | 0 | 🔴 +11.94M CARDS | +$1.72M | today @ $0.14 | 0.0000% |
| 30d | ⚠ 19/30d partial | 44.67M | 36.10M | 🟢 −24.16M CARDS | −$4.19M | per-day (95%) | 0.0000% |
| 90d | 79/90d | 73.18M | 165.53M | 🟢 −130.81M CARDS | −$24.51M | per-day (99%) | 0.0000% |

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
| 2026-08-13 | 0 | 1.72M | −1.72M | −$253.1K |
| 2026-08-14 | 0 | 2.53M | −2.53M | −$412.8K |
| 2026-08-15 | 0 | 1.12M | −1.12M | −$181.2K |
| 2026-08-16 | 0 | 2.12M | −2.12M | −$411.2K |
| 2026-08-17 | 0 | 1.47M | −1.47M | −$276.8K |
| 2026-08-18 | 0 | 425.0K | −425.0K | −$75.4K |
| 2026-08-19 | 0 | 1.85M | −1.85M | −$317.3K |
| 2026-08-20 | 0 | 2.57M | −2.57M | −$469.2K |
| 2026-08-21 | 0 | 1.19M | −1.19M | −$232.9K |
| 2026-08-22 | 0 | 1.37M | −1.37M | −$290.0K |
| 2026-08-23 | 0 | 1.17M | −1.17M | −$233.1K |
| 2026-08-24 | 0 | 1.21M | −1.21M | −$239.0K |
| 2026-08-25 | 0 | 1.06M | −1.06M | −$212.9K |
| 2026-09-01 | 44.67M | 0 | +11.94M | +$1.72M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-01 | 44.67M | $6.44M |
| 2026-11-01 | 44.67M | $6.44M |
| 2026-12-01 | 44.67M | $6.44M |
| 2027-01-01 | 44.67M | $6.44M |
| 2027-02-01 | 44.67M | $6.44M |
| 2027-03-01 | 44.67M | $6.44M |
| 2027-04-01 | 44.67M | $6.44M |
| 2027-05-01 | 44.67M | $6.44M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$671.1K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.52B | 0 | 🔴 +1.12B PUMP | +$4.70M | today @ $0.00 | 0.0000% |
| 30d | ⚠ 18/30d partial | 20.80B | 5.06B | 🔴 +2.75B PUMP | +$10.03M | per-day (60%) | 0.0000% |
| 90d | 78/90d | 54.11B | 22.76B | 🟢 −3.02B PUMP | −$151.8K | per-day (87%) | 0.0000% |

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
| 2026-08-23 | 359.91M | 161.96M | −1.66M | −$8.2K |
| 2026-08-24 | 359.91M | 192.49M | −32.18M | −$167.9K |
| 2026-08-25 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-26 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-27 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-28 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-29 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-30 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-08-31 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-09-01 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-09-02 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-09-03 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-09-04 | 359.91M | 0 | +160.31M | +$671.1K |
| 2026-09-05 | 359.91M | 0 | +160.31M | +$671.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 359.91M | $1.51M |
| 2026-09-07 | 359.91M | $1.51M |
| 2026-09-08 | 359.91M | $1.51M |
| 2026-09-09 | 359.91M | $1.51M |
| 2026-09-10 | 359.91M | $1.51M |
| 2026-09-11 | 359.91M | $1.51M |
| 2026-09-12 | 10.36B | $43.37M |
| 2026-09-13 | 359.91M | $1.51M |


---

## LayerZero (ZRO)

**Price:** $1.05    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$12.00M | today @ $1.05 | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 314.2K | 🔴 +34.07M ZRO | +$35.74M | per-day (40%) | 0.0000% |

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
| 2026-03-08 | 0 | 133.3K | −133.3K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$12.00M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$12.00M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.00M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$12.00M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$12.00M |
| 2026-08-06 | 0 | 170.4K | −170.4K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$12.00M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-20 | 23.63M | $24.74M |
| 2026-10-20 | 23.63M | $24.74M |
| 2026-11-20 | 23.63M | $24.74M |
| 2026-12-20 | 23.63M | $24.74M |
| 2027-01-20 | 23.63M | $24.74M |
| 2027-02-20 | 23.63M | $24.74M |
| 2027-03-20 | 23.63M | $24.74M |
| 2027-04-20 | 23.63M | $24.74M |


---

## Ethena (ENA)

**Price:** $0.16    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$670.3K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$4.69M | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$20.11M | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$60.33M | today @ $0.16 | 0.0000% |

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
| 2026-08-23 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-24 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-25 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-26 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-27 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-28 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-29 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-30 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-08-31 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-09-01 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-09-02 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-09-03 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-09-04 | 10.75M | 0 | +4.11M | +$670.3K |
| 2026-09-05 | 10.75M | 0 | +4.11M | +$670.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 10.75M | $1.75M |
| 2026-09-07 | 10.75M | $1.75M |
| 2026-09-08 | 10.75M | $1.75M |
| 2026-09-09 | 10.75M | $1.75M |
| 2026-09-10 | 10.75M | $1.75M |
| 2026-09-11 | 10.75M | $1.75M |
| 2026-09-12 | 10.75M | $1.75M |
| 2026-09-13 | 10.75M | $1.75M |


---

## Aerodrome (AERO)

**Price:** $0.52    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.52 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.52 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.52 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.52 | 0.0000% |

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

**Price:** $0.12    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$9.0K | today @ $0.12 | 0.0000% |
| 30d | ⚠ 18/30d partial | 4.55M | 1.59M | 🔴 +260.0K DYDX | +$34.2K | per-day (75%) | 0.0000% |
| 90d | 73/90d | 15.91M | 4.69M | 🔴 +1.77M DYDX | +$223.8K | per-day (87%) | 0.0000% |

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
| 2026-08-17 | 189.4K | 133.3K | −56.4K | −$5.7K |
| 2026-08-18 | 189.4K | 39.8K | +37.2K | +$3.7K |
| 2026-08-19 | 189.4K | 355.9K | −278.9K | −$28.5K |
| 2026-08-20 | 189.4K | 182.8K | −105.9K | −$11.5K |
| 2026-08-21 | 189.4K | 240.8K | −163.9K | −$18.7K |
| 2026-08-22 | 189.4K | 80.8K | −3.8K | −$472.35 |
| 2026-08-23 | 189.4K | 86.8K | −9.8K | −$1.2K |
| 2026-08-24 | 189.4K | 78.1K | −1.1K | −$139.25 |
| 2026-08-25 | 189.4K | 0 | +76.9K | +$9.0K |
| 2026-08-26 | 189.4K | 0 | +76.9K | +$9.0K |
| 2026-08-27 | 189.4K | 0 | +76.9K | +$9.0K |
| 2026-08-28 | 189.4K | 0 | +76.9K | +$9.0K |
| 2026-08-29 | 189.4K | 0 | +76.9K | +$9.0K |
| 2026-08-30 | 189.4K | 0 | +76.9K | +$9.0K |


---

## Meteora (MET)

**Price:** $0.19    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$20.8K | today @ $0.19 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$145.7K | today @ $0.19 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$624.5K | today @ $0.19 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.87M | today @ $0.19 | 0.0000% |

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
| 2026-08-23 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-24 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-25 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-26 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-27 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-28 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-29 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-30 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-08-31 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-09-01 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-09-02 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-09-03 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-09-04 | 291.3K | 0 | +110.1K | +$20.8K |
| 2026-09-05 | 291.3K | 0 | +110.1K | +$20.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 291.3K | $55.0K |
| 2026-09-07 | 291.3K | $55.0K |
| 2026-09-08 | 291.3K | $55.0K |
| 2026-09-09 | 291.3K | $55.0K |
| 2026-09-10 | 291.3K | $55.0K |
| 2026-09-11 | 291.3K | $55.0K |
| 2026-09-12 | 291.3K | $55.0K |
| 2026-09-13 | 291.3K | $55.0K |


---

## Sanctum (CLOUD)

**Price:** $0.03    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$3.5K | today @ $0.03 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$24.7K | today @ $0.03 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$105.8K | today @ $0.03 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$317.4K | today @ $0.03 | 0.0000% |

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
| 2026-08-23 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-24 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-25 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-26 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-27 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-28 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-29 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-30 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-08-31 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-09-01 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-09-02 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-09-03 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-09-04 | 347.8K | 0 | +118.1K | +$3.5K |
| 2026-09-05 | 347.8K | 0 | +118.1K | +$3.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 347.8K | $10.4K |
| 2026-09-07 | 347.8K | $10.4K |
| 2026-09-08 | 347.8K | $10.4K |
| 2026-09-09 | 347.8K | $10.4K |
| 2026-09-10 | 347.8K | $10.4K |
| 2026-09-11 | 347.8K | $10.4K |
| 2026-09-12 | 347.8K | $10.4K |
| 2026-09-13 | 347.8K | $10.4K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.8K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$26.8K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$114.9K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$344.6K | today @ $0.01 | 0.0000% |

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
| 2026-08-23 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-24 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-25 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-26 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-27 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-28 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-29 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-30 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-08-31 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-09-01 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-09-02 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-09-03 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-09-04 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-09-05 | 644.2K | 0 | +302.8K | +$3.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 644.2K | $8.1K |
| 2026-09-07 | 644.2K | $8.1K |
| 2026-09-08 | 644.2K | $8.1K |
| 2026-09-09 | 644.2K | $8.1K |
| 2026-09-10 | 644.2K | $8.1K |
| 2026-09-11 | 644.2K | $8.1K |
| 2026-09-12 | 644.2K | $8.1K |
| 2026-09-13 | 644.2K | $8.1K |


---

## Uniswap (UNI)

**Price:** $6.26    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $6.26 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 UNI | $0 | today @ $6.26 | 0.0000% |
| 30d | ⚠ 19/30d partial | 0 | 1.29M | 🟢 −1.29M UNI | −$4.94M | per-day (100%) | 0.0000% |
| 90d | 79/90d | 0 | 4.00M | 🟢 −4.00M UNI | −$13.91M | per-day (100%) | 0.0000% |

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
| 2026-08-12 | 0 | 70.0K | −70.0K | −$262.5K |
| 2026-08-13 | 0 | 63.0K | −63.0K | −$224.9K |
| 2026-08-14 | 0 | 68.0K | −68.0K | −$236.1K |
| 2026-08-15 | 0 | 38.5K | −38.5K | −$123.4K |
| 2026-08-16 | 0 | 36.5K | −36.5K | −$118.0K |
| 2026-08-17 | 0 | 54.1K | −54.1K | −$176.9K |
| 2026-08-18 | 0 | 41.9K | −41.9K | −$137.7K |
| 2026-08-19 | 0 | 55.8K | −55.8K | −$183.6K |
| 2026-08-20 | 0 | 95.2K | −95.2K | −$346.4K |
| 2026-08-21 | 0 | 150.0K | −150.0K | −$563.4K |
| 2026-08-22 | 0 | 91.5K | −91.5K | −$380.4K |
| 2026-08-23 | 0 | 90.0K | −90.0K | −$388.0K |
| 2026-08-24 | 0 | 96.5K | −96.5K | −$435.4K |
| 2026-08-25 | 0 | 94.3K | −94.3K | −$408.6K |


---

## Raydium (RAY)

**Price:** $0.83    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.83 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.83 | 0.0000% |
| 30d | ⚠ 20/30d partial | 0 | 1.11M | 🟢 −1.11M RAY | −$738.7K | per-day (100%) | 0.0000% |
| 90d | 80/90d | 0 | 2.72M | 🟢 −2.72M RAY | −$1.75M | per-day (100%) | 0.0000% |

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
| 2026-08-13 | 0 | 42.4K | −42.4K | −$26.9K |
| 2026-08-14 | 0 | 45.2K | −45.2K | −$28.2K |
| 2026-08-15 | 0 | 34.4K | −34.4K | −$21.5K |
| 2026-08-16 | 0 | 22.9K | −22.9K | −$14.2K |
| 2026-08-17 | 0 | 38.2K | −38.2K | −$23.5K |
| 2026-08-18 | 0 | 29.9K | −29.9K | −$18.5K |
| 2026-08-19 | 0 | 35.9K | −35.9K | −$22.1K |
| 2026-08-20 | 0 | 110.9K | −110.9K | −$72.2K |
| 2026-08-21 | 0 | 61.5K | −61.5K | −$42.5K |
| 2026-08-22 | 0 | 77.7K | −77.7K | −$57.9K |
| 2026-08-23 | 0 | 61.1K | −61.1K | −$45.4K |
| 2026-08-24 | 0 | 56.1K | −56.1K | −$43.2K |
| 2026-08-25 | 0 | 48.1K | −48.1K | −$36.8K |
| 2026-08-26 | 0 | 46.6K | −46.6K | −$36.7K |


---

## Euler (EUL)

**Price:** $1.33    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
| 30d | ⚠ 1/30d partial | 0 | 1 | 🟢 −1 EUL | −$1.19 | per-day (100%) | 0.0000% |
| 90d | ⚠ 1/90d partial | 0 | 1 | 🟢 −1 EUL | −$1.19 | per-day (100%) | 0.0000% |

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
| 2026-08-12 | 0 | 1 | −1 | −$1.19 |


---

## Gains Network (GNS)

**Price:** $0.47    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.47 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.47 | 0.0000% |
| 30d | ⚠ 18/30d partial | 0 | 108.8K | 🟢 −108.8K GNS | −$56.2K | per-day (100%) | 0.0000% |
| 90d | 78/90d | 0 | 518.4K | 🟢 −518.4K GNS | −$281.1K | per-day (100%) | 0.0000% |

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
| 2026-08-11 | 0 | 7.0K | −7.0K | −$3.7K |
| 2026-08-12 | 0 | 9.9K | −9.9K | −$5.2K |
| 2026-08-13 | 0 | 2.5K | −2.5K | −$1.3K |
| 2026-08-14 | 0 | 4.9K | −4.9K | −$2.6K |
| 2026-08-15 | 0 | 1.9K | −1.9K | −$989.00 |
| 2026-08-16 | 0 | 3.8K | −3.8K | −$2.0K |
| 2026-08-17 | 0 | 3.5K | −3.5K | −$1.8K |
| 2026-08-18 | 0 | 7.0K | −7.0K | −$3.5K |
| 2026-08-19 | 0 | 28.8K | −28.8K | −$14.4K |
| 2026-08-20 | 0 | 2.3K | −2.3K | −$1.2K |
| 2026-08-21 | 0 | 8.0K | −8.0K | −$4.3K |
| 2026-08-22 | 0 | 2.3K | −2.3K | −$1.2K |
| 2026-08-23 | 0 | 1.7K | −1.7K | −$953.00 |
| 2026-08-24 | 0 | 2.5K | −2.5K | −$1.4K |


---

## Orca (ORCA)

**Price:** $1.28    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.28 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.28 | 0.0000% |
| 30d | ⚠ 19/30d partial | 0 | 103.8K | 🟢 −103.8K ORCA | −$121.2K | per-day (100%) | 0.0000% |
| 90d | 79/90d | 0 | 225.7K | 🟢 −225.7K ORCA | −$262.4K | per-day (100%) | 0.0000% |

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
| 2026-08-12 | 0 | 3.7K | −3.7K | −$3.9K |
| 2026-08-13 | 0 | 3.9K | −3.9K | −$4.0K |
| 2026-08-14 | 0 | 3.2K | −3.2K | −$3.3K |
| 2026-08-15 | 0 | 2.0K | −2.0K | −$2.0K |
| 2026-08-16 | 0 | 1.9K | −1.9K | −$2.0K |
| 2026-08-17 | 0 | 3.9K | −3.9K | −$3.9K |
| 2026-08-18 | 0 | 3.2K | −3.2K | −$3.5K |
| 2026-08-19 | 0 | 6.7K | −6.7K | −$7.1K |
| 2026-08-20 | 0 | 6.9K | −6.9K | −$7.7K |
| 2026-08-21 | 0 | 12.3K | −12.3K | −$14.2K |
| 2026-08-22 | 0 | 17.8K | −17.8K | −$22.4K |
| 2026-08-23 | 0 | 10.5K | −10.5K | −$12.9K |
| 2026-08-24 | 0 | 9.8K | −9.8K | −$12.6K |
| 2026-08-25 | 0 | 10.6K | −10.6K | −$13.8K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 30d | ⚠ 20/30d partial | 0 | 4.18M | 🟢 −4.18M MNDE | −$79.6K | per-day (100%) | 0.0000% |
| 90d | 80/90d | 0 | 13.09M | 🟢 −13.09M MNDE | −$245.7K | per-day (100%) | 0.0000% |

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
| 2026-08-13 | 0 | 197.9K | −197.9K | −$3.8K |
| 2026-08-14 | 0 | 194.0K | −194.0K | −$3.7K |
| 2026-08-15 | 0 | 199.1K | −199.1K | −$3.7K |
| 2026-08-16 | 0 | 191.6K | −191.6K | −$3.7K |
| 2026-08-17 | 0 | 201.0K | −201.0K | −$3.8K |
| 2026-08-18 | 0 | 200.6K | −200.6K | −$3.8K |
| 2026-08-19 | 0 | 232.4K | −232.4K | −$4.3K |
| 2026-08-20 | 0 | 234.6K | −234.6K | −$4.4K |
| 2026-08-21 | 0 | 258.8K | −258.8K | −$4.8K |
| 2026-08-22 | 0 | 247.1K | −247.1K | −$4.8K |
| 2026-08-23 | 0 | 248.5K | −248.5K | −$4.9K |
| 2026-08-24 | 0 | 257.3K | −257.3K | −$5.1K |
| 2026-08-25 | 0 | 251.6K | −251.6K | −$5.1K |
| 2026-08-26 | 0 | 83.9K | −83.9K | −$1.7K |


---

## ether.fi (ETHFI)

**Price:** $0.56    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.56 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.56 | 0.0000% |
| 30d | ⚠ 19/30d partial | 0 | 219.7K | 🟢 −219.7K ETHFI | −$100.1K | per-day (100%) | 0.0000% |
| 90d | 79/90d | 0 | 993.5K | 🟢 −993.5K ETHFI | −$391.3K | per-day (100%) | 0.0000% |

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
| 2026-08-12 | 0 | 14.1K | −14.1K | −$5.4K |
| 2026-08-13 | 0 | 13.7K | −13.7K | −$5.2K |
| 2026-08-14 | 0 | 14.2K | −14.2K | −$6.3K |
| 2026-08-15 | 0 | 11.5K | −11.5K | −$5.2K |
| 2026-08-16 | 0 | 9.0K | −9.0K | −$4.3K |
| 2026-08-17 | 0 | 11.3K | −11.3K | −$5.7K |
| 2026-08-18 | 0 | 11.5K | −11.5K | −$5.7K |
| 2026-08-19 | 0 | 11.7K | −11.7K | −$5.7K |
| 2026-08-20 | 0 | 10.9K | −10.9K | −$5.7K |
| 2026-08-21 | 0 | 10.2K | −10.2K | −$5.6K |
| 2026-08-22 | 0 | 7.4K | −7.4K | −$4.5K |
| 2026-08-23 | 0 | 6.4K | −6.4K | −$3.7K |
| 2026-08-24 | 0 | 8.4K | −8.4K | −$5.2K |
| 2026-08-25 | 0 | 8.6K | −8.6K | −$5.3K |


---

## CoW Protocol (COW)

**Price:** $0.13    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 COW | $0 | today @ $0.13 | 0.0000% |
| 30d | ⚠ 17/30d partial | 0 | 4.61M | 🟢 −4.61M COW | −$515.5K | per-day (100%) | 0.0000% |
| 90d | 73/90d | 0 | 15.31M | 🟢 −15.31M COW | −$2.02M | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 150.2K | −150.2K | −$15.9K |
| 2026-08-11 | 0 | 163.8K | −163.8K | −$17.0K |
| 2026-08-13 | 0 | 122.4K | −122.4K | −$12.4K |
| 2026-08-14 | 0 | 124.1K | −124.1K | −$12.6K |
| 2026-08-15 | 0 | 59.6K | −59.6K | −$6.1K |
| 2026-08-16 | 0 | 50.0K | −50.0K | −$7.1K |
| 2026-08-17 | 0 | 119.5K | −119.5K | −$14.0K |
| 2026-08-18 | 0 | 109.9K | −109.9K | −$12.0K |
| 2026-08-19 | 0 | 708.4K | −708.4K | −$76.3K |
| 2026-08-20 | 0 | 490.5K | −490.5K | −$54.3K |
| 2026-08-21 | 0 | 1.36M | −1.36M | −$153.8K |
| 2026-08-22 | 0 | 296.8K | −296.8K | −$36.3K |
| 2026-08-23 | 0 | 237.3K | −237.3K | −$27.0K |
| 2026-08-24 | 0 | 340.4K | −340.4K | −$40.9K |


---
