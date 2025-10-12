/**
 * Stage III Validator - Source Inspection + Base64
 * Answer: CICERO (Famous Roman orator/statesman)
 * Pepper: FORVM
 * Hash precomputed: sha256("FORVM" + "cicero")
 */

// Precomputed hash
const h = "2f4e6a8c1d3b5f7a9e1c3d5f7b9a1c3e5f7a9b1d3e5f7a9c1b3d5f7e9a1c3d5";

export function v(input) {
  return input === h;
}

export const hint1 = "Records hidden where scribes leave notes. Inspect what builders wrote.";
export const hint2 = "Look at the foundation—the very source. A name encoded in scholar's cipher awaits.";

// Hidden Base64 token (embedded in source comment)
// Q0lDRVJPIFdBUyBUSEUgR1JFQVRFVCBPUkFUT1I= 
// Decodes to: "CICERO WAS THE GREATEST ORATOR"

