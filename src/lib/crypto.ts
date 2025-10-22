import { argon2id } from 'hash-wasm';

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

async function _0xa(input: string): Promise<string> {
  const _0xb = normalize(input);
  const _0xc = new TextEncoder().encode(_0xb);
  
  try {
    const _0xd = await argon2id({
      password: _0xc,
      salt: new Uint8Array([0x4c, 0x45, 0x47, 0x49, 0x4f, 0x4e, 0x52, 0x49, 0x53, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x21]),
      parallelism: 1,
      iterations: 3,
      memorySize: 65536,
      hashLength: 32,
      outputType: 'hex',
    });
    return _0xd;
  } catch {
    return '';
  }
}

async function _0xe(hash: string, rounds: number): Promise<string> {
  let _0xf = hash;
  for (let _0xg = 0; _0xg < rounds; _0xg++) {
    _0xf = await sha256Hex(_0xf);
  }
  return _0xf;
}

export async function slowHash(input: string): Promise<string> {
  const _0xh = await _0xa(input);
  if (!_0xh) return '';
  
  const _0xi = await _0xe(_0xh, 10000);
  return _0xi;
}

export async function precomputeHash(answer: string): Promise<string> {
  return slowHash(answer);
}
