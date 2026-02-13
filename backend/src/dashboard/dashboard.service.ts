import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const products = await this.prisma.product.findMany();

    const totalProducts = products.length;
    const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalInventoryValue = products.reduce(
      (acc, p) => acc + p.quantity * p.unitPrice,
      0,
    );

    return {
      totalProducts,
      totalQuantity,
      totalInventoryValue,
    };
  }
}
