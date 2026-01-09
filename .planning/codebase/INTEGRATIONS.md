# External Integrations

**Analysis Date:** 2026-01-09

## APIs & External Services

**AWS Pricing API:**
- AWS SDK Client for Pricing - Fetch current pricing data for AWS services
  - SDK/Client: @aws-sdk/client-pricing v3.926.0 (`package.json`)
  - Integration: `scripts/pricing/fetch-pricing.ts` (CLI script)
  - Auth: AWS credentials via GitHub Actions secrets (AWS_REGION: eu-west-1)
  - Endpoints used: GetProducts API for S3 and RDS Aurora pricing
  - Region: Hardcoded to EU (Ireland) only
  - Rate limits: Not specified (standard AWS API limits apply)
  - Scheduling: Weekly automated fetch via `.github/workflows/update-pricing.yml`

**Google Fonts:**
- Inter font family - Typography for UI
  - Integration: Direct HTML link in `index.html`
  - Weights: 300, 400, 500, 600, 700
  - Preconnect optimization for performance

## Data Storage

**Databases:**
- Not applicable - No database used (static site)

**File Storage:**
- GitHub Repository - Static pricing data storage
  - Location: `data/pricing/aws-pricing.json` (211KB)
  - Update mechanism: GitHub Actions workflow commits updated pricing
  - Versioned with git for historical tracking

**Caching:**
- Not applicable - No caching layer (browser cache only)

## Authentication & Identity

**Auth Provider:**
- Not applicable - No authentication required (public static site)

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service configured

**Analytics:**
- Not detected - No analytics tracking configured

**Logs:**
- GitHub Actions logs - Workflow execution logs (deployment, pricing updates)
  - Retention: Standard GitHub Actions retention policy

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Static site hosting
  - Deployment: Automatic on push to `main` branch (`.github/workflows/deploy.yml`)
  - Custom domain: `aws-comp.tbobm.dev` (CNAME file)
  - Artifact upload via GitHub Pages action

**CI Pipeline:**
- GitHub Actions - Build and deployment automation
  - Workflows:
    1. `.github/workflows/deploy.yml` - Build and deploy to GitHub Pages
    2. `.github/workflows/update-pricing.yml` - Weekly pricing data refresh
  - Node.js 20 setup for builds
  - Secrets: AWS credentials for pricing API access

## Environment Configuration

**Development:**
- No environment variables required for local development
- Run `npm install` to install dependencies
- Run `npm run dev` for Vite dev server on port 5173
- Mock/stub services: Uses static pricing data from `data/pricing/aws-pricing.json`

**Staging:**
- Not applicable - No staging environment (direct to production)

**Production:**
- No secrets required in production (static site)
- Pricing data embedded in build artifacts
- Deployed via GitHub Pages

## Webhooks & Callbacks

**Incoming:**
- Not applicable - No webhooks (static site)

**Outgoing:**
- Not applicable - No outgoing webhooks

## Data Update Mechanism

**Automated Pricing Refresh:**
- Workflow: `.github/workflows/update-pricing.yml`
- Schedule: Weekly (Sunday at midnight UTC) via cron
- Process:
  1. Fetches S3 storage pricing for EU (Ireland)
  2. Fetches RDS Aurora MySQL pricing for EU (Ireland)
  3. Writes to `data/pricing/aws-pricing.json`
  4. Auto-commits and pushes changes
- Manual trigger: Can be run manually via workflow_dispatch

---

*Integration audit: 2026-01-09*
*Update when adding/removing external services*
