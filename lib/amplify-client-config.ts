'use client';

import { Amplify } from 'aws-amplify';

// Amplify configuration for frontend-only deployment
// This configuration connects to the existing backend API
const amplifyconfig = {
  data: {
    url: "https://52sbnvcfvvh6bmnpumczqlfihi.appsync-api.eu-central-1.amazonaws.com/graphql",
    aws_region: "eu-central-1",
    api_key: "da2-nz4qfcj7lne3dbeknww64vwala",
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

// Configure Amplify immediately when this module is loaded in the browser
// This ensures Amplify is configured before any components that use it are rendered
if (typeof window !== 'undefined') {
  try {
    Amplify.configure(amplifyconfig, {
      ssr: false, // Disable SSR mode for static export
    });
    console.log('✅ Amplify configured successfully for client-side usage');
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
  }
}

// Export the configuration for use in components if needed
export default amplifyconfig;

// Export a function to ensure Amplify is configured (for use in components)
export const ensureAmplifyConfigured = () => {
  if (typeof window !== 'undefined') {
    try {
      // Try to get the current config to check if Amplify is already configured
      const currentConfig = Amplify.getConfig();
      // If we can get config without error, Amplify is likely configured
      if (currentConfig && typeof currentConfig === 'object') {
        console.log('✅ Amplify already configured');
        return;
      }
    } catch (error) {
      // If getConfig throws an error, Amplify is not configured
      try {
        Amplify.configure(amplifyconfig, {
          ssr: false,
        });
        console.log('✅ Amplify configured successfully');
      } catch (configError) {
        console.error('❌ Failed to configure Amplify:', configError);
      }
    }
  }
};
