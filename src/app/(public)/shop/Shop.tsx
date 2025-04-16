'use client';

import { getProductsByCategoriesIds } from '@/services/product.service';
import ProductCard from '@/ui/components/ProductCard';
import Section from '@/ui/components/Section';
import { Category, Product } from '@/utils/types';
import { useEffect, useState } from 'react';

interface Props {
  initialProducts: Product[];
  categories: Category[];
}

export default function Shop({ initialProducts, categories }: Props) {
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[] | []>(initialProducts);

  const handleCheckboxChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setCategoriesSelected(prev => [...prev, categoryId]);
    } else {
      setCategoriesSelected(prev => prev.filter(id => id !== categoryId));
    }
  };

  const clearFilters = () => setCategoriesSelected([]);

  useEffect(() => {
    async function getData() {
      const { data } = await getProductsByCategoriesIds(categoriesSelected);
      setProducts(data as Product[] | []);
    }
    getData();
  }, [categoriesSelected, setProducts]);

  return (
    <Section className='flex flex-row gap-8 items-start'>
      <div className='w-[20%] flex flex-col gap-2 pe-2'>
        <h1 className='title'>Shop</h1>
        <div className='flex items-center justify-between'>
          <h2 className=''>Filters</h2>
          <button
            onClick={clearFilters}
            className='cursor-pointer text-sm text-gray-400 underline'
          >
            Clear filters
          </button>
        </div>
        <div className='flex flex-col gap-2'>
          {categories?.map(c => (
            <label key={c.category_id} className='cursor-pointer'>
              <input
                type='checkbox'
                checked={categoriesSelected.includes(c.category_id)}
                onChange={e =>
                  handleCheckboxChange(c.category_id, e.target.checked)
                }
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div className='w-[80%] flex flex-wrap gap-6 py-4'>
        {products?.map(p => (
          <ProductCard key={p.product_id} product={p} showDelete={false} />
        ))}
      </div>
    </Section>
  );
}
