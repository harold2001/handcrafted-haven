import { Category, Product } from '@/utils/types';
import EditProduct from './EditProduct';
import { getProductById } from '@/services/product.service';
import { getCategories } from '@/services/categories.service';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product } = await getProductById(Number(id));
  const { data: categories } = await getCategories();

  return (
    <EditProduct
      product={product as unknown as Product}
      categories={categories as Category[]}
    />
  );
}
