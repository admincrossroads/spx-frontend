'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const insightTypes = [
  { value: '', label: 'All Types' },
  { value: 'report', label: 'Report' },
  { value: 'publication', label: 'Publication' },
  { value: 'policy-brief', label: 'Policy Brief' },
  { value: 'blog', label: 'Blog' },
];

export function InsightsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  
  const updateFilters = useCallback(() => {
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    
    // Reset to page 1 when filters change
    params.set('page', '1');
    
    router.push(`/admin/insights?${params.toString()}`);
  }, [search, type, router]);

  const clearFilters = () => {
    setSearch('');
    setType('');
    router.push('/admin/insights');
  };

  const hasActiveFilters = search || type;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search insights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && updateFilters()}
            className="pl-9"
          />
        </div>
        
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {insightTypes.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button onClick={updateFilters} className="flex-1">
            Apply Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1 sm:flex-none"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{search}"
              <button
                onClick={() => setSearch('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {type && (
            <Badge variant="secondary" className="gap-1">
              Type: {insightTypes.find(t => t.value === type)?.label}
              <button
                onClick={() => setType('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}