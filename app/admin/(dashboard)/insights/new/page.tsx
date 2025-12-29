'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft } from 'lucide-react';

import { api } from '@/lib/api/client';
import InsightEditor from '../components/InsightEditor';
import ImageUpload from '../components/imageUpload';
import type { InsightBlock, InsightFormInput, InsightFormValues } from '@/types/insights';
import { insightFormSchema } from '@/types/insights';
import { useAuthors } from '@/lib/hooks/queries/useAuthors';
import { useTags } from '@/lib/hooks/queries/useTags';

const createUploadKey = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function CreateInsightPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blocks, setBlocks] = useState<InsightBlock[]>([]);
  const [publicId] = useState<string>(createUploadKey);
  
  // Use React Query to fetch authors and tags
  const { data: authors = [] } = useAuthors();
  const { data: tags = [] } = useTags();

  const form = useForm<InsightFormInput, any, InsightFormValues>({
    resolver: zodResolver(insightFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      type: 'blog',
      authorId: 0, // will be validated before submit
      tags: [],
      coverImageUrl: '',
      isPublished: false,
    } as InsightFormInput,
    mode: 'onSubmit',
  });

  // Authors and tags are now fetched via React Query hooks above

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);

    // Auto-generate slug if empty
    if (!form.getValues('slug')) {
      form.setValue('slug', generateSlug(title));
    }
  };

  const onSubmit = async (values: InsightFormValues) => {
    // Validation checks (extra, beyond zod)
    if (blocks.length === 0) {
      alert('Please add at least one content block');
      return;
    }

    if (values.authorId === 0) {
      alert('Please select an author');
      return;
    }

    const errors: string[] = [];
    if (!values.title.trim()) errors.push('Title is required');
    if (!values.slug.trim()) errors.push('Slug is required');
    if (!values.summary.trim()) errors.push('Summary is required');
    if (values.authorId === 0) errors.push('Author is required');
    if (blocks.length === 0) errors.push('At least one content block is required');

    if (errors.length > 0) {
      alert(`Please fix the following errors:\n${errors.join('\n')}`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data exactly as API expects
      // Ensure all blocks have proper structure, especially text blocks with html property
      const contentBlocks = blocks.map((block) => {
        const blockData: any = { ...block.data };
        
        // Ensure text blocks always have html property
        if (block.type === 'text') {
          blockData.html = blockData.html || '';
        }
        
        return {
          id: block.id || `${block.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: block.type,
          data: blockData,
        };
      });

      const data = {
        title: values.title,
        slug: values.slug,
        summary: values.summary,
        type: values.type,
        content: contentBlocks,
        authorId: values.authorId,
        tags: values.tags || [],
        coverImageUrl: values.coverImageUrl || undefined,
        isPublished: values.isPublished ?? false,
        publicId,
      };

      await api.post('/admin/insights', data);

      router.push('/admin/insights');
      router.refresh();
    } catch (error: any) {

      if (error?.status === 400) {
        const errors = error?.data?.errors;
        const message = error?.data?.message;
        const details = Array.isArray(errors)
          ? errors.map((e: any) => (typeof e === 'string' ? e : JSON.stringify(e))).join('\n- ')
          : errors && typeof errors === 'object'
            ? JSON.stringify(errors, null, 2)
            : '';
        alert(`Validation error:\n${message || ''}${details ? `\n- ${details}` : ''}`);
      } else if (error?.status === 401) {
        alert('Session expired. Please login again.');
        router.push('/admin/login');
      } else {
        alert(error?.message || 'Failed to create insight');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/insights">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Insight</h1>
            <p className="text-muted-foreground">
              Add a new insight with block-based content
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Blocks</CardTitle>
                  <CardDescription>
                    Build your insight using different content blocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InsightEditor blocks={blocks} onChange={setBlocks} publicId={publicId} type={form.watch('type') as 'blog' | 'report' | 'publication' | 'policy-brief'} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Insight Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                              handleTitleChange(e);
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

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="report">Report</SelectItem>
                            <SelectItem value="publication">Publication</SelectItem>
                            <SelectItem value="policy-brief">Policy Brief</SelectItem>
                            <SelectItem value="blog">Blog</SelectItem>
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
                          onValueChange={(value) => {
                            const id = parseInt(value, 10);
                            field.onChange(id);
                          }}
                          value={
                            (typeof field.value === 'number' && field.value > 0)
                              ? field.value.toString()
                              : ''
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.length === 0 ? (
                              <SelectItem value="loading" disabled>
                                Loading authors...
                              </SelectItem>
                            ) : (
                              <>
                                <SelectItem value="select" disabled>
                                  Select an author
                                </SelectItem>
                                {authors.map((author) => (
                                  <SelectItem key={author.id} value={author.id.toString()}>
                                    {author.name}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const tagId = parseInt(value, 10);
                            const currentTags = field.value || [];
                            if (!currentTags.includes(tagId)) {
                              field.onChange([...currentTags, tagId]);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Add tags" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tags.map((tag) => (
                              <SelectItem key={tag.id} value={tag.id.toString()}>
                                {tag.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((tagId) => {
                            const tag = tags.find((t) => t.id === tagId);
                            return tag ? (
                              <div
                                key={tag.id}
                                className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm"
                              >
                                {tag.name}
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(field.value?.filter((id) => id !== tagId));
                                  }}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  ×
                                </button>
                              </div>
                            ) : null;
                          })}
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <div className="space-y-2">
                          <FormControl>
                            <Input
                              placeholder="/uploads/insights/uuid/filename.jpg"
                              {...field}
                            />
                          </FormControl>
                          <ImageUpload
                            uploadKey={publicId}
                            type={form.watch('type') as 'blog' | 'report' | 'publication' | 'policy-brief'}
                            onUploadComplete={(url) => field.onChange(url)}
                            folder="insights"
                            disabled={isSubmitting}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Publish Immediately</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Make this insight publicly visible
                          </p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Create Insight
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        const isValid = await form.trigger();
                        if (!isValid) {
                          return;
                        }
                        const currentValues = form.getValues();
                        form.setValue('isPublished', false);
                        // Type assertion: form.getValues() returns input type, but after validation/trigger it should match output type
                        const values: InsightFormValues = {
                          ...currentValues,
                          authorId: Number(currentValues.authorId) || 0,
                          tags: Array.isArray(currentValues.tags) 
                            ? currentValues.tags.map(t => Number(t)).filter(n => !isNaN(n))
                            : [],
                          isPublished: false,
                        };
                        await onSubmit(values);
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
