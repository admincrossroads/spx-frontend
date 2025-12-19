import { api } from './client';

export interface Author {
  id: number;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAuthorRequest {
  name: string;
  bio?: string;
  imageUrl?: string;
}

export interface UpdateAuthorRequest {
  name?: string;
  bio?: string | null;
  imageUrl?: string | null;
}

export class AuthorsApi {
  async getAll(): Promise<Author[]> {
    return api.get<Author[]>('/admin/authors');
  }

  async getById(id: number): Promise<Author> {
    return api.get<Author>(`/admin/authors/${id}`);
  }

  async create(data: CreateAuthorRequest): Promise<Author> {
    return api.post<Author>('/admin/authors', data);
  }

  async update(id: number, data: UpdateAuthorRequest): Promise<Author> {
    return api.patch<Author>(`/admin/authors/${id}`, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`/admin/authors/${id}`);
  }
}

export const authorsApi = new AuthorsApi();