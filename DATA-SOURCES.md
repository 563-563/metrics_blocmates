# Data Access Inventory

Living document. What we need across the dashboard to power HM + TP for HYPE / AAVE / SKY / LIT in near-real-time. Updated as access lands.

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
| **Etherscan API** | Ethereum mainnet (and forks) — backup for tx history & contract verification | API key | Free tier 5 req/sec, 100k/day | one-shot | ✗ need key — sign up at etherscan.io/apis |
| **zkLighter direct RPC** | zkLighter L2 (`https://mainnet.zklighter.elliot.ai`) — Lighter's custom REST | None (rate-limited per IP) | Free, public | hourly | ✗ not yet wired |
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
1. Alchemy API key — ✓
2. Editorial research on USDS-to-stkSKY distribution mechanism — needs human time, not API key
3. ChainLog resolver helper + adapters — ~6 hrs work

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
1. **Confirm zkLighter API requires/doesn't require an API key** — first test request from the new repo
2. **Discover protocol buyback account_index** — via Lighter SDK examples or governance docs
3. **Discover L1 vesting contract addresses** — Etherscan top-holders inspection
4. Build adapters — ~5 hrs

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

1. **Etherscan API key** (free, 5 min) — `https://etherscan.io/apis`. Used as backup tx-history source + contract metadata for AAVE / SKY. We'll need it the moment the AAVE adapter starts. **You sign up; paste into `.env` as `ETHERSCAN_API_KEY`.**

2. **Verify zkLighter L2 access** (free, 15 min) — test request to `https://mainnet.zklighter.elliot.ai/api/v1/orderBooks` from outside a browser. If unauth works, we're set. If not, check their docs for API key signup. **I can run the probe once you say go.**

3. **Lighter SDK + buyback account_index** (free, 30 min) — clone `github.com/elliottech/lighter-python`, run `examples/system_setup.py`, look for protocol-owned account indices in the docs/Discord. **You poke around or ask the Lighter team; I synthesize what comes back.**

4. **Editorial research on SKY USDS-yield mechanism** (no API, ~1 hr) — confirm exactly which contract distributes USDS to stkSKY holders. ChainLog reads + Sky governance forum will resolve. **I can do this when we start SKY.**

5. **Etherscan top-holders for LIT vesting addresses** (free, 30 min) — inspect `https://etherscan.io/token/0x232ce3bd...#balances` for big balances that look like vesting contracts. **I can do this when we start LIT.**

6. **(Optional) Dune Plus** ($390/mo) — if we want pre-indexed SKY/AAVE buyback queries instead of running our own Alchemy ingestion. Not needed if we just write the adapters.

7. **(Optional) CoinGecko Pro** ($129/mo) — only needed if we want live WebSocket prices in the frontend. Currently DL + CG free covers our hourly cadence.

8. **(Optional) Tokenomist API** — alternative to maintaining the per-protocol `tokenomics.js` modules by hand. Worth evaluating once we have 3+ protocols' tokenomics to maintain.

---

## What I already have in this repo

- ✓ Alchemy key (in `.env`)
- ✓ HL Info API (public, free, no key needed)
- ✓ ASXN backfill output for HYPE (one-shot, committed to `data/external/asxn/`)
- ✓ DefiLlama + CoinGecko free tier wired in `scripts/fetch-data.js`
- ✓ Hourly cron via GitHub Actions, no secrets needed currently

Total monthly cost so far: **$0**.
