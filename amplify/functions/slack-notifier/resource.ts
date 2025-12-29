import { defineFunction } from '@aws-amplify/backend';

export const slackNotifier = defineFunction({
  name: 'slack-notifier',
  entry: './handler.ts',
  runtime: 20,
  memoryMB: 128,
  timeoutSeconds: 10,
});
