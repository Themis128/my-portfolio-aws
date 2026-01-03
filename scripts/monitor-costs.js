#!/usr/bin/env node

/**
 * AWS Cost Monitoring Script for Amplify Application
 * Tracks Lambda function costs, CloudFront usage, and AppSync costs
 */

const { CloudWatchClient, GetMetricStatisticsCommand } = require('@aws-sdk/client-cloudwatch');
const { CostExplorerClient, GetCostAndUsageCommand } = require('@aws-sdk/client-cost-explorer');

const cloudwatch = new CloudWatchClient({ region: 'eu-central-1' });
const costExplorer = new CostExplorerClient({ region: 'us-east-1' }); // Cost Explorer is in us-east-1

async function getLambdaMetrics(functionName, startTime, endTime) {
  const params = {
    Namespace: 'AWS/Lambda',
    MetricName: 'Duration',
    Dimensions: [
      {
        Name: 'FunctionName',
        Value: functionName
      }
    ],
    StartTime: startTime,
    EndTime: endTime,
    Period: 3600, // 1 hour
    Statistics: ['Average', 'Maximum', 'Minimum']
  };

  try {
    const command = new GetMetricStatisticsCommand(params);
    const response = await cloudwatch.send(command);
    return response.Datapoints || [];
  } catch (error) {
    console.error(`Error getting metrics for ${functionName}:`, error);
    return [];
  }
}

async function getLambdaInvocations(functionName, startTime, endTime) {
  const params = {
    Namespace: 'AWS/Lambda',
    MetricName: 'Invocations',
    Dimensions: [
      {
        Name: 'FunctionName',
        Value: functionName
      }
    ],
    StartTime: startTime,
    EndTime: endTime,
    Period: 3600,
    Statistics: ['Sum']
  };

  try {
    const command = new GetMetricStatisticsCommand(params);
    const response = await cloudwatch.send(command);
    return response.Datapoints || [];
  } catch (error) {
    console.error(`Error getting invocations for ${functionName}:`, error);
    return [];
  }
}

async function getCostAndUsage(startDate, endDate) {
  const params = {
    TimePeriod: {
      Start: startDate,
      End: endDate
    },
    Granularity: 'DAILY',
    Metrics: ['BlendedCost'],
    GroupBy: [
      {
        Type: 'DIMENSION',
        Key: 'SERVICE'
      }
    ],
    Filter: {
      Dimensions: {
        Key: 'REGION',
        Values: ['eu-central-1']
      }
    }
  };

  try {
    const command = new GetCostAndUsageCommand(params);
    const response = await costExplorer.send(command);
    return response.ResultsByTime || [];
  } catch (error) {
    console.error('Error getting cost and usage:', error);
    return [];
  }
}

async function monitorCosts() {
  const now = new Date();
  const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
  const endTime = now;

  const startDate = startTime.toISOString().split('T')[0];
  const endDate = endTime.toISOString().split('T')[0];

  console.log('🚀 AWS Cost Monitoring Report');
  console.log('==============================');
  console.log(`Period: ${startDate} to ${endDate}`);
  console.log('');

  // Lambda Functions to monitor
  const lambdaFunctions = [
    'contact-handler',
    'analytics-handler',
    'slack-handler'
  ];

  console.log('📊 Lambda Function Performance:');
  console.log('-------------------------------');

  for (const functionName of lambdaFunctions) {
    const metrics = await getLambdaMetrics(functionName, startTime, endTime);
    const invocations = await getLambdaInvocations(functionName, startTime, endTime);

    const totalInvocations = invocations.reduce((sum, point) => sum + (point.Sum || 0), 0);
    const avgDuration = metrics.length > 0
      ? metrics.reduce((sum, point) => sum + (point.Average || 0), 0) / metrics.length
      : 0;

    // Estimate cost (rough calculation: $0.0000166667 per GB-second for x86)
    // Assuming 256MB for analytics/slack, 512MB for contact
    const memoryMB = functionName === 'contact-handler' ? 512 : 256;
    const memoryGB = memoryMB / 1024;
    const durationSeconds = avgDuration / 1000;
    const estimatedCost = totalInvocations * memoryGB * durationSeconds * 0.0000166667;

    console.log(`${functionName}:`);
    console.log(`  Invocations: ${totalInvocations}`);
    console.log(`  Avg Duration: ${avgDuration.toFixed(2)}ms`);
    console.log(`  Memory: ${memoryMB}MB`);
    console.log(`  Est. Daily Cost: $${estimatedCost.toFixed(6)}`);
    console.log('');
  }

  // Cost breakdown
  console.log('💰 AWS Service Costs (Last 7 days):');
  console.log('-----------------------------------');

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const costStartDate = sevenDaysAgo.toISOString().split('T')[0];
  const costEndDate = endDate;

  const costData = await getCostAndUsage(costStartDate, costEndDate);

  if (costData.length > 0) {
    const serviceCosts = {};

    costData.forEach(day => {
      day.Groups?.forEach(group => {
        const service = group.Keys?.[0] || 'Unknown';
        const cost = parseFloat(group.Metrics?.BlendedCost?.Amount || '0');

        if (!serviceCosts[service]) {
          serviceCosts[service] = 0;
        }
        serviceCosts[service] += cost;
      });
    });

    // Sort by cost descending
    const sortedServices = Object.entries(serviceCosts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // Top 10 services

    sortedServices.forEach(([service, cost]) => {
      console.log(`${service}: $${cost.toFixed(4)}`);
    });
  } else {
    console.log('No cost data available (Cost Explorer may need time to populate)');
  }

  console.log('');
  console.log('💡 Optimization Recommendations:');
  console.log('-------------------------------');
  console.log('• Lambda memory allocation optimized for cost/performance balance');
  console.log('• Consider provisioned concurrency for frequently called functions');
  console.log('• Monitor CloudFront costs - ensure proper caching headers');
  console.log('• Review AppSync query complexity and caching');
  console.log('• Consider reserved instances for consistent high usage');
}

// Run the monitoring
if (require.main === module) {
  monitorCosts().catch(console.error);
}

module.exports = { monitorCosts };