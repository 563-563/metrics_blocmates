// Retail-readable walkthrough of the Trust Discount, as a graphic. Uses a
// worked example with round numbers (not a real token) so the mechanics
// read without any finance background. Pure markup — no client state.

const STEP_BARS = [
  { label: "The business earns", value: 100, width: 100, color: "#6B9A4F", note: "$100M revenue per year" },
  { label: "After real costs", value: 80, width: 80, color: "#84A76C", note: "$80M clean earnings — what's left after the bills (\"clean conversion\")" },
  { label: "The token's slice", value: 24, width: 24, color: "#CDA24A", note: "$24M — the token only has a claim on 30% of those earnings (\"alignment\")" },
  { label: "Worth as this token", value: 96, width: 36, color: "#818cf8", note: "$96M — that slice × a 4× multiple. Shaky claims get LOW multiples (see below)" }
];

const KE_STACK = [
  { label: "T-bill", pts: 3.7, color: "#94a3b8", scored: false },
  { label: "equity risk", pts: 5.5, color: "#a8a29e", scored: false },
  { label: "liquidity", pts: 2.8, color: "#38bdf8", scored: true },
  { label: "regulatory", pts: 4.8, color: "#f59e0b", scored: true },
  { label: "custody", pts: 1.0, color: "#fb923c", scored: true },
  { label: "governance", pts: 4.2, color: "#a855f7", scored: true },
  { label: "alignment", pts: 4.8, color: "#ef4444", scored: true },
  { label: "technical", pts: 0.9, color: "#71717a", scored: true }
];

export function TrustDiscountExplainer() {
  const keTotal = KE_STACK.reduce((s, k) => s + k.pts, 0);
  return (
    <div className="mt-4 pt-4 border-t border-line space-y-6">
      {/* Step 1 — the funnel from business to token value */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          1 · From business to token value — a worked example
        </p>
        <div className="space-y-1.5">
          {STEP_BARS.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-[11px] text-fg text-right">{s.label}</span>
              <div className="flex-1">
                <div className="h-4 rounded-sm" style={{ width: `${s.width}%`, background: s.color, opacity: 0.85 }} />
              </div>
              <span className="w-64 shrink-0 text-[10px] text-fg-muted leading-tight hidden md:block">{s.note}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-fg-muted mt-2 md:hidden leading-relaxed">
          $100M revenue → $80M after costs → the token only owns 30% of that ($24M) → × a 4×
          multiple = worth $96M as this token.
        </p>
      </div>

      {/* Step 2 — why shaky claims get low multiples (the Ke stack) */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          2 · Why shaky claims get low multiples — the risk stack
        </p>
        <div className="flex h-6 rounded-sm overflow-hidden mb-1.5">
          {KE_STACK.map((k) => (
            <div
              key={k.label}
              title={`${k.label}: ${k.pts}pts${k.scored ? " (scored 0–5)" : ""}`}
              style={{ width: `${(k.pts / keTotal) * 100}%`, background: k.color, opacity: 0.85 }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
          {KE_STACK.map((k) => (
            <span key={k.label} className="flex items-center gap-1 text-[10px] text-fg-muted">
              <span className="w-2 h-2 rounded-sm" style={{ background: k.color }} />
              {k.label} {k.pts}%
            </span>
          ))}
        </div>
        <p className="text-[10px] text-fg-muted leading-relaxed">
          Every token must &quot;pay&quot; a required return (Ke). It starts where any stock starts —
          T-bills + equity risk (~9%) — then each crypto-specific issue <strong className="text-fg">stacks
          on top</strong>. Each issue is scored 0–5 against a ceiling (e.g. regulatory can add up to
          8 points): score 0 = clean, score 5 = worst case, premium = ceiling × score ÷ 5. This
          example token ends at ~{keTotal.toFixed(0)}% — and the higher that number, the lower the
          earnings multiple it deserves. A real share of stock would stop near 9%; a perfect token
          stops near 14.5%.
        </p>
      </div>

      {/* Step 3 — the discount is the gap */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-fg-muted mb-2">
          3 · The Trust Discount — same business, two prices
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-[11px] text-fg text-right">As equity</span>
            <div className="flex-1">
              <div className="h-5 rounded-sm bg-positive/70" style={{ width: "100%" }} />
            </div>
            <span className="w-24 shrink-0 font-mono tabular-nums text-[11px] text-fg">$640M</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-[11px] text-fg text-right">As this token</span>
            <div className="flex-1 relative">
              <div className="h-5 rounded-sm bg-accent/80" style={{ width: "15%" }} />
              <span className="absolute top-1/2 -translate-y-1/2 text-[10px] text-negative font-medium" style={{ left: "17%" }}>
                ← the missing 85% is the Trust Discount
              </span>
            </div>
            <span className="w-24 shrink-0 font-mono tabular-nums text-[11px] text-fg">$96M</span>
          </div>
        </div>
        <p className="text-[10px] text-fg-muted mt-2 leading-relaxed">
          If this token were a real share — owning 100% of earnings at a stock-like required
          return — the same $80M of earnings would be worth $640M. As an actual token it&apos;s
          worth $96M. The 85% gap is not the business&apos;s fault: <strong className="text-fg">every
          point of it is a token-design choice</strong> (revenue not routed to holders, no binding
          rights, unlock overhangs) that governance could fix.
        </p>
      </div>
    </div>
  );
}
