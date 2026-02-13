import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from './role.enum';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class AuthUser {
  @Field()
  id!: number;

  @Field()
  email!: string;

  @Field(() => Role)
  role!: Role;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken!: string;

  @Field(() => AuthUser)
  user!: AuthUser;
}
