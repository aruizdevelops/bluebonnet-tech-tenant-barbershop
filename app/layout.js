import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Iron & Oak Barbershop — Crafted Cuts. Timeless Style.',
  description: 'A modern upscale barbershop offering precision haircuts, traditional shaves, and premium grooming. Book your appointment today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
