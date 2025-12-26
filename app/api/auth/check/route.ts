import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Try to get token from Authorization header first (localStorage flow)
    const authHeader = request.headers.get('Authorization');
    let token: string | undefined;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Fallback to cookie for backward compatibility
      token = request.cookies.get('token')?.value;
    }

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    if (!API_URL || !API_KEY) {
      console.error('Missing API environment variables');
      return NextResponse.json({ authenticated: false });
    }

    // Quick check with backend
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'HEAD',
      headers: {
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${token}`,
        'Cookie': `token=${token}`, // Include cookie as fallback
      },
      cache: 'no-store',
    });

    return NextResponse.json({
      authenticated: response.ok
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
