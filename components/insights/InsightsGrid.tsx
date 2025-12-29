'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, getImageUrl } from '@/lib/utils/helpers';
import { FileText, Calendar, User, Loader2, ArrowRight } from 'lucide-react';
import { InsightImage } from '@/components/ui/insight-image';
import { api } from '@/lib/api/client';

interface Insight {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  summary: string;
  type: 'report' | 'publication' | 'policy-brief' | 'blog';
  coverImageUrl: string | null;
  publishedAt: string | null;
  author: {
    id: number;
    name: string;
    imageUrl: string | null;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface InsightsGridProps {
  type?: 'report' | 'publication' | 'policy-brief' | 'blog';
  initialInsights?: Insight[];
  initialTotal?: number;
}

const INITIAL_LIMIT = 6;
const LOAD_MORE_LIMIT = 3;

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  report: 'Report',
  publication: 'Publication',
  'policy-brief': 'Policy Brief',
};

const typeColors: Record<string, string> = {
  blog: 'bg-blue-500',
  report: 'bg-green-500',
  publication: 'bg-purple-500',
  'policy-brief': 'bg-orange-500',
};

export function InsightsGrid({ type, initialInsights = [], initialTotal = 0 }: InsightsGridProps) {
  const [insights, setInsights] = useState<Insight[]>(initialInsights.slice(0, INITIAL_LIMIT));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTotal > INITIAL_LIMIT);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(initialTotal);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('isPublished', 'true');
      if (type) params.set('type', type);
      
      // We've loaded 'insights.length' items so far
      // The next items to load start at index 'insights.length'
      // With standard pagination (1-based), if we use limit 3:
      // - Page 1 (limit 3): items 1-3 (indices 0-2)
      // - Page 2 (limit 3): items 4-6 (indices 3-5)
      // - Page 3 (limit 3): items 7-9 (indices 6-8)
      // So if we've loaded 6 items (indices 0-5), we need page 3 to get items 7-9
      // Formula: page = Math.floor(offset / limit) + 1
      const offset = insights.length;
      const nextPage = Math.floor(offset / LOAD_MORE_LIMIT) + 1;
      params.set('page', nextPage.toString());
      params.set('limit', LOAD_MORE_LIMIT.toString());

      const response = await api.get<{
        insights: Insight[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>(`/insights?${params.toString()}`);

      const newInsights = response.insights || [];
      const responseTotal = response.pagination?.total || total;
      
      if (newInsights.length > 0) {
        const updatedInsights = [...insights, ...newInsights];
        setInsights(updatedInsights);
        setTotal(responseTotal);
        setHasMore(updatedInsights.length < responseTotal);
        setCurrentPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more insights:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, insights, type, total]);

  // Update hasMore when insights change
  useEffect(() => {
    setHasMore(insights.length < total);
  }, [insights.length, total]);

  if (insights.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          {type ? `No ${typeLabels[type] || type}s found.` : 'No insights found.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {insights.map((insight, index) => (
          <Link 
            key={insight.id} 
            href={`/insights/${insight.slug}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              {insight.coverImageUrl && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <InsightImage
                    src={getImageUrl(insight.coverImageUrl)}
                    alt={insight.title}
                    className="w-full h-full"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className={`${typeColors[insight.type] || 'bg-gray-500'} text-white capitalize px-4 py-1.5 text-sm transform-[translateY(-15px)]`}
                  >
                    {typeLabels[insight.type] || insight.type}
                  </Badge>
                  {insight.publishedAt && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(insight.publishedAt)}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {insight.summary}
                </p>
                <div className="flex items-center justify-between text-sm mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{insight.author.name}</span>
                  </div>
                  {insight.tags.length > 0 && (
                    <div className="flex gap-1">
                      {insight.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.id} variant="outline" className="text-sm px-3 py-1">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-auto">
                  <Button variant="ghost" size="sm" className="gap-2 hover:underline text-primary hover:text-primary hover:bg-transparent p-0 h-auto">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </>
  );
}

