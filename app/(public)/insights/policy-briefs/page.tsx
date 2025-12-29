import { getPublicInsights } from '@/lib/api/public-insights';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

// Mark this page as dynamic to allow server-side data fetching
export const dynamic = 'force-dynamic';

export default async function PolicyBriefsPage() {
  // Fetch initial 6 insights for the grid
  const { insights, pagination } = await getPublicInsights({
    type: 'policy-brief',
    page: 1,
    limit: 6,
  });

  return (
    <div className="main-container section-py">
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

