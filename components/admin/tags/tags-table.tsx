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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Edit,
  MoreVertical,
  Trash2,
  Check,
  X,
  Calendar,
  Hash
} from 'lucide-react';
import { DeleteTagDialog } from './delete-tag-dialog';
import { updateTag } from '@/lib/actions/tags';
import { formatDate } from '@/lib/utils/helpers';

interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface TagsTableProps {
  tags: Tag[];
  onSuccess?: () => void;
}

export function TagsTable({ tags, onSuccess }: TagsTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; slug: string }>({ name: '', slug: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  function startEditing(tag: Tag) {
    setEditingId(tag.id);
    setEditForm({ name: tag.name, slug: tag.slug });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({ name: '', slug: '' });
  }

  async function handleSave(id: number) {
    if (!editForm.name.trim() || !editForm.slug.trim()) {
      cancelEditing();
      return;
    }

    try {
      setIsSaving(true);
      await updateTag(id, {
        name: editForm.name,
        slug: editForm.slug,
      });
      setEditingId(null);
      // Call onSuccess instead of reload
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to update tag:', error);
      alert('Failed to update tag');
    } finally {
      setIsSaving(false);
    }
  }

  function handleSlugChange(value: string) {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setEditForm(prev => ({ ...prev, slug }));
  }

  if (tags.length === 0) {
    return (
      <div className="text-center py-12">
        <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold">No tags found</h3>
        <p className="text-muted-foreground mt-2">
          Get started by creating your first tag.
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
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">
                  {editingId === tag.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={isSaving}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {tag.name}
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === tag.id ? (
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={editForm.slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        disabled={isSaving}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Hash className="h-3 w-3" />
                      {tag.slug}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(tag.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {editingId === tag.id ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={cancelEditing}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSave(tag.id)}
                        disabled={isSaving}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditing(tag)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => startEditing(tag)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedTag(tag);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteTagDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        tag={selectedTag}
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

function TagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}