'use client';

import { Amplify } from 'aws-amplify';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load amplify config - works in both build time and runtime
let amplifyconfig;

try {
  // Try to load from file system (development/build time)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  amplifyconfig = JSON.parse(readFileSync(join(__dirname, '../amplify_outputs.json'), 'utf8'));
} catch {
  // Fallback for runtime when file doesn't exist
  amplifyconfig = {
    data: {
      url: "https://74de5bh225e2xjbmaux7e6fcsq.appsync-api.eu-central-1.amazonaws.com/graphql",
      aws_region: "eu-central-1",
      api_key: "da2-ht5uhvqma5fcnnxemn47mnbhya",
      default_authorization_type: "API_KEY",
      authorization_types: ["AWS_IAM"],
      model_introspection: {
        version: 1,
        models: {
          Contact: {
            name: "Contact",
            fields: {
              id: { name: "id", isArray: false, type: "ID", isRequired: true, attributes: [] },
              name: { name: "name", isArray: false, type: "String", isRequired: true, attributes: [] },
              email: { name: "email", isArray: false, type: "String", isRequired: true, attributes: [] },
              message: { name: "message", isArray: false, type: "String", isRequired: true, attributes: [] },
              createdAt: { name: "createdAt", isArray: false, type: "AWSDateTime", isRequired: true, attributes: [] },
              updatedAt: { name: "updatedAt", isArray: false, type: "AWSDateTime", isRequired: false, attributes: [], isReadOnly: true }
            },
            syncable: true,
            pluralName: "Contacts",
            attributes: [
              { type: "model", properties: {} },
              { type: "key", properties: { fields: ["id"] } },
              { type: "auth", properties: { rules: [{ allow: "public", provider: "apiKey", operations: ["create", "update", "delete", "read"] }] } }
            ],
            primaryKeyInfo: { isCustomPrimaryKey: false, primaryKeyFieldName: "id", sortKeyFieldNames: [] }
          }
        },
        enums: {},
        nonModels: {},
        mutations: {
          sendContact: {
            name: "sendContact",
            isArray: false,
            type: "String",
            isRequired: false,
            arguments: {
              name: { name: "name", isArray: false, type: "String", isRequired: true },
              email: { name: "email", isArray: false, type: "String", isRequired: true },
              message: { name: "message", isArray: false, type: "String", isRequired: true }
            }
          },
          sendSlackNotification: {
            name: "sendSlackNotification",
            isArray: false,
            type: "String",
            isRequired: false,
            arguments: {
              message: { name: "message", isArray: false, type: "String", isRequired: true },
              channel: { name: "channel", isArray: false, type: "String", isRequired: false }
            }
          },
          trackAnalytics: {
            name: "trackAnalytics",
            isArray: false,
            type: "String",
            isRequired: false,
            arguments: {
              eventType: { name: "eventType", isArray: false, type: "String", isRequired: true },
              page: { name: "page", isArray: false, type: "String", isRequired: false },
              userAgent: { name: "userAgent", isArray: false, type: "String", isRequired: false },
              referrer: { name: "referrer", isArray: false, type: "String", isRequired: false },
              metadata: { name: "metadata", isArray: false, type: "AWSJSON", isRequired: false }
            }
          }
        }
      }
    },
    version: "1.4"
  };
}

// Configure Amplify for client-side usage
// This ensures the configuration is applied in the browser
if (typeof window !== 'undefined') {
  Amplify.configure(amplifyconfig, {
    ssr: false, // Disable SSR mode for static export
  });
}

export default amplifyconfig;
