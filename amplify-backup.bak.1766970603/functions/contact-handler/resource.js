import { defineFunction } from '@aws-amplify/backend';
export const contactHandler = defineFunction({
    entry: './handler.ts',
    runtime: 20,
    environment: {
        SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
    },
});
