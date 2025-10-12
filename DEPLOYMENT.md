# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Local Development

```bash
# Clone repository
git clone <repository-url>
cd legion_rise

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Production Build

### Build Locally

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables required for basic functionality. All state is client-side (localStorage).

Optional:
```env
# Analytics (if added)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Sentry (if added)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project to Vercel
3. Configure build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Deploy

**Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Netlify

1. Build command: `npm run build && npm run export` (add export script)
2. Publish directory: `out`
3. Deploy via CLI or web interface

**Note:** For client-side routing, add `_redirects` file:
```
/*    /index.html   200
```

### Static Export (GitHub Pages, S3, etc.)

Add export script to `package.json`:
```json
"scripts": {
  "export": "next build && next export"
}
```

Then deploy `out/` directory to static host.

## Performance Optimization

### Image Optimization

- Use Next.js Image component for automatic optimization
- Serve WebP/AVIF formats
- Lazy load images below fold

### Code Splitting

- Already implemented via Next.js routing
- Validators dynamically imported per stage
- Use `dynamic()` for heavy components

### Caching Strategy

Configure `next.config.mjs`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Security Checklist

- ✅ No API keys in client code
- ✅ Answers stored as hashes only
- ✅ CSP headers configured
- ✅ HTTPS enforced (via platform)
- ✅ No sensitive data in localStorage
- ✅ XSS protection via React escaping

## Monitoring

### Lighthouse Scores

Run before deployment:
```bash
npm run build
npm start
# In Chrome: DevTools → Lighthouse → Generate report
```

Target scores:
- Performance: ≥ 85
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

### Error Tracking

Consider adding Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Analytics

Google Analytics 4:
```bash
npm install nextjs-google-analytics
```

## Post-Deployment

1. Test all five stages end-to-end
2. Verify localStorage persistence
3. Check mobile responsiveness
4. Test keyboard navigation
5. Validate WCAG compliance
6. Monitor Core Web Vitals

## Rollback Strategy

**Vercel:** Instant rollback via dashboard  
**Netlify:** Rollback to previous deploy  
**Static:** Keep previous `out/` directory as backup

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Runtime Errors

Check browser console for:
- localStorage quota exceeded
- CORS issues (shouldn't occur for static site)
- Crypto API not available (requires HTTPS)

### Performance Issues

- Run Lighthouse audit
- Check bundle size: `npm run build` shows size warnings
- Use Next.js analyzer:
  ```bash
  npm install @next/bundle-analyzer
  ```

## Domain Configuration

### Custom Domain

**Vercel:**
1. Dashboard → Project → Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

**Cloudflare:**
- Recommended for CDN + DDoS protection
- Configure SSL/TLS to "Full"

## Backup & Recovery

### Export User Data

No server-side data to backup. User progress in localStorage is device-specific.

### Code Backup

- Maintain Git repository
- Tag releases: `git tag v1.0.0`
- Keep production branch protected

---

## Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# AWS Amplify
amplify publish

# GitHub Pages
npm run export
gh-pages -d out
```

---

*Last updated: October 2025*

