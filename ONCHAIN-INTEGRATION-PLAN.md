# On-Chain Integration Plan — HM + TP pipelines

**Goal:** wire verified on-chain data into both pipelines for HYPE / LIT / AAVE / SKY so every `verification` flag flips from `governance_stated` / `proxy` to `onchain`. This is the v2 of the Buyback Quality Framework — what unlocks the full Value Capture score on the Token Quality Rubric.

**Status:** v1 (lenient) pipelines for HM ship to `data/hm/`. NP pipeline deferred until this doc is reviewed. Roadmap below sequences the protocols by effort and reuse.

---

## What "on-chain wired up" means

For each protocol, we need verified daily reads for the following data points. The same reads feed both pipelines — HM consumes the annualized aggregate, TP consumes the daily series.

| Data point | HM consumer | TP consumer | Source |
|---|---|---|---|
| **Buybacks** (protocol cash → protocol token) | Annual buyback `$/yr` → Real Capture + Adj MCap subtraction | Daily token flow → Net Pressure sink | Buyback wallet/contract address; tx history; per-day aggregation |
| **Burns** (token destroyed) | Annual burn `$/yr` → Real Capture (treated equivalent to buyback per the article) | Daily token flow → Net Pressure sink | Burn address transfers; burn-event log |
| **Treasury balance + delta** | Not directly — but treasury sells flow into the unlock-side | Daily treasury_accumulation Δ → Net Pressure sink (or sell side) | Daily snapshot of treasury wallets; diff day-over-day |
| **Unlocks** (vested supply → recipients) | 24mo unlock `$` → Adj MCap addition | Daily realized unlocks → Net Pressure source | Vesting contracts: `withdraw` events OR balance reads; supplement with scheduled-distribution editorial seed |
| **Staking flows** (staked − unstaked) | Not directly | Daily net staking lockup → Net Pressure sink | Staking contract: `stake`/`unstake` events or daily total-staked diff |
| **External holder yield** (cash flowing to native-token stakers) | Annual yield `$/yr` → Real Capture | Not directly (yield is paid in non-native, doesn't move native supply) | Yield-distribution contract; reward-token transfers to stakers; protocol revenue formula |
| **Live price + circulating** | Both — sets all USD conversions | Both — same | Already wired via CoinGecko in `fetch-data.js`; only HYPE benefits from a direct on-chain price (HL perp oracle) |

The full schema for the relational form lives in `truepressure-extracted/truepressure-main/docs/SCHEMA.md`. Our flat-JSON pipeline mirrors the same concepts without Postgres.

---

## Cross-cutting prerequisites

Three things have to be decided once, not per-protocol:

### 1. RPC / data provider for EVM chains

AAVE and SKY are both on Ethereum mainnet. HYPE has its own L1 (no EVM-style RPC needed — the HL Info API is free, no auth, and is what the truepressure adapter uses). LIT's chain is currently unknown (see protocol section).

Three viable options for mainnet:
- **Etherscan API (free tier)** — 5 calls/sec, 100k calls/day. Good for tx-history pulls (`txlist`, `tokentx`), `tokenbalance`, `tokenholdings`. Best for low-frequency batch reads. No event-log streaming, but we don't need it for daily granularity.
- **Alchemy free tier** — 300M compute units/month, supports `eth_getLogs` natively for event-based ingestion, no rate cliff under our volumes. Better for buyback tx detection (`Transfer` events filtered by `to=buyback_wallet`).
- **Public RPC (Ankr, llamarpc.com, etc.)** — works for read-only; flaky under load; no historical archive depth.

**Recommendation:** Alchemy free tier as primary, Etherscan as backup. Both are sufficient for daily granularity across AAVE + SKY for the foreseeable future. Add `ALCHEMY_API_KEY` and `ETHERSCAN_API_KEY` to environment.

### 2. Where adapter outputs land

Mirror the HM pipeline layout — flat JSON files this repo can consume directly:

```
data/onchain/
  hype-af/
    buybacks.json          daily HYPE bought by AF
    treasury.json          daily AF balance snapshots
  aave/
    collector.json         daily AAVE acquired via Collector buybacks
    safety-module.json     daily stkAAVE staking deltas
    treasury.json          daily Collector + Treasury balances
  sky/
    sbe.json               daily SKY burns (currently $0 during Phase 1)
    abc.json               daily ABC capital deposits (Phase 1 accumulation target)
    stk-sky.json           daily stkSKY staking deltas + USDS yield distribution
    treasury.json          daily Sky treasury balances
  lit/
    buyback.json           daily LIT bought from post-LLP revenue
    vesting.json           realized unlocks from vesting contracts
    treasury.json          daily treasury balances
```

Each file is `[{ date: 'YYYY-MM-DD', amount_tokens: …, amount_usd: …, tx_hash: …, source: 'onchain' }, …]`. The HM compute layer reads these as alternates to the seed when present (verification then resolves to `onchain`); the TP compute layer reads them as the daily series.

### 3. Pagination + idempotency

Long history pulls need cursor pagination (`fromBlock`/`toBlock` chunks for Alchemy; `startblock`/`endblock` for Etherscan). Buybacks/burns ingestion should be tx-keyed and idempotent — re-running an adapter must be safe. The truepressure HYPE adapter uses a synthetic `tx_hash` per (wallet, day) to dedupe; our flat-JSON version can use the same pattern or a real tx-hash array per day.

---

## Per-protocol plans

### HYPE (Hyperliquid)

**Chain:** Hyperliquid L1 (HyperEVM + HyperCore). No third-party RPC needed — public Info API.

**Effort:** **LOW.** The truepressure repo has a working adapter we lift over.

**What exists today (zip, ready to port):**
- `truepressure-extracted/truepressure-main/workers/lib/hl-api.ts` — Info-API client. Calls `metaAndAssetCtxs` for the canonical HYPE perp price and `userFills` for AF activity. Free, no auth.
- `truepressure-extracted/truepressure-main/workers/adapters/hyperliquid/buybacks.ts` — pulls the last 2000 fills for AF address `0xfefefefefefefefefefefefefefefefefefefefe`, filters `side==='B'` and `coin==='@107'` (HYPE spot pair), aggregates to daily totals. Limitation: 2000 fills ≈ 3–4 days at current cadence. Hourly cron keeps the trailing window fresh; full backfill needs `userFillsByTime` paginated.
- `truepressure-extracted/truepressure-main/workers/adapters/hyperliquid/supply.ts` — derives circulating from the unlock schedule (deterministic, no chain read needed for *projected* supply).
- `truepressure-extracted/truepressure-main/workers/lib/hl-tokenomics.ts` — tokenomics constants: 1B total, TGE 2024-11-29, six buckets (genesis 31%, core contributors 23.8%, future emissions 38.9%, foundation 6%, community grants 0.3%, HIP-2 0.012%) with vesting dates.

**Port plan (Node, CommonJS, matches `scripts/fetch-data.js` style):**
```
scripts/onchain/hype/
  fetch-af.js          # buybacks + AF balance daily snapshots
  fetch-supply.js      # circulating derived from tokenomics
  tokenomics.js        # constants ported from hl-tokenomics.ts
```

Writes `data/onchain/hype-af/{buybacks,treasury}.json`. ~1 hour of work — direct port, only the Supabase `upsert` calls need rewriting to JSON file writes.

**HM impact:** flips HYPE buyback verification from `governance_stated` to `onchain`. AF balance also unlocks more accurate float math (CG counts AF in circulating; on-chain truth excludes it).

**TP impact:** full daily series for buybacks ✓ and treasury accumulation ✓. Unlocks come from the deterministic schedule (already on-chain-equivalent — vesting is contract-enforced and the constants are public). Staking is the remaining gap — Hyperliquid native HYPE staking exists; need to identify the staking contract or system address and the `delegate`/`undelegate` action signatures.

**Status: shipped 2026-05-22.** `scripts/onchain/hype/{fetch-af,backfill-af,fetch-supply,fetch-staking}.js` writes JSON to `data/onchain/hype-af/` and `data/onchain/hype/`. HM compute reads the on-chain buyback feed automatically (flips `verification: onchain`). TP compute (`scripts/np/compute-np.js`) produces daily Net Pressure + 24h/7d/30d/90d roll-ups with coverage badges.

**Gaps that remain:**
- HL Info API caps at ~10,000 most recent fills per user — gave us 31 days of AF buyback history. There is no documented endpoint for deeper history. Three options to backfill further:
  - **ASXN** (`data.asxn.xyz/dashboard/hl-buybacks`) has the full series back to **March 2025** (14 months) but no public API. Scraping is fragile; better path is to reach out to ASXN (twitter @asxn_r) and ask for data access or a downloadable file. Their public posts mention they update daily.
  - **Hypurrscan / assistancefund.top** — additional third-party indexers. Same situation — likely UI-only.
  - **Run our own subscriber** — long-term. Forward-only after deployment.
- HyperEVM precompiles currently expose spot prices only, not historical balances/fills. Alchemy supports HyperEVM (chain 999) with full RPC, but AF spot fills happen on HyperCore (not HyperEVM) so this doesn't unlock new buyback data.
- Staking flow daily series is forward-only — `fetch-staking.js` accumulates `validatorSummaries` snapshots one day at a time; deltas emerge as runs accumulate.

---

### AAVE

**Chain:** Ethereum mainnet.

**Effort:** **MEDIUM.** Standard ERC-20 reads, well-documented addresses, but no existing adapter in the zip — we write from scratch.

**Addresses (all confirmed via bgd-labs/aave-address-book, 2026-05-22):**
- `AAVE` ERC-20: `0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9`
- `AAVE V3 Collector` (revenue + Treasury holdings, executes TokenLogic TWAP buybacks): `0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c`
- `stkAAVE` (Safety Module): `0x4da27a545c0c5B758a6BA100e3a049001de870f5`
- `Aave Ecosystem Reserve` (source of stkAAVE Safety Module emissions / Category C): `0x25f2226b597e8f9514b3f68f00f494cf4f286491`
- `AAVE V3 Pool`: `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2` (reference — not directly needed for buybacks)

**Data flows to wire up:**
1. **Buybacks** — `Transfer` events on the AAVE ERC-20 where `to == AAVE Collector`, funded from a known set of source wallets (Aave DAO treasury distribution wallet). Aggregate USD via Chainlink or `1inch` historical price oracle, or by snapshot the AAVE price at block-timestamp from `prices` (our existing CG-sourced daily series is fine for v1 verified).
2. **Safety Module emissions** — `Transfer` from `AAVE Ecosystem Reserve` to `stkAAVE` contract, daily. This is the Category C dilution rebate — important to log so we don't accidentally count it as new value capture.
3. **stkAAVE staking deltas** — read `totalSupply()` on stkAAVE contract daily, diff day-over-day. Captures net staking lockup for TP.
4. **Collector balance** — daily snapshot of AAVE held by Collector. Diff = treasury accumulation.

**HM impact:** verifies the $30M/yr ARFC budget (Category A) actually executed. If TokenLogic reports $30M/yr but on-chain shows $20M, HM widens correctly.

**TP impact:** full Net Pressure formula achievable for AAVE — buybacks, treasury accumulation, staking flows all available. Unlocks are zero (no team vesting). Burns are zero.

**Effort estimate:** 4–6 hours including address verification. Single Alchemy `eth_getLogs` filter for buyback Transfer events; single `eth_call` for `totalSupply()` on stkAAVE per day.

---

### SKY

**Chain:** Ethereum mainnet.

**Effort:** **MEDIUM-HIGH.** SKY has the most complex value-capture mechanism in the cohort — Phase 1 vs Phase 3 logic, multiple contracts, USDS yield calculation. The on-chain reads are not hard individually, but composing them correctly is.

**Addresses (partially confirmed, 2026-05-22):**
- `SKY` ERC-20: `0x56072C95FAA701256059aa122697B133aDEd9279` ✓
- `USDS` ERC-20: `0xdC035D45d973E3EC169d2276DDab16f1e407384F` ✓
- `SBE Splitter` (Smart Burn Engine surplus splitter): `0xBF7111F13386d23cb2Fba5A538107A73f6872bCF` ✓ — bypassed during Phase 1 but still readable
- `ChainLog` (discovery registry that maps every Sky contract name to address): `0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F` ✓ **the key finding — call `getAddress(bytes32)` on this to dynamically resolve any Sky contract**. This is the right way to find Splitter, Vat, Vow, Flap, Flopper, the Staking Engine, etc. — no need to hardcode.
- `Aggregate Backstop Capital (ABC)` wallet/contract: still TBD — ChainLog should resolve once we know the right key (probably `MCD_ABC` or similar). Worst case: ask in Sky forum.
- `Sky Staking Engine` (the new stkSKY-equivalent, distributes USDS to SKY stakers): still TBD — ChainLog likely resolves. Recently deployed per the September 2024 USDS executive.

**Data flows to wire up:**
1. **SBE burns** — `Transfer` to `0x000...000` from SBE contract. Currently zero during Phase 1; adapter should output `[]` and that's correct.
2. **ABC fill** — daily USDS balance of the ABC wallet. Diff = today's accumulation. When this crosses $150M, that's the Phase 3 trigger — flag in the report.
3. **USDS yield to stkSKY** — find the distribution mechanism, then sum USDS transfers to stkSKY holders (or the rate × stkSKY supply if rebasing). This is the on-chain proof for the $72M/yr Category B figure.
4. **stkSKY staking deltas** — `totalSupply()` of stkSKY daily, diff day-over-day.

**HM impact:** verifies Category B yield is actually flowing (currently `governance_stated`, the riskiest verification level in the cohort). Also enables a clean Phase 1 → Phase 3 transition signal: when ABC ≥ $150M, switch the active phase config and re-compute HM with SBE burns active.

**TP impact:** SKY's Net Pressure is mostly clean today — no team unlocks, no burns yet, but treasury accumulation (ABC fill) is a major sink that we currently can't measure. On-chain reads unlock this.

**Effort estimate:** 6–10 hours. The reads are simple; the editorial work of *identifying the right contracts* and *understanding the USDS yield mechanism* is the bottleneck. The Sky governance forum (forum.skyeco.com) is the source of record.

---

### LIT (Lighter)

**Chain:** **zkLighter — an Ethereum rollup (confirmed 2026-05-22).**

This makes LIT more tractable than the worst-case "unknown appchain" scenario. zkLighter is a ZK rollup with Ethereum L1 as the settlement layer, so:
- The LIT ERC-20 token contract lives on Ethereum L1 (same RPC as AAVE + SKY — Alchemy works).
- Application-state contracts (LLP, buyback engine, vesting) live on zkLighter L2 and need a zkLighter RPC. Alchemy's "Rollups" coverage may include zkLighter — verify in their docs; if not, we use the canonical zkLighter RPC endpoint published by the team.
- Bridging traffic (L1 ↔ L2) means some buyback flows may settle on L1 and others on L2. Need to confirm where the post-LLP buyback executes.

**Effort:** **MEDIUM** (downgraded from HIGH). Two-chain reads, but at least we know the chains. Most remaining unknowns are address-level (which contract is the buyback executor on L2, where vesting lives).

**L1 addresses (confirmed, 2026-05-22):**
- `LIT` ERC-20 (mainnet): `0x232ce3bd40fcd6f80f3d55a522d03f25df784ee2` ✓
- `zkLighter Escrow / Rollup` (L1 entry/exit): `0x3B4D794a66304F130a4Db8F2551B0070dfCf5ca7` ✓
- `UpgradeGatekeeper`: `0x94da8A995D0D82Ef0fE7E509C6D76c22603B6f67`
- `Governance`: `0xa464DA0B43f80EE3FfC4795cbbFC78472b5c81A1`
- `ZkLighterVerifier`: `0xac3Ce44B6ff4E402858C99D5699ff63131572BaA`
- Operators (EOAs, can commit/verify/execute batches):
  - `0x191fFF0EC830F83916A427d169a234c33e48aA79` (note: L2BEAT had a typo extra `f` — verify on Etherscan)
  - `0x750bdb90AC72A78308d21eAC78999bBAE31cd63d`
  - `0xC0D2853e06F1E145177D5ef08Ab065a76e14354C`

**L2 (zkLighter) — confirmed it's an app-specific rollup, not a general EVM L2:**
- Chain ID: 300 (0x12c)
- API gateway: `https://mainnet.zklighter.elliot.ai`
- **NOT addressable via `eth_call` / Alchemy** — there are no user-deployable smart contracts on L2. All state lives in Lighter's protocol logic and is exposed via a custom REST API (similar architecturally to HL Info API).
- Adapter pattern mirrors HYPE: `GET /api/v1/trades?account_index=<protocol_buyback_account>&market_type=spot&market_id=<LIT>` returns the buyback fills. Aggregate to daily totals. Same shape as `fetch-af.js`.
- Public SDK: `github.com/elliottech/lighter-python` — has examples for resolving market_index → asset_name.

**Open questions:**
- Lighter's protocol buyback account_index (analogous to HL's AF address) — needs to be looked up from Lighter docs/SDK/governance posts. Once known, the trades endpoint pull is straightforward.
- L1 vesting contract addresses (cliff Dec 22 2026) — discoverable by inspecting top LIT holders on Etherscan. Vesting contracts tend to hold large balances and have recognisable owners.

**Revised effort estimate:** **~5 hrs** (down from 6-8). The custom-API path is well-trodden via the HYPE adapter, no L2 RPC research needed.

**Data flows to wire up:**
1. **Buybacks** — track LIT transfers into the buyback wallet (or burn address if buybacks are burned).
2. **Unlocks** — most important data point for LIT. The Dec 22 2026 cliff is 7 months out as of today (2026-05-22). Once the cliff triggers, daily realized unlocks become a major Net Pressure source. Vesting contract reads or scheduled-distribution model required.
3. **Treasury balance** — for v2 completeness.
4. **LLP fee flow** — to understand the buyback rate denominator dynamically.

**HM impact:** Largest cohort uncertainty. The article models LIT at HM 15.4× partly because we treat the buyback as fully active and the unlocks as scheduled (uncliffed yet). On-chain verification of both the buyback flow AND the vesting schedule is what makes LIT defensible as a "strong" HM read vs a speculative one.

**TP impact:** before the cliff hits, LIT's Net Pressure is dominated by buybacks (negative — net buyer). After the cliff, unlocks dominate and Net Pressure flips sharply positive. Modelling that flip date precisely is the main TP product for LIT.

**Effort estimate:** ≥10 hours, ≥half of which is research (chain identification, address discovery via Lighter docs / GitHub / Discord). Coding effort after research is comparable to AAVE.

---

## Suggested sequencing

Optimised for value-per-hour:

1. **HYPE adapter port** (~1 hr) — the code already exists. Wins us a verified `onchain` flag on the biggest token in the cohort and the most-watched buyback mechanism in DeFi. Cheap throughput.
2. **AAVE Collector + Safety Module** (~5 hrs) — standard ERC-20 reads on well-documented addresses. Verifies the most-discretionary buyback program in the cohort. Pattern reusable for any future Ethereum-mainnet protocol.
3. **SKY ABC + SBE + USDS yield** (~8 hrs) — the most analytically valuable since Category B yield is currently `governance_stated`. Unlocks Phase 1 → Phase 3 trigger monitoring as a bonus product.
4. **LIT zkLighter L2 + L1 adapter** (~6-8 hrs) — downgraded from HIGH effort now that the chain is confirmed. L1 reads share infrastructure with AAVE/SKY; L2 reads need a zkLighter RPC endpoint. Worth doing last unless the cliff date (Dec 22 2026) forces it earlier. After the cliff this becomes the highest-stakes TP read in the cohort.

## Open questions for review

1. **Alchemy vs Etherscan vs both** — preference, or "go with the recommendation and we'll iterate"?
2. **Lighter's chain** — do you know offhand, or should I look it up?
3. **Adapter cadence** — hourly cron (matches truepressure) or daily (cheaper, matches the existing `fetch-data.js` pattern)?
4. **Backfill depth for buybacks** — do we want the full history from TGE, or is "trailing 90 days" sufficient for v2? Backfill is a one-time job; daily delta runs are cheap.
5. **The five-component TP formula** — once on-chain is wired, we can compute the full `Net Pressure = (Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury accumulation + Net staking lockups)`. Today only HYPE is plausibly close. Confirm we want the full formula in v2 rather than the truncated `Unlocks − Buybacks` v1.

Once these are answered, I can sequence the adapter work and start writing.
