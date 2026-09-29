'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Theme (night/day) and the Effects switch, kept in localStorage like the old
// redux-persist store. An inline script in <head> applies them before paint.

export type Theme = 'night' | 'day';

interface Prefs {
  theme: Theme;
  toggleTheme: () => void;
  effects: boolean;
  toggleEffects: () => void;
  reducedMotion: boolean;
}

const PrefsContext = createContext<Prefs | null>(null);

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export const prefsScript = `(()=>{try{var d=document.documentElement,t=localStorage.getItem('ttt-theme'),e=localStorage.getItem('ttt-effects');d.dataset.theme=t==='day'?'day':'night';d.dataset.effects=e==='off'||(e===null&&matchMedia('(prefers-reduced-motion: reduce)').matches)?'off':'on'}catch(_){}})()`;

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('night');
  const [effects, setEffects] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const d = document.documentElement;
    setTheme(d.dataset.theme === 'day' ? 'day' : 'night');
    setEffects(d.dataset.effects !== 'off');
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'night' ? 'day' : 'night';
      document.documentElement.dataset.theme = next;
      store('ttt-theme', next);
      return next;
    });
  }, []);

  const toggleEffects = useCallback(() => {
    setEffects((on) => {
      const next = !on;
      document.documentElement.dataset.effects = next ? 'on' : 'off';
      store('ttt-effects', next ? 'on' : 'off');
      return next;
    });
  }, []);

  return (
    <PrefsContext.Provider value={{ theme, toggleTheme, effects, toggleEffects, reducedMotion }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs outside PrefsProvider');
  return ctx;
}

/** True when decorative motion should play. */
export function useMotion() {
  const { effects, reducedMotion } = usePrefs();
  return effects && !reducedMotion;
}
