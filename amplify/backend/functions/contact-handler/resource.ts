import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  environment: {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  },
});