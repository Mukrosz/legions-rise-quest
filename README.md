# The Ascent of Kaeso Dardanus

A five-stage Roman-themed puzzle website built with Next.js, featuring cryptographic challenges from Caesar ciphers to split-hash validation.

## 🏛️ Overview

Follow the journey of Kaeso Dardanus, a Dardanian warrior captured by Rome, as he ascends from enslaved gladiator to senator through cunning, wit, and cryptographic prowess.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to begin your ascent.

## 📚 Project Structure

```
legion_rise/
├── src/
│   ├── app/              # Next.js app routes
│   │   ├── page.tsx      # Landing page
│   │   ├── stage-1/      # Caesar cipher
│   │   ├── stage-2/      # Steganography + logic
│   │   ├── stage-3/      # Source inspection
│   │   ├── stage-4/      # Polybius + Vigenère
│   │   ├── stage-5/      # Final challenge
│   │   └── victory/      # Completion page
│   ├── components/       # Reusable UI components
│   │   ├── Panel.tsx
│   │   ├── CaptionBox.tsx
│   │   ├── HintBubble.tsx
│   │   ├── InputCard.tsx
│   │   └── ProgressBar.tsx
│   ├── lib/              # Core utilities
│   │   ├── crypto.ts     # Hashing, peppers, salts
│   │   ├── progress.ts   # localStorage management
│   │   └── guard.ts      # Route protection
│   └── validators/       # Stage validation modules
│       ├── v1.js - v5b.js
└── SOLUTIONS.md          # Developer reference
```

## 🎮 Stage Overview

### Stage I - Chains of the Captive
**Puzzle:** Caesar cipher  
**Challenge:** Decode a shifted Latin word

### Stage II - Blood of the Arena
**Puzzle:** Steganography + logic riddle  
**Challenge:** Extract hidden message and solve logic puzzle

### Stage III - Citizen's Trial
**Puzzle:** Source inspection (Base64)  
**Challenge:** Find Base64 in page source and decode

### Stage IV - Web of Influence
**Puzzle:** Polybius Square → Vigenère cipher  
**Challenge:** Two-step decode with time-based validation

### Stage V - Vox Senatus
**Puzzle:** Final keyed challenge  
**Challenge:** Split-hash validation with protagonist's name

## 🔒 Anti-Reverse-Engineering Features

- **No plaintext answers** in source code
- **Hashed validation** with peppers and salts
- **Dynamic imports** for validators
- **Split-hash XOR** for final stage
- **Time-based salts** for Stage IV (24-hour window)
- **Runtime-derived peppers** from stable signals

## 🎨 Design System

### Colors
- **Burgundy** `#6e0e1e` - Accent, danger
- **Obsidian** `#121212` - Background, borders
- **Parchment** `#f5edda` - Text, panels
- **Bronze** `#b87333` - Highlights, buttons
- **Laurel** `#2e6f40` - Success, growth

### Typography
- **Display:** Cinzel Decorative (Roman serif)
- **Body:** Inter (clean sans-serif)

### Comic Style
- Full-bleed hero panels
- Thick borders (4px obsidian)
- Halftone textures
- Speech bubble hints
- Caption boxes with corner notches

## 🧪 Testing

```bash
# Run tests
npm test

# Check specific utilities
npm test -- crypto.test.ts
```

## ♿ Accessibility

- WCAG AA contrast ratios
- Keyboard navigation
- ARIA labels
- Reduced motion support
- Semantic HTML

## 📝 State Management

All progress stored in `localStorage`:

```javascript
// Progress key
roman.ascent.progress → { stage: number, timestamp: number }

// Input cache
roman.ascent.s1.input → string
roman.ascent.s2.input → string
// ... etc
```

**Hard Reset:** Clears all keys and resets progress to stage 0.

## 🛠️ Development Notes

### Adding New Stages

1. Create route in `src/app/stage-X/page.tsx`
2. Implement validator in `src/validators/vX.js`
3. Update progress tracking in `lib/progress.ts`
4. Add stage to `ProgressBar` component

### Generating Hashes

Use the `precomputeHash` helper in `lib/crypto.ts`:

```typescript
import { precomputeHash } from '@/lib/crypto';

// Stage 1-2 (with pepper)
const hash = await precomputeHash('answer', strategyId);

// Stage 4 (with time salt)
const salt = 'SALT15BHB';
const hash = await precomputeHash('answer', 4, salt);
```

## 📦 Production Build

```bash
npm run build
npm start
```

Optimizations:
- Console logs stripped (except errors/warnings)
- Images optimized (AVIF/WebP)
- Code splitting by route
- Validators dynamically imported

## 🎯 Performance Targets

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Lighthouse Performance:** ≥ 85
- **Lighthouse Accessibility:** ≥ 90

## 📄 License

Created for educational and entertainment purposes. Roman history is public domain.

## 🏆 Credits

**Design Philosophy:** American graphic novels meet Roman history  
**Cryptography:** Classical ciphers with modern validation  
**Framework:** Next.js 14 + React 18 + TypeScript  
**Styling:** TailwindCSS with custom comic-panel utilities

---

*SPQR • AD MMXXV*

