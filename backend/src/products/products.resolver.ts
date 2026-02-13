import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Product } from './product.type';
import { ProductsService } from './products.service';
import { UpsertProductInput } from './dto/upsert-product.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  upsertProduct(@Args('input') input: UpsertProductInput) {
    return this.productsService.upsert(input);
  }
}
