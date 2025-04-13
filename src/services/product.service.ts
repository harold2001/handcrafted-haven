import supabase from '@/config/supabaseClient';

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
