'use server';

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

export async function getTags(token: string) {
  try {
    return await fetchWithAuth('/admin/tags', token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export async function getTagById(id: number, token: string) {
  try {
    return await fetchWithAuth(`/admin/tags/${id}`, token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error(`Failed to fetch tag ${id}:`, error);
    throw error;
  }
}

export async function createTag(data: { name: string; slug: string }, token: string) {
  return await fetchWithAuth('/admin/tags', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTag(id: number, data: { name?: string; slug?: string }, token: string) {
  return await fetchWithAuth(`/admin/tags/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteTag(id: number, token: string) {
  return await fetchWithAuth(`/admin/tags/${id}`, token, {
    method: 'DELETE',
  });
}