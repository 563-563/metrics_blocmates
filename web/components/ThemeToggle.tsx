"use client";

import { useTheme } from "./ThemeProvider";

// GM / GN — "good morning" (light) / "good night" (dark). Reference dashboard
// uses these as the theme buttons; we adopt the same convention.
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="inline-flex items-center gap-0">
      <button
        type="button"
        onClick={() => setTheme("light")}
        title="Light theme"
        aria-pressed={theme === "light"}
        className={`w-8 h-8 rounded-full border text-[10px] tracking-widest font-medium transition ${
          theme === "light"
            ? "bg-fg text-canvas border-fg"
            : "bg-transparent text-fg-faint border-line hover:text-fg hover:border-fg-muted"
        }`}
      >
        GM
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        title="Dark theme"
        aria-pressed={theme === "dark"}
        className={`w-8 h-8 -ml-1 rounded-full border text-[10px] tracking-widest font-medium transition ${
          theme === "dark"
            ? "bg-fg text-canvas border-fg"
            : "bg-transparent text-fg-faint border-line hover:text-fg hover:border-fg-muted"
        }`}
      >
        GN
      </button>
    </div>
  );
}
