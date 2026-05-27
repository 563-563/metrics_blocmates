# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-05-27T14:35:33.678Z
**As-of:** 2026-05-27

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $59.95    **Circulating:** 495.27M HYPE    **AF balance:** 44.59M HYPE    **Total staked:** 430.42M HYPE (86.9% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 13.5K | 🟢 −13.5K HYPE | −$809.8K | today @ $59.95 | -0.0014% |
| 7d | 7/7d | 0 | 97.7K | 🟢 −453.3K HYPE | −$27.09M | per-day (29%) | -0.0453% |
| 30d | 30/30d | 17.45M | 729.0K | 🔴 +2.92M HYPE | +$110.31M | per-day (83%) | 0.2920% |
| 90d | 90/90d | 52.34M | 2.98M | 🔴 +8.68M HYPE | +$305.35M | per-day (94%) | 0.8680% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | scripts/onchain/hype/tokenomics.js | onchain_equivalent | TP weights scheduled unlocks by sell-probability (team mostly re-stakes). HM uses gross. future_emissions is tagged foundation=0.40 since community rewards sell more than pure foundation treasury. |
| buybacks | data/onchain/hype-af/buybacks.json | onchain |  |
| burns | — | n/a | HYPE does not burn |
| treasury_accumulation | — | n/a | AF is buyback_wallet not treasury_wallet — already counted as buybacks |
| treasury_sells | — | n/a | AF only buys |
| net_staking_lockups | data/onchain/hype/staking.json | onchain | Daily snapshots accumulate over time. Until ≥2 snapshots exist, delta=0 for historical days. Static stock figure surfaced in the report's reference section. |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-14 | 0 | 40.8K | −40.8K | −$1.58M |
| 2026-05-15 | 0 | 37.7K | −37.7K | −$1.69M |
| 2026-05-16 | 0 | 23.6K | −23.6K | −$1.04M |
| 2026-05-17 | 0 | 24.3K | −24.3K | −$1.02M |
| 2026-05-18 | 0 | 2.2K | −2.2K | −$99.7K |
| 2026-05-19 | 0 | 2.6K | −2.6K | −$127.3K |
| 2026-05-20 | 0 | 3.1K | −3.1K | −$146.8K |
| 2026-05-21 | 0 | 977 | −977 | −$54.1K |
| 2026-05-22 | 0 | 14.6K | −37.7K | −$2.17M |
| 2026-05-23 | 0 | 1.4K | −1.4K | −$86.6K |
| 2026-05-24 | 0 | 18.6K | −18.6K | −$1.12M |
| 2026-05-25 | 0 | 17.1K | −17.1K | −$1.02M |
| 2026-05-26 | 0 | 31.4K | −364.0K | −$21.82M |
| 2026-05-27 | 0 | 13.5K | −13.5K | −$809.8K |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-29 | 7.53M | $451.50M |
| 2026-06-06 | 9.92M | $594.50M |
| 2026-06-29 | 7.53M | $451.50M |
| 2026-07-06 | 9.92M | $594.50M |
| 2026-07-29 | 7.53M | $451.50M |
| 2026-08-06 | 9.92M | $594.50M |
| 2026-08-29 | 7.53M | $451.50M |
| 2026-09-06 | 9.92M | $594.50M |


---

## Aave (AAVE)

**Price:** $84.78    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −37 AAVE | −$3.1K | today @ $84.78 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −140 AAVE | −$11.9K | today @ $84.78 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −140 AAVE | −$11.9K | today @ $84.78 | 0.0000% |
| 90d | ⚠ 46/90d partial | 0 | 95.3K | 🟢 −95.4K AAVE | −$8.09M | today @ $84.78 | 0.0000% |

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
| 2026-04-08 | 0 | 897 | −897 | −$76.1K |
| 2026-04-09 | 0 | 930 | −930 | −$78.8K |
| 2026-04-10 | 0 | 935 | −935 | −$79.2K |
| 2026-04-11 | 0 | 935 | −935 | −$79.2K |
| 2026-04-12 | 0 | 944 | −944 | −$80.0K |
| 2026-04-13 | 0 | 900 | −900 | −$76.3K |
| 2026-04-14 | 0 | 909 | −909 | −$77.1K |
| 2026-04-15 | 0 | 879 | −879 | −$74.5K |
| 2026-04-16 | 0 | 639 | −639 | −$54.1K |
| 2026-04-17 | 0 | 600 | −600 | −$50.9K |
| 2026-04-18 | 0 | 825 | −825 | −$69.9K |
| 2026-04-19 | 0 | 714 | −714 | −$60.5K |
| 2026-05-26 | 0 | 0 | −103 | −$8.7K |
| 2026-05-27 | 0 | 0 | −37 | −$3.1K |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | 🟢 −57.5K SKY | −$3.9K | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −57.9K SKY | −$4.0K | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −57.9K SKY | −$4.0K | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −57.9K SKY | −$4.0K | today @ $0.07 | 0.0000% |

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

### Recent daily series (last 2 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-26 | 0 | 0 | −385 | −$26.30 |
| 2026-05-27 | 0 | 0 | −57.5K | −$3.9K |


---

## Lighter (LIT)

**Price:** $1.19    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.19 | 0.0000% |
| 7d | 6/7d | 0 | 326.4K | 🟢 −326.4K LIT | −$423.7K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 2.02M | 🟢 −2.02M LIT | −$2.01M | per-day (100%) | 0.0000% |
| 90d | 87/90d | 0 | 6.71M | 🟢 −6.71M LIT | −$6.98M | per-day (100%) | 0.0000% |

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
| 2026-05-13 | 0 | 64.1K | −64.1K | −$59.4K |
| 2026-05-14 | 0 | 71.0K | −71.0K | −$63.6K |
| 2026-05-15 | 0 | 124.7K | −124.7K | −$113.8K |
| 2026-05-16 | 0 | 40.4K | −40.4K | −$34.7K |
| 2026-05-17 | 0 | 57.4K | −57.4K | −$50.5K |
| 2026-05-18 | 0 | 91.3K | −91.3K | −$78.4K |
| 2026-05-19 | 0 | 93.9K | −93.9K | −$89.4K |
| 2026-05-20 | 0 | 67.4K | −67.4K | −$76.2K |
| 2026-05-21 | 0 | 56.7K | −56.7K | −$72.6K |
| 2026-05-22 | 0 | 54.9K | −54.9K | −$78.7K |
| 2026-05-23 | 0 | 69.2K | −69.2K | −$82.3K |
| 2026-05-24 | 0 | 43.9K | −43.9K | −$54.0K |
| 2026-05-25 | 0 | 39.2K | −39.2K | −$50.9K |
| 2026-05-26 | 0 | 62.4K | −62.4K | −$85.1K |


---
