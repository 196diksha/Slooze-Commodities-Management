"use client";

import { useQuery } from '@apollo/client';
import { DASHBOARD_STATS_QUERY } from '@/lib/graphql';
import { useAuth } from '@/context/auth-context';

export default function DashboardPage() {
  const { auth } = useAuth();
  const isManager = auth?.user.role === 'MANAGER';

  const { data, loading, error } = useQuery(DASHBOARD_STATS_QUERY, {
    skip: !isManager,
  });

  if (!isManager) {
    return <p>Dashboard access is restricted to Managers.</p>;
  }

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error.message}</p>;

  const stats = data.dashboardStats;
  const avgStock = stats.totalProducts ? Math.round(stats.totalQuantity / stats.totalProducts) : 0;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold">Dashboard Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Total Products</p>
          <p className="mt-2 text-3xl font-extrabold">{stats.totalProducts}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Total Quantity</p>
          <p className="mt-2 text-3xl font-extrabold">{stats.totalQuantity}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Inventory Value</p>
          <p className="mt-2 text-3xl font-extrabold">${stats.totalInventoryValue.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Avg Stock/Product</p>
          <p className="mt-2 text-3xl font-extrabold">{avgStock}</p>
        </div>
      </div>
    </div>
  );
}
