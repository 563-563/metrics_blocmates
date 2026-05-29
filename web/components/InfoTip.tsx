"use client";

import { useState } from "react";

// Small inline-icon that reveals an explanatory popover on hover/tap. Used to
// move methodology paragraphs off the canvas — the numbers stay visible, the
// "how it's computed" lives behind a deliberate gesture.
export function InfoTip({
  children,
  label = "Methodology"
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onBlur={() => setOpen(false)}
        className="w-4 h-4 inline-flex items-center justify-center rounded-full border border-line text-fg-muted hover:text-fg hover:border-fg-muted text-[10px] leading-none transition cursor-help"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute left-0 top-full mt-2 z-50 w-80 max-w-[80vw] rounded-md border border-line bg-canvas px-3.5 py-3 text-xs text-fg-muted leading-relaxed shadow-2xl normal-case tracking-normal"
        >
          {children}
        </span>
      )}
    </span>
  );
}
