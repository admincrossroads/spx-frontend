'use client';

import { useState, useEffect, useRef } from 'react';
import { ImageSkeleton } from './image-skeleton';
import { cn } from '@/lib/utils';

interface InsightImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  sizes?: string;
}

export function InsightImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  sizes
}: InsightImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setHasError(false);
    setIsImageLoaded(false);

    // Check if image is already loaded (cached)
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
      setIsLoading(false);
      setIsImageLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // If no src, show placeholder
  if (!src) {
    return (
      <div className={cn('bg-muted flex items-center justify-center', className)}>
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && !hasError && (
        <ImageSkeleton className="absolute inset-0 z-10" />
      )}
      {!hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {hasError && (
        <div className={cn('bg-muted flex items-center justify-center h-full', className)}>
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

