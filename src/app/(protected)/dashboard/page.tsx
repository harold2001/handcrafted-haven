import { getCategories } from '@/services/categories.service';
import Dashboard from './Dashboard';
import { Category } from '@/utils/types';

export default async function page() {
  const { data: categories } = await getCategories();

  return <Dashboard categories={categories as Category[]} />;
}
