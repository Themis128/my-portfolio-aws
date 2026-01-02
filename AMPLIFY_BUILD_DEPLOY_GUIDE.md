# AWS Amplify Gen 2 Build & Deploy Guide

This comprehensive guide walks you through building and deploying your Next.js portfolio application using AWS Amplify Gen 2, based on your specific project configuration.

## 📋 **Prerequisites & Setup**

### **Required Tools**
- **Node.js**: v18.17 or later (you have v18+)
- **npm**: v9 or later (you have pnpm)
- **git**: v2.14.1 or later
- **AWS Account**: With appropriate permissions

### **AWS Permissions Required**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:*",
        "appsync:*",
        "cognito-idp:*",
        "cognito-identity:*",
        "dynamodb:*",
        "lambda:*",
        "s3:*",
        "cloudfront:*",
        "route53:*",
        "acm:*",
        "cloudwatch:*",
        "logs:*",
        "iam:*"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 🏗️ **Phase 1: Local Development Environment**

### **1. Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
# or with pnpm
pnpm add -g @aws-amplify/cli
```

### **2. Configure AWS Profile**
```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, default region (eu-central-1), and output format
```

### **3. Initialize Amplify in Your Project**
```bash
cd /home/tbaltzakis/my-portfolio-aws
ampx init
```

### **4. Start Local Development Server**
```bash
# Install dependencies
pnpm install --frozen-lockfile

# Start development server
pnpm run dev
```

### **5. Test Backend Locally (Sandbox Environment)**
```bash
# Start a personal cloud sandbox environment
npx ampx sandbox

# This creates:
# - GraphQL API (AWS AppSync)
# - Database (Amazon DynamoDB)
# - Authentication (Amazon Cognito)
# - Functions (AWS Lambda)
# - Storage (Amazon S3)

# The sandbox will output amplify_outputs.json with local endpoints
```

---

## 🔧 **Phase 2: Backend Development & Testing**

### **1. Define Your Backend Resources**

Your backend is already configured in `amplify/backend.ts`:

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { analyticsHandler } from './functions/analytics-handler/resource';
import { dailyReminder } from './functions/daily-reminder/resource';
import { weeklyDigest } from './functions/weekly-digest/resource';
import { sayHello } from './functions/say-hello/resource';
import { slackHandler } from './functions/slack-handler/resource';

const backend = defineBackend({
  auth,
  data,
  contactHandler,
  slackHandler,
  analyticsHandler,
  sayHello,
  weeklyDigest,
  dailyReminder,
});
```

### **2. Test Backend Functions Locally**

#### **Lambda Functions**
```bash
# Test individual functions
npx ampx sandbox --outputs-format json

# View function logs
npx ampx sandbox --logs

# Test specific function
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
```

#### **GraphQL API Testing**
```bash
# Test GraphQL endpoint
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ sayHello { message } }"}'
```

#### **Authentication Testing**
```bash
# Test auth endpoints
# Use Amplify Studio or console to test authentication flows
```

### **3. Validate Data Models**

Test your data models defined in `amplify/data/resource.ts`:

```typescript
// Test contact form submission
mutation SendContact($name: String!, $email: String!, $message: String!) {
  sendContact(name: $name, email: $email, message: $message)
}

// Test analytics tracking
mutation TrackAnalytics($eventType: String!, $page: String) {
  trackAnalytics(eventType: $eventType, page: $page)
}

// Test AI conversation
query Chat($message: String!) {
  chat(message: $message) {
    response
  }
}
```

---

## 📦 **Phase 3: Frontend Build Process**

### **1. Configure Build Settings**

Your `amplify.yml` is already optimized:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install --frozen-lockfile
        - echo "Installing dependencies with pnpm"
        - echo "=== Checking environment variables ==="
        - "echo \"NEXT_PUBLIC_GA_MEASUREMENT_ID: ${NEXT_PUBLIC_GA_MEASUREMENT_ID:-NOT_SET}\""
    build:
      commands:
        - echo "Building optimized Next.js application..."
        - pnpm run build
        - echo "Build completed successfully"
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - node_modules/**/*
      - ~/.cache/**/*

buildTypes:
  - type: BUILD
    computeType: BUILD_GENERAL1_3XLARGE
    environmentVariables:
      NEXT_TELEMETRY_DISABLED: "1"
      NODE_OPTIONS: "--max-old-space-size=20480"
      GENERATE_SOURCEMAP: "false"
      NEXT_WEBPACK_USEPOLLING: "false"
```

### **2. Local Build Testing**
```bash
# Test production build locally
pnpm run build

# Start production server
pnpm start

# Test PWA functionality
pnpm test:pwa
```

### **3. Optimize Build Performance**

Your configuration already includes:
- **Large compute instance**: BUILD_GENERAL1_3XLARGE
- **Memory optimization**: 20GB heap size
- **Telemetry disabled**: Faster builds
- **Source maps disabled**: Smaller bundles
- **Polling disabled**: Better performance

---

## 🚀 **Phase 4: Deployment to AWS Amplify**

### **Method 1: Git-Based Deployment (Recommended)**

#### **1. Prepare Your Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### **2. Connect to Amplify Console**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"Create new app"**
3. Choose **"Host your web app"**
4. Select **GitHub** as repository provider
5. Authorize AWS Amplify to access your GitHub account
6. Select your repository and branch (main)
7. Configure build settings (use amplify.yml)
8. Click **"Save and deploy"**

#### **3. Environment Variables Setup**
In Amplify Console > App settings > Environment variables:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=20480
```

#### **4. Custom Domain Setup (Optional)**
```bash
# If using custom domain
amplify add domain
# Follow prompts to add cloudless.gr
```

### **Method 2: CLI-Based Deployment**
```bash
# Initialize Amplify app
ampx init

# Add hosting
ampx add hosting

# Deploy
ampx deploy
```

### **Method 3: Manual Upload (Development Only)**
```bash
# Build the application
pnpm run build

# Create ZIP file
cd .next && zip -r ../build.zip . && cd ..

# Upload via Amplify Console
# 1. Go to Amplify app
# 2. Click "Deploy manually"
# 3. Upload build.zip
```

---

## 🌍 **Phase 5: Environment Management**

### **1. Development Environment**
```bash
# Deploy to dev branch
git checkout -b dev
git push origin dev

# In Amplify Console, create dev environment
# Environment name: dev
# Branch: dev
```

### **2. Staging Environment**
```bash
# Deploy to staging branch
git checkout -b staging
git push origin staging

# In Amplify Console, create staging environment
# Environment name: staging
# Branch: staging
```

### **3. Production Environment**
```bash
# Deploy to main branch (already configured)
git checkout main
git push origin main

# Production environment is automatically created
```

### **4. Environment Variables per Environment**

**Development:**
```
NODE_ENV=development
NEXT_PUBLIC_ENV=dev
DEBUG=true
```

**Staging:**
```
NODE_ENV=production
NEXT_PUBLIC_ENV=staging
DEBUG=false
```

**Production:**
```
NODE_ENV=production
NEXT_PUBLIC_ENV=prod
DEBUG=false
```

---

## 🔐 **Phase 6: Secrets & Environment Variables**

### **1. Sensitive Data Management**

Use Amplify Console for secrets:
1. Go to App > Hosting > Secrets
2. Add secrets for each environment:
   - `SLACK_WEBHOOK_URL`
   - `GITHUB_TOKEN`
   - `DATABASE_URL` (if needed)
   - `API_KEYS`

### **2. Environment Variables in Code**

```typescript
// Access environment variables in Next.js
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const environment = process.env.NEXT_PUBLIC_ENV;

// Access secrets in Lambda functions
import { secret } from '@aws-amplify/backend';

export const slackHandler = defineFunction({
  // Access secrets
  environment: {
    SLACK_WEBHOOK_URL: secret('SLACK_WEBHOOK_URL'),
  },
});
```

### **3. Build-Time Variables**

Configure in `amplify.yml`:
```yaml
build:
  commands:
    - echo "GA_ID=$GA_MEASUREMENT_ID" >> .env.local
    - echo "ENV=$ENVIRONMENT" >> .env.local
```

---

## 🔍 **Phase 7: Testing & Validation**

### **1. Automated Testing**
```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run Playwright tests
npx playwright test
```

### **2. Manual Testing Checklist**

#### **Frontend Testing**
- [ ] Page loads correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] PWA features work
- [ ] Mobile responsiveness

#### **Backend Testing**
- [ ] Authentication works
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] File uploads work
- [ ] AI features work

#### **Integration Testing**
- [ ] Contact form integration
- [ ] Slack notifications
- [ ] Analytics tracking
- [ ] Email sending

### **3. Performance Testing**
```bash
# Test build performance
time pnpm run build

# Test Lighthouse scores
npx lighthouse https://your-app-url.amplifyapp.com

# Test Core Web Vitals
# Use Chrome DevTools or WebPageTest
```

---

## 📊 **Phase 8: Monitoring & Maintenance**

### **1. CloudWatch Monitoring**

#### **Enable Logging**
```typescript
// In Lambda functions
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'contactHandler' });

export const handler = async (event) => {
  logger.info('Processing contact form', { event });

  try {
    // Your logic here
    logger.info('Contact form processed successfully');
  } catch (error) {
    logger.error('Error processing contact form', { error });
  }
};
```

#### **Monitor Metrics**
- API Gateway latency
- Lambda function errors
- DynamoDB read/write capacity
- CloudFront cache hit rates

### **2. Error Tracking (Sentry)**

Your project already includes Sentry:
```typescript
// sentry.client.config.js & sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Additional config
});
```

### **3. Backup & Recovery**

#### **Database Backups**
- DynamoDB automatic backups
- Point-in-time recovery
- Cross-region replication (if needed)

#### **File Backups**
- S3 versioning enabled
- Lifecycle policies for cost optimization

---

## 🚨 **Phase 9: Troubleshooting**

### **Common Build Issues**

#### **Build Fails Due to Memory**
```yaml
# Increase memory in amplify.yml
environmentVariables:
  NODE_OPTIONS: "--max-old-space-size=20480"
```

#### **Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install --frozen-lockfile
```

#### **Environment Variables Not Loading**
```yaml
# Check amplify.yml variable piping
build:
  commands:
    - echo "VARIABLE_NAME=$VARIABLE_NAME" >> .env.local
```

### **Common Deployment Issues**

#### **Backend Deployment Fails**
```bash
# Check CloudWatch logs
npx ampx logs

# Check backend status
npx ampx status
```

#### **Frontend Deployment Fails**
```bash
# Check build logs in Amplify Console
# Look for:
# - Node.js version compatibility
# - Missing environment variables
# - Build timeout (increase if needed)
```

#### **Domain Issues**
```bash
# Check SSL certificate status
aws acm list-certificates

# Verify DNS records
nslookup yourdomain.com
```

---

## 🔄 **Phase 10: Continuous Integration**

### **1. GitHub Actions (Optional Alternative)**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Amplify
on:
  push:
    branches: [ main, dev, staging ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install pnpm
        run: npm install -g pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build
        run: pnpm run build
      - name: Deploy to Amplify
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1
      - name: Deploy
        run: |
          amplify init --yes
          amplify publish --yes
```

### **2. Pull Request Previews**
```yaml
# Enable in Amplify Console
# Automatically creates preview environments for PRs
```

---

## 📈 **Phase 11: Performance Optimization**

### **1. Frontend Optimization**

#### **Next.js Optimizations**
```javascript
// next.config.ts
export default {
  swcMinify: true,
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

#### **PWA Configuration**
```javascript
// next-pwa configuration
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
```

### **2. Backend Optimization**

#### **Lambda Functions**
- Use appropriate memory allocation
- Implement connection pooling
- Use CloudFront for static assets

#### **Database Optimization**
- Implement proper indexing
- Use DynamoDB Global Secondary Indexes
- Implement caching strategies

### **3. CDN Optimization**
- Configure proper cache headers
- Use CloudFront behaviors
- Implement image optimization

---

## 🔒 **Phase 12: Security Best Practices**

### **1. Authentication Security**
- Implement proper MFA settings
- Use secure password policies
- Enable account recovery

### **2. API Security**
- Implement proper authorization rules
- Use API keys for public endpoints
- Enable CORS properly

### **3. Data Security**
- Encrypt sensitive data at rest
- Implement proper access controls
- Use VPC for backend resources (if needed)

### **4. Network Security**
- Use HTTPS everywhere
- Implement proper firewall rules
- Regular security updates

---

## 📚 **Additional Resources**

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Amplify Best Practices](https://docs.amplify.aws/gen2/build-a-backend/)

---

*This guide is tailored to your Next.js portfolio application with AWS Amplify Gen 2 backend. Follow the phases sequentially for a successful deployment.*
