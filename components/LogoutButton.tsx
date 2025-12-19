'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/app/admin/login/actions';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}