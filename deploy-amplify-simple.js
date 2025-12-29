#!/usr/bin/env node

/**
 * AWS Amplify Deployment Script - Alternative Approach
 * Creates app without GitHub connection, then provides manual connection steps
 */

const { AmplifyClient, CreateAppCommand, CreateBranchCommand, UpdateAppCommand } = require('@aws-sdk/client-amplify');

const REGION = 'eu-central-1';
const APP_NAME = 'my-portfolio-aws';
const BRANCH_NAME = 'master';

const BUILD_SPEC = `version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm@9.14.4
        - pnpm install --frozen-lockfile
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - node_modules/**/*`;

async function createAmplifyAppWithoutRepo() {
  const client = new AmplifyClient({ region: REGION });

  try {
    console.log('🚀 Creating AWS Amplify app (without repository connection)...');

    // Create the app without repository first
    const createAppCommand = new CreateAppCommand({
      name: APP_NAME,
      platform: 'WEB',
      enableBranchAutoBuild: true,
      buildSpec: BUILD_SPEC,
      environmentVariables: {
        NODE_VERSION: '20',
        PNPM_VERSION: '9.14.4',
        NEXT_TELEMETRY_DISABLED: '1'
      }
    });

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

    console.log('\n🎉 Amplify app created successfully!');
    console.log(`📋 App ID: ${appId}`);
    console.log(`🔗 Console URL: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${appId}`);

    console.log('\n📝 Next Steps - Connect Repository:');
    console.log('1. Go to the Console URL above');
    console.log('2. Click "Connect repository"');
    console.log('3. Choose GitHub and authorize AWS Amplify');
    console.log('4. Select repository: Themis128/my-portfolio-aws');
    console.log('5. Select branch: master');
    console.log('6. The build settings will be auto-detected');
    console.log('7. Click "Save and deploy"');

    console.log('\n🔧 After connecting repository, set these environment variables in Amplify Console:');
    console.log('- NODE_VERSION: 20');
    console.log('- PNPM_VERSION: 9.14.4');
    console.log('- NEXT_TELEMETRY_DISABLED: 1');

    return { appId };

  } catch (error) {
    console.error('❌ Error creating Amplify app:', error.message);
    process.exit(1);
  }
}

// Run the script
createAmplifyAppWithoutRepo();
