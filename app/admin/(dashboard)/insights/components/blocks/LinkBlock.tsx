'use client';

import { LinkBlockData } from '@/types/insights';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'lucide-react';

interface LinkBlockProps {
  data: LinkBlockData;
  onChange: (data: LinkBlockData) => void;
}

export default function LinkBlock({ data, onChange }: LinkBlockProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link className="h-4 w-4" />
        <Label>Link</Label>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="link-url">URL</Label>
          <Input
            id="link-url"
            type="url"
            value={data.url || ''}
            onChange={(e) => onChange({ ...data, url: e.target.value })}
            placeholder="https://example.com"
            className="font-mono text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="link-text">Link Text</Label>
          <Input
            id="link-text"
            value={data.text || ''}
            onChange={(e) => onChange({ ...data, text: e.target.value })}
            placeholder="Click here"
          />
        </div>
      </div>
    </div>
  );
}