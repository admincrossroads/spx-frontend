'use client';

import { VideoBlockData } from '@/types/insights';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Youtube, Video } from 'lucide-react';

interface VideoBlockProps {
  data: VideoBlockData;
  onChange: (data: VideoBlockData) => void;
}

export default function VideoBlock({ data, onChange }: VideoBlockProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Video className="h-4 w-4" />
        <Label htmlFor="video-url">Video URL</Label>
      </div>
      <Input
        id="video-url"
        type="url"
        value={data.url || ''}
        onChange={(e) => onChange({ url: e.target.value })}
        placeholder="https://youtube.com/watch?v=..."
        className="font-mono text-sm"
      />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Youtube className="h-3 w-3" />
        Supports YouTube, Vimeo, and direct video URLs
      </div>
    </div>
  );
}