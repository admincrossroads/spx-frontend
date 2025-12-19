'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Edit, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { api } from '@/lib/api/client';
import Link from 'next/link';

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

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const response = await api.get<{
        insights: Insight[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>(`/admin/insights?page=${currentPage}&limit=10${search ? `&search=${search}` : ''}`);
      
      setInsights(response.insights);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [currentPage, search]);

  const handlePublishToggle = async (publicId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        // Unpublish
        await api.patch(`/admin/insights/${publicId}`, { isPublished: false });
      } else {
        // Publish - use the dedicated publish endpoint
        await api.patch(`/admin/insights/${publicId}/publish`);
      }
      loadInsights();
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
      loadInsights();
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
        </CardContent>
      </Card>
    </div>
  );
}