import { defineFunction, secret } from '@aws-amplify/backend';

/**
 * SayHello Function Configuration
 *
 * This function demonstrates various configuration options available for Amplify Functions:
 * - Custom timeout, memory, and storage allocation
 * - Environment variables and secrets management
 * - Node.js runtime specification
 * - Resource grouping
 * - Lambda layers for dependency management
 */
export const sayHello = defineFunction({
  // Function name (defaults to directory name 'say-hello')
  name: 'say-hello',

  // Entry point for the function handler
  entry: './handler.ts',

  // Timeout in seconds (default: 3, max: 900)
  timeoutSeconds: 30,

  // Memory allocation in MB (default: 512, range: 128-10240)
  memoryMB: 256,

  // Ephemeral storage in MB (default: 512, range: 512-10240)
  ephemeralStorageSizeMB: 512,

  // Node.js runtime version (default: 18)
  runtime: 20,

  // Environment variables and secrets
  environment: {
    NAME: 'World',
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://api.example.com',
    API_KEY: secret('MY_API_KEY')
  },

  // Lambda layers for shared dependencies
  layers: {
    "@aws-lambda-powertools/logger":
      "arn:aws:lambda:eu-central-1:094274105915:layer:AWSLambdaPowertoolsTypeScriptV2:12",
  },

  // Resource group name (default: 'function')
  resourceGroupName: 'function'
});