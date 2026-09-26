# Testing Patterns

**Analysis Date:** 2026-04-05

## Test Framework

**Status:** No testing framework installed or configured

**Missing Components:**
- No Jest, Vitest, or other test runner installed
- No `jest.config.*` or `vitest.config.*` files
- No test files found in codebase (`*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)
- No testing libraries installed (no @testing-library/react, @testing-library/jest-dom, etc.)

**Package.json Analysis:**
- `devDependencies` include only linting and build tools
- No test-related scripts (no `test`, `test:watch`, or `coverage` commands)
- ESLint configured but no testing setup

## Recommended Testing Strategy

**For Current Project State (No Tests):**

When testing framework is added, follow these recommendations based on project structure:

### Unit Testing

**Scope:** Individual component behavior and utility functions

**Components to test first:**
- `src/components/Button.tsx` - simple, pure component with variant prop logic
- `src/components/ExpandableText.tsx` - state management with truncation logic
- `src/utils/animations.ts` - animation config exports (no execution logic, but type correctness)
- Event handlers in `src/components/ImpactCalculator.tsx` - number parsing and state updates

**Pattern to use:**
```typescript
// Example structure for Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-[#a6ff48]');
  });

  it('renders with secondary variant when specified', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });
});
```

### Integration Testing

**Scope:** Component interactions and state management across components

**Components to test:**
- `src/components/Header.tsx` - navigation state, mobile menu toggle, scroll behavior
- `src/components/ImpactCalculator.tsx` - slider interactions, number parsing, calculation results
- `src/components/ExpandableText.tsx` - expand/collapse state with aria attributes

**Pattern to use:**
```typescript
// Example structure for Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText(/toggle menu/i);

    fireEvent.click(menuButton);
    expect(screen.getByText(/home/i)).toBeVisible();

    fireEvent.click(menuButton);
    // Menu should close
  });
});
```

### Event Handler Testing

**Approach for components like ImpactCalculator:**
```typescript
it('updates rent premium when slider changes', () => {
  render(<ImpactCalculator />);
  const slider = screen.getByRole('slider', { name: /choose rent premium/i });

  fireEvent.change(slider, { target: { value: '250' } });
  expect(screen.getByText(/\$250/)).toBeInTheDocument();
});
```

### Accessibility Testing

**Priority areas:**
- ARIA labels in `Header.tsx`: `aria-label`, `aria-expanded`, `aria-hidden`
- Interactive elements in `ExpandableText.tsx`: `aria-expanded`, `aria-label` on buttons
- Form inputs in `ImpactCalculator.tsx`: `htmlFor` labels, `id` attributes
- Image alt texts throughout (already properly implemented)

**Testing pattern:**
```typescript
it('expands text with accessible button', () => {
  render(<ExpandableText text={longText} />);
  const button = screen.getByRole('button');

  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});
```

## Test File Organization

**Recommended Structure:**
```
src/
├── components/
│   ├── Button.tsx
│   ├── Button.test.tsx          ← Co-located with component
│   ├── Header.tsx
│   ├── Header.test.tsx
│   └── ...
├── utils/
│   ├── animations.ts
│   ├── animations.test.ts       ← Co-located with utility
│   └── ...
└── app/
    ├── page.tsx
    └── page.test.tsx            ← Test for Home page
```

**Naming Convention:**
- Test files match component: `ComponentName.tsx` → `ComponentName.test.tsx`
- Alternative pattern: `ComponentName.spec.tsx` (less common in this project style)

## Test Structure Pattern

**Basic Suite Organization:**
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from '@/components/ComponentName';

describe('ComponentName', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<ComponentName />);
      expect(screen.getByRole('...')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('handles user interaction', () => {
      // Test user event
    });
  });

  describe('props', () => {
    it('applies variant prop correctly', () => {
      render(<ComponentName variant="secondary" />);
      // Assert variant styling
    });
  });
});
```

**Assertion Patterns:**
- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Avoid implementation details: not `getByTestId` unless necessary
- Common assertions:
  - `expect(element).toBeInTheDocument()`
  - `expect(element).toHaveClass('class-name')`
  - `expect(element).toHaveAttribute('aria-label', 'label')`
  - `expect(element).toHaveTextContent('text')`

## Mocking

**Not currently needed** but when framework is set up:

**Patterns to use:**
- Mock `next/image` for Image components
- Mock `next/link` for Link components (for unit tests)
- Mock `next/navigation` for `usePathname` hook in Header tests
- Don't mock framer-motion animations in unit tests - use real animations

**What NOT to mock:**
- React hooks (useState, useEffect) - test real hook behavior
- DOM APIs like window.addEventListener - test real event binding
- Tailwind classes - they're just strings in className

## Fixtures and Factories

**Test data for components:**

```typescript
// animations.test.ts - verify animation config shapes
const fadeInUpFixture: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75 } }
};

// Button.test.tsx - test all variant combinations
const buttonVariants = ['primary', 'secondary', 'outline', 'accent'] as const;
buttonVariants.forEach(variant => {
  it(`renders ${variant} variant`, () => { /* test */ });
});

// ImpactCalculator.test.tsx - fixture for table data
const amenityFixture = {
  amenityType: 'GatherUp Wellness',
  monthlyUsage: '60-80%',
  isElite: true
};
```

## Coverage

**Current Status:** Not applicable - no tests exist

**Recommended Target:**
- Minimum 60% statement coverage for initial setup
- 80%+ coverage for critical paths: Header navigation, form inputs, calculations
- Focus on integration tests over line coverage (better ROI for UI)

**Note:** Coverage metrics less important than test quality for a marketing website

## Test Types

**Unit Tests:**
- Test isolated components like `Button.tsx` with different props
- Test utility exports like `animations.ts` config correctness
- Simple assertions on props affecting output

**Integration Tests:**
- Test `Header.tsx` navigation with routing
- Test `ImpactCalculator.tsx` form interactions and calculations
- Test mobile menu interactions in Header
- Test state changes reflecting in UI

**E2E Tests:**
- Not recommended for current project scope (small marketing site)
- If needed later: use Playwright or Cypress for full page workflows
- Would test: header navigation, CTA button links, page loads

## Common Patterns

### Async Testing

**Currently minimal async logic**, but when needed:
```typescript
it('handles async operations', async () => {
  render(<Component />);
  const element = screen.getByText('Loading');

  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### Event Testing

**Standard pattern used frequently:**
```typescript
import userEvent from '@testing-library/user-event';

it('handles click events', async () => {
  const user = userEvent.setup();
  render(<Button>Click me</Button>);

  await user.click(screen.getByRole('button'));
  // Assert result
});
```

**For form inputs (as in ImpactCalculator):**
```typescript
it('updates state on input change', async () => {
  const user = userEvent.setup();
  render(<ImpactCalculator />);
  const input = screen.getByLabelText(/total units/i);

  await user.type(input, '500');
  expect(input).toHaveValue(500);
});
```

## Installation & Setup (Future)

**Recommended tools:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom typescript @types/jest
npm install --save-dev @testing-library/user-event
```

**Jest config to add:**
```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

**package.json scripts to add:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

*Testing analysis: 2026-04-05*

**Status:** Framework ready to be added. Recommend Jest + React Testing Library for project scale.
