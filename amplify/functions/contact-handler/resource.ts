import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  runtime: 22, // Updated to Node.js 22 (current LTS)
  memoryMB: 256, // Increased for better performance
  timeoutSeconds: 15, // Slightly increased timeout for email operations
});
