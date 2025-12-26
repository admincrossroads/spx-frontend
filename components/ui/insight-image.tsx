'use client';

import { useState, useEffect } from 'react';
import { ImageSkeleton } from './image-skeleton';
import { cn } from '@/lib/utils';

interface InsightImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function InsightImage({ src, alt, className = '', loading = 'lazy' }: InsightImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImgSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    if (!hasError) {
      // Try without crossOrigin
      setHasError(true);
      setImgSrc(src);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <ImageSkeleton className={cn('absolute inset-0', className)} />
      )}
      {!hasError && (
        <img
          src={imgSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          loading={loading}
          crossOrigin={hasError ? undefined : 'anonymous'}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {hasError && (
        <div className={cn('bg-muted flex items-center justify-center', className)}>
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

