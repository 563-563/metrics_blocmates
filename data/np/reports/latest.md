# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-07-01T15:16:00.919Z
**As-of:** 2026-07-01

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $64.21    **Circulating:** 520.25M HYPE    **AF balance:** 45.58M HYPE    **Total staked:** 438.52M HYPE (84.3% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 17.8K | 🟢 −420.7K HYPE | −$27.01M | today @ $64.21 | -0.0421% |
| 7d | 7/7d | 7.53M | 110.2K | 🔴 +145.6K HYPE | +$9.35M | today @ $64.21 | 0.0146% |
| 30d | 30/30d | 17.45M | 180.3K | 🟢 −6.67M HYPE | −$428.44M | today @ $64.21 | -0.6673% |
| 90d | 90/90d | 52.34M | 1.65M | 🟢 −1.76M HYPE | −$201.53M | per-day (56%) | -0.1759% |

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
| 2026-06-18 | 0 | 2.4K | −691.7K | −$44.41M |
| 2026-06-19 | 0 | 2.6K | −2.6K | −$167.7K |
| 2026-06-20 | 0 | 2.1K | −2.1K | −$135.8K |
| 2026-06-21 | 0 | 4.8K | −132.7K | −$8.52M |
| 2026-06-22 | 0 | 3.5K | −3.5K | −$223.8K |
| 2026-06-23 | 0 | 3.0K | −3.0K | −$194.6K |
| 2026-06-24 | 0 | 916 | −916 | −$58.8K |
| 2026-06-25 | 0 | 5.1K | −5.1K | −$325.5K |
| 2026-06-26 | 0 | 19.3K | −1.72M | −$110.64M |
| 2026-06-27 | 0 | 10.3K | −642.0K | −$41.22M |
| 2026-06-28 | 0 | 11.7K | −11.7K | −$752.4K |
| 2026-06-29 | 7.53M | 24.8K | +2.99M | +$191.84M |
| 2026-06-30 | 0 | 21.2K | −39.5K | −$2.53M |
| 2026-07-01 | 0 | 17.8K | −420.7K | −$27.01M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-06 | 9.92M | $636.75M |
| 2026-07-29 | 7.53M | $483.59M |
| 2026-08-06 | 9.92M | $636.75M |
| 2026-08-29 | 7.53M | $483.59M |
| 2026-09-06 | 9.92M | $636.75M |
| 2026-09-29 | 7.53M | $483.59M |
| 2026-10-06 | 9.92M | $636.75M |
| 2026-10-29 | 7.53M | $483.59M |


---

## Aave (AAVE)

**Price:** $86.72    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −465 AAVE | −$40.3K | today @ $86.72 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −596 AAVE | −$51.6K | today @ $86.72 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −30.4K AAVE | −$2.64M | today @ $86.72 | 0.0000% |
| 90d | ⚠ 17/90d partial | 0 | 14.5K | 🟢 −54.1K AAVE | −$4.69M | today @ $86.72 | 0.0000% |

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
| 2026-06-18 | 0 | 0 | 0 | $0 |
| 2026-06-19 | 0 | 0 | 0 | $0 |
| 2026-06-20 | 0 | 0 | −32 | −$2.7K |
| 2026-06-21 | 0 | 0 | −1.7K | −$145.2K |
| 2026-06-22 | 0 | 0 | 0 | $0 |
| 2026-06-23 | 0 | 0 | −297 | −$25.8K |
| 2026-06-24 | 0 | 0 | −163 | −$14.1K |
| 2026-06-25 | 0 | 0 | −23 | −$2.0K |
| 2026-06-26 | 0 | 0 | −7 | −$607.70 |
| 2026-06-27 | 0 | 0 | −78 | −$6.8K |
| 2026-06-28 | 0 | 0 | 0 | $0 |
| 2026-06-29 | 0 | 0 | −18 | −$1.5K |
| 2026-06-30 | 0 | 0 | −6 | −$477.19 |
| 2026-07-01 | 0 | 0 | −465 | −$40.3K |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −851.5K SKY | −$45.0K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.27M SKY | −$67.4K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −6.11M SKY | −$323.5K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −6.58M SKY | −$347.9K | today @ $0.05 | 0.0000% |

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
| 2026-06-18 | 0 | 0 | −18.9K | −$999.20 |
| 2026-06-19 | 0 | 0 | 0 | $0 |
| 2026-06-20 | 0 | 0 | 0 | $0 |
| 2026-06-21 | 0 | 0 | −39.1K | −$2.1K |
| 2026-06-22 | 0 | 0 | −449 | −$23.74 |
| 2026-06-23 | 0 | 0 | 0 | $0 |
| 2026-06-24 | 0 | 0 | −257.7K | −$13.6K |
| 2026-06-25 | 0 | 0 | −87.7K | −$4.6K |
| 2026-06-26 | 0 | 0 | −11.3K | −$599.66 |
| 2026-06-27 | 0 | 0 | −304.2K | −$16.1K |
| 2026-06-28 | 0 | 0 | −20.0K | −$1.1K |
| 2026-06-29 | 0 | 0 | 0 | $0 |
| 2026-06-30 | 0 | 0 | 0 | $0 |
| 2026-07-01 | 0 | 0 | −851.5K | −$45.0K |


---

## Lighter (LIT)

**Price:** $1.82    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.82 | 0.0000% |
| 7d | 6/7d | 0 | 271.1K | 🟢 −271.1K LIT | −$469.3K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.73M | 🟢 −1.73M LIT | −$2.73M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.82M | 🟢 −5.82M LIT | −$6.88M | per-day (100%) | 0.0000% |

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
| 2026-06-17 | 0 | 73.1K | −73.1K | −$127.0K |
| 2026-06-18 | 0 | 48.7K | −48.7K | −$85.1K |
| 2026-06-19 | 0 | 45.1K | −45.1K | −$73.0K |
| 2026-06-20 | 0 | 22.8K | −22.8K | −$35.0K |
| 2026-06-21 | 0 | 28.2K | −28.2K | −$43.8K |
| 2026-06-22 | 0 | 42.7K | −42.7K | −$67.7K |
| 2026-06-23 | 0 | 43.9K | −43.9K | −$70.7K |
| 2026-06-24 | 0 | 60.8K | −60.8K | −$91.2K |
| 2026-06-25 | 0 | 67.6K | −67.6K | −$113.9K |
| 2026-06-26 | 0 | 54.9K | −54.9K | −$88.3K |
| 2026-06-27 | 0 | 34.3K | −34.3K | −$62.3K |
| 2026-06-28 | 0 | 18.2K | −18.2K | −$31.3K |
| 2026-06-29 | 0 | 41.2K | −41.2K | −$71.4K |
| 2026-06-30 | 0 | 54.9K | −54.9K | −$102.0K |


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
| 2026-06-18 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-19 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-20 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-21 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-22 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-23 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-24 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-25 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-26 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-27 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-28 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-29 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-06-30 | 202.7K | 0 | +97.4K | +$204.5K |
| 2026-07-01 | 202.7K | 0 | +97.4K | +$204.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 202.7K | $425.6K |
| 2026-07-03 | 202.7K | $425.6K |
| 2026-07-04 | 202.7K | $425.6K |
| 2026-07-05 | 202.7K | $425.6K |
| 2026-07-06 | 202.7K | $425.6K |
| 2026-07-07 | 202.7K | $425.6K |
| 2026-07-08 | 202.7K | $425.6K |
| 2026-07-09 | 202.7K | $425.6K |


---

## Pendle (PENDLE)

**Price:** $1.38    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.38 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.38 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.38 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.38 | 0.0000% |

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

**Price:** $0.79    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$168.9K | today @ $0.79 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$1.18M | today @ $0.79 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$5.07M | today @ $0.79 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$15.21M | today @ $0.79 | 0.0000% |

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
| 2026-06-18 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-19 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-20 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-21 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-22 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-23 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-24 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-25 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-26 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-27 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-28 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-29 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-06-30 | 626.2K | 0 | +214.3K | +$168.9K |
| 2026-07-01 | 626.2K | 0 | +214.3K | +$168.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 626.2K | $493.7K |
| 2026-07-03 | 626.2K | $493.7K |
| 2026-07-04 | 626.2K | $493.7K |
| 2026-07-05 | 626.2K | $493.7K |
| 2026-07-06 | 626.2K | $493.7K |
| 2026-07-07 | 626.2K | $493.7K |
| 2026-07-08 | 626.2K | $493.7K |
| 2026-07-09 | 626.2K | $493.7K |


---

## Jupiter (JUP)

**Price:** $0.24    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 89 | 🟢 −89 JUP | −$21.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 53.47M | 2.38M | 🔴 +13.18M JUP | +$3.10M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 13.82M | 🔴 +1.74M JUP | +$1.02M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 35.60M | 🔴 +11.06M JUP | +$2.87M | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 454.2K | −454.2K | −$86.1K |
| 2026-06-19 | 0 | 336.0K | −336.0K | −$65.4K |
| 2026-06-20 | 0 | 525.6K | −525.6K | −$99.5K |
| 2026-06-21 | 0 | 293.2K | −293.2K | −$61.4K |
| 2026-06-22 | 0 | 487.0K | −487.0K | −$104.2K |
| 2026-06-23 | 0 | 369.2K | −369.2K | −$77.7K |
| 2026-06-24 | 0 | 559.0K | −559.0K | −$114.3K |
| 2026-06-25 | 0 | 487.8K | −487.8K | −$106.6K |
| 2026-06-26 | 0 | 450.1K | −450.1K | −$99.7K |
| 2026-06-27 | 53.47M | 201.2K | +15.35M | +$3.57M |
| 2026-06-28 | 0 | 382.0K | −382.0K | −$83.6K |
| 2026-06-29 | 0 | 400.5K | −400.5K | −$84.4K |
| 2026-06-30 | 0 | 453.8K | −453.8K | −$98.6K |
| 2026-07-01 | 0 | 89 | −89 | −$21.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-27 | 53.47M | $12.61M |
| 2026-08-27 | 53.47M | $12.61M |
| 2026-09-27 | 53.47M | $12.61M |
| 2026-10-27 | 53.47M | $12.61M |
| 2026-11-27 | 53.47M | $12.61M |
| 2026-12-27 | 53.47M | $12.61M |
| 2027-01-27 | 53.47M | $12.61M |
| 2027-02-27 | 53.47M | $12.61M |


---

## Fluid (FLUID)

**Price:** $0.99    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$2.7K | today @ $0.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$19.1K | today @ $0.99 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$231.0K | today @ $0.99 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$692.9K | today @ $0.99 | 0.0000% |

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
| 2026-06-18 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-19 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-20 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-21 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-22 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-23 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-24 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-25 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-26 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-27 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-28 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-29 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-30 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-07-01 | 9.1K | 0 | +2.7K | +$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 9.1K | $9.1K |
| 2026-07-03 | 9.1K | $9.1K |
| 2026-07-04 | 9.1K | $9.1K |
| 2026-07-05 | 509.1K | $506.4K |
| 2026-07-06 | 9.1K | $9.1K |
| 2026-07-07 | 9.1K | $9.1K |
| 2026-07-08 | 9.1K | $9.1K |
| 2026-07-09 | 9.1K | $9.1K |


---

## Collector Crypt (CARDS)

**Price:** $0.24    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 14.25M | 851.7K | 🔴 +10.54M CARDS | +$2.51M | per-day (100%) | 0.0000% |
| 7d | 7/7d | 14.25M | 10.34M | 🔴 +1.05M CARDS | +$105.3K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 14.25M | 58.54M | 🟢 −47.14M CARDS | −$10.84M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 42.76M | 231.47M | 🟢 −197.30M CARDS | −$21.63M | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 2.58M | −2.58M | −$605.3K |
| 2026-06-19 | 0 | 1.50M | −1.50M | −$476.9K |
| 2026-06-20 | 0 | 1.21M | −1.21M | −$368.2K |
| 2026-06-21 | 0 | 1.83M | −1.83M | −$528.4K |
| 2026-06-22 | 0 | 1.73M | −1.73M | −$493.8K |
| 2026-06-23 | 0 | 2.13M | −2.13M | −$566.5K |
| 2026-06-24 | 0 | 1.21M | −1.21M | −$342.4K |
| 2026-06-25 | 0 | 2.05M | −2.05M | −$549.6K |
| 2026-06-26 | 0 | 1.73M | −1.73M | −$448.5K |
| 2026-06-27 | 0 | 1.23M | −1.23M | −$310.9K |
| 2026-06-28 | 0 | 1.78M | −1.78M | −$429.9K |
| 2026-06-29 | 0 | 1.83M | −1.83M | −$461.3K |
| 2026-06-30 | 0 | 875.9K | −875.9K | −$199.8K |
| 2026-07-01 | 14.25M | 851.7K | +10.54M | +$2.51M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-01 | 14.25M | $3.39M |
| 2026-09-01 | 44.67M | $10.61M |
| 2026-10-01 | 44.67M | $10.61M |
| 2026-11-01 | 44.67M | $10.61M |
| 2026-12-01 | 44.67M | $10.61M |
| 2027-01-01 | 44.67M | $10.61M |
| 2027-02-01 | 44.67M | $10.61M |
| 2027-03-01 | 44.67M | $10.61M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$238.1K | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 359.91M | 2.05B | 🟢 −1.89B PUMP | −$2.54M | per-day (86%) | 0.0000% |
| 30d | 29/30d | 10.36B | 7.92B | 🟢 −4.76B PUMP | −$7.07M | per-day (97%) | 0.0000% |
| 90d | 89/90d | 30.36B | 31.08B | 🟢 −21.92B PUMP | −$37.16M | per-day (99%) | 0.0000% |

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
| 2026-06-18 | 0 | 287.45M | −287.45M | −$423.6K |
| 2026-06-19 | 0 | 263.59M | −263.59M | −$381.3K |
| 2026-06-20 | 0 | 239.36M | −239.36M | −$328.3K |
| 2026-06-21 | 0 | 247.63M | −247.63M | −$350.6K |
| 2026-06-22 | 0 | 301.87M | −301.87M | −$442.1K |
| 2026-06-23 | 0 | 299.44M | −299.44M | −$435.9K |
| 2026-06-24 | 0 | 276.88M | −276.88M | −$400.3K |
| 2026-06-25 | 0 | 316.58M | −316.58M | −$407.6K |
| 2026-06-26 | 0 | 343.12M | −343.12M | −$410.7K |
| 2026-06-27 | 0 | 275.24M | −275.24M | −$369.0K |
| 2026-06-28 | 0 | 390.16M | −390.16M | −$530.2K |
| 2026-06-29 | 0 | 323.93M | −323.93M | −$467.7K |
| 2026-06-30 | 0 | 402.60M | −402.60M | −$597.4K |
| 2026-07-01 | 359.91M | 0 | +160.31M | +$238.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 359.91M | $534.6K |
| 2026-07-03 | 359.91M | $534.6K |
| 2026-07-04 | 359.91M | $534.6K |
| 2026-07-05 | 359.91M | $534.6K |
| 2026-07-06 | 359.91M | $534.6K |
| 2026-07-07 | 359.91M | $534.6K |
| 2026-07-08 | 359.91M | $534.6K |
| 2026-07-09 | 359.91M | $534.6K |


---

## LayerZero (ZRO)

**Price:** $0.83    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.83 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.83 | 0.0000% |
| 30d | ⚠ 2/30d partial | 23.63M | 244.7K | 🔴 +11.22M ZRO | +$9.20M | per-day (67%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 544.1K | 🔴 +33.84M ZRO | +$27.72M | per-day (57%) | 0.0000% |

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
| 2026-01-15 | 0 | 285.6K | −285.6K | −$474.9K |
| 2026-01-20 | 23.63M | 0 | +11.46M | +$9.50M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.50M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.50M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.50M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.50M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.50M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-20 | 23.63M | $19.57M |
| 2026-08-20 | 23.63M | $19.57M |
| 2026-09-20 | 23.63M | $19.57M |
| 2026-10-20 | 23.63M | $19.57M |
| 2026-11-20 | 23.63M | $19.57M |
| 2026-12-20 | 23.63M | $19.57M |
| 2027-01-20 | 23.63M | $19.57M |
| 2027-02-20 | 23.63M | $19.57M |


---

## Ethena (ENA)

**Price:** $0.07    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$298.9K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.09M | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$8.97M | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$26.90M | today @ $0.07 | 0.0000% |

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
| 2026-06-18 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-19 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-20 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-21 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-22 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-23 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-24 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-25 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-26 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-27 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-28 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-29 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-06-30 | 10.75M | 0 | +4.11M | +$298.9K |
| 2026-07-01 | 10.75M | 0 | +4.11M | +$298.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 10.75M | $781.5K |
| 2026-07-03 | 10.75M | $781.5K |
| 2026-07-04 | 10.75M | $781.5K |
| 2026-07-05 | 10.75M | $781.5K |
| 2026-07-06 | 10.75M | $781.5K |
| 2026-07-07 | 10.75M | $781.5K |
| 2026-07-08 | 10.75M | $781.5K |
| 2026-07-09 | 10.75M | $781.5K |


---

## Aerodrome (AERO)

**Price:** $0.49    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.49 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.49 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.49 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.49 | 0.0000% |

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

**Price:** $0.19    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$14.6K | today @ $0.19 | 0.0000% |
| 7d | ⚠ 1/7d partial | 1.33M | 28.4K | 🔴 +510.1K DYDX | +$94.6K | per-day (14%) | 0.0000% |
| 30d | 24/30d | 5.68M | 758.2K | 🔴 +1.55M DYDX | +$235.3K | per-day (80%) | 0.0000% |
| 90d | 84/90d | 11.93M | 4.47M | 🔴 +372.8K DYDX | +$141.1K | per-day (93%) | 0.0000% |

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
| 2026-06-18 | 189.4K | 103.4K | −26.5K | −$3.1K |
| 2026-06-19 | 189.4K | 10.7K | +66.2K | +$7.8K |
| 2026-06-20 | 189.4K | 14.9K | +62.1K | +$7.4K |
| 2026-06-21 | 189.4K | 16.7K | +60.3K | +$7.2K |
| 2026-06-22 | 189.4K | 19.8K | +57.1K | +$6.9K |
| 2026-06-23 | 189.4K | 21.1K | +55.8K | +$7.2K |
| 2026-06-24 | 189.4K | 29.0K | +48.0K | +$7.2K |
| 2026-06-25 | 189.4K | 28.4K | +48.6K | +$7.2K |
| 2026-06-26 | 189.4K | 0 | +76.9K | +$14.6K |
| 2026-06-27 | 189.4K | 0 | +76.9K | +$14.6K |
| 2026-06-28 | 189.4K | 0 | +76.9K | +$14.6K |
| 2026-06-29 | 189.4K | 0 | +76.9K | +$14.6K |
| 2026-06-30 | 189.4K | 0 | +76.9K | +$14.6K |
| 2026-07-01 | 189.4K | 0 | +76.9K | +$14.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 189.4K | $35.9K |
| 2026-07-03 | 189.4K | $35.9K |
| 2026-07-04 | 189.4K | $35.9K |
| 2026-07-05 | 189.4K | $35.9K |
| 2026-07-06 | 189.4K | $35.9K |
| 2026-07-07 | 189.4K | $35.9K |
| 2026-07-08 | 189.4K | $35.9K |
| 2026-07-09 | 189.4K | $35.9K |


---

## Meteora (MET)

**Price:** $0.19    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$20.4K | today @ $0.19 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$143.0K | today @ $0.19 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$612.8K | today @ $0.19 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.84M | today @ $0.19 | 0.0000% |

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
| 2026-06-18 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-19 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-20 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-21 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-22 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-23 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-24 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-25 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-26 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-27 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-28 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-29 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-06-30 | 291.3K | 0 | +110.1K | +$20.4K |
| 2026-07-01 | 291.3K | 0 | +110.1K | +$20.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 291.3K | $54.0K |
| 2026-07-03 | 291.3K | $54.0K |
| 2026-07-04 | 291.3K | $54.0K |
| 2026-07-05 | 291.3K | $54.0K |
| 2026-07-06 | 291.3K | $54.0K |
| 2026-07-07 | 291.3K | $54.0K |
| 2026-07-08 | 291.3K | $54.0K |
| 2026-07-09 | 291.3K | $54.0K |


---

## Sanctum (CLOUD)

**Price:** $0.02    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$1.9K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$13.0K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$55.5K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$166.5K | today @ $0.02 | 0.0000% |

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
| 2026-06-18 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-19 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-20 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-21 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-22 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-23 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-24 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-25 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-26 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-27 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-28 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-29 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-06-30 | 347.8K | 0 | +118.1K | +$1.9K |
| 2026-07-01 | 347.8K | 0 | +118.1K | +$1.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 347.8K | $5.5K |
| 2026-07-03 | 347.8K | $5.5K |
| 2026-07-04 | 347.8K | $5.5K |
| 2026-07-05 | 347.8K | $5.5K |
| 2026-07-06 | 347.8K | $5.5K |
| 2026-07-07 | 347.8K | $5.5K |
| 2026-07-08 | 347.8K | $5.5K |
| 2026-07-09 | 347.8K | $5.5K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$5.0K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$34.8K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$149.3K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 67.38M | 0 | 🔴 +34.77M DRIFT | +$571.5K | today @ $0.02 | 0.0000% |

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
| 2026-06-18 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-19 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-20 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-21 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-22 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-23 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-24 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-25 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-26 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-27 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-28 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-29 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-06-30 | 644.2K | 0 | +302.8K | +$5.0K |
| 2026-07-01 | 644.2K | 0 | +302.8K | +$5.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-02 | 644.2K | $10.6K |
| 2026-07-03 | 644.2K | $10.6K |
| 2026-07-04 | 644.2K | $10.6K |
| 2026-07-05 | 644.2K | $10.6K |
| 2026-07-06 | 644.2K | $10.6K |
| 2026-07-07 | 644.2K | $10.6K |
| 2026-07-08 | 644.2K | $10.6K |
| 2026-07-09 | 644.2K | $10.6K |


---

## Uniswap (UNI)

**Price:** $2.80    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $2.80 | 0.0000% |
| 7d | 6/7d | 0 | 288.0K | 🟢 −288.0K UNI | −$838.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.78M | 🟢 −1.78M UNI | −$4.94M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.25M | 🟢 −4.25M UNI | −$13.11M | per-day (100%) | 0.0000% |

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
| 2026-06-17 | 0 | 56.7K | −56.7K | −$186.9K |
| 2026-06-18 | 0 | 53.6K | −53.6K | −$172.8K |
| 2026-06-19 | 0 | 28.5K | −28.5K | −$90.7K |
| 2026-06-20 | 0 | 33.0K | −33.0K | −$101.3K |
| 2026-06-21 | 0 | 26.3K | −26.3K | −$79.0K |
| 2026-06-22 | 0 | 40.2K | −40.2K | −$119.9K |
| 2026-06-23 | 0 | 43.4K | −43.4K | −$129.3K |
| 2026-06-24 | 0 | 75.7K | −75.7K | −$220.8K |
| 2026-06-25 | 0 | 69.1K | −69.1K | −$201.3K |
| 2026-06-26 | 0 | 77.4K | −77.4K | −$223.0K |
| 2026-06-27 | 0 | 23.7K | −23.7K | −$70.0K |
| 2026-06-28 | 0 | 29.9K | −29.9K | −$87.6K |
| 2026-06-29 | 0 | 57.1K | −57.1K | −$166.9K |
| 2026-06-30 | 0 | 30.8K | −30.8K | −$89.2K |


---

## Raydium (RAY)

**Price:** $0.64    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 28.4K | 🟢 −28.4K RAY | −$18.3K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 221.1K | 🟢 −221.1K RAY | −$135.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 936.8K | 🟢 −936.8K RAY | −$571.9K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.92M | 🟢 −2.92M RAY | −$2.02M | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 34.8K | −34.8K | −$21.4K |
| 2026-06-19 | 0 | 24.2K | −24.2K | −$14.5K |
| 2026-06-20 | 0 | 21.6K | −21.6K | −$12.9K |
| 2026-06-21 | 0 | 19.5K | −19.5K | −$12.2K |
| 2026-06-22 | 0 | 31.3K | −31.3K | −$19.4K |
| 2026-06-23 | 0 | 33.1K | −33.1K | −$20.5K |
| 2026-06-24 | 0 | 34.5K | −34.5K | −$20.7K |
| 2026-06-25 | 0 | 32.9K | −32.9K | −$19.3K |
| 2026-06-26 | 0 | 32.4K | −32.4K | −$19.1K |
| 2026-06-27 | 0 | 22.8K | −22.8K | −$14.2K |
| 2026-06-28 | 0 | 31.3K | −31.3K | −$19.1K |
| 2026-06-29 | 0 | 39.5K | −39.5K | −$24.2K |
| 2026-06-30 | 0 | 33.9K | −33.9K | −$21.3K |
| 2026-07-01 | 0 | 28.4K | −28.4K | −$18.3K |


---

## Euler (EUL)

**Price:** $1.00    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 90d | ⚠ 14/90d partial | 0 | 46.4K | 🟢 −46.4K EUL | −$46.3K | per-day (100%) | 0.0000% |

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
| 7d | 6/7d | 0 | 18.1K | 🟢 −18.1K GNS | −$9.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 419.0K | 🟢 −419.0K GNS | −$215.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 1.03M | 🟢 −1.03M GNS | −$578.5K | per-day (100%) | 0.0000% |

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
| 2026-06-17 | 0 | 12.0K | −12.0K | −$7.1K |
| 2026-06-18 | 0 | 7.1K | −7.1K | −$4.1K |
| 2026-06-19 | 0 | 3.2K | −3.2K | −$1.8K |
| 2026-06-20 | 0 | 873 | −873 | −$495.00 |
| 2026-06-21 | 0 | 2.2K | −2.2K | −$1.3K |
| 2026-06-22 | 0 | 2.8K | −2.8K | −$1.6K |
| 2026-06-23 | 0 | 2.9K | −2.9K | −$1.7K |
| 2026-06-24 | 0 | 21.0K | −21.0K | −$11.4K |
| 2026-06-25 | 0 | 4.8K | −4.8K | −$2.5K |
| 2026-06-26 | 0 | 5.1K | −5.1K | −$2.6K |
| 2026-06-27 | 0 | 1.4K | −1.4K | −$720.00 |
| 2026-06-28 | 0 | 2.2K | −2.2K | −$1.1K |
| 2026-06-29 | 0 | 2.7K | −2.7K | −$1.4K |
| 2026-06-30 | 0 | 1.9K | −1.9K | −$1.0K |


---

## Orca (ORCA)

**Price:** $1.20    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 3.0K | 🟢 −3.0K ORCA | −$3.6K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 20.9K | 🟢 −20.9K ORCA | −$24.2K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 86.5K | 🟢 −86.5K ORCA | −$97.9K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 207.8K | 🟢 −207.8K ORCA | −$242.0K | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 2.5K | −2.5K | −$3.1K |
| 2026-06-19 | 0 | 1.7K | −1.7K | −$2.1K |
| 2026-06-20 | 0 | 1.9K | −1.9K | −$2.4K |
| 2026-06-21 | 0 | 1.5K | −1.5K | −$1.9K |
| 2026-06-22 | 0 | 2.2K | −2.2K | −$2.6K |
| 2026-06-23 | 0 | 2.5K | −2.5K | −$3.0K |
| 2026-06-24 | 0 | 3.7K | −3.7K | −$4.3K |
| 2026-06-25 | 0 | 3.3K | −3.3K | −$3.7K |
| 2026-06-26 | 0 | 4.2K | −4.2K | −$4.7K |
| 2026-06-27 | 0 | 1.6K | −1.6K | −$1.9K |
| 2026-06-28 | 0 | 2.0K | −2.0K | −$2.3K |
| 2026-06-29 | 0 | 4.3K | −4.3K | −$5.0K |
| 2026-06-30 | 0 | 2.5K | −2.5K | −$3.0K |
| 2026-07-01 | 0 | 3.0K | −3.0K | −$3.6K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 122.8K | 🟢 −122.8K MNDE | −$2.3K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 786.8K | 🟢 −786.8K MNDE | −$14.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 3.36M | 🟢 −3.36M MNDE | −$62.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 17.22M | 🟢 −17.22M MNDE | −$332.7K | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 97.1K | −97.1K | −$1.8K |
| 2026-06-19 | 0 | 96.9K | −96.9K | −$1.8K |
| 2026-06-20 | 0 | 104.6K | −104.6K | −$1.9K |
| 2026-06-21 | 0 | 100.5K | −100.5K | −$1.8K |
| 2026-06-22 | 0 | 98.3K | −98.3K | −$1.8K |
| 2026-06-23 | 0 | 93.4K | −93.4K | −$1.7K |
| 2026-06-24 | 0 | 97.8K | −97.8K | −$1.8K |
| 2026-06-25 | 0 | 97.9K | −97.9K | −$1.8K |
| 2026-06-26 | 0 | 108.5K | −108.5K | −$2.0K |
| 2026-06-27 | 0 | 106.2K | −106.2K | −$2.0K |
| 2026-06-28 | 0 | 111.1K | −111.1K | −$2.1K |
| 2026-06-29 | 0 | 120.0K | −120.0K | −$2.2K |
| 2026-06-30 | 0 | 120.3K | −120.3K | −$2.2K |
| 2026-07-01 | 0 | 122.8K | −122.8K | −$2.3K |


---

## ether.fi (ETHFI)

**Price:** $0.33    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 14.4K | 🟢 −14.4K ETHFI | −$4.7K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 166.5K | 🟢 −166.5K ETHFI | −$57.8K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 822.1K | 🟢 −822.1K ETHFI | −$272.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.47M | 🟢 −2.47M ETHFI | −$973.8K | per-day (100%) | 0.0000% |

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
| 2026-06-18 | 0 | 22.6K | −22.6K | −$8.6K |
| 2026-06-19 | 0 | 25.5K | −25.5K | −$9.2K |
| 2026-06-20 | 0 | 25.4K | −25.4K | −$8.7K |
| 2026-06-21 | 0 | 21.2K | −21.2K | −$7.3K |
| 2026-06-22 | 0 | 27.6K | −27.6K | −$9.2K |
| 2026-06-23 | 0 | 24.6K | −24.6K | −$8.4K |
| 2026-06-24 | 0 | 25.0K | −25.0K | −$8.7K |
| 2026-06-25 | 0 | 32.9K | −32.9K | −$11.2K |
| 2026-06-26 | 0 | 22.4K | −22.4K | −$8.5K |
| 2026-06-27 | 0 | 23.4K | −23.4K | −$8.5K |
| 2026-06-28 | 0 | 22.5K | −22.5K | −$7.8K |
| 2026-06-29 | 0 | 23.4K | −23.4K | −$7.9K |
| 2026-06-30 | 0 | 27.5K | −27.5K | −$9.2K |
| 2026-07-01 | 0 | 14.4K | −14.4K | −$4.7K |


---

## CoW Protocol (COW)

**Price:** $0.15    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.15 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 1.17M | 🟢 −1.17M COW | −$172.1K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 8.09M | 🟢 −8.09M COW | −$1.17M | per-day (100%) | 0.0000% |
| 90d | 83/90d | 0 | 17.02M | 🟢 −17.02M COW | −$2.84M | per-day (100%) | 0.0000% |

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
| 2026-06-15 | 0 | 282.8K | −282.8K | −$44.5K |
| 2026-06-16 | 0 | 146.9K | −146.9K | −$23.3K |
| 2026-06-17 | 0 | 163.5K | −163.5K | −$26.2K |
| 2026-06-18 | 0 | 177.1K | −177.1K | −$28.4K |
| 2026-06-20 | 0 | 54.1K | −54.1K | −$8.4K |
| 2026-06-21 | 0 | 39.4K | −39.4K | −$6.2K |
| 2026-06-22 | 0 | 96.6K | −96.6K | −$15.2K |
| 2026-06-23 | 0 | 160.5K | −160.5K | −$25.2K |
| 2026-06-24 | 0 | 254.3K | −254.3K | −$39.1K |
| 2026-06-25 | 0 | 389.7K | −389.7K | −$58.6K |
| 2026-06-26 | 0 | 420.7K | −420.7K | −$60.7K |
| 2026-06-27 | 0 | 84.7K | −84.7K | −$12.2K |
| 2026-06-28 | 0 | 54.4K | −54.4K | −$7.9K |
| 2026-06-29 | 0 | 224.0K | −224.0K | −$32.7K |


---
