"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { AppShell } from '@/components/app-shell';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!auth) {
      router.replace('/login');
      return;
    }

    if (pathname.startsWith('/dashboard') && auth.user.role !== 'MANAGER') {
      router.replace('/products');
    }
  }, [auth, loading, pathname, router]);

  if (loading || !auth) {
    return <div className="p-6">Loading...</div>;
  }

  return <AppShell>{children}</AppShell>;
}
