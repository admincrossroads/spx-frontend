import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // This proxy is not being used as middleware
  // Auth is handled client-side via localStorage
  // Since middleware runs server-side and can't access localStorage,
  // we let client-side components handle authentication redirects
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};