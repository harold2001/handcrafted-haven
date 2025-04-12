import supabase from '@/config/supabaseClient';

export async function getCategories() {
  const data = await supabase.from('categories').select('category_id, name');
  return data;
}
