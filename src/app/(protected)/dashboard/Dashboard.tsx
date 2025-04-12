'use client';

import { getProductsWithRelationsByCategoryId } from '@/services/product.service';
import ProductCard from '@/ui/components/ProductCard';
import Section from '@/ui/components/Section';
import { Category, Product } from '@/utils/types';
import { useEffect, useState } from 'react';

interface Props {
  categories: Category[];
}

export default function Dashboard({ categories }: Props) {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    async function getData() {
      const { data } = await getProductsWithRelationsByCategoryId(categoryId);
      setProducts(data as unknown as Product[]);
    }
    getData();
  }, [categoryId]);

  return (
    <Section>
      <p>Select a category:</p>
      <ul className='flex gap-4'>
        {categories?.map(c => (
          <li
            className='category-button'
            key={c.category_id}
            onClick={() => setCategoryId(c.category_id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
      <div className='flex flex-wrap justify-center items-center'>
        {products?.map(p => (
          <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </Section>
  );
}
