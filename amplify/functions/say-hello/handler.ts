// import { env } from '$amplify/env/say-hello';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { Amplify } from 'aws-amplify';
// import { Logger } from "@aws-lambda-powertools/logger";

// const logger = new Logger({ serviceName: "portfolio-say-hello" });

export const handler = async (event: { arguments?: { name?: string } }) => {
  // Configure Amplify client library for use within the function
  // This allows the function to interact with other Amplify resources
  // const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);
  // Amplify.configure(resourceConfig, libraryOptions);

  // arguments typed from the schema
  const { name } = event.arguments || {};

  console.log("Processing say hello request", { name });

  // Use environment variables and secrets
  const greeting = `Hello, ${name || process.env.NAME || 'World'}!`;

  // Example of using a secret (API_KEY) - in a real scenario you'd use it for API calls
  const hasApiKey = process.env.API_KEY ? 'with API key' : 'without API key';
  const apiEndpoint = process.env.API_ENDPOINT || 'no endpoint configured';

  console.log("Generated greeting", { greeting, hasApiKey, apiEndpoint });

  // Example: If this function needed to query other Amplify resources,
  // it could now use the configured Amplify client

  const response = {
    message: greeting,
    apiEndpoint: apiEndpoint,
    hasApiKey: hasApiKey,
    timestamp: new Date().toISOString(),
    // Include function configuration info for demonstration
    functionConfig: {
      timeoutSeconds: 30,
      memoryMB: 256,
      runtime: 'nodejs20.x'
    }
  };

  console.log("Returning response", { response });

  return response;
};