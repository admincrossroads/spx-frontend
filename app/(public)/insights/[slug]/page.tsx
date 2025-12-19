import { getPublicInsightBySlug, getPublicInsights } from '@/lib/api/public-insights';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatDate, getImageUrl } from '@/lib/utils/helpers';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { InsightImage } from '@/components/ui/insight-image';

// Render content blocks
function renderContentBlock(block: {
  id: string;
  type: string;
  data: Record<string, any>;
}) {
  switch (block.type) {
    case 'text':
      return (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: block.data.html || '' }}
        />
      );
    case 'image':
      return (
        <div className="my-6">
          <img
            src={getImageUrl(block.data.url)}
            alt={block.data.alt || ''}
            className="w-full rounded-lg"
          />
          {block.data.caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {block.data.caption}
            </p>
          )}
        </div>
      );
    case 'video':
      return (
        <div className="my-6">
          {block.data.url && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={block.data.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );
    case 'link':
      return (
        <div className="my-4">
          <a
            href={block.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {block.data.text || block.data.url}
          </a>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic my-6">
          "{block.data.text}"
          {block.data.author && (
            <footer className="mt-2 text-sm not-italic">— {block.data.author}</footer>
          )}
        </blockquote>
      );
    case 'table':
      return (
        <div
          className="my-6 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: block.data.html || '' }}
        />
      );
    case 'subTopic':
      return (
        <h3 className="text-2xl font-bold mt-8 mb-4">{block.data.text}</h3>
      );
    default:
      return null;
  }
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [insight, recentInsightsData] = await Promise.all([
    getPublicInsightBySlug(slug),
    getPublicInsights({ limit: 5 }),
  ]);

  if (!insight) {
    console.error('Insight not found for slug:', slug);
    notFound();
  }

  // Filter out the current insight from recent insights
  const recentInsights = recentInsightsData.insights.filter(
    (i) => i.slug !== slug
  ).slice(0, 4);

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
    <div className="container mx-auto px-6 pt-22">
      <Link
        href="/insights"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Insights
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-2">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              className={`${typeColors[insight.type] || 'bg-gray-500'} text-white capitalize`}
            >
              {typeLabels[insight.type] || insight.type}
            </Badge>
            {insight.publishedAt && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(insight.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{insight.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{insight.author.name}</span>
            </div>
            {insight.tags.length > 0 && (
              <div className="flex gap-2">
                {insight.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {insight.coverImageUrl && (
            <div className="relative h-96 w-full overflow-hidden rounded-lg mb-8">
              <InsightImage
                src={getImageUrl(insight.coverImageUrl)}
                alt={insight.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}

          <p className="text-xl text-muted-foreground mb-8">{insight.summary}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {insight.content && insight.content.length > 0 ? (
            insight.content.map((block) => (
              <div key={block.id}>{renderContentBlock(block)}</div>
            ))
          ) : (
            <p className="text-muted-foreground">No content available.</p>
          )}
        </div>
      </article>

        {/* Sidebar - Recent Insights */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Recent Insights</h2>
            {recentInsights.length > 0 ? (
              <div className="space-y-6">
                {recentInsights.map((recentInsight) => (
                  <Link
                    key={recentInsight.id}
                    href={`/insights/${recentInsight.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer max-w-xs my-6">
                      {recentInsight.coverImageUrl && (
                        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                          <InsightImage
                            src={getImageUrl(recentInsight.coverImageUrl)}
                            alt={recentInsight.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${
                              typeColors[recentInsight.type] || 'bg-gray-500'
                            } text-white text-xs capitalize`}
                          >
                            {typeLabels[recentInsight.type] || recentInsight.type}
                          </Badge>
                          {recentInsight.publishedAt && (
                            <span className="text-xs text-muted-foreground">
                              {formatDate(recentInsight.publishedAt)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {recentInsight.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {recentInsight.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No other insights available.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

