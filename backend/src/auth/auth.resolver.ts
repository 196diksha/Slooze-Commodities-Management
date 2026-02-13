import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.types';
import { LoginInput } from './login.input';
import { RegisterInput } from './register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => AuthResponse)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }
}
