import { defineFunction } from '@aws-amplify/backend';

export const slackNotifier = defineFunction({
  name: 'slack-notifier',
  entry: './handler.ts',
  runtime: 20,
  memoryMB: 128,
  timeoutSeconds: 10,
  environment: {
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || '',
    // Optional: name of the SSM SecureString parameter that contains the Slack bot token
    SLACK_SSM_PARAM: process.env.SLACK_SSM_PARAM || '',
  },
});
