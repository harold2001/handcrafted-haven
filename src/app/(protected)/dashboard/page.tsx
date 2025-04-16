import { getCategories } from '@/services/categories.service';
import Dashboard from './Dashboard';
import { Category } from '@/utils/types';
import { auth } from '@/config/auth';

export default async function page() {
  const { data: categories } = await getCategories();
  categories?.unshift({category_id: null, name: 'All'})
  const session = await auth();

  return (
    <Dashboard categories={categories as Category[]} user={session?.user} />
  );
}
