import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { contactHandler } from './functions/contact-handler/resource';

defineBackend({
  data,
  contactHandler,
});
