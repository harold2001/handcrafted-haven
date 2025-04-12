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
      <h2 className='text-xl mb-3'>Your products</h2>
      <p className='text-sm mb-1'>Select a category:</p>
      <ul className='flex  flex-wrap gap-4 mb-1'>
        {categories?.map(c => (
          <li
            className={`category-button ${
              categoryId === c.category_id ? 'bg-primary text-text' : ''
            }`}
            key={c.category_id}
            onClick={() => setCategoryId(c.category_id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
      <div className='flex flex-wrap justify-center items-center gap-6 py-4'>
        {products?.map(p => (
          <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </Section>
  );
}
