"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { label: string; href: string; soon?: boolean };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    title: "Metrics",
    items: [
      { label: "True Pressure", href: "/true-pressure" },
      { label: "Holder Multiple", href: "/holder-multiple" },
      { label: "Chain GDP", href: "/chain-gdp" }
    ]
  },
  {
    title: "Explore",
    items: [
      { label: "Visual gallery", href: "/chains/charts" },
      { label: "Watchlist", href: "/watchlist", soon: true }
    ]
  }
];

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.soon ? "#" : item.href}
      aria-disabled={item.soon}
      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition ${
        active
          ? "bg-surface-elev text-fg"
          : item.soon
            ? "text-fg-faint cursor-not-allowed"
            : "text-fg-muted hover:bg-surface hover:text-fg"
      }`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-sm border ${
          active ? "border-fg bg-fg" : "border-line"
        } transition`}
        aria-hidden="true"
      />
      <span className="flex-1">{item.label}</span>
      {item.soon && (
        <span className="text-[9px] uppercase tracking-widest text-fg-faint border border-line rounded px-1 py-0.5">
          soon
        </span>
      )}
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="min-h-screen flex bg-canvas text-fg">
      {/* Left rail */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-line bg-canvas">
        <div className="px-5 py-5 border-b border-line">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="text-base font-semibold tracking-tight text-fg">
              metrics<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-fg-faint mt-1">
            by blocmates
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {NAV.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] uppercase tracking-widest text-fg-faint px-2.5 mb-2">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavRow item={item} active={isActive(item.href)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-3 border-b border-line bg-canvas sticky top-0 z-10">
          {/* Brand mark for mobile (left rail is hidden) */}
          <Link href="/" className="md:hidden text-sm font-semibold">
            metrics<span className="text-accent">.</span>
          </Link>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
