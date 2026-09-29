'use client';

import dynamic from 'next/dynamic';
import { PrefsProvider } from '@/lib/client/prefs';
import { ToastProvider } from '@/lib/client/toast';
import { UserProvider, useUser } from '@/lib/client/user';
import Header from './Header';
import Loader from './Loader';

// PixiJS is loaded on the client only, after first paint.
const PixiBackdrop = dynamic(() => import('./effects/PixiBackdrop'), { ssr: false });
const PixiFx = dynamic(() => import('./effects/PixiFx'), { ssr: false });

function Gate({ children }: { children: React.ReactNode }) {
  const { user, error } = useUser();
  if (error) {
    return (
      <p role='alert' className='py-10 text-center text-sm text-danger'>
        Could not reach the game server. Check your connection and reload.
      </p>
    );
  }
  return user ? <>{children}</> : <Loader />;
}

/** The single glass Console every screen lives in (styleguide "one surface" rule). */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PrefsProvider>
      <ToastProvider>
        <UserProvider>
          <PixiBackdrop />
          <a
            href='#main'
            className='sr-only z-50 rounded-sm bg-accent px-4 py-2 font-bold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3'>
            Skip to content
          </a>
          <div className='mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 py-4 pb-[max(env(safe-area-inset-bottom),16px)] sm:py-8'>
            <div className='console flex flex-1 flex-col gap-4 p-4 sm:flex-none sm:p-6'>
              <Header />
              <main id='main' tabIndex={-1} className='flex flex-1 flex-col gap-4 outline-none'>
                <Gate>{children}</Gate>
              </main>
            </div>
          </div>
          <PixiFx />
        </UserProvider>
      </ToastProvider>
    </PrefsProvider>
  );
}
