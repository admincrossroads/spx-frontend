'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { InsightsResponse, InsightsFilters } from '@/lib/api/insights';

// Query key factory for admin insights
export const adminInsightKeys = {
  all: ['admin', 'insights'] as const,
  lists: () => [...adminInsightKeys.all, 'list'] as const,
  list: (filters: InsightsFilters) => [...adminInsightKeys.lists(), filters] as const,
  details: () => [...adminInsightKeys.all, 'detail'] as const,
  detail: (publicId: string) => [...adminInsightKeys.details(), publicId] as const,
};

// Hook to fetch admin insights with filters
export function useAdminInsights(
  filters: InsightsFilters = {},
  options?: Omit<UseQueryOptions<InsightsResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<InsightsResponse, Error>({
    queryKey: adminInsightKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.search) params.set('search', filters.search);
      if (filters.type) params.set('type', filters.type);
      if (filters.tag) params.set('tag', filters.tag);
      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());
      
      const query = params.toString();
      const endpoint = query ? `/admin/insights?${query}` : '/admin/insights';
      
      return api.get<InsightsResponse>(endpoint);
    },
    staleTime: 1 * 60 * 1000, // 1 minute (more frequent updates in admin)
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

// Hook to fetch a single admin insight by publicId
export function useAdminInsight(
  publicId: string,
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: adminInsightKeys.detail(publicId),
    queryFn: () => api.get(`/admin/insights/${publicId}`),
    enabled: !!publicId,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

