'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/admin/ui/sidebar';
import { Topbar } from '@/components/admin/ui/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div className="flex-1 min-w-0">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6 pt-24 md:pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}