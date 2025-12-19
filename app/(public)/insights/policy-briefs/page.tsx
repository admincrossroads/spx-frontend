import { getPublicInsights } from '@/lib/api/public-insights';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

export default async function PolicyBriefsPage() {
  // Fetch initial 6 insights for the grid
  const { insights, pagination } = await getPublicInsights({
    type: 'policy-brief',
    page: 1,
    limit: 6,
  });

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Policy Briefs</h1>
        <p className="text-muted-foreground text-lg">
          Explore our policy briefs and recommendations
        </p>
      </div>

      <InsightsGrid 
        type="policy-brief"
        initialInsights={insights} 
        initialTotal={pagination.total}
      />
    </div>
  );
}

