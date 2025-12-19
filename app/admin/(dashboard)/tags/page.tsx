import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Tag as TagIcon } from 'lucide-react';
import { TagsTable } from '@/components/admin/tags/tags-table';
import { CreateTagDialog } from '@/components/admin/tags/create-tag-dialog';
import { getTags } from '@/lib/actions/tags';

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">
            Manage tags for categorizing insights
          </p>
        </div>
        <CreateTagDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tag
          </Button>
        </CreateTagDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            All Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TagsTable tags={tags} />
        </CardContent>
      </Card>
    </div>
  );
}