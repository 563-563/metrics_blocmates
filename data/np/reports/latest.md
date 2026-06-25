# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-06-25T14:58:12.115Z
**As-of:** 2026-06-25

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $60.85    **Circulating:** 512.72M HYPE    **AF balance:** 45.45M HYPE    **Total staked:** 436.38M HYPE (85.1% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 26.5K | 🟢 −31.1K HYPE | −$1.89M | today @ $60.85 | -0.0031% |
| 7d | 7/7d | 0 | 103.8K | 🟢 −236.3K HYPE | −$14.38M | today @ $60.85 | -0.0236% |
| 30d | 30/30d | 17.45M | 196.3K | 🟢 −5.28M HYPE | −$321.39M | today @ $60.85 | -0.5282% |
| 90d | 90/90d | 52.34M | 1.83M | 🔴 +806.3K HYPE | −$87.00M | per-day (62%) | 0.0806% |

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
| 2026-06-12 | 0 | 504 | −504 | −$30.6K |
| 2026-06-13 | 0 | 3.1K | −298.4K | −$18.16M |
| 2026-06-14 | 0 | 2.2K | −556.9K | −$33.89M |
| 2026-06-15 | 0 | 1.7K | −130.6K | −$7.95M |
| 2026-06-16 | 0 | 272 | −767.9K | −$46.73M |
| 2026-06-17 | 0 | 4.0K | −204.6K | −$12.45M |
| 2026-06-18 | 0 | 2.4K | −691.7K | −$42.09M |
| 2026-06-19 | 0 | 2.6K | −2.6K | −$158.9K |
| 2026-06-20 | 0 | 2.1K | −2.1K | −$128.7K |
| 2026-06-21 | 0 | 4.8K | −132.7K | −$8.08M |
| 2026-06-22 | 0 | 11.1K | −11.1K | −$672.5K |
| 2026-06-23 | 0 | 26.9K | −26.9K | −$1.64M |
| 2026-06-24 | 0 | 29.8K | −29.8K | −$1.81M |
| 2026-06-25 | 0 | 26.5K | −31.1K | −$1.89M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-29 | 7.53M | $458.28M |
| 2026-07-06 | 9.92M | $603.43M |
| 2026-07-29 | 7.53M | $458.28M |
| 2026-08-06 | 9.92M | $603.43M |
| 2026-08-29 | 7.53M | $458.28M |
| 2026-09-06 | 9.92M | $603.43M |
| 2026-09-29 | 7.53M | $458.28M |
| 2026-10-06 | 9.92M | $603.43M |


---

## Aave (AAVE)

**Price:** $80.63    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −28 AAVE | −$2.3K | today @ $80.63 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −2.2K AAVE | −$177.0K | today @ $80.63 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −38.9K AAVE | −$3.14M | today @ $80.63 | 0.0000% |
| 90d | ⚠ 23/90d partial | 0 | 19.6K | 🟢 −58.7K AAVE | −$4.73M | today @ $80.63 | 0.0000% |

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
| 2026-06-12 | 0 | 0 | 0 | $0 |
| 2026-06-13 | 0 | 0 | −97 | −$7.8K |
| 2026-06-14 | 0 | 0 | 0 | $0 |
| 2026-06-15 | 0 | 0 | −0 | −$5.10 |
| 2026-06-16 | 0 | 0 | −543 | −$43.8K |
| 2026-06-17 | 0 | 0 | −7 | −$553.29 |
| 2026-06-18 | 0 | 0 | 0 | $0 |
| 2026-06-19 | 0 | 0 | 0 | $0 |
| 2026-06-20 | 0 | 0 | −32 | −$2.5K |
| 2026-06-21 | 0 | 0 | −1.7K | −$135.0K |
| 2026-06-22 | 0 | 0 | 0 | $0 |
| 2026-06-23 | 0 | 0 | −297 | −$24.0K |
| 2026-06-24 | 0 | 0 | −163 | −$13.1K |
| 2026-06-25 | 0 | 0 | −28 | −$2.3K |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −297.2K SKY | −$15.5K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −5.30M SKY | −$275.8K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −5.30M SKY | −$275.8K | today @ $0.05 | 0.0000% |

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
| 2026-06-12 | 0 | 0 | −1.7K | −$86.39 |
| 2026-06-13 | 0 | 0 | −2.59M | −$134.7K |
| 2026-06-14 | 0 | 0 | −163.4K | −$8.5K |
| 2026-06-15 | 0 | 0 | −1.9K | −$97.19 |
| 2026-06-16 | 0 | 0 | −2.9K | −$151.83 |
| 2026-06-17 | 0 | 0 | −1.9K | −$99.31 |
| 2026-06-18 | 0 | 0 | −18.9K | −$982.68 |
| 2026-06-19 | 0 | 0 | 0 | $0 |
| 2026-06-20 | 0 | 0 | 0 | $0 |
| 2026-06-21 | 0 | 0 | −39.1K | −$2.0K |
| 2026-06-22 | 0 | 0 | −449 | −$23.35 |
| 2026-06-23 | 0 | 0 | 0 | $0 |
| 2026-06-24 | 0 | 0 | −257.7K | −$13.4K |
| 2026-06-25 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.59    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.59 | 0.0000% |
| 7d | 6/7d | 0 | 243.4K | 🟢 −243.4K LIT | −$381.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.82M | 🟢 −1.82M LIT | −$2.70M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 6.04M | 🟢 −6.04M LIT | −$6.84M | per-day (100%) | 0.0000% |

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
| 2026-06-11 | 0 | 56.7K | −56.7K | −$79.5K |
| 2026-06-12 | 0 | 51.1K | −51.1K | −$79.5K |
| 2026-06-13 | 0 | 25.7K | −25.7K | −$39.5K |
| 2026-06-14 | 0 | 25.1K | −25.1K | −$40.9K |
| 2026-06-15 | 0 | 59.6K | −59.6K | −$99.7K |
| 2026-06-16 | 0 | 49.5K | −49.5K | −$83.8K |
| 2026-06-17 | 0 | 73.1K | −73.1K | −$127.0K |
| 2026-06-18 | 0 | 48.7K | −48.7K | −$85.1K |
| 2026-06-19 | 0 | 45.1K | −45.1K | −$73.0K |
| 2026-06-20 | 0 | 22.8K | −22.8K | −$35.0K |
| 2026-06-21 | 0 | 28.2K | −28.2K | −$43.8K |
| 2026-06-22 | 0 | 42.7K | −42.7K | −$67.7K |
| 2026-06-23 | 0 | 43.9K | −43.9K | −$70.7K |
| 2026-06-24 | 0 | 60.8K | −60.8K | −$91.2K |


---

## Morpho (MORPHO)

**Price:** $1.74    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$169.4K | today @ $1.74 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.19M | today @ $1.74 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.08M | today @ $1.74 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$15.25M | today @ $1.74 | 0.0000% |

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
| 2026-06-12 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-13 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-14 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-15 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-16 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-17 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-18 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-19 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-20 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-21 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-22 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-23 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-24 | 202.7K | 0 | +97.4K | +$169.4K |
| 2026-06-25 | 202.7K | 0 | +97.4K | +$169.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 202.7K | $352.7K |
| 2026-06-27 | 202.7K | $352.7K |
| 2026-06-28 | 202.7K | $352.7K |
| 2026-06-29 | 202.7K | $352.7K |
| 2026-06-30 | 202.7K | $352.7K |
| 2026-07-01 | 202.7K | $352.7K |
| 2026-07-02 | 202.7K | $352.7K |
| 2026-07-03 | 202.7K | $352.7K |


---

## Pendle (PENDLE)

**Price:** $1.24    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.24 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.24 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.24 | 0.0000% |

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

**Price:** $0.67    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$142.9K | today @ $0.67 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$1.00M | today @ $0.67 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$4.29M | today @ $0.67 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$12.87M | today @ $0.67 | 0.0000% |

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
| 2026-06-12 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-13 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-14 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-15 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-16 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-17 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-18 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-19 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-20 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-21 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-22 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-23 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-24 | 626.2K | 0 | +214.3K | +$142.9K |
| 2026-06-25 | 626.2K | 0 | +214.3K | +$142.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 626.2K | $417.7K |
| 2026-06-27 | 626.2K | $417.7K |
| 2026-06-28 | 626.2K | $417.7K |
| 2026-06-29 | 626.2K | $417.7K |
| 2026-06-30 | 626.2K | $417.7K |
| 2026-07-01 | 626.2K | $417.7K |
| 2026-07-02 | 626.2K | $417.7K |
| 2026-07-03 | 626.2K | $417.7K |


---

## Jupiter (JUP)

**Price:** $0.22    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 14 | 🟢 −14 JUP | −$3.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 2.57M | 🟢 −2.57M JUP | −$522.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 13.55M | 🔴 +2.00M JUP | +$604.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 106.94M | 38.07M | 🟢 −6.97M JUP | −$967.6K | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 504.5K | −504.5K | −$81.6K |
| 2026-06-13 | 0 | 357.2K | −357.2K | −$59.5K |
| 2026-06-14 | 0 | 337.6K | −337.6K | −$58.5K |
| 2026-06-15 | 0 | 508.8K | −508.8K | −$91.1K |
| 2026-06-16 | 0 | 375.1K | −375.1K | −$71.7K |
| 2026-06-17 | 0 | 475.9K | −475.9K | −$92.0K |
| 2026-06-18 | 0 | 454.2K | −454.2K | −$86.1K |
| 2026-06-19 | 0 | 336.0K | −336.0K | −$65.4K |
| 2026-06-20 | 0 | 525.6K | −525.6K | −$99.5K |
| 2026-06-21 | 0 | 293.2K | −293.2K | −$61.4K |
| 2026-06-22 | 0 | 487.0K | −487.0K | −$104.2K |
| 2026-06-23 | 0 | 369.2K | −369.2K | −$77.7K |
| 2026-06-24 | 0 | 559.0K | −559.0K | −$114.3K |
| 2026-06-25 | 0 | 14 | −14 | −$3.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-27 | 53.47M | $11.75M |
| 2026-07-27 | 53.47M | $11.75M |
| 2026-08-27 | 53.47M | $11.75M |
| 2026-09-27 | 53.47M | $11.75M |
| 2026-10-27 | 53.47M | $11.75M |
| 2026-11-27 | 53.47M | $11.75M |
| 2026-12-27 | 53.47M | $11.75M |
| 2027-01-27 | 53.47M | $11.75M |


---

## Fluid (FLUID)

**Price:** $0.88    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$2.4K | today @ $0.88 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$16.9K | today @ $0.88 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$204.2K | today @ $0.88 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$612.6K | today @ $0.88 | 0.0000% |

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
| 2026-06-12 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-13 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-14 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-15 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-16 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-17 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-18 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-19 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-20 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-21 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-22 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-23 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-24 | 9.1K | 0 | +2.7K | +$2.4K |
| 2026-06-25 | 9.1K | 0 | +2.7K | +$2.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 9.1K | $8.0K |
| 2026-06-27 | 9.1K | $8.0K |
| 2026-06-28 | 9.1K | $8.0K |
| 2026-06-29 | 9.1K | $8.0K |
| 2026-06-30 | 9.1K | $8.0K |
| 2026-07-01 | 9.1K | $8.0K |
| 2026-07-02 | 9.1K | $8.0K |
| 2026-07-03 | 9.1K | $8.0K |


---

## Collector Crypt (CARDS)

**Price:** $0.31    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 573.1K | 🟢 −573.1K CARDS | −$176.6K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 10.18M | 🟢 −10.18M CARDS | −$2.95M | per-day (100%) | 0.0000% |
| 30d | 30/30d | 14.25M | 59.96M | 🟢 −48.57M CARDS | −$10.48M | per-day (100%) | 0.0000% |
| 90d | 90/90d | 42.76M | 250.47M | 🟢 −216.30M CARDS | −$22.53M | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 1.79M | −1.79M | −$429.5K |
| 2026-06-13 | 0 | 2.39M | −2.39M | −$547.3K |
| 2026-06-14 | 0 | 1.36M | −1.36M | −$384.2K |
| 2026-06-15 | 0 | 3.65M | −3.65M | −$977.9K |
| 2026-06-16 | 0 | 3.03M | −3.03M | −$743.6K |
| 2026-06-17 | 0 | 2.55M | −2.55M | −$599.9K |
| 2026-06-18 | 0 | 2.58M | −2.58M | −$605.3K |
| 2026-06-19 | 0 | 1.50M | −1.50M | −$476.9K |
| 2026-06-20 | 0 | 1.21M | −1.21M | −$368.2K |
| 2026-06-21 | 0 | 1.83M | −1.83M | −$528.4K |
| 2026-06-22 | 0 | 1.73M | −1.73M | −$493.8K |
| 2026-06-23 | 0 | 2.13M | −2.13M | −$566.5K |
| 2026-06-24 | 0 | 1.21M | −1.21M | −$342.4K |
| 2026-06-25 | 0 | 573.1K | −573.1K | −$176.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 14.25M | $4.38M |
| 2026-08-01 | 14.25M | $4.38M |
| 2026-09-01 | 44.67M | $13.72M |
| 2026-10-01 | 44.67M | $13.72M |
| 2026-11-01 | 44.67M | $13.72M |
| 2026-12-01 | 44.67M | $13.72M |
| 2027-01-01 | 44.67M | $13.72M |
| 2027-02-01 | 44.67M | $13.72M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PUMP | $0 | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 0 | 1.63B | 🟢 −1.63B PUMP | −$2.34M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 10.00B | 7.47B | 🟢 −4.47B PUMP | −$7.35M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 30.00B | 32.73B | 🟢 −23.73B PUMP | −$40.82M | per-day (100%) | 0.0000% |

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
| 2026-06-11 | 0 | 311.53M | −311.53M | −$427.5K |
| 2026-06-12 | 10.00B | 298.51M | +2.70B | +$3.93M |
| 2026-06-13 | 0 | 234.17M | −234.17M | −$352.4K |
| 2026-06-14 | 0 | 239.33M | −239.33M | −$368.3K |
| 2026-06-15 | 0 | 294.48M | −294.48M | −$463.6K |
| 2026-06-16 | 0 | 326.91M | −326.91M | −$509.4K |
| 2026-06-17 | 0 | 286.31M | −286.31M | −$431.3K |
| 2026-06-18 | 0 | 287.45M | −287.45M | −$423.6K |
| 2026-06-19 | 0 | 263.59M | −263.59M | −$381.3K |
| 2026-06-20 | 0 | 239.36M | −239.36M | −$328.3K |
| 2026-06-21 | 0 | 247.63M | −247.63M | −$350.6K |
| 2026-06-22 | 0 | 301.87M | −301.87M | −$442.1K |
| 2026-06-23 | 0 | 299.44M | −299.44M | −$435.9K |
| 2026-06-24 | 0 | 276.88M | −276.88M | −$400.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 359.91M | $433.4K |
| 2026-07-02 | 359.91M | $433.4K |
| 2026-07-03 | 359.91M | $433.4K |
| 2026-07-04 | 359.91M | $433.4K |
| 2026-07-05 | 359.91M | $433.4K |
| 2026-07-06 | 359.91M | $433.4K |
| 2026-07-07 | 359.91M | $433.4K |
| 2026-07-08 | 359.91M | $433.4K |


---

## LayerZero (ZRO)

**Price:** $0.84    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.84 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$9.59M | today @ $0.84 | 0.0000% |
| 30d | ⚠ 2/30d partial | 23.63M | 244.7K | 🔴 +11.22M ZRO | +$9.29M | per-day (67%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 544.1K | 🔴 +33.84M ZRO | +$28.00M | per-day (57%) | 0.0000% |

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
| 2026-01-20 | 23.63M | 0 | +11.46M | +$9.59M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.59M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.59M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.59M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.59M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$9.59M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-20 | 23.63M | $19.77M |
| 2026-08-20 | 23.63M | $19.77M |
| 2026-09-20 | 23.63M | $19.77M |
| 2026-10-20 | 23.63M | $19.77M |
| 2026-11-20 | 23.63M | $19.77M |
| 2026-12-20 | 23.63M | $19.77M |
| 2027-01-20 | 23.63M | $19.77M |
| 2027-02-20 | 23.63M | $19.77M |


---

## Ethena (ENA)

**Price:** $0.08    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$336.2K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.35M | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.09M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$30.26M | today @ $0.08 | 0.0000% |

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
| 2026-06-12 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-13 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-14 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-15 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-16 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-17 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-18 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-19 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-20 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-21 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-22 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-23 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-24 | 10.75M | 0 | +4.11M | +$336.2K |
| 2026-06-25 | 10.75M | 0 | +4.11M | +$336.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 10.75M | $879.1K |
| 2026-06-27 | 10.75M | $879.1K |
| 2026-06-28 | 10.75M | $879.1K |
| 2026-06-29 | 10.75M | $879.1K |
| 2026-06-30 | 10.75M | $879.1K |
| 2026-07-01 | 10.75M | $879.1K |
| 2026-07-02 | 10.75M | $879.1K |
| 2026-07-03 | 10.75M | $879.1K |


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

**Price:** $0.14    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$11.0K | today @ $0.14 | 0.0000% |
| 7d | 6/7d | 1.33M | 112.2K | 🔴 +426.4K DYDX | +$54.6K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 845.5K | 🔴 +1.46M DYDX | +$212.2K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 10.79M | 5.36M | 🟢 −970.5K DYDX | −$29.8K | per-day (99%) | 0.0000% |

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
| 2026-06-12 | 189.4K | 25.3K | +51.6K | +$6.2K |
| 2026-06-13 | 189.4K | 5.3K | +71.7K | +$8.6K |
| 2026-06-14 | 189.4K | 13.8K | +63.1K | +$7.6K |
| 2026-06-15 | 189.4K | 53.4K | +23.5K | +$2.9K |
| 2026-06-16 | 189.4K | 48.2K | +28.8K | +$3.5K |
| 2026-06-17 | 189.4K | 36.1K | +40.8K | +$5.0K |
| 2026-06-18 | 189.4K | 103.4K | −26.5K | −$3.1K |
| 2026-06-19 | 189.4K | 10.7K | +66.2K | +$7.8K |
| 2026-06-20 | 189.4K | 14.9K | +62.1K | +$7.4K |
| 2026-06-21 | 189.4K | 16.7K | +60.3K | +$7.2K |
| 2026-06-22 | 189.4K | 19.8K | +57.1K | +$6.9K |
| 2026-06-23 | 189.4K | 21.1K | +55.8K | +$7.2K |
| 2026-06-24 | 189.4K | 29.0K | +48.0K | +$7.2K |
| 2026-06-25 | 189.4K | 0 | +76.9K | +$11.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 189.4K | $27.0K |
| 2026-06-27 | 189.4K | $27.0K |
| 2026-06-28 | 189.4K | $27.0K |
| 2026-06-29 | 189.4K | $27.0K |
| 2026-06-30 | 189.4K | $27.0K |
| 2026-07-01 | 189.4K | $27.0K |
| 2026-07-02 | 189.4K | $27.0K |
| 2026-07-03 | 189.4K | $27.0K |


---

## Meteora (MET)

**Price:** $0.15    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$16.3K | today @ $0.15 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$114.1K | today @ $0.15 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$488.8K | today @ $0.15 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.47M | today @ $0.15 | 0.0000% |

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
| 2026-06-12 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-13 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-14 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-15 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-16 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-17 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-18 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-19 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-20 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-21 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-22 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-23 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-24 | 291.3K | 0 | +110.1K | +$16.3K |
| 2026-06-25 | 291.3K | 0 | +110.1K | +$16.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 291.3K | $43.1K |
| 2026-06-27 | 291.3K | $43.1K |
| 2026-06-28 | 291.3K | $43.1K |
| 2026-06-29 | 291.3K | $43.1K |
| 2026-06-30 | 291.3K | $43.1K |
| 2026-07-01 | 291.3K | $43.1K |
| 2026-07-02 | 291.3K | $43.1K |
| 2026-07-03 | 291.3K | $43.1K |


---

## Sanctum (CLOUD)

**Price:** $0.01    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$1.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$11.8K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$50.4K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$151.2K | today @ $0.01 | 0.0000% |

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
| 2026-06-12 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-13 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-14 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-15 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-16 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-17 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-18 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-19 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-20 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-21 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-22 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-23 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-24 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-25 | 347.8K | 0 | +118.1K | +$1.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 347.8K | $4.9K |
| 2026-06-27 | 347.8K | $4.9K |
| 2026-06-28 | 347.8K | $4.9K |
| 2026-06-29 | 347.8K | $4.9K |
| 2026-06-30 | 347.8K | $4.9K |
| 2026-07-01 | 347.8K | $4.9K |
| 2026-07-02 | 347.8K | $4.9K |
| 2026-07-03 | 347.8K | $4.9K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$4.8K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$33.9K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$145.5K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 68.69M | 0 | 🔴 +35.81M DRIFT | +$573.6K | today @ $0.02 | 0.0000% |

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
| 2026-06-12 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-13 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-14 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-15 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-16 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-17 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-18 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-19 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-20 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-21 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-22 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-23 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-24 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-25 | 644.2K | 0 | +302.8K | +$4.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-26 | 644.2K | $10.3K |
| 2026-06-27 | 644.2K | $10.3K |
| 2026-06-28 | 644.2K | $10.3K |
| 2026-06-29 | 644.2K | $10.3K |
| 2026-06-30 | 644.2K | $10.3K |
| 2026-07-01 | 644.2K | $10.3K |
| 2026-07-02 | 644.2K | $10.3K |
| 2026-07-03 | 644.2K | $10.3K |


---

## Uniswap (UNI)

**Price:** $2.84    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $2.84 | 0.0000% |
| 7d | 6/7d | 0 | 247.1K | 🟢 −247.1K UNI | −$741.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.73M | 🟢 −1.73M UNI | −$4.83M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.22M | 🟢 −4.22M UNI | −$13.16M | per-day (100%) | 0.0000% |

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
| 2026-06-11 | 0 | 62.5K | −62.5K | −$149.6K |
| 2026-06-12 | 0 | 42.1K | −42.1K | −$104.9K |
| 2026-06-13 | 0 | 26.6K | −26.6K | −$66.5K |
| 2026-06-14 | 0 | 38.5K | −38.5K | −$98.4K |
| 2026-06-15 | 0 | 63.8K | −63.8K | −$164.8K |
| 2026-06-16 | 0 | 64.9K | −64.9K | −$184.2K |
| 2026-06-17 | 0 | 56.7K | −56.7K | −$186.9K |
| 2026-06-18 | 0 | 53.6K | −53.6K | −$172.8K |
| 2026-06-19 | 0 | 28.5K | −28.5K | −$90.7K |
| 2026-06-20 | 0 | 33.0K | −33.0K | −$101.3K |
| 2026-06-21 | 0 | 26.3K | −26.3K | −$79.0K |
| 2026-06-22 | 0 | 40.2K | −40.2K | −$119.9K |
| 2026-06-23 | 0 | 43.4K | −43.4K | −$129.3K |
| 2026-06-24 | 0 | 75.7K | −75.7K | −$220.8K |


---

## Raydium (RAY)

**Price:** $0.58    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 30.1K | 🟢 −30.1K RAY | −$17.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 194.2K | 🟢 −194.2K RAY | −$117.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 882.2K | 🟢 −882.2K RAY | −$552.2K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.95M | 🟢 −2.95M RAY | −$2.04M | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 33.1K | −33.1K | −$19.4K |
| 2026-06-13 | 0 | 22.2K | −22.2K | −$13.1K |
| 2026-06-14 | 0 | 22.4K | −22.4K | −$13.7K |
| 2026-06-15 | 0 | 36.4K | −36.4K | −$22.6K |
| 2026-06-16 | 0 | 32.2K | −32.2K | −$20.4K |
| 2026-06-17 | 0 | 32.2K | −32.2K | −$20.0K |
| 2026-06-18 | 0 | 34.8K | −34.8K | −$21.4K |
| 2026-06-19 | 0 | 24.2K | −24.2K | −$14.5K |
| 2026-06-20 | 0 | 21.6K | −21.6K | −$12.9K |
| 2026-06-21 | 0 | 19.5K | −19.5K | −$12.2K |
| 2026-06-22 | 0 | 31.3K | −31.3K | −$19.4K |
| 2026-06-23 | 0 | 33.1K | −33.1K | −$20.5K |
| 2026-06-24 | 0 | 34.5K | −34.5K | −$20.7K |
| 2026-06-25 | 0 | 30.1K | −30.1K | −$17.5K |


---

## Euler (EUL)

**Price:** $0.99    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.99 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.99 | 0.0000% |
| 90d | ⚠ 19/90d partial | 0 | 48.1K | 🟢 −48.1K EUL | −$47.7K | per-day (100%) | 0.0000% |

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

**Price:** $0.52    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.52 | 0.0000% |
| 7d | 6/7d | 0 | 33.0K | 🟢 −33.0K GNS | −$18.2K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 476.8K | 🟢 −476.8K GNS | −$242.9K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 1.07M | 🟢 −1.07M GNS | −$611.9K | per-day (100%) | 0.0000% |

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
| 2026-06-11 | 0 | 12.1K | −12.1K | −$6.3K |
| 2026-06-12 | 0 | 19.4K | −19.4K | −$10.9K |
| 2026-06-13 | 0 | 4.9K | −4.9K | −$3.0K |
| 2026-06-14 | 0 | 5.5K | −5.5K | −$3.3K |
| 2026-06-15 | 0 | 17.6K | −17.6K | −$10.6K |
| 2026-06-16 | 0 | 13.9K | −13.9K | −$8.4K |
| 2026-06-17 | 0 | 12.0K | −12.0K | −$7.1K |
| 2026-06-18 | 0 | 7.1K | −7.1K | −$4.1K |
| 2026-06-19 | 0 | 3.2K | −3.2K | −$1.8K |
| 2026-06-20 | 0 | 873 | −873 | −$495.00 |
| 2026-06-21 | 0 | 2.2K | −2.2K | −$1.3K |
| 2026-06-22 | 0 | 2.8K | −2.8K | −$1.6K |
| 2026-06-23 | 0 | 2.9K | −2.9K | −$1.7K |
| 2026-06-24 | 0 | 21.0K | −21.0K | −$11.4K |


---

## Orca (ORCA)

**Price:** $1.08    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 3.6K | 🟢 −3.6K ORCA | −$3.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 17.2K | 🟢 −17.2K ORCA | −$20.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 79.2K | 🟢 −79.2K ORCA | −$90.4K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 213.8K | 🟢 −213.8K ORCA | −$242.0K | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 2.8K | −2.8K | −$2.8K |
| 2026-06-13 | 0 | 1.3K | −1.3K | −$1.6K |
| 2026-06-14 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-06-15 | 0 | 3.2K | −3.2K | −$3.6K |
| 2026-06-16 | 0 | 3.3K | −3.3K | −$3.8K |
| 2026-06-17 | 0 | 3.4K | −3.4K | −$3.9K |
| 2026-06-18 | 0 | 2.5K | −2.5K | −$3.1K |
| 2026-06-19 | 0 | 1.7K | −1.7K | −$2.1K |
| 2026-06-20 | 0 | 1.9K | −1.9K | −$2.4K |
| 2026-06-21 | 0 | 1.5K | −1.5K | −$1.9K |
| 2026-06-22 | 0 | 2.2K | −2.2K | −$2.6K |
| 2026-06-23 | 0 | 2.5K | −2.5K | −$3.0K |
| 2026-06-24 | 0 | 3.7K | −3.7K | −$4.3K |
| 2026-06-25 | 0 | 3.6K | −3.6K | −$3.9K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 97.8K | 🟢 −97.8K MNDE | −$1.8K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 689.2K | 🟢 −689.2K MNDE | −$12.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 3.71M | 🟢 −3.71M MNDE | −$69.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 18.42M | 🟢 −18.42M MNDE | −$353.9K | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 106.8K | −106.8K | −$2.0K |
| 2026-06-13 | 0 | 110.2K | −110.2K | −$2.0K |
| 2026-06-14 | 0 | 108.6K | −108.6K | −$2.0K |
| 2026-06-15 | 0 | 115.6K | −115.6K | −$2.1K |
| 2026-06-16 | 0 | 108.2K | −108.2K | −$2.0K |
| 2026-06-17 | 0 | 106.9K | −106.9K | −$1.9K |
| 2026-06-18 | 0 | 97.1K | −97.1K | −$1.8K |
| 2026-06-19 | 0 | 96.9K | −96.9K | −$1.8K |
| 2026-06-20 | 0 | 104.6K | −104.6K | −$1.9K |
| 2026-06-21 | 0 | 100.5K | −100.5K | −$1.8K |
| 2026-06-22 | 0 | 98.3K | −98.3K | −$1.8K |
| 2026-06-23 | 0 | 93.4K | −93.4K | −$1.7K |
| 2026-06-24 | 0 | 97.8K | −97.8K | −$1.8K |
| 2026-06-25 | 0 | 97.8K | −97.8K | −$1.8K |


---

## ether.fi (ETHFI)

**Price:** $0.35    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 9.8K | 🟢 −9.8K ETHFI | −$3.5K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 159.0K | 🟢 −159.0K ETHFI | −$55.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 814.2K | 🟢 −814.2K ETHFI | −$275.0K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.46M | 🟢 −2.46M ETHFI | −$985.7K | per-day (100%) | 0.0000% |

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
| 2026-06-12 | 0 | 26.5K | −26.5K | −$8.1K |
| 2026-06-13 | 0 | 28.3K | −28.3K | −$8.8K |
| 2026-06-14 | 0 | 27.1K | −27.1K | −$8.6K |
| 2026-06-15 | 0 | 25.3K | −25.3K | −$8.4K |
| 2026-06-16 | 0 | 29.0K | −29.0K | −$9.8K |
| 2026-06-17 | 0 | 32.0K | −32.0K | −$10.9K |
| 2026-06-18 | 0 | 22.6K | −22.6K | −$8.6K |
| 2026-06-19 | 0 | 25.5K | −25.5K | −$9.2K |
| 2026-06-20 | 0 | 25.4K | −25.4K | −$8.7K |
| 2026-06-21 | 0 | 21.2K | −21.2K | −$7.3K |
| 2026-06-22 | 0 | 27.6K | −27.6K | −$9.2K |
| 2026-06-23 | 0 | 24.6K | −24.6K | −$8.4K |
| 2026-06-24 | 0 | 25.0K | −25.0K | −$8.7K |
| 2026-06-25 | 0 | 9.8K | −9.8K | −$3.5K |


---

## CoW Protocol (COW)

**Price:** $0.14    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.14 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 604.9K | 🟢 −604.9K COW | −$94.1K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 7.40M | 🟢 −7.40M COW | −$1.07M | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 16.70M | 🟢 −16.70M COW | −$2.84M | per-day (100%) | 0.0000% |

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
| 2026-06-10 | 0 | 162.6K | −162.6K | −$22.6K |
| 2026-06-11 | 0 | 116.8K | −116.8K | −$15.8K |
| 2026-06-12 | 0 | 122.3K | −122.3K | −$17.4K |
| 2026-06-13 | 0 | 48.3K | −48.3K | −$6.9K |
| 2026-06-14 | 0 | 89.3K | −89.3K | −$13.3K |
| 2026-06-15 | 0 | 282.8K | −282.8K | −$44.5K |
| 2026-06-16 | 0 | 146.9K | −146.9K | −$23.3K |
| 2026-06-17 | 0 | 163.5K | −163.5K | −$26.2K |
| 2026-06-18 | 0 | 177.1K | −177.1K | −$28.4K |
| 2026-06-20 | 0 | 54.1K | −54.1K | −$8.4K |
| 2026-06-21 | 0 | 39.4K | −39.4K | −$6.2K |
| 2026-06-22 | 0 | 96.6K | −96.6K | −$15.2K |
| 2026-06-23 | 0 | 160.5K | −160.5K | −$25.2K |
| 2026-06-24 | 0 | 254.3K | −254.3K | −$39.1K |


---
