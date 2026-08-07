# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-08-07T09:15:34.990Z
**As-of:** 2026-08-07

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $56.34    **Circulating:** 547.61M HYPE    **AF balance:** 46.27M HYPE    **Total staked:** 436.88M HYPE (79.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 4.3K | 🟢 −67.0K HYPE | −$3.78M | today @ $56.34 | -0.0067% |
| 7d | 7/7d | 9.92M | 95.5K | 🟢 −75.6K HYPE | −$4.26M | today @ $56.34 | -0.0076% |
| 30d | 30/30d | 17.45M | 153.0K | 🟢 −4.04M HYPE | −$227.69M | today @ $56.34 | -0.4041% |
| 90d | 90/90d | 52.34M | 625.3K | 🟢 −10.19M HYPE | −$570.36M | per-day (14%) | -1.0189% |

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
| 2026-07-25 | 0 | 75 | −37.4K | −$2.11M |
| 2026-07-26 | 0 | 1.2K | −158.7K | −$8.94M |
| 2026-07-27 | 0 | 6.0K | −59.5K | −$3.35M |
| 2026-07-28 | 0 | 4.5K | −4.5K | −$252.8K |
| 2026-07-29 | 7.53M | 5.1K | +3.01M | +$169.44M |
| 2026-07-30 | 0 | 949 | −949 | −$53.4K |
| 2026-07-31 | 0 | 1.6K | −715.1K | −$40.29M |
| 2026-08-01 | 0 | 2.9K | −2.9K | −$164.7K |
| 2026-08-02 | 0 | 5.4K | −9.3K | −$522.3K |
| 2026-08-03 | 0 | 20.4K | −639.0K | −$36.00M |
| 2026-08-04 | 0 | 22.1K | −223.1K | −$12.57M |
| 2026-08-05 | 0 | 23.3K | −23.3K | −$1.31M |
| 2026-08-06 | 9.92M | 17.1K | +889.1K | +$50.09M |
| 2026-08-07 | 0 | 4.3K | −67.0K | −$3.78M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-29 | 7.53M | $424.32M |
| 2026-09-06 | 9.92M | $558.71M |
| 2026-09-29 | 7.53M | $424.32M |
| 2026-10-06 | 9.92M | $558.71M |
| 2026-10-29 | 7.53M | $424.32M |
| 2026-11-06 | 9.92M | $558.71M |
| 2026-11-29 | 7.53M | $424.32M |
| 2026-12-06 | 9.92M | $558.71M |


---

## Aave (AAVE)

**Price:** $90.88    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −410 AAVE | −$37.2K | today @ $90.88 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −115.4K AAVE | −$10.49M | today @ $90.88 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −229.9K AAVE | −$20.90M | today @ $90.88 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −270.6K AAVE | −$24.59M | today @ $90.88 | 0.0000% |

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
| 2026-07-25 | 0 | 0 | 0 | $0 |
| 2026-07-26 | 0 | 0 | −844 | −$76.7K |
| 2026-07-27 | 0 | 0 | −32 | −$2.9K |
| 2026-07-28 | 0 | 0 | −1.7K | −$151.0K |
| 2026-07-29 | 0 | 0 | −80.7K | −$7.33M |
| 2026-07-30 | 0 | 0 | 0 | $0 |
| 2026-07-31 | 0 | 0 | 0 | $0 |
| 2026-08-01 | 0 | 0 | −110.3K | −$10.02M |
| 2026-08-02 | 0 | 0 | −3.0K | −$274.1K |
| 2026-08-03 | 0 | 0 | −976 | −$88.7K |
| 2026-08-04 | 0 | 0 | −355 | −$32.2K |
| 2026-08-05 | 0 | 0 | −128 | −$11.6K |
| 2026-08-06 | 0 | 0 | −269 | −$24.5K |
| 2026-08-07 | 0 | 0 | −410 | −$37.2K |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −905.9K SKY | −$49.8K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.18M SKY | −$394.7K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −41.42M SKY | −$2.28M | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −66.65M SKY | −$3.66M | today @ $0.05 | 0.0000% |

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
| 2026-07-25 | 0 | 0 | −445.3K | −$24.5K |
| 2026-07-26 | 0 | 0 | 0 | $0 |
| 2026-07-27 | 0 | 0 | −259.6K | −$14.3K |
| 2026-07-28 | 0 | 0 | −1.24M | −$67.9K |
| 2026-07-29 | 0 | 0 | −5.68M | −$312.4K |
| 2026-07-30 | 0 | 0 | −3.95M | −$217.2K |
| 2026-07-31 | 0 | 0 | −86.5K | −$4.8K |
| 2026-08-01 | 0 | 0 | −553.0K | −$30.4K |
| 2026-08-02 | 0 | 0 | −2.23M | −$122.4K |
| 2026-08-03 | 0 | 0 | −3.27M | −$179.8K |
| 2026-08-04 | 0 | 0 | −221.5K | −$12.2K |
| 2026-08-05 | 0 | 0 | 0 | $0 |
| 2026-08-06 | 0 | 0 | 0 | $0 |
| 2026-08-07 | 0 | 0 | −905.9K | −$49.8K |


---

## Lighter (LIT)

**Price:** $2.35    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.35 | 0.0000% |
| 7d | 6/7d | 0 | 140.1K | 🟢 −140.1K LIT | −$288.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 825.4K | 🟢 −825.4K LIT | −$1.86M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.26M | 🟢 −4.26M LIT | −$6.73M | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 28.2K | −28.2K | −$60.9K |
| 2026-07-25 | 0 | 13.6K | −13.6K | −$27.6K |
| 2026-07-26 | 0 | 17.8K | −17.8K | −$36.7K |
| 2026-07-27 | 0 | 55.0K | −55.0K | −$118.0K |
| 2026-07-28 | 0 | 41.0K | −41.0K | −$87.3K |
| 2026-07-29 | 0 | 45.2K | −45.2K | −$104.5K |
| 2026-07-30 | 0 | 52.4K | −52.4K | −$113.5K |
| 2026-07-31 | 0 | 49.6K | −49.6K | −$113.4K |
| 2026-08-01 | 0 | 20.1K | −20.1K | −$41.5K |
| 2026-08-02 | 0 | 16.9K | −16.9K | −$34.2K |
| 2026-08-03 | 0 | 27.6K | −27.6K | −$56.1K |
| 2026-08-04 | 0 | 27.8K | −27.8K | −$55.5K |
| 2026-08-05 | 0 | 24.3K | −24.3K | −$50.2K |
| 2026-08-06 | 0 | 23.3K | −23.3K | −$50.9K |


---

## Morpho (MORPHO)

**Price:** $1.88    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$183.0K | today @ $1.88 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.28M | today @ $1.88 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.49M | today @ $1.88 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$16.47M | today @ $1.88 | 0.0000% |

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
| 2026-07-25 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-26 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-27 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-28 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-29 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-30 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-07-31 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-01 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-02 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-03 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-04 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-05 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-06 | 202.7K | 0 | +97.4K | +$183.0K |
| 2026-08-07 | 202.7K | 0 | +97.4K | +$183.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 202.7K | $381.0K |
| 2026-08-09 | 202.7K | $381.0K |
| 2026-08-10 | 202.7K | $381.0K |
| 2026-08-11 | 202.7K | $381.0K |
| 2026-08-12 | 202.7K | $381.0K |
| 2026-08-13 | 202.7K | $381.0K |
| 2026-08-14 | 202.7K | $381.0K |
| 2026-08-15 | 202.7K | $381.0K |


---

## Pendle (PENDLE)

**Price:** $1.37    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.37 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.37 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.37 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.37 | 0.0000% |

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

**Price:** $0.50    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$106.7K | today @ $0.50 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$747.0K | today @ $0.50 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.20M | today @ $0.50 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$9.60M | today @ $0.50 | 0.0000% |

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
| 2026-07-25 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-26 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-27 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-28 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-29 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-30 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-07-31 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-01 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-02 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-03 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-04 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-05 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-06 | 626.2K | 0 | +214.3K | +$106.7K |
| 2026-08-07 | 626.2K | 0 | +214.3K | +$106.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 626.2K | $311.8K |
| 2026-08-09 | 626.2K | $311.8K |
| 2026-08-10 | 626.2K | $311.8K |
| 2026-08-11 | 626.2K | $311.8K |
| 2026-08-12 | 626.2K | $311.8K |
| 2026-08-13 | 626.2K | $311.8K |
| 2026-08-14 | 626.2K | $311.8K |
| 2026-08-15 | 626.2K | $311.8K |


---

## Jupiter (JUP)

**Price:** $0.19    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.19 | 0.0000% |
| 7d | 6/7d | 0 | 1.75M | 🟢 −1.75M JUP | −$337.1K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 8.95M | 🔴 +6.61M JUP | +$1.22M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 33.37M | 🔴 +13.29M JUP | +$3.01M | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 335.3K | −335.3K | −$62.7K |
| 2026-07-25 | 0 | 236.0K | −236.0K | −$44.2K |
| 2026-07-26 | 0 | 281.6K | −281.6K | −$52.4K |
| 2026-07-27 | 53.47M | 416.9K | +15.14M | +$2.90M |
| 2026-07-28 | 0 | 415.2K | −415.2K | −$75.4K |
| 2026-07-29 | 0 | 389.1K | −389.1K | −$74.7K |
| 2026-07-30 | 0 | 242.3K | −242.3K | −$47.9K |
| 2026-07-31 | 0 | 267.8K | −267.8K | −$52.2K |
| 2026-08-01 | 0 | 268.0K | −268.0K | −$51.7K |
| 2026-08-02 | 0 | 302.0K | −302.0K | −$58.3K |
| 2026-08-03 | 0 | 339.9K | −339.9K | −$66.2K |
| 2026-08-04 | 0 | 422.4K | −422.4K | −$81.9K |
| 2026-08-05 | 0 | 319.5K | −319.5K | −$60.1K |
| 2026-08-06 | 0 | 99.8K | −99.8K | −$18.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-27 | 53.47M | $9.99M |
| 2026-09-27 | 53.47M | $9.99M |
| 2026-10-27 | 53.47M | $9.99M |
| 2026-11-27 | 53.47M | $9.99M |
| 2026-12-27 | 53.47M | $9.99M |
| 2027-01-27 | 53.47M | $9.99M |
| 2027-02-27 | 53.47M | $9.99M |
| 2027-03-27 | 53.47M | $9.99M |


---

## Fluid (FLUID)

**Price:** $1.20    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.3K | today @ $1.20 | 0.0000% |
| 7d | ⚠ 0/7d partial | 563.9K | 0 | 🔴 +169.2K FLUID | +$203.0K | today @ $1.20 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$278.6K | today @ $1.20 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$835.9K | today @ $1.20 | 0.0000% |

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
| 2026-07-25 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-26 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-27 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-28 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-29 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-30 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-07-31 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-01 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-02 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-03 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-04 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-05 | 509.1K | 0 | +152.7K | +$183.3K |
| 2026-08-06 | 9.1K | 0 | +2.7K | +$3.3K |
| 2026-08-07 | 9.1K | 0 | +2.7K | +$3.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 9.1K | $11.0K |
| 2026-08-09 | 9.1K | $11.0K |
| 2026-08-10 | 9.1K | $11.0K |
| 2026-08-11 | 9.1K | $11.0K |
| 2026-08-12 | 9.1K | $11.0K |
| 2026-08-13 | 9.1K | $11.0K |
| 2026-08-14 | 9.1K | $11.0K |
| 2026-08-15 | 9.1K | $11.0K |


---

## Collector Crypt (CARDS)

**Price:** $0.15    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.15 | 0.0000% |
| 7d | 6/7d | 14.25M | 15.67M | 🟢 −4.28M CARDS | −$698.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 14.25M | 69.14M | 🟢 −57.74M CARDS | −$8.57M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 42.76M | 183.27M | 🟢 −149.09M CARDS | −$25.52M | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 2.81M | −2.81M | −$357.4K |
| 2026-07-25 | 0 | 2.26M | −2.26M | −$276.4K |
| 2026-07-26 | 0 | 1.21M | −1.21M | −$147.3K |
| 2026-07-27 | 0 | 2.23M | −2.23M | −$264.6K |
| 2026-07-28 | 0 | 1.91M | −1.91M | −$260.8K |
| 2026-07-29 | 0 | 4.53M | −4.53M | −$599.7K |
| 2026-07-30 | 0 | 2.67M | −2.67M | −$344.3K |
| 2026-07-31 | 0 | 1.64M | −1.64M | −$267.5K |
| 2026-08-01 | 14.25M | 2.31M | +9.09M | +$1.30M |
| 2026-08-02 | 0 | 3.35M | −3.35M | −$462.0K |
| 2026-08-03 | 0 | 4.81M | −4.81M | −$695.9K |
| 2026-08-04 | 0 | 1.68M | −1.68M | −$261.3K |
| 2026-08-05 | 0 | 1.47M | −1.47M | −$242.8K |
| 2026-08-06 | 0 | 2.07M | −2.07M | −$337.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-01 | 44.67M | $6.78M |
| 2026-10-01 | 44.67M | $6.78M |
| 2026-11-01 | 44.67M | $6.78M |
| 2026-12-01 | 44.67M | $6.78M |
| 2027-01-01 | 44.67M | $6.78M |
| 2027-02-01 | 44.67M | $6.78M |
| 2027-03-01 | 44.67M | $6.78M |
| 2027-04-01 | 44.67M | $6.78M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$361.7K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 5/7d partial | 2.52B | 1.52B | 🟢 −395.71M PUMP | −$819.5K | per-day (71%) | 0.0000% |
| 30d | 28/30d | 20.80B | 8.06B | 🟢 −250.11M PUMP | −$1.75M | per-day (93%) | 0.0000% |
| 90d | 88/90d | 43.68B | 25.15B | 🟢 −10.05B PUMP | −$16.75M | per-day (98%) | 0.0000% |

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
| 2026-07-25 | 359.91M | 290.24M | −129.93M | −$237.9K |
| 2026-07-26 | 359.91M | 330.09M | −169.78M | −$302.3K |
| 2026-07-27 | 359.91M | 344.54M | −184.23M | −$367.4K |
| 2026-07-28 | 359.91M | 313.27M | −152.96M | −$323.6K |
| 2026-07-29 | 359.91M | 341.82M | −181.51M | −$358.4K |
| 2026-07-30 | 359.91M | 379.41M | −219.11M | −$407.7K |
| 2026-07-31 | 359.91M | 332.88M | −172.57M | −$343.4K |
| 2026-08-01 | 359.91M | 261.75M | −101.44M | −$210.2K |
| 2026-08-02 | 359.91M | 247.58M | −87.28M | −$184.8K |
| 2026-08-03 | 359.91M | 353.61M | −193.30M | −$401.8K |
| 2026-08-04 | 359.91M | 382.55M | −222.24M | −$473.5K |
| 2026-08-05 | 359.91M | 272.38M | −112.08M | −$272.6K |
| 2026-08-06 | 359.91M | 0 | +160.31M | +$361.7K |
| 2026-08-07 | 359.91M | 0 | +160.31M | +$361.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 359.91M | $812.1K |
| 2026-08-09 | 359.91M | $812.1K |
| 2026-08-10 | 359.91M | $812.1K |
| 2026-08-11 | 359.91M | $812.1K |
| 2026-08-12 | 10.36B | $23.38M |
| 2026-08-13 | 359.91M | $812.1K |
| 2026-08-14 | 359.91M | $812.1K |
| 2026-08-15 | 359.91M | $812.1K |


---

## LayerZero (ZRO)

**Price:** $0.82    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.82 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.82 | 0.0000% |
| 30d | ⚠ 0/30d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$9.36M | today @ $0.82 | 0.0000% |
| 90d | ⚠ 3/90d partial | 70.89M | 388.5K | 🔴 +34.00M ZRO | +$27.65M | per-day (50%) | 0.0000% |

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
| 2026-02-16 | 0 | 213.1K | −213.1K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.36M |
| 2026-03-08 | 0 | 133.3K | −133.3K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.36M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.36M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.36M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.36M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$9.36M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-20 | 23.63M | $19.29M |
| 2026-09-20 | 23.63M | $19.29M |
| 2026-10-20 | 23.63M | $19.29M |
| 2026-11-20 | 23.63M | $19.29M |
| 2026-12-20 | 23.63M | $19.29M |
| 2027-01-20 | 23.63M | $19.29M |
| 2027-02-20 | 23.63M | $19.29M |
| 2027-03-20 | 23.63M | $19.29M |


---

## Ethena (ENA)

**Price:** $0.10    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$394.1K | today @ $0.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.76M | today @ $0.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$11.82M | today @ $0.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$35.47M | today @ $0.10 | 0.0000% |

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
| 2026-07-25 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-26 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-27 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-28 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-29 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-30 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-07-31 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-01 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-02 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-03 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-04 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-05 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-06 | 10.75M | 0 | +4.11M | +$394.1K |
| 2026-08-07 | 10.75M | 0 | +4.11M | +$394.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 10.75M | $1.03M |
| 2026-08-09 | 10.75M | $1.03M |
| 2026-08-10 | 10.75M | $1.03M |
| 2026-08-11 | 10.75M | $1.03M |
| 2026-08-12 | 10.75M | $1.03M |
| 2026-08-13 | 10.75M | $1.03M |
| 2026-08-14 | 10.75M | $1.03M |
| 2026-08-15 | 10.75M | $1.03M |


---

## Aerodrome (AERO)

**Price:** $0.44    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.44 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.44 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.44 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.44 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$8.8K | today @ $0.11 | 0.0000% |
| 7d | ⚠ 5/7d partial | 1.33M | 263.7K | 🔴 +274.8K DYDX | +$31.4K | per-day (71%) | 0.0000% |
| 30d | 28/30d | 5.68M | 1.79M | 🔴 +514.0K DYDX | +$60.1K | per-day (93%) | 0.0000% |
| 90d | 83/90d | 17.04M | 4.19M | 🔴 +2.73M DYDX | +$377.1K | per-day (92%) | 0.0000% |

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
| 2026-07-25 | 189.4K | 14.5K | +62.4K | +$7.7K |
| 2026-07-26 | 189.4K | 21.0K | +55.9K | +$6.9K |
| 2026-07-27 | 189.4K | 49.7K | +27.3K | +$3.5K |
| 2026-07-28 | 189.4K | 74.1K | +2.8K | +$329.53 |
| 2026-07-29 | 189.4K | 41.0K | +36.0K | +$4.2K |
| 2026-07-30 | 189.4K | 40.0K | +36.9K | +$4.1K |
| 2026-07-31 | 189.4K | 62.2K | +14.7K | +$1.6K |
| 2026-08-01 | 189.4K | 14.3K | +62.7K | +$7.1K |
| 2026-08-02 | 189.4K | 19.0K | +58.0K | +$6.6K |
| 2026-08-03 | 189.4K | 51.7K | +25.2K | +$2.8K |
| 2026-08-04 | 189.4K | 43.9K | +33.0K | +$3.7K |
| 2026-08-05 | 189.4K | 134.8K | −57.9K | −$6.5K |
| 2026-08-06 | 189.4K | 0 | +76.9K | +$8.8K |
| 2026-08-07 | 189.4K | 0 | +76.9K | +$8.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 189.4K | $21.7K |
| 2026-08-09 | 189.4K | $21.7K |
| 2026-08-10 | 189.4K | $21.7K |
| 2026-08-11 | 189.4K | $21.7K |
| 2026-08-12 | 189.4K | $21.7K |
| 2026-08-13 | 189.4K | $21.7K |
| 2026-08-14 | 189.4K | $21.7K |
| 2026-08-15 | 189.4K | $21.7K |


---

## Meteora (MET)

**Price:** $0.17    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$18.8K | today @ $0.17 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$131.7K | today @ $0.17 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$564.6K | today @ $0.17 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.69M | today @ $0.17 | 0.0000% |

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
| 2026-07-25 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-26 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-27 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-28 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-29 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-30 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-07-31 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-01 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-02 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-03 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-04 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-05 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-06 | 291.3K | 0 | +110.1K | +$18.8K |
| 2026-08-07 | 291.3K | 0 | +110.1K | +$18.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 291.3K | $49.8K |
| 2026-08-09 | 291.3K | $49.8K |
| 2026-08-10 | 291.3K | $49.8K |
| 2026-08-11 | 291.3K | $49.8K |
| 2026-08-12 | 291.3K | $49.8K |
| 2026-08-13 | 291.3K | $49.8K |
| 2026-08-14 | 291.3K | $49.8K |
| 2026-08-15 | 291.3K | $49.8K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.5K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$17.7K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$75.7K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$227.0K | today @ $0.02 | 0.0000% |

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
| 2026-07-25 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-26 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-27 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-28 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-29 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-30 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-07-31 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-01 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-02 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-03 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-04 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-05 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-06 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-07 | 347.8K | 0 | +118.1K | +$2.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 347.8K | $7.4K |
| 2026-08-09 | 347.8K | $7.4K |
| 2026-08-10 | 347.8K | $7.4K |
| 2026-08-11 | 347.8K | $7.4K |
| 2026-08-12 | 347.8K | $7.4K |
| 2026-08-13 | 347.8K | $7.4K |
| 2026-08-14 | 347.8K | $7.4K |
| 2026-08-15 | 347.8K | $7.4K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$27.1K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$116.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 59.29M | 0 | 🔴 +28.30M DRIFT | +$362.4K | today @ $0.01 | 0.0000% |

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
| 2026-07-25 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-26 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-27 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-28 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-29 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-30 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-31 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-01 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-02 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-03 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-04 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-05 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-06 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-07 | 644.2K | 0 | +302.8K | +$3.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-08 | 644.2K | $8.3K |
| 2026-08-09 | 644.2K | $8.3K |
| 2026-08-10 | 644.2K | $8.3K |
| 2026-08-11 | 644.2K | $8.3K |
| 2026-08-12 | 644.2K | $8.3K |
| 2026-08-13 | 644.2K | $8.3K |
| 2026-08-14 | 644.2K | $8.3K |
| 2026-08-15 | 644.2K | $8.3K |


---

## Uniswap (UNI)

**Price:** $4.04    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.04 | 0.0000% |
| 7d | 6/7d | 0 | 348.4K | 🟢 −348.4K UNI | −$1.41M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.24M | 🟢 −1.24M UNI | −$4.73M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.22M | 🟢 −4.22M UNI | −$13.67M | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 22.3K | −22.3K | −$83.6K |
| 2026-07-25 | 0 | 15.5K | −15.5K | −$58.7K |
| 2026-07-26 | 0 | 19.0K | −19.0K | −$69.7K |
| 2026-07-27 | 0 | 63.1K | −63.1K | −$245.1K |
| 2026-07-28 | 0 | 91.6K | −91.6K | −$339.7K |
| 2026-07-29 | 0 | 108.7K | −108.7K | −$423.5K |
| 2026-07-30 | 0 | 66.3K | −66.3K | −$264.3K |
| 2026-07-31 | 0 | 59.2K | −59.2K | −$262.6K |
| 2026-08-01 | 0 | 34.0K | −34.0K | −$147.9K |
| 2026-08-02 | 0 | 38.9K | −38.9K | −$159.0K |
| 2026-08-03 | 0 | 59.4K | −59.4K | −$247.4K |
| 2026-08-04 | 0 | 59.3K | −59.3K | −$231.6K |
| 2026-08-05 | 0 | 72.5K | −72.5K | −$278.8K |
| 2026-08-06 | 0 | 84.3K | −84.3K | −$340.7K |


---

## Raydium (RAY)

**Price:** $0.62    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.62 | 0.0000% |
| 7d | 6/7d | 0 | 280.7K | 🟢 −280.7K RAY | −$172.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 687.5K | 🟢 −687.5K RAY | −$440.0K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.44M | 🟢 −2.44M RAY | −$1.62M | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 15.0K | −15.0K | −$9.6K |
| 2026-07-25 | 0 | 11.0K | −11.0K | −$6.8K |
| 2026-07-26 | 0 | 12.5K | −12.5K | −$7.8K |
| 2026-07-27 | 0 | 33.5K | −33.5K | −$21.4K |
| 2026-07-28 | 0 | 21.6K | −21.6K | −$13.0K |
| 2026-07-29 | 0 | 21.9K | −21.9K | −$13.3K |
| 2026-07-30 | 0 | 19.8K | −19.8K | −$11.9K |
| 2026-07-31 | 0 | 20.6K | −20.6K | −$12.6K |
| 2026-08-01 | 0 | 12.7K | −12.7K | −$7.6K |
| 2026-08-02 | 0 | 18.6K | −18.6K | −$11.2K |
| 2026-08-03 | 0 | 26.2K | −26.2K | −$16.0K |
| 2026-08-04 | 0 | 55.5K | −55.5K | −$33.9K |
| 2026-08-05 | 0 | 59.2K | −59.2K | −$36.4K |
| 2026-08-06 | 0 | 108.6K | −108.6K | −$67.2K |


---

## Euler (EUL)

**Price:** $1.25    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.25 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.25 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.25 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.25 | 0.0000% |

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

**Price:** $0.50    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.50 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 20.2K | 🟢 −20.2K GNS | −$10.0K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 149.6K | 🟢 −149.6K GNS | −$83.3K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 840.2K | 🟢 −840.2K GNS | −$439.6K | per-day (100%) | 0.0000% |

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
| 2026-07-23 | 0 | 4.3K | −4.3K | −$2.4K |
| 2026-07-24 | 0 | 4.2K | −4.2K | −$2.3K |
| 2026-07-25 | 0 | 2.5K | −2.5K | −$1.3K |
| 2026-07-26 | 0 | 6.3K | −6.3K | −$3.4K |
| 2026-07-27 | 0 | 12.0K | −12.0K | −$6.4K |
| 2026-07-28 | 0 | 6.5K | −6.5K | −$3.2K |
| 2026-07-29 | 0 | 8.2K | −8.2K | −$4.0K |
| 2026-07-30 | 0 | 4.1K | −4.1K | −$2.0K |
| 2026-07-31 | 0 | 8.3K | −8.3K | −$4.1K |
| 2026-08-01 | 0 | 2.1K | −2.1K | −$1.0K |
| 2026-08-02 | 0 | 5.1K | −5.1K | −$2.5K |
| 2026-08-03 | 0 | 3.8K | −3.8K | −$1.9K |
| 2026-08-04 | 0 | 3.9K | −3.9K | −$1.9K |
| 2026-08-05 | 0 | 5.3K | −5.3K | −$2.6K |


---

## Orca (ORCA)

**Price:** $1.08    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 1.4K | 🟢 −1.4K ORCA | −$1.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 9.5K | 🟢 −9.5K ORCA | −$10.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 43.2K | 🟢 −43.2K ORCA | −$50.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 183.5K | 🟢 −183.5K ORCA | −$222.1K | per-day (100%) | 0.0000% |

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
| 2026-07-25 | 0 | 637 | −637 | −$746.00 |
| 2026-07-26 | 0 | 841 | −841 | −$995.00 |
| 2026-07-27 | 0 | 2.0K | −2.0K | −$2.4K |
| 2026-07-28 | 0 | 1.4K | −1.4K | −$1.7K |
| 2026-07-29 | 0 | 1.9K | −1.9K | −$2.2K |
| 2026-07-30 | 0 | 1.3K | −1.3K | −$1.4K |
| 2026-07-31 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-08-01 | 0 | 1.1K | −1.1K | −$1.2K |
| 2026-08-02 | 0 | 1.0K | −1.0K | −$1.1K |
| 2026-08-03 | 0 | 1.4K | −1.4K | −$1.5K |
| 2026-08-04 | 0 | 1.6K | −1.6K | −$1.7K |
| 2026-08-05 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-08-06 | 0 | 1.3K | −1.3K | −$1.5K |
| 2026-08-07 | 0 | 1.4K | −1.4K | −$1.5K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 63.8K | 🟢 −63.8K MNDE | −$1.2K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.20M | 🟢 −1.20M MNDE | −$22.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 5.34M | 🟢 −5.34M MNDE | −$100.4K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 14.46M | 🟢 −14.46M MNDE | −$274.4K | per-day (100%) | 0.0000% |

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
| 2026-07-25 | 0 | 192.0K | −192.0K | −$3.6K |
| 2026-07-26 | 0 | 197.4K | −197.4K | −$3.7K |
| 2026-07-27 | 0 | 183.5K | −183.5K | −$3.6K |
| 2026-07-28 | 0 | 189.5K | −189.5K | −$3.5K |
| 2026-07-29 | 0 | 191.3K | −191.3K | −$3.6K |
| 2026-07-30 | 0 | 195.9K | −195.9K | −$3.6K |
| 2026-07-31 | 0 | 190.1K | −190.1K | −$3.5K |
| 2026-08-01 | 0 | 187.3K | −187.3K | −$3.5K |
| 2026-08-02 | 0 | 191.0K | −191.0K | −$3.5K |
| 2026-08-03 | 0 | 191.5K | −191.5K | −$3.5K |
| 2026-08-04 | 0 | 195.4K | −195.4K | −$3.6K |
| 2026-08-05 | 0 | 192.8K | −192.8K | −$3.6K |
| 2026-08-06 | 0 | 174.6K | −174.6K | −$3.2K |
| 2026-08-07 | 0 | 63.8K | −63.8K | −$1.2K |


---

## ether.fi (ETHFI)

**Price:** $0.37    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.37 | 0.0000% |
| 7d | 6/7d | 0 | 89.5K | 🟢 −89.5K ETHFI | −$34.8K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 373.1K | 🟢 −373.1K ETHFI | −$153.7K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 1.09M | 🟢 −1.09M ETHFI | −$410.6K | per-day (100%) | 0.0000% |

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
| 2026-07-24 | 0 | 11.5K | −11.5K | −$5.2K |
| 2026-07-25 | 0 | 10.7K | −10.7K | −$4.5K |
| 2026-07-26 | 0 | 9.4K | −9.4K | −$3.8K |
| 2026-07-27 | 0 | 12.9K | −12.9K | −$5.5K |
| 2026-07-28 | 0 | 12.7K | −12.7K | −$5.3K |
| 2026-07-29 | 0 | 13.3K | −13.3K | −$5.6K |
| 2026-07-30 | 0 | 12.9K | −12.9K | −$5.2K |
| 2026-07-31 | 0 | 13.1K | −13.1K | −$5.2K |
| 2026-08-01 | 0 | 15.4K | −15.4K | −$6.4K |
| 2026-08-02 | 0 | 12.2K | −12.2K | −$4.8K |
| 2026-08-03 | 0 | 14.4K | −14.4K | −$5.8K |
| 2026-08-04 | 0 | 15.1K | −15.1K | −$6.1K |
| 2026-08-05 | 0 | 15.7K | −15.7K | −$5.6K |
| 2026-08-06 | 0 | 16.7K | −16.7K | −$6.2K |


---

## CoW Protocol (COW)

**Price:** $0.11    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.11 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 863.5K | 🟢 −863.5K COW | −$98.6K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 4.29M | 🟢 −4.29M COW | −$560.4K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 18.56M | 🟢 −18.56M COW | −$2.72M | per-day (100%) | 0.0000% |

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
| 2026-07-20 | 0 | 185.5K | −185.5K | −$24.6K |
| 2026-07-21 | 0 | 174.2K | −174.2K | −$23.3K |
| 2026-07-22 | 0 | 121.9K | −121.9K | −$16.8K |
| 2026-07-23 | 0 | 159.5K | −159.5K | −$21.9K |
| 2026-07-24 | 0 | 134.7K | −134.7K | −$18.0K |
| 2026-07-26 | 0 | 120.8K | −120.8K | −$15.9K |
| 2026-07-27 | 0 | 204.5K | −204.5K | −$27.5K |
| 2026-07-28 | 0 | 182.9K | −182.9K | −$23.6K |
| 2026-07-29 | 0 | 140.1K | −140.1K | −$17.6K |
| 2026-07-30 | 0 | 138.3K | −138.3K | −$16.1K |
| 2026-07-31 | 0 | 168.2K | −168.2K | −$19.6K |
| 2026-08-01 | 0 | 78.1K | −78.1K | −$9.1K |
| 2026-08-02 | 0 | 81.1K | −81.1K | −$9.2K |
| 2026-08-03 | 0 | 704.3K | −704.3K | −$80.3K |


---
