'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Tag as TagIcon, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { TagsTable } from '@/components/admin/tags/tags-table';
import { CreateTagDialog } from '@/components/admin/tags/create-tag-dialog';
import { api } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const LIMIT = 10; // Always 10 tags per page

export default function TagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

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
      if (searchParam) setSearch(searchParam);
    }
  }, []);

  const loadTags = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', LIMIT.toString());
      if (search) {
        params.set('search', search);
      }
      
      const response = await api.get<{
        tags: Tag[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>(`/admin/tags?${params.toString()}`);
      
      // The backend might return tags directly or wrapped in data
      const actualResponse = (response as any).data || response;
      const apiTotal = actualResponse.pagination?.total || 0;
      const returnedTags = actualResponse.tags || actualResponse; // Handle both formats
      
      const calculatedTotalPages = apiTotal > 0 ? Math.ceil(apiTotal / LIMIT) : 0;
      
      setTotal(apiTotal);
      setTotalPages(calculatedTotalPages);
      setTags(Array.isArray(returnedTags) ? returnedTags : []);
      
      if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
        setCurrentPage(calculatedTotalPages);
        return;
      }
      
      if (typeof window !== 'undefined') {
        const newParams = new URLSearchParams();
        newParams.set('page', currentPage.toString());
        if (search) {
          newParams.set('search', search);
        }
        router.push(`/admin/tags?${newParams.toString()}`, { scroll: false });
      }
    } catch (error) {
      console.error('Failed to load tags:', error);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, router]);

  useEffect(() => {
    loadTags();
  }, [currentPage, loadTags]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== '') {
        setCurrentPage(1);
      }
      loadTags();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search, loadTags]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">
            Manage tags for categorizing insights
          </p>
        </div>
        <CreateTagDialog onSuccess={loadTags}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tag
          </Button>
        </CreateTagDialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                    loadTags();
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            All Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">Loading tags...</div>
          ) : (
            <>
              <TagsTable tags={tags} onSuccess={loadTags} />
              
              {!loading && totalPages > 0 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * LIMIT + 1} to{' '}
                    {Math.min(currentPage * LIMIT, total)} of {total} tags
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
