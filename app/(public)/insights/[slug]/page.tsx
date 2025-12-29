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
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <InsightImage
              src={getImageUrl(block.data.url)}
              alt={block.data.alt || ''}
              className="w-full h-full rounded-lg"
              loading="lazy"
            />
          </div>
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
          {block.data.url && (() => {
            // Convert YouTube URLs to embed format
            let embedUrl = block.data.url;
            
            // YouTube URL patterns
            const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
            const youtubeMatch = block.data.url.match(youtubeRegex);
            
            if (youtubeMatch) {
              const videoId = youtubeMatch[1];
              embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else {
              // Check for Vimeo URLs
              const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
              const vimeoMatch = block.data.url.match(vimeoRegex);
              
              if (vimeoMatch) {
                const videoId = vimeoMatch[1];
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
              }
              // If it's already an embed URL or direct video URL, use as-is
            }
            
            return (
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video player"
                />
              </div>
            );
          })()}
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
    <div className="container mx-auto px-6 md:px-6 min-[1300px]:px-4 py-24">
      <Link
        href="/insights"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Insights
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-5 order-1">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <Badge
              className={`${typeColors[insight.type] || 'bg-gray-500'} text-white capitalize px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm`}
            >
              {typeLabels[insight.type] || insight.type}
            </Badge>
            {insight.publishedAt && (
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                {formatDate(insight.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{insight.title}</h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 md:h-4 md:w-4" />
              <span>{insight.author.name}</span>
            </div>
            {insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" className="px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {insight.coverImageUrl && (
            <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-lg mb-8">
              <InsightImage
                src={getImageUrl(insight.coverImageUrl)}
                alt={insight.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{insight.summary}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {insight.content && insight.content.length > 0 ? (
            insight.content.map((block) => (
              <div key={block.id} className="mb-8 last:mb-0">{renderContentBlock(block)}</div>
            ))
          ) : (
            <p className="text-muted-foreground">No content available.</p>
          )}
        </div>
      </article>

        {/* Sidebar - Recent Insights */}
        <aside className="lg:col-span-2 order-2">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3">Recent Insights</h2>
            {recentInsights.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2 md:gap-2.5 lg:gap-3">
                {recentInsights.map((recentInsight) => (
                  <Link
                    key={recentInsight.id}
                    href={`/insights/${recentInsight.slug}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden w-full aspect-square lg:w-[250px] lg:h-[200px] lg:flex-shrink-0">
                      {recentInsight.coverImageUrl && (
                        <div className="relative w-full h-full overflow-hidden">
                          <InsightImage
                            src={getImageUrl(recentInsight.coverImageUrl)}
                            alt={recentInsight.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge
                              className={`${
                                typeColors[recentInsight.type] || 'bg-gray-500'
                              } text-white capitalize px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] lg:text-[10px] w-fit leading-tight`}
                            >
                              {typeLabels[recentInsight.type] || recentInsight.type}
                            </Badge>
                          </div>
                        </div>
                      )}
                      {!recentInsight.coverImageUrl && (
                        <div className="relative w-full h-full bg-muted flex items-center justify-center">
                          <Badge
                            className={`${
                              typeColors[recentInsight.type] || 'bg-gray-500'
                            } text-white capitalize px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] lg:text-[10px] w-fit leading-tight`}
                          >
                            {typeLabels[recentInsight.type] || recentInsight.type}
                          </Badge>
                        </div>
                      )}
                    </Card>
                    <div className="mt-2 space-y-1.5 max-w-[250px]">
                      <h3 className="font-semibold text-xs md:text-sm lg:text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
                        {recentInsight.title}
                      </h3>
                      <p className="text-[11px] md:text-xs lg:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {recentInsight.summary}
                      </p>
                      {recentInsight.publishedAt && (
                        <span className="text-[10px] md:text-[11px] lg:text-[11px] text-muted-foreground block">
                          {formatDate(recentInsight.publishedAt)}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs md:text-sm text-muted-foreground">
                No other insights available.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
