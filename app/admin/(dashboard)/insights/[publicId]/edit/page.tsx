'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { Loader2, ArrowLeft, Save, Eye } from 'lucide-react';
import { api } from '@/lib/api/client';
import InsightEditor from '../../components/InsightEditor';
import { InsightBlock, InsightFormInput, InsightFormValues, insightFormSchema } from '@/types/insights';
import ImageUpload from '../../components/imageUpload';
import Link from 'next/link';
import { useAuthors } from '@/lib/hooks/queries/useAuthors';
import { useTags } from '@/lib/hooks/queries/useTags';
import { useAdminInsight } from '@/lib/hooks/queries/useAdminInsights';
import { useQueryClient } from '@tanstack/react-query';
import { adminInsightKeys } from '@/lib/hooks/queries/useAdminInsights';

export default function EditInsightPage() {
  const router = useRouter();
  const params = useParams();
  const publicId = params.publicId as string;
  const queryClient = useQueryClient();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blocks, setBlocks] = useState<InsightBlock[]>([]);
  
  // Use React Query to fetch data
  const { data: insight, isLoading, error } = useAdminInsight(publicId);
  const { data: authors = [] } = useAuthors();
  const { data: tags = [] } = useTags();
  
  // Redirect if insight not found
  useEffect(() => {
    if (error || (insight === null && !isLoading)) {
      router.push('/admin/insights');
    }
  }, [error, insight, isLoading, router]);

  const form = useForm<InsightFormInput, any, InsightFormValues>({
    resolver: zodResolver(insightFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      type: 'blog',
      authorId: 0,
      tags: [],
      coverImageUrl: '',
      isPublished: false,
    } as InsightFormInput,
  });

  // Set form values when insight data loads
  useEffect(() => {
    if (insight && authors.length > 0) {
      // Get the author ID - prefer insight.author.id, fallback to insight.authorId, then 0
      const authorId = insight.author?.id ?? insight.authorId ?? 0;
      
      form.reset({
        title: insight.title,
        slug: insight.slug,
        summary: insight.summary,
        type: insight.type,
        authorId: authorId,
        tags: insight.tags?.map((tag: any) => tag.id) || [],
        coverImageUrl: insight.coverImageUrl || '',
        isPublished: insight.isPublished || false,
      } as InsightFormInput);
      
      // Set content blocks - ensure proper structure
      if (insight.content && Array.isArray(insight.content)) {
        // Transform content blocks to ensure they have the correct structure
        const transformedBlocks = insight.content.map((block: any) => {
          const transformed = {
            id: block.id || `${block.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: block.type,
            data: {
              // Ensure text blocks have html property
              ...(block.type === 'text' && { html: block.data?.html || block.data?.html || '' }),
              // For other block types, spread the data as-is
              ...(block.type !== 'text' ? block.data : {}),
            },
          };
          
          return transformed;
        });
        
        setBlocks(transformedBlocks);
      } else {
        // If no content, initialize with empty array
        setBlocks([]);
      }
    }
  }, [insight, authors, form]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Auto-generate slug if empty
    if (!form.getValues('slug')) {
      form.setValue('slug', generateSlug(title));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (values: InsightFormValues) => {
    if (blocks.length === 0) {
      alert('Please add at least one content block');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data without isPublished - we'll handle publish/unpublish separately
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
      };

      // Save the insight first (without publish status)
      await api.patch(`/admin/insights/${publicId}`, data);
      
      // Then handle publish/unpublish separately if status changed
      const currentPublished = insight?.isPublished || false;
      if (values.isPublished && !currentPublished) {
        // Need to publish
        await api.patch(`/admin/insights/${publicId}/publish`);
      } else if (!values.isPublished && currentPublished) {
        // Need to unpublish
        await api.patch(`/admin/insights/${publicId}`, { isPublished: false });
      }
      
      // Invalidate React Query cache to force refetch
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.detail(publicId) });
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.lists() });
      
      router.push('/admin/insights');
      router.refresh();
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || 'Failed to update insight';
      const errorDetails = error?.data?.errors;
      if (errorDetails && Array.isArray(errorDetails)) {
        const details = errorDetails.map((e: any) => 
          typeof e === 'string' ? e : JSON.stringify(e)
        ).join('\n- ');
        alert(`Validation error:\n${errorMessage}\n- ${details}`);
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishToggle = async () => {
    const currentPublished = form.getValues('isPublished');
    setIsSubmitting(true);
    
    try {
      if (currentPublished) {
        // Unpublish
        await api.patch(`/admin/insights/${publicId}`, { isPublished: false });
        form.setValue('isPublished', false);
        if (insight) {
          insight.isPublished = false;
        }
        alert('Insight unpublished successfully');
      } else {
        // Publish
        await api.patch(`/admin/insights/${publicId}/publish`);
        form.setValue('isPublished', true);
        if (insight) {
          insight.isPublished = true;
        }
        alert('Insight published successfully');
      }
      
      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || 'Failed to toggle publish status';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold">Edit Insight</h1>
            <p className="text-muted-foreground">Editing: {insight?.title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={insight?.isPublished ? "outline" : "default"}
            onClick={handlePublishToggle}
            disabled={isSubmitting}
          >
            <Eye className="h-4 w-4 mr-2" />
            {insight?.isPublished ? 'Unpublish' : 'Publish Now'}
          </Button>
          
          <Link href={`/insights/${insight?.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              View Live
            </Button>
          </Link>
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
                    Edit your insight content blocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InsightEditor
                    blocks={blocks} 
                    onChange={setBlocks}
                    publicId={publicId}
                    type={form.watch('type') as 'blog' | 'report' | 'publication' | 'policy-brief'}
                  />
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
                        <Select onValueChange={field.onChange} value={field.value}>
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
                    render={({ field }) => {
                      // Ensure value is a valid number and convert to string for Select
                      const fieldValue = typeof field.value === 'number' ? field.value : 0;
                      const selectValue = fieldValue > 0 ? fieldValue.toString() : '';
                      
                      return (
                        <FormItem>
                          <FormLabel>Author *</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))} 
                            value={selectValue}
                            disabled={authors.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={authors.length === 0 ? "Loading authors..." : "Select author"} />
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
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const tagId = parseInt(value);
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
                            const tag = tags.find(t => t.id === tagId);
                            return tag ? (
                              <div
                                key={tag.id}
                                className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm"
                              >
                                {tag.name}
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(field.value?.filter(id => id !== tagId));
                                  }}
                                  className="text-white hover:text-foreground"
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
                          <FormLabel>Published</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            {field.value ? 'Publicly visible' : 'Draft (not visible)'}
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-3">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/admin/insights')}
                    >
                      Cancel
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