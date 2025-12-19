'use server';

import { cookies } from 'next/headers';
import type { InsightsFilters } from '@/lib/api/insights';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('No authentication token provided');
  }

  const headers = new Headers(options.headers);
  headers.set('x-api-key', API_KEY!);
  headers.set('Cookie', `token=${token}`);

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function getInsights(filters: InsightsFilters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type);
    if (filters.tag) params.set('tag', filters.tag);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());
    
    const query = params.toString();
    const endpoint = query ? `/admin/insights?${query}` : '/admin/insights';
    
    return await fetchWithAuth(endpoint, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch insights:', error);
    return { insights: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
}

export async function getInsightByPublicId(publicId: string) {
  try {
    return await fetchWithAuth(`/admin/insights/${publicId}`, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error(`Failed to fetch insight ${publicId}:`, error);
    throw error;
  }
}

export async function createInsight(data: any) {
  return await fetchWithAuth('/admin/insights', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateInsight(publicId: string, data: any) {
  return await fetchWithAuth(`/admin/insights/${publicId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteInsight(publicId: string) {
  return await fetchWithAuth(`/admin/insights/${publicId}`, {
    method: 'DELETE',
  });
}

export async function publishInsight(publicId: string) {
  return await fetchWithAuth(`/admin/insights/${publicId}/publish`, {
    method: 'PATCH',
  });
}

export async function unpublishInsight(publicId: string) {
  return await updateInsight(publicId, { isPublished: false });
}

// File upload (direct to backend)
export async function uploadInsightImage(
  publicId: string,
  file: File
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('No authentication token provided');
  }

  const response = await fetch(`${API_URL}/admin/uploads/insights/${publicId}`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY!,
      'Cookie': `token=${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed: ${response.status}`);
  }

  return response.json();
}