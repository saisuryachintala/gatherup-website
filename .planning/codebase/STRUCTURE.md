# Codebase Structure

**Analysis Date:** 2026-04-05

## Directory Layout

```
gatherup-website-saisuryachintala-fork/
├── src/                           # Source code root
│   ├── app/                       # Next.js App Router (pages & routes)
│   │   ├── layout.tsx             # Root layout with fonts, metadata, globals
│   │   ├── globals.css            # Global styles, Tailwind import
│   │   ├── page.tsx               # Home page
│   │   ├── about-us/
│   │   │   └── page.tsx           # About page
│   │   ├── our-commercial-solutions/
│   │   │   └── page.tsx           # Commercial solutions page
│   │   ├── our-residential-solutions/
│   │   │   └── page.tsx           # Residential solutions page
│   │   ├── why-it-matters/
│   │   │   └── page.tsx           # Why it matters page
│   │   └── playbook/
│   │       └── page.tsx           # Playbook page
│   ├── components/                # Reusable React components
│   │   ├── Header.tsx             # Fixed navigation header with mobile menu
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Button.tsx             # Button primitive with variants
│   │   ├── BookDemoButton.tsx     # CTA button linking to Tidycal
│   │   ├── ExpandableText.tsx     # Text truncation/expansion utility
│   │   ├── Hero.tsx               # Home page hero section
│   │   ├── CommercialHero.tsx     # Commercial solutions hero
│   │   ├── ResidentialHero.tsx    # Residential solutions hero
│   │   ├── WhyItMattersHero.tsx   # Why it matters page hero
│   │   ├── CommercialBenefits.tsx # Commercial benefits section
│   │   ├── ResidentialBenefits.tsx# Residential benefits section
│   │   ├── CommercialServices.tsx # Commercial services section
│   │   ├── ResidentialServices.tsx# Residential services section
│   │   ├── CaseStudy.tsx          # General case study component
│   │   ├── ResidentialCaseStudy.tsx
│   │   ├── CTASection.tsx         # General call-to-action section
│   │   ├── ResidentialCTASection.tsx
│   │   ├── WhyGatherUp.tsx        # Value proposition section
│   │   ├── WhyChoose.tsx          # Differentiator section
│   │   ├── WhoWeServe.tsx         # Target audience section
│   │   ├── ThrivingWorkplace.tsx  # Workplace benefits content
│   │   ├── PowerOfTenant.tsx      # Tenant engagement content
│   │   ├── Testimonial.tsx        # Testimonial/quote section
│   │   ├── ScrollingLogos.tsx     # Animated logo carousel
│   │   ├── ImpactCalculator.tsx   # Interactive calculator (commented out)
│   │   ├── AtGatherUp.tsx         # Culture/values section
│   │   ├── FounderBio.tsx         # Founder biography
│   │   ├── BusinessImpact.tsx     # ROI/impact content
│   │   ├── ResidentialNOI.tsx     # Residential NOI calculation
│   │   ├── TenantStatsOption1.tsx # Tenant statistics display
│   │   ├── Features.tsx           # Features showcase
│   │   ├── ValueProp.tsx          # Value proposition
│   │   ├── WellBeingImperative.tsx# Wellness imperative content
│   │   ├── WhatsAtStake.tsx       # Stakes/challenges content
│   │   ├── BeyondPerks.tsx        # Beyond perks section
│   │   ├── BlogPreview.tsx        # Blog preview component
│   │   ├── OurMission.tsx         # Mission statement
│   │   ├── GatherUp5DApproach.tsx # 5D approach framework
│   │   └── playbook/              # Playbook-specific components
│   │       ├── PlaybookHero.tsx
│   │       ├── ActivationFramework.tsx
│   │       ├── BusinessAssetSection.tsx
│   │       ├── WhatWeDoSection.tsx
│   │       └── DownloadSection.tsx
│   └── utils/                     # Shared utilities
│       └── animations.ts          # Framer Motion variants & transitions
├── public/                        # Static assets
│   └── assets/
│       ├── GatherUp-Lockups/      # Logo and branding assets
│       ├── icons/                 # Icon files
│       ├── images/                # Image files
│       └── docs/                  # Document files
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration with path alias
├── next.config.ts                 # Next.js configuration (redirects)
├── postcss.config.mjs             # PostCSS config for Tailwind
├── eslint.config.mjs              # ESLint configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project readme
```

## Directory Purposes

**src/app:**
- Purpose: Page routes and root layout for Next.js App Router
- Contains: Page components following Next.js routing convention (`page.tsx`), global styling, site metadata
- Key files: `layout.tsx` (root), `page.tsx` (home), route-specific subdirectories

**src/components:**
- Purpose: Reusable UI components organized by feature domain
- Contains: Marketing section components, UI primitives (Button), and layout components (Header, Footer)
- Key files: `Header.tsx` (navigation), `Button.tsx` (primitive), `Hero.tsx` (full-width sections)

**src/utils:**
- Purpose: Shared utilities and animation libraries
- Contains: Framer Motion variants, transition presets, animation timings
- Key files: `animations.ts` (centralized motion definitions)

**public/assets:**
- Purpose: Static images, logos, icons, and downloadable documents
- Contains: PNG/JPG images, SVG icons, PDF documents
- Key files: GatherUp logos, hero images, icon set

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout wrapping all pages; loads fonts, sets metadata
- `src/app/page.tsx`: Home page; composes marketing sections
- `src/app/*/page.tsx`: Section-specific pages (about, solutions, playbook)

**Configuration:**
- `tsconfig.json`: TypeScript compiler options, path aliases (`@/*` → `src/*`)
- `next.config.ts`: Next.js configuration, URL redirects (old route patterns)
- `postcss.config.mjs`: Tailwind CSS processing
- `eslint.config.mjs`: ESLint rules and shared configs

**Core Logic:**
- `src/components/Header.tsx`: Navigation, mobile menu, scroll detection
- `src/utils/animations.ts`: All motion definitions and timing presets
- `src/components/Button.tsx`: Button styling primitive with variant system
- `src/components/BookDemoButton.tsx`: CTA linking to external scheduling service

**Styling:**
- `src/app/globals.css`: Global styles, design tokens (colors, fonts), Tailwind import, custom animations

## Naming Conventions

**Files:**
- PascalCase for React components: `Header.tsx`, `CommercialBenefits.tsx`
- camelCase for utilities and modules: `animations.ts`
- `page.tsx` for Next.js route files (required convention)
- `layout.tsx` for Next.js layout files (required convention)

**Directories:**
- kebab-case for route directories: `our-commercial-solutions/`, `our-residential-solutions/`
- camelCase for feature directories: `components/playbook/`
- Consistent naming with URL structure (e.g., `/our-residential-solutions` → `src/app/our-residential-solutions/`)

**Components:**
- Exported as named `React.FC` type with TypeScript interfaces for props
- Typically `export const ComponentName: React.FC<Props> = () => {}`
- File name matches component name exactly

## Where to Add New Code

**New Feature Section:**
- Create new component in `src/components/SectionName.tsx`
- Implement as `React.FC` with `'use client'` if needing interactivity
- Import animation variants from `@/utils/animations` as needed
- Export from component file, import into page

**New Page/Route:**
- Create directory under `src/app/new-route-name/`
- Add `page.tsx` with page component using `'use client'`
- Wrap content in `motion.main` with `pageLoad` variant from `@/utils/animations`
- Include Header and Footer at top/bottom
- Update `next.config.ts` if redirects needed

**New Animation:**
- Add variant to `src/utils/animations.ts` following existing patterns
- Export as `export const nameVariant: Variants = {...}`
- Use in components via `motion.div` with `variants={nameVariant}`

**New Reusable Component:**
- Add to `src/components/` if globally reusable
- Add to `src/components/playbook/` if playbook-specific
- Use TypeScript interfaces for props with React.FC type annotation
- Prefer composition over prop drilling; keep components focused

**Button/Interactive Elements:**
- Use existing `Button.tsx` primitive for consistency
- Pass `variant` prop to select styling (primary, secondary, outline, accent)
- For CTA buttons, consider wrapping BookDemoButton or creating similar link-based motion component

**New Utility:**
- Add to `src/utils/animations.ts` for motion-related utilities
- Create new file in `src/utils/` for other utility types (data formatting, validation, etc.)
- Export and import via `@/utils/name` path alias

## Special Directories

**src/app/playbook:**
- Purpose: Dedicated subdirectory for playbook page and its nested components
- Generated: No
- Committed: Yes
- Contains: Playbook page route and playbook-specific components

**public/assets:**
- Purpose: Static images, logos, PDFs, and icons served to client
- Generated: No (manually managed)
- Committed: Yes (except for .gitignored large files if any)

**.next:**
- Purpose: Next.js build output and cache
- Generated: Yes (created during `npm run build` or `npm run dev`)
- Committed: No (in .gitignore)

**node_modules:**
- Purpose: Installed npm dependencies
- Generated: Yes (created by `npm install`)
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-04-05*
