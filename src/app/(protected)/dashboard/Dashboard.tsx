'use client';

import { getProductsByCategoryAndUserId } from '@/services/product.service';
import ProductCard from '@/ui/components/ProductCard';
import Section from '@/ui/components/Section';
import { Category, Product } from '@/utils/types';
import { User } from 'next-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  categories: Category[];
  user: User | undefined;
}

export default function Dashboard({ categories, user }: Props) {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    async function getData() {
      const { data } = await getProductsByCategoryAndUserId(
        user?.id,
        categoryId
      );
      setProducts(data as unknown as Product[]);
    }
    getData();
  }, [categoryId, user?.id]);

  return (
    <Section>
      <div className='flex justify-between'>
        <h1 className='title'>Your products</h1>
        <Link href='/products/create' className='btn-primary'>
          Create product
        </Link>
      </div>
      {products?.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className='flex flex-col gap-5 justify-center items-center'>
          <p>There are no products in your list.</p>
        </div>
      )}
    </Section>
  );
}
