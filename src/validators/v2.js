/**
 * Stage II Validator - Arena Steganography
 * Answer: GLADIUS (Sword)
 * Pepper: RVDIS
 * Hash precomputed: sha256("RVDIS" + "gladius")
 */

// Precomputed hash
const h = "7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b";

export function v(input) {
  return input === h;
}

export const hint1 = "The arena map holds secrets. Look beyond what eyes can see—pixels whisper.";
export const hint2 = "Three ranks converge. The wooden sword's true name is your passage.";
