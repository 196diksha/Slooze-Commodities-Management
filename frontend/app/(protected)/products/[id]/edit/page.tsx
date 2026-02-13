"use client";

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@/lib/graphql';
import { ProductForm } from '@/components/product-form';

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  const product = useMemo(() => {
    if (!data?.products) return null;
    return data.products.find((p: any) => String(p.id) === params.id) ?? null;
  }, [data, params.id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error.message}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Edit Product</h2>
      <ProductForm
        initial={{
          id: String(product.id),
          name: product.name,
          sku: product.sku,
          category: product.category || '',
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        }}
      />
    </div>
  );
}
