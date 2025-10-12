/**
 * Cryptographic utilities for puzzle validation
 * Anti-reverse-engineering: No plaintext answers stored
 */

/**
 * Normalize user input for consistent hashing
 * - Lowercase, strip spaces and punctuation
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * SHA-256 hash function using WebCrypto API
 */
export async function sha256Hex(data: string | Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer: BufferSource = typeof data === 'string' ? encoder.encode(data) : new Uint8Array(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Derive a pepper from stable runtime signals
 * Strategy IDs:
 * 1 - Stage I: Hardware concurrency + user agent length mod
 * 2 - Stage II: Screen dimensions + timezone offset
 * 3 - Stage IV: Date-based (see timeSaltCandidates)
 * 4 - Stage V: Split across modules (see validators)
 * 
 * NOTE: These are intentionally opaque. Pepper values are documented
 * separately in validator modules as precomputed hashes.
 */
export function derivePepper(strategyId: number): string {
  switch (strategyId) {
    case 1:
      // Stage I pepper: Based on common browser features
      // Pepper = "ROMA" (constant for this stage, embedded in validator hash)
      return 'ROMA';
    
    case 2:
      // Stage II pepper: Arena-themed
      // Pepper = "RVDIS" (constant, embedded in validator)
      return 'RVDIS';
    
    case 3:
      // Stage IV uses time-based salts, not this pepper
      return '';
    
    default:
      return '';
  }
}

/**
 * Generate time-based salt candidates (today and yesterday)
 * Used for Stage IV to allow 24-hour window validation
 */
export function timeSaltCandidates(): string[] {
  const now = Date.now();
  const today = Math.floor(now / 86400000);
  const yesterday = today - 1;
  
  // Return salts as base36 strings for compactness
  return [
    `SALT${today.toString(36).toUpperCase()}`,
    `SALT${yesterday.toString(36).toUpperCase()}`,
  ];
}

/**
 * Hash with pepper for stages 1-2
 */
export async function hashWithPepper(input: string, pepper: string): Promise<string> {
  const normalized = normalize(input);
  const combined = pepper + normalized;
  return sha256Hex(combined);
}

/**
 * Hash with time salt for stage 4
 */
export async function hashWithTimeSalt(input: string, salt: string): Promise<string> {
  const normalized = normalize(input);
  const combined = salt + normalized;
  return sha256Hex(combined);
}

/**
 * Validate against multiple hash candidates
 * Used for time-based validation (Stage IV)
 */
export async function validateWithCandidates(
  input: string,
  expectedHashes: string[]
): Promise<boolean> {
  const salts = timeSaltCandidates();
  
  for (const salt of salts) {
    const hash = await hashWithTimeSalt(input, salt);
    if (expectedHashes.includes(hash)) {
      return true;
    }
  }
  
  return false;
}

/**
 * XOR two hex strings (for split-hash validation in Stage V)
 */
export function xorHex(hex1: string, hex2: string): string {
  if (hex1.length !== hex2.length) {
    throw new Error('Hex strings must be same length');
  }
  
  let result = '';
  for (let i = 0; i < hex1.length; i++) {
    const xor = parseInt(hex1[i], 16) ^ parseInt(hex2[i], 16);
    result += xor.toString(16);
  }
  
  return result;
}

/**
 * Test helper: Generate precomputed hash for answer
 * (Remove in production or keep for dev convenience)
 */
export async function precomputeHash(
  answer: string,
  strategyId: number,
  salt?: string
): Promise<string> {
  const normalized = normalize(answer);
  
  if (salt) {
    return sha256Hex(salt + normalized);
  }
  
  const pepper = derivePepper(strategyId);
  return sha256Hex(pepper + normalized);
}

