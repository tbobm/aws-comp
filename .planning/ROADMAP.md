# Roadmap: AWS Architecture Comparison Tool

## Overview

Transform the AWS Architecture Comparison Tool from functional to visually stunning. This journey focuses on pure frontend redesign — using the frontend-designer skill to create a distinctive, production-grade interface with smooth animations and interactive exploration features that make cost analysis both informative and delightful.

## Domain Expertise

None

## Milestones

- ✅ **[v0.1 Design Foundation & Component Redesign](milestones/v0.1-ROADMAP.md)** — Phases 1-2 (shipped 2026-01-09)
- 🚧 **v1.0 New Direction** — Phases 5-9 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>✅ v0.1 Design Foundation & Component Redesign (Phases 1-2) — SHIPPED 2026-01-09</summary>

- [x] **Phase 1: Design Foundation** - Create design system, visual language, and animation strategy
- [x] **Phase 2: Component Redesign** - Rebuild core UI components with new design system

See [v0.1 milestone archive](milestones/v0.1-ROADMAP.md) for full phase details.

</details>

### 🚧 v1.0 New Direction (In Progress)

**Milestone Goal:** Expand AWS comparison tool with compute services (Lambda, ECS), dark mode support, multi-scenario comparison with export capabilities, and unified cross-service cost analysis.

- [x] **Phase 5: Lambda Service Integration** - Add Lambda with invocation-based pricing and memory/duration configurations
- [x] **Phase 6: ECS Service Integration** - Add ECS with Fargate, EC2, and managed infrastructure pricing comparisons
- [x] **Phase 7: Dark Mode Theme** - Implement dark mode with theme toggle and persistent preference
- [ ] **Phase 8: Multi-Scenario Comparison & Export** - Enable creating multiple volume scenarios and exporting comparison graphs
- [ ] **Phase 9: Cross-Service Cost Analysis** - Unified cost comparison across all services with recommendations

## Phase Details

_Phases 1-2 details archived in [v0.1 milestone](milestones/v0.1-ROADMAP.md)_

### Phase 5: Lambda Service Integration
**Goal**: Add Lambda service with invocation-based pricing, memory/duration configurations, and cost calculations
**Depends on**: v0.1 milestone complete
**Research**: Likely (AWS Lambda pricing API, configuration options)
**Research topics**: Lambda pricing model (requests + duration), memory scaling costs, cold start considerations
**Plans**: TBD

Plans:
- [x] 05-01: Lambda Core Implementation - COMPLETE (2026-01-11)

### Phase 6: ECS Service Integration
**Goal**: Add ECS service supporting Fargate, EC2, and managed infrastructure pricing comparisons
**Depends on**: Phase 5
**Research**: Likely (ECS pricing models, Fargate vs EC2 cost calculations)
**Research topics**: ECS pricing tiers, Fargate vs EC2 cost structures, capacity provider strategies
**Plans**: 1 plan

Plans:
- [x] 06-01: ECS Core Implementation - COMPLETE (2026-01-13)

### Phase 7: Dark Mode Theme
**Goal**: Implement dark mode with theme toggle, dark-optimized colors, and persistent preference
**Depends on**: Phase 6
**Research**: Unlikely (applying existing Material Design theme patterns)
**Plans**: 1 plan

Plans:
- [x] 07-01: Dark Mode Implementation - COMPLETE (2026-01-13)

### Phase 8: Multi-Scenario Comparison & Export
**Goal**: Enable creating multiple volume scenarios (A, B, C) and exporting comparison graphs as downloadable images
**Depends on**: Phase 7
**Research**: Complete (recharts-to-png for chart export, Context API for multi-scenario state)
**Plans**: 3 plans (1/3 complete)

Plans:
- [x] 08-01: Chart Export Functionality - COMPLETE (2026-01-13)
- [ ] 08-02: Multi-Scenario State Management
- [ ] 08-03: Scenario Comparison UI

### Phase 9: Cross-Service Cost Analysis
**Goal**: Enable comparing costs across all services (RDS, S3, Aurora, Lambda, ECS) with unified recommendations
**Depends on**: Phase 8
**Research**: Unlikely (leveraging existing design system and cost calculation patterns)
**Plans**: TBD

Plans:
- [ ] 09-01: TBD (run /gsd:plan-phase 9 to break down)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 5 → 6 → 7 → 8 → 9

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Design Foundation | v0.1 | 1/1 | Complete | 2026-01-09 |
| 2. Component Redesign | v0.1 | 3/3 | Complete | 2026-01-09 |
| 5. Lambda Service Integration | v1.0 | 1/1 | Complete | 2026-01-11 |
| 6. ECS Service Integration | v1.0 | 1/1 | Complete | 2026-01-13 |
| 7. Dark Mode Theme | v1.0 | 1/1 | Complete | 2026-01-13 |
| 8. Multi-Scenario Comparison & Export | v1.0 | 1/3 | In progress | - |
| 9. Cross-Service Cost Analysis | v1.0 | 0/? | Not started | - |
