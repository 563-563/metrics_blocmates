"use client";

import { useMemo, useState } from "react";
import type { TokenGrade } from "@/lib/tg-data";
import {
  CLAIM_LADDER,
  calculateSSPE,
  calculateTokenValue,
  assignTokenAlignmentGrade,
  assignKeGrade,
  gradeColorClass,
  sspeWarnings
} from "@/lib/token-grading";
import { fmtUsd } from "@/lib/format";
import { InfoTip } from "@/components/InfoTip";
import { TokenClaimLadder } from "./TokenClaimLadder";
import { KeBuildUpWaterfall } from "./KeBuildUpWaterfall";
import { CleanConversionBridge } from "./CleanConversionBridge";
import { RoeModule } from "./RoeModule";
import { GrowthSelector } from "./GrowthSelector";
import { SspeHeatmap } from "./SspeHeatmap";
import { TokenValueBridge } from "./TokenValueBridge";
import { ScenarioTable } from "./ScenarioTable";
import { EvidencePanel } from "./EvidencePanel";
import { WarningFlags } from "./WarningFlags";
import { SliderRow } from "./SliderRow";

// The interactive core of the token-grade page. Two modes, per the spec's
// conceptual separation (prevents double-counting):
//   Operating mode      — vary business assumptions; token design pinned.
//   Token-discount mode — vary token alignment + Ke; business pinned.

type Mode = "operating" | "token_discount";

export function TokenGradeExplorer({ grade }: { grade: TokenGrade }) {
  const seedBiz = grade.business;
  const seedTok = grade.token;
  const seedKe = grade.ke_build_up.ke;
  const seedRoe = grade.capital_efficiency.underwriting_roe;
  const seedG = grade.growth.terminal_g;

  const windows = useMemo(() => {
    const w: Array<{ key: string; value: number }> = [
      { key: seedBiz.revenue_run_rate_window, value: seedBiz.post_buyback_net_revenue }
    ];
    if (seedBiz.revenue_13w && seedBiz.revenue_run_rate_window !== "13w") {
      w.push({ key: "13w", value: seedBiz.revenue_13w });
    }
    return w;
  }, [seedBiz]);

  const [mode, setMode] = useState<Mode>("token_discount");

  // Operating-mode state (business levers).
  const [windowKey, setWindowKey] = useState(windows[0].key);
  const [durabilityAdj, setDurabilityAdj] = useState(seedBiz.durability_adjustment);
  const [cleanConversion, setCleanConversion] = useState(seedBiz.clean_conversion);
  const [roe, setRoe] = useState(seedRoe);
  const [g, setG] = useState(seedG);

  // Token-discount-mode state (token levers).
  const [rungKey, setRungKey] = useState(
    seedTok.claim_category_key ?? CLAIM_LADDER[0].key
  );
  const [alignment, setAlignment] = useState(seedTok.token_alignment_factor);
  const [ke, setKe] = useState(seedKe);

  const operating = mode === "operating";

  // Effective inputs: the inactive side is pinned to the graded seed.
  const eff = {
    runRate: operating
      ? (windows.find((w) => w.key === windowKey) ?? windows[0]).value
      : seedBiz.post_buyback_net_revenue,
    durabilityAdj: operating ? durabilityAdj : seedBiz.durability_adjustment,
    cleanConversion: operating ? cleanConversion : seedBiz.clean_conversion,
    roe: operating ? roe : seedRoe,
    g: operating ? g : seedG,
    alignment: operating ? seedTok.token_alignment_factor : alignment,
    ke: operating ? seedKe : ke
  };

  const trustedRevenue = eff.runRate * eff.durabilityAdj;
  const cleanEarnings = trustedRevenue * eff.cleanConversion;
  const sspe = calculateSSPE(eff.roe, eff.ke, eff.g);
  const tokenEarnings = cleanEarnings * eff.alignment;
  const impliedValue = calculateTokenValue(cleanEarnings, eff.alignment, sspe);
  const warnings = sspeWarnings(eff.roe, eff.ke, eff.g);

  const marketCap = grade.valuation.market_cap;
  const fdv = grade.valuation.fdv;

  // Ladder implied values at the current effective business inputs.
  const impliedByRung = useMemo(() => {
    const out: Record<string, number | null> = {};
    for (const rung of CLAIM_LADDER) {
      out[rung.key] = calculateTokenValue(
        cleanEarnings,
        rung.default_alignment,
        calculateSSPE(eff.roe, rung.default_ke, eff.g)
      );
    }
    return out;
  }, [cleanEarnings, eff.roe, eff.g]);

  function selectRung(key: string) {
    const rung = CLAIM_LADDER.find((r) => r.key === key);
    if (!rung) return;
    setRungKey(key);
    setAlignment(rung.default_alignment);
    setKe(rung.default_ke);
  }

  function resetAll() {
    setWindowKey(windows[0].key);
    setDurabilityAdj(seedBiz.durability_adjustment);
    setCleanConversion(seedBiz.clean_conversion);
    setRoe(seedRoe);
    setG(seedG);
    setRungKey(seedTok.claim_category_key ?? CLAIM_LADDER[0].key);
    setAlignment(seedTok.token_alignment_factor);
    setKe(seedKe);
  }

  const alignmentGrade = assignTokenAlignmentGrade(eff.alignment);
  const keGrade = assignKeGrade(eff.ke);

  return (
    <div>
      {/* Mode switch + live headline */}
      <div className="sticky top-0 z-30 -mx-1 px-1 py-3 bg-canvas/95 backdrop-blur border-b border-line mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex border border-line rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("token_discount")}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-widest transition ${
                !operating ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              token-discount mode
            </button>
            <button
              type="button"
              onClick={() => setMode("operating")}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-widest transition border-l border-line ${
                operating ? "bg-surface-elev text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              operating mode
            </button>
          </span>
          <span className="text-[11px] text-fg-muted">
            {operating
              ? "varying the business — token design pinned at its grade"
              : "varying the token claim — business pinned at base case"}
          </span>
          <span className="ml-auto flex items-baseline gap-4 font-mono tabular-nums">
            <span className="text-sm text-fg-muted">
              SS-PE <span className="text-fg">{sspe != null ? `${sspe.toFixed(2)}×` : "—"}</span>
            </span>
            <span className="text-sm text-fg-muted">
              implied{" "}
              <span className="text-fg text-base font-semibold">
                {impliedValue != null ? fmtUsd(impliedValue) : "unstable"}
              </span>
            </span>
            {marketCap != null && impliedValue != null && (
              <span
                className={`text-sm ${impliedValue >= marketCap ? "text-positive" : "text-negative"}`}
              >
                {(impliedValue / marketCap).toFixed(2)}× mcap
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="text-[10px] uppercase tracking-widest border border-line rounded px-2.5 py-1 text-fg-muted hover:text-fg hover:border-accent transition"
          >
            reset
          </button>
        </div>
      </div>

      {/* 1 — Business quality */}
      <Section
        title="1 · Business quality — trusted revenue → clean earnings"
        info={
          <>
            <span className="block mb-2">
              The run-rate selector picks which annualized window to trust; the durability
              slider haircuts it for retention/concentration risk; clean conversion is the
              share that survives the cost bridge (COGS, custody, payments, fulfillment,
              opex).
            </span>
            <span className="block">Locked while in token-discount mode.</span>
          </>
        }
      >
        <CleanConversionBridge
          windows={windows}
          selectedWindow={operating ? windowKey : windows[0].key}
          onWindowChange={setWindowKey}
          durabilityAdj={eff.durabilityAdj}
          onDurabilityChange={setDurabilityAdj}
          cleanConversion={eff.cleanConversion}
          onCleanConversionChange={setCleanConversion}
          runRate={eff.runRate}
          trustedRevenue={trustedRevenue}
          cleanEarnings={cleanEarnings}
          disabled={!operating}
        />
      </Section>

      {/* 2 — Capital efficiency */}
      <Section
        title="2 · Capital efficiency — ROE"
        info={
          <>
            <span className="block mb-2">
              Clean earnings against three denominators for honesty; SS-PE uses the chosen
              underwriting ROE (capped by business type so a hot quarter doesn&apos;t
              annualize into fantasy).
            </span>
            <span className="block">Locked while in token-discount mode.</span>
          </>
        }
      >
        <RoeModule
          cleanEarnings={cleanEarnings}
          activeCapital={grade.capital_efficiency.active_capital}
          operatingTreasury={grade.capital_efficiency.operating_treasury}
          totalAssetBase={grade.capital_efficiency.total_asset_base}
          underwritingRoe={eff.roe}
          onRoeChange={setRoe}
          disabled={!operating}
        />
      </Section>

      {/* 3 — Growth */}
      <Section
        title="3 · Growth — terminal g"
        info={
          <>
            <span className="block mb-2">
              SS-PE uses steady-state growth, not next year&apos;s. Near-term momentum only
              informs the score.
            </span>
            <span className="block">Locked while in token-discount mode.</span>
          </>
        }
      >
        <GrowthSelector
          terminalG={eff.g}
          onGChange={setG}
          nearTermScore={grade.growth.near_term_growth_score}
          durabilityScore={grade.growth.durability_score}
          disabled={!operating}
        />
      </Section>

      {/* 4 — Token grade / Ke */}
      <Section
        title="4 · Token grade — claim ladder & cost of equity"
        info={
          <>
            <span className="block mb-2">
              The ladder is the heart of the framework: what does the token actually OWN?
              Click a rung (token-discount mode) to load its default alignment and Ke; the
              sliders fine-tune within the rung.
            </span>
            <span className="block">
              The Ke waterfall below shows the graded build-up — each premium is a priced
              risk between the token and the business&apos;s cash flows.
            </span>
          </>
        }
      >
        <TokenClaimLadder
          selectedKey={operating ? (seedTok.claim_category_key ?? rungKey) : rungKey}
          currentKey={seedTok.claim_category_key ?? ""}
          impliedBykey={impliedByRung}
          onSelect={selectRung}
          disabled={operating}
        />
        <div className="mt-5 space-y-4">
          <SliderRow
            label="Token alignment"
            sub="% of clean earnings the token owns"
            value={eff.alignment}
            min={0}
            max={1}
            step={0.01}
            display={`${(eff.alignment * 100).toFixed(0)}%`}
            onChange={setAlignment}
            disabled={operating}
          />
          <SliderRow
            label="Ke — required return"
            sub="cost of equity for this claim quality"
            value={eff.ke}
            min={0.08}
            max={0.5}
            step={0.005}
            display={`${(eff.ke * 100).toFixed(1)}%`}
            onChange={setKe}
            disabled={operating}
          />
          <p className="text-xs">
            <span className="text-fg-muted">alignment grade: </span>
            <span className={`font-mono font-semibold ${gradeColorClass(alignmentGrade)}`}>
              {alignmentGrade}
            </span>
            <span className="text-fg-muted ml-4">Ke grade: </span>
            <span className={`font-mono font-semibold ${gradeColorClass(keGrade)}`}>{keGrade}</span>
          </p>
        </div>
        <div className="mt-6 pt-5 border-t border-line">
          <KeBuildUpWaterfall
            buildUp={grade.ke_build_up as unknown as Record<string, number>}
            ke={grade.ke_build_up.ke}
            keGrade={grade.ke_build_up.ke_grade}
          />
        </div>
      </Section>

      {/* 5 — SS-PE / valuation */}
      <Section
        title="5 · SS-PE & implied value"
        info={
          <>
            <span className="block mb-2">
              SS-PE = (1 − g/ROE) / (Ke − g) — the steady-state earnings multiple a claim
              of this quality deserves. The bridge multiplies it through the chain:
              trusted revenue → clean earnings → token earnings → implied value.
            </span>
            <span className="block">
              The scenario tables are the published reference points from the data
              pipeline — they don&apos;t move with the sliders.
            </span>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-2">
              SS-PE sensitivity (Ke × g at ROE {(eff.roe * 100).toFixed(0)}%)
            </p>
            <SspeHeatmap roe={eff.roe} ke={eff.ke} g={eff.g} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-fg-muted mb-2">
              Value bridge
            </p>
            <TokenValueBridge
              trustedRevenue={trustedRevenue}
              cleanEarnings={cleanEarnings}
              tokenEarnings={tokenEarnings}
              impliedValue={impliedValue}
              marketCap={marketCap}
              fdv={fdv}
            />
          </div>
        </div>
        {grade.scenarios && (
          <ScenarioTable
            operating={grade.scenarios.operating}
            tokenDiscount={grade.scenarios.token_discount}
          />
        )}
      </Section>

      {/* Evidence + flags */}
      <Section title="Warning flags">
        <WarningFlags flags={grade.flags} warnings={warnings} />
      </Section>
      <Section title="Evidence">
        <EvidencePanel evidence={grade.evidence} />
      </Section>
    </div>
  );
}

function Section({
  title,
  info,
  children
}: {
  title: string;
  info?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border border-line rounded-md p-6 bg-surface">
      <h2 className="text-xs uppercase tracking-widest text-fg-muted mb-5">
        {title}
        {info && <InfoTip>{info}</InfoTip>}
      </h2>
      {children}
    </section>
  );
}
