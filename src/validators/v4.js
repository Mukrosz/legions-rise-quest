// Time-based validation with rotating keys
const _0x4h8k = [
  "9d1e3f5a7b9c1d3f5e7a9b1c3d5f7e9a1b3d5f7a9c1e3d5f7b9a1c3e5f7a9b1d",
  "8c2d4e6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4c6d8e0b2c4d6e8f0a2b",
  "7b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c",
];
const _0x6j2m = [
  "5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b",
  "4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4c6d8e0b2c4d6e8f0a2b4c6d8e0f2a4c6",
];

export function v(_0xp9) {
  const _0xq1 = [..._0x4h8k, ..._0x6j2m];
  for (let _0xr2 = 0; _0xr2 < 2; _0xr2++) {
    if (_0xq1[_0xr2] === _0xp9) return true;
  }
  return false;
}

export const hint1 = "The grid of Polybius awaits. Numbers hide in mosaic corners—five by five.";
export const hint2 = "First decode the squares, then a keyword from history veils the truth once more.";

export const polybiusGrid = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I/J', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

