import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      'authorization',
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return await this.authorizationService.validate(
      user.roleId,
      required[0],
      required[1],
    );
  }
}
