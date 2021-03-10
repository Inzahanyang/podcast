import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const GqlContext = GqlExecutionContext.create(context).getContext();
    const user = GqlContext['user'];

    if (!user) {
      return false;
    }
    return true;
  }
}
