import { getPublicInsightBySlug, getPublicInsights } from '@/lib/api/public-insights';
import { notFound } from 'next/navigation';
import { InsightDetailContent } from '@/components/insights/InsightDetailContent';

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

  return (
    <InsightDetailContent
      slug={slug}
      initialInsight={insight}
      initialRecentInsights={recentInsights}
    />
  );
}
