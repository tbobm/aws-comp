# Testing Patterns

**Analysis Date:** 2026-01-09

## Current Testing Status

**NO TESTS CURRENTLY IMPLEMENTED**

- No test files found in codebase
- No test framework installed (no vitest, jest, @testing-library/react)
- No test configuration files exist
- This document provides recommendations for implementing tests

## Recommended Test Framework Setup

### Framework Choice: Vitest + React Testing Library

**Why this stack:**
- Vitest integrates natively with Vite (already used for building)
- No additional build configuration needed
- React Testing Library follows best practices (test behavior, not implementation)
- Fast execution with hot module replacement
- TypeScript support out of the box

### Installation Commands

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Recommended Configuration

### Create `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.test.ts', '**/*.test.tsx']
    }
  }
})
```

### Update `package.json` Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Recommended Test Structure

### Test File Organization

**Location:**
- Co-locate tests with source files using `.test.ts` or `.test.tsx` suffix
- Example: `src/utils/s3Calculator.test.ts` alongside `src/utils/s3Calculator.ts`

**Naming:**
- Unit tests: `fileName.test.ts` or `fileName.test.tsx`
- No separate tests/ directory - keep tests close to implementation

**Example Structure:**
```
src/
  components/
    ServiceSelector.tsx
    ServiceSelector.test.tsx
    S3ConfigForm.tsx
    S3ConfigForm.test.tsx
  utils/
    s3Calculator.ts
    s3Calculator.test.ts
    rdsCalculator.ts
    rdsCalculator.test.ts
  test/
    setup.ts              # Test configuration
    mocks/               # Mock data and factories
```

## Test Coverage Goals

**Recommended Targets:**
- Overall: 70%+ statement coverage
- Utilities: 90%+ (pure functions, critical for cost accuracy)
- Components: 80%+ (user-critical paths)
- Types: 0% (TypeScript provides compile-time validation)

### Testing Priority by Module

**1. Utilities (Highest Priority):**
- `src/utils/s3Calculator.ts` - Cost calculations must be accurate
- `src/utils/rdsCalculator.ts` - Cost calculations must be accurate
- Target: 100% coverage (every pricing scenario tested)

**2. Form Components (High Priority):**
- `src/components/S3ConfigForm.tsx` - Input validation critical
- `src/components/AuroraConfigForm.tsx` - Input validation critical
- Target: 80% coverage (focus on validation logic)

**3. Layout Components (Medium Priority):**
- `src/components/ComparisonLayout.tsx` - Generic framework
- `src/components/ComparisonChart.tsx` - Visualization
- Target: 70% coverage

**4. Page Components (Lower Priority):**
- `src/components/LandingPage.tsx` - Simple navigation
- `src/components/ServiceSelector.tsx` - UI only
- Target: 60% coverage (basic rendering tests)

## Recommended Test Patterns

### Unit Test Example (Utility Function)

```typescript
// src/utils/s3Calculator.test.ts
import { describe, it, expect } from 'vitest'
import { calculateS3Costs, s3CostToGeneric } from './s3Calculator'
import type { S3StorageConfig } from '../types/s3'

describe('s3Calculator', () => {
  describe('calculateS3Costs', () => {
    it('should calculate storage cost for STANDARD tier', () => {
      const config: S3StorageConfig = {
        tier: 'STANDARD',
        storageGB: 100,
        putRequests: 1000,
        getRequests: 5000,
        dataTransferGB: 50,
      }

      const result = calculateS3Costs(config)

      expect(result.storageCost).toBeGreaterThan(0)
      expect(result.totalCost).toBeGreaterThan(0)
    })

    it('should calculate different costs for different tiers', () => {
      const baseConfig = {
        storageGB: 100,
        putRequests: 0,
        getRequests: 0,
        dataTransferGB: 0,
      }

      const standard = calculateS3Costs({ ...baseConfig, tier: 'STANDARD' })
      const glacier = calculateS3Costs({ ...baseConfig, tier: 'GLACIER_DEEP' })

      expect(glacier.totalCost).toBeLessThan(standard.totalCost)
    })
  })
})
```

### Component Test Example (Form Validation)

```typescript
// src/components/S3ConfigForm.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import S3ConfigForm from './S3ConfigForm'

describe('S3ConfigForm', () => {
  it('should render all input fields', () => {
    const onChange = vi.fn()
    const config = {
      tier: 'STANDARD',
      storageGB: 100,
      putRequests: 1000,
      getRequests: 5000,
      dataTransferGB: 50,
    }

    render(<S3ConfigForm config={config} onChange={onChange} label="Config 1" />)

    expect(screen.getByLabelText(/Storage Tier/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Storage Size/i)).toBeInTheDocument()
  })

  it('should validate negative values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const config = {
      tier: 'STANDARD',
      storageGB: 100,
      putRequests: 1000,
      getRequests: 5000,
      dataTransferGB: 50,
    }

    render(<S3ConfigForm config={config} onChange={onChange} />)

    const storageInput = screen.getByLabelText(/Storage Size/i)
    await user.clear(storageInput)
    await user.type(storageInput, '-50')

    expect(screen.getByText(/cannot be negative/i)).toBeInTheDocument()
  })
})
```

## Test Types

**Unit Tests:**
- Scope: Test single function in isolation
- Mocking: Mock all external dependencies
- Speed: Fast (<100ms per test)
- Location: Co-located with source files

**Component Tests:**
- Scope: Test React component behavior
- Mocking: Mock data, user interactions via @testing-library/user-event
- Focus: User-visible behavior, accessibility

**Integration Tests (Future):**
- Scope: Test multiple components together
- Example: Full comparison flow (form → calculator → chart)
- Location: Could use separate `src/test/integration/` directory

**E2E Tests (Future - Optional):**
- Framework: Playwright or Cypress
- Scope: Full user workflows through browser
- Example: Navigate from landing page → configure → see results

## Coverage

**Run Commands:**
```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm run test:coverage       # Generate coverage report
open coverage/index.html    # View coverage report
```

**Configuration:**
- Provider: v8 (built into Vitest)
- Reporters: text (console), json (CI), html (browsing)
- Exclusions: node_modules, test files, setup files

## Next Steps to Implement Testing

1. **Install dependencies:** Run npm install command above
2. **Create vitest.config.ts:** Add configuration file
3. **Create test setup:** Add `src/test/setup.ts`
4. **Start with utilities:** Test `s3Calculator.ts` and `rdsCalculator.ts` first (highest ROI)
5. **Add component tests:** Test form validation in `S3ConfigForm` and `AuroraConfigForm`
6. **Increase coverage:** Aim for 70%+ overall coverage
7. **CI integration:** Add test step to `.github/workflows/deploy.yml`

## Summary

| Aspect | Status | Recommendation |
|--------|--------|----------------|
| **Framework** | None installed | Vitest + React Testing Library |
| **Coverage** | 0% | Target 70%+ (utilities 90%+) |
| **Organization** | N/A | Co-locate tests with source |
| **Priority** | N/A | Utilities → Forms → Components |
| **CI Integration** | No test step | Add to GitHub Actions workflow |

---

*Testing analysis: 2026-01-09*
*Update when test patterns are implemented*
