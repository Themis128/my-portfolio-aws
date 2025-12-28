#!/bin/bash

# AWS Amplify CLI Deployment Script
# This script creates and configures an Amplify app via CLI

set -e

# Configuration
APP_NAME="my-portfolio-aws"
REPO_URL="https://github.com/Themis128/my-portfolio-aws"
BRANCH_NAME="master"
REGION="eu-central-1"

echo "🚀 Setting up AWS Amplify app via CLI..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Create Amplify app
echo "📦 Creating Amplify app..."
APP_RESPONSE=$(aws amplify create-app \
    --name "$APP_NAME" \
    --repository "$REPO_URL" \
    --platform "WEB" \
    --region "$REGION" \
    --enable-branch-auto-build true \
    --build-spec 'version: 1
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
      - "**/*"
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
      - "amplify-outputs.json"')

# Extract app ID
APP_ID=$(echo "$APP_RESPONSE" | jq -r '.app.appId')
echo "✅ Created Amplify app with ID: $APP_ID"

# Create main branch
echo "🌿 Creating main branch..."
aws amplify create-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --enable-auto-build true \
    --stage "PRODUCTION"

# Set environment variables
echo "🔧 Setting environment variables..."
aws amplify create-backend-environment \
    --app-id "$APP_ID" \
    --environment-name "prod" \
    --stack-name "${APP_NAME}-backend-prod"

# Set build environment variables
aws amplify update-app \
    --app-id "$APP_ID" \
    --environment-variables "NODE_VERSION=20,PNPM_VERSION=9.14.4,NEXT_TELEMETRY_DISABLED=1"

echo "🎉 Amplify app setup complete!"
echo "📋 App ID: $APP_ID"
echo "🔗 Console URL: https://$REGION.console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"

# Trigger initial build
echo "🏗️ Triggering initial build..."
aws amplify start-job \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --job-type "RELEASE"

echo "✅ Deployment initiated! Check the Amplify Console for build status."