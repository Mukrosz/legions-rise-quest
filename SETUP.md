# Setup Guide - The Ascent of Kaeso Dardanus

## System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Browser**: Modern browser with JavaScript enabled
- **Storage**: ~100MB for node_modules
- **RAM**: 4GB minimum for development

## Installation Steps

### 1. Clone or Download

```bash
# If using Git
git clone <repository-url>
cd legion_rise

# Or download ZIP and extract
cd legion_rise
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 18
- TypeScript 5
- TailwindCSS 3
- Testing libraries

**Expected time:** 2-3 minutes on good connection

### 3. Verify Installation

```bash
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 9+

# Verify Next.js installation
npx next --version
```

### 4. Run Development Server

```bash
npm run dev
```

Output should show:
```
- Local:        http://localhost:3000
- Ready in X ms
```

### 5. Open in Browser

Navigate to: `http://localhost:3000`

You should see the landing page with:
- Roman-themed hero panel
- "BEGIN ASCENT" button
- Laurel decorations

## Troubleshooting

### Error: "Module not found"

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"

```bash
# Option 1: Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- -p 3001
```

### Error: "Cannot find module '@/...'

Ensure `tsconfig.json` has correct paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Styling Not Loading

```bash
# Rebuild Tailwind
npm run dev

# If still broken, clear Next.js cache
rm -rf .next
npm run dev
```

### localStorage Issues

- Ensure browser allows localStorage
- Check browser privacy settings
- Try incognito/private mode

## Development Workflow

### File Structure Tour

```
src/
├── app/               # Next.js pages (file-based routing)
│   ├── page.tsx       # Landing page (/)
│   ├── stage-1/       # Stage I (/stage-1)
│   ├── stage-2/       # Stage II (/stage-2)
│   └── ...
├── components/        # Reusable React components
│   ├── Panel.tsx
│   ├── InputCard.tsx
│   └── ...
├── lib/               # Utilities and helpers
│   ├── crypto.ts      # Hashing, validation
│   ├── progress.ts    # State management
│   └── guard.ts       # Route protection
└── validators/        # Stage validation (JS modules)
    ├── v1.js          # Stage I validator
    └── ...
```

### Making Changes

1. **Edit files** in `src/` directory
2. **Save** - Next.js hot-reloads automatically
3. **Refresh browser** if needed (usually auto-refreshes)

### Adding a New Stage

1. Create `src/app/stage-X/page.tsx`
2. Create `src/validators/vX.js`
3. Update progress tracking in `src/lib/progress.ts`
4. Test thoroughly

## Testing

### Run Unit Tests

```bash
npm test
```

### Run Specific Test

```bash
npm test -- crypto.test.ts
```

### Manual Testing Checklist

- [ ] Landing page loads
- [ ] Progress bar displays
- [ ] Stage 1 accepts correct answer
- [ ] Stage 1 rejects wrong answer
- [ ] Hints unlock after delays
- [ ] Progress persists on refresh
- [ ] Hard reset clears all data
- [ ] All stages accessible in order
- [ ] Direct stage access blocked if not unlocked
- [ ] Victory page shows after Stage 5

## Production Build

### Create Build

```bash
npm run build
```

This:
- Compiles TypeScript
- Bundles React components
- Optimizes images
- Minifies code
- Strips console logs (except errors)

### Test Production Build

```bash
npm run build
npm start
```

Visit `http://localhost:3000` and test full flow.

### Build Output

Check `.next/` directory:
- `static/` - Static assets
- `server/` - Server components
- Build size report in terminal

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Mobile Safari | iOS 14+ | ✅ Full support |
| Chrome Mobile | Android 90+ | ✅ Full support |

### Required Browser Features

- **ES2020** syntax support
- **localStorage** API
- **WebCrypto API** (SHA-256)
- **CSS Grid** and **Flexbox**
- **CSS Custom Properties**

## Performance Tips

### Development

- Use `npm run dev` for fast refresh
- Keep DevTools open for debugging
- Use React DevTools extension

### Production

- Always test production build before deploy
- Run Lighthouse audit
- Check bundle size with `npm run build`

## Security Notes

### Safe to Commit

- Source code
- Validators (hashes only, no answers)
- Configuration files

### DO NOT Commit

- `SOLUTIONS.md` (spoilers!)
- `.env.local` files
- `node_modules/`
- `.next/` build output

## Getting Help

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com)

### Common Issues

1. **"Hydration error"**: Mismatch between server/client
   - Check for browser-only code in server components
   - Use `'use client'` directive properly

2. **"localStorage is not defined"**: Server-side rendering
   - Check for `typeof window !== 'undefined'`
   - See `src/lib/progress.ts` for examples

3. **Slow build times**: Large dependencies
   - Check bundle size
   - Use dynamic imports for heavy modules

## Next Steps

1. ✅ Complete installation
2. ✅ Run development server
3. ✅ Test all five stages
4. 📖 Read `README.md` for project overview
5. 🚀 Check `DEPLOYMENT.md` for hosting
6. 🔒 Keep `SOLUTIONS.md` private!

---

**Need support?** Check the README or open an issue.

*SPQR • AD MMXXV*

