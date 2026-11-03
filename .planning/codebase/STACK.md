# Technology Stack

**Analysis Date:** 2026-04-05

## Languages

**Primary:**
- TypeScript 5.x - All source code and configuration
- JSX/TSX - React components with strict type checking

**Secondary:**
- CSS - Custom styling via Tailwind CSS
- JavaScript - Configuration files (ESLint, PostCSS)

## Runtime

**Environment:**
- Node.js - Server runtime for Next.js

**Package Manager:**
- npm - Dependency management
- Lockfile: `package-lock.json` present and committed

## Frameworks

**Core:**
- Next.js 16.0.10 - Full-stack React framework with server-side rendering and routing
- React 19.2.0 - UI component library
- React DOM 19.2.0 - DOM rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework with PostCSS integration
- @tailwindcss/postcss 4.x - PostCSS plugin for Tailwind CSS 4
- Custom CSS - `src/app/globals.css` with theme variables and keyframes

**Animation:**
- Framer Motion 12.23.26 - React animation library for motion effects and transitions
- Used across components for fade-ins, stagger animations, and interactive hover/tap effects

**Icons:**
- Lucide React 0.555.0 - SVG icon library
- React Icons 5.5.0 - Icon set library

## Key Dependencies

**Critical:**
- framer-motion 12.23.26 - Powers all page animations, stagger effects, and interactive motion states
- next 16.0.10 - Meta-framework providing routing, SSR, image optimization, and font management
- lucide-react 0.555.0 - Provides consistent SVG iconography
- react-icons 5.5.0 - Additional icon support

**Build/Development:**
- @types/node 20.x - Node.js type definitions
- @types/react 19.2.7 - React type definitions
- @types/react-dom 19.2.3 - React DOM type definitions
- baseline-browser-mapping 2.10.8 - Browser support mapping for CSS features

## Configuration

**Environment:**
- `NEXT_PUBLIC_SITE_URL` - Public site URL for metadata (fallback: `https://gatherupwellness.com`)
- Env file: `.env*` files are ignored but listed in `.gitignore`

**Build:**
- TypeScript compiler: `tsconfig.json` configured with strict mode enabled
- Next.js config: `next.config.ts` - Defines URL redirects (`/our-solutions` routes)
- ESLint config: `eslint.config.mjs` - Uses Next.js core-web-vitals and TypeScript rules
- PostCSS config: `postcss.config.mjs` - Tailwind CSS plugin

## Path Configuration

**Module Aliases:**
- `@/*` → `./src/*` - All imports use `@/` prefix for absolute paths

## Platform Requirements

**Development:**
- Node.js with npm
- TypeScript 5+
- ESLint 9.x for linting
- Tailwind CSS 4.x (requires PostCSS)

**Production:**
- Node.js runtime for Next.js server
- Build output: `.next/` directory (generated during build)
- Static assets: `public/` directory served directly

## Build Scripts

```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Special Files

**Type Definitions:**
- `src/global.d.ts` - Global TypeScript definitions
- `next-env.d.ts` - Auto-generated Next.js type definitions (do not commit)

**Fonts:**
- Google Fonts integration via Next.js font optimization
- `Montserrat` - Primary display font (weights: default + custom)
- `Lato` - Secondary font (weights: 100, 300, 400, 700, 900)

---

*Stack analysis: 2026-04-05*
