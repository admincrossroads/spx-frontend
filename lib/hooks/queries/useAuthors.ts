'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Author } from '@/lib/api/authors';

// Query key factory for authors
export const authorKeys = {
  all: ['authors'] as const,
  lists: () => [...authorKeys.all, 'list'] as const,
  list: () => [...authorKeys.lists()] as const,
  details: () => [...authorKeys.all, 'detail'] as const,
  detail: (id: number) => [...authorKeys.details(), id] as const,
};

// Hook to fetch all authors
export function useAuthors(
  options?: Omit<UseQueryOptions<Author[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Author[], Error>({
    queryKey: authorKeys.list(),
    queryFn: () => api.get<Author[]>('/admin/authors'),
    staleTime: 15 * 60 * 1000, // 15 minutes (rarely change)
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}

// Hook to fetch a single author by id
export function useAuthor(
  id: number,
  options?: Omit<UseQueryOptions<Author, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Author, Error>({
    queryKey: authorKeys.detail(id),
    queryFn: () => api.get<Author>(`/admin/authors/${id}`),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}

