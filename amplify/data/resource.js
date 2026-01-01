import { a, defineData } from '@aws-amplify/backend';
import { analyticsHandler } from '../functions/analytics-handler/resource';
import { contactHandler } from '../functions/contact-handler/resource';
import { sayHello } from '../functions/say-hello/resource';
import { slackHandler } from '../functions/slack-handler/resource';
const schema = a.schema({
    // Define custom types first
    FunctionConfig: a.customType({
        timeoutSeconds: a.integer(),
        memoryMB: a.integer(),
        runtime: a.string(),
    }),
    Contact: a
        .model({
        id: a.id().required(),
        name: a.string().required(),
        email: a.string().required(),
        message: a.string().required(),
        createdAt: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    Analytics: a
        .model({
        id: a.id().required(),
        eventType: a.string().required(),
        page: a.string(),
        userAgent: a.string(),
        referrer: a.string(),
        metadata: a.json(),
        createdAt: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    sendContact: a.mutation()
        .arguments({
        name: a.string().required(),
        email: a.string().required(),
        message: a.string().required(),
    })
        .returns(a.string())
        .handler(a.handler.function(contactHandler))
        .authorization((allow) => [allow.publicApiKey()]),
    sendSlackNotification: a.mutation()
        .arguments({
        message: a.string().required(),
        channel: a.string(),
    })
        .returns(a.string())
        .handler(a.handler.function(slackHandler))
        .authorization((allow) => [allow.publicApiKey()]),
    trackAnalytics: a.mutation()
        .arguments({
        eventType: a.string().required(),
        page: a.string(),
        userAgent: a.string(),
        referrer: a.string(),
        metadata: a.json(),
    })
        .returns(a.string())
        .handler(a.handler.function(analyticsHandler))
        .authorization((allow) => [allow.publicApiKey()]),
    sayHello: a
        .query()
        .arguments({
        name: a.string(),
    })
        .returns(a.customType({
        message: a.string(),
        apiEndpoint: a.string(),
        hasApiKey: a.string(),
        timestamp: a.string(),
        functionConfig: a.ref('FunctionConfig').required(),
    }))
        .authorization(allow => [allow.guest()])
        .handler(a.handler.function(sayHello)),
    // AI routes
    chat: a.conversation({
        aiModel: a.ai.model('Claude 3.5 Haiku'),
        systemPrompt: 'You are a helpful assistant for a software developer portfolio. You can discuss projects, skills, technologies, and provide advice on software development.',
    })
        .authorization((allow) => allow.owner()),
    generateProjectIdea: a.generation({
        aiModel: a.ai.model('Claude 3.5 Haiku'),
        systemPrompt: 'You are a creative assistant that generates innovative software project ideas based on user input.',
    })
        .arguments({
        technologies: a.string(),
        category: a.string(),
    })
        .returns(a.customType({
        title: a.string(),
        description: a.string(),
        technologies: a.string().array(),
        complexity: a.string(),
    }))
        .authorization((allow) => allow.guest()),
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
