"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
    items: [{ label: "Watchlist", href: "/watchlist", soon: true }]
  }
];

// md: breakpoint = 768px. Below that the sidebar is an overlay; at/above it
// pushes content. Read via useSyncExternalStore so the server-rendered
// snapshot matches the client's first paint (no hydration mismatch).
const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeDesktop(callback: () => void): () => void {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function NavRow({
  item,
  active,
  onNavigate
}: {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}) {
  if (item.soon) {
    return (
      <div
        aria-disabled
        title="Coming soon"
        className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm text-fg-faint cursor-not-allowed"
      >
        <span
          className="w-3.5 h-3.5 rounded-sm border border-line"
          aria-hidden="true"
        />
        <span className="flex-1">{item.label}</span>
        <span className="text-[9px] uppercase tracking-widest text-fg-faint border border-line rounded px-1 py-0.5">
          soon
        </span>
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-sm transition ${
        active
          ? "bg-surface-elev text-fg"
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
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  // Open by default on desktop, closed on mobile. `override` lets the burger
  // button flip the state; falling back to `isDesktop` keeps the natural
  // breakpoint behavior whenever the user hasn't touched it.
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const open = override ?? isDesktop;

  // Reset override when the breakpoint changes so resizing the window doesn't
  // get stuck in a stale state (e.g. user opens sidebar on mobile, rotates to
  // landscape; we want desktop's default-open behavior back).
  useEffect(() => {
    setOverride(null);
  }, [isDesktop]);

  // Esc closes the mobile sidebar.
  useEffect(() => {
    if (!open || isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverride(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isDesktop]);

  // Close after navigating, but only on mobile (desktop sidebar stays open).
  const closeOnMobile = () => {
    if (!isDesktop) setOverride(false);
  };

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      {/* Top bar — always visible, holds the burger + brand + theme toggle */}
      <header className="h-14 shrink-0 border-b border-line bg-canvas flex items-center gap-3 px-3 md:px-4 sticky top-0 z-50">
        <button
          type="button"
          onClick={() => setOverride(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex flex-col justify-center gap-[3px] w-10 h-10 rounded-md hover:bg-surface transition shrink-0"
        >
          <span className="block h-[2px] w-4 mx-auto bg-fg-muted" />
          <span className="block h-[2px] w-4 mx-auto bg-fg-muted" />
          <span className="block h-[2px] w-4 mx-auto bg-fg-muted" />
        </button>

        <Link href="/" className="flex items-baseline gap-0.5 shrink-0">
          <span className="text-base font-semibold tracking-tight text-fg">
            metrics<span className="text-accent">.</span>
          </span>
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-fg-faint hidden md:inline">
          by blocmates
        </span>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {/* Backdrop — only rendered on mobile when the overlay is open. */}
        {open && !isDesktop && (
          <div
            onClick={() => setOverride(false)}
            className="fixed inset-0 top-14 z-30 bg-black/40 md:hidden"
            aria-hidden
          />
        )}

        {/* Sidebar — fixed overlay below md:, static pushing column at md:+ */}
        <aside
          className={`overflow-hidden border-r border-line bg-canvas shrink-0 transition-[width] duration-200 ease-out
            fixed top-14 bottom-0 left-0 z-40
            md:static md:top-auto md:bottom-auto md:z-auto
            ${open ? "w-60" : "w-0"}`}
          aria-hidden={!open}
        >
          <nav className="w-60 h-full flex flex-col px-3 py-4 space-y-6 overflow-y-auto">
            {NAV.map((section) => (
              <div key={section.title}>
                <p className="text-[10px] uppercase tracking-widest text-fg-faint px-2.5 mb-2">
                  {section.title}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <NavRow
                        item={item}
                        active={isActive(item.href)}
                        onNavigate={closeOnMobile}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
