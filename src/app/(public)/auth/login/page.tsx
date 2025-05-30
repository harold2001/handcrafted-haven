'use client';

import CenteredSection from '@/ui/components/CenteredSection';
import { loginAction } from '@/utils/actions';
import { getSession } from 'next-auth/react';
import useMessage from '@/utils/hooks/useMessage';
import { useState } from 'react';

export default function LoginPage() {
  const { succesToast, errorToast } = useMessage();
  const [errors, setErrors] = useState<{
    email: string[];
    password: string[];
  } | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await loginAction(formData);

      if (response?.error) {
        errorToast(response.error.message || 'Email or password incorrect');
      } else if (response?.errors) {
        setErrors(response.errors);
      } else {
        succesToast('Succes! You will be redirected.');
        const session = await getSession();

        if (session && session.user && session.user.role) {
          const roleName = session.user.role.name.toLowerCase();

          if (roleName === 'seller') {
            window.location.href = '/dashboard';
          } else if (roleName === 'customer') {
            window.location.href = '/shop';
          } else {
            window.location.href = '/';
          }
        }
      }
    } catch (e) {
      console.log(e);
      errorToast('Email or password incorrect');
    }
  };

  return (
    <CenteredSection>
      <form className='card-container' onSubmit={handleSubmit}>
        <label htmlFor='email' className='form-label'>
          Email
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            className='form-input'
          />
          {errors?.email?.map((err, index) => (
            <span key={index} className='error-text'>
              {err}
            </span>
          ))}
        </label>
        <label htmlFor='password' className='form-label'>
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
        <button type='submit' className='form-submit-btn'>
          Sign In
        </button>
      </form>
    </CenteredSection>
  );
}
