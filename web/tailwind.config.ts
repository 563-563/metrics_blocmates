import type { Config } from "tailwindcss";

// Semantic color tokens bound to CSS variables. Both themes share these
// names; globals.css swaps the underlying RGB triplets via [data-theme].
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-elev": "rgb(var(--surface-elev) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        "fg-faint": "rgb(var(--fg-faint) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-faint": "rgb(var(--line-faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        positive: "rgb(var(--positive) / <alpha-value>)",
        negative: "rgb(var(--negative) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
