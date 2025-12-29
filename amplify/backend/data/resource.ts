import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { contactHandler } from '../../functions/contact-handler/resource';
import { slackNotifier } from '../../functions/slack-notifier/resource';

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
  sendContact: a
    .mutation()
    .arguments({
      name: a.string().required(),
      email: a.string().required(),
      message: a.string().required(),
    })
    .returns(a.string())
    .handler(a.handler.function(contactHandler))
    .authorization((allow) => [allow.publicApiKey()]),
  sendSlackNotification: a
    .mutation()
    .arguments({
      message: a.string().required(),
      channel: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(slackNotifier))
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
