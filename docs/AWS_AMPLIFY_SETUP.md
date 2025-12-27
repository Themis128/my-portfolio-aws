# AWS Amplify Deployment Guide

This guide covers deploying your Next.js portfolio to AWS Amplify with optimized settings for production.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js and pnpm installed
4. GitHub repository connected to AWS Amplify

## Step 1: Configure AWS CLI

```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, default region (e.g., `eu-central-1`), and output format.

## Step 2: Create Amplify App

### Via AWS Console
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "Get Started" → "Connect app"
3. Choose your Git provider (GitHub)
4. Select your repository and branch
5. Configure build settings (use the provided buildspec.yml)

### Via AWS CLI
```bash
aws amplify create-app \
  --name "my-portfolio-aws" \
  --repository "https://github.com/your-username/my-portfolio-aws" \
  --platform "WEB"
```

## Step 3: Configure Build Settings

Create or update `amplify.yml` in your project root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## Step 4: Environment Variables

Configure these environment variables in AWS Amplify Console:

### Build-time Variables
```env
NODE_VERSION=20
PNPM_VERSION=9.14.4
NEXT_TELEMETRY_DISABLED=1
```

### Runtime Variables (if needed)
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## Step 5: Custom Domain Setup

### 1. Configure Custom Domain
1. In Amplify Console, go to your app
2. Click "Domain management" → "Add domain"
3. Enter your custom domain (e.g., `your-domain.com`)
4. Follow DNS verification steps

### 2. SSL Certificate
- Amplify automatically provisions SSL certificates via AWS Certificate Manager
- Ensure your domain is verified before proceeding

## Step 6: Advanced Configuration

### 1. Custom Headers
Add security headers in `next.config.ts`:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    reactCompiler: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 2. Image Optimization
Configure image domains in `next.config.ts`:

```typescript
const nextConfig = {
  // ... other config
  images: {
    domains: ['images.unsplash.com', 'your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

## Step 7: Performance Optimization

### 1. Enable Caching
Configure cache settings in Amplify Console:
- **Build cache**: Enable for faster builds
- **Browser cache**: Set appropriate TTL values

### 2. CDN Configuration
- Amplify automatically uses CloudFront for global content delivery
- Configure cache invalidation for deployments

### 3. Bundle Optimization
Ensure your `next.config.ts` includes:

```typescript
const nextConfig = {
  // ... other config
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
};
```

## Step 8: Monitoring and Analytics

### 1. Enable Monitoring
- Set up CloudWatch alarms for performance metrics
- Configure custom metrics for user engagement

### 2. Error Tracking
- Integrate with AWS X-Ray for request tracing
- Set up error reporting with CloudWatch Logs

## Step 9: CI/CD Pipeline

### 1. Branch Management
Configure branch-specific settings:
- **Main branch**: Production deployment
- **Develop branch**: Staging environment
- **Feature branches**: Preview deployments

### 2. Build Triggers
- Automatic builds on git push
- Manual build triggers for specific scenarios
- Webhook configuration for external triggers

## Step 10: Security Configuration

### 1. IAM Permissions
Ensure your Amplify service role has minimal required permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-amplify-app-*/*"
    }
  ]
}
```

### 2. WAF Integration
- Set up AWS WAF for DDoS protection
- Configure rate limiting rules
- Add bot protection

## Deployment Commands

### Manual Deployment
```bash
# Trigger build and deploy
aws amplify start-deployment --app-id your-app-id --branch-name main
```

### Status Check
```bash
# Check deployment status
aws amplify get-app --app-id your-app-id
```

### Rollback
```bash
# Rollback to previous version
aws amplify create-deployment --app-id your-app-id --branch-name main
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify pnpm installation
   - Review build logs in Amplify Console

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match code references
   - Verify sensitive variables are properly secured

3. **Custom Domain Issues**:
   - Verify DNS records are correctly configured
   - Check SSL certificate status
   - Ensure domain is not blocked by regional restrictions

4. **Performance Issues**:
   - Review bundle size with `next build --profile`
   - Check image optimization settings
   - Verify CDN configuration

### Debug Commands

```bash
# Get app details
aws amplify get-app --app-id your-app-id

# List branches
aws amplify list-branches --app-id your-app-id

# Get build logs
aws amplify get-job --app-id your-app-id --branch-name main --job-id job-id
```

## Cost Optimization

### 1. Resource Monitoring
- Set up AWS Budgets alerts
- Monitor Amplify usage metrics
- Review CloudFront costs

### 2. Optimization Strategies
- Use appropriate instance sizes for builds
- Configure build timeouts appropriately
- Implement efficient caching strategies

## Best Practices

1. **Environment Separation**: Use separate Amplify apps for staging and production
2. **Backup Strategy**: Regularly backup your application configuration
3. **Security**: Regularly rotate API keys and review IAM permissions
4. **Monitoring**: Set up comprehensive monitoring and alerting
5. **Documentation**: Keep deployment procedures documented and updated

## Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [AWS Amplify CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/amplify/)
