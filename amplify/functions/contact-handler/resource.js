import { defineFunction } from '@aws-amplify/backend';
export const contactHandler = defineFunction({
    name: 'contact-handler',
    entry: './handler.ts',
    runtime: 20,
    environment: {
        SLACK_WEBHOOK_URL: 'REDACTED_SLACK_WEBHOOK_URL',
        AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://ggbslhgtjbgkzcnbm7kfq3z6ku.appsync-api.eu-central-1.amazonaws.com/graphql',
        AMPLIFY_DATA_API_KEY: 'da2-4sp2psirnncn7lgrly3bndxksy',
    },
});
