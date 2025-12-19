'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription, // Add this import
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Hash } from 'lucide-react';
import { createTag } from '@/lib/actions/tags';

const tagSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  slug: z.string().min(1, 'Slug is required').max(50, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});

type TagFormData = z.infer<typeof tagSchema>;

interface CreateTagDialogProps {
  children: React.ReactNode;
}

export function CreateTagDialog({ children }: CreateTagDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleNameChange(name: string) {
    form.setValue('name', name);
    
    // Auto-generate slug if slug is empty or matches the previous name
    const currentSlug = form.getValues('slug');
    const generatedSlug = generateSlug(name);
    
    if (!currentSlug || currentSlug === generateSlug(form.formState.defaultValues?.name || '')) {
      form.setValue('slug', generatedSlug);
    }
  }

  async function onSubmit(values: TagFormData) {
    try {
      setIsSubmitting(true);
      setError('');

      await createTag(values);
      
      form.reset();
      setOpen(false);
      // Refresh the page to show new tag
      window.location.reload();
    } catch (err: any) {
      console.error('Failed to create tag:', err);
      setError(err.message || 'Failed to create tag');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Tag
          </DialogTitle>
          <DialogDescription>
            Add a new tag for categorizing insights.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Market Analysis"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNameChange(e.target.value);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-3 w-3" />
                    Slug *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="market-analysis"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly version of the name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Tag'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}