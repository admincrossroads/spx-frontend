'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthorsTable } from '@/components/admin/authors/authors-table';
import { api } from '@/lib/api/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Author {
  id: number;
  name: string;
  bio?: string;
  imageUrl?: string;
  createdAt: string;
}

const LIMIT = 10; // Always 10 authors per page

export default function AuthorsPage() {
  const router = useRouter();
  const [authors, setAuthors] = useState<Author[]>([]);
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

  const loadAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', LIMIT.toString());
      if (search) {
        params.set('search', search);
      }
      
      const response = await api.get<{
        authors: Author[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>(`/admin/authors?${params.toString()}`);
      
      const actualResponse = (response as any).data || response;
      const apiTotal = actualResponse.pagination?.total || 0;
      const returnedAuthors = actualResponse.authors || actualResponse;
      
      const calculatedTotalPages = apiTotal > 0 ? Math.ceil(apiTotal / LIMIT) : 0;
      
      setTotal(apiTotal);
      setTotalPages(calculatedTotalPages);
      setAuthors(Array.isArray(returnedAuthors) ? returnedAuthors : []);
      
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
        router.push(`/admin/authors?${newParams.toString()}`, { scroll: false });
      }
    } catch (error) {
      console.error('Failed to load authors:', error);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, router]);

  useEffect(() => {
    loadAuthors();
  }, [currentPage, loadAuthors]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== '') {
        setCurrentPage(1);
      }
      loadAuthors();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search, loadAuthors]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
          <p className="text-muted-foreground">
            Manage authors who write insights and articles
          </p>
        </div>
        <Link href="/admin/authors/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Author
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                    loadAuthors();
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
            <Users className="h-5 w-5" />
            All Authors
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">Loading authors...</div>
          ) : (
            <>
              <AuthorsTable authors={authors} onSuccess={loadAuthors} />
              
              {!loading && totalPages > 0 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * LIMIT + 1} to{' '}
                    {Math.min(currentPage * LIMIT, total)} of {total} authors
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
