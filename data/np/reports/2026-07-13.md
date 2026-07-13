# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-07-13T21:12:02.563Z
**As-of:** 2026-07-13

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $63.23    **Circulating:** 530.16M HYPE    **AF balance:** 45.80M HYPE    **Total staked:** 439.17M HYPE (82.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 23.0K | 🟢 −23.0K HYPE | −$1.45M | today @ $63.23 | -0.0023% |
| 7d | 7/7d | 0 | 87.2K | 🟢 −1.78M HYPE | −$112.24M | today @ $63.23 | -0.1775% |
| 30d | 30/30d | 17.45M | 176.2K | 🟢 −3.24M HYPE | −$204.63M | today @ $63.23 | -0.3236% |
| 90d | 90/90d | 52.34M | 1.29M | 🟢 −3.24M HYPE | −$273.08M | per-day (42%) | -0.3239% |

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
| 2026-06-30 | 0 | 21.2K | −39.5K | −$2.50M |
| 2026-07-01 | 0 | 624 | −406.4K | −$25.70M |
| 2026-07-02 | 0 | 3.7K | −3.7K | −$233.5K |
| 2026-07-03 | 0 | 2.1K | −149.9K | −$9.48M |
| 2026-07-04 | 0 | 143 | −143 | −$9.1K |
| 2026-07-05 | 0 | 141 | −141 | −$8.9K |
| 2026-07-06 | 9.92M | 1.9K | +989.7K | +$62.58M |
| 2026-07-07 | 0 | 145 | −1.14M | −$72.27M |
| 2026-07-08 | 0 | 12.0K | −277.7K | −$17.56M |
| 2026-07-09 | 0 | 16.8K | −171.8K | −$10.86M |
| 2026-07-10 | 0 | 17.0K | −17.0K | −$1.08M |
| 2026-07-11 | 0 | 9.1K | −15.0K | −$950.8K |
| 2026-07-12 | 0 | 9.1K | −127.6K | −$8.07M |
| 2026-07-13 | 0 | 23.0K | −23.0K | −$1.45M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-29 | 7.53M | $476.21M |
| 2026-08-06 | 9.92M | $627.03M |
| 2026-08-29 | 7.53M | $476.21M |
| 2026-09-06 | 9.92M | $627.03M |
| 2026-09-29 | 7.53M | $476.21M |
| 2026-10-06 | 9.92M | $627.03M |
| 2026-10-29 | 7.53M | $476.21M |
| 2026-11-06 | 9.92M | $627.03M |


---

## Aave (AAVE)

**Price:** $94.08    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $94.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.1K AAVE | −$672.6K | today @ $94.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −10.2K AAVE | −$955.9K | today @ $94.08 | 0.0000% |
| 90d | ⚠ 5/90d partial | 0 | 3.7K | 🟢 −50.1K AAVE | −$4.71M | today @ $94.08 | 0.0000% |

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
| 2026-06-25 | 0 | 0 | −23 | −$2.1K |
| 2026-06-26 | 0 | 0 | −7 | −$659.28 |
| 2026-06-27 | 0 | 0 | −78 | −$7.3K |
| 2026-06-28 | 0 | 0 | 0 | $0 |
| 2026-06-29 | 0 | 0 | −18 | −$1.7K |
| 2026-06-30 | 0 | 0 | −6 | −$517.69 |
| 2026-07-01 | 0 | 0 | 0 | $0 |
| 2026-07-02 | 0 | 0 | 0 | $0 |
| 2026-07-03 | 0 | 0 | −165 | −$15.5K |
| 2026-07-06 | 0 | 0 | 0 | $0 |
| 2026-07-08 | 0 | 0 | −1.4K | −$128.5K |
| 2026-07-11 | 0 | 0 | −4.7K | −$445.7K |
| 2026-07-12 | 0 | 0 | −1.0K | −$98.4K |
| 2026-07-13 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −253.0K SKY | −$14.8K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −22.74M SKY | −$1.33M | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −24.15M SKY | −$1.42M | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −28.96M SKY | −$1.70M | today @ $0.06 | 0.0000% |

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
| 2026-06-25 | 0 | 0 | −87.7K | −$5.1K |
| 2026-06-26 | 0 | 0 | −11.3K | −$664.67 |
| 2026-06-27 | 0 | 0 | −304.2K | −$17.8K |
| 2026-06-28 | 0 | 0 | −20.0K | −$1.2K |
| 2026-06-29 | 0 | 0 | 0 | $0 |
| 2026-06-30 | 0 | 0 | 0 | $0 |
| 2026-07-01 | 0 | 0 | −137.2K | −$8.0K |
| 2026-07-02 | 0 | 0 | 0 | $0 |
| 2026-07-03 | 0 | 0 | −30.5K | −$1.8K |
| 2026-07-06 | 0 | 0 | −330.4K | −$19.4K |
| 2026-07-08 | 0 | 0 | −19.01M | −$1.11M |
| 2026-07-11 | 0 | 0 | −3.48M | −$204.1K |
| 2026-07-12 | 0 | 0 | 0 | $0 |
| 2026-07-13 | 0 | 0 | −253.0K | −$14.8K |


---

## Lighter (LIT)

**Price:** $2.34    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.34 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 138.0K | 🟢 −138.0K LIT | −$342.1K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.09M | 🟢 −1.09M LIT | −$2.02M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 5.46M | 🟢 −5.46M LIT | −$6.90M | per-day (100%) | 0.0000% |

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
| 2026-06-28 | 0 | 18.2K | −18.2K | −$31.3K |
| 2026-06-29 | 0 | 41.2K | −41.2K | −$71.4K |
| 2026-06-30 | 0 | 54.9K | −54.9K | −$102.0K |
| 2026-07-01 | 0 | 56.1K | −56.1K | −$103.4K |
| 2026-07-02 | 0 | 36.9K | −36.9K | −$76.2K |
| 2026-07-03 | 0 | 24.1K | −24.1K | −$49.7K |
| 2026-07-04 | 0 | 19.9K | −19.9K | −$42.0K |
| 2026-07-05 | 0 | 18.1K | −18.1K | −$40.2K |
| 2026-07-06 | 0 | 30.7K | −30.7K | −$75.7K |
| 2026-07-07 | 0 | 30.5K | −30.5K | −$78.7K |
| 2026-07-08 | 0 | 29.9K | −29.9K | −$74.1K |
| 2026-07-09 | 0 | 34.5K | −34.5K | −$80.3K |
| 2026-07-10 | 0 | 24.3K | −24.3K | −$58.2K |
| 2026-07-11 | 0 | 18.8K | −18.8K | −$50.8K |


---

## Morpho (MORPHO)

**Price:** $2.00    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$194.7K | today @ $2.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.36M | today @ $2.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.84M | today @ $2.00 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$17.53M | today @ $2.00 | 0.0000% |

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
| 2026-06-30 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-01 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-02 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-03 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-04 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-05 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-06 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-07 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-08 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-09 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-10 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-11 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-12 | 202.7K | 0 | +97.4K | +$194.7K |
| 2026-07-13 | 202.7K | 0 | +97.4K | +$194.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 202.7K | $405.4K |
| 2026-07-15 | 202.7K | $405.4K |
| 2026-07-16 | 202.7K | $405.4K |
| 2026-07-17 | 202.7K | $405.4K |
| 2026-07-18 | 202.7K | $405.4K |
| 2026-07-19 | 202.7K | $405.4K |
| 2026-07-20 | 202.7K | $405.4K |
| 2026-07-21 | 202.7K | $405.4K |


---

## Pendle (PENDLE)

**Price:** $1.45    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.45 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.45 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.45 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.45 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$133.5K | today @ $0.62 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$934.8K | today @ $0.62 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$4.01M | today @ $0.62 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$12.02M | today @ $0.62 | 0.0000% |

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
| 2026-06-30 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-01 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-02 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-03 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-04 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-05 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-06 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-07 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-08 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-09 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-10 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-11 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-12 | 626.2K | 0 | +214.3K | +$133.5K |
| 2026-07-13 | 626.2K | 0 | +214.3K | +$133.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 626.2K | $390.2K |
| 2026-07-15 | 626.2K | $390.2K |
| 2026-07-16 | 626.2K | $390.2K |
| 2026-07-17 | 626.2K | $390.2K |
| 2026-07-18 | 626.2K | $390.2K |
| 2026-07-19 | 626.2K | $390.2K |
| 2026-07-20 | 626.2K | $390.2K |
| 2026-07-21 | 626.2K | $390.2K |


---

## Jupiter (JUP)

**Price:** $0.21    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.21 | 0.0000% |
| 7d | 6/7d | 0 | 1.75M | 🟢 −1.75M JUP | −$386.3K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 11.17M | 🔴 +4.38M JUP | +$1.24M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 35.03M | 🔴 +11.63M JUP | +$2.69M | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 400.5K | −400.5K | −$84.4K |
| 2026-06-30 | 0 | 453.8K | −453.8K | −$98.6K |
| 2026-07-01 | 0 | 425.0K | −425.0K | −$89.9K |
| 2026-07-02 | 0 | 457.4K | −457.4K | −$107.1K |
| 2026-07-03 | 0 | 335.4K | −335.4K | −$81.7K |
| 2026-07-04 | 0 | 388.5K | −388.5K | −$94.5K |
| 2026-07-05 | 0 | 324.4K | −324.4K | −$76.3K |
| 2026-07-06 | 0 | 395.3K | −395.3K | −$96.3K |
| 2026-07-07 | 0 | 359.3K | −359.3K | −$85.2K |
| 2026-07-08 | 0 | 349.3K | −349.3K | −$82.8K |
| 2026-07-09 | 0 | 262.9K | −262.9K | −$56.0K |
| 2026-07-10 | 0 | 487.0K | −487.0K | −$103.8K |
| 2026-07-11 | 0 | 273.2K | −273.2K | −$55.5K |
| 2026-07-12 | 0 | 14.2K | −14.2K | −$2.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-27 | 53.47M | $11.17M |
| 2026-08-27 | 53.47M | $11.17M |
| 2026-09-27 | 53.47M | $11.17M |
| 2026-10-27 | 53.47M | $11.17M |
| 2026-11-27 | 53.47M | $11.17M |
| 2026-12-27 | 53.47M | $11.17M |
| 2027-01-27 | 53.47M | $11.17M |
| 2027-02-27 | 53.47M | $11.17M |


---

## Fluid (FLUID)

**Price:** $1.00    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$2.7K | today @ $1.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$19.1K | today @ $1.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$231.8K | today @ $1.00 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$695.4K | today @ $1.00 | 0.0000% |

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
| 2026-06-30 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-01 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-02 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-03 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-04 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-05 | 509.1K | 0 | +152.7K | +$152.5K |
| 2026-07-06 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-07 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-08 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-09 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-10 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-11 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-12 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-13 | 9.1K | 0 | +2.7K | +$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 9.1K | $9.1K |
| 2026-07-15 | 9.1K | $9.1K |
| 2026-07-16 | 9.1K | $9.1K |
| 2026-07-17 | 9.1K | $9.1K |
| 2026-07-18 | 9.1K | $9.1K |
| 2026-07-19 | 9.1K | $9.1K |
| 2026-07-20 | 9.1K | $9.1K |
| 2026-07-21 | 9.1K | $9.1K |


---

## Collector Crypt (CARDS)

**Price:** $0.17    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.17 | 0.0000% |
| 7d | 6/7d | 0 | 10.51M | 🟢 −10.51M CARDS | −$1.84M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 14.25M | 49.25M | 🟢 −37.86M CARDS | −$9.42M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 42.76M | 200.59M | 🟢 −166.42M CARDS | −$23.12M | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 1.83M | −1.83M | −$461.3K |
| 2026-06-30 | 0 | 875.9K | −875.9K | −$199.8K |
| 2026-07-01 | 14.25M | 1.52M | +9.87M | +$1.98M |
| 2026-07-02 | 0 | 1.20M | −1.20M | −$265.0K |
| 2026-07-03 | 0 | 739.1K | −739.1K | −$175.2K |
| 2026-07-04 | 0 | 1.69M | −1.69M | −$366.9K |
| 2026-07-05 | 0 | 243.3K | −243.3K | −$51.6K |
| 2026-07-06 | 0 | 1.09M | −1.09M | −$220.1K |
| 2026-07-07 | 0 | 2.59M | −2.59M | −$522.4K |
| 2026-07-08 | 0 | 1.26M | −1.26M | −$225.7K |
| 2026-07-09 | 0 | 2.78M | −2.78M | −$460.2K |
| 2026-07-10 | 0 | 2.19M | −2.19M | −$363.3K |
| 2026-07-11 | 0 | 853.5K | −853.5K | −$141.8K |
| 2026-07-12 | 0 | 835.5K | −835.5K | −$125.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 14.25M | $2.40M |
| 2026-09-01 | 44.67M | $7.53M |
| 2026-10-01 | 44.67M | $7.53M |
| 2026-11-01 | 44.67M | $7.53M |
| 2026-12-01 | 44.67M | $7.53M |
| 2027-01-01 | 44.67M | $7.53M |
| 2027-02-01 | 44.67M | $7.53M |
| 2027-03-01 | 44.67M | $7.53M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$237.6K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 12.52B | 0 | 🔴 +4.12B PUMP | +$6.11M | today @ $0.00 | 0.0000% |
| 30d | ⚠ 23/30d partial | 14.68B | 7.23B | 🟢 −2.14B PUMP | −$2.95M | per-day (77%) | 0.0000% |
| 90d | 83/90d | 34.68B | 26.85B | 🟢 −15.76B PUMP | −$27.60M | per-day (92%) | 0.0000% |

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
| 2026-06-30 | 0 | 402.60M | −402.60M | −$597.4K |
| 2026-07-01 | 359.91M | 372.00M | −211.69M | −$299.1K |
| 2026-07-02 | 359.91M | 402.83M | −242.52M | −$336.3K |
| 2026-07-03 | 359.91M | 365.72M | −205.41M | −$312.9K |
| 2026-07-04 | 359.91M | 334.22M | −173.91M | −$283.8K |
| 2026-07-05 | 359.91M | 290.83M | −130.52M | −$202.6K |
| 2026-07-06 | 359.91M | 347.87M | −187.56M | −$305.5K |
| 2026-07-07 | 359.91M | 0 | +160.31M | +$237.6K |
| 2026-07-08 | 359.91M | 0 | +160.31M | +$237.6K |
| 2026-07-09 | 359.91M | 0 | +160.31M | +$237.6K |
| 2026-07-10 | 359.91M | 0 | +160.31M | +$237.6K |
| 2026-07-11 | 359.91M | 0 | +160.31M | +$237.6K |
| 2026-07-12 | 10.36B | 0 | +3.16B | +$4.68M |
| 2026-07-13 | 359.91M | 0 | +160.31M | +$237.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 359.91M | $533.4K |
| 2026-07-15 | 359.91M | $533.4K |
| 2026-07-16 | 359.91M | $533.4K |
| 2026-07-17 | 359.91M | $533.4K |
| 2026-07-18 | 359.91M | $533.4K |
| 2026-07-19 | 359.91M | $533.4K |
| 2026-07-20 | 359.91M | $533.4K |
| 2026-07-21 | 359.91M | $533.4K |


---

## LayerZero (ZRO)

**Price:** $0.87    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.87 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 144.1K | 🟢 −144.1K ZRO | −$134.5K | per-day (100%) | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 144.1K | 🔴 +11.32M ZRO | +$9.79M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 539.6K | 🔴 +33.85M ZRO | +$29.13M | per-day (57%) | 0.0000% |

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
| 2026-01-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.92M |
| 2026-07-08 | 0 | 144.1K | −144.1K | −$134.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-20 | 23.63M | $20.45M |
| 2026-08-20 | 23.63M | $20.45M |
| 2026-09-20 | 23.63M | $20.45M |
| 2026-10-20 | 23.63M | $20.45M |
| 2026-11-20 | 23.63M | $20.45M |
| 2026-12-20 | 23.63M | $20.45M |
| 2027-01-20 | 23.63M | $20.45M |
| 2027-02-20 | 23.63M | $20.45M |


---

## Ethena (ENA)

**Price:** $0.08    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$320.9K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.25M | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$9.63M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$28.88M | today @ $0.08 | 0.0000% |

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
| 2026-06-30 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-01 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-02 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-03 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-04 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-05 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-06 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-07 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-08 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-09 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-10 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-11 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-12 | 10.75M | 0 | +4.11M | +$320.9K |
| 2026-07-13 | 10.75M | 0 | +4.11M | +$320.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 10.75M | $839.0K |
| 2026-07-15 | 10.75M | $839.0K |
| 2026-07-16 | 10.75M | $839.0K |
| 2026-07-17 | 10.75M | $839.0K |
| 2026-07-18 | 10.75M | $839.0K |
| 2026-07-19 | 10.75M | $839.0K |
| 2026-07-20 | 10.75M | $839.0K |
| 2026-07-21 | 10.75M | $839.0K |


---

## Aerodrome (AERO)

**Price:** $0.48    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.48 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.48 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.48 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.48 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$9.3K | today @ $0.12 | 0.0000% |
| 7d | ⚠ 5/7d partial | 1.33M | 493.3K | 🔴 +45.2K DYDX | +$4.5K | per-day (71%) | 0.0000% |
| 30d | ⚠ 23/30d partial | 5.68M | 1.30M | 🔴 +1.00M DYDX | +$128.8K | per-day (77%) | 0.0000% |
| 90d | 83/90d | 14.20M | 4.22M | 🔴 +1.55M DYDX | +$228.4K | per-day (92%) | 0.0000% |

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
| 2026-06-30 | 189.4K | 0 | +76.9K | +$9.3K |
| 2026-07-01 | 189.4K | 629 | +76.3K | +$13.7K |
| 2026-07-02 | 189.4K | 145 | +76.8K | +$11.1K |
| 2026-07-03 | 189.4K | 100.3K | −23.4K | −$3.0K |
| 2026-07-04 | 189.4K | 93.4K | −16.5K | −$2.2K |
| 2026-07-05 | 189.4K | 87.2K | −10.3K | −$1.3K |
| 2026-07-06 | 189.4K | 133.8K | −56.8K | −$7.4K |
| 2026-07-07 | 189.4K | 124.6K | −47.7K | −$6.1K |
| 2026-07-08 | 189.4K | 157.9K | −80.9K | −$10.3K |
| 2026-07-09 | 189.4K | 124.3K | −47.4K | −$6.6K |
| 2026-07-10 | 189.4K | 62.9K | +14.0K | +$1.9K |
| 2026-07-11 | 189.4K | 23.5K | +53.4K | +$7.0K |
| 2026-07-12 | 189.4K | 0 | +76.9K | +$9.3K |
| 2026-07-13 | 189.4K | 0 | +76.9K | +$9.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 189.4K | $23.0K |
| 2026-07-15 | 189.4K | $23.0K |
| 2026-07-16 | 189.4K | $23.0K |
| 2026-07-17 | 189.4K | $23.0K |
| 2026-07-18 | 189.4K | $23.0K |
| 2026-07-19 | 189.4K | $23.0K |
| 2026-07-20 | 189.4K | $23.0K |
| 2026-07-21 | 189.4K | $23.0K |


---

## Meteora (MET)

**Price:** $0.15    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$16.3K | today @ $0.15 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$113.9K | today @ $0.15 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$488.0K | today @ $0.15 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.46M | today @ $0.15 | 0.0000% |

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
| 2026-06-30 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-01 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-02 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-03 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-04 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-05 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-06 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-07 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-08 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-09 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-10 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-11 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-12 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-07-13 | 291.3K | 0 | +110.1K | +$16.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 291.3K | $43.0K |
| 2026-07-15 | 291.3K | $43.0K |
| 2026-07-16 | 291.3K | $43.0K |
| 2026-07-17 | 291.3K | $43.0K |
| 2026-07-18 | 291.3K | $43.0K |
| 2026-07-19 | 291.3K | $43.0K |
| 2026-07-20 | 291.3K | $43.0K |
| 2026-07-21 | 291.3K | $43.0K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.3K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$16.0K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$68.5K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$205.5K | today @ $0.02 | 0.0000% |

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
| 2026-06-30 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-01 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-02 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-03 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-04 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-05 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-06 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-07 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-08 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-09 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-10 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-11 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-12 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-13 | 347.8K | 0 | +118.1K | +$2.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 347.8K | $6.7K |
| 2026-07-15 | 347.8K | $6.7K |
| 2026-07-16 | 347.8K | $6.7K |
| 2026-07-17 | 347.8K | $6.7K |
| 2026-07-18 | 347.8K | $6.7K |
| 2026-07-19 | 347.8K | $6.7K |
| 2026-07-20 | 347.8K | $6.7K |
| 2026-07-21 | 347.8K | $6.7K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$27.2K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$116.4K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 64.76M | 0 | 🔴 +32.67M DRIFT | +$418.6K | today @ $0.01 | 0.0000% |

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
| 2026-06-30 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-01 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-02 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-03 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-04 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-05 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-06 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-07 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-08 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-09 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-10 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-11 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-12 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-07-13 | 644.2K | 0 | +302.8K | +$3.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-14 | 644.2K | $8.3K |
| 2026-07-15 | 644.2K | $8.3K |
| 2026-07-16 | 644.2K | $8.3K |
| 2026-07-17 | 644.2K | $8.3K |
| 2026-07-18 | 644.2K | $8.3K |
| 2026-07-19 | 644.2K | $8.3K |
| 2026-07-20 | 644.2K | $8.3K |
| 2026-07-21 | 644.2K | $8.3K |


---

## Uniswap (UNI)

**Price:** $3.49    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $3.49 | 0.0000% |
| 7d | 6/7d | 0 | 199.1K | 🟢 −199.1K UNI | −$660.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.26M | 🟢 −1.26M UNI | −$3.79M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.21M | 🟢 −4.21M UNI | −$13.00M | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 57.1K | −57.1K | −$166.9K |
| 2026-06-30 | 0 | 30.8K | −30.8K | −$89.2K |
| 2026-07-01 | 0 | 57.2K | −57.2K | −$158.9K |
| 2026-07-02 | 0 | 52.8K | −52.8K | −$147.2K |
| 2026-07-03 | 0 | 34.0K | −34.0K | −$108.1K |
| 2026-07-04 | 0 | 21.9K | −21.9K | −$70.3K |
| 2026-07-05 | 0 | 33.3K | −33.3K | −$107.3K |
| 2026-07-06 | 0 | 46.2K | −46.2K | −$146.6K |
| 2026-07-07 | 0 | 52.9K | −52.9K | −$168.0K |
| 2026-07-08 | 0 | 45.6K | −45.6K | −$145.4K |
| 2026-07-09 | 0 | 28.6K | −28.6K | −$93.6K |
| 2026-07-10 | 0 | 29.4K | −29.4K | −$99.7K |
| 2026-07-11 | 0 | 20.8K | −20.8K | −$73.5K |
| 2026-07-12 | 0 | 21.9K | −21.9K | −$80.4K |


---

## Raydium (RAY)

**Price:** $0.66    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.66 | 0.0000% |
| 7d | 6/7d | 0 | 104.8K | 🟢 −104.8K RAY | −$73.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 783.6K | 🟢 −783.6K RAY | −$499.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.83M | 🟢 −2.83M RAY | −$1.97M | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 39.5K | −39.5K | −$24.2K |
| 2026-06-30 | 0 | 33.9K | −33.9K | −$21.3K |
| 2026-07-01 | 0 | 34.9K | −34.9K | −$20.8K |
| 2026-07-02 | 0 | 35.0K | −35.0K | −$22.6K |
| 2026-07-03 | 0 | 27.0K | −27.0K | −$18.7K |
| 2026-07-04 | 0 | 24.5K | −24.5K | −$17.7K |
| 2026-07-05 | 0 | 18.0K | −18.0K | −$12.9K |
| 2026-07-06 | 0 | 24.5K | −24.5K | −$17.7K |
| 2026-07-07 | 0 | 21.6K | −21.6K | −$15.9K |
| 2026-07-08 | 0 | 22.3K | −22.3K | −$15.9K |
| 2026-07-09 | 0 | 20.8K | −20.8K | −$14.1K |
| 2026-07-10 | 0 | 19.4K | −19.4K | −$13.2K |
| 2026-07-11 | 0 | 10.0K | −10.0K | −$7.0K |
| 2026-07-12 | 0 | 10.8K | −10.8K | −$7.4K |


---

## Euler (EUL)

**Price:** $0.98    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.98 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.98 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.98 | 0.0000% |
| 90d | ⚠ 5/90d partial | 0 | 2.5K | 🟢 −2.5K EUL | −$3.0K | per-day (100%) | 0.0000% |

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

**Price:** $0.60    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.60 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 11.1K | 🟢 −11.1K GNS | −$6.8K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 139.8K | 🟢 −139.8K GNS | −$81.1K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 952.0K | 🟢 −952.0K GNS | −$520.9K | per-day (100%) | 0.0000% |

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
| 2026-06-28 | 0 | 2.2K | −2.2K | −$1.1K |
| 2026-06-29 | 0 | 2.7K | −2.7K | −$1.4K |
| 2026-06-30 | 0 | 1.9K | −1.9K | −$1.0K |
| 2026-07-01 | 0 | 2.3K | −2.3K | −$1.3K |
| 2026-07-02 | 0 | 5.9K | −5.9K | −$3.5K |
| 2026-07-03 | 0 | 1.6K | −1.6K | −$1.0K |
| 2026-07-04 | 0 | 3.3K | −3.3K | −$2.1K |
| 2026-07-05 | 0 | 3.3K | −3.3K | −$2.1K |
| 2026-07-06 | 0 | 5.1K | −5.1K | −$3.2K |
| 2026-07-07 | 0 | 1.2K | −1.2K | −$745.00 |
| 2026-07-08 | 0 | 870 | −870 | −$533.00 |
| 2026-07-09 | 0 | 4.3K | −4.3K | −$2.6K |
| 2026-07-10 | 0 | 2.9K | −2.9K | −$1.8K |
| 2026-07-11 | 0 | 1.8K | −1.8K | −$1.1K |


---

## Orca (ORCA)

**Price:** $1.13    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.13 | 0.0000% |
| 7d | 6/7d | 0 | 10.7K | 🟢 −10.7K ORCA | −$13.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 70.7K | 🟢 −70.7K ORCA | −$83.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 198.3K | 🟢 −198.3K ORCA | −$241.6K | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 4.3K | −4.3K | −$5.0K |
| 2026-06-30 | 0 | 2.5K | −2.5K | −$3.0K |
| 2026-07-01 | 0 | 3.4K | −3.4K | −$4.0K |
| 2026-07-02 | 0 | 3.1K | −3.1K | −$3.7K |
| 2026-07-03 | 0 | 2.2K | −2.2K | −$2.7K |
| 2026-07-04 | 0 | 1.8K | −1.8K | −$2.2K |
| 2026-07-05 | 0 | 1.6K | −1.6K | −$2.0K |
| 2026-07-06 | 0 | 2.7K | −2.7K | −$3.4K |
| 2026-07-07 | 0 | 2.4K | −2.4K | −$3.0K |
| 2026-07-08 | 0 | 2.1K | −2.1K | −$2.7K |
| 2026-07-09 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-07-10 | 0 | 1.8K | −1.8K | −$2.2K |
| 2026-07-11 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-12 | 0 | 1.2K | −1.2K | −$1.5K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 95.8K | 🟢 −95.8K MNDE | −$1.8K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.03M | 🟢 −1.03M MNDE | −$19.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 3.67M | 🟢 −3.67M MNDE | −$68.1K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 15.61M | 🟢 −15.61M MNDE | −$303.0K | per-day (100%) | 0.0000% |

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
| 2026-06-30 | 0 | 120.3K | −120.3K | −$2.2K |
| 2026-07-01 | 0 | 126.2K | −126.2K | −$2.3K |
| 2026-07-02 | 0 | 137.9K | −137.9K | −$2.6K |
| 2026-07-03 | 0 | 140.9K | −140.9K | −$2.6K |
| 2026-07-04 | 0 | 146.6K | −146.6K | −$2.8K |
| 2026-07-05 | 0 | 147.3K | −147.3K | −$2.8K |
| 2026-07-06 | 0 | 153.6K | −153.6K | −$2.9K |
| 2026-07-07 | 0 | 152.4K | −152.4K | −$2.9K |
| 2026-07-08 | 0 | 154.4K | −154.4K | −$2.9K |
| 2026-07-09 | 0 | 150.1K | −150.1K | −$2.9K |
| 2026-07-10 | 0 | 158.3K | −158.3K | −$3.0K |
| 2026-07-11 | 0 | 155.8K | −155.8K | −$3.0K |
| 2026-07-12 | 0 | 163.4K | −163.4K | −$3.1K |
| 2026-07-13 | 0 | 95.8K | −95.8K | −$1.8K |


---

## ether.fi (ETHFI)

**Price:** $0.38    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.38 | 0.0000% |
| 7d | 6/7d | 0 | 145.8K | 🟢 −145.8K ETHFI | −$59.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 746.8K | 🟢 −746.8K ETHFI | −$269.1K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.47M | 🟢 −2.47M ETHFI | −$959.7K | per-day (100%) | 0.0000% |

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
| 2026-06-29 | 0 | 23.4K | −23.4K | −$7.9K |
| 2026-06-30 | 0 | 27.5K | −27.5K | −$9.2K |
| 2026-07-01 | 0 | 31.2K | −31.2K | −$10.0K |
| 2026-07-02 | 0 | 32.6K | −32.6K | −$10.4K |
| 2026-07-03 | 0 | 31.7K | −31.7K | −$10.5K |
| 2026-07-04 | 0 | 22.4K | −22.4K | −$8.4K |
| 2026-07-05 | 0 | 21.1K | −21.1K | −$8.7K |
| 2026-07-06 | 0 | 24.8K | −24.8K | −$10.6K |
| 2026-07-07 | 0 | 20.9K | −20.9K | −$9.1K |
| 2026-07-08 | 0 | 23.3K | −23.3K | −$9.7K |
| 2026-07-09 | 0 | 22.6K | −22.6K | −$8.7K |
| 2026-07-10 | 0 | 25.0K | −25.0K | −$9.7K |
| 2026-07-11 | 0 | 25.8K | −25.8K | −$10.5K |
| 2026-07-12 | 0 | 28.3K | −28.3K | −$11.8K |


---

## CoW Protocol (COW)

**Price:** $0.14    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.14 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 733.1K | 🟢 −733.1K COW | −$103.0K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 5.29M | 🟢 −5.29M COW | −$787.5K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 19.73M | 🟢 −19.73M COW | −$3.15M | per-day (100%) | 0.0000% |

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
| 2026-06-27 | 0 | 85.0K | −85.0K | −$12.3K |
| 2026-06-28 | 0 | 54.6K | −54.6K | −$7.9K |
| 2026-06-29 | 0 | 256.3K | −256.3K | −$37.4K |
| 2026-06-30 | 0 | 848.5K | −848.5K | −$122.5K |
| 2026-07-02 | 0 | 280.6K | −280.6K | −$40.7K |
| 2026-07-03 | 0 | 139.2K | −139.2K | −$20.9K |
| 2026-07-04 | 0 | 157.7K | −157.7K | −$23.7K |
| 2026-07-05 | 0 | 75.8K | −75.8K | −$11.3K |
| 2026-07-06 | 0 | 155.1K | −155.1K | −$23.0K |
| 2026-07-07 | 0 | 152.4K | −152.4K | −$22.2K |
| 2026-07-08 | 0 | 186.2K | −186.2K | −$26.1K |
| 2026-07-09 | 0 | 72.1K | −72.1K | −$9.8K |
| 2026-07-10 | 0 | 183.3K | −183.3K | −$25.2K |
| 2026-07-11 | 0 | 139.2K | −139.2K | −$19.6K |


---
