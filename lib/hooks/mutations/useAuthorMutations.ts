'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { authorKeys } from '../queries/useAuthors';
import { CreateAuthorRequest, UpdateAuthorRequest } from '@/lib/api/authors';

// Create author mutation
export function useCreateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAuthorRequest) => {
      return api.post('/admin/authors', data);
    },
    onSuccess: () => {
      // Invalidate authors list
      queryClient.invalidateQueries({ queryKey: authorKeys.all });
    },
  });
}

// Update author mutation
export function useUpdateAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateAuthorRequest }) => {
      return api.patch(`/admin/authors/${id}`, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate specific author
      queryClient.invalidateQueries({ queryKey: authorKeys.detail(variables.id) });
      // Invalidate authors list
      queryClient.invalidateQueries({ queryKey: authorKeys.all });
    },
  });
}

// Delete author mutation
export function useDeleteAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return api.delete(`/admin/authors/${id}`);
    },
    onSuccess: () => {
      // Invalidate authors list
      queryClient.invalidateQueries({ queryKey: authorKeys.all });
    },
  });
}

