# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-06-02T22:35:55.609Z
**As-of:** 2026-06-02

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $68.59    **Circulating:** 502.80M HYPE    **AF balance:** 44.77M HYPE    **Total staked:** 430.28M HYPE (85.6% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 45.0K | 🟢 −776.8K HYPE | −$53.28M | today @ $68.59 | -0.0777% |
| 7d | 7/7d | 7.53M | 118.7K | 🔴 +816.7K HYPE | +$56.02M | today @ $68.59 | 0.0817% |
| 30d | 30/30d | 17.45M | 628.3K | 🔴 +1.02M HYPE | +$57.69M | per-day (63%) | 0.1016% |
| 90d | 90/90d | 52.34M | 2.68M | 🔴 +6.97M HYPE | +$284.46M | per-day (88%) | 0.6969% |

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
| 2026-05-20 | 0 | 3.1K | −3.1K | −$146.8K |
| 2026-05-21 | 0 | 977 | −977 | −$54.1K |
| 2026-05-22 | 0 | 14.6K | −14.6K | −$844.7K |
| 2026-05-23 | 0 | 1.4K | −28.0K | −$1.92M |
| 2026-05-24 | 0 | 6.7K | −6.7K | −$460.4K |
| 2026-05-25 | 0 | 922 | −257.2K | −$17.64M |
| 2026-05-26 | 0 | 12.0K | −12.0K | −$822.4K |
| 2026-05-27 | 0 | 8.4K | −553.4K | −$37.96M |
| 2026-05-28 | 0 | 5.6K | −637.1K | −$43.70M |
| 2026-05-29 | 7.53M | 12.0K | +3.00M | +$205.80M |
| 2026-05-30 | 0 | 3.8K | −172.6K | −$11.84M |
| 2026-05-31 | 0 | 9.4K | −9.4K | −$641.4K |
| 2026-06-01 | 0 | 34.5K | −34.5K | −$2.37M |
| 2026-06-02 | 0 | 45.0K | −776.8K | −$53.28M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-06 | 9.92M | $680.18M |
| 2026-06-29 | 7.53M | $516.57M |
| 2026-07-06 | 9.92M | $680.18M |
| 2026-07-29 | 7.53M | $516.57M |
| 2026-08-06 | 9.92M | $680.18M |
| 2026-08-29 | 7.53M | $516.57M |
| 2026-09-06 | 9.92M | $680.18M |
| 2026-09-29 | 7.53M | $516.57M |


---

## Aave (AAVE)

**Price:** $74.54    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −447 AAVE | −$33.3K | today @ $74.54 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −9.5K AAVE | −$710.6K | today @ $74.54 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −9.6K AAVE | −$718.3K | today @ $74.54 | 0.0000% |
| 90d | ⚠ 40/90d partial | 0 | 36.2K | 🟢 −45.8K AAVE | −$3.42M | today @ $74.54 | 0.0000% |

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
| 2026-04-14 | 0 | 909 | −909 | −$67.8K |
| 2026-04-15 | 0 | 879 | −879 | −$65.5K |
| 2026-04-16 | 0 | 639 | −639 | −$47.6K |
| 2026-04-17 | 0 | 600 | −600 | −$44.7K |
| 2026-04-18 | 0 | 825 | −825 | −$61.5K |
| 2026-04-19 | 0 | 714 | −714 | −$53.2K |
| 2026-05-26 | 0 | 0 | −103 | −$7.7K |
| 2026-05-27 | 0 | 0 | −3.8K | −$283.0K |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | 0 | $0 |
| 2026-05-30 | 0 | 0 | −5.2K | −$387.0K |
| 2026-05-31 | 0 | 0 | −23 | −$1.7K |
| 2026-06-01 | 0 | 0 | −74 | −$5.5K |
| 2026-06-02 | 0 | 0 | −447 | −$33.3K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −461.5K SKY | −$31.0K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −461.9K SKY | −$31.0K | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −461.9K SKY | −$31.0K | today @ $0.07 | 0.0000% |

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

### Recent daily series (last 8 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-26 | 0 | 0 | −385 | −$25.86 |
| 2026-05-27 | 0 | 0 | 0 | $0 |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | 0 | $0 |
| 2026-05-30 | 0 | 0 | 0 | $0 |
| 2026-05-31 | 0 | 0 | −2.2K | −$147.88 |
| 2026-06-01 | 0 | 0 | −459.3K | −$30.9K |
| 2026-06-02 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.57    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.57 | 0.0000% |
| 7d | 6/7d | 0 | 359.8K | 🟢 −359.8K LIT | −$442.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.95M | 🟢 −1.95M LIT | −$2.07M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 6.60M | 🟢 −6.60M LIT | −$6.80M | per-day (100%) | 0.0000% |

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
| 2026-05-29 | 0 | 105.6K | −105.6K | −$123.4K |
| 2026-05-30 | 0 | 37.3K | −37.3K | −$47.0K |
| 2026-05-31 | 0 | 33.8K | −33.8K | −$46.1K |
| 2026-06-01 | 0 | 66.2K | −66.2K | −$90.5K |


---

## Morpho (MORPHO)

**Price:** $1.93    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$187.9K | today @ $1.93 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.32M | today @ $1.93 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.64M | today @ $1.93 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$16.91M | today @ $1.93 | 0.0000% |

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
| 2026-05-20 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-21 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-22 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-23 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-24 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-25 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-26 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-27 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-28 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-29 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-30 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-05-31 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-06-01 | 202.7K | 0 | +97.4K | +$187.9K |
| 2026-06-02 | 202.7K | 0 | +97.4K | +$187.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 202.7K | $391.2K |
| 2026-06-04 | 202.7K | $391.2K |
| 2026-06-05 | 202.7K | $391.2K |
| 2026-06-06 | 202.7K | $391.2K |
| 2026-06-07 | 202.7K | $391.2K |
| 2026-06-08 | 202.7K | $391.2K |
| 2026-06-09 | 202.7K | $391.2K |
| 2026-06-10 | 202.7K | $391.2K |


---

## Pendle (PENDLE)

**Price:** $1.32    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.32 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.32 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.32 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.32 | 0.0000% |

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

**Price:** $0.58    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$123.3K | today @ $0.58 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$863.2K | today @ $0.58 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.70M | today @ $0.58 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$11.10M | today @ $0.58 | 0.0000% |

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
| 2026-05-20 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-21 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-22 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-23 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-24 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-25 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-26 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-27 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-28 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-29 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-30 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-05-31 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-06-01 | 626.2K | 0 | +214.3K | +$123.3K |
| 2026-06-02 | 626.2K | 0 | +214.3K | +$123.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 626.2K | $360.3K |
| 2026-06-04 | 626.2K | $360.3K |
| 2026-06-05 | 626.2K | $360.3K |
| 2026-06-06 | 626.2K | $360.3K |
| 2026-06-07 | 626.2K | $360.3K |
| 2026-06-08 | 626.2K | $360.3K |
| 2026-06-09 | 626.2K | $360.3K |
| 2026-06-10 | 626.2K | $360.3K |


---

## Jupiter (JUP)

**Price:** $0.20    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 465 | 🟢 −465 JUP | −$92.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 53.47M | 2.12M | 🔴 +13.44M JUP | +$2.69M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 9.97M | 🔴 +5.59M JUP | +$1.03M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 37.63M | 🔴 +9.03M JUP | +$1.63M | per-day (100%) | 0.0000% |

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
| 2026-05-20 | 0 | 245.3K | −245.3K | −$47.8K |
| 2026-05-21 | 0 | 334.1K | −334.1K | −$71.0K |
| 2026-05-22 | 0 | 390.3K | −390.3K | −$83.4K |
| 2026-05-23 | 0 | 370.0K | −370.0K | −$73.7K |
| 2026-05-24 | 0 | 297.0K | −297.0K | −$63.1K |
| 2026-05-25 | 0 | 239.9K | −239.9K | −$48.2K |
| 2026-05-26 | 0 | 295.0K | −295.0K | −$59.6K |
| 2026-05-27 | 53.47M | 360.1K | +15.19M | +$3.01M |
| 2026-05-28 | 0 | 462.5K | −462.5K | −$87.4K |
| 2026-05-29 | 0 | 352.5K | −352.5K | −$61.8K |
| 2026-05-30 | 0 | 200.3K | −200.3K | −$37.3K |
| 2026-05-31 | 0 | 302.1K | −302.1K | −$55.7K |
| 2026-06-01 | 0 | 437.5K | −437.5K | −$83.2K |
| 2026-06-02 | 0 | 465 | −465 | −$92.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-27 | 53.47M | $10.55M |
| 2026-07-27 | 53.47M | $10.55M |
| 2026-08-27 | 53.47M | $10.55M |
| 2026-09-27 | 53.47M | $10.55M |
| 2026-10-27 | 53.47M | $10.55M |
| 2026-11-27 | 53.47M | $10.55M |
| 2026-12-27 | 53.47M | $10.55M |
| 2027-01-27 | 53.47M | $10.55M |


---

## Fluid (FLUID)

**Price:** $1.29    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.5K | today @ $1.29 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$24.7K | today @ $1.29 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$299.5K | today @ $1.29 | 0.0000% |
| 90d | ⚠ 7/90d partial | 2.32M | 215.0K | 🔴 +481.5K FLUID | +$433.2K | per-day (8%) | 0.0000% |

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
| 2026-05-20 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-21 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-22 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-23 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-24 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-25 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-26 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-27 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-28 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-29 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-30 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-05-31 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-06-01 | 9.1K | 0 | +2.7K | +$3.5K |
| 2026-06-02 | 9.1K | 0 | +2.7K | +$3.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 9.1K | $11.8K |
| 2026-06-04 | 9.1K | $11.8K |
| 2026-06-05 | 509.1K | $656.8K |
| 2026-06-06 | 9.1K | $11.8K |
| 2026-06-07 | 9.1K | $11.8K |
| 2026-06-08 | 9.1K | $11.8K |
| 2026-06-09 | 9.1K | $11.8K |
| 2026-06-10 | 9.1K | $11.8K |


---

## Collector Crypt (CARDS)

**Price:** $0.20    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.20 | 0.0000% |
| 7d | ⚠ 5/7d partial | 14.25M | 6.25M | 🔴 +5.14M CARDS | +$1.52M | per-day (100%) | 0.0000% |
| 30d | 28/30d | 14.25M | 47.56M | 🟢 −36.17M CARDS | −$3.74M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 42.76M | 281.61M | 🟢 −247.44M CARDS | −$13.16M | per-day (100%) | 0.0000% |

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
| 2026-05-29 | 0 | 834.4K | −834.4K | −$142.7K |
| 2026-05-30 | 0 | 1.58M | −1.58M | −$257.0K |
| 2026-05-31 | 0 | 1.32M | −1.32M | −$238.8K |
| 2026-06-01 | 14.25M | 1.44M | +9.95M | +$2.36M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 14.25M | $2.88M |
| 2026-08-01 | 14.25M | $2.88M |
| 2026-09-01 | 44.67M | $9.02M |
| 2026-10-01 | 44.67M | $9.02M |
| 2026-11-01 | 44.67M | $9.02M |
| 2026-12-01 | 44.67M | $9.02M |
| 2027-01-01 | 44.67M | $9.02M |
| 2027-02-01 | 44.67M | $9.02M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PUMP | $0 | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 0 | 1.60B | 🟢 −1.60B PUMP | −$2.83M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 10.00B | 8.23B | 🟢 −5.23B PUMP | −$8.91M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 20.00B | 36.11B | 🟢 −30.11B PUMP | −$54.28M | per-day (100%) | 0.0000% |

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
| 2026-05-29 | 0 | 281.27M | −281.27M | −$478.3K |
| 2026-05-30 | 0 | 246.44M | −246.44M | −$425.0K |
| 2026-05-31 | 0 | 240.72M | −240.72M | −$427.4K |
| 2026-06-01 | 0 | 297.81M | −297.81M | −$533.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-12 | 10.00B | $16.69M |
| 2026-07-01 | 359.91M | $600.8K |
| 2026-07-02 | 359.91M | $600.8K |
| 2026-07-03 | 359.91M | $600.8K |
| 2026-07-04 | 359.91M | $600.8K |
| 2026-07-05 | 359.91M | $600.8K |
| 2026-07-06 | 359.91M | $600.8K |
| 2026-07-07 | 359.91M | $600.8K |


---

## LayerZero (ZRO)

**Price:** $1.15    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.15 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.15 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 150.8K | 🔴 +11.31M ZRO | +$12.98M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 449.0K | 🔴 +33.94M ZRO | +$38.79M | per-day (57%) | 0.0000% |

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
| 2025-12-20 | 23.63M | 0 | +11.46M | +$13.18M |
| 2026-01-15 | 0 | 285.6K | −285.6K | −$474.9K |
| 2026-01-20 | 23.63M | 0 | +11.46M | +$13.18M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$13.18M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$13.18M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$13.18M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$13.18M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 23.63M | $27.17M |
| 2026-07-20 | 23.63M | $27.17M |
| 2026-08-20 | 23.63M | $27.17M |
| 2026-09-20 | 23.63M | $27.17M |
| 2026-10-20 | 23.63M | $27.17M |
| 2026-11-20 | 23.63M | $27.17M |
| 2026-12-20 | 23.63M | $27.17M |
| 2027-01-20 | 23.63M | $27.17M |


---

## Ethena (ENA)

**Price:** $0.09    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$381.6K | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.67M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$11.45M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$34.34M | today @ $0.09 | 0.0000% |

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
| 2026-05-20 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-21 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-22 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-23 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-24 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-25 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-26 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-27 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-28 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-29 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-30 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-05-31 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-06-01 | 10.75M | 0 | +4.11M | +$381.6K |
| 2026-06-02 | 10.75M | 0 | +4.11M | +$381.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 10.75M | $997.8K |
| 2026-06-04 | 10.75M | $997.8K |
| 2026-06-05 | 10.75M | $997.8K |
| 2026-06-06 | 10.75M | $997.8K |
| 2026-06-07 | 10.75M | $997.8K |
| 2026-06-08 | 10.75M | $997.8K |
| 2026-06-09 | 10.75M | $997.8K |
| 2026-06-10 | 10.75M | $997.8K |


---

## Aerodrome (AERO)

**Price:** $0.38    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.38 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.38 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.38 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.38 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$13.1K | today @ $0.17 | 0.0000% |
| 7d | 6/7d | 1.33M | 115.7K | 🔴 +422.8K DYDX | +$73.7K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 1.53M | 🔴 +782.6K DYDX | +$128.4K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 6.44M | 6.94M | 🟢 −4.33M DYDX | −$372.4K | per-day (99%) | 0.0000% |

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
| 2026-05-20 | 189.4K | 12.8K | +64.1K | +$9.2K |
| 2026-05-21 | 189.4K | 42.0K | +34.9K | +$5.3K |
| 2026-05-22 | 189.4K | 21.3K | +55.6K | +$8.6K |
| 2026-05-23 | 189.4K | 33.3K | +43.6K | +$6.4K |
| 2026-05-24 | 189.4K | 28.2K | +48.7K | +$7.3K |
| 2026-05-25 | 189.4K | 14.0K | +62.9K | +$9.2K |
| 2026-05-26 | 189.4K | 13.6K | +63.3K | +$9.8K |
| 2026-05-27 | 189.4K | 28.5K | +48.4K | +$8.1K |
| 2026-05-28 | 189.4K | 26.7K | +50.2K | +$8.2K |
| 2026-05-29 | 189.4K | 25.2K | +51.7K | +$8.2K |
| 2026-05-30 | 189.4K | 14.4K | +62.5K | +$11.1K |
| 2026-05-31 | 189.4K | 9.9K | +67.0K | +$12.4K |
| 2026-06-01 | 189.4K | 10.9K | +66.0K | +$12.6K |
| 2026-06-02 | 189.4K | 0 | +76.9K | +$13.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 189.4K | $32.2K |
| 2026-06-04 | 189.4K | $32.2K |
| 2026-06-05 | 189.4K | $32.2K |
| 2026-06-06 | 189.4K | $32.2K |
| 2026-06-07 | 189.4K | $32.2K |
| 2026-06-08 | 189.4K | $32.2K |
| 2026-06-09 | 189.4K | $32.2K |
| 2026-06-10 | 189.4K | $32.2K |


---

## Meteora (MET)

**Price:** $0.13    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$14.5K | today @ $0.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$101.3K | today @ $0.13 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$434.2K | today @ $0.13 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.30M | today @ $0.13 | 0.0000% |

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
| 2026-05-20 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-21 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-22 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-23 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-24 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-25 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-26 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-27 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-28 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-29 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-30 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-05-31 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-06-01 | 291.3K | 0 | +110.1K | +$14.5K |
| 2026-06-02 | 291.3K | 0 | +110.1K | +$14.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 291.3K | $38.3K |
| 2026-06-04 | 291.3K | $38.3K |
| 2026-06-05 | 291.3K | $38.3K |
| 2026-06-06 | 291.3K | $38.3K |
| 2026-06-07 | 291.3K | $38.3K |
| 2026-06-08 | 291.3K | $38.3K |
| 2026-06-09 | 291.3K | $38.3K |
| 2026-06-10 | 291.3K | $38.3K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.1K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$14.7K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$62.9K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$188.6K | today @ $0.02 | 0.0000% |

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
| 2026-05-20 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-21 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-22 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-23 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-24 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-25 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-26 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-27 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-28 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-29 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-30 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-05-31 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-06-01 | 347.8K | 0 | +118.1K | +$2.1K |
| 2026-06-02 | 347.8K | 0 | +118.1K | +$2.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 347.8K | $6.2K |
| 2026-06-04 | 347.8K | $6.2K |
| 2026-06-05 | 347.8K | $6.2K |
| 2026-06-06 | 347.8K | $6.2K |
| 2026-06-07 | 347.8K | $6.2K |
| 2026-06-08 | 347.8K | $6.2K |
| 2026-06-09 | 347.8K | $6.2K |
| 2026-06-10 | 347.8K | $6.2K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$5.5K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$38.7K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 21.95M | 0 | 🔴 +11.18M DRIFT | +$203.9K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 73.72M | 0 | 🔴 +39.84M DRIFT | +$726.5K | today @ $0.02 | 0.0000% |

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
| 2026-05-20 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-21 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-22 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-23 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-24 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-25 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-26 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-27 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-28 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-29 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-30 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-05-31 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-06-01 | 644.2K | 0 | +302.8K | +$5.5K |
| 2026-06-02 | 644.2K | 0 | +302.8K | +$5.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-03 | 644.2K | $11.7K |
| 2026-06-04 | 644.2K | $11.7K |
| 2026-06-05 | 644.2K | $11.7K |
| 2026-06-06 | 644.2K | $11.7K |
| 2026-06-07 | 644.2K | $11.7K |
| 2026-06-08 | 644.2K | $11.7K |
| 2026-06-09 | 644.2K | $11.7K |
| 2026-06-10 | 644.2K | $11.7K |


---

## Uniswap (UNI)

**Price:** $2.82    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $2.82 | 0.0000% |
| 7d | 6/7d | 0 | 175.5K | 🟢 −175.5K UNI | −$543.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 834.1K | 🟢 −834.1K UNI | −$2.86M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.86M | 🟢 −2.86M UNI | −$9.89M | per-day (100%) | 0.0000% |

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
| 2026-05-29 | 0 | 37.9K | −37.9K | −$115.4K |
| 2026-05-30 | 0 | 13.3K | −13.3K | −$40.1K |
| 2026-05-31 | 0 | 13.2K | −13.2K | −$40.2K |
| 2026-06-01 | 0 | 32.4K | −32.4K | −$97.7K |


---

## Raydium (RAY)

**Price:** $0.66    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 32.8K | 🟢 −32.8K RAY | −$21.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 169.2K | 🟢 −169.2K RAY | −$120.0K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 1.10M | 🟢 −1.10M RAY | −$848.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.40M | 🟢 −3.40M RAY | −$2.31M | per-day (100%) | 0.0000% |

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
| 2026-05-20 | 0 | 78.6K | −78.6K | −$55.5K |
| 2026-05-21 | 0 | 24.4K | −24.4K | −$19.1K |
| 2026-05-22 | 0 | 24.5K | −24.5K | −$18.9K |
| 2026-05-23 | 0 | 18.7K | −18.7K | −$14.1K |
| 2026-05-24 | 0 | 15.1K | −15.1K | −$11.7K |
| 2026-05-25 | 0 | 25.0K | −25.0K | −$18.9K |
| 2026-05-26 | 0 | 22.5K | −22.5K | −$17.3K |
| 2026-05-27 | 0 | 23.4K | −23.4K | −$17.5K |
| 2026-05-28 | 0 | 28.4K | −28.4K | −$20.6K |
| 2026-05-29 | 0 | 22.9K | −22.9K | −$16.2K |
| 2026-05-30 | 0 | 13.6K | −13.6K | −$9.7K |
| 2026-05-31 | 0 | 16.6K | −16.6K | −$11.9K |
| 2026-06-01 | 0 | 31.5K | −31.5K | −$22.5K |
| 2026-06-02 | 0 | 32.8K | −32.8K | −$21.7K |


---

## Euler (EUL)

**Price:** $1.32    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.32 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.32 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.32 | 0.0000% |
| 90d | ⚠ 38/90d partial | 0 | 141.0K | 🟢 −141.0K EUL | −$131.8K | per-day (100%) | 0.0000% |

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

**Price:** $0.49    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.49 | 0.0000% |
| 7d | 6/7d | 0 | 75.9K | 🟢 −75.9K GNS | −$36.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 322.8K | 🟢 −322.8K GNS | −$166.9K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 910.3K | 🟢 −910.3K GNS | −$602.0K | per-day (100%) | 0.0000% |

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
| 2026-05-29 | 0 | 14.1K | −14.1K | −$6.5K |
| 2026-05-30 | 0 | 8.9K | −8.9K | −$4.3K |
| 2026-05-31 | 0 | 8.8K | −8.8K | −$4.4K |
| 2026-06-01 | 0 | 15.1K | −15.1K | −$7.6K |


---

## Orca (ORCA)

**Price:** $1.19    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 3.1K | 🟢 −3.1K ORCA | −$3.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 13.1K | 🟢 −13.1K ORCA | −$16.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 50.1K | 🟢 −50.1K ORCA | −$73.6K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 221.9K | 🟢 −221.9K ORCA | −$237.2K | per-day (100%) | 0.0000% |

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
| 2026-05-20 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-21 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-22 | 0 | 1.7K | −1.7K | −$2.5K |
| 2026-05-23 | 0 | 1.8K | −1.8K | −$2.5K |
| 2026-05-24 | 0 | 1.3K | −1.3K | −$1.9K |
| 2026-05-25 | 0 | 1.2K | −1.2K | −$1.7K |
| 2026-05-26 | 0 | 1.7K | −1.7K | −$2.4K |
| 2026-05-27 | 0 | 1.9K | −1.9K | −$2.6K |
| 2026-05-28 | 0 | 2.0K | −2.0K | −$2.6K |
| 2026-05-29 | 0 | 1.7K | −1.7K | −$2.2K |
| 2026-05-30 | 0 | 956 | −956 | −$1.2K |
| 2026-05-31 | 0 | 1.1K | −1.1K | −$1.4K |
| 2026-06-01 | 0 | 2.3K | −2.3K | −$2.8K |
| 2026-06-02 | 0 | 3.1K | −3.1K | −$3.7K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 149.1K | 🟢 −149.1K MNDE | −$2.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.19M | 🟢 −1.19M MNDE | −$23.0K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 6.12M | 🟢 −6.12M MNDE | −$122.3K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 22.60M | 🟢 −22.60M MNDE | −$448.5K | per-day (100%) | 0.0000% |

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
| 2026-05-20 | 0 | 210.8K | −210.8K | −$4.2K |
| 2026-05-21 | 0 | 208.0K | −208.0K | −$4.1K |
| 2026-05-22 | 0 | 202.9K | −202.9K | −$4.0K |
| 2026-05-23 | 0 | 201.0K | −201.0K | −$3.9K |
| 2026-05-24 | 0 | 207.7K | −207.7K | −$3.9K |
| 2026-05-25 | 0 | 190.0K | −190.0K | −$3.7K |
| 2026-05-26 | 0 | 187.1K | −187.1K | −$3.7K |
| 2026-05-27 | 0 | 185.7K | −185.7K | −$3.6K |
| 2026-05-28 | 0 | 178.7K | −178.7K | −$3.5K |
| 2026-05-29 | 0 | 173.5K | −173.5K | −$3.4K |
| 2026-05-30 | 0 | 175.4K | −175.4K | −$3.4K |
| 2026-05-31 | 0 | 158.4K | −158.4K | −$3.1K |
| 2026-06-01 | 0 | 164.4K | −164.4K | −$3.2K |
| 2026-06-02 | 0 | 149.1K | −149.1K | −$2.9K |


---

## ether.fi (ETHFI)

**Price:** $0.34    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 14.3K | 🟢 −14.3K ETHFI | −$4.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 163.1K | 🟢 −163.1K ETHFI | −$61.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 835.3K | 🟢 −835.3K ETHFI | −$340.4K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.28M | 🟢 −2.28M ETHFI | −$1.04M | per-day (100%) | 0.0000% |

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
| 2026-05-20 | 0 | 28.9K | −28.9K | −$10.7K |
| 2026-05-21 | 0 | 26.2K | −26.2K | −$10.0K |
| 2026-05-22 | 0 | 17.3K | −17.3K | −$6.7K |
| 2026-05-23 | 0 | 31.9K | −31.9K | −$11.6K |
| 2026-05-24 | 0 | 23.7K | −23.7K | −$9.0K |
| 2026-05-25 | 0 | 23.7K | −23.7K | −$8.7K |
| 2026-05-26 | 0 | 26.5K | −26.5K | −$9.9K |
| 2026-05-27 | 0 | 21.8K | −21.8K | −$8.3K |
| 2026-05-28 | 0 | 25.9K | −25.9K | −$10.0K |
| 2026-05-29 | 0 | 22.2K | −22.2K | −$8.7K |
| 2026-05-30 | 0 | 26.3K | −26.3K | −$10.2K |
| 2026-05-31 | 0 | 21.1K | −21.1K | −$8.0K |
| 2026-06-01 | 0 | 31.5K | −31.5K | −$11.8K |
| 2026-06-02 | 0 | 14.3K | −14.3K | −$4.9K |


---

## CoW Protocol (COW)

**Price:** $0.16    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.16 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 484.2K | 🟢 −484.2K COW | −$77.3K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 3.57M | 🟢 −3.57M COW | −$618.1K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 13.91M | 🟢 −13.91M COW | −$2.79M | per-day (100%) | 0.0000% |

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
| 2026-06-01 | 0 | 166.6K | −166.6K | −$26.7K |


---
