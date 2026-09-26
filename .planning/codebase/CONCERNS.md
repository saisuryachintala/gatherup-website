# Codebase Concerns

**Analysis Date:** 2026-04-05

## Tech Debt

**Hardcoded Colors Throughout Components:**
- Issue: Color values (#053d3d, #a6ff48, #E0F2CC, etc.) are hardcoded directly in JSX attributes and inline styles across 309+ instances, making global theme changes extremely difficult.
- Files: `src/components/ImpactCalculator.tsx`, `src/components/Header.tsx`, `src/components/CommercialServices.tsx`, `src/components/ResidentialServices.tsx`, and all other components
- Impact: Any brand color changes require manual updates across dozens of files. No single source of truth for design tokens.
- Fix approach: Extract colors to `src/constants/colors.ts` or implement Tailwind CSS custom theme configuration. Replace inline styles with token-based references.

**Duplicate Padding/Margin Patterns:**
- Issue: The pattern `px-2 md:px-4` combined with `px-4 md:px-8` appears 26+ times across components, creating inconsistent spacing.
- Files: `src/components/ImpactCalculator.tsx` (line 98), `src/components/CaseStudy.tsx` (line 83), `src/components/CommercialServices.tsx` (line 61), `src/components/ResidentialServices.tsx` (line 61), and others
- Impact: Inconsistent visual spacing, difficult to adjust spacing system globally, hard to maintain responsive behavior.
- Fix approach: Create reusable container components (`<ResponsiveContainer>`) or Tailwind utility class presets for padding patterns.

**No Centralized Animation Configuration:**
- Issue: Magic numbers for animation timing appear throughout: `setTimeout(..., 1000)`, `setTimeout(..., 3000)`, `autoPlayInterval = 4000`. These values are scattered and uncoordinated.
- Files: `src/utils/animations.ts` (provides some presets but not used consistently), `src/components/Testimonial.tsx` (lines 85, 97, 138), `src/components/CaseStudy.tsx` (line 75)
- Impact: Animation orchestration is fragile, hard to adjust global pacing, mismatched timing can create visual inconsistencies.
- Fix approach: Create `src/constants/timings.ts` with animation duration constants. Export from animations.ts and use throughout.

## Known Bugs

**Testimonial Carousel Infinite Scroll Reset Logic:**
- Symptoms: When carousel reaches the end (duplicated items), the transition to seamless infinite loop may jank or flash due to setIsTransitioning timing.
- Files: `src/components/Testimonial.tsx` (lines 92-99, 114-121)
- Trigger: Manually navigate carousels to the last slide, watch for visual artifacts on next slide transition.
- Workaround: Set `autoPlayInterval` higher to reduce visible glitches; users less likely to hit manual navigation edge cases.

**Header Body Scroll Position Lock Not Restored on All Browsers:**
- Symptoms: When mobile menu closes, scroll position may not restore correctly on some browsers, especially with multiple open/close cycles.
- Files: `src/components/Header.tsx` (lines 38-59, specifically the window.scrollTo restoration)
- Trigger: Open mobile menu, scroll page (it won't scroll), close menu, repeat several times. Position can get stuck or overshoots.
- Workaround: Recommend closing mobile menu before scrolling on mobile devices; users unlikely to discover this edge case.

**Touch Event State Not Cleared in All Cases:**
- Symptoms: In carousels (CaseStudy, Testimonial), if touch ends without proper cleanup, subsequent touches may trigger unexpected transitions.
- Files: `src/components/CaseStudy.tsx` (lines 31-53), `src/components/Testimonial.tsx` (lines 143-165)
- Trigger: Long-hold touch, then swipe. Or multiple rapid touches.
- Workaround: Add null-check guards (already present but defensive redundancy needed).

## Security Considerations

**Environment Variable Dependency Not Enforced:**
- Risk: `process.env.NEXT_PUBLIC_SITE_URL` in `src/app/layout.tsx` (line 19) has fallback to hardcoded URL. If env var is missing, site metadata uses wrong URL, breaking social sharing and canonical links.
- Files: `src/app/layout.tsx` (line 19)
- Current mitigation: Fallback to 'https://gatherupwellness.com' is present but not validated.
- Recommendations: Add build-time validation that `NEXT_PUBLIC_SITE_URL` is set before deployment. Consider using `invariant()` helper to fail fast during build.

**No CSP (Content Security Policy) Headers:**
- Risk: Vulnerable to XSS, unsanctioned script injection. Framer Motion, Lucide React, and external image assets are loaded without restrictions.
- Files: All components using external libraries and assets
- Current mitigation: None - next.config.ts does not include security headers.
- Recommendations: Add Content-Security-Policy headers in next.config.ts or via middleware. Restrict `script-src` to self, trusted CDNs.

**External Image Sources Not Validated:**
- Risk: Image paths like `/assets/images/` are not validated for existence or safe URLs. Malformed paths could break images or expose server structure in error messages.
- Files: `src/components/ImpactCalculator.tsx`, `src/components/Header.tsx`, `src/components/CaseStudy.tsx`, and many others
- Current mitigation: Next.js Image component provides some safety, but paths are not validated at build time.
- Recommendations: Use `next/image` with `unoptimized={false}` (current default) and validate image paths in a pre-build step.

## Performance Bottlenecks

**Multiple Simultaneous setTimeout Chains in Carousels:**
- Problem: Testimonial carousel uses nested `setTimeout(..., 1000)` inside `setTimeout(..., 50)` (lines 94-98). With many carousel instances, this creates staggered timer chains.
- Files: `src/components/Testimonial.tsx` (lines 92-99, 114-121)
- Cause: Seeking infinite scroll state requires delayed state updates; multiple timers fire in sequence.
- Improvement path: Use React.useTransition() or `useLayoutEffect` to coordinate state updates without setTimeout chains. Consider single event-driven state machine instead of nested timers.

**Hardcoded Image Sizes Without Responsive srcset:**
- Problem: Images in ImpactCalculator (line 160) use `sizes="(max-width: 768px) 150px, 200px"` but many other images don't specify sizes, causing unnecessary full-resolution downloads on mobile.
- Files: `src/components/ImpactCalculator.tsx` (lines 159-166, 218-224), `src/components/Header.tsx` (line 123), and others without `sizes` attribute
- Cause: Inconsistent Next.js Image configuration; some components include `sizes`, most don't.
- Improvement path: Audit all `<Image>` components and add `sizes` attribute based on max-width/layout. Use consistent responsive image logic across all components.

**Unthrottled Resize Event Listener in Header:**
- Problem: `window.addEventListener('resize', updateHeaderHeight)` in Header.tsx (line 34) has no throttling. With many viewport size changes (dev tools resize, orientation change), this fires repeatedly.
- Files: `src/components/Header.tsx` (lines 23-36)
- Cause: Raw event listener without debounce; resize events fire up to 60+ times/second on some browsers.
- Improvement path: Throttle resize handler using `useThrottle` hook or debounce with 250ms delay. Ref-based height reading should be rare.

**Carousel Auto-play Interval Hard to Adjust:**
- Problem: Carousel auto-play intervals (3000ms in CaseStudy, 4000ms default in Testimonial) are hardcoded. With multiple carousels on page, they don't sync, causing layout thrashing.
- Files: `src/components/CaseStudy.tsx` (line 75), `src/components/Testimonial.tsx` (line 18, 138)
- Cause: No global animation orchestration; each carousel is independent.
- Improvement path: Export interval constants to `src/constants/timings.ts`, use shared timing for visual coherence.

## Fragile Areas

**Testimonial Carousel Duplicated Items Array:**
- Files: `src/components/Testimonial.tsx` (line 80)
- Why fragile: `const duplicatedItems = [...items, ...items]` creates a duplicate array but the carousel logic relies on manual index management (nextIndex === items.length). If items array changes or is filtered, index logic breaks.
- Safe modification: Extract carousel logic into custom hook `useInfiniteCarousel()` that encapsulates index boundary handling. Document why duplication is needed.
- Test coverage: No unit tests for carousel logic; edge cases (single item, empty items, rapid navigation) are untested.

**Header Mobile Menu State Synchronized Across Effects:**
- Files: `src/components/Header.tsx` (lines 10-17, 38-59, 62-104)
- Why fragile: Five separate state variables (mobileMenuOpen, solutionsDropdownOpen, headerHeight, isHeaderVisible, lastScrollY) coordinate via multiple useEffect hooks. Changes to one effect can cascade and break another.
- Safe modification: Consolidate header state into single reducer using `useReducer`. Document state transitions. Add invariant checks.
- Test coverage: No tests for mobile menu + scroll + dropdown state interactions; subtle timing bugs can emerge.

**ImpactCalculator Hard-coded Table Data:**
- Files: `src/components/ImpactCalculator.tsx` (lines 52-94)
- Why fragile: Table data is static array inside component. If marketing wants to update benchmarks or add new amenity types, code change required. No data source separation.
- Safe modification: Extract `tableData` to separate file `src/data/amenityBenchmarks.ts`. Load as prop or via context.
- Test coverage: No way to test different table variations without component changes.

**Color Palette Definition Duplicated Across Components:**
- Files: Multiple components have inline color objects (ImpactCalculator lines 8-15, etc.)
- Why fragile: Each component defines its own color constants. If brand refreshes (unlikely but possible), 10+ places need updating. Copy-paste errors likely.
- Safe modification: Create single `src/constants/theme.ts` with color object, export and use everywhere.
- Test coverage: No visual regression tests; color changes could break design without detection.

## Scaling Limits

**No Pagination or Virtualization for Large Lists:**
- Current capacity: Components render all testimonials and case studies at once (3-5 items each currently).
- Limit: If product adds 50+ testimonials or case studies, DOM size grows linearly. Carousel scroll performance degrades.
- Scaling path: Implement pagination or windowed/virtualized rendering for large lists using React Virtual or similar library.

**Single Next.js Build Bundle Growing Without Code Splitting:**
- Current capacity: All components import animations and utilities directly. Bundle size not optimized.
- Limit: As more page routes are added, shared bundle grows. Each route pays the cost of unused components.
- Scaling path: Implement dynamic imports with `next/dynamic` for heavy components (carousels, calculators). Configure route-based code splitting.

**Image Assets Not Optimized or Cached:**
- Current capacity: All images loaded fresh on each page view; no CDN caching headers visible.
- Limit: If traffic increases, image bandwidth becomes expensive. LCP metric degrades.
- Scaling path: Add `Cache-Control` headers via `next.config.ts` for static image assets. Consider image optimization (WebP, srcset). Use CDN like Cloudflare or Vercel's image optimization.

## Dependencies at Risk

**Framer Motion and React Compatibility:**
- Risk: Framer Motion v12.23.26 is fairly recent. React 19.2.0 may introduce incompatibilities. No lock to specific minor version.
- Impact: If React updates, Framer Motion may break animation rendering, causing all motion components to fail.
- Migration plan: Keep `package-lock.json` strict versions. Monitor Framer Motion releases monthly. Have test suite (missing) to catch regressions.

**Tailwind CSS v4 CSS-in-JS Complexity:**
- Risk: Tailwind CSS v4 with `@tailwindcss/postcss` is newer. Custom colors and arbitrary values sprinkled throughout cause CSS duplication.
- Impact: If Tailwind CSS v5 arrives, custom PostCSS config may break.
- Migration plan: Consolidate custom styles into `tailwind.config.js`. Use CSS variables for dynamic colors instead of inline arbitrary values.

## Missing Critical Features

**No Error Boundary:**
- Problem: Single component crash (e.g., Testimonial carousel logic error) crashes entire page. No graceful degradation.
- Blocks: Users cannot recover from render errors without full page reload.
- Impact: Production errors are show-stoppers; user trust erodes.

**No Form Validation or Rate Limiting on "Book a Demo" Button:**
- Problem: `src/components/BookDemoButton.tsx` likely links to external service but no validation visible.
- Blocks: Cannot verify data quality or prevent spam submissions.
- Impact: Demo request queue polluted with bad data or bot traffic.

**No Accessibility Audit (a11y):**
- Problem: Components use some aria labels (Header.tsx lines 243, 117, 124) but no comprehensive WCAG 2.1 AA compliance.
- Blocks: Visually impaired users cannot navigate or understand content.
- Impact: Legal risk (ADA compliance), excludes users, poor SEO.

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: Animation timing logic, carousel state transitions, form submissions, color calculations in ImpactCalculator.
- Files: `src/components/` (all components), `src/utils/animations.ts`
- Risk: Edge cases (empty items, single item, rapid interactions) silently fail. Regressions ship to production.
- Priority: High

**No E2E Tests:**
- What's not tested: Navigation between pages, mobile menu open/close on real devices, carousel swipe on touch devices, responsive layout breakpoints.
- Files: All pages and navigation flows
- Risk: Layout breaks at specific viewport sizes or browser configurations discovered only after production deployment.
- Priority: High

**No Visual Regression Tests:**
- What's not tested: Color changes, component layout shifts, font rendering on different browsers, image load failures.
- Files: All components with visual styling
- Risk: Design intent slowly drifts without detection. Subtle alignment issues accumulate.
- Priority: Medium

**No Lighthouse CI / Performance Monitoring:**
- What's not tested: CLS (Cumulative Layout Shift), LCP (Largest Contentful Paint), FID (First Input Delay), SEO scores.
- Files: All pages
- Risk: Performance regressions go unnoticed. Core Web Vitals degrade silently.
- Priority: Medium

**No API Integration Tests (if applicable):**
- What's not tested: Environment variable loading, external service availability (Demo booking, etc.).
- Files: `src/app/layout.tsx` (env var usage)
- Risk: Missing env var discovered in production, not during CI/CD.
- Priority: Low (if no external API integrations present)

---

*Concerns audit: 2026-04-05*
