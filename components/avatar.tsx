import Image from 'next/image';
import React from 'react';

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
);

export const AvatarImage: React.FC<{
  className?: string;
  src?: string;
  alt?: string;
}> = ({ className = '', src, alt = '' }) => (
  <Image
    src={src || ''}
    alt={alt}
    fill
    className={`aspect-square h-full w-full object-cover ${className}`}
  />
);

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...props
}) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
    {...props}
  />
);
