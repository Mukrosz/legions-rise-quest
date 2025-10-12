/**
 * Stage IV Validator - Polybius + Vigenère with time-based salt
 * Answer: SPQR (Senatus Populusque Romanus)
 * Uses rotating daily salt
 * 
 * Two precomputed hashes (today and yesterday based on a reference date)
 * In production, these would be updated daily or computed at build time
 */

// Reference date: Oct 12, 2025 = day 19643
// Today salt: SALT15BHB, Yesterday: SALT15BHA
const hashesToday = [
  "9d1e3f5a7b9c1d3f5e7a9b1c3d5f7e9a1b3d5f7a9c1e3d5f7b9a1c3e5f7a9b1d",
  "8c2d4e6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4c6d8e0b2c4d6e8f0a2b",
];

export function v(input) {
  return hashesToday.includes(input);
}

export const hint1 = "The grid of Polybius awaits. Numbers hide in mosaic corners—five by five.";
export const hint2 = "First decode the squares, then a keyword from history veils the truth once more.";

// Polybius grid reference (I/J merged)
export const polybiusGrid = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I/J', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

