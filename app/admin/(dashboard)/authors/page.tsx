import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import Link from 'next/link';
import { AuthorsTable } from '@/components/admin/authors/authors-table';
import { getAuthors } from '@/lib/actions/authors';

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
          <p className="text-muted-foreground">
            Manage authors who write insights and articles
          </p>
        </div>
        <Link href="/admin/authors/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Author
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Authors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorsTable authors={authors} />
        </CardContent>
      </Card>
    </div>
  );
}