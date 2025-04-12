export interface Product {
  name: string;
  price: number;
  description: string;
  category_id: number;
  image_url: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role_id: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role_id: number;
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
  role: Role;
  email: string;
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
  user: User;
}
