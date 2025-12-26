'use client';

import { useState } from 'react';
import { authApi } from '@/lib/api/auth';

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    try {
      setIsPending(true);
      await authApi.logout();
      // Clear localStorage and cookies
      localStorage.removeItem('token');
      document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
      // Force hard redirect to ensure clean state
      window.location.href = '/admin/login';
    } catch (error: any) {
      console.error('Logout failed:', error);
      // Even if logout API fails, clear local state and redirect
      localStorage.removeItem('token');
      document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
      window.location.href = '/admin/login';
    } finally {
      setIsPending(false);
    }
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