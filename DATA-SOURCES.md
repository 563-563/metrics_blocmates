# Data Access Inventory

**Note (2026-06-09):** this inventory dates from the May 2026 build-out and is kept for its source/endpoint research. Its status marks and any dollar figures are NOT maintained — most "pending" adapters have since shipped (see `ONCHAIN-INTEGRATION-PLAN.md` status table), and per CLAUDE.md, current values and verification flags live on the dashboard / in `data/*/snapshots/latest.json`, never in docs. In particular: seeded estimates quoted here (e.g. SKY's Cat B yield) were superseded by on-chain reads that may legitimately show zero.

What we need across the dashboard to power HM + TP for HYPE / AAVE / SKY / LIT in near-real-time.

**Status legend**
- ✓ wired and live
- ◐ credential or doc identified, not yet wired
- ✗ need access (sign up / request)

**Cadence required**
- *live* — sub-minute (WebSocket / frequent polling). Only matters for headline price + buyback fills that traders watch.
- *hourly* — current cron cadence. Fine for everything HM-related.
- *daily* — once a day. Enough for staking flows, treasury balances, governance state.
- *one-shot* — historical backfill, runs once.

---

## Cross-cutting infrastructure

These serve multiple protocols.

### Chain RPC

| Provider | Coverage | Auth | Cost (current usage) | Cadence | Status |
|---|---|---|---|---|---|
| **Alchemy** | Ethereum mainnet, HyperEVM (chain 999), and dozens of L2s | API key (`ALCHEMY_API_KEY`) | Free tier 300M compute units/month — plenty | hourly | ✓ key in `.env`, not yet hitting it |
| **Etherscan API** | Ethereum mainnet (and forks) — backup for tx history & contract verification | API key | Free tier 5 req/sec, 100k/day | one-shot | ✓ key in `.env` as `ETHERSCAN_API_KEY`. **Use V2 endpoint** `https://api.etherscan.io/v2/api?chainid=1&...` — V1 is deprecated. Free tier excludes `tokenholderlist` and `tokeninfo` (Pro-only) |
| **zkLighter REST API** | zkLighter L2 (`https://mainnet.zklighter.elliot.ai`) — Lighter's custom REST | Mixed — `/orderBooks` is unauth ✓, `/trades` requires API key ✗ | Free, public | hourly | ◐ probed 2026-05-26: orderBooks works unauthed, trades needs Lighter API key (must register via their Python SDK) |
| **Pyth on-chain price oracle** | Cross-chain BTC/ETH/SOL/HYPE-perp/LIT | None for read | Free public read | live | ◐ alternative to CG if we want live price |

### Price feeds (alternatives / supplements to current DL+CG)

| Source | Endpoint | Auth | Cost | Cadence | Status |
|---|---|---|---|---|---|
| **CoinGecko free** | `api.coingecko.com/api/v3/coins/markets` | None (rate-limited) | Free, ~5-15 req/min | hourly | ✓ wired in `scripts/fetch-data.js` |
| **CoinGecko Pro** | `pro-api.coingecko.com/api/v3` | API key | $129/mo Analyst tier (10k calls/min, WS) | live | ✗ optional upgrade if we need live prices in UI |
| **DefiLlama** | `api.llama.fi` | None | Free | hourly | ✓ wired |
| **Binance WebSocket** | `wss://stream.binance.com:9443/ws` | None | Free | live | ✗ optional — clean live price for cross-listed tokens |
| **Hyperliquid Info API** (perp markPx) | `api.hyperliquid.xyz/info` | None | Free | live | ✓ used for HYPE; we already pull each adapter run |

### Indexers / dashboards (third-party, useful for backfill or cross-check)

| Source | What | Auth | Cost | Status |
|---|---|---|---|---|
| **ASXN** (`data.asxn.xyz`) | Full HYPE AF history since TGE, daily revenue, AF balance | Cloudflare Turnstile (5-min JWT, browser-only) | Free at dashboard, not automatable | ◐ manual one-shot via `scripts/external/asxn-backfill.js` — used once for backfill |
| **Hypurrscan** (`hypurrscan.io`) | Hyperliquid-specific block explorer + AF tracker | Likely none for read | Free | ✗ inspect — possible secondary HYPE source |
| **TokenLogic dashboard** | Aave treasury + buyback execution data | Browser-only (no public API documented) | Free at dashboard | ✗ inspect — same Turnstile/JWT issue likely |
| **Token Unlocks / Tokenomist** | Vesting schedules for major tokens | Free + paid tiers | Free tier likely covers our cohort | ✗ optional — alternative to maintaining tokenomics modules by hand |
| **Dune Analytics** | SQL queries over indexed chain data — community queries exist for most of our adapters | API key (Plus $390/mo) | Free 2.5k credits/month, paid for production | ◐ have access in parent workspace — possibly worth API key for SKY ChainLog queries |
| **DeBank / Zerion** | Wallet portfolio data (multi-chain treasury reads) | API key | Free tier exists | ✗ optional — alternative to per-wallet on-chain reads |

### Governance / editorial monitoring

| Source | Auth | Cost | Cadence | Status |
|---|---|---|---|---|
| **forum.aave.com** RSS | None | Free | daily | ✗ not wired — useful for ARFC budget changes |
| **forum.sky.money** RSS | None | Free | daily | ✗ not wired — useful for Phase transitions & MIP signaling |
| **gov.hyperliquid.xyz** | Likely none | Free | daily | ✗ inspect for HIP-related events |

---

## Per-protocol

### HYPE (Hyperliquid)

**HM inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Token price | HL Info API `metaAndAssetCtxs` + CG fallback | None | live (HL) / hourly (CG) | ✓ |
| Circulating supply | ASXN `af-buyback-metrics.json` (currently); CG fallback | None for CG | hourly | ✓ via ASXN backfill |
| 24mo unlocks (token amount) | Editorial seed driven by HYPE tokenomics module | n/a | static | ✓ |
| 24mo emissions | Editorial seed | n/a | static | ✓ |
| 24mo buyback projection | Derived from on-chain rate × 24 | n/a | computed | ✓ |
| Annual buyback rate (60d SMA) | HL Info API `userFills` (AF address) | None | hourly | ✓ |
| Lifetime cumulative buyback | ASXN backfill (14 months) + ongoing HL Info API | mixed | one-shot + hourly | ✓ |
| Holder yield (Cat B) | n/a — HYPE has none | n/a | n/a | ✓ |

**TP inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Daily buybacks | HL Info API `userFills` filtered by AF | None | hourly | ✓ |
| Daily AF balance | Computed from latest fill `startPosition + sz`; ASXN history for backfill | None | hourly | ✓ |
| Daily burns | n/a — HYPE has none | n/a | n/a | ✓ |
| Daily treasury accumulation | Captured as AF balance Δ; counted as buyback, not separate | n/a | hourly | ✓ |
| Daily net staking lockup | HL Info API `validatorSummaries` daily snapshot, diff day-over-day | None | daily | ✓ snapshot live, deltas accumulating |
| Daily unlock events | Deterministic from tokenomics module | n/a | static | ✓ |
| Per-day price (for USD math) | ASXN `hype-price` (14 months OHLCV); CG market_chart for ongoing | None / API key for CG | one-shot + daily | ✓ backfilled, ongoing pull TBD |

**Status: fully wired.** HYPE is the reference implementation.

---

### AAVE (Ethereum mainnet)

**Known addresses** (verified, see `ONCHAIN-INTEGRATION-PLAN.md`)
- AAVE: `0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9`
- V3 Collector: `0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c`
- stkAAVE: `0x4da27a545c0c5B758a6BA100e3a049001de870f5`
- Ecosystem Reserve: `0x25f2226b597e8f9514b3f68f00f494cf4f286491`

**HM inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Token price | CG | None | hourly | ✓ |
| Circulating supply | CG (preferred) or Alchemy `AAVE.totalSupply() − escrow balances` | None / Alchemy key | hourly | ✓ via CG |
| 24mo unlocks | Editorial seed — AAVE has no team vesting active | n/a | static | ✓ |
| 24mo emissions | Editorial seed (Safety Module + SP comp, 285K AAVE/24mo) | n/a | static | ✓ |
| 24mo buyback | $30M/yr × 2 (ARFC budget) — currently governance-stated | n/a | static for now | ◐ replace with on-chain rate when adapter lands |
| Annual buyback (on-chain) | Alchemy `eth_getLogs` for `Transfer` events INTO Collector wallet | API key | hourly | ✗ adapter pending (task #6) |
| Lifetime cumulative buyback | Same as above, historical pull | API key | one-shot | ✗ adapter pending |
| Holder yield (Cat B) | n/a — AAVE has none (Safety Module rewards = Cat C) | n/a | n/a | ✓ |

**TP inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Daily buybacks | Alchemy `Transfer` event logs filtered by `to=Collector` | API key | hourly | ✗ pending |
| Daily Collector balance | `eth_call AAVE.balanceOf(Collector)` daily | API key | daily | ✗ pending |
| Daily burns | n/a (Aave doesn't burn AAVE) | n/a | n/a | ✓ |
| Daily treasury accumulation | Collector balance Δ; also broader treasury (multi-asset) | API key | daily | ✗ pending |
| Daily net staking lockup | `stkAAVE.totalSupply()` daily, diff day-over-day | API key | daily | ✗ pending |
| Daily Cat C emissions (informational) | `Transfer` from Ecosystem Reserve to stkAAVE | API key | daily | ✗ pending |
| Daily unlock events | n/a — no team vesting active | n/a | static | ✓ |
| Per-day price | CG market_chart | None | daily | ✗ to wire |

**What's needed to go live for AAVE**
1. Alchemy API key (already have) — ✓
2. Etherscan API key as backup — ✗ sign up
3. Build `scripts/onchain/aave/{fetch-collector,fetch-safety-module,fetch-treasury}.js` — ~5 hrs work

---

### SKY (Ethereum mainnet)

**Known addresses**
- SKY: `0x56072C95FAA701256059aa122697B133aDEd9279`
- USDS: `0xdC035D45d973E3EC169d2276DDab16f1e407384F`
- SBE Splitter: `0xBF7111F13386d23cb2Fba5A538107A73f6872bCF`
- **ChainLog** (name → address resolver): `0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F`

**HM inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Token price | CG | None | hourly | ✓ |
| Circulating supply | CG or Alchemy `SKY.totalSupply() − non-circulating` | None / API key | hourly | ✓ via CG |
| 24mo unlocks | Editorial seed — SKY has no remaining schedule | n/a | static | ✓ |
| 24mo emissions | Editorial seed (staking yield paid in USDS, not SKY) | n/a | static | ✓ |
| 24mo buyback | Currently $0 (SBE bypassed in Phase 1) | n/a | static | ✓ |
| Annual buyback (on-chain) | Alchemy: monitor SBE Splitter for SKY burns when Phase 3 activates | API key | hourly | ✗ pending |
| Holder yield (Cat B) | $72M/yr stated — should verify via on-chain USDS yield to stkSKY | API key | daily | ✗ pending — **critical**, currently governance-stated only |
| ABC wallet balance | Resolve via ChainLog, then `USDS.balanceOf(ABC)` | API key | daily | ✗ pending — also Phase 3 trigger ($150M floor) |

**TP inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Daily buybacks | SBE Splitter event logs — currently $0 during Phase 1 | API key | hourly | ✗ pending (will mostly produce empty until Phase 3) |
| Daily burns | Transfer to `0x0` from SBE — same as buybacks for SKY | API key | hourly | ✗ pending |
| Daily ABC accumulation | USDS balance of ABC wallet, daily diff | API key | daily | ✗ pending |
| Daily Cat B distribution | USDS yield from Sky Staking Engine to stkSKY holders | API key | daily | ✗ pending — distribution mechanism needs editorial unpacking first |
| Daily net staking lockup | Sky Staking Engine `totalSupply()` daily diff | API key | daily | ✗ pending |
| Daily unlock events | n/a — fully circulating | n/a | static | ✓ |
| Per-day price | CG market_chart | None | daily | ✗ to wire |

**What's needed to go live for SKY**

Updated 2026-05-26:

1. ✓ Alchemy API key
2. ⚠ **Distribution mechanism is ambiguous from public-facing sources.** Public docs/blogs describe TWO different stories: (a) Sky Staking Engine receives bought-back SKY as rewards (which would be Cat A + redistribute, not Cat B), and (b) the article we're tracking states "40% × $180.73M net revenue paid in USDS to stkSKY" (Cat B). Could be both, phase-dependent. **Resolve by reading Sky Staking Engine contract events on Etherscan directly** — look at what asset types flow OUT of the Staking Engine to stakers (USDS Transfer? SKY Transfer? Both?). This is on-chain truth + 30 min of inspection. Until resolved, our HM seed's Cat B figure for SKY is the **largest source of HM uncertainty in the cohort**.
3. ChainLog resolver helper + adapters — ~6 hrs work
4. Find the actual Sky Staking Engine address — not in ChainLog under a documented key yet; check `forum.sky.money` for the September 2024 executive that deployed it.

---

### LIT (zkLighter — L1 mainnet + L2 zkLighter)

**Known addresses**
- LIT (L1): `0x232ce3bd40fcd6f80f3d55a522d03f25df784ee2`
- zkLighter Escrow (L1): `0x3B4D794a66304F130a4Db8F2551B0070dfCf5ca7`
- zkLighter L2 chain ID: 300 (0x12c)
- zkLighter L2 API: `https://mainnet.zklighter.elliot.ai`

**HM inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Token price | CG | None | hourly | ✓ |
| Circulating supply | CG or `LIT.totalSupply() − Escrow.balance − vesting balances` | None / API key | hourly | ✓ via CG |
| 24mo unlocks | Editorial seed (Dec 22 2026 cliff + 13.5M/mo for 36mo) | n/a | static | ✓ |
| 24mo emissions | Editorial seed (22.27M LIT staking emissions, Cat C) | n/a | static | ✓ |
| 24mo buyback | $25.53M/yr × 2 — currently governance-stated | n/a | static | ◐ replace with L2 trades feed when adapter lands |
| Annual buyback (on-chain) | zkLighter REST `/api/v1/trades?account_index=<buyback_account>` | API key (TBD) | hourly | ✗ pending — also need to discover the buyback account_index |
| Holder yield (Cat B) | n/a — LIT staking is Cat C | n/a | n/a | ✓ |

**TP inputs**
| Data point | Source | Auth | Cadence | Status |
|---|---|---|---|---|
| Daily buybacks | zkLighter `/api/v1/trades` filtered by protocol account | API key (TBD) | hourly | ✗ pending |
| Daily LLP fees | zkLighter `/api/v1/trades?market_type=spot` filtered for liquidation fees | API key (TBD) | hourly | ✗ pending |
| Daily L1 vesting unlocks | Alchemy `Transfer` events from vesting contracts (addresses TBD) | API key | daily | ✗ pending — vesting addresses discoverable from top LIT holders on Etherscan |
| Daily net staking lockup | LIT staking contract on zkLighter L2 | API key (TBD) | daily | ✗ pending |
| Per-day price | CG market_chart + zkLighter `/api/v1/orderBookDetails` cross-check | None / TBD | daily | ✗ to wire |

**What's needed to go live for LIT**

Updated 2026-05-26 from live probes:

1. ✓ **zkLighter `/orderBooks` accessible unauth** — confirmed. LIT/USDC spot market is `market_id: 2049`. LIT perp is `market_id: 120`.
2. ✗ **zkLighter `/trades` requires authentication** — `auth query param and Authorization header are empty` on every call. Register an API key via the Lighter Python SDK (`github.com/elliottech/lighter-python/examples/system_setup.py`) and store as `LIGHTER_API_KEY` + `LIGHTER_ACCOUNT_INDEX`. **This is the v1 blocker for the LIT buyback adapter.**
3. ✗ **Protocol buyback account_index not surfaced in public docs.** `publicPoolsMetadata?filter=protocol` returned an empty array. Three paths once we have an API key: (a) query trades on `market_id=2049`, look for repeated systematic buy-side fills to discover the protocol account; (b) ask Lighter directly on Discord/Twitter; (c) wait for Lighter to announce/document the address.
4. ✗ **Discover L1 vesting contract addresses** — Etherscan's `tokenholderlist` endpoint is Pro-only (free tier blocked). Alchemy's transfer-log enumeration is the workaround: pull `alchemy_getAssetTransfers` from the LIT contract's deployment block forward, find the largest initial mints to identify vesting/treasury wallets. ~30 min of inspection work.
5. Build adapters — ~5 hrs once items 2-4 are resolved.

---

## Token Grade (TG) — data needs per metric

The TG chain is `trusted_revenue × clean_conversion × token_alignment × SS-PE`.
Each input below lists where it comes from, how it refreshes, and where the
gaps are. Seeds in `data/tg/token-grades/` carry **judgment**; everything
marked *bound* re-pulls from the pipeline on every cron run via
`data_bindings` in the token file (applied by `scripts/tg/compute-tg.js`).

| Input | Source | Refresh | Gaps / notes |
|---|---|---|---|
| Revenue run-rates (1y, 30d-ann) | DL via `scripts/fetch-data.js` → `data/latest.json` (`revenue_1y`, `revenue_30d`) | **bound** — every cron run | DL revenue is $0 for fee-switch-off protocols (MORPHO, KMNO) and misses off-DL revenue (RLB casino). `fees_1y` kept as gross reference. |
| Durability adjustment | seed judgment (default 1.0) | manual / evidence pipeline | No automated retention/concentration source yet. |
| Clean conversion | seed judgment; derived default by mechanism (lockers 1.0 · executing buyback 0.95 · else 0.85) | manual / evidence pipeline | Real opex routing unverified for most proxies — flagged low confidence. |
| Token alignment | **derived**: HM real capture ÷ clean earnings, capped at 1 | **bound** — recomputed each run from `data/hm/snapshots/latest.json` | Inherits HM verification flags (onchain > proxy > stated). Cap hits (capture > clean earnings) auto-flag a window-mismatch question. |
| Claim category | derived from `va_*` metadata in `data/latest.json` (mechanism/status/accrual), overridable per token | seed-time; re-derive via re-seed or evidence apply | `va_*` fields are curated in `data/config.json` — keep them current; they are the claim-quality source of truth. |
| Ke build-up | rf + ERP constants in `scripts/tg/token-grading.js` (3M T-bill, manual update) + component scores derived from mcap depth, FDV/mcap overhang, derived alignment, category | seed-time + manual rf updates | No automated rf feed — consider FRED DGS3MO fetch if drift matters. Scores are heuristics; evidence pipeline refines. |
| ROE denominators | on-chain adapters where they exist: HYPE AF balance (`data/np` static ref), AAVE Collector + Ecosystem Reserve + Safety Module (`data/onchain/aave/`) | daily tier | Missing: SKY surplus buffer, LIT treasury, all proxy-tier treasuries, AAVE multi-asset (non-AAVE-token) treasury. |
| Underwriting ROE / terminal g | derived defaults (category band / revenue momentum), overridable | seed-time | Momentum-derived g is crude across regime changes (ZRO, GNS). |
| Market cap / FDV | CG via `data/latest.json` | **bound** — every cron run | Falls back to `*_seed` values for untracked tokens. |
| Evidence & flags | `scripts/tg/token-grade-check.js` (prompt/apply/triggers) → `data/tg/findings.jsonl` | agent-driven + quant triggers | Open seed questions live in `data/tg/GRADING-QUESTIONS.md`. |

---

## Real-time vs hourly — when do we actually need live?

Honest read:

| Data point | Live? | Why |
|---|---|---|
| Headline price on landing pages | **nice to have** | Front-end polish. Pyth or HL Info API perp can give us this without auth. |
| AF buyback fills as they happen | **no** | Hourly is fine. The HM number is a 60d SMA; a 1-hour gap doesn't move it. |
| Daily NP value | **no** | Daily granularity is the natural unit. |
| Treasury balance | **no** | Hourly suffices. |
| Governance vote outcomes | **manual** | Editorial — when a major change happens we update the seed by hand. |

**Recommendation:** stay on the hourly cron everywhere. Add a single live price WebSocket on the frontend (HL Info API for HYPE, CG Pro WS for the rest if we want it) only when the UI is finished and the lack of live price becomes the obvious gap. Not now.

---

## Acquisition list (ordered)

Things to sign up for / verify, in priority order:

1. ✓ **Etherscan API key** — done. V2 endpoint is the right one to call.

2. ✓ **zkLighter `/orderBooks` unauth access verified** — done. `/trades` still needs auth (see next item).

3. ✗ **Lighter API key** (~30 min, free) — sign up via the SDK setup flow at `github.com/elliottech/lighter-python/blob/main/examples/system_setup.py`. Returns `(API_KEY, ACCOUNT_INDEX)` pair tied to an L1 address. Store as `LIGHTER_API_KEY` and `LIGHTER_ACCOUNT_INDEX` in `.env`. **You sign up; paste in.** This unblocks both `/trades` queries and the discovery of the protocol's buyback account_index.

4. ✗ **Resolve SKY Cat B distribution mechanism** (~30 min, free) — load the Sky Staking Engine contract on Etherscan, inspect the `Transfer` events FROM the staking engine address. If they're predominantly USDS, Cat B is real; if they're predominantly SKY, our seed is mislabeled (it's Cat A redistribute, not Cat B). The Sky governance forum's September 2024 executive thread should also clarify; I can pull this when the SKY adapter starts.

5. ✗ **Discover LIT L1 vesting contract addresses** — via `alchemy_getAssetTransfers` from LIT contract's deployment block + Etherscan token-tx feed. ~30 min when we start the LIT adapter.

6. **(Optional) Dune Plus** ($390/mo) — only if we want to skip writing Alchemy ingestion and use pre-indexed queries instead.

7. **(Optional) CoinGecko Pro** ($129/mo) — only for live WebSocket prices on the frontend.

8. **(Optional) Tokenomist API** — alternative to maintaining per-protocol `tokenomics.js` modules by hand.

6. **(Optional) Dune Plus** ($390/mo) — if we want pre-indexed SKY/AAVE buyback queries instead of running our own Alchemy ingestion. Not needed if we just write the adapters.

7. **(Optional) CoinGecko Pro** ($129/mo) — only needed if we want live WebSocket prices in the frontend. Currently DL + CG free covers our hourly cadence.

8. **(Optional) Tokenomist API** — alternative to maintaining the per-protocol `tokenomics.js` modules by hand. Worth evaluating once we have 3+ protocols' tokenomics to maintain.

---

## What I already have in this repo

- ✓ Alchemy key (in `.env` as `ALCHEMY_API_KEY`) — works for mainnet + HyperEVM RPC
- ✓ Etherscan key (in `.env` as `ETHERSCAN_API_KEY`) — V2 endpoint, free tier
- ✓ HL Info API (public, free, no key needed)
- ✓ zkLighter `/orderBooks` unauth read — LIT/USDC spot = `market_id: 2049`
- ✓ ASXN backfill output for HYPE (one-shot, committed to `data/external/asxn/`)
- ✓ DefiLlama + CoinGecko free tier wired in `scripts/fetch-data.js`
- ✓ Hourly cron via GitHub Actions

Total monthly cost so far: **$0**.
