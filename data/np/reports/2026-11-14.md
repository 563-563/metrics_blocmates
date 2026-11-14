# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-14T01:03:46.652Z
**As-of:** 2026-11-14

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $71.74    **Circulating:** 599.96M HYPE    **AF balance:** 48.91M HYPE    **Total staked:** 438.99M HYPE (73.2% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 619 | 🟢 −4.9K HYPE | −$348.1K | today @ $71.74 | -0.0005% |
| 7d | 7/7d | 0 | 92.8K | 🟢 −595.9K HYPE | −$42.75M | today @ $71.74 | -0.0596% |
| 30d | 30/30d | 17.45M | 240.8K | 🔴 +1.26M HYPE | +$90.56M | today @ $71.74 | 0.1262% |
| 90d | 90/90d | 52.34M | 634.7K | 🟢 −5.20M HYPE | −$373.13M | today @ $71.74 | -0.5201% |

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
| 2026-11-01 | 0 | 3.7K | −3.7K | −$266.9K |
| 2026-11-02 | 0 | 22.6K | −57.7K | −$4.14M |
| 2026-11-03 | 0 | 4.5K | −4.5K | −$321.3K |
| 2026-11-04 | 0 | 4.7K | −53.5K | −$3.84M |
| 2026-11-05 | 0 | 2.6K | −2.6K | −$185.9K |
| 2026-11-06 | 9.92M | 12.9K | +978.8K | +$70.22M |
| 2026-11-07 | 0 | 3.2K | −3.2K | −$231.9K |
| 2026-11-08 | 0 | 7.5K | −79.9K | −$5.73M |
| 2026-11-09 | 0 | 2.7K | −2.7K | −$191.5K |
| 2026-11-10 | 0 | 150 | −150 | −$10.8K |
| 2026-11-11 | 0 | 16.1K | −16.1K | −$1.15M |
| 2026-11-12 | 0 | 26.7K | −300.3K | −$21.54M |
| 2026-11-13 | 0 | 39.0K | −192.0K | −$13.77M |
| 2026-11-14 | 0 | 619 | −4.9K | −$348.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $540.30M |
| 2026-12-06 | 9.92M | $711.42M |
| 2026-12-29 | 7.53M | $540.30M |
| 2027-01-06 | 9.92M | $711.42M |
| 2027-01-29 | 7.53M | $540.30M |
| 2027-02-06 | 9.92M | $711.42M |
| 2027-03-01 | 7.53M | $540.30M |
| 2027-03-06 | 9.92M | $711.42M |


---

## Aave (AAVE)

**Price:** $111.67    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −1.4K AAVE | −$160.5K | today @ $111.67 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.4K AAVE | −$160.5K | today @ $111.67 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −2.6K AAVE | −$286.7K | today @ $111.67 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −54.8K AAVE | −$6.12M | today @ $111.67 | 0.0000% |

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
| 2026-08-24 | 0 | 0 | −593 | −$66.2K |
| 2026-08-25 | 0 | 0 | −1.5K | −$169.2K |
| 2026-08-26 | 0 | 0 | −3.9K | −$431.3K |
| 2026-09-29 | 0 | 0 | −39.1K | −$4.37M |
| 2026-10-06 | 0 | 0 | −2.9K | −$327.6K |
| 2026-10-13 | 0 | 0 | 0 | $0 |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$88.6K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$37.6K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | 0 | $0 |
| 2026-11-14 | 0 | 0 | −1.4K | −$160.5K |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −497.7K SKY | −$28.4K | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.84M SKY | −$105.0K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −14.28M SKY | −$814.5K | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −170.71M SKY | −$9.73M | today @ $0.06 | 0.0000% |

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
| 2026-08-24 | 0 | 0 | −9.95M | −$567.4K |
| 2026-08-25 | 0 | 0 | 0 | $0 |
| 2026-08-26 | 0 | 0 | −1.45M | −$82.7K |
| 2026-09-29 | 0 | 0 | −55.20M | −$3.15M |
| 2026-10-06 | 0 | 0 | 0 | $0 |
| 2026-10-13 | 0 | 0 | −49.75M | −$2.84M |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$274.2K |
| 2026-11-06 | 0 | 0 | −6.56M | −$374.3K |
| 2026-11-07 | 0 | 0 | −1.07M | −$61.0K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | −1.34M | −$76.7K |
| 2026-11-14 | 0 | 0 | −497.7K | −$28.4K |


---

## Lighter (LIT)

**Price:** $3.25    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $3.25 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 175.7K | 🟢 −175.7K LIT | −$569.1K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.32M | 🟢 −1.32M LIT | −$4.13M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 2.92M | 🟢 −2.92M LIT | −$10.11M | per-day (100%) | 0.0000% |

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
| 2026-11-01 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-02 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-03 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-04 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-05 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-06 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-07 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-08 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-09 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-10 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-11 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-12 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-13 | 202.7K | 0 | +97.4K | +$188.9K |
| 2026-11-14 | 202.7K | 0 | +97.4K | +$188.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 202.7K | $393.2K |
| 2026-11-16 | 202.7K | $393.2K |
| 2026-11-17 | 202.7K | $393.2K |
| 2026-11-18 | 202.7K | $393.2K |
| 2026-11-19 | 202.7K | $393.2K |
| 2026-11-20 | 1.20M | $2.33M |
| 2026-11-21 | 202.7K | $393.2K |
| 2026-11-22 | 202.7K | $393.2K |


---

## Pendle (PENDLE)

**Price:** $1.54    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.54 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.54 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.54 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.54 | 0.0000% |

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

**Price:** $0.30    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$65.3K | today @ $0.30 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$456.9K | today @ $0.30 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$1.96M | today @ $0.30 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$5.88M | today @ $0.30 | 0.0000% |

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
| 2026-11-01 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-02 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-03 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-04 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-05 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-06 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-07 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-08 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-09 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-10 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-11 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-12 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-13 | 626.2K | 0 | +214.3K | +$65.3K |
| 2026-11-14 | 626.2K | 0 | +214.3K | +$65.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 626.2K | $190.7K |
| 2026-11-16 | 626.2K | $190.7K |
| 2026-11-17 | 626.2K | $190.7K |
| 2026-11-18 | 626.2K | $190.7K |
| 2026-11-19 | 626.2K | $190.7K |
| 2026-11-20 | 626.2K | $190.7K |
| 2026-11-21 | 626.2K | $190.7K |
| 2026-11-22 | 626.2K | $190.7K |


---

## Jupiter (JUP)

**Price:** $0.27    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.27 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 3.90M | 🟢 −3.90M JUP | −$981.0K | per-day (100%) | 0.0000% |
| 30d | 27/30d | 53.47M | 8.34M | 🔴 +7.21M JUP | +$2.11M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 160.41M | 28.33M | 🔴 +18.33M JUP | +$5.86M | per-day (100%) | 0.0000% |

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
| 2026-11-27 | 53.47M | $14.17M |
| 2026-12-27 | 53.47M | $14.17M |
| 2027-01-27 | 53.47M | $14.17M |
| 2027-02-27 | 53.47M | $14.17M |
| 2027-03-27 | 53.47M | $14.17M |
| 2027-04-27 | 53.47M | $14.17M |
| 2027-05-27 | 53.47M | $14.17M |
| 2027-06-27 | 53.47M | $14.17M |


---

## Fluid (FLUID)

**Price:** $1.89    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$5.2K | today @ $1.89 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$36.2K | today @ $1.89 | 0.0000% |
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
| 2026-11-01 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-02 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-03 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-04 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-05 | 509.1K | 0 | +152.7K | +$288.7K |
| 2026-11-06 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-07 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-08 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-09 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-10 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-11 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-12 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-13 | 9.1K | 0 | +2.7K | +$5.2K |
| 2026-11-14 | 9.1K | 0 | +2.7K | +$5.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 9.1K | $17.3K |
| 2026-11-16 | 9.1K | $17.3K |
| 2026-11-17 | 9.1K | $17.3K |
| 2026-11-18 | 9.1K | $17.3K |
| 2026-11-19 | 9.1K | $17.3K |
| 2026-11-20 | 9.1K | $17.3K |
| 2026-11-21 | 9.1K | $17.3K |
| 2026-11-22 | 9.1K | $17.3K |


---

## Collector Crypt (CARDS)

**Price:** $0.20    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.20 | 0.0000% |
| 7d | 6/7d | 0 | 133.1K | 🟢 −133.1K CARDS | −$27.8K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 44.67M | 1.35M | 🔴 +10.59M CARDS | +$2.51M | per-day (100%) | 0.0000% |
| 90d | 80/90d | 134.02M | 80.87M | 🟢 −45.06M CARDS | −$5.58M | per-day (99%) | 0.0000% |

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
| 2026-12-01 | 44.67M | $8.72M |
| 2027-01-01 | 44.67M | $8.72M |
| 2027-02-01 | 44.67M | $8.72M |
| 2027-03-01 | 44.67M | $8.72M |
| 2027-04-01 | 44.67M | $8.72M |
| 2027-05-01 | 44.67M | $8.72M |
| 2027-06-01 | 44.67M | $8.72M |
| 2027-07-01 | 44.67M | $8.72M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$554.0K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 5/7d partial | 12.52B | 736.08M | 🔴 +3.39B PUMP | +$11.76M | per-day (71%) | 0.0000% |
| 30d | 28/30d | 20.80B | 4.69B | 🔴 +3.12B PUMP | +$10.58M | per-day (93%) | 0.0000% |
| 90d | 88/90d | 62.39B | 17.05B | 🔴 +6.38B PUMP | +$26.57M | per-day (98%) | 0.0000% |

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
| 2026-11-01 | 359.91M | 138.95M | +21.36M | +$89.7K |
| 2026-11-02 | 359.91M | 161.99M | −1.68M | −$7.0K |
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
| 2026-11-13 | 359.91M | 0 | +160.31M | +$554.0K |
| 2026-11-14 | 359.91M | 0 | +160.31M | +$554.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 359.91M | $1.24M |
| 2026-11-16 | 359.91M | $1.24M |
| 2026-11-17 | 359.91M | $1.24M |
| 2026-11-18 | 359.91M | $1.24M |
| 2026-11-19 | 359.91M | $1.24M |
| 2026-11-20 | 359.91M | $1.24M |
| 2026-11-21 | 359.91M | $1.24M |
| 2026-11-22 | 359.91M | $1.24M |


---

## LayerZero (ZRO)

**Price:** $1.58    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.58 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.58 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$17.81M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$53.84M | per-day (40%) | 0.0000% |

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
| 2026-04-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-05-04 | 0 | 151.0K | −151.0K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$18.11M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-20 | 23.63M | $37.34M |
| 2026-12-20 | 23.63M | $37.34M |
| 2027-01-20 | 23.63M | $37.34M |
| 2027-02-20 | 23.63M | $37.34M |
| 2027-03-20 | 23.63M | $37.34M |
| 2027-04-20 | 23.63M | $37.34M |
| 2027-05-20 | 23.63M | $37.34M |
| 2027-06-20 | 23.63M | $37.34M |


---

## Ethena (ENA)

**Price:** $0.13    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$552.0K | today @ $0.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$3.86M | today @ $0.13 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$16.56M | today @ $0.13 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$49.68M | today @ $0.13 | 0.0000% |

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
| 2026-11-01 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-02 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-03 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-04 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-05 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-06 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-07 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-08 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-09 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-10 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-11 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-12 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-13 | 10.75M | 0 | +4.11M | +$552.0K |
| 2026-11-14 | 10.75M | 0 | +4.11M | +$552.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 10.75M | $1.44M |
| 2026-11-16 | 10.75M | $1.44M |
| 2026-11-17 | 10.75M | $1.44M |
| 2026-11-18 | 10.75M | $1.44M |
| 2026-11-19 | 10.75M | $1.44M |
| 2026-11-20 | 10.75M | $1.44M |
| 2026-11-21 | 10.75M | $1.44M |
| 2026-11-22 | 10.75M | $1.44M |


---

## Aerodrome (AERO)

**Price:** $0.47    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.47 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.47 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.47 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.47 | 0.0000% |

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

**Price:** $0.09    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.09 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 410.6K | 🟢 −410.6K DYDX | −$37.3K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 2.06M | 🟢 −2.06M DYDX | −$217.4K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 2.65M | 6.89M | 🟢 −5.82M DYDX | −$686.9K | per-day (100%) | 0.0000% |

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

**Price:** $0.29    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$31.8K | today @ $0.29 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$222.9K | today @ $0.29 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$955.4K | today @ $0.29 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.87M | today @ $0.29 | 0.0000% |

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
| 2026-11-01 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-02 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-03 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-04 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-05 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-06 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-07 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-08 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-09 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-10 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-11 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-12 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-13 | 291.3K | 0 | +110.1K | +$31.8K |
| 2026-11-14 | 291.3K | 0 | +110.1K | +$31.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 291.3K | $84.2K |
| 2026-11-16 | 291.3K | $84.2K |
| 2026-11-17 | 291.3K | $84.2K |
| 2026-11-18 | 291.3K | $84.2K |
| 2026-11-19 | 291.3K | $84.2K |
| 2026-11-20 | 291.3K | $84.2K |
| 2026-11-21 | 291.3K | $84.2K |
| 2026-11-22 | 291.3K | $84.2K |


---

## Sanctum (CLOUD)

**Price:** $0.08    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$9.2K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$64.7K | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 25.43M | 0 | 🔴 +8.04M CLOUD | +$629.2K | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$1.18M | today @ $0.08 | 0.0000% |

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
| 2026-11-01 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-02 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-03 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-04 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-05 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-06 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-07 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-08 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-09 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-10 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-11 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-12 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-13 | 347.8K | 0 | +118.1K | +$9.2K |
| 2026-11-14 | 347.8K | 0 | +118.1K | +$9.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 347.8K | $27.2K |
| 2026-11-16 | 347.8K | $27.2K |
| 2026-11-17 | 347.8K | $27.2K |
| 2026-11-18 | 347.8K | $27.2K |
| 2026-11-19 | 347.8K | $27.2K |
| 2026-11-20 | 347.8K | $27.2K |
| 2026-11-21 | 347.8K | $27.2K |
| 2026-11-22 | 347.8K | $27.2K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$3.4K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$23.7K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$101.5K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$304.4K | today @ $0.01 | 0.0000% |

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
| 2026-11-01 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-02 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-03 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-04 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-05 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-06 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-07 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-08 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-09 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-10 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-11 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-12 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-13 | 644.2K | 0 | +302.8K | +$3.4K |
| 2026-11-14 | 644.2K | 0 | +302.8K | +$3.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-15 | 644.2K | $7.2K |
| 2026-11-16 | 644.2K | $7.2K |
| 2026-11-17 | 644.2K | $7.2K |
| 2026-11-18 | 644.2K | $7.2K |
| 2026-11-19 | 644.2K | $7.2K |
| 2026-11-20 | 644.2K | $7.2K |
| 2026-11-21 | 644.2K | $7.2K |
| 2026-11-22 | 644.2K | $7.2K |


---

## Uniswap (UNI)

**Price:** $5.73    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $5.73 | 0.0000% |
| 7d | 6/7d | 0 | 216.6K | 🟢 −216.6K UNI | −$1.42M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.11M | 🟢 −1.11M UNI | −$7.81M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.23M | 🟢 −5.23M UNI | −$32.97M | per-day (100%) | 0.0000% |

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

**Price:** $1.48    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.48 | 0.0000% |
| 7d | 6/7d | 0 | 154.5K | 🟢 −154.5K RAY | −$260.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 691.2K | 🟢 −691.2K RAY | −$1.20M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 5.27M | 🟢 −5.27M RAY | −$7.39M | per-day (100%) | 0.0000% |

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

**Price:** $0.89    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.89 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.89 | 0.0000% |
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

**Price:** $0.34    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.34 | 0.0000% |
| 7d | ⚠ 3/7d partial | 0 | 4.5K | 🟢 −4.5K GNS | −$1.9K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 50.7K | 🟢 −50.7K GNS | −$20.4K | per-day (100%) | 0.0000% |
| 90d | 86/90d | 0 | 268.5K | 🟢 −268.5K GNS | −$123.6K | per-day (100%) | 0.0000% |

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

**Price:** $1.23    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.23 | 0.0000% |
| 7d | 6/7d | 0 | 25.3K | 🟢 −25.3K ORCA | −$33.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 158.2K | 🟢 −158.2K ORCA | −$251.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 726.9K | 🟢 −726.9K ORCA | −$1.11M | per-day (100%) | 0.0000% |

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
| 7d | 6/7d | 0 | 1.44M | 🟢 −1.44M MNDE | −$31.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 7.55M | 🟢 −7.55M MNDE | −$181.9K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 25.59M | 🟢 −25.59M MNDE | −$570.2K | per-day (100%) | 0.0000% |

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

**Price:** $0.56    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.56 | 0.0000% |
| 7d | 6/7d | 0 | 70.2K | 🟢 −70.2K ETHFI | −$43.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 313.0K | 🟢 −313.0K ETHFI | −$197.2K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 904.1K | 🟢 −904.1K ETHFI | −$572.9K | per-day (100%) | 0.0000% |

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

**Price:** $0.10    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.10 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 2.19M | 🟢 −2.19M COW | −$227.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 8.96M | 🟢 −8.96M COW | −$1.07M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 23.54M | 🟢 −23.54M COW | −$3.02M | per-day (100%) | 0.0000% |

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
