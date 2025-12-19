'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Edit,
  MoreVertical,
  Trash2,
  User,
  Eye,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/helpers';
import { DeleteAuthorDialog } from './delete-author-dialog';
import type { Author } from '@/lib/api/authors';

interface AuthorsTableProps {
  authors: Author[];
  onSuccess?: () => void;
}

export function AuthorsTable({ authors, onSuccess }: AuthorsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  if (authors.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold">No authors found</h3>
        <p className="text-muted-foreground mt-2">
          Get started by creating your first author.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {author.imageUrl ? (
                        <img
                          src={author.imageUrl}
                          alt={author.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {author.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-sm line-clamp-2">
                      {author.bio || 'No bio provided'}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(author.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/authors/${author.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedAuthor(author);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteAuthorDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        author={selectedAuthor}
        onSuccess={() => {
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.reload();
          }
        }}
      />
    </>
  );
}