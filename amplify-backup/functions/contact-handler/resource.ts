import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  entry: './handler.ts',
  runtime: 20,
  environment: {
    SLACK_WEBHOOK_URL: 'REDACTED_SLACK_WEBHOOK_URL',
  },
});