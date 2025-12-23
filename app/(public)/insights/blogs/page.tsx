import { getPublicInsights } from '@/lib/api/public-insights';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

export default async function BlogsPage() {
  // Fetch initial 6 insights for the grid
  const { insights, pagination } = await getPublicInsights({
    type: 'blog',
    page: 1,
    limit: 6,
  });

  return (
    <div className="main-container section-py">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blogs</h1>
        <p className="text-muted-foreground text-lg">
          Explore our latest blog posts and articles
        </p>
      </div>

      <InsightsGrid 
        type="blog"
        initialInsights={insights} 
        initialTotal={pagination.total}
      />
    </div>
  );
}

