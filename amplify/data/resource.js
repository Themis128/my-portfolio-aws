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
    // Dashboard models
    User: a
        .model({
        id: a.id().required(),
        name: a.string().required(),
        email: a.string().required(),
        role: a.enum(['User', 'Moderator', 'Admin']),
        status: a.enum(['Active', 'Inactive']),
        lastLogin: a.datetime(),
        createdAt: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    SystemMetric: a
        .model({
        id: a.id().required(),
        metricType: a.enum(['cpu', 'memory', 'storage', 'network']),
        value: a.float().required(),
        timestamp: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    ActivityLog: a
        .model({
        id: a.id().required(),
        type: a.enum(['security', 'system', 'maintenance', 'config']),
        message: a.string().required(),
        userId: a.string(),
        timestamp: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    Alert: a
        .model({
        id: a.id().required(),
        type: a.enum(['warning', 'error', 'info', 'success']),
        message: a.string().required(),
        resolved: a.boolean().required(),
        resolvedAt: a.datetime(),
        createdAt: a.datetime().required(),
    })
        .authorization((allow) => [allow.publicApiKey()]),
    // Audit log model for admin actions
    AuditLog: a
        .model({
        id: a.id().required(),
        action: a.string().required(),
        resource: a.string().required(),
        resourceId: a.string(),
        userId: a.string(),
        details: a.json(),
        ipAddress: a.string(),
        userAgent: a.string(),
        timestamp: a.datetime().required(),
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
        aiModel: a.ai.model('Claude 3.5 Sonnet'),
        systemPrompt: `You are an AI assistant for Themistoklis Baltzakis' portfolio. 
    Help users learn about his background, skills, projects, experience, and expertise in data analytics, cloud computing, and network engineering.
    Provide helpful, accurate information about his professional experience and technical skills.`,
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
