# AWS Cost Calculator

A web application to compare AWS service costs and configurations, helping you make informed decisions about AWS service options.

## Features

- **S3 Storage Tiers Comparison**: Compare costs across different S3 storage classes
- **RDS Aurora Comparison**: Compare Aurora configurations and pricing
- **Real-time AWS Pricing Data**: Fetches current pricing from AWS APIs

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tbobm/aws-comp.git
   cd aws-comp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/aws-comp/`

### Building

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Deployment

### Initial GitHub Pages Setup

Before the first deployment, you need to enable GitHub Pages for the repository:

1. **Make the repository public** (required for GitHub Pages on free plan):
   ```bash
   gh repo edit tbobm/aws-comp --visibility public
   ```

2. **Enable GitHub Pages via GitHub UI**:
   - Go to repository Settings → Pages
   - Under "Build and deployment", select:
     - Source: **GitHub Actions**
   - Save the settings

3. **Configure custom domain** (optional):
   - In Settings → Pages → Custom domain
   - Enter: `aws-comp.tbobm.dev`
   - DNS should already be configured (CNAME record pointing to `tbobm.github.io`)

### Automated Deployment

Once GitHub Pages is enabled, the application automatically deploys when changes are pushed to the `main` branch.

- **Production URL**: https://aws-comp.tbobm.dev
- **GitHub Pages**: https://tbobm.github.io/aws-comp/

The deployment is handled by GitHub Actions (see `.github/workflows/deploy.yml`).

### Manual Setup Script

```bash
#!/bin/bash
# setup-github-pages.sh - One-time setup for GitHub Pages

# Make repository public
echo "Making repository public..."
gh repo edit tbobm/aws-comp --visibility public

# Note: GitHub Pages must be enabled manually in repository settings
# Go to: https://github.com/tbobm/aws-comp/settings/pages
# Set Source to "GitHub Actions"

echo "✓ Repository is now public"
echo "→ Next: Enable GitHub Pages in repository settings"
echo "→ URL: https://github.com/tbobm/aws-comp/settings/pages"
```

## Project Structure

```
aws-comp/
├── src/
│   ├── components/     # React components
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
├── .github/
│   └── workflows/      # GitHub Actions workflows
└── ...config files
```

## License

MIT
