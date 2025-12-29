// Public API functions for fetching published insights (no auth required)
'use server';

import { unstable_noStore as noStore } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export interface PublicInsight {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  summary: string;
  type: 'report' | 'publication' | 'policy-brief' | 'blog';
  coverImageUrl: string | null;
  publishedAt: string | null;
  author: {
    id: number;
    name: string;
    imageUrl: string | null;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface PublicInsightsResponse {
  insights: PublicInsight[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PublicInsightDetail extends PublicInsight {
  content: Array<{
    id: string;
    type: 'text' | 'image' | 'video' | 'link' | 'quote' | 'table' | 'subTopic';
    data: Record<string, any>;
  }>;
}

// Fetch published insights (public endpoint, no auth)
export async function getPublicInsights(filters: {
  type?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<PublicInsightsResponse> {
  // Mark this function as dynamic to prevent static generation
  noStore();
  
  try {
    const params = new URLSearchParams();
    
    // Always filter for published insights
    params.set('isPublished', 'true');
    
    if (filters.type) params.set('type', filters.type);
    if (filters.tag) params.set('tag', filters.tag);
    if (filters.search) params.set('search', filters.search);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    
    const query = params.toString();
    const endpoint = `/insights?${query}`;
    const fullUrl = `${API_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add API key if available (some public endpoints might require it)
    if (API_KEY) {
      headers['x-api-key'] = API_KEY;
    }
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch insights: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    return { 
      insights: [], 
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } 
    };
  }
}

// Fetch a single published insight by slug (public endpoint, no auth)
// Backend endpoint: GET /api/v1/insights/:slug
export async function getPublicInsightBySlug(slug: string): Promise<PublicInsightDetail | null> {
  // Mark this function as dynamic to prevent static generation
  noStore();
  
  try {
    // Use the slug exactly as provided by the API - don't modify it
    // Backend endpoint format: /api/v1/insights/:slug (not /insights/slug/:slug)
    const endpoint = `/insights/${slug}`;
    const fullUrl = `${API_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Always add API key - backend requires it for ALL requests
    if (!API_KEY) {
      throw new Error('API key is not configured');
    }
    
    headers['x-api-key'] = API_KEY;
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

