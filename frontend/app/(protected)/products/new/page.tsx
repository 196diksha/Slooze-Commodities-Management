"use client";

import { ProductForm } from '@/components/product-form';

export default function NewProductPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Add Product</h2>
      <ProductForm initial={{ name: '', sku: '', category: '', quantity: 0, unitPrice: 0 }} />
    </div>
  );
}
