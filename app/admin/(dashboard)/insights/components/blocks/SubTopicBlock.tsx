'use client';

import { SubTopicBlockData } from '@/types/insights';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from 'lucide-react';

interface SubTopicBlockProps {
  data: SubTopicBlockData;
  onChange: (data: SubTopicBlockData) => void;
}

export default function SubTopicBlock({ data, onChange }: SubTopicBlockProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Heading className="h-4 w-4" />
        <Label>Subtopic Title</Label>
      </div>
      <Input
        value={data.text || ''}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Enter subtopic title"
        className="text-lg font-semibold"
      />
      <div className="text-xs text-muted-foreground">
        This creates a section break with a heading.
      </div>
    </div>
  );
}