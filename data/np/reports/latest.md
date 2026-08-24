# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-08-24T13:13:45.630Z
**As-of:** 2026-08-24

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $80.71    **Circulating:** 547.61M HYPE    **AF balance:** 46.71M HYPE    **Total staked:** 436.22M HYPE (79.7% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 12.9K | 🟢 −12.9K HYPE | −$1.04M | today @ $80.71 | -0.0013% |
| 7d | 7/7d | 0 | 92.6K | 🟢 −109.8K HYPE | −$8.86M | today @ $80.71 | -0.0110% |
| 30d | 30/30d | 17.45M | 184.1K | 🔴 +1.03M HYPE | +$83.46M | today @ $80.71 | 0.1034% |
| 90d | 90/90d | 52.34M | 396.1K | 🟢 −10.57M HYPE | −$852.83M | today @ $80.71 | -1.0567% |

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
| 2026-08-11 | 0 | 2.3K | −83.2K | −$6.72M |
| 2026-08-12 | 0 | 723 | −555.0K | −$44.79M |
| 2026-08-13 | 0 | 5.6K | −5.6K | −$448.4K |
| 2026-08-14 | 0 | 14.8K | −14.8K | −$1.20M |
| 2026-08-15 | 0 | 5.3K | −21.8K | −$1.76M |
| 2026-08-16 | 0 | 5.8K | −61.0K | −$4.92M |
| 2026-08-17 | 0 | 18.3K | −18.3K | −$1.47M |
| 2026-08-18 | 0 | 10.8K | −28.0K | −$2.26M |
| 2026-08-19 | 0 | 3.7K | −3.7K | −$301.5K |
| 2026-08-20 | 0 | 12.9K | −12.9K | −$1.04M |
| 2026-08-21 | 0 | 1.8K | −1.8K | −$141.9K |
| 2026-08-22 | 0 | 22.7K | −22.7K | −$1.83M |
| 2026-08-23 | 0 | 27.8K | −27.8K | −$2.25M |
| 2026-08-24 | 0 | 12.9K | −12.9K | −$1.04M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-29 | 7.53M | $607.85M |
| 2026-09-06 | 9.92M | $800.37M |
| 2026-09-29 | 7.53M | $607.85M |
| 2026-10-06 | 9.92M | $800.37M |
| 2026-10-29 | 7.53M | $607.85M |
| 2026-11-06 | 9.92M | $800.37M |
| 2026-11-29 | 7.53M | $607.85M |
| 2026-12-06 | 9.92M | $800.37M |


---

## Aave (AAVE)

**Price:** $137.00    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −593 AAVE | −$81.2K | today @ $137.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −3.6K AAVE | −$499.6K | today @ $137.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −205.1K AAVE | −$28.09M | today @ $137.00 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −276.9K AAVE | −$37.94M | today @ $137.00 | 0.0000% |

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
| 2026-08-11 | 0 | 0 | −1.2K | −$164.2K |
| 2026-08-12 | 0 | 0 | −64 | −$8.8K |
| 2026-08-13 | 0 | 0 | 0 | $0 |
| 2026-08-14 | 0 | 0 | 0 | $0 |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$157.2K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$17.9K |
| 2026-08-20 | 0 | 0 | −2.0K | −$279.0K |
| 2026-08-21 | 0 | 0 | −499 | −$68.4K |
| 2026-08-22 | 0 | 0 | −387 | −$53.0K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$81.2K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −9.95M SKY | −$695.8K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −48.31M SKY | −$3.38M | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −84.62M SKY | −$5.92M | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −132.87M SKY | −$9.29M | today @ $0.07 | 0.0000% |

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
| 2026-08-11 | 0 | 0 | −6.54M | −$457.3K |
| 2026-08-12 | 0 | 0 | −1.54M | −$107.5K |
| 2026-08-13 | 0 | 0 | −291.2K | −$20.4K |
| 2026-08-14 | 0 | 0 | −539.8K | −$37.7K |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | −254.9K | −$17.8K |
| 2026-08-17 | 0 | 0 | −1.72M | −$120.4K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.17M |
| 2026-08-19 | 0 | 0 | −10.18M | −$711.6K |
| 2026-08-20 | 0 | 0 | −4.64M | −$324.6K |
| 2026-08-21 | 0 | 0 | −4.01M | −$280.7K |
| 2026-08-22 | 0 | 0 | −2.79M | −$194.9K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$695.8K |


---

## Lighter (LIT)

**Price:** $3.45    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.45 | 0.0000% |
| 7d | 6/7d | 0 | 264.2K | 🟢 −264.2K LIT | −$715.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 854.2K | 🟢 −854.2K LIT | −$2.02M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 3.61M | 🟢 −3.61M LIT | −$6.73M | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 15.1K | −15.1K | −$34.9K |
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


---

## Morpho (MORPHO)

**Price:** $2.77    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$269.7K | today @ $2.77 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.89M | today @ $2.77 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$8.09M | today @ $2.77 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$24.27M | today @ $2.77 | 0.0000% |

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
| 2026-08-11 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-12 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-13 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-14 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-15 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-16 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-17 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-18 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-19 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-20 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-21 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-22 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-23 | 202.7K | 0 | +97.4K | +$269.7K |
| 2026-08-24 | 202.7K | 0 | +97.4K | +$269.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 202.7K | $561.4K |
| 2026-08-26 | 202.7K | $561.4K |
| 2026-08-27 | 202.7K | $561.4K |
| 2026-08-28 | 202.7K | $561.4K |
| 2026-08-29 | 202.7K | $561.4K |
| 2026-08-30 | 202.7K | $561.4K |
| 2026-08-31 | 202.7K | $561.4K |
| 2026-09-01 | 202.7K | $561.4K |


---

## Pendle (PENDLE)

**Price:** $1.82    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.82 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.82 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.82 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.82 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$124.1K | today @ $0.58 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$868.9K | today @ $0.58 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.72M | today @ $0.58 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$11.17M | today @ $0.58 | 0.0000% |

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
| 2026-08-11 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-12 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-13 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-14 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-15 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-16 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-17 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-18 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-19 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-20 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-21 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-22 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-23 | 626.2K | 0 | +214.3K | +$124.1K |
| 2026-08-24 | 626.2K | 0 | +214.3K | +$124.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 626.2K | $362.7K |
| 2026-08-26 | 626.2K | $362.7K |
| 2026-08-27 | 626.2K | $362.7K |
| 2026-08-28 | 626.2K | $362.7K |
| 2026-08-29 | 626.2K | $362.7K |
| 2026-08-30 | 626.2K | $362.7K |
| 2026-08-31 | 626.2K | $362.7K |
| 2026-09-01 | 626.2K | $362.7K |


---

## Jupiter (JUP)

**Price:** $0.21    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.21 | 0.0000% |
| 7d | 6/7d | 0 | 4.52M | 🟢 −4.52M JUP | −$848.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 12.42M | 🔴 +3.14M JUP | +$682.7K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 36.54M | 🔴 +10.12M JUP | +$2.62M | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 413.8K | −413.8K | −$74.7K |
| 2026-08-11 | 0 | 378.9K | −378.9K | −$68.5K |
| 2026-08-12 | 0 | 414.2K | −414.2K | −$72.7K |
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
| 2026-08-23 | 0 | 703.8K | −703.8K | −$142.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-27 | 53.47M | $11.26M |
| 2026-09-27 | 53.47M | $11.26M |
| 2026-10-27 | 53.47M | $11.26M |
| 2026-11-27 | 53.47M | $11.26M |
| 2026-12-27 | 53.47M | $11.26M |
| 2027-01-27 | 53.47M | $11.26M |
| 2027-02-27 | 53.47M | $11.26M |
| 2027-03-27 | 53.47M | $11.26M |


---

## Fluid (FLUID)

**Price:** $1.37    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.8K | today @ $1.37 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$26.3K | today @ $1.37 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$318.1K | today @ $1.37 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$954.3K | today @ $1.37 | 0.0000% |

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
| 2026-08-11 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-12 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-13 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-14 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-15 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-16 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-17 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-18 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-19 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-20 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-21 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-22 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-23 | 9.1K | 0 | +2.7K | +$3.8K |
| 2026-08-24 | 9.1K | 0 | +2.7K | +$3.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 9.1K | $12.5K |
| 2026-08-26 | 9.1K | $12.5K |
| 2026-08-27 | 9.1K | $12.5K |
| 2026-08-28 | 9.1K | $12.5K |
| 2026-08-29 | 9.1K | $12.5K |
| 2026-08-30 | 9.1K | $12.5K |
| 2026-08-31 | 9.1K | $12.5K |
| 2026-09-01 | 9.1K | $12.5K |


---

## Collector Crypt (CARDS)

**Price:** $0.20    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.20 | 0.0000% |
| 7d | 6/7d | 0 | 8.56M | 🟢 −8.56M CARDS | −$1.62M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 14.25M | 63.27M | 🟢 −51.88M CARDS | −$7.98M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 42.76M | 183.09M | 🟢 −148.92M CARDS | −$26.79M | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 2.50M | −2.50M | −$325.1K |
| 2026-08-11 | 0 | 3.70M | −3.70M | −$544.0K |
| 2026-08-12 | 0 | 4.43M | −4.43M | −$615.6K |
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
| 2026-08-23 | 0 | 1.16M | −1.16M | −$231.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-01 | 44.67M | $8.72M |
| 2026-10-01 | 44.67M | $8.72M |
| 2026-11-01 | 44.67M | $8.72M |
| 2026-12-01 | 44.67M | $8.72M |
| 2027-01-01 | 44.67M | $8.72M |
| 2027-02-01 | 44.67M | $8.72M |
| 2027-03-01 | 44.67M | $8.72M |
| 2027-04-01 | 44.67M | $8.72M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$788.7K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 2.52B | 1.68B | 🟢 −554.77M PUMP | −$1.49M | per-day (86%) | 0.0000% |
| 30d | 29/30d | 20.80B | 8.70B | 🟢 −888.48M PUMP | −$974.8K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 49.80B | 25.44B | 🟢 −7.62B PUMP | −$12.13M | per-day (99%) | 0.0000% |

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
| 2026-08-11 | 359.91M | 295.70M | −135.39M | −$375.8K |
| 2026-08-12 | 10.36B | 320.72M | +2.84B | +$7.73M |
| 2026-08-13 | 359.91M | 320.13M | −159.82M | −$439.6K |
| 2026-08-14 | 359.91M | 251.01M | −90.70M | −$263.1K |
| 2026-08-15 | 359.91M | 231.64M | −71.33M | −$202.7K |
| 2026-08-16 | 359.91M | 224.96M | −64.65M | −$177.8K |
| 2026-08-17 | 359.91M | 297.05M | −136.74M | −$365.2K |
| 2026-08-18 | 359.91M | 331.18M | −170.87M | −$470.3K |
| 2026-08-19 | 359.91M | 346.42M | −186.11M | −$572.7K |
| 2026-08-20 | 359.91M | 342.30M | −181.99M | −$546.5K |
| 2026-08-21 | 359.91M | 262.66M | −102.35M | −$393.2K |
| 2026-08-22 | 359.91M | 232.41M | −72.10M | −$292.0K |
| 2026-08-23 | 359.91M | 161.96M | −1.66M | −$8.2K |
| 2026-08-24 | 359.91M | 0 | +160.31M | +$788.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 359.91M | $1.77M |
| 2026-08-26 | 359.91M | $1.77M |
| 2026-08-27 | 359.91M | $1.77M |
| 2026-08-28 | 359.91M | $1.77M |
| 2026-08-29 | 359.91M | $1.77M |
| 2026-08-30 | 359.91M | $1.77M |
| 2026-08-31 | 359.91M | $1.77M |
| 2026-09-01 | 359.91M | $1.77M |


---

## LayerZero (ZRO)

**Price:** $1.16    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$13.30M | today @ $1.16 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 170.4K | 🔴 +11.29M ZRO | +$13.17M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 558.8K | 🔴 +33.83M ZRO | +$39.33M | per-day (57%) | 0.0000% |

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
| 2026-03-20 | 23.63M | 0 | +11.46M | +$13.30M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$13.30M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$13.30M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$13.30M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$13.30M |
| 2026-08-06 | 0 | 170.4K | −170.4K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$13.30M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-20 | 23.63M | $27.41M |
| 2026-10-20 | 23.63M | $27.41M |
| 2026-11-20 | 23.63M | $27.41M |
| 2026-12-20 | 23.63M | $27.41M |
| 2027-01-20 | 23.63M | $27.41M |
| 2027-02-20 | 23.63M | $27.41M |
| 2027-03-20 | 23.63M | $27.41M |
| 2027-04-20 | 23.63M | $27.41M |


---

## Ethena (ENA)

**Price:** $0.16    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$668.6K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$4.68M | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$20.06M | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$60.17M | today @ $0.16 | 0.0000% |

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
| 2026-08-11 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-12 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-13 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-14 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-15 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-16 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-17 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-18 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-19 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-20 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-21 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-22 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-23 | 10.75M | 0 | +4.11M | +$668.6K |
| 2026-08-24 | 10.75M | 0 | +4.11M | +$668.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 10.75M | $1.75M |
| 2026-08-26 | 10.75M | $1.75M |
| 2026-08-27 | 10.75M | $1.75M |
| 2026-08-28 | 10.75M | $1.75M |
| 2026-08-29 | 10.75M | $1.75M |
| 2026-08-30 | 10.75M | $1.75M |
| 2026-08-31 | 10.75M | $1.75M |
| 2026-09-01 | 10.75M | $1.75M |


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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$9.1K | today @ $0.12 | 0.0000% |
| 7d | 6/7d | 1.33M | 986.8K | 🟢 −448.2K DYDX | −$47.5K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 2.09M | 🔴 +218.4K DYDX | +$29.1K | per-day (97%) | 0.0000% |
| 90d | 84/90d | 17.04M | 4.90M | 🔴 +2.02M DYDX | +$286.4K | per-day (93%) | 0.0000% |

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
| 2026-08-11 | 189.4K | 36.1K | +40.8K | +$4.6K |
| 2026-08-12 | 189.4K | 50.8K | +26.1K | +$3.0K |
| 2026-08-13 | 189.4K | 64.9K | +12.1K | +$1.3K |
| 2026-08-14 | 189.4K | 32.7K | +44.2K | +$4.9K |
| 2026-08-15 | 189.4K | 5.6K | +71.3K | +$7.8K |
| 2026-08-16 | 189.4K | 13.2K | +63.7K | +$7.0K |
| 2026-08-17 | 189.4K | 133.3K | −56.4K | −$5.7K |
| 2026-08-18 | 189.4K | 39.8K | +37.2K | +$3.7K |
| 2026-08-19 | 189.4K | 355.9K | −278.9K | −$28.5K |
| 2026-08-20 | 189.4K | 182.8K | −105.9K | −$11.5K |
| 2026-08-21 | 189.4K | 240.8K | −163.9K | −$18.7K |
| 2026-08-22 | 189.4K | 80.8K | −3.8K | −$472.35 |
| 2026-08-23 | 189.4K | 86.8K | −9.8K | −$1.2K |
| 2026-08-24 | 189.4K | 0 | +76.9K | +$9.1K |

### Next 6 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 189.4K | $22.5K |
| 2026-08-26 | 189.4K | $22.5K |
| 2026-08-27 | 189.4K | $22.5K |
| 2026-08-28 | 189.4K | $22.5K |
| 2026-08-29 | 189.4K | $22.5K |
| 2026-08-30 | 189.4K | $22.5K |


---

## Meteora (MET)

**Price:** $0.23    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$25.8K | today @ $0.23 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$180.3K | today @ $0.23 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$772.7K | today @ $0.23 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.32M | today @ $0.23 | 0.0000% |

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
| 2026-08-11 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-12 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-13 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-14 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-15 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-16 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-17 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-18 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-19 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-20 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-21 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-22 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-23 | 291.3K | 0 | +110.1K | +$25.8K |
| 2026-08-24 | 291.3K | 0 | +110.1K | +$25.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 291.3K | $68.1K |
| 2026-08-26 | 291.3K | $68.1K |
| 2026-08-27 | 291.3K | $68.1K |
| 2026-08-28 | 291.3K | $68.1K |
| 2026-08-29 | 291.3K | $68.1K |
| 2026-08-30 | 291.3K | $68.1K |
| 2026-08-31 | 291.3K | $68.1K |
| 2026-09-01 | 291.3K | $68.1K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.5K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$17.6K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$75.2K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$225.7K | today @ $0.02 | 0.0000% |

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
| 2026-08-11 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-12 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-13 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-14 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-15 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-16 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-17 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-18 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-19 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-20 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-21 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-22 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-23 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-24 | 347.8K | 0 | +118.1K | +$2.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 347.8K | $7.4K |
| 2026-08-26 | 347.8K | $7.4K |
| 2026-08-27 | 347.8K | $7.4K |
| 2026-08-28 | 347.8K | $7.4K |
| 2026-08-29 | 347.8K | $7.4K |
| 2026-08-30 | 347.8K | $7.4K |
| 2026-08-31 | 347.8K | $7.4K |
| 2026-09-01 | 347.8K | $7.4K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$26.0K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$111.6K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$334.7K | today @ $0.01 | 0.0000% |

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
| 2026-08-11 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-12 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-13 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-14 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-15 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-16 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-17 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-18 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-19 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-20 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-21 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-22 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-23 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-08-24 | 644.2K | 0 | +302.8K | +$3.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-25 | 644.2K | $7.9K |
| 2026-08-26 | 644.2K | $7.9K |
| 2026-08-27 | 644.2K | $7.9K |
| 2026-08-28 | 644.2K | $7.9K |
| 2026-08-29 | 644.2K | $7.9K |
| 2026-08-30 | 644.2K | $7.9K |
| 2026-08-31 | 644.2K | $7.9K |
| 2026-09-01 | 644.2K | $7.9K |


---

## Uniswap (UNI)

**Price:** $4.40    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.40 | 0.0000% |
| 7d | 6/7d | 0 | 520.3K | 🟢 −520.3K UNI | −$1.98M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.84M | 🟢 −1.84M UNI | −$7.08M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.69M | 🟢 −4.69M UNI | −$15.53M | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 57.8K | −57.8K | −$230.4K |
| 2026-08-11 | 0 | 46.2K | −46.2K | −$182.0K |
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
| 2026-08-23 | 0 | 85.9K | −85.9K | −$370.3K |


---

## Raydium (RAY)

**Price:** $0.77    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 58.9K | 🟢 −58.9K RAY | −$44.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 436.0K | 🟢 −436.0K RAY | −$302.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 1.43M | 🟢 −1.43M RAY | −$918.5K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.96M | 🟢 −2.96M RAY | −$1.90M | per-day (100%) | 0.0000% |

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
| 2026-08-11 | 0 | 66.5K | −66.5K | −$42.0K |
| 2026-08-12 | 0 | 45.9K | −45.9K | −$29.1K |
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
| 2026-08-24 | 0 | 58.9K | −58.9K | −$44.0K |


---

## Euler (EUL)

**Price:** $1.37    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.37 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.37 | 0.0000% |
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

**Price:** $0.55    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.55 | 0.0000% |
| 7d | 6/7d | 0 | 50.1K | 🟢 −50.1K GNS | −$25.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 173.8K | 🟢 −173.8K GNS | −$88.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 776.2K | 🟢 −776.2K GNS | −$405.9K | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 7.7K | −7.7K | −$4.1K |
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


---

## Orca (ORCA)

**Price:** $1.29    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.29 | 0.0000% |
| 7d | 6/7d | 0 | 57.5K | 🟢 −57.5K ORCA | −$67.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 100.4K | 🟢 −100.4K ORCA | −$114.0K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 238.1K | 🟢 −238.1K ORCA | −$274.4K | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 1.8K | −1.8K | −$1.9K |
| 2026-08-11 | 0 | 1.7K | −1.7K | −$1.8K |
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


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 247.9K | 🟢 −247.9K MNDE | −$4.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.67M | 🟢 −1.67M MNDE | −$31.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 6.11M | 🟢 −6.11M MNDE | −$115.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 14.58M | 🟢 −14.58M MNDE | −$273.6K | per-day (100%) | 0.0000% |

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
| 2026-08-11 | 0 | 198.4K | −198.4K | −$3.7K |
| 2026-08-12 | 0 | 193.9K | −193.9K | −$3.7K |
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
| 2026-08-24 | 0 | 247.9K | −247.9K | −$4.9K |


---

## ether.fi (ETHFI)

**Price:** $0.64    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.64 | 0.0000% |
| 7d | 6/7d | 0 | 58.2K | 🟢 −58.2K ETHFI | −$30.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 366.4K | 🟢 −366.4K ETHFI | −$154.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 1.12M | 🟢 −1.12M ETHFI | −$432.5K | per-day (100%) | 0.0000% |

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
| 2026-08-10 | 0 | 14.4K | −14.4K | −$5.5K |
| 2026-08-11 | 0 | 13.5K | −13.5K | −$5.2K |
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
| 2026-08-23 | 0 | 6.5K | −6.5K | −$3.8K |


---

## CoW Protocol (COW)

**Price:** $0.12    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.12 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 2.96M | 🟢 −2.96M COW | −$332.7K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 5.98M | 🟢 −5.98M COW | −$680.3K | per-day (100%) | 0.0000% |
| 90d | 83/90d | 0 | 20.28M | 🟢 −20.28M COW | −$2.75M | per-day (100%) | 0.0000% |

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
| 2026-08-08 | 0 | 54.1K | −54.1K | −$5.7K |
| 2026-08-09 | 0 | 57.8K | −57.8K | −$6.2K |
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


---
