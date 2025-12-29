import { a, defineData } from '@aws-amplify/backend';
const schema = a.schema({
    Contact: a
        .model({
        id: a.id().required(),
        name: a.string().required(),
        email: a.string().required(),
        message: a.string().required(),
        createdAt: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
});
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
