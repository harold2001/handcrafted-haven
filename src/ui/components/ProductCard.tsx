import { Product } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.product_id}`}
      className='h-auto w-[200px] border border-gray-300 rounded-sm cursor-pointer overflow-hidden'
    >
      <Image
        src={product.image_url}
        alt={product?.name}
        width={250}
        height={100}
        unoptimized
        className='h-[160px] w-[200px] object-cover'
      />
      <div className='flex flex-col justify-around p-1'>
        <span className='font-semibold'>{product.name}</span>
        <span className='text-sm'>${product.price}</span>
      </div>
    </Link>
  );
}
