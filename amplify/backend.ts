import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { slackHandler } from './functions/slack-handler/resource';
import { analyticsHandler } from './functions/analytics-handler/resource';

defineBackend({
  data,
  contactHandler,
  slackHandler,
  analyticsHandler,
});