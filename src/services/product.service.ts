import supabase from '@/config/supabaseClient';
import { createProductSchema, updateProductSchema } from '@/lib/schemas';

export async function getProducts(
  categoryId?: number | null
) {
  const query = `
      product_id,
      name,
      description,
      price,
      image_url,
      categories!inner (
        category_id,
        name
      )
    `;
  const data = categoryId
    ? await supabase
        .from('products')
        .select(query)
        .eq('category_id', categoryId)
    : await supabase
        .from('products')
        .select(query)
        .limit(20);

  return data;
}

export async function getProductsByCategoryAndUserId(
  userId: string | undefined,
  categoryId?: number | null
) {
  const query = `
      product_id,
      name,
      description,
      price,
      image_url,
      categories!inner (
        category_id,
        name
      ),
      users!inner (
        user_id,
        name
      )
    `;
  const data = categoryId
    ? await supabase
        .from('products')
        .select(query)
        .eq('category_id', categoryId)
        .eq('user_id', Number(userId))
    : await supabase
        .from('products')
        .select(query)
        .eq('user_id', Number(userId))
        .limit(20);

  return data;
}


export async function getProductsByCategoriesIds(
  categoryIds: number[] | []
) {
  const query = `
      product_id,
      name,
      description,
      price,
      image_url,
      categories!inner (
        category_id,
        name
      )
    `;

  const data = categoryIds && categoryIds.length > 0
    ? await supabase
        .from('products')
        .select(query)
        .in('category_id', categoryIds)
    : await supabase
        .from('products')
        .select(query)
        .limit(20);

  return data;
}


export async function getProductById(product_id: number) {
  const query = `
      product_id,
      name,
      description,
      price,
      image_url,
      categories!inner (
        category_id,
        name
      ),
      users!inner (
        user_id,
        name
      )
    `;
  const { data, error } = await supabase
    .from('products')
    .select(query)
    .eq('product_id', product_id)
    .single();

  if (error) {
    return { errors: error.message };
  }
  return { product: data };
}

export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get('name')?.toString(),
    description: formData.get('description')?.toString(),
    price: formData.get('price')?.toString(),
    image_url: formData.get('image_url')?.toString() || null,
    category_id: formData.get('category_id')?.toString(),
    user_id: formData.get('user_id')?.toString(),
  };

  const parseResult = createProductSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }
  const productData = parseResult.data;

  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select('*');

  if (error) {
    return { error: error.message };
  }

  return { product: data && data[0] };
}

export async function updateProduct(formData: FormData) {
  const rawData = {
    product_id: formData.get('product_id')?.toString(),
    name: formData.get('name')?.toString(),
    description: formData.get('description')?.toString(),
    price: formData.get('price')?.toString(),
    image_url: formData.get('image_url')?.toString(),
    category_id: formData.get('category_id')?.toString(),
  };

  const parseResult = updateProductSchema.safeParse(rawData);
  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { product_id, ...updatedFields } = parseResult.data;
  const { data, error } = await supabase
    .from('products')
    .update(updatedFields)
    .eq('product_id', product_id);

  if (error) {
    return { error: error.message };
  }
  return { product: data };
}

export async function deleteProduct(product_id: number) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('product_id', product_id);

  if (error) {
    return { error: error.message };
  }
  return { product: data };
}
