'use client';

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, FileText, Image as ImageIcon, Hash } from 'lucide-react';
import { createInsight, updateInsight } from '@/lib/actions/insights';
import type { Insight } from '@/lib/api/insights';

const insightSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  summary: z.string().min(1, 'Summary is required').max(500, 'Summary is too long'),
  type: z.enum(['report', 'publication', 'policy-brief', 'blog']),
  authorId: z.number().min(1, 'Author is required'),
  tags: z.array(z.number()),
  coverImageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type InsightFormData = z.infer<typeof insightSchema>;

interface InsightFormProps {
  insight?: Insight;
  mode?: 'create' | 'edit';
}

interface Author {
  id: number;
  name: string;
}

export function InsightForm({ insight, mode = 'create' }: InsightFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>(insight?.tags.map(t => t.id) || []);

  const form = useForm<InsightFormData>({
    resolver: zodResolver(insightSchema),
    defaultValues: {
      title: insight?.title || '',
      slug: insight?.slug || '',
      summary: insight?.summary || '',
      type: (insight?.type as any) || 'blog',
      authorId: insight?.author.id || 0,
      tags: insight?.tags.map(t => t.id) || [],
      coverImageUrl: insight?.coverImageUrl || '',
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Load authors
        const authorsResponse = await fetch('/api/admin/authors');
        if (authorsResponse.ok) {
          const authorsData = await authorsResponse.json();
          setAuthors(authorsData);
        }

        // Load tags
        const tagsResponse = await fetch('/api/admin/tags');
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(tagsData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    }

    loadData();
  }, []);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleTitleChange(title: string) {
    form.setValue('title', title);
    
    const currentSlug = form.getValues('slug');
    const generatedSlug = generateSlug(title);
    
    if (!currentSlug || currentSlug === generateSlug(form.formState.defaultValues?.title || '')) {
      form.setValue('slug', generatedSlug);
    }
  }

  async function onSubmit(data: InsightFormData) {
    setIsSubmitting(true);
    setError('');

    try {
      if (mode === 'create') {
        await createInsight(data);
      } else if (insight) {
        await updateInsight(insight.publicId, data);
      }
      router.push('/admin/insights');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save insight');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter insight title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleTitleChange(e.target.value);
                        }}
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
                    <FormLabel>Slug *</FormLabel>
                    <FormControl>
                      <Input placeholder="insight-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      URL-friendly version of the title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of the insight"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="report">Report</SelectItem>
                          <SelectItem value="publication">Publication</SelectItem>
                          <SelectItem value="policy-brief">Policy Brief</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author *</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select author" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {authors.map((author) => (
                            <SelectItem key={author.id} value={author.id.toString()}>
                              {author.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coverImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

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
                ? 'Create Insight'
                : 'Update Insight'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}