import { defineFunction } from '@aws-amplify/backend';

export const analyticsHandler = defineFunction({
  name: 'analytics-handler',
  entry: './handler.ts',
  runtime: 20,
  environment: {
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://52sbnvcfvvh6bmnpumczqlfihi.appsync-api.eu-central-1.amazonaws.com/graphql',
    AMPLIFY_DATA_API_KEY: 'da2-nz4qfcj7lne3dbeknww64vwala',
  },
});