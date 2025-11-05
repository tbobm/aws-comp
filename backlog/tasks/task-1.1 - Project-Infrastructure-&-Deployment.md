---
id: task-1.1
title: Project Infrastructure & Deployment
status: In Progress
assignee:
  - claude
created_date: '2025-11-05 21:31'
updated_date: '2025-11-05 22:07'
labels: []
dependencies: []
parent_task_id: task-1
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Set up the foundational project structure and deployment pipeline for the AWS Cost Calculator.

Includes:
- Initialize Vite + React + TypeScript project
- Configure Tailwind CSS
- Set up GitHub Pages deployment workflow
- Configure custom domain (aws-comp.tbobm.dev)
- Create development and build scripts
- Basic project structure (components, utils, types folders)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Vite project initializes and runs locally with hot reload
- [x] #2 Tailwind CSS is configured and working
- [ ] #3 GitHub Actions workflow successfully builds and deploys to GitHub Pages
- [ ] #4 Site is accessible at aws-comp.tbobm.dev
- [x] #5 Development scripts (dev, build, preview) are documented in README
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### 1. Initialize Vite + React + TypeScript Project
- Run `npm create vite@latest . -- --template react-ts`
- Install dependencies with `npm install`
- Verify local dev server runs with hot reload

### 2. Configure Tailwind CSS
- Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- Initialize config: `npx tailwindcss init -p`
- Configure `tailwind.config.js` with content paths
- Add Tailwind directives to main CSS file
- Create a simple test component to verify Tailwind is working

### 3. Create Basic Project Structure
```
src/
├── components/     # React components
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component
```

### 4. Set Up GitHub Pages Deployment
- Create `.github/workflows/deploy.yml` workflow file
- Configure workflow to build and deploy to GitHub Pages
- Add `base` configuration to `vite.config.ts` for GitHub Pages path
- Enable GitHub Pages in repository settings

### 5. Configure Custom Domain
- Add `CNAME` file in `public/` directory with `aws-comp.tbobm.dev`
- Update GitHub repository settings to use custom domain

### 6. Documentation
- Create/update README.md with project description, setup instructions, and available scripts
<!-- SECTION:PLAN:END -->
