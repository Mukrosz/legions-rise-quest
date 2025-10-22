const _0xd = (s: string) => btoa(s).split('').reverse().join('');
const _0xe = (s: string) => atob(s.split('').reverse().join(''));

const _0xp = {
  1: '==QQN9kU',
  2: '=MVSEZlU',
  3: '=0kVS9kR',
  4: '=M1TO9ES',
  5: 'S9EVBJVRQ1US',
};

const _0xf = ['SPQR', 'CAESAR', 'LEGION', 'SENATE', 'EMPIRE'];

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
  const _0xa = strategyId;
  const _0xb = _0xa in _0xp;
  const _0xc = _0xb ? _0xp[_0xa as keyof typeof _0xp] : '';
  
  try {
    return _0xc ? _0xe(_0xc) : '';
  } catch {
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
