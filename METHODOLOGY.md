# Methodology — Inputs per protocol

This document defines exactly what numbers we need to compute Holder Multiple (HM) and Net Pressure (TP) for each protocol in the cohort. Every input is named, defined, and given a per-protocol calculation method. The result is the source-of-truth spec the adapters and `data/hm/config.json` are built against.

If a number isn't in this doc, it doesn't belong in the pipeline.

---

## Section 0 — Definitions

### Holder Multiple

```
Adjusted MCap     = Float MCap
                  + 24mo Unlocks
                  + 24mo Emissions
                  − 24mo Buybacks

Real Capture      = Annual Buyback (Cat A)
                  + Annual External Holder Yield (Cat B)

HM                = Adjusted MCap / Real Capture
```

The Holder Multiple is a forward-looking valuation ratio. Numerator captures *future tradeable supply at today's price*. Denominator captures *cash the protocol will return to native-token holders over a forward year*.

### Net Pressure

```
Net Pressure_day  = (Unlocks + Treasury Sells)
                  − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups)
```

Daily series. Sinks on the right side only count when positive — unstaking and treasury depletion are not added back to the pressure side (they belong to their own opposite-direction column).

---

## Section 1 — HM inputs

Six numbers plus a few derived. Listed in the order they appear in the formula.

### 1.1 Token price

**Definition:** USD per token, single number at compute time.

**Why it matters:** Multiplies every token-denominated input (circulating supply, unlocks, emissions) into USD for HM math. A 10% price move shifts HM ~10% in the same direction (numerator scales with price; denominator is largely $-denominated and doesn't).

**Aggregation:** spot. We don't use averages here — the breakdown is "if I marked this position today, here's the HM."

**Per-protocol source:**

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | HL Info API `metaAndAssetCtxs` → `markPx` for HYPE perp (canonical) | Spot HYPE on HyperCore is user-deployed and not the real one. Use the perp mark. |
| **AAVE** | CoinGecko `coins/markets` | Standard ERC-20 with deep CEX liquidity; CG is accurate. |
| **SKY** | CoinGecko `coins/markets` | Same — Standard ERC-20. |
| **LIT** | CoinGecko `coins/markets`; cross-check zkLighter `/api/v1/orderBookDetails?market_id=2049` | LIT/USDC spot on Lighter L2 is the protocol's own market — useful sanity check, but CG aggregates multiple venues which is what we want for "the price." |

**Validation:** if CG and a venue-specific price disagree by >5%, something is broken (CG outage, asset is illiquid, or one source is stale). Flag in the verification metadata.

### 1.2 Circulating supply

**Definition:** Tokens currently in tradeable hands. Excludes locked vesting balances, unmined emissions, and any "non-circulating" carve-outs the protocol itself acknowledges.

**Why it matters:** Float MCap = price × circulating. The single biggest line in the numerator.

**Important nuance:** "Circulating" is methodology-dependent. CG often excludes more than the protocol-published number. For HM we want the **protocol's own methodology** so HM lines up with how an LP would compute it themselves.

**Per-protocol source:**

| Protocol | Primary source | Alternate / verification |
|---|---|---|
| **HYPE** | ASXN `af-buyback-metrics.current_metrics.circulating_supply` (298.6M) — matches `hypeburn.fun` methodology used by the article | CG (238M) excludes more — gap is ~60M tokens, mostly buckets in vesting that have technically released but not landed in liquid hands |
| **AAVE** | CG `circulating_supply` (15.18M) | On-chain: `AAVE.totalSupply() − balance(EcosystemReserve) − balance(Collector)`. Should match CG within 1%. |
| **SKY** | CG `circulating_supply` (~23.2B) | On-chain: `SKY.totalSupply() − non-circulating wallets resolved via ChainLog`. 98.9% circulating per protocol docs. |
| **LIT** | CG `circulating_supply` (250M at TGE float) | On-chain: `LIT.totalSupply() − Escrow.balance − sum(vesting contract balances)`. Vesting contracts on L1 need to be discovered first. |

**Validation:** every adapter snapshot writes both the source-reported and on-chain-derived numbers when both are available. If they diverge by >2%, the report flags it.

### 1.3 24mo Unlocks (in tokens, converted to USD at compute time)

**Definition:** Total tokens scheduled to release from vesting / scheduled distributions over the next 24 months from today.

**Why it matters:** Forward dilution. Adds to Adj MCap because it's tradeable supply that will exist at today's price.

**Aggregation:** sum across all vesting buckets, restricted to events where `unlock_date ∈ (today, today + 24mo)`.

**Per-protocol source:**

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | `scripts/onchain/hype/tokenomics.js` — deterministic schedule | Only `core_contributors` bucket has unlocks in this window. Future emissions go to category 1.4. **Active.** |
| **AAVE** | Editorial seed: 0 tokens | No team vesting active; 99.9% circulating. Confirm by reading any AAVE vesting contracts on Etherscan (none documented). |
| **SKY** | Editorial seed: 0 tokens | 98.9% circulating per protocol; no remaining schedule. Cross-check by inspecting `SKY` token's largest holders. |
| **LIT** | Editorial seed: 216M LIT — cliff Dec 22 2026 then 13.5M/mo over 36mo | Source: Lighter governance docs / Whale Alert summary. Verify by reading vesting contracts on L1 once addresses are discovered. |

**Validation:** the sum must match the protocol's published "team + investor + non-circulating reserved tokens" within rounding. If a protocol later updates its vesting schedule (e.g. extends a cliff), the seed must be updated by hand.

### 1.4 24mo Emissions (in tokens)

**Definition:** Tokens projected to enter circulation from non-vesting sources — staking rewards, foundation drips, ecosystem grants paid in native token — over the next 24 months.

**Why it matters:** Same as 1.3 (forward dilution). Separated from 1.3 because emissions usually come from a foundation reserve with discretionary cadence, vs. vesting which is contract-enforced.

**Per-protocol source:**

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | tokenomics.js — `future_emissions` + `hyper_foundation` + `community_grants` summed over 24mo | These are paid from "Future Emissions" reserve as stkHYPE rewards (Category C — dilution rebate). |
| **AAVE** | Editorial seed: 285K AAVE | Safety Module incentives + Service Provider compensation. Verify by reading `Transfer` events from `Ecosystem Reserve` (`0x25f2226b...`) to stkAAVE — annualized × 2 should approximate this number. |
| **SKY** | Editorial seed: 0 | Staking yield is **NOT** paid in new SKY (it's paid in USDS or bought-back SKY — see Section 5 open questions). |
| **LIT** | Editorial seed: 22.27M LIT staking emissions over 24mo | Source: Lighter governance docs. Verify when L2 staking contract is identified. |

**Validation:** if the on-chain reserve outflow rate (annualized) doesn't match the seed within 20%, something's off — either the seed needs updating or our reserve-balance read is wrong.

### 1.5 24mo Buybacks (USD)

**Definition:** Total USD the protocol is projected to spend buying back its own token over the next 24 months.

**Why it matters:** Subtracts from Adj MCap because those tokens leave the market. Note the **asymmetric horizon**: forward unlocks AND forward buybacks both use a 24-month window, so HM is internally consistent.

**Aggregation:** `annual_buyback_usd × 2` for most cases. Phased programs (like SKY) require a phase-aware projection.

**Per-protocol source:**

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | `annual_buyback_usd × 2`, where annual = 60d SMA of on-chain AF buybacks × 365 | Currently ~$483M/yr × 2 = $966M. Lifetime ann = ~$770M/yr × 2 — flagged in the report's "rate lens" alongside. |
| **AAVE** | $30M/yr × 2 = $60M (ARFC budget) — until on-chain rate replaces it | When the adapter lands: replace with 60d SMA of Transfer events into Collector. ARFC could change via governance — flag in seed notes when it does. |
| **SKY** | Phase-dependent: $0 during Phase 1 (current); ~$X during Phase 3 | When ABC reaches $150M floor, SBE re-activates. Forward projection should weight by expected phase-transition date — likely 2027-2028. For now: $0 is correct. |
| **LIT** | $25.53M/yr × 2 = $51M (governance-stated 99.5% of post-LLP rev) | When Lighter API access lands: replace with 60d SMA of zkLighter buyback fills × 365. |

**Validation:** for protocols with an active on-chain feed, the seeded `annual_buyback_usd` should be within 25% of the on-chain rate at any time. Big divergence = update the seed or surface as a flag.

### 1.6 Annual Buyback (Category A)

**Definition:** USD per year the protocol is currently directing to buy back its native token from market.

**Why it matters:** Numerator side of Real Capture. The primary value-accrual line.

**Aggregation:** 60-day simple moving average × 365. (Was 30d; 60d smooths single-day noise without losing regime-change responsiveness.)

**Per-protocol source:**

| Protocol | Source (target) | Status | Notes |
|---|---|---|---|
| **HYPE** | HL Info API `userFills(0xfefe...fefe)` filtered to `side=B && coin=@107`, daily aggregated, 60d SMA × 365 | ✓ live | AF spot fills are the canonical buyback. ~30 days of trailing history per API call. ASXN backfilled the 14-month tail one-shot. |
| **AAVE** | Alchemy `eth_getLogs` for `Transfer(AAVE)` events with `to=Collector (0x464C...)` | ✗ pending | Filter `from` to known DAO/treasury source wallets to distinguish buybacks from random inflows. Or simpler: sum any net AAVE inflow to Collector and trust ARFC accounting. |
| **SKY** | SBE Splitter (`0xBF7111...`) event logs — burns to `0x0` | ✗ pending (Phase 1 will return 0 until ABC fills) | Once Phase 3 activates, this is the burn-as-buyback rate. |
| **LIT** | zkLighter `/api/v1/trades?market_id=2049&account_index=<protocol>` filtered to buy-side | ✗ blocked on Lighter API key + protocol account discovery | LIT/USDC market id is confirmed 2049. The protocol account is still unknown. |

**Validation:** the on-chain 60d × 365 must reconcile with the lifetime cumulative × (365/days_observed) within an explainable variance. Big short-term divergence = the rate just changed (signal). Big long-term divergence = our aggregation is buggy.

**Buyback verification flag** travels with this number:
- `onchain` — verified via direct on-chain read
- `governance_stated` — taken from a governance budget or doc without on-chain verification
- `proxy` — derived from a related metric (e.g. DefiLlama `holdersRevenue` × capture rate)
- `n/a` — no buyback mechanism

### 1.7 Annual External Holder Yield (Category B)

**Definition:** USD per year of stable-denominated yield paid to stakers of the **native token**, sourced from protocol revenue.

**Why it matters:** Numerator side of Real Capture. Counts because real cash flows to holders. Excluded if it's native-token-denominated (that's Category C — dilution rebate, not real capture).

**Per-protocol source:**

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | n/a — $0 | HYPE staking rewards are HYPE-denominated, paid from Future Emissions allocation. Category C. |
| **AAVE** | n/a — $0 | stkAAVE Safety Module rewards are AAVE-denominated emissions from Ecosystem Reserve. Category C. |
| **SKY** | **OPEN QUESTION** — see Section 5 | Article states $72M/yr in USDS to stkSKY holders. Some public sources describe bought-back SKY being distributed instead. Resolve by reading Sky Staking Engine `Transfer` events to identify the asset being paid out. |
| **LIT** | n/a — $0 | LIT staking emissions are LIT-denominated from the Ecosystem allocation. Category C. |

**Critical guardrail:** Category B requires the staker to be a holder of the **native token**. ENA's USDe→sUSDe yield is real cashflow yield, but it accrues to USDe stablecoin holders, not ENA token holders — so it does NOT count toward ENA's Real Capture. SKY stakers earning USDS *would* count because they're holding SKY.

**Verification flag** same set as 1.6.

---

## Section 2 — TP inputs

Daily series. Same protocol → input matrix.

### 2.1 Daily Unlocks

**Definition:** Tokens that vested out of contracts/schedules on the given UTC date.

**Aggregation:** sum of all vesting events on that date.

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | `tokenomics.js → generateUnlockSchedule()` — monthly tranches | core_contributors unlocks on the 6th of each month (Jan-Dec); other buckets on the 29th. Deterministic. |
| **AAVE** | 0 (no vesting active) | n/a |
| **SKY** | 0 (no remaining schedule) | n/a |
| **LIT** | tokenomics module (TBD): 0 until Dec 22 2026, then 13.5M/mo × 36mo from cliff | Module not yet written; seed exists in HM config |

### 2.2 Daily Treasury Sells

**Definition:** Tokens the protocol's own treasury sold to market on the given date (cash on protocol side, native token on market side).

**Aggregation:** sum of treasury wallet `Transfer` events going out to non-protocol addresses (likely DEX routers).

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | n/a — AF only buys | The AF wallet is monodirectional in practice. |
| **AAVE** | Alchemy `eth_getLogs` for AAVE Transfer from Collector to non-treasury addresses | Rare — Aave Collector mostly buys, but governance can choose to sell. Cover by monitoring. |
| **SKY** | Track outflows from Sky Treasury wallets (resolved via ChainLog) | The PSM and surplus mechanics may include programmatic SKY sales — verify. |
| **LIT** | L1 Escrow outflows of LIT to non-protocol addresses | Likely zero in practice. |

### 2.3 Daily Buybacks

**Definition:** Daily aggregated tokens the protocol bought back from market.

**Aggregation:** daily UTC bucket of buyback events.

Per-protocol: same source as 1.6 (Annual Buyback), aggregated per day instead of trailing-window-averaged. The annual number in 1.6 is literally the rolling 60-day sum × (365/60) of this daily series.

### 2.4 Daily Burns

**Definition:** Tokens permanently destroyed on the given date.

**Aggregation:** sum of Transfer events to `0x0` for the native token contract.

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | n/a | HYPE doesn't burn. |
| **AAVE** | n/a | AAVE doesn't burn (buybacks accumulate in Collector). |
| **SKY** | SBE Splitter — Transfer to 0x0 from `0xBF7111...` | Phase 1: $0. Phase 3: will become non-zero. For SKY, burns = buybacks (the SBE is the burn engine). |
| **LIT** | Unknown — need to verify whether Lighter burns or just holds | If Lighter buys-and-holds rather than burning, classify under Treasury Accumulation instead. |

### 2.5 Daily Treasury Accumulation

**Definition:** Net change in protocol-controlled wallet balances of the native token, on the given date.

**Aggregation:** end-of-day snapshot of treasury wallet balance, diffed against previous day.

**Critical rule:** **Don't double-count buybacks.** For protocols where the buyback wallet IS the treasury wallet (HYPE: AF buys and holds), counting both buybacks AND treasury accumulation double-counts the same flow.

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | 0 (intentional) | AF is `buyback_wallet`, not a separate `treasury` wallet. The accumulation IS the buyback. |
| **AAVE** | Daily snapshot of `AAVE.balanceOf(Collector)`. Subtract daily buyback inflow to avoid double-count. | Alternatively: only count treasury accumulation from sources OTHER than buybacks (governance grants, lending revenue routed to treasury). |
| **SKY** | ABC wallet daily USDS balance Δ (Phase 1 fill); separate from SKY treasury accumulation | Track these as TWO components: USDS into ABC (Phase 1 mechanic) + SKY held by Treasury (no formal accumulation today). |
| **LIT** | L1 Escrow LIT balance Δ | Plus L2 protocol account once identified. |

### 2.6 Daily Net Staking Lockups

**Definition:** Tokens locked into staking minus tokens unstaked on the given date.

**Aggregation:** total-staked snapshot daily, diffed against previous day. Positive Δ counts as sink; negative Δ is ignored (unstaking doesn't add to the pressure side — it has its own opposite direction).

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | HL Info API `validatorSummaries` → sum(`stake`) for all validators, daily snapshot, diff day-over-day | Stake is in 8-decimal native units; divide by 1e8. Currently ~431.4M HYPE staked, 87% of circulating. |
| **AAVE** | `stkAAVE.totalSupply()` daily, diff | Standard ERC-20 view function. |
| **SKY** | Sky Staking Engine totalSupply / staked-position view, daily, diff | Contract address TBD — see Section 5. |
| **LIT** | LIT staking contract on zkLighter L2 | Contract address + access mechanism TBD. |

### 2.7 Per-day price (for USD conversion of daily NP)

**Definition:** End-of-day price on each historical date in the series. Used so the 90d USD figure reflects the actual price of tokens-flowing-that-day rather than today's price multiplied across history.

| Protocol | Source | Notes |
|---|---|---|
| **HYPE** | ASXN `hype-price.json` — 14 months of daily OHLCV | One-shot backfill in place; ongoing daily refresh from CG `market_chart` for going forward. |
| **AAVE** | CG `coins/aave/market_chart?days=180` daily | Free tier covers 365 days of history. |
| **SKY** | CG `coins/sky/market_chart?days=180` daily | Same. |
| **LIT** | CG `coins/lighter/market_chart?days=180` daily | Same. |

---

## Section 3 — Per-protocol cheat sheet

One row per protocol, all inputs visible at a glance.

### HYPE

| Input | Source | Cadence | Current verification |
|---|---|---|---|
| Price | HL Info API `metaAndAssetCtxs.markPx` | live | onchain |
| Circulating supply | ASXN `current_metrics.circulating_supply` | hourly | onchain |
| 24mo Unlocks | tokenomics.js — `core_contributors` | static | onchain_equivalent |
| 24mo Emissions | tokenomics.js — `future_emissions + foundation + grants` | static | onchain_equivalent |
| 24mo Buybacks | annual × 2 | computed | onchain |
| Annual Buyback (A) | HL Info API AF userFills, 60d SMA × 365 | hourly | onchain |
| Holder Yield (B) | n/a (Cat C only) | — | n/a |
| Daily Unlocks | tokenomics schedule | static | onchain_equivalent |
| Daily Buybacks | HL Info API AF userFills, per UTC date | hourly | onchain |
| Daily Burns | n/a | — | n/a |
| Daily Treasury Accumulation | counted as buybacks (no separate treasury wallet) | — | n/a |
| Daily Staking Lockups | HL `validatorSummaries`, daily Δ | daily | onchain (forward-only history) |
| Per-day price | ASXN hype-price + CG ongoing | daily | onchain |

### AAVE

| Input | Source (target) | Cadence | Current verification |
|---|---|---|---|
| Price | CG `coins/markets` | hourly | onchain |
| Circulating supply | CG; cross-check `AAVE.totalSupply() − reserves` via Alchemy | hourly | onchain (via CG) |
| 24mo Unlocks | 0 (editorial) | static | onchain_equivalent |
| 24mo Emissions | Editorial 285K AAVE — verify via Ecosystem Reserve outflow rate | static | governance_stated |
| 24mo Buybacks | $60M ($30M/yr × 2 ARFC) | static | governance_stated |
| Annual Buyback (A) | Alchemy Transfer events to Collector, 60d SMA × 365 | hourly | governance_stated → onchain when adapter lands |
| Holder Yield (B) | n/a (Safety Module is Cat C) | — | n/a |
| Daily Unlocks | 0 | — | n/a |
| Daily Buybacks | Alchemy Transfer events to Collector | hourly | governance_stated → onchain |
| Daily Burns | n/a | — | n/a |
| Daily Treasury Accumulation | Collector balance Δ minus daily buybacks (to avoid double-count) | daily | governance_stated → onchain |
| Daily Staking Lockups | `stkAAVE.totalSupply()` Δ | daily | governance_stated → onchain |
| Per-day price | CG market_chart | daily | onchain (price feed) |

### SKY

| Input | Source (target) | Cadence | Current verification |
|---|---|---|---|
| Price | CG `coins/markets` | hourly | onchain |
| Circulating supply | CG; cross-check via SKY token + ChainLog-resolved non-circulating wallets | hourly | onchain (via CG) |
| 24mo Unlocks | 0 (editorial) | static | onchain_equivalent |
| 24mo Emissions | 0 (staking yield not paid in new SKY) | static | governance_stated |
| 24mo Buybacks | 0 during Phase 1 (current) | static | governance_stated |
| Annual Buyback (A) | SBE Splitter event logs (Phase 1: 0) | hourly | governance_stated → onchain |
| Holder Yield (B) | **UNCERTAIN** — article says $72M/yr USDS; mechanism needs on-chain verification | annual | governance_stated; UPGRADE PATH = read Staking Engine Transfer events |
| Daily Unlocks | 0 | — | n/a |
| Daily Buybacks | SBE event logs (zero during Phase 1) | hourly | governance_stated → onchain |
| Daily Burns | Same as buybacks (SBE IS the burn engine) | hourly | governance_stated → onchain |
| Daily Treasury Accumulation | ABC USDS balance Δ + Sky Treasury SKY Δ (separately tracked) | daily | governance_stated → onchain |
| Daily Staking Lockups | Sky Staking Engine totalSupply Δ | daily | governance_stated → onchain |
| Per-day price | CG market_chart | daily | onchain (price feed) |

### LIT

| Input | Source (target) | Cadence | Current verification |
|---|---|---|---|
| Price | CG `coins/markets`; cross-check zkLighter `/orderBookDetails?market_id=2049` | hourly | onchain |
| Circulating supply | CG; cross-check `LIT.totalSupply() − Escrow.balance − vesting balances` | hourly | onchain (via CG) |
| 24mo Unlocks | 216M LIT (cliff Dec 22 2026 + 36mo linear) | static | governance_stated |
| 24mo Emissions | 22.27M LIT staking emissions (Cat C) | static | governance_stated |
| 24mo Buybacks | $51M ($25.53M/yr × 2 governance-stated) | static | governance_stated |
| Annual Buyback (A) | zkLighter `/api/v1/trades?market_id=2049&account_index=<protocol>` filtered to buy-side, 60d SMA × 365 | hourly | governance_stated → onchain when Lighter API key + protocol account discovered |
| Holder Yield (B) | n/a (Cat C only) | — | n/a |
| Daily Unlocks | tokenomics module (TBD): 0 until cliff, then 13.5M/mo × 36mo | static | governance_stated → onchain_equivalent |
| Daily Buybacks | zkLighter trades on market 2049 by protocol account | hourly | governance_stated → onchain |
| Daily Burns | TBD — verify whether Lighter burns or holds | hourly | unknown |
| Daily Treasury Accumulation | L1 Escrow balance Δ + L2 protocol account Δ | daily | governance_stated → onchain |
| Daily Staking Lockups | LIT L2 staking contract Δ | daily | governance_stated → onchain |
| Per-day price | CG market_chart | daily | onchain (price feed) |

---

## Section 4 — Methodological caveats

### 4.1 Phase transitions (SKY-specific)

SKY's value-capture mechanism flips at the ABC turbo-fill floor ($150M). Until then: Phase 1 — SBE bypassed, $0 buybacks, theoretically some USDS yield to stkSKY. After: Phase 3 — SBE active, buybacks resume.

**Implication for HM input:** the "24mo buybacks" line should weight by the expected phase-transition date, not assume Phase 1 holds for the full 24 months. Today (May 2026), with ABC at ~$60-70M and Phase 1 fill rate of ~$72M/yr, the transition is plausibly 12-14 months out. So the 24mo window contains ~12 months of Phase 1 ($0 buyback) + ~12 months of Phase 3 (active rate, TBD).

**For v1**: keep the seeded $0 and document the phase-aware projection as a v2 enhancement.

### 4.2 Circulating supply definitions

Three numbers in play for any given protocol:
- **CG circulating** — what CoinMarketCap-style aggregators report.
- **Protocol-published circulating** — what the protocol's own docs/dashboard claim.
- **On-chain derived** — totalSupply minus known non-circulating wallets.

These can disagree by 20%+ (HYPE was a 60M-token disagreement). The HM input should match the **methodology used in the article being benchmarked** — for the published HM article, that's the protocol-published / hypeburn.fun definition for HYPE.

Document the choice in the seed `circulating_supply_source` field per protocol.

### 4.3 Per-day vs spot price

- **HM** uses spot price (Section 1.1). It's a forward-looking ratio so "if I marked this at today's price" is the right framing.
- **TP** uses per-day price (Section 2.7) when summing across multiple days. A 90-day USD rollup that multiplies all 90 days' token flows by today's price is wrong if price has moved.

### 4.4 60-day SMA windowing on Annual Buyback

The buyback rate is rolling 60-day daily-average × 365. Trade-offs:
- 7d is too noisy (single buyback day distorts).
- 30d still has weekly noise.
- 60d is responsive enough to catch regime changes within a month or two.
- 90d / lifetime is too slow — would have missed HYPE's 40% rate decline this year.

Configurable per protocol via `onchain_buyback_annualize_days` in the seed.

Every report also surfaces the "lifetime annualized" as a comparison lens — recent rate vs structural rate. A divergence >30% is itself a signal.

### 4.5 Reproduce-article mode

`scripts/hm/compute-hm.js --reproduce-article` must always produce **SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×** when the seed values match the published article. This is the regression test.

In this mode: on-chain feed overrides are bypassed, and `article_price_usd` + `article_circulating_tokens` are used directly. Any compute-layer change must keep this passing.

---

## Section 5 — Open methodological questions

The list of things we genuinely don't know yet — each one a potential HM accuracy risk.

### 5.1 SKY Cat B distribution mechanism — RESOLVED 2026-05-26

**Verdict:** Cat B mechanism IS USDS distribution to lockstake-SKY holders. **And it has been dormant for 200+ days.**

**Resolution path executed:**
- ChainLog (`0xdA0Ab1e0...`) resolved `REWARDS_LSSKY_USDS = 0x38E4254bD82ED5Ee97CD1C4278FAae748d998865` — the canonical USDS rewards farm for lockstake-SKY positions.
- 365d Transfer event inspection: 6,325 USDS inflow events totaling $38.5M; 0 SKY outflows. **Mechanism confirmed = USDS distribution (Cat B), not bought-back SKY (Cat A redistribute).**
- BUT: inflows stopped 2025-11-03 (204+ days ago). Outflows continue as stakers drain the existing $302K balance. **Current Cat B rate = $0/yr on-chain.**
- Splitter (`MCD_SPLIT = 0xbf7111f1...`) shows 0 USDS / 0 SKY outflows in 90d. SBE Flapper (`MCD_FLAP = 0x374d9c3d...`) shows 0 burns in 90d. Whole legacy surplus distribution mechanism is dormant.

**Implications for HM:** SKY's HM at 22.7× (with $72M Cat B) was based on the article's stated rate. **On-chain reality: Real Capture = $0 → HM = ∞× (no real capture).** The current state is either a Phase 1 framework restructure (revenue may be routed through a newer set of contracts we haven't found, or buffered awaiting a future distribution), or a genuine pause.

**Adapter wired:** `scripts/onchain/sky/fetch-rewards-farm.js` writes `data/onchain/sky/cat-b-inflows.json`. Compute layer reads it via `onchain_holder_yield_path` in the seed and surfaces the dormancy in the report. Verification flag = `onchain_dormant`.

**Still open (smaller):** whether a NEWER rewards farm or distribution contract exists post the April 2026 TMF framework update. ChainLog key search for `LOCKSTAKE_ENGINE_V2`, `LSEV2`, etc. returned `REVERT (invalid-key)` as of 2026-05-26 — if a new contract has been deployed and registered, the key name is different.

### 5.2 SKY Staking Engine contract address

**Question:** what's the actual deployed address?

**Resolution path:** ChainLog query, or the September 2024 USDS-and-SKY initialization executive on the Sky governance forum.

### 5.3 SKY ABC contract / wallet address

**Question:** which exact address receives the Phase 1 turbo-fill USDS?

**Resolution path:** ChainLog query under a key like `MCD_ABC` or similar. If not in ChainLog, governance forum.

### 5.4 LIT protocol buyback account_index

**Question:** which zkLighter account_index executes the LIT buyback on market 2049?

**Resolution path:** once Lighter API key is obtained, query `/api/v1/trades?market_id=2049` for recent buy-side fills, look for an account_index that appears with high frequency and uniform buying behavior (algorithmic pattern). Alternatively: ask Lighter team on Discord.

### 5.5 LIT vesting contract addresses (L1)

**Question:** which L1 contracts hold the team + investor 50% allocation pre-cliff?

**Resolution path:** `alchemy_getAssetTransfers` from LIT contract deployment block, find the initial mint distributions to identify vesting recipients.

### 5.6 LIT burn vs hold

**Question:** does Lighter burn the bought-back LIT or hold it?

**Why it matters:** affects whether the bought tokens stay in circulating supply or not. If they're burned, supply compression is full. If they're held in a protocol account, circulating supply technically excludes them but they could theoretically re-enter.

**Resolution path:** observe behavior. If a transfer goes to `0x0` after each buyback, it's burned. If it accumulates in a protocol account, it's held.

### 5.7 AAVE Collector buyback vs miscellaneous AAVE inflows

**Question:** the Collector receives AAVE from multiple sources — buybacks (TokenLogic TWAP), aTokens converting back, governance grants, etc. How do we cleanly isolate "buyback" inflows?

**Resolution path:** filter `Transfer(AAVE)` events with `to=Collector` by `from=<known DAO buyback executor wallets>`. Need to identify those source wallets. Or: just count all net AAVE accumulated in Collector and rely on ARFC accounting that it's mostly buyback at this point.

---

## Section 6 — Validation strategy

Once an adapter is wired, we cross-validate its outputs against at least one independent source. Per protocol:

| Protocol | Primary | Cross-check |
|---|---|---|
| **HYPE** | HL Info API daily aggregation | ASXN dashboard / `data.asxn.xyz/dashboard/hl-buybacks` (manual eye check) |
| **AAVE** | Alchemy Transfer events to Collector | TokenLogic dashboard (`tokenlogic.com/aave-treasury`) — manual eye check |
| **SKY** | Sky Staking Engine Transfer events | DefiLlama `holdersRevenue` — should match within 20% |
| **LIT** | zkLighter trades on market 2049 | DefiLlama `holdersRevenue` × 99.5% — should match |

Discrepancies >25% trigger investigation. <25% may indicate methodology differences (e.g. different "circulating supply" definitions) which we document but don't always reconcile.

---

## Section 7 — What this means for data needs

The methodology above defines exactly what data each adapter must produce. Mapping to the DATA-SOURCES.md inventory:

| Need | Status | Adapter |
|---|---|---|
| HYPE — all inputs | ✓ live | `scripts/onchain/hype/*` |
| AAVE — all on-chain inputs | ✗ pending | task #6 — Alchemy + Etherscan keys both ready |
| SKY — most on-chain inputs + Cat B resolution | ✗ pending | task #7 — Alchemy ready; Cat B verification = on-chain inspection as part of the adapter build |
| LIT — most on-chain inputs | ✗ blocked | task #8 — Lighter API key first, then build |

Editorial seeds (the static inputs) are filled in for all four protocols already. Reproduce-article mode passes for all four. Live HM with on-chain verification is currently only available for HYPE.

The methodology doc is the spec. The adapter work is the implementation.
