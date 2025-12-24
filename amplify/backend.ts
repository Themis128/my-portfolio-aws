import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './api/resource';
import { storage } from './storage/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
});

export default backend;
