"use client";

import { useRef, useState } from "react";

// Small inline-icon that reveals an explanatory popover on hover/tap. Used to
// move methodology paragraphs off the canvas — the numbers stay visible, the
// "how it's computed" lives behind a deliberate gesture. The popover flips to
// right-aligned when the trigger sits close to the viewport's right edge so
// it never clips (e.g. rightmost table-header tips).
const POPOVER_W = 320; // matches w-80

export function InfoTip({
  children,
  label = "Methodology"
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function show() {
    const r = btnRef.current?.getBoundingClientRect();
    setAlignRight(r != null && r.left + POPOVER_W > window.innerWidth - 16);
    setOpen(true);
  }

  return (
    <span className="relative inline-block ml-1.5 align-middle">
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : show())}
        onMouseEnter={show}
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
          className={`absolute ${alignRight ? "right-0" : "left-0"} top-full mt-2 z-50 w-80 max-w-[80vw] rounded-md border border-line bg-canvas px-3.5 py-3 text-xs text-fg-muted leading-relaxed shadow-2xl normal-case tracking-normal text-left`}
        >
          {children}
        </span>
      )}
    </span>
  );
}
