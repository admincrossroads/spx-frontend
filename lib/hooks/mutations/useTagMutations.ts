'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { tagKeys } from '../queries/useTags';
import { CreateTagRequest, UpdateTagRequest } from '@/lib/api/tags';

// Create tag mutation
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTagRequest) => {
      return api.post('/admin/tags', data);
    },
    onSuccess: () => {
      // Invalidate tags list
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
  });
}

// Update tag mutation
export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateTagRequest }) => {
      return api.patch(`/admin/tags/${id}`, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate specific tag
      queryClient.invalidateQueries({ queryKey: tagKeys.detail(variables.id) });
      // Invalidate tags list
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
  });
}

// Delete tag mutation
export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return api.delete(`/admin/tags/${id}`);
    },
    onSuccess: () => {
      // Invalidate tags list
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
  });
}

