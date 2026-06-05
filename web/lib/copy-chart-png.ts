/**
 * Rasterise a chart's <svg> element to a PNG with a title band + watermark,
 * then copy to clipboard (falling back to download if clipboard write is
 * unavailable / denied).
 *
 * Ported from grantblocmates/onchainmarkets (VenueShareChart.tsx). Inlines
 * computed styles so CSS-variable / Tailwind-class colours render correctly
 * when the SVG is taken out of the DOM context.
 *
 * Usage:
 *   const svg = ref.current;  // SVGSVGElement
 *   const result = await copyChartPng(svg, "HM over time", "HYPE · 90d", {
 *     width: 800, height: 320
 *   });
 *   // result: "copied" | "saved" | "failed"
 */

export type CopyChartResult = "copied" | "saved" | "failed";

export type CopyChartOptions = {
  width: number;
  height: number;
  /** Background fill (paper theme default). Match the chart's visual context. */
  background?: string;
  /** Title text colour. */
  titleColor?: string;
  /** Subtitle text colour. */
  subtitleColor?: string;
  /** Watermark text colour. */
  watermarkColor?: string;
  /** Watermark string (default: "metrics.blocmates"). */
  watermark?: string;
  /** Filename slug for the download fallback. */
  filenameSlug?: string;
};

export async function copyChartPng(
  svg: SVGSVGElement,
  title: string,
  subtitle: string,
  opts: CopyChartOptions
): Promise<CopyChartResult> {
  const {
    width,
    height,
    background = "#FAF7F2",
    titleColor = "#1A1A1A",
    subtitleColor = "#8A8F98",
    watermarkColor = "#9A958C",
    watermark = "metrics.blocmates",
    filenameSlug = title.replace(/\s+/g, "-").toLowerCase()
  } = opts;

  try {
    const TITLE_BAND = 46;
    const FOOTER = 26;

    // Clone the SVG and inline computed styles on every element. Without this,
    // any colour expressed via CSS variables or Tailwind classes resolves to
    // empty when the SVG is rendered off-DOM (the cascade is gone).
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const src = svg.querySelectorAll<SVGElement>("*");
    const dst = clone.querySelectorAll<SVGElement>("*");
    src.forEach((el, i) => {
      const cs = getComputedStyle(el);
      const d = dst[i];
      if (!d) return;
      d.style.fill = cs.fill;
      d.style.stroke = cs.stroke;
      d.style.strokeWidth = cs.strokeWidth;
      d.style.fontFamily = cs.fontFamily;
      d.style.fontSize = cs.fontSize;
      d.style.fontWeight = cs.fontWeight;
      d.style.opacity = cs.opacity;
    });
    clone.setAttribute("width", String(width));
    clone.setAttribute("height", String(height));

    const xml = new XMLSerializer().serializeToString(clone);
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg image load failed"));
      img.src = url;
    });

    // 2x scale for retina-crispness without exploding output size.
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = (height + TITLE_BAND + FOOTER) * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "failed";
    ctx.scale(scale, scale);

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height + TITLE_BAND + FOOTER);

    ctx.textAlign = "left";
    ctx.fillStyle = titleColor;
    ctx.font = "600 18px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(title, 20, 27);
    ctx.fillStyle = subtitleColor;
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(subtitle, 20, 43);

    ctx.drawImage(img, 0, TITLE_BAND, width, height);

    ctx.fillStyle = watermarkColor;
    ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(watermark, width - 18, height + TITLE_BAND + 17);

    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob((b) => res(b), "image/png")
    );
    if (!blob) return "failed";

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      return "copied";
    } catch {
      // Clipboard API not available (older browsers, insecure contexts,
      // user denied permission) — fall back to triggering a download.
      const dl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dl;
      a.download = `${filenameSlug}-metrics-blocmates.png`;
      a.click();
      URL.revokeObjectURL(dl);
      return "saved";
    }
  } catch {
    return "failed";
  }
}
