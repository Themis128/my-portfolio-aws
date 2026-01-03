#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 PWA Configuration Validation\n');

// Check manifest.json
try {
  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  console.log('✅ Web App Manifest:');
  console.log(`   Name: ${manifest.name}`);
  console.log(`   Short Name: ${manifest.short_name}`);
  console.log(`   Start URL: ${manifest.start_url}`);
  console.log(`   Display: ${manifest.display}`);
  console.log(`   Theme Color: ${manifest.theme_color}`);
  console.log(`   Icons: ${manifest.icons.length} defined`);
  console.log('');
} catch (error) {
  console.log('❌ Web App Manifest: Error reading or parsing manifest.json');
  console.log(`   Error: ${error.message}`);
  console.log('');
}

// Check service worker
try {
  const swPath = path.join(__dirname, 'public', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');

  console.log('✅ Service Worker:');
  console.log(`   File exists: ${fs.existsSync(swPath)}`);
  console.log(`   Size: ${swContent.length} characters`);
  console.log(
    `   Contains caching logic: ${swContent.includes('registerRoute')}`
  );
  console.log(
    `   Contains precaching: ${swContent.includes('precacheAndRoute')}`
  );
  console.log('');
} catch (error) {
  console.log('❌ Service Worker: Error reading sw.js');
  console.log(`   Error: ${error.message}`);
  console.log('');
}

// Check next.config.ts for PWA configuration
try {
  const configPath = path.join(__dirname, 'next.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');

  console.log('✅ Next.js Configuration:');
  console.log(`   Contains withPWA: ${configContent.includes('withPWA')}`);
  console.log(
    `   PWA disabled in dev: ${configContent.includes(
      "disable: process.env.NODE_ENV === 'development'"
    )}`
  );
  console.log(
    `   Custom SW path: ${configContent.includes("sw: 'public/sw.js'")}`
  );
  console.log('');
} catch (error) {
  console.log('❌ Next.js Configuration: Error reading next.config.ts');
  console.log(`   Error: ${error.message}`);
  console.log('');
}

// Check layout.tsx for PWA meta tags
try {
  const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  console.log('✅ Layout Configuration:');
  console.log(
    `   Contains manifest link: ${layoutContent.includes(
      'href="/manifest.json"'
    )}`
  );
  console.log(
    `   Contains theme-color: ${layoutContent.includes('name="theme-color"')}`
  );
  console.log(
    `   Contains apple-touch-icon: ${layoutContent.includes(
      'apple-touch-icon'
    )}`
  );
  console.log(
    `   Contains InstallPrompt: ${layoutContent.includes('<InstallPrompt />')}`
  );
  console.log('');
} catch (error) {
  console.log('❌ Layout Configuration: Error reading layout.tsx');
  console.log(`   Error: ${error.message}`);
  console.log('');
}

// Check InstallPrompt component
try {
  const installPromptPath = path.join(
    __dirname,
    'components',
    'InstallPrompt.tsx'
  );
  const installPromptContent = fs.readFileSync(installPromptPath, 'utf8');

  console.log('✅ InstallPrompt Component:');
  console.log(`   File exists: ${fs.existsSync(installPromptPath)}`);
  console.log(
    `   Contains beforeinstallprompt: ${installPromptContent.includes(
      'beforeinstallprompt'
    )}`
  );
  console.log(
    `   Contains install logic: ${installPromptContent.includes(
      'deferredPrompt.prompt'
    )}`
  );
  console.log('');
} catch (error) {
  console.log('❌ InstallPrompt Component: Error reading InstallPrompt.tsx');
  console.log(`   Error: ${error.message}`);
  console.log('');
}

console.log('🎯 PWA Testing Instructions:');
console.log('');
console.log('1. Development Mode (PWA disabled):');
console.log('   pnpm dev');
console.log('   - Visit http://localhost:3000');
console.log('   - Check browser console for any PWA-related errors');
console.log('');
console.log('2. Production Build (PWA enabled):');
console.log('   pnpm build && pnpm start');
console.log('   - Test on mobile devices for install prompts');
console.log('   - Use Chrome DevTools → Application → Manifest');
console.log('   - Run Lighthouse PWA audit');
console.log('');
console.log('3. Manual PWA Checks:');
console.log('   - Manifest: Visit /manifest.json');
console.log(
  '   - Service Worker: Check DevTools → Application → Service Workers'
);
console.log('   - Storage: Check DevTools → Application → Storage');
console.log('');
console.log('✨ PWA setup validation complete!');
