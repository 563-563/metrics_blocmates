import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "truepressure-hm",
  description:
    "Holder Multiple and Net Pressure flowthrough for HYPE, AAVE, SKY, LIT"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-xs uppercase tracking-widest">
        <Link href="/" className="text-zinc-300 hover:text-zinc-100">
          truepressure-hm
        </Link>
        <div className="flex gap-4 text-zinc-500">
          <Link href="/hyperliquid" className="hover:text-zinc-200">HYPE</Link>
          <Link href="/aave" className="hover:text-zinc-200">AAVE</Link>
          <Link href="/sky" className="hover:text-zinc-200">SKY</Link>
          <Link href="/lighter" className="hover:text-zinc-200">LIT</Link>
        </div>
      </div>
    </nav>
  );
}
