# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-07-31T06:55:41.827Z
**As-of:** 2026-07-31

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $55.38    **Circulating:** 537.69M HYPE    **AF balance:** 46.14M HYPE    **Total staked:** 435.96M HYPE (81.1% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 7.2K | 🟢 −467.2K HYPE | −$25.87M | today @ $55.38 | -0.0467% |
| 7d | 7/7d | 7.53M | 93.2K | 🔴 +2.21M HYPE | +$122.45M | today @ $55.38 | 0.2211% |
| 30d | 30/30d | 17.45M | 142.2K | 🟢 −4.36M HYPE | −$241.54M | today @ $55.38 | -0.4361% |
| 90d | 90/90d | 52.34M | 832.3K | 🟢 −9.17M HYPE | −$512.96M | per-day (22%) | -0.9171% |

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
| 2026-07-18 | 0 | 1.4K | −1.4K | −$77.8K |
| 2026-07-19 | 0 | 4.3K | −41.8K | −$2.31M |
| 2026-07-20 | 0 | 1.2K | −141.6K | −$7.84M |
| 2026-07-21 | 0 | 4.6K | −4.6K | −$255.2K |
| 2026-07-22 | 0 | 95 | −95 | −$5.3K |
| 2026-07-23 | 0 | 3.8K | −3.8K | −$211.1K |
| 2026-07-24 | 0 | 6.9K | −5.45M | −$301.71M |
| 2026-07-25 | 0 | 75 | −37.4K | −$2.07M |
| 2026-07-26 | 0 | 1.2K | −158.7K | −$8.79M |
| 2026-07-27 | 0 | 10.1K | −63.6K | −$3.52M |
| 2026-07-28 | 0 | 25.1K | −25.1K | −$1.39M |
| 2026-07-29 | 7.53M | 28.3K | +2.98M | +$165.27M |
| 2026-07-30 | 0 | 21.1K | −21.1K | −$1.17M |
| 2026-07-31 | 0 | 7.2K | −467.2K | −$25.87M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-06 | 9.92M | $549.18M |
| 2026-08-29 | 7.53M | $417.09M |
| 2026-09-06 | 9.92M | $549.18M |
| 2026-09-29 | 7.53M | $417.09M |
| 2026-10-06 | 9.92M | $549.18M |
| 2026-10-29 | 7.53M | $417.09M |
| 2026-11-06 | 9.92M | $549.18M |
| 2026-11-29 | 7.53M | $417.09M |


---

## Aave (AAVE)

**Price:** $98.99    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $98.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −83.2K AAVE | −$8.24M | today @ $98.99 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −116.0K AAVE | −$11.49M | today @ $98.99 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −155.2K AAVE | −$15.36M | today @ $98.99 | 0.0000% |

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
| 2026-07-18 | 0 | 0 | 0 | $0 |
| 2026-07-19 | 0 | 0 | −4.4K | −$438.6K |
| 2026-07-20 | 0 | 0 | −291 | −$28.9K |
| 2026-07-21 | 0 | 0 | −237 | −$23.5K |
| 2026-07-22 | 0 | 0 | −11.1K | −$1.10M |
| 2026-07-23 | 0 | 0 | −96 | −$9.5K |
| 2026-07-24 | 0 | 0 | 0 | $0 |
| 2026-07-25 | 0 | 0 | 0 | $0 |
| 2026-07-26 | 0 | 0 | −844 | −$83.5K |
| 2026-07-27 | 0 | 0 | −32 | −$3.1K |
| 2026-07-28 | 0 | 0 | −1.7K | −$164.5K |
| 2026-07-29 | 0 | 0 | −80.7K | −$7.99M |
| 2026-07-30 | 0 | 0 | 0 | $0 |
| 2026-07-31 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −86.5K SKY | −$5.0K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −11.66M SKY | −$677.2K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −53.61M SKY | −$3.11M | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −59.47M SKY | −$3.45M | today @ $0.06 | 0.0000% |

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
| 2026-07-18 | 0 | 0 | −686.0K | −$39.8K |
| 2026-07-19 | 0 | 0 | −11.9K | −$690.83 |
| 2026-07-20 | 0 | 0 | −74.9K | −$4.3K |
| 2026-07-21 | 0 | 0 | −71.6K | −$4.2K |
| 2026-07-22 | 0 | 0 | −179.8K | −$10.4K |
| 2026-07-23 | 0 | 0 | −2.35M | −$136.4K |
| 2026-07-24 | 0 | 0 | −3.39M | −$196.8K |
| 2026-07-25 | 0 | 0 | −445.3K | −$25.9K |
| 2026-07-26 | 0 | 0 | 0 | $0 |
| 2026-07-27 | 0 | 0 | −259.6K | −$15.1K |
| 2026-07-28 | 0 | 0 | −1.24M | −$71.8K |
| 2026-07-29 | 0 | 0 | −5.68M | −$330.0K |
| 2026-07-30 | 0 | 0 | −3.95M | −$229.4K |
| 2026-07-31 | 0 | 0 | −86.5K | −$5.0K |


---

## Lighter (LIT)

**Price:** $2.22    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.22 | 0.0000% |
| 7d | 6/7d | 0 | 225.3K | 🟢 −225.3K LIT | −$487.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 826.1K | 🟢 −826.1K LIT | −$1.90M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.60M | 🟢 −4.60M LIT | −$6.84M | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 25.1K | −25.1K | −$57.2K |
| 2026-07-18 | 0 | 19.0K | −19.0K | −$43.3K |
| 2026-07-19 | 0 | 15.0K | −15.0K | −$33.9K |
| 2026-07-20 | 0 | 26.2K | −26.2K | −$57.6K |
| 2026-07-21 | 0 | 28.7K | −28.7K | −$62.6K |
| 2026-07-22 | 0 | 25.0K | −25.0K | −$58.3K |
| 2026-07-23 | 0 | 25.5K | −25.5K | −$58.7K |
| 2026-07-24 | 0 | 28.2K | −28.2K | −$60.9K |
| 2026-07-25 | 0 | 13.6K | −13.6K | −$27.6K |
| 2026-07-26 | 0 | 17.8K | −17.8K | −$36.7K |
| 2026-07-27 | 0 | 55.1K | −55.1K | −$118.0K |
| 2026-07-28 | 0 | 41.0K | −41.0K | −$87.3K |
| 2026-07-29 | 0 | 45.5K | −45.5K | −$104.5K |
| 2026-07-30 | 0 | 52.3K | −52.3K | −$113.5K |


---

## Morpho (MORPHO)

**Price:** $1.98    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$192.8K | today @ $1.98 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.35M | today @ $1.98 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.78M | today @ $1.98 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$17.35M | today @ $1.98 | 0.0000% |

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
| 2026-07-18 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-19 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-20 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-21 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-22 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-23 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-24 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-25 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-26 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-27 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-28 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-29 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-30 | 202.7K | 0 | +97.4K | +$192.8K |
| 2026-07-31 | 202.7K | 0 | +97.4K | +$192.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 202.7K | $401.3K |
| 2026-08-02 | 202.7K | $401.3K |
| 2026-08-03 | 202.7K | $401.3K |
| 2026-08-04 | 202.7K | $401.3K |
| 2026-08-05 | 202.7K | $401.3K |
| 2026-08-06 | 202.7K | $401.3K |
| 2026-08-07 | 202.7K | $401.3K |
| 2026-08-08 | 202.7K | $401.3K |


---

## Pendle (PENDLE)

**Price:** $1.41    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.41 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.41 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.41 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.41 | 0.0000% |

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

**Price:** $0.51    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$109.7K | today @ $0.51 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$767.6K | today @ $0.51 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.29M | today @ $0.51 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$9.87M | today @ $0.51 | 0.0000% |

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
| 2026-07-18 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-19 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-20 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-21 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-22 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-23 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-24 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-25 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-26 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-27 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-28 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-29 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-30 | 626.2K | 0 | +214.3K | +$109.7K |
| 2026-07-31 | 626.2K | 0 | +214.3K | +$109.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 626.2K | $320.4K |
| 2026-08-02 | 626.2K | $320.4K |
| 2026-08-03 | 626.2K | $320.4K |
| 2026-08-04 | 626.2K | $320.4K |
| 2026-08-05 | 626.2K | $320.4K |
| 2026-08-06 | 626.2K | $320.4K |
| 2026-08-07 | 626.2K | $320.4K |
| 2026-08-08 | 626.2K | $320.4K |


---

## Jupiter (JUP)

**Price:** $0.19    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.19 | 0.0000% |
| 7d | 6/7d | 53.47M | 1.97M | 🔴 +13.58M JUP | +$2.61M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 9.52M | 🔴 +6.03M JUP | +$988.1K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 33.97M | 🔴 +12.69M JUP | +$2.89M | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 392.7K | −392.7K | −$77.2K |
| 2026-07-18 | 0 | 230.4K | −230.4K | −$44.7K |
| 2026-07-19 | 0 | 218.8K | −218.8K | −$42.6K |
| 2026-07-20 | 0 | 263.4K | −263.4K | −$51.6K |
| 2026-07-21 | 0 | 368.3K | −368.3K | −$72.2K |
| 2026-07-22 | 0 | 292.9K | −292.9K | −$58.4K |
| 2026-07-23 | 0 | 362.8K | −362.8K | −$69.4K |
| 2026-07-24 | 0 | 335.3K | −335.3K | −$62.7K |
| 2026-07-25 | 0 | 236.0K | −236.0K | −$44.2K |
| 2026-07-26 | 0 | 281.6K | −281.6K | −$52.4K |
| 2026-07-27 | 53.47M | 416.9K | +15.14M | +$2.90M |
| 2026-07-28 | 0 | 415.2K | −415.2K | −$75.4K |
| 2026-07-29 | 0 | 389.1K | −389.1K | −$74.7K |
| 2026-07-30 | 0 | 230.7K | −230.7K | −$45.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-27 | 53.47M | $10.37M |
| 2026-09-27 | 53.47M | $10.37M |
| 2026-10-27 | 53.47M | $10.37M |
| 2026-11-27 | 53.47M | $10.37M |
| 2026-12-27 | 53.47M | $10.37M |
| 2027-01-27 | 53.47M | $10.37M |
| 2027-02-27 | 53.47M | $10.37M |
| 2027-03-27 | 53.47M | $10.37M |


---

## Fluid (FLUID)

**Price:** $1.18    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.2K | today @ $1.18 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$22.6K | today @ $1.18 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$274.0K | today @ $1.18 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$822.0K | today @ $1.18 | 0.0000% |

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
| 2026-07-18 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-19 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-20 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-21 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-22 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-23 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-24 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-25 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-26 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-27 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-28 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-29 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-30 | 9.1K | 0 | +2.7K | +$3.2K |
| 2026-07-31 | 9.1K | 0 | +2.7K | +$3.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 9.1K | $10.8K |
| 2026-08-02 | 9.1K | $10.8K |
| 2026-08-03 | 9.1K | $10.8K |
| 2026-08-04 | 9.1K | $10.8K |
| 2026-08-05 | 509.1K | $600.8K |
| 2026-08-06 | 9.1K | $10.8K |
| 2026-08-07 | 9.1K | $10.8K |
| 2026-08-08 | 9.1K | $10.8K |


---

## Collector Crypt (CARDS)

**Price:** $0.16    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.16 | 0.0000% |
| 7d | 6/7d | 0 | 10.98M | 🟢 −10.98M CARDS | −$1.40M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 56.21M | 🟢 −56.21M CARDS | −$8.87M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 28.51M | 174.75M | 🟢 −151.97M CARDS | −$25.70M | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 2.09M | −2.09M | −$303.4K |
| 2026-07-18 | 0 | 2.56M | −2.56M | −$384.5K |
| 2026-07-19 | 0 | 1.22M | −1.22M | −$197.3K |
| 2026-07-20 | 0 | 1.75M | −1.75M | −$268.0K |
| 2026-07-21 | 0 | 813.8K | −813.8K | −$124.0K |
| 2026-07-22 | 0 | 3.64M | −3.64M | −$556.3K |
| 2026-07-23 | 0 | 4.31M | −4.31M | −$630.7K |
| 2026-07-24 | 0 | 2.22M | −2.22M | −$281.8K |
| 2026-07-25 | 0 | 2.19M | −2.19M | −$268.8K |
| 2026-07-26 | 0 | 888.1K | −888.1K | −$108.4K |
| 2026-07-27 | 0 | 1.80M | −1.80M | −$214.1K |
| 2026-07-28 | 0 | 1.02M | −1.02M | −$139.0K |
| 2026-07-29 | 0 | 3.08M | −3.08M | −$407.0K |
| 2026-07-30 | 0 | 2.01M | −2.01M | −$258.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 14.25M | $2.26M |
| 2026-09-01 | 44.67M | $7.07M |
| 2026-10-01 | 44.67M | $7.07M |
| 2026-11-01 | 44.67M | $7.07M |
| 2026-12-01 | 44.67M | $7.07M |
| 2027-01-01 | 44.67M | $7.07M |
| 2027-02-01 | 44.67M | $7.07M |
| 2027-03-01 | 44.67M | $7.07M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$323.0K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 2.52B | 2.00B | 🟢 −877.21M PUMP | −$1.67M | per-day (86%) | 0.0000% |
| 30d | 29/30d | 20.80B | 8.56B | 🟢 −752.89M PUMP | −$2.17M | per-day (97%) | 0.0000% |
| 90d | 89/90d | 41.16B | 25.33B | 🟢 −11.36B PUMP | −$19.16M | per-day (99%) | 0.0000% |

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
| 2026-07-18 | 359.91M | 262.93M | −102.62M | −$167.9K |
| 2026-07-19 | 359.91M | 280.63M | −120.33M | −$200.0K |
| 2026-07-20 | 359.91M | 237.95M | −77.65M | −$155.0K |
| 2026-07-21 | 359.91M | 248.83M | −88.53M | −$179.2K |
| 2026-07-22 | 359.91M | 275.71M | −115.41M | −$231.1K |
| 2026-07-23 | 359.91M | 277.58M | −117.28M | −$223.8K |
| 2026-07-24 | 359.91M | 315.23M | −154.92M | −$283.8K |
| 2026-07-25 | 359.91M | 290.24M | −129.93M | −$237.9K |
| 2026-07-26 | 359.91M | 330.09M | −169.78M | −$302.3K |
| 2026-07-27 | 359.91M | 344.54M | −184.23M | −$367.4K |
| 2026-07-28 | 359.91M | 313.27M | −152.96M | −$323.6K |
| 2026-07-29 | 359.91M | 341.82M | −181.51M | −$358.4K |
| 2026-07-30 | 359.91M | 379.41M | −219.11M | −$407.7K |
| 2026-07-31 | 359.91M | 0 | +160.31M | +$323.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 359.91M | $725.1K |
| 2026-08-02 | 359.91M | $725.1K |
| 2026-08-03 | 359.91M | $725.1K |
| 2026-08-04 | 359.91M | $725.1K |
| 2026-08-05 | 359.91M | $725.1K |
| 2026-08-06 | 359.91M | $725.1K |
| 2026-08-07 | 359.91M | $725.1K |
| 2026-08-08 | 359.91M | $725.1K |


---

## LayerZero (ZRO)

**Price:** $0.73    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.73 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.73 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 143.8K | 🔴 +11.32M ZRO | +$8.24M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 539.5K | 🔴 +33.85M ZRO | +$24.50M | per-day (57%) | 0.0000% |

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
| 2026-02-20 | 23.63M | 0 | +11.46M | +$8.38M |
| 2026-03-08 | 0 | 133.3K | −133.3K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$8.38M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$8.38M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$8.38M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$8.38M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$8.38M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-20 | 23.63M | $17.27M |
| 2026-09-20 | 23.63M | $17.27M |
| 2026-10-20 | 23.63M | $17.27M |
| 2026-11-20 | 23.63M | $17.27M |
| 2026-12-20 | 23.63M | $17.27M |
| 2027-01-20 | 23.63M | $17.27M |
| 2027-02-20 | 23.63M | $17.27M |
| 2027-03-20 | 23.63M | $17.27M |


---

## Ethena (ENA)

**Price:** $0.08    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$333.1K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.33M | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$9.99M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$29.98M | today @ $0.08 | 0.0000% |

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
| 2026-07-18 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-19 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-20 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-21 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-22 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-23 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-24 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-25 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-26 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-27 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-28 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-29 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-30 | 10.75M | 0 | +4.11M | +$333.1K |
| 2026-07-31 | 10.75M | 0 | +4.11M | +$333.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 10.75M | $871.0K |
| 2026-08-02 | 10.75M | $871.0K |
| 2026-08-03 | 10.75M | $871.0K |
| 2026-08-04 | 10.75M | $871.0K |
| 2026-08-05 | 10.75M | $871.0K |
| 2026-08-06 | 10.75M | $871.0K |
| 2026-08-07 | 10.75M | $871.0K |
| 2026-08-08 | 10.75M | $871.0K |


---

## Aerodrome (AERO)

**Price:** $0.43    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.43 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.43 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.43 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.43 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$8.4K | today @ $0.11 | 0.0000% |
| 7d | 6/7d | 1.33M | 240.4K | 🔴 +298.1K DYDX | +$35.1K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 2.17M | 🔴 +140.9K DYDX | +$16.1K | per-day (97%) | 0.0000% |
| 90d | 84/90d | 17.04M | 4.48M | 🔴 +2.45M DYDX | +$342.9K | per-day (93%) | 0.0000% |

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
| 2026-07-18 | 189.4K | 20.7K | +56.2K | +$7.0K |
| 2026-07-19 | 189.4K | 16.8K | +60.1K | +$7.3K |
| 2026-07-20 | 189.4K | 47.2K | +29.7K | +$3.5K |
| 2026-07-21 | 189.4K | 35.2K | +41.8K | +$5.0K |
| 2026-07-22 | 189.4K | 101.5K | −24.6K | −$3.0K |
| 2026-07-23 | 189.4K | 57.1K | +19.8K | +$2.5K |
| 2026-07-24 | 189.4K | 82.6K | −5.7K | −$703.66 |
| 2026-07-25 | 189.4K | 14.5K | +62.4K | +$7.7K |
| 2026-07-26 | 189.4K | 21.0K | +55.9K | +$6.9K |
| 2026-07-27 | 189.4K | 49.7K | +27.2K | +$3.5K |
| 2026-07-28 | 189.4K | 74.2K | +2.8K | +$319.99 |
| 2026-07-29 | 189.4K | 41.1K | +35.8K | +$4.2K |
| 2026-07-30 | 189.4K | 40.0K | +37.0K | +$4.1K |
| 2026-07-31 | 189.4K | 0 | +76.9K | +$8.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 189.4K | $20.7K |
| 2026-08-02 | 189.4K | $20.7K |
| 2026-08-03 | 189.4K | $20.7K |
| 2026-08-04 | 189.4K | $20.7K |
| 2026-08-05 | 189.4K | $20.7K |
| 2026-08-06 | 189.4K | $20.7K |
| 2026-08-07 | 189.4K | $20.7K |
| 2026-08-08 | 189.4K | $20.7K |


---

## Meteora (MET)

**Price:** $0.17    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$18.6K | today @ $0.17 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$130.2K | today @ $0.17 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$558.0K | today @ $0.17 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.67M | today @ $0.17 | 0.0000% |

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
| 2026-07-18 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-19 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-20 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-21 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-22 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-23 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-24 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-25 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-26 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-27 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-28 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-29 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-30 | 291.3K | 0 | +110.1K | +$18.6K |
| 2026-07-31 | 291.3K | 0 | +110.1K | +$18.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 291.3K | $49.2K |
| 2026-08-02 | 291.3K | $49.2K |
| 2026-08-03 | 291.3K | $49.2K |
| 2026-08-04 | 291.3K | $49.2K |
| 2026-08-05 | 291.3K | $49.2K |
| 2026-08-06 | 291.3K | $49.2K |
| 2026-08-07 | 291.3K | $49.2K |
| 2026-08-08 | 291.3K | $49.2K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.3K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$15.8K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$67.7K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$203.0K | today @ $0.02 | 0.0000% |

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
| 2026-07-18 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-19 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-20 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-21 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-22 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-23 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-24 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-25 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-26 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-27 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-28 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-29 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-30 | 347.8K | 0 | +118.1K | +$2.3K |
| 2026-07-31 | 347.8K | 0 | +118.1K | +$2.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 347.8K | $6.6K |
| 2026-08-02 | 347.8K | $6.6K |
| 2026-08-03 | 347.8K | $6.6K |
| 2026-08-04 | 347.8K | $6.6K |
| 2026-08-05 | 347.8K | $6.6K |
| 2026-08-06 | 347.8K | $6.6K |
| 2026-08-07 | 347.8K | $6.6K |
| 2026-08-08 | 347.8K | $6.6K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.5K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$24.8K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$106.1K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 60.82M | 0 | 🔴 +29.52M DRIFT | +$344.9K | today @ $0.01 | 0.0000% |

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
| 2026-07-18 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-19 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-20 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-21 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-22 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-23 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-24 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-25 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-26 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-27 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-28 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-29 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-30 | 644.2K | 0 | +302.8K | +$3.5K |
| 2026-07-31 | 644.2K | 0 | +302.8K | +$3.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 644.2K | $7.5K |
| 2026-08-02 | 644.2K | $7.5K |
| 2026-08-03 | 644.2K | $7.5K |
| 2026-08-04 | 644.2K | $7.5K |
| 2026-08-05 | 644.2K | $7.5K |
| 2026-08-06 | 644.2K | $7.5K |
| 2026-08-07 | 644.2K | $7.5K |
| 2026-08-08 | 644.2K | $7.5K |


---

## Uniswap (UNI)

**Price:** $4.49    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.49 | 0.0000% |
| 7d | 6/7d | 0 | 365.1K | 🟢 −365.1K UNI | −$1.40M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.12M | 🟢 −1.12M UNI | −$3.96M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.09M | 🟢 −4.09M UNI | −$12.91M | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 40.0K | −40.0K | −$141.8K |
| 2026-07-18 | 0 | 7.8K | −7.8K | −$28.1K |
| 2026-07-19 | 0 | 17.8K | −17.8K | −$63.5K |
| 2026-07-20 | 0 | 42.0K | −42.0K | −$147.3K |
| 2026-07-21 | 0 | 22.4K | −22.4K | −$81.1K |
| 2026-07-22 | 0 | 32.3K | −32.3K | −$120.1K |
| 2026-07-23 | 0 | 24.0K | −24.0K | −$90.7K |
| 2026-07-24 | 0 | 22.2K | −22.2K | −$83.6K |
| 2026-07-25 | 0 | 15.5K | −15.5K | −$58.7K |
| 2026-07-26 | 0 | 19.0K | −19.0K | −$69.7K |
| 2026-07-27 | 0 | 63.2K | −63.2K | −$245.1K |
| 2026-07-28 | 0 | 92.0K | −92.0K | −$339.7K |
| 2026-07-29 | 0 | 109.0K | −109.0K | −$423.5K |
| 2026-07-30 | 0 | 66.3K | −66.3K | −$264.3K |


---

## Raydium (RAY)

**Price:** $0.61    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 19.0K | 🟢 −19.0K RAY | −$11.6K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 139.3K | 🟢 −139.3K RAY | −$85.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 578.0K | 🟢 −578.0K RAY | −$388.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.60M | 🟢 −2.60M RAY | −$1.80M | per-day (100%) | 0.0000% |

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
| 2026-07-18 | 0 | 13.7K | −13.7K | −$9.3K |
| 2026-07-19 | 0 | 12.7K | −12.7K | −$8.6K |
| 2026-07-20 | 0 | 19.1K | −19.1K | −$12.9K |
| 2026-07-21 | 0 | 15.1K | −15.1K | −$10.7K |
| 2026-07-22 | 0 | 15.1K | −15.1K | −$10.8K |
| 2026-07-23 | 0 | 17.4K | −17.4K | −$11.6K |
| 2026-07-24 | 0 | 15.0K | −15.0K | −$9.6K |
| 2026-07-25 | 0 | 11.0K | −11.0K | −$6.8K |
| 2026-07-26 | 0 | 12.5K | −12.5K | −$7.8K |
| 2026-07-27 | 0 | 33.5K | −33.5K | −$21.4K |
| 2026-07-28 | 0 | 21.6K | −21.6K | −$13.0K |
| 2026-07-29 | 0 | 21.9K | −21.9K | −$13.3K |
| 2026-07-30 | 0 | 19.8K | −19.8K | −$11.9K |
| 2026-07-31 | 0 | 19.0K | −19.0K | −$11.6K |


---

## Euler (EUL)

**Price:** $1.53    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.53 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.53 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.53 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.53 | 0.0000% |

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

**Price:** $0.49    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.49 | 0.0000% |
| 7d | 6/7d | 0 | 39.7K | 🟢 −39.7K GNS | −$20.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 142.4K | 🟢 −142.4K GNS | −$82.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 891.2K | 🟢 −891.2K GNS | −$469.4K | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 7.0K | −7.0K | −$4.3K |
| 2026-07-18 | 0 | 3.9K | −3.9K | −$2.4K |
| 2026-07-19 | 0 | 7.7K | −7.7K | −$4.6K |
| 2026-07-20 | 0 | 8.7K | −8.7K | −$5.3K |
| 2026-07-21 | 0 | 4.1K | −4.1K | −$2.3K |
| 2026-07-22 | 0 | 6.5K | −6.5K | −$3.6K |
| 2026-07-23 | 0 | 4.3K | −4.3K | −$2.4K |
| 2026-07-24 | 0 | 4.2K | −4.2K | −$2.3K |
| 2026-07-25 | 0 | 2.5K | −2.5K | −$1.3K |
| 2026-07-26 | 0 | 6.3K | −6.3K | −$3.4K |
| 2026-07-27 | 0 | 12.0K | −12.0K | −$6.4K |
| 2026-07-28 | 0 | 6.5K | −6.5K | −$3.2K |
| 2026-07-29 | 0 | 8.2K | −8.2K | −$4.0K |
| 2026-07-30 | 0 | 4.1K | −4.1K | −$2.0K |


---

## Orca (ORCA)

**Price:** $1.14    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 1.3K | 🟢 −1.3K ORCA | −$1.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 9.3K | 🟢 −9.3K ORCA | −$10.9K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 49.6K | 🟢 −49.6K ORCA | −$59.4K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 184.2K | 🟢 −184.2K ORCA | −$229.2K | per-day (100%) | 0.0000% |

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
| 2026-07-18 | 0 | 832 | −832 | −$975.00 |
| 2026-07-19 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-20 | 0 | 2.1K | −2.1K | −$2.5K |
| 2026-07-21 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-07-22 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-07-23 | 0 | 1.3K | −1.3K | −$1.6K |
| 2026-07-24 | 0 | 1.1K | −1.1K | −$1.3K |
| 2026-07-25 | 0 | 637 | −637 | −$746.00 |
| 2026-07-26 | 0 | 841 | −841 | −$995.00 |
| 2026-07-27 | 0 | 2.0K | −2.0K | −$2.4K |
| 2026-07-28 | 0 | 1.4K | −1.4K | −$1.7K |
| 2026-07-29 | 0 | 1.9K | −1.9K | −$2.2K |
| 2026-07-30 | 0 | 1.3K | −1.3K | −$1.4K |
| 2026-07-31 | 0 | 1.3K | −1.3K | −$1.5K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 196.0K | 🟢 −196.0K MNDE | −$3.6K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.35M | 🟢 −1.35M MNDE | −$25.2K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 5.17M | 🟢 −5.17M MNDE | −$97.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 14.88M | 🟢 −14.88M MNDE | −$283.9K | per-day (100%) | 0.0000% |

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
| 2026-07-18 | 0 | 181.1K | −181.1K | −$3.4K |
| 2026-07-19 | 0 | 185.1K | −185.1K | −$3.5K |
| 2026-07-20 | 0 | 186.8K | −186.8K | −$3.5K |
| 2026-07-21 | 0 | 200.9K | −200.9K | −$3.8K |
| 2026-07-22 | 0 | 201.6K | −201.6K | −$3.8K |
| 2026-07-23 | 0 | 196.0K | −196.0K | −$3.7K |
| 2026-07-24 | 0 | 191.3K | −191.3K | −$3.6K |
| 2026-07-25 | 0 | 192.0K | −192.0K | −$3.6K |
| 2026-07-26 | 0 | 197.4K | −197.4K | −$3.7K |
| 2026-07-27 | 0 | 183.5K | −183.5K | −$3.6K |
| 2026-07-28 | 0 | 189.5K | −189.5K | −$3.5K |
| 2026-07-29 | 0 | 191.3K | −191.3K | −$3.6K |
| 2026-07-30 | 0 | 195.9K | −195.9K | −$3.6K |
| 2026-07-31 | 0 | 196.0K | −196.0K | −$3.6K |


---

## ether.fi (ETHFI)

**Price:** $0.40    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.40 | 0.0000% |
| 7d | 6/7d | 0 | 140.1K | 🟢 −140.1K ETHFI | −$57.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 689.2K | 🟢 −689.2K ETHFI | −$282.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.37M | 🟢 −2.37M ETHFI | −$906.3K | per-day (100%) | 0.0000% |

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
| 2026-07-17 | 0 | 20.4K | −20.4K | −$8.5K |
| 2026-07-18 | 0 | 20.5K | −20.5K | −$9.0K |
| 2026-07-19 | 0 | 21.0K | −21.0K | −$9.4K |
| 2026-07-20 | 0 | 20.3K | −20.3K | −$9.0K |
| 2026-07-21 | 0 | 21.8K | −21.8K | −$9.9K |
| 2026-07-22 | 0 | 19.1K | −19.1K | −$8.8K |
| 2026-07-23 | 0 | 21.2K | −21.2K | −$9.8K |
| 2026-07-24 | 0 | 22.0K | −22.0K | −$9.9K |
| 2026-07-25 | 0 | 20.3K | −20.3K | −$8.5K |
| 2026-07-26 | 0 | 21.8K | −21.8K | −$8.9K |
| 2026-07-27 | 0 | 24.5K | −24.5K | −$10.5K |
| 2026-07-28 | 0 | 23.0K | −23.0K | −$9.4K |
| 2026-07-29 | 0 | 25.2K | −25.2K | −$10.5K |
| 2026-07-30 | 0 | 25.4K | −25.4K | −$10.1K |


---

## CoW Protocol (COW)

**Price:** $0.12    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.12 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 648.2K | 🟢 −648.2K COW | −$84.7K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 4.26M | 🟢 −4.26M COW | −$594.1K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 18.52M | 🟢 −18.52M COW | −$2.79M | per-day (100%) | 0.0000% |

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
| 2026-07-15 | 0 | 149.8K | −149.8K | −$21.6K |
| 2026-07-16 | 0 | 153.5K | −153.5K | −$22.5K |
| 2026-07-17 | 0 | 136.5K | −136.5K | −$19.9K |
| 2026-07-18 | 0 | 61.5K | −61.5K | −$8.2K |
| 2026-07-19 | 0 | 73.5K | −73.5K | −$9.8K |
| 2026-07-20 | 0 | 185.5K | −185.5K | −$24.6K |
| 2026-07-21 | 0 | 174.2K | −174.2K | −$23.3K |
| 2026-07-22 | 0 | 121.9K | −121.9K | −$16.8K |
| 2026-07-23 | 0 | 159.5K | −159.5K | −$21.9K |
| 2026-07-24 | 0 | 134.7K | −134.7K | −$18.0K |
| 2026-07-26 | 0 | 120.8K | −120.8K | −$15.9K |
| 2026-07-27 | 0 | 204.5K | −204.5K | −$27.5K |
| 2026-07-28 | 0 | 182.9K | −182.9K | −$23.6K |
| 2026-07-29 | 0 | 140.1K | −140.1K | −$17.6K |


---
