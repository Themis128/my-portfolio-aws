import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  entry: './handler.ts',
  runtime: 20,
  environment: {
    SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
  },
});