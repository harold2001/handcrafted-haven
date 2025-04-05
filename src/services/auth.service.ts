import supabase from '@/config/supabaseClient';
import { AuthenticatedUser, LoginCredentials } from '@/utils/types';

export async function registerUser(formData: FormData) {
  const name = formData.get('name')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const role_id = formData.get('role_id')?.toString() || '';

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password, role_id }])
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthenticatedUser | null> {
  const { email, password } = credentials;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role_id: user.role_id,
  };
}
