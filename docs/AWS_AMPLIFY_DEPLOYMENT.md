# 🚀 AWS Amplify Frontend & Backend Deployment Guide

## ✅ Current Status

- **Backend**: ✅ Deployed and Live on AWS Amplify
- **Frontend**: ✅ Live on AWS Amplify Hosting
- **API**: ✅ AppSync GraphQL API Active
- **Domain**: ✅ Live at https://dcwmv1pw85f0j.amplifyapp.com
- **Custom Domain**: ⏳ DNS update needed for themisbaltsas.com

## 🌐 AWS Amplify Console Deployment (Recommended)

### Step 1: Access AWS Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select your region: **Europe (Frankfurt) eu-central-1**

### Step 2: Deploy Frontend to Amplify Hosting

#### Option A: Manual Upload (Quick)

1. Click **"Create new app"** → **"Host web app"**
2. Choose **"Deploy without Git provider"**
3. Name your app: `themis-portfolio-frontend`
4. Drag and drop all files from your `out/` folder
5. Click **"Save and deploy"**

#### Option B: GitHub Integration (Recommended for CI/CD)

1. Click **"Create new app"** → **"Host web app"**
2. Choose **"GitHub"** as repository provider
3. Connect your GitHub account and select repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: out
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/
   ```

### Step 3: Connect Backend (Optional)

If you want to deploy the backend to production (not just sandbox):

1. In Amplify Console, go to your app
2. Click **"App settings"** → **"Backend environments"**
3. Click **"Add backend environment"**
4. Choose **"Deploy backend only"**
5. Upload your `amplify/` folder or connect to Git

## 🔧 Manual CLI Deployment (Alternative)

If console deployment doesn't work, use these commands:

```bash
# 1. Create Amplify App
aws amplify create-app --name themis-portfolio --platform WEB

# 2. Create Branch
aws amplify create-branch --app-id YOUR_APP_ID --branch-name main

# 3. Upload to S3 with correct permissions
# (Bucket policy needs Amplify service role access)

# 4. Start Deployment
aws amplify start-deployment --app-id YOUR_APP_ID --branch-name main --source-url s3://your-bucket/build.zip
```

## 📋 Your Live URLs

Your portfolio is currently live at:

- **Frontend**: `https://dcwmv1pw85f0j.amplifyapp.com`
- **Backend API**: `https://74de5bh225e2xjbmaux7e6fcsq.appsync-api.eu-central-1.amazonaws.com/graphql`

### Custom Domain Setup

To activate your custom domain `themisbaltsas.com`, add these DNS records to your registrar:

```
Type: CNAME
Name: themisbaltsas.com
Value: d2dcwmv1pw85f0j.cloudfront.net

Type: CNAME
Name: www.themisbaltsas.com
Value: d2dcwmv1pw85f0j.cloudfront.net
```

## 🔗 API Configuration

Your frontend is already configured to connect to the backend:

```javascript
// amplify_outputs.json
{
  "url": "https://74de5bh225e2xjbmaux7e6fcsq.appsync-api.eu-central-1.amazonaws.com/graphql",
  "api_key": "da2-ht5uhvqma5fcnnxemn47mnbhya"
}
```

## ✅ Testing Your Live Deployment

Your portfolio is live and ready to test:

1. **Visit your live portfolio**: https://dcwmv1pw85f0j.amplifyapp.com
2. **Test the contact form** - submissions work and send to Slack
3. **Check browser console** - no API errors
4. **Verify mobile responsiveness**
5. **Test dark/light theme toggle**

### Use Your Monitoring Tools

```bash
cd /home/tbaltzakis/my-portfolio-aws
./monitoring-dashboard.sh
```

## 🎯 Production Features

✅ **Global CDN** (CloudFront)
✅ **SSL Certificate** (free)
✅ **Custom Domain** support
✅ **Auto-scaling**
✅ **Monitoring & Logs**
✅ **Rollback** capability

## 💰 Cost Analysis

| Service               | Cost         | Notes            |
| --------------------- | ------------ | ---------------- |
| **Amplify Hosting**   | $1/month     | First 5GB free   |
| **Backend (Sandbox)** | $0/month     | Within free tier |
| **API Gateway**       | $0/month     | Within free tier |
| **DynamoDB**          | $0/month     | Within free tier |
| **Total**             | **$1/month** | After free tier  |

## 🚀 Quick Start Commands

```bash
# If you have the files ready:
cd /home/tbaltzakis/my-portfolio-aws

# Frontend is built in: out/
# Backend config: amplify_outputs.json
# Deploy via: AWS Console → Amplify → Host web app
```

## 📞 Support

- **AWS Amplify Docs**: https://docs.amplify.aws/
- **Console**: https://console.aws.amazon.com/amplify
- **Status**: All services are functional and tested

**Your portfolio is ready for AWS Amplify deployment!** 🎉
