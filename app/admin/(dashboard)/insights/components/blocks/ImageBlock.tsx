'use client';

import { useState } from 'react';
import { ImageBlockData } from '@/types/insights';
import ImageUpload from '../imageUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface ImageBlockProps {
  data: ImageBlockData;
  onChange: (data: ImageBlockData) => void;
  publicId?: string;
  type?: 'blog' | 'report' | 'publication' | 'policy-brief';
}

export default function ImageBlock({ data, onChange, publicId, type }: ImageBlockProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleUploadComplete = (url: string) => {
    onChange({ ...data, url });
    setIsUploading(false);
  };

  const handleUploadError = () => {
    setIsUploading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Image</Label>
        <ImageUpload
          uploadKey={publicId}
          type={type}
          onUploadComplete={handleUploadComplete}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          folder="insights"
        />
        {(data.url || isUploading) && (
          <div className="mt-2 space-y-2">
            <div className="relative border rounded-md overflow-hidden bg-muted/20 min-h-[100px] flex items-center justify-center">
              {isUploading && !data.url && (
                <div className="absolute inset-0 bg-background/80 dark:bg-background/90 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Uploading image...</p>
                  </div>
                </div>
              )}
              {data.url && (
              <img
                src={data.url}
                alt="Preview"
                className="max-h-48 max-w-full h-auto w-auto rounded-sm object-contain"
                style={{ display: 'block' }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  const errorDetails = {
                    src: img.src,
                    originalUrl: data.url,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    complete: img.complete,
                    error: (e as any).error || 'Unknown error'
                  };
                  console.error('Image failed to load:', errorDetails);
                  
                  // Show error message in the container
                  const container = img.parentElement;
                  if (container) {
                    // Remove any existing error message
                    const existingError = container.querySelector('.image-error-msg');
                    if (existingError) existingError.remove();
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'text-sm text-destructive p-2 image-error-msg';
                    errorMsg.textContent = `Failed to load image. Check console for details.`;
                    container.appendChild(errorMsg);
                  }
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  console.log('Image loaded successfully:', {
                    url: data.url,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    width: img.width,
                    height: img.height
                  });
                  img.style.display = 'block';
                  // Remove any error messages
                  const container = img.parentElement;
                  const errorMsg = container?.querySelector('.image-error-msg');
                  if (errorMsg) errorMsg.remove();
                }}
              />
              )}
            </div>
            {data.url && (
              <Input
                value={data.url}
                readOnly
                className="text-xs"
                placeholder="Image URL will appear here after upload"
              />
            )}
            {/* <p className="text-xs text-muted-foreground">
              Preview URL: {getImageUrl(data.url)}
            </p> */}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="caption">Caption</Label>
          <Input
            id="caption"
            value={data.caption || ''}
            onChange={(e) => onChange({ ...data, caption: e.target.value })}
            placeholder="Optional caption"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            value={data.alt || ''}
            onChange={(e) => onChange({ ...data, alt: e.target.value })}
            placeholder="Accessibility description"
          />
        </div>
      </div>
    </div>
  );
}