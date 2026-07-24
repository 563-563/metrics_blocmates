# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-07-24T21:19:56.674Z
**As-of:** 2026-07-24

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $57.50    **Circulating:** 530.16M HYPE    **AF balance:** 46.02M HYPE    **Total staked:** 436.11M HYPE (82.3% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 19.4K | 🟢 −5.46M HYPE | −$313.97M | today @ $57.50 | -0.5460% |
| 7d | 7/7d | 0 | 100.0K | 🟢 −5.72M HYPE | −$328.84M | today @ $57.50 | -0.5719% |
| 30d | 30/30d | 17.45M | 180.1K | 🟢 −6.45M HYPE | −$370.91M | today @ $57.50 | -0.6451% |
| 90d | 90/90d | 52.34M | 1.00M | 🟢 −8.63M HYPE | −$552.30M | per-day (30%) | -0.8634% |

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
| 2026-07-11 | 0 | 607 | −6.6K | −$378.3K |
| 2026-07-12 | 0 | 948 | −119.4K | −$6.86M |
| 2026-07-13 | 0 | 1.9K | −1.9K | −$107.0K |
| 2026-07-14 | 0 | 709 | −16.3K | −$934.6K |
| 2026-07-15 | 0 | 4.2K | −13.4K | −$772.2K |
| 2026-07-16 | 0 | 1.4K | −1.4K | −$77.6K |
| 2026-07-17 | 0 | 1.4K | −37.2K | −$2.14M |
| 2026-07-18 | 0 | 1.4K | −1.4K | −$80.8K |
| 2026-07-19 | 0 | 4.3K | −41.8K | −$2.40M |
| 2026-07-20 | 0 | 11.9K | −152.2K | −$8.75M |
| 2026-07-21 | 0 | 20.7K | −20.7K | −$1.19M |
| 2026-07-22 | 0 | 21.6K | −21.6K | −$1.24M |
| 2026-07-23 | 0 | 20.7K | −20.7K | −$1.19M |
| 2026-07-24 | 0 | 19.4K | −5.46M | −$313.97M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-29 | 7.53M | $433.05M |
| 2026-08-06 | 9.92M | $570.21M |
| 2026-08-29 | 7.53M | $433.05M |
| 2026-09-06 | 9.92M | $570.21M |
| 2026-09-29 | 7.53M | $433.05M |
| 2026-10-06 | 9.92M | $570.21M |
| 2026-10-29 | 7.53M | $433.05M |
| 2026-11-06 | 9.92M | $570.21M |


---

## Aave (AAVE)

**Price:** $93.39    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $93.39 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −16.1K AAVE | −$1.51M | today @ $93.39 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −33.0K AAVE | −$3.08M | today @ $93.39 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −72.0K AAVE | −$6.72M | today @ $93.39 | 0.0000% |

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
| 2026-07-11 | 0 | 0 | −4.7K | −$442.5K |
| 2026-07-12 | 0 | 0 | −1.0K | −$97.7K |
| 2026-07-13 | 0 | 0 | 0 | $0 |
| 2026-07-14 | 0 | 0 | −2.4K | −$223.1K |
| 2026-07-15 | 0 | 0 | −2.5K | −$234.2K |
| 2026-07-16 | 0 | 0 | −4.5K | −$419.4K |
| 2026-07-17 | 0 | 0 | 0 | $0 |
| 2026-07-18 | 0 | 0 | 0 | $0 |
| 2026-07-19 | 0 | 0 | −4.4K | −$413.8K |
| 2026-07-20 | 0 | 0 | −291 | −$27.2K |
| 2026-07-21 | 0 | 0 | −237 | −$22.2K |
| 2026-07-22 | 0 | 0 | −11.1K | −$1.03M |
| 2026-07-23 | 0 | 0 | −96 | −$9.0K |
| 2026-07-24 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −3.39M SKY | −$193.7K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −6.76M SKY | −$386.5K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −42.51M SKY | −$2.43M | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −47.81M SKY | −$2.73M | today @ $0.06 | 0.0000% |

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
| 2026-07-11 | 0 | 0 | −3.48M | −$199.0K |
| 2026-07-12 | 0 | 0 | 0 | $0 |
| 2026-07-13 | 0 | 0 | −253.0K | −$14.5K |
| 2026-07-14 | 0 | 0 | 0 | $0 |
| 2026-07-15 | 0 | 0 | −676.1K | −$38.7K |
| 2026-07-16 | 0 | 0 | −11.41M | −$652.3K |
| 2026-07-17 | 0 | 0 | 0 | $0 |
| 2026-07-18 | 0 | 0 | −686.0K | −$39.2K |
| 2026-07-19 | 0 | 0 | −11.9K | −$679.90 |
| 2026-07-20 | 0 | 0 | −74.9K | −$4.3K |
| 2026-07-21 | 0 | 0 | −71.6K | −$4.1K |
| 2026-07-22 | 0 | 0 | −179.8K | −$10.3K |
| 2026-07-23 | 0 | 0 | −2.35M | −$134.2K |
| 2026-07-24 | 0 | 0 | −3.39M | −$193.7K |


---

## Lighter (LIT)

**Price:** $2.03    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.03 | 0.0000% |
| 7d | 6/7d | 0 | 139.1K | 🟢 −139.1K LIT | −$314.3K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 899.5K | 🟢 −899.5K LIT | −$1.92M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.92M | 🟢 −4.92M LIT | −$6.81M | per-day (100%) | 0.0000% |

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
| 2026-07-10 | 0 | 24.3K | −24.3K | −$58.2K |
| 2026-07-11 | 0 | 18.9K | −18.9K | −$50.8K |
| 2026-07-12 | 0 | 14.0K | −14.0K | −$36.1K |
| 2026-07-13 | 0 | 32.5K | −32.5K | −$85.3K |
| 2026-07-14 | 0 | 30.3K | −30.3K | −$69.8K |
| 2026-07-15 | 0 | 33.2K | −33.2K | −$86.1K |
| 2026-07-16 | 0 | 30.8K | −30.8K | −$74.4K |
| 2026-07-17 | 0 | 25.1K | −25.1K | −$57.2K |
| 2026-07-18 | 0 | 18.9K | −18.9K | −$43.3K |
| 2026-07-19 | 0 | 15.0K | −15.0K | −$33.9K |
| 2026-07-20 | 0 | 26.1K | −26.1K | −$57.6K |
| 2026-07-21 | 0 | 28.7K | −28.7K | −$62.6K |
| 2026-07-22 | 0 | 24.9K | −24.9K | −$58.3K |
| 2026-07-23 | 0 | 25.5K | −25.5K | −$58.7K |


---

## Morpho (MORPHO)

**Price:** $1.94    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$188.9K | today @ $1.94 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.32M | today @ $1.94 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.67M | today @ $1.94 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$17.00M | today @ $1.94 | 0.0000% |

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
| 2026-07-11 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-12 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-13 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-14 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-15 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-16 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-17 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-18 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-19 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-20 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-21 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-22 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-23 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-07-24 | 202.7K | 0 | +97.4K | +$188.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 202.7K | $393.2K |
| 2026-07-26 | 202.7K | $393.2K |
| 2026-07-27 | 202.7K | $393.2K |
| 2026-07-28 | 202.7K | $393.2K |
| 2026-07-29 | 202.7K | $393.2K |
| 2026-07-30 | 202.7K | $393.2K |
| 2026-07-31 | 202.7K | $393.2K |
| 2026-08-01 | 202.7K | $393.2K |


---

## Pendle (PENDLE)

**Price:** $1.50    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.50 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.50 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.50 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.50 | 0.0000% |

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

**Price:** $0.60    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$127.7K | today @ $0.60 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$893.7K | today @ $0.60 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.83M | today @ $0.60 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$11.49M | today @ $0.60 | 0.0000% |

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
| 2026-07-11 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-12 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-13 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-14 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-15 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-16 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-17 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-18 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-19 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-20 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-21 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-22 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-23 | 626.2K | 0 | +214.3K | +$127.7K |
| 2026-07-24 | 626.2K | 0 | +214.3K | +$127.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 626.2K | $373.0K |
| 2026-07-26 | 626.2K | $373.0K |
| 2026-07-27 | 626.2K | $373.0K |
| 2026-07-28 | 626.2K | $373.0K |
| 2026-07-29 | 626.2K | $373.0K |
| 2026-07-30 | 626.2K | $373.0K |
| 2026-07-31 | 626.2K | $373.0K |
| 2026-08-01 | 626.2K | $373.0K |


---

## Jupiter (JUP)

**Price:** $0.19    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 234 | 🟢 −234 JUP | −$44.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.73M | 🟢 −1.73M JUP | −$337.0K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 10.01M | 🔴 +5.54M JUP | +$1.45M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 34.05M | 🔴 +12.61M JUP | +$2.75M | per-day (100%) | 0.0000% |

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
| 2026-07-11 | 0 | 273.0K | −273.0K | −$55.5K |
| 2026-07-12 | 0 | 240.6K | −240.6K | −$48.7K |
| 2026-07-13 | 0 | 302.0K | −302.0K | −$60.7K |
| 2026-07-14 | 0 | 374.5K | −374.5K | −$77.5K |
| 2026-07-15 | 0 | 287.9K | −287.9K | −$60.9K |
| 2026-07-16 | 0 | 252.8K | −252.8K | −$52.3K |
| 2026-07-17 | 0 | 392.7K | −392.7K | −$77.2K |
| 2026-07-18 | 0 | 230.4K | −230.4K | −$44.7K |
| 2026-07-19 | 0 | 218.8K | −218.8K | −$42.6K |
| 2026-07-20 | 0 | 263.4K | −263.4K | −$51.6K |
| 2026-07-21 | 0 | 368.3K | −368.3K | −$72.2K |
| 2026-07-22 | 0 | 292.9K | −292.9K | −$58.4K |
| 2026-07-23 | 0 | 352.6K | −352.6K | −$67.4K |
| 2026-07-24 | 0 | 234 | −234 | −$44.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-27 | 53.47M | $9.92M |
| 2026-08-27 | 53.47M | $9.92M |
| 2026-09-27 | 53.47M | $9.92M |
| 2026-10-27 | 53.47M | $9.92M |
| 2026-11-27 | 53.47M | $9.92M |
| 2026-12-27 | 53.47M | $9.92M |
| 2027-01-27 | 53.47M | $9.92M |
| 2027-02-27 | 53.47M | $9.92M |


---

## Fluid (FLUID)

**Price:** $1.14    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.1K | today @ $1.14 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$21.9K | today @ $1.14 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$264.7K | today @ $1.14 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$794.1K | today @ $1.14 | 0.0000% |

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
| 2026-07-11 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-12 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-13 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-14 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-15 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-16 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-17 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-18 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-19 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-20 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-21 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-22 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-23 | 9.1K | 0 | +2.7K | +$3.1K |
| 2026-07-24 | 9.1K | 0 | +2.7K | +$3.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 9.1K | $10.4K |
| 2026-07-26 | 9.1K | $10.4K |
| 2026-07-27 | 9.1K | $10.4K |
| 2026-07-28 | 9.1K | $10.4K |
| 2026-07-29 | 9.1K | $10.4K |
| 2026-07-30 | 9.1K | $10.4K |
| 2026-07-31 | 9.1K | $10.4K |
| 2026-08-01 | 9.1K | $10.4K |


---

## Collector Crypt (CARDS)

**Price:** $0.12    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 4.33M | 🟢 −4.33M CARDS | −$566.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 18.62M | 🟢 −18.62M CARDS | −$2.73M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 14.25M | 58.37M | 🟢 −46.98M CARDS | −$8.18M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 42.76M | 181.03M | 🟢 −146.86M CARDS | −$24.93M | per-day (100%) | 0.0000% |

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
| 2026-07-11 | 0 | 852.3K | −852.3K | −$141.8K |
| 2026-07-12 | 0 | 836.1K | −836.1K | −$125.4K |
| 2026-07-13 | 0 | 2.61M | −2.61M | −$377.3K |
| 2026-07-14 | 0 | 3.53M | −3.53M | −$592.3K |
| 2026-07-15 | 0 | 2.99M | −2.99M | −$524.0K |
| 2026-07-16 | 0 | 2.02M | −2.02M | −$318.4K |
| 2026-07-17 | 0 | 2.09M | −2.09M | −$303.4K |
| 2026-07-18 | 0 | 2.56M | −2.56M | −$384.5K |
| 2026-07-19 | 0 | 1.22M | −1.22M | −$197.3K |
| 2026-07-20 | 0 | 1.75M | −1.75M | −$268.0K |
| 2026-07-21 | 0 | 813.8K | −813.8K | −$124.0K |
| 2026-07-22 | 0 | 3.64M | −3.64M | −$556.3K |
| 2026-07-23 | 0 | 4.31M | −4.31M | −$630.7K |
| 2026-07-24 | 0 | 4.33M | −4.33M | −$566.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 14.25M | $1.72M |
| 2026-09-01 | 44.67M | $5.40M |
| 2026-10-01 | 44.67M | $5.40M |
| 2026-11-01 | 44.67M | $5.40M |
| 2026-12-01 | 44.67M | $5.40M |
| 2027-01-01 | 44.67M | $5.40M |
| 2027-02-01 | 44.67M | $5.40M |
| 2027-03-01 | 44.67M | $5.40M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$293.9K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 2.52B | 1.58B | 🟢 −461.49M PUMP | −$863.1K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 18.64B | 8.67B | 🟢 −1.82B PUMP | −$3.00M | per-day (97%) | 0.0000% |
| 90d | 89/90d | 38.64B | 26.08B | 🟢 −13.23B PUMP | −$22.38M | per-day (99%) | 0.0000% |

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
| 2026-07-11 | 359.91M | 198.13M | −37.83M | −$55.2K |
| 2026-07-12 | 10.36B | 216.17M | +2.94B | +$4.09M |
| 2026-07-13 | 359.91M | 256.88M | −96.57M | −$141.1K |
| 2026-07-14 | 359.91M | 327.88M | −167.57M | −$247.9K |
| 2026-07-15 | 359.91M | 284.63M | −124.33M | −$188.0K |
| 2026-07-16 | 359.91M | 243.07M | −82.76M | −$139.8K |
| 2026-07-17 | 359.91M | 234.55M | −74.24M | −$125.9K |
| 2026-07-18 | 359.91M | 262.93M | −102.62M | −$167.9K |
| 2026-07-19 | 359.91M | 280.63M | −120.33M | −$200.0K |
| 2026-07-20 | 359.91M | 237.95M | −77.65M | −$155.0K |
| 2026-07-21 | 359.91M | 248.83M | −88.53M | −$179.2K |
| 2026-07-22 | 359.91M | 275.71M | −115.41M | −$231.1K |
| 2026-07-23 | 359.91M | 277.58M | −117.28M | −$223.8K |
| 2026-07-24 | 359.91M | 0 | +160.31M | +$293.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 359.91M | $659.8K |
| 2026-07-26 | 359.91M | $659.8K |
| 2026-07-27 | 359.91M | $659.8K |
| 2026-07-28 | 359.91M | $659.8K |
| 2026-07-29 | 359.91M | $659.8K |
| 2026-07-30 | 359.91M | $659.8K |
| 2026-07-31 | 359.91M | $659.8K |
| 2026-08-01 | 359.91M | $659.8K |


---

## LayerZero (ZRO)

**Price:** $0.85    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.85 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$9.70M | today @ $0.85 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 143.8K | 🔴 +11.32M ZRO | +$9.57M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 539.5K | 🔴 +33.85M ZRO | +$28.46M | per-day (57%) | 0.0000% |

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
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.70M |
| 2026-03-08 | 0 | 133.3K | −133.3K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.70M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.70M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.70M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.70M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$9.70M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-20 | 23.63M | $20.00M |
| 2026-09-20 | 23.63M | $20.00M |
| 2026-10-20 | 23.63M | $20.00M |
| 2026-11-20 | 23.63M | $20.00M |
| 2026-12-20 | 23.63M | $20.00M |
| 2027-01-20 | 23.63M | $20.00M |
| 2027-02-20 | 23.63M | $20.00M |
| 2027-03-20 | 23.63M | $20.00M |


---

## Ethena (ENA)

**Price:** $0.09    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$358.5K | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.51M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.76M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$32.27M | today @ $0.09 | 0.0000% |

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
| 2026-07-11 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-12 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-13 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-14 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-15 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-16 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-17 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-18 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-19 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-20 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-21 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-22 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-23 | 10.75M | 0 | +4.11M | +$358.5K |
| 2026-07-24 | 10.75M | 0 | +4.11M | +$358.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 10.75M | $937.4K |
| 2026-07-26 | 10.75M | $937.4K |
| 2026-07-27 | 10.75M | $937.4K |
| 2026-07-28 | 10.75M | $937.4K |
| 2026-07-29 | 10.75M | $937.4K |
| 2026-07-30 | 10.75M | $937.4K |
| 2026-07-31 | 10.75M | $937.4K |
| 2026-08-01 | 10.75M | $937.4K |


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

**Price:** $0.12    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$9.6K | today @ $0.12 | 0.0000% |
| 7d | 6/7d | 1.33M | 278.4K | 🔴 +260.1K DYDX | +$32.0K | per-day (86%) | 0.0000% |
| 30d | 24/30d | 5.68M | 1.87M | 🔴 +438.4K DYDX | +$60.3K | per-day (80%) | 0.0000% |
| 90d | 84/90d | 16.29M | 4.54M | 🔴 +2.08M DYDX | +$297.5K | per-day (93%) | 0.0000% |

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
| 2026-07-11 | 189.4K | 23.5K | +53.5K | +$7.0K |
| 2026-07-12 | 189.4K | 59.0K | +17.9K | +$2.3K |
| 2026-07-13 | 189.4K | 90.7K | −13.8K | −$1.8K |
| 2026-07-14 | 189.4K | 154.7K | −77.7K | −$9.4K |
| 2026-07-15 | 189.4K | 145.6K | −68.7K | −$8.2K |
| 2026-07-16 | 189.4K | 109.6K | −32.7K | −$4.0K |
| 2026-07-17 | 189.4K | 97.2K | −20.3K | −$2.5K |
| 2026-07-18 | 189.4K | 20.7K | +56.3K | +$7.0K |
| 2026-07-19 | 189.4K | 16.8K | +60.1K | +$7.3K |
| 2026-07-20 | 189.4K | 47.2K | +29.7K | +$3.5K |
| 2026-07-21 | 189.4K | 35.1K | +41.8K | +$5.1K |
| 2026-07-22 | 189.4K | 101.4K | −24.5K | −$3.0K |
| 2026-07-23 | 189.4K | 57.2K | +19.8K | +$2.5K |
| 2026-07-24 | 189.4K | 0 | +76.9K | +$9.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 189.4K | $23.6K |
| 2026-07-26 | 189.4K | $23.6K |
| 2026-07-27 | 189.4K | $23.6K |
| 2026-07-28 | 189.4K | $23.6K |
| 2026-07-29 | 189.4K | $23.6K |
| 2026-07-30 | 189.4K | $23.6K |
| 2026-07-31 | 189.4K | $23.6K |
| 2026-08-01 | 189.4K | $23.6K |


---

## Meteora (MET)

**Price:** $0.16    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$17.9K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$125.2K | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$536.8K | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.61M | today @ $0.16 | 0.0000% |

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
| 2026-07-11 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-12 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-13 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-14 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-15 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-16 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-17 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-18 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-19 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-20 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-21 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-22 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-23 | 291.3K | 0 | +110.1K | +$17.9K |
| 2026-07-24 | 291.3K | 0 | +110.1K | +$17.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 291.3K | $47.3K |
| 2026-07-26 | 291.3K | $47.3K |
| 2026-07-27 | 291.3K | $47.3K |
| 2026-07-28 | 291.3K | $47.3K |
| 2026-07-29 | 291.3K | $47.3K |
| 2026-07-30 | 291.3K | $47.3K |
| 2026-07-31 | 291.3K | $47.3K |
| 2026-08-01 | 291.3K | $47.3K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.4K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$17.1K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$73.5K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$220.5K | today @ $0.02 | 0.0000% |

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
| 2026-07-11 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-12 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-13 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-14 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-15 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-16 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-17 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-18 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-19 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-20 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-21 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-22 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-23 | 347.8K | 0 | +118.1K | +$2.4K |
| 2026-07-24 | 347.8K | 0 | +118.1K | +$2.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 347.8K | $7.2K |
| 2026-07-26 | 347.8K | $7.2K |
| 2026-07-27 | 347.8K | $7.2K |
| 2026-07-28 | 347.8K | $7.2K |
| 2026-07-29 | 347.8K | $7.2K |
| 2026-07-30 | 347.8K | $7.2K |
| 2026-07-31 | 347.8K | $7.2K |
| 2026-08-01 | 347.8K | $7.2K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$26.0K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$111.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 62.35M | 0 | 🔴 +30.74M DRIFT | +$376.6K | today @ $0.01 | 0.0000% |

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
| 2026-07-11 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-12 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-13 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-14 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-15 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-16 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-17 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-18 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-19 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-20 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-21 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-22 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-23 | 644.2K | 0 | +302.8K | +$3.7K |
| 2026-07-24 | 644.2K | 0 | +302.8K | +$3.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-25 | 644.2K | $7.9K |
| 2026-07-26 | 644.2K | $7.9K |
| 2026-07-27 | 644.2K | $7.9K |
| 2026-07-28 | 644.2K | $7.9K |
| 2026-07-29 | 644.2K | $7.9K |
| 2026-07-30 | 644.2K | $7.9K |
| 2026-07-31 | 644.2K | $7.9K |
| 2026-08-01 | 644.2K | $7.9K |


---

## Uniswap (UNI)

**Price:** $3.83    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 24.1K | 🟢 −24.1K UNI | −$90.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 170.2K | 🟢 −170.2K UNI | −$621.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 1.10M | 🟢 −1.10M UNI | −$3.56M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.96M | 🟢 −3.96M UNI | −$12.30M | per-day (100%) | 0.0000% |

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
| 2026-07-11 | 0 | 20.9K | −20.9K | −$73.5K |
| 2026-07-12 | 0 | 22.0K | −22.0K | −$80.4K |
| 2026-07-13 | 0 | 37.4K | −37.4K | −$134.2K |
| 2026-07-14 | 0 | 35.2K | −35.2K | −$125.1K |
| 2026-07-15 | 0 | 45.5K | −45.5K | −$166.8K |
| 2026-07-16 | 0 | 36.4K | −36.4K | −$131.7K |
| 2026-07-17 | 0 | 40.1K | −40.1K | −$141.8K |
| 2026-07-18 | 0 | 7.7K | −7.7K | −$28.1K |
| 2026-07-19 | 0 | 17.8K | −17.8K | −$63.5K |
| 2026-07-20 | 0 | 41.9K | −41.9K | −$147.3K |
| 2026-07-21 | 0 | 22.3K | −22.3K | −$81.1K |
| 2026-07-22 | 0 | 32.3K | −32.3K | −$120.1K |
| 2026-07-23 | 0 | 24.0K | −24.0K | −$90.7K |
| 2026-07-24 | 0 | 24.1K | −24.1K | −$90.7K |


---

## Raydium (RAY)

**Price:** $0.62    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 17.3K | 🟢 −17.3K RAY | −$11.1K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 110.4K | 🟢 −110.4K RAY | −$74.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 668.1K | 🟢 −668.1K RAY | −$441.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.66M | 🟢 −2.66M RAY | −$1.87M | per-day (100%) | 0.0000% |

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
| 2026-07-21 | 0 | 15.1K | −15.1K | −$10.7K |
| 2026-07-22 | 0 | 15.1K | −15.1K | −$10.8K |
| 2026-07-23 | 0 | 17.4K | −17.4K | −$11.6K |
| 2026-07-24 | 0 | 17.3K | −17.3K | −$11.1K |


---

## Euler (EUL)

**Price:** $1.05    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.05 | 0.0000% |

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

**Price:** $0.54    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.54 | 0.0000% |
| 7d | 6/7d | 0 | 35.1K | 🟢 −35.1K GNS | −$20.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 118.9K | 🟢 −118.9K GNS | −$70.5K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 900.5K | 🟢 −900.5K GNS | −$478.8K | per-day (100%) | 0.0000% |

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
| 2026-07-23 | 0 | 4.3K | −4.3K | −$2.4K |


---

## Orca (ORCA)

**Price:** $1.16    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.16 | 0.0000% |
| 7d | 6/7d | 0 | 8.2K | 🟢 −8.2K ORCA | −$9.8K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 60.5K | 🟢 −60.5K ORCA | −$71.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 184.7K | 🟢 −184.7K ORCA | −$233.9K | per-day (100%) | 0.0000% |

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
| 2026-07-10 | 0 | 1.8K | −1.8K | −$2.2K |
| 2026-07-11 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-12 | 0 | 1.2K | −1.2K | −$1.5K |
| 2026-07-13 | 0 | 1.9K | −1.9K | −$2.2K |
| 2026-07-14 | 0 | 2.0K | −2.0K | −$2.2K |
| 2026-07-15 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-07-16 | 0 | 1.6K | −1.6K | −$1.9K |
| 2026-07-17 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-07-18 | 0 | 832 | −832 | −$975.00 |
| 2026-07-19 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-20 | 0 | 2.1K | −2.1K | −$2.5K |
| 2026-07-21 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-07-22 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-07-23 | 0 | 1.3K | −1.3K | −$1.6K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 196.9K | 🟢 −196.9K MNDE | −$3.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.35M | 🟢 −1.35M MNDE | −$25.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 4.63M | 🟢 −4.63M MNDE | −$87.1K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 15.16M | 🟢 −15.16M MNDE | −$290.0K | per-day (100%) | 0.0000% |

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
| 2026-07-11 | 0 | 155.9K | −155.9K | −$3.0K |
| 2026-07-12 | 0 | 163.6K | −163.6K | −$3.1K |
| 2026-07-13 | 0 | 158.3K | −158.3K | −$3.0K |
| 2026-07-14 | 0 | 172.6K | −172.6K | −$3.3K |
| 2026-07-15 | 0 | 171.3K | −171.3K | −$3.2K |
| 2026-07-16 | 0 | 159.7K | −159.7K | −$3.0K |
| 2026-07-17 | 0 | 172.3K | −172.3K | −$3.3K |
| 2026-07-18 | 0 | 181.1K | −181.1K | −$3.4K |
| 2026-07-19 | 0 | 185.1K | −185.1K | −$3.5K |
| 2026-07-20 | 0 | 186.8K | −186.8K | −$3.5K |
| 2026-07-21 | 0 | 200.9K | −200.9K | −$3.8K |
| 2026-07-22 | 0 | 201.6K | −201.6K | −$3.8K |
| 2026-07-23 | 0 | 196.0K | −196.0K | −$3.7K |
| 2026-07-24 | 0 | 196.9K | −196.9K | −$3.7K |


---

## ether.fi (ETHFI)

**Price:** $0.44    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 9.2K | 🟢 −9.2K ETHFI | −$4.2K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 133.0K | 🟢 −133.0K ETHFI | −$60.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 719.7K | 🟢 −719.7K ETHFI | −$282.3K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.43M | 🟢 −2.43M ETHFI | −$933.8K | per-day (100%) | 0.0000% |

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
| 2026-07-23 | 0 | 21.2K | −21.2K | −$9.8K |
| 2026-07-24 | 0 | 9.2K | −9.2K | −$4.2K |


---

## CoW Protocol (COW)

**Price:** $0.13    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.13 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 616.7K | 🟢 −616.7K COW | −$82.7K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 5.37M | 🟢 −5.37M COW | −$768.0K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 18.22M | 🟢 −18.22M COW | −$2.78M | per-day (100%) | 0.0000% |

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
| 2026-07-09 | 0 | 72.1K | −72.1K | −$9.8K |
| 2026-07-10 | 0 | 182.9K | −182.9K | −$25.2K |
| 2026-07-11 | 0 | 139.1K | −139.1K | −$19.6K |
| 2026-07-12 | 0 | 82.3K | −82.3K | −$11.5K |
| 2026-07-13 | 0 | 326.0K | −326.0K | −$45.4K |
| 2026-07-14 | 0 | 316.4K | −316.4K | −$43.3K |
| 2026-07-15 | 0 | 149.8K | −149.8K | −$21.6K |
| 2026-07-16 | 0 | 153.5K | −153.5K | −$22.5K |
| 2026-07-17 | 0 | 136.5K | −136.5K | −$19.9K |
| 2026-07-18 | 0 | 61.5K | −61.5K | −$8.2K |
| 2026-07-19 | 0 | 73.5K | −73.5K | −$9.8K |
| 2026-07-20 | 0 | 185.5K | −185.5K | −$24.6K |
| 2026-07-21 | 0 | 174.2K | −174.2K | −$23.3K |
| 2026-07-22 | 0 | 121.9K | −121.9K | −$16.8K |


---
