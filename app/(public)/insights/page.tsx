import { getPublicInsights } from '@/lib/api/public-insights';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, getImageUrl } from '@/lib/utils/helpers';
import { FileText, Calendar, User } from 'lucide-react';
import { InsightImage } from '@/components/ui/insight-image';

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);

  const { insights, pagination } = await getPublicInsights({
    page,
    limit: 12,
  });

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

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Insights & Evidence</h1>
        <p className="text-muted-foreground text-lg">
          Explore our research, publications, and thought leadership
        </p>
      </div>


      {/* Insights Grid */}
      {insights.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No insights found.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {insights.map((insight) => (
              <Link 
                key={insight.id} 
                href={`/insights/${insight.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {insight.coverImageUrl && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <InsightImage
                        src={getImageUrl(insight.coverImageUrl)}
                        alt={insight.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`${typeColors[insight.type] || 'bg-gray-500'} text-white capitalize`}
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
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{insight.author.name}</span>
                      </div>
                      {insight.tags.length > 0 && (
                        <div className="flex gap-1">
                          {insight.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag.id} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/insights?page=${pageNum}`}
                  className={`px-4 py-2 rounded ${
                    pageNum === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

