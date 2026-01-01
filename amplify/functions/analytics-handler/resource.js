import { defineFunction } from '@aws-amplify/backend';
export const analyticsHandler = defineFunction({
    name: 'analytics-handler',
    entry: './handler.ts',
    runtime: 20,
    environment: {
        AMPLIFY_DATA_GRAPHQL_ENDPOINT: 'https://ggbslhgtjbgkzcnbm7kfq3z6ku.appsync-api.eu-central-1.amazonaws.com/graphql',
        AMPLIFY_DATA_API_KEY: 'da2-4sp2psirnncn7lgrly3bndxksy',
    },
});
