#!/usr/bin/env node
/**
 * token-grade-check.js — evidence pipeline for the token-grading module.
 *
 * Ports the 02_fundamentals-dash background-search pattern: an AI agent (or
 * human) does the actual research; this script provides the structured
 * prompt, validates/merges the structured answer, and keeps an append-only
 * findings feed for material changes.
 *
 * Usage:
 *   node scripts/tg/token-grade-check.js prompt [SYMBOL]
 *       Emit the evidence-check prompt for SYMBOL (default: next in
 *       rotation). Includes the token's current grade JSON for context.
 *
 *   node scripts/tg/token-grade-check.js apply SYMBOL --file answer.json
 *       Validate + merge a strict-JSON evidence answer into
 *       data/tg/token-grades/SYMBOL.json. Material field changes are
 *       appended to data/tg/findings.jsonl. Run compute-tg afterwards.
 *
 *   node scripts/tg/token-grade-check.js triggers [SYMBOL]
 *       Quant triggers vs live market data (data/latest.json): mcap/FDV
 *       drift vs last computed snapshot, stale evidence, implied-value
 *       crossings. Breaches are appended to the findings feed.
 *
 *   node scripts/tg/token-grade-check.js advance
 *       Advance the rotation cursor after a prompt's research completes.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const GRADES_DIR = path.join(ROOT, 'data', 'tg', 'token-grades');
const FEED_PATH = path.join(ROOT, 'data', 'tg', 'findings.jsonl');
const CURSOR_PATH = path.join(ROOT, 'data', 'tg', 'qual-cursor.json');
const LATEST_MARKET_PATH = path.join(ROOT, 'data', 'latest.json');

// Fields an evidence answer may update, with shallow validation.
const UPDATABLE = {
  'business.post_buyback_net_revenue': 'number',
  'business.durability_adjustment': 'number',
  'business.clean_conversion': 'number',
  'business.durability_score': 'number',
  'business.business_confidence': 'string',
  'capital_efficiency.active_capital': 'number',
  'capital_efficiency.operating_treasury': 'number',
  'capital_efficiency.total_asset_base': 'number',
  'capital_efficiency.underwriting_roe': 'number',
  'capital_efficiency.roe_confidence': 'string',
  'growth.near_term_growth_score': 'number',
  'growth.durability_score': 'number',
  'growth.terminal_g': 'number',
  'growth.growth_confidence': 'string',
  'token.claim_category': 'string',
  'token.claim_category_key': 'string',
  'token.token_alignment_factor': 'number',
  'token.value_capture_score': 'number',
  'token.token_holder_rights_score': 'number',
  'token.entity_alignment_score': 'number',
  'token.transparency_score': 'number',
  'token.token_confidence': 'string',
  'ke_build_up.crypto_liquidity_premium': 'number',
  'ke_build_up.regulatory_premium': 'number',
  'ke_build_up.custody_operational_premium': 'number',
  'ke_build_up.governance_supply_premium': 'number',
  'ke_build_up.economic_alignment_premium': 'number',
  'ke_build_up.technical_reconciliation_premium': 'number'
};

function tokenPath(symbol) {
  return path.join(GRADES_DIR, `${symbol.toUpperCase()}.json`);
}

function loadToken(symbol) {
  const p = tokenPath(symbol);
  if (!fs.existsSync(p)) {
    console.error(`No token grade file: ${p}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function listSymbols() {
  return fs
    .readdirSync(GRADES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'latest.json')
    .map((f) => f.replace('.json', ''));
}

function getByPath(obj, dotted) {
  return dotted.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setByPath(obj, dotted, value) {
  const keys = dotted.split('.');
  let o = obj;
  for (const k of keys.slice(0, -1)) {
    if (o[k] == null) o[k] = {};
    o = o[k];
  }
  o[keys[keys.length - 1]] = value;
}

function appendFinding(entry) {
  fs.mkdirSync(path.dirname(FEED_PATH), { recursive: true });
  fs.appendFileSync(FEED_PATH, JSON.stringify(entry) + '\n');
}

// ── prompt ───────────────────────────────────────────────────────────────
function cmdPrompt(symbolArg) {
  let symbol = symbolArg;
  if (!symbol) {
    const symbols = listSymbols();
    let cursor = { index: 0 };
    try {
      cursor = JSON.parse(fs.readFileSync(CURSOR_PATH, 'utf8'));
    } catch {
      /* first run */
    }
    symbol = symbols[cursor.index % symbols.length];
  }
  const token = loadToken(symbol);

  const updatable = Object.keys(UPDATABLE)
    .map((k) => `  - ${k} (${UPDATABLE[k]})`)
    .join('\n');

  console.log(`You are running a token-grade evidence check for ${token.project} / ${token.symbol}.

Search for evidence on:
1. Token value capture: buyback, burn, fee-share, staking, treasury claim.
2. Token holder rights: governance, IP, treasury, legal/economic rights.
3. Entity alignment: Labs/Foundation/OpCo leakage or separate equity.
4. Transparency: dashboards, financial reports, on-chain verification.
5. Supply/governance: unlocks, foundation/team wallets, market-maker policy.
6. Regulatory/custody risks: securities, gambling, RWA, off-chain custody.
7. Cost structure: COGS, custody, payment, fulfillment, opex.
8. Growth/durability: retention, category trend, user concentration.

Positive triggers: live revenue share starts; buybacks/burns executing
on-chain; treasury/IP/equity rights transferred to token holders;
transparency dashboard launches; lockup policy improves; binding governance;
custody/insurance/redemption terms improve.

Negative triggers: announced utility delayed/canceled; buybacks stop;
unlocks increase float risk; regulatory action; custody/redemption issue;
revenue falls while category grows; clean conversion worse than assumed.

CURRENT GRADE STATE:
${JSON.stringify(
    {
      business: token.business,
      capital_efficiency: token.capital_efficiency,
      growth: token.growth,
      token: token.token,
      ke_build_up: token.ke_build_up,
      flags: token.flags
    },
    null,
    2
  )}

Return STRICT JSON only, in this shape:
{
  "symbol": "${token.symbol}",
  "updates": { "<dotted.field>": <value>, ... },   // only changed fields, from:
${updatable}
  "flags_add": ["..."], "flags_remove": ["..."],
  "evidence": [
    { "field": "<dotted.field>", "claim": "...", "source_url": "https://...",
      "confidence": "high|medium|low", "direction": "positive|negative|neutral" }
  ]
}

Then apply it with:
  node scripts/tg/token-grade-check.js apply ${token.symbol} --file answer.json
  node scripts/tg/compute-tg.js`);
}

function cmdAdvance() {
  const symbols = listSymbols();
  let cursor = { index: 0 };
  try {
    cursor = JSON.parse(fs.readFileSync(CURSOR_PATH, 'utf8'));
  } catch {
    /* first run */
  }
  cursor.index = (cursor.index + 1) % Math.max(symbols.length, 1);
  cursor.advanced_at = new Date().toISOString();
  fs.writeFileSync(CURSOR_PATH, JSON.stringify(cursor, null, 2));
  console.log(`Cursor → ${symbols[cursor.index]} (index ${cursor.index})`);
}

// ── apply ────────────────────────────────────────────────────────────────
function cmdApply(symbol, fileArg) {
  if (!symbol || !fileArg) {
    console.error('Usage: token-grade-check.js apply SYMBOL --file answer.json');
    process.exit(1);
  }
  const answer = JSON.parse(fs.readFileSync(fileArg, 'utf8'));
  if (answer.symbol && answer.symbol.toUpperCase() !== symbol.toUpperCase()) {
    console.error(`Symbol mismatch: file says ${answer.symbol}, target is ${symbol}`);
    process.exit(1);
  }
  const token = loadToken(symbol);
  const now = new Date().toISOString();
  const changes = [];

  for (const [field, value] of Object.entries(answer.updates || {})) {
    const expected = UPDATABLE[field];
    if (!expected) {
      console.warn(`  skip ${field}: not an updatable field`);
      continue;
    }
    if (typeof value !== expected) {
      console.warn(`  skip ${field}: expected ${expected}, got ${typeof value}`);
      continue;
    }
    const before = getByPath(token, field);
    if (before === value) continue;
    setByPath(token, field, value);
    changes.push({ field, before, after: value });
  }

  for (const f of answer.flags_add || []) {
    if (!token.flags.includes(f)) {
      token.flags.push(f);
      changes.push({ field: 'flags', before: null, after: `+${f}` });
    }
  }
  for (const f of answer.flags_remove || []) {
    const i = token.flags.indexOf(f);
    if (i >= 0) {
      token.flags.splice(i, 1);
      changes.push({ field: 'flags', before: `-${f}`, after: null });
    }
  }

  for (const ev of answer.evidence || []) {
    token.evidence = token.evidence || [];
    token.evidence.push({ ...ev, updated_at: now });
  }

  token.updated_at = now;
  fs.writeFileSync(tokenPath(symbol), JSON.stringify(token, null, 2));

  for (const c of changes) {
    appendFinding({
      ts: now,
      project: token.symbol,
      type: 'qual',
      category: 'grade_input_change',
      field: c.field,
      before: c.before,
      after: c.after,
      source: fileArg,
      id: `${token.symbol}-${now.slice(0, 10)}-${c.field}`
    });
  }

  console.log(
    `Applied ${changes.length} change(s), ${answer.evidence?.length ?? 0} evidence item(s) to ${symbol}.`
  );
  if (changes.length > 0) {
    console.log('Run: node scripts/tg/compute-tg.js  (to re-derive valuation)');
  }
}

// ── triggers ─────────────────────────────────────────────────────────────
const MCAP_DRIFT_THRESHOLD = 0.25; // |Δ| vs last computed snapshot
const EVIDENCE_STALE_DAYS = 45;

function cmdTriggers(symbolArg) {
  let live = new Map();
  try {
    const latest = JSON.parse(fs.readFileSync(LATEST_MARKET_PATH, 'utf8'));
    for (const t of latest.tokens || []) {
      if (t.coingecko_id) live.set(t.coingecko_id, t);
    }
  } catch {
    console.warn('No data/latest.json — market triggers skipped');
  }

  const symbols = symbolArg ? [symbolArg.toUpperCase()] : listSymbols();
  const now = new Date().toISOString();
  let fired = 0;

  for (const symbol of symbols) {
    const token = loadToken(symbol);
    const v = token.valuation || {};
    const m = token.coingecko_id ? live.get(token.coingecko_id) : null;
    const findings = [];

    if (m && v.market_cap) {
      const drift = m.market_cap / v.market_cap - 1;
      if (Math.abs(drift) >= MCAP_DRIFT_THRESHOLD) {
        findings.push({
          category: 'mcap_drift',
          finding: `Market cap moved ${(drift * 100).toFixed(0)}% since last compute ($${(v.market_cap / 1e6).toFixed(1)}M → $${(m.market_cap / 1e6).toFixed(1)}M)`,
          direction: drift > 0 ? 'positive' : 'negative'
        });
      }
    }
    if (m && v.implied_token_value && m.market_cap) {
      const ratio = v.implied_token_value / m.market_cap;
      const prior = v.implied_value_vs_market_cap;
      if (prior != null && ((prior < 1 && ratio >= 1) || (prior >= 1 && ratio < 1))) {
        findings.push({
          category: 'implied_value_crossing',
          finding: `Implied value crossed market cap (${prior.toFixed(2)}x → ${ratio.toFixed(2)}x)`,
          direction: ratio >= 1 ? 'positive' : 'negative'
        });
      }
    }
    const newest = (token.evidence || [])
      .map((e) => e.updated_at)
      .sort()
      .pop();
    if (newest) {
      const ageDays = (Date.now() - new Date(newest).getTime()) / 8.64e7;
      if (ageDays > EVIDENCE_STALE_DAYS) {
        findings.push({
          category: 'evidence_stale',
          finding: `Newest evidence is ${Math.round(ageDays)}d old (max ${EVIDENCE_STALE_DAYS}d) — run an evidence check`,
          direction: 'neutral'
        });
      }
    }

    for (const f of findings) {
      appendFinding({
        ts: now,
        project: symbol,
        type: 'quant',
        severity: 'Review',
        ...f,
        id: `${symbol}-${now.slice(0, 10)}-${f.category}`
      });
      console.log(`${symbol} · ${f.category}: ${f.finding}`);
      fired++;
    }
  }
  console.log(fired === 0 ? 'No triggers fired.' : `\n${fired} finding(s) appended to data/tg/findings.jsonl`);
}

// ── main ─────────────────────────────────────────────────────────────────
const [cmd, ...rest] = process.argv.slice(2);
const fileIdx = rest.indexOf('--file');
const fileArg = fileIdx >= 0 ? rest[fileIdx + 1] : null;
const positional = rest.filter((a, i) => !a.startsWith('--') && i !== fileIdx + 1);

switch (cmd) {
  case 'prompt':
    cmdPrompt(positional[0]);
    break;
  case 'apply':
    cmdApply(positional[0], fileArg);
    break;
  case 'triggers':
    cmdTriggers(positional[0]);
    break;
  case 'advance':
    cmdAdvance();
    break;
  default:
    console.log('Usage: token-grade-check.js <prompt [SYMBOL] | apply SYMBOL --file f.json | triggers [SYMBOL] | advance>');
    process.exit(cmd ? 1 : 0);
}
