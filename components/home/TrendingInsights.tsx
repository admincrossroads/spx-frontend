'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InsightImage } from '@/components/ui/insight-image';
import { getImageUrl } from '@/lib/utils/helpers';

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
  coverImageUrl: string | null;
  publishedAt: string | null;
  author?: {
    id: number;
    name: string;
  };
}

export default function TrendingInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchTrendingInsights() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (API_KEY) {
          headers['x-api-key'] = API_KEY;
        }
        
        // Fetch top 5 published insights (sorted by published date)
        const response = await fetch(`${API_URL}/insights?isPublished=true&limit=5`, {
          method: 'GET',
          headers,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch insights: ${response.status}`);
        }

        const data = await response.json();
        
        if (mounted) {
          setInsights(data.insights || []);
        }
      } catch (error) {
        console.error('Failed to fetch trending insights:', error);
        if (mounted) {
          setInsights([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchTrendingInsights();

    return () => {
      mounted = false;
    };
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (insights.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [insights.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return null;
  }

  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold">Trending Now</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Explore our most popular insights
          </p>
        </div>
        <Link
          href="/insights"
          className="text-primary hover:underline text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              <Link 
                href={`/insights/${insights[currentIndex].slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="grid md:grid-cols-2 gap-6 bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image Section */}
                  {insights[currentIndex].coverImageUrl && (
                    <div className="relative h-64 md:h-full min-h-[300px]">
                      <InsightImage
                        src={getImageUrl(insights[currentIndex].coverImageUrl)}
                        alt={insights[currentIndex].title}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="mb-4 w-fit capitalize">
                      {typeLabels[insights[currentIndex].type] || insights[currentIndex].type}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors">
                      {insights[currentIndex].title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-4">
                      {insights[currentIndex].summary}
                    </p>
                    {insights[currentIndex].author && (
                      <p className="text-sm text-muted-foreground">
                        By {insights[currentIndex].author.name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {insights.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border rounded-full p-2 shadow-lg transition-colors"
              aria-label="Previous insight"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border rounded-full p-2 shadow-lg transition-colors"
              aria-label="Next insight"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {insights.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Card Grid Below (for smaller screens or as preview) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {insights.slice(0, 4).map((insight, index) => (
            <motion.button
              key={insight.id}
              onClick={() => goToSlide(index)}
              className={`text-left p-4 border rounded-lg bg-card hover:shadow-md transition-all ${
                index === currentIndex ? 'ring-2 ring-primary' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {insight.coverImageUrl && (
                <div className="relative h-24 mb-2 rounded overflow-hidden">
                  <InsightImage
                    src={getImageUrl(insight.coverImageUrl)}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <Badge variant="outline" className="text-xs mb-1 capitalize">
                {typeLabels[insight.type] || insight.type}
              </Badge>
              <h4 className="text-xs font-semibold line-clamp-2">
                {insight.title}
              </h4>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

