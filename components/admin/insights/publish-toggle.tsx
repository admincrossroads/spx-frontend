'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { publishInsight, unpublishInsight } from '@/lib/actions/insights';

interface Insight {
  publicId: string;
  isPublished: boolean;
}

interface PublishToggleProps {
  insight: Insight;
  onToggle?: () => void;
}

export function PublishToggle({ insight, onToggle }: PublishToggleProps) {
  const [isToggling, setIsToggling] = useState(false);

  async function handleToggle() {
    try {
      setIsToggling(true);
      
      if (insight.isPublished) {
        await unpublishInsight(insight.publicId);
      } else {
        await publishInsight(insight.publicId);
      }
      
      onToggle?.();
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update publish status');
    } finally {
      setIsToggling(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Switch
          checked={insight.isPublished}
          onCheckedChange={handleToggle}
          disabled={isToggling}
        />
      )}
      <Badge
        variant={insight.isPublished ? "default" : "outline"}
        className="gap-1"
      >
        {insight.isPublished ? (
          <>
            <Eye className="h-3 w-3" />
            Published
          </>
        ) : (
          <>
            <EyeOff className="h-3 w-3" />
            Draft
          </>
        )}
      </Badge>
    </div>
  );
}