import { Sidebar } from '@/components/admin/ui/sidebar';
import { Topbar } from '@/components/admin/ui/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}