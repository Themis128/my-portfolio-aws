# AWS Amplify CLI Deployment Guide

This guide provides multiple methods to deploy your portfolio to AWS Amplify via CLI/SDK instead of the web console.

## ✅ App Created Successfully!

Your Amplify app has been created with ID: **`d3gpsu0f51cpej`**

**Console URL:** https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1#/d3gpsu0f51cpej

**Live URL:** https://master.d3gpsu0f51cpej.amplifyapp.com

## 🚀 Deployment Status

**✅ CONFIGURATION FIXED AGAIN & RUNNING!**

Build Job ID: **7** - Status: **PENDING → RUNNING**

### Issues Fixed (Round 4):
1. ✅ **Backend Build Command**: Changed to `amplify build` (correct Amplify Gen 2 command)
2. ✅ **Output File Name**: Fixed to `amplify_outputs.json` (standard naming)
3. ✅ **Schema Generation**: `amplify build` generates all outputs automatically
4. ✅ **New Build Triggered**: Fresh build with proper Amplify Gen 2 workflow

### Current Build Process (Running Now):

1. **Repository Clone** - GitHub App authentication ✅
2. **pnpm Installation** - Global package manager ✅
3. **Amplify CLI Installation** - Required for Gen 2 ✅
4. **Backend Dependencies** - pnpm install ✅
5. **Backend Build** - `amplify build` (generates amplify_outputs.json) ✅
6. **Frontend Build** - Next.js with Amplify config ✅
7. **Production Deploy** - Both stacks ✅
6. **amplify-outputs.json** - Generated at root level for frontend ✅
7. **Frontend Build** - Next.js with pnpm ✅
8. **Production Deploy** - Both frontend and backend ✅
2. **Install pnpm** - Global package manager installation
3. **Install Dependencies** - Frontend & backend with pnpm
4. **Build Frontend** - Next.js compilation
5. **Build Backend** - Amplify Gen 2 schema generation
6. **Deploy** - Both frontend and backend to production
- **Expected Completion:** 5-10 minutes
- **Authentication:** GitHub App (Modern & Secure)

## 📋 Available Deployment Methods

### Step 3: Monitor Deployment

The build will start automatically. Monitor progress in the Amplify Console.

## 📋 Available Deployment Methods

## Method 1: Node.js Script with AWS SDK (Recommended)

### Prerequisites
```bash
# Install dependencies
npm install

# Configure AWS CLI (if not already done)
aws configure
```

### Deploy via Script
```bash
# Run the deployment script
npm run deploy:amplify
```

This script will:
- ✅ Create the Amplify app
- ✅ Connect to your GitHub repository
- ✅ Configure build settings
- ✅ Set environment variables
- ✅ Create the main branch
- ✅ Trigger the initial build

### Manual Node.js Usage
```javascript
const { createAmplifyApp } = require('./deploy-amplify.js');
createAmplifyApp().then(result => {
  console.log('Deployment complete:', result);
});
```

## Method 2: Bash Script with AWS CLI

### Prerequisites
```bash
# Make script executable
chmod +x deploy-amplify.sh

# Configure AWS CLI
aws configure
```

### Deploy via Bash Script
```bash
# Run the bash deployment script
./deploy-amplify.sh
```

## Method 3: Manual AWS CLI Commands

### Step 1: Create Amplify App
```bash
aws amplify create-app \
  --name "my-portfolio-aws" \
  --repository "https://github.com/Themis128/my-portfolio-aws" \
  --platform "WEB" \
  --enable-branch-auto-build true \
  --build-spec "version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*
backend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npx ampx pipeline-deploy --outputs-format json --outputs-path amplify-outputs.json
  artifacts:
    baseDirectory: amplify
    files:
      - 'amplify-outputs.json'"
```

### Step 2: Create Branch
```bash
aws amplify create-branch \
  --app-id "your-app-id" \
  --branch-name "master" \
  --enable-auto-build true \
  --stage "PRODUCTION"
```

### Step 3: Set Environment Variables
```bash
aws amplify update-app \
  --app-id "your-app-id" \
  --environment-variables "NODE_VERSION=20,PNPM_VERSION=9.14.4,NEXT_TELEMETRY_DISABLED=1"
```

### Step 4: Trigger Build
```bash
aws amplify start-job \
  --app-id "your-app-id" \
  --branch-name "master" \
  --job-type "RELEASE"
```

## Method 4: Amplify CLI (Legacy)

### Prerequisites
```bash
# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure
```

### Initialize and Deploy
```bash
# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting
amplify hosting add  # Choose "Amazon CloudFront and S3"

# Deploy
amplify publish
```

## Environment Variables Setup

After creating the app, set these environment variables via CLI:

```bash
# Get your app ID from the creation response
APP_ID="your-app-id-here"

# Set environment variables
aws amplify update-app \
  --app-id "$APP_ID" \
  --environment-variables "NODE_VERSION=20,PNPM_VERSION=9.14.4,NEXT_TELEMETRY_DISABLED=1"
```

## Verification

### Check App Status
```bash
# List your apps
aws amplify list-apps

# Get app details
aws amplify get-app --app-id "your-app-id"

# Check build status
aws amplify list-jobs --app-id "your-app-id" --branch-name "master"
```

### View Logs
```bash
# Get build logs
aws amplify get-job \
  --app-id "your-app-id" \
  --branch-name "master" \
  --job-id "job-id"
```

## Troubleshooting

### Common Issues

1. **Repository Access**: Ensure your GitHub token has repo access
2. **AWS Permissions**: Verify your IAM user has Amplify permissions
3. **Build Failures**: Check build logs and fix any dependency issues

### Useful Commands
```bash
# Delete app (if needed)
aws amplify delete-app --app-id "your-app-id"

# Update app settings
aws amplify update-app --app-id "your-app-id" --name "new-name"

# List branches
aws amplify list-branches --app-id "your-app-id"
```

## Automation

### CI/CD Integration
Add to your GitHub Actions workflow:

```yaml
- name: Deploy to Amplify
  run: |
    aws amplify start-job \
      --app-id ${{ secrets.AMPLIFY_APP_ID }} \
      --branch-name "master" \
      --job-type "RELEASE"
```

### Environment Variables in CI/CD
Store these as GitHub secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AMPLIFY_APP_ID`

## Cost Optimization

- **Build Timeouts**: Configure appropriate build timeouts
- **Caching**: Use build caching to speed up deployments
- **Branch Management**: Delete unused branches to reduce costs

## Security Best Practices

- Use IAM roles with minimal required permissions
- Rotate access keys regularly
- Enable branch protection rules
- Use environment-specific variables
- Monitor costs and usage

## Resources

- [AWS Amplify CLI Documentation](https://docs.aws.amazon.com/amplify/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)
- [Amplify Build Settings](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)