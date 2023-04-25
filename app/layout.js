import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LighthouseAI',
  description: 'LighthouseAI - Visualize Website Analytics'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[url(https://www.pixel4k.com/wp-content/uploads/2018/10/color-waves-abstract_1539371252.jpg)]`}
      >
        {children}
      </body>
    </html>
  );
}
