import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().nonempty('Name requerido'),
  email: z.string().nonempty('Email is required').email('Invalid email'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'The password must be at least 6 characters long.'),
  role_id: z.preprocess(val => Number(val), z.number().int()),
});

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'The password must be at least 6 characters long.'),
});
