import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from './role.enum';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
