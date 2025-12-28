// ================================================
// Cloudless.gr Brand Colors for Tailwind CSS
// Add to tailwind.config.ts
// ================================================

import type { Config } from 'tailwindcss';

export const cloudlessColors = {
  cloudless: {
    primary: {
      DEFAULT: '#0284c7',
      light: '#38bdf8',
      dark: '#0369a1',
      darker: '#0c4a6e',
    },
    sky: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    cloud: {
      white: '#ffffff',
      light: '#f0f9ff',
      base: '#e0f2fe',
      mid: '#bae6fd',
      shadow: '#94a3b8',
    },
  },
};

// Example tailwind.config.ts usage:
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: cloudlessColors,
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cloudless-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
        'cloudless-dark': 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
