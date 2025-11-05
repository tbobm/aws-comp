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

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Production URL**: https://aws-comp.tbobm.dev
- **GitHub Pages**: https://tbobm.github.io/aws-comp/

The deployment is handled by GitHub Actions (see `.github/workflows/deploy.yml`).

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
