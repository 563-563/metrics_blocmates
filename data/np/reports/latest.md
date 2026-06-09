# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-06-09T15:34:01.148Z
**As-of:** 2026-06-09

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $59.83    **Circulating:** 512.72M HYPE    **AF balance:** 45.06M HYPE    **Total staked:** 434.31M HYPE (84.7% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 19.2K | 🟢 −87.6K HYPE | −$5.24M | today @ $59.83 | -0.0088% |
| 7d | 7/7d | 9.92M | 111.4K | 🟢 −3.14M HYPE | −$188.06M | today @ $59.83 | -0.3143% |
| 30d | 30/30d | 17.45M | 426.6K | 🟢 −2.81M HYPE | −$163.66M | per-day (40%) | -0.2806% |
| 90d | 90/90d | 52.34M | 2.40M | 🔴 +3.23M HYPE | +$76.49M | per-day (80%) | 0.3234% |

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
| 2026-05-27 | 0 | 8.4K | −553.4K | −$33.11M |
| 2026-05-28 | 0 | 5.6K | −637.1K | −$38.12M |
| 2026-05-29 | 7.53M | 12.0K | +3.00M | +$179.52M |
| 2026-05-30 | 0 | 3.8K | −172.6K | −$10.33M |
| 2026-05-31 | 0 | 902 | −902 | −$53.9K |
| 2026-06-01 | 0 | 8.6K | −8.6K | −$514.0K |
| 2026-06-02 | 0 | 2.8K | −734.6K | −$43.95M |
| 2026-06-03 | 0 | 2.9K | −1.23M | −$73.47M |
| 2026-06-04 | 0 | 7.4K | −375.8K | −$22.48M |
| 2026-06-05 | 0 | 9.1K | −491.6K | −$29.41M |
| 2026-06-06 | 9.92M | 12.4K | +574.9K | +$34.39M |
| 2026-06-07 | 0 | 29.4K | −668.5K | −$40.00M |
| 2026-06-08 | 0 | 30.9K | −866.7K | −$51.85M |
| 2026-06-09 | 0 | 19.2K | −87.6K | −$5.24M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-29 | 7.53M | $450.60M |
| 2026-07-06 | 9.92M | $593.31M |
| 2026-07-29 | 7.53M | $450.60M |
| 2026-08-06 | 9.92M | $593.31M |
| 2026-08-29 | 7.53M | $450.60M |
| 2026-09-06 | 9.92M | $593.31M |
| 2026-09-29 | 7.53M | $450.60M |
| 2026-10-06 | 9.92M | $593.31M |


---

## Aave (AAVE)

**Price:** $60.77    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $60.77 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −26.5K AAVE | −$1.61M | today @ $60.77 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −36.2K AAVE | −$2.20M | today @ $60.77 | 0.0000% |
| 90d | ⚠ 33/90d partial | 0 | 28.4K | 🟢 −64.5K AAVE | −$3.92M | today @ $60.77 | 0.0000% |

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
| 2026-05-27 | 0 | 0 | −3.8K | −$230.8K |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | 0 | $0 |
| 2026-05-30 | 0 | 0 | −5.2K | −$315.5K |
| 2026-05-31 | 0 | 0 | −23 | −$1.4K |
| 2026-06-01 | 0 | 0 | −74 | −$4.5K |
| 2026-06-02 | 0 | 0 | −447 | −$27.2K |
| 2026-06-03 | 0 | 0 | −0 | −$10.40 |
| 2026-06-04 | 0 | 0 | −16 | −$982.61 |
| 2026-06-05 | 0 | 0 | 0 | $0 |
| 2026-06-06 | 0 | 0 | 0 | $0 |
| 2026-06-07 | 0 | 0 | −26.5K | −$1.61M |
| 2026-06-08 | 0 | 0 | 0 | $0 |
| 2026-06-09 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.06    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.06 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −1.74M SKY | −$97.4K | today @ $0.06 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −2.20M SKY | −$123.2K | today @ $0.06 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −2.20M SKY | −$123.2K | today @ $0.06 | 0.0000% |

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
| 2026-05-27 | 0 | 0 | 0 | $0 |
| 2026-05-28 | 0 | 0 | 0 | $0 |
| 2026-05-29 | 0 | 0 | 0 | $0 |
| 2026-05-30 | 0 | 0 | 0 | $0 |
| 2026-05-31 | 0 | 0 | −2.2K | −$122.99 |
| 2026-06-01 | 0 | 0 | −459.3K | −$25.7K |
| 2026-06-02 | 0 | 0 | 0 | $0 |
| 2026-06-03 | 0 | 0 | 0 | $0 |
| 2026-06-04 | 0 | 0 | −1.07M | −$60.0K |
| 2026-06-05 | 0 | 0 | −398.8K | −$22.3K |
| 2026-06-06 | 0 | 0 | 0 | $0 |
| 2026-06-07 | 0 | 0 | 0 | $0 |
| 2026-06-08 | 0 | 0 | −270.8K | −$15.1K |
| 2026-06-09 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.52    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.52 | 0.0000% |
| 7d | 6/7d | 0 | 584.9K | 🟢 −584.9K LIT | −$899.8K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 2.11M | 🟢 −2.11M LIT | −$2.60M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 6.65M | 🟢 −6.65M LIT | −$7.10M | per-day (100%) | 0.0000% |

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
| 2026-05-26 | 0 | 62.4K | −62.4K | −$85.1K |
| 2026-05-27 | 0 | 55.8K | −55.8K | −$66.5K |
| 2026-05-28 | 0 | 61.0K | −61.0K | −$68.6K |
| 2026-05-29 | 0 | 105.6K | −105.6K | −$123.4K |
| 2026-05-30 | 0 | 37.3K | −37.3K | −$47.0K |
| 2026-05-31 | 0 | 33.8K | −33.8K | −$46.1K |
| 2026-06-01 | 0 | 66.2K | −66.2K | −$90.5K |
| 2026-06-02 | 0 | 97.9K | −97.9K | −$130.3K |
| 2026-06-03 | 0 | 80.9K | −80.9K | −$130.2K |
| 2026-06-04 | 0 | 116.5K | −116.5K | −$206.4K |
| 2026-06-05 | 0 | 156.1K | −156.1K | −$230.6K |
| 2026-06-06 | 0 | 68.9K | −68.9K | −$103.0K |
| 2026-06-07 | 0 | 59.2K | −59.2K | −$84.5K |
| 2026-06-08 | 0 | 103.2K | −103.2K | −$145.0K |


---

## Morpho (MORPHO)

**Price:** $1.81    **Circulating:** 0 MORPHO    **AF balance:** 0 MORPHO    **Total staked:** 0 MORPHO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 202.7K | 0 | 🔴 +97.4K MORPHO | +$176.2K | today @ $1.81 | 0.0000% |
| 7d | ⚠ 0/7d partial | 1.42M | 0 | 🔴 +681.5K MORPHO | +$1.23M | today @ $1.81 | 0.0000% |
| 30d | ⚠ 0/30d partial | 6.08M | 0 | 🔴 +2.92M MORPHO | +$5.29M | today @ $1.81 | 0.0000% |
| 90d | ⚠ 0/90d partial | 18.24M | 0 | 🔴 +8.76M MORPHO | +$15.86M | today @ $1.81 | 0.0000% |

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
| 2026-05-27 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-05-28 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-05-29 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-05-30 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-05-31 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-01 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-02 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-03 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-04 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-05 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-06 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-07 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-08 | 202.7K | 0 | +97.4K | +$176.2K |
| 2026-06-09 | 202.7K | 0 | +97.4K | +$176.2K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 202.7K | $366.9K |
| 2026-06-11 | 202.7K | $366.9K |
| 2026-06-12 | 202.7K | $366.9K |
| 2026-06-13 | 202.7K | $366.9K |
| 2026-06-14 | 202.7K | $366.9K |
| 2026-06-15 | 202.7K | $366.9K |
| 2026-06-16 | 202.7K | $366.9K |
| 2026-06-17 | 202.7K | $366.9K |


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

**Price:** $0.61    **Circulating:** 0 JTO    **AF balance:** 0 JTO    **Total staked:** 0 JTO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 626.2K | 0 | 🔴 +214.3K JTO | +$130.3K | today @ $0.61 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.38M | 0 | 🔴 +1.50M JTO | +$912.3K | today @ $0.61 | 0.0000% |
| 30d | ⚠ 0/30d partial | 18.79M | 0 | 🔴 +6.43M JTO | +$3.91M | today @ $0.61 | 0.0000% |
| 90d | ⚠ 0/90d partial | 56.36M | 0 | 🔴 +19.29M JTO | +$11.73M | today @ $0.61 | 0.0000% |

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
| 2026-05-27 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-05-28 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-05-29 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-05-30 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-05-31 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-01 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-02 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-03 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-04 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-05 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-06 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-07 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-08 | 626.2K | 0 | +214.3K | +$130.3K |
| 2026-06-09 | 626.2K | 0 | +214.3K | +$130.3K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 626.2K | $380.8K |
| 2026-06-11 | 626.2K | $380.8K |
| 2026-06-12 | 626.2K | $380.8K |
| 2026-06-13 | 626.2K | $380.8K |
| 2026-06-14 | 626.2K | $380.8K |
| 2026-06-15 | 626.2K | $380.8K |
| 2026-06-16 | 626.2K | $380.8K |
| 2026-06-17 | 626.2K | $380.8K |


---

## Jupiter (JUP)

**Price:** $0.15    **Circulating:** 0 JUP    **AF balance:** 0 JUP    **Total staked:** 0 JUP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 254 | 🟢 −254 JUP | −$39.00 | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 3.58M | 🟢 −3.58M JUP | −$633.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 53.47M | 11.62M | 🔴 +3.93M JUP | +$784.8K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 160.41M | 38.53M | 🔴 +8.13M JUP | +$1.44M | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 53.47M | 360.1K | +15.19M | +$3.01M |
| 2026-05-28 | 0 | 462.5K | −462.5K | −$87.4K |
| 2026-05-29 | 0 | 352.5K | −352.5K | −$61.8K |
| 2026-05-30 | 0 | 200.3K | −200.3K | −$37.3K |
| 2026-05-31 | 0 | 302.1K | −302.1K | −$55.7K |
| 2026-06-01 | 0 | 437.5K | −437.5K | −$83.2K |
| 2026-06-02 | 0 | 763.7K | −763.7K | −$153.3K |
| 2026-06-03 | 0 | 649.3K | −649.3K | −$125.9K |
| 2026-06-04 | 0 | 677.9K | −677.9K | −$135.7K |
| 2026-06-05 | 0 | 883.2K | −883.2K | −$160.2K |
| 2026-06-06 | 0 | 404.3K | −404.3K | −$63.5K |
| 2026-06-07 | 0 | 558.5K | −558.5K | −$85.3K |
| 2026-06-08 | 0 | 402.3K | −402.3K | −$62.8K |
| 2026-06-09 | 0 | 254 | −254 | −$39.00 |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-27 | 53.47M | $8.26M |
| 2026-07-27 | 53.47M | $8.26M |
| 2026-08-27 | 53.47M | $8.26M |
| 2026-09-27 | 53.47M | $8.26M |
| 2026-10-27 | 53.47M | $8.26M |
| 2026-11-27 | 53.47M | $8.26M |
| 2026-12-27 | 53.47M | $8.26M |
| 2027-01-27 | 53.47M | $8.26M |


---

## Fluid (FLUID)

**Price:** $1.09    **Circulating:** 0 FLUID    **AF balance:** 0 FLUID    **Total staked:** 0 FLUID

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 9.1K | 0 | 🔴 +2.7K FLUID | +$3.0K | today @ $1.09 | 0.0000% |
| 7d | ⚠ 0/7d partial | 563.9K | 0 | 🔴 +169.2K FLUID | +$183.9K | today @ $1.09 | 0.0000% |
| 30d | ⚠ 0/30d partial | 774.0K | 0 | 🔴 +232.2K FLUID | +$252.4K | today @ $1.09 | 0.0000% |
| 90d | ⚠ 5/90d partial | 2.32M | 196.8K | 🔴 +499.8K FLUID | +$330.2K | per-day (6%) | 0.0000% |

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
| 2026-05-27 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-05-28 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-05-29 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-05-30 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-05-31 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-01 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-02 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-03 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-04 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-05 | 509.1K | 0 | +152.7K | +$166.0K |
| 2026-06-06 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-07 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-08 | 9.1K | 0 | +2.7K | +$3.0K |
| 2026-06-09 | 9.1K | 0 | +2.7K | +$3.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 9.1K | $9.9K |
| 2026-06-11 | 9.1K | $9.9K |
| 2026-06-12 | 9.1K | $9.9K |
| 2026-06-13 | 9.1K | $9.9K |
| 2026-06-14 | 9.1K | $9.9K |
| 2026-06-15 | 9.1K | $9.9K |
| 2026-06-16 | 9.1K | $9.9K |
| 2026-06-17 | 9.1K | $9.9K |


---

## Collector Crypt (CARDS)

**Price:** $0.18    **Circulating:** 0 CARDS    **AF balance:** 0 CARDS    **Total staked:** 0 CARDS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 CARDS | $0 | today @ $0.18 | 0.0000% |
| 7d | 6/7d | 0 | 6.75M | 🟢 −6.75M CARDS | −$1.23M | per-day (100%) | 0.0000% |
| 30d | 28/30d | 14.25M | 42.74M | 🟢 −31.35M CARDS | −$3.44M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 42.76M | 264.24M | 🟢 −230.06M CARDS | −$13.80M | per-day (100%) | 0.0000% |

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
| 2026-05-25 | 0 | 2.58M | −2.58M | −$353.9K |
| 2026-05-26 | 0 | 921.4K | −921.4K | −$156.4K |
| 2026-05-28 | 0 | 1.07M | −1.07M | −$199.3K |
| 2026-05-29 | 0 | 834.4K | −834.4K | −$142.7K |
| 2026-05-30 | 0 | 1.58M | −1.58M | −$257.0K |
| 2026-05-31 | 0 | 1.32M | −1.32M | −$238.8K |
| 2026-06-01 | 14.25M | 1.44M | +9.95M | +$2.36M |
| 2026-06-02 | 0 | 1.17M | −1.17M | −$247.2K |
| 2026-06-03 | 0 | 980.8K | −980.8K | −$191.8K |
| 2026-06-04 | 0 | 833.5K | −833.5K | −$190.8K |
| 2026-06-05 | 0 | 1.15M | −1.15M | −$206.8K |
| 2026-06-06 | 0 | 944.2K | −944.2K | −$145.1K |
| 2026-06-07 | 0 | 1.28M | −1.28M | −$204.9K |
| 2026-06-08 | 0 | 1.57M | −1.57M | −$287.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-07-01 | 14.25M | $2.60M |
| 2026-08-01 | 14.25M | $2.60M |
| 2026-09-01 | 44.67M | $8.16M |
| 2026-10-01 | 44.67M | $8.16M |
| 2026-11-01 | 44.67M | $8.16M |
| 2026-12-01 | 44.67M | $8.16M |
| 2027-01-01 | 44.67M | $8.16M |
| 2027-02-01 | 44.67M | $8.16M |


---

## pump.fun (PUMP)

**Price:** $0.00    **Circulating:** 0 PUMP    **AF balance:** 0 PUMP    **Total staked:** 0 PUMP

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 PUMP | $0 | today @ $0.00 | 0.0000% |
| 7d | 6/7d | 0 | 1.27B | 🟢 −1.27B PUMP | −$2.00M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 10.00B | 7.72B | 🟢 −4.72B PUMP | −$7.41M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 20.00B | 34.54B | 🟢 −28.54B PUMP | −$50.68M | per-day (100%) | 0.0000% |

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
| 2026-05-26 | 0 | 266.32M | −266.32M | −$476.1K |
| 2026-05-27 | 0 | 265.40M | −265.40M | −$477.2K |
| 2026-05-28 | 0 | 271.48M | −271.48M | −$485.5K |
| 2026-05-29 | 0 | 281.27M | −281.27M | −$478.3K |
| 2026-05-30 | 0 | 246.44M | −246.44M | −$425.0K |
| 2026-05-31 | 0 | 240.72M | −240.72M | −$427.4K |
| 2026-06-01 | 0 | 297.81M | −297.81M | −$533.2K |
| 2026-06-02 | 0 | 235.71M | −235.71M | −$431.9K |
| 2026-06-03 | 0 | 242.32M | −242.32M | −$395.3K |
| 2026-06-04 | 0 | 200.36M | −200.36M | −$354.8K |
| 2026-06-05 | 0 | 191.79M | −191.79M | −$316.2K |
| 2026-06-06 | 0 | 188.67M | −188.67M | −$266.7K |
| 2026-06-07 | 0 | 206.14M | −206.14M | −$293.3K |
| 2026-06-08 | 0 | 243.80M | −243.80M | −$371.4K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-12 | 10.00B | $15.28M |
| 2026-07-01 | 359.91M | $550.0K |
| 2026-07-02 | 359.91M | $550.0K |
| 2026-07-03 | 359.91M | $550.0K |
| 2026-07-04 | 359.91M | $550.0K |
| 2026-07-05 | 359.91M | $550.0K |
| 2026-07-06 | 359.91M | $550.0K |
| 2026-07-07 | 359.91M | $550.0K |


---

## LayerZero (ZRO)

**Price:** $0.84    **Circulating:** 0 ZRO    **AF balance:** 0 ZRO    **Total staked:** 0 ZRO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 ZRO | $0 | today @ $0.84 | 0.0000% |
| 7d | ⚠ 1/7d partial | 0 | 120.5K | 🟢 −120.5K ZRO | −$154.0K | per-day (100%) | 0.0000% |
| 30d | ⚠ 2/30d partial | 23.63M | 244.7K | 🔴 +11.22M ZRO | +$9.31M | per-day (67%) | 0.0000% |
| 90d | ⚠ 4/90d partial | 70.89M | 544.1K | 🔴 +33.84M ZRO | +$28.06M | per-day (57%) | 0.0000% |

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
| 2025-12-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-01-15 | 0 | 285.6K | −285.6K | −$474.9K |
| 2026-01-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-02-16 | 0 | 213.6K | −213.6K | −$374.7K |
| 2026-02-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-03-08 | 0 | 133.9K | −133.9K | −$255.8K |
| 2026-03-09 | 0 | 15.7K | −15.7K | −$30.6K |
| 2026-03-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-04-07 | 0 | 148.6K | −148.6K | −$264.2K |
| 2026-04-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-05-04 | 0 | 150.8K | −150.8K | −$206.6K |
| 2026-05-20 | 23.63M | 0 | +11.46M | +$9.61M |
| 2026-06-02 | 0 | 124.2K | −124.2K | −$141.2K |
| 2026-06-03 | 0 | 120.5K | −120.5K | −$154.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-20 | 23.63M | $19.81M |
| 2026-07-20 | 23.63M | $19.81M |
| 2026-08-20 | 23.63M | $19.81M |
| 2026-09-20 | 23.63M | $19.81M |
| 2026-10-20 | 23.63M | $19.81M |
| 2026-11-20 | 23.63M | $19.81M |
| 2026-12-20 | 23.63M | $19.81M |
| 2027-01-20 | 23.63M | $19.81M |


---

## Ethena (ENA)

**Price:** $0.08    **Circulating:** 0 ENA    **AF balance:** 0 ENA    **Total staked:** 0 ENA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 10.75M | 0 | 🔴 +4.11M ENA | +$336.0K | today @ $0.08 | 0.0000% |
| 7d | ⚠ 0/7d partial | 75.22M | 0 | 🔴 +28.77M ENA | +$2.35M | today @ $0.08 | 0.0000% |
| 30d | ⚠ 0/30d partial | 322.39M | 0 | 🔴 +123.30M ENA | +$10.08M | today @ $0.08 | 0.0000% |
| 90d | ⚠ 0/90d partial | 967.16M | 0 | 🔴 +369.89M ENA | +$30.24M | today @ $0.08 | 0.0000% |

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
| 2026-05-27 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-05-28 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-05-29 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-05-30 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-05-31 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-01 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-02 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-03 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-04 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-05 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-06 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-07 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-08 | 10.75M | 0 | +4.11M | +$336.0K |
| 2026-06-09 | 10.75M | 0 | +4.11M | +$336.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 10.75M | $878.6K |
| 2026-06-11 | 10.75M | $878.6K |
| 2026-06-12 | 10.75M | $878.6K |
| 2026-06-13 | 10.75M | $878.6K |
| 2026-06-14 | 10.75M | $878.6K |
| 2026-06-15 | 10.75M | $878.6K |
| 2026-06-16 | 10.75M | $878.6K |
| 2026-06-17 | 10.75M | $878.6K |


---

## Aerodrome (AERO)

**Price:** $0.33    **Circulating:** 0 AERO    **AF balance:** 0 AERO    **Total staked:** 0 AERO

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.33 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.33 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.33 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 AERO | $0 | today @ $0.33 | 0.0000% |

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
| 24h | ⚠ 0/1d partial | 189.4K | 0 | 🔴 +76.9K DYDX | +$10.0K | today @ $0.13 | 0.0000% |
| 7d | 6/7d | 1.33M | 171.9K | 🔴 +366.6K DYDX | +$54.5K | per-day (86%) | 0.0000% |
| 30d | 29/30d | 5.68M | 1.07M | 🔴 +1.24M DYDX | +$192.2K | per-day (97%) | 0.0000% |
| 90d | 89/90d | 7.76M | 6.49M | 🟢 −3.34M DYDX | −$265.8K | per-day (99%) | 0.0000% |

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
| 2026-05-27 | 189.4K | 28.5K | +48.4K | +$8.1K |
| 2026-05-28 | 189.4K | 26.7K | +50.2K | +$8.2K |
| 2026-05-29 | 189.4K | 25.2K | +51.7K | +$8.2K |
| 2026-05-30 | 189.4K | 14.4K | +62.5K | +$11.1K |
| 2026-05-31 | 189.4K | 9.9K | +67.0K | +$12.4K |
| 2026-06-01 | 189.4K | 10.9K | +66.0K | +$12.6K |
| 2026-06-02 | 189.4K | 21.0K | +55.9K | +$9.7K |
| 2026-06-03 | 189.4K | 34.3K | +42.7K | +$7.2K |
| 2026-06-04 | 189.4K | 25.5K | +51.5K | +$9.2K |
| 2026-06-05 | 189.4K | 35.4K | +41.5K | +$6.7K |
| 2026-06-06 | 189.4K | 35.0K | +41.9K | +$5.8K |
| 2026-06-07 | 189.4K | 23.2K | +53.7K | +$7.2K |
| 2026-06-08 | 189.4K | 18.6K | +58.4K | +$8.4K |
| 2026-06-09 | 189.4K | 0 | +76.9K | +$10.0K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 189.4K | $24.6K |
| 2026-06-11 | 189.4K | $24.6K |
| 2026-06-12 | 189.4K | $24.6K |
| 2026-06-13 | 189.4K | $24.6K |
| 2026-06-14 | 189.4K | $24.6K |
| 2026-06-15 | 189.4K | $24.6K |
| 2026-06-16 | 189.4K | $24.6K |
| 2026-06-17 | 189.4K | $24.6K |


---

## Meteora (MET)

**Price:** $0.10    **Circulating:** 0 MET    **AF balance:** 0 MET    **Total staked:** 0 MET

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 291.3K | 0 | 🔴 +110.1K MET | +$11.1K | today @ $0.10 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.04M | 0 | 🔴 +770.9K MET | +$77.6K | today @ $0.10 | 0.0000% |
| 30d | ⚠ 0/30d partial | 8.74M | 0 | 🔴 +3.30M MET | +$332.4K | today @ $0.10 | 0.0000% |
| 90d | ⚠ 0/90d partial | 26.21M | 0 | 🔴 +9.91M MET | +$997.1K | today @ $0.10 | 0.0000% |

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
| 2026-05-27 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-05-28 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-05-29 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-05-30 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-05-31 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-01 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-02 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-03 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-04 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-05 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-06 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-07 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-08 | 291.3K | 0 | +110.1K | +$11.1K |
| 2026-06-09 | 291.3K | 0 | +110.1K | +$11.1K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 291.3K | $29.3K |
| 2026-06-11 | 291.3K | $29.3K |
| 2026-06-12 | 291.3K | $29.3K |
| 2026-06-13 | 291.3K | $29.3K |
| 2026-06-14 | 291.3K | $29.3K |
| 2026-06-15 | 291.3K | $29.3K |
| 2026-06-16 | 291.3K | $29.3K |
| 2026-06-17 | 291.3K | $29.3K |


---

## Sanctum (CLOUD)

**Price:** $0.01    **Circulating:** 0 CLOUD    **AF balance:** 0 CLOUD    **Total staked:** 0 CLOUD

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 347.8K | 0 | 🔴 +118.1K CLOUD | +$1.6K | today @ $0.01 | 0.0000% |
| 7d | ⚠ 0/7d partial | 2.43M | 0 | 🔴 +826.5K CLOUD | +$11.3K | today @ $0.01 | 0.0000% |
| 30d | ⚠ 0/30d partial | 10.43M | 0 | 🔴 +3.54M CLOUD | +$48.3K | today @ $0.01 | 0.0000% |
| 90d | ⚠ 0/90d partial | 31.30M | 0 | 🔴 +10.63M CLOUD | +$145.0K | today @ $0.01 | 0.0000% |

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
| 2026-05-27 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-05-28 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-05-29 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-05-30 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-05-31 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-01 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-02 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-03 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-04 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-05 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-06 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-07 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-08 | 347.8K | 0 | +118.1K | +$1.6K |
| 2026-06-09 | 347.8K | 0 | +118.1K | +$1.6K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 347.8K | $4.7K |
| 2026-06-11 | 347.8K | $4.7K |
| 2026-06-12 | 347.8K | $4.7K |
| 2026-06-13 | 347.8K | $4.7K |
| 2026-06-14 | 347.8K | $4.7K |
| 2026-06-15 | 347.8K | $4.7K |
| 2026-06-16 | 347.8K | $4.7K |
| 2026-06-17 | 347.8K | $4.7K |


---

## Drift (DRIFT)

**Price:** $0.02    **Circulating:** 0 DRIFT    **AF balance:** 0 DRIFT    **Total staked:** 0 DRIFT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 644.2K | 0 | 🔴 +302.8K DRIFT | +$4.9K | today @ $0.02 | 0.0000% |
| 7d | ⚠ 0/7d partial | 4.51M | 0 | 🔴 +2.12M DRIFT | +$34.3K | today @ $0.02 | 0.0000% |
| 30d | ⚠ 0/30d partial | 20.42M | 0 | 🔴 +9.96M DRIFT | +$161.3K | today @ $0.02 | 0.0000% |
| 90d | ⚠ 0/90d partial | 72.19M | 0 | 🔴 +38.61M DRIFT | +$625.4K | today @ $0.02 | 0.0000% |

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
| 2026-05-27 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-05-28 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-05-29 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-05-30 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-05-31 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-01 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-02 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-03 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-04 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-05 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-06 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-07 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-08 | 644.2K | 0 | +302.8K | +$4.9K |
| 2026-06-09 | 644.2K | 0 | +302.8K | +$4.9K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-06-10 | 644.2K | $10.4K |
| 2026-06-11 | 644.2K | $10.4K |
| 2026-06-12 | 644.2K | $10.4K |
| 2026-06-13 | 644.2K | $10.4K |
| 2026-06-14 | 644.2K | $10.4K |
| 2026-06-15 | 644.2K | $10.4K |
| 2026-06-16 | 644.2K | $10.4K |
| 2026-06-17 | 644.2K | $10.4K |


---

## Uniswap (UNI)

**Price:** $2.49    **Circulating:** 0 UNI    **AF balance:** 0 UNI    **Total staked:** 0 UNI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 UNI | $0 | today @ $2.49 | 0.0000% |
| 7d | 6/7d | 0 | 527.5K | 🟢 −527.5K UNI | −$1.40M | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.21M | 🟢 −1.21M UNI | −$3.72M | per-day (100%) | 0.0000% |
| 90d | 89/90d | 0 | 3.27M | 🟢 −3.27M UNI | −$10.77M | per-day (100%) | 0.0000% |

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
| 2026-05-26 | 0 | 34.9K | −34.9K | −$115.9K |
| 2026-05-27 | 0 | 41.6K | −41.6K | −$135.2K |
| 2026-05-28 | 0 | 37.1K | −37.1K | −$114.7K |
| 2026-05-29 | 0 | 37.9K | −37.9K | −$115.4K |
| 2026-05-30 | 0 | 13.3K | −13.3K | −$40.1K |
| 2026-05-31 | 0 | 13.2K | −13.2K | −$40.2K |
| 2026-06-01 | 0 | 32.4K | −32.4K | −$97.7K |
| 2026-06-02 | 0 | 66.7K | −66.7K | −$198.7K |
| 2026-06-03 | 0 | 86.9K | −86.9K | −$242.6K |
| 2026-06-04 | 0 | 93.3K | −93.3K | −$261.3K |
| 2026-06-05 | 0 | 173.8K | −173.8K | −$460.1K |
| 2026-06-06 | 0 | 55.2K | −55.2K | −$135.5K |
| 2026-06-07 | 0 | 61.8K | −61.8K | −$152.2K |
| 2026-06-08 | 0 | 56.5K | −56.5K | −$144.9K |


---

## Raydium (RAY)

**Price:** $0.57    **Circulating:** 0 RAY    **AF balance:** 0 RAY    **Total staked:** 0 RAY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 33.9K | 🟢 −33.9K RAY | −$19.4K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 233.6K | 🟢 −233.6K RAY | −$140.7K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 872.7K | 🟢 −872.7K RAY | −$623.8K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 3.33M | 🟢 −3.33M RAY | −$2.27M | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 0 | 23.4K | −23.4K | −$17.5K |
| 2026-05-28 | 0 | 28.4K | −28.4K | −$20.6K |
| 2026-05-29 | 0 | 22.9K | −22.9K | −$16.2K |
| 2026-05-30 | 0 | 13.6K | −13.6K | −$9.7K |
| 2026-05-31 | 0 | 16.6K | −16.6K | −$11.9K |
| 2026-06-01 | 0 | 31.5K | −31.5K | −$22.5K |
| 2026-06-02 | 0 | 30.6K | −30.6K | −$21.9K |
| 2026-06-03 | 0 | 29.8K | −29.8K | −$19.3K |
| 2026-06-04 | 0 | 39.2K | −39.2K | −$25.5K |
| 2026-06-05 | 0 | 42.4K | −42.4K | −$26.2K |
| 2026-06-06 | 0 | 27.6K | −27.6K | −$15.6K |
| 2026-06-07 | 0 | 26.2K | −26.2K | −$14.6K |
| 2026-06-08 | 0 | 34.4K | −34.4K | −$20.1K |
| 2026-06-09 | 0 | 33.9K | −33.9K | −$19.4K |


---

## Euler (EUL)

**Price:** $0.86    **Circulating:** 0 EUL    **AF balance:** 0 EUL    **Total staked:** 0 EUL

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.86 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.86 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 EUL | $0 | today @ $0.86 | 0.0000% |
| 90d | ⚠ 33/90d partial | 0 | 119.6K | 🟢 −119.6K EUL | −$110.0K | per-day (100%) | 0.0000% |

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

**Price:** $0.49    **Circulating:** 0 GNS    **AF balance:** 0 GNS    **Total staked:** 0 GNS

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 GNS | $0 | today @ $0.49 | 0.0000% |
| 7d | 6/7d | 0 | 182.4K | 🟢 −182.4K GNS | −$88.4K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 448.6K | 🟢 −448.6K GNS | −$222.7K | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 996.7K | 🟢 −996.7K GNS | −$607.8K | per-day (100%) | 0.0000% |

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
| 2026-05-26 | 0 | 7.5K | −7.5K | −$3.7K |
| 2026-05-27 | 0 | 10.2K | −10.2K | −$4.8K |
| 2026-05-28 | 0 | 18.7K | −18.7K | −$8.7K |
| 2026-05-29 | 0 | 14.1K | −14.1K | −$6.5K |
| 2026-05-30 | 0 | 8.9K | −8.9K | −$4.3K |
| 2026-05-31 | 0 | 8.8K | −8.8K | −$4.4K |
| 2026-06-01 | 0 | 15.1K | −15.1K | −$7.6K |
| 2026-06-02 | 0 | 25.6K | −25.6K | −$12.8K |
| 2026-06-03 | 0 | 37.2K | −37.2K | −$18.1K |
| 2026-06-04 | 0 | 27.6K | −27.6K | −$14.7K |
| 2026-06-05 | 0 | 30.8K | −30.8K | −$15.2K |
| 2026-06-06 | 0 | 9.8K | −9.8K | −$4.5K |
| 2026-06-07 | 0 | 53.2K | −53.2K | −$24.5K |
| 2026-06-08 | 0 | 23.8K | −23.8K | −$11.4K |


---

## Orca (ORCA)

**Price:** $0.99    **Circulating:** 0 ORCA    **AF balance:** 0 ORCA    **Total staked:** 0 ORCA

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 2.9K | 🟢 −2.9K ORCA | −$2.9K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 25.4K | 🟢 −25.4K ORCA | −$27.4K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 64.4K | 🟢 −64.4K ORCA | −$82.4K | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 217.3K | 🟢 −217.3K ORCA | −$237.3K | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 0 | 1.9K | −1.9K | −$2.6K |
| 2026-05-28 | 0 | 2.0K | −2.0K | −$2.6K |
| 2026-05-29 | 0 | 1.7K | −1.7K | −$2.2K |
| 2026-05-30 | 0 | 956 | −956 | −$1.2K |
| 2026-05-31 | 0 | 1.1K | −1.1K | −$1.4K |
| 2026-06-01 | 0 | 2.3K | −2.3K | −$2.8K |
| 2026-06-02 | 0 | 3.2K | −3.2K | −$4.1K |
| 2026-06-03 | 0 | 3.3K | −3.3K | −$3.8K |
| 2026-06-04 | 0 | 4.3K | −4.3K | −$4.9K |
| 2026-06-05 | 0 | 6.1K | −6.1K | −$6.7K |
| 2026-06-06 | 0 | 3.0K | −3.0K | −$3.0K |
| 2026-06-07 | 0 | 3.0K | −3.0K | −$3.1K |
| 2026-06-08 | 0 | 2.9K | −2.9K | −$3.0K |
| 2026-06-09 | 0 | 2.9K | −2.9K | −$2.9K |


---

## Marinade Finance (MNDE)

**Price:** $0.02    **Circulating:** 0 MNDE    **AF balance:** 0 MNDE    **Total staked:** 0 MNDE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 118.5K | 🟢 −118.5K MNDE | −$2.2K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 868.4K | 🟢 −868.4K MNDE | −$16.5K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 5.38M | 🟢 −5.38M MNDE | −$106.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 21.64M | 🟢 −21.64M MNDE | −$425.0K | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 0 | 185.7K | −185.7K | −$3.6K |
| 2026-05-28 | 0 | 178.7K | −178.7K | −$3.5K |
| 2026-05-29 | 0 | 173.5K | −173.5K | −$3.4K |
| 2026-05-30 | 0 | 175.4K | −175.4K | −$3.4K |
| 2026-05-31 | 0 | 158.4K | −158.4K | −$3.1K |
| 2026-06-01 | 0 | 164.4K | −164.4K | −$3.2K |
| 2026-06-02 | 0 | 142.2K | −142.2K | −$2.8K |
| 2026-06-03 | 0 | 139.3K | −139.3K | −$2.7K |
| 2026-06-04 | 0 | 127.9K | −127.9K | −$2.5K |
| 2026-06-05 | 0 | 119.4K | −119.4K | −$2.3K |
| 2026-06-06 | 0 | 117.3K | −117.3K | −$2.2K |
| 2026-06-07 | 0 | 124.9K | −124.9K | −$2.3K |
| 2026-06-08 | 0 | 121.1K | −121.1K | −$2.3K |
| 2026-06-09 | 0 | 118.5K | −118.5K | −$2.2K |


---

## ether.fi (ETHFI)

**Price:** $0.30    **Circulating:** 0 ETHFI    **AF balance:** 0 ETHFI    **Total staked:** 0 ETHFI

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 16.6K | 🟢 −16.6K ETHFI | −$5.0K | per-day (100%) | 0.0000% |
| 7d | 7/7d | 0 | 222.7K | 🟢 −222.7K ETHFI | −$70.1K | per-day (100%) | 0.0000% |
| 30d | 30/30d | 0 | 833.1K | 🟢 −833.1K ETHFI | −$313.7K | per-day (100%) | 0.0000% |
| 90d | 90/90d | 0 | 2.38M | 🟢 −2.38M ETHFI | −$1.04M | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 0 | 21.8K | −21.8K | −$8.3K |
| 2026-05-28 | 0 | 25.9K | −25.9K | −$10.0K |
| 2026-05-29 | 0 | 22.2K | −22.2K | −$8.7K |
| 2026-05-30 | 0 | 26.3K | −26.3K | −$10.2K |
| 2026-05-31 | 0 | 21.1K | −21.1K | −$8.0K |
| 2026-06-01 | 0 | 31.5K | −31.5K | −$11.8K |
| 2026-06-02 | 0 | 19.6K | −19.6K | −$7.5K |
| 2026-06-03 | 0 | 36.8K | −36.8K | −$12.3K |
| 2026-06-04 | 0 | 27.3K | −27.3K | −$9.8K |
| 2026-06-05 | 0 | 52.9K | −52.9K | −$17.0K |
| 2026-06-06 | 0 | 29.5K | −29.5K | −$8.4K |
| 2026-06-07 | 0 | 26.1K | −26.1K | −$7.5K |
| 2026-06-08 | 0 | 33.6K | −33.6K | −$10.1K |
| 2026-06-09 | 0 | 16.6K | −16.6K | −$5.0K |


---

## CoW Protocol (COW)

**Price:** $0.14    **Circulating:** 0 COW    **AF balance:** 0 COW    **Total staked:** 0 COW

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 COW | $0 | today @ $0.14 | 0.0000% |
| 7d | 6/7d | 0 | 4.36M | 🟢 −4.36M COW | −$607.1K | per-day (100%) | 0.0000% |
| 30d | 25/30d | 0 | 7.49M | 🟢 −7.49M COW | −$1.13M | per-day (100%) | 0.0000% |
| 90d | 85/90d | 0 | 17.69M | 🟢 −17.69M COW | −$3.23M | per-day (100%) | 0.0000% |

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
| 2026-05-22 | 0 | 139.0K | −139.0K | −$23.8K |
| 2026-05-23 | 0 | 138.3K | −138.3K | −$22.4K |
| 2026-05-24 | 0 | 84.6K | −84.6K | −$14.1K |
| 2026-05-25 | 0 | 204.3K | −204.3K | −$33.1K |
| 2026-05-26 | 0 | 369.7K | −369.7K | −$60.6K |
| 2026-05-27 | 0 | 317.6K | −317.6K | −$50.6K |
| 2026-06-01 | 0 | 166.6K | −166.6K | −$26.7K |
| 2026-06-02 | 0 | 404.6K | −404.6K | −$64.4K |
| 2026-06-03 | 0 | 335.2K | −335.2K | −$50.6K |
| 2026-06-04 | 0 | 594.9K | −594.9K | −$89.6K |
| 2026-06-05 | 0 | 1.04M | −1.04M | −$145.2K |
| 2026-06-06 | 0 | 917.3K | −917.3K | −$122.5K |
| 2026-06-07 | 0 | 891.4K | −891.4K | −$117.9K |
| 2026-06-08 | 0 | 581.4K | −581.4K | −$81.4K |


---
