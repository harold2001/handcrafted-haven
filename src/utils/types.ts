export interface Product {
  name: string;
  price: number;
  description: string;
  category_id: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role_id: number;
}
