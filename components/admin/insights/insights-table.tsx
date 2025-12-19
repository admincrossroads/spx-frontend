'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
  Eye,
  EyeOff,
  Calendar,
  User,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DeleteInsightDialog } from './delete-insight-dialog';
import { PublishToggle } from './publish-toggle';
import { formatDate } from '@/lib/utils/helpers';

interface Insight {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  isPublished: boolean;
  publishedAt: string | null;
  author: {
    name: string;
  };
  tags: Array<{
    name: string;
  }>;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface InsightsTableProps {
  insights: Insight[];
  pagination: Pagination;
}

export function InsightsTable({ insights, pagination }: InsightsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const typeColors: Record<string, string> = {
    report: 'bg-blue-500',
    publication: 'bg-green-500',
    'policy-brief': 'bg-purple-500',
    blog: 'bg-orange-500',
  };

  if (insights.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold">No insights found</h3>
        <p className="text-muted-foreground mt-2">
          Get started by creating your first insight.
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
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insights.map((insight) => (
              <TableRow key={insight.id}>
                <TableCell>
                  <div>
                    <Link
                      href={`/admin/insights/${insight.publicId}`}
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {insight.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {insight.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {insight.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                      {insight.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{insight.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{insight.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${typeColors[insight.type] || 'bg-gray-500'} capitalize`}
                  >
                    {insight.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <PublishToggle
                    insight={insight}
                    onToggle={() => window.location.reload()}
                  />
                </TableCell>
                <TableCell>
                  {insight.publishedAt ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formatDate(insight.publishedAt)}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not published</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(insight.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {insight.isPublished && (
                      <Button
                        size="icon"
                        variant="ghost"
                        asChild
                        title="View on site"
                      >
                        <Link href={`/insights/${insight.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
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
                          <Link href={`/admin/insights/${insight.publicId}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedInsight(insight);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} insights
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set('page', (pagination.page - 1).toString());
                window.location.href = `/admin/insights?${params.toString()}`;
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => {
                      const params = new URLSearchParams(window.location.search);
                      params.set('page', pageNum.toString());
                      window.location.href = `/admin/insights?${params.toString()}`;
                    }}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set('page', (pagination.page + 1).toString());
                window.location.href = `/admin/insights?${params.toString()}`;
              }}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <DeleteInsightDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        insight={selectedInsight}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}