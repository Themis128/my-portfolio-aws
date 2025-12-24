import React from 'react';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  className = '',
  ...props
}) => <div className={`relative overflow-auto ${className}`} {...props} />;
