'use client';

import { PublicInsight, PublicInsightDetail, PublicInsightsResponse } from './public-insights';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Client-side function to fetch public insights
export async function fetchPublicInsights(filters: {
  type?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<PublicInsightsResponse> {
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
  
  if (API_KEY) {
    headers['x-api-key'] = API_KEY;
  }
  
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch insights: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

// Client-side function to fetch a single insight by slug
export async function fetchPublicInsightBySlug(slug: string): Promise<PublicInsightDetail | null> {
  const endpoint = `/insights/${slug}`;
  const fullUrl = `${API_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }
  
  headers['x-api-key'] = API_KEY;
  
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    const errorText = await response.text();
    throw new Error(`Failed to fetch insight: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

