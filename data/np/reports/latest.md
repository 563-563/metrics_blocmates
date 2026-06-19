# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-06-19T12:23:29.256Z
**As-of:** 2026-06-19

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $66.98    **Circulating:** 512.72M HYPE    **AF balance:** 45.31M HYPE    **Total staked:** 436.92M HYPE (85.2% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 8.0K | 🟢 −8.0K HYPE | −$537.3K | today @ $66.98 | -0.0008% |
| 7d | 7/7d | 0 | 103.8K | 🟢 −2.74M HYPE | −$183.54M | today @ $66.98 | -0.2740% |
| 30d | 30/30d | 17.45M | 219.3K | 🟢 −5.46M HYPE | −$365.23M | per-day (7%) | -0.5455% |
| 90d | 90/90d | 52.34M | 2.06M | 🔴 +714.8K HYPE | −$120.72M | per-day (69%) | 0.0715% |

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
| 2026-06-06 | 9.92M | 1.2K | +586.1K | +$39.26M |
| 2026-06-07 | 0 | 4.8K | −643.8K | −$43.12M |
| 2026-06-08 | 0 | 2.4K | −838.1K | −$56.14M |
| 2026-06-09 | 0 | 1.7K | −1.7K | −$112.8K |
| 2026-06-10 | 0 | 3.4K | −3.4K | −$229.3K |
| 2026-06-11 | 0 | 3.3K | −291.7K | −$19.54M |
| 2026-06-12 | 0 | 504 | −504 | −$33.7K |
| 2026-06-13 | 0 | 3.1K | −298.4K | −$19.98M |
| 2026-06-14 | 0 | 2.2K | −556.9K | −$37.30M |
| 2026-06-15 | 0 | 11.1K | −140.0K | −$9.38M |
| 2026-06-16 | 0 | 24.5K | −792.1K | −$53.06M |
| 2026-06-17 | 0 | 27.6K | −228.3K | −$15.29M |
| 2026-06-18 | 0 | 27.2K | −716.5K | −$47.99M |
| 2026-06-19 | 0 | 8.0K | −8.0K | −$537.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-29 | 7.53M | $504.45M |
| 2026-07-06 | 9.92M | $664.22M |
| 2026-07-29 | 7.53M | $504.45M |
| 2026-08-06 | 9.92M | $664.22M |
| 2026-08-29 | 7.53M | $504.45M |
| 2026-09-06 | 9.92M | $664.22M |
| 2026-09-29 | 7.53M | $504.45M |
| 2026-10-06 | 9.92M | $664.22M |


---

## Aave (AAVE)

**Price:** $72.39    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −85 AAVE | −$6.2K | today @ $72.39 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −732 AAVE | −$53.0K | today @ $72.39 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −36.9K AAVE | −$2.67M | today @ $72.39 | 0.0000% |
| 90d | ⚠ 26/90d partial | 0 | 21.8K | 🟢 −58.7K AAVE | −$4.25M | today @ $72.39 | 0.0000% |

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
| 2026-06-06 | 0 | 0 | 0 | $0 |
| 2026-06-07 | 0 | 0 | −26.5K | −$1.92M |
| 2026-06-08 | 0 | 0 | 0 | $0 |
| 2026-06-09 | 0 | 0 | −24 | −$1.7K |
| 2026-06-10 | 0 | 0 | −4 | −$314.89 |
| 2026-06-11 | 0 | 0 | 0 | $0 |
| 2026-06-12 | 0 | 0 | 0 | $0 |
| 2026-06-13 | 0 | 0 | −97 | −$7.0K |
| 2026-06-14 | 0 | 0 | 0 | $0 |
| 2026-06-15 | 0 | 0 | −0 | −$4.58 |
| 2026-06-16 | 0 | 0 | −543 | −$39.3K |
| 2026-06-17 | 0 | 0 | −7 | −$496.74 |
| 2026-06-18 | 0 | 0 | 0 | $0 |
| 2026-06-19 | 0 | 0 | −85 | −$6.2K |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −2.78M SKY | −$161.0K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −5.00M SKY | −$290.1K | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −5.00M SKY | −$290.1K | today @ $0.06 | 0.0000% |

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
| 2026-06-06 | 0 | 0 | 0 | $0 |
| 2026-06-07 | 0 | 0 | 0 | $0 |
| 2026-06-08 | 0 | 0 | −270.8K | −$15.7K |
| 2026-06-09 | 0 | 0 | 0 | $0 |
| 2026-06-10 | 0 | 0 | −5.2K | −$302.99 |
| 2026-06-11 | 0 | 0 | −16.1K | −$933.55 |
| 2026-06-12 | 0 | 0 | −1.7K | −$96.26 |
| 2026-06-13 | 0 | 0 | −2.59M | −$150.1K |
| 2026-06-14 | 0 | 0 | −163.4K | −$9.5K |
| 2026-06-15 | 0 | 0 | −1.9K | −$108.29 |
| 2026-06-16 | 0 | 0 | −2.9K | −$169.17 |
| 2026-06-17 | 0 | 0 | −1.9K | −$110.66 |
| 2026-06-18 | 0 | 0 | −18.9K | −$1.1K |
| 2026-06-19 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.53    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.53 | 0.0000% |
| 7d | 6/7d | 0 | 281.7K | 🟢 −281.7K LIT | −$476.0K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.90M | 🟢 −1.90M LIT | −$2.74M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 6.34M | 🟢 −6.34M LIT | −$6.98M | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 156.1K | −156.1K | −$230.6K |
| 2026-06-06 | 0 | 68.9K | −68.9K | −$103.0K |
| 2026-06-07 | 0 | 59.2K | −59.2K | −$84.5K |
| 2026-06-08 | 0 | 103.2K | −103.2K | −$145.0K |
| 2026-06-09 | 0 | 68.5K | −68.5K | −$99.9K |
| 2026-06-10 | 0 | 71.1K | −71.1K | −$112.9K |
| 2026-06-11 | 0 | 56.7K | −56.7K | −$79.5K |
| 2026-06-12 | 0 | 51.1K | −51.1K | −$79.5K |
| 2026-06-13 | 0 | 25.7K | −25.7K | −$39.5K |
| 2026-06-14 | 0 | 25.1K | −25.1K | −$40.9K |
| 2026-06-15 | 0 | 59.6K | −59.6K | −$99.7K |
| 2026-06-16 | 0 | 49.5K | −49.5K | −$83.8K |
| 2026-06-17 | 0 | 73.1K | −73.1K | −$127.0K |
| 2026-06-18 | 0 | 48.7K | −48.7K | −$85.1K |


---

## Morpho (MORPHO)

**Price:** $1.90    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$185.0K | today @ $1.90 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.29M | today @ $1.90 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.55M | today @ $1.90 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$16.65M | today @ $1.90 | 0.0000% |

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
| 2026-06-06 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-07 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-08 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-09 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-10 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-11 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-12 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-13 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-14 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-15 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-16 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-17 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-18 | 202.7K | 0 | +97.4K | +$185.0K |
| 2026-06-19 | 202.7K | 0 | +97.4K | +$185.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 202.7K | $385.1K |
| 2026-06-21 | 202.7K | $385.1K |
| 2026-06-22 | 202.7K | $385.1K |
| 2026-06-23 | 202.7K | $385.1K |
| 2026-06-24 | 202.7K | $385.1K |
| 2026-06-25 | 202.7K | $385.1K |
| 2026-06-26 | 202.7K | $385.1K |
| 2026-06-27 | 202.7K | $385.1K |


---

## Pendle (PENDLE)

**Price:** $1.35    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.35 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.35 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.35 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.35 | 0.0000% |

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

**Price:** $0.72    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$155.3K | today @ $0.72 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$1.09M | today @ $0.72 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$4.66M | today @ $0.72 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$13.98M | today @ $0.72 | 0.0000% |

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
| 2026-06-06 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-07 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-08 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-09 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-10 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-11 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-12 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-13 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-14 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-15 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-16 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-17 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-18 | 626.2K | 0 | +214.3K | +$155.3K |
| 2026-06-19 | 626.2K | 0 | +214.3K | +$155.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 626.2K | $453.9K |
| 2026-06-21 | 626.2K | $453.9K |
| 2026-06-22 | 626.2K | $453.9K |
| 2026-06-23 | 626.2K | $453.9K |
| 2026-06-24 | 626.2K | $453.9K |
| 2026-06-25 | 626.2K | $453.9K |
| 2026-06-26 | 626.2K | $453.9K |
| 2026-06-27 | 626.2K | $453.9K |


---

## Jupiter (JUP)

**Price:** $0.18    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 141 | 🟢 −141 JUP | −$26.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 2.51M | 🟢 −2.51M JUP | −$459.0K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 12.91M | 🔴 +2.64M JUP | +$727.8K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 38.76M | 🔴 +7.90M JUP | +$1.37M | per-day (100%) | 0.0000% |

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
| 2026-06-06 | 0 | 404.3K | −404.3K | −$63.5K |
| 2026-06-07 | 0 | 558.5K | −558.5K | −$85.3K |
| 2026-06-08 | 0 | 402.3K | −402.3K | −$62.8K |
| 2026-06-09 | 0 | 469.3K | −469.3K | −$74.5K |
| 2026-06-10 | 0 | 435.5K | −435.5K | −$67.5K |
| 2026-06-11 | 0 | 612.1K | −612.1K | −$90.1K |
| 2026-06-12 | 0 | 504.5K | −504.5K | −$81.6K |
| 2026-06-13 | 0 | 357.2K | −357.2K | −$59.5K |
| 2026-06-14 | 0 | 337.6K | −337.6K | −$58.5K |
| 2026-06-15 | 0 | 508.8K | −508.8K | −$91.1K |
| 2026-06-16 | 0 | 375.1K | −375.1K | −$71.7K |
| 2026-06-17 | 0 | 475.9K | −475.9K | −$92.0K |
| 2026-06-18 | 0 | 454.2K | −454.2K | −$86.1K |
| 2026-06-19 | 0 | 141 | −141 | −$26.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-27 | 53.47M | $9.88M |
| 2026-07-27 | 53.47M | $9.88M |
| 2026-08-27 | 53.47M | $9.88M |
| 2026-09-27 | 53.47M | $9.88M |
| 2026-10-27 | 53.47M | $9.88M |
| 2026-11-27 | 53.47M | $9.88M |
| 2026-12-27 | 53.47M | $9.88M |
| 2027-01-27 | 53.47M | $9.88M |


---

## Fluid (FLUID)

**Price:** $0.99    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$2.7K | today @ $0.99 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$19.0K | today @ $0.99 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$230.4K | today @ $0.99 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$691.1K | today @ $0.99 | 0.0000% |

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
| 2026-06-06 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-07 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-08 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-09 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-10 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-11 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-12 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-13 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-14 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-15 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-16 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-17 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-18 | 9.1K | 0 | +2.7K | +$2.7K |
| 2026-06-19 | 9.1K | 0 | +2.7K | +$2.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 9.1K | $9.1K |
| 2026-06-21 | 9.1K | $9.1K |
| 2026-06-22 | 9.1K | $9.1K |
| 2026-06-23 | 9.1K | $9.1K |
| 2026-06-24 | 9.1K | $9.1K |
| 2026-06-25 | 9.1K | $9.1K |
| 2026-06-26 | 9.1K | $9.1K |
| 2026-06-27 | 9.1K | $9.1K |


---

## Collector Crypt (CARDS)

**Price:** $0.30    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.30 | 0.0000% |
| 7d | 6/7d | 0 | 15.56M | 🟢 −15.56M CARDS | −$3.86M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 14.25M | 61.23M | 🟢 −49.84M CARDS | −$9.06M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 42.76M | 265.50M | 🟢 −231.32M CARDS | −$20.63M | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 1.37M | −1.37M | −$247.8K |
| 2026-06-06 | 0 | 1.14M | −1.14M | −$175.6K |
| 2026-06-07 | 0 | 1.56M | −1.56M | −$250.1K |
| 2026-06-08 | 0 | 2.37M | −2.37M | −$433.0K |
| 2026-06-09 | 0 | 1.68M | −1.68M | −$316.8K |
| 2026-06-10 | 0 | 3.75M | −3.75M | −$703.7K |
| 2026-06-11 | 0 | 4.85M | −4.85M | −$793.0K |
| 2026-06-12 | 0 | 1.79M | −1.79M | −$429.5K |
| 2026-06-13 | 0 | 2.39M | −2.39M | −$547.3K |
| 2026-06-14 | 0 | 1.36M | −1.36M | −$384.2K |
| 2026-06-15 | 0 | 3.65M | −3.65M | −$977.9K |
| 2026-06-16 | 0 | 3.03M | −3.03M | −$743.6K |
| 2026-06-17 | 0 | 2.55M | −2.55M | −$599.9K |
| 2026-06-18 | 0 | 2.58M | −2.58M | −$605.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 14.25M | $4.27M |
| 2026-08-01 | 14.25M | $4.27M |
| 2026-09-01 | 44.67M | $13.37M |
| 2026-10-01 | 44.67M | $13.37M |
| 2026-11-01 | 44.67M | $13.37M |
| 2026-12-01 | 44.67M | $13.37M |
| 2027-01-01 | 44.67M | $13.37M |
| 2027-02-01 | 44.67M | $13.37M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PUMP | $0 | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 0 | 1.67B | 🟢 −1.67B PUMP | −$2.55M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 10.00B | 7.36B | 🟢 −4.36B PUMP | −$7.68M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 30.00B | 33.35B | 🟢 −24.35B PUMP | −$42.57M | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 191.79M | −191.79M | −$316.2K |
| 2026-06-06 | 0 | 188.67M | −188.67M | −$266.7K |
| 2026-06-07 | 0 | 206.14M | −206.14M | −$293.3K |
| 2026-06-08 | 0 | 243.80M | −243.80M | −$371.4K |
| 2026-06-09 | 0 | 164.64M | −164.64M | −$267.1K |
| 2026-06-10 | 0 | 286.00M | −286.00M | −$435.0K |
| 2026-06-11 | 0 | 311.53M | −311.53M | −$427.5K |
| 2026-06-12 | 10.00B | 298.51M | +2.70B | +$3.93M |
| 2026-06-13 | 0 | 234.17M | −234.17M | −$352.4K |
| 2026-06-14 | 0 | 239.33M | −239.33M | −$368.3K |
| 2026-06-15 | 0 | 294.48M | −294.48M | −$463.6K |
| 2026-06-16 | 0 | 326.91M | −326.91M | −$509.4K |
| 2026-06-17 | 0 | 286.31M | −286.31M | −$431.3K |
| 2026-06-18 | 0 | 287.45M | −287.45M | −$423.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 359.91M | $493.2K |
| 2026-07-02 | 359.91M | $493.2K |
| 2026-07-03 | 359.91M | $493.2K |
| 2026-07-04 | 359.91M | $493.2K |
| 2026-07-05 | 359.91M | $493.2K |
| 2026-07-06 | 359.91M | $493.2K |
| 2026-07-07 | 359.91M | $493.2K |
| 2026-07-08 | 359.91M | $493.2K |


---

## LayerZero (ZRO)

**Price:** $0.95    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.95 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.95 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 244.7K | 🟢 −244.7K ZRO | −$295.2K | per-day (100%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 47.26M | 544.1K | 🔴 +22.38M ZRO | +$20.92M | per-day (67%) | 0.0000% |

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
| 2025-12-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-01-15 | 0 | 285.6K | −285.6K | −$474.9K |
| 2026-01-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$10.84M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 23.63M | $22.35M |
| 2026-07-20 | 23.63M | $22.35M |
| 2026-08-20 | 23.63M | $22.35M |
| 2026-09-20 | 23.63M | $22.35M |
| 2026-10-20 | 23.63M | $22.35M |
| 2026-11-20 | 23.63M | $22.35M |
| 2026-12-20 | 23.63M | $22.35M |
| 2027-01-20 | 23.63M | $22.35M |


---

## Ethena (ENA)

**Price:** $0.09    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$356.0K | today @ $0.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.49M | today @ $0.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.68M | today @ $0.09 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$32.04M | today @ $0.09 | 0.0000% |

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
| 2026-06-06 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-07 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-08 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-09 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-10 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-11 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-12 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-13 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-14 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-15 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-16 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-17 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-18 | 10.75M | 0 | +4.11M | +$356.0K |
| 2026-06-19 | 10.75M | 0 | +4.11M | +$356.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 10.75M | $930.9K |
| 2026-06-21 | 10.75M | $930.9K |
| 2026-06-22 | 10.75M | $930.9K |
| 2026-06-23 | 10.75M | $930.9K |
| 2026-06-24 | 10.75M | $930.9K |
| 2026-06-25 | 10.75M | $930.9K |
| 2026-06-26 | 10.75M | $930.9K |
| 2026-06-27 | 10.75M | $930.9K |


---

## Aerodrome (AERO)

**Price:** $0.45    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.45 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.45 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.45 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.45 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$8.8K | today @ $0.11 | 0.0000% |
| 7d | 6/7d | 1.33M | 260.2K | 🔴 +278.3K DYDX | +$33.2K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 885.8K | 🔴 +1.42M DYDX | +$213.1K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 9.66M | 5.61M | 🟢 −1.69M DYDX | −$106.2K | per-day (99%) | 0.0000% |

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
| 2026-06-06 | 189.4K | 35.0K | +41.9K | +$5.8K |
| 2026-06-07 | 189.4K | 23.2K | +53.7K | +$7.2K |
| 2026-06-08 | 189.4K | 18.6K | +58.4K | +$8.4K |
| 2026-06-09 | 189.4K | 25.4K | +51.6K | +$7.1K |
| 2026-06-10 | 189.4K | 40.2K | +36.8K | +$4.7K |
| 2026-06-11 | 189.4K | 73.6K | +3.3K | +$379.54 |
| 2026-06-12 | 189.4K | 25.3K | +51.6K | +$6.2K |
| 2026-06-13 | 189.4K | 5.3K | +71.7K | +$8.6K |
| 2026-06-14 | 189.4K | 13.8K | +63.1K | +$7.6K |
| 2026-06-15 | 189.4K | 53.4K | +23.5K | +$2.9K |
| 2026-06-16 | 189.4K | 48.2K | +28.8K | +$3.5K |
| 2026-06-17 | 189.4K | 36.1K | +40.8K | +$5.0K |
| 2026-06-18 | 189.4K | 103.4K | −26.5K | −$3.1K |
| 2026-06-19 | 189.4K | 0 | +76.9K | +$8.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 189.4K | $21.7K |
| 2026-06-21 | 189.4K | $21.7K |
| 2026-06-22 | 189.4K | $21.7K |
| 2026-06-23 | 189.4K | $21.7K |
| 2026-06-24 | 189.4K | $21.7K |
| 2026-06-25 | 189.4K | $21.7K |
| 2026-06-26 | 189.4K | $21.7K |
| 2026-06-27 | 189.4K | $21.7K |


---

## Meteora (MET)

**Price:** $0.13    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$14.1K | today @ $0.13 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$98.8K | today @ $0.13 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$423.3K | today @ $0.13 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$1.27M | today @ $0.13 | 0.0000% |

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
| 2026-06-06 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-07 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-08 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-09 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-10 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-11 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-12 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-13 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-14 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-15 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-16 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-17 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-18 | 291.3K | 0 | +110.1K | +$14.1K |
| 2026-06-19 | 291.3K | 0 | +110.1K | +$14.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 291.3K | $37.3K |
| 2026-06-21 | 291.3K | $37.3K |
| 2026-06-22 | 291.3K | $37.3K |
| 2026-06-23 | 291.3K | $37.3K |
| 2026-06-24 | 291.3K | $37.3K |
| 2026-06-25 | 291.3K | $37.3K |
| 2026-06-26 | 291.3K | $37.3K |
| 2026-06-27 | 291.3K | $37.3K |


---

## Sanctum (CLOUD)

**Price:** $0.01    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$1.7K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$11.9K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$51.0K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$153.1K | today @ $0.01 | 0.0000% |

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
| 2026-06-06 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-07 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-08 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-09 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-10 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-11 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-12 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-13 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-14 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-15 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-16 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-17 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-18 | 347.8K | 0 | +118.1K | +$1.7K |
| 2026-06-19 | 347.8K | 0 | +118.1K | +$1.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 347.8K | $5.0K |
| 2026-06-21 | 347.8K | $5.0K |
| 2026-06-22 | 347.8K | $5.0K |
| 2026-06-23 | 347.8K | $5.0K |
| 2026-06-24 | 347.8K | $5.0K |
| 2026-06-25 | 347.8K | $5.0K |
| 2026-06-26 | 347.8K | $5.0K |
| 2026-06-27 | 347.8K | $5.0K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$4.8K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$33.9K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$145.5K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 70.00M | 0 | 🔴 +36.86M DRIFT | +$590.5K | today @ $0.02 | 0.0000% |

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
| 2026-06-06 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-07 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-08 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-09 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-10 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-11 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-12 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-13 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-14 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-15 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-16 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-17 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-18 | 644.2K | 0 | +302.8K | +$4.8K |
| 2026-06-19 | 644.2K | 0 | +302.8K | +$4.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 644.2K | $10.3K |
| 2026-06-21 | 644.2K | $10.3K |
| 2026-06-22 | 644.2K | $10.3K |
| 2026-06-23 | 644.2K | $10.3K |
| 2026-06-24 | 644.2K | $10.3K |
| 2026-06-25 | 644.2K | $10.3K |
| 2026-06-26 | 644.2K | $10.3K |
| 2026-06-27 | 644.2K | $10.3K |


---

## Uniswap (UNI)

**Price:** $3.04    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $3.04 | 0.0000% |
| 7d | 6/7d | 0 | 301.7K | 🟢 −301.7K UNI | −$865.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.73M | 🟢 −1.73M UNI | −$4.92M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.24M | 🟢 −4.24M UNI | −$13.40M | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 172.6K | −172.6K | −$457.0K |
| 2026-06-06 | 0 | 86.3K | −86.3K | −$211.9K |
| 2026-06-07 | 0 | 68.8K | −68.8K | −$169.3K |
| 2026-06-08 | 0 | 70.6K | −70.6K | −$181.0K |
| 2026-06-09 | 0 | 59.2K | −59.2K | −$148.7K |
| 2026-06-10 | 0 | 63.8K | −63.8K | −$158.1K |
| 2026-06-11 | 0 | 62.5K | −62.5K | −$149.6K |
| 2026-06-12 | 0 | 42.1K | −42.1K | −$104.9K |
| 2026-06-13 | 0 | 26.6K | −26.6K | −$66.5K |
| 2026-06-14 | 0 | 38.5K | −38.5K | −$98.4K |
| 2026-06-15 | 0 | 63.8K | −63.8K | −$164.8K |
| 2026-06-16 | 0 | 64.9K | −64.9K | −$184.2K |
| 2026-06-17 | 0 | 56.7K | −56.7K | −$186.9K |
| 2026-06-18 | 0 | 51.2K | −51.2K | −$164.9K |


---

## Raydium (RAY)

**Price:** $0.59    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 32.4K | 🟢 −32.4K RAY | −$19.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 212.6K | 🟢 −212.6K RAY | −$130.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 850.6K | 🟢 −850.6K RAY | −$553.5K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.15M | 🟢 −3.15M RAY | −$2.15M | per-day (100%) | 0.0000% |

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
| 2026-06-06 | 0 | 27.6K | −27.6K | −$15.6K |
| 2026-06-07 | 0 | 26.2K | −26.2K | −$14.6K |
| 2026-06-08 | 0 | 34.4K | −34.4K | −$20.1K |
| 2026-06-09 | 0 | 37.8K | −37.8K | −$22.4K |
| 2026-06-10 | 0 | 36.1K | −36.1K | −$20.8K |
| 2026-06-11 | 0 | 34.0K | −34.0K | −$19.1K |
| 2026-06-12 | 0 | 33.1K | −33.1K | −$19.4K |
| 2026-06-13 | 0 | 22.2K | −22.2K | −$13.1K |
| 2026-06-14 | 0 | 22.4K | −22.4K | −$13.7K |
| 2026-06-15 | 0 | 36.4K | −36.4K | −$22.6K |
| 2026-06-16 | 0 | 32.2K | −32.2K | −$20.4K |
| 2026-06-17 | 0 | 32.2K | −32.2K | −$20.0K |
| 2026-06-18 | 0 | 34.8K | −34.8K | −$21.4K |
| 2026-06-19 | 0 | 32.4K | −32.4K | −$19.0K |


---

## Euler (EUL)

**Price:** $1.00    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $1.00 | 0.0000% |
| 90d | ⚠ 24/90d partial | 0 | 73.0K | 🟢 −73.0K EUL | −$67.3K | per-day (100%) | 0.0000% |

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

**Price:** $0.56    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.56 | 0.0000% |
| 7d | 6/7d | 0 | 61.1K | 🟢 −61.1K GNS | −$36.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 500.8K | 🟢 −500.8K GNS | −$251.5K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 1.05M | 🟢 −1.05M GNS | −$607.1K | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 30.8K | −30.8K | −$15.2K |
| 2026-06-06 | 0 | 9.8K | −9.8K | −$4.5K |
| 2026-06-07 | 0 | 53.2K | −53.2K | −$24.5K |
| 2026-06-08 | 0 | 23.8K | −23.8K | −$11.4K |
| 2026-06-09 | 0 | 29.7K | −29.7K | −$14.7K |
| 2026-06-10 | 0 | 37.7K | −37.7K | −$18.8K |
| 2026-06-11 | 0 | 12.1K | −12.1K | −$6.3K |
| 2026-06-12 | 0 | 19.4K | −19.4K | −$10.9K |
| 2026-06-13 | 0 | 4.9K | −4.9K | −$3.0K |
| 2026-06-14 | 0 | 5.5K | −5.5K | −$3.3K |
| 2026-06-15 | 0 | 17.6K | −17.6K | −$10.6K |
| 2026-06-16 | 0 | 13.9K | −13.9K | −$8.4K |
| 2026-06-17 | 0 | 12.0K | −12.0K | −$7.1K |
| 2026-06-18 | 0 | 7.1K | −7.1K | −$4.1K |


---

## Orca (ORCA)

**Price:** $1.20    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 2.5K | 🟢 −2.5K ORCA | −$3.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 17.6K | 🟢 −17.6K ORCA | −$20.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 73.9K | 🟢 −73.9K ORCA | −$86.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 217.9K | 🟢 −217.9K ORCA | −$242.2K | per-day (100%) | 0.0000% |

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
| 2026-06-06 | 0 | 3.0K | −3.0K | −$3.0K |
| 2026-06-07 | 0 | 3.0K | −3.0K | −$3.1K |
| 2026-06-08 | 0 | 2.9K | −2.9K | −$3.0K |
| 2026-06-09 | 0 | 2.7K | −2.7K | −$2.8K |
| 2026-06-10 | 0 | 3.1K | −3.1K | −$3.1K |
| 2026-06-11 | 0 | 2.6K | −2.6K | −$2.5K |
| 2026-06-12 | 0 | 2.8K | −2.8K | −$2.8K |
| 2026-06-13 | 0 | 1.3K | −1.3K | −$1.6K |
| 2026-06-14 | 0 | 1.4K | −1.4K | −$1.6K |
| 2026-06-15 | 0 | 3.2K | −3.2K | −$3.6K |
| 2026-06-16 | 0 | 3.3K | −3.3K | −$3.8K |
| 2026-06-17 | 0 | 3.4K | −3.4K | −$3.9K |
| 2026-06-18 | 0 | 2.5K | −2.5K | −$3.1K |
| 2026-06-19 | 0 | 2.5K | −2.5K | −$3.0K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 96.3K | 🟢 −96.3K MNDE | −$1.8K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 742.7K | 🟢 −742.7K MNDE | −$13.6K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 4.31M | 🟢 −4.31M MNDE | −$82.3K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 19.78M | 🟢 −19.78M MNDE | −$380.5K | per-day (100%) | 0.0000% |

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
| 2026-06-06 | 0 | 117.3K | −117.3K | −$2.2K |
| 2026-06-07 | 0 | 124.9K | −124.9K | −$2.3K |
| 2026-06-08 | 0 | 121.1K | −121.1K | −$2.3K |
| 2026-06-09 | 0 | 120.0K | −120.0K | −$2.2K |
| 2026-06-10 | 0 | 105.5K | −105.5K | −$1.9K |
| 2026-06-11 | 0 | 112.1K | −112.1K | −$2.1K |
| 2026-06-12 | 0 | 106.8K | −106.8K | −$2.0K |
| 2026-06-13 | 0 | 110.2K | −110.2K | −$2.0K |
| 2026-06-14 | 0 | 108.6K | −108.6K | −$2.0K |
| 2026-06-15 | 0 | 115.6K | −115.6K | −$2.1K |
| 2026-06-16 | 0 | 108.2K | −108.2K | −$2.0K |
| 2026-06-17 | 0 | 106.9K | −106.9K | −$1.9K |
| 2026-06-18 | 0 | 97.1K | −97.1K | −$1.8K |
| 2026-06-19 | 0 | 96.3K | −96.3K | −$1.8K |


---

## ether.fi (ETHFI)

**Price:** $0.34    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 12.3K | 🟢 −12.3K ETHFI | −$4.1K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 176.5K | 🟢 −176.5K ETHFI | −$59.2K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 816.7K | 🟢 −816.7K ETHFI | −$279.8K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.44M | 🟢 −2.44M ETHFI | −$1.00M | per-day (100%) | 0.0000% |

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
| 2026-06-06 | 0 | 29.5K | −29.5K | −$8.4K |
| 2026-06-07 | 0 | 26.1K | −26.1K | −$7.5K |
| 2026-06-08 | 0 | 33.6K | −33.6K | −$10.1K |
| 2026-06-09 | 0 | 31.0K | −31.0K | −$9.5K |
| 2026-06-10 | 0 | 27.6K | −27.6K | −$8.4K |
| 2026-06-11 | 0 | 31.4K | −31.4K | −$9.2K |
| 2026-06-12 | 0 | 26.5K | −26.5K | −$8.1K |
| 2026-06-13 | 0 | 28.3K | −28.3K | −$8.8K |
| 2026-06-14 | 0 | 27.1K | −27.1K | −$8.6K |
| 2026-06-15 | 0 | 25.3K | −25.3K | −$8.4K |
| 2026-06-16 | 0 | 29.0K | −29.0K | −$9.8K |
| 2026-06-17 | 0 | 32.0K | −32.0K | −$10.9K |
| 2026-06-18 | 0 | 22.6K | −22.6K | −$8.6K |
| 2026-06-19 | 0 | 12.3K | −12.3K | −$4.1K |


---

## CoW Protocol (COW)

**Price:** $0.15    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.15 | 0.0000% |
| 7d | 6/7d | 0 | 907.9K | 🟢 −907.9K COW | −$142.5K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 7.84M | 🟢 −7.84M COW | −$1.15M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 17.02M | 🟢 −17.02M COW | −$2.94M | per-day (100%) | 0.0000% |

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
| 2026-06-05 | 0 | 1.04M | −1.04M | −$145.2K |
| 2026-06-06 | 0 | 917.3K | −917.3K | −$122.5K |
| 2026-06-07 | 0 | 891.4K | −891.4K | −$117.9K |
| 2026-06-08 | 0 | 581.4K | −581.4K | −$81.4K |
| 2026-06-09 | 0 | 230.3K | −230.3K | −$32.4K |
| 2026-06-10 | 0 | 162.6K | −162.6K | −$22.6K |
| 2026-06-11 | 0 | 116.8K | −116.8K | −$15.8K |
| 2026-06-12 | 0 | 122.3K | −122.3K | −$17.4K |
| 2026-06-13 | 0 | 48.3K | −48.3K | −$6.9K |
| 2026-06-14 | 0 | 89.3K | −89.3K | −$13.3K |
| 2026-06-15 | 0 | 282.8K | −282.8K | −$44.5K |
| 2026-06-16 | 0 | 146.9K | −146.9K | −$23.3K |
| 2026-06-17 | 0 | 163.5K | −163.5K | −$26.2K |
| 2026-06-18 | 0 | 177.1K | −177.1K | −$28.4K |


---
