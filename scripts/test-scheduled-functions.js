#!/usr/bin/env node

/**
 * Test script for scheduled functions
 *
 * This script allows you to manually test scheduled functions locally
 * by simulating EventBridge scheduled events.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require('path');

// Import the handlers (in a real scenario, these would be deployed Lambda functions)
async function testWeeklyDigest() {
  console.log('🧪 Testing Weekly Digest Function...\n');

  try {
    // Simulate EventBridge event
    const event = {
      source: 'aws.events',
      'detail-type': 'Scheduled Event',
      time: new Date().toISOString(),
      detail: {}
    };

    // Import and call the handler
    const { handler } = require('../amplify/functions/weekly-digest/handler.ts');

    await handler(event, {}, () => {});
    console.log('✅ Weekly Digest test completed successfully\n');
  } catch (error) {
    console.error('❌ Weekly Digest test failed:', error.message);
  }
}

async function testDailyReminder() {
  console.log('🧪 Testing Daily Reminder Function...\n');

  try {
    // Simulate EventBridge event
    const event = {
      source: 'aws.events',
      'detail-type': 'Scheduled Event',
      time: new Date().toISOString(),
      detail: {}
    };

    // Import and call the handler
    const { handler } = require('../amplify/functions/daily-reminder/handler.ts');

    await handler(event, {}, () => {});
    console.log('✅ Daily Reminder test completed successfully\n');
  } catch (error) {
    console.error('❌ Daily Reminder test failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Scheduled Functions Test Suite\n');

  const args = process.argv.slice(2);

  if (args.includes('--weekly') || args.includes('--all')) {
    await testWeeklyDigest();
  }

  if (args.includes('--daily') || args.includes('--all')) {
    await testDailyReminder();
  }

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  --weekly    Test weekly digest function');
    console.log('  --daily     Test daily reminder function');
    console.log('  --all       Test all scheduled functions');
    console.log('\nExample: node test-scheduled-functions.js --all');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testWeeklyDigest, testDailyReminder };