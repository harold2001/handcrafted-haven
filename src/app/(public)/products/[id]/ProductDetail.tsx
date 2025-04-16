'use client';

import { Product } from '@/utils/types';
import Image from 'next/image';
import CenteredSection from '@/ui/components/CenteredSection';
import { Session } from 'next-auth';
import Link from 'next/link';

interface Props {
  product: Product;
  session: Session | null;
}
export default function ProductDetail({ product, session }: Props) {
  return (
    <CenteredSection className='flex-row relative'>
      {!!session?.user && (
        <Link
          href={`/products/${product.product_id}/edit`}
          className='btn-primary absolute top-[20px] right-0'
        >
          Edit this product
        </Link>
      )}
      <div className='relative w-full h-[550px] rounded-2xl overflow-hidden shadow-md'>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          unoptimized
          className='object-cover'
        />
      </div>

      <div className='w-full md:w-1/2 flex flex-col justify-center h-[550px]'>
        <div>
          <h1 className='title font-semibold text-gray-800'>{product.name}</h1>
          <p className='text-gray-600 mb-4 leading-relaxed text-md'>
            {product.description}
          </p>
          <p className='text-2xl font-semibold text-[#2980B9] mb-6'>
            ${product.price}
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <button className='btn-primary'>Add to Cart</button>
          <button className='btn-success'>Buy Now</button>
        </div>
      </div>
    </CenteredSection>
  );
}
