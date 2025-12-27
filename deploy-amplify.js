#!/usr/bin/env node

/**
 * AWS Amplify Deployment Script using AWS SDK
 * Creates and configures an Amplify app with GitHub repository connection
 *
 * Usage:
 * 1. Set GitHub token: export GITHUB_TOKEN=your_token
 * 2. Run: npm run deploy:amplify
 *
 * To get a GitHub token:
 * 1. Go to https://github.com/settings/tokens
 * 2. Generate new token (classic)
 * 3. Select scopes: repo, workflow
 */

const { AmplifyClient, CreateAppCommand, CreateBranchCommand, UpdateAppCommand, StartJobCommand } = require('@aws-sdk/client-amplify');
const readline = require('readline');

const REGION = 'eu-central-1';
const APP_NAME = 'my-portfolio-aws';
const REPO_URL = 'https://github.com/Themis128/my-portfolio-aws';
const BRANCH_NAME = 'master';

// Get GitHub token from environment or prompt
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const BUILD_SPEC = `version: 1
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
      - 'amplify-outputs.json'`;

function askForToken() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter your GitHub Personal Access Token: ', (token) => {
      rl.close();
      resolve(token);
    });
  });
}

async function createAmplifyApp() {
  const client = new AmplifyClient({ region: REGION });

  try {
    console.log('🚀 Creating AWS Amplify app with repository connection...');

    // Get GitHub token
    if (!GITHUB_TOKEN) {
      console.log('📝 GitHub token not found in environment variables.');
      console.log('💡 To create a GitHub token:');
      console.log('   1. Go to https://github.com/settings/tokens');
      console.log('   2. Generate new token (classic)');
      console.log('   3. Select scopes: repo, workflow');
      console.log('');

      GITHUB_TOKEN = await askForToken();

      if (!GITHUB_TOKEN) {
        console.log('❌ No token provided. Exiting...');
        process.exit(1);
      }
    }

    // Create the app with repository
    const createAppCommand = new CreateAppCommand({
      name: APP_NAME,
      repository: REPO_URL,
      platform: 'WEB',
      enableBranchAutoBuild: true,
      buildSpec: BUILD_SPEC,
      oauthToken: GITHUB_TOKEN,
      environmentVariables: {
        NODE_VERSION: '20',
        PNPM_VERSION: '9.14.4',
        NEXT_TELEMETRY_DISABLED: '1'
      }
    });

    console.log('📦 Creating app with repository connection...');
    const appResponse = await client.send(createAppCommand);
    const appId = appResponse.app.appId;

    console.log(`✅ Created Amplify app: ${appId}`);

    // Create the main branch
    console.log('🌿 Creating main branch...');
    const createBranchCommand = new CreateBranchCommand({
      appId,
      branchName: BRANCH_NAME,
      enableAutoBuild: true,
      stage: 'PRODUCTION'
    });

    await client.send(createBranchCommand);
    console.log('✅ Created main branch');

    // Start the initial build
    console.log('🏗️ Starting initial build...');
    const startJobCommand = new StartJobCommand({
      appId,
      branchName: BRANCH_NAME,
      jobType: 'RELEASE'
    });

    const jobResponse = await client.send(startJobCommand);
    console.log('✅ Build job started');

    console.log('\n🎉 Amplify app setup complete!');
    console.log(`📋 App ID: ${appId}`);
    console.log(`🔗 Console URL: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${appId}`);
    console.log(`🔗 Live URL: https://${BRANCH_NAME}.${appId}.amplifyapp.com`);
    console.log('\n📊 Monitor the build progress in the Amplify Console above.');

    return { appId, jobId: jobResponse.jobSummary.jobId };

  } catch (error) {
    console.error('❌ Error creating Amplify app:', error.message);

    if (error.message.includes('token') || error.message.includes('OAuth')) {
      console.log('\n💡 Token issues? Make sure your GitHub token has the correct permissions:');
      console.log('   - repo (Full control of private repositories)');
      console.log('   - workflow (Update GitHub Action workflows)');
      console.log('   Try regenerating the token with the correct scopes.');
    }

    process.exit(1);
  }
}

// Run the script
createAmplifyApp();