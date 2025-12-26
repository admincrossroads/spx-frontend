'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Users,
  Tag,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../../../lib/utils/helpers';
import { authApi } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/insights', label: 'Insights', icon: FileText },
  { href: '/admin/authors', label: 'Authors', icon: Users },
  { href: '/admin/tags', label: 'Tags', icon: Tag },
  { href: '/admin/settings/users', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await authApi.logout();
      // Clear localStorage
      localStorage.removeItem('token');
      // Force hard redirect to ensure clean state
      window.location.href = '/admin/login';
    } catch (error: any) {
      console.error('Logout failed:', error);
      // Even if logout API fails, clear local state and redirect
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r bg-background md:block">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logos/SPX.png"
              alt="SPX Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
              unoptimized
              priority
            />
            <span className="text-xl font-bold">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}