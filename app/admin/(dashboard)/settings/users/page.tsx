'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Edit, Trash2, UserPlus, Power, PowerOff, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api/client';
import Link from 'next/link';
import { User } from '@/types/user';

const LIMIT = 10; // Always 10 users per page

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Initialize from URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const searchParam = params.get('search');
      
      if (pageParam) {
        const page = parseInt(pageParam, 10);
        if (page > 0) setCurrentPage(page);
      }
      if (searchParam) setSearch(searchParam);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', LIMIT.toString());
      if (search) {
        params.set('search', search);
      }
      
      const response = await api.get<{
        users: User[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>(`/admin/users?${params.toString()}`);
      
      const actualResponse = (response as any).data || response;
      const apiTotal = actualResponse.pagination?.total || 0;
      const returnedUsers = actualResponse.users || actualResponse;
      
      const calculatedTotalPages = apiTotal > 0 ? Math.ceil(apiTotal / LIMIT) : 0;
      
      setTotal(apiTotal);
      setTotalPages(calculatedTotalPages);
      setUsers(Array.isArray(returnedUsers) ? returnedUsers : []);
      
      if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
        setCurrentPage(calculatedTotalPages);
        return;
      }
      
      if (typeof window !== 'undefined') {
        const newParams = new URLSearchParams();
        newParams.set('page', currentPage.toString());
        if (search) {
          newParams.set('search', search);
        }
        router.push(`/admin/settings/users?${newParams.toString()}`, { scroll: false });
      }
    } catch (error: any) {
      console.error('Failed to load users:', error);
      if (error?.status === 401) {
        alert('Session expired. Please login again.');
        router.push('/admin/login');
      } else {
        alert(`Failed to load users: ${error?.message || 'Unknown error'}`);
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, router]);

  useEffect(() => {
    loadUsers();
  }, [currentPage, loadUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== '') {
        setCurrentPage(1);
      }
      loadUsers();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search, loadUsers]);

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/users/${userId}`, { isActive: !currentStatus });
      loadUsers();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      await api.delete(`/admin/users/${userId}`);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'EDITOR': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'VIEWER': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage admin users and permissions</p>
          </div>
        </div>
        <Link href="/admin/settings/users/new">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                    loadUsers();
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            {total} user{total !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {search ? 'No users found matching your search' : 'No users found. Create your first user.'}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)} variant="secondary">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(user.id, user.isActive)}
                              title={user.isActive ? 'Deactivate user' : 'Activate user'}
                              className={user.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'}
                            >
                              {user.isActive ? (
                                <Power className="h-4 w-4" />
                              ) : (
                                <PowerOff className="h-4 w-4" />
                              )}
                            </Button>
                            <Link href={`/admin/settings/users/${user.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              className="text-destructive hover:text-destructive"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {!loading && totalPages > 0 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * LIMIT + 1} to{' '}
                    {Math.min(currentPage * LIMIT, total)} of {total} users
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => {
                                setCurrentPage(pageNum);
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
                        onClick={() => {
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                        disabled={currentPage >= totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}