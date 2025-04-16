import { getProducts } from '@/services/product.service';
import Shop from './Shop';
import { Category, Product } from '@/utils/types';
import { getCategories } from '@/services/categories.service';

export default async function page() {
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();
  return (
    <Shop
      initialProducts={products as unknown as Product[]}
      categories={categories as unknown as Category[]}
    />
  );
}
