/**
 * Matched-window capture resolver for the TG alignment factor.
 *
 * Alignment = capture ÷ clean earnings only means something when both sides
 * cover the SAME period. HM's headline capture deliberately uses a 60d SMA
 * (reactivity is right for HM); dividing that by trailing-1y revenue
 * understates alignment whenever activity is cooling (HYPE read 46% when
 * its trailing-year reality was ~88%) and overstates it when ramping
 * (UNI/ZRO hit the 100% cap).
 *
 * Resolution order, best evidence first:
 *   1. On-chain feed(s) from the HM seed (buyback + Cat B holder yield):
 *      sum the trailing `windowDays`; young feeds annualize pro-rata.
 *   2. DL holdersRevenue over the matching window (every token in
 *      data/latest.json carries holders_revenue_1y / _30d).
 *   3. HM real_capture_usd (60d SMA × 365) — legacy fallback, mismatched,
 *      but better than nothing.
 */

const fs = require('fs');
const path = require('path');

function sumFeedTrailing(feedPath, windowDays, root) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, feedPath), 'utf8'));
    const rows = Array.isArray(raw) ? raw : raw.daily || [];
    if (rows.length === 0) return null;
    const last = rows[rows.length - 1].date;
    const cutoff = new Date(new Date(last + 'T00:00:00Z').getTime() - windowDays * 8.64e7)
      .toISOString()
      .slice(0, 10);
    const window = rows.filter((r) => r.date > cutoff);
    if (window.length === 0) return null;
    const sum = window.reduce((s, r) => s + (Number(r.amount_usd) || 0), 0);
    // Young feed: annualize what we can see rather than undercount.
    const daysCovered = Math.min(window.length, windowDays);
    return (sum * windowDays) / daysCovered;
  } catch {
    return null;
  }
}

/**
 * @param {object} hmP   HM snapshot protocol row (feed paths + fallback capture)
 * @param {object} live  data/latest.json token row (DL holders revenue)
 * @param {number} windowDays  revenue window to match (365 for the '1y' basis)
 * @param {string} root  repo root
 * @returns {{ capture_usd: number, source: string } | null}
 */
function matchedAnnualCapture(hmP, live, windowDays, root) {
  let onchain = 0;
  let hasOnchain = false;
  for (const src of [hmP?.annual_buyback_source, hmP?.annual_holder_yield_source]) {
    if (src?.feed_path) {
      const v = sumFeedTrailing(src.feed_path, windowDays, root);
      if (v != null) {
        onchain += v;
        hasOnchain = true;
      }
    }
  }
  if (hasOnchain) {
    return { capture_usd: onchain, source: `onchain_feed_${windowDays}d` };
  }
  if (live) {
    const dl =
      windowDays >= 180
        ? live.holders_revenue_1y
        : live.holders_revenue_30d != null
          ? (live.holders_revenue_30d * windowDays) / 30
          : null;
    if (dl != null && dl > 0) {
      return { capture_usd: dl, source: `dl_holders_revenue_${windowDays >= 180 ? '1y' : '30d'}` };
    }
  }
  if (hmP?.real_capture_usd != null) {
    return { capture_usd: hmP.real_capture_usd, source: 'hm_60d_sma_mismatched' };
  }
  return null;
}

module.exports = { matchedAnnualCapture, sumFeedTrailing };
