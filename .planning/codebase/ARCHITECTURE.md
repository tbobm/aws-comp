# Architecture

**Analysis Date:** 2026-01-09

## Pattern Overview

**Overall:** Component-Driven Single-Page Application (SPA) with Generic Comparison Framework

**Key Characteristics:**
- React-based frontend with client-side routing
- Generic reusable comparison framework using TypeScript generics
- Static pricing data embedded at build time
- Feature-driven component organization
- Composition over inheritance pattern

## Layers

**Presentation Layer (`src/components/`):**
- Purpose: User interface and interaction handling
- Contains: React components for pages, forms, charts, and layouts
- Depends on: Business logic layer (calculators), type definitions
- Used by: React Router (routing layer)
- Examples: `LandingPage.tsx`, `S3Comparison.tsx`, `AuroraComparison.tsx`, `ComparisonLayout.tsx`

**Business Logic Layer (`src/utils/`):**
- Purpose: Core cost calculation algorithms
- Contains: Pure functions for pricing calculations and data transformations
- Depends on: Static pricing data (`data/pricing/aws-pricing.json`), type definitions
- Used by: Presentation layer components
- Examples: `s3Calculator.ts`, `rdsCalculator.ts`

**Type/Domain Layer (`src/types/`):**
- Purpose: TypeScript type definitions and service metadata
- Contains: Interfaces, type aliases, metadata constants
- Depends on: Nothing (pure type definitions)
- Used by: All other layers
- Examples: `comparison.ts` (generic), `s3.ts`, `rds.ts`

**Data Layer:**
- Purpose: Pricing data storage and retrieval
- Static: `data/pricing/aws-pricing.json` (pre-fetched pricing)
- Script: `scripts/pricing/fetch-pricing.ts` (AWS SDK pricing fetch)
- Depends on: AWS Pricing API (external)
- Used by: Business logic layer calculators

**Routing Layer (`src/App.tsx`):**
- Purpose: Application navigation and service registry
- Contains: React Router configuration, service metadata array
- Depends on: Presentation layer components
- Used by: React entry point (`src/main.tsx`)

## Data Flow

**User Configuration Flow:**

1. User lands on home page (`LandingPage.tsx`)
2. User selects service (S3 or Aurora) → navigates to service path
3. Service component renders (`S3Comparison.tsx` or `AuroraComparison.tsx`)
4. User modifies configuration in form (`S3ConfigForm.tsx`, `AuroraConfigForm.tsx`)
5. Form `onChange` callback updates parent component state
6. Parent calls calculator function (`calculateS3Costs`, `calculateAuroraCosts`)
7. Calculator looks up pricing from `aws-pricing.json` and computes costs
8. Result transformed to generic format via adapter (`s3CostToGeneric`, `auroraCostToGeneric`)
9. `ComparisonLayout` receives both configs and computed costs
10. Layout calculates savings and determines cheaper option
11. Results rendered in `ComparisonChart` (bar chart) and `CostBreakdown` (itemized list)

**State Management:**
- Local component state via React `useState` hooks
- No global state management (Redux, Context, etc.)
- Props drilling for data flow from parent to child components
- Form state managed in `ComparisonLayout` generic component

## Key Abstractions

**Generic Comparison Framework:**
- Purpose: Reusable UI framework for comparing two configurations of any service
- Location: `src/components/ComparisonLayout.tsx`
- Pattern: Composition with TypeScript generics `<TConfig, TBreakdown>`
- Usage: Both S3 and Aurora pass service-specific calculator and form components
- Benefits: Add new services by implementing calculator + form without duplicating comparison UI

**Cost Calculator Pattern:**
- Purpose: Service-specific pricing logic encapsulation
- Location: `src/utils/s3Calculator.ts`, `src/utils/rdsCalculator.ts`
- Pattern: Strategy pattern with adapter functions
- Functions:
  - `calculate*Costs(config)` → service-specific breakdown
  - `*CostToGeneric(breakdown)` → adapter to `GenericCostBreakdown`
- Benefits: Decouples calculator logic from UI, enables generic comparison framework

**Service Metadata Registry:**
- Purpose: Centralized service configuration for routing and navigation
- Location: `src/App.tsx` (`services` array)
- Pattern: Registry pattern
- Usage: Drives route creation and `LandingPage` service cards
- Benefits: Single source of truth for adding new services

**Metadata-Driven Configuration:**
- Purpose: Compile-time type-safe lookup tables for service options
- Location: Type definition files (`S3_TIER_METADATA`, `AURORA_INSTANCE_METADATA`)
- Pattern: Const objects with TypeScript `as const` for literal types
- Benefits: Dropdown options, descriptions, and constraints defined once

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Triggers: Browser navigation to site URL
- Responsibilities: Load React, fonts, render root div

**React Entry:**
- Location: `src/main.tsx`
- Triggers: HTML script execution
- Responsibilities: Create React root, render `<App />`, apply global styles

**App Component:**
- Location: `src/App.tsx`
- Triggers: React render from main.tsx
- Responsibilities: Define routes, register services, render React Router

**Route Handlers:**
- `/` → `LandingPage` (service discovery)
- `/s3` → `ServiceSelector` + `S3Comparison`
- `/aurora` → `ServiceSelector` + `AuroraComparison`
- `/*` → Navigate to `/` (catch-all redirect)

**Pricing Fetch Script:**
- Location: `scripts/pricing/fetch-pricing.ts`
- Triggers: `npm run fetch-pricing` or GitHub Actions weekly cron
- Responsibilities: Fetch AWS pricing, write to `data/pricing/aws-pricing.json`

## Error Handling

**Strategy:**
- Form validation at input level (range checks, positive numbers)
- No error boundaries in React components currently
- Calculator functions assume valid input (no defensive checks)
- Pricing fetch script has try/catch for AWS API errors

**Patterns:**
- Form validation: `useState` for error messages, `useEffect` for validation triggers
- Fallback values: Hardcoded pricing values in calculators as fallback (tech debt)
- Silent failures: Invalid pricing data results in NaN without user notification

## Cross-Cutting Concerns

**Logging:**
- Not implemented - No logging framework
- Console output in pricing fetch script only

**Validation:**
- Form-level validation in `S3ConfigForm.tsx` and `AuroraConfigForm.tsx`
- Basic range checks (min/max values, non-negative numbers)
- No schema validation for pricing data

**Styling:**
- Tailwind CSS utility classes throughout components
- Material Design theme with AWS-inspired colors
- Responsive design with `lg:`, `md:` modifiers
- Animations via Tailwind utilities (transitions, transforms)

**Type Safety:**
- TypeScript strict mode enabled
- Generic types for reusable components
- No `any` types or type assertions found

---

*Architecture analysis: 2026-01-09*
*Update when major patterns change*
