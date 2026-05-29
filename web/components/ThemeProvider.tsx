"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeCtx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: "dark",
  setTheme: () => {}
});

const STORAGE_KEY = "tp-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Read persisted choice on mount. We never SSR the value (no flash on
  // hydrate beyond the dark default in <html data-theme="dark">).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {
      /* localStorage blocked — accept the default */
    }
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute("data-theme", t);
  }

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
