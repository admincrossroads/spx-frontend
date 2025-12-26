'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { api } from '@/lib/api/client';

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
        await api.patch(`/admin/insights/${insight.publicId}`, { isPublished: false });
      } else {
        await api.patch(`/admin/insights/${insight.publicId}/publish`);
      }
      
      onToggle?.();
    } catch (error: any) {
      console.error('Failed to toggle publish status:', error);
      alert(error?.data?.message || error?.message || 'Failed to update publish status');
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