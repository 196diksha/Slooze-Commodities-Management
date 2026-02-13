"use client";

import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@/lib/graphql';

export default function ProductsPage() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <p className="muted">Loading products...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const products = data.products;
  const totalItems = products.reduce((acc: number, p: any) => acc + p.quantity, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Total Products</p>
          <p className="mt-1 text-2xl font-extrabold">{products.length}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Total Quantity</p>
          <p className="mt-1 text-2xl font-extrabold">{totalItems}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }}>
          <p className="text-xs uppercase tracking-[0.14em] muted">Actions</p>
          <Link href="/products/new" className="mt-2 inline-block rounded-lg px-3 py-2 text-sm font-semibold text-white" style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}>
            Add Product
          </Link>
        </div>
      </div>
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Product Inventory</h2>
        <Link href="/products/new" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-white sm:block" style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}>
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr style={{ color: 'var(--text-muted)', background: 'var(--surface-soft)' }}>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>Name</th>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>SKU</th>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>Category</th>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>Quantity</th>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>Unit Price</th>
              <th className="border-b px-4 py-3 text-left text-xs uppercase tracking-[0.13em]" style={{ borderColor: 'var(--border)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id}>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'var(--border)' }}>{p.name}</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>{p.sku}</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>{p.category || '-'}</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>{p.quantity}</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>${p.unitPrice.toFixed(2)}</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <Link href={`/products/${p.id}/edit`} className="rounded-md px-2.5 py-1 text-sm font-semibold" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
