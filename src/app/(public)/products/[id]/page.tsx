import { getProductById } from '@/services/product.service';
import ProductDetail from './ProductDetail';
import { Product } from '@/utils/types';
import { auth } from '@/config/auth';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product } = await getProductById(Number(id));
  const session = await auth();

  return (
    <ProductDetail product={product as unknown as Product} session={session} />
  );
}
