import { api } from './client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export class AuthApi {
  /**
   * Login user and store token in localStorage
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    // Store token in localStorage
    if (response.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.token);
    }
    return response;
  }

  /**
   * Logout user and clear localStorage token
   */
  async logout(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/logout');
    // Clear token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    return response;
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<{ user: User }> {
    return api.get<{ user: User }>('/auth/me');
  }

  /**
   * Validate if the current session is valid
   */
  async validateSession(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }
}

export const authApi = new AuthApi();