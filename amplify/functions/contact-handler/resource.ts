import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  runtime: 20,
  memoryMB: 128,
  timeoutSeconds: 10,
});