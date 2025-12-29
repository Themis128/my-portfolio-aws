import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  entry: './handler.ts',
  runtime: 20,
});
