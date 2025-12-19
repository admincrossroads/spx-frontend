'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.error('No authentication token found');
    throw new Error('No authentication token provided');
  }

  // Check what API_URL contains
  console.log('API_URL:', API_URL);
  console.log('Endpoint:', endpoint);
  console.log('Full URL:', `${API_URL}${endpoint}`);
  
  const headers = new Headers(options.headers);
  headers.set('x-api-key', API_KEY!);
  headers.set('Cookie', `token=${token}`);

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.log('Response not OK, checking error...');
      const errorText = await response.text();
      console.log('Error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getAuthors() {
  try {
    return await fetchWithAuth('/admin/authors', {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
}

export async function getAuthorById(id: number) {
  try {
    console.log('getAuthorById called with ID:', id);
    const author = await fetchWithAuth(`/admin/authors/${id}`, {
      cache: 'no-store',
    });
    console.log('getAuthorById result:', author);
    return author;
  } catch (error) {
    console.error(`Failed to fetch author ${id}:`, error);
    throw error;
  }
}
export async function createAuthor(data: {
  name: string;
  bio?: string;
  imageUrl?: string;
}) {
  return await fetchWithAuth('/admin/authors', {
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
  }
) {
  // Remove empty fields to avoid sending undefined
  const payload: any = {};
  
  if (data.name !== undefined) payload.name = data.name;
  if (data.bio !== undefined) payload.bio = data.bio;
  if (data.imageUrl !== undefined) payload.imageUrl = data.imageUrl;
  
  return await fetchWithAuth(`/admin/authors/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}


export async function deleteAuthor(id: number) {
  return await fetchWithAuth(`/admin/authors/${id}`, {
    method: 'DELETE',
  });
}

