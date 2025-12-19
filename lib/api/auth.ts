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
   * Login user and set httpOnly cookie via backend
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    return api.post<LoginResponse>('/auth/login', data);
  }

  /**
   * Logout user and clear cookie
   */
  async logout(): Promise<{ message: string }> {
    return api.post('/auth/logout');
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