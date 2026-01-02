import { Amplify } from 'aws-amplify';
import amplifyOutputs from '../amplify_outputs.json';

// Define proper types
interface AmplifyConfig {
  [key: string]: unknown;
}

interface AmplifyOutputs {
  default?: AmplifyConfig;
  [key: string]: unknown;
}

// Configure Amplify synchronously with static import
const configureAmplify = (): AmplifyConfig => {
  try {
    // Use the statically imported config
    const config = amplifyOutputs;

    Amplify.configure(config, {
      ssr: true, // Enable SSR mode for server-side rendering
    });

    console.log(`✅ Amplify configured successfully`);
    return config;
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
    throw error;
  }
};

// Configure Amplify immediately when this module is loaded
let cachedConfig: AmplifyConfig | null = null;

const getAmplifyConfig = (): AmplifyConfig => {
  if (!cachedConfig) {
    cachedConfig = configureAmplify();
  }
  return cachedConfig;
};

// Initialize configuration
getAmplifyConfig();

// Export the configuration for use in components if needed
export const getCachedAmplifyConfig = (): AmplifyConfig | null => cachedConfig;

// Export a function to ensure Amplify is configured (for use in components)
export const ensureAmplifyConfigured = (): void => {
  getAmplifyConfig();
};

// For backward compatibility, export a default config object
// This will be populated after configuration
const defaultConfig: AmplifyConfig = {};
Object.assign(defaultConfig, cachedConfig || {});
export default defaultConfig;
