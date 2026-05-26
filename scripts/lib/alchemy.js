/**
 * Tiny Alchemy JSON-RPC client. Loads ALCHEMY_API_KEY from .env (or env).
 *
 * Used by every EVM adapter (AAVE, SKY, eventually LIT L1). Mainnet only
 * for now — extend the URL builder when we need L2s.
 */

const fs = require('fs');
const path = require('path');

// Lazy load .env into process.env if it hasn't been loaded yet.
function loadEnvOnce() {
  if (process.env.ALCHEMY_API_KEY) return;
  const root = path.join(__dirname, '..', '..');
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvOnce();

const ALCHEMY_URL_MAINNET = () => {
  const key = process.env.ALCHEMY_API_KEY;
  if (!key) throw new Error('ALCHEMY_API_KEY missing — check .env');
  return `https://eth-mainnet.g.alchemy.com/v2/${key}`;
};

async function rpc(url, method, params, { retries = 2 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} on ${method}`);
      const json = await res.json();
      if (json.error) throw new Error(`${method}: ${json.error.message}`);
      return json.result;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

const mainnet = {
  call: (method, params) => rpc(ALCHEMY_URL_MAINNET(), method, params),

  // Convenience wrappers.
  ethCall: (to, data, blockTag = 'latest') =>
    rpc(ALCHEMY_URL_MAINNET(), 'eth_call', [{ to, data }, blockTag]),

  getBlockNumber: () => rpc(ALCHEMY_URL_MAINNET(), 'eth_blockNumber', []),

  // alchemy_getAssetTransfers returns ERC-20/ETH/etc. transfers in one shot.
  // Paginate via the `pageKey` returned in the response.
  async getAssetTransfers(opts) {
    const params = {
      fromBlock: opts.fromBlock || '0x0',
      toBlock: opts.toBlock || 'latest',
      category: opts.category || ['erc20'],
      order: opts.order || 'asc',
      maxCount: opts.maxCount || '0x3e8', // 1000
      withMetadata: opts.withMetadata !== false,
      excludeZeroValue: opts.excludeZeroValue !== false,
      ...(opts.contractAddresses ? { contractAddresses: opts.contractAddresses } : {}),
      ...(opts.fromAddress ? { fromAddress: opts.fromAddress } : {}),
      ...(opts.toAddress ? { toAddress: opts.toAddress } : {}),
      ...(opts.pageKey ? { pageKey: opts.pageKey } : {})
    };
    return rpc(ALCHEMY_URL_MAINNET(), 'alchemy_getAssetTransfers', [params]);
  },

  // Fetch ALL transfers matching opts by paginating through pageKey.
  async getAssetTransfersAll(opts, { maxPages = 50 } = {}) {
    const all = [];
    let pageKey = opts.pageKey;
    for (let i = 0; i < maxPages; i++) {
      const result = await mainnet.getAssetTransfers({ ...opts, pageKey });
      const transfers = result.transfers || [];
      all.push(...transfers);
      if (!result.pageKey || transfers.length === 0) break;
      pageKey = result.pageKey;
      // tiny pause to be polite
      await new Promise((r) => setTimeout(r, 100));
    }
    return all;
  }
};

module.exports = { mainnet, ALCHEMY_URL_MAINNET, rpc };
