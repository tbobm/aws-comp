---
id: task-1.4
title: RDS Aurora Comparison UI
status: To Do
assignee: []
created_date: '2025-11-05 21:35'
updated_date: '2025-11-05 21:35'
labels: []
dependencies:
  - task-1.1
  - task-1.2
parent_task_id: task-1
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Build the RDS Aurora comparison interface for Serverless v2 vs Provisioned.

Includes:
- Form inputs for Aurora Serverless v2 (min/max ACU, storage, I/O, backup)
- Form inputs for Aurora Provisioned (instance type, storage, I/O, backup)
- Toggle to select Aurora Serverless v2 vs Provisioned for each side
- Pricing calculation logic based on JSON data
- Display cost breakdown by component (compute, storage, I/O, backup)
- Side-by-side comparison view
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 User can configure Aurora Serverless v2 parameters (ACU range, storage, etc.)
- [ ] #2 User can configure Aurora Provisioned parameters (instance type, storage, etc.)
- [ ] #3 User can compare Serverless v2 vs Provisioned or two variants of the same type
- [ ] #4 Calculated costs match AWS pricing calculator results within $0.01
- [ ] #5 Cost breakdown shows compute, storage, I/O, and backup costs separately
<!-- AC:END -->
