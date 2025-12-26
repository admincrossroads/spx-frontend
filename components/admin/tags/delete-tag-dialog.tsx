'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Trash2 } from 'lucide-react';
import { api } from '@/lib/api/client';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface DeleteTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag | null;
  onSuccess?: () => void;
}

export function DeleteTagDialog({
  open,
  onOpenChange,
  tag,
  onSuccess,
}: DeleteTagDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>('');

  async function handleDelete() {
    if (!tag) return;

    try {
      setIsDeleting(true);
      setError('');

      await api.delete(`/admin/tags/${tag.id}`);
      
      onSuccess?.();
      onOpenChange(false);
    } catch (err: any) {
      console.error('Failed to delete tag:', err);
      setError(err?.data?.message || err?.message || 'Failed to delete tag');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Tag
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the tag <strong>{tag?.name}</strong>?
            This action cannot be undone. Insights using this tag will keep it,
            but you won't be able to assign it to new insights.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive text-sm rounded">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Tag'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}