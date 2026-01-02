import { Amplify } from 'aws-amplify';

// Define proper types
interface AmplifyConfig {
  [key: string]: unknown;
}

interface AmplifyOutputs {
  default?: AmplifyConfig;
  [key: string]: unknown;
}

// Dynamic import to handle build-time issues
const loadAmplifyConfig = async (): Promise<AmplifyConfig> => {
  try {
    // Try multiple possible locations for amplify_outputs.json
    const possiblePaths = [
      './amplify_outputs.json',
      '../amplify_outputs.json',
      './amplify/amplify_outputs.json'
    ];

    let amplifyconfig: AmplifyOutputs | null = null;
    let loadedPath = '';

    for (const path of possiblePaths) {
      try {
        amplifyconfig = await import(path);
        loadedPath = path;
        break;
      } catch {
        // Continue to next path
      }
    }

    if (!amplifyconfig) {
      throw new Error('Could not find amplify_outputs.json in any expected location');
    }

    // Handle both default and named exports
    const config = amplifyconfig.default || amplifyconfig;

    Amplify.configure(config, {
      ssr: false, // Disable SSR mode for static export
    });

    console.log(`✅ Amplify configured successfully from ${loadedPath}`);
    return config;
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
    throw error;
  }
};

// Configure Amplify immediately when this module is loaded
// This ensures Amplify is configured before any components that use it are rendered
let amplifyConfigPromise: Promise<AmplifyConfig> | null = null;
let cachedConfig: AmplifyConfig | null = null;

const configureAmplify = async (): Promise<AmplifyConfig> => {
  if (cachedConfig) return cachedConfig;
  if (amplifyConfigPromise) return amplifyConfigPromise;

  amplifyConfigPromise = loadAmplifyConfig();
  cachedConfig = await amplifyConfigPromise;
  return cachedConfig;
};

// Initialize configuration
configureAmplify().catch(console.error);

// Export the configuration for use in components if needed
export const getAmplifyConfig = (): AmplifyConfig | null => cachedConfig;

// Export a function to ensure Amplify is configured (for use in components)
export const ensureAmplifyConfigured = async (): Promise<void> => {
  await configureAmplify();
};

// For backward compatibility, export a default config object
// This will be populated after configuration
const defaultConfig: AmplifyConfig = {};
export default defaultConfig;
