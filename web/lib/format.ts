// Format dollars with ~3 significant figures across magnitudes. Strips
// trailing zeros after the decimal point so $378M / $4.6B / $41.7B all
// read cleanly, instead of $377.97M / $4.60B / $41.71B.
function fmt3sf(v: number): string {
  let s = v.toPrecision(3);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  return s;
}

export function fmtUsd(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "$0";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e12) return `${sign}$${fmt3sf(abs / 1e12)}T`;
  if (abs >= 1e9) return `${sign}$${fmt3sf(abs / 1e9)}B`;
  if (abs >= 1e6) return `${sign}$${fmt3sf(abs / 1e6)}M`;
  if (abs >= 1e3) return `${sign}$${fmt3sf(abs / 1e3)}K`;
  return `${sign}$${fmt3sf(abs)}`;
}

export function fmtUsdSigned(n: number): string {
  if (n === 0 || !Number.isFinite(n)) return "$0";
  return (n > 0 ? "+" : "") + fmtUsd(n);
}

export function fmtTokens(n: number): string {
  if (!Number.isFinite(n) || n === 0) return "0";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${Math.round(abs).toLocaleString()}`;
}

export function fmtTokensSigned(n: number): string {
  if (n === 0 || !Number.isFinite(n)) return "0";
  return (n > 0 ? "+" : "") + fmtTokens(n);
}

export function fmtMultiple(n: number): string {
  if (!Number.isFinite(n)) return "∞×";
  return `${n.toFixed(1)}×`;
}

export function fmtPct(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(decimals)}%`;
}

export function bandColor(band: string): string {
  switch (band) {
    case "exceptional":
      return "text-emerald-400";
    case "strong":
      return "text-emerald-300";
    case "fair value":
      return "text-zinc-200";
    case "expensive":
      return "text-amber-400";
    case "speculative":
      return "text-rose-400";
    default:
      return "text-zinc-400";
  }
}

export function verificationColor(v: string): string {
  if (v === "onchain") return "text-emerald-400";
  if (v === "governance_stated") return "text-amber-400";
  return "text-zinc-500";
}

// Verification-flag pill spec (label + Tailwind classes). Shared by the HM
// and TP tables so data-quality reads identically everywhere.
export type VerifPill = { label: string; cls: string; dot: string };

export function verifPill(v: string): VerifPill {
  switch (v) {
    case "onchain":
      return { label: "on-chain", cls: "text-positive border-positive/40 bg-positive/10", dot: "bg-positive" };
    case "onchain_aggregate":
      return { label: "on-chain~", cls: "text-positive border-positive/40 bg-positive/10", dot: "bg-positive/70" };
    case "onchain_dormant":
      return { label: "dormant", cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
    case "proxy":
      return { label: "proxy", cls: "text-accent border-accent/40 bg-accent/10", dot: "bg-accent" };
    case "governance_stated":
      return { label: "stated", cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
    case "pending":
      return { label: "no adapter", cls: "text-accent border-accent/40 bg-accent/10", dot: "bg-accent/60" };
    default:
      return { label: v, cls: "text-fg-muted border-line bg-surface", dot: "bg-fg-faint" };
  }
}
