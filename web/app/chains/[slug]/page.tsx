import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CHAIN_SLUGS,
  getChainBySlug,
  getChainCategories,
  getChainHistory,
  getChainProtocols
} from "@/lib/chains";
import { fmtUsd } from "@/lib/format";
import { ChainGdpHistoryChart } from "@/components/ChainGdpHistoryChart";
import { ChainCategoryMix } from "@/components/ChainCategoryMix";
import { ChainProtocolsTable } from "@/components/ChainProtocolsTable";
import { InfoTip } from "@/components/InfoTip";
import { KpiBig } from "@/components/KpiBig";
import { StablecoinToggle } from "@/components/StablecoinToggle";
import {
  chainSummaryWithoutStablecoins,
  getChainMonthlyDelta
} from "@/lib/chain-aggregates";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CHAIN_SLUGS.map((slug) => ({ slug }));
}

function gdpTvlClass(band: string | null): string {
  switch (band) {
    case "high":      return "text-emerald-300";
    case "med-high":  return "text-lime-300";
    case "med-low":   return "text-amber-300";
    case "low":       return "text-rose-300";
    default:          return "text-zinc-500";
  }
}
function revGdpClass(band: string | null): string {
  switch (band) {
    case "app-friendly": return "text-emerald-300";
    case "modest":       return "text-lime-300";
    case "heavy":        return "text-amber-300";
    case "extractive":   return "text-rose-300";
    default:             return "text-zinc-500";
  }
}

export default async function ChainPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ include_stablecoins?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const includeStablecoins = sp.include_stablecoins !== "false";

  const rawChain = getChainBySlug(slug);
  if (!rawChain) notFound();
  const c = includeStablecoins ? rawChain : chainSummaryWithoutStablecoins(rawChain);

  // History: when stablecoins excluded, swap `gdp` for `gdp_app` so the
  // chart and tooltip read as app-only.
  const history = getChainHistory(slug).map((d) =>
    includeStablecoins ? d : { ...d, gdp: d.gdp_app }
  );
  // Drop Stablecoin Issuer rows from protocols & categories when toggle off.
  const protocols = getChainProtocols(slug).filter(
    (p) => includeStablecoins || p.category !== "Stablecoin Issuer"
  );
  const categories = getChainCategories(slug).filter(
    (cat) => includeStablecoins || cat.category !== "Stablecoin Issuer"
  );
  const delta = getChainMonthlyDelta(slug, includeStablecoins);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <header className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image || `https://icons.llamao.fi/icons/chains/rsz_${c.slug}.jpg`}
            alt=""
            width={36}
            height={36}
            className="rounded-full bg-zinc-800 shrink-0"
            loading="lazy"
          />
          <h1 className="text-3xl font-semibold tracking-tight">{c.name}</h1>
          {c.symbol && <span className="text-zinc-500 text-sm">${c.symbol}</span>}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
          <p className="text-xs text-zinc-500">
            Chain-GDP · {c.protocol_count} apps tracked · top app{" "}
            <span className="text-zinc-300">{c.top_protocol ?? "—"}</span>
            {c.top_category && (
              <span className="text-zinc-600"> ({c.top_category})</span>
            )}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 flex-wrap">
            <StablecoinToggle />
            <Link href="/chains" className="hover:text-zinc-200 transition">
              ← all chains
            </Link>
          </div>
        </div>
        {c.structural_note && (
          <div className="mt-4 rounded-md border border-amber-900/40 bg-amber-950/20 px-3 py-2.5 text-xs text-amber-200/90 leading-relaxed">
            <span className="font-medium">⚠ Structural note · </span>
            {c.structural_note}
          </div>
        )}
      </header>

      {/* Primary headline KPIs — flows and stocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiBig
          label="Monthly GDP"
          value={fmtUsd(c.gdp_30d_usd)}
          delta={delta.gdp.deltaPct}
        />
        <KpiBig
          label="Mcap"
          value={c.mcap_usd != null ? fmtUsd(c.mcap_usd) : "—"}
          sub={c.cg_id === null ? "no native token" : undefined}
        />
        <KpiBig
          label="TVL"
          value={c.tvl_usd != null ? fmtUsd(c.tvl_usd) : "—"}
          delta={delta.tvl.deltaPct}
        />
        <KpiBig
          label="Monthly REV"
          value={c.rev_30d_usd > 0 ? fmtUsd(c.rev_30d_usd) : "—"}
          delta={delta.rev.deltaPct}
          sub="base + priority fees"
        />
      </div>

      {/* Secondary KPIs — derived ratios + annualized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiBig
          tier="secondary"
          label="Annualized GDP"
          value={fmtUsd(c.gdp_annualized_usd)}
          sub="monthly × 365/30"
        />
        <KpiBig
          tier="secondary"
          label="GDP Multiple"
          value={c.gdp_multiple != null ? `${c.gdp_multiple.toFixed(1)}×` : "—"}
          sub="mcap ÷ annualized"
        />
        <KpiBig
          tier="secondary"
          label="GDP / TVL"
          value={c.gdp_over_tvl_ann != null ? `${(c.gdp_over_tvl_ann * 100).toFixed(1)}%` : "—"}
          valueClass={gdpTvlClass(c.gdp_over_tvl_band)}
          sub="capital productivity (ann.)"
        />
        <KpiBig
          tier="secondary"
          label="REV / GDP"
          value={c.rev_over_gdp_7d != null ? `${(c.rev_over_gdp_7d * 100).toFixed(1)}%` : "—"}
          valueClass={revGdpClass(c.rev_over_gdp_band)}
          sub="tax burden"
        />
      </div>

      {/* Stablecoin attribution disclosure when material */}
      {c.gdp_stable_30d_usd > 0 && (
        <p className="mb-8 px-1 text-xs text-zinc-500 leading-relaxed">
          <span className="text-zinc-400">Stablecoin attribution included:</span>{" "}
          {fmtUsd(c.gdp_stable_30d_usd)} over 30d{" "}
          ({((c.gdp_stable_30d_usd / c.gdp_30d_usd) * 100).toFixed(0)}% of GDP) —
          from USDC ({(c.stable_share_usdc * 100).toFixed(2)}% chain share) +
          USDT ({(c.stable_share_usdt * 100).toFixed(2)}% chain share).
        </p>
      )}

      {/* GDP over time */}
      <Section
        title="GDP over time · last 90 days"
        info={
          <>
            Daily app revenue (Chain-GDP) as a green area. Dashed rose line is
            REV (validator / sequencer fees) on the same axis — comparing them
            shows how the infrastructure layer&apos;s extraction tracks against
            the application layer&apos;s output.
          </>
        }
      >
        <ChainGdpHistoryChart data={history} />
      </Section>

      {/* Category mix */}
      <Section
        title="Category mix · 30d"
        info={
          <>
            Share of the chain&apos;s 30d revenue by app category. Stablecoin
            Issuer appears as a separate category (USDC/USDT off-chain reserve
            yield attributed by chain share, per paper §3.2.1).
          </>
        }
      >
        <ChainCategoryMix categories={categories} />
      </Section>

      {/* Top protocols */}
      <Section title={`Top apps · 30d (${protocols.length})`}>
        <ChainProtocolsTable protocols={protocols} limit={15} />
      </Section>

      <footer className="pt-6 border-t border-zinc-800 text-xs text-zinc-600 leading-relaxed">
        <p>
          Source: DeFiLlama (<code className="text-zinc-500">/overview/fees</code>,{" "}
          <code className="text-zinc-500">/v2/historicalChainTvl</code>,{" "}
          <code className="text-zinc-500">/summary/fees</code>,{" "}
          <code className="text-zinc-500">/stablecoins</code>) + CoinGecko (native-token mcap).
          {" "}Updated daily by the cron at <code className="text-zinc-500">scripts/chains/fetch-chain-gdp.js</code>.
        </p>
      </footer>
    </main>
  );
}

function Section({
  title,
  info,
  children
}: {
  title: string;
  info?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border border-zinc-800 rounded-md p-6 bg-zinc-950">
      <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
        {title}
        {info && <InfoTip>{info}</InfoTip>}
      </h2>
      {children}
    </section>
  );
}

