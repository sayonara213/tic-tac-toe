'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { PublicUser } from '../types';
import { api } from './api';

interface UserState {
  user: PublicUser | null;
  error: string | null;
  rename: (userName: string) => Promise<void>;
}

const UserContext = createContext<UserState | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .session()
      .then(setUser)
      .catch((e: Error) => setError(e.message));
  }, []);

  const rename = useCallback(async (userName: string) => {
    setUser(await api.rename(userName));
  }, []);

  return <UserContext.Provider value={{ user, error, rename }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser outside UserProvider');
  return ctx;
}
