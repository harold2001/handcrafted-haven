'use client';

import { Product } from '@/utils/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from 'supabaseClient';
import Image from 'next/image';
import CenteredSection from '@/ui/components/CenteredSection';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error) {
        setError('Error fetching product');
        console.error(error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <CenteredSection>
    <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl bg-[#EFF2F6] p-10 rounded-2xl shadow-2xl min-h-[600px]">
      
      {/* Imagen */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
  
      {/* Detalles del producto */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        {/* Detalles del producto arriba */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mb-4 leading-relaxed text-lg">{product.description}</p>
          <p className="text-3xl font-semibold text-[#2980B9] mb-6">${product.price}</p>
        </div>
  
        {/* Botones debajo de los detalles */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <button className="w-full bg-[#2980B9] text-white py-3 rounded-2xl font-medium text-lg hover:bg-[#1F6690] transition duration-300 shadow">
            Add to Cart
          </button>
          <button className="w-full bg-green-600 text-white py-3 rounded-2xl font-medium text-lg hover:bg-green-700 transition duration-300 shadow">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </CenteredSection>
  

  
  );
}
