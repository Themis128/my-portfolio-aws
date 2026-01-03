lvd# AWS Amplify Services Documentation

This document outlines all AWS services required to deploy and operate your portfolio application using the AWS Amplify framework.

## 🏗️ **Application Architecture Overview**

**Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS
**Backend**: AWS Amplify Gen 2 with CDK
**Deployment**: AWS Amplify Hosting with CI/CD
**Infrastructure**: Multi-environment (dev/staging/production)

---

## 🔐 **Authentication & Identity (Amazon Cognito)**

### **Service**: Amazon Cognito User Pools
**Purpose**: User authentication and identity management
**Configuration**:
- **Passwordless Authentication**: Email OTP, SMS OTP, WebAuthn passkeys
- **Multi-Factor Authentication**: SMS and TOTP (Time-based One-Time Password)
- **User Attributes**: email (required), givenName, familyName, phoneNumber
- **Domain**: cloudless.gr for WebAuthn relying party

### **Why You Need This**
- Secure user registration and login
- Passwordless authentication for better UX
- MFA for enhanced security
- User profile management

### **Amplify Configuration**
```typescript
// amplify/auth/resource.ts
export const auth = defineAuth({
  loginWith: {
    email: { otpLogin: true },
    phone: { otpLogin: true },
    webAuthn: {
      relyingPartyId: 'cloudless.gr',
      userVerification: 'preferred'
    }
  },
  multifactor: { mode: 'OPTIONAL', sms: true, totp: true }
});
```

---

## 🗄️ **Data & APIs (AWS AppSync + Amazon DynamoDB)**

### **Service**: AWS AppSync
**Purpose**: Managed GraphQL API service
**Features**:
- Real-time subscriptions
- Offline data synchronization
- Built-in authorization and security
- Integration with multiple data sources

### **Service**: Amazon DynamoDB
**Purpose**: NoSQL database for data storage
**Configuration**:
- **Tables**: Contact, Analytics, and custom data models
- **Authorization**: API Key authentication with 30-day expiration

### **Data Models**
```typescript
// Contact form submissions
Contact: {
  id, name, email, message, createdAt
}

// Analytics tracking
Analytics: {
  id, eventType, page, userAgent, referrer, metadata, createdAt
}

// Custom types for Lambda responses
FunctionConfig: {
  timeoutSeconds, memoryMB, runtime
}
```

### **Custom Mutations & Queries**
- `sendContact`: Process contact form submissions
- `sendSlackNotification`: Send notifications to Slack
- `trackAnalytics`: Track user interactions
- `sayHello`: Test API connectivity

---

## 🖥️ **Compute (AWS Lambda)**

### **Service**: AWS Lambda Functions
**Purpose**: Serverless compute for backend logic
**Functions Configured**:

1. **contactHandler**: Processes contact form submissions
2. **slackHandler**: Sends notifications to Slack
3. **analyticsHandler**: Processes analytics data
4. **sayHello**: API connectivity testing
5. **weeklyDigest**: Scheduled email digests
6. **dailyReminder**: Daily automated reminders

### **Runtime Configuration**
- **Runtime**: Node.js (managed by Amplify)
- **Memory**: Configurable per function
- **Timeout**: Configurable per function
- **Triggers**: GraphQL mutations, scheduled events

---

## 🗃️ **Storage (Amazon S3)**

### **Service**: Amazon S3 Bucket
**Purpose**: File storage and static assets
**Configuration**:
- **Bucket Name**: portfolioStorage
- **Access Control**:
  - `images/*`: Guest read/write access
- **Use Cases**: User-uploaded images, static assets

---

## 🤖 **AI/ML Services (Amazon Bedrock)**

### **Service**: Amazon Bedrock
**Purpose**: AI-powered features using Claude 3.5 Haiku
**Features**:

### **Conversations**
```typescript
// AI Chat functionality
chat: a.conversation({
  aiModel: a.ai.model('Claude 3.5 Haiku'),
  systemPrompt: 'You are a helpful assistant for a software developer portfolio...'
})
.authorization((allow) => allow.owner())
```

### **Generations**
```typescript
// Project idea generation
generateProjectIdea: a.generation({
  aiModel: a.ai.model('Claude 3.5 Haiku'),
  systemPrompt: 'You are a creative assistant that generates innovative software project ideas...'
})
```

---

## 🚀 **Hosting & CDN (AWS Amplify Hosting + Amazon CloudFront)**

### **Service**: AWS Amplify Hosting
**Purpose**: Frontend hosting with CI/CD
**Configuration**:
- **Framework**: Next.js with SSR enabled
- **Build Settings**:
  - Package manager: pnpm
  - Build command: `pnpm run build`
  - Output directory: `.next`
  - Cache optimization: `.next/cache`, `node_modules`
- **Compute Type**: BUILD_GENERAL1_3XLARGE for optimized builds
- **Environment Variables**: NEXT_TELEMETRY_DISABLED, NODE_OPTIONS

### **Service**: Amazon CloudFront
**Purpose**: Global CDN for content delivery
**Features**:
- Global edge network distribution
- SSL/TLS encryption
- Custom domain support
- Real-time monitoring

---

## 📊 **Monitoring & Logging (Amazon CloudWatch)**

### **Service**: Amazon CloudWatch
**Purpose**: Application monitoring and logging
**Components**:

### **CloudWatch Logs**
- Lambda function execution logs
- API Gateway access logs
- Application error tracking
- Custom metrics and alarms

### **CloudWatch Metrics**
- Function execution duration
- Error rates and success rates
- API latency and throughput
- Custom business metrics

### **CloudWatch Alarms**
- Automated alerts for issues
- Performance degradation notifications
- Error rate thresholds

---

## 📧 **Communication (Amazon SES)**

### **Service**: Amazon Simple Email Service (SES)
**Purpose**: Email sending capabilities
**Use Cases**:
- Contact form responses
- Weekly digest emails
- User notifications
- Marketing communications

**Configuration Required**:
- Verified sender domains/emails
- SES sending limits and quotas
- DKIM/SPF configuration for deliverability

---

## 🔧 **CI/CD & Deployment (AWS CodeBuild + AWS CodePipeline)**

### **Service**: AWS CodeBuild
**Purpose**: Build and test application code
**Configuration**:
- **Compute Type**: BUILD_GENERAL1_3XLARGE
- **Build Environment**: Node.js with pnpm
- **Build Phases**:
  - Install: `npm install -g pnpm && pnpm install`
  - Build: `pnpm run build`
- **Environment Variables**: Build optimization settings

### **Service**: AWS CodePipeline
**Purpose**: Automated deployment pipeline
**Stages**:
1. Source: Git repository monitoring
2. Build: CodeBuild execution
3. Deploy: Amplify Hosting deployment
4. Test: Automated testing (if configured)

---

## 🌐 **Domain & DNS (Amazon Route 53)**

### **Service**: Amazon Route 53
**Purpose**: DNS management and domain routing
**Configuration**:
- **Hosted Zone**: baltzakisthemis.com
- **Record Types**:
  - A record (alias) for root domain pointing to CloudFront
  - CNAME record for www subdomain pointing to CloudFront
  - TXT records for domain verification
  - CNAME records for SSL certificate validation

**Current DNS Configuration**:
```
baltzakisthemis.com.    A    d3uho3sh727e9v.cloudfront.net (alias)
www.baltzakisthemis.com. CNAME d3uho3sh727e9v.cloudfront.net
```

**Domain Association Status**: AWAITING_APP_CNAME (in progress)
**Amplify App ID**: dcwmv1pw85f0j
**Default Domain**: dcwmv1pw85f0j.amplifyapp.com

---

## 🔒 **Security & Compliance**

### **AWS WAF (Web Application Firewall)**
- **Optional**: Add WAF rules for protection against common web exploits
- **Integration**: Direct integration with Amplify Hosting

### **AWS Shield**
- **Purpose**: DDoS protection
- **Integration**: Automatic protection for Amplify applications

### **AWS Certificate Manager (ACM)**
- **Purpose**: SSL/TLS certificate management
- **Integration**: Automatic HTTPS for custom domains

---

## 📱 **Additional Services (Optional Enhancements)**

### **Amazon Pinpoint**
- **Purpose**: User engagement and analytics
- **Use Cases**: Push notifications, email campaigns, user segmentation

### **Amazon Location Service**
- **Purpose**: Maps and location features
- **Integration**: Add maps to contact forms or portfolio features

### **AWS Systems Manager Parameter Store**
- **Purpose**: Secure configuration management
- **Use Cases**: API keys, database credentials, environment-specific settings

---

## 🔄 **Environment Strategy**

### **Development Environment (dev branch)**
- Sandbox for testing new features
- Isolated resources
- Cost optimization for development

### **Staging Environment (staging branch)**
- Pre-production testing
- Full feature validation
- Performance testing environment

### **Production Environment (master branch)**
- Live application
- Optimized for performance and cost
- Monitoring and alerting enabled

---

## 📋 **Deployment Checklist**

### **Pre-Deployment**
- [ ] AWS CLI configured with appropriate permissions
- [ ] Amplify CLI installed and configured
- [ ] Git repository connected to Amplify
- [ ] Environment variables configured
- [ ] Custom domain purchased (if using custom domain)

### **Backend Deployment**
- [ ] Authentication configured
- [ ] Data models deployed
- [ ] Lambda functions deployed
- [ ] Storage bucket created

### **Frontend Deployment**
- [ ] Build configuration verified
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] SSL certificate provisioned

### **Post-Deployment**
- [ ] Monitoring and logging configured
- [ ] Backup strategies implemented
- [ ] Cost monitoring enabled
- [ ] Performance testing completed

---

## 🚨 **Monitoring & Troubleshooting**

### **Key Metrics to Monitor**
- API response times
- Lambda function errors
- Database read/write capacity
- CDN cache hit rates
- User authentication success rates

### **Common Issues & Solutions**
- **Build Failures**: Check build logs in CodeBuild
- **API Errors**: Review CloudWatch Logs for Lambda functions
- **Authentication Issues**: Check Cognito User Pool configuration
- **Performance Issues**: Monitor CloudWatch metrics and optimize Lambda functions
- **Domain Issues**: Check SSL certificate status and DNS records
  - Verify domain association status in Amplify Console
  - Check Route 53 DNS records point to correct CloudFront distribution
  - Ensure SSL certificate is properly configured in ACM

### **Domain Configuration Issues**
- **404 Errors on Custom Domain**: 
  - Verify DNS records are correctly configured in Route 53
  - Check domain association status in Amplify Console
  - Ensure SSL certificate is valid and not expired

- **SSL Certificate Issues**:
  - Check certificate status in AWS Certificate Manager
  - Verify domain ownership verification records
  - Ensure certificate covers all domain variations (www, root domain)

- **DNS Propagation Issues**:
  - Allow time for DNS changes to propagate (up to 48 hours)
  - Verify DNS records using `nslookup` or `dig`
  - Check for conflicting DNS records

### **Current Domain Status**
- **Domain**: baltzakisthemis.com
- **Amplify App ID**: dcwmv1pw85f0j
- **CloudFront Distribution**: d3uho3sh727e9v.cloudfront.net
- **Domain Association Status**: AWAITING_APP_CNAME (in progress)
- **DNS Records**: 
  - A record (alias) for root domain → d3uho3sh727e9v.cloudfront.net
  - CNAME record for www subdomain → d3uho3sh727e9v.cloudfront.net

---

## 💰 **Cost Optimization**

### **Service Cost Breakdown**
- **Amplify Hosting**: Pay per build minute and GB served
- **AppSync**: Pay per request and data transfer
- **DynamoDB**: Pay per read/write capacity and storage
- **Lambda**: Pay per request and GB-seconds
- **CloudFront**: Pay per GB transferred

### **Optimization Strategies**
- Use appropriate Lambda memory allocation
- Implement caching strategies
- Monitor and optimize database queries
- Use reserved instances for predictable workloads
- Set up cost alerts and budgets

---

## 📚 **Additional Resources**

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Amplify Gen 2 Getting Started](https://docs.amplify.aws/react/start/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Pricing Calculator](https://calculator.aws/)

---

*This documentation is specific to your portfolio application architecture. Last updated: January 2026*
