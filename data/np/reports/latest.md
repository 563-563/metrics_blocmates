# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-05-26T18:08:21.436Z
**As-of:** 2026-05-26

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

## Hyperliquid (HYPE)

**Price:** $61.46    **Circulating:** 495.27M HYPE    **AF balance:** 44.57M HYPE    **Total staked:** 430.02M HYPE (86.8% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 25.4K | 🟢 −25.4K HYPE | −$1.56M | today @ $61.46 | -0.0025% |
| 7d | 7/7d | 0 | 99.3K | 🟢 −122.3K HYPE | −$7.33M | per-day (43%) | -0.0122% |
| 30d | 30/30d | 17.45M | 758.4K | 🔴 +16.67M HYPE | +$700.53M | per-day (87%) | 1.6667% |
| 90d | 90/90d | 52.34M | 3.02M | 🔴 +49.30M HYPE | +$1.81B | per-day (96%) | 4.9297% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | scripts/onchain/hype/tokenomics.js | onchain_equivalent |  |
| buybacks | data/onchain/hype-af/buybacks.json | onchain |  |
| burns | — | n/a | HYPE does not burn |
| treasury_accumulation | — | n/a | AF is buyback_wallet not treasury_wallet — already counted as buybacks |
| treasury_sells | — | n/a | AF only buys |
| net_staking_lockups | data/onchain/hype/staking.json | onchain | Daily snapshots accumulate over time. Until ≥2 snapshots exist, delta=0 for historical days. Static stock figure surfaced in the report's reference section. |

### Recent daily series (last 14 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-13 | 0 | 35.2K | −35.2K | −$1.41M |
| 2026-05-14 | 0 | 40.8K | −40.8K | −$1.58M |
| 2026-05-15 | 0 | 37.7K | −37.7K | −$1.69M |
| 2026-05-16 | 0 | 23.6K | −23.6K | −$1.04M |
| 2026-05-17 | 0 | 24.3K | −24.3K | −$1.02M |
| 2026-05-18 | 0 | 2.2K | −2.2K | −$99.7K |
| 2026-05-19 | 0 | 2.6K | −2.6K | −$127.3K |
| 2026-05-20 | 0 | 3.1K | −3.1K | −$146.8K |
| 2026-05-21 | 0 | 977 | −977 | −$54.1K |
| 2026-05-22 | 0 | 14.6K | −37.7K | −$2.17M |
| 2026-05-23 | 0 | 16.6K | −16.6K | −$1.02M |
| 2026-05-24 | 0 | 21.5K | −21.5K | −$1.32M |
| 2026-05-25 | 0 | 17.1K | −17.1K | −$1.05M |
| 2026-05-26 | 0 | 25.4K | −25.4K | −$1.56M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-29 | 7.53M | $462.88M |
| 2026-06-06 | 9.92M | $609.48M |
| 2026-06-29 | 7.53M | $462.88M |
| 2026-07-06 | 9.92M | $609.48M |
| 2026-07-29 | 7.53M | $462.88M |
| 2026-08-06 | 9.92M | $609.48M |
| 2026-08-29 | 7.53M | $462.88M |
| 2026-09-06 | 9.92M | $609.48M |


---

## Aave (AAVE)

**Price:** $86.00    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $86.00 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 AAVE | $0 | today @ $86.00 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 AAVE | $0 | today @ $86.00 | 0.0000% |
| 90d | ⚠ 47/90d partial | 0 | 96.4K | 🟢 −96.4K AAVE | −$8.29M | today @ $86.00 | 0.0000% |

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
| 2026-04-07 | 0 | 917 | −917 | −$78.8K |
| 2026-04-08 | 0 | 897 | −897 | −$77.2K |
| 2026-04-09 | 0 | 930 | −930 | −$79.9K |
| 2026-04-10 | 0 | 935 | −935 | −$80.4K |
| 2026-04-11 | 0 | 935 | −935 | −$80.4K |
| 2026-04-12 | 0 | 944 | −944 | −$81.2K |
| 2026-04-13 | 0 | 900 | −900 | −$77.4K |
| 2026-04-14 | 0 | 909 | −909 | −$78.2K |
| 2026-04-15 | 0 | 879 | −879 | −$75.6K |
| 2026-04-16 | 0 | 639 | −639 | −$54.9K |
| 2026-04-17 | 0 | 600 | −600 | −$51.6K |
| 2026-04-18 | 0 | 825 | −825 | −$70.9K |
| 2026-04-19 | 0 | 714 | −714 | −$61.4K |
| 2026-05-26 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |

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

### Recent daily series (last 1 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-26 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.26    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.26 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.26 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.26 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.26 | 0.0000% |

Sign convention: positive = supply hitting market (net seller); negative = protocol absorbing more than it emits (net buyer). 🟢 = net buyer, 🔴 = net seller.

### Component coverage

| Component | Source | Verification | Note |
|---|---|---|---|
| unlocks | — | n/a | Pre-cliff (Dec 22 2026) — no team unlocks. Tokenomics module pending. |
| buybacks | — | n/a | zkLighter L2 /api/v1/trades requires Lighter API key (acquisition #3 in DATA-SOURCES.md). Until obtained, buyback flow can't be ingested. |
| burns | — | n/a | Unknown — verify whether Lighter burns vs holds after API key obtained |
| treasury_accumulation | — | n/a | L2 protocol accounts not yet discovered |
| treasury_sells | — | n/a |  |
| net_staking_lockups | — | n/a | LIT L2 staking contract not yet identified |


---
