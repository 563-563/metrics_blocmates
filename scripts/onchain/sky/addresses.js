/**
 * Sky protocol addresses on Ethereum mainnet.
 * Source: ChainLog (`0xdA0Ab1e...`) resolved 2026-05-26 via getAddress(bytes32).
 */

module.exports = {
  // Tokens
  SKY: '0x56072C95FAA701256059aa122697B133aDEd9279',
  USDS: '0xdC035D45d973E3EC169d2276DDab16f1e407384F',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',

  // Core accounting / governance
  CHAINLOG: '0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F',
  MCD_VAT: '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b',
  MCD_VOW: '0xa950524441892a31ebddf91d3ceefa04bf454466',

  // Smart Burn Engine + Splitter
  // MCD_FLAP is the surplus auction (the "Flapper" — now the SBE burn engine)
  // MCD_SPLIT is the Splitter that routes Vow surplus into SBE + LSE farm
  MCD_FLAP: '0x374d9c3d5134052bc558f432afa1df6575f07407',
  MCD_SPLIT: '0xbf7111f13386d23cb2fba5a538107a73f6872bcf',

  // LockStake (SKY staking) — V1; V2 may exist at a different address but
  // ChainLog key `LOCKSTAKE_ENGINE_V2` reverts as of 2026-05-26.
  LOCKSTAKE_ENGINE: '0xce01c90de7fd1bcfa39e237fe6d8d9f569e8a6a3',
  LOCKSTAKE_SKY: '0xf9a9cfd3229e985b91f99bc866d42938044ffa1c',

  // USDS rewards farm for lockstake-SKY positions (Category B distribution)
  REWARDS_LSSKY_USDS: '0x38e4254bd82ed5ee97cd1c4278faae748d998865',

  // Decimals (all 18 for ERC-20s here)
  DECIMALS: { SKY: 18, USDS: 18, DAI: 18 }
};
