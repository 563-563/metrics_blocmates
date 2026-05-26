import Link from "next/link";
import { hm, np } from "@/lib/data";
import {
  bandColor,
  fmtMultiple,
  fmtPct,
  fmtTokensSigned,
  fmtUsd,
  fmtUsdSigned
} from "@/lib/format";

export const revalidate = 300;

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">truepressure-hm</h1>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-2xl">
          Two lenses per project. <span className="text-zinc-300">Holder Multiple</span>
          {" "}values cash flow to native-token holders. <span className="text-zinc-300">Net Pressure</span>
          {" "}tracks daily on-chain flow into and out of the market. Pick a project.
        </p>
        <p className="text-[11px] text-zinc-600 mt-2">As of {hm.as_of}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hm.protocols.map((p) => {
          const npP = np.protocols.find((n) => n.slug === p.slug);
          const np30 = npP?.rollups?.["30d"];
          const totalSupply =
            npP?.static_reference?.circulating_supply?.total_supply ??
            p.circulating_supply_tokens;
          const npDirection =
            np30 == null
              ? "none"
              : np30.net_pressure_tokens === 0
                ? "neutral"
                : np30.net_pressure_tokens > 0
                  ? "seller"
                  : "buyer";

          return (
            <article
              key={p.slug}
              className="border border-zinc-800 rounded-md bg-zinc-950 hover:bg-zinc-900/40 transition"
            >
              {/* Header strip */}
              <Link
                href={`/${p.slug}`}
                className="block px-6 pt-5 pb-4 border-b border-zinc-800"
              >
                <div className="flex items-baseline justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-100">{p.name}</h2>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      ${p.symbol} · {p.category} ·{" "}
                      <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-400">
                        {p.phase.active}
                      </code>
                    </p>
                  </div>
                  <p className="text-zinc-500 text-sm">→</p>
                </div>
              </Link>

              {/* Two-lens grid */}
              <div className="grid grid-cols-2 divide-x divide-zinc-800">
                {/* HM lens */}
                <Link
                  href={`/${p.slug}/hm`}
                  className="block p-5 hover:bg-zinc-900/40 transition"
                >
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                    Holder Multiple
                  </p>
                  <p className={`text-2xl font-semibold ${bandColor(p.hm_band)}`}>
                    {fmtMultiple(p.hm)}
                  </p>
                  <p className={`text-[11px] mt-0.5 ${bandColor(p.hm_band)}`}>
                    {p.hm_band}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-3">
                    Adj MCap {fmtUsd(p.adj_mcap_usd)}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Real Capture {fmtUsd(p.real_capture_usd)}/yr
                  </p>
                </Link>

                {/* TP lens */}
                <Link
                  href={`/${p.slug}/tp`}
                  className="block p-5 hover:bg-zinc-900/40 transition"
                >
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                    Net Pressure · 30d
                  </p>
                  {np30 ? (
                    <>
                      <p
                        className={`text-2xl font-semibold ${
                          npDirection === "seller"
                            ? "text-rose-400"
                            : npDirection === "buyer"
                              ? "text-emerald-400"
                              : "text-zinc-200"
                        }`}
                      >
                        {fmtTokensSigned(np30.net_pressure_tokens)} {p.symbol}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {fmtUsdSigned(np30.net_pressure_usd)} ·{" "}
                        {fmtPct(np30.net_pressure_tokens / totalSupply, 3)} of supply
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-3">
                        {npDirection === "seller"
                          ? "net seller"
                          : npDirection === "buyer"
                            ? "net buyer"
                            : "balanced"}
                        {!np30.coverage_complete && (
                          <span className="text-amber-500 ml-1">⚠ partial</span>
                        )}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        Cov {np30.buyback_coverage_days}/{np30.window_days}d
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-zinc-500 text-sm mt-2">No data</p>
                      <p className="text-[10px] text-zinc-600 mt-3">
                        On-chain adapter pending
                      </p>
                    </>
                  )}
                </Link>
              </div>

              {/* Verification footer */}
              <div className="px-6 py-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                <span>
                  Verification:{" "}
                  <span
                    className={
                      p.annual_buyback_verification === "onchain"
                        ? "text-emerald-400"
                        : p.annual_buyback_verification === "governance_stated"
                          ? "text-amber-400"
                          : "text-zinc-500"
                    }
                  >
                    {p.annual_buyback_verification}
                  </span>
                </span>
                <span className="text-zinc-600">
                  Price ${p.price_usd.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <footer className="pt-8 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed mt-10">
        <p>
          Sources: DefiLlama, CoinGecko, Hyperliquid Info API, ASXN (HYPE
          backfill), editorial seed at{" "}
          <code className="text-zinc-500">data/hm/config.json</code>. Reproduce
          the published article via{" "}
          <code className="text-zinc-500">
            node scripts/hm/compute-hm.js --reproduce-article
          </code>
          {" "}→ SKY 26.3× / AAVE 46.3× / HYPE 34.5× / LIT 15.4×.
        </p>
      </footer>
    </main>
  );
}
