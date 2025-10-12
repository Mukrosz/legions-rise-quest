/**
 * Unit tests for crypto utilities
 */

import { normalize, sha256Hex, xorHex } from '../crypto';

describe('normalize', () => {
  it('should lowercase input', () => {
    expect(normalize('HELLO')).toBe('hello');
  });

  it('should remove spaces', () => {
    expect(normalize('hello world')).toBe('helloworld');
  });

  it('should remove punctuation', () => {
    expect(normalize('hello, world!')).toBe('helloworld');
  });

  it('should handle mixed case and punctuation', () => {
    expect(normalize('Ave, Caesar!')).toBe('avecaesar');
  });

  it('should preserve numbers', () => {
    expect(normalize('test123')).toBe('test123');
  });
});

describe('sha256Hex', () => {
  it('should return consistent hash for same input', async () => {
    const hash1 = await sha256Hex('test');
    const hash2 = await sha256Hex('test');
    expect(hash1).toBe(hash2);
  });

  it('should return different hashes for different inputs', async () => {
    const hash1 = await sha256Hex('test1');
    const hash2 = await sha256Hex('test2');
    expect(hash1).not.toBe(hash2);
  });

  it('should return 64-character hex string', async () => {
    const hash = await sha256Hex('test');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('should handle Uint8Array input', async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('test');
    const hash = await sha256Hex(data);
    expect(hash).toHaveLength(64);
  });
});

describe('xorHex', () => {
  it('should XOR two hex strings correctly', () => {
    const hex1 = 'ff';
    const hex2 = '0f';
    const result = xorHex(hex1, hex2);
    expect(result).toBe('f0');
  });

  it('should throw error for mismatched lengths', () => {
    expect(() => xorHex('ff', 'f')).toThrow();
  });

  it('should handle longer hex strings', () => {
    const hex1 = 'abcd';
    const hex2 = '1234';
    const result = xorHex(hex1, hex2);
    expect(result).toHaveLength(4);
  });
});

