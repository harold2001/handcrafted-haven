import { getCategories } from '@/services/categories.service';
import CreateProduct from './CreateProduct';
import { Category } from '@/utils/types';

export default async function page() {
  const { data: categories } = await getCategories();
  return <CreateProduct categories={categories as Category[]} />;
}
