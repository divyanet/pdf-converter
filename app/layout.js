import { Schibsted_Grotesk } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { SITE } from '../lib/tools';

const font = Schibsted_Grotesk({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: free PDF converter`, template: `%s | ${SITE.name}` },
  description: 'Free PDF tools that run in your browser. No signup, no uploads.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <header className="top"><Link href="/" className="logo">{SITE.name}</Link></header>
        <main>{children}</main>
        <footer className="foot">Files are processed in your browser and never uploaded.</footer>
      </body>
    </html>
  );
}
