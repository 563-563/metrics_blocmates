import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteShell } from "@/components/SiteShell";

// Matches blocmates/onchainmarkets — Geist Sans for body, Geist Mono for
// data values and "system labels" (uppercase tracking-widest captions).
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "truepressure",
  description:
    "Holder Multiple, Net Pressure, and Chain-GDP across protocols and chains."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-canvas text-fg">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
