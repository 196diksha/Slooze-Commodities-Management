"use client";

import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPSERT_PRODUCT_MUTATION } from '@/lib/graphql';
import { useRouter } from 'next/navigation';

export function ProductForm({
  initial,
}: {
  initial?: {
    id?: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    unitPrice: number;
  };
}) {
  const router = useRouter();
  const [upsert, { loading }] = useMutation(UPSERT_PRODUCT_MUTATION);
  const [name, setName] = useState(initial?.name ?? '');
  const [sku, setSku] = useState(initial?.sku ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [quantity, setQuantity] = useState(initial?.quantity ?? 0);
  const [unitPrice, setUnitPrice] = useState(initial?.unitPrice ?? 0);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await upsert({
        variables: {
          input: {
            id: initial?.id,
            name,
            sku,
            category: category || null,
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
          },
        },
      });
      router.push('/products');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    }
  };

  return (
    <form className="max-w-2xl space-y-4 rounded-2xl border p-4 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface-soft)' }} onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs uppercase tracking-[0.14em] muted">Name</span>
          <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs uppercase tracking-[0.14em] muted">SKU</span>
          <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} placeholder="SKU code" value={sku} onChange={(e) => setSku(e.target.value)} required />
        </label>
      </div>
      <label className="space-y-1.5">
        <span className="text-xs uppercase tracking-[0.14em] muted">Category</span>
        <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs uppercase tracking-[0.14em] muted">Quantity</span>
          <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} type="number" min={0} placeholder="0" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs uppercase tracking-[0.14em] muted">Unit Price</span>
          <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} type="number" min={0} step="0.01" placeholder="0.00" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} required />
        </label>
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button type="submit" disabled={loading} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white" style={{ background: 'linear-gradient(120deg, var(--primary), #1d93d8)' }}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
