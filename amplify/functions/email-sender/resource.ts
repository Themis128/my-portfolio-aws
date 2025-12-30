import { defineFunction } from '@aws-amplify/backend';

export const emailSender = defineFunction({
  name: 'email-sender',
  entry: './handler.ts',
  runtime: 22, // Updated to Node.js 22 (current LTS)
  memoryMB: 256,
  timeoutSeconds: 30,
});
