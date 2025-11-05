---
id: task-1
title: AWS Cost Calculator
status: To Do
assignee: []
created_date: '2025-11-05 21:30'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Single-page web application for comparing AWS service pricing across different configurations. Users can select two different service configurations side-by-side and see detailed cost breakdowns.

Initial scope covers:
- S3 storage tiers (Standard, Infrequent Access, Glacier, etc.)
- RDS Aurora (Serverless v2 vs Provisioned)

Tech stack: Vite + React + TypeScript + Tailwind CSS, deployed to GitHub Pages at aws-comp.tbobm.dev. Pricing data fetched via AWS Price List API and stored as JSON, updated automatically via GitHub Actions.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Static site successfully deploys to GitHub Pages at aws-comp.tbobm.dev
- [ ] #2 Users can compare two different AWS service configurations side-by-side
- [ ] #3 Pricing calculations are accurate based on AWS Price List API data
- [ ] #4 UI is responsive and functional on desktop and mobile
- [ ] #5 Pricing data updates automatically via GitHub Actions
<!-- AC:END -->
