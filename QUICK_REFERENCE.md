# Quick Reference Card

**The Ascent of Kaeso Dardanus** - Essential Commands & Info

---

## ⚡ Essential Commands

```bash
# Setup
npm install              # Install all dependencies
node verify-setup.js     # Check installation

# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Create production build
npm start                # Run production server
npm test                 # Run unit tests
npm run lint             # Check code quality

# Troubleshooting
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Clear dependencies
npm install              # Reinstall everything
```

---

## 📁 Project Structure (Simplified)

```
legion_rise/
├── src/
│   ├── app/             # Pages (Next.js routes)
│   ├── components/      # UI components
│   ├── lib/             # Utilities (crypto, progress, guards)
│   └── validators/      # Stage validators (v1-v5)
├── README.md            # Start here
├── GETTING_STARTED.md   # Quick setup
└── SOLUTIONS.md         # ⚠️ Spoilers!
```

---

## 🎯 Stage Quick Reference

| Stage | Cipher | Difficulty | Key Skill |
|-------|--------|------------|-----------|
| I | Caesar | ⭐ Easy | Substitution |
| II | Stego + Logic | ⭐⭐ Medium | Pattern recognition |
| III | Base64 | ⭐⭐ Medium | Source inspection |
| IV | Polybius → Vigenère | ⭐⭐⭐ Hard | Multi-step decode |
| V | Name Recall | ⭐⭐ Medium | Narrative synthesis |

---

## 🔧 Troubleshooting Quick Fixes

### Port 3000 in use
```bash
lsof -ti:3000 | xargs kill  # macOS/Linux
npm run dev -- -p 3001      # Use different port
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles broken
```bash
rm -rf .next
npm run dev
```

### localStorage issues
- Check browser privacy settings
- Try incognito/private mode
- Ensure cookies enabled

---

## 🎮 Solving Tips

### Hints
- Wait 60s for hint 1
- Wait 120s for hint 2 (or get wrong once)

### Tools (Totally Fair!)
- **Caesar**: dcode.fr, cryptii.com
- **Base64**: base64decode.org, `atob()` in console
- **Polybius**: dcode.fr/polybius-cipher
- **Vigenère**: dcode.fr/vigenere-cipher

### Strategy
1. Read story carefully (clues in narrative)
2. Wait for hints
3. Use online tools
4. Take notes
5. Historical context matters

---

## 📊 localStorage Keys

```javascript
// Progress tracking
roman.ascent.progress → { stage: number, timestamp: number }

// Input cache (per stage)
roman.ascent.s1.input → string
roman.ascent.s2.input → string
// ... s3, s4, s5

// View in browser console:
localStorage.getItem('roman.ascent.progress')

// Clear all (hard reset):
localStorage.clear()
```

---

## 🔐 Validation Flow (For Developers)

```
User Input
  ↓ normalize()
Lowercase, strip spaces/punct
  ↓ + Pepper/Salt
Combined string
  ↓ SHA-256
Hash (64 hex chars)
  ↓ Compare
Stored hash
  ↓
✓ Match → Stage complete
✗ No match → Error + hint
```

---

## 🎨 Color Palette

```css
--burgundy:  #6e0e1e  /* Accent, danger */
--obsidian:  #121212  /* Background, borders */
--parchment: #f5edda  /* Text, content */
--bronze:    #b87333  /* Highlights, CTAs */
--laurel:    #2e6f40  /* Success, growth */
```

---

## 📝 File Locations (Dev)

### Pages
- Landing: `src/app/page.tsx`
- Stage I: `src/app/stage-1/page.tsx`
- Stage II: `src/app/stage-2/page.tsx`
- Stage III: `src/app/stage-3/page.tsx`
- Stage IV: `src/app/stage-4/page.tsx`
- Stage V: `src/app/stage-5/page.tsx`
- Victory: `src/app/victory/page.tsx`

### Core Utilities
- Crypto: `src/lib/crypto.ts`
- Progress: `src/lib/progress.ts`
- Guards: `src/lib/guard.ts`

### Validators
- `src/validators/v1.js` to `v5b.js`

---

## 🚀 Deployment Quick Start

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Static Export
```bash
npm run build
# Deploy .next/ directory
```

---

## 📚 Documentation Map

| Need... | Read... |
|---------|---------|
| Quick setup | GETTING_STARTED.md |
| Project overview | README.md |
| Detailed install | SETUP.md |
| Cipher theory | PUZZLES_EXPLAINED.md |
| Puzzle answers | SOLUTIONS.md ⚠️ |
| Technical details | PROJECT_SUMMARY.md |
| Hosting guide | DEPLOYMENT.md |
| All docs listed | INDEX.md |

---

## 🔍 Browser Console Tricks

```javascript
// Check progress
localStorage.getItem('roman.ascent.progress')

// View all localStorage
Object.keys(localStorage)

// Decode Base64 (Stage III)
atob('Q0lDRVJP')

// Clear progress (hard reset)
localStorage.clear()
location.reload()

// Test crypto (if in dev)
import { sha256Hex } from '@/lib/crypto'
await sha256Hex('test')
```

---

## ⚠️ Common Pitfalls

1. **Direct stage navigation**: Blocked if previous stages incomplete
2. **Hard refresh**: Progress persists (localStorage)
3. **Private browsing**: May block localStorage
4. **Wrong capitalization**: Normalized automatically
5. **Extra spaces**: Stripped automatically

---

## 📊 Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse**: ≥ 85 performance, ≥ 90 accessibility

---

## 🎓 Learning Outcomes

### Cryptography
- Caesar cipher (ROT-N)
- Steganography
- Base64 encoding
- Polybius square
- Vigenère cipher

### Web Development
- Next.js App Router
- React hooks (useState, useEffect)
- TypeScript
- TailwindCSS
- localStorage API
- WebCrypto API

### Security
- SHA-256 hashing
- Salt/pepper techniques
- Client-side validation
- Anti-reverse-engineering

---

## 🆘 Emergency Contacts

### Stuck on Puzzle?
1. Wait for hints (60s, 120s)
2. Read PUZZLES_EXPLAINED.md
3. Use online cipher tools
4. Last resort: SOLUTIONS.md

### Technical Issues?
1. Check this reference card
2. Read SETUP.md troubleshooting
3. Run `node verify-setup.js`
4. Check browser console

---

## 🏆 Completion Stats

- **Average time**: 1-2 hours
- **Fastest possible**: ~30 minutes
- **Stages**: 5 + landing + victory
- **Total puzzles**: 5 unique ciphers
- **Hints per stage**: 2 (timed)

---

## 🎉 Quick Win (Test Installation)

```bash
cd legion_rise
npm install
node verify-setup.js  # All green checkmarks?
npm run dev           # Server starts?
# Open http://localhost:3000
# See landing page? ✅ Ready!
```

---

**Keep this card handy while developing or playing!**

*SPQR • AD MMXXV* 🏛️

