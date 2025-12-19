export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'link' | 'quote' | 'table' | 'subTopic';
  data: Record<string, any>;
}

export interface InsightAuthor {
  id: number;
  name: string;
  imageUrl: string | null;
}

export interface InsightTag {
  id: number;
  name: string;
  slug: string;
}

export interface Insight {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  summary: string;
  type: 'report' | 'publication' | 'policy-brief' | 'blog';
  content: ContentBlock[];
  coverImageUrl: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  author: InsightAuthor;
  tags: InsightTag[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateInsightRequest {
  title: string;
  slug: string;
  summary: string;
  type: 'report' | 'publication' | 'policy-brief' | 'blog';
  content?: ContentBlock[];
  authorId: number;
  tags?: number[];
  coverImageUrl?: string;
  publicId?: string;
}

export interface UpdateInsightRequest {
  title?: string;
  slug?: string;
  summary?: string;
  type?: 'report' | 'publication' | 'policy-brief' | 'blog';
  content?: ContentBlock[];
  authorId?: number;
  tags?: number[];
  coverImageUrl?: string;
  isPublished?: boolean;
}

export interface InsightsResponse {
  insights: Insight[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface InsightsFilters {
  search?: string;
  type?: string;
  tag?: string;
  page?: number;
  limit?: number;
}