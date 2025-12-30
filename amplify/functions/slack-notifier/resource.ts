import { defineFunction } from '@aws-amplify/backend';

export const slackNotifier = defineFunction({
  name: 'slack-notifier',
  entry: './handler.ts',
  runtime: 22, // Updated to Node.js 22 (current LTS)
  memoryMB: 128,
  timeoutSeconds: 15, // Increased for Slack API calls
  environment: {
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || '',
    // Optional: name of the SSM SecureString parameter that contains the Slack bot token
    SLACK_SSM_PARAM: process.env.SLACK_SSM_PARAM || '',
  },
});
