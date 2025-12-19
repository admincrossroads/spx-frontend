'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label'; // Add this import
import { User, Upload, X } from 'lucide-react';
import { createAuthor, updateAuthor } from '@/lib/actions/authors';
import type { Author } from '@/lib/api/authors';

const authorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  bio: z.string().max(500, 'Bio is too long').optional(),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type AuthorFormData = z.infer<typeof authorSchema>;

interface AuthorFormProps {
  author?: Author;
  mode?: 'create' | 'edit';
}

export function AuthorForm({ author, mode = 'create' }: AuthorFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    author?.imageUrl || null
  );

  const form = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: author?.name || '',
      bio: author?.bio || '',
      imageUrl: author?.imageUrl || '',
    },
  });

  async function onSubmit(values: AuthorFormData) {
  try {
    setIsSubmitting(true);
    setError('');

    if (mode === 'create') {
      await createAuthor({
        name: values.name,
        bio: values.bio || undefined,
        imageUrl: values.imageUrl || undefined,
      });
      router.push('/admin/authors');
      router.refresh();
    } else if (author) {
      // Always send all fields for update (backend handles partial updates)
      const updateData: any = {
        name: values.name,
        bio: values.bio || null,
        imageUrl: values.imageUrl || null,
      };
      
      console.log('Updating author with data:', updateData);
      await updateAuthor(author.id, updateData);
      router.push('/admin/authors');
      router.refresh();
    }
  } catch (err: any) {
    console.error('Failed to save author:', err);
    setError(err.message || 'Failed to save author');
  } finally {
    setIsSubmitting(false);
  }
}

  function handleImageUrlChange(url: string) {
    form.setValue('imageUrl', url);
    setImagePreview(url);
  }

  function clearImage() {
    form.setValue('imageUrl', '');
    setImagePreview(null);
  }

  return (
    <div className="max-w-2xl">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Use regular Label instead of FormLabel */}
                  <Label>Author Image</Label>
                  <div className="relative">
                    <div className="aspect-square w-full rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/50">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Author preview"
                            className="h-full w-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={clearImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <User className="h-16 w-16 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="mt-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleImageUrlChange(e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter a direct image URL or upload to your server
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-center text-sm text-muted-foreground">
                        <p className="flex items-center justify-center gap-2">
                          <Upload className="h-3 w-3" />
                          Upload feature coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The author's full name as it should appear on insights
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Senior market analyst with 10+ years of experience..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Brief biography or description of the author
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : mode === 'create'
                ? 'Create Author'
                : 'Update Author'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}