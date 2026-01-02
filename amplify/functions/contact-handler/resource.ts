import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  runtime: 20,
  environment: {
    SLACK_WEBHOOK_URL: 'REDACTED_SLACK_WEBHOOK_URL',
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://kl4own6nqnegdfliofccu5klza.appsync-api.eu-central-1.amazonaws.com/graphql',
    AMPLIFY_DATA_API_KEY: 'da2-gkzrnvmpgrclhfmtocc4melqye',
  },
});