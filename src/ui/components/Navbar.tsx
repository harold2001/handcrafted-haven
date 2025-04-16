'use client';

import Link from 'next/link';
import Image from 'next/image';
import { inter } from '../fonts/fonts';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const heightMenu = menuOpen ? 'h-auto px-6' : 'h-0 p-0';

  return (
    <nav
      className={`w-screen px-6 h-[70px] bg-primary text-white ${inter.variable} relative`}
    >
      <div className='flex justify-between items-center h-full max-w-[1200px] m-auto'>
        <Link href='/' className='text-2xl'>
          Handcrafted Haven
        </Link>
        <ul className='hidden md:flex md:gap-6'>
          <li className='border-b py-2 md:border-none'>
            <Link href='/shop'>Shop</Link>
          </li>
          <li className='border-b py-2 md:border-none'>
            <Link href='/'>About</Link>
          </li>
          <li className='py-2'>
            <Link href='/' className='flex gap-1'>
              <Image
                src='/search.svg'
                width={18}
                height={18}
                alt='Search button'
              />{' '}
              Search
            </Link>
          </li>
        </ul>
        <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          <Image
            src='/hamburger.svg'
            width={25}
            height={25}
            alt='Hamburger button'
            className='cursor-pointer'
          />
        </button>
        <div
          className={`flex flex-col absolute top-[70px] right-0 left-0 h-max-[180px] bg-primary overflow-hidden transition-all ${heightMenu} md:static md:h-auto md:flex-row `}
        >
          <ul className='flex gap-6 items-center justify-end border-b pb-2 md:order-2 md:p-0 md:border-none'>
            <li>
              <Link href='/' className='flex gap-1'>
                <Image
                  src='/bag.svg'
                  width={18}
                  height={18}
                  alt='Search button'
                />{' '}
                3
              </Link>
            </li>
            {status === 'loading' ? null : session?.user ? (
              <>
                <li>
                  <Link href='/dashboard'>{session.user.name}</Link>
                </li>
                <li>
                  <button
                    className='text-red-300 cursor-pointer'
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href='/auth/login'>Login</Link>
                </li>
                <li>
                  <Link href='/auth/register'>Register</Link>
                </li>
              </>
            )}
          </ul>

          <ul className='md:hidden'>
            <li className='border-b py-2 md:border-none'>
              <Link href='/shop'>Shop</Link>
            </li>
            <li className='border-b py-2 md:border-none'>
              <Link href='/'>About</Link>
            </li>
            <li className='py-2'>
              <Link href='/' className='flex gap-1'>
                <Image
                  src='/search.svg'
                  width={18}
                  height={18}
                  alt='Search button'
                />{' '}
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
