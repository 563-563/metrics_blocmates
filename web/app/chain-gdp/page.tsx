// Chain GDP landing — wraps the /chains cohort page at the metric-themed
// URL. Same Server Component contract; passes searchParams through so the
// stablecoin toggle still works.
import ChainsIndex from "../chains/page";

export const dynamic = "force-dynamic";

export default async function ChainGdpPage({
  searchParams
}: {
  searchParams: Promise<{ include_stablecoins?: string }>;
}) {
  return <ChainsIndex searchParams={searchParams} />;
}
