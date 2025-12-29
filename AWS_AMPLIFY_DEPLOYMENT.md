# 🚀 AWS Amplify Frontend & Backend Deployment Guide

## ✅ Current Status
- **Backend**: ✅ Deployed in AWS Amplify Sandbox ($0/month)
- **Frontend**: ✅ Built and ready for AWS Amplify Hosting
- **API**: ✅ Connected and functional

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

After deployment, your portfolio will be available at:
- **Frontend**: `https://[app-id].amplifyapp.com`
- **Backend API**: `https://[api-id].appsync-api.eu-central-1.amazonaws.com/graphql`

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

1. **Visit your Amplify URL**
2. **Test the contact form** - submissions should work
3. **Check browser console** - no API errors
4. **Verify mobile responsiveness**

## 🎯 Production Features

✅ **Global CDN** (CloudFront)
✅ **SSL Certificate** (free)
✅ **Custom Domain** support
✅ **Auto-scaling**
✅ **Monitoring & Logs**
✅ **Rollback** capability

## 💰 Cost Analysis

| Service | Cost | Notes |
|---------|------|-------|
| **Amplify Hosting** | $1/month | First 5GB free |
| **Backend (Sandbox)** | $0/month | Within free tier |
| **API Gateway** | $0/month | Within free tier |
| **DynamoDB** | $0/month | Within free tier |
| **Total** | **$1/month** | After free tier |

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
