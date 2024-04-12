import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Odin Book',
  description: 'Social Media App',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Providers>
          <NavBar />
          {children}
          <ScrollToTop />
          <Footer />
        </Providers>
        <Analytics/>
      </body>
    </html>
  );
}
