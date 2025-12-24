import { defineData } from '@aws-amplify/backend';
import { auth } from '../auth/resource';

export const data = defineData({
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    userPoolConfig: {
      userPool: auth.resources.userPool,
    },
  },
  schema: `
    type Todo @model @auth(rules: [{ allow: owner }]) {
      id: ID!
      content: String!
      completed: Boolean
    }
  `,
});
