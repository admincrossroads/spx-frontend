'use client';

import { useState } from 'react';

interface InsightImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function InsightImage({ src, alt, className = '', loading = 'lazy' }: InsightImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Try without crossOrigin
      setHasError(true);
      setImgSrc(src);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      crossOrigin={hasError ? undefined : 'anonymous'}
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
}

