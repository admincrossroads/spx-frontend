'use client';

import { QuoteBlockData } from '@/types/insights';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  data: QuoteBlockData;
  onChange: (data: QuoteBlockData) => void;
}

export default function QuoteBlock({ data, onChange }: QuoteBlockProps) {
  return (
    <div className="space-y-4 border-l-4 border-primary/30 pl-4">
      <div className="flex items-center gap-2">
        <Quote className="h-4 w-4" />
        <Label>Quote</Label>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="quote-text">Quote Text</Label>
          <Textarea
            id="quote-text"
            value={data.text || ''}
            onChange={(e) => onChange({ ...data, text: e.target.value })}
            placeholder="Enter the quote text"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quote-author">Author (Optional)</Label>
          <Input
            id="quote-author"
            value={data.author || ''}
            onChange={(e) => onChange({ ...data, author: e.target.value })}
            placeholder="Author name"
          />
        </div>
      </div>
    </div>
  );
}