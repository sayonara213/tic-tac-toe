import type { Metadata, Viewport } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import AppShell from '@/components/AppShell';
import { prefsScript } from '@/lib/client/prefs';
import './globals.css';

const unbounded = Unbounded({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-unbounded' });
const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'tictactoe',
  description: 'Play tic-tac-toe online with a friend or on one device.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07161d' },
    { media: '(prefers-color-scheme: light)', color: '#e9f4f2' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme='night' data-effects='on' className={`${unbounded.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
