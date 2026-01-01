import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { analyticsHandler } from './functions/analytics-handler/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { dailyReminder } from './functions/daily-reminder/resource';
import { sayHello } from './functions/say-hello/resource';
import { slackHandler } from './functions/slack-handler/resource';
import { weeklyDigest } from './functions/weekly-digest/resource';

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