import type { Metadata } from 'next';
import AIGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'AI Project Generator | Themistoklis Baltzakis',
  description: 'Create amazing projects with AI-powered generation. Choose from multiple AI models including GPT-4, Claude 3, Codex, and DALL-E 3.',
  keywords: ['AI', 'Project Generator', 'GPT-4', 'Claude 3', 'Code Generation', 'AI Tools'],
  openGraph: {
    title: 'AI Project Generator',
    description: 'Create amazing projects with AI-powered generation',
    type: 'website',
  },
};

export default function AIGeneratorPage() {
  return <AIGeneratorClient />;
}
