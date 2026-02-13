import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductsController } from './products.controller';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  providers: [ProductsService, ProductsResolver, RolesGuard],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
