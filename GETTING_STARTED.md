# Getting Started - Quick Guide

Welcome to **The Ascent of Kaeso Dardanus**! This guide will get you up and running in under 5 minutes.

---

## 🚀 Fast Track (TL;DR)

```bash
cd legion_rise
npm install
npm run dev
# Visit http://localhost:3000
```

---

## 📋 Prerequisites Check

Before starting, verify you have:

- [ ] **Node.js 18+** installed ([nodejs.org](https://nodejs.org))
- [ ] **npm 9+** (comes with Node.js)
- [ ] **Modern browser** (Chrome, Firefox, Safari, Edge)
- [ ] **~100MB disk space** for dependencies
- [ ] **Internet connection** (for npm packages)

**Check versions:**
```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

---

## 🛠️ Installation (3 Steps)

### Step 1: Navigate to Project

```bash
cd legion_rise
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs Next.js, React, TailwindCSS, and testing libraries. Takes 2-3 minutes.

### Step 3: Verify Setup

```bash
node verify-setup.js
```

You should see all green checkmarks. If any errors, the script tells you what's missing.

---

## 🎮 Run the Application

### Development Mode

```bash
npm run dev
```

**Output:**
```
- Local:   http://localhost:3000
- Ready in 2.5s
```

### Open Browser

Visit: **http://localhost:3000**

You should see:
- Roman-themed landing page
- "BEGIN ASCENT" button
- Laurel decorations

---

## 🏛️ Your First Puzzle

1. **Click "BEGIN ASCENT"** on landing page
2. **Read Stage I story** (Chains of the Captive)
3. **Solve Caesar cipher**: Decrypt `OLEHUWDV`
4. **Enter answer** and click SUBMIT
5. **Advance to Stage II** on success

---

## 📚 Documentation Overview

| Document | Purpose |
|----------|---------|
| **README.md** | Project overview |
| **SETUP.md** | Detailed installation |
| **DEPLOYMENT.md** | Hosting guide |
| **PUZZLES_EXPLAINED.md** | Cipher philosophy (no spoilers) |
| **SOLUTIONS.md** | ⚠️ Answers (spoilers!) |
| **PROJECT_SUMMARY.md** | Technical deep-dive |

**Start with:** README.md → SETUP.md → Play the game!

---

## 🔧 Common Issues

### "Port 3000 already in use"

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
npm run dev -- -p 3001
```

### "Module not found"

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Cannot find module '@/...'"

Ensure you're in the `legion_rise` directory and TypeScript is configured correctly. Run:
```bash
npx tsc --version
```

### Styles not loading

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## ✅ Verify Everything Works

Run through this checklist:

- [ ] Landing page loads
- [ ] "BEGIN ASCENT" button works
- [ ] Stage I displays Caesar cipher puzzle
- [ ] Can enter text in input field
- [ ] Submit button responds
- [ ] Hints unlock after 60 seconds
- [ ] Progress bar shows at top
- [ ] Can return to landing page

---

## 🎯 Next Steps

1. ✅ **Complete Stage I** (Caesar cipher)
2. 🔍 **Explore Stage II** (Steganography)
3. 📖 **Read PUZZLES_EXPLAINED.md** (no spoilers, learn cipher theory)
4. 🧪 **Try testing**: `npm test`
5. 🚀 **Build for production**: `npm run build`

---

## 💡 Tips for Playing

### Solving Puzzles
- Read story carefully (clues in narrative)
- Wait for hints (60s and 120s)
- Use online cipher tools (totally fair!)
- Take notes across stages
- Historical context matters

### Recommended Tools
- **Caesar cipher**: dcode.fr, cryptii.com
- **Base64**: base64decode.org or browser console (`atob()`)
- **Polybius/Vigenère**: dcode.fr

### Progress Tracking
- Progress saved in browser localStorage
- Refreshing page keeps progress
- "Start Over" button does hard reset
- Each stage saves your last attempt

---

## 🛡️ No Spoilers!

### Safe to Read (No Answers)
- ✅ README.md
- ✅ SETUP.md
- ✅ PUZZLES_EXPLAINED.md
- ✅ DEPLOYMENT.md
- ✅ This file (GETTING_STARTED.md)

### Contains Spoilers
- ⚠️ SOLUTIONS.md (all puzzle answers)
- ⚠️ Validator files (`src/validators/v*.js`)
- ⚠️ Comments in stage pages

**Tip:** Only check SOLUTIONS.md if truly stuck after reading hints and trying online tools.

---

## 🏆 Completion Time

- **Fast solvers**: 30-45 minutes
- **Average**: 1-2 hours
- **Thorough explorers**: 2-3 hours

No time limit! Progress saves automatically.

---

## 📞 Need Help?

### Stuck on a Puzzle?
1. Wait for hints (60s, 120s)
2. Read PUZZLES_EXPLAINED.md (cipher theory, no answers)
3. Use online cipher tools
4. As last resort: SOLUTIONS.md (⚠️ spoilers)

### Technical Issues?
1. Check "Common Issues" above
2. Read SETUP.md troubleshooting section
3. Verify with `node verify-setup.js`
4. Check browser console for errors

### Want to Learn More?
- Read PROJECT_SUMMARY.md (technical details)
- Check src/lib/crypto.ts (see how validation works)
- Read inline code comments
- Explore PUZZLES_EXPLAINED.md (cipher history)

---

## 🎉 Ready to Begin?

```bash
npm run dev
```

Then visit: **http://localhost:3000**

---

**Ave, puzzle solver! May your wit match that of Kaeso himself.**

*SPQR • AD MMXXV* 🏛️

