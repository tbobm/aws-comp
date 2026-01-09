# Coding Conventions

**Analysis Date:** 2026-01-09

## Naming Patterns

**Files:**
- PascalCase.tsx for React components (e.g., `ServiceSelector.tsx`, `ComparisonLayout.tsx`)
- camelCase.ts for utilities and types (e.g., `s3Calculator.ts`, `comparison.ts`)
- lowercase.ext for configuration (e.g., `vite.config.ts`, `tailwind.config.js`)
- *.test.ts for test files (none currently exist)

**Functions:**
- camelCase for all functions
- calculate* prefix for cost calculation functions (e.g., `calculateS3Costs`, `calculateAuroraCosts`)
- handle* prefix for event handlers (e.g., `handleNumberChange`, `handleTierChange`)
- *ToGeneric suffix for adapter functions (e.g., `s3CostToGeneric`, `auroraCostToGeneric`)
- get* prefix for getter/lookup functions (e.g., `getStoragePricePerGB`)

**Variables:**
- camelCase for variables (e.g., `config`, `breakdown`, `costs`, `storagePrice`)
- Plural for arrays (e.g., `services`, `items`)
- UPPER_SNAKE_CASE for constants (e.g., `TIER_STORAGE_CLASS_MAP`, `HOURS_PER_MONTH`, `S3_TIER_METADATA`)

**Types:**
- PascalCase for interfaces (e.g., `S3StorageConfig`, `AuroraServerlessV2Config`, `GenericCostBreakdown`)
- PascalCase for type aliases (e.g., `S3StorageTier`, `AuroraDeploymentType`, `AuroraInstanceType`)
- *Props suffix for React component props (e.g., `ServiceSelectorProps`, `S3ConfigFormProps`)
- No "I" prefix for interfaces (e.g., `GenericCostBreakdown`, not `IGenericCostBreakdown`)

## Code Style

**Formatting:**
- Indentation: 2 spaces (inferred from all source files)
- Quotes: Single quotes for strings (e.g., `'STANDARD'`, `'EU (Ireland)'`)
- Semicolons: Required at end of statements
- Line endings: LF (Unix-style)
- No explicit Prettier configuration detected

**Linting:**
- ESLint 9.17.0 with `eslint.config.js` (modern flat config format)
- Extends: @eslint/js recommended, typescript-eslint recommended
- Plugins: eslint-plugin-react-hooks (recommended rules), eslint-plugin-react-refresh
- TypeScript strict mode enabled
- Run: `npm run lint`

## Import Organization

**Order:**
1. External packages (react, react-router-dom, recharts)
2. Internal modules (type imports from `../types/`, utility imports from `../utils/`)
3. Type-only imports using `import type { }` syntax

**Grouping:**
- Type imports separated from value imports
- Type imports use `import type` for tree-shaking

**Path Aliases:**
- No path aliases configured (uses relative imports throughout)
- Relative imports: `../types/`, `../utils/`, `./`

**Example import pattern:**
```typescript
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import type { S3StorageConfig, S3CostBreakdown } from '../types/s3'
import { calculateS3Costs, s3CostToGeneric } from '../utils/s3Calculator'
```

## Error Handling

**Patterns:**
- Form validation using useState for error messages
- useEffect for validation triggers on config changes
- Validation functions return error strings or empty string
- No try/catch in UI components (validation only)
- Try/catch in pricing fetch script for AWS SDK errors

**Error Types:**
- Validation errors: String messages displayed in UI
- No custom error classes currently defined

## Logging

**Framework:**
- console.log in pricing fetch script only
- No logging framework in UI components

**Patterns:**
- No production logging
- Debug output in scripts during development

## Comments

**When to Comment:**
- Minimal comments - code is self-documenting
- Type annotations serve as documentation
- Complex logic has inline explanations where necessary

**JSDoc/TSDoc:**
- Not widely used
- No JSDoc comments found on public functions

**TODO Comments:**
- No TODO/FIXME/HACK comments found in codebase

## Function Design

**Size:**
- Most functions under 50 lines
- Exception: `AuroraConfigForm.tsx` (302 lines - large component)
- Extract helpers for complex logic

**Parameters:**
- Max 3-4 parameters typically
- Options object pattern used for complex configs (e.g., `S3StorageConfig`, `AuroraServerlessV2Config`)
- Destructuring in function signatures common

**Return Values:**
- Explicit return statements
- Return early for guard clauses
- Typed return values (no implicit any)

## Module Design

**Exports:**
- Default exports for React components
- Named exports for utilities and calculators
- Type definitions use named exports

**Example:**
```typescript
// Component (default export)
export default function ServiceSelector(props: ServiceSelectorProps) { }

// Utility (named export)
export function calculateS3Costs(config: S3StorageConfig): S3CostBreakdown { }

// Types (named export)
export type S3StorageTier = 'STANDARD' | 'INTELLIGENT_TIERING' | 'GLACIER_DEEP'
```

**Barrel Files:**
- Not used - no index.ts re-exports
- Direct imports from specific files

## TypeScript Configuration

**Strict Mode:**
- `strict: true` in `tsconfig.app.json`
- Additional checks:
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedSideEffectImports: true`

**Target:**
- ES2020 for modern JavaScript features
- ESNext module system with bundler resolution
- JSX: react-jsx (automatic JSX transform)

## Tailwind CSS Patterns

**Utility Classes:**
- Inline className attributes with descriptive utilities
- Responsive modifiers: `lg:`, `md:`, `sm:`
- State modifiers: `hover:`, `focus:`, `active:`
- Color semantics: `primary-600`, `neutral-900`, `success`, `secondary-500`
- Custom Material Design theme in `src/index.css`

**Example:**
```typescript
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
```

---

*Convention analysis: 2026-01-09*
*Update when patterns change*
