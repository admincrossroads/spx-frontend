import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'token';

/**
 * Check if user has an auth cookie
 * Simple check - doesn't validate with backend
 */
export async function hasAuthCookie(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return !!token;
  } catch (error) {
    console.error('Error checking auth cookie:', error);
    return false;
  }
}

/**
 * Redirect authenticated users away from login page
 * Use in /app/admin/login/page.tsx
 */
export async function redirectIfAuthenticated() {
  const hasToken = await hasAuthCookie();
  
  if (hasToken) {
    redirect('/admin');
  }
}

/**
 * Redirect unauthenticated users to login
 * Use in /app/admin/layout.tsx and other protected pages
 */
export async function requireAuth() {
  const hasToken = await hasAuthCookie();
  
  if (!hasToken) {
    redirect('/admin/login');
  }
}

/**
 * Clear auth cookie
 * Use for logout
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the auth token (if needed)
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}