'use client';

import { deleteProduct } from '@/services/product.service';
import useMessage from '@/utils/hooks/useMessage';
import { Product } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: Product;
  showDelete?: boolean;
}

export default function ProductCard({ product, showDelete = true }: Props) {
  const { warningToast, succesToast, errorToast } = useMessage();

  const handleDelete = () => {
    warningToast(`Do you want to delete ${product.name}?`, async () => {
      const { error } = await deleteProduct(product.product_id);

      if (!error) {
        succesToast(`Product ${product.name} deleted`);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        errorToast(`Error while deleting ${product.name}`);
      }
    });
  };

  return (
    <div className='h-auto w-[260px] border border-gray-300 overflow-hidden'>
      <Link href={`/products/${product.product_id}`} className='cursor-pointer'>
        <Image
          src={product.image_url}
          alt={product?.name}
          width={250}
          height={100}
          unoptimized
          className='h-[220px] w-[260px] object-cover'
        />
      </Link>
      <div className='flex justify-between p-1'>
        <div className='flex flex-col justify-around'>
          <span className='font-semibold'>{product.name}</span>
          <span className='text-sm'>${product.price}</span>
        </div>
        {!!showDelete && (
          <button className='cursor-pointer' onClick={handleDelete}>
            <Image
              src='/delete.svg'
              width={22}
              height={22}
              alt='Delete button'
            />
          </button>
        )}
      </div>
    </div>
  );
}
