import { defineFunction } from '@aws-amplify/backend';

export const analyticsHandler = defineFunction({
  name: 'analytics-handler',
  entry: './handler.ts',
  runtime: 20,
  // Cost optimization: 256MB for lightweight analytics tracking
  memoryMB: 256,
  // Shorter timeout for analytics operations
  timeoutSeconds: 15,
  environment: {
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://kl4own6nqnegdfliofccu5klza.appsync-api.eu-central-1.amazonaws.com/graphql',
    AMPLIFY_DATA_API_KEY: 'da2-4sp2psirnncn7lgrly3bndxksy',
  },
});