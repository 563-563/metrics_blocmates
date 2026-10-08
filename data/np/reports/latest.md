# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-10-08T15:36:36.410Z
**As-of:** 2026-10-08

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $84.02    **Circulating:** 582.51M HYPE    **AF balance:** 47.91M HYPE    **Total staked:** 440.03M HYPE (75.5% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 20.6K | 🟢 −1.85M HYPE | −$155.81M | today @ $84.02 | -0.1854% |
| 7d | 7/7d | 9.92M | 105.9K | 🟢 −2.31M HYPE | −$194.01M | today @ $84.02 | -0.2309% |
| 30d | 30/30d | 17.45M | 253.3K | 🟢 −4.06M HYPE | −$340.83M | today @ $84.02 | -0.4056% |
| 90d | 90/90d | 52.34M | 505.2K | 🟢 −9.76M HYPE | −$819.79M | today @ $84.02 | -0.9757% |

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
| 2026-09-25 | 0 | 12.9K | −157.9K | −$13.27M |
| 2026-09-26 | 0 | 7.0K | −7.0K | −$589.9K |
| 2026-09-27 | 0 | 7.0K | −283.5K | −$23.82M |
| 2026-09-28 | 0 | 2.4K | −2.4K | −$205.7K |
| 2026-09-29 | 7.53M | 5.3K | +2.88M | +$241.77M |
| 2026-09-30 | 0 | 3.6K | −3.6K | −$301.9K |
| 2026-10-01 | 0 | 3.3K | −291.9K | −$24.53M |
| 2026-10-02 | 0 | 10.9K | −10.9K | −$919.5K |
| 2026-10-03 | 0 | 8.0K | −18.7K | −$1.57M |
| 2026-10-04 | 0 | 38.5K | −51.7K | −$4.35M |
| 2026-10-05 | 0 | 534 | −534 | −$44.9K |
| 2026-10-06 | 9.92M | 3.2K | +988.4K | +$83.05M |
| 2026-10-07 | 0 | 24.0K | −1.36M | −$114.37M |
| 2026-10-08 | 0 | 20.6K | −1.85M | −$155.81M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-29 | 7.53M | $632.78M |
| 2026-11-06 | 9.92M | $833.20M |
| 2026-11-29 | 7.53M | $632.78M |
| 2026-12-06 | 9.92M | $833.20M |
| 2026-12-29 | 7.53M | $632.78M |
| 2027-01-06 | 9.92M | $833.20M |
| 2027-01-29 | 7.53M | $632.78M |
| 2027-02-06 | 9.92M | $833.20M |


---

## Aave (AAVE)

**Price:** $165.88    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $165.88 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −2.9K AAVE | −$486.6K | today @ $165.88 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −42.0K AAVE | −$6.97M | today @ $165.88 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −283.8K AAVE | −$47.07M | today @ $165.88 | 0.0000% |

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
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$190.3K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$21.7K |
| 2026-08-20 | 0 | 0 | −2.0K | −$337.9K |
| 2026-08-21 | 0 | 0 | −499 | −$82.8K |
| 2026-08-22 | 0 | 0 | −387 | −$64.2K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$98.3K |
| 2026-08-25 | 0 | 0 | −1.5K | −$251.3K |
| 2026-08-26 | 0 | 0 | −3.9K | −$640.6K |
| 2026-09-29 | 0 | 0 | −39.1K | −$6.48M |
| 2026-10-06 | 0 | 0 | −2.9K | −$486.6K |


---

## Sky (SKY)

**Price:** $0.08    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −55.20M SKY | −$4.15M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −164.29M SKY | −$12.35M | today @ $0.08 | 0.0000% |

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
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | −254.9K | −$19.2K |
| 2026-08-17 | 0 | 0 | −1.72M | −$129.4K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.26M |
| 2026-08-19 | 0 | 0 | −10.18M | −$764.8K |
| 2026-08-20 | 0 | 0 | −4.64M | −$348.9K |
| 2026-08-21 | 0 | 0 | −4.01M | −$301.6K |
| 2026-08-22 | 0 | 0 | −2.79M | −$209.4K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$747.8K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$109.0K |
| 2026-09-29 | 0 | 0 | −55.20M | −$4.15M |
| 2026-10-06 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $3.55    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.55 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 47.6K | 🟢 −47.6K LIT | −$176.1K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 498.0K | 🟢 −498.0K LIT | −$2.24M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 2.23M | 🟢 −2.23M LIT | −$6.99M | per-day (100%) | 0.0000% |

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
| 2026-09-21 | 0 | 25.6K | −25.6K | −$122.2K |
| 2026-09-22 | 0 | 19.7K | −19.7K | −$93.3K |
| 2026-09-23 | 0 | 28.1K | −28.1K | −$142.5K |
| 2026-09-24 | 0 | 21.2K | −21.2K | −$112.7K |
| 2026-09-25 | 0 | 15.0K | −15.0K | −$76.2K |
| 2026-09-26 | 0 | 11.6K | −11.6K | −$56.1K |
| 2026-09-27 | 0 | 10.0K | −10.0K | −$48.7K |
| 2026-09-28 | 0 | 18.3K | −18.3K | −$85.0K |
| 2026-09-29 | 0 | 30.8K | −30.8K | −$136.9K |
| 2026-09-30 | 0 | 19.7K | −19.7K | −$77.1K |
| 2026-10-01 | 0 | 19.1K | −19.1K | −$75.4K |
| 2026-10-02 | 0 | 27.1K | −27.1K | −$103.3K |
| 2026-10-03 | 0 | 13.8K | −13.8K | −$49.1K |
| 2026-10-04 | 0 | 6.7K | −6.7K | −$23.7K |


---

## Morpho (MORPHO)

**Price:** $2.33    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$226.9K | today @ $2.33 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.59M | today @ $2.33 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$6.81M | today @ $2.33 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$20.42M | today @ $2.33 | 0.0000% |

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
| 2026-09-25 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-09-26 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-09-27 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-09-28 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-09-29 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-09-30 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-01 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-02 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-03 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-04 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-05 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-06 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-07 | 202.7K | 0 | +97.4K | +$226.9K |
| 2026-10-08 | 202.7K | 0 | +97.4K | +$226.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 202.7K | $472.3K |
| 2026-10-10 | 202.7K | $472.3K |
| 2026-10-11 | 202.7K | $472.3K |
| 2026-10-12 | 202.7K | $472.3K |
| 2026-10-13 | 202.7K | $472.3K |
| 2026-10-14 | 202.7K | $472.3K |
| 2026-10-15 | 202.7K | $472.3K |
| 2026-10-16 | 202.7K | $472.3K |


---

## Pendle (PENDLE)

**Price:** $2.13    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.13 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.13 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $2.13 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$112.0K | today @ $0.52 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$784.2K | today @ $0.52 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.36M | today @ $0.52 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$10.08M | today @ $0.52 | 0.0000% |

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
| 2026-09-25 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-09-26 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-09-27 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-09-28 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-09-29 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-09-30 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-01 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-02 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-03 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-04 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-05 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-06 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-07 | 626.2K | 0 | +214.3K | +$112.0K |
| 2026-10-08 | 626.2K | 0 | +214.3K | +$112.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 626.2K | $327.3K |
| 2026-10-10 | 626.2K | $327.3K |
| 2026-10-11 | 626.2K | $327.3K |
| 2026-10-12 | 626.2K | $327.3K |
| 2026-10-13 | 626.2K | $327.3K |
| 2026-10-14 | 626.2K | $327.3K |
| 2026-10-15 | 626.2K | $327.3K |
| 2026-10-16 | 626.2K | $327.3K |


---

## Jupiter (JUP)

**Price:** $0.35    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.35 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 726.2K | 🟢 −726.2K JUP | −$236.1K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 53.47M | 10.03M | 🔴 +5.52M JUP | +$2.54M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 160.41M | 35.53M | 🔴 +11.13M JUP | +$3.84M | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 391.6K | −391.6K | −$116.7K |
| 2026-09-23 | 0 | 376.5K | −376.5K | −$113.6K |
| 2026-09-24 | 0 | 344.7K | −344.7K | −$100.2K |
| 2026-09-25 | 0 | 373.3K | −373.3K | −$112.6K |
| 2026-09-26 | 0 | 293.3K | −293.3K | −$100.1K |
| 2026-09-27 | 53.47M | 290.4K | +15.26M | +$5.17M |
| 2026-09-28 | 0 | 239.3K | −239.3K | −$89.1K |
| 2026-09-29 | 0 | 269.6K | −269.6K | −$88.3K |
| 2026-09-30 | 0 | 303.0K | −303.0K | −$100.0K |
| 2026-10-01 | 0 | 217.2K | −217.2K | −$71.6K |
| 2026-10-02 | 0 | 356.8K | −356.8K | −$116.4K |
| 2026-10-03 | 0 | 128.3K | −128.3K | −$40.4K |
| 2026-10-04 | 0 | 233.2K | −233.2K | −$76.7K |
| 2026-10-05 | 0 | 7.9K | −7.9K | −$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-27 | 53.47M | $18.69M |
| 2026-11-27 | 53.47M | $18.69M |
| 2026-12-27 | 53.47M | $18.69M |
| 2027-01-27 | 53.47M | $18.69M |
| 2027-02-27 | 53.47M | $18.69M |
| 2027-03-27 | 53.47M | $18.69M |
| 2027-04-27 | 53.47M | $18.69M |
| 2027-05-27 | 53.47M | $18.69M |


---

## Fluid (FLUID)

**Price:** $1.89    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$5.2K | today @ $1.89 | 0.0000% |
| 7d | ⚠ 0/7d partial | 563.9K | 0 | 🔴 +169.2K FLUID | +$319.7K | today @ $1.89 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$438.8K | today @ $1.89 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.32M | today @ $1.89 | 0.0000% |

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
| 2026-09-25 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-09-26 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-09-27 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-09-28 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-09-29 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-09-30 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-01 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-02 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-03 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-04 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-05 | 509.1K | 0 | +152.7K | +$288.7K |
| 2026-10-06 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-07 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-10-08 | 9.1K | 0 | +2.7K | +$5.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 9.1K | $17.3K |
| 2026-10-10 | 9.1K | $17.3K |
| 2026-10-11 | 9.1K | $17.3K |
| 2026-10-12 | 9.1K | $17.3K |
| 2026-10-13 | 9.1K | $17.3K |
| 2026-10-14 | 9.1K | $17.3K |
| 2026-10-15 | 9.1K | $17.3K |
| 2026-10-16 | 9.1K | $17.3K |


---

## Collector Crypt (CARDS)

**Price:** $0.24    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.24 | 0.0000% |
| 30d | ⚠ 20/30d partial | 44.67M | 46.96M | 🟢 −35.02M CARDS | −$4.21M | per-day (95%) | 0.0000% |
| 90d | 80/90d | 103.60M | 166.58M | 🟢 −131.31M CARDS | −$18.68M | per-day (99%) | 0.0000% |

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
| 2026-09-16 | 0 | 2.05M | −2.05M | −$255.7K |
| 2026-09-17 | 0 | 1.99M | −1.99M | −$246.9K |
| 2026-09-18 | 0 | 613.3K | −613.3K | −$82.1K |
| 2026-09-19 | 0 | 2.68M | −2.68M | −$462.6K |
| 2026-09-20 | 0 | 2.72M | −2.72M | −$469.1K |
| 2026-09-21 | 0 | 3.29M | −3.29M | −$558.5K |
| 2026-09-22 | 0 | 2.05M | −2.05M | −$395.4K |
| 2026-09-23 | 0 | 2.01M | −2.01M | −$354.0K |
| 2026-09-24 | 0 | 2.06M | −2.06M | −$356.0K |
| 2026-09-25 | 0 | 3.08M | −3.08M | −$480.0K |
| 2026-09-26 | 0 | 2.01M | −2.01M | −$378.3K |
| 2026-09-27 | 0 | 1.67M | −1.67M | −$311.2K |
| 2026-09-28 | 0 | 859.6K | −859.6K | −$168.5K |
| 2026-10-01 | 44.67M | 0 | +11.94M | +$2.87M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-01 | 44.67M | $10.74M |
| 2026-12-01 | 44.67M | $10.74M |
| 2027-01-01 | 44.67M | $10.74M |
| 2027-02-01 | 44.67M | $10.74M |
| 2027-03-01 | 44.67M | $10.74M |
| 2027-04-01 | 44.67M | $10.74M |
| 2027-05-01 | 44.67M | $10.74M |
| 2027-06-01 | 44.67M | $10.74M |


---

## pump.fun (PUMP)

**Price:** $0.01    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$873.4K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 3/7d partial | 2.52B | 633.89M | 🔴 +488.27M PUMP | +$2.62M | per-day (43%) | 0.0000% |
| 30d | 26/30d | 20.80B | 5.24B | 🔴 +2.57B PUMP | +$9.41M | per-day (87%) | 0.0000% |
| 90d | 86/90d | 62.39B | 21.02B | 🔴 +2.41B PUMP | +$6.46M | per-day (96%) | 0.0000% |

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
| 2026-09-25 | 359.91M | 225.74M | −65.43M | −$251.9K |
| 2026-09-26 | 359.91M | 335.15M | −174.84M | −$733.0K |
| 2026-09-27 | 359.91M | 283.25M | −122.94M | −$539.9K |
| 2026-09-28 | 359.91M | 219.12M | −58.81M | −$302.7K |
| 2026-09-29 | 359.91M | 219.98M | −59.67M | −$293.7K |
| 2026-09-30 | 359.91M | 179.42M | −19.11M | −$112.4K |
| 2026-10-01 | 359.91M | 202.92M | −42.61M | −$252.1K |
| 2026-10-02 | 359.91M | 205.54M | −45.23M | −$263.5K |
| 2026-10-03 | 359.91M | 230.00M | −69.70M | −$374.9K |
| 2026-10-04 | 359.91M | 198.35M | −38.04M | −$238.5K |
| 2026-10-05 | 359.91M | 0 | +160.31M | +$873.4K |
| 2026-10-06 | 359.91M | 0 | +160.31M | +$873.4K |
| 2026-10-07 | 359.91M | 0 | +160.31M | +$873.4K |
| 2026-10-08 | 359.91M | 0 | +160.31M | +$873.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 359.91M | $1.96M |
| 2026-10-10 | 359.91M | $1.96M |
| 2026-10-11 | 359.91M | $1.96M |
| 2026-10-12 | 10.36B | $56.44M |
| 2026-10-13 | 359.91M | $1.96M |
| 2026-10-14 | 359.91M | $1.96M |
| 2026-10-15 | 359.91M | $1.96M |
| 2026-10-16 | 359.91M | $1.96M |


---

## LayerZero (ZRO)

**Price:** $1.97    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.97 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.97 | 0.0000% |
| 30d | ⚠ 0/30d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$22.58M | today @ $1.97 | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 339.6K | 🔴 +34.05M ZRO | +$67.42M | per-day (40%) | 0.0000% |

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
| 2026-03-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$22.58M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$22.58M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-20 | 23.63M | $46.55M |
| 2026-11-20 | 23.63M | $46.55M |
| 2026-12-20 | 23.63M | $46.55M |
| 2027-01-20 | 23.63M | $46.55M |
| 2027-02-20 | 23.63M | $46.55M |
| 2027-03-20 | 23.63M | $46.55M |
| 2027-04-20 | 23.63M | $46.55M |
| 2027-05-20 | 23.63M | $46.55M |


---

## Ethena (ENA)

**Price:** $0.21    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$848.1K | today @ $0.21 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$5.94M | today @ $0.21 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$25.44M | today @ $0.21 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$76.33M | today @ $0.21 | 0.0000% |

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
| 2026-09-25 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-09-26 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-09-27 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-09-28 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-09-29 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-09-30 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-01 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-02 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-03 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-04 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-05 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-06 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-07 | 10.75M | 0 | +4.11M | +$848.1K |
| 2026-10-08 | 10.75M | 0 | +4.11M | +$848.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 10.75M | $2.22M |
| 2026-10-10 | 10.75M | $2.22M |
| 2026-10-11 | 10.75M | $2.22M |
| 2026-10-12 | 10.75M | $2.22M |
| 2026-10-13 | 10.75M | $2.22M |
| 2026-10-14 | 10.75M | $2.22M |
| 2026-10-15 | 10.75M | $2.22M |
| 2026-10-16 | 10.75M | $2.22M |


---

## Aerodrome (AERO)

**Price:** $0.80    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.80 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.80 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.80 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.80 | 0.0000% |

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

**Price:** $0.13    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.13 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 114.0K | 🟢 −114.0K DYDX | −$17.3K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 1.83M | 🟢 −1.83M DYDX | −$237.5K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 9.66M | 6.17M | 🟢 −2.25M DYDX | −$280.8K | per-day (100%) | 0.0000% |

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
| 2026-09-21 | 0 | 172.7K | −172.7K | −$22.4K |
| 2026-09-22 | 0 | 86.4K | −86.4K | −$12.0K |
| 2026-09-23 | 0 | 88.4K | −88.4K | −$12.4K |
| 2026-09-24 | 0 | 141.7K | −141.7K | −$18.0K |
| 2026-09-25 | 0 | 84.2K | −84.2K | −$11.2K |
| 2026-09-26 | 0 | 29.6K | −29.6K | −$4.0K |
| 2026-09-27 | 0 | 98.1K | −98.1K | −$14.0K |
| 2026-09-28 | 0 | 72.8K | −72.8K | −$10.4K |
| 2026-09-29 | 0 | 113.7K | −113.7K | −$15.4K |
| 2026-09-30 | 0 | 97.1K | −97.1K | −$13.5K |
| 2026-10-01 | 0 | 68.3K | −68.3K | −$9.8K |
| 2026-10-02 | 0 | 95.9K | −95.9K | −$14.7K |
| 2026-10-03 | 0 | 7.2K | −7.2K | −$1.1K |
| 2026-10-04 | 0 | 11.0K | −11.0K | −$1.6K |


---

## Meteora (MET)

**Price:** $0.44    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$48.5K | today @ $0.44 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$339.4K | today @ $0.44 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$1.45M | today @ $0.44 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$4.36M | today @ $0.44 | 0.0000% |

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
| 2026-09-25 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-09-26 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-09-27 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-09-28 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-09-29 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-09-30 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-01 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-02 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-03 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-04 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-05 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-06 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-07 | 291.3K | 0 | +110.1K | +$48.5K |
| 2026-10-08 | 291.3K | 0 | +110.1K | +$48.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 291.3K | $128.2K |
| 2026-10-10 | 291.3K | $128.2K |
| 2026-10-11 | 291.3K | $128.2K |
| 2026-10-12 | 291.3K | $128.2K |
| 2026-10-13 | 291.3K | $128.2K |
| 2026-10-14 | 291.3K | $128.2K |
| 2026-10-15 | 291.3K | $128.2K |
| 2026-10-16 | 291.3K | $128.2K |


---

## Sanctum (CLOUD)

**Price:** $0.07    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$7.9K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$55.6K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$238.1K | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$714.4K | today @ $0.07 | 0.0000% |

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
| 2026-09-25 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-26 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-27 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-28 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-29 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-09-30 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-01 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-02 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-03 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-04 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-05 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-06 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-07 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-10-08 | 347.8K | 0 | +118.1K | +$7.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 347.8K | $23.4K |
| 2026-10-10 | 347.8K | $23.4K |
| 2026-10-11 | 347.8K | $23.4K |
| 2026-10-12 | 347.8K | $23.4K |
| 2026-10-13 | 347.8K | $23.4K |
| 2026-10-14 | 347.8K | $23.4K |
| 2026-10-15 | 347.8K | $23.4K |
| 2026-10-16 | 347.8K | $23.4K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$5.7K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$40.1K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$171.8K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$515.4K | today @ $0.02 | 0.0000% |

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
| 2026-09-25 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-09-26 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-09-27 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-09-28 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-09-29 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-09-30 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-01 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-02 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-03 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-04 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-05 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-06 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-07 | 644.2K | 0 | +302.8K | +$5.7K |
| 2026-10-08 | 644.2K | 0 | +302.8K | +$5.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-10-09 | 644.2K | $12.2K |
| 2026-10-10 | 644.2K | $12.2K |
| 2026-10-11 | 644.2K | $12.2K |
| 2026-10-12 | 644.2K | $12.2K |
| 2026-10-13 | 644.2K | $12.2K |
| 2026-10-14 | 644.2K | $12.2K |
| 2026-10-15 | 644.2K | $12.2K |
| 2026-10-16 | 644.2K | $12.2K |


---

## Uniswap (UNI)

**Price:** $7.29    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $7.29 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 98.1K | 🟢 −98.1K UNI | −$884.1K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 1.43M | 🟢 −1.43M UNI | −$10.91M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 5.49M | 🟢 −5.49M UNI | −$29.19M | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 50.1K | −50.1K | −$450.8K |
| 2026-09-23 | 0 | 50.8K | −50.8K | −$518.7K |
| 2026-09-24 | 0 | 45.6K | −45.6K | −$421.5K |
| 2026-09-25 | 0 | 43.3K | −43.3K | −$396.1K |
| 2026-09-26 | 0 | 20.2K | −20.2K | −$194.1K |
| 2026-09-27 | 0 | 26.3K | −26.3K | −$254.7K |
| 2026-09-28 | 0 | 42.6K | −42.6K | −$412.1K |
| 2026-09-29 | 0 | 44.4K | −44.4K | −$390.7K |
| 2026-09-30 | 0 | 41.8K | −41.8K | −$371.7K |
| 2026-10-01 | 0 | 36.5K | −36.5K | −$323.9K |
| 2026-10-02 | 0 | 39.9K | −39.9K | −$358.4K |
| 2026-10-03 | 0 | 12.2K | −12.2K | −$109.2K |
| 2026-10-04 | 0 | 16.0K | −16.0K | −$144.6K |
| 2026-10-05 | 0 | 30.0K | −30.0K | −$271.9K |


---

## Raydium (RAY)

**Price:** $2.33    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $2.33 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 135.5K | 🟢 −135.5K RAY | −$267.1K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 2.49M | 🟢 −2.49M RAY | −$4.05M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 5.53M | 🟢 −5.53M RAY | −$6.41M | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 137.8K | −137.8K | −$248.2K |
| 2026-09-23 | 0 | 92.5K | −92.5K | −$168.8K |
| 2026-09-24 | 0 | 91.9K | −91.9K | −$181.8K |
| 2026-09-25 | 0 | 76.9K | −76.9K | −$161.8K |
| 2026-09-26 | 0 | 41.3K | −41.3K | −$85.5K |
| 2026-09-27 | 0 | 32.6K | −32.6K | −$67.1K |
| 2026-09-28 | 0 | 53.3K | −53.3K | −$116.0K |
| 2026-09-29 | 0 | 70.0K | −70.0K | −$132.9K |
| 2026-09-30 | 0 | 61.2K | −61.2K | −$117.1K |
| 2026-10-01 | 0 | 55.7K | −55.7K | −$108.3K |
| 2026-10-02 | 0 | 56.2K | −56.2K | −$105.2K |
| 2026-10-03 | 0 | 24.8K | −24.8K | −$47.8K |
| 2026-10-04 | 0 | 28.5K | −28.5K | −$59.4K |
| 2026-10-05 | 0 | 25.9K | −25.9K | −$54.7K |


---

## Euler (EUL)

**Price:** $1.33    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.03 | per-day (100%) | 0.0000% |
| 90d | ⚠ 3/90d partial | 0 | 1 | 🟢 −1 EUL | −$1.22 | per-day (100%) | 0.0000% |

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
| 2026-09-09 | 0 | 0 | −0 | −$0.01 |
| 2026-09-23 | 0 | 0 | −0 | −$0.02 |


---

## Gains Network (GNS)

**Price:** $0.38    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.38 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 5.9K | 🟢 −5.9K GNS | −$2.6K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 81.0K | 🟢 −81.0K GNS | −$37.3K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 369.7K | 🟢 −369.7K GNS | −$191.7K | per-day (100%) | 0.0000% |

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
| 2026-09-21 | 0 | 11.0K | −11.0K | −$4.9K |
| 2026-09-22 | 0 | 1.3K | −1.3K | −$564.00 |
| 2026-09-23 | 0 | 1.2K | −1.2K | −$563.00 |
| 2026-09-24 | 0 | 1.1K | −1.1K | −$517.00 |
| 2026-09-25 | 0 | 2.6K | −2.6K | −$1.2K |
| 2026-09-26 | 0 | 2.7K | −2.7K | −$1.3K |
| 2026-09-27 | 0 | 5.0K | −5.0K | −$2.4K |
| 2026-09-28 | 0 | 12.5K | −12.5K | −$6.4K |
| 2026-09-29 | 0 | 504 | −504 | −$242.00 |
| 2026-09-30 | 0 | 7.0K | −7.0K | −$3.4K |
| 2026-10-01 | 0 | 2.6K | −2.6K | −$1.2K |
| 2026-10-02 | 0 | 3.5K | −3.5K | −$1.6K |
| 2026-10-03 | 0 | 718 | −718 | −$310.00 |
| 2026-10-04 | 0 | 1.6K | −1.6K | −$676.00 |


---

## Orca (ORCA)

**Price:** $2.52    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $2.52 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 25.3K | 🟢 −25.3K ORCA | −$45.7K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 303.1K | 🟢 −303.1K ORCA | −$459.4K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 576.9K | 🟢 −576.9K ORCA | −$798.3K | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 13.1K | −13.1K | −$19.8K |
| 2026-09-23 | 0 | 13.6K | −13.6K | −$20.9K |
| 2026-09-24 | 0 | 10.5K | −10.5K | −$16.1K |
| 2026-09-25 | 0 | 10.9K | −10.9K | −$17.2K |
| 2026-09-26 | 0 | 6.1K | −6.1K | −$10.3K |
| 2026-09-27 | 0 | 9.6K | −9.6K | −$15.7K |
| 2026-09-28 | 0 | 10.8K | −10.8K | −$19.6K |
| 2026-09-29 | 0 | 12.7K | −12.7K | −$21.5K |
| 2026-09-30 | 0 | 12.0K | −12.0K | −$19.3K |
| 2026-10-01 | 0 | 8.8K | −8.8K | −$14.6K |
| 2026-10-02 | 0 | 9.7K | −9.7K | −$16.6K |
| 2026-10-03 | 0 | 3.9K | −3.9K | −$6.8K |
| 2026-10-04 | 0 | 5.3K | −5.3K | −$9.5K |
| 2026-10-05 | 0 | 6.4K | −6.4K | −$12.8K |


---

## Marinade Finance (MNDE)

**Price:** $0.03    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.03 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 1.25M | 🟢 −1.25M MNDE | −$31.0K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 9.22M | 🟢 −9.22M MNDE | −$195.6K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 22.38M | 🟢 −22.38M MNDE | −$448.1K | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 408.6K | −408.6K | −$7.9K |
| 2026-09-23 | 0 | 403.1K | −403.1K | −$7.7K |
| 2026-09-24 | 0 | 364.8K | −364.8K | −$7.5K |
| 2026-09-25 | 0 | 397.2K | −397.2K | −$8.1K |
| 2026-09-26 | 0 | 358.7K | −358.7K | −$7.9K |
| 2026-09-27 | 0 | 286.7K | −286.7K | −$8.1K |
| 2026-09-28 | 0 | 284.7K | −284.7K | −$7.8K |
| 2026-09-29 | 0 | 303.4K | −303.4K | −$7.9K |
| 2026-09-30 | 0 | 299.2K | −299.2K | −$7.8K |
| 2026-10-01 | 0 | 296.9K | −296.9K | −$7.7K |
| 2026-10-02 | 0 | 307.3K | −307.3K | −$7.6K |
| 2026-10-03 | 0 | 304.1K | −304.1K | −$7.7K |
| 2026-10-04 | 0 | 320.5K | −320.5K | −$7.8K |
| 2026-10-05 | 0 | 320.1K | −320.1K | −$7.8K |


---

## ether.fi (ETHFI)

**Price:** $0.69    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.69 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 34.8K | 🟢 −34.8K ETHFI | −$25.2K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 249.3K | 🟢 −249.3K ETHFI | −$171.2K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 976.2K | 🟢 −976.2K ETHFI | −$505.2K | per-day (100%) | 0.0000% |

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
| 2026-09-22 | 0 | 8.2K | −8.2K | −$5.9K |
| 2026-09-23 | 0 | 8.6K | −8.6K | −$6.1K |
| 2026-09-24 | 0 | 9.7K | −9.7K | −$6.3K |
| 2026-09-25 | 0 | 9.4K | −9.4K | −$6.4K |
| 2026-09-26 | 0 | 8.1K | −8.1K | −$5.8K |
| 2026-09-27 | 0 | 6.5K | −6.5K | −$4.8K |
| 2026-09-28 | 0 | 8.6K | −8.6K | −$6.2K |
| 2026-09-29 | 0 | 9.2K | −9.2K | −$6.5K |
| 2026-09-30 | 0 | 9.6K | −9.6K | −$7.4K |
| 2026-10-01 | 0 | 12.9K | −12.9K | −$10.1K |
| 2026-10-02 | 0 | 9.8K | −9.8K | −$7.1K |
| 2026-10-03 | 0 | 9.3K | −9.3K | −$6.5K |
| 2026-10-04 | 0 | 7.1K | −7.1K | −$5.1K |
| 2026-10-05 | 0 | 8.7K | −8.7K | −$6.5K |


---

## CoW Protocol (COW)

**Price:** $0.14    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.14 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 387.8K | 🟢 −387.8K COW | −$63.0K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 6.01M | 🟢 −6.01M COW | −$870.4K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 18.38M | 🟢 −18.38M COW | −$2.36M | per-day (100%) | 0.0000% |

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
| 2026-09-21 | 0 | 685.7K | −685.7K | −$108.8K |
| 2026-09-22 | 0 | 368.0K | −368.0K | −$58.4K |
| 2026-09-23 | 0 | 208.6K | −208.6K | −$32.6K |
| 2026-09-24 | 0 | 197.6K | −197.6K | −$27.9K |
| 2026-09-25 | 0 | 193.7K | −193.7K | −$27.9K |
| 2026-09-26 | 0 | 100.0K | −100.0K | −$15.2K |
| 2026-09-27 | 0 | 97.2K | −97.2K | −$16.1K |
| 2026-09-28 | 0 | 210.3K | −210.3K | −$33.6K |
| 2026-09-29 | 0 | 228.8K | −228.8K | −$35.4K |
| 2026-09-30 | 0 | 74.3K | −74.3K | −$12.0K |
| 2026-10-01 | 0 | 85.4K | −85.4K | −$14.2K |
| 2026-10-02 | 0 | 271.3K | −271.3K | −$44.4K |
| 2026-10-03 | 0 | 55.7K | −55.7K | −$8.8K |
| 2026-10-04 | 0 | 60.7K | −60.7K | −$9.8K |


---
