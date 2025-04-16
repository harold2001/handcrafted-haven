'use client';

import { updateProduct } from '@/services/product.service';
import CenteredSection from '@/ui/components/CenteredSection';
import useMessage from '@/utils/hooks/useMessage';
import { Category, Product } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  product: Product;
  categories: Category[];
}

export default function EditProduct({ product, categories }: Props) {
  const { data: session } = useSession();
  const { succesToast, errorToast } = useMessage();
  const [errors, setErrors] = useState<{
    category_id?: string[];
    description?: string[];
    name?: string[];
    price?: string[];
    image_url?: string[];
  } | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!session?.user?.id) {
        return errorToast('We need a user logged in to create a product');
      }

      const formData = new FormData(event.currentTarget);
      formData.append('user_id', session?.user?.id);
      formData.append('product_id', `${product.product_id}`);
      const response = await updateProduct(formData);

      if (response?.error || response?.errors) {
        setErrors(response?.errors ?? null);
        console.log(response.errors);
        errorToast(response?.error || 'Error updating this product');
      } else {
        succesToast('Product updated!');
      }
    } catch (e) {
      console.log(e);
      errorToast('Error updating this product');
    }
  };

  return (
    <CenteredSection gap='gap-2' className='relative'>
      <Link
        href={`/products/${product.product_id}`}
        className='btn-primary absolute top-[20px] left-0'
      >
        Return to product
      </Link>
      <h1 className='title'>Edit product</h1>
      <form className='card-container' onSubmit={handleSubmit}>
        <label className='form-label'>
          Product Name
          <input
            type='text'
            name='name'
            className='form-input'
            placeholder='Enter product name'
            defaultValue={product.name}
            required
          />
          {errors?.name?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Description
          <textarea
            className='form-input'
            placeholder='Enter product description'
            name='description'
            defaultValue={product.description}
            required
          ></textarea>
          {errors?.description?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Price
          <input
            type='number'
            name='price'
            className='form-input'
            placeholder='Enter price'
            defaultValue={product.price}
            required
          />
          {errors?.price?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Image URL
          <input
            type='url'
            name='image_url'
            className='form-input'
            placeholder='https://example.com/image.png'
            defaultValue={product.image_url}
            required
          />
          {errors?.name?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Category
          <select
            className='form-input'
            name='category_id'
            defaultValue={product.categories.category_id}
            required
          >
            <option value={undefined}>Select a category</option>
            {categories?.map(c => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors?.category_id?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <button type='submit' className='form-submit-btn'>
          Update Product
        </button>
      </form>
    </CenteredSection>
  );
}
