import type { Metadata } from 'next';
import { publicSans, inter } from '../ui/fonts/fonts';
import './globals.css';
import Navbar from '@/ui/components/Navbar';
import ToastProvider from '@/ui/components/ToastProvider';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'Created for artisan to sell their products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={publicSans.variable}>
      <body className={`font-sans ${inter.variable} antialiased overflow-auto`}>
        <SessionProvider>
          <Navbar />
          {children}
          <ToastProvider />
        </SessionProvider>
      </body>
    </html>
  );
}
