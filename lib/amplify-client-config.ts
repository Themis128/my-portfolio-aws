'use client';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplify_outputs.json';

// Configure Amplify for client-side usage
// This ensures the configuration is applied in the browser
if (typeof window !== 'undefined') {
  Amplify.configure(amplifyconfig, {
    ssr: false, // Disable SSR mode for static export
  });
}

export default amplifyconfig;
