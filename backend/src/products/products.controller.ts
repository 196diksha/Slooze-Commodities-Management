import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { UpsertProductDto } from './dto/upsert-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  create(@Body() dto: UpsertProductDto) {
    return this.productsService.upsert(dto);
  }

  @Put()
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  update(@Body() dto: UpsertProductDto) {
    return this.productsService.upsert(dto);
  }
}
