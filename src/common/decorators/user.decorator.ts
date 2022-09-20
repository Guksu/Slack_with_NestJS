/**
 * 커스텀 데코레이터
 * 아래의 커스텀 데코레이터로 인하여
 * @Req req, req.user로 사용했던것을
 * @User user user로 사용 가능하다.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
