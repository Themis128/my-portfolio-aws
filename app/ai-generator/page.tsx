import type { Metadata } from 'next';
import AIGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'AI Project Generator | Themistoklis Baltzakis',
  description:
    'Create amazing projects with Gemini AI-powered generation. Choose from multiple Gemini AI models including Gemini 1.5 Pro and Gemini 1.5 Flash.',
  keywords: [
    'AI',
    'Project Generator',
    'Gemini',
    'Google AI',
    'Code Generation',
    'AI Tools',
  ],
  openGraph: {
    title: 'AI Project Generator',
    description: 'Create amazing projects with Gemini AI-powered generation',
    type: 'website',
  },
};

export default function AIGeneratorPage() {
  return <AIGeneratorClient />;
}
