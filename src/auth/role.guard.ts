import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role, User } from '../user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user as User;
    if (!user || !user.roles) return false;

    if (user.roles?.includes(Role.MODERATOR)) return true;

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
