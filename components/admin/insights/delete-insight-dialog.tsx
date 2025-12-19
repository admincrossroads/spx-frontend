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
import { deleteInsight } from '@/lib/actions/insights';

interface Insight {
  id: number;
  publicId: string;
  title: string;
  isPublished: boolean;
}

interface DeleteInsightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insight: Insight | null;
  onSuccess?: () => void;
}

export function DeleteInsightDialog({
  open,
  onOpenChange,
  insight,
  onSuccess,
}: DeleteInsightDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>('');

  async function handleDelete() {
    if (!insight) return;

    try {
      setIsDeleting(true);
      setError('');

      await deleteInsight(insight.publicId);
      
      onSuccess?.();
      onOpenChange(false);
    } catch (err: any) {
      console.error('Failed to delete insight:', err);
      setError(err.message || 'Failed to delete insight');
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
            Delete Insight
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{insight?.title}</strong>?
            This action cannot be undone.
            {insight?.isPublished && (
              <span className="block mt-2 text-destructive font-medium">
                Warning: This insight is published and will be removed from the public site.
              </span>
            )}
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
            {isDeleting ? 'Deleting...' : 'Delete Insight'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}