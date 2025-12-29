# Local Testing Guide for Amplify Gen2 Portfolio

This document outlines the process for running local tests for the frontend and backend of the Amplify Gen2 portfolio application.

## Prerequisites

- Node.js 18+
- pnpm installed
- AWS CLI configured with valid credentials
- Amplify CLI installed
- Docker (for sandbox if needed)

## Starting the Amplify Sandbox

The Amplify sandbox provides a cloud-based local development environment for testing backend resources.

1. Install Amplify backend CLI globally:
   ```bash
   npm install -g @aws-amplify/backend-cli
   ```

2. Start the sandbox:
   ```bash
   npx ampx sandbox
   ```

   This will:
   - Deploy backend resources to a personal cloud sandbox
   - Generate/update `amplify_outputs.json` with sandbox endpoints
   - Watch for file changes and redeploy automatically

3. The sandbox runs in the background and provides isolated backend resources for each developer.

## Running Frontend Tests

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the Next.js development server:
   ```bash
   pnpm dev
   ```

   The server runs on `http://localhost:3000` and connects to the sandbox backend via `amplify_outputs.json`.

3. Run Playwright e2e tests for frontend:
   ```bash
   npx playwright test --project=chromium --grep-invert "MCP|Contact|Backend"
   ```

   This runs UI tests for homepage loading, navigation, and other frontend features.

## Running Backend Tests

1. Run Playwright tests for backend API:
   ```bash
   npx playwright test --project=backend-api
   ```

   This tests:
   - MCP server file operations
   - Contact form API submissions
   - Backend integration

## Syncing Frontend and Backend

- The frontend automatically uses the sandbox endpoints from `amplify_outputs.json`
- No manual sync required - the sandbox updates the config file
- Restart the dev server if the config changes during sandbox redeployment

## Troubleshooting

### Sandbox Issues
- Ensure AWS credentials are configured: `aws sts get-caller-identity`
- If sandbox fails to start, check for CDK errors in the output
- For data location errors, ensure `amplify/data/resource.ts` exists and imports are correct

### Test Issues
- If webServer fails, kill existing dev servers: `pkill -f "next dev"`
- Tests may be interrupted if the dev server stops
- Backend tests require the sandbox to be running for API endpoints

### Port Conflicts
- Frontend runs on port 3000 by default
- Change port if needed: `pnpm dev --port 3001`

## Stopping the Environment

1. Stop the sandbox: Press `Ctrl+C` in the sandbox terminal
2. Stop the dev server: Press `Ctrl+C` in the dev terminal
3. Clean up sandbox resources: `npx ampx sandbox delete` (optional, for cost savings)

## Notes

- The sandbox is cloud-based, not local (unlike Gen1 mock)
- Tests use Playwright for both API and UI testing
- Backend resources are isolated per developer/sandbox
- For production deployment, run `amplify push` after testing