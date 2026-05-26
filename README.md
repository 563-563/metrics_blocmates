# truepressure-hm

Combined Holder Multiple (HM) + Net Pressure (TP) dashboard for crypto protocols.

- **Holder Multiple (HM)** — valuation lens. `Adj MCap / Real Capture`. The article: "Introducing the Holder Multiple."
- **Net Pressure (TP)** — flow lens. Daily `(Unlocks + Treasury Sells) − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups)`. Architecture borrowed from the truepressure reference repo.

Cohort: **HYPE, AAVE, SKY, LIT** — with HYPE fully wired on-chain today and the other three pending adapter work.

---

## Layout

```
truepressure-hm/
├── CLAUDE.md                       project-scoped methodology + conventions
├── README.md                       this file
├── ONCHAIN-INTEGRATION-PLAN.md     per-protocol adapter roadmap
├── .env, .env.example              ALCHEMY_API_KEY etc. (.env gitignored)
│
├── scripts/                        data pipeline (Node CommonJS)
│   ├── fetch-data.js               DefiLlama + CoinGecko snapshot
│   ├── hm/compute-hm.js            HM compute, on-chain feed override, 60d SMA
│   ├── np/compute-np.js            TP compute, per-day USD pricing
│   ├── history/append-history.js   daily snapshot persistence
│   ├── onchain/
│   │   └── hype/                   HL Info API adapters (AF buybacks, supply, staking)
│   └── external/                   ASXN historical backfill + merge
│
├── data/                           inputs + outputs (committed for fast frontend reads)
│   ├── config.json                 token slugs for DL + CG
│   ├── latest.json                 DL+CG snapshot (regenerated each run)
│   ├── hm/, np/                    seed + snapshots + reports
│   ├── onchain/                    daily on-chain feed accumulations
│   ├── external/asxn/              raw ASXN payloads
│   └── history/                    per-symbol time series
│
├── web/                            Next.js 15 frontend (Vercel-deployable)
│   ├── app/
│   │   ├── page.tsx                cohort overview
│   │   └── [protocol]/page.tsx     per-protocol deep page
│   └── components/, lib/
│
├── debug/index.html                zero-build local debug view (vanilla JS + Chart.js)
│
└── .github/workflows/
    └── update-data.yml             hourly cron: pipeline → commit data updates
```

---

## Run order

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
```

One-time backfills:

```bash
# HL Info API trailing 30d (idempotent)
node scripts/onchain/hype/backfill-af.js --days 90

# ASXN 14-month historical (manual JWT; Cloudflare Turnstile gated)
ASXN_JWT="eyJ..." node scripts/external/asxn-backfill.js
node scripts/external/asxn-merge.js
```

Regression test (reproduces the published article exactly):

```bash
node scripts/hm/compute-hm.js --reproduce-article
# Expected: SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×
```

---

## Frontend

Two surfaces:

- **`debug/index.html`** — zero-build vanilla JS + Chart.js. Open via `python -m http.server 8000` from the repo root, browse to `http://localhost:8000/debug/`. Use for quick iteration.
- **`web/`** — Next.js 15 App Router, deployable to Vercel. `/` is the cohort overview; `/[protocol]` (e.g. `/hyperliquid`) is the per-protocol deep page.

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

To deploy to Vercel: connect this repo, set **Root Directory** to `web`, deploy. No env vars required — the page reads data via local JSON imports.

---

## Coverage status

| Protocol | HM verification | TP coverage | Notes |
|---|---|---|---|
| **HYPE** | onchain (60d SMA) | full | 14mo buyback history via ASXN, daily on-chain refresh via HL Info API |
| **AAVE** | governance_stated | none | Alchemy mainnet adapter pending; Collector, stkAAVE, Ecosystem Reserve addresses confirmed |
| **SKY** | governance_stated | none | Alchemy mainnet via ChainLog discovery; ABC + Staking Engine resolution pending |
| **LIT** | governance_stated | none | L1 Alchemy + L2 zkLighter REST (`mainnet.zklighter.elliot.ai`) |

See `ONCHAIN-INTEGRATION-PLAN.md` for the per-protocol adapter roadmap.

---

## Relationship to the underwriting workspace

This repo is **deliberately separate** from the broader fundamentals/underwriting research workspace. The underwriting workspace (deep-dive analyses, value-accrual scoring, qualitative notes) lives elsewhere and stays focused on research output. This repo is just the live data pipeline + dashboard surface for HM and TP.

If a fix here applies to the underwriting workspace's fork of `fetch-data.js` (or vice versa), copy it across — there's no automatic sync.
