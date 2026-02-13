"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthState } from '@/types';

type AuthContextValue = {
  auth: AuthState | null;
  login: (nextAuth: AuthState) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const KEY = 'slooze.auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setAuth(JSON.parse(raw));
      } catch {
        localStorage.removeItem(KEY);
      }
    }
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      loading,
      login: (nextAuth) => {
        setAuth(nextAuth);
        localStorage.setItem(KEY, JSON.stringify(nextAuth));
      },
      logout: () => {
        setAuth(null);
        localStorage.removeItem(KEY);
      },
    }),
    [auth, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
