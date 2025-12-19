'use client';

import { useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload } from 'lucide-react';
import { api } from '@/lib/api/client';

interface ImageUploadProps {
  uploadKey?: string; // e.g. insight publicId or slug; falls back to temp
  onUploadComplete: (url: string) => void;
  folder?: 'insights' | 'authors';
  disabled?: boolean;
}

export default function ImageUpload({ 
  uploadKey, 
  onUploadComplete, 
  folder = 'insights',
  disabled = false 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setError('File size must be less than 4MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use provided key (publicId/slug) or generate a temp one
      const key = uploadKey && uploadKey.trim() ? uploadKey.trim() : `temp-${Date.now()}`;
      // Use the admin upload endpoint
      const endpoint = `/admin/uploads/${folder}/${key}`;

      const result = await api.post<{ url: string }>(endpoint, formData);
      
      // Return raw URL from API (typically a relative path); caller can normalize if needed
      onUploadComplete(result.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Label htmlFor={inputId} className="sr-only">Upload image</Label>
        <Button 
          type="button" 
          variant="outline" 
          disabled={isUploading || disabled}
          className="flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload Image
        </Button>
        <Input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading || disabled}
        />
        <p className="text-sm text-muted-foreground">
          Supports JPG, PNG, GIF (max 4MB)
        </p>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}