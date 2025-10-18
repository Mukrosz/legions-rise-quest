# Stage 2: "FIRE AT NOON" - Implementation Complete ✅

## What Was Implemented

### 🎨 **New Narrative & Design**
- ✅ Title changed from "Blood of the Arena" to **"FIRE AT NOON"**
- ✅ New storyline: Year Two Colosseum battle with three enemies
- ✅ Heat-themed color palette (burnt ochre, sand, rust, fire orange)
- ✅ Glassmorphism UI with warm gradient overlay
- ✅ Subtle heat-haze animation on background

### 🃏 **Three Enemy Cards**
- ✅ **Beastmaster of Numidia** - "Thunder and iron; the charge decides all."
- ✅ **Tigress Unbound** - "White fury within a ring of fire."
- ✅ **Archer of the Red Dunes** - "Eyes and joints hunted from the chariot."
- ✅ Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- ✅ Hover effects with scale animation
- ✅ Click to open modal

### 🔓 **Decrypt Modal**
- ✅ Full enemy image display
- ✅ Download button for image
- ✅ File picker (accepts PNG only)
- ✅ Passphrase input field
- ✅ "REVEAL" decrypt button
- ✅ Success/error status display
- ✅ Keyboard shortcuts (ESC to close)
- ✅ Focus trap for accessibility

### 🔐 **Client-Side Steganography Decoder**
- ✅ LSB extraction from PNG RGB channels
- ✅ KAESO1 payload format parser
- ✅ PBKDF2-SHA256 key derivation (200k iterations)
- ✅ AES-GCM 256-bit decryption
- ✅ Browser-only (no server requests)
- ✅ Guards against SSR issues

### 🎯 **Auto-Fill Logic**
- ✅ Successful decrypt auto-fills `#stage2-answer` input
- ✅ Triggers React state update
- ✅ Saves to localStorage
- ✅ User can submit immediately

### 🛠️ **Python Encoder Tool**
- ✅ Command-line steganography encoder (`tools/stego_encoder.py`)
- ✅ Matches KAESO1 format exactly
- ✅ PBKDF2 + AES-GCM encryption
- ✅ LSB embedding into PNG
- ✅ Comprehensive usage documentation

---

## What You Need to Do Next

### 📸 **1. Create Enemy Images**

You need to provide **three PNG images** for the enemies. Here are your options:

#### Option A: AI Image Generation (Recommended)

Use Midjourney, DALL-E, or similar:

**Prompts:**
```
Beastmaster of Numidia:
"Ancient Roman gladiator beastmaster riding armored rhinoceros, 
Colosseum arena, epic fantasy art, dramatic lighting, square portrait"

Tigress Unbound:
"White tiger surrounded by ring of fire, Roman Colosseum arena, 
intense action scene, dramatic red and orange lighting, square portrait"

Archer of the Red Dunes:
"Roman archer on ancient chariot shooting arrows, red desert dust clouds, 
dynamic action pose, warm sunset colors, square portrait"
```

#### Option B: Stock Photos / Public Domain

- Search for Roman gladiator/arena themed images
- Ensure they're high quality PNG (400×400 minimum)
- License must allow modification

#### Option C: Commission Art

- Hire an artist to create custom enemy portraits
- Specify square aspect ratio, Roman theme

---

### 🔧 **2. Encode the Images**

Once you have your three source images:

```bash
# Install Python dependencies
pip install pillow cryptography

# Navigate to tools directory
cd tools/

# Encode the REAL answer (use actual Stage 2 answer from validator)
# Currently the validator expects "GLADIUS" (based on hash in v2.js)
python stego_encoder.py beastmaster_source.png "GLADIUS" "LIBERTAS" beastmaster.png

# Encode decoy words for the other two
python stego_encoder.py tigress_source.png "IGNIS" "LIBERTAS" tigress.png
python stego_encoder.py archer_source.png "HARENA" "LIBERTAS" archer.png

# Copy to public directory
mkdir -p ../public/enemies/
cp beastmaster.png tigress.png archer.png ../public/enemies/
```

**Important Notes:**
- Use **"LIBERTAS"** as the passphrase (Stage 1 answer)
- Only ONE image should contain the real answer ("GLADIUS")
- The other two should have thematic decoy words
- All images must be PNG format (JPEG will corrupt the hidden data)

---

### 🧪 **3. Test the Puzzle**

```bash
# Start dev server
npm run dev

# Navigate to Stage 2 (must complete Stage 1 first)
# Click each enemy card
# Download and decrypt with "LIBERTAS"
# Verify only ONE reveals "GLADIUS"
# Try submitting "GLADIUS" - should advance to Stage 3
```

---

## Technical Details

### File Structure
```
legion_rise/
├── src/
│   ├── lib/
│   │   └── stego.ts              # LSB decoder + crypto
│   ├── components/
│   │   ├── EnemyCard.tsx         # Enemy portrait cards
│   │   └── DecryptModal.tsx      # Modal with decrypt UI
│   └── app/
│       └── stage-2/
│           └── page.tsx          # Main Stage 2 page
├── public/
│   └── enemies/
│       ├── beastmaster.png       # ⚠️ YOU NEED TO CREATE THESE
│       ├── tigress.png           # ⚠️ YOU NEED TO CREATE THESE
│       └── archer.png            # ⚠️ YOU NEED TO CREATE THESE
└── tools/
    ├── stego_encoder.py          # Python encoder script
    └── README.md                 # Full encoder documentation
```

### Security Features
- Fresh salt + IV for each image (prevents replay attacks)
- 200k PBKDF2 iterations (slow key derivation = harder to brute force)
- AES-GCM authenticated encryption (prevents tampering)
- Client-side only (no server knows the passphrase or plaintext)
- Error messages don't reveal whether image or passphrase was wrong

### Validator Integration
The answer validation is already set up in `src/validators/v2.js`. The hash expects:
- Answer: `"GLADIUS"` (or whatever word you choose)
- Pepper: Derived from stage number
- Format: `ROMA{answer}`

---

## Acceptance Criteria Status

- ✅ Stage 2 renders new narrative and three enemy cards
- ✅ Each card opens modal with full image, Download, and Decrypt Here
- ✅ Decrypt works entirely client-side with passphrase from Stage I
- ✅ Correct decrypt auto-fills `#stage2-answer` and shows success
- ✅ Incorrect decrypt shows "Invalid image or passphrase"
- ⚠️ **Pending:** Create and encode the three enemy images
- ✅ Works on mobile and desktop; accessible labels and keyboard close

---

## Current Answer Word

Based on the validator hash in `src/validators/v2.js`, the current expected answer is:

**"GLADIUS"** (Roman short sword)

This matches the thematic hint about the "wooden sword" (rudis) and the arena. If you want to change this, you'll need to:
1. Update the validator hash
2. Re-encode the Beastmaster image with the new word

---

## Quick Start (TL;DR)

```bash
# 1. Get three enemy PNG images (400×400+, Roman theme)
# 2. Install encoder dependencies
pip install pillow cryptography

# 3. Encode images
cd tools/
python stego_encoder.py beastmaster.png "GLADIUS" "LIBERTAS" beastmaster_encoded.png
python stego_encoder.py tigress.png "IGNIS" "LIBERTAS" tigress_encoded.png
python stego_encoder.py archer.png "HARENA" "LIBERTAS" archer_encoded.png

# 4. Deploy
mkdir -p ../public/enemies/
cp *_encoded.png ../public/enemies/

# 5. Test
npm run dev
# Complete Stage 1, then try Stage 2
```

---

## Need Help?

- **Encoder not working?** Check `tools/README.md` for troubleshooting
- **Images won't decrypt?** Ensure they're PNG (not JPEG) and not compressed
- **Want different answer word?** Update validator v2.js hash and re-encode
- **Styling issues?** All colors use inline styles in stage-2/page.tsx

---

## What's Next?

After Stage 2 is complete with real images, you can:
1. Test the full flow from landing → Stage 1 → Stage 2
2. Deploy to Vercel (images will be included in build)
3. Move on to Stage 3, 4, 5 redesigns (if needed)
4. Add more polish to the heat-haze effect or enemy portraits

**Enjoy building your cryptographic puzzle game! 🏛️🔥⚔️**

