/**
 * Stage I Validator - Caesar Cipher
 * Answer: LIBERTAS (Freedom)
 * Pepper: ROMA
 * Hash precomputed: sha256("ROMA" + "libertas")
 */

// Precomputed hash
const h = "382663398dece5d2ab700025e3d5589b0d333000bc9c0c7aea143f1f143c3046";

export function v(input) {
  return input === h;
}

export const hint1 = "A whisper carries through the caravan—shift your view by Roman count.";
export const hint2 = "Caesar himself taught this cipher. The shift is modest, the message eternal.";

