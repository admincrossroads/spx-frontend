'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  fetchPublicInsights,
  fetchPublicInsightBySlug,
} from '@/lib/api/public-insights-client';
import {
  PublicInsight,
  PublicInsightDetail,
  PublicInsightsResponse,
} from '@/lib/api/public-insights';

// Query key factory
export const insightKeys = {
  all: ['insights'] as const,
  lists: () => [...insightKeys.all, 'list'] as const,
  list: (filters: {
    type?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => [...insightKeys.lists(), filters] as const,
  details: () => [...insightKeys.all, 'detail'] as const,
  detail: (slug: string) => [...insightKeys.details(), slug] as const,
};

// Hook to fetch public insights with filters
export function usePublicInsights(
  filters: {
    type?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {},
  options?: Omit<
    UseQueryOptions<PublicInsightsResponse, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<PublicInsightsResponse, Error>({
    queryKey: insightKeys.list(filters),
    queryFn: () => fetchPublicInsights(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
}

// Hook to fetch a single insight by slug
export function useInsightBySlug(
  slug: string,
  options?: Omit<
    UseQueryOptions<PublicInsightDetail | null, Error>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<PublicInsightDetail | null, Error>({
    queryKey: insightKeys.detail(slug),
    queryFn: () => fetchPublicInsightBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
}

