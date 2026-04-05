# Coding Conventions

**Analysis Date:** 2026-04-05

## Naming Patterns

**Files:**
- Components: PascalCase with .tsx extension (e.g., `Button.tsx`, `Header.tsx`, `ImpactCalculator.tsx`)
- Utilities: camelCase with .ts extension (e.g., `animations.ts`)
- Pages (Next.js): lowercase with index pattern (e.g., `src/app/page.tsx`, `src/app/about-us/page.tsx`)
- No file suffixes like `.component.tsx` or `.util.ts` - extension alone indicates type

**Functions:**
- React components: PascalCase (e.g., `Button`, `Header`, `ImpactCalculator`)
- Regular functions and hooks: camelCase (e.g., `handleUnitsChange`, `formatCurrency`, `updateHeaderHeight`)
- Event handlers: prefix with `handle` or callback descriptors (e.g., `handleScroll`, `onClick`, `onFocus`)

**Variables:**
- State variables: camelCase (e.g., `mobileMenuOpen`, `rentPremium`, `isHeaderVisible`)
- Constants: camelCase or UPPERCASE for truly immutable values
- Boolean variables: prefix with `is`, `has`, or `should` (e.g., `isExpanded`, `shouldTruncate`, `isActive`, `isSolutionsActive`)
- CSS color constants: camelCase within objects (e.g., `primary`, `secondary`, `tertiary`, `textLight`)
- Loop indices: single letters only in simple map operations (e.g., `index` preferred over `i`)

**Types:**
- Interface names: PascalCase ending with `Props` (e.g., `ButtonProps`, `BookDemoButtonProps`, `ExpandableTextProps`)
- Generic type parameters: PascalCase (e.g., `T`, `K`, `V` for standard; descriptive like `FC` for React.FC)
- Type aliases: PascalCase (e.g., `Variants`, `Transition`)

## Code Style

**Formatting:**
- Tailwind CSS for all styling - inline utility classes in className
- Inline style objects for dynamic values only (e.g., colors from state, computed styles)
- No separate CSS files except global `globals.css`
- Global styles use `@import "tailwindcss"` with CSS variables for theme
- CSS variables defined in `:root` for colors (e.g., `--primary`, `--accent`, `--background`)

**Linting:**
- ESLint with Next.js core-web-vitals config and TypeScript support
- Config file: `eslint.config.mjs` (flat config format)
- Rules enforce Next.js best practices (e.g., Image optimization, Link usage)
- No custom rules beyond Next.js defaults - defaults sufficient for project

**Line Length:**
- Soft preference for readability - no hard limit enforced
- className strings often exceed 80 chars with Tailwind utilities (acceptable)
- JSX spread across lines when needed for readability

## Import Organization

**Order:**
1. React/Next.js imports (`import React`, `import { useState }`, etc.)
2. Next.js-specific imports (`import Link`, `import Image`, `import { usePathname }`)
3. Third-party library imports (`import { motion }`, `import { lucide-react }`)
4. Local relative imports (`import { Button } from './Button'`)
5. Alias imports from `@/` (e.g., `import { fadeInUp } from '@/utils/animations'`)

**Path Aliases:**
- `@/*` maps to `./src/*` via `tsconfig.json`
- Use `@/` for all local absolute imports to avoid relative paths
- Example: `@/components/Button`, `@/utils/animations`, `@/app/page`

**No barrel files** - imports directly reference source files:
- Do NOT: `import { Button } from '@/components'`
- DO: `import { Button } from '@/components/Button'`

## Error Handling

**Patterns:**
- No explicit try-catch blocks detected in codebase
- React error boundaries not implemented (Next.js error.tsx pattern available but unused)
- Form validation: inline with `parseInt()`, `parseFloat()` with fallback to `0` or `||` operator
- Number parsing includes safety checks: `const value = parseInt(e.target.value) || 0`
- DOM element access uses optional chaining: `headerRef.current?.offsetHeight`
- React refs use TypeScript generics: `useRef<HTMLElement>(null)` or `useRef<HTMLInputElement>(null)`

**Recommended approach:**
- Input validation happens synchronously in event handlers
- State mutations guarded with safe parsing and defaults
- No promise chains or async error handling currently needed (all components are synchronous)

## Logging

**Framework:** `console` object (no logging library)

**Patterns:**
- Minimal logging - no logs found in source code
- Assume debugging happens via browser DevTools
- If logging needed: use `console.log()`, `console.warn()`, `console.error()`
- No structured logging or environment-specific log levels

## Comments

**When to Comment:**
- Explain business logic or non-obvious calculations
- Example: `src/components/ImpactCalculator.tsx` includes comments on color constants and calculation logic
- React component comments explain UI sections (e.g., "Mobile Image", "Desktop Image", "Overlay to ensure text readability")

**JSDoc/TSDoc:**
- Not used in this codebase
- Component function signatures are type-safe via TypeScript Props interfaces
- No parameter documentation comments needed due to interface clarity

## Function Design

**Size:**
- Most components under 100 lines
- Larger components (200-450 lines) for complex layouts like `Header.tsx`, `ImpactCalculator.tsx`
- Favor single-responsibility: separate header logic from mobile menu logic within same component when state is shared

**Parameters:**
- React components use Props interface pattern:
  ```typescript
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'outline' | 'accent';
      children: React.ReactNode;
  }
  export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {}
  ```
- Destructure all props at component level
- Provide default values in destructuring for optional props

**Return Values:**
- React components return JSX elements (not fragments unless needed)
- Utility functions return typed values (e.g., `Variants` for animation configs, `string` for format functions)
- Event handlers return `void`
- No implicit returns of undefined - always return JSX or explicit values

## Module Design

**Exports:**
- Named exports preferred: `export const Button: React.FC<ButtonProps>`
- Single export per file (one component per file)
- Utilities export multiple functions as named exports (e.g., `animations.ts` exports `fadeInUp`, `staggerContainer`, etc.)

**Barrel Files:**
- NOT used - see Path Aliases section
- Direct imports required for all modules

**Component Structure:**
- Single component per .tsx file
- Props interface defined above component (when needed)
- Component function signature immediately after imports and interfaces
- JSX body follows
- Example order: imports → interfaces → component declaration → JSX

## Spacing and Indentation

**Standard:**
- 4 spaces for indentation (consistent across TypeScript and JSX)
- Single blank line between logical sections within components
- Two blank lines between top-level functions/exports in utility files
- No trailing whitespace

## Quotes

**Style:**
- Single quotes for string literals: `'use client'`, `'primary'`
- Double quotes for HTML attributes and JSX: `className="..."`, `href="..."`
- Template literals for computed strings: `` className={`${base} ${dynamic}`} ``

## Semicolons

**Enforced:**
- Semicolons required at end of statements
- Part of TypeScript/ESLint default configuration

## React-Specific Conventions

**Client Components:**
- Use `'use client'` directive at top of file for interactive components with hooks
- Example: `src/components/Header.tsx`, `src/components/ExpandableText.tsx`

**Server Components:**
- Default in Next.js 13+ app directory
- No `'use client'` directive means server-side rendering
- Used for pages and layout.tsx (e.g., `src/app/layout.tsx`)

**Props Spreading:**
- Common pattern with HTML extensions: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`
- Allows: `<button {...props}>`
- Safe propagation of standard HTML attributes

**Fragment Usage:**
- Rare - only when multiple top-level elements needed
- Example: `src/components/Header.tsx` uses `<>` for header + mobile menu overlay + mobile menu

**useCallback/useMemo:**
- Not used in current codebase
- Optimization not currently needed for component complexity level

---

*Convention analysis: 2026-04-05*
