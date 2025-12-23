import { getPublicInsights } from '@/lib/api/public-insights';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

export default async function ReportsPage() {
  // Fetch initial 6 insights for the grid
  const { insights, pagination } = await getPublicInsights({
    type: 'report',
    page: 1,
    limit: 6,
  });

  return (
    <div className="main-container section-py">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Reports</h1>
        <p className="text-muted-foreground text-lg">
          Explore our research reports and analysis
        </p>
      </div>

      <InsightsGrid 
        type="report"
        initialInsights={insights} 
        initialTotal={pagination.total}
      />
    </div>
  );
}

