# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-07T14:56:53.982Z
**As-of:** 2026-11-07

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $77.71    **Circulating:** 599.96M HYPE    **AF balance:** 48.74M HYPE    **Total staked:** 439.15M HYPE (73.2% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 3.7K | 🟢 −3.7K HYPE | −$284.1K | today @ $77.71 | -0.0004% |
| 7d | 7/7d | 9.92M | 105.8K | 🔴 +801.9K HYPE | +$62.32M | today @ $77.71 | 0.0802% |
| 30d | 30/30d | 17.45M | 233.9K | 🔴 +210.5K HYPE | +$16.36M | today @ $77.71 | 0.0210% |
| 90d | 90/90d | 52.34M | 628.9K | 🟢 −5.46M HYPE | −$424.15M | today @ $77.71 | -0.5458% |

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
| 2026-10-25 | 0 | 3.2K | −32.6K | −$2.53M |
| 2026-10-26 | 0 | 7.2K | −7.2K | −$556.9K |
| 2026-10-27 | 0 | 13.1K | −13.1K | −$1.02M |
| 2026-10-28 | 0 | 12.5K | −12.5K | −$970.4K |
| 2026-10-29 | 7.53M | 2.4K | +2.30M | +$178.71M |
| 2026-10-30 | 0 | 18.8K | −18.8K | −$1.46M |
| 2026-10-31 | 0 | 8.5K | −8.5K | −$662.0K |
| 2026-11-01 | 0 | 3.7K | −3.7K | −$289.1K |
| 2026-11-02 | 0 | 22.6K | −57.7K | −$4.49M |
| 2026-11-03 | 0 | 4.5K | −4.5K | −$348.0K |
| 2026-11-04 | 0 | 13.5K | −62.3K | −$4.84M |
| 2026-11-05 | 0 | 37.6K | −37.6K | −$2.92M |
| 2026-11-06 | 9.92M | 20.3K | +971.3K | +$75.48M |
| 2026-11-07 | 0 | 3.7K | −3.7K | −$284.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $585.26M |
| 2026-12-06 | 9.92M | $770.62M |
| 2026-12-29 | 7.53M | $585.26M |
| 2027-01-06 | 9.92M | $770.62M |
| 2027-01-29 | 7.53M | $585.26M |
| 2027-02-06 | 9.92M | $770.62M |
| 2027-03-01 | 7.53M | $585.26M |
| 2027-03-06 | 9.92M | $770.62M |


---

## Aave (AAVE)

**Price:** $131.84    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −337 AAVE | −$44.4K | today @ $131.84 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.1K AAVE | −$149.1K | today @ $131.84 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −1.1K AAVE | −$149.1K | today @ $131.84 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −54.9K AAVE | −$7.24M | today @ $131.84 | 0.0000% |

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
| 2026-08-21 | 0 | 0 | −499 | −$65.8K |
| 2026-08-22 | 0 | 0 | −387 | −$51.0K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$78.1K |
| 2026-08-25 | 0 | 0 | −1.5K | −$199.7K |
| 2026-08-26 | 0 | 0 | −3.9K | −$509.2K |
| 2026-09-29 | 0 | 0 | −39.1K | −$5.15M |
| 2026-10-06 | 0 | 0 | −2.9K | −$386.8K |
| 2026-10-13 | 0 | 0 | 0 | $0 |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$104.6K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$44.4K |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −1.07M SKY | −$68.6K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −12.44M SKY | −$797.3K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −62.19M SKY | −$3.99M | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −178.75M SKY | −$11.45M | today @ $0.06 | 0.0000% |

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
| 2026-08-21 | 0 | 0 | −4.01M | −$257.2K |
| 2026-08-22 | 0 | 0 | −2.79M | −$178.6K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$637.6K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$93.0K |
| 2026-09-29 | 0 | 0 | −55.20M | −$3.54M |
| 2026-10-06 | 0 | 0 | 0 | $0 |
| 2026-10-13 | 0 | 0 | −49.75M | −$3.19M |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$308.1K |
| 2026-11-06 | 0 | 0 | −6.56M | −$420.6K |
| 2026-11-07 | 0 | 0 | −1.07M | −$68.6K |


---

## Lighter (LIT)

**Price:** $3.23    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.23 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 186.9K | 🟢 −186.9K LIT | −$604.7K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.28M | 🟢 −1.28M LIT | −$4.03M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 2.81M | 🟢 −2.81M LIT | −$9.61M | per-day (100%) | 0.0000% |

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
| 2026-10-23 | 0 | 23.4K | −23.4K | −$79.4K |
| 2026-10-24 | 0 | 18.6K | −18.6K | −$58.6K |
| 2026-10-25 | 0 | 19.4K | −19.4K | −$62.7K |
| 2026-10-26 | 0 | 31.6K | −31.6K | −$100.2K |
| 2026-10-27 | 0 | 24.8K | −24.8K | −$74.8K |
| 2026-10-28 | 0 | 191.5K | −191.5K | −$583.3K |
| 2026-10-29 | 0 | 279.1K | −279.1K | −$820.1K |
| 2026-10-30 | 0 | 50.0K | −50.0K | −$135.1K |
| 2026-10-31 | 0 | 21.1K | −21.1K | −$58.5K |
| 2026-11-01 | 0 | 15.4K | −15.4K | −$48.6K |
| 2026-11-02 | 0 | 31.9K | −31.9K | −$100.8K |
| 2026-11-03 | 0 | 38.0K | −38.0K | −$117.0K |
| 2026-11-04 | 0 | 43.3K | −43.3K | −$145.2K |
| 2026-11-05 | 0 | 58.3K | −58.3K | −$193.2K |


---

## Morpho (MORPHO)

**Price:** $2.12    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$206.4K | today @ $2.12 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.44M | today @ $2.12 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$6.19M | today @ $2.12 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$18.58M | today @ $2.12 | 0.0000% |

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
| 2026-10-25 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-26 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-27 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-28 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-29 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-30 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-10-31 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-01 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-02 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-03 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-04 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-05 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-06 | 202.7K | 0 | +97.4K | +$206.4K |
| 2026-11-07 | 202.7K | 0 | +97.4K | +$206.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 202.7K | $429.7K |
| 2026-11-09 | 202.7K | $429.7K |
| 2026-11-10 | 202.7K | $429.7K |
| 2026-11-11 | 202.7K | $429.7K |
| 2026-11-12 | 202.7K | $429.7K |
| 2026-11-13 | 202.7K | $429.7K |
| 2026-11-14 | 202.7K | $429.7K |
| 2026-11-15 | 202.7K | $429.7K |


---

## Pendle (PENDLE)

**Price:** $1.65    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.65 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.65 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.65 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.65 | 0.0000% |

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

**Price:** $0.34    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$72.2K | today @ $0.34 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$505.6K | today @ $0.34 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$2.17M | today @ $0.34 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$6.50M | today @ $0.34 | 0.0000% |

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
| 2026-10-25 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-26 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-27 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-28 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-29 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-30 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-10-31 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-01 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-02 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-03 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-04 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-05 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-06 | 626.2K | 0 | +214.3K | +$72.2K |
| 2026-11-07 | 626.2K | 0 | +214.3K | +$72.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 626.2K | $211.1K |
| 2026-11-09 | 626.2K | $211.1K |
| 2026-11-10 | 626.2K | $211.1K |
| 2026-11-11 | 626.2K | $211.1K |
| 2026-11-12 | 626.2K | $211.1K |
| 2026-11-13 | 626.2K | $211.1K |
| 2026-11-14 | 626.2K | $211.1K |
| 2026-11-15 | 626.2K | $211.1K |


---

## Jupiter (JUP)

**Price:** $0.24    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.24 | 0.0000% |
| 7d | 6/7d | 0 | 1.08M | 🟢 −1.08M JUP | −$272.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 53.47M | 3.48M | 🔴 +12.07M JUP | +$3.32M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 160.41M | 20.89M | 🔴 +25.77M JUP | +$7.90M | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 87.9K | −87.9K | −$26.3K |
| 2026-10-25 | 0 | 91.9K | −91.9K | −$26.6K |
| 2026-10-26 | 0 | 89.0K | −89.0K | −$25.2K |
| 2026-10-27 | 53.47M | 95.1K | +15.46M | +$4.29M |
| 2026-10-28 | 0 | 79.1K | −79.1K | −$22.2K |
| 2026-10-29 | 0 | 174.5K | −174.5K | −$49.2K |
| 2026-10-30 | 0 | 177.2K | −177.2K | −$44.3K |
| 2026-10-31 | 0 | 118.3K | −118.3K | −$30.8K |
| 2026-11-01 | 0 | 86.1K | −86.1K | −$22.2K |
| 2026-11-02 | 0 | 142.1K | −142.1K | −$36.7K |
| 2026-11-03 | 0 | 126.1K | −126.1K | −$30.4K |
| 2026-11-04 | 0 | 374.1K | −374.1K | −$93.0K |
| 2026-11-05 | 0 | 325.8K | −325.8K | −$84.7K |
| 2026-11-06 | 0 | 24.9K | −24.9K | −$6.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 53.47M | $12.94M |
| 2026-12-27 | 53.47M | $12.94M |
| 2027-01-27 | 53.47M | $12.94M |
| 2027-02-27 | 53.47M | $12.94M |
| 2027-03-27 | 53.47M | $12.94M |
| 2027-04-27 | 53.47M | $12.94M |
| 2027-05-27 | 53.47M | $12.94M |
| 2027-06-27 | 53.47M | $12.94M |


---

## Fluid (FLUID)

**Price:** $2.29    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$6.3K | today @ $2.29 | 0.0000% |
| 7d | ⚠ 0/7d partial | 563.9K | 0 | 🔴 +169.2K FLUID | +$387.4K | today @ $2.29 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$531.7K | today @ $2.29 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.60M | today @ $2.29 | 0.0000% |

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
| 2026-10-25 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-26 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-27 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-28 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-29 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-30 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-10-31 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-01 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-02 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-03 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-04 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-05 | 509.1K | 0 | +152.7K | +$349.8K |
| 2026-11-06 | 9.1K | 0 | +2.7K | +$6.3K |
| 2026-11-07 | 9.1K | 0 | +2.7K | +$6.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 9.1K | $20.9K |
| 2026-11-09 | 9.1K | $20.9K |
| 2026-11-10 | 9.1K | $20.9K |
| 2026-11-11 | 9.1K | $20.9K |
| 2026-11-12 | 9.1K | $20.9K |
| 2026-11-13 | 9.1K | $20.9K |
| 2026-11-14 | 9.1K | $20.9K |
| 2026-11-15 | 9.1K | $20.9K |


---

## Collector Crypt (CARDS)

**Price:** $0.23    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.23 | 0.0000% |
| 7d | 6/7d | 44.67M | 100.4K | 🔴 +11.84M CARDS | +$2.85M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 44.67M | 1.47M | 🔴 +10.46M CARDS | +$2.46M | per-day (100%) | 0.0000% |
| 90d | 80/90d | 134.02M | 98.83M | 🟢 −63.02M CARDS | −$7.88M | per-day (99%) | 0.0000% |

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
| 2026-10-24 | 0 | 47.6K | −47.6K | −$16.1K |
| 2026-10-25 | 0 | 18.0K | −18.0K | −$5.7K |
| 2026-10-26 | 0 | 21.6K | −21.6K | −$6.4K |
| 2026-10-27 | 0 | 29.4K | −29.4K | −$8.8K |
| 2026-10-28 | 0 | 14.4K | −14.4K | −$4.6K |
| 2026-10-29 | 0 | 39.8K | −39.8K | −$12.2K |
| 2026-10-30 | 0 | 678.8K | −678.8K | −$178.0K |
| 2026-10-31 | 0 | 10.8K | −10.8K | −$2.7K |
| 2026-11-01 | 44.67M | 25.6K | +11.91M | +$2.87M |
| 2026-11-02 | 0 | 19.3K | −19.3K | −$4.4K |
| 2026-11-03 | 0 | 12.0K | −12.0K | −$2.6K |
| 2026-11-04 | 0 | 8.6K | −8.6K | −$2.3K |
| 2026-11-05 | 0 | 15.5K | −15.5K | −$4.0K |
| 2026-11-06 | 0 | 19.3K | −19.3K | −$4.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-01 | 44.67M | $10.25M |
| 2027-01-01 | 44.67M | $10.25M |
| 2027-02-01 | 44.67M | $10.25M |
| 2027-03-01 | 44.67M | $10.25M |
| 2027-04-01 | 44.67M | $10.25M |
| 2027-05-01 | 44.67M | $10.25M |
| 2027-06-01 | 44.67M | $10.25M |
| 2027-07-01 | 44.67M | $10.25M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$603.0K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 4/7d partial | 2.52B | 599.58M | 🔴 +522.58M PUMP | +$2.00M | per-day (57%) | 0.0000% |
| 30d | 27/30d | 20.80B | 4.75B | 🔴 +3.06B PUMP | +$16.73M | per-day (90%) | 0.0000% |
| 90d | 87/90d | 62.39B | 17.78B | 🔴 +5.65B PUMP | +$22.52M | per-day (97%) | 0.0000% |

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
| 2026-10-25 | 359.91M | 133.00M | +27.31M | +$117.8K |
| 2026-10-26 | 359.91M | 197.72M | −37.41M | −$158.3K |
| 2026-10-27 | 359.91M | 182.18M | −21.87M | −$93.6K |
| 2026-10-28 | 359.91M | 175.49M | −15.19M | −$66.1K |
| 2026-10-29 | 359.91M | 157.22M | +3.09M | +$14.0K |
| 2026-10-30 | 359.91M | 178.39M | −18.08M | −$71.3K |
| 2026-10-31 | 359.91M | 143.09M | +17.21M | +$71.8K |
| 2026-11-01 | 359.91M | 138.95M | +21.36M | +$89.7K |
| 2026-11-02 | 359.91M | 170.91M | −10.60M | −$44.4K |
| 2026-11-03 | 359.91M | 180.68M | −20.37M | −$80.8K |
| 2026-11-04 | 359.91M | 109.04M | +51.27M | +$221.8K |
| 2026-11-05 | 359.91M | 0 | +160.31M | +$603.0K |
| 2026-11-06 | 359.91M | 0 | +160.31M | +$603.0K |
| 2026-11-07 | 359.91M | 0 | +160.31M | +$603.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 359.91M | $1.35M |
| 2026-11-09 | 359.91M | $1.35M |
| 2026-11-10 | 359.91M | $1.35M |
| 2026-11-11 | 359.91M | $1.35M |
| 2026-11-12 | 10.36B | $38.97M |
| 2026-11-13 | 359.91M | $1.35M |
| 2026-11-14 | 359.91M | $1.35M |
| 2026-11-15 | 359.91M | $1.35M |


---

## LayerZero (ZRO)

**Price:** $1.65    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.65 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 188.7K | 🟢 −188.7K ZRO | −$300.3K | per-day (100%) | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$18.61M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$56.25M | per-day (40%) | 0.0000% |

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
| 2026-04-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$18.91M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-20 | 23.63M | $38.99M |
| 2026-12-20 | 23.63M | $38.99M |
| 2027-01-20 | 23.63M | $38.99M |
| 2027-02-20 | 23.63M | $38.99M |
| 2027-03-20 | 23.63M | $38.99M |
| 2027-04-20 | 23.63M | $38.99M |
| 2027-05-20 | 23.63M | $38.99M |
| 2027-06-20 | 23.63M | $38.99M |


---

## Ethena (ENA)

**Price:** $0.16    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$660.3K | today @ $0.16 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$4.62M | today @ $0.16 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$19.81M | today @ $0.16 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$59.42M | today @ $0.16 | 0.0000% |

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
| 2026-10-25 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-26 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-27 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-28 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-29 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-30 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-10-31 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-01 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-02 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-03 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-04 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-05 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-06 | 10.75M | 0 | +4.11M | +$660.3K |
| 2026-11-07 | 10.75M | 0 | +4.11M | +$660.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 10.75M | $1.73M |
| 2026-11-09 | 10.75M | $1.73M |
| 2026-11-10 | 10.75M | $1.73M |
| 2026-11-11 | 10.75M | $1.73M |
| 2026-11-12 | 10.75M | $1.73M |
| 2026-11-13 | 10.75M | $1.73M |
| 2026-11-14 | 10.75M | $1.73M |
| 2026-11-15 | 10.75M | $1.73M |


---

## Aerodrome (AERO)

**Price:** $0.60    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.60 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.60 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.60 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.60 | 0.0000% |

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

**Price:** $0.10    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.10 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 397.4K | 🟢 −397.4K DYDX | −$41.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.97M | 🟢 −1.97M DYDX | −$226.2K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 3.98M | 6.67M | 🟢 −5.05M DYDX | −$612.0K | per-day (100%) | 0.0000% |

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
| 2026-10-23 | 0 | 42.0K | −42.0K | −$4.8K |
| 2026-10-24 | 0 | 92.7K | −92.7K | −$10.4K |
| 2026-10-25 | 0 | 17.1K | −17.1K | −$1.9K |
| 2026-10-26 | 0 | 75.1K | −75.1K | −$8.0K |
| 2026-10-27 | 0 | 89.0K | −89.0K | −$9.5K |
| 2026-10-28 | 0 | 81.8K | −81.8K | −$9.0K |
| 2026-10-29 | 0 | 143.7K | −143.7K | −$15.8K |
| 2026-10-30 | 0 | 182.1K | −182.1K | −$19.3K |
| 2026-10-31 | 0 | 22.3K | −22.3K | −$2.4K |
| 2026-11-01 | 0 | 16.4K | −16.4K | −$1.7K |
| 2026-11-02 | 0 | 41.5K | −41.5K | −$4.4K |
| 2026-11-03 | 0 | 57.5K | −57.5K | −$5.8K |
| 2026-11-04 | 0 | 115.9K | −115.9K | −$12.0K |
| 2026-11-05 | 0 | 166.1K | −166.1K | −$17.6K |


---

## Meteora (MET)

**Price:** $0.30    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$33.5K | today @ $0.30 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$234.5K | today @ $0.30 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$1.01M | today @ $0.30 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$3.02M | today @ $0.30 | 0.0000% |

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
| 2026-10-25 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-26 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-27 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-28 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-29 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-30 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-10-31 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-01 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-02 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-03 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-04 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-05 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-06 | 291.3K | 0 | +110.1K | +$33.5K |
| 2026-11-07 | 291.3K | 0 | +110.1K | +$33.5K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 291.3K | $88.6K |
| 2026-11-09 | 291.3K | $88.6K |
| 2026-11-10 | 291.3K | $88.6K |
| 2026-11-11 | 291.3K | $88.6K |
| 2026-11-12 | 291.3K | $88.6K |
| 2026-11-13 | 291.3K | $88.6K |
| 2026-11-14 | 291.3K | $88.6K |
| 2026-11-15 | 291.3K | $88.6K |


---

## Sanctum (CLOUD)

**Price:** $0.04    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$5.2K | today @ $0.04 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$36.4K | today @ $0.04 | 0.0000% |
| 30d | ⚠ 0/30d partial | 25.43M | 0 | 🔴 +8.04M CLOUD | +$354.3K | today @ $0.04 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$666.4K | today @ $0.04 | 0.0000% |

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
| 2026-10-25 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-26 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-27 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-28 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-29 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-30 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-10-31 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-01 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-02 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-03 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-04 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-05 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-06 | 347.8K | 0 | +118.1K | +$5.2K |
| 2026-11-07 | 347.8K | 0 | +118.1K | +$5.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 347.8K | $15.3K |
| 2026-11-09 | 347.8K | $15.3K |
| 2026-11-10 | 347.8K | $15.3K |
| 2026-11-11 | 347.8K | $15.3K |
| 2026-11-12 | 347.8K | $15.3K |
| 2026-11-13 | 347.8K | $15.3K |
| 2026-11-14 | 347.8K | $15.3K |
| 2026-11-15 | 347.8K | $15.3K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.8K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$26.8K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$114.8K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$344.3K | today @ $0.01 | 0.0000% |

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
| 2026-10-25 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-26 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-27 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-28 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-29 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-30 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-10-31 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-01 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-02 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-03 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-04 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-05 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-06 | 644.2K | 0 | +302.8K | +$3.8K |
| 2026-11-07 | 644.2K | 0 | +302.8K | +$3.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-08 | 644.2K | $8.1K |
| 2026-11-09 | 644.2K | $8.1K |
| 2026-11-10 | 644.2K | $8.1K |
| 2026-11-11 | 644.2K | $8.1K |
| 2026-11-12 | 644.2K | $8.1K |
| 2026-11-13 | 644.2K | $8.1K |
| 2026-11-14 | 644.2K | $8.1K |
| 2026-11-15 | 644.2K | $8.1K |


---

## Uniswap (UNI)

**Price:** $7.07    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $7.07 | 0.0000% |
| 7d | 6/7d | 0 | 208.3K | 🟢 −208.3K UNI | −$1.51M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.11M | 🟢 −1.11M UNI | −$7.94M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.38M | 🟢 −5.38M UNI | −$32.87M | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 21.2K | −21.2K | −$147.7K |
| 2026-10-25 | 0 | 19.9K | −19.9K | −$136.5K |
| 2026-10-26 | 0 | 30.4K | −30.4K | −$210.3K |
| 2026-10-27 | 0 | 33.7K | −33.7K | −$240.6K |
| 2026-10-28 | 0 | 30.4K | −30.4K | −$214.7K |
| 2026-10-29 | 0 | 164.5K | −164.5K | −$1.19M |
| 2026-10-30 | 0 | 119.1K | −119.1K | −$769.2K |
| 2026-10-31 | 0 | 23.6K | −23.6K | −$168.4K |
| 2026-11-01 | 0 | 12.2K | −12.2K | −$86.4K |
| 2026-11-02 | 0 | 25.7K | −25.7K | −$185.6K |
| 2026-11-03 | 0 | 26.6K | −26.6K | −$188.5K |
| 2026-11-04 | 0 | 51.9K | −51.9K | −$374.6K |
| 2026-11-05 | 0 | 57.3K | −57.3K | −$436.5K |
| 2026-11-06 | 0 | 34.6K | −34.6K | −$235.5K |


---

## Raydium (RAY)

**Price:** $1.76    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.76 | 0.0000% |
| 7d | 6/7d | 0 | 152.3K | 🟢 −152.3K RAY | −$247.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 657.5K | 🟢 −657.5K RAY | −$1.22M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.42M | 🟢 −5.42M RAY | −$7.29M | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 13.7K | −13.7K | −$24.7K |
| 2026-10-25 | 0 | 14.3K | −14.3K | −$26.3K |
| 2026-10-26 | 0 | 20.0K | −20.0K | −$36.5K |
| 2026-10-27 | 0 | 20.1K | −20.1K | −$36.9K |
| 2026-10-28 | 0 | 29.4K | −29.4K | −$52.3K |
| 2026-10-29 | 0 | 40.1K | −40.1K | −$72.5K |
| 2026-10-30 | 0 | 29.3K | −29.3K | −$46.4K |
| 2026-10-31 | 0 | 12.1K | −12.1K | −$19.7K |
| 2026-11-01 | 0 | 10.4K | −10.4K | −$17.1K |
| 2026-11-02 | 0 | 23.7K | −23.7K | −$38.5K |
| 2026-11-03 | 0 | 25.8K | −25.8K | −$39.5K |
| 2026-11-04 | 0 | 33.7K | −33.7K | −$51.9K |
| 2026-11-05 | 0 | 33.9K | −33.9K | −$58.6K |
| 2026-11-06 | 0 | 24.9K | −24.9K | −$41.8K |


---

## Euler (EUL)

**Price:** $0.99    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.99 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.29 | per-day (100%) | 0.0000% |
| 90d | ⚠ 7/90d partial | 0 | 1 | 🟢 −1 EUL | −$1.50 | per-day (100%) | 0.0000% |

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
| 7d | ⚠ 5/7d partial | 0 | 7.5K | 🟢 −7.5K GNS | −$2.8K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 67.4K | 🟢 −67.4K GNS | −$28.0K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 297.7K | 🟢 −297.7K GNS | −$140.3K | per-day (100%) | 0.0000% |

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
| 2026-10-23 | 0 | 2.0K | −2.0K | −$894.00 |
| 2026-10-24 | 0 | 1.2K | −1.2K | −$545.00 |
| 2026-10-25 | 0 | 1.2K | −1.2K | −$505.00 |
| 2026-10-26 | 0 | 1.0K | −1.0K | −$404.00 |
| 2026-10-27 | 0 | 1.0K | −1.0K | −$399.00 |
| 2026-10-28 | 0 | 2.9K | −2.9K | −$1.1K |
| 2026-10-29 | 0 | 3.2K | −3.2K | −$1.2K |
| 2026-10-30 | 0 | 7.5K | −7.5K | −$3.0K |
| 2026-10-31 | 0 | 1.7K | −1.7K | −$655.00 |
| 2026-11-01 | 0 | 1.3K | −1.3K | −$464.00 |
| 2026-11-02 | 0 | 1.5K | −1.5K | −$557.00 |
| 2026-11-03 | 0 | 1.9K | −1.9K | −$682.00 |
| 2026-11-04 | 0 | 1.8K | −1.8K | −$663.00 |
| 2026-11-05 | 0 | 1.0K | −1.0K | −$384.00 |


---

## Orca (ORCA)

**Price:** $1.37    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.37 | 0.0000% |
| 7d | 6/7d | 0 | 41.2K | 🟢 −41.2K ORCA | −$58.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 165.5K | 🟢 −165.5K ORCA | −$290.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 717.3K | 🟢 −717.3K ORCA | −$1.09M | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 4.4K | −4.4K | −$7.7K |
| 2026-10-25 | 0 | 4.3K | −4.3K | −$7.9K |
| 2026-10-26 | 0 | 5.8K | −5.8K | −$9.9K |
| 2026-10-27 | 0 | 4.3K | −4.3K | −$7.2K |
| 2026-10-28 | 0 | 5.7K | −5.7K | −$9.5K |
| 2026-10-29 | 0 | 9.4K | −9.4K | −$16.2K |
| 2026-10-30 | 0 | 9.1K | −9.1K | −$14.2K |
| 2026-10-31 | 0 | 3.8K | −3.8K | −$5.9K |
| 2026-11-01 | 0 | 2.7K | −2.7K | −$4.1K |
| 2026-11-02 | 0 | 5.6K | −5.6K | −$8.5K |
| 2026-11-03 | 0 | 6.2K | −6.2K | −$8.7K |
| 2026-11-04 | 0 | 9.7K | −9.7K | −$13.8K |
| 2026-11-05 | 0 | 9.2K | −9.2K | −$13.2K |
| 2026-11-06 | 0 | 7.8K | −7.8K | −$10.3K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | 6/7d | 0 | 1.56M | 🟢 −1.56M MNDE | −$36.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 7.70M | 🟢 −7.70M MNDE | −$193.0K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 25.26M | 🟢 −25.26M MNDE | −$558.7K | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 267.9K | −267.9K | −$6.7K |
| 2026-10-25 | 0 | 266.8K | −266.8K | −$6.6K |
| 2026-10-26 | 0 | 267.4K | −267.4K | −$6.7K |
| 2026-10-27 | 0 | 270.1K | −270.1K | −$6.7K |
| 2026-10-28 | 0 | 275.6K | −275.6K | −$6.8K |
| 2026-10-29 | 0 | 255.6K | −255.6K | −$6.4K |
| 2026-10-30 | 0 | 261.1K | −261.1K | −$6.3K |
| 2026-10-31 | 0 | 265.7K | −265.7K | −$6.3K |
| 2026-11-01 | 0 | 263.3K | −263.3K | −$6.3K |
| 2026-11-02 | 0 | 256.4K | −256.4K | −$6.1K |
| 2026-11-03 | 0 | 264.5K | −264.5K | −$6.1K |
| 2026-11-04 | 0 | 264.2K | −264.2K | −$6.3K |
| 2026-11-05 | 0 | 245.6K | −245.6K | −$5.8K |
| 2026-11-06 | 0 | 267.7K | −267.7K | −$6.0K |


---

## ether.fi (ETHFI)

**Price:** $0.58    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.58 | 0.0000% |
| 7d | 6/7d | 0 | 76.4K | 🟢 −76.4K ETHFI | −$44.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 295.2K | 🟢 −295.2K ETHFI | −$190.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 909.0K | 🟢 −909.0K ETHFI | −$557.1K | per-day (100%) | 0.0000% |

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
| 2026-10-24 | 0 | 8.8K | −8.8K | −$5.6K |
| 2026-10-25 | 0 | 7.9K | −7.9K | −$4.9K |
| 2026-10-26 | 0 | 10.2K | −10.2K | −$6.4K |
| 2026-10-27 | 0 | 9.5K | −9.5K | −$6.2K |
| 2026-10-28 | 0 | 9.7K | −9.7K | −$6.5K |
| 2026-10-29 | 0 | 11.5K | −11.5K | −$7.9K |
| 2026-10-30 | 0 | 11.5K | −11.5K | −$7.0K |
| 2026-10-31 | 0 | 9.8K | −9.8K | −$6.1K |
| 2026-11-01 | 0 | 12.4K | −12.4K | −$7.7K |
| 2026-11-02 | 0 | 12.8K | −12.8K | −$7.9K |
| 2026-11-03 | 0 | 12.7K | −12.7K | −$7.3K |
| 2026-11-04 | 0 | 12.4K | −12.4K | −$7.1K |
| 2026-11-05 | 0 | 12.8K | −12.8K | −$7.6K |
| 2026-11-06 | 0 | 13.3K | −13.3K | −$7.1K |


---

## CoW Protocol (COW)

**Price:** $0.11    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.11 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 1.38M | 🟢 −1.38M COW | −$163.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 7.34M | 🟢 −7.34M COW | −$939.2K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 22.08M | 🟢 −22.08M COW | −$2.87M | per-day (100%) | 0.0000% |

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
| 2026-10-23 | 0 | 149.7K | −149.7K | −$19.8K |
| 2026-10-24 | 0 | 266.0K | −266.0K | −$35.2K |
| 2026-10-25 | 0 | 80.2K | −80.2K | −$10.4K |
| 2026-10-26 | 0 | 442.1K | −442.1K | −$55.9K |
| 2026-10-27 | 0 | 140.3K | −140.3K | −$17.7K |
| 2026-10-28 | 0 | 153.0K | −153.0K | −$19.4K |
| 2026-10-29 | 0 | 1.55M | −1.55M | −$197.2K |
| 2026-10-30 | 0 | 558.8K | −558.8K | −$65.1K |
| 2026-10-31 | 0 | 143.2K | −143.2K | −$16.6K |
| 2026-11-01 | 0 | 109.0K | −109.0K | −$13.4K |
| 2026-11-02 | 0 | 240.3K | −240.3K | −$27.5K |
| 2026-11-03 | 0 | 135.7K | −135.7K | −$16.0K |
| 2026-11-04 | 0 | 422.6K | −422.6K | −$49.9K |
| 2026-11-05 | 0 | 477.0K | −477.0K | −$56.9K |


---
