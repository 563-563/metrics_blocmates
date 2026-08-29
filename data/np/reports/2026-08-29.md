# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-08-29T13:51:44.600Z
**As-of:** 2026-08-29

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $81.63    **Circulating:** 555.14M HYPE    **AF balance:** 46.87M HYPE    **Total staked:** 436.38M HYPE (78.6% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 7.53M | 4.0K | 🔴 +3.01M HYPE | +$245.58M | today @ $81.63 | 0.3008% |
| 7d | 7/7d | 7.53M | 94.8K | 🔴 +2.38M HYPE | +$194.23M | today @ $81.63 | 0.2379% |
| 30d | 30/30d | 17.45M | 199.8K | 🔴 +691.1K HYPE | +$56.41M | today @ $81.63 | 0.0691% |
| 90d | 90/90d | 52.34M | 398.8K | 🟢 −9.76M HYPE | −$796.89M | today @ $81.63 | -0.9762% |

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
| 2026-08-16 | 0 | 5.8K | −61.0K | −$4.98M |
| 2026-08-17 | 0 | 18.3K | −18.3K | −$1.49M |
| 2026-08-18 | 0 | 10.8K | −28.0K | −$2.29M |
| 2026-08-19 | 0 | 3.7K | −3.7K | −$304.9K |
| 2026-08-20 | 0 | 12.9K | −12.9K | −$1.05M |
| 2026-08-21 | 0 | 1.8K | −1.8K | −$143.5K |
| 2026-08-22 | 0 | 2.0K | −2.0K | −$163.0K |
| 2026-08-23 | 0 | 2.2K | −2.2K | −$183.1K |
| 2026-08-24 | 0 | 7.4K | −7.4K | −$603.1K |
| 2026-08-25 | 0 | 8.9K | −8.9K | −$726.4K |
| 2026-08-26 | 0 | 16.0K | −310.0K | −$25.30M |
| 2026-08-27 | 0 | 22.4K | −208.3K | −$17.01M |
| 2026-08-28 | 0 | 33.8K | −92.3K | −$7.53M |
| 2026-08-29 | 7.53M | 4.0K | +3.01M | +$245.58M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-06 | 9.92M | $809.50M |
| 2026-09-29 | 7.53M | $614.78M |
| 2026-10-06 | 9.92M | $809.50M |
| 2026-10-29 | 7.53M | $614.78M |
| 2026-11-06 | 9.92M | $809.50M |
| 2026-11-29 | 7.53M | $614.78M |
| 2026-12-06 | 9.92M | $809.50M |
| 2026-12-29 | 7.53M | $614.78M |


---

## Aave (AAVE)

**Price:** $122.35    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $122.35 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −6.0K AAVE | −$730.4K | today @ $122.35 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −127.2K AAVE | −$15.57M | today @ $122.35 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −273.3K AAVE | −$33.44M | today @ $122.35 | 0.0000% |

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
| 2026-08-13 | 0 | 0 | 0 | $0 |
| 2026-08-14 | 0 | 0 | 0 | $0 |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | 0 | $0 |
| 2026-08-17 | 0 | 0 | −1.1K | −$140.4K |
| 2026-08-18 | 0 | 0 | 0 | $0 |
| 2026-08-19 | 0 | 0 | −131 | −$16.0K |
| 2026-08-20 | 0 | 0 | −2.0K | −$249.2K |
| 2026-08-21 | 0 | 0 | −499 | −$61.1K |
| 2026-08-22 | 0 | 0 | −387 | −$47.4K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −593 | −$72.5K |
| 2026-08-25 | 0 | 0 | −1.5K | −$185.4K |
| 2026-08-26 | 0 | 0 | −3.9K | −$472.5K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −11.40M SKY | −$776.4K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −74.94M SKY | −$5.10M | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −134.32M SKY | −$9.15M | today @ $0.07 | 0.0000% |

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
| 2026-08-13 | 0 | 0 | −291.2K | −$19.8K |
| 2026-08-14 | 0 | 0 | −539.8K | −$36.8K |
| 2026-08-15 | 0 | 0 | 0 | $0 |
| 2026-08-16 | 0 | 0 | −254.9K | −$17.4K |
| 2026-08-17 | 0 | 0 | −1.72M | −$117.3K |
| 2026-08-18 | 0 | 0 | −16.74M | −$1.14M |
| 2026-08-19 | 0 | 0 | −10.18M | −$693.0K |
| 2026-08-20 | 0 | 0 | −4.64M | −$316.1K |
| 2026-08-21 | 0 | 0 | −4.01M | −$273.3K |
| 2026-08-22 | 0 | 0 | −2.79M | −$189.8K |
| 2026-08-23 | 0 | 0 | 0 | $0 |
| 2026-08-24 | 0 | 0 | −9.95M | −$677.6K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$98.8K |


---

## Lighter (LIT)

**Price:** $3.47    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.47 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 61.0K | 🟢 −61.0K LIT | −$207.0K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 680.7K | 🟢 −680.7K LIT | −$1.69M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 3.35M | 🟢 −3.35M LIT | −$6.51M | per-day (100%) | 0.0000% |

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
| 2026-08-24 | 0 | 37.8K | −37.8K | −$133.1K |


---

## Morpho (MORPHO)

**Price:** $2.43    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$236.6K | today @ $2.43 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.66M | today @ $2.43 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$7.10M | today @ $2.43 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$21.29M | today @ $2.43 | 0.0000% |

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
| 2026-08-16 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-17 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-18 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-19 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-20 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-21 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-22 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-23 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-24 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-25 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-26 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-27 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-28 | 202.7K | 0 | +97.4K | +$236.6K |
| 2026-08-29 | 202.7K | 0 | +97.4K | +$236.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 202.7K | $492.5K |
| 2026-08-31 | 202.7K | $492.5K |
| 2026-09-01 | 202.7K | $492.5K |
| 2026-09-02 | 202.7K | $492.5K |
| 2026-09-03 | 202.7K | $492.5K |
| 2026-09-04 | 202.7K | $492.5K |
| 2026-09-05 | 202.7K | $492.5K |
| 2026-09-06 | 202.7K | $492.5K |


---

## Pendle (PENDLE)

**Price:** $1.68    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.68 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.68 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.68 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.68 | 0.0000% |

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

**Price:** $0.49    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$105.2K | today @ $0.49 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$736.3K | today @ $0.49 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.16M | today @ $0.49 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$9.47M | today @ $0.49 | 0.0000% |

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
| 2026-08-16 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-17 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-18 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-19 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-20 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-21 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-22 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-23 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-24 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-25 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-26 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-27 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-28 | 626.2K | 0 | +214.3K | +$105.2K |
| 2026-08-29 | 626.2K | 0 | +214.3K | +$105.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 626.2K | $307.4K |
| 2026-08-31 | 626.2K | $307.4K |
| 2026-09-01 | 626.2K | $307.4K |
| 2026-09-02 | 626.2K | $307.4K |
| 2026-09-03 | 626.2K | $307.4K |
| 2026-09-04 | 626.2K | $307.4K |
| 2026-09-05 | 626.2K | $307.4K |
| 2026-09-06 | 626.2K | $307.4K |


---

## Jupiter (JUP)

**Price:** $0.22    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.22 | 0.0000% |
| 7d | ⚠ 3/7d partial | 53.47M | 1.62M | 🔴 +13.93M JUP | +$3.04M | per-day (75%) | 0.0000% |
| 30d | 26/30d | 53.47M | 11.59M | 🔴 +3.96M JUP | +$1.21M | per-day (96%) | 0.0000% |
| 90d | 86/90d | 160.41M | 35.78M | 🔴 +10.88M JUP | +$3.04M | per-day (99%) | 0.0000% |

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
| 2026-08-23 | 0 | 724.2K | −724.2K | −$147.1K |
| 2026-08-24 | 0 | 523.1K | −523.1K | −$112.9K |
| 2026-08-25 | 0 | 374.2K | −374.2K | −$78.9K |
| 2026-08-27 | 53.47M | 0 | +15.55M | +$3.37M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-27 | 53.47M | $11.60M |
| 2026-10-27 | 53.47M | $11.60M |
| 2026-11-27 | 53.47M | $11.60M |
| 2026-12-27 | 53.47M | $11.60M |
| 2027-01-27 | 53.47M | $11.60M |
| 2027-02-27 | 53.47M | $11.60M |
| 2027-03-27 | 53.47M | $11.60M |
| 2027-04-27 | 53.47M | $11.60M |


---

## Fluid (FLUID)

**Price:** $1.30    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.6K | today @ $1.30 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$24.9K | today @ $1.30 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$301.8K | today @ $1.30 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$905.5K | today @ $1.30 | 0.0000% |

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
| 2026-08-16 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-17 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-18 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-19 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-20 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-21 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-22 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-23 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-24 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-25 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-26 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-27 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-28 | 9.1K | 0 | +2.7K | +$3.6K |
| 2026-08-29 | 9.1K | 0 | +2.7K | +$3.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 9.1K | $11.9K |
| 2026-08-31 | 9.1K | $11.9K |
| 2026-09-01 | 9.1K | $11.9K |
| 2026-09-02 | 9.1K | $11.9K |
| 2026-09-03 | 9.1K | $11.9K |
| 2026-09-04 | 9.1K | $11.9K |
| 2026-09-05 | 509.1K | $661.9K |
| 2026-09-06 | 9.1K | $11.9K |


---

## Collector Crypt (CARDS)

**Price:** $0.17    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.17 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 3.43M | 🟢 −3.43M CARDS | −$685.0K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 14.25M | 53.00M | 🟢 −41.60M CARDS | −$6.81M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 42.76M | 176.42M | 🟢 −142.24M CARDS | −$25.72M | per-day (100%) | 0.0000% |

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
| 2026-08-23 | 0 | 1.17M | −1.17M | −$233.1K |
| 2026-08-24 | 0 | 1.21M | −1.21M | −$239.0K |
| 2026-08-25 | 0 | 1.06M | −1.06M | −$212.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-01 | 44.67M | $7.50M |
| 2026-10-01 | 44.67M | $7.50M |
| 2026-11-01 | 44.67M | $7.50M |
| 2026-12-01 | 44.67M | $7.50M |
| 2027-01-01 | 44.67M | $7.50M |
| 2027-02-01 | 44.67M | $7.50M |
| 2027-03-01 | 44.67M | $7.50M |
| 2027-04-01 | 44.67M | $7.50M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$743.0K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 2/7d partial | 2.52B | 354.45M | 🔴 +767.70M PUMP | +$3.54M | per-day (29%) | 0.0000% |
| 30d | 25/30d | 20.80B | 7.18B | 🔴 +628.16M PUMP | +$3.54M | per-day (83%) | 0.0000% |
| 90d | 85/90d | 51.59B | 24.33B | 🟢 −5.71B PUMP | −$7.08M | per-day (94%) | 0.0000% |

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
| 2026-08-16 | 359.91M | 224.96M | −64.65M | −$177.8K |
| 2026-08-17 | 359.91M | 297.05M | −136.74M | −$365.2K |
| 2026-08-18 | 359.91M | 331.18M | −170.87M | −$470.3K |
| 2026-08-19 | 359.91M | 346.42M | −186.11M | −$572.7K |
| 2026-08-20 | 359.91M | 342.30M | −181.99M | −$546.5K |
| 2026-08-21 | 359.91M | 262.66M | −102.35M | −$393.2K |
| 2026-08-22 | 359.91M | 232.41M | −72.10M | −$292.0K |
| 2026-08-23 | 359.91M | 161.96M | −1.66M | −$8.2K |
| 2026-08-24 | 359.91M | 192.49M | −32.18M | −$167.9K |
| 2026-08-25 | 359.91M | 0 | +160.31M | +$743.0K |
| 2026-08-26 | 359.91M | 0 | +160.31M | +$743.0K |
| 2026-08-27 | 359.91M | 0 | +160.31M | +$743.0K |
| 2026-08-28 | 359.91M | 0 | +160.31M | +$743.0K |
| 2026-08-29 | 359.91M | 0 | +160.31M | +$743.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 359.91M | $1.67M |
| 2026-08-31 | 359.91M | $1.67M |
| 2026-09-01 | 359.91M | $1.67M |
| 2026-09-02 | 359.91M | $1.67M |
| 2026-09-03 | 359.91M | $1.67M |
| 2026-09-04 | 359.91M | $1.67M |
| 2026-09-05 | 359.91M | $1.67M |
| 2026-09-06 | 359.91M | $1.67M |


---

## LayerZero (ZRO)

**Price:** $1.07    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.07 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 170.4K | 🔴 +11.29M ZRO | +$12.15M | per-day (50%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 558.8K | 🔴 +33.83M ZRO | +$36.27M | per-day (57%) | 0.0000% |

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
| 2026-03-20 | 23.63M | 0 | +11.46M | +$12.28M |
| 2026-04-07 | 0 | 145.7K | −145.7K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$12.28M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.28M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$12.28M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$12.28M |
| 2026-08-06 | 0 | 170.4K | −170.4K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$12.28M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-09-20 | 23.63M | $25.31M |
| 2026-10-20 | 23.63M | $25.31M |
| 2026-11-20 | 23.63M | $25.31M |
| 2026-12-20 | 23.63M | $25.31M |
| 2027-01-20 | 23.63M | $25.31M |
| 2027-02-20 | 23.63M | $25.31M |
| 2027-03-20 | 23.63M | $25.31M |
| 2027-04-20 | 23.63M | $25.31M |


---

## Ethena (ENA)

**Price:** $0.15    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$636.7K | today @ $0.15 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$4.46M | today @ $0.15 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$19.10M | today @ $0.15 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$57.30M | today @ $0.15 | 0.0000% |

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
| 2026-08-16 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-17 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-18 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-19 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-20 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-21 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-22 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-23 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-24 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-25 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-26 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-27 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-28 | 10.75M | 0 | +4.11M | +$636.7K |
| 2026-08-29 | 10.75M | 0 | +4.11M | +$636.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 10.75M | $1.66M |
| 2026-08-31 | 10.75M | $1.66M |
| 2026-09-01 | 10.75M | $1.66M |
| 2026-09-02 | 10.75M | $1.66M |
| 2026-09-03 | 10.75M | $1.66M |
| 2026-09-04 | 10.75M | $1.66M |
| 2026-09-05 | 10.75M | $1.66M |
| 2026-09-06 | 10.75M | $1.66M |


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

**Price:** $0.11    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$8.4K | today @ $0.11 | 0.0000% |
| 7d | ⚠ 2/7d partial | 1.33M | 164.8K | 🔴 +373.7K DYDX | +$40.8K | per-day (29%) | 0.0000% |
| 30d | 25/30d | 5.68M | 1.94M | 🔴 +366.1K DYDX | +$43.0K | per-day (83%) | 0.0000% |
| 90d | 80/90d | 17.04M | 4.87M | 🔴 +2.05M DYDX | +$267.5K | per-day (89%) | 0.0000% |

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
| 2026-08-16 | 189.4K | 13.2K | +63.7K | +$7.0K |
| 2026-08-17 | 189.4K | 133.3K | −56.4K | −$5.7K |
| 2026-08-18 | 189.4K | 39.8K | +37.2K | +$3.7K |
| 2026-08-19 | 189.4K | 355.9K | −278.9K | −$28.5K |
| 2026-08-20 | 189.4K | 182.8K | −105.9K | −$11.5K |
| 2026-08-21 | 189.4K | 240.8K | −163.9K | −$18.7K |
| 2026-08-22 | 189.4K | 80.8K | −3.8K | −$472.35 |
| 2026-08-23 | 189.4K | 86.8K | −9.8K | −$1.2K |
| 2026-08-24 | 189.4K | 78.1K | −1.1K | −$139.25 |
| 2026-08-25 | 189.4K | 0 | +76.9K | +$8.4K |
| 2026-08-26 | 189.4K | 0 | +76.9K | +$8.4K |
| 2026-08-27 | 189.4K | 0 | +76.9K | +$8.4K |
| 2026-08-28 | 189.4K | 0 | +76.9K | +$8.4K |
| 2026-08-29 | 189.4K | 0 | +76.9K | +$8.4K |

### Next 1 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 189.4K | $20.7K |


---

## Meteora (MET)

**Price:** $0.20    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$22.3K | today @ $0.20 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$156.0K | today @ $0.20 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$668.7K | today @ $0.20 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.01M | today @ $0.20 | 0.0000% |

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
| 2026-08-16 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-17 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-18 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-19 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-20 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-21 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-22 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-23 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-24 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-25 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-26 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-27 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-28 | 291.3K | 0 | +110.1K | +$22.3K |
| 2026-08-29 | 291.3K | 0 | +110.1K | +$22.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 291.3K | $58.9K |
| 2026-08-31 | 291.3K | $58.9K |
| 2026-09-01 | 291.3K | $58.9K |
| 2026-09-02 | 291.3K | $58.9K |
| 2026-09-03 | 291.3K | $58.9K |
| 2026-09-04 | 291.3K | $58.9K |
| 2026-09-05 | 291.3K | $58.9K |
| 2026-09-06 | 291.3K | $58.9K |


---

## Sanctum (CLOUD)

**Price:** $0.03    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$3.0K | today @ $0.03 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$20.7K | today @ $0.03 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$88.6K | today @ $0.03 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$265.9K | today @ $0.03 | 0.0000% |

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
| 2026-08-16 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-17 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-18 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-19 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-20 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-21 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-22 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-23 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-24 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-25 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-26 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-27 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-28 | 347.8K | 0 | +118.1K | +$3.0K |
| 2026-08-29 | 347.8K | 0 | +118.1K | +$3.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 347.8K | $8.7K |
| 2026-08-31 | 347.8K | $8.7K |
| 2026-09-01 | 347.8K | $8.7K |
| 2026-09-02 | 347.8K | $8.7K |
| 2026-09-03 | 347.8K | $8.7K |
| 2026-09-04 | 347.8K | $8.7K |
| 2026-09-05 | 347.8K | $8.7K |
| 2026-09-06 | 347.8K | $8.7K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$27.4K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$117.2K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$351.7K | today @ $0.01 | 0.0000% |

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
| 2026-08-16 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-17 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-18 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-19 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-20 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-21 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-22 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-23 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-24 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-25 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-26 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-27 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-28 | 644.2K | 0 | +302.8K | +$3.9K |
| 2026-08-29 | 644.2K | 0 | +302.8K | +$3.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-08-30 | 644.2K | $8.3K |
| 2026-08-31 | 644.2K | $8.3K |
| 2026-09-01 | 644.2K | $8.3K |
| 2026-09-02 | 644.2K | $8.3K |
| 2026-09-03 | 644.2K | $8.3K |
| 2026-09-04 | 644.2K | $8.3K |
| 2026-09-05 | 644.2K | $8.3K |
| 2026-09-06 | 644.2K | $8.3K |


---

## Uniswap (UNI)

**Price:** $4.39    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.39 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 280.8K | 🟢 −280.8K UNI | −$1.23M | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 1.69M | 🟢 −1.69M UNI | −$6.60M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 4.70M | 🟢 −4.70M UNI | −$15.83M | per-day (100%) | 0.0000% |

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
| 2026-08-23 | 0 | 90.0K | −90.0K | −$388.0K |
| 2026-08-24 | 0 | 96.5K | −96.5K | −$435.4K |
| 2026-08-25 | 0 | 94.3K | −94.3K | −$408.6K |


---

## Raydium (RAY)

**Price:** $0.78    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $0.78 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 211.9K | 🟢 −211.9K RAY | −$162.2K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 1.41M | 🟢 −1.41M RAY | −$923.9K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 2.94M | 🟢 −2.94M RAY | −$1.90M | per-day (100%) | 0.0000% |

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
| 2026-08-24 | 0 | 56.1K | −56.1K | −$43.2K |
| 2026-08-25 | 0 | 48.1K | −48.1K | −$36.8K |
| 2026-08-26 | 0 | 46.6K | −46.6K | −$36.7K |


---

## Euler (EUL)

**Price:** $1.33    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.33 | 0.0000% |
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
| 7d | ⚠ 2/7d partial | 0 | 4.3K | 🟢 −4.3K GNS | −$2.3K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 139.2K | 🟢 −139.2K GNS | −$71.2K | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 718.0K | 🟢 −718.0K GNS | −$378.5K | per-day (100%) | 0.0000% |

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
| 2026-08-24 | 0 | 2.5K | −2.5K | −$1.4K |


---

## Orca (ORCA)

**Price:** $1.26    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.26 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 30.9K | 🟢 −30.9K ORCA | −$39.4K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 113.4K | 🟢 −113.4K ORCA | −$131.7K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 250.8K | 🟢 −250.8K ORCA | −$290.9K | per-day (100%) | 0.0000% |

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
| 2026-08-24 | 0 | 9.8K | −9.8K | −$12.6K |
| 2026-08-25 | 0 | 10.6K | −10.6K | −$13.8K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 841.3K | 🟢 −841.3K MNDE | −$16.8K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 0 | 5.50M | 🟢 −5.50M MNDE | −$104.1K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 14.03M | 🟢 −14.03M MNDE | −$263.7K | per-day (100%) | 0.0000% |

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
| 2026-08-24 | 0 | 257.3K | −257.3K | −$5.1K |
| 2026-08-25 | 0 | 251.6K | −251.6K | −$5.1K |
| 2026-08-26 | 0 | 83.9K | −83.9K | −$1.7K |


---

## ether.fi (ETHFI)

**Price:** $0.53    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.53 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 23.4K | 🟢 −23.4K ETHFI | −$14.2K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 322.0K | 🟢 −322.0K ETHFI | −$140.0K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 1.09M | 🟢 −1.09M ETHFI | −$423.0K | per-day (100%) | 0.0000% |

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
| 2026-08-23 | 0 | 6.4K | −6.4K | −$3.7K |
| 2026-08-24 | 0 | 8.4K | −8.4K | −$5.2K |
| 2026-08-25 | 0 | 8.6K | −8.6K | −$5.3K |


---

## CoW Protocol (COW)

**Price:** $0.12    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.12 | 0.0000% |
| 7d | ⚠ 2/7d partial | 0 | 577.7K | 🟢 −577.7K COW | −$67.9K | per-day (100%) | 0.0000% |
| 30d | ⚠ 22/30d partial | 0 | 5.77M | 🟢 −5.77M COW | −$647.4K | per-day (100%) | 0.0000% |
| 90d | 80/90d | 0 | 19.86M | 🟢 −19.86M COW | −$2.66M | per-day (100%) | 0.0000% |

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
| 2026-08-23 | 0 | 237.3K | −237.3K | −$27.0K |
| 2026-08-24 | 0 | 340.4K | −340.4K | −$40.9K |


---
