import { defineFunction } from '@aws-amplify/backend';

export const emailSender = defineFunction({
  name: 'email-sender',
  entry: './handler.ts',
  runtime: 20,
  memoryMB: 256,
  timeoutSeconds: 30,
});
