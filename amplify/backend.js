import { defineBackend } from '@aws-amplify/backend';
import { data } from './backend/data/resource';
import { contactHandler } from './backend/function/contact-handler/resource';
defineBackend({
    data,
    contactHandler,
});
