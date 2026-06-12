# truepressure-hm — Claude Instructions

This is a **standalone product**, not a slice of a larger workspace. Scope: the live HM + TP data pipeline and dashboard.

Two coverage tiers:

- **Core cohort — HYPE / AAVE / SKY / LIT.** Editorial seeds in `data/hm/config.json`, on-chain adapters, TP coverage, deep pages. Adding a core protocol is a deliberate decision that follows `PROTOCOL-PLAYBOOK.md` end-to-end.
- **Proxy tier — the rest of `data/config.json` (~30 tokens).** HM only, synthesized from DL holders-revenue/fees proxies; no editorial seed, no TP. Cheap to add/remove; always flagged `proxy` in the data.

When working here, the rules in this file are authoritative. There is no parent CLAUDE.md to inherit from.

**Docs carry no current-value numbers.** The dashboard (and `data/*/snapshots/latest.json`) is the source of truth for any metric; numbers written into docs rot silently. The only exception is the `--check` regression anchors, which are constants tied to the published article, not current-value claims.

---

## The three pipelines

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

### Trust Discount (TG)

```
trusted_revenue             = selected_run_rate × durability_adjustment
clean_platform_earnings     = trusted_revenue × clean_conversion
token_attributable_earnings = clean_platform_earnings × token_alignment_factor
SS-PE                       = (1 − g / ROE) / (Ke − g)
implied_token_value         = token_attributable_earnings × SS-PE
```

Separates business quality (clean conversion, ROE, g) from token claim quality (alignment, Ke). The UI's two scenario modes vary one side while pinning the other — never both, to prevent double-counting. The headline metric is the **Trust Discount**: `1 − implied(current claim) / implied(full equity at the benchmark Ke)` — same business both sides, only the wrapper changes. A CLARITY-Act policy scenario (component multipliers in the engine) compresses the regulatory/liquidity/custody premia everywhere including the benchmark; alignment never moves under it. Engine: `scripts/tg/token-grading.js` (canonical) mirrored by `web/lib/token-grading.ts` — keep them in lockstep. Grade inputs in `data/tg/token-grades/` change only through `scripts/tg/token-grade-check.js apply` with sourced evidence; `data_bindings` re-pull revenue/alignment/market data from each cron ingestion; `compute-tg.js --check` asserts the five spec acceptance anchors (CI), same philosophy as HM's article regression. Internals keep the `tg` naming; the public route is `/trust-discount` (old `/token-grade` redirects).

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

`--check` is the CI form: implies `--reproduce-article`, writes **no files**, asserts the four anchors (`ARTICLE_EXPECTED_HM` in compute-hm.js), exits non-zero on deviation. `.github/workflows/test.yml` runs it on every push touching the compute layer. Plain `--reproduce-article` overwrites `snapshots/latest.json` with article-mode values — never run it in the data cron.

## Pipeline invariants

- **Validation gate.** `scripts/lib/validate-pipeline.js` runs before the data cron's commit; if core outputs are stale/malformed the run fails and nothing ships. Fetch steps are `continue-on-error` — the gate, not step failure, is what protects correctness.
- **Checkpointed scans.** Every Alchemy trailing-window scan resumes from `data/onchain/<protocol>/checkpoints.json` via `scripts/lib/scan-checkpoint.js` (~2-day overlap to recompute partial-day aggregates). New scan adapters must do the same.
- **Shared helpers.** Adapter utilities live in `scripts/lib/evm-adapter-utils.js` — import them, never copy them into a new adapter. Daily-snapshot deltas must use `priorDateRow` (last-written-row deltas corrupt under intra-day re-runs).
- **Two cron tiers.** The 00:15 UTC run (or manual dispatch) does the full refresh; the other 4-hourly runs only refresh DL+CG, HYPE feeds and computes. Daily-granularity sources don't get fetched more than daily.

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

- Not an underwriting tool — with one deliberate carve-out: the **Token Grade module** (`data/tg/`, `scripts/tg/`, `/token-grade`) is a quantitative claim-quality engine whose rubric is fixed by its spec and whose inputs change only through sourced evidence via `token-grade-check.js`. Beyond that module: no ad-hoc scoring rubrics, deep-dive narrative notes, qualitative scorecards, or per-protocol research markdown — those still belong in the separate underwriting workspace.
- Not a research surface. No editorial commentary embedded in the data. Markdown reports under `data/{hm,np}/reports/` are structured outputs derived from the seed + on-chain data, not opinion.
- Not a multi-asset analytics platform. The **core cohort** is the four named protocols; adding a fifth is a deliberate decision documented in `data/hm/config.json`'s `protocols` block, not a casual expansion. The proxy tier may grow/shrink casually — it's explicitly the low-effort, lower-confidence ring and never gets editorial seeds or TP adapters without being promoted to core.
