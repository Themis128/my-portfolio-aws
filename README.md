# 🚀 Themis Baltzakis Portfolio

![Deploy to AWS Amplify](https://github.com/Themis128/my-portfolio-aws/actions/workflows/deploy.yml/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-22.x-green)
![Next.js](https://img.shields.io/badge/Next.js-16.x-black)
![AWS Amplify](https://img.shields.io/badge/AWS-Amplify-orange)

A modern, full-stack portfolio website built with Next.js 16, TypeScript, and AWS Amplify. Features contact forms, analytics tracking, Slack notifications, and email integration.

## � Live Demo

**Portfolio is live and operational!**  
**Visit:** https://dcwmv1pw85f0j.amplifyapp.com

### Production Features:

- ✅ **Live Contact Form** - Sends messages to Slack
- ✅ **Global CDN** - Fast worldwide loading
- ✅ **SSL Security** - HTTPS encryption
- ✅ **Enterprise Monitoring** - Complete observability suite
- ✅ **Cost Effective** - Only $1/month hosting

## �🌟 Features

- **⚡ Next.js 16** with App Router and static export
- **🎨 Modern UI** with Tailwind CSS and Framer Motion
- **☁️ AWS Amplify** backend with GraphQL API
- **📧 Contact Forms** with email and Slack notifications
- **📊 Analytics** tracking with custom events
- **🔒 Security** hardened with CSP and security headers
- **🚀 CI/CD** with GitHub Actions and automated testing
- **🧪 Testing** with Playwright E2E tests
- **⏰ Scheduled Functions** with EventBridge automation

## 🏗️ Architecture

```
Frontend (Next.js + TypeScript)
    ↓ Static Export
AWS Amplify Hosting + CloudFront
    ↓ API Routes
AWS Lambda Functions
    ↓ Data Layer
AWS DynamoDB + AppSync GraphQL
    ↓ External Services
Email (SES) + Slack + Analytics
```

### Backend Services

- **Contact Handler**: Processes contact form submissions
- **Email Sender**: Sends emails via Amazon SES
- **Slack Notifier**: Sends notifications to Slack channels
- **Portfolio Analytics**: Tracks user interactions and events
- **Weekly Digest**: Generates weekly analytics summaries (runs every Sunday)
- **Daily Reminder**: Sends daily notifications and reminders (multiple schedules)

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x (matches Lambda runtime)
- pnpm package manager
- AWS CLI configured (for deployments)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Themis128/my-portfolio-aws.git
   cd my-portfolio-aws
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Local Backend Development

For developing with AWS Amplify backend services locally, use the Amplify sandbox environment:

1. **Start Amplify sandbox**

   ```bash
   npx ampx sandbox
   ```

2. **Stream function logs** (optional, for debugging)

   Amplify enables streaming logs from your AWS Lambda functions directly to your terminal:

   ```bash
   npx ampx sandbox --stream-function-logs
   ```

   **Filtering logs**: To stream only specific functions, use the `--logs-filter` flag:

   ```bash
   npx ampx sandbox --stream-function-logs --logs-filter auth
   ```

   **Writing logs to file**: Save logs to a file instead of terminal output:

   ```bash
   npx ampx sandbox --stream-function-logs --logs-out-file sandbox.log
   ```

   Combine filters and file output:

   ```bash
   npx ampx sandbox --stream-function-logs --logs-filter auth --logs-out-file sandbox-auth.log
   ```

   **Note**: This feature is only available for Sandbox mode and helps with faster debug iterations and greater insight into function executions.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AWS Region (required for local development)
AWS_REGION=eu-central-1

# Slack Configuration (optional - for notifications)
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SSM_PARAM=/portfolio/slack-bot-token

# Email Configuration (optional - for SES)
FROM_EMAIL=noreply@yourdomain.com

# Amplify Environment
AMPLIFY_ENV=dev
NEXT_PUBLIC_AMPLIFY_ENV=dev
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature components
├── lib/                   # Utility libraries
├── amplify/               # AWS Amplify backend
│   ├── data/             # GraphQL schema and resolvers
│   ├── functions/        # Lambda functions
│   └── backend.ts        # Backend configuration
├── public/                # Static assets
├── docs/                  # Documentation
├── .github/               # GitHub Actions workflows
└── tests/                 # Test files
```

## 🚀 Deployment

### Automated Deployment (Recommended)

The project includes automated CI/CD with GitHub Actions:

1. **Push to main branch** - Automatically runs tests and deploys
2. **Pull requests** - Runs quality checks without deployment
3. **Manual deployment** - Use GitHub Actions dispatch for specific branches

### Manual Deployment

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Deploy to Amplify (requires AWS CLI)
pnpm run deploy:amplify
```

### Environment-Specific Deployments

The CI/CD pipeline supports multiple environments:

- **Production**: `master` branch → production Amplify app
- **Staging**: Manual deployment to staging environment
- **Development**: Feature branches for testing

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint
pnpm test            # Run tests

# AWS Amplify
pnpm run deploy:amplify       # Deploy to Amplify
pnpm run deploy:amplify:simple # Simple deployment script

# Scheduled Functions
pnpm run test:scheduled       # Test scheduled functions locally

# Testing
pnpm exec playwright test     # Run E2E tests
pnpm exec playwright install  # Install Playwright browsers
```

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (via ESLint)
- **Security**: Dependency vulnerability scanning

### Testing

```bash
# Run all tests
pnpm test

# Run E2E tests
pnpm exec playwright test

# Run tests in UI mode
pnpm exec playwright test --ui

# Generate test coverage
pnpm exec playwright test --coverage
```

## 🔒 Security

### Content Security Policy (CSP)

The application implements a strict CSP:

- **Default**: `self` only
- **Scripts**: `self` (no inline scripts)
- **Styles**: `self` with `unsafe-inline` for Next.js
- **Images**: `self`, `data:`, and HTTPS sources
- **API**: Restricted to Amplify AppSync endpoints

### Security Headers

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Authentication & Authorization

- **API Key Authentication** for GraphQL endpoints
- **Environment-specific keys** with automatic expiration
- **Rate limiting** via API Gateway (configurable)
- **Input validation** on all endpoints

## 📊 Analytics & Monitoring

### Built-in Analytics

- **Contact form tracking**: Submission success/failure
- **User interactions**: Button clicks, navigation
- **Performance metrics**: Page load times, errors
- **Custom events**: Project views, social clicks

### Monitoring

- **CloudWatch Logs**: All Lambda function logs
- **CloudWatch Metrics**: Custom application metrics
- **AWS X-Ray**: Distributed tracing (optional)
- **Error tracking**: Structured error logging

### Google Analytics Integration

For enhanced analytics, configure Google Analytics:

1. Get your measurement ID from Google Analytics
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in environment variables
3. Events are automatically tracked in production

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📚 Documentation

- **[Architecture Overview](docs/ARCHITECTURE.md)** - System design and data flow
- **[API Documentation](docs/BACKEND_CONFIGURATION.md)** - GraphQL API reference
- **[Deployment Guide](docs/DEPLOYMENT-GUIDE.md)** - Detailed deployment procedures
- **[Security Guide](docs/SECURITY.md)** - Security measures and best practices
- **[Directory Structure](docs/DIRECTORY_STRUCTURE.md)** - Project organization

## 🐛 Troubleshooting

### Common Issues

**Build fails with "amplify_outputs.json not found"**

- Run `amplify pull` to sync backend configuration
- Ensure you're in the correct Amplify environment

**Lambda functions timeout**

- Check CloudWatch logs for performance issues
- Consider increasing memory allocation

**CORS errors**

- Verify API Gateway CORS configuration
- Check Next.js headers configuration

### Support

- **Issues**: [GitHub Issues](https://github.com/Themis128/my-portfolio-aws/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Themis128/my-portfolio-aws/discussions)
- **Documentation**: Check the `docs/` directory

## 📄 License

This project is licensed under the **AGPL v3** license - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **AWS Amplify** - Backend-as-a-Service platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide Icons** - Beautiful icon set

---

**Built with ❤️ by Themis Baltzakis**

# Deployment test - Fri Jan 02 20:02:50 EET 2026
