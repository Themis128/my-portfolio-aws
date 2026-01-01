import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplify_outputs.json';

// Configure Amplify immediately when this module is loaded
// This ensures Amplify is configured before any components that use it are rendered
try {
  Amplify.configure(amplifyconfig, {
    ssr: false, // Disable SSR mode for static export
  });
  console.log('✅ Amplify configured successfully');
} catch (error) {
  console.error('❌ Failed to configure Amplify:', error);
}

// Export the configuration for use in components if needed
export default amplifyconfig;

// Export a function to ensure Amplify is configured (for use in components)
export const ensureAmplifyConfigured = () => {
  // Amplify is configured at import time, so this is a no-op
};
