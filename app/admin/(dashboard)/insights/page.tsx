'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Edit, Trash2, Eye, EyeOff, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminInsights, adminInsightKeys } from '@/lib/hooks/queries/useAdminInsights';
import { useQueryClient } from '@tanstack/react-query';

interface Insight {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  type: string;
  isPublished: boolean;
  publishedAt?: string;
  author: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
}

const LIMIT = 10; // Always 10 insights per page

export default function InsightsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Initialize from URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const searchParam = params.get('search');
      
      if (pageParam) {
        const page = parseInt(pageParam, 10);
        if (page > 0) setCurrentPage(page);
      }
      if (searchParam) {
        setSearch(searchParam);
        setDebouncedSearch(searchParam);
      }
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      if (search !== '') {
        setCurrentPage(1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search]);

  // Use React Query to fetch insights
  const { data, isLoading, refetch } = useAdminInsights({
    page: currentPage,
    limit: LIMIT,
    search: debouncedSearch || undefined,
  });

  const insights = data?.insights || [];
  const total = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 0;
  const loading = isLoading;

  // Update URL when page or search changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newParams = new URLSearchParams();
      newParams.set('page', currentPage.toString());
      if (debouncedSearch) {
        newParams.set('search', debouncedSearch);
      } else {
        newParams.delete('search');
      }
      router.push(`/admin/insights?${newParams.toString()}`, { scroll: false });
    }
  }, [currentPage, debouncedSearch, router]);

  const handlePublishToggle = async (publicId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await api.patch(`/admin/insights/${publicId}`, { isPublished: false });
      } else {
        await api.patch(`/admin/insights/${publicId}/publish`);
      }
      // Invalidate and refetch insights
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      refetch();
    } catch (error: any) {
      console.error('Failed to toggle publish status:', error);
      const errorMessage = error?.data?.message || error?.message || 'Failed to update publish status';
      alert(errorMessage);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this insight?')) return;
    
    try {
      await api.delete(`/admin/insights/${publicId}`);
      // Invalidate and refetch insights
      queryClient.invalidateQueries({ queryKey: adminInsightKeys.all });
      refetch();
    } catch (error) {
      console.error('Failed to delete insight:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground">Manage your insights and content</p>
        </div>
        <Link href="/admin/insights/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Insight
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search insights..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                    setDebouncedSearch(search);
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">Loading insights...</div>
          ) : insights.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No insights found. Create your first insight.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insights.map((insight) => (
                    <TableRow key={insight.publicId}>
                      <TableCell className="font-medium">{insight.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{insight.type}</Badge>
                      </TableCell>
                      <TableCell>{insight.author.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {insight.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag.id} variant="secondary">
                              {tag.name}
                            </Badge>
                          ))}
                          {insight.tags.length > 2 && (
                            <Badge variant="outline">+{insight.tags.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={insight.isPublished ? "default" : "secondary"}>
                          {insight.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePublishToggle(insight.publicId, insight.isPublished)}
                          >
                            {insight.isPublished ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Link href={`/admin/insights/${insight.publicId}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(insight.publicId)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {!loading && totalPages > 0 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * LIMIT + 1} to{' '}
                {Math.min(currentPage * LIMIT, total)} of {total} insights
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => {
                            setCurrentPage(pageNum);
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
