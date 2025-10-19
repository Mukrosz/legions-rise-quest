export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export async function sha256Hex(data: string | Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer: BufferSource = typeof data === 'string' ? encoder.encode(data) : new Uint8Array(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function derivePepper(strategyId: number): string {
  switch (strategyId) {
    case 1:
      return 'ROMA';
    case 2:
      return 'RVDIS';
    case 3:
      return '';
    default:
      return '';
  }
}

export function timeSaltCandidates(): string[] {
  const now = Date.now();
  const today = Math.floor(now / 86400000);
  const yesterday = today - 1;
  
  return [
    `SALT${today.toString(36).toUpperCase()}`,
    `SALT${yesterday.toString(36).toUpperCase()}`,
  ];
}

export async function hashWithPepper(input: string, pepper: string): Promise<string> {
  const normalized = normalize(input);
  const combined = pepper + normalized;
  return sha256Hex(combined);
}

export async function hashWithTimeSalt(input: string, salt: string): Promise<string> {
  const normalized = normalize(input);
  const combined = salt + normalized;
  return sha256Hex(combined);
}

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

