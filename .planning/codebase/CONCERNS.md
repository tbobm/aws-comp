# Codebase Concerns

**Analysis Date:** 2026-01-09

## Tech Debt

**Large form component:**
- Issue: `src/components/AuroraConfigForm.tsx` (302 lines) approaching complexity threshold
- Files: `src/components/AuroraConfigForm.tsx`
- Why: Handles both Serverless V2 and Provisioned deployment types in single component with conditional rendering
- Impact: Difficult to maintain, test, and understand logic flow between deployment types
- Fix approach: Split into `ServerlessV2ConfigForm.tsx` and `ProvisionedConfigForm.tsx` subcomponents

**Hardcoded pricing fallbacks in calculators:**
- Issue: Fixed pricing values hardcoded as fallbacks in calculator functions
- Files:
  - `src/utils/rdsCalculator.ts` (lines 12-50): `acuPricePerHour = 0.12`, `storagePricePerGB = 0.10`, `ioPricePerMillion = 0.20`
  - `src/utils/s3Calculator.ts` (lines 24-89): Hardcoded prices in switch statements (lines 32-46)
- Why: Quick fallback mechanism during initial development
- Impact: Pricing becomes stale without code updates; duplicates data from `aws-pricing.json`
- Fix approach: Remove hardcoded fallbacks and fail loudly if pricing data missing; forces proper error handling

**Repeated validation pattern:**
- Issue: Nearly identical validation pattern in both form components
- Files:
  - `src/components/AuroraConfigForm.tsx` (lines 18-45): useState + useEffect validation
  - `src/components/S3ConfigForm.tsx` (lines 14-35): useState + useEffect validation
- Why: Copy-paste implementation when adding second service
- Impact: Harder to maintain consistent validation logic across forms
- Fix approach: Extract into `useFormValidation` custom hook

**Duplicate cost breakdown components:**
- Issue: Two similar components with different prop structures
- Files:
  - `src/components/CostBreakdown.tsx`
  - `src/components/AuroraCostBreakdown.tsx`
- Why: Aurora needed slight variations in display
- Impact: Maintaining two versions of same logic
- Fix approach: Make `CostBreakdown.tsx` more generic to handle both cases

## Known Bugs

**No critical bugs identified** - Codebase is clean with no TODO/FIXME comments

## Security Considerations

**No security concerns identified:**
- No hardcoded secrets or credentials found
- AWS SDK credentials properly handled via GitHub Actions secrets
- No unsafe operations detected
- TypeScript strict mode provides type safety

## Performance Bottlenecks

**No significant performance issues identified:**
- Static site with pre-calculated pricing data
- Client-side only calculations (fast)
- Recharts may be slow with large datasets but current usage is minimal

## Fragile Areas

**Input validation relies on parseFloat fallback:**
- Files:
  - `src/components/AuroraConfigForm.tsx` (lines 22-45)
  - `src/components/S3ConfigForm.tsx` (lines 18-35)
- Why fragile: Validation uses `parseFloat` with fallback to 0, masking invalid input
- Common failures: User pastes text with special characters, silently converts to 0
- Safe modification: Add type checking before parseFloat, show error for non-numeric input
- Test coverage: None (no tests exist)

**Dynamic object keys in ComparisonChart:**
- File: `src/components/ComparisonChart.tsx` (lines 22-31)
- Why fragile: Dynamic keys created from `config1Label` and `config2Label` strings without type safety
- Common failures: Labels with spaces or special characters may cause unexpected behavior
- Safe modification: Sanitize labels or use fixed key names with separate label mapping
- Test coverage: None (no tests exist)

**Missing error boundary for API failures:**
- Files: All comparison components (no error boundaries present)
- Why fragile: If pricing data is malformed, calculator returns NaN without user notification
- Common failures: Broken calculations silently display as NaN
- Safe modification: Add React error boundaries and data validation
- Test coverage: None (no tests exist)

## Scaling Limits

**Single region pricing only:**
- Current capacity: EU (Ireland) region only
- Limit: Cannot compare costs for other AWS regions
- Symptoms at limit: Users in other regions see incorrect pricing
- Scaling path: Add region selector and fetch pricing for multiple regions

**Static pricing data:**
- Current capacity: Weekly automated refresh via GitHub Actions
- Limit: Pricing can be up to 7 days stale
- Symptoms at limit: Cost estimates may be slightly inaccurate
- Scaling path: Add real-time pricing fetch or daily refresh schedule

## Dependencies at Risk

**No deprecated dependencies identified:**
- All packages are actively maintained
- React 18, Vite 6, Tailwind 4 are current versions
- AWS SDK v3 is latest version

## Missing Critical Features

**No error boundaries:**
- Problem: React components lack error boundaries for graceful failure handling
- Current workaround: App crashes on unexpected errors
- Blocks: Production-ready error handling and user feedback
- Implementation complexity: Low (add ErrorBoundary component wrapper)

**No region selector:**
- Problem: Pricing hardcoded to EU (Ireland) only
- Current workaround: Users must manually adjust for their region
- Blocks: Accurate cost comparisons for non-EU users
- Implementation complexity: Medium (fetch pricing for multiple regions, add UI selector)

**No pricing data refresh timestamp:**
- Problem: Users don't know when pricing was last updated
- Current workaround: None - users assume pricing is current
- Blocks: User confidence in accuracy of cost estimates
- Implementation complexity: Low (display timestamp from `aws-pricing.json` metadata)

## Test Coverage Gaps

**Complete absence of tests:**
- What's not tested: All functionality (0% coverage)
- Risk: Cost calculations could break silently, form validation could fail
- Priority: High (especially for cost calculation accuracy)
- Difficulty to test: Low (pure functions are easy to test)

**Critical untested areas:**
- `src/utils/s3Calculator.ts` - Cost calculations (high risk if wrong)
- `src/utils/rdsCalculator.ts` - Cost calculations (high risk if wrong)
- Form validation in `S3ConfigForm.tsx` and `AuroraConfigForm.tsx`

---

*Concerns audit: 2026-01-09*
*Update as issues are fixed or new ones discovered*
