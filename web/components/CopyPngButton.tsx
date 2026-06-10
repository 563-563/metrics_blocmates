"use client";

import { useState, type RefObject } from "react";
import { useTheme } from "./ThemeProvider";
import { copyChartPng } from "@/lib/copy-chart-png";

// Shareable-chart affordance: rasterizes the first <svg> inside containerRef
// to a watermarked 2x PNG on the clipboard (download fallback). Render it in
// the chart's header row so the feature is discoverable — it used to live
// only on HmHistoryChart and nobody found it.
export function CopyPngButton({
  containerRef,
  title,
  subtitle,
  className = ""
}: {
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>;
  title: string;
  subtitle: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const [label, setLabel] = useState("Copy PNG");

  const handleCopy = async () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;
    setLabel("…");
    const result = await copyChartPng(svg as SVGSVGElement, title, subtitle, {
      width: (svg as SVGSVGElement).clientWidth || 800,
      height: (svg as SVGSVGElement).clientHeight || 288,
      background: theme === "light" ? "#FAF7F2" : "#1C1B18",
      titleColor: theme === "light" ? "#1A1A1A" : "#ECE6DD",
      subtitleColor: theme === "light" ? "#8A8F98" : "#9A958C",
      watermarkColor: theme === "light" ? "#9A958C" : "#7A736A",
      filenameSlug: title.replace(/\s+/g, "-").toLowerCase()
    });
    setLabel(result === "copied" ? "Copied!" : result === "saved" ? "Saved" : "Failed");
    setTimeout(() => setLabel("Copy PNG"), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy chart as PNG"
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-fg-muted hover:text-fg border border-line hover:border-accent rounded px-2 py-1 transition ${className}`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {label}
    </button>
  );
}
