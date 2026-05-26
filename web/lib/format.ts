export function fmtUsd(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "$0";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(2)}K`;
  return `${sign}$${abs.toFixed(2)}`;
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
