# AWS Architecture Comparison Tool

## What This Is

A web-based tool that helps users compare costs between different AWS service configurations (currently S3 and Aurora). Users can adjust parameters interactively and see real-time cost breakdowns and savings analysis. Built as a client-side React application deployed to GitHub Pages for potential users and customers.

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

### Active

- [ ] Redesign UI using frontend-designer skill for maximum visual appeal
- [ ] Implement smooth animations and transitions throughout the interface
- [ ] Add hover effects and micro-interactions for engaging user experience
- [ ] Create interactive exploration features (drill-down details, dynamic filtering, parameter adjustment)
- [ ] Enhance visual hierarchy to make cost differences immediately obvious
- [ ] Improve mobile/tablet responsiveness with polished touch interactions

### Out of Scope

- Backend/API changes — Keep existing data fetching and business logic as-is
- New AWS services — Stick with S3 and Aurora (no expansion to EC2, Lambda, etc.)
- Authentication or user accounts — No login, user management, or personalization
- Server-side logic — Maintain pure client-side SPA architecture
- Pricing data modifications — Keep existing weekly refresh workflow

## Context

**Current Architecture:**
- React 18.3.1 SPA with TypeScript
- Tailwind CSS 4.1.16 with Material Design theme
- Generic comparison framework using TypeScript generics
- Component-driven organization with local state management
- Static pricing data embedded at build time from AWS Pricing API

**Technical Environment:**
- Vite 6.0.5 for build and dev server
- Recharts 3.3.0 for data visualization
- React Router DOM 7.9.5 for navigation
- Deployed to GitHub Pages at `aws-comp.tbobm.dev`

**User Context:**
- Target audience: Potential users/customers evaluating AWS costs
- Primary use case: Compare different configurations to find cost savings
- Current pain point: UI is functional but not visually compelling enough to showcase

## Constraints

*No hard constraints — freedom to choose the best approach for creating an attractive, interactive design experience.*

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use frontend-designer skill for UI rework | Specialized skill for creating distinctive, production-grade interfaces that avoid generic AI aesthetics | — Pending |
| Pure frontend redesign (no backend changes) | Maintain existing architecture and focus effort on user-facing experience | — Pending |
| Interactive exploration as primary feature | Users learn by playing with parameters, animations guide attention to cost differences | — Pending |

---
*Last updated: 2026-01-09 after initialization*
