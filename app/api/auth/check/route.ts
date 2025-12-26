import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: NextRequest) {
  // #region agent log
  const fs = await import('fs/promises');
  const logPath = '.cursor/debug.log';
  const logEntry = JSON.stringify({location:'api/auth/check/route.ts:7',message:'Auth check API entry',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
  await fs.appendFile(logPath, logEntry).catch(()=>{});
  // #endregion
  try {
    // Get token from Authorization header (localStorage flow)
    const authHeader = request.headers.get('Authorization');
    // #region agent log
    const logEntry2 = JSON.stringify({location:'api/auth/check/route.ts:12',message:'Authorization header check',data:{hasAuthHeader:!!authHeader,authHeaderPrefix:authHeader?.substring(0,20)||'none'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
    await fs.appendFile(logPath, logEntry2).catch(()=>{});
    // #endregion
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    // #region agent log
    const logEntry3 = JSON.stringify({location:'api/auth/check/route.ts:16',message:'Token extracted from Authorization header',data:{tokenLength:token?.length || 0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
    await fs.appendFile(logPath, logEntry3).catch(()=>{});
    // #endregion

    if (!token) {
      // #region agent log
      const logEntry5 = JSON.stringify({location:'api/auth/check/route.ts:25',message:'No token found, returning false',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
      await fs.appendFile(logPath, logEntry5).catch(()=>{});
      // #endregion
      return NextResponse.json({ authenticated: false });
    }

    if (!API_URL || !API_KEY) {
      // #region agent log
      const logEntry6 = JSON.stringify({location:'api/auth/check/route.ts:31',message:'Missing API environment variables',data:{hasApiUrl:!!API_URL,hasApiKey:!!API_KEY},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
      await fs.appendFile(logPath, logEntry6).catch(()=>{});
      // #endregion
      console.error('Missing API environment variables');
      return NextResponse.json({ authenticated: false });
    }

    // Quick check with backend
    // #region agent log
    const logEntry7 = JSON.stringify({location:'api/auth/check/route.ts:36',message:'Before backend API call',data:{apiUrl:API_URL?.substring(0,50)||'none'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
    await fs.appendFile(logPath, logEntry7).catch(()=>{});
    // #endregion
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'HEAD',
      headers: {
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    // #region agent log
    const logEntry8 = JSON.stringify({location:'api/auth/check/route.ts:46',message:'Backend API response received',data:{status:response.status,statusText:response.statusText,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n';
    await fs.appendFile(logPath, logEntry8).catch(()=>{});
    // #endregion

    return NextResponse.json({
      authenticated: response.ok
    });
  } catch (error: any) {
    // #region agent log
    const fs = await import('fs/promises');
    const logPath = '.cursor/debug.log';
    const logEntry9 = JSON.stringify({location:'api/auth/check/route.ts:53',message:'Auth check API error caught',data:{errorMessage:error?.message,errorName:error?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n';
    await fs.appendFile(logPath, logEntry9).catch(()=>{});
    // #endregion
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
