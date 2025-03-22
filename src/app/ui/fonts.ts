import { Inter, Public_Sans } from 'next/font/google';

// Fuente principal (Public Sans)
export const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' });

// Fuente secundaria (Inter)
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
