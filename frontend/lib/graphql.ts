"use client";

import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      sku
      category
      quantity
      unitPrice
      createdAt
      updatedAt
    }
  }
`;

export const DASHBOARD_STATS_QUERY = gql`
  query DashboardStats {
    dashboardStats {
      totalProducts
      totalQuantity
      totalInventoryValue
    }
  }
`;

export const UPSERT_PRODUCT_MUTATION = gql`
  mutation UpsertProduct($input: UpsertProductInput!) {
    upsertProduct(input: $input) {
      id
      name
      sku
      category
      quantity
      unitPrice
      createdAt
      updatedAt
    }
  }
`;
