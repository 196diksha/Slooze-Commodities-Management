import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../../auth/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = this.getRequest(context);
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Missing authenticated user');
    }

    return requiredRoles.includes(user.role);
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType<'http' | 'graphql'>() === 'http') {
      return context.switchToHttp().getRequest();
    }

    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
