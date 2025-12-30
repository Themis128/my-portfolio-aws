import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { contactHandler } from './functions/contact-handler/resource';
import { emailSender } from './functions/email-sender/resource';
import { portfolioAnalytics } from './functions/portfolio-analytics/resource';
import { slackNotifier } from './functions/slack-notifier/resource';

// Backend definition for portfolio AWS
defineBackend({
  data,
  contactHandler,
  emailSender,
  slackNotifier,
  portfolioAnalytics,
});
