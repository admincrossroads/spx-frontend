'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, Type } from 'lucide-react';
import { TextBlockData } from '@/types/insights';

interface TextBlockProps {
  data: TextBlockData;
  onChange: (data: TextBlockData) => void;
}

export default function TextBlock({ data, onChange }: TextBlockProps) {
  const [html, setHtml] = useState(data.html || '');

  const handleChange = (value: string) => {
    setHtml(value);
    onChange({ html: value });
  };

  const applyFormatting = (tag: string) => {
    const textarea = document.getElementById(`text-block-${data.html}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = html.substring(start, end);
    
    let formattedText = '';
    switch (tag) {
      case 'strong': formattedText = `<strong>${selectedText}</strong>`; break;
      case 'em': formattedText = `<em>${selectedText}</em>`; break;
      case 'h2': formattedText = `<h2>${selectedText}</h2>`; break;
      case 'ul': formattedText = `<ul><li>${selectedText}</li></ul>`; break;
      default: formattedText = `<p>${selectedText}</p>`;
    }

    const newHtml = html.substring(0, start) + formattedText + html.substring(end);
    handleChange(newHtml);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Text Content</Label>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => applyFormatting('strong')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => applyFormatting('em')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => applyFormatting('h2')}>
            <Type className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => applyFormatting('ul')}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Textarea
        id={`text-block-${data.html}`}
        value={html}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter text content (HTML supported)"
        className="min-h-[150px] font-mono text-sm"
      />
      <div className="text-xs text-muted-foreground">
        Use HTML tags or formatting buttons above. Preview will render HTML.
      </div>
    </div>
  );
}