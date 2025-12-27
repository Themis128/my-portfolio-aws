'use client';

import Image from 'next/image';
import { useState } from 'react';

interface IconImageProps {
  slug: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ALIASES: Record<string, string[]> = {
  'next-js': ['nextjs'],
  'node-js': ['nodejs'],
  'socket-io': ['socketio'],
  'tailwind-css': ['tailwindcss', 'tailwind'],
  's3': ['aws-s3', 'aws-s3'],
  'aws-amplify': ['aws-amplify'],
  'express': ['express'],
};

function getCandidates(slug: string) {
  const candidates = new Set<string>();
  candidates.add(slug);
  candidates.add(slug.replace(/-/g, ''));
  candidates.add(slug.replace(/-/g, '_'));
  // Add explicit aliases
  const map = ALIASES[slug];
  if (map) map.forEach((s) => candidates.add(s));
  return Array.from(candidates).map((s) => `/icons/${s}.svg`);
}

export default function IconImage({ slug, alt = '', className, style }: IconImageProps) {
  const [index, setIndex] = useState(0);
  const candidates = getCandidates(slug);

  const handleError = () => {
    setIndex((i) => i + 1);
  };

  if (index < candidates.length) {
    return (
      <Image
        src={candidates[index]}
        alt={alt}
        className={className}
        style={style}
        width={24}
        height={24}
        onError={handleError}
      />
    );
  }

  // final fallback: basic inline SVG (generic)
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
