"use client";

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('manager@slooze.com');
  const [password, setPassword] = useState('manager123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setPending(true);

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      login({ token: data.accessToken, user: data.user });
      router.push('/products');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="panel w-full max-w-md p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.2em] muted">Slooze</p>
        <h1 className="mt-2 mb-1 text-3xl font-extrabold">Welcome back</h1>
        <p className="mb-6 text-sm muted">Use your Manager or Store Keeper account</p>
        <form className="space-y-4" onSubmit={onSubmit} suppressHydrationWarning>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border px-3 py-2.5"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}
              suppressHydrationWarning
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] muted">Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter your password"
                className="w-full rounded-xl border px-3 py-2.5 pr-11"
                style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1"
                style={{ color: 'var(--text-muted)' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.89 1 12a10.94 10.94 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8a11.05 11.05 0 0 1-1.67 2.92" />
                    <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}
            suppressHydrationWarning
          >
            {pending ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 rounded-xl border p-3 text-xs muted" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          Demo users: manager@slooze.com / manager123 and keeper@slooze.com / keeper123
        </div>
        <p className="mt-4 text-center text-sm muted">
          New here?{' '}
          <Link href="/register" className="font-semibold" style={{ color: 'var(--primary)' }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
