'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Bell, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authApi, User as AuthUser } from '@/lib/api/auth';
import SPXLoader from '@/components/ui/loader';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await authApi.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const displayName = user?.name || 'Admin';
  const displayRole = user?.role || 'ADMIN';

  if (isLoggingOut) {
    return <SPXLoader />;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="outline" size="icon" className="md:hidden flex-shrink-0" onClick={onMenuClick}>
        <Menu className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 items-center gap-4 min-w-0">
        
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.location.href = '/admin/settings/users';
              }}
            >Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={async () => {
                try {
                  setIsLoggingOut(true);
                  await authApi.logout();
                  // Clear localStorage, then redirect
                  localStorage.removeItem('token');
                  window.location.href = '/admin/login';
                } catch (error) {
                  console.error('Logout failed:', error);
                  // Even if logout API fails, clear local state and redirect
                  localStorage.removeItem('token');
                  window.location.href = '/admin/login';
                }
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}