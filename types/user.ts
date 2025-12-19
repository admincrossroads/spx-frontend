import * as z from 'zod';

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Create user schema - use .strict() for exact validation
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required').max(100),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']),
  isActive: z.boolean().default(true),
}).strict();

// Update user schema - make all fields optional
export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(1, 'Name is required').max(100).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']).optional(),
  isActive: z.boolean().optional(),
}).strict();

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;