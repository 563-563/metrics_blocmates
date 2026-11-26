# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-11-26T13:55:34.255Z
**As-of:** 2026-11-26

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $61.30    **Circulating:** 599.96M HYPE    **AF balance:** 49.35M HYPE    **Total staked:** 437.22M HYPE (72.9% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 10.8K | 🟢 −22.2K HYPE | −$1.36M | today @ $61.30 | -0.0022% |
| 7d | 7/7d | 0 | 120.1K | 🟢 −313.9K HYPE | −$19.24M | today @ $61.30 | -0.0314% |
| 30d | 30/30d | 17.45M | 330.3K | 🔴 +1.95M HYPE | +$119.68M | today @ $61.30 | 0.1952% |
| 90d | 90/90d | 52.34M | 685.1K | 🟢 −5.12M HYPE | −$313.85M | today @ $61.30 | -0.5120% |

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
| 2026-11-13 | 0 | 1.3K | −154.2K | −$9.45M |
| 2026-11-14 | 0 | 8.4K | −8.4K | −$513.4K |
| 2026-11-15 | 0 | 9.7K | −9.7K | −$597.4K |
| 2026-11-16 | 0 | 20.5K | −20.5K | −$1.26M |
| 2026-11-17 | 0 | 11.4K | −65.2K | −$4.00M |
| 2026-11-18 | 0 | 23.9K | −23.9K | −$1.47M |
| 2026-11-19 | 0 | 10.7K | −191.2K | −$11.72M |
| 2026-11-20 | 0 | 14.6K | −14.6K | −$893.9K |
| 2026-11-21 | 0 | 16.7K | −16.7K | −$1.02M |
| 2026-11-22 | 0 | 10.6K | −148.2K | −$9.09M |
| 2026-11-23 | 0 | 361 | −361 | −$22.1K |
| 2026-11-24 | 0 | 28.8K | −28.8K | −$1.77M |
| 2026-11-25 | 0 | 38.2K | −83.1K | −$5.09M |
| 2026-11-26 | 0 | 10.8K | −22.2K | −$1.36M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-29 | 7.53M | $461.67M |
| 2026-12-06 | 9.92M | $607.89M |
| 2026-12-29 | 7.53M | $461.67M |
| 2027-01-06 | 9.92M | $607.89M |
| 2027-01-29 | 7.53M | $461.67M |
| 2027-02-06 | 9.92M | $607.89M |
| 2027-03-01 | 7.53M | $461.67M |
| 2027-03-06 | 9.92M | $607.89M |


---

## Aave (AAVE)

**Price:** $95.15    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $95.15 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −20.7K AAVE | −$1.97M | today @ $95.15 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −26.3K AAVE | −$2.50M | today @ $95.15 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −68.3K AAVE | −$6.50M | today @ $95.15 | 0.0000% |

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
| 2026-10-13 | 0 | 0 | 0 | $0 |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −794 | −$75.5K |
| 2026-11-06 | 0 | 0 | 0 | $0 |
| 2026-11-07 | 0 | 0 | −337 | −$32.1K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | 0 | $0 |
| 2026-11-14 | 0 | 0 | −1.4K | −$136.7K |
| 2026-11-17 | 0 | 0 | −3.0K | −$281.1K |
| 2026-11-19 | 0 | 0 | 0 | $0 |
| 2026-11-21 | 0 | 0 | −20.7K | −$1.97M |
| 2026-11-25 | 0 | 0 | 0 | $0 |
| 2026-11-26 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.05    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −7.43M SKY | −$351.8K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −7.43M SKY | −$351.8K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −31.12M SKY | −$1.47M | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −136.07M SKY | −$6.44M | today @ $0.05 | 0.0000% |

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
| 2026-10-13 | 0 | 0 | −49.75M | −$2.35M |
| 2026-11-03 | 0 | 0 | 0 | $0 |
| 2026-11-04 | 0 | 0 | 0 | $0 |
| 2026-11-05 | 0 | 0 | −4.81M | −$227.5K |
| 2026-11-06 | 0 | 0 | −6.56M | −$310.6K |
| 2026-11-07 | 0 | 0 | −1.07M | −$50.7K |
| 2026-11-10 | 0 | 0 | 0 | $0 |
| 2026-11-13 | 0 | 0 | −1.34M | −$63.6K |
| 2026-11-14 | 0 | 0 | −497.7K | −$23.6K |
| 2026-11-17 | 0 | 0 | −5.69M | −$269.2K |
| 2026-11-19 | 0 | 0 | −3.71M | −$175.7K |
| 2026-11-21 | 0 | 0 | 0 | $0 |
| 2026-11-25 | 0 | 0 | 0 | $0 |
| 2026-11-26 | 0 | 0 | −7.43M | −$351.8K |


---

## Lighter (LIT)

**Price:** $2.48    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $2.48 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 297.0K | 🟢 −297.0K LIT | −$729.5K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 1.60M | 🟢 −1.60M LIT | −$4.71M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 3.03M | 🟢 −3.03M LIT | −$10.24M | per-day (100%) | 0.0000% |

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
| 2026-11-11 | 0 | 35.9K | −35.9K | −$124.4K |
| 2026-11-12 | 0 | 29.9K | −29.9K | −$97.5K |
| 2026-11-13 | 0 | 53.6K | −53.6K | −$172.3K |
| 2026-11-14 | 0 | 46.8K | −46.8K | −$152.0K |
| 2026-11-15 | 0 | 56.4K | −56.4K | −$162.4K |
| 2026-11-16 | 0 | 55.6K | −55.6K | −$157.4K |
| 2026-11-17 | 0 | 37.3K | −37.3K | −$110.8K |
| 2026-11-18 | 0 | 36.1K | −36.1K | −$104.3K |
| 2026-11-19 | 0 | 48.9K | −48.9K | −$133.1K |
| 2026-11-20 | 0 | 61.1K | −61.1K | −$168.5K |
| 2026-11-21 | 0 | 80.1K | −80.1K | −$188.6K |
| 2026-11-22 | 0 | 33.2K | −33.2K | −$77.4K |
| 2026-11-23 | 0 | 81.2K | −81.2K | −$194.5K |
| 2026-11-24 | 0 | 41.4K | −41.4K | −$100.4K |


---

## Morpho (MORPHO)

**Price:** $1.63    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$158.7K | today @ $1.63 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.42M | 0 | 🔴 +881.5K MORPHO | +$1.44M | today @ $1.63 | 0.0000% |
| 30d | ⚠ 0/30d partial | 7.08M | 0 | 🔴 +3.12M MORPHO | +$5.09M | today @ $1.63 | 0.0000% |
| 90d | ⚠ 0/90d partial | 19.24M | 0 | 🔴 +8.96M MORPHO | +$14.61M | today @ $1.63 | 0.0000% |

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
| 2026-11-13 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-14 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-15 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-16 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-17 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-18 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-19 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-20 | 1.20M | 0 | +297.4K | +$484.7K |
| 2026-11-21 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-22 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-23 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-24 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-25 | 202.7K | 0 | +97.4K | +$158.7K |
| 2026-11-26 | 202.7K | 0 | +97.4K | +$158.7K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 202.7K | $330.4K |
| 2026-11-28 | 202.7K | $330.4K |
| 2026-11-29 | 202.7K | $330.4K |
| 2026-11-30 | 202.7K | $330.4K |
| 2026-12-01 | 202.7K | $330.4K |
| 2026-12-02 | 202.7K | $330.4K |
| 2026-12-03 | 202.7K | $330.4K |
| 2026-12-04 | 202.7K | $330.4K |


---

## Pendle (PENDLE)

**Price:** $1.22    **Circulating:** 0 PENDLE    **AF balance:** 0 PENDLE    **Total staked:** 0 PENDLE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.22 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.22 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.22 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 PENDLE | $0 | today @ $1.22 | 0.0000% |

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

**Price:** $0.24    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$50.6K | today @ $0.24 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$354.5K | today @ $0.24 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$1.52M | today @ $0.24 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$4.56M | today @ $0.24 | 0.0000% |

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
| 2026-11-13 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-14 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-15 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-16 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-17 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-18 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-19 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-20 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-21 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-22 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-23 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-24 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-25 | 626.2K | 0 | +214.3K | +$50.6K |
| 2026-11-26 | 626.2K | 0 | +214.3K | +$50.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 626.2K | $148.0K |
| 2026-11-28 | 626.2K | $148.0K |
| 2026-11-29 | 626.2K | $148.0K |
| 2026-11-30 | 626.2K | $148.0K |
| 2026-12-01 | 626.2K | $148.0K |
| 2026-12-02 | 626.2K | $148.0K |
| 2026-12-03 | 626.2K | $148.0K |
| 2026-12-04 | 626.2K | $148.0K |


---

## Jupiter (JUP)

**Price:** $0.24    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 JUP | $0 | today @ $0.24 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 5.0K | 🟢 −5.0K JUP | −$1.1K | per-day (100%) | 0.0000% |
| 30d | 26/30d | 0 | 14.28M | 🟢 −14.28M JUP | −$3.67M | per-day (100%) | 0.0000% |
| 90d | 86/90d | 106.94M | 30.29M | 🔴 +812.2K JUP | +$1.59M | per-day (100%) | 0.0000% |

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
| 2026-11-20 | 0 | 913 | −913 | −$228.00 |
| 2026-11-21 | 0 | 958 | −958 | −$218.00 |
| 2026-11-22 | 0 | 2.1K | −2.1K | −$449.00 |
| 2026-11-23 | 0 | 1.1K | −1.1K | −$238.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 53.47M | $12.57M |
| 2026-12-27 | 53.47M | $12.57M |
| 2027-01-27 | 53.47M | $12.57M |
| 2027-02-27 | 53.47M | $12.57M |
| 2027-03-27 | 53.47M | $12.57M |
| 2027-04-27 | 53.47M | $12.57M |
| 2027-05-27 | 53.47M | $12.57M |
| 2027-06-27 | 53.47M | $12.57M |


---

## Fluid (FLUID)

**Price:** $1.51    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$4.1K | today @ $1.51 | 0.0000% |
| 7d | ⚠ 0/7d partial | 63.9K | 0 | 🔴 +19.2K FLUID | +$29.0K | today @ $1.51 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$350.6K | today @ $1.51 | 0.0000% |
| 90d | ⚠ 0/90d partial | 2.32M | 0 | 🔴 +696.6K FLUID | +$1.05M | today @ $1.51 | 0.0000% |

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
| 2026-11-13 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-14 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-15 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-16 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-17 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-18 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-19 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-20 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-21 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-22 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-23 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-24 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-25 | 9.1K | 0 | +2.7K | +$4.1K |
| 2026-11-26 | 9.1K | 0 | +2.7K | +$4.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 9.1K | $13.8K |
| 2026-11-28 | 9.1K | $13.8K |
| 2026-11-29 | 9.1K | $13.8K |
| 2026-11-30 | 9.1K | $13.8K |
| 2026-12-01 | 9.1K | $13.8K |
| 2026-12-02 | 9.1K | $13.8K |
| 2026-12-03 | 9.1K | $13.8K |
| 2026-12-04 | 9.1K | $13.8K |


---

## Collector Crypt (CARDS)

**Price:** $0.16    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.16 | 0.0000% |
| 7d | ⚠ 4/7d partial | 0 | 570.3K | 🟢 −570.3K CARDS | −$90.4K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 44.67M | 1.64M | 🔴 +10.29M CARDS | +$2.52M | per-day (100%) | 0.0000% |
| 90d | 75/90d | 134.02M | 64.52M | 🟢 −28.71M CARDS | −$2.86M | per-day (99%) | 0.0000% |

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
| 2026-11-20 | 0 | 47.8K | −47.8K | −$7.9K |
| 2026-11-21 | 0 | 16.7K | −16.7K | −$2.4K |
| 2026-11-22 | 0 | 17.1K | −17.1K | −$2.7K |
| 2026-11-23 | 0 | 488.7K | −488.7K | −$77.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-01 | 44.67M | $7.28M |
| 2027-01-01 | 44.67M | $7.28M |
| 2027-02-01 | 44.67M | $7.28M |
| 2027-03-01 | 44.67M | $7.28M |
| 2027-04-01 | 44.67M | $7.28M |
| 2027-05-01 | 44.67M | $7.28M |
| 2027-06-01 | 44.67M | $7.28M |
| 2027-07-01 | 44.67M | $7.28M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 359.91M | 0 | 🔴 +160.31M PUMP | +$422.8K | today @ $0.00 | 0.0000% |
| 7d | ⚠ 5/7d partial | 2.52B | 1.01B | 🔴 +111.03M PUMP | +$313.4K | per-day (71%) | 0.0000% |
| 30d | 28/30d | 20.80B | 4.83B | 🔴 +2.98B PUMP | +$10.47M | per-day (93%) | 0.0000% |
| 90d | 88/90d | 62.39B | 16.20B | 🔴 +7.23B PUMP | +$29.91M | per-day (98%) | 0.0000% |

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
| 2026-11-13 | 359.91M | 181.45M | −21.14M | −$73.6K |
| 2026-11-14 | 359.91M | 129.36M | +30.95M | +$106.7K |
| 2026-11-15 | 359.91M | 166.64M | −6.34M | −$18.5K |
| 2026-11-16 | 359.91M | 194.28M | −33.97M | −$100.9K |
| 2026-11-17 | 359.91M | 215.20M | −54.89M | −$155.6K |
| 2026-11-18 | 359.91M | 251.52M | −91.22M | −$257.0K |
| 2026-11-19 | 359.91M | 214.40M | −54.09M | −$140.5K |
| 2026-11-20 | 359.91M | 192.96M | −32.65M | −$86.3K |
| 2026-11-21 | 359.91M | 186.22M | −25.91M | −$62.8K |
| 2026-11-22 | 359.91M | 181.07M | −20.77M | −$48.8K |
| 2026-11-23 | 359.91M | 226.55M | −66.24M | −$172.2K |
| 2026-11-24 | 359.91M | 224.33M | −64.02M | −$162.0K |
| 2026-11-25 | 359.91M | 0 | +160.31M | +$422.8K |
| 2026-11-26 | 359.91M | 0 | +160.31M | +$422.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 359.91M | $949.2K |
| 2026-11-28 | 359.91M | $949.2K |
| 2026-11-29 | 359.91M | $949.2K |
| 2026-11-30 | 359.91M | $949.2K |
| 2026-12-01 | 359.91M | $949.2K |
| 2026-12-02 | 359.91M | $949.2K |
| 2026-12-03 | 359.91M | $949.2K |
| 2026-12-04 | 359.91M | $949.2K |


---

## LayerZero (ZRO)

**Price:** $1.11    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $1.11 | 0.0000% |
| 7d | ⚠ 0/7d partial | 23.63M | 0 | 🔴 +11.46M ZRO | +$12.72M | today @ $1.11 | 0.0000% |
| 30d | ⚠ 1/30d partial | 23.63M | 188.7K | 🔴 +11.27M ZRO | +$12.42M | per-day (50%) | 0.0000% |
| 90d | ⚠ 2/90d partial | 70.89M | 358.0K | 🔴 +34.03M ZRO | +$37.68M | per-day (40%) | 0.0000% |

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
| 2026-05-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-06-02 | 0 | 124.1K | −124.1K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |
| 2026-06-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-07-08 | 0 | 143.8K | −143.8K | −$134.5K |
| 2026-07-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-08-06 | 0 | 170.3K | −170.3K | −$131.6K |
| 2026-08-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-09-04 | 0 | 169.3K | −169.3K | −$191.1K |
| 2026-09-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-10-20 | 23.63M | 0 | +11.46M | +$12.72M |
| 2026-11-06 | 0 | 188.7K | −188.7K | −$300.3K |
| 2026-11-20 | 23.63M | 0 | +11.46M | +$12.72M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-12-20 | 23.63M | $26.23M |
| 2027-01-20 | 23.63M | $26.23M |
| 2027-02-20 | 23.63M | $26.23M |
| 2027-03-20 | 23.63M | $26.23M |
| 2027-04-20 | 23.63M | $26.23M |
| 2027-05-20 | 23.63M | $26.23M |
| 2027-06-20 | 23.63M | $26.23M |
| 2027-07-20 | 23.63M | $26.23M |


---

## Ethena (ENA)

**Price:** $0.10    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$420.0K | today @ $0.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.94M | today @ $0.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$12.60M | today @ $0.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$37.80M | today @ $0.10 | 0.0000% |

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
| 2026-11-13 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-14 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-15 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-16 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-17 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-18 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-19 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-20 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-21 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-22 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-23 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-24 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-25 | 10.75M | 0 | +4.11M | +$420.0K |
| 2026-11-26 | 10.75M | 0 | +4.11M | +$420.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 10.75M | $1.10M |
| 2026-11-28 | 10.75M | $1.10M |
| 2026-11-29 | 10.75M | $1.10M |
| 2026-11-30 | 10.75M | $1.10M |
| 2026-12-01 | 10.75M | $1.10M |
| 2026-12-02 | 10.75M | $1.10M |
| 2026-12-03 | 10.75M | $1.10M |
| 2026-12-04 | 10.75M | $1.10M |


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

**Price:** $0.07    **Circulating:** 0 DYDX    **AF balance:** 0 DYDX    **Total staked:** 0 DYDX

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 DYDX | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 522.9K | 🟢 −522.9K DYDX | −$37.3K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 2.46M | 🟢 −2.46M DYDX | −$221.8K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 378.8K | 6.31M | 🟢 −6.15M DYDX | −$687.6K | per-day (100%) | 0.0000% |

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
| 2026-11-11 | 0 | 41.1K | −41.1K | −$3.7K |
| 2026-11-12 | 0 | 131.6K | −131.6K | −$12.1K |
| 2026-11-13 | 0 | 81.4K | −81.4K | −$7.5K |
| 2026-11-14 | 0 | 79.5K | −79.5K | −$7.1K |
| 2026-11-15 | 0 | 160.8K | −160.8K | −$12.4K |
| 2026-11-16 | 0 | 93.9K | −93.9K | −$7.5K |
| 2026-11-17 | 0 | 86.1K | −86.1K | −$6.9K |
| 2026-11-18 | 0 | 71.1K | −71.1K | −$5.9K |
| 2026-11-19 | 0 | 22.7K | −22.7K | −$1.8K |
| 2026-11-20 | 0 | 48.4K | −48.4K | −$3.7K |
| 2026-11-21 | 0 | 75.6K | −75.6K | −$5.4K |
| 2026-11-22 | 0 | 74.4K | −74.4K | −$5.1K |
| 2026-11-23 | 0 | 113.8K | −113.8K | −$7.9K |
| 2026-11-24 | 0 | 210.8K | −210.8K | −$15.1K |


---

## Meteora (MET)

**Price:** $0.21    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$23.0K | today @ $0.21 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$161.0K | today @ $0.21 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$690.1K | today @ $0.21 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$2.07M | today @ $0.21 | 0.0000% |

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
| 2026-11-13 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-14 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-15 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-16 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-17 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-18 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-19 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-20 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-21 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-22 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-23 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-24 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-25 | 291.3K | 0 | +110.1K | +$23.0K |
| 2026-11-26 | 291.3K | 0 | +110.1K | +$23.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 291.3K | $60.8K |
| 2026-11-28 | 291.3K | $60.8K |
| 2026-11-29 | 291.3K | $60.8K |
| 2026-11-30 | 291.3K | $60.8K |
| 2026-12-01 | 291.3K | $60.8K |
| 2026-12-02 | 291.3K | $60.8K |
| 2026-12-03 | 291.3K | $60.8K |
| 2026-12-04 | 291.3K | $60.8K |


---

## Sanctum (CLOUD)

**Price:** $0.05    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$6.1K | today @ $0.05 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$42.5K | today @ $0.05 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$182.3K | today @ $0.05 | 0.0000% |
| 90d | ⚠ 0/90d partial | 46.30M | 0 | 🔴 +15.13M CLOUD | +$778.6K | today @ $0.05 | 0.0000% |

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
| 2026-11-13 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-14 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-15 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-16 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-17 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-18 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-19 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-20 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-21 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-22 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-23 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-24 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-25 | 347.8K | 0 | +118.1K | +$6.1K |
| 2026-11-26 | 347.8K | 0 | +118.1K | +$6.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 347.8K | $17.9K |
| 2026-11-28 | 347.8K | $17.9K |
| 2026-11-29 | 347.8K | $17.9K |
| 2026-11-30 | 347.8K | $17.9K |
| 2026-12-01 | 347.8K | $17.9K |
| 2026-12-02 | 347.8K | $17.9K |
| 2026-12-03 | 347.8K | $17.9K |
| 2026-12-04 | 347.8K | $17.9K |


---

## Drift (DRIFT)

**Price:** $0.01    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$2.9K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$20.1K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 19.33M | 0 | 🔴 +9.08M DRIFT | +$86.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 57.98M | 0 | 🔴 +27.25M DRIFT | +$258.8K | today @ $0.01 | 0.0000% |

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
| 2026-11-13 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-14 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-15 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-16 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-17 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-18 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-19 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-20 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-21 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-22 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-23 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-24 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-25 | 644.2K | 0 | +302.8K | +$2.9K |
| 2026-11-26 | 644.2K | 0 | +302.8K | +$2.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-11-27 | 644.2K | $6.1K |
| 2026-11-28 | 644.2K | $6.1K |
| 2026-11-29 | 644.2K | $6.1K |
| 2026-11-30 | 644.2K | $6.1K |
| 2026-12-01 | 644.2K | $6.1K |
| 2026-12-02 | 644.2K | $6.1K |
| 2026-12-03 | 644.2K | $6.1K |
| 2026-12-04 | 644.2K | $6.1K |


---

## Uniswap (UNI)

**Price:** $4.73    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $4.73 | 0.0000% |
| 7d | 6/7d | 0 | 290.1K | 🟢 −290.1K UNI | −$1.37M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.32M | 🟢 −1.32M UNI | −$8.05M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.62M | 🟢 −4.62M UNI | −$31.08M | per-day (100%) | 0.0000% |

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
| 2026-11-12 | 0 | 40.9K | −40.9K | −$254.7K |
| 2026-11-13 | 0 | 47.7K | −47.7K | −$289.4K |
| 2026-11-14 | 0 | 60.1K | −60.1K | −$346.0K |
| 2026-11-15 | 0 | 48.0K | −48.0K | −$234.2K |
| 2026-11-16 | 0 | 33.7K | −33.7K | −$174.6K |
| 2026-11-17 | 0 | 40.9K | −40.9K | −$211.4K |
| 2026-11-18 | 0 | 35.1K | −35.1K | −$186.4K |
| 2026-11-19 | 0 | 45.7K | −45.7K | −$236.8K |
| 2026-11-20 | 0 | 64.4K | −64.4K | −$317.4K |
| 2026-11-21 | 0 | 57.5K | −57.5K | −$256.9K |
| 2026-11-22 | 0 | 25.6K | −25.6K | −$121.5K |
| 2026-11-23 | 0 | 58.4K | −58.4K | −$273.6K |
| 2026-11-24 | 0 | 33.3K | −33.3K | −$161.3K |
| 2026-11-25 | 0 | 50.8K | −50.8K | −$239.5K |


---

## Raydium (RAY)

**Price:** $1.32    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 RAY | $0 | today @ $1.32 | 0.0000% |
| 7d | 6/7d | 0 | 157.4K | 🟢 −157.4K RAY | −$206.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 740.4K | 🟢 −740.4K RAY | −$1.15M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 4.90M | 🟢 −4.90M RAY | −$7.32M | per-day (100%) | 0.0000% |

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
| 2026-11-12 | 0 | 22.7K | −22.7K | −$36.7K |
| 2026-11-13 | 0 | 21.0K | −21.0K | −$33.9K |
| 2026-11-14 | 0 | 19.3K | −19.3K | −$28.7K |
| 2026-11-15 | 0 | 19.4K | −19.4K | −$26.1K |
| 2026-11-16 | 0 | 24.7K | −24.7K | −$35.4K |
| 2026-11-17 | 0 | 23.0K | −23.0K | −$32.1K |
| 2026-11-18 | 0 | 27.0K | −27.0K | −$39.4K |
| 2026-11-19 | 0 | 26.6K | −26.6K | −$37.2K |
| 2026-11-20 | 0 | 32.1K | −32.1K | −$44.6K |
| 2026-11-21 | 0 | 24.3K | −24.3K | −$31.3K |
| 2026-11-22 | 0 | 17.5K | −17.5K | −$23.4K |
| 2026-11-23 | 0 | 36.5K | −36.5K | −$48.1K |
| 2026-11-24 | 0 | 19.4K | −19.4K | −$25.5K |
| 2026-11-25 | 0 | 27.6K | −27.6K | −$34.0K |


---

## Euler (EUL)

**Price:** $0.75    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.75 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.75 | 0.0000% |
| 30d | ⚠ 2/30d partial | 0 | 0 | 🟢 −0 EUL | −$0.08 | per-day (100%) | 0.0000% |
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

**Price:** $0.29    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.29 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 31.5K | 🟢 −31.5K GNS | −$9.4K | per-day (100%) | 0.0000% |
| 30d | 24/30d | 0 | 88.9K | 🟢 −88.9K GNS | −$29.9K | per-day (100%) | 0.0000% |
| 90d | 84/90d | 0 | 258.9K | 🟢 −258.9K GNS | −$106.9K | per-day (100%) | 0.0000% |

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
| 2026-11-07 | 0 | 2.7K | −2.7K | −$868.00 |
| 2026-11-08 | 0 | 463 | −463 | −$160.00 |
| 2026-11-09 | 0 | 1.1K | −1.1K | −$536.00 |
| 2026-11-10 | 0 | 2.9K | −2.9K | −$1.2K |
| 2026-11-15 | 0 | 1.6K | −1.6K | −$525.00 |
| 2026-11-16 | 0 | 9.3K | −9.3K | −$3.1K |
| 2026-11-17 | 0 | 4.9K | −4.9K | −$1.6K |
| 2026-11-18 | 0 | 3.1K | −3.1K | −$996.00 |
| 2026-11-19 | 0 | 7.2K | −7.2K | −$2.3K |
| 2026-11-20 | 0 | 6.9K | −6.9K | −$2.2K |
| 2026-11-21 | 0 | 5.7K | −5.7K | −$1.7K |
| 2026-11-22 | 0 | 4.3K | −4.3K | −$1.3K |
| 2026-11-23 | 0 | 6.3K | −6.3K | −$1.9K |
| 2026-11-24 | 0 | 8.3K | −8.3K | −$2.4K |


---

## Orca (ORCA)

**Price:** $1.19    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ORCA | $0 | today @ $1.19 | 0.0000% |
| 7d | 6/7d | 0 | 9.1K | 🟢 −9.1K ORCA | −$10.5K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 116.7K | 🟢 −116.7K ORCA | −$164.5K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 636.9K | 🟢 −636.9K ORCA | −$995.5K | per-day (100%) | 0.0000% |

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
| 2026-11-12 | 0 | 1.5K | −1.5K | −$1.9K |
| 2026-11-13 | 0 | 2.1K | −2.1K | −$2.6K |
| 2026-11-14 | 0 | 2.0K | −2.0K | −$2.5K |
| 2026-11-15 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-16 | 0 | 1.5K | −1.5K | −$1.8K |
| 2026-11-17 | 0 | 1.7K | −1.7K | −$1.9K |
| 2026-11-18 | 0 | 1.3K | −1.3K | −$1.5K |
| 2026-11-19 | 0 | 2.4K | −2.4K | −$2.7K |
| 2026-11-20 | 0 | 2.0K | −2.0K | −$2.2K |
| 2026-11-21 | 0 | 1.5K | −1.5K | −$1.6K |
| 2026-11-22 | 0 | 899 | −899 | −$1.1K |
| 2026-11-23 | 0 | 1.9K | −1.9K | −$2.3K |
| 2026-11-24 | 0 | 1.2K | −1.2K | −$1.4K |
| 2026-11-25 | 0 | 1.6K | −1.6K | −$1.8K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 MNDE | $0 | today @ $0.02 | 0.0000% |
| 7d | 6/7d | 0 | 1.26M | 🟢 −1.26M MNDE | −$23.9K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 6.84M | 🟢 −6.84M MNDE | −$148.8K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 25.14M | 🟢 −25.14M MNDE | −$561.4K | per-day (100%) | 0.0000% |

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
| 2026-11-12 | 0 | 237.2K | −237.2K | −$5.1K |
| 2026-11-13 | 0 | 225.2K | −225.2K | −$4.8K |
| 2026-11-14 | 0 | 198.2K | −198.2K | −$4.2K |
| 2026-11-15 | 0 | 219.1K | −219.1K | −$4.3K |
| 2026-11-16 | 0 | 207.1K | −207.1K | −$4.1K |
| 2026-11-17 | 0 | 216.9K | −216.9K | −$4.3K |
| 2026-11-18 | 0 | 208.0K | −208.0K | −$4.1K |
| 2026-11-19 | 0 | 209.5K | −209.5K | −$4.1K |
| 2026-11-20 | 0 | 198.5K | −198.5K | −$3.9K |
| 2026-11-21 | 0 | 213.0K | −213.0K | −$4.0K |
| 2026-11-22 | 0 | 213.1K | −213.1K | −$4.0K |
| 2026-11-23 | 0 | 217.2K | −217.2K | −$4.1K |
| 2026-11-24 | 0 | 205.2K | −205.2K | −$4.0K |
| 2026-11-25 | 0 | 215.0K | −215.0K | −$4.0K |


---

## ether.fi (ETHFI)

**Price:** $0.44    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ETHFI | $0 | today @ $0.44 | 0.0000% |
| 7d | 6/7d | 0 | 87.5K | 🟢 −87.5K ETHFI | −$41.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 369.7K | 🟢 −369.7K ETHFI | −$204.6K | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 950.6K | 🟢 −950.6K ETHFI | −$587.6K | per-day (100%) | 0.0000% |

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
| 2026-11-12 | 0 | 12.5K | −12.5K | −$8.0K |
| 2026-11-13 | 0 | 10.6K | −10.6K | −$6.7K |
| 2026-11-14 | 0 | 11.8K | −11.8K | −$6.7K |
| 2026-11-15 | 0 | 11.2K | −11.2K | −$5.5K |
| 2026-11-16 | 0 | 13.8K | −13.8K | −$6.8K |
| 2026-11-17 | 0 | 16.9K | −16.9K | −$7.9K |
| 2026-11-18 | 0 | 14.5K | −14.5K | −$7.0K |
| 2026-11-19 | 0 | 13.0K | −13.0K | −$6.3K |
| 2026-11-20 | 0 | 14.6K | −14.6K | −$7.1K |
| 2026-11-21 | 0 | 14.2K | −14.2K | −$6.3K |
| 2026-11-22 | 0 | 11.2K | −11.2K | −$5.3K |
| 2026-11-23 | 0 | 18.4K | −18.4K | −$9.2K |
| 2026-11-24 | 0 | 14.5K | −14.5K | −$7.1K |
| 2026-11-25 | 0 | 14.5K | −14.5K | −$6.8K |


---

## CoW Protocol (COW)

**Price:** $0.10    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.10 | 0.0000% |
| 7d | ⚠ 5/7d partial | 0 | 3.55M | 🟢 −3.55M COW | −$320.0K | per-day (100%) | 0.0000% |
| 30d | 28/30d | 0 | 14.72M | 🟢 −14.72M COW | −$1.51M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 27.18M | 🟢 −27.18M COW | −$3.26M | per-day (100%) | 0.0000% |

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
| 2026-11-11 | 0 | 323.1K | −323.1K | −$33.8K |
| 2026-11-12 | 0 | 470.7K | −470.7K | −$47.3K |
| 2026-11-13 | 0 | 1.17M | −1.17M | −$116.4K |
| 2026-11-14 | 0 | 1.35M | −1.35M | −$134.0K |
| 2026-11-15 | 0 | 792.3K | −792.3K | −$70.3K |
| 2026-11-16 | 0 | 417.5K | −417.5K | −$38.7K |
| 2026-11-17 | 0 | 352.2K | −352.2K | −$32.3K |
| 2026-11-18 | 0 | 231.4K | −231.4K | −$22.1K |
| 2026-11-19 | 0 | 366.4K | −366.4K | −$33.9K |
| 2026-11-20 | 0 | 1.57M | −1.57M | −$144.7K |
| 2026-11-21 | 0 | 832.5K | −832.5K | −$71.9K |
| 2026-11-22 | 0 | 267.5K | −267.5K | −$23.7K |
| 2026-11-23 | 0 | 687.7K | −687.7K | −$61.5K |
| 2026-11-24 | 0 | 192.9K | −192.9K | −$18.1K |


---
