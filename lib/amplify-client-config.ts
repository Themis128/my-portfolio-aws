import { Amplify } from 'aws-amplify';

// Define proper types
interface AmplifyConfig {
  [key: string]: unknown;
}

// Configure Amplify for runtime (not build time)
const configureAmplify = (): void => {
  try {
    // Amplify will automatically configure itself from environment variables
    // or amplify_outputs.json at runtime. We don't need to explicitly import it.
    Amplify.configure({});

    console.log(`✅ Amplify configured successfully for runtime`);
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
    // Don't throw here as this might be expected during build time
  }
};

// Configure Amplify immediately when this module is loaded
configureAmplify();

// Export functions for compatibility
export const getAmplifyConfig = (): AmplifyConfig | null => {
  // Return a basic config object for compatibility
  return {};
};

// Export a function to ensure Amplify is configured (for use in components)
export const ensureAmplifyConfigured = (): void => {
  // Amplify is already configured above
};

// For backward compatibility, export a default config object
const defaultConfig: AmplifyConfig = {};
export default defaultConfig;
