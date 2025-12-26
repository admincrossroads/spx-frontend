'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if already authenticated by checking localStorage
    async function checkAuth() {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:45',message:'checkAuth entry',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      try {
        // #region agent log
        const hasLocalStorage = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
        fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:48',message:'localStorage availability check',data:{hasLocalStorage,windowDefined:typeof window !== 'undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        const token = localStorage.getItem('token');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:50',message:'Token retrieved from localStorage',data:{tokenExists:!!token,tokenLength:token?.length || 0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        if (token) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:52',message:'Before auth check API call',data:{hasToken:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          // Verify token is still valid
          const response = await fetch('/api/auth/check', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:58',message:'Auth check API response received',data:{status:response.status,statusText:response.statusText,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          const data = await response.json();
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:60',message:'Auth check response parsed',data:{authenticated:data.authenticated,hasData:!!data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          
          if (data.authenticated) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:62',message:'About to call router.replace',data:{authenticated:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            router.replace('/admin');
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:64',message:'router.replace called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            return;
          } else {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:66',message:'Token invalid, clearing localStorage',data:{authenticated:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
            // Token is invalid, clear it
            localStorage.removeItem('token');
          }
        } else {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:70',message:'No token found in localStorage',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
        }
      } catch (error: any) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:72',message:'Auth check error caught',data:{errorMessage:error?.message,errorName:error?.name,errorStack:error?.stack?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0e73c4c4-a4df-4393-a81c-190a7eb59970',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'login/page.tsx:76',message:'checkAuth finally block',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, [router]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginForm) {
    try {
      setIsLoading(true);
      setError('');

      // Clear any stale localStorage before login
      localStorage.removeItem('token');

      // Log login attempt (without password)
      console.log('Login attempt for:', values.email);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        credentials: 'omit',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        console.error('Login failed:', {
          status: response.status,
          error: errorData,
        });
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', { user: data.user?.email });

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Success - redirect to admin
      window.location.href = '/admin';
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            SPX Admin Panel
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="admin@spxinsights.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
    <>
      <LoadingSpinner size="sm" className="mr-2" />
      Signing in...
    </>
  ) : (
    'Sign In'
  )}
              </Button>

              <Link
                href="/"
                className="block w-full text-center text-sm text-muted-foreground hover:text-foreground underline mt-4"
              >
                Back to Website
              </Link>
            
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}