'use client';

import { useState } from 'react';
import { TableBlockData } from '@/types/insights';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table } from 'lucide-react';

interface TableBlockProps {
  data: TableBlockData;
  onChange: (data: TableBlockData) => void;
}

export default function TableBlock({ data, onChange }: TableBlockProps) {
  const [html, setHtml] = useState(data.html || '');

  const handleChange = (value: string) => {
    setHtml(value);
    onChange({ html: value });
  };

  const insertSampleTable = () => {
    const sampleHTML = `<table class="min-w-full">
  <thead>
    <tr>
      <th class="px-4 py-2 border">Header 1</th>
      <th class="px-4 py-2 border">Header 2</th>
      <th class="px-4 py-2 border">Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-4 py-2 border">Row 1, Cell 1</td>
      <td class="px-4 py-2 border">Row 1, Cell 2</td>
      <td class="px-4 py-2 border">Row 1, Cell 3</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border">Row 2, Cell 1</td>
      <td class="px-4 py-2 border">Row 2, Cell 2</td>
      <td class="px-4 py-2 border">Row 2, Cell 3</td>
    </tr>
  </tbody>
</table>`;
    handleChange(sampleHTML);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Table className="h-4 w-4" />
          <Label>HTML Table</Label>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={insertSampleTable}>
          Insert Sample Table
        </Button>
      </div>
      
      <Textarea
        value={html}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Paste your HTML table code here"
        className="min-h-[200px] font-mono text-sm"
      />
      
      <div className="text-xs text-muted-foreground">
        Paste HTML table code. Use Tailwind CSS classes for styling.
      </div>
      
      {html && (
        <div className="mt-4">
          <Label className="mb-2 block">Preview</Label>
          <div 
            className="rounded-md border p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
}