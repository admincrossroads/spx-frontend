import { getPublicInsights } from '@/lib/api/public-insights';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

export default async function InsightsPage() {
  // Fetch initial 6 insights for the grid
  const { insights, pagination } = await getPublicInsights({
    page: 1,
    limit: 6,
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Insights & Evidence</h1>
        <p className="text-muted-foreground text-lg">
          Explore our research, publications, and thought leadership
        </p>
      </div>

      <InsightsGrid 
        initialInsights={insights} 
        initialTotal={pagination.total}
      />
    </div>
  );
}

