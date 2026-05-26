import Link from "next/link";
import { hm } from "@/lib/data";
import { HmCohortTable } from "@/components/HmCohortTable";
import { fmtUsd } from "@/lib/format";

export const revalidate = 300;

export default function Page() {
  const totalRealCapture = hm.protocols.reduce(
    (s, p) => s + p.real_capture_usd,
    0
  );
  const totalAdjMcap = hm.protocols.reduce((s, p) => s + p.adj_mcap_usd, 0);
  const onchainCount = hm.protocols.filter(
    (p) => p.annual_buyback_verification === "onchain"
  ).length;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              HM + TP — Cohort
            </h1>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-2xl">
              Holder Multiple (HM) ÷ Net Pressure (TP) for a focused cohort.
              Per-protocol deep pages combine the article's HM breakdown with
              the truepressure flow lens.
            </p>
          </div>
          <div className="text-xs text-zinc-500 text-right">
            <div>As of {hm.as_of}</div>
            <div className="mt-0.5">{onchainCount}/{hm.protocols.length} verified on-chain</div>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border border-zinc-800 rounded-md p-5 bg-zinc-950">
          <Kpi label="Cohort size" value={`${hm.protocols.length}`} />
          <Kpi label="Σ Adj MCap" value={fmtUsd(totalAdjMcap)} />
          <Kpi label="Σ Real Capture" value={`${fmtUsd(totalRealCapture)}/yr`} />
          <Kpi
            label="Implied cohort multiple"
            value={`${(totalAdjMcap / totalRealCapture).toFixed(1)}×`}
            sub="weighted-average HM"
          />
        </div>

        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Holder Multiple
        </h2>
        <HmCohortTable protocols={hm.protocols} />
      </section>

      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Per-protocol deep pages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hm.protocols.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="block border border-zinc-800 rounded-md p-4 bg-zinc-950 hover:bg-zinc-900/60 transition"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-zinc-200">{p.name}</p>
                  <p className="text-xs text-zinc-500">${p.symbol} · {p.category}</p>
                </div>
                <p className="text-zinc-400 text-sm">→</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p className="mb-2">
          Sources: DefiLlama, CoinGecko, Hyperliquid Info API, ASXN (HYPE
          backfill), and editorial seed at <code className="text-zinc-500">data/hm/config.json</code>.
        </p>
        <p>
          Regression: <code className="text-zinc-500">node scripts/hm/compute-hm.js --reproduce-article</code> reproduces SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4× from the published article.
        </p>
      </footer>
    </main>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      <p className="text-lg text-zinc-100">{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}
