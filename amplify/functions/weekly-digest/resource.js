import { defineFunction } from '@aws-amplify/backend';
/**
 * Weekly Digest Scheduled Function
 *
 * This function runs every week to generate a weekly digest of activities.
 * It demonstrates scheduled function capabilities using natural language scheduling.
 */
export const weeklyDigest = defineFunction({
    // Function name
    name: 'weekly-digest',
    // Entry point for the function handler
    entry: './handler.ts',
    // Schedule: runs every week (Sundays at midnight)
    schedule: 'every week',
    // Function configuration
    timeoutSeconds: 300, // 5 minutes for processing
    memoryMB: 512,
    // Node.js runtime
    runtime: 20,
    // Environment variables
    environment: {
        DIGEST_TYPE: 'weekly',
        TIMEZONE: 'UTC'
    },
    // Resource group
    resourceGroupName: 'scheduled-functions'
});
