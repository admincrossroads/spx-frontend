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
import type { Author } from '@/lib/api/authors';

interface DeleteAuthorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author: Author | null;
  onSuccess?: () => void;
}

export function DeleteAuthorDialog({
  open,
  onOpenChange,
  author,
  onSuccess,
}: DeleteAuthorDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>('');

  async function handleDelete() {
    if (!author) return;

    try {
      setIsDeleting(true);
      setError('');

      await api.delete(`/admin/authors/${author.id}`);
      
      // Close dialog
      onOpenChange(false);
      
      // Refresh the page or call onSuccess
      if (onSuccess) {
        onSuccess();
      } else {
        // Default behavior: reload the page
        window.location.reload();
      }
    } catch (err: any) {
      console.error('Failed to delete author:', err);
      setError(err?.data?.message || err?.message || 'Failed to delete author');
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
            Delete Author
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{author?.name}</strong>?
            This action cannot be undone. All insights by this author will
            remain but will show "Unknown Author".
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
            {isDeleting ? 'Deleting...' : 'Delete Author'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}