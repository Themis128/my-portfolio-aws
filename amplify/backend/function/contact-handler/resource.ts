import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  entry: './handler.ts',
  runtime: 'nodejs20.x',
});
