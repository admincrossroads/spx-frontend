'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Tag } from '@/lib/api/tags';

// Query key factory for tags
export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: () => [...tagKeys.lists()] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
};

// Hook to fetch all tags
export function useTags(
  options?: Omit<UseQueryOptions<Tag[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Tag[], Error>({
    queryKey: tagKeys.list(),
    queryFn: () => api.get<Tag[]>('/admin/tags'),
    staleTime: 15 * 60 * 1000, // 15 minutes (rarely change)
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}

// Hook to fetch a single tag by id
export function useTag(
  id: number,
  options?: Omit<UseQueryOptions<Tag, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Tag, Error>({
    queryKey: tagKeys.detail(id),
    queryFn: () => api.get<Tag>(`/admin/tags/${id}`),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}

