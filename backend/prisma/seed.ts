import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const managerPasswordHash = await bcrypt.hash('manager123', 10);
  const keeperPasswordHash = await bcrypt.hash('keeper123', 10);

  await prisma.user.upsert({
    where: { email: 'manager@slooze.com' },
    create: {
      email: 'manager@slooze.com',
      passwordHash: managerPasswordHash,
      role: Role.MANAGER,
    },
    update: {
      passwordHash: managerPasswordHash,
      role: Role.MANAGER,
    },
  });

  await prisma.user.upsert({
    where: { email: 'keeper@slooze.com' },
    create: {
      email: 'keeper@slooze.com',
      passwordHash: keeperPasswordHash,
      role: Role.STORE_KEEPER,
    },
    update: {
      passwordHash: keeperPasswordHash,
      role: Role.STORE_KEEPER,
    },
  });

  const products = [
    {
      name: 'Rice Premium',
      sku: 'RC-1001',
      category: 'Grains',
      quantity: 120,
      unitPrice: 2.5,
    },
    {
      name: 'Sunflower Oil',
      sku: 'OL-2040',
      category: 'Cooking',
      quantity: 80,
      unitPrice: 4.2,
    },
    {
      name: 'Black Beans',
      sku: 'BN-3302',
      category: 'Pulses',
      quantity: 65,
      unitPrice: 3.1,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      create: product,
      update: product,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
