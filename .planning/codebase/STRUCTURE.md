# Codebase Structure

**Analysis Date:** 2026-01-09

## Directory Layout

```
aws-comp/
├── .github/            # GitHub Actions workflows
│   └── workflows/
├── .planning/          # GSD project planning (created by this command)
│   └── codebase/
├── data/               # Static data files
│   └── pricing/
├── public/             # Static assets (favicon, etc.)
├── scripts/            # Utility scripts
│   └── pricing/
├── src/                # Application source code
│   ├── components/     # React components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Business logic functions
├── index.html          # HTML entry point
├── package.json        # npm manifest
└── [config files]      # Build and tooling configuration
```

## Directory Purposes

**`.github/workflows/`:**
- Purpose: CI/CD automation
- Contains: GitHub Actions YAML workflow definitions
- Key files: `deploy.yml` (build and deploy), `update-pricing.yml` (weekly pricing fetch)
- Subdirectories: None

**`data/pricing/`:**
- Purpose: Static pricing data cache
- Contains: `aws-pricing.json` (211KB) - Pre-fetched AWS pricing for EU (Ireland)
- Key files: `aws-pricing.json` (last updated: 2025-11-08)
- Subdirectories: None

**`scripts/pricing/`:**
- Purpose: AWS pricing fetch automation
- Contains: TypeScript CLI script using AWS SDK
- Key files:
  - `fetch-pricing.ts` - Main pricing fetch logic
  - `types.ts` - Pricing data structure types
- Subdirectories: None

**`src/components/`:**
- Purpose: React UI components
- Contains: Page components, forms, charts, layouts (PascalCase.tsx files)
- Key files:
  - `LandingPage.tsx` - Home page with service cards
  - `ComparisonLayout.tsx` - Generic reusable comparison framework
  - `S3Comparison.tsx`, `AuroraComparison.tsx` - Service pages
  - `S3ConfigForm.tsx`, `AuroraConfigForm.tsx` - Configuration forms
  - `ComparisonChart.tsx` - Recharts visualization
  - `CostBreakdown.tsx`, `AuroraCostBreakdown.tsx` - Cost displays
  - `ServiceSelector.tsx` - Navigation breadcrumb
- Subdirectories: None (flat structure)

**`src/types/`:**
- Purpose: TypeScript type definitions and metadata
- Contains: Interfaces, type aliases, const metadata objects
- Key files:
  - `comparison.ts` - Generic comparison interfaces
  - `s3.ts` - S3 types and tier metadata
  - `rds.ts` - Aurora types and instance metadata
- Subdirectories: None

**`src/utils/`:**
- Purpose: Business logic and pure functions
- Contains: Cost calculation algorithms
- Key files:
  - `s3Calculator.ts` - S3 cost calculation and pricing lookup
  - `rdsCalculator.ts` - Aurora cost calculation
- Subdirectories: None

**`public/`:**
- Purpose: Static assets served at root
- Contains: Favicon, CNAME file for custom domain
- Key files: `CNAME` (custom domain configuration)
- Subdirectories: None

## Key File Locations

**Entry Points:**
- `index.html` - HTML entry point, loads React
- `src/main.tsx` - React DOM render entry point
- `src/App.tsx` - Main routing component with service registry
- `scripts/pricing/fetch-pricing.ts` - CLI pricing fetch script

**Configuration:**
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - Root TypeScript configuration with project references
- `tsconfig.app.json` - Application TypeScript config (strict mode)
- `tsconfig.node.json` - Build tools TypeScript config
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS pipeline
- `eslint.config.js` - ESLint flat config format
- `package.json` - npm dependencies and scripts

**Core Logic:**
- `src/utils/s3Calculator.ts` - S3 pricing calculations
- `src/utils/rdsCalculator.ts` - Aurora pricing calculations
- `src/components/ComparisonLayout.tsx` - Generic comparison framework
- `src/types/comparison.ts` - Shared type definitions

**Data:**
- `data/pricing/aws-pricing.json` - AWS pricing cache

**Documentation:**
- `README.md` - Project overview and setup instructions
- `CLAUDE.md` - Instructions for Claude Code (GSD integration)

## Naming Conventions

**Files:**
- PascalCase.tsx - React components (e.g., `ServiceSelector.tsx`, `ComparisonLayout.tsx`)
- camelCase.ts - Utilities and types (e.g., `s3Calculator.ts`, `comparison.ts`)
- lowercase.ext - Configuration files (e.g., `vite.config.ts`, `package.json`)
- UPPERCASE.md - Important documentation (e.g., `README.md`, `CLAUDE.md`)

**Directories:**
- kebab-case (if multi-word) - All directories
- Plural for collections: `components/`, `types/`, `scripts/`, `workflows/`
- Singular for specific purpose: `pricing/`

**Special Patterns:**
- *.test.ts - Test files (none exist currently)
- index.html - HTML entry point at root
- main.tsx - React entry point

## Where to Add New Code

**New AWS Service Comparison:**
- Type definitions: `src/types/{service}.ts` (e.g., `lambda.ts`)
- Calculator: `src/utils/{service}Calculator.ts` (e.g., `lambdaCalculator.ts`)
- Config form: `src/components/{Service}ConfigForm.tsx` (e.g., `LambdaConfigForm.tsx`)
- Comparison page: `src/components/{Service}Comparison.tsx` (e.g., `LambdaComparison.tsx`)
- Register service: Add to `services` array in `src/App.tsx`
- Tests: Co-locate `*.test.ts` files with source (if adding tests)

**New UI Component:**
- Implementation: `src/components/ComponentName.tsx`
- Types: Props interface in same file or `src/types/comparison.ts` if reusable
- Tests: `src/components/ComponentName.test.tsx` (if adding tests)

**New Utility Function:**
- Implementation: `src/utils/utilityName.ts`
- Types: `src/types/` if types are reusable across multiple files
- Tests: `src/utils/utilityName.test.ts` (if adding tests)

**Configuration Changes:**
- Build config: `vite.config.ts`
- TypeScript: `tsconfig.*.json`
- Styling: `tailwind.config.js`, `src/index.css` for global styles
- Linting: `eslint.config.js`

## Special Directories

**`.planning/`:**
- Purpose: GSD (Get Shit Done) project planning and codebase maps
- Source: Created by `/gsd:` slash commands
- Committed: Yes (tracked in git for project context)

**`data/`:**
- Purpose: Static data files versioned with code
- Source: Generated by `scripts/pricing/fetch-pricing.ts`
- Committed: Yes (pricing data embedded in deployments)

**`public/`:**
- Purpose: Static assets copied to build output root
- Source: Manually created files
- Committed: Yes
- Note: Files here served at root URL path (e.g., `/CNAME`, `/favicon.ico`)

---

*Structure analysis: 2026-01-09*
*Update when directory structure changes*
