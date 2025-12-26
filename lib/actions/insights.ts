'use server';

import type { InsightsFilters } from '@/lib/api/insights';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchWithAuth(endpoint: string, token: string, options: RequestInit = {}) {
  if (!token) {
    throw new Error('No authentication token provided');
  }

  const headers = new Headers(options.headers);
  headers.set('x-api-key', API_KEY!);
  headers.set('Authorization', `Bearer ${token}`);

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function getInsights(token: string, filters: InsightsFilters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type);
    if (filters.tag) params.set('tag', filters.tag);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    
    const query = params.toString();
    const endpoint = query ? `/admin/insights?${query}` : '/admin/insights';
    
    return await fetchWithAuth(endpoint, token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return { insights: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
}

export async function getInsightByPublicId(publicId: string, token: string) {
  try {
    return await fetchWithAuth(`/admin/insights/${publicId}`, token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error(`Failed to fetch insight ${publicId}:`, error);
    throw error;
  }
}

export async function createInsight(data: any, token: string) {
  return await fetchWithAuth('/admin/insights', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateInsight(publicId: string, data: any, token: string) {
  return await fetchWithAuth(`/admin/insights/${publicId}`, token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteInsight(publicId: string, token: string) {
  return await fetchWithAuth(`/admin/insights/${publicId}`, token, {
    method: 'DELETE',
  });
}

export async function publishInsight(publicId: string, token: string) {
  return await fetchWithAuth(`/admin/insights/${publicId}/publish`, token, {
    method: 'PATCH',
  });
}

export async function unpublishInsight(publicId: string, token: string) {
  return await updateInsight(publicId, { isPublished: false }, token);
}

// File upload (direct to backend)
export async function uploadInsightImage(
  publicId: string,
  file: File,
  token: string
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  if (!token) {
    throw new Error('No authentication token provided');
  }

  const response = await fetch(`${API_URL}/admin/uploads/insights/${publicId}`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY!,
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed: ${response.status}`);
  }

  return response.json();
}