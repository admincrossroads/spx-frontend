import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect dashboard routes (not login)
  const isDashboardRoute = pathname.startsWith('/admin') && 
                          !pathname.startsWith('/admin/login');
  
  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const token = request.cookies.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};