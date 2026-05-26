/**
 * Lighter (LIT) protocol addresses. Two-chain:
 *   L1 = Ethereum mainnet
 *   L2 = zkLighter (chain id 300, API at mainnet.zklighter.elliot.ai)
 *
 * L1 addresses are confirmed via Etherscan + L2BEAT (2026-05-22).
 * L2 contracts are not standard EVM contracts — Lighter is app-specific
 * with state exposed via its REST API; there are no user-facing smart
 * contracts to query via eth_call.
 */

module.exports = {
  // ─── L1 mainnet ───
  L1: {
    LIT: '0x232ce3bd40fcd6f80f3d55a522d03f25df784ee2',
    ZKLIGHTER_ESCROW: '0x3B4D794a66304F130a4Db8F2551B0070dfCf5ca7',
    UPGRADE_GATEKEEPER: '0x94da8A995D0D82Ef0fE7E509C6D76c22603B6f67',
    GOVERNANCE: '0xa464DA0B43f80EE3FfC4795cbbFC78472b5c81A1',
    ZKLIGHTER_VERIFIER: '0xac3Ce44B6ff4E402858C99D5699ff63131572BaA',
    DESERT_VERIFIER: '0x2aDBd91742B64105a097bC37D20Ebbca9a496085',
    OPERATORS: [
      // EOAs that can commit, verify, execute batches.
      // L2BEAT lists a typo in the first; we keep both forms — verify on Etherscan.
      '0x191fFF0EC830F83916A427d169a234c33e48aA79',
      '0x750bdb90AC72A78308d21eAC78999bBAE31cd63d',
      '0xC0D2853e06F1E145177D5ef08Ab065a76e14354C'
    ]
  },

  // ─── L2 zkLighter ───
  L2: {
    API_BASE: 'https://mainnet.zklighter.elliot.ai',
    CHAIN_ID: 300,
    LIT_USDC_SPOT_MARKET_ID: 2049,
    LIT_PERP_MARKET_ID: 120
  },

  // Decimals (LIT ERC-20 has 18)
  DECIMALS: { LIT: 18 }
};
