'use client';

import { createProduct } from '@/services/product.service';
import CenteredSection from '@/ui/components/CenteredSection';
import useMessage from '@/utils/hooks/useMessage';
import { Category } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface Props {
  categories: Category[];
}

export default function CreateProduct({ categories }: Props) {
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
      const response = await createProduct(formData);

      if (response?.error || response?.errors) {
        setErrors(response?.errors ?? null);
        errorToast(response?.error || 'Error creating a product');
      } else {
        succesToast('Product created!');
        window.location.href = '/dashboard';
      }
    } catch (e) {
      console.log(e);
      errorToast('Error creating a product');
    }
  };

  return (
    <CenteredSection gap='gap-2'>
      <h1 className='title'>Create a New Product</h1>
      <form className='card-container' onSubmit={handleSubmit}>
        <label className='form-label'>
          Product Name
          <input
            type='text'
            name='name'
            className='form-input'
            placeholder='Enter product name'
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
          <select className='form-input' name='category_id' required>
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
          Create Product
        </button>
      </form>
    </CenteredSection>
  );
}
