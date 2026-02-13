"use client";

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function HomePage() {
  const { auth } = useAuth();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 md:px-8">
      <div className="grid w-full gap-5 md:grid-cols-2">
        <section className="panel p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] muted">Slooze Platform</p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Commodities Management System
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base muted">
            Manage products, inventory updates, and role-based access for Managers and Store Keepers in one responsive workspace.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {auth ? (
              <Link href="/products" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white" style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}>
                Open App
              </Link>
            ) : (
              <>
                <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white" style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}>
                  Login
                </Link>
                <Link href="/register" className="rounded-xl border px-4 py-2.5 text-sm font-semibold" style={{ borderColor: 'var(--border)' }}>
                  Register
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="panel p-6 md:p-8">
          <h2 className="text-xl font-extrabold">Role Access</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
              <p className="text-sm font-semibold">Manager</p>
              <p className="mt-1 text-sm muted">Can access dashboard, products, and add/edit actions.</p>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
              <p className="text-sm font-semibold">Store Keeper</p>
              <p className="mt-1 text-sm muted">Can view products and manage add/edit inventory actions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
