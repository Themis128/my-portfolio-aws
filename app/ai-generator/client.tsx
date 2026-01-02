'use client';

import dynamic from 'next/dynamic';

const AIProjectGenerator = dynamic(() => import('../../components/AIProjectGenerator'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  ),
});

export default function AIGeneratorClient() {
  return (
    <div className="min-h-screen">
      <AIProjectGenerator />
    </div>
  );
}
