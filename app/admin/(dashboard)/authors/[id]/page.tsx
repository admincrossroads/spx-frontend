import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { AuthorForm } from '@/components/admin/authors/author-form';
import { getAuthorById } from '@/lib/actions/authors';

interface EditAuthorPageProps {
  params: Promise<{ id: string }>; // params is a Promise!
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  // AWAIT the params Promise
  const { id } = await params;
  
  console.log('Author ID:', id);
  
  const numericId = parseInt(id);
  
  if (isNaN(numericId)) {
    console.log('ID is NaN, showing 404');
    notFound();
  }

  let author = null;
  try {
    console.log('Fetching author with ID:', numericId);
    author = await getAuthorById(numericId);
    console.log('Fetched author:', author);
  } catch (error) {
    console.error('Failed to fetch author:', error);
    notFound();
  }

  if (!author) {
    console.log('Author is null, showing 404');
    notFound();
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Edit Author</h1>
          <p className="text-muted-foreground">
            Update author information
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <User className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit {author.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorForm author={author} mode="edit" />
        </CardContent>
      </Card>
    </div>
  );
}