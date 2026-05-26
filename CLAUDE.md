# truepressure-hm — Claude Instructions

This is a **standalone product**, not a slice of a larger workspace. Scope: the live HM + TP data pipeline and dashboard for HYPE / AAVE / SKY / LIT. Nothing else.

When working here, the rules in this file are authoritative. There is no parent CLAUDE.md to inherit from.

---

## The two pipelines

### Holder Multiple (HM)

```
Adjusted MCap   = Float MCap + 24mo Unlocks + 24mo Emissions − 24mo Buybacks
Real Capture    = Annual Buyback (Cat A) + Annual External Cashflow Yield to Native Holders (Cat B)
HM              = Adjusted MCap / Real Capture
```

Bands: **<10×** exceptional · **10–20×** strong · **20–35×** fair value · **35–50×** expensive · **>50×** speculative.

### Net Pressure (TP)

```
Net Pressure = (Unlocks + Treasury Sells)
             − (Buybacks + Burns + Treasury Accumulation + Net Staking Lockups)
```

Sinks (right side) only count when positive — unstaking and treasury sells flow into the opposite-direction column. Positive Net Pressure = market is absorbing supply faster than the protocol can sink it; negative = protocol is a net buyer.

---

## Value Capture Decomposition

When scoring or aggregating value returned to native-token holders:

| Category | Mechanism | Counts as Real Capture? |
|---|---|---|
| **A. Supply compression** | Protocol buys back tokens (treasury, burn, distribution) | **YES** |
| **B. External cashflow yield to native-token stakers** | Stable-denominated yield to stakers OF THE NATIVE TOKEN, sourced from protocol revenue | **YES** |
| **C. Token-denominated emissions to stakers** | Native tokens distributed from pre-allocated reserve | **NO — dilution rebate** |

Category B requires the staker to be a holder of the **native token**. SKY stakers earning USDS counts; ENA's USDe stakers earning USDe does NOT count toward ENA's Real Capture.

---

## Verification flags

Every numerical input carries `verification`:

| Flag | Meaning |
|---|---|
| `onchain` | Verified via direct chain/API read. Highest confidence. |
| `governance_stated` | From protocol governance docs. Unverified at compute time. |
| `proxy` | Inferred from a related metric (DL `holdersRevenue` etc.). |
| `n/a` | Component doesn't apply (e.g. HYPE has no burns). |

When an `onchain` feed is available, the compute layer must prefer it over `governance_stated` / `proxy`. The seed in `data/hm/config.json` is the fallback path.

---

## Buyback annualization window

HM's "Annual Buyback (Category A)" uses a **rolling 60-day SMA × 365** when an on-chain feed is wired. Configurable per-protocol via `onchain_buyback_annualize_days` and `onchain_buyback_min_days` in the seed.

60d balances reactivity vs noise. Every HM report includes a "Buyback rate lens" line that shows 60d annualized alongside lifetime annualized — material divergence (>30%) is a signal in itself.

---

## Per-day USD honesty

TP's daily series and rollups use **per-day historical price × per-day token flow** when a `daily_price_path` is configured in `data/np/config.json`. Falls back to today's live price for dates the price feed doesn't cover.

A naive `total_tokens × today_price` on a 90-day rollup is misleading when price has moved. Always prefer per-day pricing when available.

---

## Reproduce-article mode

`scripts/hm/compute-hm.js --reproduce-article` must always produce **SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×** when seed values match the published article. Regression test.

In this mode all on-chain feed overrides are bypassed and the seed's `article_price_usd` and `article_circulating_tokens` are used directly. Any compute-layer change must keep this passing.

---

## When to add a new protocol

**Follow `PROTOCOL-PLAYBOOK.md`** — it has the full onboarding checklist, per-input sourcing decision trees, buyback mechanism archetypes (with the template adapter to copy for each), the address-discovery toolkit, the verification flag taxonomy, and the recurring gotchas. Short version:

1. Confirm DL + CG slugs in `data/config.json`.
2. Add a `protocols.<slug>` entry to `data/hm/config.json` with: phase, article reference values, unlocks_24mo_tokens, emissions_24mo_tokens, buyback_24mo_usd, annual_buyback_usd, annual_holder_yield_usd, verification flags, sources.
3. Classify the buyback mechanism (Playbook §2) → copy the matching adapter template.
4. Discover addresses (Playbook §3), build the adapter, wire `onchain_buybacks_path` (+ `onchain_holder_yield_path` for Cat B) into the seed.
5. Add a `protocols.<slug>` entry to `data/np/config.json` with source paths.
6. Wire feeds into `web/lib/data.ts` → `onchainFeeds`, add cron steps.
7. Run compute scripts, verify report, confirm `--reproduce-article` still passes.

---

## Frontend conventions

- **`debug/index.html`** is the fast-iteration surface — single file, no build, Chart.js from CDN. Edit and Ctrl+F5.
- **`web/`** is the production frontend. Next.js 15 App Router, React 19, Recharts 3, Tailwind v3.
  - `/` = cohort overview (HM table + summary).
  - `/[protocol]` = per-protocol deep page. Each protocol page renders 4 sections in order: HM 10-row breakdown, Buyback + AF-balance charts, TP daily + rollups, Unlock allocation + upcoming events. Sections with no data render an "adapter pending" placeholder rather than disappearing — coverage gaps are part of the dashboard's signal.
- Data layer is static JSON imports from `../data/`. Hourly cron pushes new data → Vercel redeploys.

---

## What this dashboard is NOT

- Not an underwriting tool. Don't add value-accrual scoring rubrics, deep-dive narrative notes, qualitative scorecards, or per-protocol research markdown — those belong in the separate underwriting workspace.
- Not a research surface. No editorial commentary embedded in the data. Markdown reports under `data/{hm,np}/reports/` are structured outputs derived from the seed + on-chain data, not opinion.
- Not a multi-asset analytics platform. Cohort is the four named protocols. Adding a fifth is a deliberate decision documented in `data/hm/config.json`'s `protocols` block, not a casual expansion.
