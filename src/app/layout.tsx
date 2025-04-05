import type { Metadata } from 'next';
import { publicSans, inter } from '../ui/fonts/fonts';
import './globals.css';
import Navbar from '../ui/components/navbar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={publicSans.variable}>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
