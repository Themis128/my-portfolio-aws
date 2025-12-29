import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { slackNotifier } from './functions/slack-notifier/resource';

// Backend definition for portfolio AWS
defineBackend({
  data,
  contactHandler,
  slackNotifier,
});
