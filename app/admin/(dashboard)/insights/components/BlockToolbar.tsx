'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Type,
  Image,
  Video,
  Link,
  Quote,
  Table,
  Heading,
  Plus,
} from 'lucide-react';
import { BlockType } from '@/types/insights';

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
}

const blockTypes: Array<{ type: BlockType; label: string; icon: React.ReactNode }> = [
  { type: 'text', label: 'Text', icon: <Type className="h-4 w-4" /> },
  { type: 'image', label: 'Image', icon: <Image className="h-4 w-4" /> },
  { type: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
  { type: 'link', label: 'Link', icon: <Link className="h-4 w-4" /> },
  { type: 'quote', label: 'Quote', icon: <Quote className="h-4 w-4" /> },
  { type: 'table', label: 'Table', icon: <Table className="h-4 w-4" /> },
  { type: 'subTopic', label: 'Subtopic', icon: <Heading className="h-4 w-4" /> },
];

export default function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 py-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Block
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {blockTypes.map((block) => (
            <DropdownMenuItem
              key={block.type}
              onClick={() => onAddBlock(block.type)}
              className="flex items-center gap-2"
            >
              {block.icon}
              {block.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <div className="flex-1 text-sm text-muted-foreground">
        Drag blocks to reorder • Click to edit • Delete to remove
      </div>
    </div>
  );
}