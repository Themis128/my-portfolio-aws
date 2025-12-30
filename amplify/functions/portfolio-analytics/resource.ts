import { defineFunction } from '@aws-amplify/backend';

export const portfolioAnalytics = defineFunction({
  name: 'portfolio-analytics',
  entry: './handler.ts',
  runtime: 20,
});