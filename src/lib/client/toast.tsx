'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

// Replaces react-toastify. Messages are read out through a polite live region.

type Tone = 'info' | 'error' | 'success';
interface Toast {
  id: number;
  text: string;
  tone: Tone;
}

const ToastContext = createContext<(text: string, tone?: Tone) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((all) => all.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (text: string, tone: Tone = 'info') => {
      const id = ++nextId.current;
      setToasts((all) => [...all.slice(-2), { id, text, tone }]);
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role='status'
        aria-live='polite'
        className='pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top),12px)] z-50 flex flex-col items-center gap-2 px-4'>
        {toasts.map((t) => (
          <button
            key={t.id}
            type='button'
            onClick={() => dismiss(t.id)}
            aria-label={`${t.text}. Dismiss`}
            className={`console animate-rise pointer-events-auto flex min-h-11 max-w-sm items-center gap-3 !rounded-md px-4 py-2 text-left text-sm font-semibold ${
              t.tone === 'error' ? 'text-danger' : 'text-ink'
            }`}>
            <span
              aria-hidden
              className={`size-2 shrink-0 rounded-full ${
                t.tone === 'error' ? 'bg-danger' : 'bg-accent'
              }`}
            />
            {t.text}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
