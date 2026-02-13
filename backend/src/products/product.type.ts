import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  sku!: string;

  @Field(() => String, { nullable: true })
  category?: string | null;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  unitPrice!: number;

  @Field()
  updatedAt!: Date;

  @Field()
  createdAt!: Date;
}
