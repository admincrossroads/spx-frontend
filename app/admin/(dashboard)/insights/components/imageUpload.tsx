'use client';

import { useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api/client';

interface ImageUploadProps {
  uploadKey?: string; // UUID that will be used for the insight
  type?: 'blog' | 'report' | 'publication' | 'policy-brief'; // Insight type (required for insights folder)
  onUploadComplete: (url: string) => void;
  onUploadStart?: () => void;
  onUploadError?: () => void;
  folder?: 'insights' | 'authors';
  disabled?: boolean;
}

export default function ImageUpload({ 
  uploadKey, 
  type,
  onUploadComplete,
  onUploadStart,
  onUploadError,
  folder = 'insights',
  disabled = false 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setIsUploading(true);
    setError('');
    onUploadStart?.();

    try {
      const formData = new FormData();
      formData.append('file', file);

      let endpoint: string;

      // For insights folder, use query parameters with uuid and type
      if (folder === 'insights') {
        if (!uploadKey || !uploadKey.trim()) {
          setError('UUID is required for insight image uploads');
          setIsUploading(false);
          onUploadError?.();
          return;
        }
        if (!type) {
          setError('Insight type is required for image uploads');
          setIsUploading(false);
          onUploadError?.();
          return;
        }
        // New API format: query parameters
        endpoint = `/admin/uploads/insights?uuid=${encodeURIComponent(uploadKey.trim())}&type=${encodeURIComponent(type)}`;
        const result = await api.post<{ url: string }>(endpoint, formData);
        
        // Return raw URL from API (typically a relative path); caller can normalize if needed
        onUploadComplete(result.url);
        
        // Show success message briefly
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        return;
      }

      // For authors folder, use the old path-based format (if still needed)
      const key = uploadKey && uploadKey.trim() ? uploadKey.trim() : `temp-${Date.now()}`;
      endpoint = `/admin/uploads/${folder}/${key}`;
      const result = await api.post<{ url: string }>(endpoint, formData);
      
      // Return raw URL from API (typically a relative path); caller can normalize if needed
      onUploadComplete(result.url);
      
      // Show success message briefly
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      // endpoint is guaranteed to be assigned if we reach catch block
      const errorEndpoint = folder === 'insights' 
        ? `/admin/uploads/insights?uuid=${uploadKey || ''}&type=${type || ''}` 
        : `/admin/uploads/${folder}/${uploadKey || 'temp'}`;
      
      console.error('Upload error:', {
        endpoint: errorEndpoint,
        status: err?.status,
        message: err?.message,
        error: err
      });
      setError(err?.data?.message || err?.message || `Upload failed: ${err?.status || 'Unknown error'}`);
      setUploadSuccess(false);
      onUploadError?.();
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
          ) : uploadSuccess ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isUploading ? 'Uploading...' : uploadSuccess ? 'Uploaded' : 'Upload Image'}
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
          Supports JPG, PNG, GIF, WebP, PDF (max 10MB)
        </p>
      </div>
      
      {/* Upload Progress Indicator */}
      {isUploading && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              Uploading image... Please wait.
            </p>
          </div>
        </div>
      )}
      
      {/* Success Message */}
      {uploadSuccess && !isUploading && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              Image uploaded successfully!
            </p>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}