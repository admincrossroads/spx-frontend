'use client';

import { cn } from '@/lib/utils';

interface ImageSkeletonProps {
  className?: string;
  variant?: 'default' | 'pulse' | 'wave';
}

export function ImageSkeleton({ className, variant = 'pulse' }: ImageSkeletonProps) {
  const baseClasses = 'bg-muted animate-pulse';
  
  if (variant === 'wave') {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent animate-shimmer" />
      </div>
    );
  }
  
  return (
    <div className={cn(baseClasses, className)} />
  );
}

