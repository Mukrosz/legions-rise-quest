# Stage 2 Steganography Tools

This directory contains tools to create the three enemy images for Stage 2: "FIRE AT NOON".

## Overview

Stage 2 requires **three PNG images** with hidden encrypted data embedded using LSB (Least Significant Bit) steganography:

1. **Beastmaster of Numidia** - Should contain the REAL Stage 2 answer
2. **Tigress Unbound** - Should contain a decoy word (e.g., "IGNIS")
3. **Archer of the Red Dunes** - Should contain a decoy word (e.g., "HARENA")

Only ONE image should decrypt to the correct answer using the Stage 1 passphrase ("LIBERTAS"). The other two images should decrypt to plausible but incorrect Roman/Latin words.

## Setup

Install required dependencies:

```bash
pip install pillow cryptography
```

## Usage

### Basic Command

```bash
python stego_encoder.py <input_image> <plaintext> <passphrase> <output_image>
```

### Example: Encoding the Real Answer

Encode the REAL Stage 2 answer into the Beastmaster image:

```bash
python stego_encoder.py beastmaster_original.png "GLADIUS" "LIBERTAS" beastmaster.png
```

**Important:** Use the actual Stage 2 answer word (currently "GLADIUS" based on validator) and the Stage 1 passphrase ("LIBERTAS").

### Example: Encoding Decoys

Encode decoy words into the other two images:

```bash
# Tigress Unbound - decoy
python stego_encoder.py tigress_original.png "IGNIS" "LIBERTAS" tigress.png

# Archer of the Red Dunes - decoy
python stego_encoder.py archer_original.png "HARENA" "LIBERTAS" archer.png
```

## Deployment

After encoding, copy the images to the correct location:

```bash
mkdir -p ../public/enemies/
cp beastmaster.png ../public/enemies/
cp tigress.png ../public/enemies/
cp archer.png ../public/enemies/
```

## Image Requirements

### Size
- Minimum: 300×300 pixels
- Recommended: 400×400 to 600×600 pixels (square aspect ratio)
- The images will be displayed as square portraits on the page

### Format
- Must be PNG (not JPEG, as JPEG compression destroys LSB data)
- Should be clean, uncompressed PNGs
- RGB color mode (no indexed color or grayscale)

### Visual Style
- Roman/ancient arena theme
- Should match the "heat at noon" atmosphere (warm colors, intense lighting)
- Enemy portraits should be dramatic and imposing
- Consider using AI generation (e.g., Midjourney, DALL-E) with prompts like:
  - "Beastmaster of Numidia riding armored rhinoceros, Roman Colosseum, epic fantasy art"
  - "White tigress in ring of fire, Roman arena, dramatic lighting"
  - "Archer on chariot, red desert dust, ancient Rome, dynamic action pose"

### Capacity Check

The encoder will tell you if an image is too small. Each image needs:
- ~200 bytes for the encrypted payload
- ~4 bytes for length header
- Total: ~600-800 bits minimum

A 400×400 pixel image provides 480,000 bits (RGB channels), which is more than enough.

## How It Works

### Encoding Process

1. **Plaintext** → UTF-8 bytes
2. **Key Derivation** → PBKDF2-SHA256 with 200k iterations (slow = secure)
3. **Encryption** → AES-GCM 256-bit with random IV and salt
4. **Payload Format** → KAESO1 magic + salt + IV + ciphertext
5. **LSB Embedding** → Spread bits across RGB pixels
6. **Output** → Visually identical PNG with hidden data

### Decoding Process (Browser-Side)

1. User clicks enemy card → modal opens
2. User downloads or selects the PNG file
3. User enters passphrase (from Stage 1: "LIBERTAS")
4. Browser extracts LSB from RGB channels
5. Parses KAESO1 payload format
6. Derives key with PBKDF2 (same params)
7. Decrypts with AES-GCM
8. Auto-fills answer input if successful

## Security Notes

- Each image uses a **fresh random salt and IV** (good practice)
- The passphrase is never exposed in the HTML or network logs
- Wrong passphrase → decryption fails (can't distinguish from wrong image)
- LSB changes are imperceptible to human eye
- File sizes remain nearly identical (steganography, not encryption-only)

## Testing Your Images

After encoding:

1. Run the dev server: `npm run dev`
2. Navigate to Stage 2 (must complete Stage 1 first)
3. Click each enemy card
4. Download the image and decrypt with "LIBERTAS"
5. Verify only ONE decrypts to the correct answer

## Troubleshooting

### "Image too small" error
→ Use a larger source image (at least 400×400 pixels)

### "Failed to load image" in browser
→ Ensure the image is a valid PNG and in the correct path (`public/enemies/`)

### Decryption always fails
→ Check that passphrase is exactly "LIBERTAS" (case-sensitive)
→ Verify the image wasn't re-compressed or modified after encoding

### All three images decrypt correctly
→ Only ONE should use the real answer; the others should use decoy words

## Example Workflow

```bash
# 1. Prepare your source images
# (e.g., from AI generation or stock photos)

# 2. Encode the real answer
python stego_encoder.py sources/beastmaster_raw.png "GLADIUS" "LIBERTAS" beastmaster.png

# 3. Encode decoys
python stego_encoder.py sources/tigress_raw.png "IGNIS" "LIBERTAS" tigress.png
python stego_encoder.py sources/archer_raw.png "HARENA" "LIBERTAS" archer.png

# 4. Deploy
mkdir -p ../public/enemies/
cp beastmaster.png tigress.png archer.png ../public/enemies/

# 5. Test in browser
npm run dev
# Navigate to Stage 2 and test each enemy
```

## Notes

- Keep the source images (before encoding) in a separate directory
- The encoded images look identical to the originals
- You can re-encode anytime by running the script again
- For production, consider padding decoy images to match real image size
- Use strong, thematic decoy words (Roman/Latin)

## Credits

Encoder implements LSB steganography with modern cryptography (PBKDF2 + AES-GCM) for educational puzzle purposes.

