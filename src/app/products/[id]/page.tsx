'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from 'supabaseClient';

export default function ProductPage() {
  const { id } = useParams();  // Obtiene el ID de la URL
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('product_id', id) 
          .single();  // Esto asegura que solo obtenemos un producto

        if (error) {
          console.error('Supabase error:', error.message);  // Muestra el error de Supabase
          setError(`Error fetching product: ${error.message}`);
        } else {
          if (!data) {
            setError('Product not found');
          } else {
            setProduct(data);
          }
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);  // Captura errores inesperados
        setError(`Unexpected error: ${err.message}`);
      }
    };

    fetchProduct();
  }, [id]);  // Ejecuta esta función cuando el ID cambie

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-80">
      <h1 className="text-3xl font-bold mb-6">Edit Product: {product.name}</h1>
      <form className="w-full max-w-md bg-[#EFF2F6] shadow-xl rounded-2xl p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter product name"
            defaultValue={product.name}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter product description"
            defaultValue={product.description}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-xl"
            defaultValue={product.category_id}
          >
            <option value="1">Handmade</option>
            <option value="2">Art</option>
            <option value="3">Jewelry</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-[#2980B9] text-white py-2 rounded-xl hover:bg-[#1F6690] transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
