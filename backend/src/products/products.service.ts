import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertProductInput } from './dto/upsert-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  async upsert(input: UpsertProductInput) {
    if (input.id) {
      const id = Number(input.id);
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Product not found');
      }

      return this.prisma.product.update({
        where: { id },
        data: {
          name: input.name,
          sku: input.sku,
          category: input.category,
          quantity: input.quantity,
          unitPrice: input.unitPrice,
        },
      });
    }

    return this.prisma.product.create({
      data: {
        name: input.name,
        sku: input.sku,
        category: input.category,
        quantity: input.quantity,
        unitPrice: input.unitPrice,
      },
    });
  }
}
