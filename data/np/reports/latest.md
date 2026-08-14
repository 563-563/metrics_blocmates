# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-08-14T17:09:51.529Z
**As-of:** 2026-08-14

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $55.88    **Circulating:** 547.61M HYPE    **AF balance:** 46.39M HYPE    **Total staked:** 437.23M HYPE (79.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 11.3K | 🟢 −11.3K HYPE | −$632.0K | today @ $55.88 | -0.0011% |
| 7d | 7/7d | 0 | 90.6K | 🟢 −954.0K HYPE | −$53.31M | today @ $55.88 | -0.0954% |
| 30d | 30/30d | 17.45M | 153.5K | 🟢 −4.54M HYPE | −$253.60M | today @ $55.88 | -0.4538% |
| 90d | 90/90d | 52.34M | 409.2K | 🟢 −10.77M HYPE | −$601.64M | per-day (7%) | -1.0773% |

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
| 2026-08-01 | 0 | 2.9K | −2.9K | −$163.3K |
| 2026-08-02 | 0 | 5.4K | −9.3K | −$518.0K |
| 2026-08-03 | 0 | 96 | −618.7K | −$34.58M |
| 2026-08-04 | 0 | 1.7K | −202.7K | −$11.33M |
| 2026-08-05 | 0 | 5.0K | −5.0K | −$281.7K |
| 2026-08-06 | 9.92M | 1.0K | +905.1K | +$50.58M |
| 2026-08-07 | 0 | 2.1K | −2.1K | −$119.9K |
| 2026-08-08 | 0 | 182 | −50.7K | −$2.83M |
| 2026-08-09 | 0 | 2.6K | −121.3K | −$6.78M |
| 2026-08-10 | 0 | 20.3K | −79.2K | −$4.43M |
| 2026-08-11 | 0 | 16.5K | −97.4K | −$5.44M |
| 2026-08-12 | 0 | 19.9K | −574.1K | −$32.08M |
| 2026-08-13 | 0 | 20.0K | −20.0K | −$1.11M |
| 2026-08-14 | 0 | 11.3K | −11.3K | −$632.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-29 | 7.53M | $420.85M |
| 2026-09-06 | 9.92M | $554.14M |
| 2026-09-29 | 7.53M | $420.85M |
| 2026-10-06 | 9.92M | $554.14M |
| 2026-10-29 | 7.53M | $420.85M |
| 2026-11-06 | 9.92M | $554.14M |
| 2026-11-29 | 7.53M | $420.85M |
| 2026-12-06 | 9.92M | $554.14M |


---

## Aave (AAVE)

**Price:** $86.59    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $86.59 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.6K AAVE | −$140.9K | today @ $86.59 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −220.9K AAVE | −$19.13M | today @ $86.59 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −272.2K AAVE | −$23.57M | today @ $86.59 | 0.0000% |

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
| 2026-08-01 | 0 | 0 | −110.3K | −$9.55M |
| 2026-08-02 | 0 | 0 | −3.0K | −$261.1K |
| 2026-08-03 | 0 | 0 | −976 | −$84.6K |
| 2026-08-04 | 0 | 0 | −355 | −$30.7K |
| 2026-08-05 | 0 | 0 | −128 | −$11.1K |
| 2026-08-06 | 0 | 0 | −269 | −$23.3K |
| 2026-08-07 | 0 | 0 | −410 | −$35.5K |
| 2026-08-08 | 0 | 0 | 0 | $0 |
| 2026-08-09 | 0 | 0 | −61 | −$5.3K |
| 2026-08-10 | 0 | 0 | −304 | −$26.3K |
| 2026-08-11 | 0 | 0 | −1.2K | −$103.8K |
| 2026-08-12 | 0 | 0 | −64 | −$5.5K |
| 2026-08-13 | 0 | 0 | 0 | $0 |
| 2026-08-14 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −539.8K SKY | −$28.3K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −15.94M SKY | −$834.6K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −52.95M SKY | −$2.77M | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −82.59M SKY | −$4.32M | today @ $0.05 | 0.0000% |

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
| 2026-08-01 | 0 | 0 | −553.0K | −$29.0K |
| 2026-08-02 | 0 | 0 | −2.23M | −$116.6K |
| 2026-08-03 | 0 | 0 | −3.27M | −$171.3K |
| 2026-08-04 | 0 | 0 | −221.5K | −$11.6K |
| 2026-08-05 | 0 | 0 | 0 | $0 |
| 2026-08-06 | 0 | 0 | 0 | $0 |
| 2026-08-07 | 0 | 0 | −905.9K | −$47.4K |
| 2026-08-08 | 0 | 0 | −6.32M | −$330.8K |
| 2026-08-09 | 0 | 0 | 0 | $0 |
| 2026-08-10 | 0 | 0 | −714.6K | −$37.4K |
| 2026-08-11 | 0 | 0 | −6.54M | −$342.4K |
| 2026-08-12 | 0 | 0 | −1.54M | −$80.5K |
| 2026-08-13 | 0 | 0 | −291.2K | −$15.2K |
| 2026-08-14 | 0 | 0 | −539.8K | −$28.3K |


---

## Lighter (LIT)

**Price:** $2.21    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.21 | 0.0000% |
| 7d | 6/7d | 0 | 103.9K | 🟢 −103.9K LIT | −$244.2K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 772.4K | 🟢 −772.4K LIT | −$1.71M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 3.93M | 🟢 −3.93M LIT | −$6.61M | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 49.6K | −49.6K | −$113.4K |
| 2026-08-01 | 0 | 20.1K | −20.1K | −$41.5K |
| 2026-08-02 | 0 | 16.9K | −16.9K | −$34.2K |
| 2026-08-03 | 0 | 27.6K | −27.6K | −$56.1K |
| 2026-08-04 | 0 | 27.8K | −27.8K | −$55.5K |
| 2026-08-05 | 0 | 24.3K | −24.3K | −$50.2K |
| 2026-08-06 | 0 | 23.3K | −23.3K | −$50.9K |
| 2026-08-07 | 0 | 30.8K | −30.8K | −$73.4K |
| 2026-08-08 | 0 | 10.2K | −10.2K | −$23.4K |
| 2026-08-09 | 0 | 8.6K | −8.6K | −$19.5K |
| 2026-08-10 | 0 | 15.1K | −15.1K | −$34.9K |
| 2026-08-11 | 0 | 21.9K | −21.9K | −$52.1K |
| 2026-08-12 | 0 | 23.4K | −23.4K | −$56.6K |
| 2026-08-13 | 0 | 24.7K | −24.7K | −$57.7K |


---

## Morpho (MORPHO)

**Price:** $1.92    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$186.9K | today @ $1.92 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.31M | today @ $1.92 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.61M | today @ $1.92 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$16.82M | today @ $1.92 | 0.0000% |

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
| 2026-08-01 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-02 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-03 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-04 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-05 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-06 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-07 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-08 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-09 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-10 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-11 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-12 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-13 | 202.7K | 0 | +97.4K | +$186.9K |
| 2026-08-14 | 202.7K | 0 | +97.4K | +$186.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 202.7K | $389.2K |
| 2026-08-16 | 202.7K | $389.2K |
| 2026-08-17 | 202.7K | $389.2K |
| 2026-08-18 | 202.7K | $389.2K |
| 2026-08-19 | 202.7K | $389.2K |
| 2026-08-20 | 202.7K | $389.2K |
| 2026-08-21 | 202.7K | $389.2K |
| 2026-08-22 | 202.7K | $389.2K |


---

## Pendle (PENDLE)

**Price:** $1.31    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.31 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.31 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.31 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.31 | 0.0000% |

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

**Price:** $0.55    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$118.2K | today @ $0.55 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$827.1K | today @ $0.55 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.54M | today @ $0.55 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$10.63M | today @ $0.55 | 0.0000% |

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
| 2026-08-01 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-02 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-03 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-04 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-05 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-06 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-07 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-08 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-09 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-10 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-11 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-12 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-13 | 626.2K | 0 | +214.3K | +$118.2K |
| 2026-08-14 | 626.2K | 0 | +214.3K | +$118.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 626.2K | $345.3K |
| 2026-08-16 | 626.2K | $345.3K |
| 2026-08-17 | 626.2K | $345.3K |
| 2026-08-18 | 626.2K | $345.3K |
| 2026-08-19 | 626.2K | $345.3K |
| 2026-08-20 | 626.2K | $345.3K |
| 2026-08-21 | 626.2K | $345.3K |
| 2026-08-22 | 626.2K | $345.3K |


---

## Jupiter (JUP)

**Price:** $0.17    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.17 | 0.0000% |
| 7d | 6/7d | 0 | 2.31M | 🟢 −2.31M JUP | −$413.1K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 9.68M | 🔴 +5.87M JUP | +$1.15M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 33.94M | 🔴 +12.72M JUP | +$3.04M | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 267.8K | −267.8K | −$52.2K |
| 2026-08-01 | 0 | 268.0K | −268.0K | −$51.7K |
| 2026-08-02 | 0 | 302.0K | −302.0K | −$58.3K |
| 2026-08-03 | 0 | 339.9K | −339.9K | −$66.2K |
| 2026-08-04 | 0 | 422.4K | −422.4K | −$81.9K |
| 2026-08-05 | 0 | 319.5K | −319.5K | −$60.1K |
| 2026-08-06 | 0 | 294.2K | −294.2K | −$55.4K |
| 2026-08-07 | 0 | 456.2K | −456.2K | −$82.3K |
| 2026-08-08 | 0 | 420.6K | −420.6K | −$75.8K |
| 2026-08-09 | 0 | 348.2K | −348.2K | −$64.2K |
| 2026-08-10 | 0 | 413.8K | −413.8K | −$74.7K |
| 2026-08-11 | 0 | 378.9K | −378.9K | −$68.5K |
| 2026-08-12 | 0 | 414.2K | −414.2K | −$72.7K |
| 2026-08-13 | 0 | 336.1K | −336.1K | −$57.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-27 | 53.47M | $8.98M |
| 2026-09-27 | 53.47M | $8.98M |
| 2026-10-27 | 53.47M | $8.98M |
| 2026-11-27 | 53.47M | $8.98M |
| 2026-12-27 | 53.47M | $8.98M |
| 2027-01-27 | 53.47M | $8.98M |
| 2027-02-27 | 53.47M | $8.98M |
| 2027-03-27 | 53.47M | $8.98M |


---

## Fluid (FLUID)

**Price:** $1.11    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.0K | today @ $1.11 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$21.3K | today @ $1.11 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$257.7K | today @ $1.11 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$773.2K | today @ $1.11 | 0.0000% |

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
| 2026-08-01 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-02 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-03 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-04 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-05 | 509.1K | 0 | +152.7K | +$169.5K |
| 2026-08-06 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-07 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-08 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-09 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-10 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-11 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-12 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-13 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-08-14 | 9.1K | 0 | +2.7K | +$3.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 9.1K | $10.1K |
| 2026-08-16 | 9.1K | $10.1K |
| 2026-08-17 | 9.1K | $10.1K |
| 2026-08-18 | 9.1K | $10.1K |
| 2026-08-19 | 9.1K | $10.1K |
| 2026-08-20 | 9.1K | $10.1K |
| 2026-08-21 | 9.1K | $10.1K |
| 2026-08-22 | 9.1K | $10.1K |


---

## Collector Crypt (CARDS)

**Price:** $0.16    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.16 | 0.0000% |
| 7d | 6/7d | 0 | 15.46M | 🟢 −15.46M CARDS | −$2.17M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 14.25M | 71.31M | 🟢 −59.92M CARDS | −$8.55M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 42.76M | 188.42M | 🟢 −154.25M CARDS | −$26.47M | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 1.64M | −1.64M | −$267.5K |
| 2026-08-01 | 14.25M | 2.31M | +9.09M | +$1.30M |
| 2026-08-02 | 0 | 3.35M | −3.35M | −$462.0K |
| 2026-08-03 | 0 | 4.81M | −4.81M | −$695.9K |
| 2026-08-04 | 0 | 1.68M | −1.68M | −$261.3K |
| 2026-08-05 | 0 | 1.47M | −1.47M | −$242.8K |
| 2026-08-06 | 0 | 1.66M | −1.66M | −$270.6K |
| 2026-08-07 | 0 | 2.56M | −2.56M | −$395.7K |
| 2026-08-08 | 0 | 995.8K | −995.8K | −$139.3K |
| 2026-08-09 | 0 | 2.11M | −2.11M | −$289.1K |
| 2026-08-10 | 0 | 2.50M | −2.50M | −$325.1K |
| 2026-08-11 | 0 | 3.70M | −3.70M | −$544.0K |
| 2026-08-12 | 0 | 4.43M | −4.43M | −$615.6K |
| 2026-08-13 | 0 | 1.72M | −1.72M | −$253.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-01 | 44.67M | $6.99M |
| 2026-10-01 | 44.67M | $6.99M |
| 2026-11-01 | 44.67M | $6.99M |
| 2026-12-01 | 44.67M | $6.99M |
| 2027-01-01 | 44.67M | $6.99M |
| 2027-02-01 | 44.67M | $6.99M |
| 2027-03-01 | 44.67M | $6.99M |
| 2027-04-01 | 44.67M | $6.99M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$448.9K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 12.52B | 1.92B | 🔴 +2.21B PUMP | +$6.15M | per-day (86%) | 0.0000% |
| 30d | 29/30d | 20.80B | 8.68B | 🟢 −873.63M PUMP | +$32.8K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 46.20B | 25.48B | 🟢 −9.26B PUMP | −$13.91M | per-day (99%) | 0.0000% |

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
| 2026-08-01 | 359.91M | 261.75M | −101.44M | −$210.2K |
| 2026-08-02 | 359.91M | 247.58M | −87.28M | −$184.8K |
| 2026-08-03 | 359.91M | 353.61M | −193.30M | −$401.8K |
| 2026-08-04 | 359.91M | 382.55M | −222.24M | −$473.5K |
| 2026-08-05 | 359.91M | 272.38M | −112.08M | −$272.6K |
| 2026-08-06 | 359.91M | 271.21M | −110.90M | −$266.9K |
| 2026-08-07 | 359.91M | 268.41M | −108.10M | −$257.7K |
| 2026-08-08 | 359.91M | 323.00M | −162.69M | −$368.9K |
| 2026-08-09 | 359.91M | 360.26M | −199.95M | −$481.8K |
| 2026-08-10 | 359.91M | 296.85M | −136.54M | −$365.3K |
| 2026-08-11 | 359.91M | 295.70M | −135.39M | −$375.8K |
| 2026-08-12 | 10.36B | 320.72M | +2.84B | +$7.73M |
| 2026-08-13 | 359.91M | 320.13M | −159.82M | −$439.6K |
| 2026-08-14 | 359.91M | 0 | +160.31M | +$448.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 359.91M | $1.01M |
| 2026-08-16 | 359.91M | $1.01M |
| 2026-08-17 | 359.91M | $1.01M |
| 2026-08-18 | 359.91M | $1.01M |
| 2026-08-19 | 359.91M | $1.01M |
| 2026-08-20 | 359.91M | $1.01M |
| 2026-08-21 | 359.91M | $1.01M |
| 2026-08-22 | 359.91M | $1.01M |


---

## LayerZero (ZRO)

**Price:** $0.79    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.79 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.79 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 170.4K | 🔴 +11.29M ZRO | +$8.89M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 558.8K | 🔴 +33.83M ZRO | +$26.49M | per-day (57%) | 0.0000% |

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
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-03-08 | 0 | 133.3K | −133.3K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$9.02M |
| 2026-08-06 | 0 | 170.4K | −170.4K | −$131.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-20 | 23.63M | $18.59M |
| 2026-09-20 | 23.63M | $18.59M |
| 2026-10-20 | 23.63M | $18.59M |
| 2026-11-20 | 23.63M | $18.59M |
| 2026-12-20 | 23.63M | $18.59M |
| 2027-01-20 | 23.63M | $18.59M |
| 2027-02-20 | 23.63M | $18.59M |
| 2027-03-20 | 23.63M | $18.59M |


---

## Ethena (ENA)

**Price:** $0.08    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$345.5K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.42M | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.36M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$31.09M | today @ $0.08 | 0.0000% |

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
| 2026-08-01 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-02 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-03 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-04 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-05 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-06 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-07 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-08 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-09 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-10 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-11 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-12 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-13 | 10.75M | 0 | +4.11M | +$345.5K |
| 2026-08-14 | 10.75M | 0 | +4.11M | +$345.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 10.75M | $903.3K |
| 2026-08-16 | 10.75M | $903.3K |
| 2026-08-17 | 10.75M | $903.3K |
| 2026-08-18 | 10.75M | $903.3K |
| 2026-08-19 | 10.75M | $903.3K |
| 2026-08-20 | 10.75M | $903.3K |
| 2026-08-21 | 10.75M | $903.3K |
| 2026-08-22 | 10.75M | $903.3K |


---

## Aerodrome (AERO)

**Price:** $0.40    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.40 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.40 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.40 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.40 | 0.0000% |

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
| 7d | 6/7d | 1.33M | 266.2K | 🔴 +272.4K DYDX | +$30.6K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 1.50M | 🔴 +807.3K DYDX | +$93.9K | per-day (97%) | 0.0000% |
| 90d | 84/90d | 17.04M | 4.04M | 🔴 +2.89M DYDX | +$393.4K | per-day (93%) | 0.0000% |

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
| 2026-08-01 | 189.4K | 14.3K | +62.7K | +$7.1K |
| 2026-08-02 | 189.4K | 19.0K | +58.0K | +$6.6K |
| 2026-08-03 | 189.4K | 51.7K | +25.2K | +$2.8K |
| 2026-08-04 | 189.4K | 43.9K | +33.0K | +$3.7K |
| 2026-08-05 | 189.4K | 134.8K | −57.9K | −$6.5K |
| 2026-08-06 | 189.4K | 29.6K | +47.3K | +$5.3K |
| 2026-08-07 | 189.4K | 70.5K | +6.5K | +$741.72 |
| 2026-08-08 | 189.4K | 13.0K | +64.0K | +$7.2K |
| 2026-08-09 | 189.4K | 14.9K | +62.0K | +$7.1K |
| 2026-08-10 | 189.4K | 86.5K | −9.5K | −$1.1K |
| 2026-08-11 | 189.4K | 36.1K | +40.8K | +$4.6K |
| 2026-08-12 | 189.4K | 50.8K | +26.1K | +$3.0K |
| 2026-08-13 | 189.4K | 64.9K | +12.1K | +$1.3K |
| 2026-08-14 | 189.4K | 0 | +76.9K | +$8.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 189.4K | $20.8K |
| 2026-08-16 | 189.4K | $20.8K |
| 2026-08-17 | 189.4K | $20.8K |
| 2026-08-18 | 189.4K | $20.8K |
| 2026-08-19 | 189.4K | $20.8K |
| 2026-08-20 | 189.4K | $20.8K |
| 2026-08-21 | 189.4K | $20.8K |
| 2026-08-22 | 189.4K | $20.8K |


---

## Meteora (MET)

**Price:** $0.16    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$18.1K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$126.6K | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$542.6K | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.63M | today @ $0.16 | 0.0000% |

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
| 2026-08-01 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-02 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-03 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-04 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-05 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-06 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-07 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-08 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-09 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-10 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-11 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-12 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-13 | 291.3K | 0 | +110.1K | +$18.1K |
| 2026-08-14 | 291.3K | 0 | +110.1K | +$18.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 291.3K | $47.8K |
| 2026-08-16 | 291.3K | $47.8K |
| 2026-08-17 | 291.3K | $47.8K |
| 2026-08-18 | 291.3K | $47.8K |
| 2026-08-19 | 291.3K | $47.8K |
| 2026-08-20 | 291.3K | $47.8K |
| 2026-08-21 | 291.3K | $47.8K |
| 2026-08-22 | 291.3K | $47.8K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$2.5K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$17.8K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$76.2K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$228.5K | today @ $0.02 | 0.0000% |

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
| 2026-08-01 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-02 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-03 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-04 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-05 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-06 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-07 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-08 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-09 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-10 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-11 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-12 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-13 | 347.8K | 0 | +118.1K | +$2.5K |
| 2026-08-14 | 347.8K | 0 | +118.1K | +$2.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 347.8K | $7.5K |
| 2026-08-16 | 347.8K | $7.5K |
| 2026-08-17 | 347.8K | $7.5K |
| 2026-08-18 | 347.8K | $7.5K |
| 2026-08-19 | 347.8K | $7.5K |
| 2026-08-20 | 347.8K | $7.5K |
| 2026-08-21 | 347.8K | $7.5K |
| 2026-08-22 | 347.8K | $7.5K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.4K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$23.6K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$101.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$303.9K | today @ $0.01 | 0.0000% |

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
| 2026-08-01 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-02 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-03 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-04 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-05 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-06 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-07 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-08 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-09 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-10 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-11 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-12 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-13 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-08-14 | 644.2K | 0 | +302.8K | +$3.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-15 | 644.2K | $7.2K |
| 2026-08-16 | 644.2K | $7.2K |
| 2026-08-17 | 644.2K | $7.2K |
| 2026-08-18 | 644.2K | $7.2K |
| 2026-08-19 | 644.2K | $7.2K |
| 2026-08-20 | 644.2K | $7.2K |
| 2026-08-21 | 644.2K | $7.2K |
| 2026-08-22 | 644.2K | $7.2K |


---

## Uniswap (UNI)

**Price:** $3.22    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $3.22 | 0.0000% |
| 7d | 6/7d | 0 | 313.2K | 🟢 −313.2K UNI | −$1.20M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.39M | 🟢 −1.39M UNI | −$5.39M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.36M | 🟢 −4.36M UNI | −$14.25M | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 59.2K | −59.2K | −$262.6K |
| 2026-08-01 | 0 | 34.0K | −34.0K | −$147.9K |
| 2026-08-02 | 0 | 38.9K | −38.9K | −$159.0K |
| 2026-08-03 | 0 | 59.4K | −59.4K | −$247.4K |
| 2026-08-04 | 0 | 59.3K | −59.3K | −$231.6K |
| 2026-08-05 | 0 | 72.5K | −72.5K | −$278.8K |
| 2026-08-06 | 0 | 82.2K | −82.2K | −$332.5K |
| 2026-08-07 | 0 | 60.0K | −60.0K | −$240.7K |
| 2026-08-08 | 0 | 34.2K | −34.2K | −$135.7K |
| 2026-08-09 | 0 | 42.1K | −42.1K | −$168.3K |
| 2026-08-10 | 0 | 57.8K | −57.8K | −$230.4K |
| 2026-08-11 | 0 | 46.2K | −46.2K | −$182.0K |
| 2026-08-12 | 0 | 70.0K | −70.0K | −$262.5K |
| 2026-08-13 | 0 | 63.0K | −63.0K | −$224.9K |


---

## Raydium (RAY)

**Price:** $0.63    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.63 | 0.0000% |
| 7d | 6/7d | 0 | 337.6K | 🟢 −337.6K RAY | −$213.2K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.01M | 🟢 −1.01M RAY | −$633.2K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 2.66M | 🟢 −2.66M RAY | −$1.72M | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 20.6K | −20.6K | −$12.6K |
| 2026-08-01 | 0 | 12.7K | −12.7K | −$7.6K |
| 2026-08-02 | 0 | 18.6K | −18.6K | −$11.2K |
| 2026-08-03 | 0 | 26.2K | −26.2K | −$16.0K |
| 2026-08-04 | 0 | 55.5K | −55.5K | −$33.9K |
| 2026-08-05 | 0 | 59.2K | −59.2K | −$36.4K |
| 2026-08-06 | 0 | 108.9K | −108.9K | −$67.3K |
| 2026-08-07 | 0 | 102.4K | −102.4K | −$62.6K |
| 2026-08-08 | 0 | 55.2K | −55.2K | −$34.3K |
| 2026-08-09 | 0 | 56.8K | −56.8K | −$36.3K |
| 2026-08-10 | 0 | 70.7K | −70.7K | −$44.7K |
| 2026-08-11 | 0 | 66.5K | −66.5K | −$42.0K |
| 2026-08-12 | 0 | 45.9K | −45.9K | −$29.1K |
| 2026-08-13 | 0 | 42.4K | −42.4K | −$26.9K |


---

## Euler (EUL)

**Price:** $1.17    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.17 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 1 | 🟢 −1 EUL | −$1.19 | per-day (100%) | 0.0000% |
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

**Price:** $0.52    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.52 | 0.0000% |
| 7d | 6/7d | 0 | 36.7K | 🟢 −36.7K GNS | −$19.3K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 164.9K | 🟢 −164.9K GNS | −$88.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 818.2K | 🟢 −818.2K GNS | −$424.0K | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 8.3K | −8.3K | −$4.1K |
| 2026-08-01 | 0 | 2.1K | −2.1K | −$1.0K |
| 2026-08-02 | 0 | 5.1K | −5.1K | −$2.5K |
| 2026-08-03 | 0 | 3.8K | −3.8K | −$1.9K |
| 2026-08-04 | 0 | 3.9K | −3.9K | −$1.9K |
| 2026-08-05 | 0 | 5.3K | −5.3K | −$2.6K |
| 2026-08-06 | 0 | 1.9K | −1.9K | −$944.00 |
| 2026-08-07 | 0 | 5.3K | −5.3K | −$2.6K |
| 2026-08-08 | 0 | 3.6K | −3.6K | −$1.8K |
| 2026-08-09 | 0 | 6.1K | −6.1K | −$3.1K |
| 2026-08-10 | 0 | 7.7K | −7.7K | −$4.1K |
| 2026-08-11 | 0 | 7.0K | −7.0K | −$3.7K |
| 2026-08-12 | 0 | 9.9K | −9.9K | −$5.2K |
| 2026-08-13 | 0 | 2.5K | −2.5K | −$1.3K |


---

## Orca (ORCA)

**Price:** $1.02    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.02 | 0.0000% |
| 7d | 6/7d | 0 | 13.3K | 🟢 −13.3K ORCA | −$14.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 45.0K | 🟢 −45.0K ORCA | −$50.5K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 184.6K | 🟢 −184.6K ORCA | −$216.8K | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-08-01 | 0 | 1.1K | −1.1K | −$1.2K |
| 2026-08-02 | 0 | 1.0K | −1.0K | −$1.1K |
| 2026-08-03 | 0 | 1.4K | −1.4K | −$1.5K |
| 2026-08-04 | 0 | 1.6K | −1.6K | −$1.7K |
| 2026-08-05 | 0 | 1.6K | −1.6K | −$1.8K |
| 2026-08-06 | 0 | 1.3K | −1.3K | −$1.5K |
| 2026-08-07 | 0 | 1.7K | −1.7K | −$1.8K |
| 2026-08-08 | 0 | 1.1K | −1.1K | −$1.2K |
| 2026-08-09 | 0 | 1.1K | −1.1K | −$1.2K |
| 2026-08-10 | 0 | 1.8K | −1.8K | −$1.9K |
| 2026-08-11 | 0 | 1.7K | −1.7K | −$1.8K |
| 2026-08-12 | 0 | 3.7K | −3.7K | −$3.9K |
| 2026-08-13 | 0 | 3.9K | −3.9K | −$4.0K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 192.0K | 🟢 −192.0K MNDE | −$3.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 1.38M | 🟢 −1.38M MNDE | −$26.0K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 5.72M | 🟢 −5.72M MNDE | −$107.3K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 14.40M | 🟢 −14.40M MNDE | −$270.5K | per-day (100%) | 0.0000% |

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
| 2026-08-01 | 0 | 187.3K | −187.3K | −$3.5K |
| 2026-08-02 | 0 | 191.0K | −191.0K | −$3.5K |
| 2026-08-03 | 0 | 191.5K | −191.5K | −$3.5K |
| 2026-08-04 | 0 | 195.4K | −195.4K | −$3.6K |
| 2026-08-05 | 0 | 192.8K | −192.8K | −$3.6K |
| 2026-08-06 | 0 | 174.6K | −174.6K | −$3.2K |
| 2026-08-07 | 0 | 190.9K | −190.9K | −$3.6K |
| 2026-08-08 | 0 | 198.7K | −198.7K | −$3.7K |
| 2026-08-09 | 0 | 199.5K | −199.5K | −$3.7K |
| 2026-08-10 | 0 | 196.8K | −196.8K | −$3.7K |
| 2026-08-11 | 0 | 198.4K | −198.4K | −$3.7K |
| 2026-08-12 | 0 | 193.9K | −193.9K | −$3.7K |
| 2026-08-13 | 0 | 197.9K | −197.9K | −$3.8K |
| 2026-08-14 | 0 | 192.0K | −192.0K | −$3.7K |


---

## ether.fi (ETHFI)

**Price:** $0.43    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.43 | 0.0000% |
| 7d | 6/7d | 0 | 81.2K | 🟢 −81.2K ETHFI | −$31.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 369.3K | 🟢 −369.3K ETHFI | −$150.1K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 1.12M | 🟢 −1.12M ETHFI | −$419.2K | per-day (100%) | 0.0000% |

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
| 2026-07-31 | 0 | 13.1K | −13.1K | −$5.2K |
| 2026-08-01 | 0 | 15.4K | −15.4K | −$6.4K |
| 2026-08-02 | 0 | 12.2K | −12.2K | −$4.8K |
| 2026-08-03 | 0 | 14.4K | −14.4K | −$5.8K |
| 2026-08-04 | 0 | 15.1K | −15.1K | −$6.1K |
| 2026-08-05 | 0 | 15.7K | −15.7K | −$5.6K |
| 2026-08-06 | 0 | 16.4K | −16.4K | −$6.1K |
| 2026-08-07 | 0 | 17.3K | −17.3K | −$6.2K |
| 2026-08-08 | 0 | 13.9K | −13.9K | −$5.3K |
| 2026-08-09 | 0 | 11.6K | −11.6K | −$4.5K |
| 2026-08-10 | 0 | 14.4K | −14.4K | −$5.5K |
| 2026-08-11 | 0 | 13.5K | −13.5K | −$5.2K |
| 2026-08-12 | 0 | 14.1K | −14.1K | −$5.4K |
| 2026-08-13 | 0 | 13.7K | −13.7K | −$5.2K |


---

## CoW Protocol (COW)

**Price:** $0.10    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.10 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 425.9K | 🟢 −425.9K COW | −$44.9K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 3.75M | 🟢 −3.75M COW | −$460.5K | per-day (100%) | 0.0000% |
| 90d | 83/90d | 0 | 18.53M | 🟢 −18.53M COW | −$2.65M | per-day (100%) | 0.0000% |

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
| 2026-07-27 | 0 | 204.5K | −204.5K | −$27.5K |
| 2026-07-28 | 0 | 182.9K | −182.9K | −$23.6K |
| 2026-07-29 | 0 | 140.1K | −140.1K | −$17.6K |
| 2026-07-30 | 0 | 138.3K | −138.3K | −$16.1K |
| 2026-07-31 | 0 | 168.2K | −168.2K | −$19.6K |
| 2026-08-01 | 0 | 78.1K | −78.1K | −$9.1K |
| 2026-08-02 | 0 | 81.1K | −81.1K | −$9.2K |
| 2026-08-03 | 0 | 704.3K | −704.3K | −$80.3K |
| 2026-08-06 | 0 | 129.9K | −129.9K | −$13.8K |
| 2026-08-07 | 0 | 171.8K | −171.8K | −$17.8K |
| 2026-08-08 | 0 | 54.1K | −54.1K | −$5.7K |
| 2026-08-09 | 0 | 57.8K | −57.8K | −$6.2K |
| 2026-08-10 | 0 | 150.2K | −150.2K | −$15.9K |
| 2026-08-11 | 0 | 163.8K | −163.8K | −$17.0K |


---
