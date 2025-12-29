'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, getImageUrl } from '@/lib/utils/helpers';
import { FileText, Calendar, User, Loader2, ArrowRight } from 'lucide-react';
import { InsightImage } from '@/components/ui/insight-image';
import { usePublicInsights } from '@/lib/hooks/queries/useInsights';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const [displayedCount, setDisplayedCount] = useState(INITIAL_LIMIT);
  
  // Fetch initial insights with React Query
  const { data: initialData, isLoading: initialLoading } = usePublicInsights(
    { type, page: 1, limit: INITIAL_LIMIT },
    { initialData: initialInsights.length > 0 ? { insights: initialInsights, pagination: { total: initialTotal, page: 1, limit: INITIAL_LIMIT, totalPages: Math.ceil(initialTotal / INITIAL_LIMIT) } } : undefined }
  );
  
  // Get all displayed insights from cache or current query
  const displayedInsights = useMemo(() => {
    const allInsights: Insight[] = [];
    let currentPage = 1;
    const limit = INITIAL_LIMIT;
    
    // Start with initial data
    if (initialData?.insights) {
      allInsights.push(...initialData.insights);
    }
    
    // Fetch additional pages from cache if available
    while (allInsights.length < displayedCount) {
      currentPage++;
      const cacheKey = ['insights', 'list', { type, page: currentPage, limit }];
      const cachedData = queryClient.getQueryData<{ insights: Insight[]; pagination: any }>(cacheKey);
      
      if (cachedData?.insights) {
        allInsights.push(...cachedData.insights);
      } else {
        break;
      }
    }
    
    return allInsights.slice(0, displayedCount);
  }, [initialData, displayedCount, type, queryClient]);
  
  const total = initialData?.pagination?.total || initialTotal;
  const hasMore = displayedInsights.length < total;
  const [loading, setLoading] = useState(false);

  // Load more insights
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const offset = displayedCount;
      const pageToLoad = Math.floor(offset / LOAD_MORE_LIMIT) + 1;
      
      // Prefetch the next page using React Query
      const { fetchPublicInsights } = await import('@/lib/api/public-insights-client');
      const nextData = await fetchPublicInsights({
        type,
        page: pageToLoad,
        limit: LOAD_MORE_LIMIT,
      });
      
      // Set the query data in cache
      queryClient.setQueryData(
        ['insights', 'list', { type, page: pageToLoad, limit: LOAD_MORE_LIMIT }],
        nextData
      );
      
      // Update displayed count
      setDisplayedCount(prev => prev + LOAD_MORE_LIMIT);
    } catch (error) {
      console.error('Failed to load more insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (displayedInsights.length === 0 && !loading) {
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
        {displayedInsights.map((insight, index) => (
          <Link 
            key={insight.id} 
            href={`/insights/${insight.slug}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              {insight.coverImageUrl && (
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg">
                  <InsightImage
                    src={getImageUrl(insight.coverImageUrl)}
                    alt={insight.title}
                    className="w-full h-full"
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

