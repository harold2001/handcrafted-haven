import supabase from '@/config/supabaseClient';
import { loginUserSchema, registerUserSchema } from '@/lib/schemas';
import { LoginCredentials, RegisterResponse, Role } from '@/utils/types';
import bcrypt from 'bcryptjs';
import { User } from 'next-auth';

export async function registerUser(
  formData: FormData
): Promise<RegisterResponse> {
  const rawData = {
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    role_id: formData.get('role_id')?.toString(),
  };
  const parseResult = registerUserSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const data = parseResult.data;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const { data: users, error: dbError } = await supabase
    .from('users')
    .insert([
      {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role_id: data.role_id,
      },
    ])
    .select('*');

  if (dbError) {
    throw new Error(dbError.message);
  }

  if (!users || users.length === 0) {
    throw new Error('No se pudo crear el usuario');
  }

  return { user: users[0] };
}

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  try {
    const validatedCredentials = loginUserSchema.parse(credentials);
    const { email, password } = validatedCredentials;

    const { data, error } = await supabase
      .from('users')
      .select(
        `
        user_id,
        name,
        roles!inner (
          role_id,
          name
        ),
        email,
        password
        `
      )
      .eq('email', email)
      .single();

    const user = data;

    if (error || !user) {
      throw new Error('Error while login');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Error while login');
    }

    return {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.roles as unknown as Role,
    };
  } catch (e) {
    console.log(e);
    throw new Error('Error while login');
  }
}
