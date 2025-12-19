import * as z from 'zod';

export type BlockType = 'text' | 'image' | 'video' | 'link' | 'quote' | 'table' | 'subTopic';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlockData {
  html: string;
}

export interface ImageBlockData {
  url: string;
  caption?: string;
  alt?: string;
}

export interface VideoBlockData {
  url: string;
}

export interface LinkBlockData {
  url: string;
  text: string;
}

export interface QuoteBlockData {
  text: string;
  author?: string;
}

export interface TableBlockData {
  html: string;
}

export interface SubTopicBlockData {
  text: string;
}

export type BlockData = 
  | TextBlockData
  | ImageBlockData
  | VideoBlockData
  | LinkBlockData
  | QuoteBlockData
  | TableBlockData
  | SubTopicBlockData;

export interface InsightBlock extends BaseBlock {
  data: BlockData;
}

export interface InsightFormData {
  title: string;
  slug: string;
  summary: string;
  type: 'report' | 'publication' | 'policy-brief' | 'blog';
  content: InsightBlock[];
  authorId: number;
  tags: number[];
  coverImageUrl?: string;
  isPublished?: boolean;
}

export const insightFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  summary: z.string().min(1, 'Summary is required').max(500),
  type: z.enum(['report', 'publication', 'policy-brief', 'blog']),
  // Coerce because Select returns strings; still enforces positive numbers
  authorId: z.coerce.number().int().min(1, 'Author is required'),
  tags: z.array(z.coerce.number()).default([]),
  coverImageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type InsightFormInput = z.input<typeof insightFormSchema>;
export type InsightFormValues = z.output<typeof insightFormSchema>;