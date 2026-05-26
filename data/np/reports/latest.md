# Net Pressure (TP) — Cohort Snapshot

**Generated:** 2026-05-26T14:56:48.877Z
**As-of:** 2026-05-26

Formula:

```
Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)
```

Coverage is per-protocol. Components without an on-chain source contribute zero and are flagged `verification: n/a` in the component table for that protocol.

## Hyperliquid (HYPE)

**Price:** $63.73    **Circulating:** 495.27M HYPE    **AF balance:** 44.56M HYPE    **Total staked:** 431.25M HYPE (87.1% of circ)

### Net Pressure roll-ups

| Window | Buyback coverage | Unlocks (source) | Buybacks (sink) | Net Pressure (tokens) | Net Pressure (USD) | USD method | % of supply |
|---|---|---|---|---|---|---|---|
| 24h | 1/1d | 0 | 18.5K | 🟢 −18.5K HYPE | −$1.18M | today @ $63.73 | -0.0019% |
| 7d | 7/7d | 0 | 101.3K | 🟢 −124.3K HYPE | −$7.64M | per-day (43%) | -0.0124% |
| 30d | 30/30d | 17.45M | 760.4K | 🔴 +16.66M HYPE | +$700.22M | per-day (87%) | 1.6665% |
| 90d | 90/90d | 52.34M | 3.03M | 🔴 +49.29M HYPE | +$1.81B | per-day (96%) | 4.9295% |

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
| 2026-05-23 | 0 | 25.4K | −25.4K | −$1.62M |
| 2026-05-24 | 0 | 21.5K | −21.5K | −$1.37M |
| 2026-05-25 | 0 | 17.1K | −17.1K | −$1.09M |
| 2026-05-26 | 0 | 18.5K | −18.5K | −$1.18M |

### Next 8 projected unlocks

| Date | Unlocks (tokens) | Unlocks @ today's price |
|---|---|---|
| 2026-05-29 | 7.53M | $479.97M |
| 2026-06-06 | 9.92M | $631.99M |
| 2026-06-29 | 7.53M | $479.97M |
| 2026-07-06 | 9.92M | $631.99M |
| 2026-07-29 | 7.53M | $479.97M |
| 2026-08-06 | 9.92M | $631.99M |
| 2026-08-29 | 7.53M | $479.97M |
| 2026-09-06 | 9.92M | $631.99M |


---
