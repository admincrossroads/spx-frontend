import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { AuthorForm } from '@/components/admin/authors/author-form';

export default function CreateAuthorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/authors"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Authors
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Author</h1>
          <p className="text-muted-foreground">
            Create a new author profile
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Author Information</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}