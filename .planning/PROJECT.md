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
- ✓ Redesign UI using frontend-designer skill for maximum visual appeal — v0.1
- ✓ Implement smooth animations and transitions throughout the interface — v0.1
- ✓ Enhance visual hierarchy to make cost differences immediately obvious — v0.1

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

**Current State (v0.1):**
- 2,013 lines of TypeScript across 25+ component files
- Framer Motion 12.25.0 animation system with 7 reusable variants
- Material Design theme enhanced with cost-specific semantic colors
- All core UI components redesigned with smooth animations
- 3-level elevation shadow system for visual hierarchy

**Current Architecture:**
- React 18.3.1 SPA with TypeScript
- Tailwind CSS 4.1.16 with enhanced Material Design theme
- Generic comparison framework using TypeScript generics
- Component-driven organization with local state management
- Static pricing data embedded at build time from AWS Pricing API

**Technical Environment:**
- Vite 6.0.5 for build and dev server
- Framer Motion 12.25.0 for animations
- Recharts 3.3.0 for data visualization
- React Router DOM 7.9.5 for navigation
- Deployed to GitHub Pages at `aws-comp.tbobm.dev`

**User Context:**
- Target audience: Potential users/customers evaluating AWS costs
- Primary use case: Compare different configurations to find cost savings
- Current state: UI is visually polished with smooth animations and clear visual hierarchy

## Constraints

*No hard constraints — freedom to choose the best approach for creating an attractive, interactive design experience.*

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use frontend-designer skill for UI rework | Specialized skill for creating distinctive, production-grade interfaces that avoid generic AI aesthetics | ✓ Good (v0.1) - Created polished, distinctive interface |
| Pure frontend redesign (no backend changes) | Maintain existing architecture and focus effort on user-facing experience | ✓ Good (v0.1) - Maintained all existing functionality |
| Interactive exploration as primary feature | Users learn by playing with parameters, animations guide attention to cost differences | — In Progress (Phase 3 planned) |
| Framer Motion variants approach | Declarative variants over inline animations for better reusability and consistency | ✓ Good (v0.1) - 7 reusable variants used across all components |
| Cost-specific semantic colors | Added savings=green, increase=red, neutral=gray for clear visual communication | ✓ Good (v0.1) - Immediate cost difference visibility |
| 3-level elevation shadow system | Material Design elevation (subtle/hover/active) for visual hierarchy | ✓ Good (v0.1) - Clear interactive feedback |
| Responsive animation strategy | Full on desktop, simplified on tablet, minimal on mobile with prefers-reduced-motion | ✓ Good (v0.1) - Accessible and performant |

---
*Last updated: 2026-01-09 after v0.1 milestone*
