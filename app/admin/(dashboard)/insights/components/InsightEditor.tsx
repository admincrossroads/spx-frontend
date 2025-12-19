'use client';

import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical, Trash2, Eye } from 'lucide-react';
import BlockToolbar from './BlockToolbar';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import VideoBlock from './blocks/VideoBlock';
import LinkBlock from './blocks/LinkBlock';
import QuoteBlock from './blocks/QuoteBlock';
import TableBlock from './blocks/TableBlock';
import SubTopicBlock from './blocks/SubTopicBlock';
import { 
  InsightBlock, 
  BlockType, 
  TextBlockData, 
  ImageBlockData,
  VideoBlockData,
  LinkBlockData,
  QuoteBlockData,
  TableBlockData,
  SubTopicBlockData
} from '@/types/insights';
import { getImageUrl } from '@/lib/utils/helpers';

interface InsightEditorProps {
  blocks: InsightBlock[];
  onChange: (blocks: InsightBlock[]) => void;
  publicId?: string;
}

export default function InsightEditor({ blocks, onChange, publicId }: InsightEditorProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: InsightBlock = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data: getDefaultDataForType(type),
    };
    
    onChange([...blocks, newBlock]);
  }, [blocks, onChange]);

  const getDefaultDataForType = (type: BlockType): any => {
    switch (type) {
      case 'text': return { html: '' };
      case 'image': return { url: '', caption: '', alt: '' };
      case 'video': return { url: '' };
      case 'link': return { url: '', text: '' };
      case 'quote': return { text: '', author: '' };
      case 'table': return { html: '' };
      case 'subTopic': return { text: '' };
      default: return {};
    }
  };

  const updateBlock = useCallback((index: number, data: any) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], data };
    onChange(newBlocks);
  }, [blocks, onChange]);

  const removeBlock = useCallback((index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
    if (previewIndex === index) setPreviewIndex(null);
  }, [blocks, onChange, previewIndex]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange(items);
  }, [blocks, onChange]);

  const togglePreview = (index: number) => {
    setPreviewIndex(previewIndex === index ? null : index);
  };

  const renderBlock = (block: InsightBlock, index: number) => {
    const commonProps = {
      data: block.data,
      onChange: (data: any) => updateBlock(index, data),
    };

    const blockComponents = {
      text: <TextBlock {...commonProps} data={commonProps.data as TextBlockData} />,
      image: <ImageBlock {...commonProps} data={commonProps.data as ImageBlockData} publicId={publicId} />,
      video: <VideoBlock {...commonProps} data={commonProps.data as VideoBlockData} />,
      link: <LinkBlock {...commonProps} data={commonProps.data as LinkBlockData} />,
      quote: <QuoteBlock {...commonProps} data={commonProps.data as QuoteBlockData} />,
      table: <TableBlock {...commonProps} data={commonProps.data as TableBlockData} />,
      subTopic: <SubTopicBlock {...commonProps} data={commonProps.data as SubTopicBlockData} />,
    };

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <span className="text-sm font-medium capitalize">{block.type} Block</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => togglePreview(index)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeBlock(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            {blockComponents[block.type]}
            
            {previewIndex === index && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-sm font-semibold mb-2">Preview:</h4>
                <div className="rounded-md border p-4 bg-muted/20">
                  {renderPreview(block)}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };


  const renderPreview = (block: InsightBlock) => {
    switch (block.type) {
      case 'text':
        return <div dangerouslySetInnerHTML={{ __html: (block.data as TextBlockData).html }} />;
      case 'image':
        const imgData = block.data as ImageBlockData;
        return imgData.url ? (
          <div>
            <img 
              src={getImageUrl(imgData.url)} 
              alt={imgData.alt || ''} 
              className="max-w-full rounded"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                // Only hide if image actually failed to load (check naturalWidth and complete)
                // Don't log errors as they can be false positives
                if (img.naturalWidth === 0 && img.complete) {
                  img.style.display = 'none';
                }
              }}
            />
            {imgData.caption && <p className="text-sm text-muted-foreground mt-2">{imgData.caption}</p>}
          </div>
        ) : <p className="text-muted-foreground">No image uploaded</p>;
      case 'video':
        return <p className="text-muted-foreground">Video: {(block.data as VideoBlockData).url || 'No URL'}</p>;
      case 'link':
        const linkData = block.data as LinkBlockData;
        return linkData.url ? (
          <a href={linkData.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {linkData.text || linkData.url}
          </a>
        ) : <p className="text-muted-foreground">No link provided</p>;
      case 'quote':
        const quoteData = block.data as QuoteBlockData;
        return (
          <blockquote className="border-l-4 border-primary pl-4 italic">
            "{quoteData.text}"
            {quoteData.author && <footer className="mt-2 text-sm">— {quoteData.author}</footer>}
          </blockquote>
        );
      case 'table':
        return <div dangerouslySetInnerHTML={{ __html: (block.data as TableBlockData).html }} />;
      case 'subTopic':
        return <h3 className="text-xl font-bold">{(block.data as SubTopicBlockData).text}</h3>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {renderBlock(block, index)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <BlockToolbar onAddBlock={addBlock} />
      
      {blocks.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No content blocks yet. Add your first block above.</p>
        </div>
      )}
    </div>
  );
}