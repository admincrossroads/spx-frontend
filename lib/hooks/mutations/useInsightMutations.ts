'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { insightKeys } from '../queries/useInsights';
import { adminInsightKeys } from '../queries/useAdminInsights';
import { CreateInsightRequest, UpdateInsightRequest } from '@/lib/api/insights';

// Create insight mutation
export function useCreateInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInsightRequest) => {
      return api.post('/admin/insights', data);
    },
    onSuccess: () => {
      // Invalidate admin insights list
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      // Invalidate public insights (in case it was published)
      queryClient.invalidateQueries({ queryKey: insightKeys.all });
    },
  });
}

// Update insight mutation
export function useUpdateInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ publicId, data }: { publicId: string; data: UpdateInsightRequest }) => {
      return api.patch(`/admin/insights/${publicId}`, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate specific insight
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.detail(variables.publicId) });
      // Invalidate admin insights list
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      // Invalidate public insights (in case publish status changed)
      queryClient.invalidateQueries({ queryKey: insightKeys.all });
    },
  });
}

// Delete insight mutation
export function useDeleteInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (publicId: string) => {
      return api.delete(`/admin/insights/${publicId}`);
    },
    onSuccess: () => {
      // Invalidate admin insights list
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      // Invalidate public insights
      queryClient.invalidateQueries({ queryKey: insightKeys.all });
    },
  });
}

// Publish insight mutation
export function usePublishInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (publicId: string) => {
      return api.patch(`/admin/insights/${publicId}/publish`);
    },
    onSuccess: (_, publicId) => {
      // Invalidate specific insight
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.detail(publicId) });
      // Invalidate admin insights list
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      // Invalidate public insights (newly published)
      queryClient.invalidateQueries({ queryKey: insightKeys.all });
    },
  });
}

// Unpublish insight mutation
export function useUnpublishInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (publicId: string) => {
      return api.patch(`/admin/insights/${publicId}`, { isPublished: false });
    },
    onSuccess: (_, publicId) => {
      // Invalidate specific insight
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.detail(publicId) });
      // Invalidate admin insights list
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      // Invalidate public insights (removed from public)
      queryClient.invalidateQueries({ queryKey: insightKeys.all });
    },
  });
}

