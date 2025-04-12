'use client';

import { toast } from 'react-toastify';
import CenteredSection from '@/ui/components/CenteredSection';
import { loginAction } from '@/utils/actions';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

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
        router.push('/dashboard');
      }
    } catch (e) {
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
