# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-05-29T18:15:16.269Z
**As-of:** 2026-05-29

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $61.92    **Circulating:** 502.80M HYPE    **AF balance:** 44.64M HYPE    **Total staked:** 431.69M HYPE (85.9% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 7.53M | 8.1K | 🔴 +2.95M HYPE | +$182.93M | today @ $61.92 | 0.2954% |
| 7d | 7/7d | 7.53M | 101.5K | 🔴 +1.40M HYPE | +$86.79M | today @ $61.92 | 0.1402% |
| 30d | 30/30d | 17.45M | 681.0K | 🔴 +1.81M HYPE | +$105.63M | per-day (77%) | 0.1814% |
| 90d | 90/90d | 59.88M | 2.89M | 🔴 +10.63M HYPE | +$421.32M | per-day (92%) | 1.0627% |

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
| 2026-05-16 | 0 | 23.6K | −23.6K | −$1.04M |
| 2026-05-17 | 0 | 24.3K | −24.3K | −$1.02M |
| 2026-05-18 | 0 | 2.2K | −2.2K | −$99.7K |
| 2026-05-19 | 0 | 2.6K | −2.6K | −$127.3K |
| 2026-05-20 | 0 | 3.1K | −3.1K | −$146.8K |
| 2026-05-21 | 0 | 977 | −977 | −$54.1K |
| 2026-05-22 | 0 | 14.6K | −14.6K | −$844.7K |
| 2026-05-23 | 0 | 1.4K | −28.0K | −$1.74M |
| 2026-05-24 | 0 | 6.7K | −6.7K | −$415.6K |
| 2026-05-25 | 0 | 922 | −257.2K | −$15.92M |
| 2026-05-26 | 0 | 25.1K | −25.1K | −$1.55M |
| 2026-05-27 | 0 | 25.9K | −571.0K | −$35.35M |
| 2026-05-28 | 0 | 33.3K | −664.7K | −$41.16M |
| 2026-05-29 | 7.53M | 8.1K | +2.95M | +$182.93M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-06 | 9.92M | $614.04M |
| 2026-06-29 | 7.53M | $466.34M |
| 2026-07-06 | 9.92M | $614.04M |
| 2026-07-29 | 7.53M | $466.34M |
| 2026-08-06 | 9.92M | $614.04M |
| 2026-08-29 | 7.53M | $466.34M |
| 2026-09-06 | 9.92M | $614.04M |
| 2026-09-29 | 7.53M | $466.34M |


---

## Aave (AAVE)

**Price:** $81.52    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −3.6K AAVE | −$295.2K | today @ $81.52 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.5K AAVE | −$613.2K | today @ $81.52 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −7.5K AAVE | −$613.2K | today @ $81.52 | 0.0000% |
| 90d | ⚠ 44/90d partial | 0 | 93.1K | 🟢 −100.6K AAVE | −$8.20M | today @ $81.52 | 0.0000% |

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
| 2026-04-10 | 0 | 935 | −935 | −$76.2K |
| 2026-04-11 | 0 | 935 | −935 | −$76.2K |
| 2026-04-12 | 0 | 944 | −944 | −$76.9K |
| 2026-04-13 | 0 | 900 | −900 | −$73.3K |
| 2026-04-14 | 0 | 909 | −909 | −$74.1K |
| 2026-04-15 | 0 | 879 | −879 | −$71.7K |
| 2026-04-16 | 0 | 639 | −639 | −$52.1K |
| 2026-04-17 | 0 | 600 | −600 | −$48.9K |
| 2026-04-18 | 0 | 825 | −825 | −$67.2K |
| 2026-04-19 | 0 | 714 | −714 | −$58.2K |
| 2026-05-26 | 0 | 0 | −103 | −$8.4K |
| 2026-05-27 | 0 | 0 | −3.8K | −$309.5K |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | −3.6K | −$295.2K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −385 SKY | −$25.34 | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −385 SKY | −$25.34 | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −385 SKY | −$25.34 | today @ $0.07 | 0.0000% |

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

### Recent daily series (last 4 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-26 | 0 | 0 | −385 | −$25.34 |
| 2026-05-27 | 0 | 0 | 0 | $0 |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.16    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.16 | 0.0000% |
| 7d | 6/7d | 0 | 331.6K | 🟢 −331.6K LIT | −$407.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.92M | 🟢 −1.92M LIT | −$1.96M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 6.82M | 🟢 −6.82M LIT | −$7.12M | per-day (100%) | 0.0000% |

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
| 2026-05-15 | 0 | 124.7K | −124.7K | −$113.8K |
| 2026-05-16 | 0 | 40.4K | −40.4K | −$34.7K |
| 2026-05-17 | 0 | 57.4K | −57.4K | −$50.5K |
| 2026-05-18 | 0 | 91.3K | −91.3K | −$78.4K |
| 2026-05-19 | 0 | 93.9K | −93.9K | −$89.4K |
| 2026-05-20 | 0 | 67.4K | −67.4K | −$76.2K |
| 2026-05-21 | 0 | 56.7K | −56.7K | −$72.6K |
| 2026-05-22 | 0 | 54.9K | −54.9K | −$78.7K |
| 2026-05-23 | 0 | 69.2K | −69.2K | −$82.3K |
| 2026-05-24 | 0 | 43.9K | −43.9K | −$54.0K |
| 2026-05-25 | 0 | 39.2K | −39.2K | −$50.9K |
| 2026-05-26 | 0 | 62.4K | −62.4K | −$85.1K |
| 2026-05-27 | 0 | 55.8K | −55.8K | −$66.5K |
| 2026-05-28 | 0 | 61.0K | −61.0K | −$68.6K |


---

## Morpho (MORPHO)

**Price:** $2.02    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$196.7K | today @ $2.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.38M | today @ $2.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.90M | today @ $2.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$17.70M | today @ $2.02 | 0.0000% |

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
| 2026-05-16 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-17 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-18 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-19 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-20 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-21 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-22 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-23 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-24 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-25 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-26 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-27 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-28 | 202.7K | 0 | +97.4K | +$196.7K |
| 2026-05-29 | 202.7K | 0 | +97.4K | +$196.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 202.7K | $409.4K |
| 2026-05-31 | 202.7K | $409.4K |
| 2026-06-01 | 202.7K | $409.4K |
| 2026-06-02 | 202.7K | $409.4K |
| 2026-06-03 | 202.7K | $409.4K |
| 2026-06-04 | 202.7K | $409.4K |
| 2026-06-05 | 202.7K | $409.4K |
| 2026-06-06 | 202.7K | $409.4K |


---

## Pendle (PENDLE)

**Price:** $1.39    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.39 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.39 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.39 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.39 | 0.0000% |

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

**Price:** $0.52    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$110.7K | today @ $0.52 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$775.0K | today @ $0.52 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.32M | today @ $0.52 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$9.96M | today @ $0.52 | 0.0000% |

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
| 2026-05-16 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-17 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-18 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-19 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-20 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-21 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-22 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-23 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-24 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-25 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-26 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-27 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-28 | 626.2K | 0 | +214.3K | +$110.7K |
| 2026-05-29 | 626.2K | 0 | +214.3K | +$110.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 626.2K | $323.5K |
| 2026-05-31 | 626.2K | $323.5K |
| 2026-06-01 | 626.2K | $323.5K |
| 2026-06-02 | 626.2K | $323.5K |
| 2026-06-03 | 626.2K | $323.5K |
| 2026-06-04 | 626.2K | $323.5K |
| 2026-06-05 | 626.2K | $323.5K |
| 2026-06-06 | 626.2K | $323.5K |


---

## Jupiter (JUP)

**Price:** $0.18    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 70 | 🟢 −70 JUP | −$13.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 53.47M | 1.98M | 🔴 +13.57M JUP | +$2.69M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 9.72M | 🔴 +5.83M JUP | +$1.08M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 38.68M | 🔴 +7.97M JUP | +$1.47M | per-day (100%) | 0.0000% |

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
| 2026-05-16 | 0 | 356.1K | −356.1K | −$74.8K |
| 2026-05-17 | 0 | 277.8K | −277.8K | −$55.2K |
| 2026-05-18 | 0 | 379.0K | −379.0K | −$73.2K |
| 2026-05-19 | 0 | 260.3K | −260.3K | −$52.0K |
| 2026-05-20 | 0 | 245.3K | −245.3K | −$47.8K |
| 2026-05-21 | 0 | 334.1K | −334.1K | −$71.0K |
| 2026-05-22 | 0 | 390.3K | −390.3K | −$83.4K |
| 2026-05-23 | 0 | 370.0K | −370.0K | −$73.7K |
| 2026-05-24 | 0 | 297.0K | −297.0K | −$63.1K |
| 2026-05-25 | 0 | 228.1K | −228.1K | −$45.8K |
| 2026-05-26 | 0 | 283.5K | −283.5K | −$57.3K |
| 2026-05-27 | 53.47M | 348.4K | +15.20M | +$3.01M |
| 2026-05-28 | 0 | 451.5K | −451.5K | −$85.4K |
| 2026-05-29 | 0 | 70 | −70 | −$13.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-27 | 53.47M | $9.37M |
| 2026-07-27 | 53.47M | $9.37M |
| 2026-08-27 | 53.47M | $9.37M |
| 2026-09-27 | 53.47M | $9.37M |
| 2026-10-27 | 53.47M | $9.37M |
| 2026-11-27 | 53.47M | $9.37M |
| 2026-12-27 | 53.47M | $9.37M |
| 2027-01-27 | 53.47M | $9.37M |


---

## Fluid (FLUID)

**Price:** $1.41    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.9K | today @ $1.41 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$27.0K | today @ $1.41 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$327.4K | today @ $1.41 | 0.0000% |
| 90d | ⚠ 7/90d partial | 2.32M | 215.0K | 🔴 +481.5K FLUID | +$514.5K | per-day (8%) | 0.0000% |

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
| 2026-05-16 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-17 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-18 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-19 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-20 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-21 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-22 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-23 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-24 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-25 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-26 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-27 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-28 | 9.1K | 0 | +2.7K | +$3.9K |
| 2026-05-29 | 9.1K | 0 | +2.7K | +$3.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 9.1K | $12.9K |
| 2026-05-31 | 9.1K | $12.9K |
| 2026-06-01 | 9.1K | $12.9K |
| 2026-06-02 | 9.1K | $12.9K |
| 2026-06-03 | 9.1K | $12.9K |
| 2026-06-04 | 9.1K | $12.9K |
| 2026-06-05 | 509.1K | $717.9K |
| 2026-06-06 | 9.1K | $12.9K |


---

## Collector Crypt (CARDS)

**Price:** $0.18    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.18 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 7.07M | 🟢 −7.07M CARDS | −$1.01M | per-day (100%) | 0.0000% |
| 30d | 28/30d | 14.25M | 49.86M | 🟢 −38.47M CARDS | −$5.22M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 42.76M | 284.58M | 🟢 −250.40M CARDS | −$14.73M | per-day (100%) | 0.0000% |

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
| 2026-05-14 | 0 | 1.43M | −1.43M | −$189.9K |
| 2026-05-15 | 0 | 1.48M | −1.48M | −$201.4K |
| 2026-05-16 | 0 | 1.07M | −1.07M | −$139.3K |
| 2026-05-17 | 0 | 1.24M | −1.24M | −$149.3K |
| 2026-05-18 | 0 | 1.27M | −1.27M | −$131.8K |
| 2026-05-19 | 0 | 3.81M | −3.81M | −$382.9K |
| 2026-05-20 | 0 | 2.14M | −2.14M | −$216.5K |
| 2026-05-21 | 0 | 1.91M | −1.91M | −$267.4K |
| 2026-05-22 | 0 | 2.45M | −2.45M | −$310.9K |
| 2026-05-23 | 0 | 1.32M | −1.32M | −$160.3K |
| 2026-05-24 | 0 | 1.17M | −1.17M | −$137.8K |
| 2026-05-25 | 0 | 2.58M | −2.58M | −$353.9K |
| 2026-05-26 | 0 | 921.4K | −921.4K | −$156.4K |
| 2026-05-28 | 0 | 1.07M | −1.07M | −$199.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-01 | 14.25M | $2.53M |
| 2026-07-01 | 14.25M | $2.53M |
| 2026-08-01 | 14.25M | $2.53M |
| 2026-09-01 | 44.67M | $7.93M |
| 2026-10-01 | 44.67M | $7.93M |
| 2026-11-01 | 44.67M | $7.93M |
| 2026-12-01 | 44.67M | $7.93M |
| 2027-01-01 | 44.67M | $7.93M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PUMP | $0 | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 0 | 1.57B | 🟢 −1.57B PUMP | −$2.77M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 10.00B | 8.37B | 🟢 −5.37B PUMP | −$9.20M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 20.00B | 36.97B | 🟢 −30.97B PUMP | −$56.13M | per-day (100%) | 0.0000% |

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
| 2026-05-15 | 0 | 299.99M | −299.99M | −$565.5K |
| 2026-05-16 | 0 | 291.56M | −291.56M | −$523.1K |
| 2026-05-17 | 0 | 277.65M | −277.65M | −$482.9K |
| 2026-05-18 | 0 | 322.24M | −322.24M | −$547.0K |
| 2026-05-19 | 0 | 296.59M | −296.59M | −$508.7K |
| 2026-05-20 | 0 | 310.48M | −310.48M | −$520.9K |
| 2026-05-21 | 0 | 228.98M | −228.98M | −$398.4K |
| 2026-05-22 | 0 | 256.19M | −256.19M | −$465.1K |
| 2026-05-23 | 0 | 236.46M | −236.46M | −$403.0K |
| 2026-05-24 | 0 | 246.30M | −246.30M | −$437.2K |
| 2026-05-25 | 0 | 283.20M | −283.20M | −$492.1K |
| 2026-05-26 | 0 | 266.32M | −266.32M | −$476.1K |
| 2026-05-27 | 0 | 265.40M | −265.40M | −$477.2K |
| 2026-05-28 | 0 | 271.48M | −271.48M | −$485.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-12 | 10.00B | $16.76M |
| 2026-07-01 | 359.91M | $603.3K |
| 2026-07-02 | 359.91M | $603.3K |
| 2026-07-03 | 359.91M | $603.3K |
| 2026-07-04 | 359.91M | $603.3K |
| 2026-07-05 | 359.91M | $603.3K |
| 2026-07-06 | 359.91M | $603.3K |
| 2026-07-07 | 359.91M | $603.3K |


---

## LayerZero (ZRO)

**Price:** $1.12    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.12 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 150.8K | 🔴 +11.31M ZRO | +$12.63M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 449.0K | 🔴 +33.94M ZRO | +$37.76M | per-day (57%) | 0.0000% |

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
| 2025-11-14 | 0 | 526.6K | −526.6K | −$815.3K |
| 2025-11-29 | 0 | 273.0K | −273.0K | −$370.8K |
| 2025-12-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-01-15 | 0 | 285.6K | −285.6K | −$474.9K |
| 2026-01-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.84M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 23.63M | $26.47M |
| 2026-07-20 | 23.63M | $26.47M |
| 2026-08-20 | 23.63M | $26.47M |
| 2026-09-20 | 23.63M | $26.47M |
| 2026-10-20 | 23.63M | $26.47M |
| 2026-11-20 | 23.63M | $26.47M |
| 2026-12-20 | 23.63M | $26.47M |
| 2027-01-20 | 23.63M | $26.47M |


---

## Ethena (ENA)

**Price:** $0.09    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$353.1K | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.47M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.59M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$31.78M | today @ $0.09 | 0.0000% |

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
| 2026-05-16 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-17 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-18 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-19 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-20 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-21 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-22 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-23 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-24 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-25 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-26 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-27 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-28 | 10.75M | 0 | +4.11M | +$353.1K |
| 2026-05-29 | 10.75M | 0 | +4.11M | +$353.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 10.75M | $923.2K |
| 2026-05-31 | 10.75M | $923.2K |
| 2026-06-01 | 10.75M | $923.2K |
| 2026-06-02 | 10.75M | $923.2K |
| 2026-06-03 | 10.75M | $923.2K |
| 2026-06-04 | 10.75M | $923.2K |
| 2026-06-05 | 10.75M | $923.2K |
| 2026-06-06 | 10.75M | $923.2K |


---

## Aerodrome (AERO)

**Price:** $0.41    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.41 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.41 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.41 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.41 | 0.0000% |

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

**Price:** $0.17    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$13.0K | today @ $0.17 | 0.0000% |
| 7d | 6/7d | 1.33M | 144.4K | 🔴 +394.1K DYDX | +$62.0K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 1.62M | 🔴 +684.2K DYDX | +$106.0K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 5.68M | 7.48M | 🟢 −5.17M DYDX | −$473.4K | per-day (99%) | 0.0000% |

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
| 2026-05-16 | 189.4K | 22.4K | +54.6K | +$8.1K |
| 2026-05-17 | 189.4K | 10.3K | +66.7K | +$9.4K |
| 2026-05-18 | 189.4K | 93.8K | −16.9K | −$2.3K |
| 2026-05-19 | 189.4K | 37.2K | +39.7K | +$5.6K |
| 2026-05-20 | 189.4K | 12.8K | +64.1K | +$9.2K |
| 2026-05-21 | 189.4K | 42.0K | +34.9K | +$5.3K |
| 2026-05-22 | 189.4K | 21.3K | +55.6K | +$8.6K |
| 2026-05-23 | 189.4K | 33.3K | +43.6K | +$6.4K |
| 2026-05-24 | 189.4K | 28.2K | +48.7K | +$7.3K |
| 2026-05-25 | 189.4K | 14.0K | +62.9K | +$9.2K |
| 2026-05-26 | 189.4K | 13.6K | +63.3K | +$9.8K |
| 2026-05-27 | 189.4K | 28.5K | +48.4K | +$8.1K |
| 2026-05-28 | 189.4K | 26.7K | +50.2K | +$8.2K |
| 2026-05-29 | 189.4K | 0 | +76.9K | +$13.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 189.4K | $32.0K |
| 2026-05-31 | 189.4K | $32.0K |
| 2026-06-01 | 189.4K | $32.0K |
| 2026-06-02 | 189.4K | $32.0K |
| 2026-06-03 | 189.4K | $32.0K |
| 2026-06-04 | 189.4K | $32.0K |
| 2026-06-05 | 189.4K | $32.0K |
| 2026-06-06 | 189.4K | $32.0K |


---

## Meteora (MET)

**Price:** $0.13    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$13.9K | today @ $0.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$97.1K | today @ $0.13 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$416.1K | today @ $0.13 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.25M | today @ $0.13 | 0.0000% |

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
| 2026-05-16 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-17 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-18 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-19 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-20 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-21 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-22 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-23 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-24 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-25 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-26 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-27 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-28 | 291.3K | 0 | +110.1K | +$13.9K |
| 2026-05-29 | 291.3K | 0 | +110.1K | +$13.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 291.3K | $36.7K |
| 2026-05-31 | 291.3K | $36.7K |
| 2026-06-01 | 291.3K | $36.7K |
| 2026-06-02 | 291.3K | $36.7K |
| 2026-06-03 | 291.3K | $36.7K |
| 2026-06-04 | 291.3K | $36.7K |
| 2026-06-05 | 291.3K | $36.7K |
| 2026-06-06 | 291.3K | $36.7K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.2K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$15.1K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$64.7K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$194.2K | today @ $0.02 | 0.0000% |

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
| 2026-05-16 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-17 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-18 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-19 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-20 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-21 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-22 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-23 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-24 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-25 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-26 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-27 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-28 | 347.8K | 0 | +118.1K | +$2.2K |
| 2026-05-29 | 347.8K | 0 | +118.1K | +$2.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 347.8K | $6.4K |
| 2026-05-31 | 347.8K | $6.4K |
| 2026-06-01 | 347.8K | $6.4K |
| 2026-06-02 | 347.8K | $6.4K |
| 2026-06-03 | 347.8K | $6.4K |
| 2026-06-04 | 347.8K | $6.4K |
| 2026-06-05 | 347.8K | $6.4K |
| 2026-06-06 | 347.8K | $6.4K |


---

## Drift (DRIFT)

**Price:** $0.03    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$8.3K | today @ $0.03 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$57.8K | today @ $0.03 | 0.0000% |
| 30d | ⚠ 0/30d partial | 22.82M | 0 | 🔴 +11.88M DRIFT | +$323.9K | today @ $0.03 | 0.0000% |
| 90d | ⚠ 0/90d partial | 74.59M | 0 | 🔴 +40.54M DRIFT | +$1.11M | today @ $0.03 | 0.0000% |

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
| 2026-05-16 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-17 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-18 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-19 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-20 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-21 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-22 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-23 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-24 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-25 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-26 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-27 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-28 | 644.2K | 0 | +302.8K | +$8.3K |
| 2026-05-29 | 644.2K | 0 | +302.8K | +$8.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-30 | 644.2K | $17.6K |
| 2026-05-31 | 644.2K | $17.6K |
| 2026-06-01 | 644.2K | $17.6K |
| 2026-06-02 | 644.2K | $17.6K |
| 2026-06-03 | 644.2K | $17.6K |
| 2026-06-04 | 644.2K | $17.6K |
| 2026-06-05 | 644.2K | $17.6K |
| 2026-06-06 | 644.2K | $17.6K |


---

## Uniswap (UNI)

**Price:** $2.98    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $2.98 | 0.0000% |
| 7d | 6/7d | 0 | 201.5K | 🟢 −201.5K UNI | −$665.8K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 821.1K | 🟢 −821.1K UNI | −$2.83M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.82M | 🟢 −2.82M UNI | −$9.79M | per-day (100%) | 0.0000% |

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
| 2026-05-15 | 0 | 32.4K | −32.4K | −$120.7K |
| 2026-05-16 | 0 | 16.2K | −16.2K | −$58.1K |
| 2026-05-17 | 0 | 25.5K | −25.5K | −$88.9K |
| 2026-05-18 | 0 | 34.7K | −34.7K | −$119.6K |
| 2026-05-19 | 0 | 28.7K | −28.7K | −$101.5K |
| 2026-05-20 | 0 | 21.1K | −21.1K | −$72.9K |
| 2026-05-21 | 0 | 30.6K | −30.6K | −$110.6K |
| 2026-05-22 | 0 | 24.6K | −24.6K | −$88.8K |
| 2026-05-23 | 0 | 40.9K | −40.9K | −$138.7K |
| 2026-05-24 | 0 | 26.9K | −26.9K | −$93.2K |
| 2026-05-25 | 0 | 20.1K | −20.1K | −$68.2K |
| 2026-05-26 | 0 | 34.9K | −34.9K | −$115.9K |
| 2026-05-27 | 0 | 41.6K | −41.6K | −$135.2K |
| 2026-05-28 | 0 | 37.1K | −37.1K | −$114.7K |


---

## Raydium (RAY)

**Price:** $0.70    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 24.5K | 🟢 −24.5K RAY | −$17.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 157.6K | 🟢 −157.6K RAY | −$117.7K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 1.08M | 🟢 −1.08M RAY | −$844.6K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.52M | 🟢 −3.52M RAY | −$2.37M | per-day (100%) | 0.0000% |

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
| 2026-05-16 | 0 | 17.9K | −17.9K | −$13.3K |
| 2026-05-17 | 0 | 17.6K | −17.6K | −$12.6K |
| 2026-05-18 | 0 | 29.6K | −29.6K | −$20.6K |
| 2026-05-19 | 0 | 24.0K | −24.0K | −$16.9K |
| 2026-05-20 | 0 | 78.6K | −78.6K | −$55.5K |
| 2026-05-21 | 0 | 24.4K | −24.4K | −$19.1K |
| 2026-05-22 | 0 | 24.5K | −24.5K | −$18.9K |
| 2026-05-23 | 0 | 18.7K | −18.7K | −$14.1K |
| 2026-05-24 | 0 | 15.1K | −15.1K | −$11.7K |
| 2026-05-25 | 0 | 25.0K | −25.0K | −$18.9K |
| 2026-05-26 | 0 | 22.5K | −22.5K | −$17.3K |
| 2026-05-27 | 0 | 23.4K | −23.4K | −$17.5K |
| 2026-05-28 | 0 | 28.4K | −28.4K | −$20.6K |
| 2026-05-29 | 0 | 24.5K | −24.5K | −$17.7K |


---

## Euler (EUL)

**Price:** $1.18    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.18 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.18 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.18 | 0.0000% |
| 90d | ⚠ 42/90d partial | 0 | 143.9K | 🟢 −143.9K EUL | −$135.2K | per-day (100%) | 0.0000% |

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
| 2026-04-03 | 0 | 22.1K | −22.1K | −$20.0K |
| 2026-04-05 | 0 | 333 | −333 | −$310.00 |
| 2026-04-06 | 0 | 1.3K | −1.3K | −$1.2K |
| 2026-04-08 | 0 | 583 | −583 | −$550.00 |
| 2026-04-09 | 0 | 82 | −82 | −$83.00 |
| 2026-04-10 | 0 | 116 | −116 | −$112.00 |
| 2026-04-11 | 0 | 19.1K | −19.1K | −$20.7K |
| 2026-04-12 | 0 | 242 | −242 | −$255.00 |
| 2026-04-13 | 0 | 9 | −9 | −$9.00 |
| 2026-04-15 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-04-18 | 0 | 52 | −52 | −$82.00 |
| 2026-04-19 | 0 | 62 | −62 | −$82.00 |
| 2026-04-21 | 0 | 244 | −244 | −$317.00 |
| 2026-04-25 | 0 | 553 | −553 | −$795.00 |


---

## Gains Network (GNS)

**Price:** $0.46    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.46 | 0.0000% |
| 7d | 6/7d | 0 | 59.8K | 🟢 −59.8K GNS | −$28.3K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 304.4K | 🟢 −304.4K GNS | −$159.0K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 981.4K | 🟢 −981.4K GNS | −$672.7K | per-day (100%) | 0.0000% |

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
| 2026-05-15 | 0 | 11.3K | −11.3K | −$6.4K |
| 2026-05-16 | 0 | 5.9K | −5.9K | −$3.2K |
| 2026-05-17 | 0 | 8.8K | −8.8K | −$4.5K |
| 2026-05-18 | 0 | 11.4K | −11.4K | −$5.4K |
| 2026-05-19 | 0 | 13.1K | −13.1K | −$6.5K |
| 2026-05-20 | 0 | 16.3K | −16.3K | −$7.7K |
| 2026-05-21 | 0 | 12.8K | −12.8K | −$5.8K |
| 2026-05-22 | 0 | 13.3K | −13.3K | −$6.2K |
| 2026-05-23 | 0 | 10.1K | −10.1K | −$4.6K |
| 2026-05-24 | 0 | 6.4K | −6.4K | −$3.2K |
| 2026-05-25 | 0 | 6.9K | −6.9K | −$3.3K |
| 2026-05-26 | 0 | 7.5K | −7.5K | −$3.7K |
| 2026-05-27 | 0 | 10.2K | −10.2K | −$4.8K |
| 2026-05-28 | 0 | 18.7K | −18.7K | −$8.7K |


---

## Orca (ORCA)

**Price:** $1.27    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 1.6K | 🟢 −1.6K ORCA | −$2.1K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 11.5K | 🟢 −11.5K ORCA | −$15.7K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 46.3K | 🟢 −46.3K ORCA | −$71.6K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 236.5K | 🟢 −236.5K ORCA | −$247.4K | per-day (100%) | 0.0000% |

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
| 2026-05-16 | 0 | 1.4K | −1.4K | −$2.0K |
| 2026-05-17 | 0 | 978 | −978 | −$1.5K |
| 2026-05-18 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-19 | 0 | 1.2K | −1.2K | −$1.8K |
| 2026-05-20 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-21 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-22 | 0 | 1.7K | −1.7K | −$2.5K |
| 2026-05-23 | 0 | 1.8K | −1.8K | −$2.5K |
| 2026-05-24 | 0 | 1.3K | −1.3K | −$1.9K |
| 2026-05-25 | 0 | 1.2K | −1.2K | −$1.7K |
| 2026-05-26 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-27 | 0 | 1.9K | −1.9K | −$2.6K |
| 2026-05-28 | 0 | 2.0K | −2.0K | −$2.6K |
| 2026-05-29 | 0 | 1.6K | −1.6K | −$2.1K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 165.7K | 🟢 −165.7K MNDE | −$3.2K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.32M | 🟢 −1.32M MNDE | −$25.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 6.37M | 🟢 −6.37M MNDE | −$127.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 22.91M | 🟢 −22.91M MNDE | −$457.6K | per-day (100%) | 0.0000% |

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
| 2026-05-16 | 0 | 207.7K | −207.7K | −$4.3K |
| 2026-05-17 | 0 | 198.0K | −198.0K | −$4.0K |
| 2026-05-18 | 0 | 210.8K | −210.8K | −$4.3K |
| 2026-05-19 | 0 | 207.3K | −207.3K | −$4.1K |
| 2026-05-20 | 0 | 210.8K | −210.8K | −$4.2K |
| 2026-05-21 | 0 | 208.0K | −208.0K | −$4.1K |
| 2026-05-22 | 0 | 202.9K | −202.9K | −$4.0K |
| 2026-05-23 | 0 | 201.0K | −201.0K | −$3.9K |
| 2026-05-24 | 0 | 207.7K | −207.7K | −$3.9K |
| 2026-05-25 | 0 | 190.0K | −190.0K | −$3.7K |
| 2026-05-26 | 0 | 187.1K | −187.1K | −$3.7K |
| 2026-05-27 | 0 | 185.7K | −185.7K | −$3.6K |
| 2026-05-28 | 0 | 178.7K | −178.7K | −$3.5K |
| 2026-05-29 | 0 | 165.7K | −165.7K | −$3.2K |


---

## ether.fi (ETHFI)

**Price:** $0.39    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 9.8K | 🟢 −9.8K ETHFI | −$3.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 163.2K | 🟢 −163.2K ETHFI | −$61.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 848.2K | 🟢 −848.2K ETHFI | −$349.6K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.26M | 🟢 −2.26M ETHFI | −$1.04M | per-day (100%) | 0.0000% |

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
| 2026-05-16 | 0 | 21.3K | −21.3K | −$8.7K |
| 2026-05-17 | 0 | 31.2K | −31.2K | −$12.0K |
| 2026-05-18 | 0 | 31.5K | −31.5K | −$11.8K |
| 2026-05-19 | 0 | 23.2K | −23.2K | −$8.7K |
| 2026-05-20 | 0 | 28.9K | −28.9K | −$10.7K |
| 2026-05-21 | 0 | 26.2K | −26.2K | −$10.0K |
| 2026-05-22 | 0 | 17.3K | −17.3K | −$6.7K |
| 2026-05-23 | 0 | 31.9K | −31.9K | −$11.6K |
| 2026-05-24 | 0 | 23.7K | −23.7K | −$9.0K |
| 2026-05-25 | 0 | 23.7K | −23.7K | −$8.7K |
| 2026-05-26 | 0 | 26.5K | −26.5K | −$9.9K |
| 2026-05-27 | 0 | 21.8K | −21.8K | −$8.3K |
| 2026-05-28 | 0 | 25.9K | −25.9K | −$10.0K |
| 2026-05-29 | 0 | 9.8K | −9.8K | −$3.9K |


---

## CoW Protocol (COW)

**Price:** $0.16    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.16 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 1.11M | 🟢 −1.11M COW | −$180.9K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 3.64M | 🟢 −3.64M COW | −$635.5K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 14.90M | 🟢 −14.90M COW | −$3.01M | per-day (100%) | 0.0000% |

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
| 2026-05-14 | 0 | 92.4K | −92.4K | −$17.1K |
| 2026-05-15 | 0 | 168.1K | −168.1K | −$31.4K |
| 2026-05-16 | 0 | 85.7K | −85.7K | −$15.2K |
| 2026-05-17 | 0 | 176.7K | −176.7K | −$30.4K |
| 2026-05-18 | 0 | 147.2K | −147.2K | −$24.3K |
| 2026-05-19 | 0 | 112.0K | −112.0K | −$18.5K |
| 2026-05-20 | 0 | 98.2K | −98.2K | −$16.3K |
| 2026-05-21 | 0 | 114.4K | −114.4K | −$19.3K |
| 2026-05-22 | 0 | 139.0K | −139.0K | −$23.8K |
| 2026-05-23 | 0 | 138.3K | −138.3K | −$22.4K |
| 2026-05-24 | 0 | 84.6K | −84.6K | −$14.1K |
| 2026-05-25 | 0 | 204.3K | −204.3K | −$33.1K |
| 2026-05-26 | 0 | 369.7K | −369.7K | −$60.6K |
| 2026-05-27 | 0 | 317.6K | −317.6K | −$50.6K |


---
