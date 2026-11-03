# External Integrations

**Analysis Date:** 2026-04-05

## APIs & External Services

**Scheduling & Calendar:**
- Tidycal - Free consultation booking system
  - SDK/Client: Direct HTTP link integration
  - Implementation: `https://tidycal.com/gluckjamin/free-gatherup-consultation`
  - Usage: BookDemoButton component and CTA sections across all pages
  - Files: `src/components/BookDemoButton.tsx`, `src/components/CTASection.tsx`, `src/components/ResidentialCTASection.tsx`

**Blog/Content:**
- Wix Blog (third-party content)
  - Implementation: External link to `https://gluckjamin.wixsite.com/website-1/post/...`
  - Usage: BlogPreview component linking to founder's blog post
  - Files: `src/components/BlogPreview.tsx`

## Data Storage

**Databases:**
- Not applicable - This is a static/semi-static marketing website with no backend database

**File Storage:**
- Local filesystem only - Static assets in `public/` directory
- Image assets: `public/assets/images/` for testimonials, case studies, and hero images
- No cloud storage integration detected

**Caching:**
- None detected - Standard Next.js caching via browser and CDN headers

## Authentication & Identity

**Auth Provider:**
- Not applicable - No user authentication system present
- This is a public-facing marketing website with no login functionality

## Monitoring & Observability

**Error Tracking:**
- Not detected - No Sentry, LogRocket, or similar error tracking

**Logs:**
- Standard console logging only
- No centralized logging service detected
- Browser DevTools console for debugging

**Analytics:**
- Not detected - No Google Analytics, Mixpanel, or similar tracking service

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `.vercel` in .gitignore)
- Likely deployed via Vercel's Git integration with Next.js optimization

**CI Pipeline:**
- GitHub Actions or Vercel deployment hooks (likely)
- No explicit CI config file detected (workflows would be in `.github/workflows/`)

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SITE_URL` - Site URL for Open Graph metadata (optional, defaults to `https://gatherupwellness.com`)

**Secrets location:**
- `.env*` files excluded from git (per `.gitignore`)
- No secrets currently detected in codebase

**Development:**
- No local development environment files needed for current feature set

## External URLs & Links

**Social Media:**
- Instagram: `https://www.instagram.com/gatherupwellness`
- LinkedIn: `https://www.linkedin.com/company/gatherupwellness/`
- Founder social (Jamin Gluck):
  - Twitter/X: `https://x.com/thejamingluck`
  - Instagram: `https://www.instagram.com/jamingluck`
  - LinkedIn: `https://www.linkedin.com/in/jamin-gluck`
  - Medium: `https://medium.com/@jamin_65314`

**Files:** `src/components/Footer.tsx`, `src/components/FounderBio.tsx`

## Webhooks & Callbacks

**Incoming:**
- None detected - No webhook endpoints in codebase

**Outgoing:**
- Tidycal integration via redirect (no outgoing webhook, user is redirected to external booking page)

## SEO & Metadata

**Meta Tags:**
- Dynamic Open Graph metadata in `src/app/layout.tsx`
- Uses Next.js `Metadata` API
- Default image: `/assets/images/ps-outdoor-yoga-class-atlanta-laure-photography-45_edited.jpg`

## URL Redirects

**Configured Redirects (Next.js):**
- `/our-solutions` → `/our-commercial-solutions` (permanent)
- `/our-solutions/residential` → `/our-residential-solutions` (permanent)
- Location: `next.config.ts`

## Static Resources

**Public Assets Directory:**
- `public/` - Static files served directly
- Images stored in subdirectories referenced by components
- No API endpoints or dynamic asset generation

---

*Integration audit: 2026-04-05*
