import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Normalizes image URLs by converting relative paths to absolute URLs
 * using the API base URL. Works in both client and server components.
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // If already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Get API base URL from environment
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  
  if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL is not defined, using relative URL');
    return url;
  }
  
  // Remove /api/v1 if present, as uploads are served directly from the base URL
  const baseUrl = apiUrl.replace(/\/api\/v1$/, '');
  
  // Ensure URL starts with /
  const relativePath = url.startsWith('/') ? url : `/${url}`;
  
  const absoluteUrl = `${baseUrl}${relativePath}`;
  
  return absoluteUrl;
}