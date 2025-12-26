'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Tag,
  Calendar,
  TrendingUp 
} from 'lucide-react';

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}

export default function AdminDashboard() {
  const [totalInsights, setTotalInsights] = useState(0);
  const [publishedInsights, setPublishedInsights] = useState(0);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Array<{ action: string; title: string; time: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [insightsData, authorsData, tagsData] = await Promise.all([
          api.get<any>('/admin/insights?limit=50').catch(() => ({ insights: [], pagination: { total: 0 } })),
          api.get<any[]>('/admin/authors').catch(() => []),
          api.get<any[]>('/admin/tags').catch(() => []),
        ]);

        // Calculate insights stats
        const insights = insightsData?.insights || (Array.isArray(insightsData) ? insightsData : []);
        
        if (insights.length > 0) {
          setTotalInsights(insightsData.pagination?.total || insights.length);
          setPublishedInsights(insights.filter((insight: any) => insight.isPublished).length);

          // Generate recent activities from insights
          const activities: Array<{ action: string; title: string; time: string; timestamp: number }> = [];
          
          insights.forEach((insight: any) => {
            // Add published activity if recently published
            if (insight.isPublished && insight.publishedAt) {
              activities.push({
                action: 'Published',
                title: insight.title,
                time: formatTimeAgo(insight.publishedAt),
                timestamp: new Date(insight.publishedAt).getTime(),
              });
            }
            
            // Add updated activity if recently updated (and not just published)
            if (insight.updatedAt) {
              const updatedAt = new Date(insight.updatedAt).getTime();
              const publishedAt = insight.publishedAt ? new Date(insight.publishedAt).getTime() : 0;
              // Only add if updated more than 1 minute after published (to avoid duplicates)
              if (!insight.publishedAt || (updatedAt - publishedAt > 60000)) {
                activities.push({
                  action: 'Updated',
                  title: insight.title,
                  time: formatTimeAgo(insight.updatedAt),
                  timestamp: updatedAt,
                });
              }
            }
          });

          // Sort by most recent and take top 5
          activities.sort((a, b) => b.timestamp - a.timestamp);
          setRecentActivities(activities.slice(0, 5).map(({ timestamp, ...rest }) => rest));
        }

        // Get counts
        setAuthorsCount(Array.isArray(authorsData) ? authorsData.length : 0);
        setTagsCount(Array.isArray(tagsData) ? tagsData.length : 0);
      } catch (error: any) {
        console.error('Failed to fetch dashboard stats:', error);
        // If 401, redirect to login (handled by API client, but check here too)
        if (error?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
          return;
        }
        // Use fallback values if fetch fails
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  
  const stats = [
    { label: 'Total Insights', value: totalInsights.toString(), icon: FileText, change: '—' },
    { label: 'Published', value: publishedInsights.toString(), icon: BarChart3, change: '—' },
    { label: 'Authors', value: authorsCount.toString(), icon: Users, change: '—' },
    { label: 'Tags', value: tagsCount.toString(), icon: Tag, change: '—' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin!
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={`${activity.title}-${index}`} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent activity to display
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/insights/new"
                className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">New Insight</span>
              </a>
              <a
                href="/admin/authors/new"
                className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Add Author</span>
              </a>
              <a
                href="/admin/tags"
                className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <Tag className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Manage Tags</span>
              </a>
              <a
                href="/admin/insights"
                className="flex flex-col items-center justify-center rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">View All</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}