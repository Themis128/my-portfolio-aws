import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myapp-storage',
  access: (allow) => ({
    'auth/Authenticated': [
      allow.createAndReadAssets(),
      allow.updateAssets(),
      allow.deleteAssets(),
    ],
  }),
});
