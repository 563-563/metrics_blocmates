# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-05-28T23:45:28.906Z
**As-of:** 2026-05-28

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

Unlocks are **sell-probability weighted** (team 0.10, foundation/emissions 0.30-0.40, airdrop 0.20) so scheduled vesting that is mostly re-staked does not overstate market pressure. Gross (100% sell-through) net pressure is carried alongside as `net_pressure_usd_gross`. HM is unaffected — it uses gross 24mo unlocks for Adjusted MCap.

## Hyperliquid (HYPE)

**Price:** $61.80    **Circulating:** 495.27M HYPE    **AF balance:** 44.63M HYPE    **Total staked:** 431.64M HYPE (87.2% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 33.1K | 🟢 −664.5K HYPE | −$41.07M | today @ $61.80 | -0.0665% |
| 7d | 7/7d | 0 | 114.2K | 🟢 −1.57M HYPE | −$97.18M | per-day (14%) | -0.1574% |
| 30d | 30/30d | 17.45M | 718.4K | 🔴 +1.83M HYPE | +$41.33M | per-day (80%) | 0.1826% |
| 90d | 90/90d | 52.34M | 2.95M | 🔴 +7.60M HYPE | +$236.44M | per-day (93%) | 0.7603% |

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
| 2026-05-15 | 0 | 37.7K | −37.7K | −$1.69M |
| 2026-05-16 | 0 | 23.6K | −23.6K | −$1.04M |
| 2026-05-17 | 0 | 24.3K | −24.3K | −$1.02M |
| 2026-05-18 | 0 | 2.2K | −2.2K | −$99.7K |
| 2026-05-19 | 0 | 2.6K | −2.6K | −$127.3K |
| 2026-05-20 | 0 | 3.1K | −3.1K | −$146.8K |
| 2026-05-21 | 0 | 977 | −977 | −$54.1K |
| 2026-05-22 | 0 | 14.6K | −14.6K | −$844.7K |
| 2026-05-23 | 0 | 1.4K | −28.0K | −$1.73M |
| 2026-05-24 | 0 | 6.7K | −6.7K | −$414.8K |
| 2026-05-25 | 0 | 922 | −257.2K | −$15.89M |
| 2026-05-26 | 0 | 31.4K | −31.4K | −$1.94M |
| 2026-05-27 | 0 | 25.9K | −571.0K | −$35.29M |
| 2026-05-28 | 0 | 33.1K | −664.5K | −$41.07M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-29 | 7.53M | $465.44M |
| 2026-06-06 | 9.92M | $612.85M |
| 2026-06-29 | 7.53M | $465.44M |
| 2026-07-06 | 9.92M | $612.85M |
| 2026-07-29 | 7.53M | $465.44M |
| 2026-08-06 | 9.92M | $612.85M |
| 2026-08-29 | 7.53M | $465.44M |
| 2026-09-06 | 9.92M | $612.85M |


---

## Aave (AAVE)

**Price:** $80.77    **Circulating:** 0 AAVE    **AF balance:** 0 AAVE    **Total staked:** 0 AAVE

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 AAVE | $0 | today @ $80.77 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −3.9K AAVE | −$315.0K | today @ $80.77 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −3.9K AAVE | −$315.0K | today @ $80.77 | 0.0000% |
| 90d | ⚠ 45/90d partial | 0 | 94.2K | 🟢 −98.1K AAVE | −$7.92M | today @ $80.77 | 0.0000% |

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
| 2026-04-09 | 0 | 930 | −930 | −$75.1K |
| 2026-04-10 | 0 | 935 | −935 | −$75.5K |
| 2026-04-11 | 0 | 935 | −935 | −$75.5K |
| 2026-04-12 | 0 | 944 | −944 | −$76.2K |
| 2026-04-13 | 0 | 900 | −900 | −$72.7K |
| 2026-04-14 | 0 | 909 | −909 | −$73.4K |
| 2026-04-15 | 0 | 879 | −879 | −$71.0K |
| 2026-04-16 | 0 | 639 | −639 | −$51.6K |
| 2026-04-17 | 0 | 600 | −600 | −$48.5K |
| 2026-04-18 | 0 | 825 | −825 | −$66.6K |
| 2026-04-19 | 0 | 714 | −714 | −$57.6K |
| 2026-05-26 | 0 | 0 | −103 | −$8.3K |
| 2026-05-27 | 0 | 0 | −3.8K | −$306.7K |
| 2026-05-28 | 0 | 0 | 0 | $0 |


---

## Sky (SKY)

**Price:** $0.07    **Circulating:** 0 SKY    **AF balance:** 0 SKY    **Total staked:** 0 SKY

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 SKY | $0 | today @ $0.07 | 0.0000% |
| 7d | ⚠ 0/7d partial | 0 | 0 | 🟢 −385 SKY | −$25.08 | today @ $0.07 | 0.0000% |
| 30d | ⚠ 0/30d partial | 0 | 0 | 🟢 −385 SKY | −$25.08 | today @ $0.07 | 0.0000% |
| 90d | ⚠ 0/90d partial | 0 | 0 | 🟢 −385 SKY | −$25.08 | today @ $0.07 | 0.0000% |

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

### Recent daily series (last 3 days)

| Date | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) |
|---|---|---|---|---|
| 2026-05-26 | 0 | 0 | −385 | −$25.08 |
| 2026-05-27 | 0 | 0 | 0 | $0 |
| 2026-05-28 | 0 | 0 | 0 | $0 |


---

## Lighter (LIT)

**Price:** $1.17    **Circulating:** 0 LIT    **AF balance:** 0 LIT    **Total staked:** 0 LIT

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | ⚠ 0/1d partial | 0 | 0 | · 0 LIT | $0 | today @ $1.17 | 0.0000% |
| 7d | 6/7d | 0 | 325.5K | 🟢 −325.5K LIT | −$417.6K | per-day (100%) | 0.0000% |
| 30d | 29/30d | 0 | 1.98M | 🟢 −1.98M LIT | −$2.00M | per-day (100%) | 0.0000% |
| 90d | 88/90d | 0 | 6.76M | 🟢 −6.76M LIT | −$7.05M | per-day (100%) | 0.0000% |

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
| 2026-05-27 | 0 | 55.8K | −55.8K | −$66.5K |


---
