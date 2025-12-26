'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageSkeleton } from './image-skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  skeletonClassName?: string;
  showSkeleton?: boolean;
}

export function OptimizedImage({
  className,
  skeletonClassName,
  showSkeleton = true,
  ...imageProps
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imageProps.src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  return (
    <div className="relative h-full w-full">
      {showSkeleton && isLoading && (
        <ImageSkeleton
          className={cn('absolute inset-0', skeletonClassName)}
        />
      )}
      {!hasError && (
        <Image
          {...imageProps}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

