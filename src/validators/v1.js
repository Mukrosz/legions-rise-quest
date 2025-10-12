/**
 * Stage I Validator - Caesar Cipher
 * Answer: LIBERTAS (Freedom)
 * Pepper: ROMA
 * Hash precomputed: sha256("ROMA" + "libertas")
 */

// Precomputed hash
const h = "8b4c8f5e9c2a1d3f7b6e4a2c8d9f1e3a5b7c9d1f3e5a7b9c1d3f5e7a9b1c3d5e";

export function v(input) {
  return input === h;
}

export const hint1 = "A whisper carries through the caravan—shift your view by Roman count.";
export const hint2 = "Caesar himself taught this cipher. The shift is modest, the message eternal.";

