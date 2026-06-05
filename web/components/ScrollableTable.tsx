"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a horizontally-scrolling table with right- and left-edge fade gradients
 * that signal "swipe to see more". Hides each fade automatically when the
 * scroll position reaches that edge.
 *
 * Usage:
 *   <ScrollableTable>
 *     <table className="min-w-[760px] ...">...</table>
 *   </ScrollableTable>
 *
 * Mobile users especially miss the existing overflow-x-auto behavior because
 * there's no visual signal that the table extends beyond the viewport.
 */
export function ScrollableTable({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atLeft, setAtLeft] = useState(true);
  const [atRight, setAtRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtLeft(el.scrollLeft <= 1);
      setAtRight(el.scrollLeft >= max - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    // ResizeObserver catches viewport rotation / content-width change.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative -mx-2">
      <div ref={ref} className="overflow-x-auto px-2 pb-2 scroll-smooth">
        {children}
      </div>
      {/* Left-edge fade — visible when scrolled away from the start */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 bottom-2 w-6 transition-opacity duration-150 ${
          atLeft ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to right, rgb(var(--canvas)) 0%, rgba(var(--canvas), 0) 100%)"
        }}
      />
      {/* Right-edge fade — visible while there's more table to scroll into */}
      <div
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 bottom-2 w-6 transition-opacity duration-150 ${
          atRight ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to left, rgb(var(--canvas)) 0%, rgba(var(--canvas), 0) 100%)"
        }}
      />
    </div>
  );
}
