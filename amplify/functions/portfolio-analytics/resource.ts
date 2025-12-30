import { defineFunction } from '@aws-amplify/backend';

export const portfolioAnalytics = defineFunction({
  name: 'portfolio-analytics',
  entry: './handler.ts',
  runtime: 22, // Updated to Node.js 22 (current LTS)
  memoryMB: 128, // Standard memory allocation
  timeoutSeconds: 10, // Standard timeout
});
