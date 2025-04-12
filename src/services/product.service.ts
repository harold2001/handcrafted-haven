import supabase from '@/config/supabaseClient';

export async function getProductsWithRelationsByCategoryId(
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
    : await supabase.from('products').select(query).limit(20);

  return data;
}
