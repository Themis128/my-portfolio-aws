#!/usr/bin/env node

/**
 * CloudWatch Dashboard Setup Script
 * Creates and configures CloudWatch dashboards for monitoring
 */

const { CloudWatchClient, PutDashboardCommand } = require('@aws-sdk/client-cloudwatch');
const fs = require('fs');
const path = require('path');

const cloudwatch = new CloudWatchClient({ region: 'eu-central-1' });

async function createCloudWatchDashboard() {
  try {
    console.log('📊 Setting up CloudWatch Dashboard...\n');

    // Read the dashboard configuration
    const dashboardPath = path.join(__dirname, 'aws', 'cloudwatch-dashboard.json');
    const dashboardConfig = JSON.parse(fs.readFileSync(dashboardPath, 'utf8'));

    // Create the dashboard
    const dashboardName = 'Portfolio-AWS-Monitoring';
    const dashboardBody = JSON.stringify(dashboardConfig);

    await cloudwatch.send(new PutDashboardCommand({
      DashboardName: dashboardName,
      DashboardBody: dashboardBody
    }));

    console.log(`✅ CloudWatch Dashboard created: ${dashboardName}`);
    console.log('');
    console.log('🔗 Dashboard URL:');
    console.log(`https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#dashboards:name=${dashboardName}`);
    console.log('');
    console.log('📈 Dashboard includes:');
    console.log('• Lambda function duration and invocations');
    console.log('• Lambda function errors');
    console.log('• CloudFront requests and data transfer');
    console.log('• Recent Lambda logs');
    console.log('');
    console.log('⏰ Data will appear within 5-15 minutes after deployment');

  } catch (error) {
    console.error('❌ Failed to create CloudWatch dashboard:', error.message);
    console.log('');
    console.log('💡 Alternative: Create dashboard manually in AWS Console');
    console.log('1. Go to CloudWatch > Dashboards');
    console.log('2. Create dashboard named "Portfolio-AWS-Monitoring"');
    console.log('3. Add widgets for Lambda metrics and CloudFront metrics');
  }
}

// Create CloudWatch alarms for cost monitoring
async function createCostAlarms() {
  console.log('🚨 Setting up Cost Alarms...\n');

  console.log('💡 Cost monitoring alarms to consider:');
  console.log('• Daily Lambda cost > $5');
  console.log('• Monthly Amplify cost > $50');
  console.log('• CloudFront data transfer > 100GB/month');
  console.log('• Lambda error rate > 5%');
  console.log('');
  console.log('📋 Create these in AWS Console under CloudWatch > Alarms');
}

// Run setup
if (require.main === module) {
  createCloudWatchDashboard().catch(console.error);
  createCostAlarms();
}

module.exports = { createCloudWatchDashboard, createCostAlarms };