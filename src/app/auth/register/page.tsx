import Form from 'next/form';
import { signIn } from '@/config/auth';
import CenteredSection from '@/ui/components/centeredSection';
import { registerUser } from '@/services/auth.service';

export default function Page() {
  return (
    <CenteredSection>
      <Form
        className='card-container'
        action={async formData => {
          'use server';
          await registerUser(formData);
          await signIn('credentials', formData);
        }}
      >
        <label className='form-label'>
          Name
          <input
            id='name'
            name='name'
            type='text'
            placeholder='E.g. John Doe'
            className='form-input'
          />
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
        </label>
        <label className='form-label'>
          Password
          <input
            id='password'
            name='password'
            type='password'
            className='form-input'
          />
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
        </label>
        <button type='submit' className='form-submit-btn'>
          Sign Up
        </button>
      </Form>
    </CenteredSection>
  );
}
