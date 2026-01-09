# Technology Stack

**Analysis Date:** 2026-01-09

## Languages

**Primary:**
- TypeScript 5.6.2 - All application code (`package.json`, `tsconfig.json`)

**Secondary:**
- JavaScript (ES Modules) - Build scripts, configuration files (`package.json` declares `"type": "module"`)

## Runtime

**Environment:**
- Node.js 20+ - Required runtime (specified in `.github/workflows/deploy.yml`)
- Browser - React application runs in browser

**Package Manager:**
- npm - Primary package manager
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - UI framework (`package.json`)
- React Router DOM 7.9.5 - Client-side routing (`src/App.tsx`)

**Testing:**
- Not detected - No test framework currently installed

**Build/Dev:**
- Vite 6.0.5 - Build tool and dev server (`vite.config.ts`)
- TypeScript Compiler (tsc) - Compilation to JavaScript
- @vitejs/plugin-react 4.3.4 - React integration for Vite

## Key Dependencies

**Critical:**
- recharts 3.3.0 - Data visualization for cost comparison charts (`src/components/ComparisonChart.tsx`)
- @aws-sdk/client-pricing 3.926.0 - AWS Pricing API integration (`scripts/pricing/fetch-pricing.ts`)

**Infrastructure:**
- react-router-dom 7.9.5 - Client-side navigation and routing
- tailwindcss 4.1.16 - Utility-first CSS framework with Material Design theme
- postcss 8.5.6 - CSS processing pipeline
- autoprefixer 10.4.21 - CSS vendor prefix automation

## Configuration

**Environment:**
- No .env files - Application is static/client-side only
- GitHub Actions Secrets - AWS credentials for pricing workflow (`AWS_REGION: eu-west-1`)
- Static pricing data - `data/pricing/aws-pricing.json` (version controlled)

**Build:**
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - Root TypeScript configuration with project references
- `tsconfig.app.json` - Application-specific TypeScript config (strict mode enabled)
- `tsconfig.node.json` - Build tools TypeScript configuration
- `tailwind.config.js` - Tailwind CSS content scanning and theme configuration
- `postcss.config.js` - PostCSS plugin configuration
- `eslint.config.js` - Modern flat config format for linting

## Platform Requirements

**Development:**
- Any platform (macOS/Linux/Windows) with Node.js 20+
- No external dependencies beyond npm packages
- No Docker or database required

**Production:**
- GitHub Pages - Static site hosting
- Custom domain: `aws-comp.tbobm.dev` (CNAME file)
- Automatic deployment via GitHub Actions on push to `main` branch
- No backend server required (SPA architecture)

---

*Stack analysis: 2026-01-09*
*Update after major dependency changes*
