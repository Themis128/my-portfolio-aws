import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import { Amplify } from "aws-amplify";

// Configure Amplify with AI support
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_AMPLIFY_API_ENDPOINT || "https://kl4own6nqnegdfliofccu5klza.appsync-api.eu-central-1.amazonaws.com/graphql",
      region: process.env.NEXT_PUBLIC_AMPLIFY_REGION || "eu-central-1",
      defaultAuthMode: 'userPool',
    }
  }
}, { ssr: true });

export const client = generateClient<Schema>({ authMode: "userPool" });
export const { useAIConversation, useAIGeneration } = createAIHooks(client);
