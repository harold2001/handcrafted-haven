'use server';

import { signIn } from '@/config/auth';
import { registerUser } from '@/services/auth.service';

export async function loginAction(formData: FormData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(formData: FormData) {
  try {
    const response = await registerUser(formData);
    return response;
  } catch (error) {
    throw error;
  }
}
