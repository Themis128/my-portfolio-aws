# Directory Structure

This document explains the organization of the Next.js portfolio project.

## Root Directory Structure

```
├── app/                    # Next.js App Router directory
├── components/             # React components
├── config/                 # Configuration files
│   ├── biome.jsonc        # Biome linter/formatter config
│   ├── commitlint.config.js # Commit message linting
│   ├── extensions.json    # VS Code extensions recommendations
│   └── lefthook.yml       # Git hooks configuration
├── docs/                   # Documentation files
│   ├── ARCHITECTURE.md
│   ├── AWS_AMPLIFY_SETUP.md
│   ├── CONTRIBUTING.md
│   ├── CONTRIBUTORS.md
│   ├── SECURITY.md
│   ├── THIRD-PARTY-NOTICES.md
│   ├── UNIFICATION_PLAN.md
│   └── VERSION_MANAGEMENT.md
├── lib/                    # Utility libraries and shared code
├── mcp-server/            # MCP (Model Context Protocol) server
├── public/                 # Static assets
├── styles/                 # Additional stylesheets
├── tests/                  # Test files and reports
│   ├── homepage.spec.ts   # Playwright test
│   └── reports/           # Test output reports
│       ├── playwright-report/
│       └── test-results/
├── .github/               # GitHub Actions and templates
├── .next/                 # Next.js build output (ignored)
├── node_modules/          # Dependencies (ignored)
└── *.config.*            # Next.js and build tool configs
```

## Key Directories

- **`app/`**: Next.js 13+ App Router pages and layouts
- **`components/`**: Reusable React components
- **`config/`**: Non-Next.js configuration files
- **`docs/`**: All project documentation
- **`lib/`**: Shared utilities, types, and business logic
- **`tests/`**: Test files and test output reports
- **`public/`**: Static assets served at root path
- **`styles/`**: Additional CSS files beyond globals.css

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `playwright.config.ts` - Playwright test configuration
- `turbo.json` - Turborepo configuration
- `components.json` - shadcn/ui configuration

## Development

- Run `npm run dev` to start development server
- Run `npm run build` to build for production
- Run `npm run lint` to run ESLint
- Run `npm test` to run tests

## Documentation

Additional documentation is available in the `docs/` directory:
- [Architecture](docs/ARCHITECTURE.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Security](docs/SECURITY.md)
- [AWS Amplify Setup](docs/AWS_AMPLIFY_SETUP.md)