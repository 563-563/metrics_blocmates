#!/usr/bin/env node
/**
 * One-shot backfill of HYPE Assistance Fund history from ASXN's API.
 *
 * ASXN's API (api-hyperliquid.asxn.xyz) sits behind Cloudflare Turnstile and
 * issues a 5-minute JWT after the browser solves the challenge. We don't
 * automate around Turnstile. Instead the user pastes a fresh JWT (captured
 * from their browser dev tools) and this script pulls every relevant endpoint
 * in one burst — well inside the 200 req/min limit.
 *
 * Output:
 *   data/external/asxn/<endpoint>.json   raw response per endpoint
 *
 * After this runs, scripts/external/asxn-merge.js folds the daily hl-buybacks
 * series into data/onchain/hype-af/buybacks.json (idempotent — newer ASXN data
 * wins; HL-Info-API data wins for dates ASXN doesn't cover).
 *
 * Run:
 *   ASXN_JWT="eyJhbG..." node scripts/external/asxn-backfill.js
 * Or:
 *   node scripts/external/asxn-backfill.js --jwt "eyJhbG..."
 *
 * Get a fresh JWT:
 *   1. Open https://hyperscreener.asxn.xyz/ in a browser.
 *   2. F12 → Network → Fetch/XHR.
 *   3. Reload.
 *   4. Click any /api/buyback/* request, copy the `authorization` header
 *      value (minus the "Bearer " prefix).
 *   5. Run this script within 5 minutes.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'data', 'external', 'asxn');

const ENDPOINTS = [
  'hl-buybacks',              // daily AF buyback time series (THE big one)
  'assistance-fund-holdings', // daily AF HYPE balance series
  'revenues',                 // daily protocol revenue
  'revenue-metrics',          // aggregate revenue metrics
  'af-buyback-metrics',       // aggregate buyback metrics (24h/7d/30d etc.)
  'hype-price'                // daily HYPE price — useful for per-day USD honesty
];

const BASE = 'https://api-hyperliquid.asxn.xyz/api/buyback';

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function getArg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0) return null;
  return process.argv[i + 1] || null;
}

function decodeJwtExp(jwt) {
  try {
    const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf8'));
    return payload.exp ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(endpoint, jwt) {
  const url = `${BASE}/${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'accept': '*/*',
      'authorization': `Bearer ${jwt}`,
      'origin': 'https://hyperscreener.asxn.xyz',
      'referer': 'https://hyperscreener.asxn.xyz/',
      'user-agent': 'fundamentals-dash/0.1 (one-shot backfill)'
    }
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { _raw: text }; }
  return { status: res.status, body, rateLimitRemaining: res.headers.get('x-ratelimit-remaining') };
}

async function main() {
  const jwt = process.env.ASXN_JWT || getArg('--jwt');
  if (!jwt) {
    console.error('[asxn] missing JWT. Pass via ASXN_JWT env var or --jwt argument.');
    console.error('       Get one from your browser:');
    console.error('         hyperscreener.asxn.xyz → F12 → Network → /api/buyback/* → authorization header');
    process.exit(1);
  }

  const exp = decodeJwtExp(jwt);
  if (exp) {
    const msLeft = exp.getTime() - Date.now();
    console.log(`[asxn] JWT expires at ${exp.toISOString()} (${Math.round(msLeft / 1000)}s from now)`);
    if (msLeft < 0) {
      console.error('[asxn] JWT has already expired. Grab a fresh one and retry.');
      process.exit(1);
    }
    if (msLeft < 30000) {
      console.warn('[asxn] JWT expires in less than 30s — proceeding but the run may fail mid-way');
    }
  }

  ensureDir(OUT_DIR);

  const results = {};
  for (const ep of ENDPOINTS) {
    process.stdout.write(`[asxn] GET /api/buyback/${ep} ... `);
    try {
      const r = await fetchOne(ep, jwt);
      if (r.status !== 200) {
        console.log(`FAILED (HTTP ${r.status})`);
        console.log(`       body: ${JSON.stringify(r.body).slice(0, 200)}`);
        results[ep] = { ok: false, status: r.status, body: r.body };
        continue;
      }
      const file = path.join(OUT_DIR, `${ep}.json`);
      fs.writeFileSync(file, JSON.stringify(r.body, null, 2));
      const arrLen = Array.isArray(r.body) ? r.body.length :
                     Array.isArray(r.body?.data) ? r.body.data.length : null;
      console.log(`OK (${arrLen != null ? arrLen + ' rows' : 'object'}; rate-limit remaining: ${r.rateLimitRemaining ?? '?'})`);
      results[ep] = { ok: true, file, rows: arrLen };
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results[ep] = { ok: false, error: err.message };
    }
    await sleep(300);  // courtesy gap
  }

  // Manifest of what we pulled
  const manifest = {
    fetched_at: new Date().toISOString(),
    jwt_exp: exp?.toISOString() ?? null,
    endpoints: results
  };
  fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('');
  console.log('[asxn] done. Wrote responses to data/external/asxn/');
  console.log('[asxn] next: node scripts/external/asxn-merge.js  (folds hl-buybacks into data/onchain/hype-af/buybacks.json)');
}

main().catch((err) => {
  console.error('[asxn] fatal:', err.message);
  process.exit(1);
});
