/**
 * Client-side LSB Steganography Decoder
 * Extracts hidden data from PNG images using Least Significant Bit encoding
 * with PBKDF2-SHA256 key derivation and AES-GCM decryption
 */

// Guard against SSR
const isBrowser = typeof window !== 'undefined';

interface StegoPayload {
  magic: string;
  salt: Uint8Array;
  iv: Uint8Array;
  ciphertext: Uint8Array;
}

/**
 * Extract LSB from RGB channels of an image
 */
async function extractLSBFromImage(imageFile: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error('Stego decode only works in browser'));
      return;
    }

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      reject(new Error('Cannot create canvas context'));
      return;
    }

    img.onload = () => {
      try {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Extract LSB from RGB channels (skip alpha)
        const bits: number[] = [];
        for (let i = 0; i < pixels.length; i += 4) {
          bits.push(pixels[i] & 1);       // R
          bits.push(pixels[i + 1] & 1);   // G
          bits.push(pixels[i + 2] & 1);   // B
        }

        // Convert bits to bytes
        const bytes: number[] = [];
        for (let i = 0; i < bits.length; i += 8) {
          let byte = 0;
          for (let j = 0; j < 8 && i + j < bits.length; j++) {
            byte = (byte << 1) | bits[i + j];
          }
          bytes.push(byte);
        }

        resolve(new Uint8Array(bytes));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
}

/**
 * Parse KAESO1 payload format
 */
function parseStegoPayload(data: Uint8Array): StegoPayload | null {
  try {
    let offset = 0;

    // Read payload length (4 bytes, big-endian)
    if (data.length < 4) return null;
    const payloadLength = 
      (data[offset++] << 24) |
      (data[offset++] << 16) |
      (data[offset++] << 8) |
      data[offset++];

    if (payloadLength <= 0 || payloadLength > data.length - 4) return null;

    const payload = data.slice(4, 4 + payloadLength);
    offset = 0;

    // Read magic (6 bytes: "KAESO1")
    if (payload.length < 6) return null;
    const magic = new TextDecoder().decode(payload.slice(offset, offset + 6));
    offset += 6;
    
    if (magic !== 'KAESO1') return null;

    // Read salt length (1 byte)
    if (payload.length < offset + 1) return null;
    const saltLength = payload[offset++];
    
    if (saltLength <= 0 || payload.length < offset + saltLength) return null;

    // Read salt
    const salt = payload.slice(offset, offset + saltLength);
    offset += saltLength;

    // Read IV (12 bytes)
    if (payload.length < offset + 12) return null;
    const iv = payload.slice(offset, offset + 12);
    offset += 12;

    // Remaining is ciphertext + tag
    const ciphertext = payload.slice(offset);

    return { magic, salt, iv, ciphertext };
  } catch (error) {
    console.error('Failed to parse payload:', error);
    return null;
  }
}

/**
 * Derive encryption key from passphrase using PBKDF2-SHA256
 */
async function deriveKey(
  passphrase: string,
  salt: Uint8Array,
  iterations = 200000
): Promise<CryptoKey> {
  if (!isBrowser || !crypto.subtle) {
    throw new Error('Web Crypto API not available');
  }

  const encoder = new TextEncoder();
  const passphraseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256',
    },
    passphraseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

/**
 * Decrypt ciphertext using AES-GCM
 */
async function decryptAESGCM(
  key: CryptoKey,
  iv: Uint8Array,
  ciphertext: Uint8Array
): Promise<string> {
  if (!isBrowser || !crypto.subtle) {
    throw new Error('Web Crypto API not available');
  }

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error('Decryption failed - invalid key or corrupted data');
  }
}

/**
 * Main decryption function
 * @param imageFile PNG file containing steganographic data
 * @param passphrase Passphrase for decryption (e.g., Stage I answer)
 * @returns Decrypted plaintext or null on failure
 */
export async function decryptStegoImage(
  imageFile: File,
  passphrase: string
): Promise<string | null> {
  if (!isBrowser) {
    throw new Error('Stego decode only works in browser');
  }

  try {
    // Step 1: Extract LSB data from image
    const lsbData = await extractLSBFromImage(imageFile);

    // Step 2: Parse KAESO1 payload
    const payload = parseStegoPayload(lsbData);
    if (!payload) {
      console.error('Invalid payload format');
      return null;
    }

    // Step 3: Derive key from passphrase
    const key = await deriveKey(passphrase, payload.salt);

    // Step 4: Decrypt ciphertext
    const plaintext = await decryptAESGCM(key, payload.iv, payload.ciphertext);

    return plaintext.trim();
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}

/**
 * Validate that a file is a PNG image
 */
export function isPNGImage(file: File): boolean {
  return file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
}

