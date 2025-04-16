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

export const createProductSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.preprocess((val) => Number(val), z.number()),
  image_url: z.string().optional().nullable(),
  category_id: z.preprocess((val) => Number(val), z.number()),
  user_id: z.preprocess((val) => Number(val), z.number()),
});

export const updateProductSchema = z.object({
  product_id: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: 'Product id is required' })
  ),
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.preprocess((val) => Number(val), z.number()),
  image_url: z.string().optional().nullable(),
  category_id: z.preprocess((val) => Number(val), z.number()),
});
