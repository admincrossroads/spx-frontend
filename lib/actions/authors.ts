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

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getAuthors(token: string) {
  try {
    return await fetchWithAuth('/admin/authors', token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
}

export async function getAuthorById(id: number, token: string) {
  try {
    return await fetchWithAuth(`/admin/authors/${id}`, token, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error(`Failed to fetch author ${id}:`, error);
    throw error;
  }
}

export async function createAuthor(
  data: {
    name: string;
    bio?: string;
    imageUrl?: string;
  },
  token: string
) {
  return await fetchWithAuth('/admin/authors', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAuthor(
  id: number,
  data: {
    name?: string;
    bio?: string | null;
    imageUrl?: string | null;
  },
  token: string
) {
  // Remove empty fields to avoid sending undefined
  const payload: any = {};
  
  if (data.name !== undefined) payload.name = data.name;
  if (data.bio !== undefined) payload.bio = data.bio;
  if (data.imageUrl !== undefined) payload.imageUrl = data.imageUrl;
  
  return await fetchWithAuth(`/admin/authors/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteAuthor(id: number, token: string) {
  return await fetchWithAuth(`/admin/authors/${id}`, token, {
    method: 'DELETE',
  });
}

