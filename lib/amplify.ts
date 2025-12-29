import { Amplify } from 'aws-amplify';
import fs from 'fs';
import path from 'path';

// Safely load Amplify outputs if available. In CI builds the backend outputs
// may not be present yet, so avoid failing the build when the file is missing.
const outputsPath = path.join(process.cwd(), 'amplify_outputs.json');
if (fs.existsSync(outputsPath)) {
  try {
    const amplifyconfig = JSON.parse(fs.readFileSync(outputsPath, 'utf8'));
    Amplify.configure(amplifyconfig);
  } catch (e) {
    // If parsing fails, log and continue without configuration
    // (backend features will be unavailable until amplify_outputs.json is present)
    console.warn('Failed to parse amplify_outputs.json, skipping Amplify.configure:', e);
  }
} else {
  console.warn('amplify_outputs.json not found; skipping Amplify.configure(). Backend features may be unavailable during this build.');
}