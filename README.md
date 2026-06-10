# truepressure-hm

Combined Holder Multiple (HM) + Net Pressure (TP) dashboard for crypto protocols.

- **Holder Multiple (HM)** — valuation lens. `Adj MCap / Real Capture`. The article: "Introducing the Holder Multiple."
- **Net Pressure (TP)** — flow lens. Daily `(Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups)`. Architecture borrowed from the truepressure reference repo.

Two coverage tiers:

- **Core cohort: HYPE, AAVE, SKY, LIT** — editorial seeds, on-chain adapters, full per-protocol deep pages. Adding a protocol here follows `PROTOCOL-PLAYBOOK.md` end-to-end.
- **Proxy tier (~30 tokens in `data/config.json`)** — HM synthesized from DefiLlama holders-revenue/fees proxies + CoinGecko, no editorial seed, no TP coverage. Cheap to add, clearly lower-confidence, flagged as such in the data.

Current values, coverage and verification status live on the dashboard itself — this README deliberately carries no numbers, because numbers in docs rot. If a doc number and the dashboard disagree, the dashboard is right.

---

## Layout

```
truepressure-hm/
├── CLAUDE.md                       project-scoped methodology + conventions
├── README.md                       this file
├── METHODOLOGY.md                  formula + per-input sourcing spec
├── PROTOCOL-PLAYBOOK.md            how to onboard a core-cohort protocol
├── ONCHAIN-INTEGRATION-PLAN.md     original adapter roadmap (historical) + status
├── .env, .env.example              ALCHEMY_API_KEY etc. (.env gitignored)
│
├── scripts/                        data pipeline (Node CommonJS)
│   ├── fetch-data.js               DefiLlama + CoinGecko snapshot
│   ├── hm/compute-hm.js            HM compute, on-chain feed override, 60d SMA
│   │                               (--check = CI regression, writes nothing)
│   ├── np/compute-np.js            TP compute, per-day USD pricing
│   ├── history/append-history.js   daily snapshot persistence
│   ├── lib/
│   │   ├── alchemy.js              EVM RPC client
│   │   ├── cg-prices.js            CG daily prices (+ local-file cache read)
│   │   ├── evm-adapter-utils.js    shared adapter helpers — import, never copy
│   │   ├── scan-checkpoint.js      block-scan resume (saves ~95% of scan calls)
│   │   └── validate-pipeline.js    pre-commit gate for the data cron
│   ├── onchain/                    per-protocol adapters (hype, aave, sky, lit, proxy)
│   ├── chains/fetch-chain-gdp.js   chain-GDP tracker (daily, early-exits)
│   └── external/                   ASXN backfill + CG price history
│
├── data/                           inputs + outputs (committed for fast frontend reads)
│   ├── config.json                 token registry for DL + CG (core + proxy tier)
│   ├── latest.json                 DL+CG snapshot (regenerated each run)
│   ├── hm/, np/                    seed + snapshots + reports (30d dated retention)
│   ├── onchain/                    daily on-chain feeds + scan checkpoints
│   ├── external/                   ASXN payloads, CG daily price files
│   └── history/                    per-symbol time series
│
├── web/                            Next.js 15 frontend (Vercel-deployable)
│
├── debug/index.html                zero-build local debug view (vanilla JS + Chart.js)
│
└── .github/workflows/
    ├── update-data.yml             data cron: 4-hourly fast tier + daily full tier
    └── test.yml                    CI: HM regression + data structure validation
```

---

## The data cron (update-data.yml)

One workflow, two tiers:

- **Every 4 hours:** DL+CG snapshot, HYPE on-chain feeds, HM/TP compute, history append.
- **Daily (00:15 UTC run, or any manual dispatch):** everything else — the Alchemy adapters (AAVE/SKY/LIT), DL proxy buyback feeds, CG price history, chain-GDP, snapshot pruning. These sources are daily-granularity; fetching them more often buys nothing.

Resilience model: fetch steps are `continue-on-error` (one flaky API doesn't kill the refresh); correctness is enforced by `scripts/lib/validate-pipeline.js`, which runs before the commit and fails the run if core outputs are stale or malformed. Nothing broken ships, nothing fresh is blocked by an unrelated outage.

The Alchemy adapters checkpoint their last-scanned block (`data/onchain/<protocol>/checkpoints.json`), so each run scans only new blocks plus a ~2-day overlap instead of the full trailing window.

---

## Run order (local)

```bash
# 1. Refresh DL + CG snapshot
node scripts/fetch-data.js

# 2. HYPE on-chain feeds (HL Info API, no auth)
node scripts/onchain/hype/fetch-af.js
node scripts/onchain/hype/fetch-supply.js
node scripts/onchain/hype/fetch-staking.js

# 3. Compute HM + TP
node scripts/hm/compute-hm.js
node scripts/np/compute-np.js

# 4. Append daily history (per-symbol time series)
node scripts/history/append-history.js

# 5. Sanity-check outputs (CI runs this with freshness checks too)
node scripts/lib/validate-pipeline.js --structure-only
```

Regression test — must always pass; CI runs it on every push that touches the compute layer:

```bash
node scripts/hm/compute-hm.js --check
```

`--check` reproduces the published article's HM values from the seed's `article_*` anchors and exits non-zero on any deviation. It writes no files. (The anchors are fixed constants tied to the published article — the one place hard numbers belong.)

One-time backfills:

```bash
# HL Info API trailing window (idempotent)
node scripts/onchain/hype/backfill-af.js --days 90

# ASXN 14-month historical (manual JWT; Cloudflare Turnstile gated)
ASXN_JWT="eyJ..." node scripts/external/asxn-backfill.js
node scripts/external/asxn-merge.js
```

---

## Frontend

Two surfaces:

- **`debug/index.html`** — zero-build vanilla JS + Chart.js. Open via `python -m http.server 8000` from the repo root, browse to `http://localhost:8000/debug/`. Use for quick iteration.
- **`web/`** — Next.js 15 App Router, deployable to Vercel. `/` is the cohort overview; `/[protocol]` (e.g. `/hyperliquid`) is the per-protocol deep page; `/chains` is the chain-GDP lens.

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

To deploy to Vercel: connect this repo, set **Root Directory** to `web`, deploy. No env vars required — the page reads data via local JSON imports.

---

## Coverage

Per-protocol coverage and verification flags (`onchain` / `proxy` / `governance_stated` / dormant) are rendered on the dashboard and carried row-level in `data/hm/snapshots/latest.json` — check there, not here. Broad strokes of the architecture:

- **HYPE** is the reference implementation: buybacks, supply and staking read on-chain every cycle.
- **AAVE / SKY / LIT** have live Alchemy/REST adapters refreshed daily; where a mechanism is genuinely inactive on-chain (e.g. a dormant farm or bypassed burn engine), the dashboard shows that reality rather than a seeded estimate.
- **Proxy-tier tokens** derive Real Capture from DefiLlama feeds and are flagged `proxy`.

See `PROTOCOL-PLAYBOOK.md` for onboarding the next core protocol; `ONCHAIN-INTEGRATION-PLAN.md` retains the original per-protocol research notes.

---

## Relationship to the underwriting workspace

This repo is **deliberately separate** from the broader fundamentals/underwriting research workspace. The underwriting workspace (deep-dive analyses, value-accrual scoring, qualitative notes) lives elsewhere and stays focused on research output. This repo is just the live data pipeline + dashboard surface for HM and TP.

If a fix here applies to the underwriting workspace's fork of `fetch-data.js` (or vice versa), copy it across — there's no automatic sync.
