export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
}

export interface UpdateTagRequest {
  name?: string;
  slug?: string;
}

// We'll keep this for type definitions, but use server actions