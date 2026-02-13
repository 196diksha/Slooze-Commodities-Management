import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalProducts!: number;

  @Field(() => Int)
  totalQuantity!: number;

  @Field(() => Float)
  totalInventoryValue!: number;
}
