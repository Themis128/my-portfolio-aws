import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { contactHandler } from '../functions/contact-handler/resource';
import { slackHandler } from '../functions/slack-handler/resource';
import { analyticsHandler } from '../functions/analytics-handler/resource';

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
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
