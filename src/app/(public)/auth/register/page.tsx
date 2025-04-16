'use client';

import CenteredSection from '@/ui/components/CenteredSection';
import { registerUser } from '@/services/auth.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    name?: string[];
    role_id?: string[];
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await registerUser(formData);

      if (response.errors) {
        setErrors(response.errors);
        toast('Check the data entered in the form', {
          type: 'error',
          autoClose: 3000,
          theme: 'dark',
          closeButton: true,
        });
      } else {
        setErrors(null);
        toast('Succes! You need to login.', {
          type: 'success',
          autoClose: 3000,
          theme: 'dark',
          closeButton: true,
        });
        router.push('/auth/login');
      }
    } catch (e) {
      console.log(e);
      toast('Unexpected error. Please try again.', {
        type: 'error',
        autoClose: 3000,
        theme: 'dark',
        closeButton: true,
      });
    }
  };

  return (
    <CenteredSection>
      <form className='card-container' onSubmit={handleSubmit}>
        <label className='form-label'>
          Name
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Ej. John Doe'
            className='form-input'
          />
          {errors?.name?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Email
          <input
            id='email'
            name='email'
            type='email'
            placeholder='E.g. jhondoe@example.com'
            className='form-input'
          />
          {errors?.email?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          Password
          <input
            id='password'
            name='password'
            type='password'
            className='form-input'
          />
          {errors?.password?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <label className='form-label'>
          What do you want to do in Handcrafted Haven?
          <select
            className='form-select'
            name='role_id'
            defaultValue={undefined}
          >
            <option value={undefined} disabled>
              Select one
            </option>
            <option value={2}>Buy</option>
            <option value={3}>Sell</option>
          </select>
          {errors?.role_id?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>

        <button type='submit' className='form-submit-btn'>
          Sign up
        </button>
      </form>
    </CenteredSection>
  );
}
