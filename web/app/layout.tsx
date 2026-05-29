import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteShell } from "@/components/SiteShell";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});
const mono = JetBrains_Mono({
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
