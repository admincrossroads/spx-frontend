'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  report: 'Report',
  publication: 'Publication',
  'policy-brief': 'Policy Brief',
};

interface Insight {
  id: number;
  slug: string;
  title: string;
  summary: string;
  type: string;
}

export default function InsightsPreview() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchInsights() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        // Add API key if available (required for backend)
        if (API_KEY) {
          headers['x-api-key'] = API_KEY;
        }
        
        const response = await fetch(`${API_URL}/insights?isPublished=true&limit=3`, {
          method: 'GET',
          headers,
          cache: 'no-store', // Client-side fetch doesn't support Next.js cache options
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch insights:', response.status, errorText);
          throw new Error(`Failed to fetch insights: ${response.status}`);
        }

        const data = await response.json();
        
        if (mounted) {
          setInsights(data.insights || []);
        }
      } catch (error) {
        console.error('Failed to fetch insights:', error);
        if (mounted) {
          setInsights([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchInsights();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return null;
  }

  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold">Insights & Evidence</h2>
        <Link
          href="/insights"
          className="text-primary hover:underline text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/insights/${insight.slug}`}>
              <Badge variant="outline" className="mb-2 capitalize px-3 py-1 text-sm">
                {typeLabels[insight.type] || insight.type}
              </Badge>
              <h3 className="font-semibold text-sm mb-2 hover:text-primary transition-colors">
                {insight.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                {insight.summary}
              </p>
              <div className="flex justify-end mt-auto">
                <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary hover:bg-transparent p-0 h-auto font-medium">
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
