import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  runtime: 20,
  // Cost optimization: 512MB for better performance/cost ratio
  // This function handles GraphQL, SES email, and Slack notifications
  memoryMB: 512,
  // Timeout optimization: 30 seconds should be sufficient for all operations
  timeoutSeconds: 30,
  environment: {
    SLACK_WEBHOOK_URL: 'REDACTED_SLACK_WEBHOOK_URL',
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://kl4own6nqnegdfliofccu5klza.appsync-api.eu-central-1.amazonaws.com/graphql',
    AMPLIFY_DATA_API_KEY: 'da2-gkzrnvmpgrclhfmtocc4melqye',
  },
});