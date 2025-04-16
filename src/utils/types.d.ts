export interface Product {
  name: string;
  price: number;
  description: string;
  category_id: number;
  image_url: string;
  categories: {
    category_id: number,
    name: string
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type SignInResult = {
  error?: string;
} | null;

export interface RegisterResponse {
  user?: User;
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    role_id?: string[];
  };
}

export interface Role {
  role_id: number;
  name: string;
}

export interface User {
  user_id: number;
  name: string;
  roles: Role;
  email: string;
  password: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string;
  user: User;
}
