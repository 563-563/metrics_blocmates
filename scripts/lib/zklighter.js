/**
 * Tiny zkLighter REST client. Lighter L2 exposes a custom REST API at
 *   https://mainnet.zklighter.elliot.ai
 *
 * Some endpoints are unauthenticated (orderBooks, orderBookDetails); others
 * require an API key obtained via Lighter's Python SDK (notably /trades).
 * Auth, when present, lives in the `auth` query param or Authorization
 * header — controlled by LIGHTER_API_KEY env var.
 */

const BASE = 'https://mainnet.zklighter.elliot.ai';

function loadEnvOnce() {
  if (process.env.LIGHTER_API_KEY != null) return;
  const fs = require('fs');
  const path = require('path');
  const root = path.join(__dirname, '..', '..');
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvOnce();

async function get(endpoint, params = {}, { requireAuth = false } = {}) {
  const q = new URLSearchParams(params);
  const apiKey = process.env.LIGHTER_API_KEY;
  if (requireAuth) {
    if (!apiKey) {
      throw new Error(`zkLighter ${endpoint}: requires auth but LIGHTER_API_KEY is not set in .env`);
    }
    q.set('auth', apiKey);
  }
  const url = `${BASE}/api/v1/${endpoint}${q.toString() ? '?' + q.toString() : ''}`;
  const headers = { accept: 'application/json', 'user-agent': 'truepressure-hm/0.1' };
  if (requireAuth && apiKey) headers.authorization = `Bearer ${apiKey}`;
  const res = await fetch(url, { headers });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { _raw: text }; }
  if (!res.ok) {
    const err = new Error(`zkLighter ${endpoint}: HTTP ${res.status} — ${JSON.stringify(body).slice(0, 200)}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

module.exports = {
  BASE,
  get,
  // Convenience wrappers
  orderBooks: () => get('orderBooks'),
  orderBookDetails: (marketId) => get('orderBookDetails', { market_id: marketId }),
  // Authenticated:
  trades: (opts) => get('trades', opts, { requireAuth: true }),
  hasAuth: () => Boolean(process.env.LIGHTER_API_KEY)
};
