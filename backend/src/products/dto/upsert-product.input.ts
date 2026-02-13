import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UpsertProductInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  sku!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  quantity!: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}
