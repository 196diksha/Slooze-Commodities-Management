"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/context/theme-context';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const role = auth?.user.role;

  const navItems = [
    { href: '/products', label: 'Products', allowed: true },
    { href: '/products/new', label: 'Add Product', allowed: true },
    { href: '/dashboard', label: 'Dashboard', allowed: role === 'MANAGER' },
  ];

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[280px_1fr]">
        <aside className="panel p-4 md:p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] muted">
                Slooze
              </p>
              <h1 className="text-xl font-extrabold">Commodities</h1>
            </div>
            <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
              {role === 'MANAGER' ? 'Manager' : 'Store Keeper'}
            </span>
          </div>
          <div className="mb-5 rounded-xl border p-3" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
            <p className="text-xs muted">Signed in as</p>
            <p className="mt-1 truncate text-sm font-semibold">{auth?.user.email}</p>
          </div>
          <div className="mb-2">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] muted">Navigation</p>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const disabled = !item.allowed;
              return (
                <Link
                  key={item.href}
                  href={disabled ? '#' : item.href}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold transition"
                  style={{
                    opacity: disabled ? 0.45 : 1,
                    border: `1px solid ${active ? 'transparent' : 'var(--border)'}`,
                    background: active ? 'linear-gradient(120deg, var(--primary), #1893d7)' : 'transparent',
                    color: active ? '#fff' : 'var(--text)',
                    pointerEvents: disabled ? 'none' : 'auto',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-xl border px-3 py-2.5 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}
            >
              Theme: {theme === 'light' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="rounded-xl border px-3 py-2.5 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: 'var(--border)' }}
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="panel p-4 md:p-7">
          <div className="mb-5 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs uppercase tracking-[0.18em] muted">
              Slooze Management
            </p>
            <h2 className="mt-1 text-2xl font-extrabold md:text-3xl">Inventory Workspace</h2>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
