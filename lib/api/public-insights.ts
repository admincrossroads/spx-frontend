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
    
    console.log('Fetching public insights from:', fullUrl);
    
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
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch insights: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Fetched insights count:', data.insights?.length || 0);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch public insights:', error);
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
    
    console.log('Fetching insight by slug from:', fullUrl);
    console.log('Using slug exactly as provided:', slug);
    console.log('API_KEY available:', !!API_KEY);
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Always add API key - backend requires it for ALL requests
    if (!API_KEY) {
      console.error('NEXT_PUBLIC_API_KEY is not set! This is required for the API.');
      throw new Error('API key is not configured');
    }
    
    headers['x-api-key'] = API_KEY;
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('Insight not found for slug:', slug);
        return null;
      }
      
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      console.error('Response status:', response.status);
      
      // Log more details for 401 errors
      if (response.status === 401) {
        console.error('Unauthorized - Check if API key is correct and backend accepts it');
      }
      
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully fetched insight:', data.title || 'Unknown');
    return data;
  } catch (error) {
    console.error(`Failed to fetch insight ${slug}:`, error);
    return null;
  }
}

