'use client';

import { toast } from 'react-toastify';
import CenteredSection from '@/ui/components/CenteredSection';
import { loginAction } from '@/utils/actions';
import { getSession } from 'next-auth/react';

export default function LoginPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await loginAction(formData);

      if (response.error) {
        toast(response.error.message || 'Email or password incorrect', {
          type: 'error',
          autoClose: 3000,
          theme: 'dark',
          closeButton: true,
        });
      } else {
        toast('Succes! You will be redirected.', {
          type: 'success',
          autoClose: 3000,
          theme: 'dark',
          closeButton: true,
        });
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
      toast('Email or password incorrect', {
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
        <label htmlFor='email' className='form-label'>
          Email
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            className='form-input'
          />
        </label>
        <label htmlFor='password' className='form-label'>
          Password
          <input
            id='password'
            name='password'
            type='password'
            className='form-input'
          />
        </label>
        <button type='submit' className='form-submit-btn'>
          Sign In
        </button>
      </form>
    </CenteredSection>
  );
}
