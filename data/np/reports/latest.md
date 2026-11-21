# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-21T01:40:09.996Z
**As-of:** 2026-11-21

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $60.48    **Circulating:** 599.96M HYPE    **AF balance:** 49.17M HYPE    **Total staked:** 438.23M HYPE (73.0% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 992 | 🟢 −992 HYPE | −$60.0K | today @ $60.48 | -0.0001% |
| 7d | 7/7d | 0 | 130.9K | 🟢 −365.2K HYPE | −$22.09M | today @ $60.48 | -0.0365% |
| 30d | 30/30d | 17.45M | 298.3K | 🔴 +2.15M HYPE | +$129.97M | today @ $60.48 | 0.2149% |
| 90d | 90/90d | 52.34M | 658.7K | 🟢 −5.44M HYPE | −$328.89M | today @ $60.48 | -0.5438% |

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
| 2026-11-08 | 0 | 7.5K | −79.9K | −$4.83M |
| 2026-11-09 | 0 | 2.7K | −2.7K | −$161.4K |
| 2026-11-10 | 0 | 150 | −150 | −$9.1K |
| 2026-11-11 | 0 | 4.9K | −4.9K | −$298.5K |
| 2026-11-12 | 0 | 12.7K | −286.3K | −$17.31M |
| 2026-11-13 | 0 | 1.3K | −154.2K | −$9.33M |
| 2026-11-14 | 0 | 8.4K | −8.4K | −$506.5K |
| 2026-11-15 | 0 | 9.7K | −9.7K | −$589.4K |
| 2026-11-16 | 0 | 20.5K | −20.5K | −$1.24M |
| 2026-11-17 | 0 | 11.4K | −65.2K | −$3.94M |
| 2026-11-18 | 0 | 23.9K | −23.9K | −$1.45M |
| 2026-11-19 | 0 | 10.7K | −191.2K | −$11.56M |
| 2026-11-20 | 0 | 53.6K | −53.6K | −$3.24M |
| 2026-11-21 | 0 | 992 | −992 | −$60.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $455.50M |
| 2026-12-06 | 9.92M | $599.76M |
| 2026-12-29 | 7.53M | $455.50M |
| 2027-01-06 | 9.92M | $599.76M |
| 2027-01-29 | 7.53M | $455.50M |
| 2027-02-06 | 9.92M | $599.76M |
| 2027-03-01 | 7.53M | $455.50M |
| 2027-03-06 | 9.92M | $599.76M |


---

## Aave (AAVE)

**Price:** $97.81    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −20.7K AAVE | −$2.03M | today @ $97.81 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −23.7K AAVE | −$2.32M | today @ $97.81 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −26.3K AAVE | −$2.57M | today @ $97.81 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −74.2K AAVE | −$7.26M | today @ $97.81 | 0.0000% |

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
| 2026-09-29 | 0 | 0 | −39.1K | −$3.82M |
| 2026-10-06 | 0 | 0 | −2.9K | −$286.9K |
| 2026-10-13 | 0 | 0 | 0 | $0 |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$77.6K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$33.0K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | 0 | $0 |
| 2026-11-14 | 0 | 0 | −1.4K | −$140.5K |
| 2026-11-17 | 0 | 0 | −3.0K | −$289.0K |
| 2026-11-19 | 0 | 0 | 0 | $0 |
| 2026-11-21 | 0 | 0 | −20.7K | −$2.03M |


---

## Sky (SKY)

**Price:** $0.04    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.04 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −9.40M SKY | −$415.1K | today @ $0.04 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −23.69M SKY | −$1.05M | today @ $0.04 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −140.04M SKY | −$6.18M | today @ $0.04 | 0.0000% |

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
| 2026-09-29 | 0 | 0 | −55.20M | −$2.44M |
| 2026-10-06 | 0 | 0 | 0 | $0 |
| 2026-10-13 | 0 | 0 | −49.75M | −$2.20M |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$212.3K |
| 2026-11-06 | 0 | 0 | −6.56M | −$289.7K |
| 2026-11-07 | 0 | 0 | −1.07M | −$47.3K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | −1.34M | −$59.3K |
| 2026-11-14 | 0 | 0 | −497.7K | −$22.0K |
| 2026-11-17 | 0 | 0 | −5.69M | −$251.1K |
| 2026-11-19 | 0 | 0 | −3.71M | −$163.9K |
| 2026-11-21 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $2.30    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.30 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 234.2K | 🟢 −234.2K LIT | −$668.0K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.42M | 🟢 −1.42M LIT | −$4.36M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 2.98M | 🟢 −2.98M LIT | −$10.35M | per-day (100%) | 0.0000% |

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
| 2026-11-06 | 0 | 44.1K | −44.1K | −$151.5K |
| 2026-11-07 | 0 | 20.0K | −20.0K | −$66.4K |
| 2026-11-08 | 0 | 12.8K | −12.8K | −$42.2K |
| 2026-11-09 | 0 | 50.7K | −50.7K | −$154.9K |
| 2026-11-10 | 0 | 46.4K | −46.4K | −$150.0K |
| 2026-11-11 | 0 | 35.9K | −35.9K | −$124.4K |
| 2026-11-12 | 0 | 29.9K | −29.9K | −$97.5K |
| 2026-11-13 | 0 | 53.6K | −53.6K | −$172.3K |
| 2026-11-14 | 0 | 46.8K | −46.8K | −$152.0K |
| 2026-11-15 | 0 | 56.4K | −56.4K | −$162.4K |
| 2026-11-16 | 0 | 55.6K | −55.6K | −$157.4K |
| 2026-11-17 | 0 | 37.3K | −37.3K | −$110.8K |
| 2026-11-18 | 0 | 36.1K | −36.1K | −$104.3K |
| 2026-11-19 | 0 | 48.9K | −48.9K | −$133.1K |


---

## Morpho (MORPHO)

**Price:** $1.53    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$149.0K | today @ $1.53 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.42M | 0 | 🔴 +881.5K MORPHO | +$1.35M | today @ $1.53 | 0.0000% |
| 30d | ⚠ 0/30d partial | 7.08M | 0 | 🔴 +3.12M MORPHO | +$4.77M | today @ $1.53 | 0.0000% |
| 90d | ⚠ 0/90d partial | 19.24M | 0 | 🔴 +8.96M MORPHO | +$13.71M | today @ $1.53 | 0.0000% |

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
| 2026-11-08 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-09 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-10 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-11 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-12 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-13 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-14 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-15 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-16 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-17 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-18 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-19 | 202.7K | 0 | +97.4K | +$149.0K |
| 2026-11-20 | 1.20M | 0 | +297.4K | +$455.0K |
| 2026-11-21 | 202.7K | 0 | +97.4K | +$149.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 202.7K | $310.1K |
| 2026-11-23 | 202.7K | $310.1K |
| 2026-11-24 | 202.7K | $310.1K |
| 2026-11-25 | 202.7K | $310.1K |
| 2026-11-26 | 202.7K | $310.1K |
| 2026-11-27 | 202.7K | $310.1K |
| 2026-11-28 | 202.7K | $310.1K |
| 2026-11-29 | 202.7K | $310.1K |


---

## Pendle (PENDLE)

**Price:** $1.28    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.28 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.28 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.28 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.28 | 0.0000% |

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

**Price:** $0.22    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$47.7K | today @ $0.22 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$333.9K | today @ $0.22 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$1.43M | today @ $0.22 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$4.29M | today @ $0.22 | 0.0000% |

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
| 2026-11-08 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-09 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-10 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-11 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-12 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-13 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-14 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-15 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-16 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-17 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-18 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-19 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-20 | 626.2K | 0 | +214.3K | +$47.7K |
| 2026-11-21 | 626.2K | 0 | +214.3K | +$47.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 626.2K | $139.4K |
| 2026-11-23 | 626.2K | $139.4K |
| 2026-11-24 | 626.2K | $139.4K |
| 2026-11-25 | 626.2K | $139.4K |
| 2026-11-26 | 626.2K | $139.4K |
| 2026-11-27 | 626.2K | $139.4K |
| 2026-11-28 | 626.2K | $139.4K |
| 2026-11-29 | 626.2K | $139.4K |


---

## Jupiter (JUP)

**Price:** $0.23    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.23 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 2.57M | 🟢 −2.57M JUP | −$663.0K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 53.47M | 15.04M | 🔴 +515.1K JUP | +$423.3K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 160.41M | 33.17M | 🔴 +13.49M JUP | +$4.39M | per-day (100%) | 0.0000% |

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
| 2026-11-05 | 0 | 248.4K | −248.4K | −$64.6K |
| 2026-11-06 | 0 | 118.7K | −118.7K | −$28.4K |
| 2026-11-07 | 0 | 97.4K | −97.4K | −$23.7K |
| 2026-11-08 | 0 | 179.7K | −179.7K | −$43.7K |
| 2026-11-09 | 0 | 167.7K | −167.7K | −$38.9K |
| 2026-11-10 | 0 | 1.74M | −1.74M | −$440.7K |
| 2026-11-11 | 0 | 1.57M | −1.57M | −$399.7K |
| 2026-11-12 | 0 | 3.09M | −3.09M | −$787.5K |
| 2026-11-13 | 0 | 2.14M | −2.14M | −$567.4K |
| 2026-11-14 | 0 | 753.4K | −753.4K | −$199.6K |
| 2026-11-15 | 0 | 873.8K | −873.8K | −$216.8K |
| 2026-11-16 | 0 | 1.43M | −1.43M | −$381.1K |
| 2026-11-17 | 0 | 265.7K | −265.7K | −$64.0K |
| 2026-11-18 | 0 | 4.0K | −4.0K | −$1.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 53.47M | $12.24M |
| 2026-12-27 | 53.47M | $12.24M |
| 2027-01-27 | 53.47M | $12.24M |
| 2027-02-27 | 53.47M | $12.24M |
| 2027-03-27 | 53.47M | $12.24M |
| 2027-04-27 | 53.47M | $12.24M |
| 2027-05-27 | 53.47M | $12.24M |
| 2027-06-27 | 53.47M | $12.24M |


---

## Fluid (FLUID)

**Price:** $1.64    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$4.5K | today @ $1.64 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$31.5K | today @ $1.64 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$380.8K | today @ $1.64 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.14M | today @ $1.64 | 0.0000% |

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
| 2026-11-08 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-09 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-10 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-11 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-12 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-13 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-14 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-15 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-16 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-17 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-18 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-19 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-20 | 9.1K | 0 | +2.7K | +$4.5K |
| 2026-11-21 | 9.1K | 0 | +2.7K | +$4.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 9.1K | $15.0K |
| 2026-11-23 | 9.1K | $15.0K |
| 2026-11-24 | 9.1K | $15.0K |
| 2026-11-25 | 9.1K | $15.0K |
| 2026-11-26 | 9.1K | $15.0K |
| 2026-11-27 | 9.1K | $15.0K |
| 2026-11-28 | 9.1K | $15.0K |
| 2026-11-29 | 9.1K | $15.0K |


---

## Collector Crypt (CARDS)

**Price:** $0.15    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.15 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 121.6K | 🟢 −121.6K CARDS | −$19.7K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 44.67M | 1.27M | 🔴 +10.67M CARDS | +$2.55M | per-day (100%) | 0.0000% |
| 90d | 77/90d | 134.02M | 70.95M | 🟢 −35.14M CARDS | −$4.27M | per-day (99%) | 0.0000% |

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
| 2026-11-04 | 0 | 8.6K | −8.6K | −$2.3K |
| 2026-11-05 | 0 | 15.5K | −15.5K | −$4.0K |
| 2026-11-06 | 0 | 24.5K | −24.5K | −$6.1K |
| 2026-11-07 | 0 | 14.5K | −14.5K | −$3.5K |
| 2026-11-08 | 0 | 16.3K | −16.3K | −$3.8K |
| 2026-11-09 | 0 | 32.5K | −32.5K | −$6.9K |
| 2026-11-10 | 0 | 12.5K | −12.5K | −$2.8K |
| 2026-11-11 | 0 | 16.3K | −16.3K | −$3.7K |
| 2026-11-12 | 0 | 27.0K | −27.0K | −$5.2K |
| 2026-11-13 | 0 | 23.1K | −23.1K | −$4.5K |
| 2026-11-14 | 0 | 8.0K | −8.0K | −$1.6K |
| 2026-11-15 | 0 | 11.8K | −11.8K | −$1.9K |
| 2026-11-19 | 0 | 60.2K | −60.2K | −$9.6K |
| 2026-11-20 | 0 | 49.6K | −49.6K | −$8.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-01 | 44.67M | $6.60M |
| 2027-01-01 | 44.67M | $6.60M |
| 2027-02-01 | 44.67M | $6.60M |
| 2027-03-01 | 44.67M | $6.60M |
| 2027-04-01 | 44.67M | $6.60M |
| 2027-05-01 | 44.67M | $6.60M |
| 2027-06-01 | 44.67M | $6.60M |
| 2027-07-01 | 44.67M | $6.60M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$389.4K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 2.52B | 1.24B | 🟢 −112.85M PUMP | −$369.4K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 20.80B | 4.87B | 🔴 +2.94B PUMP | +$10.21M | per-day (97%) | 0.0000% |
| 90d | 89/90d | 62.39B | 16.62B | 🔴 +6.81B PUMP | +$27.77M | per-day (99%) | 0.0000% |

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
| 2026-11-08 | 359.91M | 114.97M | +45.34M | +$168.6K |
| 2026-11-09 | 359.91M | 142.08M | +18.23M | +$64.2K |
| 2026-11-10 | 359.91M | 147.39M | +12.92M | +$46.7K |
| 2026-11-11 | 359.91M | 161.50M | −1.20M | −$4.2K |
| 2026-11-12 | 10.36B | 170.15M | +2.99B | +$10.37M |
| 2026-11-13 | 359.91M | 181.45M | −21.14M | −$73.6K |
| 2026-11-14 | 359.91M | 129.36M | +30.95M | +$106.7K |
| 2026-11-15 | 359.91M | 166.64M | −6.34M | −$18.5K |
| 2026-11-16 | 359.91M | 194.28M | −33.97M | −$100.9K |
| 2026-11-17 | 359.91M | 215.20M | −54.89M | −$155.6K |
| 2026-11-18 | 359.91M | 251.52M | −91.22M | −$257.0K |
| 2026-11-19 | 359.91M | 214.40M | −54.09M | −$140.5K |
| 2026-11-20 | 359.91M | 192.96M | −32.65M | −$86.3K |
| 2026-11-21 | 359.91M | 0 | +160.31M | +$389.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 359.91M | $874.2K |
| 2026-11-23 | 359.91M | $874.2K |
| 2026-11-24 | 359.91M | $874.2K |
| 2026-11-25 | 359.91M | $874.2K |
| 2026-11-26 | 359.91M | $874.2K |
| 2026-11-27 | 359.91M | $874.2K |
| 2026-11-28 | 359.91M | $874.2K |
| 2026-11-29 | 359.91M | $874.2K |


---

## LayerZero (ZRO)

**Price:** $1.12    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$12.84M | today @ $1.12 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$12.54M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$38.02M | per-day (40%) | 0.0000% |

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
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$12.84M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |
| 2026-11-20 | 23.63M | 0 | +11.46M | +$12.84M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-20 | 23.63M | $26.47M |
| 2027-01-20 | 23.63M | $26.47M |
| 2027-02-20 | 23.63M | $26.47M |
| 2027-03-20 | 23.63M | $26.47M |
| 2027-04-20 | 23.63M | $26.47M |
| 2027-05-20 | 23.63M | $26.47M |
| 2027-06-20 | 23.63M | $26.47M |
| 2027-07-20 | 23.63M | $26.47M |


---

## Ethena (ENA)

**Price:** $0.10    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$406.6K | today @ $0.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.85M | today @ $0.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$12.20M | today @ $0.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$36.59M | today @ $0.10 | 0.0000% |

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
| 2026-11-08 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-09 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-10 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-11 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-12 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-13 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-14 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-15 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-16 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-17 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-18 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-19 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-20 | 10.75M | 0 | +4.11M | +$406.6K |
| 2026-11-21 | 10.75M | 0 | +4.11M | +$406.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 10.75M | $1.06M |
| 2026-11-23 | 10.75M | $1.06M |
| 2026-11-24 | 10.75M | $1.06M |
| 2026-11-25 | 10.75M | $1.06M |
| 2026-11-26 | 10.75M | $1.06M |
| 2026-11-27 | 10.75M | $1.06M |
| 2026-11-28 | 10.75M | $1.06M |
| 2026-11-29 | 10.75M | $1.06M |


---

## Aerodrome (AERO)

**Price:** $0.39    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.39 | 0.0000% |

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

**Price:** $0.07    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 434.5K | 🟢 −434.5K DYDX | −$34.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 2.26M | 🟢 −2.26M DYDX | −$219.2K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 1.33M | 6.37M | 🟢 −5.83M DYDX | −$673.7K | per-day (100%) | 0.0000% |

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
| 2026-11-06 | 0 | 96.3K | −96.3K | −$9.1K |
| 2026-11-07 | 0 | 10.4K | −10.4K | −$1.0K |
| 2026-11-08 | 0 | 30.8K | −30.8K | −$2.9K |
| 2026-11-09 | 0 | 88.0K | −88.0K | −$7.8K |
| 2026-11-10 | 0 | 119.0K | −119.0K | −$10.8K |
| 2026-11-11 | 0 | 41.1K | −41.1K | −$3.7K |
| 2026-11-12 | 0 | 131.6K | −131.6K | −$12.1K |
| 2026-11-13 | 0 | 81.4K | −81.4K | −$7.5K |
| 2026-11-14 | 0 | 79.5K | −79.5K | −$7.1K |
| 2026-11-15 | 0 | 160.8K | −160.8K | −$12.4K |
| 2026-11-16 | 0 | 93.9K | −93.9K | −$7.5K |
| 2026-11-17 | 0 | 86.1K | −86.1K | −$6.9K |
| 2026-11-18 | 0 | 71.1K | −71.1K | −$5.9K |
| 2026-11-19 | 0 | 22.7K | −22.7K | −$1.8K |


---

## Meteora (MET)

**Price:** $0.24    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$26.0K | today @ $0.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$181.8K | today @ $0.24 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$779.2K | today @ $0.24 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.34M | today @ $0.24 | 0.0000% |

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
| 2026-11-08 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-09 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-10 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-11 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-12 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-13 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-14 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-15 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-16 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-17 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-18 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-19 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-20 | 291.3K | 0 | +110.1K | +$26.0K |
| 2026-11-21 | 291.3K | 0 | +110.1K | +$26.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 291.3K | $68.7K |
| 2026-11-23 | 291.3K | $68.7K |
| 2026-11-24 | 291.3K | $68.7K |
| 2026-11-25 | 291.3K | $68.7K |
| 2026-11-26 | 291.3K | $68.7K |
| 2026-11-27 | 291.3K | $68.7K |
| 2026-11-28 | 291.3K | $68.7K |
| 2026-11-29 | 291.3K | $68.7K |


---

## Sanctum (CLOUD)

**Price:** $0.05    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$6.4K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$44.6K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$191.1K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$816.1K | today @ $0.05 | 0.0000% |

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
| 2026-11-08 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-09 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-10 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-11 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-12 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-13 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-14 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-15 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-16 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-17 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-18 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-19 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-20 | 347.8K | 0 | +118.1K | +$6.4K |
| 2026-11-21 | 347.8K | 0 | +118.1K | +$6.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 347.8K | $18.8K |
| 2026-11-23 | 347.8K | $18.8K |
| 2026-11-24 | 347.8K | $18.8K |
| 2026-11-25 | 347.8K | $18.8K |
| 2026-11-26 | 347.8K | $18.8K |
| 2026-11-27 | 347.8K | $18.8K |
| 2026-11-28 | 347.8K | $18.8K |
| 2026-11-29 | 347.8K | $18.8K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$2.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$18.6K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$79.8K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$239.3K | today @ $0.01 | 0.0000% |

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
| 2026-11-08 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-09 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-10 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-11 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-12 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-13 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-14 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-15 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-16 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-17 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-18 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-19 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-20 | 644.2K | 0 | +302.8K | +$2.7K |
| 2026-11-21 | 644.2K | 0 | +302.8K | +$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-22 | 644.2K | $5.7K |
| 2026-11-23 | 644.2K | $5.7K |
| 2026-11-24 | 644.2K | $5.7K |
| 2026-11-25 | 644.2K | $5.7K |
| 2026-11-26 | 644.2K | $5.7K |
| 2026-11-27 | 644.2K | $5.7K |
| 2026-11-28 | 644.2K | $5.7K |
| 2026-11-29 | 644.2K | $5.7K |


---

## Uniswap (UNI)

**Price:** $4.48    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.48 | 0.0000% |
| 7d | 6/7d | 0 | 267.8K | 🟢 −267.8K UNI | −$1.36M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.23M | 🟢 −1.23M UNI | −$7.95M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.87M | 🟢 −4.87M UNI | −$32.15M | per-day (100%) | 0.0000% |

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
| 2026-11-07 | 0 | 12.4K | −12.4K | −$85.0K |
| 2026-11-08 | 0 | 24.8K | −24.8K | −$179.0K |
| 2026-11-09 | 0 | 36.8K | −36.8K | −$249.7K |
| 2026-11-10 | 0 | 33.1K | −33.1K | −$230.7K |
| 2026-11-11 | 0 | 31.2K | −31.2K | −$207.6K |
| 2026-11-12 | 0 | 40.9K | −40.9K | −$254.7K |
| 2026-11-13 | 0 | 47.7K | −47.7K | −$289.4K |
| 2026-11-14 | 0 | 60.1K | −60.1K | −$346.0K |
| 2026-11-15 | 0 | 48.0K | −48.0K | −$234.2K |
| 2026-11-16 | 0 | 33.7K | −33.7K | −$174.6K |
| 2026-11-17 | 0 | 40.9K | −40.9K | −$211.4K |
| 2026-11-18 | 0 | 35.1K | −35.1K | −$186.4K |
| 2026-11-19 | 0 | 45.7K | −45.7K | −$236.8K |
| 2026-11-20 | 0 | 64.4K | −64.4K | −$317.4K |


---

## Raydium (RAY)

**Price:** $1.29    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.29 | 0.0000% |
| 7d | 6/7d | 0 | 150.9K | 🟢 −150.9K RAY | −$212.2K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 701.4K | 🟢 −701.4K RAY | −$1.15M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.02M | 🟢 −5.02M RAY | −$7.35M | per-day (100%) | 0.0000% |

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
| 2026-11-07 | 0 | 20.1K | −20.1K | −$36.0K |
| 2026-11-08 | 0 | 24.5K | −24.5K | −$44.6K |
| 2026-11-09 | 0 | 33.4K | −33.4K | −$56.1K |
| 2026-11-10 | 0 | 25.9K | −25.9K | −$45.4K |
| 2026-11-11 | 0 | 28.0K | −28.0K | −$45.5K |
| 2026-11-12 | 0 | 22.7K | −22.7K | −$36.7K |
| 2026-11-13 | 0 | 21.0K | −21.0K | −$33.9K |
| 2026-11-14 | 0 | 19.3K | −19.3K | −$28.7K |
| 2026-11-15 | 0 | 19.4K | −19.4K | −$26.1K |
| 2026-11-16 | 0 | 24.7K | −24.7K | −$35.4K |
| 2026-11-17 | 0 | 23.0K | −23.0K | −$32.1K |
| 2026-11-18 | 0 | 27.0K | −27.0K | −$39.4K |
| 2026-11-19 | 0 | 26.6K | −26.6K | −$37.2K |
| 2026-11-20 | 0 | 30.2K | −30.2K | −$41.9K |


---

## Euler (EUL)

**Price:** $0.79    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.79 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.79 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.08 | per-day (100%) | 0.0000% |
| 90d | ⚠ 7/90d partial | 0 | 0 | 🟢 −0 EUL | −$0.36 | per-day (100%) | 0.0000% |

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
| 2026-04-13 | 0 | 9 | −9 | −$8.63 |
| 2026-04-15 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-04-18 | 0 | 52 | −52 | −$82.00 |
| 2026-04-19 | 0 | 62 | −62 | −$82.00 |
| 2026-04-21 | 0 | 244 | −244 | −$317.00 |
| 2026-04-25 | 0 | 552 | −552 | −$795.00 |
| 2026-08-12 | 0 | 1 | −1 | −$1.15 |
| 2026-08-26 | 0 | 0 | −0 | −$0.01 |
| 2026-09-09 | 0 | 0 | −0 | −$0.01 |
| 2026-09-23 | 0 | 0 | −0 | −$0.02 |
| 2026-10-07 | 0 | 0 | −0 | −$0.02 |
| 2026-10-18 | 0 | 0 | −0 | −$0.22 |
| 2026-10-31 | 0 | 0 | −0 | −$0.07 |
| 2026-11-14 | 0 | 0 | −0 | −$0.01 |


---

## Gains Network (GNS)

**Price:** $0.30    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.30 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 26.1K | 🟢 −26.1K GNS | −$8.6K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 63.9K | 🟢 −63.9K GNS | −$23.2K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 241.0K | 🟢 −241.0K GNS | −$104.8K | per-day (100%) | 0.0000% |

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
| 2026-11-02 | 0 | 1.5K | −1.5K | −$557.00 |
| 2026-11-03 | 0 | 1.9K | −1.9K | −$682.00 |
| 2026-11-04 | 0 | 1.8K | −1.8K | −$663.00 |
| 2026-11-05 | 0 | 1.0K | −1.0K | −$384.00 |
| 2026-11-06 | 0 | 1.3K | −1.3K | −$468.00 |
| 2026-11-07 | 0 | 2.7K | −2.7K | −$868.00 |
| 2026-11-08 | 0 | 463 | −463 | −$160.00 |
| 2026-11-09 | 0 | 1.1K | −1.1K | −$536.00 |
| 2026-11-10 | 0 | 2.9K | −2.9K | −$1.2K |
| 2026-11-15 | 0 | 1.6K | −1.6K | −$525.00 |
| 2026-11-16 | 0 | 9.3K | −9.3K | −$3.1K |
| 2026-11-17 | 0 | 4.9K | −4.9K | −$1.6K |
| 2026-11-18 | 0 | 3.1K | −3.1K | −$996.00 |
| 2026-11-19 | 0 | 7.2K | −7.2K | −$2.3K |


---

## Orca (ORCA)

**Price:** $1.10    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.10 | 0.0000% |
| 7d | 6/7d | 0 | 10.5K | 🟢 −10.5K ORCA | −$12.1K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 133.6K | 🟢 −133.6K ORCA | −$198.4K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 678.1K | 🟢 −678.1K ORCA | −$1.05M | per-day (100%) | 0.0000% |

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
| 2026-11-07 | 0 | 3.0K | −3.0K | −$4.1K |
| 2026-11-08 | 0 | 4.8K | −4.8K | −$6.6K |
| 2026-11-09 | 0 | 7.9K | −7.9K | −$10.5K |
| 2026-11-10 | 0 | 7.3K | −7.3K | −$9.9K |
| 2026-11-11 | 0 | 1.7K | −1.7K | −$2.2K |
| 2026-11-12 | 0 | 1.5K | −1.5K | −$1.9K |
| 2026-11-13 | 0 | 2.1K | −2.1K | −$2.6K |
| 2026-11-14 | 0 | 2.0K | −2.0K | −$2.5K |
| 2026-11-15 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-16 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-11-17 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-18 | 0 | 1.3K | −1.3K | −$1.5K |
| 2026-11-19 | 0 | 2.4K | −2.4K | −$2.7K |
| 2026-11-20 | 0 | 2.0K | −2.0K | −$2.2K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 207.9K | 🟢 −207.9K MNDE | −$3.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.47M | 🟢 −1.47M MNDE | −$28.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 7.32M | 🟢 −7.32M MNDE | −$165.9K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 25.63M | 🟢 −25.63M MNDE | −$572.1K | per-day (100%) | 0.0000% |

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
| 2026-11-08 | 0 | 253.9K | −253.9K | −$5.7K |
| 2026-11-09 | 0 | 251.1K | −251.1K | −$5.6K |
| 2026-11-10 | 0 | 229.0K | −229.0K | −$5.1K |
| 2026-11-11 | 0 | 241.2K | −241.2K | −$5.2K |
| 2026-11-12 | 0 | 237.2K | −237.2K | −$5.1K |
| 2026-11-13 | 0 | 225.2K | −225.2K | −$4.8K |
| 2026-11-14 | 0 | 198.2K | −198.2K | −$4.2K |
| 2026-11-15 | 0 | 219.1K | −219.1K | −$4.3K |
| 2026-11-16 | 0 | 207.1K | −207.1K | −$4.1K |
| 2026-11-17 | 0 | 216.9K | −216.9K | −$4.3K |
| 2026-11-18 | 0 | 208.0K | −208.0K | −$4.1K |
| 2026-11-19 | 0 | 209.5K | −209.5K | −$4.1K |
| 2026-11-20 | 0 | 198.5K | −198.5K | −$3.9K |
| 2026-11-21 | 0 | 207.9K | −207.9K | −$3.9K |


---

## ether.fi (ETHFI)

**Price:** $0.45    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.45 | 0.0000% |
| 7d | 6/7d | 0 | 83.9K | 🟢 −83.9K ETHFI | −$40.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 343.4K | 🟢 −343.4K ETHFI | −$199.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 930.4K | 🟢 −930.4K ETHFI | −$583.7K | per-day (100%) | 0.0000% |

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
| 2026-11-07 | 0 | 11.5K | −11.5K | −$6.7K |
| 2026-11-08 | 0 | 9.2K | −9.2K | −$5.6K |
| 2026-11-09 | 0 | 12.8K | −12.8K | −$7.4K |
| 2026-11-10 | 0 | 13.8K | −13.8K | −$8.6K |
| 2026-11-11 | 0 | 11.4K | −11.4K | −$7.2K |
| 2026-11-12 | 0 | 12.5K | −12.5K | −$8.0K |
| 2026-11-13 | 0 | 10.6K | −10.6K | −$6.7K |
| 2026-11-14 | 0 | 11.8K | −11.8K | −$6.7K |
| 2026-11-15 | 0 | 11.2K | −11.2K | −$5.5K |
| 2026-11-16 | 0 | 13.8K | −13.8K | −$6.8K |
| 2026-11-17 | 0 | 16.9K | −16.9K | −$7.9K |
| 2026-11-18 | 0 | 14.5K | −14.5K | −$7.0K |
| 2026-11-19 | 0 | 13.0K | −13.0K | −$6.3K |
| 2026-11-20 | 0 | 14.6K | −14.6K | −$7.1K |


---

## CoW Protocol (COW)

**Price:** $0.09    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.09 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 2.16M | 🟢 −2.16M COW | −$197.3K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 12.24M | 🟢 −12.24M COW | −$1.33M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 24.91M | 🟢 −24.91M COW | −$3.09M | per-day (100%) | 0.0000% |

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
| 2026-11-06 | 0 | 365.8K | −365.8K | −$40.3K |
| 2026-11-07 | 0 | 125.3K | −125.3K | −$13.9K |
| 2026-11-08 | 0 | 316.3K | −316.3K | −$34.1K |
| 2026-11-09 | 0 | 405.6K | −405.6K | −$41.8K |
| 2026-11-10 | 0 | 689.6K | −689.6K | −$72.4K |
| 2026-11-11 | 0 | 323.1K | −323.1K | −$33.8K |
| 2026-11-12 | 0 | 470.7K | −470.7K | −$47.3K |
| 2026-11-13 | 0 | 1.17M | −1.17M | −$116.4K |
| 2026-11-14 | 0 | 1.35M | −1.35M | −$134.0K |
| 2026-11-15 | 0 | 792.3K | −792.3K | −$70.3K |
| 2026-11-16 | 0 | 417.5K | −417.5K | −$38.7K |
| 2026-11-17 | 0 | 352.2K | −352.2K | −$32.3K |
| 2026-11-18 | 0 | 231.4K | −231.4K | −$22.1K |
| 2026-11-19 | 0 | 366.4K | −366.4K | −$33.9K |


---
