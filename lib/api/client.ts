const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');
if (!API_KEY) throw new Error('NEXT_PUBLIC_API_KEY is not defined');

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    // Create Headers instance
    const headers = new Headers(options.headers);
    headers.set('x-api-key', API_KEY);

    // Add token from localStorage if available (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('[API Client] Adding Authorization header with token length:', token.length);
      } else {
        console.warn('[API Client] No token found in localStorage for endpoint:', endpoint);
      }
    }

    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'omit',
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Log 401 errors with more details
        if (response.status === 401) {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          console.error('[API Client] 401 Unauthorized:', {
            endpoint,
            url,
            hasToken: !!token,
            tokenLength: token?.length || 0,
            hasAuthHeader: headers.has('Authorization'),
            authHeaderValue: headers.get('Authorization')?.substring(0, 30) + '...',
            allHeaders: Object.fromEntries(headers.entries()),
          });
          
          // Clear token and redirect to login on 401
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            // Only redirect if we're not already on the login page
            if (!window.location.pathname.includes('/admin/login')) {
              window.location.href = '/admin/login';
            }
          }
        }
        
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        
        throw new ApiError(
          errorData?.message || `HTTP ${response.status}`,
          response.status,
          errorData
        );
      }

      // For 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Network error', 0, error);
    }
  }

  // GET request
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(endpoint, { 
      method: 'POST', 
      body,
      ...options 
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(endpoint, { 
      method: 'PATCH', 
      body,
      ...options 
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

export const api = new ApiClient();