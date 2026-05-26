/**
 * Hyperliquid tokenomics constants.
 * Source: official Hyperliquid documentation + Hyper Foundation announcements.
 * Ported from truepressure-extracted/.../workers/lib/hl-tokenomics.ts.
 *
 * Total supply: 1,000,000,000 HYPE
 */

const HYPE_TOTAL_SUPPLY = 1_000_000_000;
const HYPE_TGE_DATE = new Date('2024-11-29T00:00:00Z');

const HYPE_ALLOCATIONS = {
  genesis_distribution: {
    pct: 0.31,
    tokens: 310_000_000,
    recipient_type: 'airdrop',
    label: 'Genesis Distribution',
    description: 'Airdrop to early users, all unlocked at TGE.'
  },
  core_contributors: {
    pct: 0.238,
    tokens: 238_000_000,
    recipient_type: 'team',
    label: 'Core Contributors',
    description: 'Team vesting. Monthly unlocks from 2026-01-06.',
    vest_start: new Date('2026-01-06T00:00:00Z'),
    vest_end: new Date('2027-12-06T00:00:00Z'),
    vest_months: 24
  },
  future_emissions: {
    pct: 0.389,
    tokens: 388_880_000,
    recipient_type: 'foundation',
    label: 'Future Emissions and Community Rewards',
    description: 'Community rewards emitted gradually post-TGE.',
    vest_start: HYPE_TGE_DATE,
    vest_end: new Date('2029-11-29T00:00:00Z'),
    vest_months: 60
  },
  hyper_foundation: {
    pct: 0.06,
    tokens: 60_000_000,
    recipient_type: 'foundation',
    label: 'Hyper Foundation Budget',
    description: 'Foundation operating budget, released over 5 years.',
    vest_start: HYPE_TGE_DATE,
    vest_end: new Date('2029-11-29T00:00:00Z'),
    vest_months: 60
  },
  community_grants: {
    pct: 0.003,
    tokens: 3_000_000,
    recipient_type: 'foundation',
    label: 'Community Grants',
    description: 'Discretionary grants, modest monthly drip.',
    vest_start: HYPE_TGE_DATE,
    vest_end: new Date('2029-11-29T00:00:00Z'),
    vest_months: 60
  },
  hip2_hyperliquidity: {
    pct: 0.00012,
    tokens: 120_000,
    recipient_type: 'foundation',
    label: 'HIP-2: Hyperliquidity',
    description: 'Hyperliquidity bootstrap allocation, all at TGE.'
  }
};

/**
 * Generate the projected unlock schedule.
 * Returns array of { bucket, unlock_date (ISO yyyy-mm-dd), amount_tokens, is_projected }.
 */
function generateUnlockSchedule(asOf = new Date()) {
  const rows = [];
  const today = new Date(Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), asOf.getUTCDate()));

  // Buckets unlocked entirely at TGE.
  for (const b of ['genesis_distribution', 'hip2_hyperliquidity']) {
    const a = HYPE_ALLOCATIONS[b];
    rows.push({
      bucket: b,
      unlock_date: HYPE_TGE_DATE.toISOString().slice(0, 10),
      amount_tokens: a.tokens,
      is_projected: HYPE_TGE_DATE > today
    });
  }

  // Vested buckets — monthly tranches.
  for (const b of ['core_contributors', 'future_emissions', 'hyper_foundation', 'community_grants']) {
    const a = HYPE_ALLOCATIONS[b];
    if (!a.vest_start) continue;
    const months = a.vest_months;
    const perMonth = a.tokens / months;
    for (let m = 0; m < months; m++) {
      const d = new Date(a.vest_start);
      d.setUTCMonth(d.getUTCMonth() + m);
      rows.push({
        bucket: b,
        unlock_date: d.toISOString().slice(0, 10),
        amount_tokens: perMonth,
        is_projected: d > today
      });
    }
  }

  return rows;
}

module.exports = {
  HYPE_TOTAL_SUPPLY,
  HYPE_TGE_DATE,
  HYPE_ALLOCATIONS,
  // Generic alias so the TP compute layer can read recipient_type per bucket
  // without knowing this is the HYPE module.
  ALLOCATIONS: HYPE_ALLOCATIONS,
  generateUnlockSchedule
};
