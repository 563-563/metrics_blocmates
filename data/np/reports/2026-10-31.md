# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-10-31T05:34:45.463Z
**As-of:** 2026-10-31

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $88.37    **Circulating:** 590.04M HYPE    **AF balance:** 48.40M HYPE    **Total staked:** 440.52M HYPE (74.7% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 2.6K | 🟢 −2.6K HYPE | −$229.5K | today @ $88.37 | -0.0003% |
| 7d | 7/7d | 7.53M | 82.5K | 🔴 +2.19M HYPE | +$193.55M | today @ $88.37 | 0.2190% |
| 30d | 30/30d | 17.45M | 212.0K | 🟢 −2.74M HYPE | −$242.14M | today @ $88.37 | -0.2740% |
| 90d | 90/90d | 52.34M | 550.3K | 🟢 −6.37M HYPE | −$562.91M | today @ $88.37 | -0.6370% |

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
| 2026-10-18 | 0 | 1.3K | −432.6K | −$38.23M |
| 2026-10-19 | 0 | 871 | −126.3K | −$11.16M |
| 2026-10-20 | 0 | 2.1K | −139.4K | −$12.32M |
| 2026-10-21 | 0 | 2.2K | −2.2K | −$195.8K |
| 2026-10-22 | 0 | 1.2K | −1.2K | −$103.5K |
| 2026-10-23 | 0 | 4.9K | −4.9K | −$434.4K |
| 2026-10-24 | 0 | 5.0K | −5.0K | −$445.5K |
| 2026-10-25 | 0 | 3.2K | −32.6K | −$2.88M |
| 2026-10-26 | 0 | 7.2K | −7.2K | −$633.3K |
| 2026-10-27 | 0 | 13.1K | −13.1K | −$1.16M |
| 2026-10-28 | 0 | 12.5K | −12.5K | −$1.10M |
| 2026-10-29 | 7.53M | 9.6K | +2.29M | +$202.59M |
| 2026-10-30 | 0 | 34.3K | −34.3K | −$3.03M |
| 2026-10-31 | 0 | 2.6K | −2.6K | −$229.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-06 | 9.92M | $876.34M |
| 2026-11-29 | 7.53M | $665.54M |
| 2026-12-06 | 9.92M | $876.34M |
| 2026-12-29 | 7.53M | $665.54M |
| 2027-01-06 | 9.92M | $876.34M |
| 2027-01-29 | 7.53M | $665.54M |
| 2027-02-06 | 9.92M | $876.34M |
| 2027-03-01 | 7.53M | $665.54M |


---

## Aave (AAVE)

**Price:** $129.63    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $129.63 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AAVE | $0 | today @ $129.63 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −2.9K AAVE | −$380.3K | today @ $129.63 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −56.0K AAVE | −$7.25M | today @ $129.63 | 0.0000% |

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
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$148.7K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$17.0K |
| 2026-08-20 | 0 | 0 | −2.0K | −$264.0K |
| 2026-08-21 | 0 | 0 | −499 | −$64.7K |
| 2026-08-22 | 0 | 0 | −387 | −$50.2K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$76.8K |
| 2026-08-25 | 0 | 0 | −1.5K | −$196.4K |
| 2026-08-26 | 0 | 0 | −3.9K | −$500.6K |
| 2026-09-29 | 0 | 0 | −39.1K | −$5.07M |
| 2026-10-06 | 0 | 0 | −2.9K | −$380.3K |
| 2026-10-13 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −49.75M SKY | −$3.34M | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −177.02M SKY | −$11.89M | today @ $0.07 | 0.0000% |

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
| 2026-08-16 | 0 | 0 | −254.9K | −$17.1K |
| 2026-08-17 | 0 | 0 | −1.72M | −$115.7K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.12M |
| 2026-08-19 | 0 | 0 | −10.18M | −$683.4K |
| 2026-08-20 | 0 | 0 | −4.64M | −$311.7K |
| 2026-08-21 | 0 | 0 | −4.01M | −$269.5K |
| 2026-08-22 | 0 | 0 | −2.79M | −$187.1K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$668.1K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$97.4K |
| 2026-09-29 | 0 | 0 | −55.20M | −$3.71M |
| 2026-10-06 | 0 | 0 | 0 | $0 |
| 2026-10-13 | 0 | 0 | −49.75M | −$3.34M |


---

## Lighter (LIT)

**Price:** $2.73    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.73 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.73 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 257.6K | 🟢 −257.6K LIT | −$955.3K | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 0 | 1.77M | 🟢 −1.77M LIT | −$6.26M | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 30.8K | −30.8K | −$136.9K |
| 2026-09-30 | 0 | 19.7K | −19.7K | −$77.1K |
| 2026-10-01 | 0 | 19.1K | −19.1K | −$75.4K |
| 2026-10-02 | 0 | 27.1K | −27.1K | −$103.3K |
| 2026-10-03 | 0 | 13.8K | −13.8K | −$49.1K |
| 2026-10-04 | 0 | 6.7K | −6.7K | −$23.7K |
| 2026-10-05 | 0 | 18.7K | −18.7K | −$68.4K |
| 2026-10-06 | 0 | 21.8K | −21.8K | −$87.8K |
| 2026-10-07 | 0 | 25.0K | −25.0K | −$95.3K |
| 2026-10-08 | 0 | 51.5K | −51.5K | −$183.9K |
| 2026-10-09 | 0 | 28.3K | −28.3K | −$102.1K |
| 2026-10-10 | 0 | 14.8K | −14.8K | −$53.5K |
| 2026-10-11 | 0 | 16.8K | −16.8K | −$61.2K |
| 2026-10-12 | 0 | 33.0K | −33.0K | −$126.8K |


---

## Morpho (MORPHO)

**Price:** $2.10    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$204.5K | today @ $2.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.43M | today @ $2.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$6.13M | today @ $2.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$18.40M | today @ $2.10 | 0.0000% |

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
| 2026-10-18 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-19 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-20 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-21 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-22 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-23 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-24 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-25 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-26 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-27 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-28 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-29 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-30 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-10-31 | 202.7K | 0 | +97.4K | +$204.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 202.7K | $425.6K |
| 2026-11-02 | 202.7K | $425.6K |
| 2026-11-03 | 202.7K | $425.6K |
| 2026-11-04 | 202.7K | $425.6K |
| 2026-11-05 | 202.7K | $425.6K |
| 2026-11-06 | 202.7K | $425.6K |
| 2026-11-07 | 202.7K | $425.6K |
| 2026-11-08 | 202.7K | $425.6K |


---

## Pendle (PENDLE)

**Price:** $1.84    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.84 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.84 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.84 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.84 | 0.0000% |

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

**Price:** $0.37    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$80.1K | today @ $0.37 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$560.9K | today @ $0.37 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$2.40M | today @ $0.37 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$7.21M | today @ $0.37 | 0.0000% |

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
| 2026-10-18 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-19 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-20 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-21 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-22 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-23 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-24 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-25 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-26 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-27 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-28 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-29 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-30 | 626.2K | 0 | +214.3K | +$80.1K |
| 2026-10-31 | 626.2K | 0 | +214.3K | +$80.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 626.2K | $234.1K |
| 2026-11-02 | 626.2K | $234.1K |
| 2026-11-03 | 626.2K | $234.1K |
| 2026-11-04 | 626.2K | $234.1K |
| 2026-11-05 | 626.2K | $234.1K |
| 2026-11-06 | 626.2K | $234.1K |
| 2026-11-07 | 626.2K | $234.1K |
| 2026-11-08 | 626.2K | $234.1K |


---

## Jupiter (JUP)

**Price:** $0.26    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.26 | 0.0000% |
| 7d | ⚠ 0/7d partial | 53.47M | 0 | 🔴 +15.55M JUP | +$3.98M | today @ $0.26 | 0.0000% |
| 30d | ⚠ 11/30d partial | 53.47M | 2.14M | 🔴 +13.41M JUP | +$3.24M | per-day (92%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 160.41M | 29.93M | 🔴 +16.73M JUP | +$5.71M | per-day (99%) | 0.0000% |

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
| 2026-09-30 | 0 | 303.0K | −303.0K | −$100.0K |
| 2026-10-01 | 0 | 217.2K | −217.2K | −$71.6K |
| 2026-10-02 | 0 | 356.8K | −356.8K | −$116.4K |
| 2026-10-03 | 0 | 128.3K | −128.3K | −$40.4K |
| 2026-10-04 | 0 | 241.1K | −241.1K | −$79.3K |
| 2026-10-05 | 0 | 177.1K | −177.1K | −$59.3K |
| 2026-10-06 | 0 | 175.3K | −175.3K | −$61.2K |
| 2026-10-07 | 0 | 280.4K | −280.4K | −$98.5K |
| 2026-10-08 | 0 | 343.7K | −343.7K | −$123.1K |
| 2026-10-09 | 0 | 183.8K | −183.8K | −$61.7K |
| 2026-10-10 | 0 | 117.0K | −117.0K | −$43.9K |
| 2026-10-11 | 0 | 138.7K | −138.7K | −$49.6K |
| 2026-10-12 | 0 | 266 | −266 | −$96.67 |
| 2026-10-27 | 53.47M | 0 | +15.55M | +$3.98M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 53.47M | $13.67M |
| 2026-12-27 | 53.47M | $13.67M |
| 2027-01-27 | 53.47M | $13.67M |
| 2027-02-27 | 53.47M | $13.67M |
| 2027-03-27 | 53.47M | $13.67M |
| 2027-04-27 | 53.47M | $13.67M |
| 2027-05-27 | 53.47M | $13.67M |
| 2027-06-27 | 53.47M | $13.67M |


---

## Fluid (FLUID)

**Price:** $1.86    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$5.1K | today @ $1.86 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$35.7K | today @ $1.86 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$431.9K | today @ $1.86 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.30M | today @ $1.86 | 0.0000% |

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
| 2026-10-18 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-19 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-20 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-21 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-22 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-23 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-24 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-25 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-26 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-27 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-28 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-29 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-30 | 9.1K | 0 | +2.7K | +$5.1K |
| 2026-10-31 | 9.1K | 0 | +2.7K | +$5.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 9.1K | $17.0K |
| 2026-11-02 | 9.1K | $17.0K |
| 2026-11-03 | 9.1K | $17.0K |
| 2026-11-04 | 9.1K | $17.0K |
| 2026-11-05 | 509.1K | $947.0K |
| 2026-11-06 | 9.1K | $17.0K |
| 2026-11-07 | 9.1K | $17.0K |
| 2026-11-08 | 9.1K | $17.0K |


---

## Collector Crypt (CARDS)

**Price:** $0.25    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.25 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.25 | 0.0000% |
| 30d | ⚠ 5/30d partial | 0 | 156.1K | 🟢 −156.1K CARDS | −$46.6K | per-day (100%) | 0.0000% |
| 90d | ⚠ 62/90d partial | 89.35M | 112.77M | 🟢 −88.90M CARDS | −$12.44M | per-day (98%) | 0.0000% |

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
| 2026-09-21 | 0 | 3.29M | −3.29M | −$558.5K |
| 2026-09-22 | 0 | 2.05M | −2.05M | −$395.4K |
| 2026-09-23 | 0 | 2.01M | −2.01M | −$354.0K |
| 2026-09-24 | 0 | 2.06M | −2.06M | −$356.0K |
| 2026-09-25 | 0 | 3.08M | −3.08M | −$480.0K |
| 2026-09-26 | 0 | 2.01M | −2.01M | −$378.3K |
| 2026-09-27 | 0 | 1.67M | −1.67M | −$311.2K |
| 2026-09-28 | 0 | 859.6K | −859.6K | −$168.5K |
| 2026-10-01 | 44.67M | 0 | +11.94M | +$2.97M |
| 2026-10-06 | 0 | 12.3K | −12.3K | −$3.5K |
| 2026-10-09 | 0 | 32.1K | −32.1K | −$8.1K |
| 2026-10-10 | 0 | 23.3K | −23.3K | −$6.8K |
| 2026-10-11 | 0 | 39.1K | −39.1K | −$12.2K |
| 2026-10-12 | 0 | 49.2K | −49.2K | −$16.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 44.67M | $11.11M |
| 2026-12-01 | 44.67M | $11.11M |
| 2027-01-01 | 44.67M | $11.11M |
| 2027-02-01 | 44.67M | $11.11M |
| 2027-03-01 | 44.67M | $11.11M |
| 2027-04-01 | 44.67M | $11.11M |
| 2027-05-01 | 44.67M | $11.11M |
| 2027-06-01 | 44.67M | $11.11M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$654.5K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.52B | 0 | 🔴 +1.12B PUMP | +$4.58M | today @ $0.00 | 0.0000% |
| 30d | ⚠ 10/30d partial | 20.80B | 1.91B | 🔴 +5.90B PUMP | +$23.53M | per-day (33%) | 0.0000% |
| 90d | ⚠ 70/90d partial | 62.39B | 15.79B | 🔴 +7.64B PUMP | +$28.35M | per-day (78%) | 0.0000% |

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
| 2026-10-18 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-19 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-20 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-21 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-22 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-23 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-24 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-25 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-26 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-27 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-28 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-29 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-30 | 359.91M | 0 | +160.31M | +$654.5K |
| 2026-10-31 | 359.91M | 0 | +160.31M | +$654.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 359.91M | $1.47M |
| 2026-11-02 | 359.91M | $1.47M |
| 2026-11-03 | 359.91M | $1.47M |
| 2026-11-04 | 359.91M | $1.47M |
| 2026-11-05 | 359.91M | $1.47M |
| 2026-11-06 | 359.91M | $1.47M |
| 2026-11-07 | 359.91M | $1.47M |
| 2026-11-08 | 359.91M | $1.47M |


---

## LayerZero (ZRO)

**Price:** $1.69    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.69 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.69 | 0.0000% |
| 30d | ⚠ 0/30d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$19.37M | today @ $1.69 | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 339.6K | 🔴 +34.05M ZRO | +$57.79M | per-day (40%) | 0.0000% |

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
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$19.37M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$19.37M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-20 | 23.63M | $39.93M |
| 2026-12-20 | 23.63M | $39.93M |
| 2027-01-20 | 23.63M | $39.93M |
| 2027-02-20 | 23.63M | $39.93M |
| 2027-03-20 | 23.63M | $39.93M |
| 2027-04-20 | 23.63M | $39.93M |
| 2027-05-20 | 23.63M | $39.93M |
| 2027-06-20 | 23.63M | $39.93M |


---

## Ethena (ENA)

**Price:** $0.19    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$778.4K | today @ $0.19 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$5.45M | today @ $0.19 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$23.35M | today @ $0.19 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$70.06M | today @ $0.19 | 0.0000% |

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
| 2026-10-18 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-19 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-20 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-21 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-22 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-23 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-24 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-25 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-26 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-27 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-28 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-29 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-30 | 10.75M | 0 | +4.11M | +$778.4K |
| 2026-10-31 | 10.75M | 0 | +4.11M | +$778.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 10.75M | $2.04M |
| 2026-11-02 | 10.75M | $2.04M |
| 2026-11-03 | 10.75M | $2.04M |
| 2026-11-04 | 10.75M | $2.04M |
| 2026-11-05 | 10.75M | $2.04M |
| 2026-11-06 | 10.75M | $2.04M |
| 2026-11-07 | 10.75M | $2.04M |
| 2026-11-08 | 10.75M | $2.04M |


---

## Aerodrome (AERO)

**Price:** $0.62    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.62 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.62 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.62 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.62 | 0.0000% |

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

**Price:** $0.11    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.11 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.11 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 538.6K | 🟢 −538.6K DYDX | −$76.8K | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 5.30M | 5.22M | 🟢 −3.06M DYDX | −$387.3K | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 113.7K | −113.7K | −$15.4K |
| 2026-09-30 | 0 | 97.1K | −97.1K | −$13.5K |
| 2026-10-01 | 0 | 68.3K | −68.3K | −$9.8K |
| 2026-10-02 | 0 | 95.9K | −95.9K | −$14.7K |
| 2026-10-03 | 0 | 7.2K | −7.2K | −$1.1K |
| 2026-10-04 | 0 | 11.0K | −11.0K | −$1.6K |
| 2026-10-05 | 0 | 45.0K | −45.0K | −$6.6K |
| 2026-10-06 | 0 | 55.5K | −55.5K | −$8.3K |
| 2026-10-07 | 0 | 45.9K | −45.9K | −$6.6K |
| 2026-10-08 | 0 | 117.4K | −117.4K | −$16.0K |
| 2026-10-09 | 0 | 55.9K | −55.9K | −$7.3K |
| 2026-10-10 | 0 | 16.8K | −16.8K | −$2.3K |
| 2026-10-11 | 0 | 22.3K | −22.3K | −$3.1K |
| 2026-10-12 | 0 | 65.7K | −65.7K | −$9.2K |


---

## Meteora (MET)

**Price:** $0.28    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$30.7K | today @ $0.28 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$214.6K | today @ $0.28 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$919.9K | today @ $0.28 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.76M | today @ $0.28 | 0.0000% |

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
| 2026-10-18 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-19 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-20 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-21 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-22 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-23 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-24 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-25 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-26 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-27 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-28 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-29 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-30 | 291.3K | 0 | +110.1K | +$30.7K |
| 2026-10-31 | 291.3K | 0 | +110.1K | +$30.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 291.3K | $81.1K |
| 2026-11-02 | 291.3K | $81.1K |
| 2026-11-03 | 291.3K | $81.1K |
| 2026-11-04 | 291.3K | $81.1K |
| 2026-11-05 | 291.3K | $81.1K |
| 2026-11-06 | 291.3K | $81.1K |
| 2026-11-07 | 291.3K | $81.1K |
| 2026-11-08 | 291.3K | $81.1K |


---

## Sanctum (CLOUD)

**Price:** $0.04    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$5.2K | today @ $0.04 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$36.3K | today @ $0.04 | 0.0000% |
| 30d | ⚠ 0/30d partial | 25.43M | 0 | 🔴 +8.04M CLOUD | +$352.8K | today @ $0.04 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$663.5K | today @ $0.04 | 0.0000% |

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
| 2026-10-18 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-19 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-20 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-21 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-22 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-23 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-24 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-25 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-26 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-27 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-28 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-29 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-30 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-31 | 347.8K | 0 | +118.1K | +$5.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 347.8K | $15.3K |
| 2026-11-02 | 347.8K | $15.3K |
| 2026-11-03 | 347.8K | $15.3K |
| 2026-11-04 | 347.8K | $15.3K |
| 2026-11-05 | 347.8K | $15.3K |
| 2026-11-06 | 347.8K | $15.3K |
| 2026-11-07 | 347.8K | $15.3K |
| 2026-11-08 | 347.8K | $15.3K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$4.0K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$28.1K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$120.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$360.9K | today @ $0.01 | 0.0000% |

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
| 2026-10-18 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-19 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-20 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-21 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-22 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-23 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-24 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-25 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-26 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-27 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-28 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-29 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-30 | 644.2K | 0 | +302.8K | +$4.0K |
| 2026-10-31 | 644.2K | 0 | +302.8K | +$4.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 644.2K | $8.5K |
| 2026-11-02 | 644.2K | $8.5K |
| 2026-11-03 | 644.2K | $8.5K |
| 2026-11-04 | 644.2K | $8.5K |
| 2026-11-05 | 644.2K | $8.5K |
| 2026-11-06 | 644.2K | $8.5K |
| 2026-11-07 | 644.2K | $8.5K |
| 2026-11-08 | 644.2K | $8.5K |


---

## Uniswap (UNI)

**Price:** $6.94    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $6.94 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 UNI | $0 | today @ $6.94 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 290.8K | 🟢 −290.8K UNI | −$2.41M | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 0 | 4.77M | 🟢 −4.77M UNI | −$27.24M | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 44.4K | −44.4K | −$390.7K |
| 2026-09-30 | 0 | 41.8K | −41.8K | −$371.7K |
| 2026-10-01 | 0 | 36.5K | −36.5K | −$323.9K |
| 2026-10-02 | 0 | 39.9K | −39.9K | −$358.4K |
| 2026-10-03 | 0 | 12.2K | −12.2K | −$109.2K |
| 2026-10-04 | 0 | 16.0K | −16.0K | −$144.6K |
| 2026-10-05 | 0 | 23.9K | −23.9K | −$216.5K |
| 2026-10-06 | 0 | 23.3K | −23.3K | −$211.2K |
| 2026-10-07 | 0 | 33.5K | −33.5K | −$286.5K |
| 2026-10-08 | 0 | 56.0K | −56.0K | −$443.4K |
| 2026-10-09 | 0 | 24.8K | −24.8K | −$176.0K |
| 2026-10-10 | 0 | 12.3K | −12.3K | −$89.8K |
| 2026-10-11 | 0 | 14.2K | −14.2K | −$107.8K |
| 2026-10-12 | 0 | 34.9K | −34.9K | −$270.7K |


---

## Raydium (RAY)

**Price:** $1.64    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.64 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.64 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 297.1K | 🟢 −297.1K RAY | −$640.0K | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 0 | 5.29M | 🟢 −5.29M RAY | −$6.52M | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 71.2K | −71.2K | −$135.2K |
| 2026-09-30 | 0 | 61.2K | −61.2K | −$117.1K |
| 2026-10-01 | 0 | 55.7K | −55.7K | −$108.3K |
| 2026-10-02 | 0 | 56.2K | −56.2K | −$105.2K |
| 2026-10-03 | 0 | 24.8K | −24.8K | −$47.8K |
| 2026-10-04 | 0 | 28.5K | −28.5K | −$59.4K |
| 2026-10-05 | 0 | 31.3K | −31.3K | −$66.0K |
| 2026-10-06 | 0 | 30.4K | −30.4K | −$67.5K |
| 2026-10-07 | 0 | 32.7K | −32.7K | −$71.8K |
| 2026-10-08 | 0 | 26.4K | −26.4K | −$65.1K |
| 2026-10-09 | 0 | 17.0K | −17.0K | −$39.5K |
| 2026-10-10 | 0 | 12.6K | −12.6K | −$28.7K |
| 2026-10-11 | 0 | 16.1K | −16.1K | −$38.1K |
| 2026-10-12 | 0 | 21.1K | −21.1K | −$51.0K |


---

## Euler (EUL)

**Price:** $1.08    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.08 | 0.0000% |
| 30d | ⚠ 1/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.02 | per-day (100%) | 0.0000% |
| 90d | ⚠ 5/90d partial | 0 | 1 | 🟢 −1 EUL | −$1.25 | per-day (100%) | 0.0000% |

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
| 2026-04-10 | 0 | 116 | −116 | −$112.00 |
| 2026-04-11 | 0 | 19.1K | −19.1K | −$20.7K |
| 2026-04-12 | 0 | 243 | −243 | −$255.00 |
| 2026-04-13 | 0 | 9 | −9 | −$8.63 |
| 2026-04-15 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-04-18 | 0 | 52 | −52 | −$82.00 |
| 2026-04-19 | 0 | 62 | −62 | −$82.00 |
| 2026-04-21 | 0 | 244 | −244 | −$317.00 |
| 2026-04-25 | 0 | 552 | −552 | −$795.00 |
| 2026-08-12 | 0 | 1 | −1 | −$1.19 |
| 2026-08-26 | 0 | 0 | −0 | −$0.01 |
| 2026-09-09 | 0 | 0 | −0 | −$0.01 |
| 2026-09-23 | 0 | 0 | −0 | −$0.02 |
| 2026-10-07 | 0 | 0 | −0 | −$0.02 |


---

## Gains Network (GNS)

**Price:** $0.38    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.38 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.38 | 0.0000% |
| 30d | ⚠ 10/30d partial | 0 | 28.3K | 🟢 −28.3K GNS | −$11.4K | per-day (100%) | 0.0000% |
| 90d | ⚠ 69/90d partial | 0 | 262.8K | 🟢 −262.8K GNS | −$128.1K | per-day (100%) | 0.0000% |

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
| 2026-09-28 | 0 | 12.5K | −12.5K | −$6.4K |
| 2026-09-29 | 0 | 504 | −504 | −$242.00 |
| 2026-09-30 | 0 | 7.0K | −7.0K | −$3.4K |
| 2026-10-01 | 0 | 2.6K | −2.6K | −$1.2K |
| 2026-10-02 | 0 | 3.5K | −3.5K | −$1.6K |
| 2026-10-03 | 0 | 718 | −718 | −$310.00 |
| 2026-10-04 | 0 | 1.6K | −1.6K | −$676.00 |
| 2026-10-05 | 0 | 1.9K | −1.9K | −$810.00 |
| 2026-10-06 | 0 | 1.9K | −1.9K | −$802.00 |
| 2026-10-07 | 0 | 2.0K | −2.0K | −$817.00 |
| 2026-10-08 | 0 | 7.4K | −7.4K | −$2.8K |
| 2026-10-09 | 0 | 6.1K | −6.1K | −$2.3K |
| 2026-10-10 | 0 | 1.7K | −1.7K | −$661.00 |
| 2026-10-11 | 0 | 1.5K | −1.5K | −$597.00 |


---

## Orca (ORCA)

**Price:** $1.52    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.52 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.52 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 58.6K | 🟢 −58.6K ORCA | −$131.5K | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 0 | 578.1K | 🟢 −578.1K ORCA | −$846.4K | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 12.7K | −12.7K | −$21.5K |
| 2026-09-30 | 0 | 12.0K | −12.0K | −$19.3K |
| 2026-10-01 | 0 | 8.8K | −8.8K | −$14.6K |
| 2026-10-02 | 0 | 9.7K | −9.7K | −$16.6K |
| 2026-10-03 | 0 | 3.9K | −3.9K | −$6.8K |
| 2026-10-04 | 0 | 5.3K | −5.3K | −$9.5K |
| 2026-10-05 | 0 | 6.4K | −6.4K | −$12.8K |
| 2026-10-06 | 0 | 5.9K | −5.9K | −$14.2K |
| 2026-10-07 | 0 | 5.1K | −5.1K | −$16.3K |
| 2026-10-08 | 0 | 5.9K | −5.9K | −$16.8K |
| 2026-10-09 | 0 | 4.2K | −4.2K | −$9.8K |
| 2026-10-10 | 0 | 3.0K | −3.0K | −$6.8K |
| 2026-10-11 | 0 | 3.2K | −3.2K | −$7.6K |
| 2026-10-12 | 0 | 6.1K | −6.1K | −$14.4K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 30d | ⚠ 12/30d partial | 0 | 3.19M | 🟢 −3.19M MNDE | −$84.3K | per-day (100%) | 0.0000% |
| 90d | 72/90d | 0 | 20.11M | 🟢 −20.11M MNDE | −$422.0K | per-day (100%) | 0.0000% |

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
| 2026-09-30 | 0 | 299.2K | −299.2K | −$7.8K |
| 2026-10-01 | 0 | 296.9K | −296.9K | −$7.7K |
| 2026-10-02 | 0 | 307.3K | −307.3K | −$7.6K |
| 2026-10-03 | 0 | 304.1K | −304.1K | −$7.7K |
| 2026-10-04 | 0 | 320.5K | −320.5K | −$7.8K |
| 2026-10-05 | 0 | 320.1K | −320.1K | −$7.8K |
| 2026-10-06 | 0 | 211.4K | −211.4K | −$7.4K |
| 2026-10-07 | 0 | 289.8K | −289.8K | −$7.5K |
| 2026-10-08 | 0 | 241.7K | −241.7K | −$7.0K |
| 2026-10-09 | 0 | 261.2K | −261.2K | −$6.9K |
| 2026-10-10 | 0 | 275.2K | −275.2K | −$7.1K |
| 2026-10-11 | 0 | 278.2K | −278.2K | −$7.2K |
| 2026-10-12 | 0 | 252.8K | −252.8K | −$6.8K |
| 2026-10-13 | 0 | 130.6K | −130.6K | −$3.5K |


---

## ether.fi (ETHFI)

**Price:** $0.61    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.61 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.61 | 0.0000% |
| 30d | ⚠ 11/30d partial | 0 | 98.4K | 🟢 −98.4K ETHFI | −$70.9K | per-day (100%) | 0.0000% |
| 90d | ⚠ 71/90d partial | 0 | 753.0K | 🟢 −753.0K ETHFI | −$430.3K | per-day (100%) | 0.0000% |

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
| 2026-09-29 | 0 | 9.2K | −9.2K | −$6.5K |
| 2026-09-30 | 0 | 9.6K | −9.6K | −$7.4K |
| 2026-10-01 | 0 | 12.9K | −12.9K | −$10.1K |
| 2026-10-02 | 0 | 9.8K | −9.8K | −$7.1K |
| 2026-10-03 | 0 | 9.3K | −9.3K | −$6.5K |
| 2026-10-04 | 0 | 7.1K | −7.1K | −$5.1K |
| 2026-10-05 | 0 | 9.4K | −9.4K | −$7.0K |
| 2026-10-06 | 0 | 10.8K | −10.8K | −$8.0K |
| 2026-10-07 | 0 | 8.7K | −8.7K | −$6.8K |
| 2026-10-08 | 0 | 8.4K | −8.4K | −$6.1K |
| 2026-10-09 | 0 | 9.8K | −9.8K | −$6.7K |
| 2026-10-10 | 0 | 8.6K | −8.6K | −$5.8K |
| 2026-10-11 | 0 | 7.5K | −7.5K | −$5.2K |
| 2026-10-12 | 0 | 8.9K | −8.9K | −$6.6K |


---

## CoW Protocol (COW)

**Price:** $0.12    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 COW | $0 | today @ $0.12 | 0.0000% |
| 30d | ⚠ 10/30d partial | 0 | 1.72M | 🟢 −1.72M COW | −$263.8K | per-day (100%) | 0.0000% |
| 90d | ⚠ 70/90d partial | 0 | 16.40M | 🟢 −16.40M COW | −$2.12M | per-day (100%) | 0.0000% |

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
| 2026-09-28 | 0 | 210.3K | −210.3K | −$33.6K |
| 2026-09-29 | 0 | 228.8K | −228.8K | −$35.4K |
| 2026-09-30 | 0 | 74.3K | −74.3K | −$12.0K |
| 2026-10-01 | 0 | 213.4K | −213.4K | −$35.5K |
| 2026-10-02 | 0 | 270.5K | −270.5K | −$44.3K |
| 2026-10-03 | 0 | 55.6K | −55.6K | −$8.8K |
| 2026-10-04 | 0 | 60.7K | −60.7K | −$9.8K |
| 2026-10-05 | 0 | 165.4K | −165.4K | −$26.2K |
| 2026-10-06 | 0 | 152.1K | −152.1K | −$24.0K |
| 2026-10-07 | 0 | 316.5K | −316.5K | −$49.1K |
| 2026-10-08 | 0 | 430.0K | −430.0K | −$63.1K |
| 2026-10-09 | 0 | 126.4K | −126.4K | −$17.9K |
| 2026-10-10 | 0 | 75.8K | −75.8K | −$11.0K |
| 2026-10-11 | 0 | 64.3K | −64.3K | −$9.6K |


---
