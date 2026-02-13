import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpsertProductDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name!: string;

  @IsString()
  sku!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsInt()
  @Min(0)
  quantity!: number;

  @IsNumber()
  @Min(0)
  unitPrice!: number;
}
