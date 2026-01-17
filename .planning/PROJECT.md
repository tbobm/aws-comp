# AWS Architecture Comparison Tool

## What This Is

A web-based tool that helps users compare costs between different AWS service configurations (S3, Aurora, Lambda, ECS). Users can adjust parameters interactively and see real-time cost breakdowns and savings analysis with support for multiple comparison scenarios and chart exports. Built as a client-side React application with dark mode support, deployed to GitHub Pages for potential users and customers.

## Core Value

The comparison experience must be visually stunning and highly interactive — users should feel engaged exploring different configurations, with smooth animations and intuitive interactions that make cost analysis both informative and delightful.

## Requirements

### Validated

- ✓ AWS cost comparison for S3 and Aurora RDS — existing
- ✓ Generic comparison framework (reusable for adding services) — existing
- ✓ Real-time cost calculations with AWS pricing data — existing
- ✓ Side-by-side configuration and cost breakdown — existing
- ✓ Static site deployment to GitHub Pages — existing
- ✓ Cost breakdown charts with Recharts — existing
- ✓ Redesign UI using frontend-designer skill for maximum visual appeal — v0.1
- ✓ Implement smooth animations and transitions throughout the interface — v0.1
- ✓ Enhance visual hierarchy to make cost differences immediately obvious — v0.1
- ✓ Lambda serverless compute service integration with invocation-based pricing — v1.0
- ✓ ECS container service integration with Fargate vCPU/memory pricing — v1.0
- ✓ Dark mode theme with WCAG AA compliance and localStorage persistence — v1.0
- ✓ Chart export functionality with PNG download capability — v1.0
- ✓ Multi-scenario comparison mode supporting 2-4 concurrent scenarios — v1.0

### Active

- [ ] Add hover effects and micro-interactions for engaging user experience
- [ ] Create interactive exploration features (drill-down details, dynamic filtering, parameter adjustment)
- [ ] Improve mobile/tablet responsiveness with polished touch interactions

### Out of Scope

- Backend/API changes — Keep existing data fetching and business logic as-is
- New AWS services — Stick with S3 and Aurora (no expansion to EC2, Lambda, etc.)
- Authentication or user accounts — No login, user management, or personalization
- Server-side logic — Maintain pure client-side SPA architecture
- Pricing data modifications — Keep existing weekly refresh workflow

## Context

**Current State (v1.0):**
- 3,084 lines of TypeScript across 30+ component files
- Four fully integrated AWS services: S3, Aurora, Lambda, ECS
- Dark mode with Material Design theme and WCAG AA compliance
- Multi-scenario comparison supporting 2-4 concurrent configurations
- Chart export functionality with PNG downloads
- Framer Motion 12.25.0 animation system with 7+ reusable variants
- 3-level elevation shadow system for visual hierarchy

**Current Architecture:**
- React 18.3.1 SPA with TypeScript
- Tailwind CSS 4.1.16 with enhanced Material Design theme and dark mode
- Generic comparison framework using TypeScript generics
- Component-driven organization with local state management
- Theme management via Context API with localStorage persistence
- Static pricing data embedded at build time from AWS Pricing API

**Technical Environment:**
- Vite 6.0.5 for build and dev server
- Framer Motion 12.25.0 for animations
- Recharts 3.3.0 for data visualization with recharts-to-png 3.0.1 for exports
- React Router DOM 7.9.5 for navigation
- Deployed to GitHub Pages at `aws-comp.tbobm.dev`

**User Context:**
- Target audience: Potential users/customers evaluating AWS costs
- Primary use case: Compare different configurations to find cost savings, export comparisons, analyze multiple scenarios
- Current state: Fully functional cost comparison tool with compute (Lambda, ECS) and storage (S3, Aurora) services

## Constraints

*No hard constraints — freedom to choose the best approach for creating an attractive, interactive design experience.*

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use frontend-designer skill for UI rework | Specialized skill for creating distinctive, production-grade interfaces that avoid generic AI aesthetics | ✓ Good (v0.1) - Created polished, distinctive interface |
| Pure frontend redesign (no backend changes) | Maintain existing architecture and focus effort on user-facing experience | ✓ Good (v1.0) - Maintained through Lambda/ECS additions |
| Interactive exploration as primary feature | Users learn by playing with parameters, animations guide attention to cost differences | ✓ Good (v1.0) - Multi-scenario mode enables exploration |
| Framer Motion variants approach | Declarative variants over inline animations for better reusability and consistency | ✓ Good (v1.0) - Variants extended to Lambda/ECS services |
| Cost-specific semantic colors | Added savings=green, increase=red, neutral=gray for clear visual communication | ✓ Good (v1.0) - Maintained in dark mode |
| 3-level elevation shadow system | Material Design elevation (subtle/hover/active) for visual hierarchy | ✓ Good (v1.0) - Works in both light/dark themes |
| Responsive animation strategy | Full on desktop, simplified on tablet, minimal on mobile with prefers-reduced-motion | ✓ Good (v1.0) - Accessible and performant |
| .dark class approach for theme control | Manual toggle support vs media query only | ✓ Good (v1.0) - Enables user preference override |
| localStorage theme persistence | Theme persists without authentication | ✓ Good (v1.0) - Seamless UX across sessions |
| Local useState for multi-scenario state | Simple page-local state vs external library | ✓ Good (v1.0) - Sufficient for current needs |
| Max 4 scenarios constraint | Maintain chart readability | ✓ Good (v1.0) - Prevents visual clutter |

---
*Last updated: 2026-01-17 after v1.0 milestone*
