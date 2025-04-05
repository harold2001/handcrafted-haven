import Form from 'next/form';
import { signIn } from '@/config/auth';
import CenteredSection from '@/ui/components/centeredSection';

export default function page() {
  return (
    <CenteredSection>
      <Form
        className='card-container'
        action={async formData => {
          'use server';
          await signIn('credentials', formData);
        }}
      >
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
      </Form>
    </CenteredSection>
  );
}
