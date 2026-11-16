# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-16T18:31:40.770Z
**As-of:** 2026-11-16

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $66.99    **Circulating:** 599.96M HYPE    **AF balance:** 49.02M HYPE    **Total staked:** 438.34M HYPE (73.1% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 24.3K | 🟢 −24.3K HYPE | −$1.63M | today @ $66.99 | -0.0024% |
| 7d | 7/7d | 0 | 105.8K | 🟢 −532.3K HYPE | −$35.66M | today @ $66.99 | -0.0532% |
| 30d | 30/30d | 17.45M | 253.4K | 🔴 +1.73M HYPE | +$116.16M | today @ $66.99 | 0.1734% |
| 90d | 90/90d | 52.34M | 628.8K | 🟢 −5.17M HYPE | −$346.59M | today @ $66.99 | -0.5174% |

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
| 2026-11-03 | 0 | 4.5K | −4.5K | −$300.0K |
| 2026-11-04 | 0 | 4.7K | −53.5K | −$3.58M |
| 2026-11-05 | 0 | 2.6K | −2.6K | −$173.6K |
| 2026-11-06 | 9.92M | 12.9K | +978.8K | +$65.57M |
| 2026-11-07 | 0 | 3.2K | −3.2K | −$216.6K |
| 2026-11-08 | 0 | 7.5K | −79.9K | −$5.35M |
| 2026-11-09 | 0 | 2.7K | −2.7K | −$178.8K |
| 2026-11-10 | 0 | 150 | −150 | −$10.1K |
| 2026-11-11 | 0 | 4.9K | −4.9K | −$330.6K |
| 2026-11-12 | 0 | 12.7K | −286.3K | −$19.18M |
| 2026-11-13 | 0 | 1.3K | −154.2K | −$10.33M |
| 2026-11-14 | 0 | 23.7K | −23.7K | −$1.59M |
| 2026-11-15 | 0 | 38.7K | −38.7K | −$2.59M |
| 2026-11-16 | 0 | 24.3K | −24.3K | −$1.63M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $504.52M |
| 2026-12-06 | 9.92M | $664.32M |
| 2026-12-29 | 7.53M | $504.52M |
| 2027-01-06 | 9.92M | $664.32M |
| 2027-01-29 | 7.53M | $504.52M |
| 2027-02-06 | 9.92M | $664.32M |
| 2027-03-01 | 7.53M | $504.52M |
| 2027-03-06 | 9.92M | $664.32M |


---

## Aave (AAVE)

**Price:** $107.59    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $107.59 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.4K AAVE | −$154.6K | today @ $107.59 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −2.6K AAVE | −$276.2K | today @ $107.59 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −53.6K AAVE | −$5.77M | today @ $107.59 | 0.0000% |

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
| 2026-08-24 | 0 | 0 | −593 | −$63.8K |
| 2026-08-25 | 0 | 0 | −1.5K | −$163.0K |
| 2026-08-26 | 0 | 0 | −3.9K | −$415.5K |
| 2026-09-29 | 0 | 0 | −39.1K | −$4.21M |
| 2026-10-06 | 0 | 0 | −2.9K | −$315.6K |
| 2026-10-13 | 0 | 0 | 0 | $0 |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$85.4K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$36.3K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | 0 | $0 |
| 2026-11-14 | 0 | 0 | −1.4K | −$154.6K |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.84M SKY | −$92.7K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −14.28M SKY | −$718.8K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −152.25M SKY | −$7.66M | today @ $0.05 | 0.0000% |

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
| 2026-08-24 | 0 | 0 | −9.95M | −$500.7K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$73.0K |
| 2026-09-29 | 0 | 0 | −55.20M | −$2.78M |
| 2026-10-06 | 0 | 0 | 0 | $0 |
| 2026-10-13 | 0 | 0 | −49.75M | −$2.50M |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$242.0K |
| 2026-11-06 | 0 | 0 | −6.56M | −$330.3K |
| 2026-11-07 | 0 | 0 | −1.07M | −$53.9K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | −1.34M | −$67.6K |
| 2026-11-14 | 0 | 0 | −497.7K | −$25.0K |


---

## Lighter (LIT)

**Price:** $2.63    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.63 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 112.2K | 🟢 −112.2K LIT | −$372.0K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 1.27M | 🟢 −1.27M LIT | −$3.96M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 2.89M | 🟢 −2.89M LIT | −$10.04M | per-day (100%) | 0.0000% |

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
| 2026-10-30 | 0 | 50.0K | −50.0K | −$135.1K |
| 2026-10-31 | 0 | 21.1K | −21.1K | −$58.5K |
| 2026-11-01 | 0 | 15.4K | −15.4K | −$48.6K |
| 2026-11-02 | 0 | 31.9K | −31.9K | −$100.8K |
| 2026-11-03 | 0 | 38.0K | −38.0K | −$117.0K |
| 2026-11-04 | 0 | 43.3K | −43.3K | −$145.2K |
| 2026-11-05 | 0 | 58.3K | −58.3K | −$193.2K |
| 2026-11-06 | 0 | 44.1K | −44.1K | −$151.5K |
| 2026-11-07 | 0 | 20.0K | −20.0K | −$66.4K |
| 2026-11-08 | 0 | 12.8K | −12.8K | −$42.2K |
| 2026-11-09 | 0 | 50.7K | −50.7K | −$154.9K |
| 2026-11-10 | 0 | 46.4K | −46.4K | −$150.0K |
| 2026-11-11 | 0 | 35.9K | −35.9K | −$124.4K |
| 2026-11-12 | 0 | 29.9K | −29.9K | −$97.5K |


---

## Morpho (MORPHO)

**Price:** $1.71    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$166.5K | today @ $1.71 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.17M | today @ $1.71 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$4.99M | today @ $1.71 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$14.98M | today @ $1.71 | 0.0000% |

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
| 2026-11-03 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-04 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-05 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-06 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-07 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-08 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-09 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-10 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-11 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-12 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-13 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-14 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-15 | 202.7K | 0 | +97.4K | +$166.5K |
| 2026-11-16 | 202.7K | 0 | +97.4K | +$166.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 202.7K | $346.6K |
| 2026-11-18 | 202.7K | $346.6K |
| 2026-11-19 | 202.7K | $346.6K |
| 2026-11-20 | 1.20M | $2.06M |
| 2026-11-21 | 202.7K | $346.6K |
| 2026-11-22 | 202.7K | $346.6K |
| 2026-11-23 | 202.7K | $346.6K |
| 2026-11-24 | 202.7K | $346.6K |


---

## Pendle (PENDLE)

**Price:** $1.44    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.44 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.44 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.44 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.44 | 0.0000% |

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

**Price:** $0.27    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$57.1K | today @ $0.27 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$399.5K | today @ $0.27 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$1.71M | today @ $0.27 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$5.14M | today @ $0.27 | 0.0000% |

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
| 2026-11-03 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-04 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-05 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-06 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-07 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-08 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-09 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-10 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-11 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-12 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-13 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-14 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-15 | 626.2K | 0 | +214.3K | +$57.1K |
| 2026-11-16 | 626.2K | 0 | +214.3K | +$57.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 626.2K | $166.8K |
| 2026-11-18 | 626.2K | $166.8K |
| 2026-11-19 | 626.2K | $166.8K |
| 2026-11-20 | 626.2K | $166.8K |
| 2026-11-21 | 626.2K | $166.8K |
| 2026-11-22 | 626.2K | $166.8K |
| 2026-11-23 | 626.2K | $166.8K |
| 2026-11-24 | 626.2K | $166.8K |


---

## Jupiter (JUP)

**Price:** $0.25    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.25 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 3.32M | 🟢 −3.32M JUP | −$840.4K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 53.47M | 8.10M | 🔴 +7.45M JUP | +$2.18M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 160.41M | 27.86M | 🔴 +18.80M JUP | +$5.94M | per-day (100%) | 0.0000% |

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
| 2026-10-29 | 0 | 336.3K | −336.3K | −$94.7K |
| 2026-10-30 | 0 | 335.8K | −335.8K | −$83.9K |
| 2026-10-31 | 0 | 113.9K | −113.9K | −$29.6K |
| 2026-11-01 | 0 | 115.0K | −115.0K | −$29.7K |
| 2026-11-02 | 0 | 216.1K | −216.1K | −$55.8K |
| 2026-11-03 | 0 | 159.4K | −159.4K | −$38.4K |
| 2026-11-04 | 0 | 350.2K | −350.2K | −$87.1K |
| 2026-11-05 | 0 | 297.0K | −297.0K | −$77.2K |
| 2026-11-06 | 0 | 137.6K | −137.6K | −$33.0K |
| 2026-11-07 | 0 | 183.3K | −183.3K | −$44.6K |
| 2026-11-08 | 0 | 418.5K | −418.5K | −$101.7K |
| 2026-11-09 | 0 | 167.7K | −167.7K | −$38.9K |
| 2026-11-10 | 0 | 1.74M | −1.74M | −$440.7K |
| 2026-11-11 | 0 | 1.57M | −1.57M | −$399.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 53.47M | $13.36M |
| 2026-12-27 | 53.47M | $13.36M |
| 2027-01-27 | 53.47M | $13.36M |
| 2027-02-27 | 53.47M | $13.36M |
| 2027-03-27 | 53.47M | $13.36M |
| 2027-04-27 | 53.47M | $13.36M |
| 2027-05-27 | 53.47M | $13.36M |
| 2027-06-27 | 53.47M | $13.36M |


---

## Fluid (FLUID)

**Price:** $1.77    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$4.8K | today @ $1.77 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$33.9K | today @ $1.77 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$411.0K | today @ $1.77 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.23M | today @ $1.77 | 0.0000% |

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
| 2026-11-03 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-04 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-05 | 509.1K | 0 | +152.7K | +$270.3K |
| 2026-11-06 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-07 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-08 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-09 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-10 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-11 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-12 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-13 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-14 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-15 | 9.1K | 0 | +2.7K | +$4.8K |
| 2026-11-16 | 9.1K | 0 | +2.7K | +$4.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 9.1K | $16.2K |
| 2026-11-18 | 9.1K | $16.2K |
| 2026-11-19 | 9.1K | $16.2K |
| 2026-11-20 | 9.1K | $16.2K |
| 2026-11-21 | 9.1K | $16.2K |
| 2026-11-22 | 9.1K | $16.2K |
| 2026-11-23 | 9.1K | $16.2K |
| 2026-11-24 | 9.1K | $16.2K |


---

## Collector Crypt (CARDS)

**Price:** $0.17    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.17 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 84.2K | 🟢 −84.2K CARDS | −$17.2K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 44.67M | 1.30M | 🔴 +10.63M CARDS | +$2.52M | per-day (100%) | 0.0000% |
| 90d | 78/90d | 134.02M | 78.97M | 🟢 −43.16M CARDS | −$5.53M | per-day (99%) | 0.0000% |

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
| 2026-10-31 | 0 | 10.8K | −10.8K | −$2.7K |
| 2026-11-01 | 44.67M | 25.6K | +11.91M | +$2.87M |
| 2026-11-02 | 0 | 19.3K | −19.3K | −$4.4K |
| 2026-11-03 | 0 | 12.0K | −12.0K | −$2.6K |
| 2026-11-04 | 0 | 8.6K | −8.6K | −$2.3K |
| 2026-11-05 | 0 | 15.5K | −15.5K | −$4.0K |
| 2026-11-06 | 0 | 24.5K | −24.5K | −$6.1K |
| 2026-11-07 | 0 | 14.5K | −14.5K | −$3.5K |
| 2026-11-08 | 0 | 16.3K | −16.3K | −$3.8K |
| 2026-11-09 | 0 | 32.5K | −32.5K | −$6.9K |
| 2026-11-10 | 0 | 12.5K | −12.5K | −$2.8K |
| 2026-11-11 | 0 | 16.3K | −16.3K | −$3.7K |
| 2026-11-12 | 0 | 27.0K | −27.0K | −$5.2K |
| 2026-11-13 | 0 | 28.4K | −28.4K | −$5.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-01 | 44.67M | $7.60M |
| 2027-01-01 | 44.67M | $7.60M |
| 2027-02-01 | 44.67M | $7.60M |
| 2027-03-01 | 44.67M | $7.60M |
| 2027-04-01 | 44.67M | $7.60M |
| 2027-05-01 | 44.67M | $7.60M |
| 2027-06-01 | 44.67M | $7.60M |
| 2027-07-01 | 44.67M | $7.60M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$457.8K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 3/7d partial | 12.52B | 479.04M | 🔴 +3.64B PUMP | +$12.25M | per-day (43%) | 0.0000% |
| 30d | 26/30d | 20.80B | 4.31B | 🔴 +3.49B PUMP | +$11.54M | per-day (87%) | 0.0000% |
| 90d | 86/90d | 62.39B | 16.42B | 🔴 +7.01B PUMP | +$28.13M | per-day (96%) | 0.0000% |

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
| 2026-11-03 | 359.91M | 181.57M | −21.26M | −$84.4K |
| 2026-11-04 | 359.91M | 133.35M | +26.96M | +$116.6K |
| 2026-11-05 | 359.91M | 179.40M | −19.09M | −$81.0K |
| 2026-11-06 | 359.91M | 155.74M | +4.57M | +$17.6K |
| 2026-11-07 | 359.91M | 122.97M | +37.34M | +$146.0K |
| 2026-11-08 | 359.91M | 114.97M | +45.34M | +$168.6K |
| 2026-11-09 | 359.91M | 142.08M | +18.23M | +$64.2K |
| 2026-11-10 | 359.91M | 147.39M | +12.92M | +$46.7K |
| 2026-11-11 | 359.91M | 161.50M | −1.20M | −$4.2K |
| 2026-11-12 | 10.36B | 170.15M | +2.99B | +$10.37M |
| 2026-11-13 | 359.91M | 0 | +160.31M | +$457.8K |
| 2026-11-14 | 359.91M | 0 | +160.31M | +$457.8K |
| 2026-11-15 | 359.91M | 0 | +160.31M | +$457.8K |
| 2026-11-16 | 359.91M | 0 | +160.31M | +$457.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 359.91M | $1.03M |
| 2026-11-18 | 359.91M | $1.03M |
| 2026-11-19 | 359.91M | $1.03M |
| 2026-11-20 | 359.91M | $1.03M |
| 2026-11-21 | 359.91M | $1.03M |
| 2026-11-22 | 359.91M | $1.03M |
| 2026-11-23 | 359.91M | $1.03M |
| 2026-11-24 | 359.91M | $1.03M |


---

## LayerZero (ZRO)

**Price:** $1.44    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.44 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.44 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$16.21M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$49.03M | per-day (40%) | 0.0000% |

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
| 2026-04-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$16.51M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-20 | 23.63M | $34.03M |
| 2026-12-20 | 23.63M | $34.03M |
| 2027-01-20 | 23.63M | $34.03M |
| 2027-02-20 | 23.63M | $34.03M |
| 2027-03-20 | 23.63M | $34.03M |
| 2027-04-20 | 23.63M | $34.03M |
| 2027-05-20 | 23.63M | $34.03M |
| 2027-06-20 | 23.63M | $34.03M |


---

## Ethena (ENA)

**Price:** $0.12    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$479.2K | today @ $0.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$3.35M | today @ $0.12 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$14.38M | today @ $0.12 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$43.13M | today @ $0.12 | 0.0000% |

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
| 2026-11-03 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-04 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-05 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-06 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-07 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-08 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-09 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-10 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-11 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-12 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-13 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-14 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-15 | 10.75M | 0 | +4.11M | +$479.2K |
| 2026-11-16 | 10.75M | 0 | +4.11M | +$479.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 10.75M | $1.25M |
| 2026-11-18 | 10.75M | $1.25M |
| 2026-11-19 | 10.75M | $1.25M |
| 2026-11-20 | 10.75M | $1.25M |
| 2026-11-21 | 10.75M | $1.25M |
| 2026-11-22 | 10.75M | $1.25M |
| 2026-11-23 | 10.75M | $1.25M |
| 2026-11-24 | 10.75M | $1.25M |


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

**Price:** $0.08    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.08 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 291.8K | 🟢 −291.8K DYDX | −$26.6K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 2.00M | 🟢 −2.00M DYDX | −$210.1K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 2.27M | 6.72M | 🟢 −5.80M DYDX | −$685.0K | per-day (100%) | 0.0000% |

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
| 2026-10-30 | 0 | 182.1K | −182.1K | −$19.3K |
| 2026-10-31 | 0 | 22.3K | −22.3K | −$2.4K |
| 2026-11-01 | 0 | 16.4K | −16.4K | −$1.7K |
| 2026-11-02 | 0 | 41.5K | −41.5K | −$4.4K |
| 2026-11-03 | 0 | 57.5K | −57.5K | −$5.8K |
| 2026-11-04 | 0 | 115.9K | −115.9K | −$12.0K |
| 2026-11-05 | 0 | 166.1K | −166.1K | −$17.6K |
| 2026-11-06 | 0 | 96.3K | −96.3K | −$9.1K |
| 2026-11-07 | 0 | 10.4K | −10.4K | −$1.0K |
| 2026-11-08 | 0 | 30.8K | −30.8K | −$2.9K |
| 2026-11-09 | 0 | 88.0K | −88.0K | −$7.8K |
| 2026-11-10 | 0 | 119.0K | −119.0K | −$10.8K |
| 2026-11-11 | 0 | 41.1K | −41.1K | −$3.7K |
| 2026-11-12 | 0 | 131.6K | −131.6K | −$12.1K |


---

## Meteora (MET)

**Price:** $0.27    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$29.7K | today @ $0.27 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$207.8K | today @ $0.27 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$890.6K | today @ $0.27 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.67M | today @ $0.27 | 0.0000% |

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
| 2026-11-03 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-04 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-05 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-06 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-07 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-08 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-09 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-10 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-11 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-12 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-13 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-14 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-15 | 291.3K | 0 | +110.1K | +$29.7K |
| 2026-11-16 | 291.3K | 0 | +110.1K | +$29.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 291.3K | $78.5K |
| 2026-11-18 | 291.3K | $78.5K |
| 2026-11-19 | 291.3K | $78.5K |
| 2026-11-20 | 291.3K | $78.5K |
| 2026-11-21 | 291.3K | $78.5K |
| 2026-11-22 | 291.3K | $78.5K |
| 2026-11-23 | 291.3K | $78.5K |
| 2026-11-24 | 291.3K | $78.5K |


---

## Sanctum (CLOUD)

**Price:** $0.07    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$7.9K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$55.3K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$237.1K | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$1.01M | today @ $0.07 | 0.0000% |

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
| 2026-11-03 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-04 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-05 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-06 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-07 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-08 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-09 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-10 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-11 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-12 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-13 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-14 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-15 | 347.8K | 0 | +118.1K | +$7.9K |
| 2026-11-16 | 347.8K | 0 | +118.1K | +$7.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 347.8K | $23.3K |
| 2026-11-18 | 347.8K | $23.3K |
| 2026-11-19 | 347.8K | $23.3K |
| 2026-11-20 | 347.8K | $23.3K |
| 2026-11-21 | 347.8K | $23.3K |
| 2026-11-22 | 347.8K | $23.3K |
| 2026-11-23 | 347.8K | $23.3K |
| 2026-11-24 | 347.8K | $23.3K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$2.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$20.4K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$87.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$261.9K | today @ $0.01 | 0.0000% |

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
| 2026-11-03 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-04 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-05 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-06 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-07 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-08 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-09 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-10 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-11 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-12 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-13 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-14 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-15 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-16 | 644.2K | 0 | +302.8K | +$2.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-17 | 644.2K | $6.2K |
| 2026-11-18 | 644.2K | $6.2K |
| 2026-11-19 | 644.2K | $6.2K |
| 2026-11-20 | 644.2K | $6.2K |
| 2026-11-21 | 644.2K | $6.2K |
| 2026-11-22 | 644.2K | $6.2K |
| 2026-11-23 | 644.2K | $6.2K |
| 2026-11-24 | 644.2K | $6.2K |


---

## Uniswap (UNI)

**Price:** $5.11    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $5.11 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 155.0K | 🟢 −155.0K UNI | −$995.7K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 1.06M | 🟢 −1.06M UNI | −$7.39M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 5.13M | 🟢 −5.13M UNI | −$32.65M | per-day (100%) | 0.0000% |

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
| 2026-10-31 | 0 | 23.6K | −23.6K | −$168.4K |
| 2026-11-01 | 0 | 12.2K | −12.2K | −$86.4K |
| 2026-11-02 | 0 | 25.7K | −25.7K | −$185.6K |
| 2026-11-03 | 0 | 26.6K | −26.6K | −$188.5K |
| 2026-11-04 | 0 | 51.9K | −51.9K | −$374.6K |
| 2026-11-05 | 0 | 57.3K | −57.3K | −$436.5K |
| 2026-11-06 | 0 | 26.5K | −26.5K | −$180.2K |
| 2026-11-07 | 0 | 12.4K | −12.4K | −$85.0K |
| 2026-11-08 | 0 | 24.8K | −24.8K | −$179.0K |
| 2026-11-09 | 0 | 36.8K | −36.8K | −$249.7K |
| 2026-11-10 | 0 | 33.1K | −33.1K | −$230.7K |
| 2026-11-11 | 0 | 31.2K | −31.2K | −$207.6K |
| 2026-11-12 | 0 | 40.9K | −40.9K | −$254.7K |
| 2026-11-13 | 0 | 49.9K | −49.9K | −$302.7K |


---

## Raydium (RAY)

**Price:** $1.41    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.41 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 96.6K | 🟢 −96.6K RAY | −$159.8K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 646.0K | 🟢 −646.0K RAY | −$1.12M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 5.20M | 🟢 −5.20M RAY | −$7.35M | per-day (100%) | 0.0000% |

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
| 2026-10-31 | 0 | 12.1K | −12.1K | −$19.7K |
| 2026-11-01 | 0 | 10.4K | −10.4K | −$17.1K |
| 2026-11-02 | 0 | 23.7K | −23.7K | −$38.5K |
| 2026-11-03 | 0 | 25.8K | −25.8K | −$39.5K |
| 2026-11-04 | 0 | 33.7K | −33.7K | −$51.9K |
| 2026-11-05 | 0 | 33.9K | −33.9K | −$58.6K |
| 2026-11-06 | 0 | 29.0K | −29.0K | −$48.7K |
| 2026-11-07 | 0 | 20.1K | −20.1K | −$36.0K |
| 2026-11-08 | 0 | 24.5K | −24.5K | −$44.6K |
| 2026-11-09 | 0 | 33.4K | −33.4K | −$56.1K |
| 2026-11-10 | 0 | 25.9K | −25.9K | −$45.4K |
| 2026-11-11 | 0 | 28.0K | −28.0K | −$45.5K |
| 2026-11-12 | 0 | 22.7K | −22.7K | −$36.7K |
| 2026-11-13 | 0 | 20.0K | −20.0K | −$32.2K |


---

## Euler (EUL)

**Price:** $0.82    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.82 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.82 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.29 | per-day (100%) | 0.0000% |
| 90d | ⚠ 6/90d partial | 0 | 0 | 🟢 −0 EUL | −$0.35 | per-day (100%) | 0.0000% |

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
| 2026-04-12 | 0 | 243 | −243 | −$255.00 |
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


---

## Gains Network (GNS)

**Price:** $0.33    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.33 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 2.9K | 🟢 −2.9K GNS | −$1.2K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 48.1K | 🟢 −48.1K GNS | −$19.1K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 258.1K | 🟢 −258.1K GNS | −$118.3K | per-day (100%) | 0.0000% |

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
| 2026-10-28 | 0 | 2.9K | −2.9K | −$1.1K |
| 2026-10-29 | 0 | 3.2K | −3.2K | −$1.2K |
| 2026-10-30 | 0 | 7.5K | −7.5K | −$3.0K |
| 2026-10-31 | 0 | 1.7K | −1.7K | −$655.00 |
| 2026-11-01 | 0 | 1.3K | −1.3K | −$464.00 |
| 2026-11-02 | 0 | 1.5K | −1.5K | −$557.00 |
| 2026-11-03 | 0 | 1.9K | −1.9K | −$682.00 |
| 2026-11-04 | 0 | 1.8K | −1.8K | −$663.00 |
| 2026-11-05 | 0 | 1.0K | −1.0K | −$384.00 |
| 2026-11-06 | 0 | 1.3K | −1.3K | −$468.00 |
| 2026-11-07 | 0 | 2.7K | −2.7K | −$868.00 |
| 2026-11-08 | 0 | 463 | −463 | −$160.00 |
| 2026-11-09 | 0 | 1.1K | −1.1K | −$536.00 |
| 2026-11-10 | 0 | 2.9K | −2.9K | −$1.2K |


---

## Orca (ORCA)

**Price:** $1.18    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.18 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 12.6K | 🟢 −12.6K ORCA | −$16.6K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 149.9K | 🟢 −149.9K ORCA | −$235.6K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 719.8K | 🟢 −719.8K ORCA | −$1.10M | per-day (100%) | 0.0000% |

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
| 2026-10-31 | 0 | 3.8K | −3.8K | −$5.9K |
| 2026-11-01 | 0 | 2.7K | −2.7K | −$4.1K |
| 2026-11-02 | 0 | 5.6K | −5.6K | −$8.5K |
| 2026-11-03 | 0 | 6.2K | −6.2K | −$8.7K |
| 2026-11-04 | 0 | 9.7K | −9.7K | −$13.8K |
| 2026-11-05 | 0 | 9.2K | −9.2K | −$13.2K |
| 2026-11-06 | 0 | 7.4K | −7.4K | −$9.8K |
| 2026-11-07 | 0 | 3.0K | −3.0K | −$4.1K |
| 2026-11-08 | 0 | 4.8K | −4.8K | −$6.6K |
| 2026-11-09 | 0 | 7.9K | −7.9K | −$10.5K |
| 2026-11-10 | 0 | 7.3K | −7.3K | −$9.9K |
| 2026-11-11 | 0 | 1.7K | −1.7K | −$2.2K |
| 2026-11-12 | 0 | 1.5K | −1.5K | −$1.9K |
| 2026-11-13 | 0 | 2.1K | −2.1K | −$2.6K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 931.9K | 🟢 −931.9K MNDE | −$20.3K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 7.02M | 🟢 −7.02M MNDE | −$168.2K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 25.19M | 🟢 −25.19M MNDE | −$562.6K | per-day (100%) | 0.0000% |

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
| 2026-10-31 | 0 | 265.7K | −265.7K | −$6.3K |
| 2026-11-01 | 0 | 263.3K | −263.3K | −$6.3K |
| 2026-11-02 | 0 | 256.4K | −256.4K | −$6.1K |
| 2026-11-03 | 0 | 264.5K | −264.5K | −$6.1K |
| 2026-11-04 | 0 | 264.2K | −264.2K | −$6.3K |
| 2026-11-05 | 0 | 245.6K | −245.6K | −$5.8K |
| 2026-11-06 | 0 | 268.1K | −268.1K | −$6.0K |
| 2026-11-07 | 0 | 260.9K | −260.9K | −$5.9K |
| 2026-11-08 | 0 | 253.9K | −253.9K | −$5.7K |
| 2026-11-09 | 0 | 251.1K | −251.1K | −$5.6K |
| 2026-11-10 | 0 | 229.0K | −229.0K | −$5.1K |
| 2026-11-11 | 0 | 241.2K | −241.2K | −$5.2K |
| 2026-11-12 | 0 | 237.2K | −237.2K | −$5.1K |
| 2026-11-13 | 0 | 224.6K | −224.6K | −$4.8K |


---

## ether.fi (ETHFI)

**Price:** $0.48    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.48 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 48.2K | 🟢 −48.2K ETHFI | −$30.5K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 293.6K | 🟢 −293.6K ETHFI | −$184.1K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 881.3K | 🟢 −881.3K ETHFI | −$561.5K | per-day (100%) | 0.0000% |

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
| 2026-10-31 | 0 | 9.8K | −9.8K | −$6.1K |
| 2026-11-01 | 0 | 12.4K | −12.4K | −$7.7K |
| 2026-11-02 | 0 | 12.8K | −12.8K | −$7.9K |
| 2026-11-03 | 0 | 12.6K | −12.6K | −$7.3K |
| 2026-11-04 | 0 | 12.4K | −12.4K | −$7.1K |
| 2026-11-05 | 0 | 12.8K | −12.8K | −$7.6K |
| 2026-11-06 | 0 | 13.9K | −13.9K | −$7.4K |
| 2026-11-07 | 0 | 11.5K | −11.5K | −$6.7K |
| 2026-11-08 | 0 | 9.2K | −9.2K | −$5.6K |
| 2026-11-09 | 0 | 12.8K | −12.8K | −$7.4K |
| 2026-11-10 | 0 | 13.8K | −13.8K | −$8.6K |
| 2026-11-11 | 0 | 11.4K | −11.4K | −$7.2K |
| 2026-11-12 | 0 | 12.5K | −12.5K | −$8.0K |
| 2026-11-13 | 0 | 10.5K | −10.5K | −$6.7K |


---

## CoW Protocol (COW)

**Price:** $0.09    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.09 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 1.47M | 🟢 −1.47M COW | −$151.7K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 8.67M | 🟢 −8.67M COW | −$1.03M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 23.31M | 🟢 −23.31M COW | −$2.99M | per-day (100%) | 0.0000% |

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
| 2026-10-30 | 0 | 558.8K | −558.8K | −$65.1K |
| 2026-10-31 | 0 | 143.2K | −143.2K | −$16.6K |
| 2026-11-01 | 0 | 109.0K | −109.0K | −$13.4K |
| 2026-11-02 | 0 | 240.3K | −240.3K | −$27.5K |
| 2026-11-03 | 0 | 135.7K | −135.7K | −$16.0K |
| 2026-11-04 | 0 | 422.6K | −422.6K | −$49.9K |
| 2026-11-05 | 0 | 478.6K | −478.6K | −$57.1K |
| 2026-11-06 | 0 | 365.8K | −365.8K | −$40.3K |
| 2026-11-07 | 0 | 125.3K | −125.3K | −$13.9K |
| 2026-11-08 | 0 | 316.3K | −316.3K | −$34.1K |
| 2026-11-09 | 0 | 405.6K | −405.6K | −$41.8K |
| 2026-11-10 | 0 | 689.6K | −689.6K | −$72.4K |
| 2026-11-11 | 0 | 323.1K | −323.1K | −$33.8K |
| 2026-11-12 | 0 | 452.6K | −452.6K | −$45.5K |


---
