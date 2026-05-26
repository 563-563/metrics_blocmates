/**
 * Tiny client for the Hyperliquid public Info API.
 * Free, no auth.
 * Docs: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint
 */

const INFO_URL = 'https://api.hyperliquid.xyz/info';

async function info(body) {
  const res = await fetch(INFO_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HL info ${body.type}: ${res.status} ${txt}`);
  }
  return res.json();
}

async function perpMetaAndCtxs() {
  return info({ type: 'metaAndAssetCtxs' });
}

async function getHypePerpQuote() {
  const [meta, ctxs] = await perpMetaAndCtxs();
  const idx = meta.universe.findIndex((u) => u.name === 'HYPE');
  if (idx < 0) throw new Error('HYPE perp not found');
  const ctx = ctxs[idx];
  return {
    markPriceUsd: parseFloat(ctx.markPx),
    midPriceUsd: parseFloat(ctx.midPx),
    oraclePriceUsd: parseFloat(ctx.oraclePx),
    prevDayPriceUsd: parseFloat(ctx.prevDayPx),
    dayNotionalVolumeUsd: parseFloat(ctx.dayNtlVlm),
    openInterestHype: parseFloat(ctx.openInterest),
    fundingRate: parseFloat(ctx.funding)
  };
}

async function userFills(user, aggregateByTime = false) {
  return info({ type: 'userFills', user, aggregateByTime });
}

async function userFillsByTime(user, startTimeMs, endTimeMs) {
  return info({
    type: 'userFillsByTime',
    user,
    startTime: startTimeMs,
    ...(endTimeMs != null ? { endTime: endTimeMs } : {})
  });
}

module.exports = {
  info,
  perpMetaAndCtxs,
  getHypePerpQuote,
  userFills,
  userFillsByTime
};
