'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { AuthorForm } from '@/components/admin/authors/author-form';
import { api } from '@/lib/api/client';
import type { Author } from '@/lib/api/authors';

export default function EditAuthorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthor() {
      if (!id) return;
      
      const numericId = parseInt(id);
      
      if (isNaN(numericId)) {
        router.push('/admin/authors');
        return;
      }

      try {
        const authorData = await api.get<Author>(`/admin/authors/${numericId}`);
        setAuthor(authorData);
      } catch (error) {
        console.error('Failed to fetch author:', error);
        router.push('/admin/authors');
      } finally {
        setLoading(false);
      }
    }

    loadAuthor();
  }, [id, router]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading author...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    return null;
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