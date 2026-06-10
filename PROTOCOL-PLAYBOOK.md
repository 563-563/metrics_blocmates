# Protocol Onboarding Playbook

How to add a protocol to the HM + TP dashboard. Distilled from onboarding HYPE, AAVE, SKY, and LIT — the same handful of patterns recur, so this turns archaeology into a checklist.

Read alongside:
- `METHODOLOGY.md` — what each input *means* and the formula it feeds
- `DATA-SOURCES.md` — credentials/services inventory
- This doc — *how to find and wire* each input for a new protocol

---

## 0. The onboarding checklist

For protocol `X`:

1. **Seed the basics.** Add `X` to `data/config.json` (DL slug + CG id) and a `protocols.X` block in `data/hm/config.json` with article/reference values for all 7 HM inputs + verification flags. The dashboard renders from this immediately, even before any adapter exists.
2. **Classify the buyback mechanism** (see §2). This picks your adapter template.
3. **Discover addresses** (see §3). Token, buyback wallet/contract, staking contract, treasury.
4. **Build the buyback adapter** by copying the matching archetype's template (see §2).
5. **Build the staking adapter** — almost always `tokenContract.balanceOf(stakingContract)` or `stakeToken.totalSupply()` daily, diffed.
6. **Wire the feeds**: add `onchain_buybacks_path` (+ `onchain_holder_yield_path` if Cat B) to the HM seed; add a `protocols.X` block to `data/np/config.json`.
7. **Wire the frontend**: import the new feeds in `web/lib/data.ts` → `onchainFeeds[X]`.
8. **Add cron steps** in `.github/workflows/update-data.yml`.
9. **Verify**: run the adapters, `compute-hm.js`, `compute-np.js`; confirm `--reproduce-article` still passes; eyeball the per-protocol page.

A protocol can ship at any step — everything degrades gracefully to "adapter pending" placeholders.

---

## 1. Per-input sourcing — decision trees

For each HM/TP input, try sources in this order. Stop at the first that works.

### Price
1. **Protocol-native oracle** if it's the canonical price (HYPE: HL Info API `metaAndAssetCtxs.markPx`). Use when the token's primary venue IS the protocol.
2. **CoinGecko** `coins/markets` — default for any CEX-listed ERC-20 (AAVE, SKY, LIT).
3. On-chain DEX TWAP only if CG doesn't list it (rare for our cohort).

### Circulating supply
1. **Protocol-published number** if it matches the article/benchmark methodology (HYPE: ASXN/hypeburn 298.6M — *not* CG's 238M). This is what makes HM line up with how an LP would compute it.
2. **CoinGecko** `circulating_supply` — default.
3. **On-chain derived** `totalSupply() − Σ(non-circulating wallets)` as a cross-check. Resolve non-circulating wallets via the address-discovery toolkit (§3).

Always store `circulating_supply_source` in the output and flag if two sources diverge >2%.

### 24mo Unlocks / Emissions (tokens)
1. **Deterministic tokenomics module** (`scripts/onchain/<slug>/tokenomics.js`) — for protocols with a published vesting schedule (HYPE). Best: it powers both the 24mo sum AND the unlock chart.
2. **Editorial seed** `unlocks_24mo_tokens` / `emissions_24mo_tokens` — for protocols where the schedule is simple or fully-circulating (AAVE 0, SKY 0, LIT cliff-based). Update by hand when the protocol amends.
3. **Verify** against on-chain vesting contract balances when addresses are known.

### Annual Buyback (Category A) — the moat input
This is the one with the most variety. See §2 for the mechanism archetypes. The output is always a daily series file at `data/onchain/<slug>/buybacks.json` with `{date, amount_tokens?, amount_usd, verification}` rows. The compute layer annualizes it (60d calendar-day window × 365).

### Annual External Holder Yield (Category B)
1. Only exists if the protocol pays **stable-denominated yield to stakers of the NATIVE token** (SKY → USDS to lockstake-SKY). The ENA trap: yield to *stablecoin* holders does NOT count.
2. Find the **rewards farm / distribution contract**, then read `Transfer` events FROM it. The asset being distributed (USDS vs native token) tells you Cat B (real) vs Cat C (dilution rebate). This is exactly how SKY's mechanism was resolved.
3. Output a daily series at `data/onchain/<slug>/cat-b-inflows.json`; wire via `onchain_holder_yield_path`.

### Daily Staking Lockups (TP)
Near-universal pattern: read the total staked figure daily, diff day-over-day.
- ERC-20 stake token: `stkToken.totalSupply()` (AAVE stkAAVE).
- Lock contract holding the native token: `nativeToken.balanceOf(lockContract)` (SKY LockStake Engine).
- Protocol-native staking: the protocol's API (HYPE `validatorSummaries`, sum `stake` / 1e8).
Output `data/onchain/<slug>/staking.json` with `delta_tokens`.

### Per-day price (TP USD honesty)
1. **Protocol-native historical** if available (HYPE: ASXN 14mo OHLCV).
2. **CoinGecko** `coins/<id>/market_chart?days=365&interval=daily` via `scripts/lib/cg-prices.js`.
Wire via `daily_price_path` in `data/np/config.json`.

---

## 2. Buyback mechanism archetypes

Every buyback we've seen fits one of these. Classify first, then copy the template.

### Archetype A — Protocol-native API spot fills
**When:** the protocol runs its own exchange and the buyback is a spot purchase on it (HYPE Assistance Fund).
**Source:** the protocol's own API, filtered to the buyback wallet's buy-side fills.
**Template:** `scripts/onchain/hype/fetch-af.js` (+ `hl-api.js`, `backfill-af.js`).
**Notes:** API fill-history is often windowed (HL caps ~30d). Look for a third-party indexer for deeper history (ASXN gave us 14mo for HYPE).

### Archetype B — ERC-20 transfers into a collector/treasury wallet
**When:** an EVM protocol buys its token on the open market (often via an aggregator) and the tokens land in a known collector (AAVE Collector via CoW Protocol).
**Source:** Alchemy `alchemy_getAssetTransfers` with `contractAddresses=[token]`, `toAddress=collector`, aggregated by UTC day. Convert to USD with per-day CG prices.
**Template:** `scripts/onchain/aave/fetch-collector.js` (+ `scripts/lib/alchemy.js`, `cg-prices.js`).
**Notes:** trace the `from` addresses to confirm what's a buyback vs misc deposit (AAVE's was CoW settlement `0x9008d19f...`). The `onchain_aggregate` flag acknowledges you're counting all inflows.

### Archetype C — Burn engine / surplus splitter
**When:** the protocol burns bought-back tokens via a dedicated engine, often gated by a surplus mechanism (SKY Smart Burn Engine / Flapper).
**Source:** `Transfer` events from the burn engine to `0x0`, plus the splitter that feeds it.
**Template:** `scripts/onchain/sky/fetch-sbe.js`.
**Notes:** may be phase-gated (SKY's SBE is bypassed in Phase 1 → expect zero until a threshold flips). For these, burns == buybacks; count once.

### Archetype D — Custom L2 / app-chain REST API
**When:** the protocol is an app-specific rollup with no user-facing EVM contracts; buybacks are trades on its own order book (LIT on zkLighter).
**Source:** the chain's REST API, filtered to the protocol buyback account on the token's spot market. **Often auth-gated** — may need an API key tied to a funded account.
**Template:** `scripts/lib/zklighter.js` (client).
**Notes — hard-won lesson from LIT:** even *with* a funded account + API key, the trade API may be **account-scoped** — you can only read your OWN account's trades, not the protocol buyback account's (`auth string is not from given account`). Public "recent trades" endpoints are often too shallow (last ~100, no history) to reconstruct a series or even ID the buyback bot. Before funding an account for Archetype D, verify the API actually lets a third party read an arbitrary account's or a market's full trade history. If it doesn't (Lighter did not), **fall through to Archetype E** — the proxy is then not just easier, it's the only option.

### Archetype E — DefiLlama holdersRevenue proxy (the universal fallback)
**When:** the protocol routes ~all holder-directed revenue to buybacks, AND you can't get direct on-chain trade data (LIT fallback).
**Source:** DL `summary/fees/<slug>?dataType=dailyHoldersRevenue`. For a protocol that buys back X% of holder revenue, `holdersRevenue × X ≈ buyback`.
**Template:** `scripts/onchain/lit/fetch-buyback-proxy.js`.
**Notes:** verification flag = `proxy`. Cross-check against the stated rate (LIT: $25.6M proxy vs $25.53M stated, within 0.3%). This is the lowest-effort path and is "good enough" for revenue-routed buybacks — consider it even when a direct feed is theoretically available.

**Decision shortcut:** EVM + collector wallet → B. Own exchange → A. Burn engine → C. App-rollup with API key → D. Anything else, or blocked → E.

---

## 3. Address-discovery toolkit

How to find the contracts, by ecosystem:

| Ecosystem | Tool | How |
|---|---|---|
| **Maker / Sky** | ChainLog registry | `getAddress(bytes32)` on `0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F`. Encode the key as a string padded RIGHT to 32 bytes (e.g. `"REWARDS_LSSKY_USDS"` → hex, `.padEnd(64,'0')`). `list()` reverts on this version — probe known key names instead. |
| **Aave** | bgd-labs/aave-address-book | Raw GitHub: `raw.githubusercontent.com/bgd-labs/aave-address-book/main/src/AaveV3Ethereum.sol` etc. Constants are `NAME = 0xADDRESS`. |
| **Any EVM** | Flow tracing | `alchemy_getAssetTransfers` from a known wallet, inspect `from`/`to` to discover counterparties. This is how we found CoW is AAVE's buyback router and which asset SKY's farm distributes. |
| **Any token** | Etherscan V2 | `api.etherscan.io/v2/api?chainid=1&module=account&action=...` (V1 deprecated). Free tier: tx history, balances. NOT free: `tokenholderlist`, `tokeninfo` (Pro-only). |
| **L2 / app-chain** | Project's own API + docs | LIT: zkLighter REST `mainnet.zklighter.elliot.ai`. Find market IDs via `orderBooks` (unauth). |

**To resolve "which asset is being distributed"** (Cat B vs Cat C, burn vs hold): pull `Transfer` events FROM the distribution contract and look at the dominant asset. USDS out → Cat B. Native token out → Cat C or burn. Zero out → dormant.

---

## 4. Verification flag taxonomy

Every numeric input carries a `verification`. Use the most specific one that's true:

| Flag | Meaning | Example |
|---|---|---|
| `onchain` | Direct chain/API read of the actual flow | HYPE AF fills, AAVE Collector transfers |
| `onchain_aggregate` | On-chain but counts a superset (can't perfectly isolate the target flow) | AAVE Collector inflows (mostly but not only buybacks) |
| `onchain_dormant` | On-chain feed exists and is verified, but the mechanism is currently inactive | SKY Cat B (USDS farm, dry since Nov 2025) |
| `proxy` | Inferred from a related metric, not the flow itself | LIT buyback via DL holdersRevenue |
| `governance_stated` | From a governance doc/budget, unverified at compute time | a new protocol's seed before its adapter lands |
| `onchain_equivalent` | Deterministic from public tokenomics (contract-enforced, no read needed) | HYPE unlock schedule |
| `n/a` | Component doesn't apply | HYPE burns, AAVE Cat B |

The compute layer reads the dominant `verification` across a feed's rows and surfaces it on the dashboard, so the flag is self-documenting.

---

## 5. Recurring gotchas (hard-won)

1. **Annualize over CALENDAR days, not data rows.** Buyback-free days are absent from the feed file but must count as $0. Averaging "last 60 rows" makes a paused protocol show its old rate. (Burned us on AAVE; fixed in `compute-hm.js`.)
2. **"Recent vs lifetime" divergence is a feature, not noise.** Every report shows the 60d rate next to the lifetime rate. AAVE −50%, HYPE −43%, SKY dormant — these gaps ARE the signal. Don't smooth them away.
3. **Buybacks pause.** AAVE stopped Apr 19, SKY's Cat B farm dried Nov 2025. Always check "days since last observation" — a stale feed isn't a bug, it's a finding.
4. **Don't double-count buyback wallet vs treasury wallet.** If the buyback wallet IS the treasury (HYPE AF), count it once (as buyback). Treasury accumulation = 0 for those.
5. **Circulating supply has 3 definitions** (CG / protocol-published / on-chain derived) that can differ 20%+. Pick the one matching the benchmark methodology; document the choice.
6. **Cat B requires the staker to hold the NATIVE token.** USDS yield to stkSKY counts (stakers hold SKY). USDe yield to sUSDe does NOT count for ENA (holders hold the stablecoin). Check who the staker is before crediting Cat B.
7. **Per-day price for multi-day USD.** A 90d USD rollup at today's price is wrong if price moved. Use the per-day series.
8. **8-decimal vs 18-decimal.** HL native units are 1e8; ERC-20s are usually 1e18. Wrong divisor = comically wrong numbers (we hit 43 quadrillion HYPE staked once).
9. **`reproduce-article` is the regression test.** Any compute change must keep SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×. On-chain overrides are bypassed in that mode.
10. **Etherscan V2 only.** V1 endpoints are deprecated; use `/v2/api?chainid=1&...`.

---

## 6. Template map

When building protocol N, copy the **structure** of the closest existing example — but import the helpers, don't copy them. `scripts/lib/evm-adapter-utils.js` owns `ensureDir` / `loadJsonOrDefault` / `mergeDaily` / `getArgInt` / `hexToTokens` / `balanceOfData` / `priorDateRow`; a bug fixed there is fixed everywhere. Two more shared pieces every new adapter should wire in:

- **`scripts/lib/scan-checkpoint.js`** — any `getAssetTransfers`/`eth_getLogs` trailing-window scan must checkpoint its last-scanned block (see any existing scan adapter for the `resolveFromBlock` → scan → write → `writeCheckpoint` shape). Full-window rescans on every cron run are how we burned ~10× our Alchemy budget.
- **`getDailyPricesCached` from `scripts/lib/cg-prices.js`** — if the protocol has a price file at `data/external/cg/<slug>-price-daily.json` (add it to the HM seed so `fetch-cg-price-history.js` covers it), read prices from there instead of calling CoinGecko per-adapter.

| You need | Copy from |
|---|---|
| Shared adapter helpers (merge/parse/io) | `scripts/lib/evm-adapter-utils.js` (import, never copy) |
| Block-scan checkpointing | `scripts/lib/scan-checkpoint.js` (import, never copy) |
| Shared EVM RPC client | `scripts/lib/alchemy.js` (already generic — just use it) |
| Daily CG price history | `scripts/lib/cg-prices.js` (generic; prefer `getDailyPricesCached`) |
| Archetype A (native API fills) | `scripts/onchain/hype/fetch-af.js` |
| Archetype B (collector transfers) | `scripts/onchain/aave/fetch-collector.js` |
| Archetype C (burn engine) | `scripts/onchain/sky/fetch-sbe.js` |
| Archetype D (L2 REST client) | `scripts/lib/zklighter.js` |
| Archetype E (DL proxy) | `scripts/onchain/lit/fetch-buyback-proxy.js` |
| Staking via stake-token totalSupply | `scripts/onchain/aave/fetch-safety-module.js` |
| Staking via balanceOf(lockContract) | `scripts/onchain/sky/fetch-lockstake.js` |
| Cat B rewards-farm tracking | `scripts/onchain/sky/fetch-rewards-farm.js` |
| Tokenomics / unlock schedule | `scripts/onchain/hype/tokenomics.js` |
| Address book module | `scripts/onchain/aave/addresses.js` |

All adapters follow the same shape: read → aggregate by UTC day → idempotent merge into a JSON series → snapshot. Keep that shape and the compute layer + frontend pick it up for free.

Two shape rules that aren't obvious from reading one adapter:

- **Daily-snapshot deltas must use `priorDateRow`.** Comparing against "the last written row" corrupts the persisted delta whenever the cron runs more than once a day (the second run diffs against today's own earlier snapshot). `compute-np`'s `daily_snapshot_diff` source type recomputes deltas from the total column at read time regardless, so the snapshot column is the source of truth — but persist the delta correctly anyway.
- **Scans must write full-day aggregates.** `mergeDaily` replaces rows by date wholesale, which is why checkpoint resumes re-cover the last ~2 days (see scan-checkpoint.js header).
