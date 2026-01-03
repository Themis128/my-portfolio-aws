import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { analyticsHandler } from './functions/analytics-handler/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { dailyReminder } from './functions/daily-reminder/resource';
import { sayHello } from './functions/say-hello/resource';
import { slackHandler } from './functions/slack-handler/resource';
import { weeklyDigest } from './functions/weekly-digest/resource';

// Example of using secrets in auth configuration (uncomment when needed):
/*
import { secret } from '@aws-amplify/backend';

// Update auth/resource.ts to use secrets like this:
/*
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      // Example: Facebook login with secrets
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET')
      },
      // Example: Google login with secrets
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET')
      }
    }
  }
});
*/

const backend = defineBackend({
  auth,
  data,
  contactHandler,
  slackHandler,
  analyticsHandler,
  sayHello,
  weeklyDigest,
  dailyReminder,
});

export { backend };
