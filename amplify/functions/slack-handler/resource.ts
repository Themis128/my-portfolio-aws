import { defineFunction } from '@aws-amplify/backend';

export const slackHandler = defineFunction({
  name: 'slack-handler',
  entry: './handler.ts',
  runtime: 20,
  environment: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || 'REDACTED_SLACK_WEBHOOK_URL',
  },
});