export type Role = 'MANAGER' | 'STORE_KEEPER';

export type AuthUser = {
  id: number;
  email: string;
  role: Role;
};

export type AuthState = {
  token: string;
  user: AuthUser;
};

export type Product = {
  id: number;
  name: string;
  sku: string;
  category?: string | null;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalProducts: number;
  totalQuantity: number;
  totalInventoryValue: number;
};
