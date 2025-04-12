import { Product } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  console.log(product);
  return (
    <div className='h-[150px] w-[250px] border border-gray-400 rounded-md'>
      <Image
        src={product.image_url}
        alt={product?.name}
        width={250}
        height={100}
        unoptimized
      />
      <span>{product?.name}</span>
    </div>
  );
}
