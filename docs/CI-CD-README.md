# CI/CD Pipeline Documentation

## Overview
This project uses AWS Amplify for continuous deployment with GitHub Actions for CI/CD automation.

## Architecture
- **Hosting**: AWS Amplify
- **Build Tool**: Next.js with static export
- **Package Manager**: pnpm
- **Testing**: Playwright for E2E tests
- **Linting**: ESLint
- **Type Checking**: TypeScript

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
Runs on every push and PR to master branch.

**Jobs:**
- **test**: Quality checks including linting, type checking, and Playwright tests

**Environment:**
- Node.js 20
- pnpm 9.14.4

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
Runs on pushes to master/main branches and manual dispatch.

**Jobs:**
- **quality-check**: Same checks as CI plus security audit
- **deploy**: Builds and deploys to Amplify (automatic via repo connection)

**Environment:**
- Node.js 20
- pnpm 9.14.4

### 3. Monitor Workflow (`.github/workflows/monitor.yml`)
Runs after successful deployments to perform health checks.

## Amplify Configuration

### Build Settings (`amplify.yml`)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm@9.14.4
        - pnpm install --frozen-lockfile
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: out  # Static export output
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - ~/.pnpm-store/**/*
      - .next/cache/**/*
```

### Environment Variables
- `NODE_VERSION`: 20
- `PNPM_VERSION`: 9.14.4
- `NEXT_TELEMETRY_DISABLED`: 1

## Deployment Process

1. **Code Push**: Push to master branch
2. **CI Checks**: GitHub Actions runs quality checks
3. **Amplify Build**: Amplify detects push and starts build
4. **Static Export**: Next.js builds static files to `out/` directory
5. **Deployment**: Files deployed to CloudFront CDN
6. **Health Check**: Post-deployment monitoring runs

## Troubleshooting

### Common Issues

#### Build Fails
- Check Node.js version consistency (should be 20)
- Verify pnpm version (9.14.4)
- Ensure dependencies are properly locked

#### Deployment Fails
- Check Amplify build logs in AWS Console
- Verify `amplify.yml` configuration
- Ensure static export is working: `pnpm run build`

#### Contact Form Issues
- Check Amplify configuration updates
- Verify GraphQL endpoint and API key
- Test API directly with curl

### Manual Deployment
If needed, use the deployment script:
```bash
npm run deploy:amplify
```

### Environment Variables
For local development, create `.env.local`:
```
NEXT_PUBLIC_AMPLIFY_ENV=dev
NEXT_PUBLIC_DOMAIN=master.dcwmv1pw85f0j.amplifyapp.com
```

## Security Considerations

- AWS credentials are managed via Amplify's built-in GitHub integration
- No secrets exposed in workflows
- Dependencies audited regularly
- CSP and security headers configured in `next.config.ts`

## Performance Monitoring

- Lighthouse scores tracked post-deployment
- Build times monitored via GitHub Actions
- Error tracking via Amplify console

## Future Improvements

- [ ] Add staging environment
- [ ] Implement blue-green deployments
- [ ] Add automated rollback capabilities
- [ ] Integrate with error tracking services
- [ ] Add performance regression detection