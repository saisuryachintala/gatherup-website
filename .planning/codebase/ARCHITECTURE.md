# Architecture

**Analysis Date:** 2026-04-05

## Pattern Overview

**Overall:** Next.js App Router with server/client component separation, component-driven UI architecture.

**Key Characteristics:**
- Server-rendered root layout with Google fonts configuration
- Client-rendered pages and feature components using `'use client'` directive
- Framer Motion-based animation library as primary motion primitive
- Tailwind CSS v4 for styling with CSS-in-JS and design tokens
- TypeScript strict mode enforced throughout
- Path alias `@/*` for absolute imports from `src/` directory

## Layers

**App Layer (Routes & Pages):**
- Purpose: Define page routes and compose feature sections into full-page experiences
- Location: `src/app/`
- Contains: Page components (`page.tsx`), root layout, Next.js routing configuration
- Depends on: Component layer, animation utilities
- Used by: End users through HTTP requests

**Component Layer (Reusable UI):**
- Purpose: Build self-contained UI components that compose into pages
- Location: `src/components/`
- Contains: Feature components (Hero, Header, CTASection, etc.), domain-specific components (CommercialBenefits, ResidentialServices)
- Depends on: Utility layer (animations, Button primitives), Next.js primitives (Image, Link)
- Used by: Page layer, other components

**Utility Layer (Shared Helpers):**
- Purpose: Provide motion presets, animation variants, and reusable utilities
- Location: `src/utils/`
- Contains: `animations.ts` with Framer Motion variants and transition presets
- Depends on: Framer Motion library
- Used by: All components requiring motion

**Layout Layer (Root Structure):**
- Purpose: Provide global structure, fonts, metadata, and styling foundation
- Location: `src/app/layout.tsx`
- Contains: Root HTML setup, font loading (Montserrat, Lato), OpenGraph metadata, CSS imports
- Depends on: Next.js font system, Tailwind CSS
- Used by: All pages through Next.js layout composition

## Data Flow

**Page Composition Flow:**

1. User navigates to route (e.g., `/our-commercial-solutions`)
2. Next.js resolves to page file: `src/app/our-commercial-solutions/page.tsx`
3. Page component imports feature sections as children
4. Each section component declares `'use client'` and manages its own state/interactivity
5. Components consume animation variants from `@/utils/animations`
6. Framer Motion applies stagger, fade, and scroll reveal effects
7. Tailwind classes render final styled output

**Interactive State Flow:**

- Header component: Manages navigation state (mobile menu, dropdown visibility) using `useState`
- Header uses `usePathname()` to highlight active navigation links
- Scroll detection via `requestAnimationFrame` for header visibility toggle
- ExpandableText component: Manages expanded/collapsed state locally
- BookDemoButton: Provides external link to Tidycal scheduling service

**State Management:**
- Local component state only; no global state management (Redux, Zustand, etc.)
- Props drilling for configuration (variants, className overrides)
- React hook-based side effects for scroll listeners, resize handlers

## Key Abstractions

**Animation Variants System:**
- Purpose: Centralize motion definitions for consistency across pages
- Examples: `src/utils/animations.ts` exports `pageLoad`, `fadeInUp`, `staggerContainer`, `scrollReveal`
- Pattern: Framer Motion `Variants` type; applied via `motion.div` components with `initial`/`animate`/`variants` props

**Button Component:**
- Purpose: Provide styled button primitive with variant system
- Examples: `src/components/Button.tsx`
- Pattern: Variant-based styling (primary, secondary, outline, accent); arrow icon auto-appended for primary variants

**Reusable Section Components:**
- Purpose: Page building blocks that encapsulate specific content areas
- Examples: `CommercialHero`, `CommercialBenefits`, `ResidentialServices`, `CaseStudy`, `CTASection`
- Pattern: Export named `React.FC` components; compose into pages without shared state

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page render (Next.js root layout pattern)
- Responsibilities: Load Google fonts, apply global metadata (title, description, OG tags), render HTML structure, inject global CSS

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/`
- Responsibilities: Compose marketing sections (Hero, WhyGatherUp, WhoWeServe, etc.) into full-page experience; apply page-level fade-in animation

**Solution Pages:**
- Location: `src/app/our-commercial-solutions/page.tsx`, `src/app/our-residential-solutions/page.tsx`
- Triggers: User navigates to `/our-commercial-solutions` or `/our-residential-solutions`
- Responsibilities: Compose solution-specific benefit/service components with case studies and CTAs

**About/Content Pages:**
- Location: `src/app/about-us/page.tsx`, `src/app/why-it-matters/page.tsx`, `src/app/playbook/page.tsx`
- Triggers: User navigates to respective routes
- Responsibilities: Render informational content with appropriate hero and supporting sections

## Error Handling

**Strategy:** Unspecified; no centralized error boundaries detected

**Patterns:**
- No error handling visible in components reviewed
- External link (BookDemoButton) uses `target="_blank"` with `rel="noopener noreferrer"` for security

## Cross-Cutting Concerns

**Logging:** Not detected; no logging framework integrated

**Validation:** Client-side form validation not detected; external form handled by Tidycal

**Authentication:** Not applicable; marketing website without user auth

**SEO:** Handled via Next.js metadata API in `src/app/layout.tsx`; OpenGraph tags, Twitter card, and canonical URLs configured

**Performance:**
- Image optimization via Next.js Image component with `fill`, `sizes`, and `priority` props
- Scroll event throttling in Header via `requestAnimationFrame`
- Framer Motion lazy-loads animation library only on client
- CSS-in-JS via Tailwind (no runtime overhead)

---

*Architecture analysis: 2026-04-05*
