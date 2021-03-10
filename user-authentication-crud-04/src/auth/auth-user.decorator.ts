import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const GqlContext = GqlExecutionContext.create(context).getContext();
    const user = GqlContext['user'];
    return user;
  },
);
