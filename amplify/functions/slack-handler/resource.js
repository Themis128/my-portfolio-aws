import { defineFunction } from '@aws-amplify/backend';
export const slackHandler = defineFunction({
    name: 'slack-handler',
    entry: './handler.ts',
    runtime: 20,
    // Cost optimization: 256MB for Slack notifications
    memoryMB: 256,
    // Short timeout for notification operations
    timeoutSeconds: 10,
    environment: {
        SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || 'REDACTED_SLACK_WEBHOOK_URL',
    },
});
