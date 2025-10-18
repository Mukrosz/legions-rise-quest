#!/usr/bin/env python3
"""
Steganography Encoder for Legion's Rise Quest - Stage 2
Embeds encrypted text into PNG images using LSB (Least Significant Bit) encoding
Matches the KAESO1 format expected by the browser decoder

Usage:
    python stego_encoder.py input_image.png "ANSWER_WORD" output_image.png
    
Requirements:
    pip install pillow cryptography
"""

import sys
import os
import struct
from PIL import Image
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# Constants matching the browser decoder
MAGIC = b'KAESO1'
PBKDF2_ITERATIONS = 200000
AES_KEY_SIZE = 32  # 256 bits


def derive_key(passphrase: str, salt: bytes) -> bytes:
    """Derive AES-256 key from passphrase using PBKDF2-SHA256"""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=AES_KEY_SIZE,
        salt=salt,
        iterations=PBKDF2_ITERATIONS,
        backend=default_backend()
    )
    return kdf.derive(passphrase.encode('utf-8'))


def encrypt_text(plaintext: str, passphrase: str) -> tuple:
    """
    Encrypt plaintext using AES-GCM
    Returns: (salt, iv, ciphertext_with_tag)
    """
    # Generate random salt and IV
    salt = os.urandom(16)
    iv = os.urandom(12)
    
    # Derive key
    key = derive_key(passphrase, salt)
    
    # Encrypt with AES-GCM
    aesgcm = AESGCM(key)
    ciphertext_with_tag = aesgcm.encrypt(iv, plaintext.encode('utf-8'), None)
    
    return salt, iv, ciphertext_with_tag


def build_payload(plaintext: str, passphrase: str) -> bytes:
    """
    Build KAESO1 format payload:
    - MAGIC (6 bytes: "KAESO1")
    - salt_length (1 byte)
    - salt (variable)
    - IV (12 bytes)
    - ciphertext + tag (variable)
    """
    salt, iv, ciphertext = encrypt_text(plaintext, passphrase)
    
    # Build payload
    payload = bytearray()
    payload.extend(MAGIC)
    payload.append(len(salt))
    payload.extend(salt)
    payload.extend(iv)
    payload.extend(ciphertext)
    
    return bytes(payload)


def embed_lsb(image_path: str, data: bytes, output_path: str):
    """
    Embed data into image using LSB encoding
    Prepends data with 4-byte big-endian length field
    """
    img = Image.open(image_path)
    img = img.convert('RGB')  # Ensure RGB mode
    
    pixels = list(img.getdata())
    width, height = img.size
    
    # Prepend length field (4 bytes, big-endian)
    data_length = len(data)
    full_data = struct.pack('>I', data_length) + data
    
    # Convert data to bits
    bits = []
    for byte in full_data:
        for i in range(7, -1, -1):
            bits.append((byte >> i) & 1)
    
    # Check capacity
    max_bits = width * height * 3  # RGB channels
    if len(bits) > max_bits:
        raise ValueError(f"Image too small! Need {len(bits)} bits but only have {max_bits} available.")
    
    # Embed bits into LSB of RGB channels
    modified_pixels = []
    bit_index = 0
    
    for pixel in pixels:
        r, g, b = pixel
        
        # Modify LSB of each channel if we have bits left
        if bit_index < len(bits):
            r = (r & 0xFE) | bits[bit_index]
            bit_index += 1
        if bit_index < len(bits):
            g = (g & 0xFE) | bits[bit_index]
            bit_index += 1
        if bit_index < len(bits):
            b = (b & 0xFE) | bits[bit_index]
            bit_index += 1
            
        modified_pixels.append((r, g, b))
    
    # Create new image
    new_img = Image.new('RGB', (width, height))
    new_img.putdata(modified_pixels)
    new_img.save(output_path, 'PNG')
    
    print(f"✓ Successfully embedded {len(full_data)} bytes into {output_path}")
    print(f"  - Plaintext: '{data.decode('utf-8', errors='ignore')[:50]}...'")
    print(f"  - Payload size: {data_length} bytes")
    print(f"  - Image size: {width}x{height} pixels")
    print(f"  - Capacity used: {len(bits)} / {max_bits} bits ({100*len(bits)/max_bits:.2f}%)")


def main():
    if len(sys.argv) != 5:
        print("Usage: python stego_encoder.py <input_image> <plaintext> <passphrase> <output_image>")
        print()
        print("Example:")
        print('  python stego_encoder.py beastmaster_original.png "GLADIUS" "LIBERTAS" beastmaster.png')
        print()
        print("Notes:")
        print("  - Input image should be a clean PNG (preferably 400x400 or larger)")
        print("  - Plaintext is the answer word to hide (e.g., 'GLADIUS', 'IGNIS', 'HARENA')")
        print("  - Passphrase should be 'LIBERTAS' (Stage I answer) for the real answer")
        print("  - Output image will be saved with embedded data")
        sys.exit(1)
    
    input_image = sys.argv[1]
    plaintext = sys.argv[2]
    passphrase = sys.argv[3]
    output_image = sys.argv[4]
    
    if not os.path.exists(input_image):
        print(f"Error: Input image '{input_image}' not found!")
        sys.exit(1)
    
    print(f"Encoding '{plaintext}' into {input_image}...")
    print(f"Using passphrase: {passphrase}")
    print()
    
    try:
        # Build payload
        payload = build_payload(plaintext, passphrase)
        
        # Embed into image
        embed_lsb(input_image, payload, output_image)
        
        print()
        print("✓ Encoding complete!")
        print(f"  Deploy {output_image} to public/enemies/ directory")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()

